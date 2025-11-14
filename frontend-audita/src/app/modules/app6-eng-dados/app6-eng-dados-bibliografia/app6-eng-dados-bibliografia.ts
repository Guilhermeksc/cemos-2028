import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CapaBibliografia, CapaConfig } from '../../../components/capa-bibliografia/capa-bibliografia';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-app6-eng-dados-bibliografia',
  imports: [CommonModule, RouterOutlet, CapaBibliografia],
  templateUrl: './app6-eng-dados-bibliografia.html',
  styleUrl: './app6-eng-dados-bibliografia.scss'
})
export class App6EngDadosBibliografia implements OnInit {

  /** 🔹 Bases centralizadas */
  private readonly ROUTE_BASE = '/home/app6-eng-dados';
  private readonly ASSETS_BASE = 'assets/content/eng-dados';
  public readonly basePath = `${this.ASSETS_BASE}`;

  /** 🔹 Subrotas */
  public conceitosPath = `${this.ROUTE_BASE}/conceitos`;
  public flashcardsPath = `${this.ROUTE_BASE}/flash-cards`;
  public perguntasPath = `${this.ROUTE_BASE}/perguntas`;

  /** 🔹 Configuração das capas */
  public capas: CapaConfig[] = [
    {
      imagePath: `${this.ASSETS_BASE}/img/db.svg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/bancos-de-dados`,
      title: 'Bancos de Dados',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/arquitetura.svg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/arquitetura-de-inteligencia-de-negocio`,
      title: 'Arquitetura de Inteligência de Negócio',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/api.svg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/conectores-e-integracao-com-fontes-de-dados`,
      title: 'Conectores e Integração com Fontes de Dados',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/etl.svg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/fluxo-de-manipulacao-de-dados`,
      title: 'Fluxo de Manipulação de Dados',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/governanca.svg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/governanca-e-qualidade-de-dados`,
      title: 'Governança e Qualidade de Dados',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/nuvem.svg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/integracao-com-nuvem`,
      title: 'Integração com Nuvem',
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
