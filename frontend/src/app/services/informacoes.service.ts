import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Bibliografia } from '../interfaces/perguntas.interface';
import {
  Presidentes,
  PresidentesCreateUpdate,
  PresidentesFilters,
  Filosofos,
  FilosofosCreateUpdate,
  FilosofosFilters,
  Cronologia,
  CronologiaCreateUpdate,
  CronologiaFilters,
  Conceitos,
  ConceitosCreateUpdate,
  ConceitosFilters,
  Hiperlinks,
  HiperlinksCreateUpdate,
  HiperlinksFilters
} from '../interfaces/informacoes.interface';

interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

@Injectable({
  providedIn: 'root'
})
export class InformacoesService {
  private apiUrl = `${environment.apiUrl}/informacoes`;

  constructor(private http: HttpClient) {}

  // =========================
  // PRESIDENTES
  // =========================
  
  getPresidentes(filters?: PresidentesFilters): Observable<ApiResponse<Presidentes>> {
    let params = new HttpParams();
    
    if (filters) {
      if (filters.bibliografia) params = params.set('bibliografia', filters.bibliografia.toString());
      if (filters.periodo_presidencial) params = params.set('periodo_presidencial', filters.periodo_presidencial);
      if (filters.search) params = params.set('search', filters.search);
      if (filters.ordering) params = params.set('ordering', filters.ordering);
    }
    
    return this.http.get<ApiResponse<Presidentes>>(`${this.apiUrl}/presidentes/`, { params });
  }

  getPresidente(id: number): Observable<Presidentes> {
    return this.http.get<Presidentes>(`${this.apiUrl}/presidentes/${id}/`);
  }

  createPresidente(data: PresidentesCreateUpdate): Observable<Presidentes> {
    return this.http.post<Presidentes>(`${this.apiUrl}/presidentes/`, data);
  }

  updatePresidente(id: number, data: PresidentesCreateUpdate): Observable<Presidentes> {
    return this.http.put<Presidentes>(`${this.apiUrl}/presidentes/${id}/`, data);
  }

  patchPresidente(id: number, data: Partial<PresidentesCreateUpdate>): Observable<Presidentes> {
    return this.http.patch<Presidentes>(`${this.apiUrl}/presidentes/${id}/`, data);
  }

