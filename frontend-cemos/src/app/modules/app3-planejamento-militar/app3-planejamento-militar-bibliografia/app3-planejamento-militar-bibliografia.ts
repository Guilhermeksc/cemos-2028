import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CapaBibliografia, CapaConfig } from '../../../components/capa-bibliografia/capa-bibliografia';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-app3-planejamento-militar-bibliografia',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CapaBibliografia],
  templateUrl: './app3-planejamento-militar-bibliografia.html',
  styleUrl: './app3-planejamento-militar-bibliografia.scss'
})
export class App3PlanejamentoMilitarBibliografia implements OnInit {

  /** 🔹 Bases centralizadas */
  private readonly ROUTE_BASE = '/home/app3-planejamento-militar';
  private readonly ASSETS_BASE = 'assets/content/planejamento';
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
      routePath: `${this.ROUTE_BASE}/bibliografia/lei-97`,
      title: '1. Organização, Preparo e Emprego das Forças Armadas',
      description: 'Lei nº 97/1999',
      permite_consulta: false
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/1.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/decreto-7276`,
      title: '2. Estrutura Militar de Defesa',
      description: 'Decreto 7.276/2010',
      permite_consulta: false
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/1.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/md-30-m-01`,
      title: '3. Doutrina de Operações Conjuntas',
      description: 'MD30-M-01 (1º Volume)',
      permite_consulta: false
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/1.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/md-30-m-01-2`,
      title: '3. Doutrina de Operações Conjuntas',
      description: 'MD30-M-01 (2º Volume)',
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
