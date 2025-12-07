import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceitosComponent } from '../../../components/conceitos/conceitos';

@Component({
  selector: 'app-app9-economia-conceitos',
  standalone: true,
  imports: [CommonModule, ConceitosComponent],
  templateUrl: './app9-economia-conceitos.html',
  styleUrl: './app9-economia-conceitos.scss'
})
export class App9EconomiaConceitos {
  // IDs das bibliografias relacionadas à Geopolítica e Relações Internacionais
  // Para descobrir os IDs corretos:
  // 1. Acesse o admin do Django ou a API diretamente
  // 2. Liste as bibliografias: GET /perguntas/api/bibliografias/
  // 3. Encontre os IDs das bibliografias de Geopolítica e RI
  // 4. Substitua este array pelos IDs reais
  // 
  // Exemplo de uso:
  // geopoliticaBibliografiaIds: number[] = [1, 5, 12]; // Kaplan, Mattos, Vesentini
  //
  // Se deixar vazio [], o componente mostrará todas as bibliografias que têm conceitos
  geopoliticaBibliografiaIds: number[] = [30, 31, 32];

  emptyMessage = 'Nenhum conceito de Geopolítica e RI encontrado. Adicione conceitos relacionados às matérias para visualizá-los aqui.';
  
  // Configurações do header
  moduleLabel = 'Economia';
  moduleEmoji = '🌍';

  // Paths para navegação entre módulos
  private readonly ROUTE_BASE = '/home/app9-economia';
  
  flashcardsPath = `${this.ROUTE_BASE}/flash-cards`;
  perguntasPath = `${this.ROUTE_BASE}/perguntas`;
  backToBibliografiaPath = `${this.ROUTE_BASE}/bibliografia`;
}
