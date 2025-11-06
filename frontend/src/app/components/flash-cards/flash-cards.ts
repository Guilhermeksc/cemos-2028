import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  
  private flashcardsService = inject(FlashCardsService);
  private perguntasService = inject(PerguntasService);
  private destroy$ = new Subject<void>();
  private fullscreenChangeHandler = this.handleFullscreenChange.bind(this);
  private webkitFullscreenChangeHandler = this.handleFullscreenChange.bind(this);
  private mozFullscreenChangeHandler = this.handleFullscreenChange.bind(this);

  // Estados do componente
  isLoading = false;
  bibliografias: Bibliografia[] = [];
  allFlashCards: FlashCard[] = [];
  displayedFlashCards: FlashCardDisplay[] = [];
  
  // Filtros
  selectedBibliografiaId: number | null = null;
  assuntosDisponiveis: string[] = [];
  selectedAssunto: string = '';
  
  // Configuração
  maxCardsToShow = 6;
  
  // Estado do fullscreen
  isFullscreen = false;

  ngOnInit() {
    console.log('🎴 Flash Cards Component inicializado');
    console.log('📚 Bibliografia IDs recebidos:', this.bibliografiaIds);
    
    if (this.bibliografiaIds.length > 0) {
      this.loadData();
    }

    // Listeners para quando o usuário sai do fullscreen usando ESC (suporte multi-navegador)
    document.addEventListener('fullscreenchange', this.fullscreenChangeHandler);
    document.addEventListener('webkitfullscreenchange', this.webkitFullscreenChangeHandler);
    document.addEventListener('mozfullscreenchange', this.mozFullscreenChangeHandler);
  }

  ngOnDestroy() {
    // Remove listeners do fullscreen
    document.removeEventListener('fullscreenchange', this.fullscreenChangeHandler);
    document.removeEventListener('webkitfullscreenchange', this.webkitFullscreenChangeHandler);
    document.removeEventListener('mozfullscreenchange', this.mozFullscreenChangeHandler);
    
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Handler para mudanças no estado de fullscreen (ex: ESC)
   */
  private handleFullscreenChange() {
    const isFullscreenActive = 
      document.fullscreenElement || 
      (document as any).webkitFullscreenElement || 
      (document as any).mozFullScreenElement;
    
    if (!isFullscreenActive && this.isFullscreen) {
      // Usuário saiu do fullscreen (provavelmente ESC)
      this.isFullscreen = false;
      document.body.classList.remove('flashcards-fullscreen-active');
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
   * Vira todos os cards
   */
  flipAllCards() {
    const targetState = !this.displayedFlashCards[0]?.isFlipped;
    this.displayedFlashCards.forEach(card => {
      card.isFlipped = targetState;
    });
    console.log(`🔄 Todos os cards ${targetState ? 'virados' : 'desvirados'}`);
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

  get topRowCards(): FlashCardDisplay[] {
    return this.displayedFlashCards.slice(0, 3);
  }

  get bottomRowCards(): FlashCardDisplay[] {
    return this.displayedFlashCards.slice(3, 6);
  }

  /**
   * TrackBy function para otimizar renderização do ngFor
   */
  trackByCardId(index: number, card: FlashCardDisplay): number {
    return card.id;
  }

  /**
   * Alterna o modo fullscreen
   */
  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
    
    if (this.isFullscreen) {
      // Adiciona classe ao body para permitir controle CSS global se necessário
      document.body.classList.add('flashcards-fullscreen-active');
      
      // Tenta usar Fullscreen API do navegador (com suporte a prefixos)
      const element = document.querySelector('.main-container') as HTMLElement;
      if (element) {
        const requestFullscreen = 
          element.requestFullscreen || 
          (element as any).webkitRequestFullscreen || 
          (element as any).mozRequestFullscreen || 
          (element as any).msRequestFullscreen;
        
        if (requestFullscreen) {
          requestFullscreen.call(element).catch((err: any) => {
            console.log('Erro ao entrar em fullscreen:', err);
            // Se falhar, mantém o estado visual mesmo sem fullscreen nativo
          });
        }
      }
    } else {
      // Remove classe do body
      document.body.classList.remove('flashcards-fullscreen-active');
      
      // Sai do fullscreen do navegador (com suporte a prefixos)
      const exitFullscreen = 
        document.exitFullscreen || 
        (document as any).webkitExitFullscreen || 
        (document as any).mozCancelFullScreen || 
        (document as any).msExitFullscreen;
      
      if (exitFullscreen && (document.fullscreenElement || (document as any).webkitFullscreenElement)) {
        exitFullscreen.call(document).catch((err: any) => {
          console.log('Erro ao sair do fullscreen:', err);
        });
      }
    }
  }
}
