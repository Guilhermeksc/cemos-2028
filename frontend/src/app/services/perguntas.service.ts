
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import {
  Bibliografia,
  BibliografiaCreateUpdate,
  BibliografiaFilters,
  PerguntaMultipla,
  PerguntaMultiplaCreateUpdate,
  PerguntaMultiplaFilters,
  PerguntaVF,
  PerguntaVFCreateUpdate,
  PerguntaVFFilters,
  PerguntaCorrelacao,
  PerguntaCorrelacaoCreateUpdate,
  PerguntaFilters,
  PerguntaResumo,
  PaginatedResponse,
  EstatisticasBibliografia,
  EstatisticasGerais,
  Pergunta
} from '../interfaces/perguntas.interface';

@Injectable({
  providedIn: 'root'
})
export class PerguntasService {
  private readonly apiUrl = `${environment.apiUrl}/perguntas/api`;
  
  // BehaviorSubjects para cache e estado
  private bibliografias$ = new BehaviorSubject<Bibliografia[]>([]);
  private loadingBibliografias$ = new BehaviorSubject<boolean>(false);
  private loadingPerguntas$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  // Getters para observables
  get bibliografias(): Observable<Bibliografia[]> {
    return this.bibliografias$.asObservable();
  }

  get loadingBibliografias(): Observable<boolean> {
    return this.loadingBibliografias$.asObservable();
  }

  get loadingPerguntas(): Observable<boolean> {
    return this.loadingPerguntas$.asObservable();
  }

  // ==================== BIBLIOGRAFIAS ====================

  /**
   * Lista todas as bibliografias com filtros opcionais
   */
  getBibliografias(filters?: BibliografiaFilters): Observable<PaginatedResponse<Bibliografia>> {
    this.loadingBibliografias$.next(true);
    
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<PaginatedResponse<Bibliografia>>(`${this.apiUrl}/bibliografias/`, { params })
      .pipe(
        tap(response => {
          this.bibliografias$.next(response.results);
          this.loadingBibliografias$.next(false);
        })
      );
  }

  /**
   * Busca uma bibliografia específica por ID
   */
  getBibliografia(id: number): Observable<Bibliografia> {
    return this.http.get<Bibliografia>(`${this.apiUrl}/bibliografias/${id}/`);
  }

  /**
   * Cria uma nova bibliografia
   */
  createBibliografia(bibliografia: BibliografiaCreateUpdate): Observable<Bibliografia> {
    return this.http.post<Bibliografia>(`${this.apiUrl}/bibliografias/`, bibliografia)
      .pipe(
        tap(() => this.refreshBibliografias())
      );
  }

  /**
   * Atualiza uma bibliografia existente
   */
  updateBibliografia(id: number, bibliografia: Partial<BibliografiaCreateUpdate>): Observable<Bibliografia> {
    return this.http.patch<Bibliografia>(`${this.apiUrl}/bibliografias/${id}/`, bibliografia)
      .pipe(
        tap(() => this.refreshBibliografias())
      );
  }

