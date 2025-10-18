import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GenericBibliografia } from '../../../components/generic-bibliografia/generic-bibliografia';
import { BibliografiaConfig } from '../../../interfaces/bibliografia-topic.interface';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-app4-historia-bibliografia',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GenericBibliografia],
  templateUrl: './app4-historia-bibliografia.html',
  styleUrl: './app4-historia-bibliografia.scss'
})
export class App4HistoriaBibliografia implements OnInit {

  // Controla se deve mostrar o GenericBibliografia ou não
  showGenericBibliografia = true;

  constructor(private router: Router) {}

  /** Configuração da bibliografia genérica */
  bibliografiaConfig: BibliografiaConfig = {
    moduleRoute: 'app4-historia',
    bibliografiaServiceMethod: 'loadHistoriaBibliografia',
    topics: [
      {
        id: 'breve-historia',
        title: 'Breve História',
        description: 'Visão geral da história militar',
        imageUrl: '/assets/content/historia/img/breve_historia.jpg',
        routePath: 'breve-historia'
      },
      {
        id: 'guerra-no-mar',
        title: 'Guerra no Mar',
        description: 'História das batalhas navais',
        imageUrl: '/assets/content/historia/img/guerra_no_mar.jpg',
        routePath: 'guerra-no-mar'
      },
      {
        id: 'historia-das-guerras',
        title: 'História das Guerras',
        description: 'Principais conflitos militares',
        imageUrl: '/assets/content/historia/img/historia_das_guerras.jpg',
        routePath: 'historia-das-guerras'
      },
      {
        id: 'sintese-historica',
        title: 'Síntese Histórica',
        description: 'Resumo dos eventos históricos',
        imageUrl: '/assets/content/historia/img/sintese_historica.jpg',
        routePath: 'sintese-historica'
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

  ngOnInit(): void {
    // Escuta mudanças de rota para decidir se mostra o GenericBibliografia ou não
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Mostra GenericBibliografia apenas se estamos exatamente na rota /bibliografia
        this.showGenericBibliografia = event.url.endsWith('/bibliografia');
      });

    // Verifica a rota inicial
    this.showGenericBibliografia = this.router.url.endsWith('/bibliografia');
  }
}
