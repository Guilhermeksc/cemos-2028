import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Perguntas } from '../../../components/perguntas/perguntas';
import { HeaderConcentComponent } from '../../../components/header-concent/header-concent';

@Component({
  selector: 'app-app6-geopolitica-relacoes-internacionais-perguntas',
  standalone: true,
  imports: [CommonModule, Perguntas, HeaderConcentComponent],
  templateUrl: './app6-geopolitica-relacoes-internacionais-perguntas.html',
  styleUrl: './app6-geopolitica-relacoes-internacionais-perguntas.scss'
})
export class App6GeopoliticaRelacoesInternacionaisPerguntas implements OnInit {
  // Configuração específica para o módulo de Geopolítica
  bibliografiaIds: number[] = [1, 2, 3, 4]; // Bibliografias IDs 1, 2, 3 e 4 para Geopolítica
  
  pageTitle = 'Perguntas de Geopolítica e Relações Internacionais';
  // Estado do simulado
  simuladoAtivo: boolean = false;
  ultimoResultado: any | null = null;

  ngOnInit() {
    console.log('Módulo de Perguntas - Geopolítica e Relações Internacionais iniciado');
    console.log('Bibliografias configuradas:', this.bibliografiaIds);
  }

  getBibliografiaIdsString(): string {
    return this.bibliografiaIds.join(', ');
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