  /**
   * Remove uma bibliografia
   */
  deleteBibliografia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/bibliografias/${id}/`)
      .pipe(
        tap(() => this.refreshBibliografias())
      );
  }

  /**
   * Busca todas as perguntas de uma bibliografia específica
   */
  getPerguntasByBibliografia(id: number): Observable<PerguntaResumo[]> {
    return this.http.get<PerguntaResumo[]>(`${this.apiUrl}/bibliografias/${id}/perguntas/`);
  }

  // ==================== PERGUNTAS MÚLTIPLA ESCOLHA ====================

  /**
   * Lista perguntas de múltipla escolha com filtros
   */
  getPerguntasMultipla(filters?: PerguntaMultiplaFilters): Observable<PaginatedResponse<PerguntaMultipla>> {
    this.loadingPerguntas$.next(true);
    
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<PaginatedResponse<PerguntaMultipla>>(`${this.apiUrl}/perguntas-multipla/`, { params })
      .pipe(
        tap(() => this.loadingPerguntas$.next(false))
      );
  }

  /**
   * Busca uma pergunta múltipla específica
   */
  getPerguntaMultipla(id: number): Observable<PerguntaMultipla> {
    return this.http.get<PerguntaMultipla>(`${this.apiUrl}/perguntas-multipla/${id}/`);
  }

  /**
   * Cria uma nova pergunta de múltipla escolha
   */
  createPerguntaMultipla(pergunta: PerguntaMultiplaCreateUpdate): Observable<PerguntaMultipla> {
    return this.http.post<PerguntaMultipla>(`${this.apiUrl}/perguntas-multipla/`, pergunta);
  }

  /**
   * Atualiza uma pergunta de múltipla escolha
   */
  updatePerguntaMultipla(id: number, pergunta: Partial<PerguntaMultiplaCreateUpdate>): Observable<PerguntaMultipla> {
    return this.http.patch<PerguntaMultipla>(`${this.apiUrl}/perguntas-multipla/${id}/`, pergunta);
  }

  /**
   * Remove uma pergunta de múltipla escolha
   */
  deletePerguntaMultipla(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/perguntas-multipla/${id}/`);
  }

  // ==================== PERGUNTAS VERDADEIRO/FALSO ====================

  /**
   * Lista perguntas de verdadeiro/falso com filtros
   */
  getPerguntasVF(filters?: PerguntaVFFilters): Observable<PaginatedResponse<PerguntaVF>> {
    this.loadingPerguntas$.next(true);
    
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<PaginatedResponse<PerguntaVF>>(`${this.apiUrl}/perguntas-vf/`, { params })
      .pipe(
        tap(() => this.loadingPerguntas$.next(false))
      );
  }

  /**
   * Busca uma pergunta V/F específica
   */
  getPerguntaVF(id: number): Observable<PerguntaVF> {
    return this.http.get<PerguntaVF>(`${this.apiUrl}/perguntas-vf/${id}/`);
  }

  /**
   * Cria uma nova pergunta de verdadeiro/falso
   */
  createPerguntaVF(pergunta: PerguntaVFCreateUpdate): Observable<PerguntaVF> {
    return this.http.post<PerguntaVF>(`${this.apiUrl}/perguntas-vf/`, pergunta);
  }

  /**
   * Atualiza uma pergunta de verdadeiro/falso
   */
  updatePerguntaVF(id: number, pergunta: Partial<PerguntaVFCreateUpdate>): Observable<PerguntaVF> {
    return this.http.patch<PerguntaVF>(`${this.apiUrl}/perguntas-vf/${id}/`, pergunta);
  }

  /**
   * Remove uma pergunta de verdadeiro/falso
   */
  deletePerguntaVF(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/perguntas-vf/${id}/`);
  }

  // ==================== PERGUNTAS DE CORRELAÇÃO ====================

  /**
   * Lista perguntas de correlação com filtros
   */
  getPerguntasCorrelacao(filters?: PerguntaFilters): Observable<PaginatedResponse<PerguntaCorrelacao>> {
    this.loadingPerguntas$.next(true);
    
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<PaginatedResponse<PerguntaCorrelacao>>(`${this.apiUrl}/perguntas-correlacao/`, { params })
      .pipe(
        tap(() => this.loadingPerguntas$.next(false))
      );
  }

  /**
   * Busca uma pergunta de correlação específica
   */
  getPerguntaCorrelacao(id: number): Observable<PerguntaCorrelacao> {
    return this.http.get<PerguntaCorrelacao>(`${this.apiUrl}/perguntas-correlacao/${id}/`);
  }

  /**
   * Cria uma nova pergunta de correlação
   */
  createPerguntaCorrelacao(pergunta: PerguntaCorrelacaoCreateUpdate): Observable<PerguntaCorrelacao> {
    return this.http.post<PerguntaCorrelacao>(`${this.apiUrl}/perguntas-correlacao/`, pergunta);
  }

  /**
   * Atualiza uma pergunta de correlação
   */
  updatePerguntaCorrelacao(id: number, pergunta: Partial<PerguntaCorrelacaoCreateUpdate>): Observable<PerguntaCorrelacao> {
    return this.http.patch<PerguntaCorrelacao>(`${this.apiUrl}/perguntas-correlacao/${id}/`, pergunta);
  }

  /**
   * Remove uma pergunta de correlação
   */
  deletePerguntaCorrelacao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/perguntas-correlacao/${id}/`);
  }

  // ==================== MÉTODOS UTILITÁRIOS ====================

  /**
   * Refresh das bibliografias (força nova consulta)
   */
  refreshBibliografias(): void {
    this.getBibliografias().subscribe();
  }

  /**
   * Busca todas as perguntas de todos os tipos (para estatísticas)
   */
  getAllPerguntas(): Observable<PerguntaResumo[]> {
    const multiplas$ = this.getPerguntasMultipla({ page_size: 1000 }).pipe(
      map(response => response.results.map(p => this.mapToPerguntaResumo(p)))
    );
    
    const vfs$ = this.getPerguntasVF({ page_size: 1000 }).pipe(
      map(response => response.results.map(p => this.mapToPerguntaResumo(p)))
    );
    
    const correlacoes$ = this.getPerguntasCorrelacao({ page_size: 1000 }).pipe(
      map(response => response.results.map(p => this.mapToPerguntaResumo(p)))
    );

    return new Observable(observer => {
      const allPerguntas: PerguntaResumo[] = [];
      let completed = 0;

      [multiplas$, vfs$, correlacoes$].forEach(obs => {
        obs.subscribe(perguntas => {
          allPerguntas.push(...perguntas);
          completed++;
          if (completed === 3) {
            observer.next(allPerguntas.sort((a, b) => a.id - b.id));
            observer.complete();
          }
        });
      });
    });
  }

  /**
   * Gera estatísticas gerais do sistema
   */
  getEstatisticasGerais(): Observable<EstatisticasGerais> {
    return new Observable(observer => {
      let bibliografias: Bibliografia[] = [];
      let perguntas: PerguntaResumo[] = [];

      this.getBibliografias({ page_size: 1000 }).subscribe(bibResponse => {
        bibliografias = bibResponse.results;
        
        this.getAllPerguntas().subscribe(perguntasResponse => {
          perguntas = perguntasResponse;
          
          const stats: EstatisticasGerais = {
            total_bibliografias: bibliografias.length,
            total_perguntas: perguntas.length,
            perguntas_por_tipo: {
              multipla: perguntas.filter(p => p.tipo === 'multipla').length,
              vf: perguntas.filter(p => p.tipo === 'vf').length,
              correlacao: perguntas.filter(p => p.tipo === 'correlacao').length
            },
            perguntas_por_ano: this.groupByYear(perguntas),
            perguntas_que_cairam_prova: perguntas.filter(p => p.caiu_em_prova).length
          };
          
          observer.next(stats);
          observer.complete();
        });
      });
    });
  }

  /**
   * Gera estatísticas de uma bibliografia específica
   */
  getEstatisticasBibliografia(id: number): Observable<EstatisticasBibliografia> {
    return this.getPerguntasByBibliografia(id).pipe(
      map(perguntas => ({
        total_perguntas: perguntas.length,
        perguntas_multipla: perguntas.filter(p => p.tipo === 'multipla').length,
        perguntas_vf: perguntas.filter(p => p.tipo === 'vf').length,
        perguntas_correlacao: perguntas.filter(p => p.tipo === 'correlacao').length,
        perguntas_prova: perguntas.filter(p => p.caiu_em_prova).length,
        anos_prova: [...new Set(perguntas.filter(p => p.ano_prova).map(p => p.ano_prova!))]
          .sort((a, b) => b - a)
      }))
    );
  }

  // ==================== MÉTODOS PRIVADOS ====================

  private mapToPerguntaResumo(pergunta: Pergunta): PerguntaResumo {
    return {
      id: pergunta.id,
      tipo: pergunta.tipo,
      tipo_display: pergunta.tipo_display || '',
      bibliografia_titulo: pergunta.bibliografia_titulo || '',
      pergunta: pergunta.pergunta,
      paginas: pergunta.paginas,
      caiu_em_prova: pergunta.caiu_em_prova,
      ano_prova: pergunta.ano_prova
    };
  }

  private groupByYear(perguntas: PerguntaResumo[]): { [ano: string]: number } {
    return perguntas.reduce((acc, pergunta) => {
      if (pergunta.ano_prova) {
        const ano = pergunta.ano_prova.toString();
        acc[ano] = (acc[ano] || 0) + 1;
      }
      return acc;
    }, {} as { [ano: string]: number });
  }

  // ==================== MÉTODOS DE VALIDAÇÃO ====================

  /**
   * Valida dados de uma pergunta de múltipla escolha
   */
  validatePerguntaMultipla(pergunta: PerguntaMultiplaCreateUpdate): string[] {
    const errors: string[] = [];
    
    if (!pergunta.pergunta?.trim()) {
      errors.push('Pergunta é obrigatória');
    }
    
    if (!pergunta.alternativa_a?.trim()) {
      errors.push('Alternativa A é obrigatória');
    }
    
    if (!pergunta.alternativa_b?.trim()) {
      errors.push('Alternativa B é obrigatória');
    }
    
    if (!pergunta.alternativa_c?.trim()) {
      errors.push('Alternativa C é obrigatória');
    }
    
    if (!pergunta.alternativa_d?.trim()) {
      errors.push('Alternativa D é obrigatória');
    }
    
    if (!['a', 'b', 'c', 'd'].includes(pergunta.resposta_correta)) {
      errors.push('Resposta correta deve ser A, B, C ou D');
    }
    
    if (!pergunta.justificativa_resposta_certa?.trim()) {
      errors.push('Justificativa é obrigatória');
    }
    
    return errors;
  }

  /**
   * Valida dados de uma pergunta V/F
   */
  validatePerguntaVF(pergunta: PerguntaVFCreateUpdate): string[] {
    const errors: string[] = [];
    
    if (!pergunta.pergunta?.trim()) {
      errors.push('Pergunta é obrigatória');
    }
    
    if (!pergunta.afirmacao?.trim()) {
      errors.push('Afirmação é obrigatória');
    }
    
    if (pergunta.resposta_correta === undefined || pergunta.resposta_correta === null) {
      errors.push('Resposta correta é obrigatória');
    }
    
    if (!pergunta.justificativa_resposta_certa?.trim()) {
      errors.push('Justificativa é obrigatória');
    }
    
    return errors;
  }

  /**
   * Valida dados de uma pergunta de correlação
   */
  validatePerguntaCorrelacao(pergunta: PerguntaCorrelacaoCreateUpdate): string[] {
    const errors: string[] = [];
    
    if (!pergunta.pergunta?.trim()) {
      errors.push('Pergunta é obrigatória');
    }
    
    if (!pergunta.coluna_a || pergunta.coluna_a.length === 0) {
      errors.push('Coluna A deve ter pelo menos um item');
    }
    
    if (!pergunta.coluna_b || pergunta.coluna_b.length === 0) {
      errors.push('Coluna B deve ter pelo menos um item');
    }
    
    if (!pergunta.resposta_correta || Object.keys(pergunta.resposta_correta).length === 0) {
      errors.push('Resposta correta deve ter pelo menos um par');
    }
    
    if (!pergunta.justificativa_resposta_certa?.trim()) {
      errors.push('Justificativa é obrigatória');
    }
    
    return errors;
  }
}