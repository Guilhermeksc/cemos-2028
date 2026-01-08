import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import {
  ProjetoEstudo,
  ProjetoEstudoCreate,
  ProjetoEstudoUpdate,
  Materia,
  MateriaCreateUpdate,
  Capitulo,
  CapituloCreateUpdate,
  SessaoEstudo,
  SessaoEstudoCreateUpdate,
  SessaoEstudoConcluir,
  SessaoEstudoFilters,
  Revisao,
  RevisaoCreateUpdate,
  RevisaoConcluir,
  RevisaoFilters,
  IndicadoresProjeto,
  CalendarioResponse,
  PaginatedResponse
} from '../interfaces/revisao.interface';

@Injectable({
  providedIn: 'root'
})
export class RevisaoService {
  private readonly apiUrl = `${environment.apiUrl}/revisao/api`;

  // BehaviorSubjects para cache e estado
  private projetos$ = new BehaviorSubject<ProjetoEstudo[]>([]);
  private loadingProjetos$ = new BehaviorSubject<boolean>(false);
  private loadingSessoes$ = new BehaviorSubject<boolean>(false);
  private loadingRevisoes$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  // Getters para observables
  get projetos(): Observable<ProjetoEstudo[]> {
    return this.projetos$.asObservable();
  }

  get loadingProjetos(): Observable<boolean> {
    return this.loadingProjetos$.asObservable();
  }

  get loadingSessoes(): Observable<boolean> {
    return this.loadingSessoes$.asObservable();
  }

  get loadingRevisoes(): Observable<boolean> {
    return this.loadingRevisoes$.asObservable();
  }

  // ==================== PROJETOS DE ESTUDO ====================

  /**
   * Lista todos os projetos de estudo do usuário autenticado
   */
  getProjetos(): Observable<PaginatedResponse<ProjetoEstudo>> {
    this.loadingProjetos$.next(true);
    
    return this.http.get<PaginatedResponse<ProjetoEstudo>>(`${this.apiUrl}/projetos/`)
      .pipe(
        tap({
          next: (response) => {
            this.projetos$.next(response.results || []);
            this.loadingProjetos$.next(false);
          },
          error: () => {
            this.loadingProjetos$.next(false);
          }
        })
      );
  }

  /**
   * Busca um projeto específico por ID
   */
  getProjeto(id: number): Observable<ProjetoEstudo> {
    return this.http.get<ProjetoEstudo>(`${this.apiUrl}/projetos/${id}/`);
  }

  /**
   * Cria um novo projeto de estudo e gera automaticamente o cronograma
   */
  createProjeto(data: ProjetoEstudoCreate): Observable<ProjetoEstudo> {
    this.loadingProjetos$.next(true);
    
    return this.http.post<ProjetoEstudo>(`${this.apiUrl}/projetos/`, data)
      .pipe(
        tap({
          next: (projeto) => {
            // Atualiza cache
            const current = this.projetos$.value;
            this.projetos$.next([...current, projeto]);
            this.loadingProjetos$.next(false);
          },
          error: () => {
            this.loadingProjetos$.next(false);
          }
        })
      );
  }

  /**
   * Atualiza um projeto de estudo
   */
  updateProjeto(id: number, data: ProjetoEstudoUpdate): Observable<ProjetoEstudo> {
    return this.http.put<ProjetoEstudo>(`${this.apiUrl}/projetos/${id}/`, data)
      .pipe(
        tap(projeto => {
          // Atualiza cache
          const current = this.projetos$.value;
          const index = current.findIndex(p => p.id === id);
          if (index !== -1) {
            current[index] = projeto;
            this.projetos$.next([...current]);
          }
        })
      );
  }

  /**
   * Atualiza parcialmente um projeto de estudo
   */
  patchProjeto(id: number, data: Partial<ProjetoEstudoUpdate>): Observable<ProjetoEstudo> {
    return this.http.patch<ProjetoEstudo>(`${this.apiUrl}/projetos/${id}/`, data)
      .pipe(
        tap(projeto => {
          // Atualiza cache
          const current = this.projetos$.value;
          const index = current.findIndex(p => p.id === id);
          if (index !== -1) {
            current[index] = projeto;
            this.projetos$.next([...current]);
          }
        })
      );
  }

