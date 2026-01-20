import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Perguntas } from '../../../components/perguntas/perguntas';

@Component({
  selector: 'app-app1-intendencia-perguntas',
  standalone: true,
  imports: [CommonModule, Perguntas],
  templateUrl: './app1-intendencia-perguntas.html',
  styleUrl: './app1-intendencia-perguntas.scss'
})
export class App1IntendenciaPerguntas implements OnInit {
  // Bibliografias disponíveis para este módulo
  readonly bibliografiasDisponiveisIds: number[] = [36, 37, 38, 
    39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
    54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68];
    
  // Rota para Voltar
  bibliografiaPath = '/home/app1-intendencia/bibliografia';
  
  pageTitle = 'Perguntas de Intendência';

  ngOnInit() {
    console.log('Módulo de Perguntas - Intendência iniciado');
    console.log('Bibliografias disponíveis:', this.bibliografiasDisponiveisIds);
  }

  onSimuladoStarted() {
    console.log('Simulado de Intendência iniciado');
  }
}
