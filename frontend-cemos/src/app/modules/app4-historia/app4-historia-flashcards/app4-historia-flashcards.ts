import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashCardsComponent } from '../../../components/flash-cards/flash-cards';

@Component({
  selector: 'app-app4-historia-flashcards',
  imports: [CommonModule, FlashCardsComponent],
  templateUrl: './app4-historia-flashcards.html',
  styleUrl: './app4-historia-flashcards.scss'
})
export class App4HistoriaFlashcards {

  bibliografiaIds: number[] = [5];

  // Rota para voltar à bibliografia
  bibliografiaPath = '/home/app4-historia/bibliografia';

}
