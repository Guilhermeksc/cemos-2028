import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Simulados } from '../../../components/simulados/simulados';

@Component({
  selector: 'app-app8-simulados',
  standalone: true,
  imports: [CommonModule, Simulados],
  templateUrl: './app8-simulados.html',
  styleUrl: './app8-simulados.scss'
})
export class App8Simulados implements OnInit {
  // Bibliografias disponíveis para este módulo (mesmas do módulo de perguntas)
  readonly bibliografiasDisponiveisIds: number[] = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];

  // Rota para Voltar
  bibliografiaPath = '/home/app8-direito/bibliografia';

  pageTitle = 'Simulados de Direito';

  ngOnInit() {
    console.log('🚀 [App8Simulados] Módulo de Simulados - Direito iniciado');
    console.log('📚 [App8Simulados] Bibliografias disponíveis:', this.bibliografiasDisponiveisIds);
  }
}
