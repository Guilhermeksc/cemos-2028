// Interfaces para o sistema de perguntas

export interface Bibliografia {
  id: number;
  titulo: string;
  autor?: string;
  materia?: string;
  descricao?: string;
  perguntas_count?: number;
}

export interface BibliografiaCreateUpdate {
  id?: number;
  titulo: string;
  autor?: string;
  materia?: string;
  descricao?: string;
}

// Interface base para perguntas (não utilizada diretamente, apenas para referência)
export interface PerguntaBase {
  id: number;
  bibliografia: number;
  bibliografia_titulo?: string;
  paginas?: string;
  caiu_em_prova: boolean;
  ano_prova?: number;
  pergunta: string;
  justificativa_resposta_certa: string;
  tipo: 'multipla' | 'vf' | 'correlacao';
  tipo_display?: string;
}

// Pergunta de Múltipla Escolha
export interface PerguntaMultipla extends PerguntaBase {
  tipo: 'multipla';
  alternativa_a: string;
  alternativa_b: string;
  alternativa_c: string;
  alternativa_d: string;
  resposta_correta: 'a' | 'b' | 'c' | 'd';
  resposta_correta_display?: string;
}

export interface PerguntaMultiplaCreateUpdate {
  bibliografia: number;
  paginas?: string;
  caiu_em_prova: boolean;
  ano_prova?: number;
  pergunta: string;
  alternativa_a: string;
  alternativa_b: string;
  alternativa_c: string;
  alternativa_d: string;
  resposta_correta: 'a' | 'b' | 'c' | 'd';
  justificativa_resposta_certa: string;
}

// Pergunta Verdadeiro ou Falso
export interface PerguntaVF extends PerguntaBase {
  tipo: 'vf';
  afirmacao: string;
  resposta_correta: boolean;
  resposta_correta_display?: string;
}

export interface PerguntaVFCreateUpdate {
  bibliografia: number;
  paginas?: string;
  caiu_em_prova: boolean;
  ano_prova?: number;
  pergunta: string;
  afirmacao: string;
  resposta_correta: boolean;
  justificativa_resposta_certa: string;
}

// Pergunta de Correlação
export interface PerguntaCorrelacao extends PerguntaBase {
  tipo: 'correlacao';
  coluna_a: string[];
  coluna_b: string[];
  resposta_correta: { [key: string]: string };
}

export interface PerguntaCorrelacaoCreateUpdate {
  bibliografia: number;
  paginas?: string;
  caiu_em_prova: boolean;
  ano_prova?: number;
  pergunta: string;
  coluna_a: string[];
  coluna_b: string[];
  resposta_correta: { [key: string]: string };
  justificativa_resposta_certa: string;
}

// Interface para resumo de perguntas (usado em listagens)
export interface PerguntaResumo {
  id: number;
  tipo: 'multipla' | 'vf' | 'correlacao';
  tipo_display: string;
  bibliografia_titulo: string;
  pergunta: string;
  paginas?: string;
  caiu_em_prova: boolean;
  ano_prova?: number;
}

// Union type para todos os tipos de pergunta
export type Pergunta = PerguntaMultipla | PerguntaVF | PerguntaCorrelacao;

// Interfaces para filtros e consultas
export interface BibliografiaFilters {
  search?: string;
  autor?: string;
  materia?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
}

export interface PerguntaFilters {
  search?: string;
  bibliografia?: number;
  caiu_em_prova?: boolean;
  ano_prova?: number;
  ordering?: string;
  page?: number;
  page_size?: number;
}

export interface PerguntaMultiplaFilters extends PerguntaFilters {
  resposta_correta?: 'a' | 'b' | 'c' | 'd';
}

export interface PerguntaVFFilters extends PerguntaFilters {
  resposta_correta?: boolean;
}

// Interface para resposta paginada da API
export interface PaginatedResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

// Interfaces para estatísticas
export interface EstatisticasBibliografia {
  total_perguntas: number;
  perguntas_multipla: number;
  perguntas_vf: number;
  perguntas_correlacao: number;
  perguntas_prova: number;
  anos_prova: number[];
}

export interface EstatisticasGerais {
  total_bibliografias: number;
  total_perguntas: number;
  perguntas_por_tipo: {
    multipla: number;
    vf: number;
    correlacao: number;
  };
  perguntas_por_ano: { [ano: string]: number };
  perguntas_que_cairam_prova: number;
}

// Enum para facilitar o uso dos tipos
export enum TipoPergunta {
  MULTIPLA = 'multipla',
  VF = 'vf',
  CORRELACAO = 'correlacao'
}

// Enum para as alternativas de múltipla escolha
export enum AlternativaMultipla {
  A = 'a',
  B = 'b',
  C = 'c',
  D = 'd'
}

// Interface para validação de formulários
export interface PerguntaFormErrors {
  bibliografia?: string[];
  paginas?: string[];
  pergunta?: string[];
  alternativa_a?: string[];
  alternativa_b?: string[];
  alternativa_c?: string[];
  alternativa_d?: string[];
  resposta_correta?: string[];
  afirmacao?: string[];
  coluna_a?: string[];
  coluna_b?: string[];
  justificativa_resposta_certa?: string[];
  ano_prova?: string[];
  non_field_errors?: string[];
}