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
  public perguntasPath = `${this.ROUTE_BASE}/perguntas`;
  public simuladosPath = `${this.ROUTE_BASE}/simulados`;
  public checkAbandonoPath = `${this.ROUTE_BASE}/check-abandono`;

  /** 🔹 Configuração das capas */
  public capas: CapaConfig[] = [
    {
      imagePath: `${this.ASSETS_BASE}/img/1.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/ciencia-politica`,
      title: '1. Ciência Política',
      description: 'DIAS, Reinaldo.',
      permite_consulta: false
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/constituicao-brasil`,
      title: '2. Constituição da República Federativa do Brasil',
      description: 'CF 1988.',
      permite_consulta: true
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/estrategia-nacional-defesa`,
      title: '3. Estratégia Nacional de Defesa',
      description: 'BRASIL, Ministério da Defesa. 2020.',
      permite_consulta: true
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/politica-nacional-defesa`,
      title: '4. Política Nacional de Defesa',
      description: 'BRASIL, Ministério da Defesa. 2020.',
      permite_consulta: true
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/lei-complementar-97`,
      title: '5. Lei Complementar nº 97',
      description: 'Organização, o preparo e o emprego das Forças Armadas.',
      permite_consulta: true
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/decreto-12481`,
      title: '6. Decreto nº 12.481/2025',
      description: 'Institui a Política Marítima Nacional (PMN).',
      permite_consulta: true
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
        routePath: `${this.ROUTE_BASE}/bibliografia/economia-azul`,
      title: '7. Economia Azul - vetor para o desenvolvimento do Brasil',
      description: 'SANTOS, Thauan.',
      permite_consulta: false
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/4.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/ema-323`,
      title: '8. EMA-323/2019',
      description: 'Política Naval',
      permite_consulta: true
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/decreto-12363`,
      title: '9. Decreto nº 12.363/2025',
      description: 'Aprova o XI Plano Setorial para os Recursos do Mar.',
      permite_consulta: true
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
