import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CapaBibliografia, CapaConfig } from '../../../components/capa-bibliografia/capa-bibliografia';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-app4-historia-bibliografia',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CapaBibliografia],
  templateUrl: './app4-historia-bibliografia.html',
  styleUrl: './app4-historia-bibliografia.scss'
})
export class App4HistoriaBibliografia implements OnInit {
  // Configuração de múltiplas capas
  capas: CapaConfig[] = [
    {
      imagePath: 'assets/content/historia/img/breve_historia.jpg',
      routePath: '/home/app4-historia/bibliografia/breve-historia',
      title: 'Breve História',
      description: 'H. G. Wells'
    },
    {
      imagePath: 'assets/content/historia/img/guerra_no_mar.jpg',
      routePath: '/home/app4-historia/bibliografia/guerra-no-mar',
      title: 'Guerra no Mar',
      description: 'H. G. Wells'
    },
    {
      imagePath: '/assets/content/historia/img/historia_das_guerras.jpg',
      routePath: '/home/app4-historia/bibliografia/historia-das-guerras',
      title: 'História das Guerras',
      description: 'H. G. Wells'
    },
    {
      imagePath: 'assets/content/historia/img/sintese_historica.jpg',
      routePath: '/home/app4-historia/bibliografia/sintese-historica',
      title: 'Síntese Histórica',
      description: 'H. G. Wells'
    }
  ];

  // Configuração do Markdown (opcional)
  markdownPath = 'assets/content/historia/Bibliografia.md';
  basePath = 'assets/content/historia';

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
