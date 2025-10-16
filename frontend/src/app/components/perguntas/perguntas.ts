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
  @Input() autoStartSimulado: boolean = true; // Mudado para true por padrão
  @Output() simuladoFinished = new EventEmitter<SimuladoResult>();
  @Output() simuladoStarted = new EventEmitter<void>();

  private perguntasService = inject(PerguntasService);
  private destroy$ = new Subject<void>();

  // Estados do componente - simplificado
  bibliografias: Bibliografia[] = [];
  selectedBibliografias: number[] = [];
  isLoading = false;
  isLoadingQuestions = false;
  questionsLoaded = false; // Novo estado para controlar se questões foram carregadas

  // Configuração do simulado
  simuladoConfig: SimuladoConfig = {
    bibliografias: [],
    questoesVF: 5,
    questoesMultipla: 4,
    questoesCorrelacao: 1
  };

  // Questões do simulado - agora todas visíveis
  simuladoQuestions: SimuladoQuestion[] = [];

  // Resultados individuais por questão
  questionResults: { [questionId: number]: { answered: boolean, isCorrect: boolean, showResult: boolean } } = {};

  ngOnInit() {
    console.log('🚀 Componente Perguntas inicializado - Modo Simplificado');
    
    this.loadBibliografias();
    
    if (this.bibliografiaIds.length > 0) {
      this.selectedBibliografias = [...this.bibliografiaIds];
      this.simuladoConfig.bibliografias = [...this.bibliografiaIds];
      
      console.log('📋 Auto-carregando prova...');
      // Aguardar um pouco para garantir que as bibliografias foram carregadas
      setTimeout(() => {
        this.gerarNovaProva();
      }, 1000);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  gerarNovaProva() {
    console.log('🔄 Gerando nova prova...');
    
    this.isLoadingQuestions = true;
    this.questionsLoaded = false;
    this.simuladoQuestions = [];
    this.questionResults = {};

    this.loadRandomQuestions()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (questions) => {
          console.log('✅ Nova prova carregada:', questions.length, 'questões');
          
          this.simuladoQuestions = this.shuffleArray(questions);
          this.questionsLoaded = true;
          this.isLoadingQuestions = false;
          
          // Inicializar resultados das questões
          this.simuladoQuestions.forEach(q => {
            this.questionResults[q.id] = {
              answered: false,
              isCorrect: false,
              showResult: false
            };
          });
          
          this.simuladoStarted.emit();
        },
        error: (error) => {
          console.error('❌ Erro ao carregar nova prova:', error);
          this.isLoadingQuestions = false;
          this.questionsLoaded = false;
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

  // Novo método para responder uma questão específica
  answerQuestion(questionId: number, answer: any) {
    const question = this.simuladoQuestions.find(q => q.id === questionId);
    if (!question) return;

    console.log('📝 Respondendo questão:', { questionId, answer });

    question.userAnswer = answer;
    question.isCorrect = this.checkAnswer(question, answer);
    
    // Atualizar resultado da questão
    this.questionResults[questionId] = {
      answered: true,
      isCorrect: question.isCorrect,
      showResult: true
    };

    console.log('✅ Resposta processada:', {
      questionId,
      answer,
      isCorrect: question.isCorrect
    });
  }

  // Método para questões de correlação
  updateCorrelacaoAnswer(questionId: number, itemNumber: number, selectedLetter: string) {
    const question = this.simuladoQuestions.find(q => q.id === questionId);
    if (!question) return;

    if (!question.userAnswer) {
      question.userAnswer = {};
    }

    if (selectedLetter) {
      question.userAnswer[itemNumber.toString()] = selectedLetter;
    } else {
      delete question.userAnswer[itemNumber.toString()];
    }

    // Verificar se todas as correlações foram respondidas
    const correlacaoData = question.data as PerguntaCorrelacao;
    const totalItems = correlacaoData.coluna_a.length;
    const answeredItems = Object.keys(question.userAnswer).length;

    if (answeredItems === totalItems) {
      question.isCorrect = this.checkAnswer(question, question.userAnswer);
      
      this.questionResults[questionId] = {
        answered: true,
        isCorrect: question.isCorrect,
        showResult: true
      };
    }
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

  // Métodos utilitários simplificados
  getQuestionResult(questionId: number) {
    return this.questionResults[questionId] || { answered: false, isCorrect: false, showResult: false };
  }

  isQuestionAnswered(questionId: number): boolean {
    return this.questionResults[questionId]?.answered || false;
  }

  getQuestionAnswerStatus(questionId: number): 'not-answered' | 'correct' | 'incorrect' {
    const result = this.questionResults[questionId];
    if (!result?.answered) return 'not-answered';
    return result.isCorrect ? 'correct' : 'incorrect';
  }

  getTotalAnsweredQuestions(): number {
    return Object.values(this.questionResults).filter(r => r.answered).length;
  }

  getTotalCorrectAnswers(): number {
    return Object.values(this.questionResults).filter(r => r.answered && r.isCorrect).length;
  }

  getScorePercentage(): number {
    const answered = this.getTotalAnsweredQuestions();
    const correct = this.getTotalCorrectAnswers();
    return answered > 0 ? (correct / answered) * 100 : 0;
  }

  private loadRandomQuestions(): Observable<SimuladoQuestion[]> {
    const filters = {
      page_size: 100
    };

    console.log('📚 Buscando questões com filtros:', filters);
    console.log('🎯 Bibliografias selecionadas:', this.simuladoConfig.bibliografias);

    const multiplaFilters: PerguntaMultiplaFilters = { 
      ...filters
    };
    const vfFilters: PerguntaVFFilters = { 
      ...filters
    };
    const correlacaoFilters: PerguntaFilters = { 
      ...filters
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

        // Verificar se há questões insuficientes e emitir warnings específicos
        const questoesInsuficientes: string[] = [];
        Object.entries(verificacao).forEach(([tipo, info]) => {
          if (!info.suficientes) {
            console.warn(`⚠️ ATENÇÃO: Questões ${tipo} insuficientes!`, {
              tipo,
              solicitadas: info.solicitadas,
              disponiveis: info.disponiveis,
              diferenca: info.solicitadas - info.disponiveis,
              bibliografia_ids: this.simuladoConfig.bibliografias
            });
            questoesInsuficientes.push(`${tipo}: ${info.disponiveis}/${info.solicitadas}`);
          }
        });

        // Se não há questões suficientes, dar um aviso mas continuar com as disponíveis
        if (questoesInsuficientes.length > 0) {
          console.warn('🚨 SIMULADO COM QUESTÕES REDUZIDAS:', {
            problema: 'Não há questões suficientes para a configuração solicitada',
            bibliografias_consultadas: this.simuladoConfig.bibliografias,
            questoes_insuficientes: questoesInsuficientes,
            acoes_recomendadas: [
              'Verificar se a bibliografia ID existe no backend',
              'Verificar se há questões cadastradas para esta bibliografia',
              'Considerar reduzir o número de questões solicitadas'
            ]
          });
        }

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
