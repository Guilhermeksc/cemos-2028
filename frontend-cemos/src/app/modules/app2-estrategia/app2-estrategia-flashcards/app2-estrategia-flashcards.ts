import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashCardsComponent } from '../../../components/flash-cards/flash-cards';

@Component({
  selector: 'app-app2-estrategia-flashcards',
  imports: [CommonModule, FlashCardsComponent],
  templateUrl: './app2-estrategia-flashcards.html',
  styleUrl: './app2-estrategia-flashcards.scss'
})
export class App2EstrategiaFlashcards {

  bibliografiaIds: number[] = [33, 34, 35];

  // Rota para voltar à bibliografia
  bibliografiaPath = '/home/app2-estrategia/bibliografia';

  // Título opcional para o componente flash-cards
  title = 'Estratégia';

}
