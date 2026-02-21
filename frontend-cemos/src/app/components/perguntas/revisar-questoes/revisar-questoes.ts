import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, forkJoin, of, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatTabsModule } from '@angular/material/tabs';
import { PerguntasService } from '../../../services/perguntas.service';
import { AuthService } from '../../../services/auth.service';
import {
  Pergunta,
  PerguntaMultipla,
  PerguntaVF,
  PerguntaCorrelacao,
  Bibliografia,
  FlashCards
} from '../../../interfaces/perguntas.interface';
import { FlashCardsService } from '../../../services/flashcards.service';
import { JanelaGenerica, BotaoJanela } from '../../janela-generica/janela-generica';

type QuestaoTipo = 'multipla' | 'vf' | 'correlacao' | 'flashcard';

interface RevisarQuestaoRow {
  id: number;
  tipo: QuestaoTipo;
  pergunta: string;
  justificativa_resposta_certa: string;
  bibliografiaId: number;
  bibliografiaTitulo: string;
  assunto_titulo?: string | null;
  caiu_em_prova: boolean;
  ano_prova?: number;
  caveira: boolean;
  data: PerguntaMultipla | PerguntaVF | PerguntaCorrelacao | FlashCards;
  uniqueKey: string;
}

interface RevisarQuestaoGrupo {
  bibliografiaId: number;
  bibliografiaTitulo: string;
  questoes: RevisarQuestaoRow[];
}

interface SavedFilters {
  materiaId: number | null;
  bibliografiaId: number | null;
  assuntoId: number | null;
  activeTabType: QuestaoTipo;
}

