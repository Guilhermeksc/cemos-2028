import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CapaBibliografia, CapaConfig } from '../../../components/capa-bibliografia/capa-bibliografia';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-app6-1-relacoes-internacionais-bibliografia',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CapaBibliografia],
  templateUrl: './app6-1-relacoes-internacionais-bibliografia.html',
  styleUrl: './app6-1-relacoes-internacionais-bibliografia.scss',
})
export class App6RelacoesInternacionaisBibliografia implements OnInit {
  // Caminhos para os botões de navegação
  public conceitosPath = '/home/app6-1-relacoes-internacionais/conceitos';
  public flashcardsPath = '/home/app6-1-relacoes-internacionais/flash-cards';
  // public mediaPath = '/home/app6-1-relacoes-internacionais/media';
  public perguntasPath = '/home/app6-1-relacoes-internacionais/perguntas';
  public simuladosPath = '/home/app6-1-relacoes-internacionais/simulados';
  public checkAbandonoPath = '/home/app6-1-relacoes-internacionais/check-abandono';
  // Configuração de múltiplas capas
  capas: CapaConfig[] = [
    {
      imagePath: 'assets/content/relacoes-internacionais/img/principios-ri.jpg',
      routePath: '/home/app6-1-relacoes-internacionais/bibliografia/principios-ri',
      title: 'Princípios de Relações Internacionais',
      description: 'Karen A. Mingst',
      permite_consulta: false
    }
  ];

  // Configuração do Markdown (opcional)
  markdownPath = 'assets/content/relacoes-internacionais/Bibliografia.md';
  basePath = 'assets/content/relacoes-internacionais';

  // Controla se deve mostrar a capa ou não
  showCapa = true;

  constructor(private router: Router) {}

  /**
   * NOTA: Este componente exibe a capa quando na rota /bibliografia
   * e renderiza os componentes filhos quando navegamos para subrotas.
   * 
   * Rotas:
   * - /app6-geopolitica-relacoes-internacionais/bibliografia → Mostra CAPA
   * - /app6-geopolitica-relacoes-internacionais/bibliografia/vinganca-geografia → Mostra LIVRO
   * - /app6-geopolitica-relacoes-internacionais/bibliografia/geopolitica-modernidade → Mostra LIVRO
   * - etc.
   * 
   * Os componentes filhos são renderizados pelo <router-outlet>
   */

  ngOnInit(): void {
    // Escuta mudanças de rota para decidir se mostra a capa ou não
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Mostra capa apenas se estamos exatamente na rota /bibliografia
        // (sem subrotas ativas)
        this.showCapa = event.url.endsWith('/bibliografia');
      });

    // Verifica a rota inicial
    this.showCapa = this.router.url.endsWith('/bibliografia');
  }
}
