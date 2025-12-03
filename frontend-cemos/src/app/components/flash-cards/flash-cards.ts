import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
export class FlashCardsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() bibliografiaIds: number[] = [];
  @Input() bibliografiaPath?: string; // Rota para voltar à bibliografia
  @Input() title?: string; // Título opcional para adicionar ao cabeçalho
  
  private flashcardsService = inject(FlashCardsService);
  private perguntasService = inject(PerguntasService);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  private destroy$ = new Subject<void>();

  // Estados do componente
  isLoading = false;
  bibliografias: Bibliografia[] = [];
  allFlashCards: FlashCard[] = [];
  displayedFlashCards: FlashCardDisplay[] = [];
  isFullscreen = false;
  isGeneratingPDF: boolean = false;
  
  // Filtros
  selectedBibliografiaId: number | null = null;
  assuntosDisponiveis: string[] = [];
  selectedAssunto: string = '';
  
  // Configuração
  maxCardsToShow = 6;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['title']) {
      console.log('📝 Título alterado:', {
        previousValue: changes['title'].previousValue,
        currentValue: changes['title'].currentValue,
        firstChange: changes['title'].firstChange
      });
    }
  }

  ngOnInit() {
    console.log('🎴 Flash Cards Component inicializado');
    console.log('📚 Bibliografia IDs recebidos:', this.bibliografiaIds);
    console.log('📝 Título recebido:', this.title);
    
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
   * Carrega TODOS os flash cards das bibliografias selecionadas usando paginação completa
   */
  private loadAllFlashCards() {
    console.log('🎴 Carregando TODOS os flash cards das bibliografias (paginação completa):', this.bibliografiaIds);

    // Criar array de observables para cada bibliografia usando o método que busca todas as páginas
    const requests = this.bibliografiaIds.map(id => 
      this.flashcardsService.getAllFlashCardsByBibliografia(id)
    );

    forkJoin(requests)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (responses) => {
          // Combinar todos os flash cards
          this.allFlashCards = responses.flat();
          
          console.log('✅ Total de flash cards carregados (de todas as páginas):', this.allFlashCards.length);
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
    
    // IMPORTANTE: Sempre usar allFlashCards (cache completo) para extrair assuntos
    // Isso garante que TODOS os assuntos da bibliografia estejam sempre visíveis,
    // independentemente do filtro de assunto aplicado
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
    
    console.log('🏷️ Assuntos disponíveis atualizados:', {
      bibliografiaSelecionada: this.selectedBibliografiaId,
      totalAssuntos: this.assuntosDisponiveis.length,
      assuntos: this.assuntosDisponiveis
    });
    
    // Recarregar cards
    this.loadRandomFlashCards();
  }

  /**
   * Quando o assunto é alterado
   * IMPORTANTE: Não atualizar assuntosDisponiveis aqui!
   * A lista de assuntos deve sempre mostrar TODOS os assuntos da bibliografia,
   * independentemente do assunto selecionado para filtro.
   */
  onAssuntoChange() {
    console.log('🏷️ Assunto alterado:', this.selectedAssunto);
    // Apenas recarregar cards com o novo filtro
    // A lista de assuntos disponíveis permanece a mesma
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

  /**
   * Converte os flash cards para PDF pesquisável e faz o download
   */
  async downloadAsPDF() {
    this.isGeneratingPDF = true;

    try {
      await this.downloadAsPDFSearchable();
    } catch (error) {
      console.error('❌ Erro ao gerar PDF pesquisável:', error);
      alert('Erro ao gerar PDF. Por favor, tente novamente.');
    } finally {
      this.isGeneratingPDF = false;
    }
  }

  /**
   * Carrega uma imagem SVG e converte para PNG base64 para uso no PDF
   * jsPDF funciona melhor com PNG, então convertemos SVG para PNG usando canvas
   */
  private async loadImageAsBase64(imagePath: string): Promise<string | null> {
    try {
      const response = await fetch(imagePath);
      if (!response.ok) {
        console.warn(`⚠️ Não foi possível carregar a imagem: ${imagePath}`);
        return null;
      }
      
      const svgText = await response.text();
      
      // Criar um canvas para converter SVG para PNG
      return new Promise((resolve, reject) => {
        const img = new Image();
        const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            if (!ctx) {
              reject(new Error('Não foi possível criar contexto do canvas'));
              return;
            }
            
            // Definir tamanho do canvas (pode ajustar conforme necessário)
            canvas.width = 512; // Tamanho base do SVG
            canvas.height = 512;
            
            // Desenhar SVG no canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Converter para PNG base64
            const pngBase64 = canvas.toDataURL('image/png');
            
            // Limpar URL do objeto
            URL.revokeObjectURL(url);
            
            resolve(pngBase64);
          } catch (error) {
            URL.revokeObjectURL(url);
            reject(error);
          }
        };
        
        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error('Erro ao carregar imagem SVG'));
        };
        
        img.src = url;
      });
    } catch (error) {
      console.error(`❌ Erro ao carregar imagem ${imagePath}:`, error);
      return null;
    }
  }

  /**
   * Gera PDF pesquisável com os flash cards
   * Busca TODOS os flash cards do banco para a bibliografia e assunto selecionados
   */
  private async downloadAsPDFSearchable() {
    // Determinar bibliografias para buscar
    const bibliografiasParaBuscar = this.selectedBibliografiaId 
      ? [this.selectedBibliografiaId]
      : (this.bibliografiaIds.length > 0 ? this.bibliografiaIds : []);
    
    if (bibliografiasParaBuscar.length === 0) {
      alert('Por favor, selecione pelo menos uma bibliografia.');
      return;
    }

    console.log('📚 Buscando TODOS os flash cards do banco para PDF:', {
      bibliografias: bibliografiasParaBuscar,
      assunto: this.selectedAssunto || 'Todos'
    });

    // Buscar todos os flash cards do banco
    const requests = bibliografiasParaBuscar.map(id => {
      const filters: any = { bibliografia: id };
      if (this.selectedAssunto && this.selectedAssunto.trim()) {
        filters.assunto = this.selectedAssunto.trim();
      }
      return this.flashcardsService.getAllFlashCards(filters);
    });

    // Aguardar todas as requisições
    const results = await forkJoin(requests).pipe(takeUntil(this.destroy$)).toPromise();

    if (!results || results.length === 0) {
      alert('Não há flash cards disponíveis para gerar o PDF com os filtros selecionados.');
      return;
    }

    // Combinar resultados de todas as bibliografias
    const allFlashCardsForPDF = results.flat();

    if (allFlashCardsForPDF.length === 0) {
      alert('Não há flash cards disponíveis para gerar o PDF com os filtros selecionados.');
      return;
    }

    console.log('✅ Flash cards carregados para PDF:', {
      total: allFlashCardsForPDF.length,
      bibliografias: bibliografiasParaBuscar
    });

    // Carregar imagens para usar nos cards
    const dangerImagePath = 'assets/img/svg/danger.svg';
    const starImagePath = 'assets/img/svg/star.svg';
    const dangerImageBase64 = await this.loadImageAsBase64(dangerImagePath);
    const starImageBase64 = await this.loadImageAsBase64(starImagePath);
    
    if (dangerImageBase64) {
      console.log('✅ Imagem danger.svg carregada com sucesso');
    } else {
      console.warn('⚠️ Imagem danger.svg não pôde ser carregada, cards com caveira não terão ícone');
    }
    
    if (starImageBase64) {
      console.log('✅ Imagem star.svg carregada com sucesso');
    } else {
      console.warn('⚠️ Imagem star.svg não pôde ser carregada, cards com prova não terão ícone');
    }

    const jsPDF = (await import('jspdf')).default;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Configurações de página
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const marginLeft = 15; // Margem esquerda (mantida como estava)
    const marginTop = 8; // Margem superior reduzida para usar mais espaço
    const marginRight = 8; // Margem direita reduzida para usar mais espaço
    const bottomMargin = 1; // Margem inferior mínima para usar máximo espaço até o final da página
    const maxWidth = pageWidth - marginLeft - marginRight;
    let y = marginTop;
    
    // Remove emojis
    const removeEmojis = (text: string): string => {
      if (!text) return '';
      return text
        .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
        .replace(/[\u{1F600}-\u{1F64F}]/gu, '')
        .replace(/[\u{1F680}-\u{1F6FF}]/gu, '')
        .replace(/[\u{2600}-\u{26FF}]/gu, '')
        .replace(/[\u{2700}-\u{27BF}]/gu, '')
        .replace(/[\u{1F900}-\u{1F9FF}]/gu, '')
        .replace(/[\u{1FA00}-\u{1FAFF}]/gu, '')
        .replace(/[\u{FE00}-\u{FE0F}]/gu, '')
        .replace(/[\u{200D}]/gu, '')
        .replace(/[\u{FE0F}]/gu, '')
        .replace(/[ \t]+/g, ' ');
    };
    
    // Extrai texto com estilos de uma string (processa markdown básico: *texto* e **texto**)
    interface TextSegment {
      text: string;
      bold: boolean;
    }
    
    const extractTextWithStyles = (text: string): TextSegment[] => {
      if (!text) return [];
      
      const segments: TextSegment[] = [];
      let processed = text;
      
      // Processa **texto** primeiro (negrito duplo)
      processed = processed.replace(/\*\*([^*]+?)\*\*/g, (match, content) => {
        return `__BOLD_DOUBLE__${content}__BOLD_DOUBLE_END__`;
      });
      
      // Depois processa *texto* (negrito simples)
      processed = processed.replace(/\*([^*\n]+?)\*/g, (match, content, offset) => {
        const beforeMatch = processed.substring(0, offset);
        const doubleBoldOpens = (beforeMatch.match(/__BOLD_DOUBLE__/g) || []).length;
        const doubleBoldCloses = (beforeMatch.match(/__BOLD_DOUBLE_END__/g) || []).length;
        
        if (doubleBoldOpens > doubleBoldCloses) {
          return match;
        }
        
        return `__BOLD_SINGLE__${content}__BOLD_SINGLE_END__`;
      });
      
      const parts = processed.split(/(__BOLD_DOUBLE__.*?__BOLD_DOUBLE_END__|__BOLD_SINGLE__.*?__BOLD_SINGLE_END__)/g);
      
      parts.forEach(part => {
        if (!part) return;
        
        if (part.startsWith('__BOLD_DOUBLE__') && part.endsWith('__BOLD_DOUBLE_END__')) {
          const content = part.replace('__BOLD_DOUBLE__', '').replace('__BOLD_DOUBLE_END__', '');
          segments.push({ text: removeEmojis(content), bold: true });
        } else if (part.startsWith('__BOLD_SINGLE__') && part.endsWith('__BOLD_SINGLE_END__')) {
          const content = part.replace('__BOLD_SINGLE__', '').replace('__BOLD_SINGLE_END__', '');
          segments.push({ text: removeEmojis(content), bold: true });
        } else if (part.length > 0) {
          segments.push({ text: removeEmojis(part), bold: false });
        }
      });
      
      return segments.length > 0 ? segments : [{ text: removeEmojis(text), bold: false }];
    };
    
    // Renderiza texto com estilos
    const renderStyledText = (segments: TextSegment[], x: number, yPos: number, maxLineWidth: number, fontSize: number): number => {
      let currentY = yPos;
      const lineHeight = fontSize * 0.4;
      const spaceWidth = pdf.getTextWidth(' ');
      
      const allWords: Array<{text: string, bold: boolean}> = [];
      
      segments.forEach(segment => {
        const segmentLines = segment.text.split('\n');
        
        segmentLines.forEach((line, lineIndex) => {
          if (lineIndex > 0) {
            allWords.push({ text: '\n', bold: false });
          }
          
          if (!line || line.trim().length === 0) {
            return;
          }
          
          const tokens = line.match(/\S+|\s+/g) || [];
          tokens.forEach(token => {
            if (token) {
              allWords.push({ text: token, bold: segment.bold });
            }
          });
        });
      });
      
      let lineWords: Array<{text: string, bold: boolean}> = [];
      let lineWidth = 0;
      
      allWords.forEach((word) => {
        if (word.text === '\n') {
          if (lineWords.length > 0) {
            if (currentY + lineHeight > pageHeight - bottomMargin) {
              pdf.addPage();
              currentY = marginTop;
            }
            
            let xPos = x;
            lineWords.forEach((w) => {
              pdf.setFontSize(fontSize);
              pdf.setFont('helvetica', w.bold ? 'bold' : 'normal');
              pdf.text(w.text, xPos, currentY);
              xPos += pdf.getTextWidth(w.text);
            });
            currentY += lineHeight;
            lineWords = [];
            lineWidth = 0;
          }
          return;
        }
        
        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', word.bold ? 'bold' : 'normal');
        
        const isSpace = /^\s+$/.test(word.text);
        const wordWidth = pdf.getTextWidth(word.text);
        const newLineWidth = lineWidth + wordWidth;
        
        if (newLineWidth > maxLineWidth && lineWords.length > 0 && !isSpace) {
          if (currentY + lineHeight > pageHeight - bottomMargin) {
            pdf.addPage();
            currentY = marginTop;
          }
          
          let xPos = x;
          lineWords.forEach((w) => {
            pdf.setFontSize(fontSize);
            pdf.setFont('helvetica', w.bold ? 'bold' : 'normal');
            pdf.text(w.text, xPos, currentY);
            xPos += pdf.getTextWidth(w.text);
          });
          currentY += lineHeight;
          
          if (!isSpace) {
            lineWords = [word];
            lineWidth = wordWidth;
          } else {
            lineWords = [];
            lineWidth = 0;
          }
        } else {
          lineWords.push(word);
          lineWidth = newLineWidth;
        }
      });
      
      if (lineWords.length > 0) {
        if (currentY + lineHeight > pageHeight - bottomMargin) {
          pdf.addPage();
          currentY = marginTop;
        }
        
        let xPos = x;
        lineWords.forEach((w) => {
          pdf.setFontSize(fontSize);
          pdf.setFont('helvetica', w.bold ? 'bold' : 'normal');
          pdf.text(w.text, xPos, currentY);
          xPos += pdf.getTextWidth(w.text);
        });
        currentY += lineHeight;
      }
      
      return currentY;
    };
    
    // Título do documento
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    const title = removeEmojis('Flash Cards');
    pdf.text(title, marginLeft, y);
    y += 6;
    
    // Informações
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    const totalCards = allFlashCardsForPDF.length;
    const bibliografiaNome = this.selectedBibliografiaId 
      ? this.getBibliografiaNome(this.selectedBibliografiaId)
      : 'Todas as Bibliografias';
    
    let infoText = `Total de flash cards: ${totalCards}`;
    infoText += ` | Bibliografia: ${removeEmojis(bibliografiaNome)}`;
    if (this.selectedAssunto) {
      infoText += ` | Assunto: ${removeEmojis(this.selectedAssunto)}`;
    }
    pdf.text(infoText, marginLeft, y);
    y += 3;
    
    // Linha separadora
    y += 0.2;
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.3);
    pdf.line(marginLeft, y, pageWidth - marginRight, y);
    y += 5;
    
    // // Flash Cards
    // pdf.setFontSize(12);
    // pdf.setFont('helvetica', 'bold');
    // // pdf.text('FLASH CARDS', margin, y);
    // y += 6;
    
    // Agrupar flashcards por bibliografia + assunto
    const groupedFlashCards: { [key: string]: FlashCard[] } = {};
    allFlashCardsForPDF.forEach((card) => {
      const bibliografia = card.bibliografia_titulo || 'Sem bibliografia';
      const assunto = card.assunto || 'Sem assunto';
      const key = `${bibliografia}|${assunto}`;
      
      if (!groupedFlashCards[key]) {
        groupedFlashCards[key] = [];
      }
      groupedFlashCards[key].push(card);
    });
    
    // Contador global de flashcards
    let globalCardNumber = 0;
    
    // Iterar sobre os grupos
    Object.keys(groupedFlashCards).forEach((groupKey) => {
      const groupCards = groupedFlashCards[groupKey];
      const [bibliografia, assunto] = groupKey.split('|');
      
      // Verifica se precisa de nova página antes de adicionar o cabeçalho do grupo
      if (y + 15 > pageHeight - bottomMargin) {
        pdf.addPage();
        y = marginTop;
      }
      
      // Cabeçalho do grupo: Bibliografia + Assunto
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      const headerText = `${removeEmojis(bibliografia)}${assunto !== 'Sem assunto' ? ' - ' + removeEmojis(assunto) : ''}`;
      const headerLines = pdf.splitTextToSize(headerText, maxWidth);
      
      headerLines.forEach((line: string) => {
        if (y + 4 > pageHeight - bottomMargin) {
          pdf.addPage();
          y = marginTop;
        }
        pdf.text(line, marginLeft, y);
        y += 4;
      });
      
      y += 2; // Espaço após o cabeçalho do grupo
      
      // Iterar sobre os flashcards do grupo
      groupCards.forEach((card) => {
        globalCardNumber++;
        
        // Verifica se precisa de nova página
        if (y + 30 > pageHeight - bottomMargin) {
          pdf.addPage();
          y = marginTop;
        }
        
        // Número do card no canto esquerdo
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        const cardNumberText = `${globalCardNumber})`;
        const numberWidth = pdf.getTextWidth(cardNumberText);
        pdf.text(cardNumberText, marginLeft, y);
        
        // Adicionar imagens conforme os flags do card
        let imageWidth = 0;
        const imageSize = 3; // Tamanho da imagem em mm
        const imageSpacing = 1; // Espaço entre número e imagem
        const imageVerticalSpacing = 0.5; // Espaço vertical entre imagens quando ambas estão presentes
        
        // Posição X inicial para as imagens
        const imageStartX = marginLeft + numberWidth + imageSpacing;
        let currentImageX = imageStartX;
        
        // Se ambos estão presentes: star em cima, danger embaixo
        if (card.prova && card.caveira && starImageBase64 && dangerImageBase64) {
          try {
            // Star em cima (alinhada com o texto)
            const starY = y - imageSize * 0.7;
            pdf.addImage(
              starImageBase64,
              'PNG',
              currentImageX,
              starY,
              imageSize,
              imageSize
            );
            
            // Danger embaixo (logo abaixo da star)
            const dangerY = starY + imageSize + imageVerticalSpacing;
            pdf.addImage(
              dangerImageBase64,
              'PNG',
              currentImageX,
              dangerY,
              imageSize,
              imageSize
            );
            
            imageWidth = imageSize + imageSpacing;
          } catch (error) {
            console.error('❌ Erro ao adicionar imagens star.svg e danger.svg ao PDF:', error);
          }
        } else {
          // Apenas star (prova === true)
          if (card.prova && starImageBase64) {
            try {
              const imageY = y - imageSize * 0.7;
              pdf.addImage(
                starImageBase64,
                'PNG',
                currentImageX,
                imageY,
                imageSize,
                imageSize
              );
              
              imageWidth = imageSize + imageSpacing;
            } catch (error) {
              console.error('❌ Erro ao adicionar imagem star.svg ao PDF:', error);
            }
          }
          
          // Apenas danger (caveira === true)
          if (card.caveira && dangerImageBase64) {
            try {
              const imageY = y - imageSize * 0.7;
              pdf.addImage(
                dangerImageBase64,
                'PNG',
                currentImageX,
                imageY,
                imageSize,
                imageSize
              );
              
              imageWidth = imageSize + imageSpacing;
            } catch (error) {
              console.error('❌ Erro ao adicionar imagem danger.svg ao PDF:', error);
            }
          }
        }
        
        // Conteúdo do card (ajustar posição inicial considerando a imagem)
        const contentStartX = marginLeft + numberWidth + imageWidth + (imageWidth > 0 ? imageSpacing : 2); // Espaço após o número e imagem
        const contentMaxWidth = maxWidth - (contentStartX - marginLeft);
        
        // Pergunta - "P:" ao lado do texto
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        const labelP = 'P:';
        const labelPWidth = pdf.getTextWidth(labelP);
        pdf.text(labelP, contentStartX, y);
        
        const perguntaStartX = contentStartX + labelPWidth + 2;
        const perguntaMaxWidth = contentMaxWidth - (perguntaStartX - contentStartX);
        
        pdf.setFont('helvetica', 'normal');
        const perguntaSegments = extractTextWithStyles(card.pergunta || '');
        if (perguntaSegments.length > 0) {
          y = renderStyledText(perguntaSegments, perguntaStartX, y, perguntaMaxWidth, 8);
        } else {
          const perguntaText = removeEmojis(card.pergunta || '');
          const perguntaLines = pdf.splitTextToSize(perguntaText, perguntaMaxWidth);
          perguntaLines.forEach((line: string, lineIndex: number) => {
            if (y + 4 > pageHeight - bottomMargin) {
              pdf.addPage();
              y = marginTop;
            }
            const xPos = lineIndex === 0 ? perguntaStartX : contentStartX;
            pdf.text(line, xPos, y);
            y += 2;
          });
        }
        
        y += 2;
        
        // Resposta - "R:" ao lado do texto
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        const labelR = 'R:';
        const labelRWidth = pdf.getTextWidth(labelR);
        pdf.text(labelR, contentStartX, y);
        
        const respostaStartX = contentStartX + labelRWidth + 2;
        const respostaMaxWidth = contentMaxWidth - (respostaStartX - contentStartX);
        
        pdf.setFont('helvetica', 'normal');
        const respostaSegments = extractTextWithStyles(card.resposta || '');
        if (respostaSegments.length > 0) {
          y = renderStyledText(respostaSegments, respostaStartX, y, respostaMaxWidth, 8);
        } else {
          const respostaText = removeEmojis(card.resposta || '');
          const respostaLines = pdf.splitTextToSize(respostaText, respostaMaxWidth);
          respostaLines.forEach((line: string, lineIndex: number) => {
            if (y + 4 > pageHeight - bottomMargin) {
              pdf.addPage();
              y = marginTop;
            }
            const xPos = lineIndex === 0 ? respostaStartX : contentStartX;
            pdf.text(line, xPos, y);
            y += 2;
          });
        }
        
        // Linha divisória logo abaixo do texto da resposta
        // O y já está na posição após o texto (inclui lineHeight), então desenhamos a linha logo abaixo
        y += 0.5; // Espaço mínimo antes da linha
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.15);
        pdf.line(marginLeft, y, pageWidth - marginRight, y);
        y += 3; // Espaço após a linha para separar do próximo card
      });
      
      // Espaço entre grupos
      y += 1;
    });
    
    // Gerar nome do arquivo
    const removeAccents = (str: string): string => {
      return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/gi, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();
    };
    
    const fileName = `flash-cards-${new Date().toISOString().split('T')[0]}.pdf`;
    
    // Fazer o download
    pdf.save(fileName);
    
    console.log('✅ PDF pesquisável gerado com sucesso:', fileName);
  }

  /**
   * Processa texto convertendo markdown básico (*texto* ou **texto**) para HTML
   * e permite HTML customizado (cores, etc)
   */
  processText(text: string): SafeHtml {
    if (!text) {
      return this.sanitizer.sanitize(1, '') as SafeHtml;
    }

    // Converter markdown básico para HTML
    // Suporta *texto* ou **texto** para negrito
    // Permite HTML customizado (cores via <span style="color: ...">, etc)
    let processed = text;
    
    // Usar marcação temporária única para proteger conteúdo já processado
    const tempPlaceholder = '___TEMP_STRONG_PLACEHOLDER___';
    const placeholders: string[] = [];
    let placeholderIndex = 0;
    
    // Primeiro, converter **texto** para <strong>texto</strong> (duplo asterisco)
    // Substituir por placeholder temporário para evitar conflitos
    processed = processed.replace(/\*\*([^*]+)\*\*/g, (match, content) => {
      const placeholder = tempPlaceholder + placeholderIndex;
      placeholders[placeholderIndex] = '<strong>' + content + '</strong>';
      placeholderIndex++;
      return placeholder;
    });
    
    // Depois, converter *texto* para <strong>texto</strong> (asterisco simples)
    // Isso não vai conflitar porque ** já foi substituído por placeholders
    processed = processed.replace(/\*([^*\n]+?)\*/g, '<strong>$1</strong>');
    
    // Restaurar placeholders para o HTML final
    placeholders.forEach((html, index) => {
      processed = processed.replace(tempPlaceholder + index, html);
    });

    // Sanitizar e retornar HTML seguro
    // O DomSanitizer permite HTML seguro como <strong>, <span>, <em>, etc.
    // e atributos de estilo para cores, mantendo segurança contra XSS
    // SecurityContext.HTML = 1
    return this.sanitizer.sanitize(1, processed) as SafeHtml;
  }
}
