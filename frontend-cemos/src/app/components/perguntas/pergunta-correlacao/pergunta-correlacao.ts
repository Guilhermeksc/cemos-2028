import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PerguntaCorrelacao as PerguntaCorrelacaoInterface } from '../../../interfaces/perguntas.interface';

@Component({
  selector: 'app-pergunta-correlacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pergunta-correlacao.html',
  styleUrl: '../perguntas.scss'
})
export class PerguntaCorrelacao {
  private sanitizer = inject(DomSanitizer);

  @Input() questionId!: number;
  @Input() questionData!: PerguntaCorrelacaoInterface;
  @Input() isAnswered: boolean = false;
  @Input() isCorrect: boolean = false;
  @Output() answerSubmitted = new EventEmitter<{ questionId: number, answer: any }>();

  userAnswer: { [key: string]: string } = {};

  updateCorrelacao(itemNumber: number, selectedLetter: string) {
    if (selectedLetter) {
      this.userAnswer[itemNumber.toString()] = selectedLetter;
    } else {
      delete this.userAnswer[itemNumber.toString()];
    }
  }

  isComplete(): boolean {
    if (!this.questionData?.coluna_a) return false;
    
    const totalItems = this.questionData.coluna_a.length;
    
    for (let i = 1; i <= totalItems; i++) {
      const answer = this.userAnswer[i.toString()];
      if (!answer || answer === '') {
        return false;
      }
    }
    
    return true;
  }

  onSubmit(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!this.isComplete()) return;

    this.answerSubmitted.emit({
      questionId: this.questionId,
      answer: this.userAnswer
    });
  }

  getCorrectLetter(displayKey: string): string {
    const backendKey = (parseInt(displayKey) - 1).toString();
    const numericValue = this.questionData.resposta_correta[backendKey];
    return String.fromCharCode(65 + parseInt(numericValue));
  }

  getMissingCount(): number {
    if (!this.questionData?.coluna_a) return 0;
    
    const totalItems = this.questionData.coluna_a.length;
    let missingCount = 0;
    
    for (let i = 1; i <= totalItems; i++) {
      const answer = this.userAnswer[i.toString()];
      if (!answer || answer === '') {
        missingCount++;
      }
    }
    
    return missingCount;
  }

  isItemAnswered(itemNumber: number): boolean {
    const answer = this.userAnswer[itemNumber.toString()];
    return !!(answer && answer !== '');
  }

  getStringFromCharCode(code: number): string {
    return String.fromCharCode(code);
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
   * Processa markdown e retorna como string HTML segura para item da coluna A
   */
  getColunaAItemFormatted(item: string): SafeHtml {
    return this.processMarkdown(item);
  }

  /**
   * Processa markdown e retorna como string HTML segura para item da coluna B
   */
  getColunaBItemFormatted(item: string): SafeHtml {
    return this.processMarkdown(item);
  }

  /**
   * Processa markdown e retorna como string HTML segura para a justificativa
   */
  getJustificativaFormatted(): SafeHtml {
    return this.processMarkdown(this.questionData.justificativa_resposta_certa || '');
  }
}
