import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PerguntaVF as PerguntaVFInterface } from '../../../interfaces/perguntas.interface';

@Component({
  selector: 'app-pergunta-v-f',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pergunta-v-f.html',
  styleUrl: '../perguntas.scss'
})
export class PerguntaVF {
  private sanitizer = inject(DomSanitizer);

  @Input() questionId!: number; // ID fixo numérico
  @Input() questionData!: PerguntaVFInterface;
  @Input() isAnswered: boolean = false;
  @Input() isCorrect: boolean = false;
  @Output() answerSubmitted = new EventEmitter<{ questionId: number, answer: boolean }>();

  userAnswer?: boolean;

  /**
   * Remove o assunto de um texto se ele aparecer no início ou final
   */
  private removeAssuntoFromText(text: string, assunto?: string): string {
    if (!text || !assunto) return text;

    // Normalizar ambos os textos para comparação
    const normalize = (t: string): string => {
      return t.trim().replace(/\s+/g, ' ').trim();
    };

    const assuntoNormalized = normalize(assunto);
    if (!assuntoNormalized) return text;

    // Dividir o texto em linhas
    const lines = text.split(/\r?\n/);

    // Verificar e remover se a primeira linha for o assunto
    if (lines.length > 0) {
      const firstLineNormalized = normalize(lines[0]);
      if (firstLineNormalized === assuntoNormalized) {
        lines.shift();
        // Remover linhas vazias subsequentes
        while (lines.length > 0 && lines[0].trim() === '') {
          lines.shift();
        }
      }
    }

    // Verificar e remover se a última linha for o assunto
    if (lines.length > 0) {
      const lastLineNormalized = normalize(lines[lines.length - 1]);
      if (lastLineNormalized === assuntoNormalized) {
        lines.pop();
        // Remover linhas vazias anteriores
        while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
          lines.pop();
        }
      }
    }

    // Reconstruir o texto
    let result = lines.join('\n').trim();

    // Verificação adicional: se o texto ainda começa com o assunto (sem quebra de linha)
    const resultNormalized = normalize(result);
    if (resultNormalized.startsWith(assuntoNormalized)) {
      // Tentar remover o assunto do início
      const index = result.toLowerCase().indexOf(assuntoNormalized.toLowerCase());
      if (index === 0 || (index > 0 && /^\s*$/.test(result.substring(0, index)))) {
        // Encontrar onde o assunto termina
        let charCount = 0;
        let endIndex = 0;

        for (let i = 0; i < result.length && charCount < assuntoNormalized.length; i++) {
          const char = result[i];
          if (char !== '\n' && char !== '\r') {
            const normalizedChar = char.toLowerCase().replace(/\s+/g, ' ');
            if (normalizedChar !== ' ' || charCount === 0 || result[i - 1] !== ' ') {
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

    return result || text; // Se remover tudo, retornar o original
  }

  onSubmit(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.userAnswer === undefined) return;

    this.answerSubmitted.emit({
      questionId: this.questionId,
      answer: this.userAnswer
    });
  }

  getCorrectAnswer(): boolean {
    // Se a afirmação sorteada é verdadeira, a resposta correta é true (Verdadeiro)
    // Se a afirmação sorteada é falsa, a resposta correta é false (Falso)
    return this.questionData.afirmacao_sorteada_eh_verdadeira ?? true;
  }
  
  getAfirmacaoSorteada(): string {
    // Retorna a afirmação que foi sorteada para exibição (sem assunto)
    const afirmacao = this.questionData.afirmacao_sorteada ?? this.questionData.afirmacao_verdadeira;
    // Remover assunto se presente
    if (this.questionData.assunto_titulo) {
      return this.removeAssuntoFromText(afirmacao, this.questionData.assunto_titulo);
    }
    return afirmacao;
  }

  /**
   * Processa markdown básico: converte *texto* ou **texto** para negrito
   * @param text Texto a ser processado
   * @returns SafeHtml com o texto processado
   */
  processMarkdown(text: string): SafeHtml {
    if (!text) return this.sanitizer.sanitize(1, '') || '';
    
    // Escapar HTML existente para segurança
    let processed = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
    
    // Usar marca temporária única para evitar conflitos
    const TEMP_OPEN = '___TEMP_OPEN_STRONG___';
    const TEMP_CLOSE = '___TEMP_CLOSE_STRONG___';
    
    // Processar **texto** (negrito duplo asterisco) primeiro
    processed = processed.replace(/\*\*([^*]+)\*\*/g, (match, content) => {
      return TEMP_OPEN + content + TEMP_CLOSE;
    });
    
    // Processar *texto* (negrito simples asterisco) - apenas asteriscos simples que não foram processados
    processed = processed.replace(/\*([^*]+)\*/g, (match, content) => {
      // Se já contém marca temporária, não processar (já foi processado como **texto**)
      if (match.includes(TEMP_OPEN) || match.includes(TEMP_CLOSE)) {
        return match;
      }
      return TEMP_OPEN + content + TEMP_CLOSE;
    });
    
    // Substituir marcas temporárias por tags <strong>
    processed = processed.replace(new RegExp(TEMP_OPEN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '<strong>');
    processed = processed.replace(new RegExp(TEMP_CLOSE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '</strong>');
    
    return this.sanitizer.sanitize(1, processed) || '';
  }

  /**
   * Processa markdown e retorna como string HTML segura para a afirmação
   */
  getAfirmacaoSorteadaFormatted(): SafeHtml {
    return this.processMarkdown(this.getAfirmacaoSorteada());
  }

  /**
   * Processa markdown e retorna como string HTML segura para a afirmação verdadeira (sem assunto)
   */
  getAfirmacaoVerdadeiraFormatted(): SafeHtml {
    let afirmacao = this.questionData.afirmacao_verdadeira || '';
    // Remover assunto se presente
    if (this.questionData.assunto_titulo) {
      afirmacao = this.removeAssuntoFromText(afirmacao, this.questionData.assunto_titulo);
    }
    return this.processMarkdown(afirmacao);
  }

  /**
   * Processa markdown e retorna como string HTML segura para a pergunta
   */
  getPerguntaFormatted(): SafeHtml {
    let pergunta = this.questionData.pergunta || '';
    // Remover assunto se presente
    if (this.questionData.assunto_titulo) {
      pergunta = this.removeAssuntoFromText(pergunta, this.questionData.assunto_titulo);
    }
    return this.processMarkdown(pergunta);
  }

  /**
   * Processa markdown e retorna como string HTML segura para a justificativa
   */
  getJustificativaFormatted(): SafeHtml {
    return this.processMarkdown(this.questionData.justificativa_resposta_certa || '');
  }
}