  /**
   * Deleta um projeto de estudo
   */
  deleteProjeto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/projetos/${id}/`)
      .pipe(
        tap({
          next: () => {
            // Remove do cache
            const current = this.projetos$.value;
            this.projetos$.next(current.filter(p => p.id !== id));
          }
        })
      );
  }

  /**
   * Retorna indicadores de acompanhamento do projeto
   */
  getIndicadores(projetoId: number): Observable<IndicadoresProjeto> {
    return this.http.get<IndicadoresProjeto>(`${this.apiUrl}/projetos/${projetoId}/indicadores/`);
  }

  /**
   * Retorna sessões e revisões organizadas por data para o calendário
   */
  getCalendario(projetoId: number): Observable<CalendarioResponse> {
    return this.http.get<CalendarioResponse>(`${this.apiUrl}/projetos/${projetoId}/calendario/`);
  }

  /**
   * Ajusta o cronograma redistribuindo dias por matéria e passada
   */
  ajustarCronograma(projetoId: number, diasPorMateriaPassada: { [materiaId: number]: { [passada: number]: number } }): Observable<CalendarioResponse> {
    return this.http.post<CalendarioResponse>(
      `${this.apiUrl}/projetos/${projetoId}/ajustar_cronograma/`,
      { dias_por_materia_passada: diasPorMateriaPassada }
    );
  }

  // ==================== MATÉRIAS ====================

  /**
   * Lista todas as matérias dos projetos do usuário
   */
  getMaterias(projetoId?: number): Observable<PaginatedResponse<Materia>> {
    let params = new HttpParams();
    if (projetoId) {
      params = params.set('projeto', projetoId.toString());
    }

    return this.http.get<PaginatedResponse<Materia>>(`${this.apiUrl}/materias/`, { params });
  }

  /**
   * Busca uma matéria específica por ID
   */
  getMateria(id: number): Observable<Materia> {
    return this.http.get<Materia>(`${this.apiUrl}/materias/${id}/`);
  }

  /**
   * Cria uma nova matéria
   */
  createMateria(data: MateriaCreateUpdate): Observable<Materia> {
    return this.http.post<Materia>(`${this.apiUrl}/materias/`, data);
  }

  /**
   * Atualiza uma matéria
   */
  updateMateria(id: number, data: MateriaCreateUpdate): Observable<Materia> {
    return this.http.put<Materia>(`${this.apiUrl}/materias/${id}/`, data);
  }

  /**
   * Atualiza parcialmente uma matéria
   */
  patchMateria(id: number, data: Partial<MateriaCreateUpdate>): Observable<Materia> {
    return this.http.patch<Materia>(`${this.apiUrl}/materias/${id}/`, data);
  }

  /**
   * Deleta uma matéria
   */
  deleteMateria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/materias/${id}/`);
  }

  /**
   * Atualiza datas de início e fim de múltiplas matérias
   */
  atualizarDatasMaterias(materias: Array<{ id: number; data_inicio?: string | null; data_fim?: string | null }>): Observable<{ status: string; materias: Materia[] }> {
    return this.http.post<{ status: string; materias: Materia[] }>(
      `${this.apiUrl}/materias/atualizar_datas/`,
      { materias }
    );
  }

  // ==================== CAPÍTULOS ====================

  /**
   * Lista todos os capítulos dos projetos do usuário
   */
  getCapitulos(materiaId?: number): Observable<PaginatedResponse<Capitulo>> {
    let params = new HttpParams();
    if (materiaId) {
      params = params.set('materia', materiaId.toString());
    }

    return this.http.get<PaginatedResponse<Capitulo>>(`${this.apiUrl}/capitulos/`, { params });
  }

  /**
   * Busca um capítulo específico por ID
   */
  getCapitulo(id: number): Observable<Capitulo> {
    return this.http.get<Capitulo>(`${this.apiUrl}/capitulos/${id}/`);
  }

  /**
   * Cria um novo capítulo
   */
  createCapitulo(data: CapituloCreateUpdate): Observable<Capitulo> {
    return this.http.post<Capitulo>(`${this.apiUrl}/capitulos/`, data);
  }

  /**
   * Atualiza um capítulo
   */
  updateCapitulo(id: number, data: CapituloCreateUpdate): Observable<Capitulo> {
    return this.http.put<Capitulo>(`${this.apiUrl}/capitulos/${id}/`, data);
  }

  /**
   * Atualiza parcialmente um capítulo
   */
  patchCapitulo(id: number, data: Partial<CapituloCreateUpdate>): Observable<Capitulo> {
    return this.http.patch<Capitulo>(`${this.apiUrl}/capitulos/${id}/`, data);
  }

  /**
   * Deleta um capítulo
   */
  deleteCapitulo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/capitulos/${id}/`);
  }

  // ==================== SESSÕES DE ESTUDO ====================

  /**
   * Lista sessões de estudo com filtros opcionais
   */
  getSessoes(filters?: SessaoEstudoFilters): Observable<PaginatedResponse<SessaoEstudo>> {
    this.loadingSessoes$.next(true);
    
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<PaginatedResponse<SessaoEstudo>>(`${this.apiUrl}/sessoes/`, { params })
      .pipe(
        tap({
          next: () => {
            this.loadingSessoes$.next(false);
          },
          error: () => {
            this.loadingSessoes$.next(false);
          }
        })
      );
  }

  /**
   * Busca uma sessão específica por ID
   */
  getSessao(id: number): Observable<SessaoEstudo> {
    return this.http.get<SessaoEstudo>(`${this.apiUrl}/sessoes/${id}/`);
  }

  /**
   * Cria uma nova sessão de estudo
   */
  createSessao(data: SessaoEstudoCreateUpdate): Observable<SessaoEstudo> {
    return this.http.post<SessaoEstudo>(`${this.apiUrl}/sessoes/`, data);
  }

  /**
   * Atualiza uma sessão de estudo
   */
  updateSessao(id: number, data: SessaoEstudoCreateUpdate): Observable<SessaoEstudo> {
    return this.http.put<SessaoEstudo>(`${this.apiUrl}/sessoes/${id}/`, data);
  }

  /**
   * Atualiza parcialmente uma sessão de estudo
   */
  patchSessao(id: number, data: Partial<SessaoEstudoCreateUpdate>): Observable<SessaoEstudo> {
    return this.http.patch<SessaoEstudo>(`${this.apiUrl}/sessoes/${id}/`, data);
  }

  /**
   * Deleta uma sessão de estudo
   */
  deleteSessao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/sessoes/${id}/`);
  }

  /**
   * Marca uma sessão como concluída e ajusta o planejamento futuro
   */
  concluirSessao(id: number, data?: SessaoEstudoConcluir): Observable<{ status: string; sessao: SessaoEstudo }> {
    return this.http.post<{ status: string; sessao: SessaoEstudo }>(
      `${this.apiUrl}/sessoes/${id}/concluir/`,
      data || {}
    );
  }

  // ==================== REVISÕES ====================

  /**
   * Lista revisões com filtros opcionais
   */
  getRevisoes(filters?: RevisaoFilters): Observable<PaginatedResponse<Revisao>> {
    this.loadingRevisoes$.next(true);
    
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<PaginatedResponse<Revisao>>(`${this.apiUrl}/revisoes/`, { params })
      .pipe(
        tap({
          next: () => {
            this.loadingRevisoes$.next(false);
          },
          error: () => {
            this.loadingRevisoes$.next(false);
          }
        })
      );
  }

  /**
   * Busca uma revisão específica por ID
   */
  getRevisao(id: number): Observable<Revisao> {
    return this.http.get<Revisao>(`${this.apiUrl}/revisoes/${id}/`);
  }

  /**
   * Cria uma nova revisão
   */
  createRevisao(data: RevisaoCreateUpdate): Observable<Revisao> {
    return this.http.post<Revisao>(`${this.apiUrl}/revisoes/`, data);
  }

  /**
   * Atualiza uma revisão
   */
  updateRevisao(id: number, data: RevisaoCreateUpdate): Observable<Revisao> {
    return this.http.put<Revisao>(`${this.apiUrl}/revisoes/${id}/`, data);
  }

  /**
   * Atualiza parcialmente uma revisão
   */
  patchRevisao(id: number, data: Partial<RevisaoCreateUpdate>): Observable<Revisao> {
    return this.http.patch<Revisao>(`${this.apiUrl}/revisoes/${id}/`, data);
  }

  /**
   * Deleta uma revisão
   */
  deleteRevisao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/revisoes/${id}/`);
  }

  /**
   * Marca uma revisão como concluída
   */
  concluirRevisao(id: number, data?: RevisaoConcluir): Observable<{ status: string; revisao: Revisao }> {
    return this.http.post<{ status: string; revisao: Revisao }>(
      `${this.apiUrl}/revisoes/${id}/concluir/`,
      data || {}
    );
  }
}

