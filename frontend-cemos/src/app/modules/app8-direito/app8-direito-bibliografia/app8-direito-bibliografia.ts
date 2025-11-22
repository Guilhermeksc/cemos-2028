import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CapaBibliografia, CapaConfig } from '../../../components/capa-bibliografia/capa-bibliografia';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-app8-direito-bibliografia',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CapaBibliografia],
  templateUrl: './app8-direito-bibliografia.html',
  styleUrl: './app8-direito-bibliografia.scss'
})
export class App8DireitoBibliografia implements OnInit {

  /** 🔹 Bases centralizadas */
  private readonly ROUTE_BASE = '/home/app8-direito';
  private readonly ASSETS_BASE = 'assets/content/direito';
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
      routePath: `${this.ROUTE_BASE}/bibliografia/ema-135`,
      title: '1. EMA-135',
      description: 'Manual de Direito Internacional aplicado às Operações Navais.'      
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/lei-da-guerra`,
      title: '2. A Lei da Guerra',
      description: 'Byers, Michael - Direito Internacional e o Conflito Armado.'      
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/carta-nacoes-unidas`,
      title: '3. Carta das Nações Unidas',
      description: 'Decreto XXX'
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/4.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/feridos-enfermos`,
      title: '4. Feridos, enfermos e náufragos',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/5.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/protocolo-i`,
      title: '5. Protocolo I',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/6.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/protocolo-ii`,
      title: '6. Protocolo II',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/7.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/san-remo-manual`,
      title: '7. San Remo Manual',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/8.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/cnudm`,
      title: '8.  Convenção das Nações Unidas sobre o Direito do Mar',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/9.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/entorpecentes-psicotropicos`,
      title: '9. Entorpecentes e Psicotrópicos',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/10.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/pacto-sao-jose`,
      title: '10. Pacto de São José',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/11.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/declaracao-direitos-humanos`,
      title: '11. Declaração Universal dos Direitos Humanos',
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/12.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/direito-tratados`,
      title: '12. Direito dos Tratados',
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
