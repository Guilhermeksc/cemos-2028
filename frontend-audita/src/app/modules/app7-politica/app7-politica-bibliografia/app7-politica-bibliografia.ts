import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CapaBibliografia, CapaConfig } from '../../../components/capa-bibliografia/capa-bibliografia';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-app7-politica-bibliografia',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CapaBibliografia],
  templateUrl: './app7-politica-bibliografia.html',
  styleUrl: './app7-politica-bibliografia.scss'
})
export class App7PoliticaBibliografia implements OnInit {

  /** 🔹 Bases centralizadas */
  private readonly ROUTE_BASE = '/home/app7-politica';
  private readonly ASSETS_BASE = 'assets/content/politica';
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
      routePath: `${this.ROUTE_BASE}/bibliografia/ciencia-politica`,
      title: 'Ciência Política',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/constituicao-brasil`,
      title: 'Constituição da República Federativa do Brasil',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/estrategia-nacional-defesa`,
      title: 'Estratégia Nacional de Defesa',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/4.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/politica-nacional-defesa`,
      title: 'Política Nacional de Defesa',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/5.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/lei-complementar-97`,
      title: 'Lei Complementar nº 97',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/6.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/decreto-12481`,
      title: 'Decreto nº 12.481 - Política Marítima Nacional (PMN)',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/7.jpg`,
        routePath: `${this.ROUTE_BASE}/bibliografia/economia-azul`,
      title: 'Economia Azul - vetor para o desenvolvimento do Brasil',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/8.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/ema-323`,
      title: 'EMA-323 - Política Naval',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/9.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/decreto-12363`,
      title: 'Decreto nº 12.363 - Plano Setorial para os Recursos do Mar',
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
