import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashCardsComponent } from '../../../components/flash-cards/flash-cards';

@Component({
  selector: 'app-app1-intendencia-flashcards',
  imports: [CommonModule, FlashCardsComponent],
  templateUrl: './app1-intendencia-flashcards.html',
  styleUrl: './app1-intendencia-flashcards.scss'
})
export class App1IntendenciaFlashcards {

  bibliografiaIds: number[] = [18];

  // Rota para voltar à bibliografia
  bibliografiaPath = '/home/app1-intendencia/bibliografia';

}
