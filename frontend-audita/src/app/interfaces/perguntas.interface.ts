// Interfaces para o sistema de perguntas

export interface Bibliografia {
  id: number;
  titulo: string;
  autor?: string;
  materia?: number; // ID da matéria (ForeignKey)
  materia_nome?: string; // Nome da matéria (read-only, para exibição)
  descricao?: string;
  perguntas_count?: number;
  flashcards_count?: number;
}

export interface FlashCards {
  id: number;
  bibliografia: number;
  bibliografia_titulo?: string;
  pergunta: string;
  resposta: string;
  assunto?: number | null; // ID do capítulo (ForeignKey)
  assunto_titulo?: string | null; // Título do capítulo (read-only, para exibição)
  prova: boolean;
  ano?: number;
}

export interface FlashCardsFilters {
  search?: string;
  bibliografia?: number;
  assunto?: number; // ID do capítulo (ForeignKey)
  prova?: boolean;
  ano?: number;
  ordering?: string;
  page?: number;
  page_size?: number;
}

export interface EstatisticasFlashCards {
  total_flashcards: number;
  flashcards_por_assunto: { [assunto: string]: number }; // Usa assunto_titulo como chave
  flashcards_por_bibliografia: { [bibliografia: string]: number };
  flashcards_que_cairam_prova: number;
  flashcards_por_ano: { [ano: string]: number };
  anos_prova: number[];
}

// Interface base para perguntas (não utilizada diretamente, apenas para referência)
export interface PerguntaBase {
  id: number;
  bibliografia: number;
  bibliografia_titulo?: string;
  paginas?: string;
  assunto?: number | null; // ID do capítulo (ForeignKey)
  assunto_titulo?: string | null; // Título do capítulo (read-only, para exibição)
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



// Pergunta Verdadeiro ou Falso
export interface PerguntaVF extends PerguntaBase {
  tipo: 'vf';
  afirmacao_verdadeira: string;
  afirmacao_falsa: string;
  resposta_correta?: boolean; // Sempre true (calculado) - afirmacao_verdadeira é sempre a correta
  resposta_correta_display?: string; // Sempre "Verdadeiro"
  // Campos para sorteio aleatório da afirmação
  afirmacao_sorteada?: string; // A afirmação que será exibida (verdadeira ou falsa)
  afirmacao_sorteada_eh_verdadeira?: boolean; // Se a afirmação sorteada é verdadeira ou falsa
}



// Pergunta de Correlação
export interface PerguntaCorrelacao extends PerguntaBase {
  tipo: 'correlacao';
  coluna_a: string[];
  coluna_b: string[];
  resposta_correta: { [key: string]: string };
}



// Interface para resumo de perguntas (usado em listagens)
export interface PerguntaResumo {
  id: number;
  tipo: 'multipla' | 'vf' | 'correlacao';
  tipo_display: string;
  bibliografia_titulo: string;
  pergunta: string;
  paginas?: string;
  assunto?: number | null; // ID do capítulo (ForeignKey)
  assunto_titulo?: string | null; // Título do capítulo (read-only, para exibição)
  caiu_em_prova: boolean;
  ano_prova?: number;
}

// Union type para todos os tipos de pergunta
export type Pergunta = PerguntaMultipla | PerguntaVF | PerguntaCorrelacao;

// Interfaces para filtros e consultas
export interface BibliografiaFilters {
  search?: string;
  autor?: string;
  materia?: number; // ID da matéria (ForeignKey)
  ordering?: string;
  page?: number;
  page_size?: number;
}

export interface PerguntaFilters {
  search?: string;
  bibliografia?: number;
  assunto?: number; // ID do capítulo (ForeignKey)
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
  // resposta_correta removido - sempre é true (afirmacao_verdadeira é sempre a correta)
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

