import { PerguntaMultipla, PerguntaVF, PerguntaCorrelacao, FlashCards } from '../../interfaces/perguntas.interface';

/**
 * Interface para representar uma questão no simulado
 */
export interface SimuladoQuestion {
  id: number;
  tipo: 'multipla' | 'vf' | 'correlacao' | 'aberta';
  pergunta: string;
  bibliografia_titulo?: string;
  paginas?: string;
  assunto?: number | null; // ID do assunto (ForeignKey)
  assunto_titulo?: string | null; // Título do assunto (read-only, para exibição)
  caiu_em_prova?: boolean;
  ano_prova?: number;
  data: PerguntaMultipla | PerguntaVF | PerguntaCorrelacao | FlashCards;
  userAnswer?: any;
  isCorrect?: boolean;
  uniqueKey?: string; // Chave única: tipo-id (ex: "vf-1", "multipla-2")
}

/**
 * Interface para configuração de um simulado
 */
export interface SimuladoConfig {
  bibliografias: number[];
  questoesVF: number;
  questoesMultipla: number;
  questoesCorrelacao: number;
  questoesAbertas: number;
}

/**
 * Interface para estado de uma aba de simulado
 */
export interface TabState {
  isLoadingQuestions: boolean;
  questionsLoaded: boolean;
  simuladoQuestions: SimuladoQuestion[];
  questionResults: { [uniqueKey: string]: { answered: boolean, isCorrect: boolean, showResult: boolean } };
  simuladoConfig: SimuladoConfig;
  insufficientQuestionsMessage?: string; // Mensagem quando não há questões suficientes
}

/**
 * Tipo para identificar o tipo de aba
 */
export type TabType = 'completo' | 'vf' | 'multipla' | 'correlacao';

/**
 * Interface para um card de simulado
 */
export interface SimuladoCard {
  id: string; // ID único do card
  titulo: string;
  descricao?: string;
  config: SimuladoConfig;
  questions: SimuladoQuestion[];
  customQuestions?: SimuladoQuestion[]; // Questões customizadas pelo usuário
  status: 'empty' | 'loading' | 'ready' | 'error';
  insufficientQuestionsMessage?: string;
  questionResults?: { [uniqueKey: string]: { answered: boolean, isCorrect: boolean, showResult: boolean } };
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interface para opções de personalização do PDF
 */
export interface PdfCustomizationOptions {
  // Opções gerais
  nomeSimulado?: string;
  data?: string;
  turma?: string;
  agrupamento?: 'bibliografia-assunto' | 'tipo-questao';
  fonteTamanho?: 'compacto' | 'padrao';
  origem?: 'preset' | 'custom' | 'desconhecida';
  bibliografias?: number[];
  
  // Seções toggláveis
  mostrarSumarioDesempenho?: boolean;
  incluirPaginasBrancas?: boolean;
  espacamentoRespostas?: number;
  incluirJustificativas?: boolean;
  
  // Customização por questão
  ordemQuestoes?: 'aleatoria' | 'bibliografia-assunto';
}

/**
 * Presets de simulados pré-configurados
 */
export const SIMULADO_PRESETS: Array<{ titulo: string; descricao?: string; config: SimuladoConfig }> = [
  {
    titulo: 'Simulado Básico 1',
    config: {
      bibliografias: [],
      questoesVF: 10,
      questoesMultipla: 6,
      questoesCorrelacao: 4,
      questoesAbertas: 0
    }
  },
  {
    titulo: 'Simulado Básico 2',
    config: {
      bibliografias: [],
      questoesVF: 20,
      questoesMultipla: 10,
      questoesCorrelacao: 6,
      questoesAbertas: 0
    }
  },
  {
    titulo: 'Simulado Avançado',
    descricao: 'Simulado extenso: 30 V/F, 15 Múltipla Escolha, 8 Correlação',
    config: {
      bibliografias: [],
      questoesVF: 20,
      questoesMultipla: 12,
      questoesCorrelacao: 8,
      questoesAbertas: 10
    }
  }
];
