import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashCardsComponent } from '../../../components/flash-cards/flash-cards';

@Component({
  selector: 'app-app7-politica-flashcards',
  imports: [CommonModule, FlashCardsComponent],
  templateUrl: './app7-politica-flashcards.html',
  styleUrl: './app7-politica-flashcards.scss'
})

export class App7PoliticaFlashcards {

  bibliografiaIds: number[] = [9];

  // Rota para Voltar
  bibliografiaPath = '/home/app7-politica/bibliografia';

}
