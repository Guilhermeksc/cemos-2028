import { Injectable } from '@angular/core';
import { SimuladoQuestion, PdfCustomizationOptions } from '../simulados.types';
import { PerguntaMultipla, PerguntaVF, PerguntaCorrelacao, FlashCards } from '../../../interfaces/perguntas.interface';

/**
 * Interface para representar um segmento de texto com estilo
 */
interface TextSegment {
  text: string;
  bold: boolean;
}

/**
 * Serviço responsável pela geração de PDFs de simulados
 * Extraído de perguntas.ts para isolar responsabilidades
 */
@Injectable({
  providedIn: 'root'
})
export class SimuladosPdfService {

  /**
   * Gera um único PDF pesquisável com todas as questões do simulado misturadas
   * Inclui questões V/F, Múltipla Escolha e Correlação no mesmo PDF
   * O gabarito é gerado logo após todas as questões
   */
  async generateMixedPdf(
    questions: SimuladoQuestion[],
    questionResults?: { [uniqueKey: string]: { answered: boolean, isCorrect: boolean, showResult: boolean } },
    options?: PdfCustomizationOptions
  ): Promise<void> {
    const jsPDF = (await import('jspdf')).default;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Configurações de página
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const margin = 15; // Margem reduzida
    const maxWidth = pageWidth - (margin * 2);
    let y = margin;
    
    // Helpers internos
    const removeEmojis = this.createRemoveEmojis();
    const truncateAssunto = this.createTruncateAssunto(removeEmojis);
    const removeAssuntoFromPergunta = this.createRemoveAssuntoFromPergunta(removeEmojis);
    const extractTextWithStyles = this.createExtractTextWithStyles(removeEmojis);
    const renderStyledText = this.createRenderStyledText(pdf, pageHeight, margin);
    
    // Título do documento
    const nomeSimulado = options?.nomeSimulado || 'Simulado - Questões';
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    const title = removeEmojis(nomeSimulado);
    pdf.text(title, margin, y);
    y += 6;
    
    // Informações da prova
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    const totalQuestions = questions.length;
    
    let answeredQuestions = 0;
    let correctAnswers = 0;
    
    if (questionResults) {
      answeredQuestions = questions.filter((q: SimuladoQuestion) => 
        q.uniqueKey && questionResults[q.uniqueKey]?.answered
      ).length;
      correctAnswers = questions.filter((q: SimuladoQuestion) => 
        q.uniqueKey && questionResults[q.uniqueKey]?.answered && 
        questionResults[q.uniqueKey]?.isCorrect
      ).length;
    }
    
    const scorePercentage = answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0;
    
    let infoText = `Total de questões: ${totalQuestions}`;
    
    if (answeredQuestions > 0 && options?.mostrarSumarioDesempenho !== false) {
      infoText += ` | Respondidas: ${answeredQuestions} | Acertos: ${correctAnswers} | Performance: ${scorePercentage.toFixed(1)}%`;
    }
    
    if (options?.data) {
      infoText += ` | Data: ${options.data}`;
    }
    
    if (options?.turma) {
      infoText += ` | Turma: ${options.turma}`;
    }
    
    pdf.text(infoText, margin, y);
    y += 3;
    
    // Linha separadora
    y += 0.2;
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.3);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 5;
    
    // ========== PARTE 1: QUESTÕES ==========
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('QUESTÕES', margin, y);
    y += 6;
    
    // Agrupar questões conforme opção de agrupamento
    const groupedQuestions = this.groupQuestions(questions, options?.agrupamento || 'bibliografia-assunto');
    
    // Contador global de questões
    let globalQuestionNumber = 0;
    
