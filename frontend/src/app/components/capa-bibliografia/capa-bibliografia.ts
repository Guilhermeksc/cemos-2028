import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { LivroIndividualService } from '../../services/livro-individual.service';

@Component({
  selector: 'app-capa-bibliografia',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './capa-bibliografia.html',
  styleUrl: './capa-bibliografia.scss'
})
export class CapaBibliografia implements OnInit {
  @Input() imagePath: string = ''; // Ex: 'assets/content/geopolitica-ri/img/vinganca-geografia.jpg'
  @Input() markdownPath: string = ''; // Ex: 'assets/content/geopolitica-ri/Bibliografia.md'
  @Input() basePath: string = ''; // Ex: 'assets/content/geopolitica-ri'
  
  isLoading: boolean = false;
  htmlContent: SafeHtml = '';
  imageUrl: string = '';

  constructor(
    private livroService: LivroIndividualService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadContent();
  }

  /**
   * Carrega a imagem e o conteúdo Markdown
   */
  private loadContent() {
    this.isLoading = true;
    
    // Define a URL da imagem
    this.imageUrl = this.imagePath ? `/${this.imagePath}` : '';
    
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
    return !!this.imageUrl || !!this.htmlContent;
  }

  /**
   * Trata erro no carregamento da imagem
   */
  onImageError(event: Event) {
    console.error('Erro ao carregar imagem:', this.imageUrl);
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}
