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
  readonly bibliografiasDisponiveisIds: number[] = [1, 2, 3, 4];

  // Rota para voltar à bibliografia
  bibliografiaPath = '/home/app6-geopolitica-relacoes-internacionais/bibliografia';

  pageTitle = 'Simulados de Geopolítica e Relações Internacionais';

  ngOnInit() {
    console.log('🚀 [App6Simulados] Módulo de Simulados - Geopolítica e RI iniciado');
    console.log('📚 [App6Simulados] Bibliografias disponíveis:', this.bibliografiasDisponiveisIds);
  }
}
