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
  isGeneratingPDF: boolean = false;
  
  markdownFiles: MarkdownFile[] = [];
  selectedFile: MarkdownFile | null = null;
  headings: MarkdownHeading[] = [];
  htmlContent: SafeHtml = '';
  
  private destroy$ = new Subject<void>();

  /**
   * Adiciona interatividade de zoom nas imagens após renderização do HTML
   * E garante que as imagens sejam dimensionadas corretamente
   */
  private enableImageZoom() {
    setTimeout(() => {
      // Buscar tanto no conteúdo normal quanto no fullscreen
      const wrappers = document.querySelectorAll('.content-wrapper');
      wrappers.forEach(wrapper => {
        const imgs = wrapper.querySelectorAll('img');
        imgs.forEach(img => {
          // Garante que a imagem seja dimensionada corretamente
          this.adjustImageSize(img as HTMLImageElement);
          
          // Adiciona listener para ajustar tamanho quando a imagem carregar
          if (!img.complete) {
            img.addEventListener('load', () => {
              this.adjustImageSize(img as HTMLImageElement);
            });
          }
          
          // Verifica se já tem listener (evita duplicar)
          if ((img as any).hasZoomListener) {
            return;
          }
          
          // Marca como tendo listener
          (img as any).hasZoomListener = true;
          
          // Adiciona listener de zoom
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

  /**
   * Ajusta o tamanho da imagem para garantir que não ultrapasse o container
   */
  private adjustImageSize(img: HTMLImageElement) {
    const wrapper = img.closest('.content-wrapper') as HTMLElement;
    if (!wrapper) return;
    
    const wrapperWidth = wrapper.clientWidth;
    const wrapperPadding = 120; // 60px de cada lado no desktop
    const maxAvailableWidth = wrapperWidth - wrapperPadding;
    
    // Garante que a imagem não ultrapasse a largura disponível
    if (img.naturalWidth > maxAvailableWidth) {
      img.style.maxWidth = '100%';
      img.style.width = 'auto';
      img.style.height = 'auto';
    }
    
    // Garante que a imagem tenha object-fit: contain
    if (!img.style.objectFit) {
      img.style.objectFit = 'contain';
    }
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
   * Filtra headings para mostrar apenas até o nível 2 (##)
   * Remove headings de nível 3 (###) ou superior
   */
  private filterHeadingsToLevel2(headings: MarkdownHeading[]): MarkdownHeading[] {
    return headings.map(h1 => {
      const filteredH1 = { ...h1 };
      if (filteredH1.children) {
        // Mantém apenas os filhos de nível 2, removendo os de nível 3 ou superior
        filteredH1.children = filteredH1.children
          .filter(h2 => h2.level === 2)
          .map(h2 => {
            // Remove os children de H2 (que seriam H3)
            const filteredH2 = { ...h2 };
            filteredH2.children = [];
            return filteredH2;
          });
      }
      return filteredH1;
    });
  }

  /**
   * Seleciona um arquivo para visualização
   */
  selectFile(file: MarkdownFile) {
    this.selectedFile = file;
    const allHeadings = this.livroService.parseMarkdownHeadings(file.content);
    // Filtra para mostrar apenas até o nível 2 (##)
    this.headings = this.filterHeadingsToLevel2(allHeadings);
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
    
    // Scroll para o topo quando trocar de arquivo
    setTimeout(() => {
      const scrollContainer = this.isFullscreen 
        ? document.querySelector('.fullscreen-content') as HTMLElement
        : document.querySelector('.content-area') as HTMLElement;
      
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: 'auto' });
      }
    }, 100);
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
    console.log('🔍 [scrollToSection] Iniciando scroll para:', headingId);
    
    // Função auxiliar para tentar fazer scroll
    const attemptScroll = (retries: number = 0) => {
      console.log(`🔍 [scrollToSection] Tentativa ${retries + 1}/10`);
      
      // Busca o elemento pelo ID - tenta múltiplas formas
      let element: HTMLElement | null = null;
      
      // 1. Busca globalmente
      element = document.getElementById(headingId);
      
      // 2. Se não encontrou, busca dentro do content-wrapper
      if (!element) {
        const contentWrapper = document.querySelector('.content-wrapper');
        if (contentWrapper) {
          element = contentWrapper.querySelector(`#${headingId}`) as HTMLElement;
        }
      }
      
      // 3. Se ainda não encontrou, busca por todos os headings e compara texto
      if (!element) {
        const allHeadings = document.querySelectorAll('h1, h2, h3');
        allHeadings.forEach((h) => {
          if (h.id === headingId) {
            element = h as HTMLElement;
          }
        });
      }
      
      if (!element) {
        // Lista todos os IDs de headings disponíveis para debug
        const allHeadings = document.querySelectorAll('h1[id], h2[id], h3[id]');
        const headingIds = Array.from(allHeadings).map(h => ({ id: h.id, text: h.textContent?.substring(0, 50) }));
        console.log('❌ [scrollToSection] Elemento não encontrado:', headingId);
        console.log('📋 [scrollToSection] Headings disponíveis:', headingIds);
        
        if (retries < 10) {
          setTimeout(() => attemptScroll(retries + 1), 200);
          return;
        }
        console.error('❌ [scrollToSection] Falha após 10 tentativas:', headingId);
        return;
      }

      console.log('✅ [scrollToSection] Elemento encontrado:', {
        tag: element.tagName,
        id: element.id,
        text: element.textContent?.substring(0, 50)
      });

      // Encontra o container de scroll correto
      // O scroll real está em .markdown-content (não em .content-area)
      let scrollContainer: HTMLElement | null = null;
      
      if (this.isFullscreen) {
        scrollContainer = document.querySelector('.fullscreen-content') as HTMLElement;
      } else {
        // Primeiro tenta encontrar .markdown-content (onde o scroll realmente acontece)
        scrollContainer = document.querySelector('.markdown-content') as HTMLElement;
        // Fallback para .content-area se não encontrar
        if (!scrollContainer) {
          scrollContainer = document.querySelector('.content-area') as HTMLElement;
        }
      }
      
      console.log('📦 [scrollToSection] Container encontrado:', {
        isFullscreen: this.isFullscreen,
        container: scrollContainer?.className,
        scrollTop: scrollContainer?.scrollTop,
        scrollHeight: scrollContainer?.scrollHeight,
        clientHeight: scrollContainer?.clientHeight
      });

      if (!scrollContainer) {
        console.warn('⚠️ [scrollToSection] Container não encontrado, usando scrollIntoView');
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
        return;
      }

      // Usa scrollIntoView com o container como referência
      // Primeiro, temporariamente faz o elemento ser filho direto do container para scrollIntoView funcionar
      // Mas na verdade, vamos usar uma abordagem diferente
      
      // Calcula usando getBoundingClientRect que é mais confiável
      const containerRect = scrollContainer.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      
      // Posição atual do scroll
      const currentScrollTop = scrollContainer.scrollTop;
      
      // Distância do elemento até o topo visível do container
      const distanceFromContainerTop = elementRect.top - containerRect.top;
      
      // Nova posição de scroll = posição atual + distância - offset
      const offset = 30;
      const newScrollTop = currentScrollTop + distanceFromContainerTop - offset;
      
      console.log('📊 [scrollToSection] Dados de scroll:', {
        currentScrollTop,
        distanceFromContainerTop,
        newScrollTop,
        containerScrollHeight: scrollContainer.scrollHeight,
        containerClientHeight: scrollContainer.clientHeight,
        elementRectTop: elementRect.top,
        containerRectTop: containerRect.top
      });
      
      // Garante que não ultrapasse os limites
      const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      const finalScrollTop = Math.max(0, Math.min(newScrollTop, maxScroll));
      
      // Faz o scroll
      scrollContainer.scrollTo({
        top: finalScrollTop,
        behavior: 'smooth'
      });
      
      console.log('✅ [scrollToSection] Scroll executado para:', finalScrollTop);
    };

    // Inicia após delay para garantir renderização
    setTimeout(() => attemptScroll(), 300);
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
      event.preventDefault();
    }
    
    console.log('🎯 Navegando para heading:', heading);
    console.log('🎯 Heading ID:', heading.id);
    console.log('🎯 Heading Title:', heading.title);
    console.log('🎯 Heading Level:', heading.level);
    
    // Se tem filhos e está expandido, apenas colapsa
    if (heading.children && heading.children.length > 0 && this.isExpanded(heading)) {
      this.toggleHeading(heading);
      // Mesmo ao colapsar, pode querer rolar para a seção
      setTimeout(() => this.scrollToSection(heading.id), 100);
    } else if (heading.children && heading.children.length > 0 && !this.isExpanded(heading)) {
      // Se tem filhos e não está expandido, expande
      this.toggleHeading(heading);
      // Após expandir, rola para a seção
      setTimeout(() => {
        console.log('⏱️ Após expandir, fazendo scroll para:', heading.id);
        this.scrollToSection(heading.id);
      }, 300);
    } else {
      // Se não tem filhos, apenas rola
      console.log('📌 Fazendo scroll direto para:', heading.id);
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
   * Fecha ambos os menus no mobile/tablet
   */
  closeMenusOnMobile() {
    if (window.innerWidth <= 1024) {
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
   * Verifica se está em modo mobile/tablet
   */
  isMobile(): boolean {
    return window.innerWidth <= 1024;
  }

  /**
   * Converte o conteúdo markdown para PDF pesquisável e faz o download
   * Usa método que extrai texto do HTML para garantir que seja pesquisável
   */
  async downloadAsPDF() {
    if (!this.selectedFile) {
      return;
    }

    this.isGeneratingPDF = true;

    try {
      // Usa o método que gera PDF realmente pesquisável (com texto extraído)
      await this.downloadAsPDFSearchable();
    } catch (error) {
      console.error('❌ Erro ao gerar PDF pesquisável:', error);
      alert('Erro ao gerar PDF. Por favor, tente novamente.');
    } finally {
      this.isGeneratingPDF = false;
    }
  }

  /**
   * Gera PDF pesquisável extraindo texto e estrutura do HTML
   * Preserva estilos inline (negrito, itálico) e trata emojis corretamente
   */
  private async downloadAsPDFSearchable() {
    if (!this.selectedFile) {
      return;
    }

    const jsPDF = (await import('jspdf')).default;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const contentWrapper = document.querySelector('.content-wrapper') as HTMLElement;
    if (!contentWrapper) {
      throw new Error('Elemento .content-wrapper não encontrado');
    }

    // Configurações de página
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const margin = 10; // Margem reduzida para ocupar mais espaço nas bordas
    const maxWidth = pageWidth - (margin * 2);
    let y = margin;
    
    // Interface para representar texto com estilo
    interface TextSegment {
      text: string;
      bold: boolean;
      italic: boolean;
    }
    
    // Converte emojis para texto alternativo legível no PDF
    // O jsPDF não suporta bem emojis Unicode, então convertemos para texto
    const convertEmojisToText = (text: string): string => {
      let converted = text;
      
      // Converte emojis específicos conhecidos (ordem importa - mais específicos primeiro)
      // Usa array de tuplas para evitar problemas com chaves duplicadas
      const emojiReplacements: Array<[string, string]> = [
        // Quadrados e formas (com variation selector primeiro)
        ['▪️', '-'],
        ['▫️', '-'],
        ['⬛', '-'],
        ['⬜', '-'],
        ['🔲', '-'],
        ['🔳', '-'],
        ['▪', '-'], // Sem variation selector
        ['▫', '-'], // Sem variation selector
        
        // Check marks e aprovação
        ['✅', '☑'],
        ['✔️', '✔'],
        ['☑️', '☑'],
        ['✔', '✔'],
        ['☑', '☑'],
        ['✓', '✓'],
        
        // Interrogação e dúvida
        ['❓', ''],
        ['❔', ''],
        
        // Exclamação e aviso
        ['⚠️', ''],
        ['❗', '[!]'],
        ['❕', '[!]'],
        ['⚠', '[!]'], // Sem variation selector
        
        // Lâmpada e ideias
        ['💡', ''],
        
        // Documentos e notas
        ['📌', '-'],
        ['📝', '[NOTA]'],
        ['📋', '[CLIP]'],
        ['📄', '[DOC]'],
        ['📑', '[MARCA]'],
        
        // Busca e pesquisa
        ['🔍', '[Lupa]'],
        ['🔎', '[Lupa]'],
        
        // Estrelas
        ['⭐', '[★]'],
        ['🌟', '[★]'],
        ['★', '★'],
        ['☆', '☆'],
        ['✩', '✩'],
        ['✪', '✪'],
        
        // Setas
        ['→', '→'],
        ['←', '←'],
        ['↑', '↑'],
        ['↓', '↓'],
        ['⇒', '⇒'],
        ['⇐', '⇐'],
        ['⇑', '⇑'],
        ['⇓', '⇓'],
        
        // Bullets e pontos
        ['•', '•'],
        ['·', '·'],
        ['◦', '◦'],
        
        // Traços e pontuação
        ['—', '—'],
        ['–', '–'],
        ['…', '...'],
      ];
      
      // Aplica substituições (ordena por tamanho decrescente para evitar substituições parciais)
      emojiReplacements
        .sort((a, b) => b[0].length - a[0].length)
        .forEach(([emoji, replacement]) => {
          const escapedEmoji = emoji.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(escapedEmoji, 'g');
          converted = converted.replace(regex, replacement);
        });
      
      // Remove outros emojis Unicode que não foram mapeados
      // Mas preserva caracteres especiais comuns como acentos, símbolos matemáticos, etc.
      converted = converted
        .replace(/[\u{1F300}-\u{1F9FF}]/gu, '') // Emojis gerais (não mapeados)
        .replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Emoticons (não mapeados)
        .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Transporte e símbolos (não mapeados)
        .replace(/[\u{1F900}-\u{1F9FF}]/gu, '') // Suplemento de emojis (não mapeados)
        .replace(/[\u{1FA00}-\u{1FAFF}]/gu, '') // Suplemento estendido (não mapeados)
        .replace(/[\u{FE00}-\u{FE0F}]/gu, '') // Variation selectors
        .replace(/[\u{200D}]/gu, '') // Zero width joiner
        .replace(/[\u{FE0F}]/gu, ''); // Variation selector-16
      
      // Normaliza espaços múltiplos consecutivos
      converted = converted.replace(/[ \t]+/g, ' ');
      
      return converted;
    };
    
    // Alias para manter compatibilidade com código existente
    const removeEmojis = convertEmojisToText;
    
    // Extrai texto com estilos de um elemento
    const extractTextWithStyles = (element: HTMLElement): TextSegment[] => {
      const segments: TextSegment[] = [];
      
      const processNode = (node: Node, bold: boolean = false, italic: boolean = false) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || '';
          if (text.length > 0) {
            // Preserva emojis e normaliza espaços
            // Não fazemos trim() aqui para preservar espaços no início/fim que podem ser importantes
            const cleanText = removeEmojis(text);
            // Adiciona se houver conteúdo (incluindo emojis)
            if (cleanText.trim().length > 0 || text.trim().length > 0) {
              segments.push({ text: cleanText, bold, italic });
            }
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          const tagName = el.tagName.toLowerCase();
          
          let newBold = bold;
          let newItalic = italic;
          
          if (tagName === 'strong' || tagName === 'b') {
            newBold = true;
          } else if (tagName === 'em' || tagName === 'i') {
            newItalic = true;
          }
          // Ignora tags <u> (sublinhado) - jsPDF não suporta nativamente
          
          // Processa filhos
          Array.from(el.childNodes).forEach(child => {
            processNode(child, newBold, newItalic);
          });
        }
      };
      
      Array.from(element.childNodes).forEach(node => processNode(node));
      return segments;
    };
    
    // Renderiza texto com estilos em uma linha, com justificação para parágrafos
    const renderStyledText = (segments: TextSegment[], x: number, yPos: number, maxLineWidth: number, fontSize: number = 9, justify: boolean = true): number => {
      let currentX = x;
      let currentY = yPos;
      const lineHeight = fontSize * 0.4;
      
      // Coleta todas as palavras de todos os segmentos para processar linha por linha
      const allWords: Array<{text: string, bold: boolean, italic: boolean}> = [];
      
      segments.forEach(segment => {
        // Divide o texto preservando emojis e espaços
        // Regex para dividir por espaços, mas preserva emojis como parte das palavras
        const parts = segment.text.split(/(\s+)/);
        parts.forEach(part => {
          if (part && !/^\s+$/.test(part)) {
            // Preserva emojis junto com o texto
            allWords.push({ text: part, bold: segment.bold, italic: segment.italic });
          }
        });
      });
      
      if (allWords.length === 0) {
        return currentY;
      }
      
      // Processa palavras linha por linha com justificação
      let lineWords: Array<{text: string, bold: boolean, italic: boolean}> = [];
      let lineWidth = 0;
      const spaceWidth = pdf.getTextWidth(' ');
      
      const renderLine = (words: Array<{text: string, bold: boolean, italic: boolean}>, isLastLine: boolean = false) => {
        if (words.length === 0) return;
        
        // Verifica se precisa de nova página
        if (currentY + lineHeight > pageHeight - margin) {
          pdf.addPage();
          currentY = margin;
        }
        
        let totalWidth = 0;
        words.forEach(w => {
          pdf.setFontSize(fontSize);
          if (w.bold && w.italic) {
            pdf.setFont('helvetica', 'bolditalic');
          } else if (w.bold) {
            pdf.setFont('helvetica', 'bold');
          } else if (w.italic) {
            pdf.setFont('helvetica', 'italic');
          } else {
            pdf.setFont('helvetica', 'normal');
          }
          totalWidth += pdf.getTextWidth(w.text);
        });
        
        // Calcula espaçamento entre palavras para justificação
        const availableWidth = maxLineWidth;
        const textWidth = totalWidth;
        const spacesNeeded = words.length - 1;
        let spaceBetweenWords = spaceWidth;
        
        // Justifica apenas se não for a última linha e houver mais de uma palavra
        if (justify && !isLastLine && words.length > 1 && textWidth < availableWidth) {
          spaceBetweenWords = (availableWidth - textWidth) / spacesNeeded;
        }
        
        // Renderiza palavras com espaçamento calculado
        let xPos = x;
        words.forEach((word, index) => {
          pdf.setFontSize(fontSize);
          if (word.bold && word.italic) {
            pdf.setFont('helvetica', 'bolditalic');
          } else if (word.bold) {
            pdf.setFont('helvetica', 'bold');
          } else if (word.italic) {
            pdf.setFont('helvetica', 'italic');
          } else {
            pdf.setFont('helvetica', 'normal');
          }
          
          try {
            // Renderiza o texto incluindo emojis (jsPDF tentará renderizar se suportado)
            pdf.text(word.text, xPos, currentY);
            xPos += pdf.getTextWidth(word.text);
            
            // Adiciona espaço entre palavras (exceto após a última palavra)
            if (index < words.length - 1) {
              xPos += spaceBetweenWords;
            }
          } catch (e) {
            // Se houver erro ao renderizar (ex: emoji não suportado), tenta renderizar sem o emoji problemático
            console.warn('Erro ao renderizar texto com possível emoji:', word.text.substring(0, 50), e);
            // Tenta renderizar caractere por caractere para identificar o problema
            try {
              // Fallback: renderiza cada caractere individualmente
              let charX = xPos;
              for (const char of word.text) {
                try {
                  pdf.text(char, charX, currentY);
                  charX += pdf.getTextWidth(char);
                } catch (charError) {
                  // Se um caractere específico falhar (provavelmente um emoji não suportado), pula
                  console.warn('Caractere não suportado:', char);
                }
              }
              xPos = charX;
              if (index < words.length - 1) {
                xPos += spaceBetweenWords;
              }
            } catch (fallbackError) {
              console.error('Erro no fallback de renderização:', fallbackError);
            }
          }
        });
        
        currentY += lineHeight;
      };
      
      // Agrupa palavras em linhas
      allWords.forEach((word, index) => {
        pdf.setFontSize(fontSize);
        if (word.bold && word.italic) {
          pdf.setFont('helvetica', 'bolditalic');
        } else if (word.bold) {
          pdf.setFont('helvetica', 'bold');
        } else if (word.italic) {
          pdf.setFont('helvetica', 'italic');
        } else {
          pdf.setFont('helvetica', 'normal');
        }
        
        const wordWidth = pdf.getTextWidth(word.text);
        const newLineWidth = lineWidth + (lineWords.length > 0 ? spaceWidth : 0) + wordWidth;
        
        // Se a palavra não cabe na linha atual, renderiza a linha anterior
        if (newLineWidth > maxLineWidth && lineWords.length > 0) {
          renderLine(lineWords, false);
          lineWords = [word];
          lineWidth = wordWidth;
        } else {
          lineWords.push(word);
          lineWidth = newLineWidth;
        }
      });
      
      // Renderiza a última linha (sem justificação)
      if (lineWords.length > 0) {
        renderLine(lineWords, true);
      }
      
      return currentY;
    };
    
    // Função auxiliar para carregar imagem e converter para base64
    const loadImageAsBase64 = async (imageSrc: string): Promise<{ data: string; format: string } | null> => {
      return new Promise((resolve) => {
        try {
          // Se já é base64, retorna diretamente
          if (imageSrc.startsWith('data:')) {
            const matches = imageSrc.match(/data:image\/(\w+);base64,(.+)/);
            if (matches) {
              resolve({ data: matches[2], format: matches[1] });
              return;
            }
          }
          
          // Cria uma imagem para carregar
          const img = new Image();
          img.crossOrigin = 'anonymous';
          
          img.onload = () => {
            try {
              // Cria um canvas para converter a imagem em base64
              const canvas = document.createElement('canvas');
              canvas.width = img.naturalWidth || img.width;
              canvas.height = img.naturalHeight || img.height;
              
              const ctx = canvas.getContext('2d');
              if (!ctx) {
                resolve(null);
                return;
              }
              
              ctx.drawImage(img, 0, 0);
              
              // Converte para base64
              const base64 = canvas.toDataURL('image/png');
              const matches = base64.match(/data:image\/(\w+);base64,(.+)/);
              if (matches) {
                resolve({ data: matches[2], format: 'png' });
              } else {
                resolve(null);
              }
            } catch (error) {
              console.error('Erro ao converter imagem para base64:', error);
              resolve(null);
            }
          };
          
          img.onerror = () => {
            console.error('Erro ao carregar imagem:', imageSrc);
            resolve(null);
          };
          
          // Define o src para iniciar o carregamento
          img.src = imageSrc;
        } catch (error) {
          console.error('Erro ao processar imagem:', error);
          resolve(null);
        }
      });
    };
    
    // Interface para parâmetros de imagem no PDF
    interface ImagePDFParams {
      skip?: boolean;
      scale?: number;
      width?: number;
      height?: number;
    }
    
    // Função auxiliar para parsear parâmetros de imagem
    const parseImageParams = (paramsString: string): ImagePDFParams => {
      const params: ImagePDFParams = {};
      
      if (!paramsString) return params;
      
      // Divide por espaços ou vírgulas
      const parts = paramsString.split(/[\s,]+/).filter(p => p);
      
      parts.forEach(part => {
        part = part.trim();
        
        // Parâmetros booleanos (skip, center, etc)
        if (part === 'skip') {
          params.skip = true;
        } else if (part === 'small') {
          params.scale = 0.5;
        } else if (part === 'medium') {
          params.scale = 0.75;
        } else if (part === 'large') {
          params.scale = 1.0;
        }
        // Parâmetros com valor (width=50%, height=100mm, scale=0.8)
        else if (part.includes('=')) {
          const [key, value] = part.split('=').map(s => s.trim());
          
          if (key === 'width') {
            // Pode ser porcentagem ou valor absoluto (mm)
            if (value.endsWith('%')) {
              params.width = parseFloat(value) / 100;
            } else if (value.endsWith('mm')) {
              params.width = parseFloat(value);
            } else {
              // Assume mm se não especificado
              params.width = parseFloat(value) || 0;
            }
          } else if (key === 'height') {
            // Pode ser porcentagem ou valor absoluto (mm)
            if (value.endsWith('%')) {
              params.height = parseFloat(value) / 100;
            } else if (value.endsWith('mm')) {
              params.height = parseFloat(value);
            } else {
              // Assume mm se não especificado
              params.height = parseFloat(value) || 0;
            }
          } else if (key === 'scale') {
            params.scale = parseFloat(value) || 1;
          }
        }
      });
      
      return params;
    };
    
    // Função auxiliar para adicionar imagem ao PDF (definida no escopo correto)
    const addImageToPDF = async (imageSrc: string, altText: string, imgElement: HTMLImageElement | undefined, currentLevel: number) => {
      try {
        // Extrai parâmetros do elemento img se disponível
        let pdfParams: ImagePDFParams = {};
        if (imgElement) {
          const paramsString = imgElement.getAttribute('data-pdf-params');
          if (paramsString) {
            pdfParams = parseImageParams(paramsString);
          }
        }
        
        // Verifica se deve pular a imagem
        if (pdfParams.skip === true) {
          console.log('⏭️ Imagem ignorada (skip):', imageSrc);
          return;
        }
        
        console.log('🖼️ Processando imagem:', imageSrc, pdfParams);
        
        // Carrega a imagem e converte para base64 se necessário
        const imageData = await loadImageAsBase64(imageSrc);
        
        if (!imageData) {
          console.warn('⚠️ Não foi possível carregar a imagem:', imageSrc);
          // Adiciona texto alternativo se a imagem não puder ser carregada
          if (altText) {
            pdf.setFontSize(8);
            pdf.setFont('helvetica', 'italic');
            pdf.text(`[Imagem: ${altText}]`, margin + (currentLevel * 5), y);
            y += 5;
          }
          return;
        }
        
        console.log('✅ Imagem carregada com sucesso:', imageSrc);
        
        // Obtém dimensões da imagem original
        let imgWidth = 100;
        let imgHeight = 100;
        
        if (imgElement) {
          imgWidth = imgElement.naturalWidth || imgElement.width || 100;
          imgHeight = imgElement.naturalHeight || imgElement.height || 100;
        } else {
          // Tenta carregar a imagem para obter dimensões
          const tempImg = new Image();
          tempImg.src = imageSrc;
          imgWidth = tempImg.naturalWidth || tempImg.width || 100;
          imgHeight = tempImg.naturalHeight || tempImg.height || 100;
        }
        
        // Converte pixels para mm (assumindo 96 DPI)
        const pxToMm = 0.264583; // 1px = 0.264583mm a 96 DPI
        const imgWidthMm = imgWidth * pxToMm;
        const imgHeightMm = imgHeight * pxToMm;
        
        // Calcula espaço necessário (incluindo margens antes e depois)
        const spaceBefore = 5; // Espaço antes da imagem
        const spaceAfter = 5; // Espaço depois da imagem
        const altTextHeight = altText ? 10 : 0; // Espaço para texto alternativo
        
        // Calcula dimensões máximas disponíveis na página atual
        let maxImageWidth = maxWidth - (currentLevel * 5);
        let maxImageHeight = pageHeight - margin - y - spaceBefore - spaceAfter - altTextHeight;
        
        // Estima dimensões finais baseado nos parâmetros (se houver)
        let estimatedWidth = imgWidthMm;
        let estimatedHeight = imgHeightMm;
        
        // Aplica largura se especificada
        if (pdfParams.width !== undefined && typeof pdfParams.width === 'number') {
          if (pdfParams.width < 1) {
            // É porcentagem (0.0 a 1.0)
            estimatedWidth = maxImageWidth * pdfParams.width;
          } else {
            // É valor absoluto em mm
            estimatedWidth = pdfParams.width;
          }
          // Mantém proporção se altura não foi especificada
          if (pdfParams.height === undefined) {
            estimatedHeight = (estimatedWidth / imgWidthMm) * imgHeightMm;
          }
        }
        
        // Aplica altura se especificada
        if (pdfParams.height !== undefined && typeof pdfParams.height === 'number') {
          if (pdfParams.height < 1) {
            // É porcentagem (0.0 a 1.0)
            estimatedHeight = maxImageHeight * pdfParams.height;
          } else {
            // É valor absoluto em mm
            estimatedHeight = pdfParams.height;
          }
          // Mantém proporção se largura não foi especificada
          if (pdfParams.width === undefined) {
            estimatedWidth = (estimatedHeight / imgHeightMm) * imgWidthMm;
          }
        }
        
        // Aplica escala se especificada
        if (pdfParams.scale !== undefined && typeof pdfParams.scale === 'number') {
          estimatedWidth = imgWidthMm * pdfParams.scale;
          estimatedHeight = imgHeightMm * pdfParams.scale;
        }
        
        // Se nenhum parâmetro foi aplicado, estima escala automática
        if (pdfParams.width === undefined && pdfParams.height === undefined && pdfParams.scale === undefined) {
          let scale = 1;
          if (imgWidthMm > maxImageWidth) {
            scale = maxImageWidth / imgWidthMm;
          }
          estimatedWidth = imgWidthMm * scale;
          estimatedHeight = imgHeightMm * scale;
        }
        
        // Verifica se a imagem estimada cabe na página atual
        // Se não couber, adiciona nova página ANTES de calcular dimensões finais
        const totalNeededHeight = spaceBefore + estimatedHeight + spaceAfter + altTextHeight;
        if (y + totalNeededHeight > pageHeight - margin) {
          console.log('📄 Imagem não cabe na página atual, adicionando nova página');
          pdf.addPage();
          y = margin;
          // Recalcula altura máxima disponível na nova página
          maxImageHeight = pageHeight - margin - y - spaceBefore - spaceAfter - altTextHeight;
        }
        
        // Recalcula dimensões máximas disponíveis (pode ter mudado após nova página)
        maxImageWidth = maxWidth - (currentLevel * 5);
        maxImageHeight = pageHeight - margin - y - spaceBefore - spaceAfter - altTextHeight;
        
        // Calcula dimensões finais da imagem
        let finalWidth = imgWidthMm;
        let finalHeight = imgHeightMm;
        
        // Aplica largura se especificada
        if (pdfParams.width !== undefined && typeof pdfParams.width === 'number') {
          if (pdfParams.width < 1) {
            // É porcentagem (0.0 a 1.0)
            finalWidth = maxImageWidth * pdfParams.width;
          } else {
            // É valor absoluto em mm
            finalWidth = pdfParams.width;
          }
          // Mantém proporção se altura não foi especificada
          if (pdfParams.height === undefined) {
            finalHeight = (finalWidth / imgWidthMm) * imgHeightMm;
          }
        }
        
        // Aplica altura se especificada
        if (pdfParams.height !== undefined && typeof pdfParams.height === 'number') {
          if (pdfParams.height < 1) {
            // É porcentagem (0.0 a 1.0)
            finalHeight = maxImageHeight * pdfParams.height;
          } else {
            // É valor absoluto em mm
            finalHeight = pdfParams.height;
          }
          // Mantém proporção se largura não foi especificada
          if (pdfParams.width === undefined) {
            finalWidth = (finalHeight / imgHeightMm) * imgWidthMm;
          }
        }
        
        // Aplica escala se especificada
        if (pdfParams.scale !== undefined && typeof pdfParams.scale === 'number') {
          finalWidth = imgWidthMm * pdfParams.scale;
          finalHeight = imgHeightMm * pdfParams.scale;
        }
        
        // Se nenhum parâmetro foi aplicado, calcula escala automática
        if (pdfParams.width === undefined && pdfParams.height === undefined && pdfParams.scale === undefined) {
          let scale = 1;
          if (imgWidthMm > maxImageWidth) {
            scale = maxImageWidth / imgWidthMm;
          }
          
          // Verifica se precisa escalar pela altura também
          const scaledHeight = imgHeightMm * scale;
          if (scaledHeight > maxImageHeight) {
            scale = maxImageHeight / imgHeightMm;
          }
          
          finalWidth = imgWidthMm * scale;
          finalHeight = imgHeightMm * scale;
        }
        
        // Garante que não ultrapasse os limites máximos (após nova página se necessário)
        if (finalWidth > maxImageWidth) {
          const scale = maxImageWidth / finalWidth;
          finalWidth = maxImageWidth;
          finalHeight = finalHeight * scale;
        }
        if (finalHeight > maxImageHeight) {
          const scale = maxImageHeight / finalHeight;
          finalHeight = maxImageHeight;
          finalWidth = finalWidth * scale;
        }
        
        // Centraliza a imagem horizontalmente
        const xPos = margin + (currentLevel * 5) + (maxImageWidth - finalWidth) / 2;
        
        // Adiciona espaço antes da imagem
        y += 5;
        
        // Adiciona a imagem ao PDF
        pdf.addImage(imageData.data, imageData.format, xPos, y, finalWidth, finalHeight);
        console.log('✅ Imagem adicionada ao PDF:', imageSrc, `(${finalWidth.toFixed(2)}mm x ${finalHeight.toFixed(2)}mm)`);
        
        // Não adiciona texto alternativo quando a imagem é renderizada com sucesso
        // O texto alternativo só aparece quando a imagem não pode ser carregada
        y += finalHeight;
        
        // Adiciona espaço após a imagem
        y += 5;
        
      } catch (error) {
        console.error('❌ Erro ao adicionar imagem ao PDF:', error);
        // Adiciona texto alternativo em caso de erro
        if (altText) {
          pdf.setFontSize(8);
          pdf.setFont('helvetica', 'italic');
          pdf.text(`[Imagem: ${altText}]`, margin + (currentLevel * 5), y);
          y += 5;
        }
      }
    };
    
    // Processa elementos de bloco (agora assíncrona para suportar imagens)
    const processBlockElement = async (element: HTMLElement, level: number = 0) => {
      const children = Array.from(element.childNodes);
      
      for (const node of children) {
        if (y + 7 > pageHeight - margin) { // Threshold reduzido
          pdf.addPage();
          y = margin;
        }

        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent?.trim();
          if (text) {
            // Preserva emojis no texto (normaliza apenas espaços)
            const cleanText = removeEmojis(text);
            if (cleanText) {
              pdf.setFontSize(9); // Fonte reduzida para 9
              pdf.setFont('helvetica', 'normal');
              const lines = pdf.splitTextToSize(cleanText, maxWidth - (level * 5));
              lines.forEach((line: string) => {
                if (y + 5 > pageHeight - margin) { // Line height reduzido
                  pdf.addPage();
                  y = margin;
                }
                try {
                  pdf.text(line, margin + (level * 5), y);
                } catch (e) {
                  // Se houver erro com emoji, tenta renderizar caractere por caractere
                  console.warn('Erro ao renderizar linha com possível emoji:', line.substring(0, 50));
                  let charX = margin + (level * 5);
                  for (const char of line) {
                    try {
                      pdf.text(char, charX, y);
                      charX += pdf.getTextWidth(char);
                    } catch (charError) {
                      // Pula caracteres não suportados
                    }
                  }
                }
                y += 5; // Line height reduzido
              });
            }
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          const tagName = el.tagName.toLowerCase();
          
          // Processa headings
          if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3') {
            y += 3; // Espaço antes do heading (reduzido)
            const fontSize = tagName === 'h1' ? 13 : tagName === 'h2' ? 11 : 10; // Fontes reduzidas proporcionalmente
            
            // Extrai texto com estilos e renderiza
            const segments = extractTextWithStyles(el);
            // Força negrito nos headings (sem justificação)
            segments.forEach(s => s.bold = true);
            y = renderStyledText(segments, margin + (level * 5), y, maxWidth - (level * 5), fontSize, false);
            y += 2; // Espaço após heading (reduzido)
          }
          // Processa parágrafos com conteúdo inline (com justificação)
          else if (tagName === 'p') {
            // Verifica se há imagens dentro do parágrafo primeiro
            const imagesInParagraph = el.querySelectorAll('img');
            if (imagesInParagraph.length > 0) {
              // Processa imagens primeiro
              for (const img of Array.from(imagesInParagraph)) {
                const imgEl = img as HTMLImageElement;
                const imgSrc = imgEl.src || imgEl.getAttribute('src') || '';
                if (imgSrc) {
                  const altText = imgEl.alt || '';
                  await addImageToPDF(imgSrc, altText, imgEl, level);
                }
              }
              // Remove imagens do parágrafo antes de processar texto
              imagesInParagraph.forEach(img => img.remove());
            }
            
            // Extrai texto com estilos e renderiza com justificação
            const segments = extractTextWithStyles(el);
            if (segments.length > 0) {
              y = renderStyledText(segments, margin + (level * 5), y, maxWidth - (level * 5), 9, true); // Fonte reduzida para 9
            } else {
              // Fallback para texto simples
              const text = el.textContent?.trim() || '';
              if (text) {
                // Preserva emojis no texto (normaliza apenas espaços)
                const cleanText = removeEmojis(text);
                if (cleanText) {
                  pdf.setFontSize(9); // Fonte reduzida para 9
                  pdf.setFont('helvetica', 'normal');
                  const lines = pdf.splitTextToSize(cleanText, maxWidth - (level * 5));
                  lines.forEach((line: string) => {
                    if (y + 5 > pageHeight - margin) { // Line height reduzido
                      pdf.addPage();
                      y = margin;
                    }
                    try {
                      pdf.text(line, margin + (level * 5), y);
                    } catch (e) {
                      // Se houver erro com emoji, tenta renderizar caractere por caractere
                      console.warn('Erro ao renderizar linha com possível emoji:', line.substring(0, 50));
                      let charX = margin + (level * 5);
                      for (const char of line) {
                        try {
                          pdf.text(char, charX, y);
                          charX += pdf.getTextWidth(char);
                        } catch (charError) {
                          // Pula caracteres não suportados
                        }
                      }
                    }
                    y += 5; // Line height reduzido
                  });
                }
              }
            }
            y += 2; // Espaço após parágrafo (reduzido)
          }
          // Processa imagens
          else if (tagName === 'img') {
            const img = el as HTMLImageElement;
            const imgSrc = img.src || img.getAttribute('src') || '';
            
            if (imgSrc) {
              // Processa a imagem de forma assíncrona
              const altText = img.alt || '';
              await addImageToPDF(imgSrc, altText, img, level);
            }
          }
          // Processa listas
          else if (tagName === 'ul' || tagName === 'ol') {
            const listItems = el.querySelectorAll('li');
            listItems.forEach((li, index) => {
              const bullet = tagName === 'ul' ? '• ' : `${index + 1}. `;
              pdf.setFontSize(9); // Fonte reduzida para 9
              pdf.setFont('helvetica', 'normal');
              const bulletWidth = pdf.getTextWidth(bullet);
              
              // Extrai texto com estilos do item (sem justificação para listas)
              const segments = extractTextWithStyles(li as HTMLElement);
              
              // Adiciona bullet
              pdf.text(bullet, margin + (level * 5), y);
              
              if (segments.length > 0) {
                y = renderStyledText(segments, margin + (level * 5) + bulletWidth, y, maxWidth - (level * 5) - bulletWidth, 9, false); // Fonte reduzida para 9
              } else {
                const text = li.textContent?.trim() || '';
                if (text) {
                  // Preserva emojis no texto (normaliza apenas espaços)
                  const cleanText = removeEmojis(text);
                  if (cleanText) {
                    const lines = pdf.splitTextToSize(cleanText, maxWidth - (level * 5) - bulletWidth);
                    lines.forEach((line: string) => {
                      if (y + 5 > pageHeight - margin) { // Line height reduzido
                        pdf.addPage();
                        y = margin;
                      }
                      try {
                        pdf.text(line, margin + (level * 5) + bulletWidth, y);
                      } catch (e) {
                        // Se houver erro com emoji, tenta renderizar caractere por caractere
                        console.warn('Erro ao renderizar linha de lista com possível emoji:', line.substring(0, 50));
                        let charX = margin + (level * 5) + bulletWidth;
                        for (const char of line) {
                          try {
                            pdf.text(char, charX, y);
                            charX += pdf.getTextWidth(char);
                          } catch (charError) {
                            // Pula caracteres não suportados
                          }
                        }
                      }
                      y += 5; // Line height reduzido
                    });
                  }
                }
              }
              y += 1.5; // Espaço reduzido entre itens
            });
          }
          // Processa tabelas
          else if (tagName === 'table') {
            y = this.renderTableInPDF(pdf, el as HTMLTableElement, margin + (level * 5), y, maxWidth - (level * 5), pageHeight, margin, removeEmojis);
          }
          // Processa outros elementos recursivamente
          else {
            await processBlockElement(el, level);
          }
        }
      }
    };

    // Processa o conteúdo (agora com await)
    await processBlockElement(contentWrapper);

    // Função para remover acentos e caracteres especiais
    const removeAccents = (str: string): string => {
      return str
        .normalize('NFD') // Decompõe caracteres acentuados
        .replace(/[\u0300-\u036f]/g, '') // Remove diacríticos (acentos)
        .replace(/[^a-z0-9\s-]/gi, '') // Remove caracteres especiais, mantém espaços e hífens
        .replace(/\s+/g, '-') // Substitui espaços por hífens
        .replace(/-+/g, '-') // Remove hífens duplicados
        .replace(/^-|-$/g, '') // Remove hífens no início e fim
        .toLowerCase();
    };
    
    // Gera o nome do arquivo com acentos removidos
    const sanitizedTitle = removeAccents(this.selectedFile.title || 'documento');
    const fileName = `${sanitizedTitle}.pdf`;
    
    // Faz o download
    pdf.save(fileName);
    
    console.log('✅ PDF pesquisável gerado com sucesso:', fileName);
  }

  /**
   * Renderiza uma tabela HTML no PDF preservando estrutura de colunas
   * Otimiza largura das colunas baseado no conteúdo
   */
  private renderTableInPDF(
    pdf: any,
    table: HTMLTableElement,
    startX: number,
    startY: number,
    maxWidth: number,
    pageHeight: number,
    margin: number,
    removeEmojisFn: (text: string) => string
  ): number {
    let y = startY;
    const cellPadding = 2.5; // Padding reduzido
    const fontSize = 8; // Fonte ainda menor para tabelas
    const lineHeight = fontSize * 0.45;
    
    // Obtém cabeçalho e linhas
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');
    const rows: HTMLTableRowElement[] = [];
    
    if (thead) {
      const headerRows = Array.from(thead.querySelectorAll('tr'));
      rows.push(...headerRows);
    }
    
    if (tbody) {
      const bodyRows = Array.from(tbody.querySelectorAll('tr'));
      rows.push(...bodyRows);
    }
    
    if (rows.length === 0) {
      // Se não tem thead/tbody, pega todas as linhas diretamente
      rows.push(...Array.from(table.querySelectorAll('tr')));
    }
    
    if (rows.length === 0) return y;
    
    // Calcula número de colunas
    const numCols = Math.max(...rows.map(row => row.querySelectorAll('th, td').length));
    if (numCols === 0) return y;
    
    // Primeira passagem: calcula largura ideal de cada coluna baseado no conteúdo
    pdf.setFontSize(fontSize);
    const colWidths: number[] = new Array(numCols).fill(0);
    const minColWidth = 40; // Largura mínima por coluna (aumentada)
    
    rows.forEach((row, rowIndex) => {
      const cells = Array.from(row.querySelectorAll('th, td'));
      const isHeader = rowIndex === 0 && thead !== null;
      
      pdf.setFont('helvetica', isHeader ? 'bold' : 'normal');
      
      cells.forEach((cell, colIndex) => {
        if (colIndex >= numCols) return;
        
        const cellText = removeEmojisFn(cell.textContent || '').trim();
        // Calcula largura necessária para o texto (considerando quebra de linha)
        const textWidth = pdf.getTextWidth(cellText);
        // Para textos longos, estima largura baseada no número de caracteres
        const estimatedWidth = Math.max(textWidth, cellText.length * fontSize * 0.5);
        colWidths[colIndex] = Math.max(colWidths[colIndex], estimatedWidth + (cellPadding * 2));
      });
    });
    
    // Normaliza larguras para caber no espaço disponível
    const totalDesiredWidth = colWidths.reduce((sum, w) => sum + Math.max(w, minColWidth), 0);
    const availableWidth = maxWidth - (cellPadding * 2 * numCols);
    const scaleFactor = availableWidth / totalDesiredWidth;
    
    // Aplica escala e garante largura mínima
    const finalColWidths = colWidths.map(w => {
      const scaled = Math.max(w, minColWidth) * scaleFactor;
      return Math.max(scaled, minColWidth);
    });
    
    // Ajusta para garantir que a soma seja exatamente o espaço disponível
    const totalFinalWidth = finalColWidths.reduce((sum, w) => sum + w, 0);
    const adjustmentFactor = availableWidth / totalFinalWidth;
    finalColWidths.forEach((w, i) => {
      finalColWidths[i] = w * adjustmentFactor;
    });
    
    // Renderiza cada linha
    rows.forEach((row, rowIndex) => {
      const cells = Array.from(row.querySelectorAll('th, td'));
      const isHeader = rowIndex === 0 && thead !== null;
      
      // Segunda passagem: calcula altura da linha (maior altura entre as células)
      let maxCellHeight = lineHeight + (cellPadding * 2);
      const cellContents: string[][] = [];
      
      cells.forEach((cell, colIndex) => {
        if (colIndex >= numCols) return;
        
        const cellText = removeEmojisFn(cell.textContent || '').trim();
        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', isHeader ? 'bold' : 'normal');
        
        // Divide texto em múltiplas linhas baseado na largura da coluna
        const cellWidth = finalColWidths[colIndex] - (cellPadding * 2);
        const lines = this.splitTextWithHyphen(pdf, cellText, cellWidth, fontSize);
        cellContents.push(lines);
        
        const cellHeight = (lines.length * lineHeight) + (cellPadding * 2);
        maxCellHeight = Math.max(maxCellHeight, cellHeight);
      });
      
      // Verifica se precisa de nova página
      if (y + maxCellHeight > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      
      // Renderiza células da linha (todas com a mesma altura)
      let currentX = startX;
      cells.forEach((cell, colIndex) => {
        if (colIndex >= numCols) return;
        
        const colWidth = finalColWidths[colIndex];
        const lines = cellContents[colIndex] || [];
        
        // Desenha borda da célula (todas com mesma altura)
        pdf.setDrawColor(0, 0, 0);
        pdf.setLineWidth(0.1);
        pdf.rect(currentX, y, colWidth, maxCellHeight);
        
        // Renderiza texto da célula (centralizado verticalmente)
        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', isHeader ? 'bold' : 'normal');
        
        const textStartY = y + cellPadding + lineHeight;
        lines.forEach((line: string, lineIndex: number) => {
          pdf.text(line, currentX + cellPadding, textStartY + (lineIndex * lineHeight));
        });
        
        currentX += colWidth;
      });
      
      y += maxCellHeight;
      });
      
      y += 3; // Espaço após tabela (reduzido)
      return y;
  }

  /**
   * Divide texto em linhas, evitando quebrar palavras quando possível
   * Só quebra palavras como último recurso e tenta fazer em posições mais naturais
   */
  private splitTextWithHyphen(pdf: any, text: string, maxWidth: number, fontSize: number): string[] {
    // Usa a função padrão do jsPDF que já faz quebra inteligente
    // Ela tenta manter palavras inteiras e só quebra quando absolutamente necessário
    const lines = pdf.splitTextToSize(text, maxWidth);
    
    // Se ainda houver palavras muito longas que não cabem, processa manualmente
    const processedLines: string[] = [];
    
    lines.forEach((line: string) => {
      const lineWidth = pdf.getTextWidth(line);
      
      if (lineWidth <= maxWidth) {
        // Linha cabe normalmente
        processedLines.push(line);
      } else {
        // Linha ainda não cabe, precisa processar palavra por palavra
        const words = line.split(/(\s+)/);
        let currentLine = '';
        
        words.forEach((word) => {
          if (!word) return;
          
          // Se for espaço, adiciona à linha atual
          if (/^\s+$/.test(word)) {
            const testLine = currentLine + word;
            if (pdf.getTextWidth(testLine) <= maxWidth) {
              currentLine = testLine;
            } else {
              if (currentLine.trim()) {
                processedLines.push(currentLine.trim());
              }
              currentLine = word;
            }
            return;
          }
          
          // Testa se a palavra cabe na linha atual
          const testLine = currentLine + (currentLine ? ' ' : '') + word;
          const testWidth = pdf.getTextWidth(testLine);
          
          if (testWidth <= maxWidth) {
            // Cabe na linha atual
            currentLine = testLine;
          } else {
            // Não cabe, precisa quebrar
            if (currentLine.trim()) {
              // Salva linha atual e começa nova
              processedLines.push(currentLine.trim());
              currentLine = '';
            }
            
            // Verifica se a palavra sozinha cabe
            const wordWidth = pdf.getTextWidth(word);
            if (wordWidth <= maxWidth) {
              // Palavra cabe sozinha
              currentLine = word;
            } else {
              // Palavra é muito longa, precisa quebrar
              // Tenta encontrar um ponto de quebra mais natural (preferencialmente após vogais)
              const hyphenWidth = pdf.getTextWidth('-');
              const maxPrefixWidth = maxWidth - hyphenWidth;
              
              // Procura por vogais para quebrar de forma mais natural
              // Preferência: após vogais, antes de consoantes
              let bestBreakPoint = -1;
              let bestPrefixWidth = 0;
              
              for (let i = Math.min(3, word.length - 2); i < word.length - 2; i++) {
                // Prefere quebrar após vogais
                const char = word[i].toLowerCase();
                if (['a', 'e', 'i', 'o', 'u'].includes(char)) {
                  const prefix = word.substring(0, i + 1);
                  const prefixWidth = pdf.getTextWidth(prefix);
                  
                  if (prefixWidth <= maxPrefixWidth && prefixWidth > bestPrefixWidth) {
                    bestBreakPoint = i + 1;
                    bestPrefixWidth = prefixWidth;
                  }
                }
              }
              
              // Se não encontrou ponto bom, usa o máximo que cabe
              if (bestBreakPoint === -1) {
                for (let i = word.length - 1; i >= 1; i--) {
                  const prefix = word.substring(0, i);
                  const prefixWidth = pdf.getTextWidth(prefix);
                  
                  if (prefixWidth <= maxPrefixWidth) {
                    bestBreakPoint = i;
                    bestPrefixWidth = prefixWidth;
                    break;
                  }
                }
              }
              
              if (bestBreakPoint > 0 && bestBreakPoint < word.length) {
                // Quebra a palavra
                const prefix = word.substring(0, bestBreakPoint);
                const suffix = word.substring(bestBreakPoint);
                processedLines.push(prefix + '-');
                currentLine = suffix;
              } else {
                // Não conseguiu quebrar de forma inteligente, força
                processedLines.push(word);
              }
            }
          }
        });
        
        // Adiciona última linha se houver
        if (currentLine.trim()) {
          processedLines.push(currentLine.trim());
        }
      }
    });
    
    return processedLines.length > 0 ? processedLines : [''];
  }
}