  deletePresidente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/presidentes/${id}/`);
  }

  // =========================
  // FILÓSOFOS
  // =========================
  
  getFilosofos(filters?: FilosofosFilters): Observable<ApiResponse<Filosofos>> {
    let params = new HttpParams();
    
    if (filters) {
      if (filters.bibliografia) params = params.set('bibliografia', filters.bibliografia.toString());
      if (filters.periodo_filosofico) params = params.set('periodo_filosofico', filters.periodo_filosofico);
      if (filters.search) params = params.set('search', filters.search);
      if (filters.ordering) params = params.set('ordering', filters.ordering);
    }
    
    return this.http.get<ApiResponse<Filosofos>>(`${this.apiUrl}/filosofos/`, { params });
  }

  getFilosofo(id: number): Observable<Filosofos> {
    return this.http.get<Filosofos>(`${this.apiUrl}/filosofos/${id}/`);
  }

  createFilosofo(data: FilosofosCreateUpdate): Observable<Filosofos> {
    return this.http.post<Filosofos>(`${this.apiUrl}/filosofos/`, data);
  }

  updateFilosofo(id: number, data: FilosofosCreateUpdate): Observable<Filosofos> {
    return this.http.put<Filosofos>(`${this.apiUrl}/filosofos/${id}/`, data);
  }

  patchFilosofo(id: number, data: Partial<FilosofosCreateUpdate>): Observable<Filosofos> {
    return this.http.patch<Filosofos>(`${this.apiUrl}/filosofos/${id}/`, data);
  }

  deleteFilosofo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/filosofos/${id}/`);
  }

  // =========================
  // CRONOLOGIA
  // =========================
  
  getCronologias(filters?: CronologiaFilters): Observable<ApiResponse<Cronologia>> {
    let params = new HttpParams();
    
    if (filters) {
      if (filters.bibliografia) params = params.set('bibliografia', filters.bibliografia.toString());
      if (filters.periodo) params = params.set('periodo', filters.periodo);
      if (filters.search) params = params.set('search', filters.search);
      if (filters.ordering) params = params.set('ordering', filters.ordering);
    }
    
    return this.http.get<ApiResponse<Cronologia>>(`${this.apiUrl}/cronologia/`, { params });
  }

  getCronologia(id: number): Observable<Cronologia> {
    return this.http.get<Cronologia>(`${this.apiUrl}/cronologia/${id}/`);
  }

  createCronologia(data: CronologiaCreateUpdate): Observable<Cronologia> {
    return this.http.post<Cronologia>(`${this.apiUrl}/cronologia/`, data);
  }

  updateCronologia(id: number, data: CronologiaCreateUpdate): Observable<Cronologia> {
    return this.http.put<Cronologia>(`${this.apiUrl}/cronologia/${id}/`, data);
  }

  patchCronologia(id: number, data: Partial<CronologiaCreateUpdate>): Observable<Cronologia> {
    return this.http.patch<Cronologia>(`${this.apiUrl}/cronologia/${id}/`, data);
  }

  deleteCronologia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cronologia/${id}/`);
  }

  // =========================
  // CONCEITOS
  // =========================
  
  getConceitos(filters?: ConceitosFilters): Observable<ApiResponse<Conceitos>> {
    let params = new HttpParams();
    
    if (filters) {
      if (filters.bibliografia) params = params.set('bibliografia', filters.bibliografia.toString());
      if (filters.caiu_em_prova !== undefined) params = params.set('caiu_em_prova', filters.caiu_em_prova.toString());
      if (filters.ano_prova) params = params.set('ano_prova', filters.ano_prova.toString());
      if (filters.search) params = params.set('search', filters.search);
      if (filters.ordering) params = params.set('ordering', filters.ordering);
    }
    
    return this.http.get<ApiResponse<Conceitos>>(`${this.apiUrl}/conceitos/`, { params });
  }

  getConceito(id: number): Observable<Conceitos> {
    return this.http.get<Conceitos>(`${this.apiUrl}/conceitos/${id}/`);
  }

  createConceito(data: ConceitosCreateUpdate): Observable<Conceitos> {
    return this.http.post<Conceitos>(`${this.apiUrl}/conceitos/`, data);
  }

  updateConceito(id: number, data: ConceitosCreateUpdate): Observable<Conceitos> {
    return this.http.put<Conceitos>(`${this.apiUrl}/conceitos/${id}/`, data);
  }

  patchConceito(id: number, data: Partial<ConceitosCreateUpdate>): Observable<Conceitos> {
    return this.http.patch<Conceitos>(`${this.apiUrl}/conceitos/${id}/`, data);
  }

  deleteConceito(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/conceitos/${id}/`);
  }

  // =========================
  // HIPERLINKS
  // =========================
  
  getHiperlinks(filters?: HiperlinksFilters): Observable<ApiResponse<Hiperlinks>> {
    let params = new HttpParams();
    
    if (filters) {
      if (filters.bibliografia) params = params.set('bibliografia', filters.bibliografia.toString());
      if (filters.tipo) params = params.set('tipo', filters.tipo);
      if (filters.search) params = params.set('search', filters.search);
      if (filters.ordering) params = params.set('ordering', filters.ordering);
    }
    
    return this.http.get<ApiResponse<Hiperlinks>>(`${this.apiUrl}/hiperlinks/`, { params });
  }

  getHiperlink(id: number): Observable<Hiperlinks> {
    return this.http.get<Hiperlinks>(`${this.apiUrl}/hiperlinks/${id}/`);
  }

  createHiperlink(data: HiperlinksCreateUpdate): Observable<Hiperlinks> {
    return this.http.post<Hiperlinks>(`${this.apiUrl}/hiperlinks/`, data);
  }

  updateHiperlink(id: number, data: HiperlinksCreateUpdate): Observable<Hiperlinks> {
    return this.http.put<Hiperlinks>(`${this.apiUrl}/hiperlinks/${id}/`, data);
  }

  patchHiperlink(id: number, data: Partial<HiperlinksCreateUpdate>): Observable<Hiperlinks> {
    return this.http.patch<Hiperlinks>(`${this.apiUrl}/hiperlinks/${id}/`, data);
  }

  deleteHiperlink(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/hiperlinks/${id}/`);
  }
}