import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, inject } from '@angular/core';
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
  PerguntaFilters 
} from '../../interfaces/perguntas.interface';
import { Subject, forkJoin, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

interface SimuladoQuestion {
  id: number;
  tipo: 'multipla' | 'vf' | 'correlacao';
  pergunta: string;
  bibliografia_titulo?: string;
  paginas?: string;
  data: PerguntaMultipla | PerguntaVF | PerguntaCorrelacao;
  userAnswer?: any;
  isCorrect?: boolean;
}

interface SimuladoConfig {
  bibliografias: number[];
  questoesVF: number;
  questoesMultipla: number;
  questoesCorrelacao: number;
}

interface SimuladoResult {
  totalQuestoes: number;
  acertos: number;
  erros: number;
  percentual: number;
  questoes: SimuladoQuestion[];
}

@Component({
  selector: 'app-perguntas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perguntas.html',
  styleUrl: './perguntas.scss'
})
export class Perguntas implements OnInit, OnDestroy {
  @Input() bibliografiaIds: number[] = [];
  @Input() showBibliografiaSelector: boolean = true;
  @Input() autoStartSimulado: boolean = false;
  @Output() simuladoFinished = new EventEmitter<SimuladoResult>();
  @Output() simuladoStarted = new EventEmitter<void>();

  private perguntasService = inject(PerguntasService);
  private destroy$ = new Subject<void>();

  // Estados do componente
  bibliografias: Bibliografia[] = [];
  selectedBibliografias: number[] = [];
  isLoading = false;
  isLoadingQuestions = false;
  isSimuladoActive = false;
  isSimuladoComplete = false;
  currentQuestionIndex = 0;

  // Configuração do simulado
  simuladoConfig: SimuladoConfig = {
    bibliografias: [],
    questoesVF: 5,
    questoesMultipla: 4,
    questoesCorrelacao: 1
  };

  // Questões do simulado
  simuladoQuestions: SimuladoQuestion[] = [];
  currentQuestion: SimuladoQuestion | null = null;

  // Resultados
  simuladoResult: SimuladoResult | null = null;

  ngOnInit() {
    this.loadBibliografias();
    
    if (this.bibliografiaIds.length > 0) {
      this.selectedBibliografias = [...this.bibliografiaIds];
      this.simuladoConfig.bibliografias = [...this.bibliografiaIds];
      
      if (this.autoStartSimulado) {
        this.startSimulado();
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

  onBibliografiaChange(bibliografiaId: number, isSelected: boolean) {
    if (isSelected) {
      if (!this.selectedBibliografias.includes(bibliografiaId)) {
        this.selectedBibliografias.push(bibliografiaId);
      }
    } else {
      this.selectedBibliografias = this.selectedBibliografias.filter(id => id !== bibliografiaId);
    }
    this.simuladoConfig.bibliografias = [...this.selectedBibliografias];
  }

  isBibliografiaSelected(bibliografiaId: number): boolean {
    return this.selectedBibliografias.includes(bibliografiaId);
  }

  canStartSimulado(): boolean {
    return this.simuladoConfig.bibliografias.length > 0 && !this.isLoadingQuestions;
  }

  startSimulado() {
    if (!this.canStartSimulado()) return;

    console.log('🎯 Iniciando simulado com configuração:', {
      bibliografias: this.simuladoConfig.bibliografias,
      questoesVF: this.simuladoConfig.questoesVF,
      questoesMultipla: this.simuladoConfig.questoesMultipla,
      questoesCorrelacao: this.simuladoConfig.questoesCorrelacao,
      totalQuestoes: this.simuladoConfig.questoesVF + this.simuladoConfig.questoesMultipla + this.simuladoConfig.questoesCorrelacao
    });

    this.isLoadingQuestions = true;
    this.isSimuladoActive = true;
    this.isSimuladoComplete = false;
    this.currentQuestionIndex = 0;
    this.simuladoResult = null;

    this.loadRandomQuestions()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (questions) => {
          console.log('✅ Questões carregadas com sucesso:', {
            totalQuestoes: questions.length,
            questoesPorTipo: {
              vf: questions.filter(q => q.tipo === 'vf').length,
              multipla: questions.filter(q => q.tipo === 'multipla').length,
              correlacao: questions.filter(q => q.tipo === 'correlacao').length
            },
            questoes: questions.map(q => ({
              id: q.id,
              tipo: q.tipo,
              bibliografia_titulo: q.bibliografia_titulo
            }))
          });

          this.simuladoQuestions = this.shuffleArray(questions);
          this.currentQuestion = this.simuladoQuestions[0] || null;
          this.isLoadingQuestions = false;
          this.simuladoStarted.emit();
        },
        error: (error) => {
          console.error('❌ Erro ao carregar questões:', error);
          this.isLoadingQuestions = false;
          this.isSimuladoActive = false;
        }
      });
  }

  private loadRandomQuestions(): Observable<SimuladoQuestion[]> {
    const filters = {
      bibliografia__in: this.simuladoConfig.bibliografias.join(','),
      page_size: 100
    };

    console.log('📚 Buscando questões com filtros:', filters);

    const multiplaFilters: PerguntaMultiplaFilters = { 
      ...filters, 
      bibliografia: undefined 
    };
    const vfFilters: PerguntaVFFilters = { 
      ...filters, 
      bibliografia: undefined 
    };
    const correlacaoFilters: PerguntaFilters = { 
      ...filters, 
      bibliografia: undefined 
    };

    return forkJoin({
      multiplas: this.perguntasService.getPerguntasMultipla(multiplaFilters),
      vfs: this.perguntasService.getPerguntasVF(vfFilters),
      correlacoes: this.perguntasService.getPerguntasCorrelacao(correlacaoFilters)
    }).pipe(
      map(({ multiplas, vfs, correlacoes }) => {
        console.log('📊 Dados brutos recebidos do backend:', {
          multiplas: {
            count: multiplas.count,
            total_results: multiplas.results.length,
            bibliografias_encontradas: [...new Set(multiplas.results.map(q => q.bibliografia))],
            primeiras_questoes: multiplas.results.slice(0, 3).map(q => ({
              id: q.id,
              bibliografia: q.bibliografia,
              bibliografia_titulo: q.bibliografia_titulo,
              pergunta_preview: q.pergunta.substring(0, 50) + '...'
            }))
          },
          vfs: {
            count: vfs.count,
            total_results: vfs.results.length,
            bibliografias_encontradas: [...new Set(vfs.results.map(q => q.bibliografia))],
            primeiras_questoes: vfs.results.slice(0, 3).map(q => ({
              id: q.id,
              bibliografia: q.bibliografia,
              bibliografia_titulo: q.bibliografia_titulo,
              pergunta_preview: q.pergunta.substring(0, 50) + '...'
            }))
          },
          correlacoes: {
            count: correlacoes.count,
            total_results: correlacoes.results.length,
            bibliografias_encontradas: [...new Set(correlacoes.results.map(q => q.bibliografia))],
            primeiras_questoes: correlacoes.results.slice(0, 3).map(q => ({
              id: q.id,
              bibliografia: q.bibliografia,
              bibliografia_titulo: q.bibliografia_titulo,
              pergunta_preview: q.pergunta.substring(0, 50) + '...'
            }))
          }
        });

        const questions: SimuladoQuestion[] = [];

        // Filtrar questões por bibliografia
        const multiplasFiltradas = multiplas.results.filter(q => 
          this.simuladoConfig.bibliografias.includes(q.bibliografia)
        );
        const vfsFiltradas = vfs.results.filter(q => 
          this.simuladoConfig.bibliografias.includes(q.bibliografia)
        );
        const correlacoesFiltradas = correlacoes.results.filter(q => 
          this.simuladoConfig.bibliografias.includes(q.bibliografia)
        );

        console.log('🔍 Questões filtradas por bibliografia:', {
          bibliografias_solicitadas: this.simuladoConfig.bibliografias,
          questoes_encontradas: {
            multiplas: {
              total_antes_filtro: multiplas.results.length,
              total_apos_filtro: multiplasFiltradas.length,
              questoes_disponiveis: multiplasFiltradas.map(q => ({
                id: q.id,
                bibliografia: q.bibliografia,
                pergunta_preview: q.pergunta.substring(0, 30) + '...'
              }))
            },
            vfs: {
              total_antes_filtro: vfs.results.length,
              total_apos_filtro: vfsFiltradas.length,
              questoes_disponiveis: vfsFiltradas.map(q => ({
                id: q.id,
                bibliografia: q.bibliografia,
                pergunta_preview: q.pergunta.substring(0, 30) + '...'
              }))
            },
            correlacoes: {
              total_antes_filtro: correlacoes.results.length,
              total_apos_filtro: correlacoesFiltradas.length,
              questoes_disponiveis: correlacoesFiltradas.map(q => ({
                id: q.id,
                bibliografia: q.bibliografia,
                pergunta_preview: q.pergunta.substring(0, 30) + '...'
              }))
            }
          }
        });

        // Verificar se há questões suficientes
        const verificacao = {
          vf: {
            solicitadas: this.simuladoConfig.questoesVF,
            disponiveis: vfsFiltradas.length,
            suficientes: vfsFiltradas.length >= this.simuladoConfig.questoesVF
          },
          multipla: {
            solicitadas: this.simuladoConfig.questoesMultipla,
            disponiveis: multiplasFiltradas.length,
            suficientes: multiplasFiltradas.length >= this.simuladoConfig.questoesMultipla
          },
          correlacao: {
            solicitadas: this.simuladoConfig.questoesCorrelacao,
            disponiveis: correlacoesFiltradas.length,
            suficientes: correlacoesFiltradas.length >= this.simuladoConfig.questoesCorrelacao
          }
        };

        console.log('⚠️ Verificação de disponibilidade de questões:', verificacao);

        // Alertar sobre questões insuficientes
        Object.entries(verificacao).forEach(([tipo, info]) => {
          if (!info.suficientes) {
            console.warn(`⚠️ ATENÇÃO: Questões ${tipo} insuficientes!`, {
              tipo,
              solicitadas: info.solicitadas,
              disponiveis: info.disponiveis,
              diferenca: info.solicitadas - info.disponiveis
            });
          }
        });

        // Selecionar questões aleatórias
        const selectedVFs = this.getRandomItems(vfsFiltradas, this.simuladoConfig.questoesVF);
        const selectedMultiplas = this.getRandomItems(multiplasFiltradas, this.simuladoConfig.questoesMultipla);
        const selectedCorrelacoes = this.getRandomItems(correlacoesFiltradas, this.simuladoConfig.questoesCorrelacao);

        console.log('🎲 Questões selecionadas aleatoriamente:', {
          vf: {
            solicitadas: this.simuladoConfig.questoesVF,
            selecionadas: selectedVFs.length,
            ids: selectedVFs.map(q => q.id)
          },
          multipla: {
            solicitadas: this.simuladoConfig.questoesMultipla,
            selecionadas: selectedMultiplas.length,
            ids: selectedMultiplas.map(q => q.id)
          },
          correlacao: {
            solicitadas: this.simuladoConfig.questoesCorrelacao,
            selecionadas: selectedCorrelacoes.length,
            ids: selectedCorrelacoes.map(q => q.id)
          }
        });

        // Converter para SimuladoQuestion
        selectedVFs.forEach(q => {
          questions.push({
            id: q.id,
            tipo: 'vf',
            pergunta: q.pergunta,
            bibliografia_titulo: q.bibliografia_titulo,
            paginas: q.paginas,
            data: q
          });
        });

        selectedMultiplas.forEach(q => {
          questions.push({
            id: q.id,
            tipo: 'multipla',
            pergunta: q.pergunta,
            bibliografia_titulo: q.bibliografia_titulo,
            paginas: q.paginas,
            data: q
          });
        });

        selectedCorrelacoes.forEach(q => {
          questions.push({
            id: q.id,
            tipo: 'correlacao',
            pergunta: q.pergunta,
            bibliografia_titulo: q.bibliografia_titulo,
            paginas: q.paginas,
            data: q
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
            bibliografia: q.bibliografia_titulo,
            pergunta_preview: q.pergunta.substring(0, 50) + '...'
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

  answerQuestion(answer: any) {
    if (!this.currentQuestion) return;

    this.currentQuestion.userAnswer = answer;
    this.currentQuestion.isCorrect = this.checkAnswer(this.currentQuestion, answer);
  }

  updateCorrelacaoAnswer(itemNumber: number, selectedLetter: string) {
    if (!this.currentQuestion) return;

    if (!this.currentQuestion.userAnswer) {
      this.currentQuestion.userAnswer = {};
    }

    if (selectedLetter) {
      this.currentQuestion.userAnswer[itemNumber.toString()] = selectedLetter;
    } else {
      delete this.currentQuestion.userAnswer[itemNumber.toString()];
    }

    this.currentQuestion.isCorrect = this.checkAnswer(this.currentQuestion, this.currentQuestion.userAnswer);
  }

  private checkAnswer(question: SimuladoQuestion, answer: any): boolean {
    switch (question.tipo) {
      case 'multipla':
        const multipla = question.data as PerguntaMultipla;
        return multipla.resposta_correta === answer;
      
      case 'vf':
        const vf = question.data as PerguntaVF;
        return vf.resposta_correta === answer;
      
      case 'correlacao':
        const correlacao = question.data as PerguntaCorrelacao;
        return JSON.stringify(correlacao.resposta_correta) === JSON.stringify(answer);
      
      default:
        return false;
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.simuladoQuestions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.simuladoQuestions[this.currentQuestionIndex];
    } else {
      this.finishSimulado();
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.simuladoQuestions[this.currentQuestionIndex];
    }
  }

  goToQuestion(index: number) {
    if (index >= 0 && index < this.simuladoQuestions.length) {
      this.currentQuestionIndex = index;
      this.currentQuestion = this.simuladoQuestions[index];
    }
  }

  finishSimulado() {
    const acertos = this.simuladoQuestions.filter(q => q.isCorrect).length;
    const totalQuestoes = this.simuladoQuestions.length;
    const erros = totalQuestoes - acertos;
    const percentual = totalQuestoes > 0 ? (acertos / totalQuestoes) * 100 : 0;

    this.simuladoResult = {
      totalQuestoes,
      acertos,
      erros,
      percentual,
      questoes: this.simuladoQuestions
    };

    this.isSimuladoComplete = true;
    this.simuladoFinished.emit(this.simuladoResult);
  }

  restartSimulado() {
    this.isSimuladoActive = false;
    this.isSimuladoComplete = false;
    this.simuladoQuestions = [];
    this.currentQuestion = null;
    this.currentQuestionIndex = 0;
    this.simuladoResult = null;
  }

  // Getters para o template
  get totalQuestions(): number {
    return this.simuladoQuestions.length;
  }

  get currentQuestionNumber(): number {
    return this.currentQuestionIndex + 1;
  }

  get isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.simuladoQuestions.length - 1;
  }

  get isFirstQuestion(): boolean {
    return this.currentQuestionIndex === 0;
  }

  get hasAnsweredCurrentQuestion(): boolean {
    return this.currentQuestion?.userAnswer !== undefined;
  }

  getQuestionStatus(index: number): 'answered' | 'current' | 'pending' {
    if (index === this.currentQuestionIndex) return 'current';
    if (this.simuladoQuestions[index]?.userAnswer !== undefined) return 'answered';
    return 'pending';
  }

  // Métodos utilitários para o template
  getStringFromCharCode(code: number): string {
    return String.fromCharCode(code);
  }

  getQuestionData<T>(question: SimuladoQuestion): T {
    return question.data as T;
  }

  // Métodos específicos para tipos de pergunta
  getVFData(question: SimuladoQuestion): PerguntaVF {
    return question.data as PerguntaVF;
  }

  getMultiplaData(question: SimuladoQuestion): PerguntaMultipla {
    return question.data as PerguntaMultipla;
  }

  getCorrelacaoData(question: SimuladoQuestion): PerguntaCorrelacao {
    return question.data as PerguntaCorrelacao;
  }

  // Helper para any quando necessário
  getAnyData(question: SimuladoQuestion): any {
    return question.data as any;
  }
}
