import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LivroIndividualService } from '../../services/livro-individual.service';
import { MarkdownFile, MarkdownHeading } from '../../interfaces/livro-individual.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-livro-individual',
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './livro-individual.html',
  styleUrl: './livro-individual.scss'
})
export class LivroIndividual implements OnInit, OnDestroy {
  @Input() contentPath: string = 'assets/content'; // Pasta base dos arquivos MD
  @Input() fileNames: string[] = []; // Lista de arquivos MD a carregar
  @Input() backRoute: string = ''; // Rota de volta (ex: '/home/app6-geopolitica-relacoes-internacionais/bibliografia')
  @Input() backLabel: string = 'Bibliografia'; // Label do botão de voltar

  isLoading: boolean = false;
  isFullscreen: boolean = false;
  leftMenuOpen: boolean = false;
  rightMenuOpen: boolean = false;
  
  markdownFiles: MarkdownFile[] = [];
  selectedFile: MarkdownFile | null = null;
  headings: MarkdownHeading[] = [];
  htmlContent: SafeHtml = '';
  
  private destroy$ = new Subject<void>();

  /**
   * Adiciona interatividade de zoom nas imagens após renderização do HTML
   */
  private enableImageZoom() {
    setTimeout(() => {
      // Buscar tanto no conteúdo normal quanto no fullscreen
      const wrappers = document.querySelectorAll('.content-wrapper');
      wrappers.forEach(wrapper => {
        const imgs = wrapper.querySelectorAll('img');
        imgs.forEach(img => {
          // Verifica se já tem listener (evita duplicar)
          if ((img as any).hasZoomListener) {
            return;
          }
          
          // Marca como tendo listener
          (img as any).hasZoomListener = true;
          
          // Adiciona listener
          img.addEventListener('click', function () {
            if (img.classList.contains('zoomed')) {
              img.classList.remove('zoomed');
            } else {
              // Remove zoom de outras imagens no mesmo wrapper
              wrapper.querySelectorAll('img.zoomed').forEach(other => {
                other.classList.remove('zoomed');
              });
              img.classList.add('zoomed');
            }
          });
        });
      });
    }, 200);
  }
  
  expandedHeadings: Set<string> = new Set();

  constructor(
    private livroService: LivroIndividualService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.fileNames.length > 0) {
      this.loadFiles();
    }
    
    // Escutar eventos de fullscreen para sincronizar o estado
    this.setupFullscreenListeners();
    
