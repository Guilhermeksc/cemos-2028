
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import {
  Bibliografia,
  BibliografiaFilters,
  PerguntaMultipla,
  PerguntaMultiplaFilters,
  PerguntaVF,
  PerguntaVFFilters,
  PerguntaCorrelacao,
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
   * NOTA: Usa o endpoint do app bibliografia, não do app perguntas
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

    // Usar endpoint do app bibliografia: /api/bibliografia/api/bibliografias/
    const bibliografiaApiUrl = `${environment.apiUrl}/bibliografia/api`;
    return this.http.get<PaginatedResponse<Bibliografia>>(`${bibliografiaApiUrl}/bibliografias/`, { params })
      .pipe(
        tap(response => {
          this.bibliografias$.next(response.results);
          this.loadingBibliografias$.next(false);
        })
      );
  }

  /**
   * Busca uma bibliografia específica por ID
   * NOTA: Usa o endpoint do app bibliografia, não do app perguntas
   */
  getBibliografia(id: number): Observable<Bibliografia> {
    // Usar endpoint do app bibliografia: /api/bibliografia/api/bibliografias/
    const bibliografiaApiUrl = `${environment.apiUrl}/bibliografia/api`;
    return this.http.get<Bibliografia>(`${bibliografiaApiUrl}/bibliografias/${id}/`);
  }

  /**
   * Busca todas as perguntas de uma bibliografia específica
   * NOTA: Este método foi substituído por getAllPerguntasMultipla, getAllPerguntasVF e getAllPerguntasCorrelacao
   * com filtro de bibliografia. Mantido apenas para compatibilidade.
   * @deprecated Use getAllPerguntasMultipla, getAllPerguntasVF e getAllPerguntasCorrelacao com filtro de bibliografia
   */
  getPerguntasByBibliografia(id: number): Observable<PerguntaResumo[]> {
    // Usar os métodos corretos que buscam todas as perguntas com filtro de bibliografia
    return forkJoin({
      multiplas: this.getAllPerguntasMultipla({ bibliografia: id }),
      vfs: this.getAllPerguntasVF({ bibliografia: id }),
      correlacoes: this.getAllPerguntasCorrelacao({ bibliografia: id })
    }).pipe(
      map(results => {
        const todasPerguntas: PerguntaResumo[] = [
          ...results.multiplas.map(p => this.mapToPerguntaResumo(p)),
          ...results.vfs.map(p => this.mapToPerguntaResumo(p)),
          ...results.correlacoes.map(p => this.mapToPerguntaResumo(p))
        ];
        return todasPerguntas;
      })
    );
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

  // ==================== MÉTODOS PARA BUSCAR TODAS AS PERGUNTAS (PAGINAÇÃO COMPLETA) ====================

  /**
   * Busca TODAS as perguntas de múltipla escolha usando paginação completa
   * Itera por todas as páginas até obter todas as perguntas disponíveis
   */
  getAllPerguntasMultipla(filters?: PerguntaMultiplaFilters): Observable<PerguntaMultipla[]> {
    return this.getAllPaginatedResults<PerguntaMultipla>(
      (page: number, pageSize: number) => {
        const filtersWithPagination = { ...filters, page, page_size: pageSize };
        return this.getPerguntasMultipla(filtersWithPagination);
      }
    );
  }

  /**
   * Busca TODAS as perguntas V/F usando paginação completa
   * Itera por todas as páginas até obter todas as perguntas disponíveis
   */
  getAllPerguntasVF(filters?: PerguntaVFFilters): Observable<PerguntaVF[]> {
    return this.getAllPaginatedResults<PerguntaVF>(
      (page: number, pageSize: number) => {
        const filtersWithPagination = { ...filters, page, page_size: pageSize };
        return this.getPerguntasVF(filtersWithPagination);
      }
    );
  }

  /**
   * Busca TODAS as perguntas de correlação usando paginação completa
   * Itera por todas as páginas até obter todas as perguntas disponíveis
   */
  getAllPerguntasCorrelacao(filters?: PerguntaFilters): Observable<PerguntaCorrelacao[]> {
    return this.getAllPaginatedResults<PerguntaCorrelacao>(
      (page: number, pageSize: number) => {
        const filtersWithPagination = { ...filters, page, page_size: pageSize };
        return this.getPerguntasCorrelacao(filtersWithPagination);
      }
    );
  }

  /**
   * Método genérico para buscar todos os resultados paginados
   * Faz requisições sequenciais até obter todas as páginas
   */
  private getAllPaginatedResults<T>(
    fetchPage: (page: number, pageSize: number) => Observable<PaginatedResponse<T>>,
    pageSize: number = 100
  ): Observable<T[]> {
    return new Observable(observer => {
      const allResults: T[] = [];
      let currentPage = 1;
      let hasMore = true;

      const fetchNextPage = () => {
        if (!hasMore) {
          console.log(`✅ Paginação completa: ${allResults.length} resultados obtidos`);
          observer.next(allResults);
          observer.complete();
          return;
        }

        fetchPage(currentPage, pageSize).subscribe({
          next: (response) => {
            const pageResults = response.results || [];
            allResults.push(...pageResults);
            
            console.log(`📄 Página ${currentPage} recebida: ${pageResults.length} resultados (total acumulado: ${allResults.length})`);
            
            // Verificar se há mais páginas
            if (response.next) {
              currentPage++;
              fetchNextPage();
            } else {
              hasMore = false;
              console.log(`✅ Paginação completa: ${allResults.length} resultados obtidos em ${currentPage} página(s)`);
              observer.next(allResults);
              observer.complete();
            }
          },
          error: (error) => {
            console.error(`❌ Erro ao buscar página ${currentPage}:`, error);
            observer.error(error);
          }
        });
      };

      fetchNextPage();
    });
  }

  // ==================== MÉTODOS UTILITÁRIOS ====================

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
      assunto: pergunta.assunto,
      assunto_titulo: pergunta.assunto_titulo || null,
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

}