import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LivroIndividualService } from '../../services/livro-individual.service';
import { CapaConfig } from '../../interfaces/capa-config.interface';

// Re-exporta a interface para facilitar importações
export type { CapaConfig } from '../../interfaces/capa-config.interface';

@Component({
  selector: 'app-capa-bibliografia',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './capa-bibliografia.html',
  styleUrl: './capa-bibliografia.scss'
})
export class CapaBibliografia implements OnInit {
  // Caminhos parametrizáveis para navegação
  @Input() conceitosPath: string = '';
  @Input() flashcardsPath: string = '';
  @Input() mediaPath: string = '';
  @Input() perguntasPath: string = '';

  get showNavigationButtons(): boolean {
    return true;
  }

  /**
   * Navega para um caminho parametrizável
   */
  navigateTo(path: string): void {
    if (path) {
      const segments = path.startsWith('/') ? path.substring(1).split('/') : path.split('/');
      this.router.navigate(segments);
    }
  }
  // Novas propriedades para múltiplas capas
  @Input() capas: CapaConfig[] = []; // Array de capas com imagem e rota
  
  // Propriedades antigas (mantidas para compatibilidade)
  @Input() imagePath: string = ''; // Ex: 'assets/content/geopolitica-ri/img/vinganca-geografia.jpg'
  @Input() markdownPath: string = ''; // Ex: 'assets/content/geopolitica-ri/Bibliografia.md'
  @Input() basePath: string = ''; // Ex: 'assets/content/geopolitica-ri'
  
  isLoading: boolean = false;
  htmlContent: SafeHtml = '';
  
  // Modo de operação: 'single' (uma capa com markdown) ou 'multiple' (várias capas clicáveis)
  displayMode: 'single' | 'multiple' = 'single';

  constructor(
    private livroService: LivroIndividualService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  /**
   * Navega para a página Home
   */
  navigateHome(): void {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    // Determina o modo de operação
    this.displayMode = this.capas.length > 0 ? 'multiple' : 'single';
    
    if (this.displayMode === 'single') {
      this.loadContent();
    } else {
      this.loadMarkdownContent();
    }
  }

  /**
   * Carrega a imagem e o conteúdo Markdown (modo single)
   */
  private loadContent() {
    this.isLoading = true;
    
    // Carrega o arquivo Markdown se fornecido
    if (this.markdownPath) {
      this.livroService.loadMarkdownFile(this.markdownPath).subscribe({
        next: (content) => {
          // Converte Markdown para HTML com processamento de imagens
          const html = this.livroService.markdownToHtml(
            content, 
            this.basePath || this.extractBasePath(this.markdownPath)
          );
          this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar arquivo Markdown:', error);
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
  }

  /**
   * Carrega apenas o conteúdo Markdown (modo multiple)
   */
  private loadMarkdownContent() {
    if (this.markdownPath) {
      this.isLoading = true;
      this.livroService.loadMarkdownFile(this.markdownPath).subscribe({
        next: (content) => {
          const html = this.livroService.markdownToHtml(
            content, 
            this.basePath || this.extractBasePath(this.markdownPath)
          );
          this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar arquivo Markdown:', error);
          this.isLoading = false;
        }
      });
    }
  }

  /**
   * Extrai o basePath do markdownPath
   */
  private extractBasePath(markdownPath: string): string {
    const lastSlashIndex = markdownPath.lastIndexOf('/');
    return lastSlashIndex > 0 ? markdownPath.substring(0, lastSlashIndex) : '';
  }

  /**
   * Verifica se há conteúdo para exibir
   */
  get hasContent(): boolean {
    if (this.displayMode === 'multiple') {
      return this.capas.length > 0 || !!this.htmlContent;
    }
    return !!this.imagePath || !!this.htmlContent;
  }

  /**
   * Retorna a URL completa da imagem
   */
  getImageUrl(imagePath: string): string {
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  }

  /**
   * Navega para a rota especificada ao clicar na capa
   */
  navigateToCapa(capa: CapaConfig) {
    if (capa.routePath) {
      console.log('Navegando para:', capa.routePath);
      
      // Remove a barra inicial se existir e divide o path em segmentos
      const pathSegments = capa.routePath.startsWith('/') 
        ? capa.routePath.substring(1).split('/')
        : capa.routePath.split('/');
      
      console.log('Segmentos do path:', pathSegments);
      
      // Navega usando os segmentos do path
      this.router.navigate(pathSegments).then(success => {
        if (success) {
          console.log('✅ Navegação bem-sucedida para:', capa.routePath);
        } else {
          console.error('❌ Falha ao navegar para:', capa.routePath);
          console.error('Verifique se a rota existe no arquivo de rotas');
        }
      }).catch(error => {
        console.error('❌ Erro durante navegação:', error);
      });
    } else {
      console.warn('⚠️ CapaConfig sem routePath definido:', capa);
    }
  }

  /**
   * Trata erro no carregamento da imagem
   */
  onImageError(event: Event, imagePath?: string) {
    console.error('Erro ao carregar imagem:', imagePath);
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}
