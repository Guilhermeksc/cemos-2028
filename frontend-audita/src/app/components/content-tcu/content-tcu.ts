import { Component, OnInit, Input, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LivroIndividualService } from '../../services/livro-individual.service';

declare var html2pdf: any;

// Interfaces para configuração
export interface TabItem {
  id: string;
  label: string;
  markdownPath: string;
}

export interface TabGroup {
  id: string;
  label: string;
  mainMarkdownPath: string; // Arquivo MD principal do tab group
  items: TabItem[]; // Sub-itens do menu suspenso
}

export interface ContentConfig {
  basePath: string; // Caminho base para os arquivos (ex: 'assets/content/tcu')
  tabGroups: TabGroup[];
}

// Interface para headings de navegação
export interface NavigationHeading {
  id: string;
  title: string;
  level: number; // 1 para #, 2 para ##
}

@Component({
  selector: 'app-content-tcu',
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule],
  templateUrl: './content-tcu.html',
  styleUrl: './content-tcu.scss'
})
export class ContentTcu implements OnInit {
  @Input() config!: ContentConfig;

  @ViewChildren('contentRef') contentRefs!: QueryList<ElementRef>;

  // Estado atual
  activeTabGroupId: string | null = null;
  activeTabItemId: string | null = null;
  openDropdownId: string | null = null;

  // Armazenamento de conteúdo HTML
  contentMap: Map<string, SafeHtml> = new Map();
  
  // Armazenamento de headings para navegação
  headingsMap: Map<string, NavigationHeading[]> = new Map();
  
  // Estados de carregamento
  loadingMap: Map<string, boolean> = new Map();
  isExportingPdf: boolean = false;

  // Propriedades computadas para melhor performance
  get currentContentKey(): string {
    if (!this.activeTabGroupId) return '';
    return this.activeTabItemId 
      ? `${this.activeTabGroupId}-${this.activeTabItemId}`
      : this.activeTabGroupId;
  }

  get currentContent(): SafeHtml {
    return this.contentMap.get(this.currentContentKey) || '';
  }

  get isLoadingCurrent(): boolean {
    return this.loadingMap.get(this.currentContentKey) || false;
  }

  /**
   * Retorna os headings do conteúdo atual para navegação
   */
  get currentHeadings(): NavigationHeading[] {
    return this.headingsMap.get(this.currentContentKey) || [];
  }

  constructor(
    private livroService: LivroIndividualService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (!this.config || !this.config.tabGroups || this.config.tabGroups.length === 0) {
      console.error('Configuração de tab groups não fornecida ou inválida');
      return;
    }

    // Carrega a biblioteca html2pdf dinamicamente
    this.loadHtml2PdfLibrary();
    
    // Carrega o conteúdo principal de cada tab group
    this.config.tabGroups.forEach(tabGroup => {
      this.loadContent(tabGroup.id, tabGroup.mainMarkdownPath);
    });

    // Define o primeiro tab group como ativo
    if (this.config.tabGroups.length > 0) {
      this.activeTabGroupId = this.config.tabGroups[0].id;
      this.activeTabItemId = null; // Mostra o conteúdo principal
    }
  }

