import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PerguntaMultipla as PerguntaMultiplaInterface } from '../../../interfaces/perguntas.interface';

@Component({
  selector: 'app-pergunta-multipla',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pergunta-multipla.html',
  styleUrl: '../perguntas.scss'
})
export class PerguntaMultipla {
  private sanitizer = inject(DomSanitizer);

  @Input() questionId!: number;
  @Input() questionData!: PerguntaMultiplaInterface;
  @Input() isAnswered: boolean = false;
  @Input() isCorrect: boolean = false;
  @Output() answerSubmitted = new EventEmitter<{ questionId: number, answer: string }>();

  userAnswer?: string;

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

  getCorrectAnswer(): string {
    return this.questionData.resposta_correta.toUpperCase();
  }

  getAlternativaText(letra: string): string {
    const alternativasMap: { [key: string]: string } = {
      'a': this.questionData.alternativa_a,
      'b': this.questionData.alternativa_b,
      'c': this.questionData.alternativa_c,
      'd': this.questionData.alternativa_d
    };
    return alternativasMap[letra.toLowerCase()] || '';
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
   * Processa markdown e retorna como string HTML segura para a alternativa
   */
  getAlternativaTextFormatted(letra: string): SafeHtml {
    return this.processMarkdown(this.getAlternativaText(letra));
  }

  /**
   * Processa markdown e retorna como string HTML segura para a justificativa
   */
  getJustificativaFormatted(): SafeHtml {
    return this.processMarkdown(this.questionData.justificativa_resposta_certa || '');
  }
}
