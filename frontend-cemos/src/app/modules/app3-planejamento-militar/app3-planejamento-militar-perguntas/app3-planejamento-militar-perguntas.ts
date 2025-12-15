import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Perguntas } from '../../../components/perguntas/perguntas';

@Component({
  selector: 'app-app3-planejamento-militar-perguntas',
  standalone: true,
  imports: [CommonModule, Perguntas],
  templateUrl: './app3-planejamento-militar-perguntas.html',
  styleUrl: './app3-planejamento-militar-perguntas.scss'
})
export class App3PlanejamentoMilitarPerguntas implements OnInit {
  // Bibliografias disponíveis para este módulo
  readonly bibliografiasDisponiveisIds: number[] = [69, 70, 71];
    
  // Rota para voltar à bibliografia
  bibliografiaPath = '/home/app3-planejamento-militar/bibliografia';
  
  pageTitle = 'Perguntas de Planejamento Militar';

  ngOnInit() {
    console.log('Módulo de Perguntas - Planejamento Militar iniciado');
    console.log('Bibliografias disponíveis:', this.bibliografiasDisponiveisIds);
  }

  onSimuladoStarted() {
    console.log('Simulado de Planejamento Militar iniciado');
  }
}
