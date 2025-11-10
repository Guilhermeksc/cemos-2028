import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashCardsService } from '../../services/flashcards.service';
import { PerguntasService } from '../../services/perguntas.service';
import { FlashCards as FlashCard, Bibliografia } from '../../interfaces/perguntas.interface';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface FlashCardDisplay extends FlashCard {
  isFlipped: boolean;
}

@Component({
  selector: 'app-flash-cards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flash-cards.html',
  styleUrl: './flash-cards.scss'
})
export class FlashCardsComponent implements OnInit, OnDestroy {
  @Input() bibliografiaIds: number[] = [];
  @Input() bibliografiaPath?: string; // Rota para voltar à bibliografia
  
  private flashcardsService = inject(FlashCardsService);
  private perguntasService = inject(PerguntasService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  // Estados do componente
  isLoading = false;
  bibliografias: Bibliografia[] = [];
  allFlashCards: FlashCard[] = [];
  displayedFlashCards: FlashCardDisplay[] = [];
  isFullscreen = false;
  
  // Filtros
  selectedBibliografiaId: number | null = null;
  assuntosDisponiveis: string[] = [];
  selectedAssunto: string = '';
  
  // Configuração
  maxCardsToShow = 6;

  ngOnInit() {
    console.log('🎴 Flash Cards Component inicializado');
    console.log('📚 Bibliografia IDs recebidos:', this.bibliografiaIds);
    
    if (this.bibliografiaIds.length > 0) {
      this.loadData();
    }

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
    document.body.classList.remove('flashcards-fullscreen-active');
    this.removeFullscreenListeners();
    this.destroy$.next();
    this.destroy$.complete();
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
      document.body.classList.remove('flashcards-fullscreen-active');
      
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
   * Carrega bibliografias e flash cards
   */
  private loadData() {
    this.isLoading = true;
    console.log('📥 Carregando dados...');

    // Carregar bibliografias
    this.perguntasService.getBibliografias({ page_size: 100 })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          // Filtrar apenas as bibliografias solicitadas
          this.bibliografias = response.results.filter(b => 
            this.bibliografiaIds.includes(b.id)
          );
          
          console.log('📚 Bibliografias carregadas:', this.bibliografias);
          
          // Carregar flash cards de todas as bibliografias
          this.loadAllFlashCards();
        },
        error: (error) => {
          console.error('❌ Erro ao carregar bibliografias:', error);
          this.isLoading = false;
        }
      });
  }

  /**
   * Carrega todos os flash cards das bibliografias selecionadas
   */
  private loadAllFlashCards() {
    console.log('🎴 Carregando flash cards das bibliografias:', this.bibliografiaIds);

    // Criar array de observables para cada bibliografia
    const requests = this.bibliografiaIds.map(id => 
      this.flashcardsService.getFlashCardsByBibliografia(id)
    );

    forkJoin(requests)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (responses) => {
          // Combinar todos os flash cards
          this.allFlashCards = responses.flat();
          
          console.log('✅ Total de flash cards carregados:', this.allFlashCards.length);
          console.log('📊 Flash cards por bibliografia:', 
            responses.map((cards, idx) => ({
              bibliografiaId: this.bibliografiaIds[idx],
              count: cards.length
            }))
          );

          // Extrair assuntos únicos
          this.extractAssuntos();
          
          // Carregar flash cards aleatórios iniciais
          this.loadRandomFlashCards();
          
          this.isLoading = false;
        },
        error: (error) => {
          console.error('❌ Erro ao carregar flash cards:', error);
          this.isLoading = false;
        }
      });
  }

  /**
   * Extrai lista única de assuntos dos flash cards
   */
  private extractAssuntos() {
    const assuntosSet = new Set<string>();
    
    this.allFlashCards.forEach(card => {
      if (card.assunto) {
        assuntosSet.add(card.assunto);
      }
    });

    this.assuntosDisponiveis = Array.from(assuntosSet).sort();
    
    console.log('🏷️ Assuntos disponíveis:', this.assuntosDisponiveis);
  }

  /**
   * Carrega flash cards aleatórios baseado nos filtros
   */
  loadRandomFlashCards() {
    console.log('🎲 Carregando flash cards aleatórios...');
    console.log('🔍 Filtros ativos:', {
      bibliografiaId: this.selectedBibliografiaId,
      assunto: this.selectedAssunto
    });

    // Filtrar flash cards
    let filteredCards = [...this.allFlashCards];

    // Filtrar por bibliografia se selecionada
    if (this.selectedBibliografiaId) {
      filteredCards = filteredCards.filter(card => 
        card.bibliografia === this.selectedBibliografiaId
      );
      console.log(`📚 Filtrado por bibliografia ${this.selectedBibliografiaId}:`, filteredCards.length);
    }

    // Filtrar por assunto se selecionado
    if (this.selectedAssunto) {
      filteredCards = filteredCards.filter(card => 
        card.assunto === this.selectedAssunto
      );
      console.log(`🏷️ Filtrado por assunto "${this.selectedAssunto}":`, filteredCards.length);
    }

    // Verificar se há cards disponíveis
    if (filteredCards.length === 0) {
      console.warn('⚠️ Nenhum flash card encontrado com os filtros aplicados');
      this.displayedFlashCards = [];
      return;
    }

    // Embaralhar e selecionar até maxCardsToShow
    const shuffled = this.shuffleArray(filteredCards);
    const selected = shuffled.slice(0, Math.min(this.maxCardsToShow, shuffled.length));

    // Converter para FlashCardDisplay com isFlipped
    this.displayedFlashCards = selected.map(card => ({
      ...card,
      isFlipped: false
    }));

    console.log('✅ Flash cards exibidos:', this.displayedFlashCards.length);
  }

  /**
   * Embaralha um array
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Vira um card específico
   */
  flipCard(card: FlashCardDisplay) {
    card.isFlipped = !card.isFlipped;
    console.log(`🔄 Card ${card.id} ${card.isFlipped ? 'virado' : 'desvirado'}`);
  }

  /**
   * Quando a bibliografia é alterada, atualizar assuntos disponíveis
   */
  onBibliografiaChange() {
    console.log('📚 Bibliografia alterada:', this.selectedBibliografiaId);
    
    // Resetar assunto selecionado
    this.selectedAssunto = '';
    
    // Se uma bibliografia específica foi selecionada, filtrar assuntos
    if (this.selectedBibliografiaId) {
      const cardsFromBibliografia = this.allFlashCards.filter(card => 
        card.bibliografia === this.selectedBibliografiaId
      );
      
      const assuntosSet = new Set<string>();
      cardsFromBibliografia.forEach(card => {
        if (card.assunto) {
          assuntosSet.add(card.assunto);
        }
      });
      
      this.assuntosDisponiveis = Array.from(assuntosSet).sort();
    } else {
      // Se "Todas" foi selecionado, mostrar todos os assuntos
      this.extractAssuntos();
    }
    
    // Recarregar cards
    this.loadRandomFlashCards();
  }

  /**
   * Quando o assunto é alterado
   */
  onAssuntoChange() {
    console.log('🏷️ Assunto alterado:', this.selectedAssunto);
    this.loadRandomFlashCards();
  }

  /**
   * Reseta todos os filtros
   */
  resetFilters() {
    console.log('🔄 Resetando filtros...');
    this.selectedBibliografiaId = null;
    this.selectedAssunto = '';
    this.extractAssuntos();
    this.loadRandomFlashCards();
  }

  /**
   * Retorna o nome da bibliografia por ID
   */
  getBibliografiaNome(id: number): string {
    const bib = this.bibliografias.find(b => b.id === id);
    return bib ? bib.titulo : 'Desconhecido';
  }

  /**
   * Retorna estatísticas
   */
  getStats() {
    return {
      total: this.allFlashCards.length,
      exibidos: this.displayedFlashCards.length,
      bibliografias: this.bibliografias.length,
      assuntos: this.assuntosDisponiveis.length
    };
  }

  /**
   * TrackBy function para otimizar renderização do ngFor
   */
  trackByCardId(index: number, card: FlashCardDisplay): number {
    return card.id;
  }

  /**
   * Abre o modo fullscreen usando a API do navegador
   */
  async openFullscreen() {
    if (this.displayedFlashCards.length === 0) {
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
      document.body.classList.add('flashcards-fullscreen-active');
      
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
      document.body.classList.add('flashcards-fullscreen-active');
      
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
      document.body.classList.add('flashcards-fullscreen-active');
      
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
      document.body.classList.remove('flashcards-fullscreen-active');
      
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
      document.body.classList.remove('flashcards-fullscreen-active');
      
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
   * Navega de volta para a página de bibliografia
   */
  goToBibliografia() {
    if (this.bibliografiaPath) {
      this.router.navigate([this.bibliografiaPath]);
    }
  }
}
