import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerguntaCorrelacao as PerguntaCorrelacaoInterface } from '../../../interfaces/perguntas.interface';

@Component({
  selector: 'app-pergunta-correlacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pergunta-correlacao.html',
  styleUrl: '../perguntas.scss'
})
export class PerguntaCorrelacao {
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
}
