// Interfaces para os modelos de informações

export interface Presidentes {
  id: number;
  bibliografia: number;
  bibliografia_titulo?: string;
  periodo_presidencial: string;
  presidente: string;
  pais: string;
  conflitos_principais?: string;
  imagem_caminho?: string;
}

export interface PresidentesCreateUpdate {
  bibliografia: number;
  periodo_presidencial: string;
  presidente: string;
  pais: string;
  conflitos_principais?: string;
  imagem_caminho?: string;
}

export interface Filosofos {
  id: number;
  bibliografia: number;
  bibliografia_titulo?: string;
  periodo_filosofico: string;
  nome: string;
  principais_ideias?: string;
  imagem_caminho?: string;
}

export interface FilosofosCreateUpdate {
  bibliografia: number;
  periodo_filosofico: string;
  nome: string;
  principais_ideias?: string;
  imagem_caminho?: string;
}

export interface Cronologia {
  id: number;
  bibliografia: number;
  bibliografia_titulo?: string;
  evento_conflito: string;
  periodo: string;
  principais_forcas?: string;
  resultado?: string;
  consequencias?: string;
}

export interface CronologiaCreateUpdate {
  bibliografia: number;
  evento_conflito: string;
  periodo: string;
  principais_forcas?: string;
  resultado?: string;
  consequencias?: string;
}

export interface Conceitos {
  id: number;
  bibliografia: number;
  bibliografia_titulo?: string;
  titulo: string;
  palavra_chave?: string;
  assunto?: string;
  descricao?: string;
  caiu_em_prova: boolean;
  ano_prova?: number;
}

export interface ConceitosCreateUpdate {
  bibliografia: number;
  titulo: string;
  descricao?: string;
  caiu_em_prova: boolean;
  ano_prova?: number;
}

export interface Hiperlinks {
  id: number;
  bibliografia: number;
  bibliografia_titulo?: string;
  tipo: 'pdf' | 'mp4' | 'mp3' | 'docx' | 'xlsx';
  descricao?: string;
  url: string;
}

export interface HiperlinksCreateUpdate {
  bibliografia: number;
  tipo: 'pdf' | 'mp4' | 'mp3' | 'docx' | 'xlsx';
  descricao?: string;
  url: string;
}

// Tipos para filtros e parâmetros de busca
export interface InformacoesFilters {
  bibliografia?: number;
  search?: string;
  ordering?: string;
}

export interface PresidentesFilters extends InformacoesFilters {
  periodo_presidencial?: string;
  pais?: string;
}

export interface FilosofosFilters extends InformacoesFilters {
  periodo_filosofico?: string;
}

export interface CronologiaFilters extends InformacoesFilters {
  periodo?: string;
}

export interface ConceitosFilters extends InformacoesFilters {
  caiu_em_prova?: boolean;
  ano_prova?: number;
}

export interface HiperlinksFilters extends InformacoesFilters {
  tipo?: string;
}