import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservabilityService {
  private telemetryUrl = `${environment.apiUrl}/telemetry/pdf-download/`;

  constructor(private http: HttpClient) {}

  trackPdfDownload(event: PdfDownloadEvent): void {
    const payload = {
      simulado_nome: event.simuladoNome,
      origem: event.origem ?? 'desconhecida',
      bibliografias: event.bibliografias ?? [],
      total_questoes: event.totalQuestoes ?? 0,
    };

    this.http.post(this.telemetryUrl, payload).pipe(
      catchError((error) => {
        console.warn('[Observability] Falha ao enviar evento de PDF', error);
        return of(null);
      })
    ).subscribe();
  }
}

export interface PdfDownloadEvent {
  simuladoNome: string;
  origem?: 'preset' | 'custom' | 'desconhecida';
  bibliografias?: number[];
  totalQuestoes?: number;
}
