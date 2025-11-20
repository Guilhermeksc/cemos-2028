import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Conceitos as ConceitosInterface } from '../../interfaces/informacoes.interface';
import { Bibliografia } from '../../interfaces/perguntas.interface';
import { InformacoesService } from '../../services/informacoes.service';
import { PerguntasService } from '../../services/perguntas.service';
import { ConceitosTableComponent } from '../conceitos-table/conceitos-table';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-conceitos',
  standalone: true,
  imports: [CommonModule, FormsModule, ConceitosTableComponent, MatButtonModule, MatIconModule],
  templateUrl: './conceitos.html',
  styleUrls: ['./conceitos.scss']
})
export class ConceitosComponent implements OnInit, OnDestroy {

  // Filtros (UI)
  selectedAssunto: string = '';
  assuntosDisponiveis: string[] = [];
  @Input() bibliografiaIds: number[] = []; // IDs das bibliografias a serem exibidas
  @Input() title: string = 'Conceitos'; // Título customizável
  @Input() emptyMessage: string = 'Nenhum conceito encontrado. Adicione conceitos para visualizá-los aqui.';
  // Paths/options to enable navigation buttons
  @Input() conceitosPath: string = '';
  @Input() mediaPath: string = '';
  @Input() perguntasPath: string = '';
  @Input() flashcardsPath: string = '';
  @Input() backToBibliografiaPath: string = ''; // ex: '/home/app6-geopolitica-relacoes-internacionais/bibliografia/vinganca-geografia'
  // Breadcrumb customization (used by parent modules to pass a module name/icon)
  @Input() moduleLabel: string = '';
  @Input() moduleEmoji: string = '';
  @Input() showHeader: boolean = true;
  
  
  conceitos: ConceitosInterface[] = [];
  bibliografias: Bibliografia[] = [];
  selectedBibliografiaId: number | null = null;
  loading: boolean = false;
  error: string | null = null;
  isFullscreen = false;

  // Router injection using functional `inject` (same approach used in flash-cards.ts)
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  // Compatibility alias for templates that use `isLoading` (some templates expect this name)
  get isLoading(): boolean {
    return this.loading;
  }

  set isLoading(value: boolean) {
    this.loading = value;
  }
  constructor(
    private informacoesService: InformacoesService,
    private perguntasService: PerguntasService
  ) {}

  ngOnInit() {
    // Inferir base do módulo para navegação (fallbacks usados pelos botões)
    this.computeModuleBase();

    this.loadData();

    // Escutar eventos de fullscreen para sincronizar o estado
    this.setupFullscreenListeners();
  }

