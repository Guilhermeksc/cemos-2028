import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CapaBibliografia } from '../../../components/capa-bibliografia/capa-bibliografia';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-app6-geopolitica--internacionais-bibliografia',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CapaBibliografia],
  templateUrl: './app6-geopolitica-relacoes-internacionais-bibliografia.html',
  styleUrl: './app6-geopolitica-relacoes-internacionais-bibliografia.scss',
})
export class App6GeopoliticaRelacoesInternacionaisBibliografia implements OnInit {
  // Configuração da Capa - Exibida quando clicar no item pai "Bibliografia"
  imagePath = 'assets/content/geopolitica-ri/img/vinganca-geografia.jpg';
  markdownPath = 'assets/content/geopolitica-ri/Bibliografia.md';
  basePath = 'assets/content/geopolitica-ri';

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
