import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Bibliografia } from '../interfaces/perguntas.interface';

export interface BibliografiaItem {
  id: number;
  titulo: string;
  autor: string;
  materia: string;
  descricao: string;
}

export interface MateriaBibliografia {
  materia: string;
  itens: BibliografiaItem[];
}

@Injectable({
  providedIn: 'root'
})
export class BibliografiaIdService {
  private readonly apiUrl = `${environment.apiUrl}/perguntas/api`;

  constructor(private http: HttpClient) {}

  /**
   * Carrega todas as bibliografias e agrupa por matéria
   */
  getBibliografiasGroupedByMateria(): Observable<MateriaBibliografia[]> {
    return this.http.get<{ results: Bibliografia[] }>(`${this.apiUrl}/bibliografias/`).pipe(
      map(response => {
        // Agrupar bibliografias por matéria
        const grouped: { [materia: string]: BibliografiaItem[] } = {};
        
        response.results.forEach(bib => {
          const materia = bib.materia_nome || 'Sem Matéria';
          if (!grouped[materia]) {
            grouped[materia] = [];
          }
          
          grouped[materia].push({
            id: bib.id,
            titulo: bib.titulo,
            autor: bib.autor || '',
            materia: bib.materia_nome || '',
            descricao: bib.descricao || ''
          });
        });

        // Converter para array e ordenar
        return Object.entries(grouped)
          .map(([materia, itens]) => ({
            materia,
            itens: itens.sort((a, b) => a.id - b.id)
          }))
          .sort((a, b) => a.materia.localeCompare(b.materia));
      })
    );
  }

  /**
   * Carrega uma bibliografia específica por ID
   */
  getBibliografiaById(id: number): Observable<BibliografiaItem> {
    return this.http.get<Bibliografia>(`${this.apiUrl}/bibliografias/${id}/`).pipe(
      map(bib => ({
        id: bib.id,
        titulo: bib.titulo,
        autor: bib.autor || '',
        materia: bib.materia_nome || '',
        descricao: bib.descricao || ''
      }))
    );
  }
}
