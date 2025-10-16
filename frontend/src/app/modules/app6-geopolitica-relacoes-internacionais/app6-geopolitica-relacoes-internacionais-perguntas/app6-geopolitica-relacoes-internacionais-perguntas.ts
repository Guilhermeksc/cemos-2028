import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Perguntas } from '../../../components/perguntas/perguntas';

interface SimuladoResult {
  totalQuestoes: number;
  acertos: number;
  erros: number;
  percentual: number;
  questoes: any[];
}

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
  showBibliografiaSelector: boolean = false; // Não mostrar seletor, usar bibliografia fixa
  autoStartSimulado: boolean = false; // Permitir que usuário inicie manualmente
  
  // Estado do simulado
  simuladoAtivo: boolean = false;
  ultimoResultado: SimuladoResult | null = null;

  ngOnInit() {
    console.log('Módulo de Perguntas - Geopolítica e Relações Internacionais iniciado');
    console.log('Bibliografia configurada:', this.bibliografiaIds);
  }

  onSimuladoStarted() {
    console.log('Simulado de Geopolítica iniciado');
    this.simuladoAtivo = true;
    this.ultimoResultado = null;
  }

  onSimuladoFinished(resultado: SimuladoResult) {
    console.log('Simulado de Geopolítica finalizado:', resultado);
    this.simuladoAtivo = false;
    this.ultimoResultado = resultado;
    
    // Aqui você pode adicionar lógica adicional como:
    // - Salvar resultado no localStorage
    // - Enviar estatísticas para o backend
    // - Mostrar mensagens personalizadas baseadas no desempenho
    this.processarResultado(resultado);
  }

  private processarResultado(resultado: SimuladoResult) {
    // Lógica para processar o resultado do simulado
    if (resultado.percentual >= 80) {
      console.log('Excelente desempenho em Geopolítica!');
    } else if (resultado.percentual >= 60) {
      console.log('Bom desempenho, continue estudando!');
    } else {
      console.log('Recomendamos mais estudo em Geopolítica e Relações Internacionais.');
    }

    // Salvar resultado no localStorage para histórico
    this.salvarResultadoHistorico(resultado);
  }

  private salvarResultadoHistorico(resultado: SimuladoResult) {
    const historico = this.getHistoricoResultados();
    const novoResultado = {
      ...resultado,
      data: new Date().toISOString(),
      modulo: 'Geopolítica e Relações Internacionais',
      bibliografia: 'Bibliografia ID 1'
    };
    
    historico.push(novoResultado);
    
    // Manter apenas os últimos 10 resultados
    if (historico.length > 10) {
      historico.splice(0, historico.length - 10);
    }
    
    localStorage.setItem('simulado-geopolitica-historico', JSON.stringify(historico));
  }

  getHistoricoResultados(): any[] {
    const historico = localStorage.getItem('simulado-geopolitica-historico');
    return historico ? JSON.parse(historico) : [];
  }

  resetarSimulado() {
    this.simuladoAtivo = false;
    this.ultimoResultado = null;
  }

  get melhorResultado(): number {
    const historico = this.getHistoricoResultados();
    if (historico.length === 0) return 0;
    
    return Math.max(...historico.map(r => r.percentual));
  }

  get totalSimuladosRealizados(): number {
    return this.getHistoricoResultados().length;
  }
}
