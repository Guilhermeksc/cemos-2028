import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceitosComponent } from '../../../components/conceitos/conceitos';

@Component({
  selector: 'app-app3-planejamento-militar-conceitos',
  standalone: true,
  imports: [CommonModule, ConceitosComponent],
  templateUrl: './app3-planejamento-militar-conceitos.html',
  styleUrl: './app3-planejamento-militar-conceitos.scss'
})
export class App3PlanejamentoMilitarConceitos {

  planejamentoMilitarConceitosBibliografiaIds: number[] = [69, 70, 71, 72]; 

  emptyMessage = 'Nenhum conceito de Planejamento Militar encontrado. Adicione conceitos relacionados às matérias para visualizá-los aqui.';
  
  // Configurações do header
  moduleLabel = 'Planejamento Militar';
  moduleEmoji = '🪖';

  // Paths para navegação entre módulos
  private readonly ROUTE_BASE = '/home/app3-planejamento-militar';
  
  flashcardsPath = `${this.ROUTE_BASE}/flash-cards`;
  perguntasPath = `${this.ROUTE_BASE}/perguntas`;
  backToBibliografiaPath = `${this.ROUTE_BASE}/bibliografia`;
}
