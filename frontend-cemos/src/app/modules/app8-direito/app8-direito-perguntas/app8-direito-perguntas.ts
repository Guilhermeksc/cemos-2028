import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Perguntas } from '../../../components/perguntas/perguntas';

@Component({
  selector: 'app-app8-direito-perguntas',
  standalone: true,
  imports: [CommonModule, Perguntas],
  templateUrl: './app8-direito-perguntas.html',
  styleUrl: './app8-direito-perguntas.scss'
})
export class App8DireitoPerguntas implements OnInit {
  // Bibliografias disponíveis para este módulo
  readonly bibliografiasDisponiveisIds: number[] = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
    
  // Rota para voltar à bibliografia
  bibliografiaPath = '/home/app8-direito/bibliografia';
  
  pageTitle = 'Perguntas de Direito';

  ngOnInit() {
    console.log('Módulo de Perguntas - Direito iniciado');
    console.log('Bibliografias disponíveis:', this.bibliografiasDisponiveisIds);
  }

  onSimuladoStarted() {
    console.log('Simulado de Direito iniciado');
  }
}
