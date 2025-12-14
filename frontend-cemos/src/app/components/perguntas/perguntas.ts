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
  assunto?: string;
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

    // ✅ NOVO: Registrar resposta no backend
    this.registrarRespostaNoBackend(question, answer);

    // Forçar detecção de mudanças
    this.cdr.detectChanges();
  }

  /**
   * Registra a resposta do usuário no backend
   */
  private registrarRespostaNoBackend(question: SimuladoQuestion, answer: any): void {
    // Extrair bibliografia_id e assunto da questão
    let bibliografiaId: number | undefined;
    let assunto: string | undefined;
    let afirmacaoSorteadaEhVerdadeira: boolean | undefined;

    if (question.data) {
      // Para todos os tipos de questão, bibliografia está em data.bibliografia (que é o ID)
      if ('bibliografia' in question.data) {
        bibliografiaId = question.data.bibliografia as number;
      }
      // Assunto pode estar em data.assunto
      if ('assunto' in question.data) {
        assunto = question.data.assunto as string | undefined;
      }
      // Para questões VF, precisamos saber qual afirmação foi sorteada
      if (question.tipo === 'vf' && 'afirmacao_sorteada_eh_verdadeira' in question.data) {
        afirmacaoSorteadaEhVerdadeira = (question.data as any).afirmacao_sorteada_eh_verdadeira;
      }
    }

    // Se não encontrou assunto em data, tenta em question.assunto
    if (!assunto && question.assunto) {
      assunto = question.assunto;
    }

    const data: any = {
      pergunta_id: question.id,
      pergunta_tipo: question.tipo,
      resposta_usuario: answer,
      bibliografia_id: bibliografiaId,
      assunto: assunto
    };

    // Adicionar informação sobre qual afirmação foi sorteada para questões VF
    if (question.tipo === 'vf' && afirmacaoSorteadaEhVerdadeira !== undefined) {
      data.afirmacao_sorteada_eh_verdadeira = afirmacaoSorteadaEhVerdadeira;
    }

    console.log('📤 Enviando resposta para o backend:', {
      pergunta_id: data.pergunta_id,
      pergunta_tipo: data.pergunta_tipo,
      resposta_usuario: data.resposta_usuario,
      bibliografia_id: data.bibliografia_id,
      assunto: data.assunto,
      afirmacao_sorteada_eh_verdadeira: data.afirmacao_sorteada_eh_verdadeira
    });

    this.perguntasService.registrarResposta(data).subscribe({
      next: (response) => {
        console.log('✅ Resposta registrada no backend:', response);
      },
      error: (error) => {
        console.error('❌ Erro ao registrar resposta no backend:', error);
        if (error.error) {
          console.error('Detalhes do erro:', error.error);
        }
        // Não bloquear o fluxo se houver erro no registro
      }
    });
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
            assunto: q.assunto,
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
            assunto: q.assunto,
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
            assunto: q.assunto,
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
    const vfData = question.data as PerguntaVF;
    
    // Remover assunto das afirmações se presente
    if (question.assunto) {
      const vfDataCopy = { ...vfData };
      
      // Remover assunto da afirmação sorteada
      if (vfDataCopy.afirmacao_sorteada) {
        vfDataCopy.afirmacao_sorteada = this.removeAssuntoFromText(vfDataCopy.afirmacao_sorteada, question.assunto);
      }
      
      // Remover assunto da afirmação verdadeira
      if (vfDataCopy.afirmacao_verdadeira) {
        vfDataCopy.afirmacao_verdadeira = this.removeAssuntoFromText(vfDataCopy.afirmacao_verdadeira, question.assunto);
      }
      
      // Remover assunto da afirmação falsa
      if (vfDataCopy.afirmacao_falsa) {
        vfDataCopy.afirmacao_falsa = this.removeAssuntoFromText(vfDataCopy.afirmacao_falsa, question.assunto);
      }
      
      return vfDataCopy;
    }
    
    return vfData;
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

  /**
   * Remove o assunto de um texto genérico (usado para perguntas e afirmações)
   */
  private removeAssuntoFromText(text: string, assunto: string): string {
    if (!text || !assunto) return text;

    // Normalizar ambos os textos para comparação
    const normalize = (t: string): string => {
      return t.trim().replace(/\s+/g, ' ').trim();
    };

    const assuntoNormalized = normalize(assunto);
    if (!assuntoNormalized) return text;

    // Dividir o texto em linhas
    const lines = text.split(/\r?\n/);

    // Verificar e remover se a primeira linha for o assunto
    if (lines.length > 0) {
      const firstLineNormalized = normalize(lines[0]);
      if (firstLineNormalized === assuntoNormalized) {
        lines.shift();
        // Remover linhas vazias subsequentes
        while (lines.length > 0 && lines[0].trim() === '') {
          lines.shift();
        }
      }
    }

    // Verificar e remover se a última linha for o assunto
    if (lines.length > 0) {
      const lastLineNormalized = normalize(lines[lines.length - 1]);
      if (lastLineNormalized === assuntoNormalized) {
        lines.pop();
        // Remover linhas vazias anteriores
        while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
          lines.pop();
        }
      }
    }

    // Reconstruir o texto
    let result = lines.join('\n').trim();

    // Verificação adicional: se o texto ainda começa com o assunto (sem quebra de linha)
    const resultNormalized = normalize(result);
    if (resultNormalized.startsWith(assuntoNormalized)) {
      // Tentar remover o assunto do início
      const index = result.toLowerCase().indexOf(assuntoNormalized.toLowerCase());
      if (index === 0 || (index > 0 && /^\s*$/.test(result.substring(0, index)))) {
        // Encontrar onde o assunto termina
        let charCount = 0;
        let endIndex = 0;

        for (let i = 0; i < result.length && charCount < assuntoNormalized.length; i++) {
          const char = result[i];
          if (char !== '\n' && char !== '\r') {
            const normalizedChar = char.toLowerCase().replace(/\s+/g, ' ');
            if (normalizedChar !== ' ' || charCount === 0 || result[i - 1] !== ' ') {
              charCount++;
            }
          }
          endIndex = i + 1;
        }

        if (endIndex > 0) {
          result = result.substring(endIndex).trim();
          result = result.replace(/^[\n\r\s]+/, '');
        }
      }
    }

    return result || text; // Se remover tudo, retornar o original
  }

  /**
   * Remove o assunto do texto da pergunta se ele aparecer no início ou final
   */
  getPerguntaSemAssunto(question: SimuladoQuestion): string {
    if (!question.pergunta || !question.assunto) {
      return question.pergunta;
    }
    return this.removeAssuntoFromText(question.pergunta, question.assunto);
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
   * Gera 3 PDFs separados: um para V/F, um para Múltipla Escolha e um para Correlação
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
   * Gera PDF pesquisável com as questões e respostas
   * Busca TODAS as questões do banco para a bibliografia e assunto selecionados
   * Gera 3 PDFs separados: um para cada tipo de questão
   */
  private async downloadAsPDFSearchable() {
    // Buscar TODAS as questões do banco para a bibliografia e assunto selecionados
    const bibliografiasParaBuscar = this.selectedBibliografias.length > 0 
      ? this.selectedBibliografias 
      : (this.bibliografiaIds.length > 0 ? this.bibliografiaIds : []);
    
    if (bibliografiasParaBuscar.length === 0) {
      alert('Por favor, selecione pelo menos uma bibliografia.');
      return;
    }

    console.log('📚 Buscando TODAS as questões do banco para PDF:', {
      bibliografias: bibliografiasParaBuscar,
      assunto: this.selectedAssunto || 'Todos'
    });

    // Buscar todas as questões do banco
    const multiplaObservables: Observable<PerguntaMultipla[]>[] = [];
    const vfObservables: Observable<PerguntaVF[]>[] = [];
    const correlacaoObservables: Observable<PerguntaCorrelacao[]>[] = [];

    bibliografiasParaBuscar.forEach(bibliografiaId => {
      const baseFilters: any = { bibliografia: bibliografiaId };
      
      // Adicionar filtro de assunto se selecionado
      if (this.selectedAssunto && this.selectedAssunto.trim()) {
        baseFilters.assunto = this.selectedAssunto.trim();
      }
      
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

    // Aguardar todas as requisições
    const results = await forkJoin({
      multiplas: multiplaObservables.length > 0 ? forkJoin(multiplaObservables) : Promise.resolve([]),
      vfs: vfObservables.length > 0 ? forkJoin(vfObservables) : Promise.resolve([]),
      correlacoes: correlacaoObservables.length > 0 ? forkJoin(correlacaoObservables) : Promise.resolve([])
    }).pipe(takeUntil(this.destroy$)).toPromise();

    if (!results) {
      alert('Erro ao buscar questões do banco de dados.');
      return;
    }

    // Combinar resultados de todas as bibliografias
    const todasMultiplas: PerguntaMultipla[] = results.multiplas 
      ? (results.multiplas as PerguntaMultipla[][]).flatMap((perguntas: PerguntaMultipla[]) => perguntas)
      : [];
    const todasVFs: PerguntaVF[] = results.vfs 
      ? (results.vfs as PerguntaVF[][]).flatMap((perguntas: PerguntaVF[]) => perguntas)
      : [];
    const todasCorrelacoes: PerguntaCorrelacao[] = results.correlacoes 
      ? (results.correlacoes as PerguntaCorrelacao[][]).flatMap((perguntas: PerguntaCorrelacao[]) => perguntas)
      : [];

    // Converter para SimuladoQuestion
    const allQuestions: SimuladoQuestion[] = [];

    // Converter VFs
    todasVFs.forEach(q => {
      const mostrarVerdadeira = Math.random() < 0.5;
      const afirmacaoSorteada = mostrarVerdadeira ? q.afirmacao_verdadeira : q.afirmacao_falsa;
      
      const qComSorteio: PerguntaVF = {
        ...q,
        afirmacao_sorteada: afirmacaoSorteada,
        afirmacao_sorteada_eh_verdadeira: mostrarVerdadeira
      };
      
      allQuestions.push({
        id: q.id,
        tipo: 'vf',
        pergunta: q.pergunta,
        bibliografia_titulo: q.bibliografia_titulo,
        paginas: q.paginas,
        assunto: q.assunto,
        data: qComSorteio,
        uniqueKey: `vf-${q.id}`
      });
    });

    // Converter Múltiplas
    todasMultiplas.forEach(q => {
      allQuestions.push({
        id: q.id,
        tipo: 'multipla',
        pergunta: q.pergunta,
        bibliografia_titulo: q.bibliografia_titulo,
        paginas: q.paginas,
        assunto: q.assunto,
        data: q,
        uniqueKey: `multipla-${q.id}`
      });
    });

    // Converter Correlações
    todasCorrelacoes.forEach(q => {
      allQuestions.push({
        id: q.id,
        tipo: 'correlacao',
        pergunta: q.pergunta,
        bibliografia_titulo: q.bibliografia_titulo,
        paginas: q.paginas,
        assunto: q.assunto,
        data: q,
        uniqueKey: `correlacao-${q.id}`
      });
    });

    if (allQuestions.length === 0) {
      alert('Não há questões disponíveis para gerar o PDF com os filtros selecionados.');
      return;
    }

    console.log('✅ Questões carregadas para PDF:', {
      total: allQuestions.length,
      vf: todasVFs.length,
      multipla: todasMultiplas.length,
      correlacao: todasCorrelacoes.length
    });

    if (allQuestions.length === 0) {
      alert('Não há questões disponíveis para gerar o PDF com os filtros selecionados.');
      return;
    }

    // Gerar PDFs separados para cada tipo de questão
    const vfQuestions = allQuestions.filter(q => q.tipo === 'vf');
    const multiplaQuestions = allQuestions.filter(q => q.tipo === 'multipla');
    const correlacaoQuestions = allQuestions.filter(q => q.tipo === 'correlacao');

    // Gerar PDF para questões V/F
    if (vfQuestions.length > 0) {
      await this.generatePDFForQuestionType('vf', vfQuestions, todasVFs);
    }

    // Gerar PDF para questões de Múltipla Escolha
    if (multiplaQuestions.length > 0) {
      await this.generatePDFForQuestionType('multipla', multiplaQuestions, todasMultiplas);
    }

    // Gerar PDF para questões de Correlação
    if (correlacaoQuestions.length > 0) {
      await this.generatePDFForQuestionType('correlacao', correlacaoQuestions, todasCorrelacoes);
    }
  }

  /**
   * Gera PDF pesquisável para um tipo específico de questão
   */
  private async generatePDFForQuestionType(
    questionType: 'vf' | 'multipla' | 'correlacao',
    questions: SimuladoQuestion[],
    rawQuestions: (PerguntaVF | PerguntaMultipla | PerguntaCorrelacao)[]
  ) {
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
    
    // Trunca o assunto para no máximo 40 caracteres com "..." ao final
    const truncateAssunto = (assunto: string): string => {
      if (!assunto) return '';
      const assuntoLimpo = removeEmojis(assunto);
      if (assuntoLimpo.length <= 40) {
        return assuntoLimpo;
      }
      return assuntoLimpo.substring(0, 40) + '...';
    };
    
    // Remove o assunto do texto da pergunta se ele aparecer no início ou final
    const removeAssuntoFromPergunta = (perguntaText: string, assunto?: string): string => {
      if (!perguntaText || !assunto) return perguntaText;
      
      // Função auxiliar para normalizar texto (remover emojis e normalizar espaços)
      const normalize = (text: string): string => {
        return removeEmojis(text.trim()).replace(/\s+/g, ' ').trim();
      };
      
      const assuntoNormalized = normalize(assunto);
      if (!assuntoNormalized) return perguntaText;
      
      // Dividir o texto em linhas
      const lines = perguntaText.split(/\r?\n/);
      
      // Verificar e remover se a primeira linha for o assunto
      if (lines.length > 0) {
        const firstLineNormalized = normalize(lines[0]);
        if (firstLineNormalized === assuntoNormalized) {
          lines.shift();
          // Remover linhas vazias subsequentes
          while (lines.length > 0 && lines[0].trim() === '') {
            lines.shift();
          }
        }
      }
      
      // Verificar e remover se a última linha for o assunto
      if (lines.length > 0) {
        const lastLineNormalized = normalize(lines[lines.length - 1]);
        if (lastLineNormalized === assuntoNormalized) {
          lines.pop();
          // Remover linhas vazias anteriores
          while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
            lines.pop();
          }
        }
      }
      
      // Reconstruir o texto
      let result = lines.join('\n').trim();
      
      // Verificação adicional: se o texto ainda começa com o assunto (sem quebra de linha)
      // Usar busca simples e direta
      const resultStart = result.substring(0, Math.min(assuntoNormalized.length + 50, result.length));
      const resultStartNormalized = normalize(resultStart);
      
      if (resultStartNormalized.startsWith(assuntoNormalized)) {
        // Encontrar onde o assunto termina no texto original
        // Buscar pelo assunto no texto original (case-insensitive)
        const assuntoLower = assuntoNormalized.toLowerCase();
        const resultLower = removeEmojis(result).toLowerCase();
        const index = resultLower.indexOf(assuntoLower);
        
        if (index === 0 || (index > 0 && /^\s*$/.test(result.substring(0, index)))) {
          // Encontrar o fim do assunto no texto original
          let charCount = 0;
          let endIndex = 0;
          
          for (let i = 0; i < result.length && charCount < assuntoNormalized.length; i++) {
            const char = result[i];
            const isEmoji = /[\u{1F300}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{FE00}-\u{FE0F}\u{200D}\u{FE0F}]/u.test(char);
            
            if (!isEmoji) {
              const normalizedChar = char.toLowerCase().replace(/\s+/g, ' ');
              if (normalizedChar !== ' ' || charCount === 0 || result[i-1] !== ' ') {
                charCount++;
              }
            }
            endIndex = i + 1;
          }
          
          if (endIndex > 0) {
            result = result.substring(endIndex).trim();
            result = result.replace(/^[\n\r\s]+/, '');
          }
        }
      }
      
      return result || perguntaText; // Se remover tudo, retornar o original
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
      let processed = text;
      
      // Processa **texto** primeiro (negrito duplo) usando regex não-greedy
      // Substitui por placeholder único que não será confundido com *texto*
      processed = processed.replace(/\*\*([^*]+?)\*\*/g, (match, content) => {
        return `__BOLD_DOUBLE__${content}__BOLD_DOUBLE_END__`;
      });
      
      // Depois processa *texto* (negrito simples), mas apenas se não estiver dentro de um placeholder
      // Usa uma função de substituição que verifica se não está dentro de um placeholder
      processed = processed.replace(/\*([^*\n]+?)\*/g, (match, content, offset) => {
        // Verificar se não está dentro de um placeholder de negrito duplo
        const beforeMatch = processed.substring(0, offset);
        const afterMatch = processed.substring(offset + match.length);
        
        // Contar quantos placeholders de negrito duplo foram abertos antes deste ponto
        const doubleBoldOpens = (beforeMatch.match(/__BOLD_DOUBLE__/g) || []).length;
        const doubleBoldCloses = (beforeMatch.match(/__BOLD_DOUBLE_END__/g) || []).length;
        
        // Se há placeholders abertos sem fechar, estamos dentro de um negrito duplo
        if (doubleBoldOpens > doubleBoldCloses) {
          return match; // Retorna sem alterar
        }
        
        return `__BOLD_SINGLE__${content}__BOLD_SINGLE_END__`;
      });
      
      // Dividir o texto processado em segmentos mantendo a ordem e preservando espaços
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
          // Preservar o texto original incluindo espaços
          segments.push({ text: removeEmojis(part), bold: false });
        }
      });
      
      return segments.length > 0 ? segments : [{ text: removeEmojis(text), bold: false }];
    };
    
    // Renderiza texto com estilos em uma linha
    const renderStyledText = (segments: TextSegment[], x: number, yPos: number, maxLineWidth: number, fontSize: number): number => {
      let currentY = yPos;
      const lineHeight = fontSize * 0.4;
      const spaceWidth = pdf.getTextWidth(' ');
      
      // Combinar todos os segmentos em uma lista contínua de palavras com seus estilos
      // Processar cada segmento mantendo o contexto de quebra de linha
      const allWords: Array<{text: string, bold: boolean}> = [];
      
      segments.forEach(segment => {
        // Dividir por quebras de linha reais primeiro
        const segmentLines = segment.text.split('\n');
        
        segmentLines.forEach((line, lineIndex) => {
          if (lineIndex > 0) {
            // Adicionar marcador de quebra de linha explícita
            allWords.push({ text: '\n', bold: false });
          }
          
          if (!line || line.trim().length === 0) {
            return;
          }
          
          // Dividir a linha em tokens (palavras e espaços) preservando tudo
          const tokens = line.match(/\S+|\s+/g) || [];
          tokens.forEach(token => {
            if (token) {
              allWords.push({ text: token, bold: segment.bold });
            }
          });
        });
      });
      
      // Renderizar todas as palavras de forma contínua
      let lineWords: Array<{text: string, bold: boolean}> = [];
      let lineWidth = 0;
      
      allWords.forEach((word) => {
        // Se encontrou uma quebra de linha explícita
        if (word.text === '\n') {
          // Renderizar linha atual antes de quebrar
          if (lineWords.length > 0) {
            if (currentY + lineHeight > pageHeight - margin) {
              pdf.addPage();
              currentY = margin;
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
        
        // Não adicionar espaço extra - os espaços já estão nos tokens
        const newLineWidth = lineWidth + wordWidth;
        
        // Se a palavra não cabe na linha atual, renderiza a linha anterior
        if (newLineWidth > maxLineWidth && lineWords.length > 0) {
          // Remover espaços do final da linha atual antes de renderizar
          while (lineWords.length > 0 && /^\s+$/.test(lineWords[lineWords.length - 1].text)) {
            const lastWord = lineWords.pop()!;
            const removedWidth = pdf.getTextWidth(lastWord.text);
            lineWidth -= removedWidth;
          }
          
          // Recalcular largura total da linha após remover espaços
          lineWidth = 0;
          lineWords.forEach(w => {
            lineWidth += pdf.getTextWidth(w.text);
          });
          
          // Renderiza linha atual (se houver palavras)
          if (lineWords.length > 0) {
            if (currentY + lineHeight > pageHeight - margin) {
              pdf.addPage();
              currentY = margin;
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
          
          // Inicia nova linha com a palavra atual (ignora espaços no início)
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
      
      // Renderiza a última linha se houver palavras
      // Remover espaços do início e fim da última linha
      while (lineWords.length > 0 && /^\s+$/.test(lineWords[0].text)) {
        lineWords.shift();
      }
      while (lineWords.length > 0 && /^\s+$/.test(lineWords[lineWords.length - 1].text)) {
        lineWords.pop();
      }
      
      if (lineWords.length > 0) {
        if (currentY + lineHeight > pageHeight - margin) {
          pdf.addPage();
          currentY = margin;
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
    
    // Título do documento baseado no tipo
    pdf.setFontSize(14); // Reduzido de 18
    pdf.setFont('helvetica', 'bold');
    const typeTitles: { [key: string]: string } = {
      'vf': 'Questões Verdadeiro/Falso',
      'multipla': 'Questões Múltipla Escolha',
      'correlacao': 'Questões de Correlação'
    };
    const title = removeEmojis(typeTitles[questionType] || 'Questões');
    pdf.text(title, margin, y);
    y += 6; // Reduzido de 10
    
    // Informações da prova
    pdf.setFontSize(8); // Reduzido de 10
    pdf.setFont('helvetica', 'normal');
    const totalQuestions = questions.length;
    
    // Calcular estatísticas baseadas nas questões respondidas no simulado atual
    const answeredQuestions = questions.filter((q: SimuladoQuestion) => 
      q.uniqueKey && this.currentTab.questionResults[q.uniqueKey]?.answered
    ).length;
    const correctAnswers = questions.filter((q: SimuladoQuestion) => 
      q.uniqueKey && this.currentTab.questionResults[q.uniqueKey]?.answered && 
      this.currentTab.questionResults[q.uniqueKey]?.isCorrect
    ).length;
    const scorePercentage = answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0;
    
    let infoText = `Total de questões: ${totalQuestions}`;
    
    if (answeredQuestions > 0) {
      infoText += ` | Respondidas: ${answeredQuestions} | Acertos: ${correctAnswers} | Performance: ${scorePercentage.toFixed(1)}%`;
    }
    pdf.text(infoText, margin, y);
    y += 3; // Reduzido de 8
    
    // Linha separadora
    y += 0.2; // Reduzido de 2
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.3); // Reduzido de 0.5
    pdf.line(margin, y, pageWidth - margin, y);
    y += 5; // Reduzido de 8
    
    // ========== PARTE 1: QUESTÕES ==========
    pdf.setFontSize(12); // Reduzido de 16
    pdf.setFont('helvetica', 'bold');
    pdf.text('QUESTÕES', margin, y);
    y += 6; // Reduzido de 10
    
    // Agrupar questões por bibliografia + assunto
    const groupedQuestions: { [key: string]: SimuladoQuestion[] } = {};
    questions.forEach((question) => {
      const bibliografia = question.bibliografia_titulo || 'Sem bibliografia';
      const assunto = question.assunto || 'Sem assunto';
      const key = `${bibliografia}|${assunto}`;
      
      if (!groupedQuestions[key]) {
        groupedQuestions[key] = [];
      }
      groupedQuestions[key].push(question);
    });
    
    // Contador global de questões
    let globalQuestionNumber = 0;
    
    // Iterar sobre os grupos
    Object.keys(groupedQuestions).forEach((groupKey) => {
      const groupQuestions = groupedQuestions[groupKey];
      const [bibliografia, assunto] = groupKey.split('|');
      
      // Verifica se precisa de nova página antes de adicionar o cabeçalho do grupo
      if (y + 15 > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      
      // Cabeçalho do grupo: Bibliografia + Assunto
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      const headerText = `${removeEmojis(bibliografia)}${assunto !== 'Sem assunto' ? ' - ' + removeEmojis(assunto) : ''}`;
      const headerLines = pdf.splitTextToSize(headerText, maxWidth);
      
      headerLines.forEach((line: string) => {
        if (y + 4 > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, margin, y);
        y += 4;
      });
      
      y += 2; // Espaço após o cabeçalho do grupo
      
      // Iterar sobre as questões do grupo
      groupQuestions.forEach((question, questionIndex) => {
        globalQuestionNumber++;
        
        // Verifica se precisa de nova página
        if (y + 20 > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        
        // Número da questão no canto esquerdo
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        const questionNumberText = `${globalQuestionNumber})`;
        const numberWidth = pdf.getTextWidth(questionNumberText);
        pdf.text(questionNumberText, margin, y);
        
        // Opções/Alternativas baseado no tipo
        const contentStartX = margin + numberWidth + 2; // Espaço após o número
        const contentMaxWidth = maxWidth - (contentStartX - margin);
        
        pdf.setFontSize(8);
        
        if (question.tipo === 'vf') {
          const vfData = question.data as PerguntaVF;
          
          // Criar array com ambas as afirmações
          const afirmacoes = [
            { texto: vfData.afirmacao_verdadeira || '', isVerdadeira: true },
            { texto: vfData.afirmacao_falsa || '', isVerdadeira: false }
          ];
          
          // Usar o ID da questão como seed para randomização determinística
          const seed = question.id;
          const shouldSwap = seed % 2 === 0;
          if (shouldSwap) {
            [afirmacoes[0], afirmacoes[1]] = [afirmacoes[1], afirmacoes[0]];
          }
          
          // Armazenar a ordem para o gabarito
          const vfDataWithOrder = vfData as any;
          vfDataWithOrder._afirmacoesOrder = afirmacoes.map(a => a.isVerdadeira);
          
          // Mostrar cada afirmação com um quadrado ao lado
          // Ambos os quadrados devem estar alinhados na mesma posição (contentStartX)
          afirmacoes.forEach((afirmacao, idx) => {
            if (!afirmacao.texto) return;
            
            // Desenhar quadrado ao lado da afirmação
            // Ambos os quadrados começam na mesma posição (após o número)
            const squareSize = 3;
            const squareX = contentStartX; // Sempre alinhado após o número
            const squareY = y - 1;
            
            pdf.setDrawColor(0, 0, 0);
            pdf.setLineWidth(0.2);
            pdf.rect(squareX, squareY, squareSize, squareSize);
            
            // Renderizar a afirmação ao lado do quadrado
            const textStartX = squareX + squareSize + 2;
            // Calcular largura máxima disponível para o texto
            const textMaxWidth = maxWidth - (textStartX - margin);
            
            const afirmacaoSegments = extractTextWithStyles(afirmacao.texto);
            
            if (afirmacaoSegments.length > 0) {
              y = renderStyledText(afirmacaoSegments, textStartX, y, textMaxWidth, 8);
            } else {
              pdf.setFont('helvetica', 'normal');
              const afirmacaoText = removeEmojis(afirmacao.texto);
              const afirmacaoLines = pdf.splitTextToSize(afirmacaoText, textMaxWidth);
              afirmacaoLines.forEach((line: string) => {
                if (y + 4 > pageHeight - margin) {
                  pdf.addPage();
                  y = margin;
                }
                pdf.text(line, textStartX, y);
                y += 2;
              });
            }
            
            // Adicionar linha divisória após a segunda afirmação
            if (idx === 1) {
              // Linha logo após a segunda afirmação
              y += 1; // Pequeno espaço antes da linha
              pdf.setDrawColor(200, 200, 200);
              pdf.setLineWidth(0.15);
              pdf.line(margin, y, pageWidth - margin, y);
              y += 2; // Espaço após a linha
            } else {
              y += 3; // Espaço entre afirmações (apenas para a primeira)
            }
          });
        } else if (question.tipo === 'multipla') {
          const multiplaData = question.data as PerguntaMultipla;
          
          // Exibir a pergunta primeiro
          const perguntaText = removeAssuntoFromPergunta(question.pergunta || multiplaData.pergunta, question.assunto);
          const perguntaSegments = extractTextWithStyles(perguntaText);
          
          if (perguntaSegments.length > 0) {
            pdf.setFont('helvetica', 'normal');
            y = renderStyledText(perguntaSegments, contentStartX, y, contentMaxWidth, 8);
            y += 3; // Espaço após a pergunta
          } else {
            pdf.setFont('helvetica', 'normal');
            const perguntaClean = removeEmojis(perguntaText);
            const perguntaLines = pdf.splitTextToSize(perguntaClean, contentMaxWidth);
            perguntaLines.forEach((line: string) => {
              if (y + 4 > pageHeight - margin) {
                pdf.addPage();
                y = margin;
              }
              pdf.text(line, contentStartX, y);
              y += 4;
            });
            y += 3; // Espaço após a pergunta
          }
          
          const alternativas = [
            { key: 'a', text: multiplaData.alternativa_a },
            { key: 'b', text: multiplaData.alternativa_b },
            { key: 'c', text: multiplaData.alternativa_c },
            { key: 'd', text: multiplaData.alternativa_d }
          ];
          alternativas.forEach((alt) => {
            const altSegments = extractTextWithStyles(alt.text);
            if (altSegments.length > 0) {
              const firstSegment = altSegments[0];
              firstSegment.text = `${alt.key}) ${firstSegment.text}`;
              y = renderStyledText(altSegments, contentStartX, y, contentMaxWidth, 8);
              y += 1;
            } else {
              pdf.setFont('helvetica', 'normal');
              const altText = removeEmojis(alt.text);
              const altLines = pdf.splitTextToSize(altText, contentMaxWidth);
              altLines.forEach((line: string, lineIndex: number) => {
                if (y + 4 > pageHeight - margin) {
                  pdf.addPage();
                  y = margin;
                }
                const prefix = lineIndex === 0 ? `${alt.key}) ` : '   ';
                pdf.text(prefix + line, contentStartX, y);
                y += 4;
              });
              y += 1;
            }
          });
          // Sem espaço extra após as alternativas
        } else if (question.tipo === 'correlacao') {
          const correlacaoData = question.data as PerguntaCorrelacao;
          
          // Exibir a pergunta primeiro
          const perguntaText = removeAssuntoFromPergunta(question.pergunta || correlacaoData.pergunta, question.assunto);
          const perguntaSegments = extractTextWithStyles(perguntaText);
          
          if (perguntaSegments.length > 0) {
            pdf.setFont('helvetica', 'normal');
            y = renderStyledText(perguntaSegments, contentStartX, y, contentMaxWidth, 8);
            y += 3; // Espaço após a pergunta
          } else {
            pdf.setFont('helvetica', 'normal');
            const perguntaClean = removeEmojis(perguntaText);
            const perguntaLines = pdf.splitTextToSize(perguntaClean, contentMaxWidth);
            perguntaLines.forEach((line: string) => {
              if (y + 4 > pageHeight - margin) {
                pdf.addPage();
                y = margin;
              }
              pdf.text(line, contentStartX, y);
              y += 4;
            });
            y += 3; // Espaço após a pergunta
          }
          
          if (correlacaoData.coluna_a && correlacaoData.coluna_b) {
            pdf.setFont('helvetica', 'normal');
            pdf.text('Coluna A:', contentStartX, y);
            y += 4;
            correlacaoData.coluna_a.forEach((item, idx) => {
              const itemSegments = extractTextWithStyles(item);
              if (itemSegments.length > 0) {
                const firstSegment = itemSegments[0];
                firstSegment.text = `${idx + 1}. ${firstSegment.text}`;
                y = renderStyledText(itemSegments, contentStartX, y, contentMaxWidth, 8);
              } else {
                pdf.setFont('helvetica', 'normal');
                const itemText = removeEmojis(item);
                const itemLines = pdf.splitTextToSize(itemText, contentMaxWidth);
                itemLines.forEach((line: string, lineIndex: number) => {
                  if (y + 4 > pageHeight - margin) {
                    pdf.addPage();
                    y = margin;
                  }
                  const prefix = lineIndex === 0 ? `${idx + 1}. ` : '   ';
                  pdf.text(prefix + line, contentStartX, y);
                  y += 4;
                });
              }
            });
            y += 2;
            pdf.setFont('helvetica', 'normal');
            pdf.text('Coluna B:', contentStartX, y);
            y += 4;
            correlacaoData.coluna_b.forEach((item, idx) => {
              const itemSegments = extractTextWithStyles(item);
              if (itemSegments.length > 0) {
                const firstSegment = itemSegments[0];
                firstSegment.text = `${String.fromCharCode(65 + idx)}. ${firstSegment.text}`;
                y = renderStyledText(itemSegments, contentStartX, y, contentMaxWidth, 8);
              } else {
                pdf.setFont('helvetica', 'normal');
                const itemText = removeEmojis(item);
                const itemLines = pdf.splitTextToSize(itemText, contentMaxWidth);
                itemLines.forEach((line: string, lineIndex: number) => {
                  if (y + 4 > pageHeight - margin) {
                    pdf.addPage();
                    y = margin;
                  }
                  const prefix = lineIndex === 0 ? `${String.fromCharCode(65 + idx)}. ` : '   ';
                  pdf.text(prefix + line, contentStartX, y);
                  y += 4;
                });
              }
            });
            y += 2;
            pdf.text('Associe os itens da Coluna A com os da Coluna B:', contentStartX, y);
            // Adicionar espaço após questões de correlação
            y += 2; // Espaço após a questão de correlação
          }
        }
        
        // Espaço entre questões (sem linha divisória)
        if (questionIndex < groupQuestions.length - 1) {
          y += 2; // Pequeno espaço entre questões
        } else {
          // Se é a última questão do grupo, adicionar espaço extra antes do próximo grupo
          // Isso evita que o título do próximo grupo fique em cima do final da questão anterior
          if (question.tipo === 'correlacao') {
            y += 4; // Espaço extra após última questão de correlação do grupo
          } else {
            y += 2; // Espaço extra após última questão de outros tipos
          }
        }
      });
      
      // Espaço entre grupos (aumentado para evitar sobreposição)
      // Verificar se precisa de nova página antes do próximo grupo
      if (y + 20 > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      } else {
        y += 3; // Espaço entre grupos
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
    
    // Agrupar questões por bibliografia + assunto (mesmo agrupamento das questões)
    const groupedQuestionsGabarito: { [key: string]: SimuladoQuestion[] } = {};
    questions.forEach((question) => {
      const bibliografia = question.bibliografia_titulo || 'Sem bibliografia';
      const assunto = question.assunto || 'Sem assunto';
      const key = `${bibliografia}|${assunto}`;
      
      if (!groupedQuestionsGabarito[key]) {
        groupedQuestionsGabarito[key] = [];
      }
      groupedQuestionsGabarito[key].push(question);
    });
    
    // Contador global de questões para o gabarito
    let globalQuestionNumberGabarito = 0;
    
    // Iterar sobre os grupos
    Object.keys(groupedQuestionsGabarito).forEach((groupKey) => {
      const groupQuestions = groupedQuestionsGabarito[groupKey];
      const [bibliografia, assunto] = groupKey.split('|');
      
      // Verifica se precisa de nova página antes de adicionar o cabeçalho do grupo
      if (y + 15 > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      
      // Cabeçalho do grupo: Bibliografia + Assunto
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      const headerText = `${removeEmojis(bibliografia)}${assunto !== 'Sem assunto' ? ' - ' + removeEmojis(assunto) : ''}`;
      const headerLines = pdf.splitTextToSize(headerText, maxWidth);
      
      headerLines.forEach((line: string) => {
        if (y + 4 > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, margin, y);
        y += 4;
      });
      
      y += 2; // Espaço após o cabeçalho do grupo
      
      // Iterar sobre as questões do grupo
      groupQuestions.forEach((question) => {
        globalQuestionNumberGabarito++;
        
        // Verifica se precisa de nova página
        if (y + 15 > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        
        // Número da questão no canto esquerdo
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        const questionNumberText = `${globalQuestionNumberGabarito}:`;
        const numberWidth = pdf.getTextWidth(questionNumberText);
        pdf.text(questionNumberText, margin, y);
        
        // Resposta correta baseado no tipo
        const contentStartX = margin + numberWidth + 2;
        const contentMaxWidth = maxWidth - (contentStartX - margin);
        
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        
        if (question.tipo === 'vf') {
          const vfData = question.data as PerguntaVF;
          
          // Recriar a mesma ordem aleatória das afirmações usando o ID da questão
          const afirmacoesGabarito = [
            { texto: vfData.afirmacao_verdadeira || '', isVerdadeira: true },
            { texto: vfData.afirmacao_falsa || '', isVerdadeira: false }
          ];
          
          const seed = question.id;
          const shouldSwap = seed % 2 === 0;
          const afirmacoesOrdenadas = shouldSwap 
            ? [afirmacoesGabarito[1], afirmacoesGabarito[0]]
            : [afirmacoesGabarito[0], afirmacoesGabarito[1]];
          
          // Formato: "Primeira Afirmação [V/F] Segunda Afirmação [V/F]"
          const primeiraLabel = afirmacoesOrdenadas[0].isVerdadeira ? 'V' : 'F';
          const segundaLabel = afirmacoesOrdenadas[1].isVerdadeira ? 'V' : 'F';
          
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(8);
          const respostaText = `Primeira Afirmação [${primeiraLabel}] Segunda Afirmação [${segundaLabel}]`;
          pdf.text(respostaText, contentStartX, y);
          y += 4;
          
          // Justificativa se houver
          if (vfData.justificativa_resposta_certa) {
            pdf.setFont('helvetica', 'italic');
            pdf.text('Justificativa:', contentStartX, y);
            y += 4;
            const justificativaSegments = extractTextWithStyles(vfData.justificativa_resposta_certa);
            if (justificativaSegments.length > 0) {
              y = renderStyledText(justificativaSegments, contentStartX, y, contentMaxWidth, 8);
            } else {
              pdf.setFont('helvetica', 'normal');
              const justificativaText = removeEmojis(vfData.justificativa_resposta_certa);
              const justificativaLines = pdf.splitTextToSize(justificativaText, contentMaxWidth);
              justificativaLines.forEach((line: string) => {
                if (y + 4 > pageHeight - margin) {
                  pdf.addPage();
                  y = margin;
                }
                pdf.text(line, contentStartX, y);
                y += 4;
              });
            }
          }
        } else if (question.tipo === 'multipla') {
          const multiplaData = question.data as PerguntaMultipla;
          
          // Apenas a letra da resposta correta (sem pergunta e sem alternativa completa)
          pdf.text(`Resposta correta: ${multiplaData.resposta_correta.toUpperCase()}`, contentStartX, y);
          y += 4;
          
          if (multiplaData.justificativa_resposta_certa) {
            pdf.setFont('helvetica', 'italic');
            pdf.text('Justificativa:', contentStartX, y);
            y += 4;
            const justificativaSegments = extractTextWithStyles(multiplaData.justificativa_resposta_certa);
            if (justificativaSegments.length > 0) {
              y = renderStyledText(justificativaSegments, contentStartX, y, contentMaxWidth, 8);
            } else {
              pdf.setFont('helvetica', 'normal');
              const justificativaText = removeEmojis(multiplaData.justificativa_resposta_certa);
              const justificativaLines = pdf.splitTextToSize(justificativaText, contentMaxWidth);
              justificativaLines.forEach((line: string) => {
                if (y + 4 > pageHeight - margin) {
                  pdf.addPage();
                  y = margin;
                }
                pdf.text(line, contentStartX, y);
                y += 4;
              });
            }
          }
        } else if (question.tipo === 'correlacao') {
          const correlacaoData = question.data as PerguntaCorrelacao;
          
          // Exibir a pergunta primeiro
          const perguntaText = removeAssuntoFromPergunta(question.pergunta || correlacaoData.pergunta, question.assunto);
          const perguntaSegments = extractTextWithStyles(perguntaText);
          
          if (perguntaSegments.length > 0) {
            pdf.setFont('helvetica', 'normal');
            y = renderStyledText(perguntaSegments, contentStartX, y, contentMaxWidth, 8);
            y += 3; // Espaço após a pergunta
          } else {
            pdf.setFont('helvetica', 'normal');
            const perguntaClean = removeEmojis(perguntaText);
            const perguntaLines = pdf.splitTextToSize(perguntaClean, contentMaxWidth);
            perguntaLines.forEach((line: string) => {
              if (y + 4 > pageHeight - margin) {
                pdf.addPage();
                y = margin;
              }
              pdf.text(line, contentStartX, y);
              y += 4;
            });
            y += 3; // Espaço após a pergunta
          }
          
          pdf.text('Resposta correta:', contentStartX, y);
          y += 4;
          
          if (correlacaoData.resposta_correta && correlacaoData.coluna_a && correlacaoData.coluna_b) {
            Object.keys(correlacaoData.resposta_correta).sort().forEach((key) => {
              const itemIndex = parseInt(key);
              const letterIndex = parseInt(correlacaoData.resposta_correta[key]);
              const itemA = correlacaoData.coluna_a[itemIndex];
              const itemB = correlacaoData.coluna_b[letterIndex];
              
              const itemASegments = extractTextWithStyles(itemA);
              const itemBSegments = extractTextWithStyles(itemB);
              
              const prefix = `${itemIndex + 1} - ${String.fromCharCode(65 + letterIndex)}: `;
              const respostaSegments: TextSegment[] = [
                { text: prefix, bold: false },
                ...itemASegments,
                { text: ' → ', bold: false },
                ...itemBSegments
              ];
              
              y = renderStyledText(respostaSegments, contentStartX, y, contentMaxWidth, 8);
            });
          }
          
          if (correlacaoData.justificativa_resposta_certa) {
            y += 1;
            pdf.setFont('helvetica', 'italic');
            pdf.text('Justificativa:', contentStartX, y);
            y += 4;
            const justificativaSegments = extractTextWithStyles(correlacaoData.justificativa_resposta_certa);
            if (justificativaSegments.length > 0) {
              y = renderStyledText(justificativaSegments, contentStartX, y, contentMaxWidth, 8);
            } else {
              pdf.setFont('helvetica', 'normal');
              const justificativaText = removeEmojis(correlacaoData.justificativa_resposta_certa);
              const justificativaLines = pdf.splitTextToSize(justificativaText, contentMaxWidth);
              justificativaLines.forEach((line: string) => {
                if (y + 4 > pageHeight - margin) {
                  pdf.addPage();
                  y = margin;
                }
                pdf.text(line, contentStartX, y);
                y += 4;
              });
            }
          }
        }
        
        // Espaço entre respostas
        y += 3;
      });
      
      // Espaço entre grupos
      y += 3;
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
    
    // Gera o nome do arquivo baseado no tipo
    const typeFileNames: { [key: string]: string } = {
      'vf': 'questoes-verdadeiro-falso',
      'multipla': 'questoes-multipla-escolha',
      'correlacao': 'questoes-correlacao'
    };
    const baseFileName = removeAccents(typeFileNames[questionType] || 'questoes');
    const fileName = `${baseFileName}-${new Date().toISOString().split('T')[0]}.pdf`;
    
    // Faz o download
    pdf.save(fileName);
    
    console.log(`✅ PDF pesquisável gerado com sucesso para ${questionType}:`, fileName);
  }
}


