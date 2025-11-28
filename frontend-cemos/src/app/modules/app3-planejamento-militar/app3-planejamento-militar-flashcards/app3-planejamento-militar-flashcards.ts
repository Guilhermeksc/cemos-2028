import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashCardsComponent } from '../../../components/flash-cards/flash-cards';

@Component({
  selector: 'app-app3-planejamento-militar-flashcards',
  standalone: true,
  imports: [CommonModule, FlashCardsComponent],
  templateUrl: './app3-planejamento-militar-flashcards.html',
  styleUrl: './app3-planejamento-militar-flashcards.scss'
})
export class App3PlanejamentoMilitarFlashcards {
  // IDs das bibliografias de Geopolítica e Relações Internacionais
  bibliografiaIds: number[] = [1, 2, 3, 4];

  // Rota para voltar à bibliografia
  bibliografiaPath = '/home/app3-planejamento-militar/bibliografia';

}
