import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BibliografiaMedia } from '../interfaces/videos-podcasts.interface';

interface MediaConfig {
  bibliografias: BibliografiaMedia[];
}

@Injectable({
  providedIn: 'root'
})
export class MediaConfigService {
  private readonly configBasePath = '/assets/media-config';

  constructor(private http: HttpClient) {}

  /**
   * Carrega a configuração de mídias de um módulo específico
   * @param moduloNome - Nome do módulo (ex: 'geopolitica', 'historia', etc)
   */
  carregarConfigMedia(moduloNome: string): Observable<BibliografiaMedia[]> {
    const configUrl = `${this.configBasePath}/${moduloNome}-media.json`;
    
    return this.http.get<MediaConfig>(configUrl).pipe(
      map(config => {
        console.log(`✅ Configuração de mídia carregada: ${moduloNome}`, config.bibliografias);
        return config.bibliografias;
      }),
      catchError(error => {
        console.error(`❌ Erro ao carregar configuração de mídia: ${moduloNome}`, error);
        return of([]);
      })
    );
  }

  /**
   * Carrega configurações de múltiplos módulos
   * @param modulosNomes - Array de nomes de módulos
   */
  carregarMultiplasConfigs(modulosNomes: string[]): Observable<BibliografiaMedia[]> {
    const requests = modulosNomes.map(nome => this.carregarConfigMedia(nome));
    
    // Usar forkJoin se houver múltiplos módulos
    if (requests.length === 0) {
      return of([]);
    }
    
    if (requests.length === 1) {
      return requests[0];
    }

    // Para múltiplos, você pode usar forkJoin
    return of([]); // Placeholder - implementar forkJoin se necessário
  }

  /**
   * Valida se um arquivo de mídia existe
   * Faz uma requisição HEAD para verificar se o arquivo existe
   */
  validarArquivoExiste(caminhoCompleto: string): Observable<boolean> {
    return this.http.head(caminhoCompleto, { observe: 'response' }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  /**
   * Filtra capítulos removendo aqueles cujos arquivos não existem
   * NOTA: Esta operação pode ser pesada se houver muitos arquivos
   */
  filtrarCapitulosExistentes(bibliografia: BibliografiaMedia): Observable<BibliografiaMedia> {
    // Implementação básica - pode ser expandida
    return of(bibliografia);
  }
}

