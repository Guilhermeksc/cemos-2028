import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Perguntas } from '../../../components/perguntas/perguntas';

@Component({
  selector: 'app-app4-historia-perguntas',
  standalone: true,
  imports: [CommonModule, Perguntas],
  templateUrl: './app4-historia-perguntas.html',
  styleUrl: './app4-historia-perguntas.scss'
})
export class App4HistoriaPerguntas implements OnInit {
  // Bibliografias disponíveis para este módulo
  readonly bibliografiasDisponiveisIds: number[] = [5, 6, 7, 8];
    
  // Rota para voltar à bibliografia
  bibliografiaPath = '/home/app4-historia/bibliografia';
  
  pageTitle = 'Perguntas de História';

  ngOnInit() {
    console.log('Módulo de Perguntas - História iniciado');
    console.log('Bibliografias disponíveis:', this.bibliografiasDisponiveisIds);
  }

  onSimuladoStarted() {
    console.log('Simulado de História iniciado');
  }
}
