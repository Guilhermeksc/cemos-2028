export interface MarkdownFile {
  fileName: string;
  filePath: string;
  basePath: string; // Caminho base para resolução de imagens
  title: string; // Extraído do primeiro # do arquivo
  content: string;
}

export interface MarkdownHeading {
  id: string;
  level: number; // 1, 2 ou 3
  title: string;
  children?: MarkdownHeading[];
  isExpanded?: boolean;
}

export interface MarkdownSection {
  id: string;
  heading: MarkdownHeading;
  content: string;
  htmlContent?: string;
}
