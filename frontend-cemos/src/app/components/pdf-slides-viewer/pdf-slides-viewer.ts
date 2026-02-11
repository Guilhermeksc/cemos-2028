import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
// Usa o build legacy do PDF.js para compatibilidade com ambientes mais antigos
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

// Configurar worker do PDF.js usando o build legacy
// Usa CDN do unpkg que funciona melhor com módulos ES
if (typeof pdfjsLib !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
  const pdfjsVersion = pdfjsLib.version;
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsVersion}/legacy/build/pdf.worker.min.mjs`;
} else {
  console.error('❌ PDF.js não foi carregado corretamente');
}

interface PDFSlide {
  pdfPath: string;
  totalPages: number;
  pages: HTMLCanvasElement[];
}

export interface PDFFolder {
  name: string;
  path: string;
  files: string[];
}

@Component({
  selector: 'app-pdf-slides-viewer',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './pdf-slides-viewer.html',
  styleUrl: './pdf-slides-viewer.scss'
})
export class PdfSlidesViewer implements OnInit, OnDestroy {
  @Input() pdfFolders: PDFFolder[] = []; // Array de pastas com seus PDFs
  @Output() closeRequested = new EventEmitter<void>(); // Evento emitido quando o usuário quer fechar o visualizador
  
  @ViewChild('slideContainer', { static: false }) slideContainer!: ElementRef<HTMLDivElement>;
  
  pdfSlides: PDFSlide[] = [];
  currentSlideIndex: number = 0;
  currentPdfIndex: number = 0;
  isLoading: boolean = false;
  isFullscreen: boolean = false;
  error: string | null = null;
  
  // Estado para navegação entre pastas e PDFs
  showFolderList: boolean = true; // Mostra lista de pastas inicialmente
  showPdfList: boolean = false; // Mostra lista de PDFs da pasta selecionada
  selectedFolder: PDFFolder | null = null; // Pasta selecionada
  selectedPdfName: string | null = null; // PDF selecionado
  currentPdfSlides: HTMLCanvasElement[] = []; // Slides do PDF atual
  slideImages: string[] = []; // Array de data URLs para renderização
  private totalSlides: number = 0;
  
  // Cache
  private cache: IDBDatabase | null = null;
  private readonly CACHE_DB_NAME = 'pdf-slides-cache';
  private readonly CACHE_DB_VERSION = 1;
  private readonly CACHE_STORE_NAME = 'slides';

  ngOnInit(): void {
    if (!pdfjsLib || !pdfjsLib.getDocument) {
      this.error = 'PDF.js não foi carregado corretamente. Por favor, recarregue a página.';
      this.isLoading = false;
      return;
    }
    
    if (!this.pdfFolders || this.pdfFolders.length === 0) {
      this.error = 'Configuração inválida: nenhuma pasta de PDFs fornecida.';
      this.isLoading = false;
      return;
    }
    
    // Inicializa o cache
    this.initCache();
    
    // Inicializa mostrando a lista de pastas
    this.showFolderList = true;
    this.showPdfList = false;
  }

  /**
   * Inicializa o IndexedDB para cache
   */
  private async initCache(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.CACHE_DB_NAME, this.CACHE_DB_VERSION);
      
      request.onerror = () => {
        console.warn('Não foi possível abrir o cache IndexedDB');
        resolve(); // Continua mesmo sem cache
      };
      
      request.onsuccess = () => {
        this.cache = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.CACHE_STORE_NAME)) {
          db.createObjectStore(this.CACHE_STORE_NAME, { keyPath: 'key' });
        }
      };
    });
  }

  /**
   * Gera uma chave única para o cache baseada no caminho do PDF
   */
  private getCacheKey(pdfPath: string): string {
    return `pdf_${pdfPath.replace(/[^a-zA-Z0-9]/g, '_')}`;
  }

  /**
   * Verifica se o PDF está em cache
   */
  private async getCachedSlides(pdfPath: string): Promise<string[] | null> {
    if (!this.cache) {
      return null;
    }

    return new Promise((resolve) => {
      const transaction = this.cache!.transaction([this.CACHE_STORE_NAME], 'readonly');
      const store = transaction.objectStore(this.CACHE_STORE_NAME);
      const request = store.get(this.getCacheKey(pdfPath));

      request.onsuccess = () => {
        const result = request.result;
        if (result && result.slideImages && Array.isArray(result.slideImages)) {
          resolve(result.slideImages);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => {
        resolve(null);
      };
    });
  }

  /**
   * Salva os slides no cache
   */
  private async saveToCache(pdfPath: string, slideImages: string[]): Promise<void> {
    if (!this.cache) {
      return;
    }

    return new Promise((resolve) => {
      const transaction = this.cache!.transaction([this.CACHE_STORE_NAME], 'readwrite');
      const store = transaction.objectStore(this.CACHE_STORE_NAME);
      const data = {
        key: this.getCacheKey(pdfPath),
        pdfPath: pdfPath,
        slideImages: slideImages,
        timestamp: Date.now()
      };

      const request = store.put(data);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        console.warn('Erro ao salvar no cache:', request.error);
        resolve(); // Continua mesmo se falhar
      };
    });
  }

  ngOnDestroy(): void {
    // Só tenta sair do fullscreen se estiver em fullscreen
    if (this.isFullscreen) {
      this.exitFullscreen();
    }
    
    // Fecha conexão com o cache
    if (this.cache) {
      this.cache.close();
    }
  }

  /**
   * Seleciona uma pasta e mostra seus PDFs
   */
  selectFolder(folder: PDFFolder): void {
    if (!folder.files || folder.files.length === 0) {
      this.error = `A pasta "${folder.name}" não contém arquivos PDF disponíveis.`;
      return;
    }
    
    this.selectedFolder = folder;
    this.showFolderList = false;
    this.showPdfList = true;
    this.selectedPdfName = null;
    this.currentPdfSlides = [];
    this.slideImages = [];
    this.currentSlideIndex = 0;
    this.totalSlides = 0;
    this.error = null;
  }

  /**
   * Volta para a lista de pastas
   */
  backToFolderList(): void {
    this.showFolderList = true;
    this.showPdfList = false;
    this.selectedFolder = null;
    this.selectedPdfName = null;
    this.currentPdfSlides = [];
    this.slideImages = [];
    this.currentSlideIndex = 0;
    this.totalSlides = 0;
  }

  /**
   * Fecha o visualizador (volta para a página anterior)
   */
  closeViewer(): void {
    this.closeRequested.emit();
  }

  /**
   * Seleciona um PDF e carrega apenas ele
   */
  async selectPdf(fileName: string): Promise<void> {
    if (!this.selectedFolder) return;
    
    this.selectedPdfName = fileName;
    this.showPdfList = false;
    await this.loadSinglePDF(this.selectedFolder.path, fileName);
  }

  /**
   * Volta para a lista de PDFs da pasta atual
   */
  backToPdfList(): void {
    this.showPdfList = true;
    this.selectedPdfName = null;
    this.currentPdfSlides = [];
    this.slideImages = [];
    this.currentSlideIndex = 0;
    this.totalSlides = 0;
    this.error = null;
  }

  /**
   * Trata o fechamento de erro baseado no contexto atual
   */
  handleErrorClose(): void {
    if (this.showPdfList) {
      this.backToFolderList();
    } else if (this.showFolderList) {
      this.error = null;
    } else {
      this.backToPdfList();
    }
  }

  /**
   * Carrega apenas um PDF específico (com cache)
   */
  async loadSinglePDF(folderPath: string, fileName: string): Promise<void> {
    this.isLoading = true;
    this.error = null;
    this.currentPdfSlides = [];
    this.slideImages = [];
    this.currentSlideIndex = 0;

    try {
      const pdfPath = `/assets/content/${folderPath}/${fileName}`;
      
      // Verifica se está em cache primeiro
      const cachedSlides = await this.getCachedSlides(pdfPath);
      
      if (cachedSlides && cachedSlides.length > 0) {
        // Usa slides do cache
        this.slideImages = cachedSlides;
        this.totalSlides = cachedSlides.length;
        this.isLoading = false;
        return;
      }

      // Se não está em cache, carrega do PDF
      await this.loadPDF(pdfPath, fileName);

      // Converter canvas para data URLs para renderização
      if (this.currentPdfSlides.length > 0) {
        this.slideImages = this.currentPdfSlides.map((slide) => {
          try {
            return slide.toDataURL('image/png');
          } catch (error) {
            return '';
          }
        }).filter(img => img !== '');
        
        // Salva no cache para próxima vez
        await this.saveToCache(pdfPath, this.slideImages);
      }
      
      this.totalSlides = this.currentPdfSlides.length;
      
      if (this.totalSlides === 0) {
        this.error = 'Nenhum slide foi carregado. Verifique se o arquivo PDF existe e está acessível.';
      }
    } catch (error) {
      this.error = `Erro ao carregar o PDF: ${error instanceof Error ? error.message : 'Erro desconhecido'}.`;
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Carrega um PDF específico e converte suas páginas em slides
   */
  private async loadPDF(pdfPath: string, fileName: string): Promise<void> {
    if (!pdfjsLib || !pdfjsLib.getDocument) {
      throw new Error('PDF.js não está disponível.');
    }
    
    const loadingTask = pdfjsLib.getDocument({
      url: pdfPath,
      verbosity: 0
    });
    
    const pdf = await loadingTask.promise;
    const totalPages = pdf.numPages;
    
    this.currentPdfSlides = [];

    // Carregar todas as páginas do PDF
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2.0 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('Não foi possível obter contexto do canvas');
      }

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvas: canvas,
        viewport: viewport
      }).promise;

      this.currentPdfSlides.push(canvas);
    }
  }

  /**
   * Navega para o slide anterior
   */
  previousSlide(): void {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
      this.scrollToCurrentSlide();
    }
  }

  /**
   * Navega para o próximo slide
   */
  nextSlide(): void {
    if (this.currentSlideIndex < this.totalSlides - 1) {
      this.currentSlideIndex++;
      this.scrollToCurrentSlide();
    }
  }

  /**
   * Scroll suave para o slide atual
   */
  private scrollToCurrentSlide(): void {
    if (this.slideContainer) {
      const slides = this.slideContainer.nativeElement.querySelectorAll('.slide');
      if (slides[this.currentSlideIndex]) {
        slides[this.currentSlideIndex].scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }
  }

  /**
   * Entra em modo fullscreen
   */
  enterFullscreen(): void {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
    }
    this.isFullscreen = true;
  }

  /**
   * Sai do modo fullscreen
   */
  exitFullscreen(): void {
    // Verifica se realmente está em fullscreen antes de tentar sair
    const isCurrentlyFullscreen = !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).msFullscreenElement
    );

    if (!isCurrentlyFullscreen) {
      this.isFullscreen = false;
      return;
    }

    try {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {
          // Ignora erros ao sair do fullscreen
          this.isFullscreen = false;
        });
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
        this.isFullscreen = false;
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
        this.isFullscreen = false;
      } else {
        this.isFullscreen = false;
      }
    } catch (error) {
      // Ignora erros ao sair do fullscreen
      console.warn('Erro ao sair do fullscreen:', error);
      this.isFullscreen = false;
    }
  }

  /**
   * Listener para eventos de fullscreen
   */
  @HostListener('document:fullscreenchange', [])
  @HostListener('document:webkitfullscreenchange', [])
  @HostListener('document:msfullscreenchange', [])
  onFullscreenChange(): void {
    this.isFullscreen = !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).msFullscreenElement
    );
  }

  /**
   * Listener para teclas de navegação
   */
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (this.isLoading) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.previousSlide();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.nextSlide();
        break;
      case 'Escape':
        if (this.isFullscreen) {
          this.exitFullscreen();
        }
        break;
    }
  }

  /**
   * Obtém o slide atual
   */
  getCurrentSlide(): HTMLCanvasElement | null {
    return this.currentPdfSlides[this.currentSlideIndex] || null;
  }

  /**
   * Obtém lista ordenada de PDFs da pasta atual
   */
  getSortedPdfFiles(): string[] {
    if (!this.selectedFolder) return [];
    return [...this.selectedFolder.files].sort();
  }

  /**
   * Obtém informações do slide atual
   */
  getCurrentSlideInfo(): string {
    return `${this.currentSlideIndex + 1} / ${this.totalSlides}`;
  }

  /**
   * Verifica se pode ir para o slide anterior
   */
  canGoPrevious(): boolean {
    return this.currentSlideIndex > 0;
  }

  /**
   * Verifica se pode ir para o próximo slide
   */
  canGoNext(): boolean {
    return this.currentSlideIndex < this.totalSlides - 1;
  }
}
