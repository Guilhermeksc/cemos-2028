// Interfaces para o componente Bibliografia Completa

export interface LivroData {
  titulo: string;
  autor: string;
  descricao?: string;
  edicao?: string;
  ano?: number;
  editora?: string;
}

export interface VideoData {
  titulo: string;
  basePath: string;
  descricao?: string;
}

export interface PodcastPerguntasData {
  titulo: string;
  descricao: string;
  basePath: string;
}

export interface BibliografiaCompletaData {
  livro: LivroData;
  video: VideoData;
  podcastPerguntas: PodcastPerguntasData;
}

// Interfaces para conteúdo dinâmico
export interface VideoDinamico {
  id: string;
  titulo: string;
  arquivo: string;
  videoPath: string;
  descricao?: string;
  duracao?: string;
  thumbnail?: string;
}

export interface PerguntaDinamica {
  id: string;
  pergunta: string;
  resposta: string;
  categoria?: string;
  dificuldade?: 'facil' | 'medio' | 'dificil';
}

export interface PodcastPerguntasDinamico {
  id: string;
  titulo: string;
  arquivo?: string;
  perguntas: PerguntaDinamica[];
  descricao?: string;
  duracao?: string;
}

// Configuração de Bibliografia para diferentes módulos
export interface BibliografiaConfig {
  moduleId: string;
  moduleName: string;
  defaultData: BibliografiaCompletaData;
  customizations?: {
    showVideo?: boolean;
    showPodcast?: boolean;
    customTabs?: string[];
  };
}