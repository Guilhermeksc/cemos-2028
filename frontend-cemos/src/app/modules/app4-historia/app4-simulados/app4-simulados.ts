import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Simulados } from '../../../components/simulados/simulados';

@Component({
  selector: 'app-app4-simulados',
  standalone: true,
  imports: [CommonModule, Simulados],
  templateUrl: './app4-simulados.html',
  styleUrl: './app4-simulados.scss'
})
export class App4Simulados implements OnInit {
  // Bibliografias disponíveis para este módulo (mesmas do módulo de perguntas)
  readonly bibliografiasDisponiveisIds: number[] = [5, 6, 7, 8];

  // Rota para voltar à bibliografia
  bibliografiaPath = '/home/app4-historia/bibliografia';

  pageTitle = 'Simulados de História';

  ngOnInit() {
    console.log('🚀 [App4Simulados] Módulo de Simulados - História iniciado');
    console.log('📚 [App4Simulados] Bibliografias disponíveis:', this.bibliografiasDisponiveisIds);
  }
}
