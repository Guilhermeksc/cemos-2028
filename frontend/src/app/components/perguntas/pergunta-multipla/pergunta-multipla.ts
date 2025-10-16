import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerguntaMultipla as PerguntaMultiplaInterface } from '../../../interfaces/perguntas.interface';

@Component({
  selector: 'app-pergunta-multipla',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pergunta-multipla.html',
  styleUrl: '../perguntas.scss'
})
export class PerguntaMultipla {
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
}