  /**
   * Carrega a biblioteca html2pdf.js via CDN
   */
  private loadHtml2PdfLibrary(): void {
    if (typeof html2pdf === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }

  /**
   * Define o tab group ativo
   */
  setActiveTabGroup(tabGroupId: string): void {
    this.activeTabGroupId = tabGroupId;
    this.activeTabItemId = null; // Reseta para mostrar conteúdo principal
    this.openDropdownId = null; // Fecha dropdown se estiver aberto
  }

  /**
   * Toggle do dropdown menu
   */
  toggleDropdown(tabGroupId: string, event: Event): void {
    event.stopPropagation();
    if (this.openDropdownId === tabGroupId) {
      // Se já está aberto, fecha e ativa o tab group
      this.openDropdownId = null;
      this.setActiveTabGroup(tabGroupId);
    } else {
      // Abre o dropdown
      this.openDropdownId = tabGroupId;
    }
  }

  /**
   * Fecha dropdown quando clicar fora
   */
  closeDropdown(): void {
    this.openDropdownId = null;
  }

  /**
   * Seleciona um item do menu suspenso
   */
  selectTabItem(tabGroupId: string, itemId: string): void {
    this.activeTabGroupId = tabGroupId;
    this.activeTabItemId = itemId;
    this.openDropdownId = null;

    // Carrega o conteúdo se ainda não foi carregado
    const tabGroup = this.config.tabGroups.find(tg => tg.id === tabGroupId);
    const item = tabGroup?.items.find(i => i.id === itemId);
    
    if (item && !this.contentMap.has(`${tabGroupId}-${itemId}`)) {
      this.loadContent(`${tabGroupId}-${itemId}`, item.markdownPath);
    }
  }

  /**
   * Retorna o tab group ativo
   */
  getActiveTabGroup(): TabGroup | undefined {
    return this.config.tabGroups.find(tg => tg.id === this.activeTabGroupId);
  }

  /**
   * Retorna o item ativo
   */
  getActiveTabItem(): TabItem | undefined {
    if (!this.activeTabGroupId || !this.activeTabItemId) return undefined;
    const tabGroup = this.getActiveTabGroup();
    return tabGroup?.items.find(i => i.id === this.activeTabItemId);
  }


  /**
   * Carrega conteúdo markdown genérico
   */
  private loadContent(key: string, markdownPath: string): void {
    if (this.loadingMap.get(key)) return; // Já está carregando
    
    this.loadingMap.set(key, true);
    
    const fullPath = markdownPath.startsWith('/') 
      ? markdownPath 
      : `${this.config.basePath}/${markdownPath}`;

    this.livroService.loadMarkdownFile(fullPath).subscribe({
      next: (content) => {
        const html = this.livroService.markdownToHtml(content, this.config.basePath);
        this.contentMap.set(key, this.sanitizer.bypassSecurityTrustHtml(html));
        
        // Extrai os headings (# e ##) para navegação
        const headings = this.extractHeadings(content);
        this.headingsMap.set(key, headings);
        
        this.loadingMap.set(key, false);
      },
      error: (error) => {
        console.error(`Erro ao carregar arquivo: ${fullPath}`, error);
        this.contentMap.set(key, this.sanitizer.bypassSecurityTrustHtml(
          `<p>Erro ao carregar o conteúdo.</p>`
        ));
        this.headingsMap.set(key, []);
        this.loadingMap.set(key, false);
      }
    });
  }

  /**
   * Extrai headings (# e ##) do conteúdo markdown
   */
  private extractHeadings(content: string): NavigationHeading[] {
    const headings: NavigationHeading[] = [];
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      // Match para # ou ##
      const match = line.match(/^(#{1,2})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const title = match[2].trim();
        // Usa o mesmo método de geração de ID do serviço
        const id = this.generateHeadingId(title, index);
        
        headings.push({
          id,
          title,
          level
        });
      }
    });
    
    return headings;
  }

  /**
   * Gera ID para heading (mesma lógica do serviço)
   */
  private generateHeadingId(title: string, index: number): string {
    const normalized = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-') // Remove hífens duplicados
      .trim();
    
    return `${normalized}-${index}`;
  }

  /**
   * Navega para um heading específico
   */
  scrollToHeading(headingId: string): void {
    // Aguarda um pouco para garantir que o DOM foi atualizado
    setTimeout(() => {
      const element = document.getElementById(headingId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100);
  }

  /**
   * Exporta o conteúdo da aba ativa para PDF
   */
  async exportToPdf(): Promise<void> {
    if (this.isExportingPdf || this.isLoadingCurrent) return;

    // Aguarda a biblioteca estar carregada
    if (typeof html2pdf === 'undefined') {
      await this.waitForHtml2Pdf();
    }

    this.isExportingPdf = true;

    try {
      // Encontra o elemento de conteúdo atual
      const contentElement = this.contentRefs
        .toArray()
        .find(ref => ref.nativeElement.getAttribute('data-content-key') === this.currentContentKey)
        ?.nativeElement;

      if (!contentElement) {
        console.error('Elemento de conteúdo não encontrado');
        this.isExportingPdf = false;
        return;
      }

      // Gera título do PDF
      const tabGroup = this.getActiveTabGroup();
      const tabItem = this.getActiveTabItem();
      const title = tabItem 
        ? `${tabGroup?.label} - ${tabItem.label}`
        : tabGroup?.label || 'Documento';

      // Clona o elemento para não modificar o original
      const clonedElement = contentElement.cloneNode(true) as HTMLElement;
      
      // Adiciona estilos específicos para PDF
      clonedElement.style.padding = '20px';
      clonedElement.style.backgroundColor = '#ffffff';
      clonedElement.style.color = '#000000';
      clonedElement.style.fontFamily = 'Arial, sans-serif';
      
      // Cria um container temporário
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.width = '210mm'; // A4 width
      tempContainer.appendChild(clonedElement);
      document.body.appendChild(tempContainer);

      // Configurações do PDF
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${title}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' 
        }
      };

      // Gera e baixa o PDF
      await html2pdf().set(opt).from(clonedElement).save();

      // Remove o container temporário
      document.body.removeChild(tempContainer);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Erro ao exportar PDF. Por favor, tente novamente.');
    } finally {
      this.isExportingPdf = false;
    }
  }

  /**
   * Aguarda a biblioteca html2pdf estar carregada
   */
  private waitForHtml2Pdf(): Promise<void> {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 50; // 5 segundos máximo

      const checkInterval = setInterval(() => {
        attempts++;
        if (typeof html2pdf !== 'undefined') {
          clearInterval(checkInterval);
          resolve();
        } else if (attempts >= maxAttempts) {
          clearInterval(checkInterval);
          reject(new Error('Timeout ao carregar biblioteca html2pdf'));
        }
      }, 100);
    });
  }

}
