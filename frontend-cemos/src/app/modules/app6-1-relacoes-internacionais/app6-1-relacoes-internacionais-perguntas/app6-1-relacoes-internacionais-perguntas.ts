import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Perguntas } from '../../../components/perguntas/perguntas';

@Component({
  selector: 'app-app6-geopolitica-relacoes-internacionais-perguntas',
  standalone: true,
  imports: [CommonModule, Perguntas],
  templateUrl: './app6-1-relacoes-internacionais-perguntas.html',
  styleUrl: './app6-1-relacoes-internacionais-perguntas.scss'
})
export class App6RelacoesInternacionaisPerguntas implements OnInit {
  // Bibliografias disponíveis para este módulo
  readonly bibliografiasDisponiveisIds: number[] = [4];
  
  // Rota para Voltar
  bibliografiaPath = '/home/app6-geopolitica-relacoes-internacionais/bibliografia';
  
  pageTitle = 'Perguntas de Relações Internacionais';

  ngOnInit() {
    console.log('Módulo de Perguntas - Relações Internacionais iniciado');
    console.log('Bibliografias disponíveis:', this.bibliografiasDisponiveisIds);
  }

  onSimuladoStarted() {
    console.log('Simulado de Relações Internacionais iniciado');
  }
}
