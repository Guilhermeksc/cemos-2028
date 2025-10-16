import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Perguntas } from '../../../components/perguntas/perguntas';

@Component({
  selector: 'app-app6-geopolitica-relacoes-internacionais-perguntas',
  standalone: true,
  imports: [CommonModule, Perguntas],
  templateUrl: './app6-geopolitica-relacoes-internacionais-perguntas.html',
  styleUrl: './app6-geopolitica-relacoes-internacionais-perguntas.scss'
})
export class App6GeopoliticaRelacoesInternacionaisPerguntas implements OnInit {
  // Configuração específica para o módulo de Geopolítica
  bibliografiaIds: number[] = [1]; // Bibliografia ID 1 para Geopolítica
  
  // Estado do simulado
  simuladoAtivo: boolean = false;
  ultimoResultado: any | null = null;

  ngOnInit() {
    console.log('Módulo de Perguntas - Geopolítica e Relações Internacionais iniciado');
    console.log('Bibliografia configurada:', this.bibliografiaIds);
  }

  onSimuladoStarted() {
    console.log('Simulado de Geopolítica iniciado');
    this.simuladoAtivo = true;
    this.ultimoResultado = null;
  }

  resetarSimulado() {
    this.simuladoAtivo = false;
    this.ultimoResultado = null;
    // Recarregar a página ou resetar o estado do componente
    window.location.reload();
  }
}
