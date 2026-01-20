import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Perguntas } from '../../../components/perguntas/perguntas';

@Component({
  selector: 'app-app9-economia-perguntas',
  standalone: true,
  imports: [CommonModule, Perguntas],
  templateUrl: './app9-economia-perguntas.html',
  styleUrl: './app9-economia-perguntas.scss'
})
export class App9EconomiaPerguntas implements OnInit {
  // Bibliografias disponíveis para este módulo
  readonly bibliografiasDisponiveisIds: number[] = [30, 31, 32];
    
  // Rota para Voltar
  bibliografiaPath = '/home/app9-economia/bibliografia';
  
  pageTitle = 'Perguntas de Economia';

  ngOnInit() {
    console.log('Módulo de Perguntas - Economia iniciado');
    console.log('Bibliografias disponíveis:', this.bibliografiasDisponiveisIds);
  }

  onSimuladoStarted() {
    console.log('Simulado de Economia iniciado');
  }
}
