
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
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