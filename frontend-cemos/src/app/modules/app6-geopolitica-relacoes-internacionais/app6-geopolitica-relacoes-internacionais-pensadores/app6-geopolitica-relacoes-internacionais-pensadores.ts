import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LivroIndividualService } from '../../../services/livro-individual.service';

declare var html2pdf: any;

@Component({
  selector: 'app-app6-geopolitica-relacoes-internacionais-pensadores',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule],
  templateUrl: './app6-geopolitica-relacoes-internacionais-pensadores.html',
  styleUrl: './app6-geopolitica-relacoes-internacionais-pensadores.scss'
})
export class App6GeopoliticaRelacoesInternacionaisPensadores implements OnInit {
  @ViewChild('geopoliticaContent', { static: false }) geopoliticaContent!: ElementRef;
  @ViewChild('relacoesInternacionaisContent', { static: false }) relacoesInternacionaisContent!: ElementRef;

  activeTab: 'geopolitica' | 'relacoes-internacionais' = 'geopolitica';
  
  // Conteúdo HTML para cada aba
  geopoliticaHtml: SafeHtml = '';
  relacoesInternacionaisHtml: SafeHtml = '';
  
  // Estados de carregamento
  isLoadingGeopolitica: boolean = false;
  isLoadingRelacoesInternacionais: boolean = false;
  isExportingPdf: boolean = false;
  
  // Caminhos dos arquivos
  private readonly geopoliticaPath = 'assets/content/geopolitica-ri/principios-ri/teoricos_geopolitica.md';
  private readonly relacoesInternacionaisPath = 'assets/content/geopolitica-ri/principios-ri/teoricos.md';
  private readonly basePath = 'assets/content/geopolitica-ri/principios-ri';

  constructor(
    private livroService: LivroIndividualService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Carrega a biblioteca html2pdf dinamicamente
    this.loadHtml2PdfLibrary();
    // Carrega ambos os arquivos ao inicializar
    this.loadGeopolitica();
    this.loadRelacoesInternacionais();
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

  setActiveTab(tab: 'geopolitica' | 'relacoes-internacionais'): void {
    this.activeTab = tab;
  }

  /**
   * Exporta o conteúdo da aba ativa para PDF
   */
  async exportToPdf(): Promise<void> {
    if (this.isExportingPdf) return;

    // Aguarda a biblioteca estar carregada
    if (typeof html2pdf === 'undefined') {
      await this.waitForHtml2Pdf();
    }

    this.isExportingPdf = true;

    try {
      const contentElement = this.activeTab === 'geopolitica' 
        ? this.geopoliticaContent?.nativeElement 
        : this.relacoesInternacionaisContent?.nativeElement;

      if (!contentElement) {
        console.error('Elemento de conteúdo não encontrado');
        this.isExportingPdf = false;
        return;
      }

      const title = this.activeTab === 'geopolitica' 
        ? 'Teóricos de Geopolítica' 
        : 'Teóricos de Relações Internacionais';

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

  /**
   * Carrega o conteúdo de Geopolítica
   */
  private loadGeopolitica(): void {
    this.isLoadingGeopolitica = true;
    this.livroService.loadMarkdownFile(this.geopoliticaPath).subscribe({
      next: (content) => {
        const html = this.livroService.markdownToHtml(content, this.basePath);
        this.geopoliticaHtml = this.sanitizer.bypassSecurityTrustHtml(html);
        this.isLoadingGeopolitica = false;
      },
      error: (error) => {
        console.error('Erro ao carregar arquivo de Geopolítica:', error);
        this.geopoliticaHtml = this.sanitizer.bypassSecurityTrustHtml('<p>Erro ao carregar o conteúdo de Geopolítica.</p>');
        this.isLoadingGeopolitica = false;
      }
    });
  }

  /**
   * Carrega o conteúdo de Relações Internacionais
   */
  private loadRelacoesInternacionais(): void {
    this.isLoadingRelacoesInternacionais = true;
    this.livroService.loadMarkdownFile(this.relacoesInternacionaisPath).subscribe({
      next: (content) => {
        const html = this.livroService.markdownToHtml(content, this.basePath);
        this.relacoesInternacionaisHtml = this.sanitizer.bypassSecurityTrustHtml(html);
        this.isLoadingRelacoesInternacionais = false;
      },
      error: (error) => {
        console.error('Erro ao carregar arquivo de Relações Internacionais:', error);
        this.relacoesInternacionaisHtml = this.sanitizer.bypassSecurityTrustHtml('<p>Erro ao carregar o conteúdo de Relações Internacionais.</p>');
        this.isLoadingRelacoesInternacionais = false;
      }
    });
  }
}
