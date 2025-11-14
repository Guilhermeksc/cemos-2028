import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CapaBibliografia, CapaConfig } from '../../../components/capa-bibliografia/capa-bibliografia';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-app1-intendencia-bibliografia',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CapaBibliografia],
  templateUrl: './app1-intendencia-bibliografia.html',
  styleUrl: './app1-intendencia-bibliografia.scss'
})
export class App1IntendenciaBibliografia implements OnInit {

  /** 🔹 Bases centralizadas */
  private readonly ROUTE_BASE = '/home/app1-intendencia';
  private readonly ASSETS_BASE = 'assets/content/intendencia';
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
      routePath: `${this.ROUTE_BASE}/bibliografia/cadeias-suprimentos-logistica`,
      title: 'Cadeias de Suprimentos e Logística',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/ema-400`,
      title: 'EMA-400 - Logística da Marinha',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/ema-401`,
      title: 'EMA-401 - Mobilização Marítima',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/4.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/feridos-enfermos`,
      title: 'Feridos, enfermos e náufragos',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/5.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/protocolo-i`,
      title: 'Protocolo I',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/6.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/protocolo-ii`,
      title: 'Protocolo II',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/7.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/san-remo-manual`,
      title: 'San Remo Manual',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/8.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/cnudm`,
      title: 'Concenção das Nações Unidas sobre o Direito do Mar',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/9.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/entorpecentes-psicotropicos`,
      title: 'Entorpecentes e Psicotrópicos',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/10.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/pacto-sao-jose`,
      title: 'Pacto de São José',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/11.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/declaracao-direitos-humanos`,
      title: 'Declaração Universal dos Direitos Humanos',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/12.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/direito-tratados`,
      title: 'Direito dos Tratados',
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
