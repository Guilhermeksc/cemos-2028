import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, HostListener, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LivroIndividualService } from '../../services/livro-individual.service';
import { TabsMenuService } from '../../services/tabs-menu.service';
import { Subject, takeUntil } from 'rxjs';

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
  imports: [CommonModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './content-tcu.html',
  styleUrl: './content-tcu.scss'
})
export class ContentTcu implements OnInit, OnDestroy, AfterViewChecked {
  @Input() config!: ContentConfig;
  @Input() mobileMenuOpen: boolean = false;
  @Output() mobileMenuOpenChange = new EventEmitter<boolean>();

  private readonly destroy$ = new Subject<void>();

  // Estado atual
  activeTabGroupId: string | null = null;
  activeTabItemId: string | null = null;
  openDropdownId: string | null = null;
  isMobile: boolean = false;
  private useService: boolean = false;

  // Armazenamento de conteúdo HTML
  contentMap: Map<string, SafeHtml> = new Map();
  
  // Armazenamento de headings para navegação
  headingsMap: Map<string, NavigationHeading[]> = new Map();
  
  // Estados de carregamento
  loadingMap: Map<string, boolean> = new Map();
  
  // Controle para evitar extração múltipla de headings
  private headingsExtracted: Set<string> = new Set();

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

  /**
   * Getter para controlar o menu mobile
   */
  get isMobileMenuOpen(): boolean {
    if (this.useService) {
      return this.tabsMenuService.getCurrentValue() && this.isMobile;
    }
    return this.mobileMenuOpen && this.isMobile;
  }

  constructor(
    private livroService: LivroIndividualService,
    private sanitizer: DomSanitizer,
    private breakpointObserver: BreakpointObserver,
    private tabsMenuService: TabsMenuService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!this.config || !this.config.tabGroups || this.config.tabGroups.length === 0) {
      console.error('Configuração de tab groups não fornecida ou inválida');
      return;
    }
    
    // Sempre tenta usar o serviço primeiro (padrão)
    // O serviço permite comunicação entre componentes distantes
    this.useService = true;
    
