import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashCardsComponent } from '../../../components/flash-cards/flash-cards';

@Component({
  selector: 'app-app9-economia-flashcards',
  imports: [CommonModule, FlashCardsComponent],
  templateUrl: './app9-economia-flashcards.html',
  styleUrl: './app9-economia-flashcards.scss'
})
export class App9EconomiaFlashcards {

  bibliografiaIds: number[] = [30, 31, 32];

  // Rota para voltar à bibliografia
  bibliografiaPath = '/home/app9-economia/bibliografia';

  // Título opcional para o componente flash-cards
  title = 'Economia';

}
