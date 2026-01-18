import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Simulados } from '../../../components/simulados/simulados';

@Component({
  selector: 'app-app1-simulados',
  standalone: true,
  imports: [CommonModule, Simulados],
  templateUrl: './app1-simulados.html',
  styleUrl: './app1-simulados.scss'
})
export class App1Simulados implements OnInit {
  // Bibliografias disponíveis para este módulo (mesmas do módulo de perguntas)
  readonly bibliografiasDisponiveisIds: number[] = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68];

  // Rota para voltar à bibliografia
  bibliografiaPath = '/home/app1-intendencia/bibliografia';

  pageTitle = 'Simulados de Intendência';

  ngOnInit() {
    console.log('🚀 [App1Simulados] Módulo de Simulados - Intendência iniciado');
    console.log('📚 [App1Simulados] Bibliografias disponíveis:', this.bibliografiasDisponiveisIds);
  }
}
