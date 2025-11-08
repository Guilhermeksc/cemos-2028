import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  PaginatedResponse
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
}

type TabType = 'completo' | 'vf' | 'multipla' | 'correlacao';

@Component({
  selector: 'app-perguntas',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    PerguntaVFComponent, 
    PerguntaMultiplaComponent, 
    PerguntaCorrelacaoComponent
  ],
  templateUrl: './perguntas.html',
  styleUrl: './perguntas.scss'
})
export class Perguntas implements OnInit, OnDestroy, OnChanges {
  @Input() bibliografiaIds: number[] = [];
  @Output() simuladoStarted = new EventEmitter<void>();

  private perguntasService = inject(PerguntasService);
  private cdr = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();

  // Estados do componente - simplificado
  bibliografias: Bibliografia[] = [];
  selectedBibliografias: number[] = [];
  isLoading = false;

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

  ngOnInit() {
    console.log('🚀 Componente Perguntas inicializado - Modo com Tabs');
    
    this.loadBibliografias();
    
    if (this.bibliografiaIds.length > 0) {
      this.updateBibliografiasConfig();
      
      console.log('📋 Auto-carregando prova...');
      // Aguardar um pouco para garantir que as bibliografias foram carregadas
      setTimeout(() => {
        this.gerarNovaProva();
      }, 1000);
    }
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
        
        // Se já havia questões carregadas, limpar e permitir que o usuário gere nova prova
        if (this.currentTab.questionsLoaded) {
          console.log('🔄 Limpando questões anteriores devido à mudança de bibliografia');
          this.currentTab.questionsLoaded = false;
          this.currentTab.simuladoQuestions = [];
          this.currentTab.questionResults = {};
          this.cdr.detectChanges();
        }
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
    if (this.bibliografiaIds.length > 0) {
      this.selectedBibliografias = [...this.bibliografiaIds];
      
      // Configurar bibliografias para todas as tabs
      Object.keys(this.tabs).forEach(tabKey => {
        this.tabs[tabKey as TabType].simuladoConfig.bibliografias = [...this.bibliografiaIds];
      });
      
      console.log('✅ Bibliografias configuradas para todas as tabs:', this.bibliografiaIds);
    }
  }

