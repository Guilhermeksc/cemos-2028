import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CapaBibliografia, CapaConfig } from '../../../components/capa-bibliografia/capa-bibliografia';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-app5-infra-ti-bibliografia',
  imports: [CommonModule, RouterOutlet, CapaBibliografia],
  templateUrl: './app5-infra-ti-bibliografia.html',
  styleUrl: './app5-infra-ti-bibliografia.scss'
})
export class App5InfraTiBibliografia implements OnInit {

  /** 🔹 Bases centralizadas */
  private readonly ROUTE_BASE = '/home/app5-infra-ti';
  private readonly ASSETS_IMAGES = 'assets/img/svg';
  private readonly ASSETS_CONTENT = 'assets/content/infra-ti';  
  public readonly basePath = `${this.ASSETS_IMAGES}`;

  /** 🔹 Subrotas */
  public conceitosPath = `${this.ROUTE_BASE}/conceitos`;
  public flashcardsPath = `${this.ROUTE_BASE}/flash-cards`;
  public perguntasPath = `${this.ROUTE_BASE}/perguntas`;

  /** 🔹 Configuração das capas */
  public capas: CapaConfig[] = [
    {
      imagePath: `${this.ASSETS_IMAGES}/arquitetura.svg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/arquitetura-de-infra`,
      title: 'Arquitetura de Infraestrutura de TI',
    },
    {
      imagePath: `${this.ASSETS_IMAGES}/redes.svg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/redes-comunicacao-dados`,
      title: 'Redes e Comunicação de Dados',
    },
    {
      imagePath: `${this.ASSETS_IMAGES}/servidor.svg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/sistemas-servidores`,
      title: 'Sistemas Operacionais e Servidores',
    },
    {
      imagePath: `${this.ASSETS_IMAGES}/armazenamento.svg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/armazenamento-backup`,
      title: 'Armazenamento e Backup',
    },
    {
      imagePath: `${this.ASSETS_IMAGES}/cyber-security.svg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/seguranca-infraestrutura`,
      title: 'Segurança de Infraestrutura',
    },
    {
      imagePath: `${this.ASSETS_IMAGES}/monitores.svg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/monitoramento-gestao-automacao`,
      title: 'Monitoramento, Gestão e Automação',
    },
    {
      imagePath: `${this.ASSETS_IMAGES}/recuperacao-de-desastres.svg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/recuperacao-desastres`,
      title: 'Alta Disponibilidade e Recuperação de Desastres',
    }
  ];

  /** 🔹 Markdown e controle de exibição */
  public markdownPath = `${this.ASSETS_CONTENT}/Bibliografia.md`;
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
