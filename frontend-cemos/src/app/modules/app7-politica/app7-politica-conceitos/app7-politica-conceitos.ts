import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceitosComponent } from '../../../components/conceitos/conceitos';

@Component({
  selector: 'app-app7-politica-conceitos',
  standalone: true,
  imports: [CommonModule, ConceitosComponent],
  templateUrl: './app7-politica-conceitos.html',
  styleUrl: './app7-politica-conceitos.scss'
})
export class App7PoliticaConceitos {

  politicaConceitosBibliografiaIds: number[] = [9, 10, 11, 12, 13, 14, 15, 16, 17]; 

  emptyMessage = 'Nenhum conceito de Política encontrado. Adicione conceitos relacionados às matérias para visualizá-los aqui.';
  
  // Configurações do header
  moduleLabel = 'Política';
  moduleEmoji = '🌍';

  // Paths para navegação entre módulos
  private readonly ROUTE_BASE = '/home/app7-politica';
  
  flashcardsPath = `${this.ROUTE_BASE}/flash-cards`;
  perguntasPath = `${this.ROUTE_BASE}/perguntas`;
  backToBibliografiaPath = `${this.ROUTE_BASE}/bibliografia`;
}
