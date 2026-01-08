// Interfaces para o sistema de revisão e planejamento de estudos

/**
 * Projeto de Estudo - Representa um plano completo de preparação
 */
export interface ProjetoEstudo {
  id: number;
  usuario: number;
  usuario_username?: string;
  nome: string;
  data_inicio: string; // ISO date string
  minutos_diarios: number;
  ativo: boolean;
  criado_em: string; // ISO datetime string
  atualizado_em: string; // ISO datetime string
  materias?: Materia[]; // Relacionamento aninhado
}

/**
 * Dados para criação de Projeto de Estudo
 */
export interface ProjetoEstudoCreate {
  nome: string;
  data_inicio: string; // ISO date string
  minutos_diarios: number;
  ativo?: boolean;
  total_passadas?: number; // Número de passadas a serem geradas (padrão: 3)
  materias?: Array<{
    nome: string;
    ordem: number;
    prioridade?: number;
  }>; // Lista de matérias a serem criadas
}

/**
 * Dados para atualização de Projeto de Estudo
 */
export interface ProjetoEstudoUpdate {
  nome?: string;
  data_inicio?: string;
  minutos_diarios?: number;
  ativo?: boolean;
}

/**
 * Matéria do projeto de estudo
 */
export interface Materia {
  id: number;
  projeto: number;
  nome: string;
  ordem_sugerida: number;
  prioridade: number;
  data_inicio?: string | null; // ISO date string (opcional)
  data_fim?: string | null; // ISO date string (opcional)
  capitulos?: Capitulo[]; // Relacionamento aninhado
  total_capitulos?: number;
}

/**
 * Dados para criação/atualização de Matéria
 */
export interface MateriaCreateUpdate {
  projeto: number;
  nome: string;
  ordem_sugerida: number;
  prioridade?: number;
  data_inicio?: string | null; // ISO date string (opcional)
  data_fim?: string | null; // ISO date string (opcional)
}

/**
 * Dados para atualização de datas de matérias
 */
export interface MateriaDataUpdate {
  id: number;
  data_inicio?: string | null; // ISO date string (opcional)
  data_fim?: string | null; // ISO date string (opcional)
}

/**
 * Capítulo de uma matéria
 */
export interface Capitulo {
  id: number;
  materia: number;
  materia_nome?: string;
  titulo: string;
  ordem: number;
  estimativa_minutos: number;
  total_sessoes?: number;
}

/**
 * Dados para criação/atualização de Capítulo
 */
export interface CapituloCreateUpdate {
  materia: number;
  titulo: string;
  ordem: number;
  estimativa_minutos?: number;
}

/**
 * Sessão de Estudo - Representa o estudo de um capítulo em uma data específica
 */
export interface SessaoEstudo {
  id: number;
  capitulo: number;
  capitulo_titulo?: string;
  materia_nome?: string;
  data_planejada: string; // ISO date string
  data_realizada?: string | null; // ISO date string
  passada: number; // 1, 2, 3...
  tempo_estudado?: number | null; // em minutos
  concluida: boolean;
  observacoes?: string;
  revisoes?: Revisao[]; // Relacionamento aninhado
}

/**
 * Dados para criação/atualização de Sessão de Estudo
 */
export interface SessaoEstudoCreateUpdate {
  capitulo: number;
  data_planejada: string;
  passada: number;
  tempo_estudado?: number;
  concluida?: boolean;
  observacoes?: string;
}

/**
 * Dados para conclusão de Sessão de Estudo
 */
export interface SessaoEstudoConcluir {
  data_realizada?: string; // ISO date string (opcional, usa hoje se não informado)
  tempo_estudado?: number;
  observacoes?: string;
}

/**
 * Filtros para busca de Sessões de Estudo
 */
export interface SessaoEstudoFilters {
  data_inicio?: string; // ISO date string
  data_fim?: string; // ISO date string
  passada?: number;
  concluida?: boolean;
  capitulo?: number;
  materia?: number;
  projeto?: number;
}

/**
 * Revisão programada para uma sessão de estudo
 */
export interface Revisao {
  id: number;
  sessao: number;
  data_prevista: string; // ISO date string
  data_realizada?: string | null; // ISO date string
  intervalo_dias: number; // 1, 7, 30, 60, 120
  concluida: boolean;
}

/**
 * Dados para criação/atualização de Revisão
 */
export interface RevisaoCreateUpdate {
  sessao: number;
  data_prevista: string;
  data_realizada?: string;
  concluida?: boolean;
}

/**
 * Dados para conclusão de Revisão
 */
export interface RevisaoConcluir {
  data_realizada?: string; // ISO date string (opcional, usa hoje se não informado)
}

/**
 * Filtros para busca de Revisões
 */
export interface RevisaoFilters {
  concluida?: boolean;
  data_prevista_inicio?: string; // ISO date string
  data_prevista_fim?: string; // ISO date string
  sessao?: number;
  intervalo_dias?: number;
  projeto?: number;
}

/**
 * Indicadores de acompanhamento do projeto
 */
export interface IndicadoresProjeto {
  total_sessoes: number;
  sessoes_concluidas: number;
  sessoes_pendentes: number;
  revisoes_pendentes: number;
  revisoes_concluidas: number;
  materias_iniciadas: number;
  materias_concluidas: number;
  total_materias: number;
  percentual_progresso: number;
}

/**
 * Resposta do endpoint de calendário
 */
export interface CalendarioResponse {
  sessoes: SessaoEstudo[];
  revisoes: Revisao[];
}

/**
 * Resposta paginada padrão da API
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

