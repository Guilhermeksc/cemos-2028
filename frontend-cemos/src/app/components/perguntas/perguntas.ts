import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { PerguntasService } from '../../services/perguntas.service';
import { 
  Bibliografia, 
  PerguntaMultipla, 
  PerguntaVF, 
  PerguntaCorrelacao, 
  Pergunta,
  PerguntaMultiplaFilters,
  PerguntaVFFilters,
  PerguntaFilters,
  PaginatedResponse,
  EstatisticasBibliografia
} from '../../interfaces/perguntas.interface';
import { Subject, forkJoin, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { PerguntaVF as PerguntaVFComponent } from './pergunta-v-f/pergunta-v-f';
import { PerguntaMultipla as PerguntaMultiplaComponent } from './pergunta-multipla/pergunta-multipla';
import { PerguntaCorrelacao as PerguntaCorrelacaoComponent } from './pergunta-correlacao/pergunta-correlacao';

interface SimuladoQuestion {
  id: number;
  tipo: 'multipla' | 'vf' | 'correlacao';
  pergunta: string;
  bibliografia_titulo?: string;
  paginas?: string;
  data: PerguntaMultipla | PerguntaVF | PerguntaCorrelacao;
  userAnswer?: any;
  isCorrect?: boolean;
  uniqueKey?: string; // Chave única: tipo-id (ex: "vf-1", "multipla-2")
}

interface SimuladoConfig {
  bibliografias: number[];
  questoesVF: number;
  questoesMultipla: number;
  questoesCorrelacao: number;
}

interface TabState {
  isLoadingQuestions: boolean;
  questionsLoaded: boolean;
  simuladoQuestions: SimuladoQuestion[];
  questionResults: { [uniqueKey: string]: { answered: boolean, isCorrect: boolean, showResult: boolean } };
  simuladoConfig: SimuladoConfig;
  insufficientQuestionsMessage?: string; // Mensagem quando não há questões suficientes
}

type TabType = 'completo' | 'vf' | 'multipla' | 'correlacao';

@Component({
  selector: 'app-perguntas',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatIconModule,
    MatProgressSpinnerModule,
    PerguntaVFComponent, 
    PerguntaMultiplaComponent, 
    PerguntaCorrelacaoComponent
  ],
  templateUrl: './perguntas.html',
  styleUrl: './perguntas.scss'
})
export class Perguntas implements OnInit, OnDestroy, OnChanges {
  @Input() bibliografiaIds: number[] = [];
  @Input() bibliografiaPath?: string; // Rota para voltar à bibliografia (opcional)
  @Output() simuladoStarted = new EventEmitter<void>();

  private perguntasService = inject(PerguntasService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();

  // Estados do componente - simplificado
  bibliografias: Bibliografia[] = [];
  bibliografiasComEstatisticas: Array<Bibliografia & { estatisticas?: EstatisticasBibliografia }> = [];
  selectedBibliografias: number[] = [];
  isLoading = false;
  isLoadingBibliografias = false;
  isGeneratingPDF: boolean = false;
  
  // Filtros de bibliografia e assunto
  selectedBibliografiaId: number | null = null;
  assuntosDisponiveis: string[] = [];
  selectedAssunto: string = '';
  
  // Cache de todas as questões para extrair assuntos (SEM filtro de assunto)
  allQuestionsCache: Array<PerguntaMultipla | PerguntaVF | PerguntaCorrelacao> = [];
  
  // Cache completo de TODAS as questões (para extrair assuntos, sem filtros)
  allQuestionsCacheComplete: Array<PerguntaMultipla | PerguntaVF | PerguntaCorrelacao> = [];

  // Sistema de tabs
  activeTab: TabType = 'completo';
  tabs: { [key in TabType]: TabState } = {
    completo: {
      isLoadingQuestions: false,
      questionsLoaded: false,
      simuladoQuestions: [],
      questionResults: {},
      simuladoConfig: {
        bibliografias: [],
        questoesVF: 10,
        questoesMultipla: 4,
        questoesCorrelacao: 1
      }
    },
    vf: {
      isLoadingQuestions: false,
      questionsLoaded: false,
      simuladoQuestions: [],
      questionResults: {},
      simuladoConfig: {
        bibliografias: [],
        questoesVF: 20,
        questoesMultipla: 0,
        questoesCorrelacao: 0
      }
    },
    multipla: {
      isLoadingQuestions: false,
      questionsLoaded: false,
      simuladoQuestions: [],
      questionResults: {},
      simuladoConfig: {
        bibliografias: [],
        questoesVF: 0,
        questoesMultipla: 10,
        questoesCorrelacao: 0
      }
    },
    correlacao: {
      isLoadingQuestions: false,
      questionsLoaded: false,
      simuladoQuestions: [],
      questionResults: {},
      simuladoConfig: {
        bibliografias: [],
        questoesVF: 0,
        questoesMultipla: 0,
        questoesCorrelacao: 5
      }
    }
  };

  // Getters para facilitar acesso ao estado da aba ativa
  get currentTab(): TabState {
    return this.tabs[this.activeTab];
  }

  get isLoadingQuestions(): boolean {
    return this.currentTab.isLoadingQuestions;
  }

  get questionsLoaded(): boolean {
    return this.currentTab.questionsLoaded;
  }

  get simuladoQuestions(): SimuladoQuestion[] {
    return this.currentTab.simuladoQuestions;
  }

  get questionResults(): { [uniqueKey: string]: { answered: boolean, isCorrect: boolean, showResult: boolean } } {
    return this.currentTab.questionResults;
  }

  get simuladoConfig(): SimuladoConfig {
    return this.currentTab.simuladoConfig;
  }

  get insufficientQuestionsMessage(): string | undefined {
    return this.currentTab.insufficientQuestionsMessage;
  }

  ngOnInit() {
    console.log('🚀 Componente Perguntas inicializado - Modo com Tabs');
    
    // Inicializar bibliografias selecionadas com as recebidas via Input
    if (this.bibliografiaIds.length > 0) {
      this.selectedBibliografias = [...this.bibliografiaIds];
    }
    
    this.loadBibliografias();
    
    if (this.bibliografiaIds.length > 0) {
      this.updateBibliografiasConfig();
      
      // Carregar cache completo de todas as questões para estatísticas
      this.loadCompleteCache();
      
      console.log('📋 Auto-carregando prova...');
      // Aguardar um pouco para garantir que as bibliografias foram carregadas
      setTimeout(() => {
        this.gerarNovaProva();
      }, 1000);
    }
  }
  
  /**
   * Carrega o cache completo com TODAS as questões disponíveis (sem filtros de tipo ou assunto)
   * Isso garante que as estatísticas do header sempre mostrem todos os valores disponíveis
   */
  private loadCompleteCache() {
    if (this.selectedBibliografias.length === 0) {
      return;
    }
    
    console.log('📊 Carregando cache completo de todas as questões para estatísticas...');
    
    // Buscar TODAS as questões de TODOS os tipos, sem filtro de assunto
    const multiplaObservables: Observable<PerguntaMultipla[]>[] = [];
    const vfObservables: Observable<PerguntaVF[]>[] = [];
    const correlacaoObservables: Observable<PerguntaCorrelacao[]>[] = [];
    
    this.selectedBibliografias.forEach(bibliografiaId => {
      const baseFilters: any = { bibliografia: bibliografiaId };
      // Não adicionar filtro de assunto - queremos TODAS as questões
      
      // Buscar TODAS as questões de cada tipo
      multiplaObservables.push(
        this.perguntasService.getAllPerguntasMultipla(baseFilters as PerguntaMultiplaFilters)
      );
      vfObservables.push(
        this.perguntasService.getAllPerguntasVF(baseFilters as PerguntaVFFilters)
      );
      correlacaoObservables.push(
        this.perguntasService.getAllPerguntasCorrelacao(baseFilters as PerguntaFilters)
      );
    });
    
    forkJoin({
      multiplas: forkJoin(multiplaObservables),
      vfs: forkJoin(vfObservables),
      correlacoes: forkJoin(correlacaoObservables)
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results: any) => {
          const todasMultiplas: PerguntaMultipla[] = results.multiplas 
            ? results.multiplas.flatMap((perguntas: PerguntaMultipla[]) => perguntas)
            : [];
          const todasVFs: PerguntaVF[] = results.vfs 
            ? results.vfs.flatMap((perguntas: PerguntaVF[]) => perguntas)
            : [];
          const todasCorrelacoes: PerguntaCorrelacao[] = results.correlacoes 
            ? results.correlacoes.flatMap((perguntas: PerguntaCorrelacao[]) => perguntas)
            : [];
          
          // Atualizar cache completo com TODAS as questões disponíveis
          this.allQuestionsCacheComplete = [
            ...todasMultiplas,
            ...todasVFs,
            ...todasCorrelacoes
          ];
          
          // Invalidar cache de estatísticas para recalcular
          this._statsCache = null;
          
          console.log('✅ Cache completo atualizado com TODAS as questões:', {
            total: this.allQuestionsCacheComplete.length,
            vf: todasVFs.length,
            multipla: todasMultiplas.length,
            correlacao: todasCorrelacoes.length
          });
        },
        error: (error) => {
          console.error('❌ Erro ao carregar cache completo:', error);
        }
      });
  }
  
