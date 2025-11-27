/**
 * Interface para configuração de capa de bibliografia
 * 
 * Usada pelo componente capa-bibliografia para definir
 * múltiplas capas clicáveis com rotas específicas
 */
export interface CapaConfig {
  /**
   * Caminho da imagem da capa
   * @example 'assets/content/geopolitica-ri/img/vinganca-geografia.jpg'
   */
  imagePath: string;

  /**
   * Rota de destino ao clicar na capa
   * @example '/app6-geopolitica-relacoes-internacionais/bibliografia/vinganca-geografia'
   */
  routePath: string;

  /**
   * Título da capa (opcional)
   * Aparece no overlay ao fazer hover sobre a capa
   * @example 'A Vingança da Geografia'
   */
  title?: string;

  /**
   * Descrição da capa (opcional)
   * Geralmente usado para o nome do autor
   * Aparece no overlay ao fazer hover sobre a capa
   * @example 'Robert D. Kaplan'
   */
  description?: string;

  /**
   * Indica se permite consulta durante prova/exame (opcional)
   * Se true: mostra "Com Consulta" em verde com ícone de check
   * Se false: mostra "Sem Consulta" em vermelho com ícone X
   */
  permite_consulta?: boolean;
}

