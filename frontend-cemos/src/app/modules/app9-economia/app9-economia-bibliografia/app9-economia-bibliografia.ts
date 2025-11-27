import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CapaBibliografia, CapaConfig } from '../../../components/capa-bibliografia/capa-bibliografia';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-app9-economia-bibliografia',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CapaBibliografia],
  templateUrl: './app9-economia-bibliografia.html',
  styleUrl: './app9-economia-bibliografia.scss'
})
export class App9EconomiaBibliografia implements OnInit {

  /** 🔹 Bases centralizadas */
  private readonly ROUTE_BASE = '/home/app9-economia';
  private readonly ASSETS_BASE = 'assets/content/economia';
  public readonly basePath = `${this.ASSETS_BASE}`;

  /** 🔹 Subrotas */
  public conceitosPath = `${this.ROUTE_BASE}/conceitos`;
  public flashcardsPath = `${this.ROUTE_BASE}/flash-cards`;
  public mediaPath = `${this.ROUTE_BASE}/media`;
  public perguntasPath = `${this.ROUTE_BASE}/perguntas`;

  /** 🔹 Configuração das capas */
  public capas: CapaConfig[] = [
    {
      imagePath: `${this.ASSETS_BASE}/img/1.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/tratado-de-estrategia`,
      title: '1. Economia Brasileira Contemporânea',
      description: 'GREMAUD, Amaury Patrick.'
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.png`,
      routePath: `${this.ROUTE_BASE}/bibliografia/estrategias-maritimas`,
      title: '2. Economia Micro e Macro – Teoria, Exercícios e Casos.',
      description: 'VASCONCELLOS, Marco Antônio Sandoval.'
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/ema-310-estrategia`,
      title: '3. Economia Azul - vetor para o desenvolvimento do Brasil',
      description: 'SANTOS, Thauan.',
    }
  ];

  /** 🔹 Markdown e controle de exibição */
  public markdownPath = `${this.ASSETS_BASE}/Bibliografia.md`;
  public showCapa = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showCapa = event.url.endsWith('/bibliografia');
      });

    this.showCapa = this.router.url.endsWith('/bibliografia');
  }
}
