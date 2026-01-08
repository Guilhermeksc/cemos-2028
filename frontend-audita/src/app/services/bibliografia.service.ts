import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import {
  Materia,
  MateriaCreateUpdate,
  MateriaFilters,
  Bibliografia,
  BibliografiaCreateUpdate,
  BibliografiaFilters,
  CapituloBibliografia,
  CapituloBibliografiaCreateUpdate,
  CapituloBibliografiaFilters,
  PaginatedResponse
} from '../interfaces/bibliografia-models.interface';

@Injectable({
  providedIn: 'root'
})
export class BibliografiaService {
  // Nota: Se o app de bibliografia estiver incluído em outro endpoint (ex: /api/perguntas/),
  // ajuste esta URL conforme necessário
  private readonly apiUrl = `${environment.apiUrl}/bibliografia/api`;
  
  // BehaviorSubjects para cache e estado
  private materias$ = new BehaviorSubject<Materia[]>([]);
  private bibliografias$ = new BehaviorSubject<Bibliografia[]>([]);
  private loadingMaterias$ = new BehaviorSubject<boolean>(false);
  private loadingBibliografias$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  // Getters para observables
  get materias(): Observable<Materia[]> {
    return this.materias$.asObservable();
  }

  get bibliografias(): Observable<Bibliografia[]> {
    return this.bibliografias$.asObservable();
  }

  get loadingMaterias(): Observable<boolean> {
    return this.loadingMaterias$.asObservable();
  }

  get loadingBibliografias(): Observable<boolean> {
    return this.loadingBibliografias$.asObservable();
  }

  // ==================== MATÉRIAS ====================

  /**
   * Lista todas as matérias com filtros opcionais
   */
  getMaterias(filters?: MateriaFilters): Observable<PaginatedResponse<Materia>> {
    this.loadingMaterias$.next(true);
    
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<PaginatedResponse<Materia>>(`${this.apiUrl}/materias/`, { params })
      .pipe(
        tap(response => {
          this.materias$.next(response.results);
          this.loadingMaterias$.next(false);
        })
      );
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
  createMateria(materia: MateriaCreateUpdate): Observable<Materia> {
    return this.http.post<Materia>(`${this.apiUrl}/materias/`, materia);
  }

  /**
   * Atualiza uma matéria existente
   */
  updateMateria(id: number, materia: MateriaCreateUpdate): Observable<Materia> {
    return this.http.put<Materia>(`${this.apiUrl}/materias/${id}/`, materia);
  }

  /**
   * Atualiza parcialmente uma matéria
   */
  patchMateria(id: number, materia: Partial<MateriaCreateUpdate>): Observable<Materia> {
    return this.http.patch<Materia>(`${this.apiUrl}/materias/${id}/`, materia);
  }

  /**
   * Deleta uma matéria
   */
  deleteMateria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/materias/${id}/`);
  }

  /**
   * Busca TODAS as matérias usando paginação completa
   */
  getAllMaterias(filters?: MateriaFilters): Observable<Materia[]> {
    return this.getAllPaginatedResults<Materia>(
      (page: number, pageSize: number) => {
        const filtersWithPagination = { ...filters, page, page_size: pageSize };
        return this.getMaterias(filtersWithPagination);
      }
    );
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
   * Busca todos os capítulos de uma bibliografia específica
   */
  getCapitulosByBibliografia(id: number): Observable<CapituloBibliografia[]> {
    return this.http.get<CapituloBibliografia[]>(`${this.apiUrl}/bibliografias/${id}/capitulos/`);
  }

  /**
   * Cria uma nova bibliografia
   */
  createBibliografia(bibliografia: BibliografiaCreateUpdate): Observable<Bibliografia> {
    return this.http.post<Bibliografia>(`${this.apiUrl}/bibliografias/`, bibliografia);
  }

  /**
   * Atualiza uma bibliografia existente
   */
  updateBibliografia(id: number, bibliografia: BibliografiaCreateUpdate): Observable<Bibliografia> {
    return this.http.put<Bibliografia>(`${this.apiUrl}/bibliografias/${id}/`, bibliografia);
  }

  /**
   * Atualiza parcialmente uma bibliografia
   */
  patchBibliografia(id: number, bibliografia: Partial<BibliografiaCreateUpdate>): Observable<Bibliografia> {
    return this.http.patch<Bibliografia>(`${this.apiUrl}/bibliografias/${id}/`, bibliografia);
  }

  /**
   * Deleta uma bibliografia
   */
  deleteBibliografia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/bibliografias/${id}/`);
  }

  /**
   * Busca TODAS as bibliografias usando paginação completa
   */
  getAllBibliografias(filters?: BibliografiaFilters): Observable<Bibliografia[]> {
    return this.getAllPaginatedResults<Bibliografia>(
      (page: number, pageSize: number) => {
        const filtersWithPagination = { ...filters, page, page_size: pageSize };
        return this.getBibliografias(filtersWithPagination);
      }
    );
  }

  /**
   * Busca todas as bibliografias de uma matéria específica
   */
  getBibliografiasByMateria(materiaId: number): Observable<Bibliografia[]> {
    return this.getAllBibliografias({ materia: materiaId });
  }

  // ==================== CAPÍTULOS DE BIBLIOGRAFIA ====================

  /**
   * Lista todos os capítulos com filtros opcionais
   */
  getCapitulos(filters?: CapituloBibliografiaFilters): Observable<PaginatedResponse<CapituloBibliografia>> {
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<PaginatedResponse<CapituloBibliografia>>(`${this.apiUrl}/capitulos-bibliografia/`, { params });
  }

  /**
   * Busca um capítulo específico por ID
   */
  getCapitulo(id: number): Observable<CapituloBibliografia> {
    return this.http.get<CapituloBibliografia>(`${this.apiUrl}/capitulos-bibliografia/${id}/`);
  }

  /**
   * Cria um novo capítulo
   */
  createCapitulo(capitulo: CapituloBibliografiaCreateUpdate): Observable<CapituloBibliografia> {
    return this.http.post<CapituloBibliografia>(`${this.apiUrl}/capitulos-bibliografia/`, capitulo);
  }

  /**
   * Atualiza um capítulo existente
   */
  updateCapitulo(id: number, capitulo: CapituloBibliografiaCreateUpdate): Observable<CapituloBibliografia> {
    return this.http.put<CapituloBibliografia>(`${this.apiUrl}/capitulos-bibliografia/${id}/`, capitulo);
  }

  /**
   * Atualiza parcialmente um capítulo
   */
  patchCapitulo(id: number, capitulo: Partial<CapituloBibliografiaCreateUpdate>): Observable<CapituloBibliografia> {
    return this.http.patch<CapituloBibliografia>(`${this.apiUrl}/capitulos-bibliografia/${id}/`, capitulo);
  }

  /**
   * Deleta um capítulo
   */
  deleteCapitulo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/capitulos-bibliografia/${id}/`);
  }

  /**
   * Busca TODOS os capítulos usando paginação completa
   */
  getAllCapitulos(filters?: CapituloBibliografiaFilters): Observable<CapituloBibliografia[]> {
    return this.getAllPaginatedResults<CapituloBibliografia>(
      (page: number, pageSize: number) => {
        const filtersWithPagination = { ...filters, page, page_size: pageSize };
        return this.getCapitulos(filtersWithPagination);
      }
    );
  }

  // ==================== MÉTODOS PRIVADOS ====================

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

        console.log(`📄 Buscando página ${currentPage} (page_size: ${pageSize})...`);
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
}