  setActiveTab(tab: TabType) {
    this.activeTab = tab;
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

    this.loadRandomQuestions(this.activeTab)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (questions) => {
          console.log(`✅ Nova prova carregada para aba ${this.activeTab}:`, questions.length, 'questões');
          
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
          this.cdr.detectChanges();
        }
      });
  }

  private loadBibliografias() {
    this.isLoading = true;
    console.log('📚 Carregando bibliografias disponíveis...');
    
    this.perguntasService.getBibliografias({ page_size: 100 })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.bibliografias = response.results;
          this.isLoading = false;
          
          console.log('📖 Bibliografias carregadas:', {
            total: response.results.length,
            bibliografias: response.results.map(b => ({
              id: b.id,
              titulo: b.titulo,
              autor: b.autor,
              materia: b.materia,
              perguntas_count: b.perguntas_count
            }))
          });

          // Verificar se as bibliografias solicitadas existem
          if (this.bibliografiaIds.length > 0) {
            const bibliografiasEncontradas = response.results.filter(b => 
              this.bibliografiaIds.includes(b.id)
            );
            
            console.log('🔍 Verificação das bibliografias solicitadas:', {
              ids_solicitados: this.bibliografiaIds,
              bibliografias_encontradas: bibliografiasEncontradas.map(b => ({
                id: b.id,
                titulo: b.titulo,
                perguntas_disponiveis: b.perguntas_count
              })),
              ids_nao_encontrados: this.bibliografiaIds.filter(id => 
                !response.results.some(b => b.id === id)
              )
            });

            if (bibliografiasEncontradas.length !== this.bibliografiaIds.length) {
              console.warn('⚠️ ATENÇÃO: Algumas bibliografias solicitadas não foram encontradas!');
            }
          }
        },
        error: (error) => {
          console.error('❌ Erro ao carregar bibliografias:', error);
          this.isLoading = false;
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
    console.log(`📚 Buscando questões para aba ${tabType} e bibliografias:`, config.bibliografias);
    
    // Se não há bibliografias selecionadas, retornar array vazio
    if (config.bibliografias.length === 0) {
      console.warn('⚠️ Nenhuma bibliografia selecionada');
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }

    // Criar arrays de observables para cada tipo de pergunta e cada bibliografia
    const multiplaObservables: Observable<PaginatedResponse<PerguntaMultipla>>[] = [];
    const vfObservables: Observable<PaginatedResponse<PerguntaVF>>[] = [];
    const correlacaoObservables: Observable<PaginatedResponse<PerguntaCorrelacao>>[] = [];

    // Criar uma chamada para cada bibliografia
    config.bibliografias.forEach(bibliografiaId => {
      const baseFilters = { page_size: 100, bibliografia: bibliografiaId };
      
      if (config.questoesMultipla > 0) {
        multiplaObservables.push(
          this.perguntasService.getPerguntasMultipla(baseFilters as PerguntaMultiplaFilters)
        );
      }
      
      if (config.questoesVF > 0) {
        vfObservables.push(
          this.perguntasService.getPerguntasVF(baseFilters as PerguntaVFFilters)
        );
      }
      
      if (config.questoesCorrelacao > 0) {
        correlacaoObservables.push(
          this.perguntasService.getPerguntasCorrelacao(baseFilters as PerguntaFilters)
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
        const todasMultiplas: PerguntaMultipla[] = results.multiplas 
          ? results.multiplas.flatMap((response: PaginatedResponse<PerguntaMultipla>) => response.results)
          : [];
        const todasVFs: PerguntaVF[] = results.vfs 
          ? results.vfs.flatMap((response: PaginatedResponse<PerguntaVF>) => response.results)
          : [];
        const todasCorrelacoes: PerguntaCorrelacao[] = results.correlacoes 
          ? results.correlacoes.flatMap((response: PaginatedResponse<PerguntaCorrelacao>) => response.results)
          : [];

        console.log('📊 Dados brutos recebidos do backend (combinados de todas bibliografias):', {
          multiplas: {
            total_bibliografias: results.multiplas ? results.multiplas.length : 0,
            count_total: todasMultiplas.length,
            bibliografias_encontradas: [...new Set(todasMultiplas.map(q => q.bibliografia))],
            primeiras_questoes: todasMultiplas.slice(0, 3).map(q => ({
              id: q.id,
              bibliografia: q.bibliografia,
              bibliografia_titulo: q.bibliografia_titulo,
              pergunta_preview: q.pergunta.substring(0, 50) + '...'
            }))
          },
          vfs: {
            total_bibliografias: results.vfs ? results.vfs.length : 0,
            count_total: todasVFs.length,
            bibliografias_encontradas: [...new Set(todasVFs.map(q => q.bibliografia))],
            primeiras_questoes: todasVFs.slice(0, 3).map(q => ({
              id: q.id,
              bibliografia: q.bibliografia,
              bibliografia_titulo: q.bibliografia_titulo,
              pergunta_preview: q.pergunta.substring(0, 50) + '...'
            }))
          },
          correlacoes: {
            total_bibliografias: results.correlacoes ? results.correlacoes.length : 0,
            count_total: todasCorrelacoes.length,
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

        // Se não há questões suficientes, dar um aviso mas continuar com as disponíveis
        if (questoesInsuficientes.length > 0) {
          console.warn('🚨 SIMULADO COM QUESTÕES REDUZIDAS:', {
            problema: 'Não há questões suficientes para a configuração solicitada',
            aba: tabType,
            bibliografias_consultadas: config.bibliografias,
            questoes_insuficientes: questoesInsuficientes,
            acoes_recomendadas: [
              'Verificar se a bibliografia ID existe no backend',
              'Verificar se há questões cadastradas para esta bibliografia',
              'Considerar reduzir o número de questões solicitadas'
            ]
          });
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
}


