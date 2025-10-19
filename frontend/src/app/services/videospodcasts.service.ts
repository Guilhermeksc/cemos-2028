import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import {
  Capitulo,
  BibliografiaMedia,
  MediaPaths,
  MediaType,
  MediaFilters
} from '../interfaces/videos-podcasts.interface';

@Injectable({
  providedIn: 'root'
})
export class VideosPodcastsService {
  private readonly mediasBasePath = environment.mediasBasePath;
  private readonly isProduction = environment.production;
  
  // BehaviorSubjects para gerenciar estado
  private bibliografiasMedia$ = new BehaviorSubject<BibliografiaMedia[]>([]);
  private loadingMedia$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  // Getters para observables
  get bibliografiasMedia(): Observable<BibliografiaMedia[]> {
    return this.bibliografiasMedia$.asObservable();
  }

  get loadingMedia(): Observable<boolean> {
    return this.loadingMedia$.asObservable();
  }

  /**
   * Constrói o caminho completo para um arquivo de mídia
   * @param caminho - Caminho variado por parâmetro (ex: 'geopolitica/modulo1')
   * @param tipo - Tipo de mídia (video ou audio)
   * @param nomeArquivo - Nome do arquivo com extensão
   * @returns Caminho completo do arquivo (URL HTTP)
   */
  construirCaminhoMidia(caminho: string, tipo: MediaType, nomeArquivo: string): string {
    const tipoPasta = tipo === MediaType.VIDEO ? 'video' : 'audio';
    
    // Normalizar caminho para usar sempre / (barras normais para URLs)
    const caminhoNormalizado = caminho.replace(/\\/g, '/');
    
    // Construir URL HTTP (funciona tanto em dev quanto em produção)
    return `${this.mediasBasePath}/${caminhoNormalizado}/${tipoPasta}/${nomeArquivo}`;
  }

  /**
   * Retorna os caminhos base para vídeos e áudios
   * @param caminho - Caminho variado por parâmetro
   */
  obterCaminhosBiblografia(caminho: string): MediaPaths {
    // Normalizar caminho para usar sempre /
    const caminhoNormalizado = caminho.replace(/\\/g, '/');
    
    const videosPath = `${this.mediasBasePath}/${caminhoNormalizado}/video`;
    const audiosPath = `${this.mediasBasePath}/${caminhoNormalizado}/audio`;

    return {
      videosBasePath: videosPath,
      audiosBasePath: audiosPath
    };
  }

  /**
   * Carrega capítulos de uma bibliografia específica
   * @param bibliografiaMedia - Dados da bibliografia com capítulos
   */
  carregarCapitulos(bibliografiaMedia: BibliografiaMedia): Observable<Capitulo[]> {
    this.loadingMedia$.next(true);
    
    // Processar capítulos adicionando caminhos completos
    const capitulosProcessados = bibliografiaMedia.capitulos.map(capitulo => ({
      ...capitulo,
      videoPath: capitulo.videoPath 
        ? this.construirCaminhoMidia(bibliografiaMedia.caminho, MediaType.VIDEO, capitulo.videoPath)
        : undefined,
      audioPath: capitulo.audioPath
        ? this.construirCaminhoMidia(bibliografiaMedia.caminho, MediaType.AUDIO, capitulo.audioPath)
        : undefined
    }));

    this.loadingMedia$.next(false);
    return of(capitulosProcessados);
  }

  /**
   * Carrega todas as mídias de múltiplas bibliografias
   * @param bibliografias - Array de bibliografias com capítulos
   */
  carregarBibliografiasMedia(bibliografias: BibliografiaMedia[]): Observable<BibliografiaMedia[]> {
    this.loadingMedia$.next(true);
    
    // Processar todas as bibliografias
    const bibliografiasProcessadas = bibliografias.map(bib => ({
      ...bib,
      capitulos: bib.capitulos.map(capitulo => ({
        ...capitulo,
        videoPath: capitulo.videoPath 
          ? this.construirCaminhoMidia(bib.caminho, MediaType.VIDEO, capitulo.videoPath)
          : undefined,
        audioPath: capitulo.audioPath
          ? this.construirCaminhoMidia(bib.caminho, MediaType.AUDIO, capitulo.audioPath)
          : undefined
      }))
    }));

    this.bibliografiasMedia$.next(bibliografiasProcessadas);
    this.loadingMedia$.next(false);
    
    return of(bibliografiasProcessadas);
  }

  /**
   * Filtra capítulos por termo de busca
   * @param capitulos - Lista de capítulos
   * @param searchTerm - Termo de busca
   */
  filtrarCapitulos(capitulos: Capitulo[], searchTerm: string): Capitulo[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return capitulos;
    }

    const termo = searchTerm.toLowerCase().trim();
    return capitulos.filter(capitulo => 
      capitulo.titulo.toLowerCase().includes(termo) ||
      capitulo.descricao?.toLowerCase().includes(termo)
    );
  }

  /**
   * Ordena capítulos por ordem ou título
   * @param capitulos - Lista de capítulos
   * @param ordenarPor - Campo de ordenação
   */
  ordenarCapitulos(capitulos: Capitulo[], ordenarPor: 'ordem' | 'titulo' = 'ordem'): Capitulo[] {
    return [...capitulos].sort((a, b) => {
      if (ordenarPor === 'ordem') {
        return (a.ordem || 0) - (b.ordem || 0);
      } else {
        return a.titulo.localeCompare(b.titulo);
      }
    });
  }

  /**
   * Valida se um arquivo de mídia existe
   * Nota: Esta é uma implementação básica. Em produção, você pode querer
   * fazer uma verificação real com o backend
   */
  validarArquivoMidia(caminho: string): Observable<boolean> {
    // Em um cenário real, você faria uma chamada HTTP para verificar
    // Por enquanto, apenas retorna true
    return of(true);
  }

  /**
   * Obtém estatísticas das mídias
   */
  obterEstatisticas(bibliografias: BibliografiaMedia[]): {
    totalCapitulos: number;
    totalVideos: number;
    totalAudios: number;
    bibliografiasComMedia: number;
  } {
    let totalCapitulos = 0;
    let totalVideos = 0;
    let totalAudios = 0;

    bibliografias.forEach(bib => {
      totalCapitulos += bib.capitulos.length;
      bib.capitulos.forEach(cap => {
        if (cap.videoPath) totalVideos++;
        if (cap.audioPath) totalAudios++;
      });
    });

    return {
      totalCapitulos,
      totalVideos,
      totalAudios,
      bibliografiasComMedia: bibliografias.length
    };
  }

  /**
   * Formata duração de tempo (segundos para MM:SS ou HH:MM:SS)
   */
  formatarDuracao(segundos: number): string {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;

    if (horas > 0) {
      return `${horas}:${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
    } else {
      return `${minutos}:${segs.toString().padStart(2, '0')}`;
    }
  }

  /**
   * Limpa o cache de mídias
   */
  limparCache(): void {
    this.bibliografiasMedia$.next([]);
  }
}