@Component({
  selector: 'app-revisar-questoes',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTabsModule, JanelaGenerica],
  templateUrl: './revisar-questoes.html',
  styleUrl: './revisar-questoes.scss'
})
export class RevisarQuestoes implements OnInit, OnDestroy {
  private perguntasService = inject(PerguntasService);
  private flashCardsService = inject(FlashCardsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>();

  isAdmin = false;
  bibliografiaIds: number[] = [];
  isLoading = false;
  isLoadingBibliografias = false;
  errorMessage: string | null = null;
  tableData: RevisarQuestaoGrupo[] = [];
  allTableData: RevisarQuestaoGrupo[] = []; // Armazena todas as questões sem filtro
  isInitialLoad = true; // Flag para controlar carregamento inicial

  // Filtros em cascata
  materiasDisponiveis: Array<{ id: number; nome: string }> = [];
  bibliografiasDisponiveis: Bibliografia[] = [];
  assuntosDisponiveis: Array<{ id: number; nome: string; bibliografiaId: number }> = [];
  
  selectedMateriaId: number | null = null;
  selectedBibliografiaId: number | null = null;
  selectedAssuntoId: number | null = null;
  
  isLoadingMaterias = false;
  isLoadingAssuntos = false;

  // Sistema de tabs
  activeTabIndex: number = 0;
  activeTabType: QuestaoTipo = 'multipla';

  editingRowKey: string | null = null;
  editingFormData: any = null;
  isSavingEdit = false;
  editError: string | null = null;
  togglingCaiuEmProva = new Set<string>();
  togglingCaveira = new Set<string>();
  editingAnoKey: string | null = null;
  anoProvaInput: number | null = null;
  togglingAnoProva = new Set<string>();
  editingPaginasKey: string | null = null;
  paginasInput: string = '';
  togglingPaginas = new Set<string>();

  // Formulário de adicionar questão
  showAddForm = false;
  addFormData: any = null;
  isSavingAdd = false;
  addError: string | null = null;

  // Janela de confirmação de exclusão
  mostrarJanelaExcluir = false;
  questaoParaExcluir: RevisarQuestaoRow | null = null;

  private readonly STORAGE_KEY = 'revisar-questoes-filtros';

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.isAdmin = !!(user && (user.is_staff || user.perfil === 'admin'));
      });

    // Carregar matérias primeiro
    this.loadMaterias();
    
    // Verificar se há parâmetros na URL ou seleções salvas
    this.checkQueryParams();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  reload(): void {
    this.isInitialLoad = false; // Não é mais carregamento inicial ao recarregar manualmente
    this.loadQuestoes();
  }

  onMateriaChange(): void {
    // Limpar seleções dependentes
    this.selectedBibliografiaId = null;
    this.selectedAssuntoId = null;
    this.bibliografiasDisponiveis = [];
    this.assuntosDisponiveis = [];
    this.bibliografiaIds = [];
    this.tableData = [];
    this.allTableData = [];
    
    // Salvar seleção (mesmo se for null)
    this.saveFilters();
    
    if (this.selectedMateriaId) {
      this.loadBibliografias();
    }
  }

  onBibliografiaChange(): void {
    // Limpar assunto selecionado
    this.selectedAssuntoId = null;
    this.assuntosDisponiveis = [];
    this.tableData = [];
    this.allTableData = [];
    
    // Salvar seleção
    this.saveFilters();
    
    if (this.selectedBibliografiaId) {
      this.bibliografiaIds = [this.selectedBibliografiaId];
      this.errorMessage = null;
      this.loadAssuntos();
      // Não carregar questões até que um assunto seja selecionado
    } else {
      this.bibliografiaIds = [];
      this.tableData = [];
      this.allTableData = [];
    }
  }

  onAssuntoChange(): void {
    // Salvar seleção
    this.saveFilters();
    
    // Quando assunto mudar, recarregar questões com o novo filtro
    if (this.selectedBibliografiaId && this.selectedAssuntoId) {
      this.isInitialLoad = false; // Não é mais carregamento inicial
      this.loadQuestoes();
    } else if (this.selectedBibliografiaId && !this.selectedAssuntoId) {
      // Se o assunto foi desmarcado, limpar a tabela
      this.tableData = [];
      this.allTableData = [];
      this.errorMessage = null; // Limpar mensagem de erro
    }
  }

  private saveFilters(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      const filters = {
        materiaId: this.selectedMateriaId,
        bibliografiaId: this.selectedBibliografiaId,
        assuntoId: this.selectedAssuntoId,
        activeTabType: this.activeTabType
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filters));
    } catch (error) {
      console.warn('Erro ao salvar filtros no localStorage:', error);
    }
  }

  private loadSavedFilters(): SavedFilters | null {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }

    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const filters: SavedFilters = JSON.parse(saved);
        return filters;
      }
    } catch (error) {
      console.warn('Erro ao carregar filtros do localStorage:', error);
    }
    return null;
  }

  private loadMaterias(): void {
    this.isLoadingMaterias = true;
    this.perguntasService.getMaterias()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (materias) => {
          this.materiasDisponiveis = materias;
          this.isLoadingMaterias = false;
          // Após carregar matérias, verificar se há seleções salvas (se não houver query params)
          const params = this.route.snapshot.queryParamMap;
          if (!params.get('bibliografias')) {
            this.loadFiltersFromStorage();
          }
        },
        error: (error) => {
          console.error('❌ Erro ao carregar matérias:', error);
          this.errorMessage = 'Erro ao carregar matérias disponíveis.';
          this.isLoadingMaterias = false;
        }
      });
  }

  private loadBibliografias(): void {
    if (!this.selectedMateriaId) {
      this.bibliografiasDisponiveis = [];
      return;
    }

    this.isLoadingBibliografias = true;
    this.perguntasService.getBibliografias({ 
      materia: this.selectedMateriaId,
      page_size: 1000 
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.bibliografiasDisponiveis = response.results;
          this.isLoadingBibliografias = false;
        },
        error: (error) => {
          console.error('❌ Erro ao carregar bibliografias:', error);
          this.errorMessage = 'Erro ao carregar bibliografias disponíveis.';
          this.isLoadingBibliografias = false;
        }
      });
  }

  private loadAssuntos(): void {
    if (!this.selectedBibliografiaId) {
      this.assuntosDisponiveis = [];
      return;
    }

    this.isLoadingAssuntos = true;
    // Carregar questões da bibliografia para extrair assuntos únicos
    const multiplaRequest = this.perguntasService.getAllPerguntasMultipla({ bibliografia: this.selectedBibliografiaId });
    const vfRequest = this.perguntasService.getAllPerguntasVF({ bibliografia: this.selectedBibliografiaId });
    const correlacaoRequest = this.perguntasService.getAllPerguntasCorrelacao({ bibliografia: this.selectedBibliografiaId });
    const flashcardsRequest = this.perguntasService.getAllFlashCards({ bibliografia: this.selectedBibliografiaId });

    forkJoin({ multiplas: multiplaRequest, vfs: vfRequest, correlacoes: correlacaoRequest, flashcards: flashcardsRequest })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          const multiplas: PerguntaMultipla[] = Array.isArray(results.multiplas) ? results.multiplas : [];
          const vfs: PerguntaVF[] = Array.isArray(results.vfs) ? results.vfs : [];
          const correlacoes: PerguntaCorrelacao[] = Array.isArray(results.correlacoes) ? results.correlacoes : [];
          const flashcards: FlashCards[] = Array.isArray(results.flashcards) ? results.flashcards : [];
          
          const todasQuestoes = [...multiplas, ...vfs, ...correlacoes, ...flashcards];
          
          // Extrair assuntos únicos
          const assuntosMap = new Map<number, { nome: string; bibliografiaId: number }>();
          
          todasQuestoes.forEach(questao => {
            if (questao.assunto && questao.assunto_titulo) {
              if (!assuntosMap.has(questao.assunto)) {
                assuntosMap.set(questao.assunto, {
                  nome: questao.assunto_titulo,
                  bibliografiaId: questao.bibliografia
                });
              }
            }
          });

          this.assuntosDisponiveis = Array.from(assuntosMap.entries())
            .map(([id, data]) => ({ id, ...data }))
            .sort((a, b) => a.nome.localeCompare(b.nome));
          
          this.isLoadingAssuntos = false;
        },
        error: (error) => {
          console.error('❌ Erro ao carregar assuntos:', error);
          this.assuntosDisponiveis = [];
          this.isLoadingAssuntos = false;
        }
      });
  }

  private checkQueryParams(): void {
    // Verificar query params primeiro (tem prioridade sobre localStorage)
    const params = this.route.snapshot.queryParamMap;
    const idsParam = params.get('bibliografias');
    const assuntoParam = params.get('assunto');
    const ids = idsParam
      ? idsParam.split(',').map(id => Number(id.trim())).filter(id => !isNaN(id))
      : [];
    
    if (ids.length > 0) {
      // Carregar bibliografias primeiro para encontrar a matéria
      this.perguntasService.getBibliografias({ page_size: 1000 })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            const bib = response.results.find(b => b.id === ids[0]);
            if (bib && bib.materia) {
              this.selectedMateriaId = bib.materia;
              this.loadBibliografias();
              // Aguardar bibliografias carregarem antes de selecionar
              setTimeout(() => {
                this.selectedBibliografiaId = ids[0];
                this.bibliografiaIds = ids;
                this.loadAssuntos();
                // Aguardar assuntos carregarem antes de selecionar assunto e carregar questões
                setTimeout(() => {
                  if (assuntoParam) {
                    const assuntoId = Number(assuntoParam.trim());
                    if (!isNaN(assuntoId)) {
                      this.selectedAssuntoId = assuntoId;
                    }
                  }
                  this.saveFilters();
                  this.loadQuestoes();
                }, 500);
              }, 500);
            }
          }
        });
    } else {
      // Se não há query params, tentar carregar seleções salvas
      this.loadFiltersFromStorage();
    }
  }

  private loadFiltersFromStorage(): void {
    const savedFilters = this.loadSavedFilters();
    if (!savedFilters) {
      return;
    }

    // Restaurar matéria
    if (savedFilters.materiaId) {
      // Aguardar matérias carregarem
      const checkMaterias = () => {
        if (this.materiasDisponiveis.length > 0) {
          const materiaExists = this.materiasDisponiveis.some(m => m.id === savedFilters.materiaId);
          if (materiaExists) {
            this.selectedMateriaId = savedFilters.materiaId;
            this.loadBibliografias();
            
            // Aguardar bibliografias carregarem
            setTimeout(() => {
              if (savedFilters.bibliografiaId) {
                const bibExists = this.bibliografiasDisponiveis.some(b => b.id === savedFilters.bibliografiaId);
                if (bibExists) {
                  this.selectedBibliografiaId = savedFilters.bibliografiaId;
                  this.bibliografiaIds = [savedFilters.bibliografiaId];
                  this.loadAssuntos();
                  
                  // Aguardar assuntos carregarem
                  setTimeout(() => {
                    if (savedFilters.assuntoId) {
                      const assuntoExists = this.assuntosDisponiveis.some(a => a.id === savedFilters.assuntoId);
                      if (assuntoExists) {
                        this.selectedAssuntoId = savedFilters.assuntoId;
                      }
                    }
                    if (savedFilters.activeTabType) {
                      const tabs: QuestaoTipo[] = ['multipla', 'vf', 'correlacao', 'flashcard'];
                      const tabIndex = tabs.indexOf(savedFilters.activeTabType);
                      if (tabIndex >= 0) {
                        this.activeTabIndex = tabIndex;
                        this.activeTabType = savedFilters.activeTabType;
                      }
                    }
                    this.loadQuestoes();
                  }, 500);
                }
              }
            }, 500);
          }
        } else {
          // Se matérias ainda não carregaram, tentar novamente
          setTimeout(checkMaterias, 100);
        }
      };
      
      checkMaterias();
    }
  }

  openAddQuestion(): void {
    if (!this.selectedBibliografiaId) {
      this.errorMessage = 'Selecione uma bibliografia antes de adicionar uma questão.';
      return;
    }

    if (!this.selectedAssuntoId) {
      this.errorMessage = 'Selecione um assunto antes de adicionar uma questão.';
      return;
    }

    // Inicializar formulário baseado no tipo da aba ativa
    this.addFormData = this.initAddFormData();
    this.showAddForm = true;
    this.addError = null;
    
    // Se for correlação, inicializar mapeamentos vazios
    if (this.activeTabType === 'correlacao') {
      this.addFormData.correlacao_mappings = [];
    }
  }

  private initAddFormData(): any {
    const base = {
      pergunta: '',
      justificativa_resposta_certa: '',
      bibliografia: this.selectedBibliografiaId,
      assunto: this.selectedAssuntoId || null
    };

    switch (this.activeTabType) {
      case 'multipla':
        return {
          ...base,
          alternativa_a: '',
          alternativa_b: '',
          alternativa_c: '',
          alternativa_d: '',
          resposta_correta: 'a'
        };
      case 'vf':
        return {
          ...base,
          afirmacao_verdadeira: '',
          afirmacao_falsa: ''
        };
      case 'correlacao':
        return {
          ...base,
          coluna_a_text: '',
          coluna_b_text: '',
          correlacao_mappings: [] // Estrutura amigável para edição
        };
      case 'flashcard':
        return {
          ...base,
          resposta: '',
          prova: false,
          ano: null,
          caveira: false
        };
      default:
        return base;
    }
  }

  cancelAddForm(): void {
    this.showAddForm = false;
    this.addFormData = null;
    this.addError = null;
    this.isSavingAdd = false;
  }

  saveAddQuestion(): void {
    if (!this.addFormData || !this.selectedBibliografiaId) {
      this.addError = 'Dados inválidos.';
      return;
    }

    if (!this.selectedAssuntoId) {
      this.addError = 'É obrigatório selecionar um assunto para salvar a questão.';
      return;
    }

    // Validar campos obrigatórios
    if (!this.addFormData.pergunta || this.addFormData.pergunta.trim() === '') {
      this.addError = 'O enunciado da questão é obrigatório.';
      return;
    }

    // Validações específicas por tipo
    if (this.activeTabType === 'multipla') {
      if (!this.addFormData.alternativa_a || !this.addFormData.alternativa_b ||
          !this.addFormData.alternativa_c || !this.addFormData.alternativa_d) {
        this.addError = 'Todas as alternativas são obrigatórias.';
        return;
      }
    } else if (this.activeTabType === 'vf') {
      if (!this.addFormData.afirmacao_verdadeira || !this.addFormData.afirmacao_falsa) {
        this.addError = 'Ambas as afirmações (verdadeira e falsa) são obrigatórias.';
        return;
      }
    } else if (this.activeTabType === 'correlacao') {
      const colunaAText = this.addFormData.coluna_a_text || '';
      const colunaBText = this.addFormData.coluna_b_text || '';
      const colunaAItems = colunaAText.split('\n').filter((item: string) => item.trim().length > 0);
      const colunaBItems = colunaBText.split('\n').filter((item: string) => item.trim().length > 0);
      
      if (colunaAItems.length === 0 || colunaBItems.length === 0) {
        this.addError = 'Ambas as colunas devem ter pelo menos um item.';
        return;
      }
      
      // Validar que pelo menos um item da Coluna A tem correspondência
      if (!this.addFormData.correlacao_mappings || this.addFormData.correlacao_mappings.length === 0) {
        this.addError = 'É necessário relacionar pelo menos um item da Coluna A com um item da Coluna B.';
        return;
      }
      
      const hasMapping = this.addFormData.correlacao_mappings.some((m: any) => m.respostaIndex !== null);
      if (!hasMapping) {
        this.addError = 'É necessário relacionar pelo menos um item da Coluna A com um item da Coluna B.';
        return;
      }
    } else if (this.activeTabType === 'flashcard') {
      if (!this.addFormData.resposta || this.addFormData.resposta.trim() === '') {
        this.addError = 'A resposta do flashcard é obrigatória.';
        return;
      }
    }

    this.isSavingAdd = true;
    this.addError = null;

    const payload = this.buildAddPayload();
    let createRequest: Observable<Pergunta>;

    switch (this.activeTabType) {
      case 'multipla':
        createRequest = this.perguntasService.createPerguntaMultipla(payload) as unknown as Observable<Pergunta>;
        break;
      case 'vf':
        createRequest = this.perguntasService.createPerguntaVF(payload) as unknown as Observable<Pergunta>;
        break;
      case 'correlacao':
        createRequest = this.perguntasService.createPerguntaCorrelacao(payload) as unknown as Observable<Pergunta>;
        break;
      case 'flashcard':
        createRequest = this.flashCardsService.createFlashCard(payload) as unknown as Observable<Pergunta>;
        break;
      default:
        this.addError = 'Tipo de pergunta inválido.';
        this.isSavingAdd = false;
        return;
    }

    createRequest
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (created: Pergunta) => {
          this.isSavingAdd = false;
          this.cancelAddForm();
          // Recarregar questões para mostrar a nova questão
          this.loadQuestoes();
        },
        error: (error: any) => {
          console.error('❌ Erro ao criar questão:', error);
          this.addError = error?.error?.detail || error?.message || 'Erro ao criar questão. Tente novamente.';
          this.isSavingAdd = false;
        }
      });
  }

  private buildAddPayload(): any {
    const payload: any = {
      pergunta: this.addFormData.pergunta.trim(),
      justificativa_resposta_certa: this.addFormData.justificativa_resposta_certa?.trim() || '',
      bibliografia: this.selectedBibliografiaId,
      assunto: this.selectedAssuntoId // Sempre obrigatório
    };

    switch (this.activeTabType) {
      case 'multipla':
        payload.alternativa_a = this.addFormData.alternativa_a.trim();
        payload.alternativa_b = this.addFormData.alternativa_b.trim();
        payload.alternativa_c = this.addFormData.alternativa_c.trim();
        payload.alternativa_d = this.addFormData.alternativa_d.trim();
        payload.resposta_correta = this.addFormData.resposta_correta || 'a';
        break;
      case 'vf':
        payload.afirmacao_verdadeira = this.addFormData.afirmacao_verdadeira.trim();
        payload.afirmacao_falsa = this.addFormData.afirmacao_falsa.trim();
        break;
      case 'correlacao':
        const colunaAItems = (this.addFormData.coluna_a_text || '')
          .split('\n')
          .map((item: string) => item.trim())
          .filter((item: string) => item.length > 0)
          .map((item: string) => item.replace(/^\d+\)\s*/, '')); // Remove numeração automática
        
        const colunaBItems = (this.addFormData.coluna_b_text || '')
          .split('\n')
          .map((item: string) => item.trim())
          .filter((item: string) => item.length > 0)
          .map((item: string) => item.replace(/^[A-Z]\)\s*/, '')); // Remove letras automáticas
        
        // Construir resposta correta a partir dos mapeamentos
        const respostaCorreta: { [key: string]: number } = {};
        if (this.addFormData.correlacao_mappings && Array.isArray(this.addFormData.correlacao_mappings)) {
          this.addFormData.correlacao_mappings.forEach((mapping: any, indexA: number) => {
            if (mapping.respostaIndex !== null && mapping.respostaIndex !== undefined) {
              respostaCorreta[indexA.toString()] = mapping.respostaIndex;
            }
          });
        }
        
        payload.coluna_a = colunaAItems;
        payload.coluna_b = colunaBItems;
        payload.resposta_correta = respostaCorreta;
        break;
      case 'flashcard':
        payload.resposta = this.addFormData.resposta?.trim() || '';
        payload.prova = !!this.addFormData.prova;
        payload.ano = this.addFormData.ano ?? null;
        payload.caveira = !!this.addFormData.caveira;
        break;
    }

    return payload;
  }

  onTabChange(tabIndex: number): void {
    this.activeTabIndex = tabIndex;
    const tabs: QuestaoTipo[] = ['multipla', 'vf', 'correlacao', 'flashcard'];
    this.activeTabType = tabs[tabIndex];
    this.filterTableDataByType();
    // Salvar aba ativa
    this.saveFilters();
    // Se o formulário de adicionar estiver aberto, atualizar para o novo tipo
    if (this.showAddForm && this.addFormData) {
      this.addFormData = this.initAddFormData();
    }
  }

  getQuestoesCountByType(tipo: QuestaoTipo): number {
    if (!this.allTableData.length) {
      return 0;
    }
    return this.allTableData.reduce((total, grupo) => {
      return total + grupo.questoes.filter(q => q.tipo === tipo).length;
    }, 0);
  }

  private filterTableDataByType(): void {
    if (!this.allTableData.length) {
      this.tableData = [];
      return;
    }

    // Filtrar questões por tipo na aba ativa
    this.tableData = this.allTableData.map(grupo => ({
      ...grupo,
      questoes: grupo.questoes.filter(questao => questao.tipo === this.activeTabType)
    })).filter(grupo => grupo.questoes.length > 0); // Remover grupos vazios
  }

  closeWindow(): void {
    if (typeof window !== 'undefined') {
      window.close();
    }
  }

  private loadQuestoes(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.tableData = [];

    const ids = this.bibliografiaIds;
    if (ids.length === 0) {
      this.isLoading = false;
      // Não mostrar erro durante carregamento inicial ou se ainda não há seleção
      if (!this.isInitialLoad && this.selectedBibliografiaId !== null) {
        this.errorMessage = 'Selecione uma bibliografia para carregar as questões.';
      }
      return;
    }

    if (!this.selectedAssuntoId) {
      this.isLoading = false;
      // Não mostrar erro durante carregamento inicial
      // Só mostrar se os assuntos já foram carregados e o usuário tentou carregar questões
      if (!this.isInitialLoad && this.selectedBibliografiaId !== null && this.assuntosDisponiveis.length > 0) {
        this.errorMessage = 'Selecione um assunto para carregar as questões.';
      }
      return;
    }

    // Se chegou aqui, não é mais carregamento inicial
    this.isInitialLoad = false;

    // Preparar filtros - assunto é obrigatório
    const filters: any = { 
      bibliografia: ids[0],
      assunto: this.selectedAssuntoId
    };

    const multiplaRequests = [this.perguntasService.getAllPerguntasMultipla(filters)];
    const vfRequests = [this.perguntasService.getAllPerguntasVF(filters)];
    const correlacaoRequests = [this.perguntasService.getAllPerguntasCorrelacao(filters)];
    const flashcardsRequests = [this.perguntasService.getAllFlashCards(filters)];

    const multiplas$ = multiplaRequests.length ? forkJoin(multiplaRequests) : of([]);
    const vfs$ = vfRequests.length ? forkJoin(vfRequests) : of([]);
    const correlacoes$ = correlacaoRequests.length ? forkJoin(correlacaoRequests) : of([]);
    const flashcards$ = flashcardsRequests.length ? forkJoin(flashcardsRequests) : of([]);

    forkJoin({ multiplas: multiplas$, vfs: vfs$, correlacoes: correlacoes$, flashcards: flashcards$ })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          const multiplas: PerguntaMultipla[] = Array.isArray(results.multiplas)
            ? (results.multiplas as PerguntaMultipla[][]).flat()
            : [];
          const vfs: PerguntaVF[] = Array.isArray(results.vfs)
            ? (results.vfs as PerguntaVF[][]).flat()
            : [];
          const correlacoes: PerguntaCorrelacao[] = Array.isArray(results.correlacoes)
            ? (results.correlacoes as PerguntaCorrelacao[][]).flat()
            : [];
          const flashcards: FlashCards[] = Array.isArray(results.flashcards)
            ? (results.flashcards as FlashCards[][]).flat()
            : [];

          this.allTableData = this.buildTableData([...multiplas, ...vfs, ...correlacoes, ...flashcards]);
          this.filterTableDataByType();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('❌ Erro ao carregar questões para revisão:', error);
          this.errorMessage = 'Erro ao carregar as questões. Atualize a página para tentar novamente.';
          this.isLoading = false;
        }
      });
  }

  private buildTableData(questoes: Array<PerguntaMultipla | PerguntaVF | PerguntaCorrelacao | FlashCards>): RevisarQuestaoGrupo[] {
    const grupos = new Map<number, RevisarQuestaoGrupo>();

    questoes.forEach(questao => {
      const bibliografiaId = questao.bibliografia;
      const isFlashcard = !('tipo' in questao);
      const tipo: QuestaoTipo = isFlashcard ? 'flashcard' : questao.tipo;
      if (!grupos.has(bibliografiaId)) {
        grupos.set(bibliografiaId, {
          bibliografiaId,
          bibliografiaTitulo: questao.bibliografia_titulo || `Bibliografia #${bibliografiaId}`,
          questoes: []
        });
      }

      grupos.get(bibliografiaId)!.questoes.push({
        id: questao.id,
        tipo,
        pergunta: questao.pergunta,
        justificativa_resposta_certa: isFlashcard ? '' : questao.justificativa_resposta_certa,
        bibliografiaId,
        bibliografiaTitulo: questao.bibliografia_titulo || `Bibliografia #${bibliografiaId}`,
        assunto_titulo: questao.assunto_titulo,
        caiu_em_prova: isFlashcard ? questao.prova : questao.caiu_em_prova,
        ano_prova: isFlashcard ? questao.ano : questao.ano_prova,
        caveira: questao.caveira,
        data: questao as PerguntaMultipla | PerguntaVF | PerguntaCorrelacao | FlashCards,
        uniqueKey: `${tipo}-${questao.id}`
      });
    });

    return Array.from(grupos.values()).map(grupo => ({
      ...grupo,
      questoes: grupo.questoes.sort((a, b) => {
        const numA = RevisarQuestoes.extractFirstPageNumber(this.getPaginasValue(a.data));
        const numB = RevisarQuestoes.extractFirstPageNumber(this.getPaginasValue(b.data));
        if (numA !== numB) return numA - numB;
        return a.id - b.id;
      })
    }));
  }

  private getPaginasValue(data: RevisarQuestaoRow['data']): string | null | undefined {
    return 'paginas' in data ? data.paginas : null;
  }

  getPaginasDisplay(row: RevisarQuestaoRow): string {
    return this.getPaginasValue(row.data) || '–';
  }

  /**
   * Extrai o primeiro número válido de uma string de páginas.
   * Ex: "Pág. 1", "Pág 1", "Página 1", "Pág 12, 15 e 17" -> 1, 1, 1, 12
   * Retorna Infinity se não encontrar número (para ordenar no final).
   */
  private static extractFirstPageNumber(paginas: string | null | undefined): number {
    if (paginas == null || typeof paginas !== 'string') return Infinity;
    const trimmed = paginas.trim();
    if (!trimmed) return Infinity;
    const match = trimmed.match(/\d+/);
    return match ? parseInt(match[0], 10) : Infinity;
  }

  getQuestaoTipoDisplay(tipo: QuestaoTipo): string {
    switch (tipo) {
      case 'multipla':
        return 'Múltipla';
      case 'vf':
        return 'V/F';
      case 'correlacao':
        return 'Correlação';
      case 'flashcard':
        return 'Objetiva/Flashcard';
      default:
        return tipo;
    }
  }

  getBibliografiaTitulo(id: number | null): string {
    if (!id) return '';
    const bib = this.bibliografiasDisponiveis.find(b => b.id === id);
    return bib ? `${bib.titulo}${bib.autor ? ' — ' + bib.autor : ''}` : '';
  }

  getMateriaNome(id: number | null): string {
    if (!id) return '';
    const materia = this.materiasDisponiveis.find(m => m.id === id);
    return materia ? materia.nome : '';
  }

  getAssuntoNome(id: number | null): string {
    if (!id) return '';
    const assunto = this.assuntosDisponiveis.find(a => a.id === id);
    return assunto ? assunto.nome : '';
  }

  isEditing(row: RevisarQuestaoRow): boolean {
    return this.editingRowKey === row.uniqueKey;
  }

  startEditingRow(row: RevisarQuestaoRow): void {
    if (!this.isAdmin) {
      return;
    }
    this.editingRowKey = row.uniqueKey;
    this.editingFormData = this.buildEditFormData(row);
    this.editError = null;
    
    // Se for correlação, inicializar mapeamentos se necessário
    if (row.tipo === 'correlacao' && !this.editingFormData.correlacao_mappings) {
      const colunaA = (this.editingFormData.coluna_a_text || '').split('\n').filter((item: string) => item.trim().length > 0);
      const colunaB = (this.editingFormData.coluna_b_text || '').split('\n').filter((item: string) => item.trim().length > 0);
      this.editingFormData.correlacao_mappings = colunaA.map((itemA: string, indexA: number) => ({
        colunaA: itemA,
        colunaB: '',
        respostaIndex: null
      }));
    }
  }

  cancelEditing(): void {
    this.editingRowKey = null;
    this.editingFormData = null;
    this.editError = null;
    this.isSavingEdit = false;
  }

  // Métodos auxiliares para correlação
  onColunaAChange(uniqueKey: string): void {
    if (!this.editingFormData || this.editingRowKey !== uniqueKey) return;
    
    const colunaAItems = (this.editingFormData.coluna_a_text || '')
      .split('\n')
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0)
      .map((item: string) => item.replace(/^\d+\)\s*/, '')); // Remove numeração se já existir
    
    // Atualizar mapeamentos para corresponder ao número de itens
    if (!this.editingFormData.correlacao_mappings) {
      this.editingFormData.correlacao_mappings = [];
    }
    
    // Preservar mapeamentos existentes e adicionar novos se necessário
    const existingMappings = [...this.editingFormData.correlacao_mappings];
    this.editingFormData.correlacao_mappings = colunaAItems.map((itemA: string, index: number) => {
      if (index < existingMappings.length) {
        // Manter mapeamento existente, apenas atualizar texto
        return {
          ...existingMappings[index],
          colunaA: itemA
        };
      } else {
        // Novo item, criar mapeamento vazio
        return {
          colunaA: itemA,
          colunaB: '',
          respostaIndex: null
        };
      }
    });
  }

  onColunaBChange(uniqueKey: string): void {
    if (!this.editingFormData || this.editingRowKey !== uniqueKey) return;
    
    const colunaBItems = this.getColunaBItems();
    
    // Atualizar opções disponíveis nos selects e limpar seleções inválidas
    if (this.editingFormData.correlacao_mappings) {
      this.editingFormData.correlacao_mappings.forEach((mapping: any) => {
        // Se a resposta selecionada não existe mais, limpar
        if (mapping.respostaIndex !== null && mapping.respostaIndex >= colunaBItems.length) {
          mapping.respostaIndex = null;
          mapping.colunaB = '';
        } else if (mapping.respostaIndex !== null && mapping.respostaIndex < colunaBItems.length) {
          // Atualizar texto da coluna B selecionada
          mapping.colunaB = colunaBItems[mapping.respostaIndex];
        }
      });
    }
  }

  getColunaADisplayText(index: number, item: string): string {
    return `${index + 1}) ${item}`;
  }

  getColunaBDisplayText(index: number, item: string): string {
    const letter = String.fromCharCode(65 + index); // A, B, C, D...
    return `${letter}) ${item}`;
  }

  getColunaBItems(): string[] {
    if (!this.editingFormData || !this.editingFormData.coluna_b_text) return [];
    return (this.editingFormData.coluna_b_text || '')
      .split('\n')
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0)
      .map((item: string) => item.replace(/^[A-Z]\)\s*/, ''));
  }

  // Métodos auxiliares para templates
  getColunaAItemsForPreview(text: string): string[] {
    if (!text) return [];
    return text.split('\n').map((item: string) => item.trim()).filter((item: string) => item.length > 0);
  }

  getColunaBItemsForPreview(text: string): string[] {
    if (!text) return [];
    return text.split('\n').map((item: string) => item.trim()).filter((item: string) => item.length > 0);
  }

  getLetterForIndex(index: number): string {
    return String.fromCharCode(65 + index);
  }

  getAlternativaByLetra(row: RevisarQuestaoRow, letra: 'a' | 'b' | 'c' | 'd' | string | null): string {
    if (!letra || row.tipo !== 'multipla' || !row.data) return '';
    const data = row.data as { alternativa_a?: string; alternativa_b?: string; alternativa_c?: string; alternativa_d?: string };
    const l = String(letra).toLowerCase();
    if (l === 'a') return data.alternativa_a || '';
    if (l === 'b') return data.alternativa_b || '';
    if (l === 'c') return data.alternativa_c || '';
    if (l === 'd') return data.alternativa_d || '';
    return '';
  }

  getColunaAFromRow(row: RevisarQuestaoRow): string[] {
    if (row.tipo !== 'correlacao' || !row.data) return [];
    const data = row.data as { coluna_a?: string[] };
    return Array.isArray(data.coluna_a) ? data.coluna_a : [];
  }

  getColunaBFromRow(row: RevisarQuestaoRow): string[] {
    if (row.tipo !== 'correlacao' || !row.data) return [];
    const data = row.data as { coluna_b?: string[] };
    return Array.isArray(data.coluna_b) ? data.coluna_b : [];
  }

  getCorrelacaoMappingsDisplay(row: RevisarQuestaoRow): string[] {
    if (row.tipo !== 'correlacao' || !row.data) return [];
    const data = row.data as { coluna_a?: string[]; coluna_b?: string[]; resposta_correta?: { [key: string]: string | number } };
    const colunaA = Array.isArray(data.coluna_a) ? data.coluna_a : [];
    const colunaB = Array.isArray(data.coluna_b) ? data.coluna_b : [];
    const rc = data.resposta_correta || {};
    return colunaA
      .map((itemA: string, indexA: number) => {
        const idxB = rc[indexA.toString()];
        if (idxB === undefined || idxB === null) return null;
        const numB = typeof idxB === 'string' ? parseInt(idxB, 10) : idxB;
        if (isNaN(numB) || numB < 0 || numB >= colunaB.length) return null;
        const letter = this.getLetterForIndex(numB);
        return `${indexA + 1}) → ${letter}) ${colunaB[numB]}`;
      })
      .filter((m): m is string => m !== null);
  }

  updateCorrelacaoMapping(indexA: number, indexB: number | null): void {
    if (!this.editingFormData || !this.editingFormData.correlacao_mappings) return;
    
    if (indexA < this.editingFormData.correlacao_mappings.length) {
      this.editingFormData.correlacao_mappings[indexA].respostaIndex = indexB;
      const colunaBItems = this.getColunaBItems();
      if (indexB !== null && indexB < colunaBItems.length) {
        this.editingFormData.correlacao_mappings[indexA].colunaB = colunaBItems[indexB];
      } else {
        this.editingFormData.correlacao_mappings[indexA].colunaB = '';
      }
    }
  }

  // Métodos para formulário de adicionar questão
  onAddColunaAChange(): void {
    if (!this.addFormData) return;
    
    const colunaAItems = (this.addFormData.coluna_a_text || '')
      .split('\n')
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0)
      .map((item: string) => item.replace(/^\d+\)\s*/, ''));
    
    if (!this.addFormData.correlacao_mappings) {
      this.addFormData.correlacao_mappings = [];
    }
    
    const existingMappings = [...this.addFormData.correlacao_mappings];
    this.addFormData.correlacao_mappings = colunaAItems.map((itemA: string, index: number) => {
      if (index < existingMappings.length) {
        return {
          ...existingMappings[index],
          colunaA: itemA
        };
      } else {
        return {
          colunaA: itemA,
          colunaB: '',
          respostaIndex: null
        };
      }
    });
  }

  onAddColunaBChange(): void {
    if (!this.addFormData) return;
    
    const colunaBItems = this.getAddColunaBItems();
    
    if (this.addFormData.correlacao_mappings) {
      this.addFormData.correlacao_mappings.forEach((mapping: any) => {
        if (mapping.respostaIndex !== null && mapping.respostaIndex >= colunaBItems.length) {
          mapping.respostaIndex = null;
          mapping.colunaB = '';
        } else if (mapping.respostaIndex !== null && mapping.respostaIndex < colunaBItems.length) {
          mapping.colunaB = colunaBItems[mapping.respostaIndex];
        }
      });
    }
  }

  getAddColunaBItems(): string[] {
    if (!this.addFormData || !this.addFormData.coluna_b_text) return [];
    return (this.addFormData.coluna_b_text || '')
      .split('\n')
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0)
      .map((item: string) => item.replace(/^[A-Z]\)\s*/, ''));
  }

  updateAddCorrelacaoMapping(indexA: number, indexB: number | null): void {
    if (!this.addFormData || !this.addFormData.correlacao_mappings) return;
    
    if (indexA < this.addFormData.correlacao_mappings.length) {
      this.addFormData.correlacao_mappings[indexA].respostaIndex = indexB;
      const colunaBItems = this.getAddColunaBItems();
      if (indexB !== null && indexB < colunaBItems.length) {
        this.addFormData.correlacao_mappings[indexA].colunaB = colunaBItems[indexB];
      } else {
        this.addFormData.correlacao_mappings[indexA].colunaB = '';
      }
    }
  }

  saveEditingRow(row: RevisarQuestaoRow): void {
    if (!this.editingRowKey || !this.editingFormData) {
      return;
    }

    let payload: any;
    try {
      payload = this.buildPayload(row, this.editingFormData);
    } catch (error: any) {
      this.editError = error?.message || 'Erro ao preparar os dados para salvar.';
      return;
    }

    this.isSavingEdit = true;
    this.updatePergunta(row, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updated: Pergunta) => {
          this.applyUpdatedRow(row, updated);
          this.cancelEditing();
          this.isSavingEdit = false;
        },
        error: (error: any) => {
          console.error('❌ Erro ao salvar questão:', error);
          this.editError = 'Erro ao salvar alterações. Tente novamente.';
          this.isSavingEdit = false;
        }
      });
  }

  private updatePergunta(row: RevisarQuestaoRow, payload: any): Observable<Pergunta> {
    switch (row.tipo) {
      case 'multipla':
        return this.perguntasService.updatePerguntaMultipla(row.id, payload) as unknown as Observable<Pergunta>;
      case 'vf':
        return this.perguntasService.updatePerguntaVF(row.id, payload) as unknown as Observable<Pergunta>;
      case 'correlacao':
        return this.perguntasService.updatePerguntaCorrelacao(row.id, payload) as unknown as Observable<Pergunta>;
      case 'flashcard':
        return this.flashCardsService.patchFlashCard(row.id, payload) as unknown as Observable<Pergunta>;
      default:
        throw new Error('Tipo de pergunta inválido para edição.');
    }
  }

  private applyUpdatedRow(row: RevisarQuestaoRow, updated: Pergunta | FlashCards): void {
    if (row.tipo === 'flashcard') {
      const flash = updated as FlashCards;
      row.pergunta = flash.pergunta;
      row.justificativa_resposta_certa = '';
      row.assunto_titulo = flash.assunto_titulo || row.assunto_titulo;
      row.caiu_em_prova = flash.prova;
      row.ano_prova = flash.ano;
      row.caveira = flash.caveira;
      row.data = flash;
      return;
    }

    const perguntaAtualizada = updated as Pergunta;
    row.pergunta = updated.pergunta;
    row.justificativa_resposta_certa = perguntaAtualizada.justificativa_resposta_certa;
    row.assunto_titulo = perguntaAtualizada.assunto_titulo || row.assunto_titulo;
    row.caiu_em_prova = perguntaAtualizada.caiu_em_prova;
    row.ano_prova = perguntaAtualizada.ano_prova;
    row.caveira = perguntaAtualizada.caveira;
    row.data = perguntaAtualizada as PerguntaMultipla | PerguntaVF | PerguntaCorrelacao;
    // Atualizar paginas no objeto data
    if (row.data) {
      (row.data as any).paginas = perguntaAtualizada.paginas || null;
    }
  }

  private buildEditFormData(row: RevisarQuestaoRow) {
    const data: any = row.data;
    const base = {
      pergunta: row.pergunta,
      justificativa_resposta_certa: row.justificativa_resposta_certa,
      paginas: data.paginas || ''
    };

    switch (row.tipo) {
      case 'flashcard':
        return {
          pergunta: row.pergunta,
          resposta: data.resposta || ''
        };
      case 'multipla':
        return {
          ...base,
          alternativa_a: data.alternativa_a || '',
          alternativa_b: data.alternativa_b || '',
          alternativa_c: data.alternativa_c || '',
          alternativa_d: data.alternativa_d || '',
          resposta_correta: data.resposta_correta || 'a'
        };
      case 'vf':
        return {
          ...base,
          afirmacao_verdadeira: data.afirmacao_verdadeira || '',
          afirmacao_falsa: data.afirmacao_falsa || ''
        };
      case 'correlacao':
        const colunaA = data.coluna_a || [];
        const colunaB = data.coluna_b || [];
        const respostaCorreta = data.resposta_correta || {};
        
        // Criar mapeamento amigável: para cada item da Coluna A, qual item da Coluna B corresponde
        const mappings: Array<{ colunaA: string; colunaB: string; respostaIndex: number | null }> = [];
        colunaA.forEach((itemA: string, indexA: number) => {
          const respostaIndexStr = respostaCorreta[indexA.toString()];
          const respostaIndex = respostaIndexStr !== undefined && respostaIndexStr !== null
            ? parseInt(respostaIndexStr.toString()) 
            : null;
          mappings.push({
            colunaA: itemA,
            colunaB: respostaIndex !== null && respostaIndex < colunaB.length ? colunaB[respostaIndex] : '',
            respostaIndex: respostaIndex
          });
        });
        
        return {
          ...base,
          coluna_a_text: colunaA.join('\n'),
          coluna_b_text: colunaB.join('\n'),
          correlacao_mappings: mappings // Estrutura amigável para edição
        };
      default:
        return base;
    }
  }

  private buildPayload(row: RevisarQuestaoRow, formData: any) {
    if (row.tipo === 'flashcard') {
      return {
        pergunta: formData.pergunta,
        resposta: formData.resposta
      };
    }

    const payload: any = {
      pergunta: formData.pergunta,
      justificativa_resposta_certa: formData.justificativa_resposta_certa,
      paginas: formData.paginas || null
    };

    switch (row.tipo) {
      case 'multipla':
        payload.alternativa_a = formData.alternativa_a;
        payload.alternativa_b = formData.alternativa_b;
        payload.alternativa_c = formData.alternativa_c;
        payload.alternativa_d = formData.alternativa_d;
        payload.resposta_correta = formData.resposta_correta || 'a';
        return payload;
      case 'vf':
        payload.afirmacao_verdadeira = formData.afirmacao_verdadeira;
        payload.afirmacao_falsa = formData.afirmacao_falsa;
        return payload;
      case 'correlacao':
        const colunaAItems = (formData.coluna_a_text || '')
          .split('\n')
          .map((item: string) => item.trim())
          .filter((item: string) => item.length > 0)
          .map((item: string) => item.replace(/^\d+\)\s*/, '')); // Remove numeração automática
        
        const colunaBItems = (formData.coluna_b_text || '')
          .split('\n')
          .map((item: string) => item.trim())
          .filter((item: string) => item.length > 0)
          .map((item: string) => item.replace(/^[A-Z]\)\s*/, '')); // Remove letras automáticas
        
        // Construir resposta correta a partir dos mapeamentos
        const respostaCorreta: { [key: string]: number } = {};
        if (formData.correlacao_mappings && Array.isArray(formData.correlacao_mappings)) {
          formData.correlacao_mappings.forEach((mapping: any, indexA: number) => {
            if (mapping.respostaIndex !== null && mapping.respostaIndex !== undefined) {
              respostaCorreta[indexA.toString()] = mapping.respostaIndex;
            }
          });
        }
        
        payload.coluna_a = colunaAItems;
        payload.coluna_b = colunaBItems;
        payload.resposta_correta = respostaCorreta;
        return payload;
      default:
        return payload;
    }
  }

  onToggleCaiuEmProva(row: RevisarQuestaoRow, value: boolean): void {
    if (!this.isAdmin) {
      return;
    }

    const key = row.uniqueKey;
    if (this.togglingCaiuEmProva.has(key)) {
      return;
    }

    this.togglingCaiuEmProva.add(key);
    const request$ = row.tipo === 'flashcard'
      ? this.flashCardsService.patchFlashCard(row.id, { prova: value }) as unknown as Observable<Pergunta>
      : this.perguntasService.updatePerguntaCaiuEmProva(row.id, row.tipo, value) as Observable<Pergunta>;
    request$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updated: Pergunta) => {
          this.applyUpdatedRow(row, updated);
          this.togglingCaiuEmProva.delete(key);
        },
        error: (error: any) => {
          console.error('❌ Erro ao atualizar caiu_em_prova:', error);
          this.togglingCaiuEmProva.delete(key);
        }
      });
  }

  isEditingAno(row: RevisarQuestaoRow): boolean {
    return this.editingAnoKey === row.uniqueKey;
  }

  startEditingAno(row: RevisarQuestaoRow): void {
    if (!this.isAdmin || !row.caiu_em_prova) return;
    this.editingAnoKey = row.uniqueKey;
    this.anoProvaInput = row.ano_prova ?? null;
  }

  cancelEditingAno(): void {
    this.editingAnoKey = null;
    this.anoProvaInput = null;
  }

  isEditingPaginas(row: RevisarQuestaoRow): boolean {
    return this.editingPaginasKey === row.uniqueKey;
  }

  startEditingPaginas(row: RevisarQuestaoRow): void {
    if (!this.isAdmin || row.tipo === 'flashcard') return;
    this.editingPaginasKey = row.uniqueKey;
    this.paginasInput = this.getPaginasValue(row.data) || '';
  }

  cancelEditingPaginas(): void {
    this.editingPaginasKey = null;
    this.paginasInput = '';
  }

  savePaginas(row: RevisarQuestaoRow): void {
    if (!this.isAdmin || row.tipo === 'flashcard' || this.editingPaginasKey !== row.uniqueKey) return;
    const paginas = this.paginasInput?.trim() || null;
    this.togglingPaginas.add(row.uniqueKey);
    this.updatePergunta(row, { paginas })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updated: Pergunta) => {
          this.applyUpdatedRow(row, updated);
          this.cancelEditingPaginas();
          this.togglingPaginas.delete(row.uniqueKey);
        },
        error: (error: any) => {
          console.error('❌ Erro ao salvar páginas:', error);
          this.togglingPaginas.delete(row.uniqueKey);
        }
      });
  }

  saveAnoProva(row: RevisarQuestaoRow): void {
    if (!this.isAdmin || this.editingAnoKey !== row.uniqueKey) return;
    const ano = this.anoProvaInput;
    const anoValido = ano != null && !isNaN(ano) && ano >= 1900 && ano <= 2100;
    const payload = row.tipo === 'flashcard'
      ? (anoValido ? { ano } : { ano: null })
      : (anoValido ? { ano_prova: ano } : { ano_prova: null });
    this.togglingAnoProva.add(row.uniqueKey);
    this.updatePergunta(row, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updated: Pergunta) => {
          this.applyUpdatedRow(row, updated);
          this.cancelEditingAno();
          this.togglingAnoProva.delete(row.uniqueKey);
        },
        error: (error: any) => {
          console.error('❌ Erro ao salvar ano da prova:', error);
          this.togglingAnoProva.delete(row.uniqueKey);
        }
      });
  }

  onToggleCaveira(row: RevisarQuestaoRow, value: boolean): void {
    if (!this.isAdmin) {
      return;
    }

    const key = row.uniqueKey;
    if (this.togglingCaveira.has(key)) {
      return;
    }

    this.togglingCaveira.add(key);
    const request$ = row.tipo === 'flashcard'
      ? this.flashCardsService.patchFlashCard(row.id, { caveira: value }) as unknown as Observable<Pergunta>
      : this.perguntasService.updatePerguntaCaveira(row.id, row.tipo, value) as Observable<Pergunta>;
    request$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updated: Pergunta) => {
          this.applyUpdatedRow(row, updated);
          this.togglingCaveira.delete(key);
        },
        error: (error: any) => {
          console.error('❌ Erro ao atualizar caveira:', error);
          this.togglingCaveira.delete(key);
        }
      });
  }

  confirmDeleteQuestion(row: RevisarQuestaoRow): void {
    if (!this.isAdmin) {
      return;
    }
    this.questaoParaExcluir = row;
    this.mostrarJanelaExcluir = true;
  }

  fecharJanelaExcluir(): void {
    if (!this.isSavingEdit) {
      this.mostrarJanelaExcluir = false;
      this.questaoParaExcluir = null;
    }
  }

  executarExclusao(): void {
    const row = this.questaoParaExcluir;
    if (!row) return;

    this.isSavingEdit = true;
    this.editError = null;

    const request$ = row.tipo === 'flashcard'
      ? this.flashCardsService.deleteFlashCard(row.id)
      : this.perguntasService.deletePergunta(row.tipo, row.id);
    request$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.removeQuestaoFromTable(row);
          this.cancelEditing();
          this.isSavingEdit = false;
          this.mostrarJanelaExcluir = false;
          this.questaoParaExcluir = null;
        },
        error: (error: any) => {
          console.error('❌ Erro ao excluir questão:', error);
          this.editError = error?.error?.detail || error?.message || 'Erro ao excluir questão. Tente novamente.';
          this.isSavingEdit = false;
        }
      });
  }

  get botoesJanelaExcluir(): BotaoJanela[] {
    return [
      {
        texto: 'Cancelar',
        tipo: 'secondary',
        acao: () => this.fecharJanelaExcluir()
      },
      {
        texto: 'Excluir',
        tipo: 'danger',
        disabled: this.isSavingEdit,
        acao: () => this.executarExclusao()
      }
    ];
  }

  private removeQuestaoFromTable(row: RevisarQuestaoRow): void {
    // Remover de allTableData (fonte de dados)
    this.allTableData = this.allTableData.map(grupo => ({
      ...grupo,
      questoes: grupo.questoes.filter(q => q.uniqueKey !== row.uniqueKey)
    })).filter(grupo => grupo.questoes.length > 0);

    // Reaplicar filtro para atualizar tableData
    this.filterTableDataByType();
  }
}
