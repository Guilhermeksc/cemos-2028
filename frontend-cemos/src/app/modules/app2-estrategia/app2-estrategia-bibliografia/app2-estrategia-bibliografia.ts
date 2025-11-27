import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CapaBibliografia, CapaConfig } from '../../../components/capa-bibliografia/capa-bibliografia';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-app2-estrategia-bibliografia',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CapaBibliografia],
  templateUrl: './app2-estrategia-bibliografia.html',
  styleUrl: './app2-estrategia-bibliografia.scss'
})
export class App2EstrategiaBibliografia implements OnInit {

  /** 🔹 Bases centralizadas */
  private readonly ROUTE_BASE = '/home/app2-estrategia';
  private readonly ASSETS_BASE = 'assets/content/estrategia';
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
      title: '1. Tratado de Estratégia',
      description: 'COUTAU-BÉGARIE.',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/estrategias-maritimas`,
      title: 'WEDIN. Estratégias Marítimas no Século XXI: A contribuição do Almirante Castex',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/ema-310-estrategia`,
      title: 'EMA-310 - Estratégia de Defesa Marítima',
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
