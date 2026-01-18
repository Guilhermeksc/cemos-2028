import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Simulados } from '../../../components/simulados/simulados';

@Component({
  selector: 'app-app2-simulados',
  standalone: true,
  imports: [CommonModule, Simulados],
  templateUrl: './app2-simulados.html',
  styleUrl: './app2-simulados.scss'
})
export class App2Simulados implements OnInit {
  // Bibliografias disponíveis para este módulo (mesmas do módulo de perguntas)
  readonly bibliografiasDisponiveisIds: number[] = [33, 34, 35];

  // Rota para voltar à bibliografia
  bibliografiaPath = '/home/app2-estrategia/bibliografia';

  pageTitle = 'Simulados de Estratégia';

  ngOnInit() {
    console.log('🚀 [App2Simulados] Módulo de Simulados - Estratégia iniciado');
    console.log('📚 [App2Simulados] Bibliografias disponíveis:', this.bibliografiasDisponiveisIds);
  }
}
