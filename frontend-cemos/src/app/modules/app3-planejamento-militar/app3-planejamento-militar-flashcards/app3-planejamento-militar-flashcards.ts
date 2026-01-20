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
  // IDs das bibliografias de Planejamento Militar
  bibliografiaIds: number[] = [69, 70, 71];

  // Rota para Voltar
  bibliografiaPath = '/home/app3-planejamento-militar/bibliografia';

}
