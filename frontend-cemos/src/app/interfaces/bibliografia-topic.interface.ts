// Interfaces para o sistema de bibliografia por tópicos

export interface BibliografiaTopic {
  id: string;
  title: string;
  description: string;
  route?: string;
  routePath: string;
  icon?: string;
  imageUrl?: string;
  enabled?: boolean;
}

export interface BibliografiaConfig {
  moduleRoute: string;
  bibliografiaServiceMethod: string;
  topics: BibliografiaTopic[];
  defaultTopic?: string;
  customization?: {
    showSearch?: boolean;
    showFilters?: boolean;
    enableBookmarks?: boolean;
    customHeader?: string;
    customFooter?: string;
  };
}

// Interface para configuração de materias
export interface MateriaConfig {
  letra: string;
  titulo: string;
  topicos: string[];
}

// Interface para configuração de bibliografias
export interface BibliografiaItem {
  letra: string;
  titulo: string;
  itens: string[];
}

// Interface para configuração completa do módulo de bibliografia
export interface ModuloBibliografiaConfig {
  moduleId: string;
  moduleName: string;
  assunto: string;
  proposito: string;
  materias: MateriaConfig[];
  bibliografias: BibliografiaItem[];
  pdfUrl?: string;
  wordUrl?: string;
  config: BibliografiaConfig;
}