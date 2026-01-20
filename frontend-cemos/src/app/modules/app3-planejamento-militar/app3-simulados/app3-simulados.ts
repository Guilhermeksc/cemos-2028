import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Simulados } from '../../../components/simulados/simulados';

@Component({
  selector: 'app-app3-simulados',
  standalone: true,
  imports: [CommonModule, Simulados],
  templateUrl: './app3-simulados.html',
  styleUrl: './app3-simulados.scss'
})
export class App3Simulados implements OnInit {
  // Bibliografias disponíveis para este módulo (mesmas do módulo de perguntas)
  readonly bibliografiasDisponiveisIds: number[] = [69, 70, 71];
  
  // Rota para Voltar
  bibliografiaPath = '/home/app3-planejamento-militar/bibliografia';
  
  pageTitle = 'Simulados de Planejamento Militar';

  constructor() {
    console.log('🏗️ [App3Simulados] Constructor chamado');
    console.log('📚 [App3Simulados] Bibliografias configuradas:', this.bibliografiasDisponiveisIds);
  }

  ngOnInit() {
    console.log('🚀 [App3Simulados] Módulo de Simulados - Planejamento Militar iniciado');
    console.log('📚 [App3Simulados] Bibliografias disponíveis:', this.bibliografiasDisponiveisIds);
    console.log('📍 [App3Simulados] Componente carregado com sucesso');
  }
}