    // Escutar tecla ESC para sair do fullscreen
    document.addEventListener('keydown', this.handleKeyDown);
  }

  ngOnDestroy() {
    // Garantir que saia do fullscreen ao destruir o componente
    if (this.isFullscreen) {
      this.exitFullscreen();
    }
    // Garantir que o overflow do body seja restaurado ao destruir o componente
    document.body.style.overflow = '';
    document.body.classList.remove('livro-fullscreen-active');
    this.removeFullscreenListeners();
    document.removeEventListener('keydown', this.handleKeyDown);
    this.destroy$.next();
    this.destroy$.complete();
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

    // Ativa zoom nas imagens após renderização
    this.enableImageZoom();
    
    // Fecha menus no mobile após seleção
    this.closeMenusOnMobile();
  }


  /**
   * Navega de volta para a rota especificada
   */
  navigateBack() {
    if (this.backRoute) {
      const pathSegments = this.backRoute.startsWith('/') 
        ? this.backRoute.substring(1).split('/')
        : this.backRoute.split('/');
      
      this.router.navigate(pathSegments);
    }
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
    
    // Fecha menu direito no mobile após navegação
    this.closeMenusOnMobile();
  }

  /**
   * Alterna a visibilidade do menu esquerdo
   */
  toggleLeftMenu() {
    this.leftMenuOpen = !this.leftMenuOpen;
    if (this.leftMenuOpen) {
      this.rightMenuOpen = false; // Fecha o outro menu
    }
  }

  /**
   * Alterna a visibilidade do menu direito
   */
  toggleRightMenu() {
    this.rightMenuOpen = !this.rightMenuOpen;
    if (this.rightMenuOpen) {
      this.leftMenuOpen = false; // Fecha o outro menu
    }
  }

  /**
   * Fecha ambos os menus no mobile
   */
  closeMenusOnMobile() {
    if (window.innerWidth <= 768) {
      this.leftMenuOpen = false;
      this.rightMenuOpen = false;
    }
  }

  /**
   * Fecha menus ao clicar no overlay
   */
  closeMenusOnOverlayClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('menu-overlay')) {
      this.closeMenusOnMobile();
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

  /**
   * Configura listeners para eventos de fullscreen
   */
  private setupFullscreenListeners() {
    document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange);
  }

  /**
   * Remove listeners de fullscreen
   */
  private removeFullscreenListeners() {
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange);
  }

  /**
   * Handler para mudanças no estado de fullscreen
   */
  private handleFullscreenChange = () => {
    const isCurrentlyFullscreen = !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    );

    if (!isCurrentlyFullscreen && this.isFullscreen) {
      // Sincronizar estado se o usuário saiu do fullscreen via ESC ou outro método
      this.isFullscreen = false;
      document.body.style.overflow = '';
      document.body.classList.remove('livro-fullscreen-active');
      
      // Restaurar z-index dos sidenavs
      const sidenavs = document.querySelectorAll('.mat-sidenav, .mat-drawer, mat-sidenav, mat-drawer, .mat-sidenav-container, .mat-drawer-container');
      sidenavs.forEach((el: Element) => {
        (el as HTMLElement).style.zIndex = '';
        (el as HTMLElement).style.pointerEvents = '';
      });
      
      console.log('🖥️ Fullscreen desativado (via evento)');
    }
  }

  /**
   * Handler para tecla ESC
   */
  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.isFullscreen) {
      this.exitFullscreen();
    }
  }

  /**
   * Abre o modo fullscreen usando a API do navegador
   */
  async openFullscreen() {
    if (!this.selectedFile) {
      return;
    }

    const element = document.documentElement;

    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        // Safari
        await (element as any).webkitRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        // Firefox
        await (element as any).mozRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        // IE/Edge
        await (element as any).msRequestFullscreen();
      } else {
        console.warn('⚠️ Fullscreen API não suportada neste navegador');
        // Fallback para overlay se a API não estiver disponível
        this.isFullscreen = true;
        document.body.style.overflow = 'hidden';
        document.body.classList.add('livro-fullscreen-active');
        
        // Forçar z-index baixo em todos os sidenavs do Angular Material
        setTimeout(() => {
          const sidenavs = document.querySelectorAll('.mat-sidenav, .mat-drawer, mat-sidenav, mat-drawer, .mat-sidenav-container, .mat-drawer-container');
          sidenavs.forEach((el: Element) => {
            (el as HTMLElement).style.zIndex = '1';
            (el as HTMLElement).style.pointerEvents = 'none';
          });
          
          // Garantir que o overlay tenha z-index máximo
          const overlay = document.querySelector('.fullscreen-overlay');
          if (overlay) {
            (overlay as HTMLElement).style.zIndex = '2147483647';
            (overlay as HTMLElement).style.pointerEvents = 'auto';
          }
        }, 0);
        return;
      }

      this.isFullscreen = true;
      document.body.style.overflow = 'hidden';
      // Adicionar classe ao body para aplicar estilos globais
      document.body.classList.add('livro-fullscreen-active');
      
      // Forçar z-index baixo em todos os sidenavs do Angular Material
      setTimeout(() => {
        const sidenavs = document.querySelectorAll('.mat-sidenav, .mat-drawer, mat-sidenav, mat-drawer, .mat-sidenav-container, .mat-drawer-container');
        sidenavs.forEach((el: Element) => {
          (el as HTMLElement).style.zIndex = '1';
          (el as HTMLElement).style.pointerEvents = 'none';
        });
        
        // Garantir que o overlay tenha z-index máximo
        const overlay = document.querySelector('.fullscreen-overlay');
        if (overlay) {
          (overlay as HTMLElement).style.zIndex = '2147483647';
          (overlay as HTMLElement).style.pointerEvents = 'auto';
        }
      }, 0);
      
      // Reativar zoom nas imagens após entrar em fullscreen
      setTimeout(() => {
        this.enableImageZoom();
      }, 200);
      
      console.log('🖥️ Modo fullscreen ativado');
    } catch (error) {
      console.error('❌ Erro ao entrar em fullscreen:', error);
      // Fallback para overlay em caso de erro
      this.isFullscreen = true;
      document.body.style.overflow = 'hidden';
      document.body.classList.add('livro-fullscreen-active');
      
      // Forçar z-index baixo em todos os sidenavs do Angular Material
      setTimeout(() => {
        const sidenavs = document.querySelectorAll('.mat-sidenav, .mat-drawer, mat-sidenav, mat-drawer, .mat-sidenav-container, .mat-drawer-container');
        sidenavs.forEach((el: Element) => {
          (el as HTMLElement).style.zIndex = '1';
          (el as HTMLElement).style.pointerEvents = 'none';
        });
        
        // Garantir que o overlay tenha z-index máximo
        const overlay = document.querySelector('.fullscreen-overlay');
        if (overlay) {
          (overlay as HTMLElement).style.zIndex = '2147483647';
          (overlay as HTMLElement).style.pointerEvents = 'auto';
        }
      }, 0);
    }
  }

  /**
   * Fecha o modo fullscreen
   */
  async closeFullscreen() {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        // Safari
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        // Firefox
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        // IE/Edge
        await (document as any).msExitFullscreen();
      } else {
        // Fallback se não houver API
        this.isFullscreen = false;
        document.body.style.overflow = '';
        document.body.classList.remove('livro-fullscreen-active');
        
        // Restaurar z-index dos sidenavs
        const sidenavs = document.querySelectorAll('.mat-sidenav, .mat-drawer, mat-sidenav, mat-drawer, .mat-sidenav-container, .mat-drawer-container');
        sidenavs.forEach((el: Element) => {
          (el as HTMLElement).style.zIndex = '';
          (el as HTMLElement).style.pointerEvents = '';
        });
        return;
      }

      // O estado será atualizado pelo listener de eventos
    } catch (error) {
      console.error('❌ Erro ao sair do fullscreen:', error);
      // Forçar saída mesmo em caso de erro
      this.isFullscreen = false;
      document.body.style.overflow = '';
      document.body.classList.remove('livro-fullscreen-active');
      
      // Restaurar z-index dos sidenavs
      const sidenavs = document.querySelectorAll('.mat-sidenav, .mat-drawer, mat-sidenav, mat-drawer, .mat-sidenav-container, .mat-drawer-container');
      sidenavs.forEach((el: Element) => {
        (el as HTMLElement).style.zIndex = '';
        (el as HTMLElement).style.pointerEvents = '';
      });
    }
  }

  /**
   * Alias para closeFullscreen (usado no template)
   */
  exitFullscreen() {
    this.closeFullscreen();
  }

  /**
   * Verifica se está em modo mobile
   */
  isMobile(): boolean {
    return window.innerWidth <= 768;
  }
}