  ngOnDestroy() {
    // Garantir que saia do fullscreen ao destruir o componente
    if (this.isFullscreen) {
      this.exitFullscreen();
    }
    // Garantir que o overflow do body seja restaurado ao destruir o componente
    document.body.style.overflow = '';
    document.body.classList.remove('conceitos-fullscreen-active');
    this.removeFullscreenListeners();
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData() {
    this.loading = true;
    this.error = null;

    // Se não há IDs específicos, carrega todas as bibliografias
    const bibliografiasRequest = this.bibliografiaIds.length > 0 
      ? this.perguntasService.getBibliografias({ page_size: 1000 })
      : this.perguntasService.getBibliografias({ page_size: 1000 });

    // Usar getAllConceitos para buscar todas as páginas automaticamente
    const conceitosRequest = this.informacoesService.getAllConceitos({ page_size: 100 });

    forkJoin({
      bibliografias: bibliografiasRequest,
      conceitos: conceitosRequest
    }).subscribe({
      next: (response) => {
        // getAllConceitos retorna um array direto, não um objeto com results
        const allConceitos = response.conceitos;
        
        // Filtra bibliografias se IDs específicos foram fornecidos
        if (this.bibliografiaIds.length > 0) {
          this.bibliografias = response.bibliografias.results.filter(
            bib => this.bibliografiaIds.includes(bib.id)
          );
          // Filtra conceitos apenas das bibliografias especificadas
          this.conceitos = allConceitos.filter(conceito =>
            this.bibliografiaIds.includes(conceito.bibliografia)
          );
        } else {
          // Filtra apenas bibliografias que têm conceitos
          const conceitosWithBib = allConceitos.map(c => c.bibliografia);
          const uniqueBibIds = [...new Set(conceitosWithBib)];
          this.bibliografias = response.bibliografias.results.filter(
            bib => uniqueBibIds.includes(bib.id)
          );
          this.conceitos = allConceitos;
        }

        // Define a primeira bibliografia como selecionada se houver alguma
        if (this.bibliografias.length > 0) {
          this.selectedBibliografiaId = this.bibliografias[0].id;
        } else {
          this.selectedBibliografiaId = null;
        }

        // Extrair assuntos únicos disponíveis (conforme bibliografia selecionada)
        this.extractAssuntos(this.selectedBibliografiaId);
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar dados:', error);
        
        // Tratamento específico para erro 401
        if (error.status === 401) {
          this.error = 'Acesso não autorizado. Por favor, faça login para continuar.';
        } else if (error.status === 0) {
          this.error = 'Erro de conexão. Verifique se o servidor está rodando.';
        } else {
          this.error = 'Erro ao carregar conceitos. Tente novamente.';
        }
        
        this.loading = false;
      }
    });
  }

  /** Extrai assuntos únicos da lista de conceitos (considera apenas conceitos filtrados por bibliografiaIds) */
  private extractAssuntos(bibliografiaId: number | null = null) {
    const set = new Set<string>();
    // Usa os conceitos já filtrados por bibliografiaIds
    const conceitosParaAnalisar = this.conceitosFiltradosPorBibliografia;

    conceitosParaAnalisar.forEach(c => {
      const matchesBib = bibliografiaId ? c.bibliografia === bibliografiaId : true;
      if (matchesBib && c.assunto && typeof c.assunto === 'string' && c.assunto.trim().length > 0) {
        set.add(c.assunto.trim());
      }
    });

    this.assuntosDisponiveis = Array.from(set).sort();

    // Se o assunto atualmente selecionado não existe mais na lista, resetá-lo
    if (this.selectedAssunto && !this.assuntosDisponiveis.includes(this.selectedAssunto)) {
      this.selectedAssunto = '';
    }
  }

  onBibliografiaChange() {
    // Quando a bibliografia é alterada via select, atualizar a lista de assuntos
    // para conter apenas assuntos daquela bibliografia. Também sincroniza o tab.
    if (this.selectedBibliografiaId) {
      // sincroniza tab
      // (a seleção do tab já é feita pelo método selectBibliografia quando o usuário clica;
      // aqui apenas garantimos que a variável está coerente)
    }
    this.extractAssuntos(this.selectedBibliografiaId);
    // limpar assunto selecionado caso não exista nos novos assuntos
    this.selectedAssunto = '';
  }

  onAssuntoChange() {
    // reload view via getter filteredConceitos
  }

  resetFilters() {
    this.selectedBibliografiaId = null;
    this.selectedAssunto = '';
  }

  selectBibliografia(bibliografiaId: number) {
    this.selectedBibliografiaId = bibliografiaId;
  }

  /**
   * Retorna os conceitos filtrados pelas bibliografias especificadas (se houver bibliografiaIds)
   * antes de aplicar os filtros de UI (bibliografia selecionada e assunto)
   */
  get conceitosFiltradosPorBibliografia(): ConceitosInterface[] {
    if (this.bibliografiaIds.length > 0) {
      return this.conceitos.filter(conceito => 
        this.bibliografiaIds.includes(conceito.bibliografia)
      );
    }
    return this.conceitos;
  }

  get filteredConceitos(): ConceitosInterface[] {
    // Começa com os conceitos já filtrados por bibliografiaIds (se aplicável)
    let list = [...this.conceitosFiltradosPorBibliografia];

    if (this.selectedBibliografiaId) {
      list = list.filter(conceito => conceito.bibliografia === this.selectedBibliografiaId);
    }

    if (this.selectedAssunto && this.selectedAssunto.trim().length > 0) {
      const needle = this.selectedAssunto.trim().toLowerCase();
      list = list.filter(conceito => (conceito.assunto || '').toString().toLowerCase().includes(needle));
    }

    return list;
  }

  get selectedBibliografia(): Bibliografia | null {
    if (!this.selectedBibliografiaId) return null;
    return this.bibliografias.find(bib => bib.id === this.selectedBibliografiaId) || null;
  }

  loadConceitos() {
    this.loadData();
  }

  trackByBibliografia(index: number, bibliografia: Bibliografia): number {
    return bibliografia.id;
  }

  getConceptCountByBibliografia(bibliografiaId: number): number {
    return this.conceitosFiltradosPorBibliografia.filter(conceito => conceito.bibliografia === bibliografiaId).length;
  }

  getEmptyMessage(): string {
    if (this.bibliografias.length > 1 && this.selectedBibliografia) {
      return `Nenhum conceito encontrado para a bibliografia "${this.selectedBibliografia.titulo}".`;
    }
    return this.emptyMessage;
  }


  private moduleBasePath: string = '/home';

  /**
   * Tenta inferir a base do módulo a partir da URL atual.
   * Exemplo: '/home/app6-geopolitica-relacoes-internacionais/flash-cards' -> '/home/app6-geopolitica-relacoes-internacionais'
   */
  private computeModuleBase() {
    try {
      const url = this.router.url || '';
      const segments = url.split('/').filter(Boolean); // remove empty
      const homeIndex = segments.indexOf('home');
      if (homeIndex >= 0 && segments.length > homeIndex + 1) {
        const moduleSeg = segments[homeIndex + 1];
        this.moduleBasePath = `/home/${moduleSeg}`;
      } else if (segments.length > 0) {
        // Fallback: take first segment as module
        this.moduleBasePath = `/${segments[0]}`;
      } else {
        this.moduleBasePath = '/home';
      }
    } catch (err) {
      console.warn('Não foi possível inferir moduleBasePath da URL:', err);
      this.moduleBasePath = '/home';
    }
  }

  /**
   * Retorna um path para navegação. Se um input específico foi fornecido, usa ele;
   * caso contrário, monta a rota com base no módulo inferido.
   * segment deve ser o segmento final como 'bibliografia', 'media', 'perguntas', 'conceitos' ou 'flash-cards'
   */
  getPath(segment: string): string {
    if (!segment) return '';
    switch (segment) {
      case 'bibliografia':
        return this.backToBibliografiaPath || `${this.moduleBasePath}/bibliografia`;
      case 'flash-cards':
        return this.flashcardsPath || `${this.moduleBasePath}/flash-cards`;
      case 'media':
        return this.mediaPath || `${this.moduleBasePath}/media`;
      case 'perguntas':
        return this.perguntasPath || `${this.moduleBasePath}/perguntas`;
      case 'conceitos':
        return this.conceitosPath || `${this.moduleBasePath}/conceitos`;
      default:
        return `${this.moduleBasePath}/${segment}`;
    }
  }

  /**
   * Navega para um caminho fornecido (aceita caminhos absolutos iniciando com '/')
   */
  navigateTo(path: string) {
    if (!path) return;
    const segments = path.startsWith('/') ? path.substring(1).split('/') : path.split('/');
    this.router.navigate(segments).catch(err => console.error('Erro ao navegar:', err));
  }

  /**
   * Volta para a bibliografia específica quando um path é fornecido.
   * Se `backToBibliografiaPath` não estiver definido, tenta navegar para a home.
   */
  navigateBackToBibliografia() {
    if (this.backToBibliografiaPath) {
      this.navigateTo(this.backToBibliografiaPath);
      return;
    }

    // Se estivermos em um contexto com uma única bibliografia conhecida, podemos
    // tentar navegar para a lista de bibliografias (fallback) — usar '/home' como fallback final.
    if (this.bibliografiaIds.length === 1) {
      // tentativa conservadora: navegar para a rota de bibliografia do módulo pai não é trivial
      // sem informação adicional, então apenas navegar para '/home' como fallback.
      this.router.navigate(['/home']);
      return;
    }

    this.router.navigate(['/home']);
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
      document.body.classList.remove('conceitos-fullscreen-active');
      
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
   * Abre o modo fullscreen usando a API do navegador
   */
  async openFullscreen() {
    if (this.filteredConceitos.length === 0) {
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
        document.body.classList.add('conceitos-fullscreen-active');
        
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
      document.body.classList.add('conceitos-fullscreen-active');
      
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
      
      console.log('🖥️ Modo fullscreen ativado');
    } catch (error) {
      console.error('❌ Erro ao entrar em fullscreen:', error);
      // Fallback para overlay em caso de erro
      this.isFullscreen = true;
      document.body.style.overflow = 'hidden';
      document.body.classList.add('conceitos-fullscreen-active');
      
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
        document.body.classList.remove('conceitos-fullscreen-active');
        
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
      document.body.classList.remove('conceitos-fullscreen-active');
      
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
}
