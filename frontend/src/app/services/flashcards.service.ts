import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import {
  FlashCards,
  FlashCardsFilters,
  PaginatedResponse,
  EstatisticasFlashCards
} from '../interfaces/perguntas.interface';

@Injectable({
  providedIn: 'root'
})
export class FlashCardsService {
  private readonly apiUrl = `${environment.apiUrl}/perguntas/api`;
  
  // BehaviorSubjects para cache e estado
  private flashcards$ = new BehaviorSubject<FlashCards[]>([]);
  private loadingFlashCards$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  // Getters para observables
  get flashcards(): Observable<FlashCards[]> {
    return this.flashcards$.asObservable();
  }

  get loadingFlashCards(): Observable<boolean> {
    return this.loadingFlashCards$.asObservable();
  }

  // ==================== FLASHCARDS ====================

  /**
   * Lista todos os flashcards com filtros opcionais
   */
  getFlashCards(filters?: FlashCardsFilters): Observable<PaginatedResponse<FlashCards>> {
    this.loadingFlashCards$.next(true);
    
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<PaginatedResponse<FlashCards>>(`${this.apiUrl}/flashcards/`, { params })
      .pipe(
        tap(response => {
          this.flashcards$.next(response.results);
          this.loadingFlashCards$.next(false);
        })
      );
  }

  /**
   * Busca um flashcard específico por ID
   */
  getFlashCard(id: number): Observable<FlashCards> {
    return this.http.get<FlashCards>(`${this.apiUrl}/flashcards/${id}/`);
  }

  /**
   * Busca todos os flashcards de uma bibliografia específica
   */
  getFlashCardsByBibliografia(id: number): Observable<FlashCards[]> {
    return this.http.get<FlashCards[]>(`${this.apiUrl}/bibliografias/${id}/flashcards/`);
  }

  /**
   * Cria um novo flashcard
   */
  createFlashCard(flashcard: Partial<FlashCards>): Observable<FlashCards> {
    return this.http.post<FlashCards>(`${this.apiUrl}/flashcards/`, flashcard);
  }

  /**
   * Atualiza um flashcard existente
   */
  updateFlashCard(id: number, flashcard: Partial<FlashCards>): Observable<FlashCards> {
    return this.http.put<FlashCards>(`${this.apiUrl}/flashcards/${id}/`, flashcard);
  }

  /**
   * Atualiza parcialmente um flashcard
   */
  patchFlashCard(id: number, flashcard: Partial<FlashCards>): Observable<FlashCards> {
    return this.http.patch<FlashCards>(`${this.apiUrl}/flashcards/${id}/`, flashcard);
  }

  /**
   * Deleta um flashcard
   */
  deleteFlashCard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/flashcards/${id}/`);
  }

  // ==================== MÉTODOS UTILITÁRIOS ====================

  /**
   * Busca todos os flashcards (sem paginação)
   */
  getAllFlashCards(): Observable<FlashCards[]> {
    return this.getFlashCards({ page_size: 10000 }).pipe(
      map(response => response.results)
    );
  }

  /**
   * Gera estatísticas gerais de flashcards
   */
  getEstatisticasFlashCards(): Observable<EstatisticasFlashCards> {
    return this.getAllFlashCards().pipe(
      map(flashcards => ({
        total_flashcards: flashcards.length,
        flashcards_por_assunto: this.groupByAssunto(flashcards),
        flashcards_por_bibliografia: this.groupByBibliografia(flashcards),
        flashcards_que_cairam_prova: flashcards.filter(f => f.prova).length,
        flashcards_por_ano: this.groupByAno(flashcards),
        anos_prova: [...new Set(flashcards.filter(f => f.ano).map(f => f.ano!))]
          .sort((a, b) => b - a)
      }))
    );
  }

  /**
   * Agrupa flashcards por assunto
   */
  getFlashCardsByAssunto(assunto: string): Observable<FlashCards[]> {
    return this.getFlashCards({ assunto }).pipe(
      map(response => response.results)
    );
  }

  /**
   * Busca flashcards por texto (pergunta ou resposta)
   */
  searchFlashCards(searchTerm: string): Observable<FlashCards[]> {
    return this.getFlashCards({ search: searchTerm }).pipe(
      map(response => response.results)
    );
  }

  /**
   * Retorna lista única de assuntos
   */
  getAssuntos(): Observable<string[]> {
    return this.getAllFlashCards().pipe(
      map(flashcards => {
        const assuntos = flashcards
          .map(f => f.assunto)
          .filter((assunto): assunto is string => !!assunto);
        return [...new Set(assuntos)].sort();
      })
    );
  }

  /**
   * Busca flashcards que caíram em prova
   */
  getFlashCardsComProva(): Observable<FlashCards[]> {
    return this.getFlashCards({ prova: true }).pipe(
      map(response => response.results)
    );
  }

  /**
   * Busca flashcards por ano
   */
  getFlashCardsByAno(ano: number): Observable<FlashCards[]> {
    return this.getFlashCards({ ano }).pipe(
      map(response => response.results)
    );
  }

  /**
   * Retorna lista única de anos
   */
  getAnos(): Observable<number[]> {
    return this.getAllFlashCards().pipe(
      map(flashcards => {
        const anos = flashcards
          .map(f => f.ano)
          .filter((ano): ano is number => ano !== undefined);
        return [...new Set(anos)].sort((a, b) => b - a);
      })
    );
  }

  // ==================== MÉTODOS PRIVADOS ====================

  private groupByAssunto(flashcards: FlashCards[]): { [assunto: string]: number } {
    return flashcards.reduce((acc, flashcard) => {
      const assunto = flashcard.assunto || 'Sem Assunto';
      acc[assunto] = (acc[assunto] || 0) + 1;
      return acc;
    }, {} as { [assunto: string]: number });
  }

  private groupByBibliografia(flashcards: FlashCards[]): { [bibliografia: string]: number } {
    return flashcards.reduce((acc, flashcard) => {
      const bibliografia = flashcard.bibliografia_titulo || 'Desconhecido';
      acc[bibliografia] = (acc[bibliografia] || 0) + 1;
      return acc;
    }, {} as { [bibliografia: string]: number });
  }

  private groupByAno(flashcards: FlashCards[]): { [ano: string]: number } {
    return flashcards.reduce((acc, flashcard) => {
      if (flashcard.ano) {
        const ano = flashcard.ano.toString();
        acc[ano] = (acc[ano] || 0) + 1;
      }
      return acc;
    }, {} as { [ano: string]: number });
  }
}
