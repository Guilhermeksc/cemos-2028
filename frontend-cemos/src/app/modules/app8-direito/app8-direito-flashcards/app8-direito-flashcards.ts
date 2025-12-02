import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashCardsComponent } from '../../../components/flash-cards/flash-cards';

@Component({
  selector: 'app-app8-direito-flashcards',
  imports: [CommonModule, FlashCardsComponent],
  templateUrl: './app8-direito-flashcards.html',
  styleUrl: './app8-direito-flashcards.scss'
})
export class App8DireitoFlashcards {

  bibliografiaIds: number[] = [18];

  // Rota para voltar à bibliografia
  bibliografiaPath = '/home/app8-direito/bibliografia';

  // Título opcional para o componente flash-cards
  title = 'Direito';

}
