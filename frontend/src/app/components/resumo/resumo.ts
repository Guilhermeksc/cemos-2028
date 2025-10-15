import { Component, Input, OnInit, signal, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ContentService } from '../../services/content.service';

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
  collapsed: boolean;
  hasChildren: boolean;
  parentId?: string;
}

@Component({
  selector: 'app-resumo',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule
  ],
  templateUrl: './resumo.html',
  styleUrl: './resumo.scss'
})
export class Resumo implements OnInit, AfterViewInit {
  @Input() markdownPath = '';
  @Input() title = '';
  @Input() pdfDownloadUrl = '';
  @Input() docxDownloadUrl = '';

  @ViewChild('contentContainer', { static: false }) contentContainer!: ElementRef<HTMLDivElement>;

  htmlContent = signal<string>('');
  isLoading = signal<boolean>(false);
  error = signal<string>('');
  tableOfContents = signal<TableOfContentsItem[]>([]);
  sidenavOpen = signal<boolean>(window.innerWidth > 768);
  isMobile = signal<boolean>(window.innerWidth <= 768);

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    if (this.markdownPath) {
      this.loadContent();
    }
    
    // Listener para mudanças no tamanho da tela
    window.addEventListener('resize', () => {
      const isMobileNow = window.innerWidth <= 768;
      this.isMobile.set(isMobileNow);
      
      if (!isMobileNow) {
        // Em telas grandes, sempre manter a sidebar aberta
        this.sidenavOpen.set(true);
      }
    });
  }

  ngAfterViewInit(): void {
    // Método será chamado após a view ser inicializada
  }

  loadContent(): void {
    this.isLoading.set(true);
    this.error.set('');

    this.contentService.loadMarkdownContent(this.markdownPath).subscribe({
      next: (htmlContent) => {
        this.htmlContent.set(htmlContent);
        this.isLoading.set(false);
        // Gerar índice após carregar o conteúdo
        setTimeout(() => {
          this.generateTableOfContents();
        }, 100);
      },
      error: (err) => {
        console.error('Erro ao carregar conteúdo:', err);
        this.error.set('Erro ao carregar o conteúdo. Tente novamente mais tarde.');
        this.isLoading.set(false);
      }
    });
  }

  downloadPdf(): void {
    if (this.pdfDownloadUrl) {
      const link = document.createElement('a');
      link.href = this.pdfDownloadUrl;
      link.download = `${this.title || 'resumo'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  downloadDocx(): void {
    if (this.docxDownloadUrl) {
      const link = document.createElement('a');
      link.href = this.docxDownloadUrl;
      link.download = `${this.title || 'resumo'}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  generateTableOfContents(): void {
    if (!this.contentContainer) return;

    const headings = this.contentContainer.nativeElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const toc: TableOfContentsItem[] = [];
    const stack: TableOfContentsItem[] = []; // Stack para rastrear a hierarquia

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent?.trim() || '';
      const id = `heading-${index}`;
      
      // Adicionar ID ao elemento para navegação
      heading.id = id;

      // Remover itens do stack que são do mesmo nível ou menor
      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      // Determinar o parentId
      const parentId = stack.length > 0 ? stack[stack.length - 1].id : undefined;
      
      const item: TableOfContentsItem = {
        id,
        text,
        level,
        collapsed: level >= 3, // Colapsar itens de nível 3 ou superior por padrão
        hasChildren: false, // Será atualizado depois
        parentId
      };

      toc.push(item);
      stack.push(item);
    });

    // Atualizar hasChildren para cada item
    toc.forEach(item => {
      item.hasChildren = toc.some(otherItem => otherItem.parentId === item.id);
    });

    this.tableOfContents.set(toc);
  }

  scrollToHeading(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      // Fechar sidebar apenas em dispositivos móveis após navegação
      if (this.isMobile()) {
        this.sidenavOpen.set(false);
      }
    }
  }

  onItemClick(item: TableOfContentsItem): void {
    // Se o item tem filhos, faz toggle
    if (item.hasChildren) {
      this.toggleCollapse(item);
    } else {
      // Se não tem filhos, navega para a seção
      this.scrollToHeading(item.id);
    }
  }

  toggleSidebar(): void {
    // Toggle apenas funciona em dispositivos móveis
    if (this.isMobile()) {
      this.sidenavOpen.set(!this.sidenavOpen());
    }
  }

  toggleSidenav(): void {
    // Função para toggle que funciona tanto em mobile quanto desktop
    this.sidenavOpen.set(!this.sidenavOpen());
  }

  getSidenavMode(): 'side' | 'over' {
    return this.isMobile() ? 'over' : 'side';
  }

  getHeadingIndentation(level: number): string {
    return `${(level - 1) * 20}px`;
  }

  toggleCollapse(item: TableOfContentsItem): void {
    // Atualiza o estado de colapso do item
    const currentToc = this.tableOfContents();
    const updatedToc = currentToc.map(tocItem => {
      if (tocItem.id === item.id) {
        return { ...tocItem, collapsed: !tocItem.collapsed };
      }
      return tocItem;
    });
    this.tableOfContents.set(updatedToc);
  }

  isItemVisible(item: TableOfContentsItem): boolean {
    // Níveis 1 e 2 sempre visíveis
    if (item.level <= 2) {
      return true;
    }

    // Para níveis 3+, verificar se todos os ancestrais estão expandidos
    const currentToc = this.tableOfContents();
    let currentParentId = item.parentId;
    
    while (currentParentId) {
      const parent = currentToc.find(tocItem => tocItem.id === currentParentId);
      if (parent && parent.collapsed) {
        return false;
      }
      currentParentId = parent?.parentId;
    }
    
    return true;
  }

  getVisibleItems(): TableOfContentsItem[] {
    return this.tableOfContents().filter(item => this.isItemVisible(item));
  }
}
