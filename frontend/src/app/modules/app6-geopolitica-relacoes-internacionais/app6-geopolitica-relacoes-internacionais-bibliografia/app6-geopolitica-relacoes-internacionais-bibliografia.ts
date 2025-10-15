import { Component, OnInit } from '@angular/core';
import { GenericBibliografia } from '../../../components/generic-bibliografia/generic-bibliografia';
import { BibliografiaConfig } from '../../../interfaces/bibliografia-topic.interface';

@Component({
  selector: 'app-app6-geopolitica--internacionais-bibliografia',
  standalone: true,
  imports: [GenericBibliografia],
  templateUrl: './app6-geopolitica-relacoes-internacionais-bibliografia.html',
  styleUrl: './app6-geopolitica-relacoes-internacionais-bibliografia.scss',
})
export class App6GeopoliticaRelacoesInternacionaisBibliografia implements OnInit {
  bibliografiaConfig: BibliografiaConfig = {
    moduleRoute: 'app6-geopolitica-relacoes-internacionais',
    bibliografiaServiceMethod: 'loadGeopoliticaBibliografia',
    topics: [
      {
        id: 'vinganca-geografia',
        title: 'A Vingança da Geografia: a construção do mundo geopolítico a partir da perspectiva geográfica.',
        description: 'Visão geral da geopolítica moderna',
        imageUrl: '/assets/content/geopolitica-ri/img/vinganca-geografia.jpg',
        routePath: 'vinganca-geografia'
      },
      {
        id: 'geopolitica-modernidade',
        title: 'Geopolítica e Modernidade – Geopolítica Brasileira.',
        description: 'Análise da geopolítica brasileira',
        imageUrl: '/assets/content/geopolitica-ri/img/geopolitica-modernidade.jpg',
        routePath: 'geopolitica-modernidade'
      },
      {
        id: 'novas-geopoliticas',
        title: 'Novas Geopolíticas.',
        description: 'Tendências contemporâneas em geopolítica',
        imageUrl: '/assets/content/geopolitica-ri/img/novas-geopoliticas.jpg',
        routePath: 'novas-geopoliticas'
      },
      {
        id: 'principios-ri',
        title: 'Princípios de Relações Internacionais.',
        description: 'Fundamentos das relações internacionais',
        imageUrl: '/assets/content/geopolitica-ri/img/principios-ri.jpg',
        routePath: 'principios-ri'
      }
    ]
  };

  /** Dados parametrizáveis */
  assunto = 'Geopolítica e Relações Internacionais';
  proposito = 'Avaliar se os candidatos possuem conhecimentos adequados quanto à Geopolítica e às Relações Internacionais.';

  materias = [
    {
      letra: 'a',
      titulo: 'Geopolítica',
      topicos: [
        'Fundamentos e Modernidade da Geopolítica',
        'O Pensamento Geopolítico Brasileiro',
        'A Geopolítica Contemporânea',
        'Aspectos relevantes da Rússia, China e Índia'
      ]
    },
    {
      letra: 'b',
      titulo: 'Relações Internacionais',
      topicos: [
        'Abordagens de Relações Internacionais',
        'O Sistema Internacional',
        'Organizações intergovernamentais e não governamentais',
        'Questões transnacionais: meio-ambiente, saúde mundial e crime'
      ]
    }
  ];

  bibliografias = [
    {
      letra: 'a',
      titulo: 'Geopolítica',
      itens: [
        'KAPLAN, Robert. A Vingança da Geografia...',
        'MATTOS, Carlos de Meira. Geopolítica e Modernidade...',
        'VESENTINI, José W. Novas Geopolíticas...'
      ]
    },
    {
      letra: 'b',
      titulo: 'Relações Internacionais',
      itens: [
        'MINGST, Karen A. Princípios de Relações Internacionais...'
      ]
    }
  ];

  ngOnInit(): void {}
}
