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

  bibliografiaIds: number[] = [36, 37, 38, 
    39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
    54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68];

  // Rota para voltar à bibliografia
  bibliografiaPath = '/home/app1-intendencia/bibliografia';

}
