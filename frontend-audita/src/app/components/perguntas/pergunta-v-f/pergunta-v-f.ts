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

  @Input() questionId!: number;
  @Input() questionData!: PerguntaVFInterface;
  @Input() isAnswered: boolean = false;
  @Input() isCorrect: boolean = false;
  @Output() answerSubmitted = new EventEmitter<{ questionId: number, answer: boolean }>();

  userAnswer?: boolean;

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
    // Retorna a afirmação que foi sorteada para exibição
    return this.questionData.afirmacao_sorteada ?? this.questionData.afirmacao_verdadeira;
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
   * Processa markdown e retorna como string HTML segura para a afirmação verdadeira
   */
  getAfirmacaoVerdadeiraFormatted(): SafeHtml {
    return this.processMarkdown(this.questionData.afirmacao_verdadeira || '');
  }

  /**
   * Processa markdown e retorna como string HTML segura para a justificativa
   */
  getJustificativaFormatted(): SafeHtml {
    return this.processMarkdown(this.questionData.justificativa_resposta_certa || '');
  }
}
