import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Perguntas } from '../../../components/perguntas/perguntas';

@Component({
  selector: 'app-app7-politica-perguntas',
  standalone: true,
  imports: [CommonModule, Perguntas],
  templateUrl: './app7-politica-perguntas.html',
  styleUrl: './app7-politica-perguntas.scss'
})

export class App7PoliticaPerguntas implements OnInit {
  // Bibliografias disponíveis para este módulo
  readonly bibliografiasDisponiveisIds: number[] = [9,10,11,12,13,14,15,16,17];
    
  // Rota para Voltar
  bibliografiaPath = '/home/app7-politica/bibliografia';
  
  pageTitle = 'Perguntas de Política';

  ngOnInit() {
    console.log('Módulo de Perguntas - Política iniciado');
    console.log('Bibliografias disponíveis:', this.bibliografiasDisponiveisIds);
  }

  onSimuladoStarted() {
    console.log('Simulado de Política iniciado');
  }
}
