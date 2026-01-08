// Interfaces para os models de bibliografia do backend Django

/**
 * Interface para MateriaModel
 * Corresponde ao model MateriaModel do backend
 */
export interface Materia {
  id: number;
  materia: string;
}

/**
 * Interface para BibliografiaModel
 * Corresponde ao model BibliografiaModel do backend
 * IMPORTANTE: materia é um ID (number), não uma string
 */
export interface Bibliografia {
  id: number;
  titulo: string;
  autor?: string;
  materia?: number; // ID da matéria (ForeignKey)
  materia_nome?: string; // Nome da matéria (campo read-only do serializer)
  descricao?: string;
  perguntas_count?: number;
  flashcards_count?: number;
}

/**
 * Interface para CapitulosBibliografiaModel
 * Corresponde ao model CapitulosBibliografiaModel do backend
 * IMPORTANTE: bibliografia é um ID (number), não um objeto
 */
export interface CapituloBibliografia {
  id: number;
  bibliografia: number; // ID da bibliografia (ForeignKey)
  bibliografia_titulo?: string; // Título da bibliografia (campo read-only do serializer)
  capitulo_titulo: string;
}

/**
 * Interface para criação/atualização de Materia
 */
export interface MateriaCreateUpdate {
  materia: string;
}

/**
 * Interface para criação/atualização de Bibliografia
 */
export interface BibliografiaCreateUpdate {
  titulo: string;
  autor?: string;
  materia?: number; // ID da matéria
  descricao?: string;
}

/**
 * Interface para criação/atualização de CapituloBibliografia
 */
export interface CapituloBibliografiaCreateUpdate {
  bibliografia: number; // ID da bibliografia
  capitulo_titulo: string;
}

/**
 * Filtros para busca de Materias
 */
export interface MateriaFilters {
  search?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
}

/**
 * Filtros para busca de Bibliografias
 */
export interface BibliografiaFilters {
  search?: string;
  autor?: string;
  materia?: number; // ID da matéria
  ordering?: string;
  page?: number;
  page_size?: number;
}

/**
 * Filtros para busca de CapitulosBibliografia
 */
export interface CapituloBibliografiaFilters {
  bibliografia?: number; // ID da bibliografia
  search?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
}