  /**
   * Carrega bibliografias e suas estatísticas
   */
  private loadBibliografias() {
    this.isLoadingBibliografias = true;
    
    this.perguntasService.getBibliografias({ page_size: 100 })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          // Se há bibliografiaIds definidos, filtrar apenas essas
          if (this.bibliografiaIds.length > 0) {
            this.bibliografias = response.results.filter(b => 
              this.bibliografiaIds.includes(b.id)
            );
          } else {
            this.bibliografias = response.results;
          }
          
          // Buscar estatísticas para cada bibliografia
          this.loadEstatisticasBibliografias();
        },
        error: (error) => {
          console.error('❌ Erro ao carregar bibliografias:', error);
          this.isLoadingBibliografias = false;
        }
      });
  }
  
  /**
   * Carrega estatísticas para cada bibliografia
   */
  private loadEstatisticasBibliografias() {
    if (this.bibliografias.length === 0) {
      this.bibliografiasComEstatisticas = [];
      this.isLoadingBibliografias = false;
      return;
    }

    const estatisticasRequests = this.bibliografias.map(bib => 
      this.perguntasService.getEstatisticasBibliografia(bib.id).pipe(
        takeUntil(this.destroy$)
      )
    );

    forkJoin(estatisticasRequests)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (estatisticas) => {
          this.bibliografiasComEstatisticas = this.bibliografias.map((bib, index) => ({
            ...bib,
            estatisticas: estatisticas[index]
          }));
          
          this.isLoadingBibliografias = false;
          
          // Invalidar cache de estatísticas para recalcular
          this._statsCache = null;
          
          console.log('📖 Bibliografias com estatísticas carregadas:', {
            total: this.bibliografiasComEstatisticas.length,
            bibliografias: this.bibliografiasComEstatisticas.map(b => ({
              id: b.id,
              titulo: b.titulo,
              autor: b.autor,
              estatisticas: b.estatisticas
            }))
          });
        },
        error: (error) => {
          console.error('❌ Erro ao carregar estatísticas:', error);
          this.bibliografiasComEstatisticas = this.bibliografias.map(bib => ({ ...bib }));
          this.isLoadingBibliografias = false;
        }
      });
  }
  
  /**
   * Quando a bibliografia é alterada
   */
  onBibliografiaChange() {
    if (this.selectedBibliografiaId === null) {
      // "Todas" selecionada - usar todas as bibliografias disponíveis
      this.selectedBibliografias = this.bibliografiaIds.length > 0 
        ? [...this.bibliografiaIds] 
        : this.bibliografias.map(b => b.id);
    } else {
      // Uma bibliografia específica selecionada
      this.selectedBibliografias = [this.selectedBibliografiaId];
    }
    
    // Resetar assunto selecionado
    this.selectedAssunto = '';
    
    // Atualizar assuntos disponíveis baseado na bibliografia selecionada
    // Usar cache completo (sem filtro de assunto) para garantir que todos os assuntos apareçam
    if (this.allQuestionsCacheComplete.length > 0 || this.allQuestionsCache.length > 0) {
      this.updateAssuntosDisponiveis();
    }
    
    // Se não há cache completo ainda, será atualizado quando gerarNovaProva() for chamado
    // (quando não há assunto selecionado, o cache completo será atualizado)
    
    // Atualizar configuração de bibliografias em todas as tabs
    this.updateBibliografiasConfig();
    
    // Recarregar cache completo com todas as questões para atualizar estatísticas
    if (this.selectedBibliografias.length > 0) {
      this.loadCompleteCache();
    }
    
    console.log('📚 Bibliografia selecionada:', {
      selectedId: this.selectedBibliografiaId,
      bibliografiaIds: this.selectedBibliografias
    });
    
    // Recarregar questões se já houver questões carregadas
    if (this.currentTab.questionsLoaded) {
      this.gerarNovaProva();
    }
  }
  
  /**
   * Quando o assunto é alterado
   */
  onAssuntoChange() {
    console.log('🏷️ Assunto alterado:', this.selectedAssunto);
    
    // IMPORTANTE: Não atualizar assuntosDisponiveis aqui!
    // A lista de assuntos deve sempre mostrar TODOS os assuntos da bibliografia,
    // independentemente do assunto selecionado para filtro.
    // Os assuntos disponíveis são atualizados apenas quando a bibliografia muda.
    
    // Recarregar questões se já houver questões carregadas
    if (this.currentTab.questionsLoaded) {
      this.gerarNovaProva();
    }
  }
  

  /**
   * Extrai assuntos únicos das questões carregadas (usa cache completo, não filtrado)
   */
  private extractAssuntos() {
    const assuntosSet = new Set<string>();
    
    // Usar cache completo (sem filtro de assunto) para extrair TODOS os assuntos disponíveis
    const cacheToUse = this.allQuestionsCacheComplete.length > 0 
      ? this.allQuestionsCacheComplete 
      : this.allQuestionsCache;
    
    cacheToUse.forEach(question => {
      if (question.assunto && question.assunto.trim()) {
        assuntosSet.add(question.assunto.trim());
      }
    });

    this.assuntosDisponiveis = Array.from(assuntosSet).sort();
    
    console.log('🏷️ Assuntos disponíveis (do cache completo):', this.assuntosDisponiveis);
  }
  
  /**
   * Atualiza assuntos disponíveis baseado na bibliografia selecionada
   * IMPORTANTE: Sempre usa o cache completo (sem filtro de assunto) para garantir
   * que todos os assuntos da bibliografia estejam visíveis
   */
  private updateAssuntosDisponiveis() {
    // Usar cache completo (sem filtro de assunto) para extrair TODOS os assuntos
    const cacheToUse = this.allQuestionsCacheComplete.length > 0 
      ? this.allQuestionsCacheComplete 
      : this.allQuestionsCache;
    
    if (this.selectedBibliografiaId) {
      // Filtrar questões da bibliografia selecionada do cache completo
      const questionsFromBibliografia = cacheToUse.filter(q => 
        q.bibliografia === this.selectedBibliografiaId
      );
      
      const assuntosSet = new Set<string>();
      questionsFromBibliografia.forEach(q => {
        if (q.assunto && q.assunto.trim()) {
          assuntosSet.add(q.assunto.trim());
        }
      });
      
      this.assuntosDisponiveis = Array.from(assuntosSet).sort();
    } else {
      // Se "Todas" foi selecionado, mostrar todos os assuntos do cache completo
      this.extractAssuntos();
    }
    
    console.log('🏷️ Assuntos disponíveis atualizados:', {
      bibliografiaSelecionada: this.selectedBibliografiaId,
      totalAssuntos: this.assuntosDisponiveis.length,
      assuntos: this.assuntosDisponiveis
    });
  }
  
  /**
   * Formata o texto da opção do select com números em negrito usando caracteres Unicode
   */
  getBibliografiaOptionText(bibliografia: Bibliografia & { estatisticas?: EstatisticasBibliografia }): string {
    let texto = bibliografia.titulo;
    
    if (bibliografia.autor) {
      texto += ` - ${bibliografia.autor}`;
    }
    
    if (bibliografia.estatisticas) {
      const total = this.formatBoldNumber(bibliografia.estatisticas.total_perguntas);
      const vf = this.formatBoldNumber(bibliografia.estatisticas.perguntas_vf);
      const multipla = this.formatBoldNumber(bibliografia.estatisticas.perguntas_multipla);
      const correlacao = this.formatBoldNumber(bibliografia.estatisticas.perguntas_correlacao);
      
      texto += ` (Total: ${total} | V/F: ${vf} | Múltipla: ${multipla} | Correlação: ${correlacao})`;
    } else if (bibliografia.perguntas_count !== undefined) {
      const count = this.formatBoldNumber(bibliografia.perguntas_count);
      texto += ` (${count} questões)`;
    }
    
    return texto;
  }

  /**
   * Converte um número para caracteres Unicode em negrito matemático
   */
  private formatBoldNumber(num: number): string {
    const boldMap: { [key: string]: string } = {
      '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒',
      '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗'
    };
    
    return num.toString().split('').map(digit => boldMap[digit] || digit).join('');
  }

  ngOnChanges(changes: SimpleChanges) {
    // Reagir a mudanças no bibliografiaIds
    if (changes['bibliografiaIds'] && !changes['bibliografiaIds'].firstChange) {
      const newIds = changes['bibliografiaIds'].currentValue;
      const previousIds = changes['bibliografiaIds'].previousValue;
      
      // Verificar se realmente mudou
      if (JSON.stringify(newIds) !== JSON.stringify(previousIds)) {
        console.log('📚 Bibliografias atualizadas:', {
          anteriores: previousIds,
          novas: newIds
        });
        
        this.updateBibliografiasConfig();
        
        // Limpar questões anteriores e gerar nova prova automaticamente
        console.log('🔄 Recarregando questões devido à mudança de bibliografia');
        Object.keys(this.tabs).forEach(tabKey => {
          const tab = this.tabs[tabKey as TabType];
          tab.questionsLoaded = false;
          tab.simuladoQuestions = [];
          tab.questionResults = {};
          tab.insufficientQuestionsMessage = undefined;
        });
        
        // Gerar nova prova automaticamente para a tab ativa
        if (this.bibliografiaIds.length > 0) {
          setTimeout(() => {
            this.gerarNovaProva();
          }, 100);
        }
        
        this.cdr.detectChanges();
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Atualiza a configuração de bibliografias em todas as tabs
   */
  private updateBibliografiasConfig() {
    // Usar bibliografias selecionadas se houver, senão usar as recebidas via Input
    const bibliografiasParaUsar = this.selectedBibliografias.length > 0 
      ? this.selectedBibliografias 
      : (this.bibliografiaIds.length > 0 ? this.bibliografiaIds : []);
    
    if (bibliografiasParaUsar.length > 0) {
      this.selectedBibliografias = [...bibliografiasParaUsar];
      
      // Configurar bibliografias para todas as tabs
      Object.keys(this.tabs).forEach(tabKey => {
        this.tabs[tabKey as TabType].simuladoConfig.bibliografias = [...bibliografiasParaUsar];
      });
      
      console.log('✅ Bibliografias configuradas para todas as tabs:', bibliografiasParaUsar);
    }
  }

  setActiveTab(tab: TabType) {
    // Se já é a tab ativa, não fazer nada
    if (this.activeTab === tab) {
      return;
    }
    
    this.activeTab = tab;
    
    // Atualizar bibliografias na configuração da tab
    const currentTab = this.tabs[tab];
    if (currentTab.simuladoConfig.bibliografias.length === 0 && this.bibliografiaIds.length > 0) {
      currentTab.simuladoConfig.bibliografias = [...this.bibliografiaIds];
    }
    
    // Gerar prova automaticamente se não estiver carregada e houver bibliografias
    if (!currentTab.questionsLoaded && this.bibliografiaIds.length > 0) {
      this.gerarNovaProva();
    }
    
    this.cdr.detectChanges();
  }

  gerarNovaProva() {
    console.log(`🔄 Gerando nova prova para aba: ${this.activeTab}`);
    
    const currentTab = this.tabs[this.activeTab];
    
    // Garantir que as bibliografias estão configuradas
    if (currentTab.simuladoConfig.bibliografias.length === 0 && this.bibliografiaIds.length > 0) {
      currentTab.simuladoConfig.bibliografias = [...this.bibliografiaIds];
    }
    
    console.log('📚 Bibliografias configuradas para a prova:', currentTab.simuladoConfig.bibliografias);
    
    currentTab.isLoadingQuestions = true;
    currentTab.questionsLoaded = false;
    currentTab.simuladoQuestions = [];
    currentTab.questionResults = {};
    currentTab.insufficientQuestionsMessage = undefined; // Limpar mensagem anterior

    this.loadRandomQuestions(this.activeTab)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (questions) => {
          console.log(`✅ Nova prova carregada para aba ${this.activeTab}:`, questions.length, 'questões');
          
          // Verificar se há questões carregadas
          if (questions.length === 0) {
            currentTab.isLoadingQuestions = false;
            currentTab.questionsLoaded = false;
            currentTab.insufficientQuestionsMessage = 'Não foi possível carregar questões. Verifique se há questões cadastradas para as bibliografias selecionadas.';
            this.cdr.detectChanges();
            return;
          }
          
          currentTab.simuladoQuestions = this.shuffleArray(questions);
          
          console.log('🔀 Questões após shuffle:', {
            total: currentTab.simuladoQuestions.length,
            tipos: currentTab.simuladoQuestions.map(q => ({
              id: q.id,
              tipo: q.tipo,
              tipo_original: (q.data as any)?.tipo
            }))
          });
          
          currentTab.questionsLoaded = true;
          currentTab.isLoadingQuestions = false;
          
          // Inicializar resultados das questões usando uniqueKey
          currentTab.simuladoQuestions.forEach(q => {
            if (q.uniqueKey) {
              currentTab.questionResults[q.uniqueKey] = {
                answered: false,
                isCorrect: false,
                showResult: false
              };
            }
          });
          
          console.log('🔑 Chaves únicas inicializadas:', Object.keys(currentTab.questionResults));
          
          this.simuladoStarted.emit();
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('❌ Erro ao carregar nova prova:', error);
          currentTab.isLoadingQuestions = false;
          currentTab.questionsLoaded = false;
          currentTab.insufficientQuestionsMessage = 'Erro ao carregar questões. Por favor, tente novamente.';
          this.cdr.detectChanges();
        }
      });
  }

  // Método unificado para processar respostas dos componentes filhos
  onAnswerSubmitted(event: { questionId: number, answer: any }) {
    const { questionId, answer } = event;
    
    console.log('📝 Resposta recebida:', { questionId, answer, activeTab: this.activeTab });

    const currentTab = this.tabs[this.activeTab];

    // IMPORTANTE: Buscar pela uniqueKey, não pelo ID!
    // Como os componentes filhos ainda enviam questionId, precisamos encontrar
    // a questão correta comparando AMBOS: id E tipo da resposta
    const question = currentTab.simuladoQuestions.find(q => {
      if (q.id !== questionId) return false;
      
      // Verificar o tipo de resposta para distinguir entre questões com mesmo ID
      if (typeof answer === 'boolean') {
        return q.tipo === 'vf';
      } else if (typeof answer === 'string') {
        return q.tipo === 'multipla';
      } else if (typeof answer === 'object' && answer !== null) {
        return q.tipo === 'correlacao';
      }
      
      return false;
    });

    if (!question || !question.uniqueKey) {
      console.error('❌ Questão não encontrada ou sem uniqueKey:', { 
        questionId, 
        answerType: typeof answer,
        activeTab: this.activeTab,
        questoesDisponiveis: currentTab.simuladoQuestions.map(q => ({
          id: q.id,
          tipo: q.tipo,
          uniqueKey: q.uniqueKey
        }))
      });
      return;
    }

    question.userAnswer = answer;
    question.isCorrect = this.checkAnswer(question, answer);
    
    // Atualizar resultado da questão usando uniqueKey
    currentTab.questionResults[question.uniqueKey] = {
      answered: true,
      isCorrect: question.isCorrect,
      showResult: true
    };

    console.log('✅ Resposta processada:', {
      questionId,
      uniqueKey: question.uniqueKey,
      tipo: question.tipo,
      isCorrect: question.isCorrect,
      activeTab: this.activeTab,
      totalRespondidas: Object.values(currentTab.questionResults).filter(r => r.answered).length,
      questionResults_ESTADO: currentTab.questionResults
    });

    // Forçar detecção de mudanças
    this.cdr.detectChanges();
  }

  private checkAnswer(question: SimuladoQuestion, answer: any): boolean {
    switch (question.tipo) {
      case 'multipla':
        const multipla = question.data as PerguntaMultipla;
        return multipla.resposta_correta === answer;
      
      case 'vf':
        const vf = question.data as PerguntaVF;
        // Se a afirmação sorteada é verdadeira, a resposta correta é true (Verdadeiro)
        // Se a afirmação sorteada é falsa, a resposta correta é false (Falso)
        const respostaEsperada = vf.afirmacao_sorteada_eh_verdadeira ?? true;
        return answer === respostaEsperada;
      
      case 'correlacao':
        const correlacao = question.data as PerguntaCorrelacao;
        
        // Converter resposta do usuário (formato: {1: 'A', 2: 'B', 3: 'C'})
        // para formato do backend (formato: {0: '0', 1: '1', 2: '2'})
        const userAnswerConverted: { [key: string]: string } = {};
        
        for (let key in answer) {
          const itemIndex = (parseInt(key) - 1).toString(); // Converter 1,2,3 para 0,1,2
          const letterValue = answer[key]; // 'A', 'B', 'C'
          const letterIndex = letterValue.charCodeAt(0) - 65; // Converter A,B,C para 0,1,2
          userAnswerConverted[itemIndex] = letterIndex.toString();
        }
        
        console.log('🔍 Verificando resposta de correlação:', {
          respostaUsuario: answer,
          respostaConvertida: userAnswerConverted,
          respostaCorreta: correlacao.resposta_correta,
          isCorrect: JSON.stringify(correlacao.resposta_correta) === JSON.stringify(userAnswerConverted)
        });
        
        return JSON.stringify(correlacao.resposta_correta) === JSON.stringify(userAnswerConverted);
      
      default:
        return false;
    }
  }

  // Métodos utilitários simplificados
  isQuestionAnswered(uniqueKey: string): boolean {
    return this.currentTab.questionResults[uniqueKey]?.answered || false;
  }

  getQuestionAnswerStatus(uniqueKey: string): 'not-answered' | 'correct' | 'incorrect' {
    const result = this.currentTab.questionResults[uniqueKey];
    if (!result?.answered) return 'not-answered';
    return result.isCorrect ? 'correct' : 'incorrect';
  }

  getTotalAnsweredQuestions(): number {
    return Object.values(this.currentTab.questionResults).filter(r => r.answered).length;
  }

  getTotalCorrectAnswers(): number {
    return Object.values(this.currentTab.questionResults).filter(r => r.answered && r.isCorrect).length;
  }

  getScorePercentage(): number {
    const answered = this.getTotalAnsweredQuestions();
    const correct = this.getTotalCorrectAnswers();
    return answered > 0 ? (correct / answered) * 100 : 0;
  }

  // DEPRECATED - Manter apenas para compatibilidade temporária
  // TODO: Remover após migração completa
  private isCorrelacaoComplete(question: SimuladoQuestion): boolean {
    console.log('🔍 isCorrelacaoComplete VERIFICANDO:', {
      questionId: question.id,
      tipo: question.tipo
    });

    if (question.tipo !== 'correlacao') {
      console.warn('⚠️ isCorrelacaoComplete chamado para questão não-correlação:', {
        questionId: question.id,
        tipo: question.tipo
      });
      return false;
    }

    if (!question.userAnswer) {
      console.log('📭 userAnswer vazio/undefined');
      return false;
    }

    const correlacaoData = question.data as PerguntaCorrelacao;
    const totalItems = correlacaoData.coluna_a.length;
    
    console.log('📊 Verificando completude:', {
      totalItems,
      userAnswer: question.userAnswer,
      userAnswerKeys: Object.keys(question.userAnswer)
    });

    // Verificar se todos os itens de 1 até totalItems têm resposta válida
    let allAnswered = true;
    
    for (let i = 1; i <= totalItems; i++) {
      const answer = question.userAnswer[i.toString()];
      console.log(`  Item ${i}:`, {
        chave: i.toString(),
        resposta: answer,
        valido: answer && answer !== ''
      });
      
      if (!answer || answer === '') {
        allAnswered = false;
        console.log(`  ❌ Item ${i} não respondido`);
        break;
      }
    }

    console.log('✅ Resultado isCorrelacaoComplete:', allAnswered);
    return allAnswered;
  }

  // DEPRECATED - Contar quantos itens faltam ser respondidos na correlação
  // TODO: Remover após migração completa
  getCorrelacaoMissingCount(question: SimuladoQuestion): number {
    if (question.tipo !== 'correlacao') return 0;
    if (!question.userAnswer) {
      const correlacaoData = question.data as PerguntaCorrelacao;
      return correlacaoData.coluna_a.length;
    }

    const correlacaoData = question.data as PerguntaCorrelacao;
    const totalItems = correlacaoData.coluna_a.length;
    let missingCount = 0;
    const missing: number[] = [];
    const present: number[] = [];
    
    for (let i = 1; i <= totalItems; i++) {
      const answer = question.userAnswer[i.toString()];
      if (!answer || answer === '') {
        missingCount++;
        missing.push(i);
      } else {
        present.push(i);
      }
    }
    
    // Debug log para entender o problema
    if (missingCount > 0) {
      console.log('📊 Debug correlação:', {
        questionId: question.id,
        totalItems,
        present,
        missing,
        userAnswer: question.userAnswer,
        userAnswerKeys: Object.keys(question.userAnswer),
        userAnswerType: typeof question.userAnswer
      });
    }
    
    return missingCount;
  }

  private loadRandomQuestions(tabType: TabType): Observable<SimuladoQuestion[]> {
    const config = this.tabs[tabType].simuladoConfig;
    console.log(`📚 Buscando TODAS as questões para aba ${tabType} e bibliografias:`, config.bibliografias);
    
    // Se não há bibliografias selecionadas, retornar array vazio
    if (config.bibliografias.length === 0) {
      console.warn('⚠️ Nenhuma bibliografia selecionada');
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }

    // Criar arrays de observables para cada tipo de pergunta e cada bibliografia
    // Agora usando os métodos que buscam TODAS as perguntas (paginação completa)
    const multiplaObservables: Observable<PerguntaMultipla[]>[] = [];
    const vfObservables: Observable<PerguntaVF[]>[] = [];
    const correlacaoObservables: Observable<PerguntaCorrelacao[]>[] = [];

    // Criar uma chamada para cada bibliografia usando os métodos que buscam todas as páginas
    config.bibliografias.forEach(bibliografiaId => {
      const baseFilters: any = { bibliografia: bibliografiaId };
      
      // Adicionar filtro de assunto se selecionado
      if (this.selectedAssunto && this.selectedAssunto.trim()) {
        baseFilters.assunto = this.selectedAssunto.trim();
      }
      
      if (config.questoesMultipla > 0) {
        multiplaObservables.push(
          this.perguntasService.getAllPerguntasMultipla(baseFilters as PerguntaMultiplaFilters)
        );
      }
      
      if (config.questoesVF > 0) {
        vfObservables.push(
          this.perguntasService.getAllPerguntasVF(baseFilters as PerguntaVFFilters)
        );
      }
      
      if (config.questoesCorrelacao > 0) {
        correlacaoObservables.push(
          this.perguntasService.getAllPerguntasCorrelacao(baseFilters as PerguntaFilters)
        );
      }
    });

    // Combinar todas as chamadas usando forkJoin
    const observables: any = {};
    
    if (multiplaObservables.length > 0) {
      observables.multiplas = forkJoin(multiplaObservables);
    }
    if (vfObservables.length > 0) {
      observables.vfs = forkJoin(vfObservables);
    }
    if (correlacaoObservables.length > 0) {
      observables.correlacoes = forkJoin(correlacaoObservables);
    }

    // Se não há observables, retornar array vazio
    if (Object.keys(observables).length === 0) {
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }

    return forkJoin(observables).pipe(
      map((results: any) => {
        // Combinar resultados de todas as bibliografias
        // Agora os resultados já são arrays completos, não PaginatedResponse
        const todasMultiplas: PerguntaMultipla[] = results.multiplas 
          ? results.multiplas.flatMap((perguntas: PerguntaMultipla[]) => perguntas)
          : [];
        const todasVFs: PerguntaVF[] = results.vfs 
          ? results.vfs.flatMap((perguntas: PerguntaVF[]) => perguntas)
          : [];
        const todasCorrelacoes: PerguntaCorrelacao[] = results.correlacoes 
          ? results.correlacoes.flatMap((perguntas: PerguntaCorrelacao[]) => perguntas)
          : [];
        
        // Atualizar cache de questões filtradas (para exibição)
        this.allQuestionsCache = [
          ...todasMultiplas,
          ...todasVFs,
          ...todasCorrelacoes
        ];
        
        // IMPORTANTE: NÃO atualizar o cache completo aqui!
        // O cache completo é atualizado separadamente pelo método loadCompleteCache()
        // que busca TODAS as questões de TODOS os tipos, independentemente da tab.
        // Isso garante que as estatísticas do header sempre mostrem todos os valores disponíveis.
        // O cache completo só é atualizado quando a bibliografia muda, não quando muda de tab.
        
        // Extrair assuntos disponíveis do cache completo (sempre mostra todos)
        // Isso garante que mesmo quando um assunto está selecionado, todos os assuntos
        // da bibliografia permanecem visíveis no combobox
        this.updateAssuntosDisponiveis();
        
        // Invalidar cache de estatísticas para recalcular
        this._statsCache = null;

        console.log('📊 TODAS as questões recebidas do backend (paginação completa, combinadas de todas bibliografias):', {
          multiplas: {
            total_bibliografias_consultadas: results.multiplas ? results.multiplas.length : 0,
            count_total_disponivel: todasMultiplas.length,
            bibliografias_encontradas: [...new Set(todasMultiplas.map(q => q.bibliografia))],
            primeiras_questoes: todasMultiplas.slice(0, 3).map(q => ({
              id: q.id,
              bibliografia: q.bibliografia,
              bibliografia_titulo: q.bibliografia_titulo,
              pergunta_preview: q.pergunta.substring(0, 50) + '...'
            }))
          },
          vfs: {
            total_bibliografias_consultadas: results.vfs ? results.vfs.length : 0,
            count_total_disponivel: todasVFs.length,
            bibliografias_encontradas: [...new Set(todasVFs.map(q => q.bibliografia))],
            primeiras_questoes: todasVFs.slice(0, 3).map(q => ({
              id: q.id,
              bibliografia: q.bibliografia,
              bibliografia_titulo: q.bibliografia_titulo,
              pergunta_preview: q.pergunta.substring(0, 50) + '...'
            }))
          },
          correlacoes: {
            total_bibliografias_consultadas: results.correlacoes ? results.correlacoes.length : 0,
            count_total_disponivel: todasCorrelacoes.length,
            bibliografias_encontradas: [...new Set(todasCorrelacoes.map(q => q.bibliografia))],
            primeiras_questoes: todasCorrelacoes.slice(0, 3).map(q => ({
              id: q.id,
              bibliografia: q.bibliografia,
              bibliografia_titulo: q.bibliografia_titulo,
              pergunta_preview: q.pergunta.substring(0, 50) + '...'
            }))
          }
        });

        const questions: SimuladoQuestion[] = [];

        // Filtrar questões por bibliografia (já devem estar filtradas, mas garantindo)
        console.log('🎯 Configuração de filtro:', {
          bibliografias_solicitadas: config.bibliografias,
          tipo_array: Array.isArray(config.bibliografias)
        });
        
        const multiplasFiltradas = todasMultiplas.filter(q => 
          config.bibliografias.includes(q.bibliografia)
        );
        const vfsFiltradas = todasVFs.filter(q => 
          config.bibliografias.includes(q.bibliografia)
        );
        const correlacoesFiltradas = todasCorrelacoes.filter(q => 
          config.bibliografias.includes(q.bibliografia)
        );

        console.log('🔍 Questões filtradas por bibliografia:', {
          bibliografias_solicitadas: config.bibliografias,
          questoes_encontradas: {
            multiplas: {
              total_antes_filtro: todasMultiplas.length,
              total_apos_filtro: multiplasFiltradas.length,
              distribuicao_por_bibliografia: config.bibliografias.map(bibId => ({
                bibliografia: bibId,
                count: multiplasFiltradas.filter(q => q.bibliografia === bibId).length
              }))
            },
            vfs: {
              total_antes_filtro: todasVFs.length,
              total_apos_filtro: vfsFiltradas.length,
              distribuicao_por_bibliografia: config.bibliografias.map(bibId => ({
                bibliografia: bibId,
                count: vfsFiltradas.filter(q => q.bibliografia === bibId).length
              }))
            },
            correlacoes: {
              total_antes_filtro: todasCorrelacoes.length,
              total_apos_filtro: correlacoesFiltradas.length,
              distribuicao_por_bibliografia: config.bibliografias.map(bibId => ({
                bibliografia: bibId,
                count: correlacoesFiltradas.filter(q => q.bibliografia === bibId).length
              }))
            }
          }
        });

        // Verificar se há questões suficientes
        const verificacao = {
          vf: {
            solicitadas: config.questoesVF,
            disponiveis: vfsFiltradas.length,
            suficientes: vfsFiltradas.length >= config.questoesVF
          },
          multipla: {
            solicitadas: config.questoesMultipla,
            disponiveis: multiplasFiltradas.length,
            suficientes: multiplasFiltradas.length >= config.questoesMultipla
          },
          correlacao: {
            solicitadas: config.questoesCorrelacao,
            disponiveis: correlacoesFiltradas.length,
            suficientes: correlacoesFiltradas.length >= config.questoesCorrelacao
          }
        };

        console.log('⚠️ Verificação de disponibilidade de questões:', verificacao);

        // Verificar se há questões insuficientes e emitir warnings específicos
        const questoesInsuficientes: string[] = [];
        Object.entries(verificacao).forEach(([tipo, info]) => {
          if (!info.suficientes) {
            console.warn(`⚠️ ATENÇÃO: Questões ${tipo} insuficientes!`, {
              tipo,
              solicitadas: info.solicitadas,
              disponiveis: info.disponiveis,
              diferenca: info.solicitadas - info.disponiveis,
              bibliografia_ids: config.bibliografias
            });
            questoesInsuficientes.push(`${tipo}: ${info.disponiveis}/${info.solicitadas}`);
          }
        });

        // Se não há questões suficientes, criar mensagem de aviso
        if (questoesInsuficientes.length > 0) {
          const mensagensDetalhadas = questoesInsuficientes.map(item => {
            const [tipo, info] = item.split(': ');
            const [disponiveis, solicitadas] = info.split('/');
            const tipoNome = tipo === 'vf' ? 'Verdadeiro/Falso' : 
                           tipo === 'multipla' ? 'Múltipla Escolha' : 
                           'Correlação';
            return `${tipoNome}: ${disponiveis} disponíveis de ${solicitadas} solicitadas`;
          });
          
          const mensagem = `Não há questões suficientes para gerar esta prova.\n\n${mensagensDetalhadas.join('\n')}\n\nPor favor, verifique se há questões cadastradas para as bibliografias selecionadas.`;
          
          console.warn('🚨 SIMULADO COM QUESTÕES REDUZIDAS:', {
            problema: 'Não há questões suficientes para a configuração solicitada',
            aba: tabType,
            bibliografias_consultadas: config.bibliografias,
            questoes_insuficientes: questoesInsuficientes,
            mensagem: mensagem
          });
          
          // Armazenar mensagem no estado da tab para exibir no template
          this.tabs[tabType].insufficientQuestionsMessage = mensagem;
        }

        // Selecionar questões aleatórias
        const selectedVFs = this.getRandomItems(vfsFiltradas, config.questoesVF);
        const selectedMultiplas = this.getRandomItems(multiplasFiltradas, config.questoesMultipla);
        const selectedCorrelacoes = this.getRandomItems(correlacoesFiltradas, config.questoesCorrelacao);

        console.log('🎲 Questões selecionadas aleatoriamente:', {
          aba: tabType,
          vf: {
            solicitadas: config.questoesVF,
            selecionadas: selectedVFs.length,
            ids: selectedVFs.map(q => q.id)
          },
          multipla: {
            solicitadas: config.questoesMultipla,
            selecionadas: selectedMultiplas.length,
            ids: selectedMultiplas.map(q => q.id)
          },
          correlacao: {
            solicitadas: config.questoesCorrelacao,
            selecionadas: selectedCorrelacoes.length,
            ids: selectedCorrelacoes.map(q => q.id)
          }
        });

        // Converter para SimuladoQuestion
        selectedVFs.forEach(q => {
          // Sortear aleatoriamente se vai mostrar a afirmação verdadeira ou falsa
          const mostrarVerdadeira = Math.random() < 0.5;
          const afirmacaoSorteada = mostrarVerdadeira ? q.afirmacao_verdadeira : q.afirmacao_falsa;
          
          // Criar uma cópia da pergunta com os campos de sorteio
          const qComSorteio: PerguntaVF = {
            ...q,
            afirmacao_sorteada: afirmacaoSorteada,
            afirmacao_sorteada_eh_verdadeira: mostrarVerdadeira
          };
          
          const simuladoQ: SimuladoQuestion = {
            id: q.id,
            tipo: 'vf',
            pergunta: q.pergunta,
            bibliografia_titulo: q.bibliografia_titulo,
            paginas: q.paginas,
            data: qComSorteio,
            uniqueKey: `vf-${q.id}`
          };
          questions.push(simuladoQ);
          
          console.log('➕ Questão V/F adicionada:', {
            id: simuladoQ.id,
            uniqueKey: simuladoQ.uniqueKey,
            tipo: simuladoQ.tipo,
            tipo_verificacao: simuladoQ.tipo === 'vf',
            afirmacao_sorteada_eh_verdadeira: mostrarVerdadeira,
            afirmacao_preview: afirmacaoSorteada.substring(0, 50) + '...'
          });
        });

        selectedMultiplas.forEach(q => {
          const simuladoQ: SimuladoQuestion = {
            id: q.id,
            tipo: 'multipla',
            pergunta: q.pergunta,
            bibliografia_titulo: q.bibliografia_titulo,
            paginas: q.paginas,
            data: q,
            uniqueKey: `multipla-${q.id}`
          };
          questions.push(simuladoQ);
          
          console.log('➕ Questão Múltipla adicionada:', {
            id: simuladoQ.id,
            uniqueKey: simuladoQ.uniqueKey,
            tipo: simuladoQ.tipo,
            tipo_verificacao: simuladoQ.tipo === 'multipla'
          });
        });

        selectedCorrelacoes.forEach(q => {
          const simuladoQ: SimuladoQuestion = {
            id: q.id,
            tipo: 'correlacao',
            pergunta: q.pergunta,
            bibliografia_titulo: q.bibliografia_titulo,
            paginas: q.paginas,
            data: q,
            uniqueKey: `correlacao-${q.id}`
          };
          questions.push(simuladoQ);
          
          console.log('➕ Questão de correlação adicionada:', {
            id: simuladoQ.id,
            tipo: simuladoQ.tipo,
            tipo_verificacao: simuladoQ.tipo === 'correlacao',
            data_tipo: q.tipo,
            pergunta_preview: simuladoQ.pergunta.substring(0, 30) + '...',
            coluna_a_length: q.coluna_a?.length,
            coluna_b_length: q.coluna_b?.length,
            resposta_correta: q.resposta_correta
          });
        });

        console.log('📝 Questões finais do simulado:', {
          total: questions.length,
          distribuicao: {
            vf: questions.filter(q => q.tipo === 'vf').length,
            multipla: questions.filter(q => q.tipo === 'multipla').length,
            correlacao: questions.filter(q => q.tipo === 'correlacao').length
          },
          questoes_detalhadas: questions.map(q => ({
            id: q.id,
            tipo: q.tipo,
            tipo_check: typeof q.tipo,
            bibliografia: q.bibliografia_titulo,
            pergunta_preview: q.pergunta.substring(0, 50) + '...',
            tem_data: !!q.data,
            data_tipo: (q.data as any)?.tipo
          }))
        });

        return questions;
      })
    );
  }

  private getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = this.shuffleArray([...array]);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Métodos específicos para tipos de pergunta (usados pelo template)
  getVFData(question: SimuladoQuestion): PerguntaVF {
    return question.data as PerguntaVF;
  }

  getMultiplaData(question: SimuladoQuestion): PerguntaMultipla {
    return question.data as PerguntaMultipla;
  }

  getCorrelacaoData(question: SimuladoQuestion): PerguntaCorrelacao {
    if (question.tipo !== 'correlacao') {
      console.warn('⚠️ getCorrelacaoData chamado para questão não-correlação:', question.tipo);
      // Retornar um objeto vazio que não vai quebrar o template
      return { coluna_a: [], coluna_b: [], resposta_correta: {} } as any;
    }
    return question.data as PerguntaCorrelacao;
  }

  // Cache de estatísticas para evitar recálculos
  private _statsCache: {
    total: number;
    vf: number;
    multipla: number;
    correlacao: number;
    bibliografias: number;
    assuntos: number;
  } | null = null;

  /**
   * Retorna estatísticas das questões disponíveis
   * IMPORTANTE: Sempre retorna estatísticas de TODAS as questões disponíveis,
   * independentemente da tab selecionada. Usa o cache completo (sem filtro de assunto).
   */
  getStats() {
    // SEMPRE usar cache completo para obter estatísticas totais de todas as questões
    // Isso garante que o header sempre mostre os valores totais, não apenas da tab atual
    const cacheToUse = this.allQuestionsCacheComplete.length > 0 
      ? this.allQuestionsCacheComplete 
      : this.allQuestionsCache;
    
    // Calcular estatísticas apenas se o cache mudou
    const cacheLength = cacheToUse.length;
    const bibliografiasCount = this.bibliografias.length;
    const assuntosCount = this.assuntosDisponiveis.length;
    
    // Verificar se o cache ainda é válido
    if (this._statsCache && 
        this._statsCache.total === cacheLength &&
        this._statsCache.bibliografias === bibliografiasCount &&
        this._statsCache.assuntos === assuntosCount) {
      return this._statsCache;
    }
    
    // Contar questões por tipo usando o cache completo (TODAS as questões disponíveis)
    const vfCount = cacheToUse.filter(q => q.tipo === 'vf').length;
    const multiplaCount = cacheToUse.filter(q => q.tipo === 'multipla').length;
    const correlacaoCount = cacheToUse.filter(q => q.tipo === 'correlacao').length;
    
    this._statsCache = {
      total: cacheLength,
      vf: vfCount,
      multipla: multiplaCount,
      correlacao: correlacaoCount,
      bibliografias: bibliografiasCount,
      assuntos: assuntosCount
    };
    
    return this._statsCache;
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
   * Converte as questões do simulado para PDF pesquisável e faz o download
   */
  async downloadAsPDF() {
    if (this.simuladoQuestions.length === 0) {
      return;
    }

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
   * Gera PDF pesquisável com as questões e respostas
   */
  private async downloadAsPDFSearchable() {
    if (this.simuladoQuestions.length === 0) {
      return;
    }

    const jsPDF = (await import('jspdf')).default;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Configurações de página
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const margin = 15; // Margem reduzida
    const maxWidth = pageWidth - (margin * 2);
    let y = margin;
    
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
    
    // Interface para representar texto com estilo
    interface TextSegment {
      text: string;
      bold: boolean;
    }
    
    // Extrai texto com estilos de uma string (processa markdown básico: *texto* e **texto**)
    const extractTextWithStyles = (text: string): TextSegment[] => {
      if (!text) return [];
      
      const segments: TextSegment[] = [];
      // Usa regex para encontrar padrões **texto** e *texto* (não greedy)
      // Processa **texto** primeiro para evitar conflitos com *texto*
      let processed = text;
      
      // Substitui **texto** por placeholder temporário
      processed = processed.replace(/\*\*([^*]+)\*\*/g, (match, content) => {
        return `__BOLD_DOUBLE__${content}__BOLD_DOUBLE_END__`;
      });
      
      // Depois processa *texto* (que não está dentro de **)
      processed = processed.replace(/\*([^*]+)\*/g, (match, content) => {
        // Verifica se não está dentro de um placeholder de negrito duplo
        if (!match.includes('__BOLD_DOUBLE__')) {
          return `__BOLD_SINGLE__${content}__BOLD_SINGLE_END__`;
        }
        return match;
      });
      
      // Agora divide o texto processado em segmentos
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
    
    // Renderiza texto com estilos em uma linha
    const renderStyledText = (segments: TextSegment[], x: number, yPos: number, maxLineWidth: number, fontSize: number): number => {
      let currentY = yPos;
      const lineHeight = fontSize * 0.4;
      
      // Processa cada segmento, respeitando quebras de linha
      segments.forEach(segment => {
        // Divide por quebras de linha primeiro
        const lines = segment.text.split('\n');
        
        lines.forEach((line, lineIndex) => {
          // Se não é a primeira linha, renderiza a linha atual e pula para próxima
          if (lineIndex > 0) {
            currentY += lineHeight;
            // Verifica se precisa de nova página
            if (currentY + lineHeight > pageHeight - margin) {
              pdf.addPage();
              currentY = margin;
            }
          }
          
          if (!line || line.trim().length === 0) {
            return; // Linha vazia, apenas pula
          }
          
          // Processa palavras da linha
          const parts = line.split(/(\s+)/);
          const words: Array<{text: string, bold: boolean}> = [];
          
          parts.forEach(part => {
            if (part && !/^\s+$/.test(part)) {
              words.push({ text: part, bold: segment.bold });
            }
          });
          
          if (words.length === 0) {
            return;
          }
          
          // Agrupa palavras em linhas que cabem no espaço disponível
          let lineWords: Array<{text: string, bold: boolean}> = [];
          let lineWidth = 0;
          const spaceWidth = pdf.getTextWidth(' ');
          
          words.forEach((word) => {
            pdf.setFontSize(fontSize);
            pdf.setFont('helvetica', word.bold ? 'bold' : 'normal');
            
            const wordWidth = pdf.getTextWidth(word.text);
            const newLineWidth = lineWidth + (lineWords.length > 0 ? spaceWidth : 0) + wordWidth;
            
            // Se a palavra não cabe na linha atual, renderiza a linha anterior
            if (newLineWidth > maxLineWidth && lineWords.length > 0) {
              // Renderiza linha atual
              if (currentY + lineHeight > pageHeight - margin) {
                pdf.addPage();
                currentY = margin;
              }
              
              let xPos = x;
              lineWords.forEach((w, idx) => {
                pdf.setFontSize(fontSize);
                pdf.setFont('helvetica', w.bold ? 'bold' : 'normal');
                pdf.text(w.text, xPos, currentY);
                xPos += pdf.getTextWidth(w.text);
                if (idx < lineWords.length - 1) {
                  xPos += spaceWidth;
                }
              });
              currentY += lineHeight;
              
              // Inicia nova linha com a palavra atual
              lineWords = [word];
              lineWidth = wordWidth;
            } else {
              lineWords.push(word);
              lineWidth = newLineWidth;
            }
          });
          
          // Renderiza a última linha se houver palavras
          if (lineWords.length > 0) {
            if (currentY + lineHeight > pageHeight - margin) {
              pdf.addPage();
              currentY = margin;
            }
            
            let xPos = x;
            lineWords.forEach((w, idx) => {
              pdf.setFontSize(fontSize);
              pdf.setFont('helvetica', w.bold ? 'bold' : 'normal');
              pdf.text(w.text, xPos, currentY);
              xPos += pdf.getTextWidth(w.text);
              if (idx < lineWords.length - 1) {
                xPos += spaceWidth;
              }
            });
            currentY += lineHeight;
          }
        });
      });
      
      return currentY;
    };
    
    // Título do documento
    pdf.setFontSize(14); // Reduzido de 18
    pdf.setFont('helvetica', 'bold');
    const tabNames: { [key: string]: string } = {
      'completo': 'Simulado Completo',
      'vf': 'Verdadeiro/Falso',
      'multipla': 'Múltipla Escolha',
      'correlacao': 'Correlação'
    };
    const title = removeEmojis(tabNames[this.activeTab] || 'Prova');
    pdf.text(title, margin, y);
    y += 6; // Reduzido de 10
    
    // Informações da prova
    pdf.setFontSize(8); // Reduzido de 10
    pdf.setFont('helvetica', 'normal');
    const totalQuestions = this.simuladoQuestions.length;
    const answeredQuestions = this.getTotalAnsweredQuestions();
    const correctAnswers = this.getTotalCorrectAnswers();
    const scorePercentage = this.getScorePercentage();
    
    let infoText = `Total de questões: ${totalQuestions}`;
    if (answeredQuestions > 0) {
      infoText += ` | Respondidas: ${answeredQuestions} | Acertos: ${correctAnswers} | Performance: ${scorePercentage.toFixed(1)}%`;
    }
    pdf.text(infoText, margin, y);
    y += 5; // Reduzido de 8
    
    // Linha separadora
    y += 1; // Reduzido de 2
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.3); // Reduzido de 0.5
    pdf.line(margin, y, pageWidth - margin, y);
    y += 5; // Reduzido de 8
    
    // ========== PARTE 1: QUESTÕES ==========
    pdf.setFontSize(12); // Reduzido de 16
    pdf.setFont('helvetica', 'bold');
    pdf.text('QUESTÕES', margin, y);
    y += 6; // Reduzido de 10
    
    this.simuladoQuestions.forEach((question, index) => {
      // Verifica se precisa de nova página
      if (y + 20 > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      
      // Número e tipo da questão
      pdf.setFontSize(10); // Reduzido de 12
      pdf.setFont('helvetica', 'bold');
      const tipoNome = question.tipo === 'vf' ? 'Verdadeiro/Falso' : 
                       question.tipo === 'multipla' ? 'Múltipla Escolha' : 
                       'Correlação';
      const questaoHeader = `Questão ${index + 1} - ${tipoNome}`;
      pdf.text(questaoHeader, margin, y);
      y += 5; // Reduzido de 7
      
      // Bibliografia e páginas
      if (question.bibliografia_titulo || question.paginas) {
        pdf.setFontSize(7); // Reduzido de 9
        pdf.setFont('helvetica', 'italic');
        let metaText = '';
        if (question.bibliografia_titulo) {
          metaText += removeEmojis(question.bibliografia_titulo);
        }
        if (question.paginas) {
          if (metaText) metaText += ' | ';
          metaText += removeEmojis(question.paginas);
        }
        if (metaText) {
          pdf.text(metaText, margin, y);
          y += 4; // Reduzido de 5
        }
      }
      
      // Pergunta (com formatação markdown)
      pdf.setFontSize(9); // Reduzido de 11
      const perguntaSegments = extractTextWithStyles(question.pergunta);
      if (perguntaSegments.length > 0) {
        y = renderStyledText(perguntaSegments, margin, y, maxWidth, 9);
      } else {
        // Fallback para texto simples
        pdf.setFont('helvetica', 'normal');
        const perguntaText = removeEmojis(question.pergunta);
        const perguntaLines = pdf.splitTextToSize(perguntaText, maxWidth);
        perguntaLines.forEach((line: string) => {
          if (y + 5 > pageHeight - margin) {
            pdf.addPage();
            y = margin;
          }
          pdf.text(line, margin, y);
          y += 5;
        });
      }
      
      // Opções/Alternativas baseado no tipo
      y += 2; // Reduzido de 3
      pdf.setFontSize(8); // Reduzido de 10
      
      if (question.tipo === 'vf') {
        const vfData = question.data as PerguntaVF;
        const afirmacao = vfData.afirmacao_sorteada || vfData.afirmacao_verdadeira || '';
        // Processa formatação markdown na afirmação
        const afirmacaoSegments = extractTextWithStyles(afirmacao);
        if (afirmacaoSegments.length > 0) {
          y = renderStyledText(afirmacaoSegments, margin + 5, y, maxWidth - 10, 8);
        } else {
          // Fallback para texto simples
          pdf.setFont('helvetica', 'normal');
          const afirmacaoText = removeEmojis(afirmacao);
          const afirmacaoLines = pdf.splitTextToSize(afirmacaoText, maxWidth - 10);
          afirmacaoLines.forEach((line: string) => {
            if (y + 4 > pageHeight - margin) {
              pdf.addPage();
              y = margin;
            }
            pdf.text(`  ${line}`, margin + 5, y);
            y += 4;
          });
        }
        y += 1; // Reduzido de 2
        pdf.setFont('helvetica', 'normal');
        pdf.text('  ( ) Verdadeiro    ( ) Falso', margin + 5, y);
        y += 4; // Reduzido de 5
      } else if (question.tipo === 'multipla') {
        const multiplaData = question.data as PerguntaMultipla;
        const alternativas = [
          { key: 'a', text: multiplaData.alternativa_a },
          { key: 'b', text: multiplaData.alternativa_b },
          { key: 'c', text: multiplaData.alternativa_c },
          { key: 'd', text: multiplaData.alternativa_d }
        ];
        alternativas.forEach((alt) => {
          // Processa formatação markdown na alternativa
          const altSegments = extractTextWithStyles(alt.text);
          if (altSegments.length > 0) {
            // Adiciona prefixo da alternativa ao primeiro segmento
            const firstSegment = altSegments[0];
            firstSegment.text = `${alt.key}) ${firstSegment.text}`;
            y = renderStyledText(altSegments, margin + 5, y, maxWidth - 15, 8);
            y += 1; // Espaço entre alternativas
          } else {
            // Fallback para texto simples
            pdf.setFont('helvetica', 'normal');
            const altText = removeEmojis(alt.text);
            const altLines = pdf.splitTextToSize(altText, maxWidth - 15);
            altLines.forEach((line: string, lineIndex: number) => {
              if (y + 4 > pageHeight - margin) {
                pdf.addPage();
                y = margin;
              }
              const prefix = lineIndex === 0 ? `  ${alt.key}) ` : '      ';
              pdf.text(prefix + line, margin + 5, y);
              y += 4;
            });
            y += 1; // Espaço entre alternativas
          }
        });
        y += 1; // Reduzido de 2
      } else if (question.tipo === 'correlacao') {
        const correlacaoData = question.data as PerguntaCorrelacao;
        if (correlacaoData.coluna_a && correlacaoData.coluna_b) {
          pdf.text('  Coluna A:', margin + 5, y);
          y += 4; // Reduzido de 6
          correlacaoData.coluna_a.forEach((item, idx) => {
            // Processa formatação markdown no item
            const itemSegments = extractTextWithStyles(item);
            if (itemSegments.length > 0) {
              // Adiciona prefixo do item ao primeiro segmento
              const firstSegment = itemSegments[0];
              firstSegment.text = `${idx + 1}. ${firstSegment.text}`;
              y = renderStyledText(itemSegments, margin + 5, y, maxWidth - 20, 8);
            } else {
              // Fallback para texto simples
              pdf.setFont('helvetica', 'normal');
              const itemText = removeEmojis(item);
              const itemLines = pdf.splitTextToSize(itemText, maxWidth - 20);
              itemLines.forEach((line: string, lineIndex: number) => {
                if (y + 4 > pageHeight - margin) {
                  pdf.addPage();
                  y = margin;
                }
                const prefix = lineIndex === 0 ? `    ${idx + 1}. ` : '        ';
                pdf.text(prefix + line, margin + 5, y);
                y += 4;
              });
            }
          });
          y += 2; // Reduzido de 3
          pdf.setFont('helvetica', 'normal');
          pdf.text('  Coluna B:', margin + 5, y);
          y += 4; // Reduzido de 6
          correlacaoData.coluna_b.forEach((item, idx) => {
            // Processa formatação markdown no item
            const itemSegments = extractTextWithStyles(item);
            if (itemSegments.length > 0) {
              // Adiciona prefixo do item ao primeiro segmento
              const firstSegment = itemSegments[0];
              firstSegment.text = `${String.fromCharCode(65 + idx)}. ${firstSegment.text}`;
              y = renderStyledText(itemSegments, margin + 5, y, maxWidth - 20, 8);
            } else {
              // Fallback para texto simples
              pdf.setFont('helvetica', 'normal');
              const itemText = removeEmojis(item);
              const itemLines = pdf.splitTextToSize(itemText, maxWidth - 20);
              itemLines.forEach((line: string, lineIndex: number) => {
                if (y + 4 > pageHeight - margin) {
                  pdf.addPage();
                  y = margin;
                }
                const prefix = lineIndex === 0 ? `    ${String.fromCharCode(65 + idx)}. ` : '        ';
                pdf.text(prefix + line, margin + 5, y);
                y += 4;
              });
            }
          });
          y += 2; // Reduzido de 3
          pdf.text('  Associe os itens da Coluna A com os da Coluna B:', margin + 5, y);
          y += 4; // Reduzido de 5
        }
      }
      
      // Espaço entre questões
      y += 5; // Reduzido de 8
      
      // Linha separadora entre questões (exceto na última)
      if (index < this.simuladoQuestions.length - 1) {
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.15); // Reduzido de 0.2
        pdf.line(margin, y - 3, pageWidth - margin, y - 3);
        y += 1; // Reduzido de 2
      }
    });
    
    // ========== PARTE 2: GABARITO/RESPOSTAS ==========
    // Nova página para o gabarito
    pdf.addPage();
    y = margin;
    
    pdf.setFontSize(12); // Reduzido de 16
    pdf.setFont('helvetica', 'bold');
    pdf.text('GABARITO', margin, y);
    y += 6; // Reduzido de 10
    
    this.simuladoQuestions.forEach((question, index) => {
      // Verifica se precisa de nova página
      if (y + 15 > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      
      // Número da questão
      pdf.setFontSize(10); // Reduzido de 12
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Questão ${index + 1}:`, margin, y);
      y += 5; // Reduzido de 7
      
      // Resposta correta baseado no tipo
      pdf.setFontSize(8); // Reduzido de 10
      pdf.setFont('helvetica', 'normal');
      
      if (question.tipo === 'vf') {
        const vfData = question.data as PerguntaVF;
        const respostaCorreta = vfData.afirmacao_sorteada_eh_verdadeira ? 'Verdadeiro' : 'Falso';
        pdf.text(`  Resposta correta: ${respostaCorreta}`, margin + 5, y);
        y += 4; // Reduzido de 6
        
        // Justificativa se houver (com formatação markdown)
        if (vfData.justificativa_resposta_certa) {
          pdf.setFont('helvetica', 'italic');
          pdf.text('  Justificativa:', margin + 5, y);
          y += 4; // Reduzido de 5
          const justificativaSegments = extractTextWithStyles(vfData.justificativa_resposta_certa);
          if (justificativaSegments.length > 0) {
            y = renderStyledText(justificativaSegments, margin + 5, y, maxWidth - 10, 8);
          } else {
            // Fallback para texto simples
            pdf.setFont('helvetica', 'normal');
            const justificativaText = removeEmojis(vfData.justificativa_resposta_certa);
            const justificativaLines = pdf.splitTextToSize(justificativaText, maxWidth - 10);
            justificativaLines.forEach((line: string) => {
              if (y + 4 > pageHeight - margin) {
                pdf.addPage();
                y = margin;
              }
              pdf.text(`    ${line}`, margin + 5, y);
              y += 4;
            });
          }
        }
      } else if (question.tipo === 'multipla') {
        const multiplaData = question.data as PerguntaMultipla;
        pdf.text(`  Resposta correta: ${multiplaData.resposta_correta}`, margin + 5, y);
        y += 4; // Reduzido de 6
        
        // Mostrar alternativa correta completa (com formatação markdown)
        const alternativasMap: { [key: string]: string } = {
          'a': multiplaData.alternativa_a,
          'b': multiplaData.alternativa_b,
          'c': multiplaData.alternativa_c,
          'd': multiplaData.alternativa_d
        };
        if (alternativasMap[multiplaData.resposta_correta]) {
          const altCorretaSegments = extractTextWithStyles(alternativasMap[multiplaData.resposta_correta]);
          if (altCorretaSegments.length > 0) {
            // Adiciona prefixo da alternativa ao primeiro segmento
            const firstSegment = altCorretaSegments[0];
            firstSegment.text = `${multiplaData.resposta_correta}) ${firstSegment.text}`;
            y = renderStyledText(altCorretaSegments, margin + 5, y, maxWidth - 10, 8);
          } else {
            // Fallback para texto simples
            pdf.setFont('helvetica', 'normal');
            const altCorreta = removeEmojis(alternativasMap[multiplaData.resposta_correta]);
            pdf.text(`  ${multiplaData.resposta_correta}) ${altCorreta}`, margin + 5, y);
            y += 4;
          }
        }
        
        // Justificativa se houver (com formatação markdown)
        if (multiplaData.justificativa_resposta_certa) {
          pdf.setFont('helvetica', 'italic');
          pdf.text('  Justificativa:', margin + 5, y);
          y += 4; // Reduzido de 5
          const justificativaSegments = extractTextWithStyles(multiplaData.justificativa_resposta_certa);
          if (justificativaSegments.length > 0) {
            y = renderStyledText(justificativaSegments, margin + 5, y, maxWidth - 10, 8);
          } else {
            // Fallback para texto simples
            pdf.setFont('helvetica', 'normal');
            const justificativaText = removeEmojis(multiplaData.justificativa_resposta_certa);
            const justificativaLines = pdf.splitTextToSize(justificativaText, maxWidth - 10);
            justificativaLines.forEach((line: string) => {
              if (y + 4 > pageHeight - margin) {
                pdf.addPage();
                y = margin;
              }
              pdf.text(`    ${line}`, margin + 5, y);
              y += 4;
            });
          }
        }
      } else if (question.tipo === 'correlacao') {
        const correlacaoData = question.data as PerguntaCorrelacao;
        pdf.text('  Resposta correta:', margin + 5, y);
        y += 4; // Reduzido de 6
        
        // Mostrar correlações corretas (com formatação markdown)
        if (correlacaoData.resposta_correta && correlacaoData.coluna_a && correlacaoData.coluna_b) {
          Object.keys(correlacaoData.resposta_correta).sort().forEach((key) => {
            const itemIndex = parseInt(key);
            const letterIndex = parseInt(correlacaoData.resposta_correta[key]);
            const itemA = correlacaoData.coluna_a[itemIndex];
            const itemB = correlacaoData.coluna_b[letterIndex];
            
            // Processa formatação markdown nos itens
            const itemASegments = extractTextWithStyles(itemA);
            const itemBSegments = extractTextWithStyles(itemB);
            
            // Cria texto da resposta com formatação
            const prefix = `${itemIndex + 1} - ${String.fromCharCode(65 + letterIndex)}: `;
            const respostaSegments: TextSegment[] = [
              { text: prefix, bold: false },
              ...itemASegments,
              { text: ' → ', bold: false },
              ...itemBSegments
            ];
            
            y = renderStyledText(respostaSegments, margin + 5, y, maxWidth - 10, 8);
          });
        }
        
        // Justificativa se houver (com formatação markdown)
        if (correlacaoData.justificativa_resposta_certa) {
          y += 1; // Reduzido de 2
          pdf.setFont('helvetica', 'italic');
          pdf.text('  Justificativa:', margin + 5, y);
          y += 4; // Reduzido de 5
          const justificativaSegments = extractTextWithStyles(correlacaoData.justificativa_resposta_certa);
          if (justificativaSegments.length > 0) {
            y = renderStyledText(justificativaSegments, margin + 5, y, maxWidth - 10, 8);
          } else {
            // Fallback para texto simples
            pdf.setFont('helvetica', 'normal');
            const justificativaText = removeEmojis(correlacaoData.justificativa_resposta_certa);
            const justificativaLines = pdf.splitTextToSize(justificativaText, maxWidth - 10);
            justificativaLines.forEach((line: string) => {
              if (y + 4 > pageHeight - margin) {
                pdf.addPage();
                y = margin;
              }
              pdf.text(`    ${line}`, margin + 5, y);
              y += 4;
            });
          }
        }
      }
      
      // Espaço entre respostas
      y += 3; // Reduzido de 5
    });
    
    // Função para remover acentos e caracteres especiais
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
    
    // Gera o nome do arquivo
    const tabName = removeAccents(tabNames[this.activeTab] || 'prova');
    const fileName = `${tabName}-${new Date().toISOString().split('T')[0]}.pdf`;
    
    // Faz o download
    pdf.save(fileName);
    
    console.log('✅ PDF pesquisável gerado com sucesso:', fileName);
  }
}


