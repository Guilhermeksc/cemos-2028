// Interface para capítulos de vídeos e podcasts

export interface Capitulo {
  id: number;
  titulo: string;
  descricao?: string;
  videoPath?: string;  // Caminho relativo do vídeo MP4
  audioPath?: string;  // Caminho relativo do áudio MP3/WAV
  duracao?: string;    // Ex: "45:30"
  ordem?: number;      // Ordem de exibição
}

export interface BibliografiaMedia {
  bibliografiaId: number;
  bibliografiaTitulo?: string;
  caminho: string;      // Caminho variado por parâmetro
  capitulos: Capitulo[];
}

export interface MediaPaths {
  videosBasePath: string;
  audiosBasePath: string;
}

export interface MediaFilters {
  bibliografiaId?: number;
  search?: string;
}

export enum MediaType {
  VIDEO = 'video',
  AUDIO = 'audio'
}

export enum TabType {
  VIDEOS = 'videos',
  PODCASTS = 'podcasts'
}

