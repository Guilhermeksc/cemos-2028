import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Simulados } from '../../../components/simulados/simulados';

@Component({
  selector: 'app-app9-simulados',
  standalone: true,
  imports: [CommonModule, Simulados],
  templateUrl: './app9-simulados.html',
  styleUrl: './app9-simulados.scss'
})
export class App9Simulados implements OnInit {
  // Bibliografias disponíveis para este módulo (mesmas do módulo de perguntas)
  readonly bibliografiasDisponiveisIds: number[] = [30, 31, 32];

  // Rota para voltar à bibliografia
  bibliografiaPath = '/home/app9-economia/bibliografia';

  pageTitle = 'Simulados de Economia';

  ngOnInit() {
    console.log('🚀 [App9Simulados] Módulo de Simulados - Economia iniciado');
    console.log('📚 [App9Simulados] Bibliografias disponíveis:', this.bibliografiasDisponiveisIds);
  }
}
