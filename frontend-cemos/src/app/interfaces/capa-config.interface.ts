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

  /**
   * Nome do bloco (opcional)
   * Aparece abaixo do indicador de consulta com fundo branco transparente e texto preto
   * @example 'Bloco 1'
   */
  bloco?: string;

  /**
   * Cor de fundo do indicador de bloco (opcional)
   * Aceita número de 1 a 10 ou nome da cor (azul, rosa, verde, amarelo, lavanda, pêssego, mint, coral, lilás, turquesa)
   * Se não especificado, usa azul como padrão
   * @example 1 ou 'azul' ou 'rosa'
   */
  blocoColor?: number | string;
}

