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
  public perguntasPath = `${this.ROUTE_BASE}/perguntas`;
  public simuladosPath = `${this.ROUTE_BASE}/simulados`;
  public checkAbandonoPath = `${this.ROUTE_BASE}/check-abandono`;

  /** 🔹 Configuração das capas */
  public capas: CapaConfig[] = [
    {
      imagePath: `${this.ASSETS_BASE}/img/4.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/economia-brasileira`,
      title: '1. Economia Brasileira Contemporânea',
      description: 'GREMAUD, Amaury Patrick.',
      permite_consulta: false
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.png`,
      routePath: `${this.ROUTE_BASE}/bibliografia/economia-micro-macro`,
      title: '2. Economia Micro e Macro – Teoria, Exercícios e Casos.',
      description: 'VASCONCELLOS, Marco Antônio Sandoval.',
      permite_consulta: false
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/economia-azul-2`,
      title: '3. Economia Azul - vetor para o desenvolvimento do Brasil',
      description: 'SANTOS, Thauan.',
      permite_consulta: false
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
