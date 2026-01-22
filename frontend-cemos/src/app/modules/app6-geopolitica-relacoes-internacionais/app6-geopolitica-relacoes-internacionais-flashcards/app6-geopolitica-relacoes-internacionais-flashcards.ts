import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashCardsComponent } from '../../../components/flash-cards/flash-cards';

@Component({
  selector: 'app-app6-geopolitica-relacoes-internacionais-flashcards',
  standalone: true,
  imports: [CommonModule, FlashCardsComponent],
  templateUrl: './app6-geopolitica-relacoes-internacionais-flashcards.html',
  styleUrl: './app6-geopolitica-relacoes-internacionais-flashcards.scss'
})
export class App6GeopoliticaRelacoesInternacionaisFlashcards {
  // IDs das bibliografias de Geopolítica e Relações Internacionais
  bibliografiaIds: number[] = [1, 2, 3];

  // Rota para Voltar
  bibliografiaPath = '/home/app6-geopolitica-relacoes-internacionais/bibliografia';

}