    // Iterar sobre os grupos
    Object.keys(groupedQuestions).forEach((groupKey) => {
      const groupQuestions = groupedQuestions[groupKey];
      const [bibliografia, assunto] = groupKey.split('|');
      
      if (y + 15 > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      
      // Cabeçalho do grupo: Bibliografia + Assunto
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      const headerText = `${removeEmojis(bibliografia)}${assunto !== 'Sem assunto' ? ' - ' + removeEmojis(assunto) : ''}`;
      const headerLines = pdf.splitTextToSize(headerText, maxWidth);
      
      headerLines.forEach((line: string) => {
        if (y + 4 > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, margin, y);
        y += 4;
      });
      
      y += 2;
      
      // Iterar sobre as questões do grupo
      groupQuestions.forEach((question, questionIndex) => {
        globalQuestionNumber++;
        
        if (y + 20 > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        
        // Número da questão no canto esquerdo
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        const questionNumberText = `${globalQuestionNumber})`;
        const numberWidth = pdf.getTextWidth(questionNumberText);
        pdf.text(questionNumberText, margin, y);
        
        const contentStartX = margin + numberWidth + 2;
        const contentMaxWidth = maxWidth - (contentStartX - margin);
        
        pdf.setFontSize(8);
        
        // Renderizar questão baseado no tipo
        if (question.tipo === 'vf') {
          y = this.renderVFQuestion(
            pdf, question, contentStartX, y, contentMaxWidth, maxWidth, pageHeight, margin,
            extractTextWithStyles, renderStyledText, removeEmojis, removeAssuntoFromPergunta
          );
        } else if (question.tipo === 'multipla') {
          y = this.renderMultiplaQuestion(
            pdf, question, contentStartX, y, contentMaxWidth, pageHeight, margin,
            extractTextWithStyles, renderStyledText, removeEmojis, removeAssuntoFromPergunta
          );
        } else if (question.tipo === 'correlacao') {
          y = this.renderCorrelacaoQuestion(
            pdf, question, contentStartX, y, contentMaxWidth, pageHeight, margin,
            extractTextWithStyles, renderStyledText, removeEmojis, removeAssuntoFromPergunta
          );
        } else if (question.tipo === 'aberta') {
          y = this.renderAbertaQuestion(
            pdf, question, contentStartX, y, contentMaxWidth, pageHeight, margin,
            extractTextWithStyles, renderStyledText, removeEmojis, removeAssuntoFromPergunta
          );
        }
        
        if (questionIndex < groupQuestions.length - 1) {
          y += 2;
        } else {
          if (question.tipo === 'correlacao') {
            y += 4;
          } else {
            y += 2;
          }
        }
      });
      
      if (y + 20 > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      } else {
        y += 3;
      }
    });
    
    // Adicionar páginas em branco se solicitado
    if (options?.incluirPaginasBrancas) {
      const numPages = options.espacamentoRespostas || 1;
      for (let i = 0; i < numPages; i++) {
        pdf.addPage();
      }
    }
    
    // ========== PARTE 2: GABARITO/RESPOSTAS ==========
    pdf.addPage();
    y = margin;
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('GABARITO', margin, y);
    y += 6;
    
    // Agrupar questões por bibliografia + assunto (mesmo agrupamento das questões)
    const groupedQuestionsGabarito = this.groupQuestions(questions, options?.agrupamento || 'bibliografia-assunto');
    
    let globalQuestionNumberGabarito = 0;
    
    Object.keys(groupedQuestionsGabarito).forEach((groupKey) => {
      const groupQuestions = groupedQuestionsGabarito[groupKey];
      const [bibliografia, assunto] = groupKey.split('|');
      
      if (y + 15 > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      const headerText = `${removeEmojis(bibliografia)}${assunto !== 'Sem assunto' ? ' - ' + removeEmojis(assunto) : ''}`;
      const headerLines = pdf.splitTextToSize(headerText, maxWidth);
      
      headerLines.forEach((line: string) => {
        if (y + 4 > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, margin, y);
        y += 4;
      });
      
      y += 2;
      
      groupQuestions.forEach((question) => {
        globalQuestionNumberGabarito++;
        
        if (y + 15 > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        const questionNumberText = `${globalQuestionNumberGabarito}:`;
        const numberWidth = pdf.getTextWidth(questionNumberText);
        pdf.text(questionNumberText, margin, y);
        
        const contentStartX = margin + numberWidth + 2;
        const contentMaxWidth = maxWidth - (contentStartX - margin);
        
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        
        if (question.tipo === 'vf') {
          y = this.renderVFGabarito(
            pdf, question, contentStartX, y, contentMaxWidth, pageHeight, margin,
            extractTextWithStyles, renderStyledText, removeEmojis, options?.incluirJustificativas !== false
          );
        } else if (question.tipo === 'multipla') {
          y = this.renderMultiplaGabarito(
            pdf, question, contentStartX, y, contentMaxWidth, pageHeight, margin,
            extractTextWithStyles, renderStyledText, removeEmojis, options?.incluirJustificativas !== false
          );
        } else if (question.tipo === 'correlacao') {
          y = this.renderCorrelacaoGabarito(
            pdf, question, contentStartX, y, contentMaxWidth, pageHeight, margin,
            extractTextWithStyles, renderStyledText, removeEmojis, removeAssuntoFromPergunta, options?.incluirJustificativas !== false
          );
        } else if (question.tipo === 'aberta') {
          y = this.renderAbertaGabarito(
            pdf, question, contentStartX, y, contentMaxWidth, pageHeight, margin,
            extractTextWithStyles, renderStyledText, removeEmojis
          );
        }
        
        y += 3;
      });
      
      y += 3;
    });
    
    // Gerar nome do arquivo
    const fileName = this.generateFileName(options?.nomeSimulado || 'simulado');
    
    // Salvar PDF
    pdf.save(fileName);
    
    console.log(`✅ PDF único do simulado gerado com sucesso:`, fileName);
  }

  /**
   * Gera PDF pesquisável para um tipo específico de questão
   */
  async generatePdfByType(
    questionType: 'vf' | 'multipla' | 'correlacao',
    questions: SimuladoQuestion[],
    rawQuestions: (PerguntaVF | PerguntaMultipla | PerguntaCorrelacao)[],
    questionResults?: { [uniqueKey: string]: { answered: boolean, isCorrect: boolean, showResult: boolean } },
    options?: PdfCustomizationOptions
  ): Promise<void> {
    // Implementação similar ao método anterior, mas filtrado por tipo
    // Por enquanto, delegar para generateMixedPdf com filtro
    const filteredQuestions = questions.filter(q => q.tipo === questionType);
    await this.generateMixedPdf(filteredQuestions, questionResults, options);
  }

  // ========== HELPERS PRIVADOS ==========

  private createRemoveEmojis(): (text: string) => string {
    return (text: string): string => {
      if (!text) return '';
      return text
        .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
        .replace(/[\u{1F600}-\u{1F64F}]/gu, '')
        .replace(/[\u{1F680}-\u{1F6FF}]/gu, '')
        .replace(/[\u{2600}-\u{26FF}]/gu, '')
        .replace(/[\u{2700}-\u{27BF}]/gu, '')
        .replace(/[\u{1F900}-\u{1F9FF}]/gu, '')
        .replace(/[\u{1FA00}-\u{1FAFF}]/gu, '')
        .replace(/[\u{FE00}-\u{FE0F}]/gu, '')
        .replace(/[\u{200D}]/gu, '')
        .replace(/[\u{FE0F}]/gu, '')
        .replace(/[ \t]+/g, ' ');
    };
  }

  private createTruncateAssunto(removeEmojis: (text: string) => string): (assunto: string) => string {
    return (assunto: string): string => {
      if (!assunto) return '';
      const assuntoLimpo = removeEmojis(assunto);
      if (assuntoLimpo.length <= 40) {
        return assuntoLimpo;
      }
      return assuntoLimpo.substring(0, 40) + '...';
    };
  }

  private createRemoveAssuntoFromPergunta(removeEmojis: (text: string) => string): (perguntaText: string, assunto?: string | null) => string {
    return (perguntaText: string, assunto?: string | null): string => {
      if (!perguntaText || !assunto) return perguntaText;
      
      const normalize = (text: string): string => {
        return removeEmojis(text.trim()).replace(/\s+/g, ' ').trim();
      };
      
      const assuntoNormalized = normalize(assunto);
      if (!assuntoNormalized) return perguntaText;
      
      const lines = perguntaText.split(/\r?\n/);
      
      if (lines.length > 0) {
        const firstLineNormalized = normalize(lines[0]);
        if (firstLineNormalized === assuntoNormalized) {
          lines.shift();
          while (lines.length > 0 && lines[0].trim() === '') {
            lines.shift();
          }
        }
      }
      
      if (lines.length > 0) {
        const lastLineNormalized = normalize(lines[lines.length - 1]);
        if (lastLineNormalized === assuntoNormalized) {
          lines.pop();
          while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
            lines.pop();
          }
        }
      }
      
      let result = lines.join('\n').trim();
      const resultNormalized = normalize(result);
      
      if (resultNormalized.startsWith(assuntoNormalized)) {
        const assuntoLower = assuntoNormalized.toLowerCase();
        const resultLower = removeEmojis(result).toLowerCase();
        const index = resultLower.indexOf(assuntoLower);
        
        if (index === 0 || (index > 0 && /^\s*$/.test(result.substring(0, index)))) {
          let charCount = 0;
          let endIndex = 0;
          
          for (let i = 0; i < result.length && charCount < assuntoNormalized.length; i++) {
            const char = result[i];
            const isEmoji = /[\u{1F300}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{FE00}-\u{FE0F}\u{200D}\u{FE0F}]/u.test(char);
            
            if (!isEmoji) {
              const normalizedChar = char.toLowerCase().replace(/\s+/g, ' ');
              if (normalizedChar !== ' ' || charCount === 0 || result[i-1] !== ' ') {
                charCount++;
              }
            }
            endIndex = i + 1;
          }
          
          if (endIndex > 0) {
            result = result.substring(endIndex).trim();
            result = result.replace(/^[\n\r\s]+/, '');
          }
        }
      }
      
      return result || perguntaText;
    };
  }

  private createExtractTextWithStyles(removeEmojis: (text: string) => string): (text: string) => TextSegment[] {
    return (text: string): TextSegment[] => {
      if (!text) return [];
      
      const segments: TextSegment[] = [];
      let processed = text;
      
      processed = processed.replace(/\*\*([^*]+?)\*\*/g, (match, content) => {
        return `__BOLD_DOUBLE__${content}__BOLD_DOUBLE_END__`;
      });
      
      processed = processed.replace(/\*([^*\n]+?)\*/g, (match, content, offset) => {
        const beforeMatch = processed.substring(0, offset);
        const doubleBoldOpens = (beforeMatch.match(/__BOLD_DOUBLE__/g) || []).length;
        const doubleBoldCloses = (beforeMatch.match(/__BOLD_DOUBLE_END__/g) || []).length;
        
        if (doubleBoldOpens > doubleBoldCloses) {
          return match;
        }
        
        return `__BOLD_SINGLE__${content}__BOLD_SINGLE_END__`;
      });
      
      const parts = processed.split(/(__BOLD_DOUBLE__.*?__BOLD_DOUBLE_END__|__BOLD_SINGLE__.*?__BOLD_SINGLE_END__)/g);
      
      parts.forEach(part => {
        if (!part) return;
        
        if (part.startsWith('__BOLD_DOUBLE__') && part.endsWith('__BOLD_DOUBLE_END__')) {
          const content = part.replace('__BOLD_DOUBLE__', '').replace('__BOLD_DOUBLE_END__', '');
          segments.push({ text: removeEmojis(content), bold: true });
        } else if (part.startsWith('__BOLD_SINGLE__') && part.endsWith('__BOLD_SINGLE_END__')) {
          const content = part.replace('__BOLD_SINGLE__', '').replace('__BOLD_SINGLE_END__', '');
          segments.push({ text: removeEmojis(content), bold: true });
        } else if (part.length > 0) {
          segments.push({ text: removeEmojis(part), bold: false });
        }
      });
      
      return segments.length > 0 ? segments : [{ text: removeEmojis(text), bold: false }];
    };
  }

  private createRenderStyledText(pdf: any, pageHeight: number, margin: number): (segments: TextSegment[], x: number, yPos: number, maxLineWidth: number, fontSize: number) => number {
    return (segments: TextSegment[], x: number, yPos: number, maxLineWidth: number, fontSize: number): number => {
      let currentY = yPos;
      const lineHeight = fontSize * 0.4;
      
      const allWords: Array<{text: string, bold: boolean}> = [];
      
      segments.forEach(segment => {
        const segmentLines = segment.text.split('\n');
        
        segmentLines.forEach((line, lineIndex) => {
          if (lineIndex > 0) {
            allWords.push({ text: '\n', bold: false });
          }
          
          if (!line || line.trim().length === 0) {
            return;
          }
          
          const tokens = line.match(/\S+|\s+/g) || [];
          tokens.forEach(token => {
            if (token) {
              allWords.push({ text: token, bold: segment.bold });
            }
          });
        });
      });
      
      let lineWords: Array<{text: string, bold: boolean}> = [];
      let lineWidth = 0;
      
      allWords.forEach((word) => {
        if (word.text === '\n') {
          if (lineWords.length > 0) {
            if (currentY + lineHeight > pageHeight - margin) {
              pdf.addPage();
              currentY = margin;
            }
            
            let xPos = x;
            lineWords.forEach((w) => {
              pdf.setFontSize(fontSize);
              pdf.setFont('helvetica', w.bold ? 'bold' : 'normal');
              pdf.text(w.text, xPos, currentY);
              xPos += pdf.getTextWidth(w.text);
            });
            currentY += lineHeight;
            lineWords = [];
            lineWidth = 0;
          }
          return;
        }
        
        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', word.bold ? 'bold' : 'normal');
        
        const isSpace = /^\s+$/.test(word.text);
        const wordWidth = pdf.getTextWidth(word.text);
        const newLineWidth = lineWidth + wordWidth;
        
        if (newLineWidth > maxLineWidth && lineWords.length > 0) {
          while (lineWords.length > 0 && /^\s+$/.test(lineWords[lineWords.length - 1].text)) {
            const lastWord = lineWords.pop()!;
            const removedWidth = pdf.getTextWidth(lastWord.text);
            lineWidth -= removedWidth;
          }
          
          lineWidth = 0;
          lineWords.forEach(w => {
            lineWidth += pdf.getTextWidth(w.text);
          });
          
          if (lineWords.length > 0) {
            if (currentY + lineHeight > pageHeight - margin) {
              pdf.addPage();
              currentY = margin;
            }
            
            let xPos = x;
            lineWords.forEach((w) => {
              pdf.setFontSize(fontSize);
              pdf.setFont('helvetica', w.bold ? 'bold' : 'normal');
              pdf.text(w.text, xPos, currentY);
              xPos += pdf.getTextWidth(w.text);
            });
            currentY += lineHeight;
          }
          
          if (!isSpace) {
            lineWords = [word];
            lineWidth = wordWidth;
          } else {
            lineWords = [];
            lineWidth = 0;
          }
        } else {
          lineWords.push(word);
          lineWidth = newLineWidth;
        }
      });
      
      while (lineWords.length > 0 && /^\s+$/.test(lineWords[0].text)) {
        lineWords.shift();
      }
      while (lineWords.length > 0 && /^\s+$/.test(lineWords[lineWords.length - 1].text)) {
        lineWords.pop();
      }
      
      if (lineWords.length > 0) {
        if (currentY + lineHeight > pageHeight - margin) {
          pdf.addPage();
          currentY = margin;
        }
        
        let xPos = x;
        lineWords.forEach((w) => {
          pdf.setFontSize(fontSize);
          pdf.setFont('helvetica', w.bold ? 'bold' : 'normal');
          pdf.text(w.text, xPos, currentY);
          xPos += pdf.getTextWidth(w.text);
        });
        currentY += lineHeight;
      }
      
      return currentY;
    };
  }

  private groupQuestions(questions: SimuladoQuestion[], agrupamento: 'bibliografia-assunto' | 'tipo-questao'): { [key: string]: SimuladoQuestion[] } {
    const grouped: { [key: string]: SimuladoQuestion[] } = {};
    
    questions.forEach((question) => {
      let key: string;
      
      if (agrupamento === 'tipo-questao') {
        key = question.tipo;
      } else {
        const bibliografia = question.bibliografia_titulo || 'Sem bibliografia';
        const assunto = question.assunto_titulo || 'Sem assunto';
        key = `${bibliografia}|${assunto}`;
      }
      
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(question);
    });
    
    return grouped;
  }

  private renderVFQuestion(
    pdf: any, question: SimuladoQuestion, contentStartX: number, y: number, contentMaxWidth: number,
    maxWidth: number, pageHeight: number, margin: number,
    extractTextWithStyles: (text: string) => TextSegment[],
    renderStyledText: (segments: TextSegment[], x: number, yPos: number, maxLineWidth: number, fontSize: number) => number,
    removeEmojis: (text: string) => string,
    removeAssuntoFromPergunta: (perguntaText: string, assunto?: string | null) => string
  ): number {
    const vfData = question.data as PerguntaVF;
    
    const perguntaText = removeAssuntoFromPergunta(question.pergunta || vfData.pergunta || '', question.assunto_titulo);
    const perguntaSegments = extractTextWithStyles(perguntaText);

    if (perguntaSegments.length > 0) {
      pdf.setFont('helvetica', 'normal');
      y = renderStyledText(perguntaSegments, contentStartX, y, contentMaxWidth, 8);
      y += 2;
    } else if (perguntaText) {
      pdf.setFont('helvetica', 'normal');
      const perguntaClean = removeEmojis(perguntaText);
      const perguntaLines = pdf.splitTextToSize(perguntaClean, contentMaxWidth);
      perguntaLines.forEach((line: string) => {
        if (y + 4 > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, contentStartX, y);
        y += 4;
      });
      y += 2;
    }

    const seed = question.id;
    const useFalse = seed % 2 === 0;
    const afirmacao = useFalse
      ? { texto: vfData.afirmacao_falsa || '', isVerdadeira: false }
      : { texto: vfData.afirmacao_verdadeira || '', isVerdadeira: true };

    if (afirmacao.texto) {
      const textStartX = contentStartX;
      const textMaxWidth = maxWidth - (textStartX - margin);

      const afirmacaoSegments = extractTextWithStyles(afirmacao.texto);

      if (afirmacaoSegments.length > 0) {
        y = renderStyledText(afirmacaoSegments, textStartX, y, textMaxWidth, 8);
      } else {
        pdf.setFont('helvetica', 'normal');
        const afirmacaoText = removeEmojis(afirmacao.texto);
        const afirmacaoLines = pdf.splitTextToSize(afirmacaoText, textMaxWidth);
        afirmacaoLines.forEach((line: string) => {
          if (y + 4 > pageHeight - margin) {
            pdf.addPage();
            y = margin;
          }
          pdf.text(line, textStartX, y);
          y += 2;
        });
      }
      y += 2;
      pdf.setFont('helvetica', 'normal');
      pdf.text('Resposta: (V)  (F)', textStartX, y);
      y += 3;
    }

    return y;
  }

  private renderMultiplaQuestion(
    pdf: any, question: SimuladoQuestion, contentStartX: number, y: number, contentMaxWidth: number,
    pageHeight: number, margin: number,
    extractTextWithStyles: (text: string) => TextSegment[],
    renderStyledText: (segments: TextSegment[], x: number, yPos: number, maxLineWidth: number, fontSize: number) => number,
    removeEmojis: (text: string) => string,
    removeAssuntoFromPergunta: (perguntaText: string, assunto?: string | null) => string
  ): number {
    const multiplaData = question.data as PerguntaMultipla;
    
    const perguntaText = removeAssuntoFromPergunta(question.pergunta || multiplaData.pergunta, question.assunto_titulo);
    const perguntaSegments = extractTextWithStyles(perguntaText);
    
    if (perguntaSegments.length > 0) {
      pdf.setFont('helvetica', 'normal');
      y = renderStyledText(perguntaSegments, contentStartX, y, contentMaxWidth, 8);
      y += 3;
    } else {
      pdf.setFont('helvetica', 'normal');
      const perguntaClean = removeEmojis(perguntaText);
      const perguntaLines = pdf.splitTextToSize(perguntaClean, contentMaxWidth);
      perguntaLines.forEach((line: string) => {
        if (y + 4 > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, contentStartX, y);
        y += 4;
      });
      y += 3;
    }
    
    const alternativas = [
      { key: 'a', text: multiplaData.alternativa_a },
      { key: 'b', text: multiplaData.alternativa_b },
      { key: 'c', text: multiplaData.alternativa_c },
      { key: 'd', text: multiplaData.alternativa_d }
    ];
    alternativas.forEach((alt) => {
      const altSegments = extractTextWithStyles(alt.text);
      if (altSegments.length > 0) {
        const firstSegment = altSegments[0];
        firstSegment.text = `${alt.key}) ${firstSegment.text}`;
        y = renderStyledText(altSegments, contentStartX, y, contentMaxWidth, 8);
        y += 1;
      } else {
        pdf.setFont('helvetica', 'normal');
        const altText = removeEmojis(alt.text);
        const altLines = pdf.splitTextToSize(altText, contentMaxWidth);
        altLines.forEach((line: string, lineIndex: number) => {
          if (y + 4 > pageHeight - margin) {
            pdf.addPage();
            y = margin;
          }
          const prefix = lineIndex === 0 ? `${alt.key}) ` : '   ';
          pdf.text(prefix + line, contentStartX, y);
          y += 4;
        });
        y += 1;
      }
    });
    
    return y;
  }

  private renderCorrelacaoQuestion(
    pdf: any, question: SimuladoQuestion, contentStartX: number, y: number, contentMaxWidth: number,
    pageHeight: number, margin: number,
    extractTextWithStyles: (text: string) => TextSegment[],
    renderStyledText: (segments: TextSegment[], x: number, yPos: number, maxLineWidth: number, fontSize: number) => number,
    removeEmojis: (text: string) => string,
    removeAssuntoFromPergunta: (perguntaText: string, assunto?: string | null) => string
  ): number {
    const correlacaoData = question.data as PerguntaCorrelacao;
    
    const perguntaText = removeAssuntoFromPergunta(question.pergunta || correlacaoData.pergunta, question.assunto_titulo);
    const perguntaSegments = extractTextWithStyles(perguntaText);
    
    if (perguntaSegments.length > 0) {
      pdf.setFont('helvetica', 'normal');
      y = renderStyledText(perguntaSegments, contentStartX, y, contentMaxWidth, 8);
      y += 3;
    } else {
      pdf.setFont('helvetica', 'normal');
      const perguntaClean = removeEmojis(perguntaText);
      const perguntaLines = pdf.splitTextToSize(perguntaClean, contentMaxWidth);
      perguntaLines.forEach((line: string) => {
        if (y + 4 > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, contentStartX, y);
        y += 4;
      });
      y += 3;
    }
    
    if (correlacaoData.coluna_a && correlacaoData.coluna_b) {
      pdf.setFont('helvetica', 'normal');
      pdf.text('Coluna A:', contentStartX, y);
      y += 4;
      correlacaoData.coluna_a.forEach((item, idx) => {
        const squareSize = 3;
        const squareX = contentStartX;
        const squareY = y - 2;
        pdf.setDrawColor(0, 0, 0);
        pdf.setLineWidth(0.2);
        pdf.rect(squareX, squareY, squareSize, squareSize);
        const textStartX = squareX + squareSize + 2;
        const textMaxWidth = contentMaxWidth - (textStartX - contentStartX);

        const itemSegments = extractTextWithStyles(item);
        if (itemSegments.length > 0) {
          const firstSegment = itemSegments[0];
          firstSegment.text = `${idx + 1}. ${firstSegment.text}`;
          y = renderStyledText(itemSegments, textStartX, y, textMaxWidth, 8);
        } else {
          pdf.setFont('helvetica', 'normal');
          const itemText = removeEmojis(item);
          const itemLines = pdf.splitTextToSize(itemText, textMaxWidth);
          itemLines.forEach((line: string, lineIndex: number) => {
            if (y + 4 > pageHeight - margin) {
              pdf.addPage();
              y = margin;
            }
            const prefix = lineIndex === 0 ? `${idx + 1}. ` : '   ';
            pdf.text(prefix + line, textStartX, y);
            y += 4;
          });
        }
      });
      y += 2;
      pdf.setFont('helvetica', 'normal');
      pdf.text('Coluna B:', contentStartX, y);
      y += 4;
      correlacaoData.coluna_b.forEach((item, idx) => {
        const itemSegments = extractTextWithStyles(item);
        if (itemSegments.length > 0) {
          const firstSegment = itemSegments[0];
          firstSegment.text = `${String.fromCharCode(65 + idx)}. ${firstSegment.text}`;
          y = renderStyledText(itemSegments, contentStartX, y, contentMaxWidth, 8);
        } else {
          pdf.setFont('helvetica', 'normal');
          const itemText = removeEmojis(item);
          const itemLines = pdf.splitTextToSize(itemText, contentMaxWidth);
          itemLines.forEach((line: string, lineIndex: number) => {
            if (y + 4 > pageHeight - margin) {
              pdf.addPage();
              y = margin;
            }
            const prefix = lineIndex === 0 ? `${String.fromCharCode(65 + idx)}. ` : '   ';
            pdf.text(prefix + line, contentStartX, y);
            y += 4;
          });
        }
      });
      y += 2;
      pdf.text('Associe os itens da Coluna A com os da Coluna B:', contentStartX, y);
      y += 2;
    }
    
    return y;
  }

  private renderAbertaQuestion(
    pdf: any, question: SimuladoQuestion, contentStartX: number, y: number, contentMaxWidth: number,
    pageHeight: number, margin: number,
    extractTextWithStyles: (text: string) => TextSegment[],
    renderStyledText: (segments: TextSegment[], x: number, yPos: number, maxLineWidth: number, fontSize: number) => number,
    removeEmojis: (text: string) => string,
    removeAssuntoFromPergunta: (perguntaText: string, assunto?: string | null) => string
  ): number {
    const abertaData = question.data as FlashCards;
    const perguntaText = removeAssuntoFromPergunta(question.pergunta || abertaData.pergunta, question.assunto_titulo);
    const perguntaSegments = extractTextWithStyles(perguntaText);

    if (perguntaSegments.length > 0) {
      pdf.setFont('helvetica', 'normal');
      y = renderStyledText(perguntaSegments, contentStartX, y, contentMaxWidth, 8);
      y += 2;
    } else {
      pdf.setFont('helvetica', 'normal');
      const perguntaClean = removeEmojis(perguntaText);
      const perguntaLines = pdf.splitTextToSize(perguntaClean, contentMaxWidth);
      perguntaLines.forEach((line: string) => {
        if (y + 4 > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, contentStartX, y);
        y += 4;
      });
      y += 2;
    }

    const lineWidth = contentMaxWidth;
    const lineStartX = contentStartX;
    const lineEndX = contentStartX + lineWidth;

    for (let i = 0; i < 2; i++) {
      if (y + 4 > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      pdf.setDrawColor(0, 0, 0);
      pdf.setLineWidth(0.2);
      pdf.line(lineStartX, y, lineEndX, y);
      y += 4;
    }

    return y;
  }

  private renderVFGabarito(
    pdf: any, question: SimuladoQuestion, contentStartX: number, y: number, contentMaxWidth: number,
    pageHeight: number, margin: number,
    extractTextWithStyles: (text: string) => TextSegment[],
    renderStyledText: (segments: TextSegment[], x: number, yPos: number, maxLineWidth: number, fontSize: number) => number,
    removeEmojis: (text: string) => string,
    incluirJustificativas: boolean
  ): number {
    const vfData = question.data as PerguntaVF;
    
    const seed = question.id;
    const useFalse = seed % 2 === 0;
    const respostaLabel = useFalse ? 'F' : 'V';

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    const respostaText = `Resposta correta: ${respostaLabel}`;
    pdf.text(respostaText, contentStartX, y);
    y += 4;
    
    if (incluirJustificativas && vfData.justificativa_resposta_certa) {
      pdf.setFont('helvetica', 'italic');
      pdf.text('Justificativa:', contentStartX, y);
      y += 4;
      const justificativaSegments = extractTextWithStyles(vfData.justificativa_resposta_certa);
      if (justificativaSegments.length > 0) {
        y = renderStyledText(justificativaSegments, contentStartX, y, contentMaxWidth, 8);
      } else {
        pdf.setFont('helvetica', 'normal');
        const justificativaText = removeEmojis(vfData.justificativa_resposta_certa);
        const justificativaLines = pdf.splitTextToSize(justificativaText, contentMaxWidth);
        justificativaLines.forEach((line: string) => {
          if (y + 4 > pageHeight - margin) {
            pdf.addPage();
            y = margin;
          }
          pdf.text(line, contentStartX, y);
          y += 4;
        });
      }
    }
    
    return y;
  }

  private renderAbertaGabarito(
    pdf: any, question: SimuladoQuestion, contentStartX: number, y: number, contentMaxWidth: number,
    pageHeight: number, margin: number,
    extractTextWithStyles: (text: string) => TextSegment[],
    renderStyledText: (segments: TextSegment[], x: number, yPos: number, maxLineWidth: number, fontSize: number) => number,
    removeEmojis: (text: string) => string
  ): number {
    const abertaData = question.data as FlashCards;
    const resposta = abertaData.resposta || '';

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.text('Resposta:', contentStartX, y);
    y += 4;

    const respostaSegments = extractTextWithStyles(resposta);
    if (respostaSegments.length > 0) {
      y = renderStyledText(respostaSegments, contentStartX, y, contentMaxWidth, 8);
    } else if (resposta) {
      const respostaClean = removeEmojis(resposta);
      const respostaLines = pdf.splitTextToSize(respostaClean, contentMaxWidth);
      respostaLines.forEach((line: string) => {
        if (y + 4 > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, contentStartX, y);
        y += 4;
      });
    }

    return y;
  }

  private renderMultiplaGabarito(
    pdf: any, question: SimuladoQuestion, contentStartX: number, y: number, contentMaxWidth: number,
    pageHeight: number, margin: number,
    extractTextWithStyles: (text: string) => TextSegment[],
    renderStyledText: (segments: TextSegment[], x: number, yPos: number, maxLineWidth: number, fontSize: number) => number,
    removeEmojis: (text: string) => string,
    incluirJustificativas: boolean
  ): number {
    const multiplaData = question.data as PerguntaMultipla;
    
    pdf.text(`Resposta correta: ${multiplaData.resposta_correta.toUpperCase()}`, contentStartX, y);
    y += 4;
    
    if (incluirJustificativas && multiplaData.justificativa_resposta_certa) {
      pdf.setFont('helvetica', 'italic');
      pdf.text('Justificativa:', contentStartX, y);
      y += 4;
      const justificativaSegments = extractTextWithStyles(multiplaData.justificativa_resposta_certa);
      if (justificativaSegments.length > 0) {
        y = renderStyledText(justificativaSegments, contentStartX, y, contentMaxWidth, 8);
      } else {
        pdf.setFont('helvetica', 'normal');
        const justificativaText = removeEmojis(multiplaData.justificativa_resposta_certa);
        const justificativaLines = pdf.splitTextToSize(justificativaText, contentMaxWidth);
        justificativaLines.forEach((line: string) => {
          if (y + 4 > pageHeight - margin) {
            pdf.addPage();
            y = margin;
          }
          pdf.text(line, contentStartX, y);
          y += 4;
        });
      }
    }
    
    return y;
  }

  private renderCorrelacaoGabarito(
    pdf: any, question: SimuladoQuestion, contentStartX: number, y: number, contentMaxWidth: number,
    pageHeight: number, margin: number,
    extractTextWithStyles: (text: string) => TextSegment[],
    renderStyledText: (segments: TextSegment[], x: number, yPos: number, maxLineWidth: number, fontSize: number) => number,
    removeEmojis: (text: string) => string,
    removeAssuntoFromPergunta: (perguntaText: string, assunto?: string | null) => string,
    incluirJustificativas: boolean
  ): number {
    const correlacaoData = question.data as PerguntaCorrelacao;
    
    const perguntaText = removeAssuntoFromPergunta(question.pergunta || correlacaoData.pergunta, question.assunto_titulo);
    const perguntaSegments = extractTextWithStyles(perguntaText);
    
    if (perguntaSegments.length > 0) {
      pdf.setFont('helvetica', 'normal');
      y = renderStyledText(perguntaSegments, contentStartX, y, contentMaxWidth, 8);
      y += 3;
    } else {
      pdf.setFont('helvetica', 'normal');
      const perguntaClean = removeEmojis(perguntaText);
      const perguntaLines = pdf.splitTextToSize(perguntaClean, contentMaxWidth);
      perguntaLines.forEach((line: string) => {
        if (y + 4 > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, contentStartX, y);
        y += 4;
      });
      y += 3;
    }
    
    pdf.text('Resposta correta:', contentStartX, y);
    y += 4;
    
    if (correlacaoData.resposta_correta && correlacaoData.coluna_a && correlacaoData.coluna_b) {
      Object.keys(correlacaoData.resposta_correta).sort().forEach((key) => {
        const itemIndex = parseInt(key);
        const letterIndex = parseInt(correlacaoData.resposta_correta[key]);
        const itemA = correlacaoData.coluna_a[itemIndex];
        const itemB = correlacaoData.coluna_b[letterIndex];
        
        const itemASegments = extractTextWithStyles(itemA);
        const itemBSegments = extractTextWithStyles(itemB);
        
        const prefix = `${itemIndex + 1} - ${String.fromCharCode(65 + letterIndex)}: `;
        const respostaSegments: TextSegment[] = [
          { text: prefix, bold: false },
          ...itemASegments,
          { text: ' → ', bold: false },
          ...itemBSegments
        ];
        
        y = renderStyledText(respostaSegments, contentStartX, y, contentMaxWidth, 8);
      });
    }
    
    if (incluirJustificativas && correlacaoData.justificativa_resposta_certa) {
      y += 1;
      pdf.setFont('helvetica', 'italic');
      pdf.text('Justificativa:', contentStartX, y);
      y += 4;
      const justificativaSegments = extractTextWithStyles(correlacaoData.justificativa_resposta_certa);
      if (justificativaSegments.length > 0) {
        y = renderStyledText(justificativaSegments, contentStartX, y, contentMaxWidth, 8);
      } else {
        pdf.setFont('helvetica', 'normal');
        const justificativaText = removeEmojis(correlacaoData.justificativa_resposta_certa);
        const justificativaLines = pdf.splitTextToSize(justificativaText, contentMaxWidth);
        justificativaLines.forEach((line: string) => {
          if (y + 4 > pageHeight - margin) {
            pdf.addPage();
            y = margin;
          }
          pdf.text(line, contentStartX, y);
          y += 4;
        });
      }
    }
    
    return y;
  }

  private generateFileName(nomeSimulado: string): string {
    const removeAccents = (str: string): string => {
      return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/gi, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();
    };
    
    const nomeLimpo = removeAccents(nomeSimulado);
    const data = new Date().toISOString().split('T')[0];
    return `simulado-${nomeLimpo}-${data}.pdf`;
  }
}
