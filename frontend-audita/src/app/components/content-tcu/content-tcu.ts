import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, HostListener, ElementRef } from '@angular/core';
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
export class ContentTcu implements OnInit, OnDestroy {
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
    private elementRef: ElementRef
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

    // Carrega o conteúdo se ainda não foi carregado
    const tabGroup = this.config.tabGroups.find(tg => tg.id === tabGroupId);
    const item = tabGroup?.items.find(i => i.id === itemId);
    
    if (item && !this.contentMap.has(`${tabGroupId}-${itemId}`)) {
      this.loadContent(`${tabGroupId}-${itemId}`, item.markdownPath);
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
        // Encontra o container de scroll (tab-content) e a barra de navegação
        const scrollContainer = this.elementRef.nativeElement.querySelector('.tab-content');
        const tabsNavigation = this.elementRef.nativeElement.querySelector('.tabs-navigation');
        
        if (scrollContainer) {
          // Calcula o offset da barra de navegação
          const offset = tabsNavigation ? tabsNavigation.offsetHeight : 0;
          
          // Obtém a posição do elemento relativa ao container de scroll
          const containerRect = scrollContainer.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();
          
          // Calcula a posição relativa dentro do container
          const relativeTop = elementRect.top - containerRect.top + scrollContainer.scrollTop;
          
          // Faz o scroll dentro do container considerando o offset da barra de navegação
          scrollContainer.scrollTo({
            top: relativeTop - offset,
            behavior: 'smooth'
          });
        } else {
          // Fallback: se não encontrar o container, usa window scroll
          const offset = tabsNavigation ? tabsNavigation.offsetHeight : 0;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }, 100);
  }

}
