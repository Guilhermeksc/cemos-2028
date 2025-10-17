import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LivroIndividualService } from '../../services/livro-individual.service';
import { MarkdownFile, MarkdownHeading } from '../../interfaces/livro-individual.interface';

@Component({
  selector: 'app-livro-individual',
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './livro-individual.html',
  styleUrl: './livro-individual.scss'
})
export class LivroIndividual implements OnInit {
  @Input() contentPath: string = 'assets/content'; // Pasta base dos arquivos MD
  @Input() fileNames: string[] = []; // Lista de arquivos MD a carregar

  isMenuCollapsed: boolean = false;
  isLoading: boolean = false;
  
  markdownFiles: MarkdownFile[] = [];
  selectedFile: MarkdownFile | null = null;
  headings: MarkdownHeading[] = [];
  htmlContent: SafeHtml = '';
  
  expandedHeadings: Set<string> = new Set();

  constructor(
    private livroService: LivroIndividualService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    if (this.fileNames.length > 0) {
      this.loadFiles();
    }
  }

  /**
   * Carrega todos os arquivos Markdown
   */
  loadFiles() {
    this.isLoading = true;
    this.livroService.loadMarkdownFiles(this.contentPath, this.fileNames).subscribe({
      next: (files) => {
        this.markdownFiles = files;
        if (files.length > 0) {
          this.selectFile(files[0]);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar arquivos:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Seleciona um arquivo para visualização
   */
  selectFile(file: MarkdownFile) {
    this.selectedFile = file;
    this.headings = this.livroService.parseMarkdownHeadings(file.content);
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(
      this.livroService.markdownToHtml(file.content, file.basePath)
    );
    
    // Expande apenas os headings de nível 1
    this.expandedHeadings.clear();
    this.headings.forEach(h => {
      if (h.level === 1) {
        this.expandedHeadings.add(h.id);
      }
    });
  }

  /**
   * Alterna o menu lateral
   */
  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  /**
   * Navega para uma seção específica
   */
  scrollToSection(headingId: string) {
    setTimeout(() => {
      const element = document.getElementById(headingId);
      const contentArea = document.querySelector('.content-area');
      
      if (element && contentArea) {
        // Scroll dentro do container .content-area
        const elementTop = element.offsetTop;
        contentArea.scrollTo({
          top: elementTop - 20, // 20px de offset
          behavior: 'smooth'
        });
      } else if (element) {
        // Fallback: scroll da página inteira
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.warn('Elemento não encontrado:', headingId);
      }
    }, 100);
  }

  /**
   * Alterna a expansão de um heading
   */
  toggleHeading(heading: MarkdownHeading, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    // Se for nível 1 ou 2, permite expandir/colapsar
    if (heading.level <= 2 && heading.children && heading.children.length > 0) {
      if (this.expandedHeadings.has(heading.id)) {
        this.expandedHeadings.delete(heading.id);
        // Colapsa todos os filhos também
        this.collapseChildren(heading);
      } else {
        // Se for nível 2, colapsa outros irmãos do mesmo pai
        if (heading.level === 2) {
          this.collapseLevel2Siblings(heading);
        }
        this.expandedHeadings.add(heading.id);
      }
    } else {
      // Se não tem filhos ou é nível 3, apenas rola para a seção
      this.scrollToSection(heading.id);
    }
  }

  /**
   * Colapsa todos os filhos de um heading
   */
  private collapseChildren(heading: MarkdownHeading) {
    if (heading.children) {
      heading.children.forEach(child => {
        this.expandedHeadings.delete(child.id);
        this.collapseChildren(child);
      });
    }
  }

  /**
   * Colapsa os irmãos de nível 2 (apenas um subnível aberto por vez)
   */
  private collapseLevel2Siblings(selectedHeading: MarkdownHeading) {
    this.headings.forEach(h1 => {
      if (h1.children) {
        h1.children.forEach(h2 => {
          if (h2.id !== selectedHeading.id && h2.level === 2) {
            this.expandedHeadings.delete(h2.id);
            this.collapseChildren(h2);
          }
        });
      }
    });
  }

  /**
   * Verifica se um heading está expandido
   */
  isExpanded(heading: MarkdownHeading): boolean {
    return this.expandedHeadings.has(heading.id);
  }

  /**
   * Navega e rola para a seção
   */
  navigateToHeading(heading: MarkdownHeading, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    
    // Se tem filhos e está expandido, apenas colapsa
    if (heading.children && heading.children.length > 0 && this.isExpanded(heading)) {
      this.toggleHeading(heading);
    } else if (heading.children && heading.children.length > 0 && !this.isExpanded(heading)) {
      // Se tem filhos e não está expandido, expande
      this.toggleHeading(heading);
      // Após expandir, rola para a seção
      setTimeout(() => this.scrollToSection(heading.id), 100);
    } else {
      // Se não tem filhos, apenas rola
      this.scrollToSection(heading.id);
    }
  }

  /**
   * Retorna o ícone apropriado para o heading
   */
  getHeadingIcon(heading: MarkdownHeading): string {
    if (!heading.children || heading.children.length === 0) {
      return 'article';
    }
    return this.isExpanded(heading) ? 'expand_more' : 'chevron_right';
  }
}
