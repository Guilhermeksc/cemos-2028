import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { PerguntasService } from '../../services/perguntas.service';
import { SimuladosPdfService } from './services/simulados-pdf.service';
import {
  SimuladoConfig,
  SimuladoQuestion,
  SIMULADO_PRESETS,
  PdfCustomizationOptions
} from './simulados.types';
import { PerguntaMultipla, PerguntaVF, PerguntaCorrelacao, Bibliografia, FlashCards } from '../../interfaces/perguntas.interface';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface AssuntoComContagem {
  nome: string;
  quantidade: number;
  bibliografiaTitulo: string;
  bibliografiaId: number;
}

@Component({
  selector: 'app-simulados',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './simulados.html',
  styleUrl: './simulados.scss'
})
export class Simulados implements OnInit, OnDestroy {
  @Input() bibliografiaIds: number[] = [];
  @Input() assuntoId?: number | null;
  @Input() bibliografiaPath?: string;

  private perguntasService = inject(PerguntasService);
  private pdfService = inject(SimuladosPdfService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  // Estado do componente
  bibliografias: Bibliografia[] = [];
  selectedBibliografias: number[] = [];
  isLoadingBibliografias = false;
  isGeneratingPDF = false;

  // Simulado customizado (único)
  customSimulado = {
    titulo: 'Simulado Customizado',
    config: {
      bibliografias: [],
      questoesVF: 10,
      questoesMultipla: 6,
      questoesCorrelacao: 4,
      questoesAbertas: 0
    } as SimuladoConfig,
    questions: [] as SimuladoQuestion[],
    status: 'empty' as 'empty' | 'loading' | 'ready' | 'error',
    insufficientQuestionsMessage: undefined as string | undefined
  };

  // Filtros de bibliografia e assunto
  selectedBibliografiaId: number | null = null;
  assuntosDisponiveis: AssuntoComContagem[] = [];
  selectedAssunto: string = '';
  
  // Cache de todas as questões para extrair assuntos
  allQuestionsCache: Array<PerguntaMultipla | PerguntaVF | PerguntaCorrelacao> = [];

  constructor() {
    console.log('🏗️ [Simulados] Constructor chamado');
    console.log('🔧 [Simulados] Serviços injetados:', {
      perguntasService: !!this.perguntasService,
      pdfService: !!this.pdfService
    });
    console.log('📋 [Simulados] SIMULADO_PRESETS disponível:', SIMULADO_PRESETS.length);
  }

  // Opções de personalização do PDF
  pdfOptions: PdfCustomizationOptions = {
    nomeSimulado: 'Simulado',
    mostrarSumarioDesempenho: true,
    incluirJustificativas: true,
    agrupamento: 'bibliografia-assunto'
  };

  ngOnInit(): void {
    console.log('🚀 [Simulados] ngOnInit iniciado');
    console.log('📋 [Simulados] Inputs recebidos:', {
      bibliografiaIds: this.bibliografiaIds,
      assuntoId: this.assuntoId
    });
    
    try {
      this.loadBibliografias();
      this.loadCustomSimuladoFromStorage();
      
      console.log('✅ [Simulados] ngOnInit concluído');
    } catch (error) {
      console.error('❌ [Simulados] Erro no ngOnInit:', error);
    }
  }

  ngOnDestroy(): void {
    console.log('🔚 [Simulados] ngOnDestroy chamado');
    this.destroy$.next();
    this.destroy$.complete();
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
   * Quando a bibliografia é alterada
   */
  onBibliografiaChange() {
    console.log('🔍 [Simulados] onBibliografiaChange() chamado', {
      selectedBibliografiaId: this.selectedBibliografiaId,
      bibliografiaIds: this.bibliografiaIds
    });
    
    if (this.selectedBibliografiaId === null) {
      // "Todas" selecionada - usar bibliografiaIds se fornecido, senão todas
      this.selectedBibliografias = this.bibliografiaIds.length > 0 
        ? [...this.bibliografiaIds] 
        : this.bibliografias.map(b => b.id);
      console.log('🔍 [Simulados] "Todas" selecionada, bibliografias:', this.selectedBibliografias);
    } else {
      // Uma bibliografia específica selecionada
      this.selectedBibliografias = [this.selectedBibliografiaId];
      console.log('🔍 [Simulados] Bibliografia específica selecionada:', this.selectedBibliografias);
    }
    
    // Resetar assunto selecionado
    this.selectedAssunto = '';
    
    // Atualizar assuntos disponíveis
    if (this.allQuestionsCache.length > 0) {
      this.updateAssuntosDisponiveis();
    } else {
      // Carregar cache se ainda não foi carregado
      this.loadQuestionsCache();
    }
    
    console.log('📚 Bibliografia selecionada:', {
      selectedId: this.selectedBibliografiaId,
      bibliografiaIds: this.selectedBibliografias,
      assuntosDisponiveis: this.assuntosDisponiveis.length
    });
  }
  
  /**
   * Quando o assunto é alterado
   */
  onAssuntoChange() {
    console.log('🏷️ Assunto alterado:', this.selectedAssunto);
  }

  /**
   * Carrega cache de questões para extrair assuntos
   */
  private loadQuestionsCache(): void {
    if (this.selectedBibliografias.length === 0) {
      console.log('⚠️ [Simulados] Nenhuma bibliografia selecionada para carregar cache');
      return;
    }

    console.log('📦 [Simulados] Carregando cache de questões...');
    
    const multiplaObservables = this.selectedBibliografias.map(bibId =>
      this.perguntasService.getAllPerguntasMultipla({ bibliografia: bibId })
    );
    const vfObservables = this.selectedBibliografias.map(bibId =>
      this.perguntasService.getAllPerguntasVF({ bibliografia: bibId })
    );
    const correlacaoObservables = this.selectedBibliografias.map(bibId =>
      this.perguntasService.getAllPerguntasCorrelacao({ bibliografia: bibId })
    );

    forkJoin({
      multiplas: multiplaObservables.length > 0 ? forkJoin(multiplaObservables) : Promise.resolve([]),
      vfs: vfObservables.length > 0 ? forkJoin(vfObservables) : Promise.resolve([]),
      correlacoes: correlacaoObservables.length > 0 ? forkJoin(correlacaoObservables) : Promise.resolve([])
    }).pipe(takeUntil(this.destroy$)).subscribe({
      next: (results) => {
        const todasMultiplas: PerguntaMultipla[] = (results.multiplas as PerguntaMultipla[][]).flat();
        const todasVFs: PerguntaVF[] = (results.vfs as PerguntaVF[][]).flat();
        const todasCorrelacoes: PerguntaCorrelacao[] = (results.correlacoes as PerguntaCorrelacao[][]).flat();
        
        this.allQuestionsCache = [
          ...todasMultiplas,
          ...todasVFs,
          ...todasCorrelacoes
        ];
        
        console.log('✅ [Simulados] Cache carregado:', this.allQuestionsCache.length, 'questões');
        this.extractAssuntos();
      },
      error: (error) => {
        console.error('❌ [Simulados] Erro ao carregar cache:', error);
      }
    });
  }

  /**
   * Extrai assuntos únicos das questões carregadas
   */
  private extractAssuntos() {
    console.log('🔍 [Simulados] extractAssuntos() chamado', {
      cacheLength: this.allQuestionsCache.length
    });
    
    const assuntosMap = new Map<string, { quantidade: number; bibliografiaTitulo: string; bibliografiaId: number }>();
    
    this.allQuestionsCache.forEach(question => {
      if (question.assunto_titulo && question.assunto_titulo.trim() && question.bibliografia) {
        const assunto = question.assunto_titulo.trim();
        const bibliografiaId = question.bibliografia;
        const bibliografiaTitulo = question.bibliografia_titulo || `Bibliografia ${bibliografiaId}`;
        const chave = `${assunto}|${bibliografiaId}`;
        
        if (assuntosMap.has(chave)) {
          assuntosMap.get(chave)!.quantidade++;
        } else {
          assuntosMap.set(chave, {
            quantidade: 1,
            bibliografiaTitulo,
            bibliografiaId
          });
        }
      }
    });

    this.assuntosDisponiveis = Array.from(assuntosMap.entries())
      .map(([chave, dados]) => ({
        nome: chave.split('|')[0],
        quantidade: dados.quantidade,
        bibliografiaTitulo: dados.bibliografiaTitulo,
        bibliografiaId: dados.bibliografiaId
      }))
      .sort((a, b) => {
        const nomeCompare = a.nome.localeCompare(b.nome);
        if (nomeCompare !== 0) return nomeCompare;
        return a.bibliografiaTitulo.localeCompare(b.bibliografiaTitulo);
      });
    
    console.log('🏷️ Assuntos disponíveis:', {
      total: this.assuntosDisponiveis.length,
      primeiros5: this.assuntosDisponiveis.slice(0, 5)
    });
  }
  
  /**
   * Atualiza assuntos disponíveis baseado na bibliografia selecionada
   */
  private updateAssuntosDisponiveis() {
    if (this.selectedBibliografiaId) {
      // Filtrar questões da bibliografia selecionada
      const questionsFromBibliografia = this.allQuestionsCache.filter(q => 
        q.bibliografia === this.selectedBibliografiaId
      );
      
      const assuntosMap = new Map<string, { quantidade: number; bibliografiaTitulo: string; bibliografiaId: number }>();
      
      questionsFromBibliografia.forEach(q => {
        if (q.assunto_titulo && q.assunto_titulo.trim() && q.bibliografia) {
          const assunto = q.assunto_titulo.trim();
          const bibliografiaId = q.bibliografia;
          const bibliografiaTitulo = q.bibliografia_titulo || `Bibliografia ${bibliografiaId}`;
          const chave = `${assunto}|${bibliografiaId}`;
          
          if (assuntosMap.has(chave)) {
            assuntosMap.get(chave)!.quantidade++;
          } else {
            assuntosMap.set(chave, {
              quantidade: 1,
              bibliografiaTitulo,
              bibliografiaId
            });
          }
        }
      });
      
      this.assuntosDisponiveis = Array.from(assuntosMap.entries())
        .map(([chave, dados]) => ({
          nome: chave.split('|')[0],
          quantidade: dados.quantidade,
          bibliografiaTitulo: dados.bibliografiaTitulo,
          bibliografiaId: dados.bibliografiaId
        }))
        .sort((a, b) => a.nome.localeCompare(b.nome));
    } else {
      // Se "Todas" foi selecionado, mostrar todos os assuntos
      this.extractAssuntos();
    }
    
    console.log('🏷️ Assuntos disponíveis atualizados:', {
      bibliografiaSelecionada: this.selectedBibliografiaId,
      totalAssuntos: this.assuntosDisponiveis.length
    });
  }

  /**
   * Carrega bibliografias disponíveis
   */
  private loadBibliografias(): void {
    console.log('📚 [Simulados] Carregando bibliografias...');
    this.isLoadingBibliografias = true;
    this.perguntasService.getBibliografias({ page_size: 1000 })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('✅ [Simulados] Bibliografias carregadas:', response.results.length);
          
          // Filtrar apenas as bibliografias permitidas (bibliografiaIds)
          if (this.bibliografiaIds.length > 0) {
            this.bibliografias = response.results.filter(b => 
              this.bibliografiaIds.includes(b.id)
            );
            console.log('🔖 [Simulados] Bibliografias filtradas:', this.bibliografias.length);
          } else {
            this.bibliografias = response.results;
          }
          
          // Se bibliografiaIds foram fornecidos, selecionar automaticamente
          if (this.bibliografiaIds.length > 0) {
            console.log('🔖 [Simulados] Selecionando bibliografias dos inputs:', this.bibliografiaIds);
            this.selectedBibliografias = [...this.bibliografiaIds];
            // Carregar cache para extrair assuntos
            this.loadQuestionsCache();
          }
          
          this.isLoadingBibliografias = false;
          console.log('📚 [Simulados] Bibliografias disponíveis:', this.bibliografias.length);
        },
        error: (error) => {
          console.error('❌ [Simulados] Erro ao carregar bibliografias:', error);
          this.isLoadingBibliografias = false;
        }
      });
  }

  /**
   * Gera PDF direto a partir de um preset
   */
  async generatePresetPdf(preset: typeof SIMULADO_PRESETS[0]): Promise<void> {
    if (this.isGeneratingPDF) {
      return;
    }
    if (this.selectedBibliografias.length === 0) {
      alert('Por favor, selecione pelo menos uma bibliografia.');
      return;
    }

    const config: SimuladoConfig = {
      ...preset.config,
      bibliografias: [...this.selectedBibliografias]
    };

    this.isGeneratingPDF = true;

    try {
      const questions = await this.fetchQuestionsForConfig(config);
      await this.pdfService.generateMixedPdf(
        questions,
        undefined,
        {
          ...this.pdfOptions,
          nomeSimulado: preset.titulo
        }
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao gerar PDF.';
      console.error('Erro ao gerar PDF do preset:', error);
      alert(message);
    } finally {
      this.isGeneratingPDF = false;
    }
  }

  /**
   * Atualiza o título do simulado customizado
   */
  updateCustomTitle(titulo: string): void {
    this.customSimulado.titulo = titulo || 'Simulado Customizado';
    this.saveCustomSimuladoToStorage();
  }

  /**
   * Atualiza a configuração do simulado customizado
   */
  updateCustomConfig(config: Partial<SimuladoConfig>): void {
    this.customSimulado.config = { ...this.customSimulado.config, ...config };
    this.saveCustomSimuladoToStorage();
  }

  /**
   * Gera questões do simulado customizado
   */
  async generateCustomQuestions(): Promise<void> {
    if (this.selectedBibliografias.length === 0) {
      alert('Por favor, selecione pelo menos uma bibliografia.');
      return;
    }

    this.customSimulado.status = 'loading';
    this.customSimulado.insufficientQuestionsMessage = undefined;

    try {
      const config: SimuladoConfig = {
        ...this.customSimulado.config,
        bibliografias: [...this.selectedBibliografias]
      };
      const questions = await this.fetchQuestionsForConfig(config);

      this.customSimulado.questions = questions;
      this.customSimulado.status = 'ready';
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao gerar questões.';
      console.error('Erro ao gerar questões customizadas:', error);
      this.customSimulado.status = 'error';
      this.customSimulado.insufficientQuestionsMessage = message;
    } finally {
      this.saveCustomSimuladoToStorage();
    }
  }

  /**
   * Gera PDF do simulado customizado
   */
  async generateCustomPdf(): Promise<void> {
    if (this.customSimulado.questions.length === 0) {
      alert('Não há questões no simulado para gerar o PDF.');
      return;
    }

    this.isGeneratingPDF = true;

    try {
      await this.pdfService.generateMixedPdf(
        this.customSimulado.questions,
        undefined,
        {
          ...this.pdfOptions,
          nomeSimulado: this.customSimulado.titulo
        }
      );
    } catch (error) {
      console.error('Erro ao gerar PDF do simulado customizado:', error);
      alert('Erro ao gerar PDF. Por favor, tente novamente.');
    } finally {
      this.isGeneratingPDF = false;
    }
  }

  // ========== HELPERS PRIVADOS ==========

  private async fetchQuestionsForConfig(config: SimuladoConfig): Promise<SimuladoQuestion[]> {
    const bibliografias = config.bibliografias || [];
    if (bibliografias.length === 0) {
      throw new Error('Por favor, selecione pelo menos uma bibliografia.');
    }

    const multiplaObservables = bibliografias.map(bibId =>
      this.perguntasService.getAllPerguntasMultipla({ bibliografia: bibId })
    );
    const vfObservables = bibliografias.map(bibId =>
      this.perguntasService.getAllPerguntasVF({ bibliografia: bibId })
    );
    const correlacaoObservables = bibliografias.map(bibId =>
      this.perguntasService.getAllPerguntasCorrelacao({ bibliografia: bibId })
    );
    const flashcardsObservables = bibliografias.map(bibId =>
      this.perguntasService.getAllFlashCards({ bibliografia: bibId })
    );

    const results = await forkJoin({
      multiplas: multiplaObservables.length > 0 ? forkJoin(multiplaObservables) : Promise.resolve([]),
      vfs: vfObservables.length > 0 ? forkJoin(vfObservables) : Promise.resolve([]),
      correlacoes: correlacaoObservables.length > 0 ? forkJoin(correlacaoObservables) : Promise.resolve([]),
      flashcards: flashcardsObservables.length > 0 ? forkJoin(flashcardsObservables) : Promise.resolve([])
    }).pipe(takeUntil(this.destroy$)).toPromise();

    if (!results) {
      throw new Error('Erro ao buscar questões.');
    }

    const todasMultiplas: PerguntaMultipla[] = (results.multiplas as PerguntaMultipla[][]).flat();
    const todasVFs: PerguntaVF[] = (results.vfs as PerguntaVF[][]).flat();
    const todasCorrelacoes: PerguntaCorrelacao[] = (results.correlacoes as PerguntaCorrelacao[][]).flat();
    const todosFlashcards: FlashCards[] = (results.flashcards as FlashCards[][]).flat();

    let multiplasFiltradas = todasMultiplas;
    let vfsFiltradas = todasVFs;
    let correlacoesFiltradas = todasCorrelacoes;
    let flashcardsFiltrados = todosFlashcards;

    if (this.selectedAssunto) {
      multiplasFiltradas = todasMultiplas.filter(q => q.assunto_titulo === this.selectedAssunto);
      vfsFiltradas = todasVFs.filter(q => q.assunto_titulo === this.selectedAssunto);
      correlacoesFiltradas = todasCorrelacoes.filter(q => q.assunto_titulo === this.selectedAssunto);
      flashcardsFiltrados = todosFlashcards.filter(q => q.assunto_titulo === this.selectedAssunto);
    }

    const totalNeeded = config.questoesVF + config.questoesMultipla + config.questoesCorrelacao + config.questoesAbertas;
    const totalAvailable = vfsFiltradas.length + multiplasFiltradas.length + correlacoesFiltradas.length + flashcardsFiltrados.length;

    if (totalAvailable < totalNeeded) {
      throw new Error(`Questões insuficientes. Disponíveis: ${totalAvailable}, Necessárias: ${totalNeeded}`);
    }

    return this.buildQuestionsFromPools(config, vfsFiltradas, multiplasFiltradas, correlacoesFiltradas, flashcardsFiltrados);
  }

  private buildQuestionsFromPools(
    config: SimuladoConfig,
    vfs: PerguntaVF[],
    multiplas: PerguntaMultipla[],
    correlacoes: PerguntaCorrelacao[],
    flashcards: FlashCards[]
  ): SimuladoQuestion[] {
    const selectedQuestions: SimuladoQuestion[] = [];

    if (config.questoesVF > 0) {
      const shuffledVFs = this.shuffleArray([...vfs]);
      const selectedVFs = shuffledVFs.slice(0, Math.min(config.questoesVF, vfs.length));
      selectedVFs.forEach(q => {
        const seed = q.id;
        const shouldSwap = seed % 2 === 0;
        const afirmacaoSorteada = shouldSwap ? q.afirmacao_falsa : q.afirmacao_verdadeira;

        const qComSorteio: PerguntaVF = {
          ...q,
          afirmacao_sorteada: afirmacaoSorteada,
          afirmacao_sorteada_eh_verdadeira: !shouldSwap
        };

        selectedQuestions.push({
          id: q.id,
          tipo: 'vf',
          pergunta: q.pergunta,
          bibliografia_titulo: q.bibliografia_titulo,
          paginas: q.paginas,
          assunto: q.assunto,
          assunto_titulo: q.assunto_titulo,
          data: qComSorteio,
          uniqueKey: `vf-${q.id}`
        });
      });
    }

    if (config.questoesMultipla > 0) {
      const shuffledMultiplas = this.shuffleArray([...multiplas]);
      const selectedMultiplas = shuffledMultiplas.slice(0, Math.min(config.questoesMultipla, multiplas.length));
      selectedMultiplas.forEach(q => {
        selectedQuestions.push({
          id: q.id,
          tipo: 'multipla',
          pergunta: q.pergunta,
          bibliografia_titulo: q.bibliografia_titulo,
          paginas: q.paginas,
          assunto: q.assunto,
          assunto_titulo: q.assunto_titulo,
          data: q,
          uniqueKey: `multipla-${q.id}`
        });
      });
    }

    if (config.questoesCorrelacao > 0) {
      const shuffledCorrelacoes = this.shuffleArray([...correlacoes]);
      const selectedCorrelacoes = shuffledCorrelacoes.slice(0, Math.min(config.questoesCorrelacao, correlacoes.length));
      selectedCorrelacoes.forEach(q => {
        selectedQuestions.push({
          id: q.id,
          tipo: 'correlacao',
          pergunta: q.pergunta,
          bibliografia_titulo: q.bibliografia_titulo,
          paginas: q.paginas,
          assunto: q.assunto,
          assunto_titulo: q.assunto_titulo,
          data: q,
          uniqueKey: `correlacao-${q.id}`
        });
      });
    }

    if (config.questoesAbertas > 0) {
      const shuffledFlashcards = this.shuffleArray([...flashcards]);
      const selectedFlashcards = shuffledFlashcards.slice(0, Math.min(config.questoesAbertas, flashcards.length));
      selectedFlashcards.forEach(q => {
        selectedQuestions.push({
          id: q.id,
          tipo: 'aberta',
          pergunta: q.pergunta,
          bibliografia_titulo: q.bibliografia_titulo,
          assunto: q.assunto,
          assunto_titulo: q.assunto_titulo,
          data: q,
          uniqueKey: `aberta-${q.id}`
        });
      });
    }

    return this.shuffleArray(selectedQuestions);
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private saveCustomSimuladoToStorage(): void {
    try {
      const data = {
        titulo: this.customSimulado.titulo,
        config: this.customSimulado.config
      };
      localStorage.setItem('simulado_customizado', JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar simulado customizado no localStorage:', error);
    }
  }

  private loadCustomSimuladoFromStorage(): void {
    try {
      const stored = localStorage.getItem('simulado_customizado');
      if (stored) {
        const data = JSON.parse(stored) as { titulo?: string; config?: SimuladoConfig };
        if (data.titulo) {
          this.customSimulado.titulo = data.titulo;
        }
        if (data.config) {
          this.customSimulado.config = { ...this.customSimulado.config, ...data.config };
        }
      }
    } catch (error) {
      console.error('❌ [Simulados] Erro ao carregar simulado customizado do localStorage:', error);
    }
  }

  // Getters para facilitar acesso
  get presets() {
    console.log('📋 [Simulados] Getter presets chamado, retornando:', SIMULADO_PRESETS.length, 'presets');
    return SIMULADO_PRESETS;
  }
}
