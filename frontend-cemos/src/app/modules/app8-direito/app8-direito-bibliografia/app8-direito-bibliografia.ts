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
      description: 'Manual de Direito Internacional aplicado às Operações Navais.',
      permite_consulta: false
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/lei-da-guerra`,
      title: '2. A Lei da Guerra',
      description: 'Byers, Michael - Direito Internacional e o Conflito Armado.',
      permite_consulta: false
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/carta-nacoes-unidas`,
      title: '3. Carta das Nações Unidas',
      description: 'Decreto nº 19.841, de 22 de outubro de 1945.',
      permite_consulta: false
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/feridos-enfermos`,
      title: '4. Feridos, enfermos e náufragos',
      description: 'Decreto nº 42.121, de 21 de agosto de 1957.',
      permite_consulta: false
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/protocolo-i`,
      title: '5. Protocolo I, Adicional às Convenções de Genebra.',
      description: 'Decreto nº 849, de 25 de junho de 1993.',
      permite_consulta: false
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/protocolo-ii`,
      title: '6. Protocolo II, Adicional às Convenções de Genebra.',
      description: 'Decreto nº 849, de 25 de junho de 1993.',
      permite_consulta: false
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/7.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/san-remo-manual`,
      title: '7. San Remo Manual',
      description: 'International Institute of Humanitarian Law.',
      permite_consulta: false
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/cnudm`,
      title: '8.  Convenção das Nações Unidas sobre o Direito do Mar (CNUDM)',
      description: 'Decreto nº 1530, de 22 de junho de 1995.',
      permite_consulta: false
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/entorpecentes-psicotropicos`,
      title: '9. Convenção Contra o Tráfico Ilícito de Entorpecentes e Substâncias Psicotrópicas',
      description: 'Decreto nº 154, de 26 de junho de 1991.',
      permite_consulta: false
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/pacto-sao-jose`,
      title: '10. Convenção Americana sobre Direitos Humanos (Pacto de São José)',
      description: 'Decreto nº 678, de 6 de novembro de 1992.',
      permite_consulta: true
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/11.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/declaracao-direitos-humanos`,
      title: '11. Declaração Universal dos Direitos Humanos',
      description: 'Declaração Universal dos Direitos Humanos.',
      permite_consulta: true
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/direito-tratados`,
      title: '12. Direito dos Tratados (Convenção de Viena)',
      description: 'Decreto nº 7.030, de 14 de dezembro de 2009.',
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
