import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Perguntas } from '../../../components/perguntas/perguntas';

@Component({
  selector: 'app-app2-estrategia-perguntas',
  standalone: true,
  imports: [CommonModule, Perguntas],
  templateUrl: './app2-estrategia-perguntas.html',
  styleUrl: './app2-estrategia-perguntas.scss'
})
export class App2EstrategiaPerguntas implements OnInit {
  // Bibliografias disponíveis para este módulo
  readonly bibliografiasDisponiveisIds: number[] = [33, 34, 35];
    
  // Rota para voltar à bibliografia
  bibliografiaPath = '/home/app2-estrategia/bibliografia';
  
  pageTitle = 'Perguntas de Estratégia';

  ngOnInit() {
    console.log('Módulo de Perguntas - Estratégia iniciado');
    console.log('Bibliografias disponíveis:', this.bibliografiasDisponiveisIds);
  }

  onSimuladoStarted() {
    console.log('Simulado de Estratégia iniciado');
  }
}
