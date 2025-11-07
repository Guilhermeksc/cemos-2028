import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerguntaVF as PerguntaVFInterface } from '../../../interfaces/perguntas.interface';

@Component({
  selector: 'app-pergunta-v-f',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pergunta-v-f.html',
  styleUrl: '../perguntas.scss'
})
export class PerguntaVF {
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
}
