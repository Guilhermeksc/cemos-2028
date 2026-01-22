import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Simulados } from '../../../components/simulados/simulados';

@Component({
  selector: 'app-app6-simulados',
  standalone: true,
  imports: [CommonModule, Simulados],
  templateUrl: './app6-simulados.html',
  styleUrl: './app6-simulados.scss'
})
export class App6Simulados implements OnInit {
  // Bibliografias disponíveis para este módulo (mesmas do módulo de perguntas)
  readonly bibliografiasDisponiveisIds: number[] = [4];

  // Rota para Voltar
  bibliografiaPath = '/home/app6-1-relacoes-internacionais/bibliografia';

  pageTitle = 'Simulados de Relações Internacionais';

  ngOnInit() {
    console.log('🚀 [App6Simulados] Módulo de Simulados - Geopolítica e RI iniciado');
    console.log('📚 [App6Simulados] Bibliografias disponíveis:', this.bibliografiasDisponiveisIds);
  }
}
