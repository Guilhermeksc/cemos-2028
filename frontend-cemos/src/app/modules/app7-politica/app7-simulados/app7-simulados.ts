import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Simulados } from '../../../components/simulados/simulados';

@Component({
  selector: 'app-app7-simulados',
  standalone: true,
  imports: [CommonModule, Simulados],
  templateUrl: './app7-simulados.html',
  styleUrl: './app7-simulados.scss'
})
export class App7Simulados implements OnInit {
  // Bibliografias disponíveis para este módulo (mesmas do módulo de perguntas)
  readonly bibliografiasDisponiveisIds: number[] = [9, 10, 11, 12, 13, 14, 15, 16, 17];

  // Rota para Voltar
  bibliografiaPath = '/home/app7-politica/bibliografia';

  pageTitle = 'Simulados de Política';

  ngOnInit() {
    console.log('🚀 [App7Simulados] Módulo de Simulados - Política iniciado');
    console.log('📚 [App7Simulados] Bibliografias disponíveis:', this.bibliografiasDisponiveisIds);
  }
}
