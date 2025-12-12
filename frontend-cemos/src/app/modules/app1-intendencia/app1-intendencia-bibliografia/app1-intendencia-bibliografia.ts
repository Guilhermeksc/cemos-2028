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
  public perguntasPath = `${this.ROUTE_BASE}/perguntas`;

  /** 🔹 Configuração das capas */
  public capas: CapaConfig[] = [
    {
      imagePath: `${this.ASSETS_BASE}/img/1.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/cadeias-suprimentos-logistica`,
      title: '1. Administração de Cadeias de Suprimentos e Logística',
      description: 'CORRÊA, Henrique L.',
      permite_consulta: false
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/ema-400`,
      title: '2. EMA-400',
      description: 'Manual de Logística da Marinha',
      permite_consulta: true,
      bloco: '2º - Bloco 1',
      blocoColor: 1
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/ema-401`,
      title: '3. EMA-401',
      description: 'Manual de Mobilização Marítima',
      permite_consulta: true,
      bloco: '6º - Bloco 2',
      blocoColor: 2
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/md-41-m-01`,
      title: '4. MD-41-M-01',
      description: 'Doutrina de Mobilização Militar',
      permite_consulta: true,
      bloco: '3º - Bloco 2',
      blocoColor: 2
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/md-41-m-02`,
      title: '5. MD-41-M-02',
      description: 'Manual de Mobilização Militar',
      permite_consulta: true,
      bloco: '4º - Bloco 2',
      blocoColor: 2
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/md-41-m-03`,
      title: '6. MD-41-M-03',
      description: 'Manual para o Planejamento da Mobilização Militar',
      permite_consulta: true,
      bloco: '5º - Bloco 2',
      blocoColor: 2
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/lei-11631`,
      title: '7. Lei nº 11.631/2007',
      description: 'Lei de Mobilização Nacional',
      permite_consulta: true,
      bloco: '1º - Bloco 2',
      blocoColor: 2
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/lei-6592`,
      title: '8. Decreto nº 6.592/2008',
      description: 'Regulamenta a Lei de Mobilização Nacional',
      permite_consulta: true,
      bloco: '2º - Bloco 2',
      blocoColor: 2
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/ema-420`,
      title: '9. EMA-420',
      description: 'Sistemas de Defesa',
      permite_consulta: true,
      bloco: '3º - Bloco 1',
      blocoColor: 1
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/dgmm-0130`,
      title: '10. DGMM-0130',
      description: 'Manual do Apoio Logístico Integrado',
      permite_consulta: true,
      bloco: '4º - Bloco 1',
      blocoColor: 1
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/md-40-m-01`,
      title: '11. MD-40-M-01',
      description: 'Manual de Boas Práticas para a Gestão do Ciclo de Vida de Sistemas de Defesa',
      permite_consulta: true,
      bloco: '5º - Bloco 1',
      blocoColor: 1
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/md-44-m-02`,
      title: '12. MD-44-M-02',
      description: 'Manual de Boas Práticas de Custo do Ciclo de Vida de Sistemas de Defesa',
      permite_consulta: true,
      bloco: '6º - Bloco 1',
      blocoColor: 1
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/sgm-201`,
      title: '13. SGM-201',
      description: 'Normas para Execução do Abastecimento',
      permite_consulta: true,
      bloco: '1º - Bloco 1',
      blocoColor: 1
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/decreto-7970`,
      title: '14.  Decreto nº 7.970/2013',
      description: 'Regulamenta a Lei nº 12.598/2012 - Produtos e Sistemas de Defesa',
      permite_consulta: true,
      bloco: '2º - Bloco 3',
      blocoColor: 4
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/lei-12598`,
      title: '15. Lei nº 12.598/2012',
      description: 'Produtos e Sistemas de Defesa',
      permite_consulta: true,
      bloco: '1º - Bloco 3',
      blocoColor: 4
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/lei-14133`,
      title: '16. Lei nº 14.133/2021',
      description: 'Lei de Licitações e Contratos Administrativos',
      permite_consulta: true,
      bloco: '1º - Bloco 5',
      blocoColor: 10
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/portaria-280`,
      title: '17.  Portaria 280/2019',
      description: 'Aprova as Normas de Compensação Tecnológica, Industrial e Comercial (Offset)',
      permite_consulta: true,
      bloco: '2º - Bloco 4',
      blocoColor: 8
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/portaria-223`,
      title: '18.  Portaria 223/2016',
      description: 'Aprova as Diretrizes para a Compensação Comercial, Industrial e Tecnológica (“OFFSET”)',
      permite_consulta: true,
      bloco: '1º - Bloco 4',
      blocoColor: 8
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/portaria-899`,
      title: '19.  Portaria 899/2005',
      description: 'Aprova a Política Nacional da Indústria de Defesa',
      permite_consulta: true,
      bloco: '3º - Bloco 3',
      blocoColor: 4
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/portaria-586`,
      title: '20.  Portaria 586/2006',
      description: 'Aprova as Ações Estratégicas para a Política Nacional da Indústria de Defesa',
      permite_consulta: true,
      bloco: '4º - Bloco 3',
      blocoColor: 4
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/portaria-15`,
      title: '21.  Portaria 15/2018',
      description: 'Aprova a Política de Obtenção de Produtos de Defesa (POBPRODE)',
      permite_consulta: true,
      bloco: '5º - Bloco 3',
      blocoColor: 4
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/portaria-3662`,
      title: '22.  Portaria 3.662/2021',
      description: 'Estabelece a Política de Compensação Tecnológica, Industrial e Comercial do Ministério da Defesa - PComTIC Defesa',
      permite_consulta: true,
      bloco: '3º - Bloco 4',
      blocoColor: 8
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/sgm-301`,
      title: '23. SGM-301',
      description: 'Normas sobre Administração Financeira e Contabilidade na MB',
      permite_consulta: true,
      bloco: '3º - Bloco 6',
      blocoColor: 5
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/mto`,
      title: '24. MTO',
      description: 'Manual Técnico de Orçamento',
      permite_consulta: true,
      bloco: '1º - Bloco 6',
      blocoColor: 5
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/sgm-601`,
      title: '25. SGM-601',
      description: 'Normas sobre Auditoria, Análise e Apresentação de Contas na Marinha',
      permite_consulta: true,
      bloco: '3º - Bloco 8',
      blocoColor: 10
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/sgm-602`,
      title: '26. SGM-602',
      description: 'Normas sobre Ressarcimento ao Erário',
      permite_consulta: true,
      bloco: '4º - Bloco 8',
      blocoColor: 10
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/in-98`,
      title: '27. IN 98/2024',
      description: 'Instrução Normativa sobre a instauração, a organização e o encaminhamento ao Tribunal de Contas da União dos processos de tomada de contas especial',
      permite_consulta: true,
      bloco: '2º - Bloco 8',
      blocoColor: 10
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/3.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/in-3`,
      title: '28. IN 3/2017',
      description: 'Instrução Normativa sobre a instauração, a organização e o encaminhamento ao Tribunal de Contas da União dos processos de tomada de contas especial',
      permite_consulta: true,
      bloco: '1º - Bloco 8',
      blocoColor: 10
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/sgm-107`,
      title: '29. SGM-107',
      description: 'Normas Gerais de Administração',
      permite_consulta: true,
      bloco: '1º - Bloco 7',
      blocoColor: 7
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/sgm-401`,
      title: '30. SGM-401',
      description: 'Normas para a Gestão do Plano Diretor',
      permite_consulta: true,
      bloco: '2º - Bloco 6',
      blocoColor: 5
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/ema-020`,
      title: '31. EMA-020',
      description: 'Normas de Governança da Marinha',
      permite_consulta: true,
      bloco: '2º - Bloco 7',
      blocoColor: 7
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/ema-301`,
      title: '32. EMA-301',
      description: 'Fundamentos Doutrinários da Marinha',
      permite_consulta: false
    },
    {
      imagePath: `${this.ASSETS_BASE}/img/2.jpg`,
      routePath: `${this.ROUTE_BASE}/bibliografia/ema-305`,
      title: '33. EMA-305',
      description: 'Doutrina Militar Naval',
      permite_consulta: false
    },
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