    // Observa breakpoints para detectar mobile (apenas Handset, não Tablet)
    this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.isMobile = result.matches;
        if (!this.isMobile) {
          if (this.useService) {
            this.tabsMenuService.closeMenu();
          } else {
            this.mobileMenuOpenChange.emit(false);
          }
        }
      });
    
    // Se usar serviço, observa mudanças do serviço e registra o componente
    if (this.useService) {
      this.tabsMenuService.registerContentTcu();
      this.tabsMenuService.isMenuOpen
        .pipe(takeUntil(this.destroy$))
        .subscribe(isOpen => {
          // O getter isMobileMenuOpen já trata isso
        });
    }
    
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

  ngOnDestroy(): void {
    // Desregistra o componente se estiver usando o serviço
    if (this.useService) {
      this.tabsMenuService.unregisterContentTcu();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Define o tab group ativo
   */
  setActiveTabGroup(tabGroupId: string): void {
    this.activeTabGroupId = tabGroupId;
    this.activeTabItemId = null; // Reseta para mostrar conteúdo principal
    this.openDropdownId = null; // Fecha dropdown se estiver aberto
    
    // Reseta flag de extração para permitir reextração dos headings
    const newKey = tabGroupId;
    this.headingsExtracted.delete(newKey);
    
    // Fecha menu mobile após seleção
    if (this.isMobile) {
      if (this.useService) {
        this.tabsMenuService.closeMenu();
      } else {
        this.mobileMenuOpenChange.emit(false);
      }
    }
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
   * Fecha o menu mobile quando clicar fora do componente
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.isMobile || !this.isMobileMenuOpen) {
      return;
    }

    const target = event.target as HTMLElement;
    const clickedInside = this.elementRef.nativeElement.contains(target);
    
    // Verifica se o clique foi no botão do header (que está fora deste componente)
    const isHeaderButton = target.closest('.tabs-menu-button') !== null;
    
    if (!clickedInside && !isHeaderButton) {
      // Fecha o menu se o clique foi fora do componente e não foi no botão do header
      if (this.useService) {
        this.tabsMenuService.closeMenu();
      } else {
        this.mobileMenuOpenChange.emit(false);
      }
    }
  }

  /**
   * Seleciona um item do menu suspenso
   */
  selectTabItem(tabGroupId: string, itemId: string): void {
    this.activeTabGroupId = tabGroupId;
    this.activeTabItemId = itemId;
    this.openDropdownId = null;

    // Reseta flag de extração para permitir reextração dos headings
    const newKey = `${tabGroupId}-${itemId}`;
    this.headingsExtracted.delete(newKey);

    // Carrega o conteúdo se ainda não foi carregado
    const tabGroup = this.config.tabGroups.find(tg => tg.id === tabGroupId);
    const item = tabGroup?.items.find(i => i.id === itemId);
    
    if (item && !this.contentMap.has(newKey)) {
      this.loadContent(newKey, item.markdownPath);
    }
    
    // Fecha menu mobile após seleção
    if (this.isMobile) {
      if (this.useService) {
        this.tabsMenuService.closeMenu();
      } else {
        this.mobileMenuOpenChange.emit(false);
      }
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
    this.headingsExtracted.delete(key); // Reset flag para permitir extração após carregamento
    
    const fullPath = markdownPath.startsWith('/') 
      ? markdownPath 
      : `${this.config.basePath}/${markdownPath}`;

    this.livroService.loadMarkdownFile(fullPath).subscribe({
      next: (content) => {
        const html = this.livroService.markdownToHtml(content, this.config.basePath);
        this.contentMap.set(key, this.sanitizer.bypassSecurityTrustHtml(html));
        
        // Headings serão extraídos do DOM após renderização (em AfterViewChecked)
        // Isso garante que os IDs correspondam exatamente aos elementos no DOM
        this.headingsMap.set(key, []);
        
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
   * Extrai headings diretamente do DOM após renderização
   * Isso garante que os IDs correspondam exatamente aos elementos no HTML
   */
  ngAfterViewChecked(): void {
    const currentKey = this.currentContentKey;
    
    console.log('[ContentTcu] ngAfterViewChecked - currentKey:', currentKey);
    console.log('[ContentTcu] ngAfterViewChecked - headingsExtracted:', this.headingsExtracted.has(currentKey));
    console.log('[ContentTcu] ngAfterViewChecked - isLoadingCurrent:', this.isLoadingCurrent);
    console.log('[ContentTcu] ngAfterViewChecked - contentMap.has:', this.contentMap.has(currentKey));
    
    // Não processa se não há conteúdo ativo, já foi extraído, ou está carregando
    if (!currentKey || this.headingsExtracted.has(currentKey) || this.isLoadingCurrent) {
      console.log('[ContentTcu] ngAfterViewChecked - Pulando extração (condição não atendida)');
      return;
    }

    // Verifica se o conteúdo já foi carregado
    if (!this.contentMap.has(currentKey)) {
      console.log('[ContentTcu] ngAfterViewChecked - Pulando extração (conteúdo não carregado)');
      return;
    }

    console.log('[ContentTcu] ngAfterViewChecked - Iniciando extração de headings para:', currentKey);

    // Aguarda um pouco para garantir que o DOM foi totalmente renderizado
    // Usa requestAnimationFrame para garantir que o DOM está pronto
    requestAnimationFrame(() => {
      setTimeout(() => {
        this.extractHeadingsFromDOM(currentKey);
      }, 50);
    });
  }

  /**
   * Extrai headings (# e ##) diretamente do DOM renderizado
   */
  private extractHeadingsFromDOM(key: string): void {
    console.log('[ContentTcu] extractHeadingsFromDOM - Iniciando para key:', key);
    
    if (this.headingsExtracted.has(key)) {
      console.log('[ContentTcu] extractHeadingsFromDOM - Já foi extraído, pulando');
      return; // Já foi extraído
    }

    // Encontra o elemento de conteúdo atual usando o atributo data-content-key
    const contentElement = this.elementRef.nativeElement.querySelector(
      `[data-content-key="${key}"]`
    );

    console.log('[ContentTcu] extractHeadingsFromDOM - contentElement encontrado:', !!contentElement);
    console.log('[ContentTcu] extractHeadingsFromDOM - elementRef.nativeElement:', this.elementRef.nativeElement);

    if (!contentElement) {
      console.warn('[ContentTcu] extractHeadingsFromDOM - Elemento não encontrado para key:', key);
      // Tenta buscar todos os elementos com data-content-key para debug
      const allContentElements = this.elementRef.nativeElement.querySelectorAll('[data-content-key]');
      console.log('[ContentTcu] extractHeadingsFromDOM - Todos os elementos com data-content-key:', allContentElements.length);
      allContentElements.forEach((el: Element, idx: number) => {
        console.log(`[ContentTcu] extractHeadingsFromDOM - Elemento ${idx}:`, el.getAttribute('data-content-key'));
      });
      return; // Elemento ainda não foi renderizado
    }

    // Busca apenas h1 e h2 (conforme especificado)
    const headingElements = contentElement.querySelectorAll('h1, h2');
    console.log('[ContentTcu] extractHeadingsFromDOM - headingElements encontrados:', headingElements.length);
    
    const headings: NavigationHeading[] = [];

    headingElements.forEach((heading: HTMLElement, index: number) => {
      const id = heading.id;
      const title = heading.textContent?.trim() || '';
      const level = parseInt(heading.tagName.charAt(1)); // 1 para h1, 2 para h2

      console.log(`[ContentTcu] extractHeadingsFromDOM - Heading ${index}:`, {
        id,
        title,
        level,
        tagName: heading.tagName
      });

      if (id && title) {
        headings.push({
          id,
          title,
          level
        });
      } else {
        console.warn(`[ContentTcu] extractHeadingsFromDOM - Heading ${index} ignorado (sem id ou título):`, {
          id,
          title,
          hasId: !!id,
          hasTitle: !!title
        });
      }
    });

    console.log('[ContentTcu] extractHeadingsFromDOM - Headings extraídos:', headings.length, headings);

    // Atualiza o mapa de headings apenas se encontrou algum
    if (headings.length > 0) {
      this.headingsMap.set(key, headings);
      this.headingsExtracted.add(key);
      console.log('[ContentTcu] extractHeadingsFromDOM - Headings salvos no mapa para key:', key);
      this.cdr.detectChanges(); // Força atualização da view
    } else {
      console.warn('[ContentTcu] extractHeadingsFromDOM - Nenhum heading válido encontrado');
    }
  }

  /**
   * Handler para clique no heading da sidebar
   */
  onHeadingClick(headingId: string, event: Event): void {
    console.log('[ContentTcu] onHeadingClick - Click detectado no heading:', headingId);
    console.log('[ContentTcu] onHeadingClick - Event:', event);
    event.preventDefault();
    this.scrollToHeading(headingId);
  }

  /**
   * Navega para um heading específico
   */
  scrollToHeading(headingId: string): void {
    console.log('[ContentTcu] scrollToHeading - Chamado com headingId:', headingId);
    console.log('[ContentTcu] scrollToHeading - currentContentKey:', this.currentContentKey);
    console.log('[ContentTcu] scrollToHeading - currentHeadings:', this.currentHeadings);
    
    // Aguarda um pouco para garantir que o DOM foi atualizado
    setTimeout(() => {
      console.log('[ContentTcu] scrollToHeading - Iniciando busca do elemento após timeout');
      
      // Primeiro tenta encontrar dentro do conteúdo atual
      const contentElement = this.elementRef.nativeElement.querySelector(
        `[data-content-key="${this.currentContentKey}"]`
      );
      
      console.log('[ContentTcu] scrollToHeading - contentElement encontrado:', !!contentElement);
      
      let element: HTMLElement | null = null;
      
      if (contentElement) {
        // Busca dentro do elemento de conteúdo atual
        const escapedId = CSS.escape(headingId);
        console.log('[ContentTcu] scrollToHeading - Buscando elemento com ID:', escapedId);
        element = contentElement.querySelector(`#${escapedId}`) as HTMLElement;
        console.log('[ContentTcu] scrollToHeading - Elemento encontrado dentro do contentElement:', !!element);
        
        // Debug: lista todos os headings dentro do contentElement
        const allHeadings = contentElement.querySelectorAll('h1, h2');
        console.log('[ContentTcu] scrollToHeading - Todos os headings no contentElement:', allHeadings.length);
        allHeadings.forEach((h: HTMLElement, idx: number) => {
          console.log(`[ContentTcu] scrollToHeading - Heading ${idx}:`, {
            id: h.id,
            tagName: h.tagName,
            text: h.textContent?.trim().substring(0, 50)
          });
        });
      }
      
      // Fallback: busca globalmente
      if (!element) {
        console.log('[ContentTcu] scrollToHeading - Tentando busca global');
        element = document.getElementById(headingId);
        console.log('[ContentTcu] scrollToHeading - Elemento encontrado globalmente:', !!element);
      }
      
      if (element) {
        console.log('[ContentTcu] scrollToHeading - Elemento encontrado:', {
          id: element.id,
          tagName: element.tagName,
          text: element.textContent?.trim().substring(0, 50)
        });
        
        // Encontra o container de scroll (tab-content) e a barra de navegação
        const scrollContainer = this.elementRef.nativeElement.querySelector('.tab-content');
        const tabsNavigation = this.elementRef.nativeElement.querySelector('.tabs-navigation');
        
        console.log('[ContentTcu] scrollToHeading - scrollContainer encontrado:', !!scrollContainer);
        console.log('[ContentTcu] scrollToHeading - tabsNavigation encontrado:', !!tabsNavigation);
        
        if (scrollContainer) {
          // Calcula o offset da barra de navegação
          const offset = tabsNavigation ? tabsNavigation.offsetHeight : 0;
          console.log('[ContentTcu] scrollToHeading - Offset da navegação:', offset);
          
          // Método 1: Tenta usar scrollIntoView primeiro (mais confiável)
          // Mas precisamos fazer scroll no container, não na window
          // Então vamos calcular manualmente usando getBoundingClientRect corretamente
          
          // Obtém a posição atual do scroll do container
          const currentScrollTop = scrollContainer.scrollTop;
          
          // Obtém as posições relativas à viewport
          const containerRect = scrollContainer.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();
          
          // Calcula a posição do elemento relativa ao topo do container
          // Quando o elemento está muito longe da viewport, getBoundingClientRect pode não ser preciso
          // Vamos usar uma abordagem mais confiável: encontrar o elemento dentro do contentElement
          const contentElement = this.elementRef.nativeElement.querySelector(
            `[data-content-key="${this.currentContentKey}"]`
          );
          
          let scrollPosition: number;
          
          if (contentElement && contentElement.contains(element)) {
            // Método mais confiável: calcula offsetTop relativo ao contentElement
            let elementOffsetTop = 0;
            let current: HTMLElement | null = element;
            
            // Sobe na hierarquia até chegar ao contentElement
            while (current && current !== contentElement) {
              elementOffsetTop += current.offsetTop;
              current = current.offsetParent as HTMLElement | null;
            }
            
            // Adiciona o offsetTop do contentElement em relação ao scrollContainer
            if (contentElement instanceof HTMLElement) {
              let contentOffsetTop = 0;
              let contentParent: HTMLElement | null = contentElement;
              while (contentParent && contentParent !== scrollContainer) {
                contentOffsetTop += contentParent.offsetTop;
                contentParent = contentParent.offsetParent as HTMLElement | null;
              }
              elementOffsetTop += contentOffsetTop;
            }
            
            scrollPosition = elementOffsetTop - offset - 10;
            
            console.log('[ContentTcu] scrollToHeading - Usando método offsetTop:', {
              elementOffsetTop,
              contentOffsetTop: contentElement instanceof HTMLElement ? contentElement.offsetTop : 0,
              offsetNavegacao: offset,
              scrollPositionFinal: scrollPosition
            });
          } else {
            // Fallback: usa getBoundingClientRect
            const relativePosition = elementRect.top - containerRect.top + currentScrollTop;
            scrollPosition = relativePosition - offset - 10;
            
            console.log('[ContentTcu] scrollToHeading - Usando método getBoundingClientRect:', {
              containerRectTop: containerRect.top,
              elementRectTop: elementRect.top,
              currentScrollTop,
              relativePosition,
              offsetNavegacao: offset,
              scrollPositionFinal: scrollPosition
            });
          }
          
          // Verifica se o container tem scrollHeight suficiente
          const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
          
          console.log('[ContentTcu] scrollToHeading - Informações do container:', {
            scrollHeight: scrollContainer.scrollHeight,
            clientHeight: scrollContainer.clientHeight,
            maxScroll,
            scrollPositionCalculado: scrollPosition,
            temScroll: maxScroll > 0,
            offsetNavegacao: offset
          });
          
          // Calcula o offset total necessário (Tab Group + margem)
          const tabsNavigationHeight = tabsNavigation ? tabsNavigation.offsetHeight : 0;
          const totalOffset = tabsNavigationHeight + 10; // 10px de margem extra
          
          console.log('[ContentTcu] scrollToHeading - Offset total necessário:', {
            tabsNavigationHeight,
            totalOffset
          });
          
          // Usa scrollIntoView com ajuste manual para considerar o Tab Group
          // Primeiro faz scroll para o elemento
          console.log('[ContentTcu] scrollToHeading - Executando scrollIntoView');
          
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
          
          console.log('[ContentTcu] scrollToHeading - scrollIntoView executado');
          
          // Depois ajusta o offset do Tab Group após um pequeno delay
          // Usa um delay maior para garantir que o scrollIntoView completou
          setTimeout(() => {
            // Verifica a posição atual do elemento
            const elementRect = element.getBoundingClientRect();
            const tabsNavigationRect = tabsNavigation ? tabsNavigation.getBoundingClientRect() : null;
            
            // Posição esperada: logo abaixo do Tab Group + margem
            const expectedTop = tabsNavigationRect ? tabsNavigationRect.bottom + 10 : 10;
            
            const currentTop = elementRect.top;
            const difference = currentTop - expectedTop;
            
            console.log('[ContentTcu] scrollToHeading - Verificando posição após scrollIntoView:', {
              elementTop: currentTop,
              tabsNavigationBottom: tabsNavigationRect ? tabsNavigationRect.bottom : 0,
              expectedTop,
              difference,
              precisaAjustar: Math.abs(difference) > 5
            });
            
            // Se a diferença for maior que 5px, ajusta
            if (Math.abs(difference) > 5) {
              console.log('[ContentTcu] scrollToHeading - Ajustando posição para considerar Tab Group:', difference);
              
              // Se o container tem scroll, ajusta o scroll do container
              if (maxScroll > 0) {
                const currentScrollTop = scrollContainer.scrollTop;
                scrollContainer.scrollTo({
                  top: currentScrollTop + difference,
                  behavior: 'smooth'
                });
                console.log('[ContentTcu] scrollToHeading - Container scroll ajustado');
              } else {
                // Se não tem scroll no container, ajusta window scroll
                window.scrollBy({
                  top: difference,
                  behavior: 'smooth'
                });
                console.log('[ContentTcu] scrollToHeading - Window scroll ajustado');
              }
            } else {
              console.log('[ContentTcu] scrollToHeading - Posição já está correta, sem ajuste necessário');
            }
          }, 500); // Aguarda o scrollIntoView completar (aumentado para 500ms)
          
          // Verifica se o scroll funcionou após um pequeno delay
          setTimeout(() => {
            const newScrollTop = scrollContainer.scrollTop;
            const elementRectAfter = element.getBoundingClientRect();
            const containerRectAfter = scrollContainer.getBoundingClientRect();
            const elementVisibleTop = elementRectAfter.top - containerRectAfter.top;
            
            console.log('[ContentTcu] scrollToHeading - Verificação após scroll:', {
              scrollTopAtual: newScrollTop,
              elementoVisivelTop: elementVisibleTop,
              offsetEsperado: offset + 10,
              dentroDoViewport: elementVisibleTop >= (offset + 10) && elementVisibleTop <= containerRectAfter.height
            });
          }, 500);
        } else {
          console.log('[ContentTcu] scrollToHeading - Usando fallback window.scrollTo');
          // Fallback: se não encontrar o container, usa window scroll
          const tabsNavigationHeight = tabsNavigation ? tabsNavigation.offsetHeight : 0;
          const totalOffset = tabsNavigationHeight + 10; // Tab Group + margem
          
          // Usa scrollIntoView primeiro
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
          
          // Depois ajusta para considerar o Tab Group
          setTimeout(() => {
            const elementRect = element.getBoundingClientRect();
            const tabsNavigationRect = tabsNavigation ? tabsNavigation.getBoundingClientRect() : null;
            const expectedTop = tabsNavigationRect ? tabsNavigationRect.bottom + 10 : 10;
            const difference = elementRect.top - expectedTop;
            
            if (Math.abs(difference) > 5) {
              console.log('[ContentTcu] scrollToHeading - Ajustando window scroll para considerar Tab Group:', difference);
              window.scrollBy({
                top: difference,
                behavior: 'smooth'
              });
            }
          }, 500);
        }
      } else {
        console.error(`[ContentTcu] scrollToHeading - Heading com ID "${headingId}" não encontrado no DOM`);
        console.log('[ContentTcu] scrollToHeading - Tentando buscar todos os elementos com ID no documento');
        const allElementsWithId = document.querySelectorAll(`[id="${headingId}"]`);
        console.log('[ContentTcu] scrollToHeading - Elementos encontrados com esse ID:', allElementsWithId.length);
      }
    }, 150); // Aumentado para 150ms para garantir renderização completa
  }

}
