import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubMenu, SubMenuItem } from '../../../../components/sub-menu/sub-menu';
import { ContentService } from '../../../../services/content.service';
import { BibliografiaCompleta } from '../../../../components/bibliografia-completa/bibliografia-completa';
import { BibliografiaCompletaData } from '../../../../interfaces/bibliografia-completa.interface';

@Component({
  selector: 'app-geopolitica-modernidade',
  imports: [
    SubMenu,
    HttpClientModule,
    BibliografiaCompleta
  ],
  templateUrl: './geopolitica-modernidade.html',
  styleUrl: './geopolitica-modernidade.scss',
  encapsulation: ViewEncapsulation.None
})

export class GeopoliticaModernidade implements OnInit {
  menuTitle = 'Geopolítica e Modernidade';
  menuSecondTitle = 'Geopolítica Brasileira';
  menuSubtitle = 'Selecione um capítulo para estudar';
  
  selectedContent = '';
  selectedHtmlContent = '';
  isLoading = false;
  isSubMenuCollapsed = false;
  selectedMenuItem?: SubMenuItem;

  // Dados para o component Bibliografia Completa
  bibliografiaData: BibliografiaCompletaData = {
    livro: {
      titulo: 'A Vingança da Geografia',
      autor: 'Robert D. Kaplan'
    },
    video: {
      titulo: 'Vídeos sobre Geopolítica',
      basePath: '/assets/content/geopolitica-ri/vinganca-geografia/video'
    },
    podcastPerguntas: {
      titulo: 'Podcasts e Perguntas',
      descricao: 'Conteúdo complementar baseado no capítulo selecionado',
      basePath: '/assets/content/geopolitica-ri/vinganca-geografia/podcast'
    }
  };
  
  constructor(private contentService: ContentService, private router: Router) {}

  subMenuItems: SubMenuItem[] = [
    {
      id: 'capI',
      title: 'Cap I - Raízes da Geopolítica',
      description: 'Geografia, Política e História como Ciência Estratégica'
    },
    {
      id: 'capII',
      title: 'Cap II - Contribuição do Fator Geográfico para a Formulação da Geopolítica',
      description: 'Poder político sobre o espaço físico como suporte indispensável do Estado'
    },
    {
      id: 'capIII',
      title: 'Cap III - Contribuição do Fator Político para a Formulação da Geopolítica',
      description: 'A Política, como expressão do Poder e essência do Estado'
    },
    {
      id: 'capIV',
      title: 'Cap IV - Contribuição da História Moderna na Formulação da Geopolítica',
      description: 'Análise sociológica e interpretação dos fatores humanos e culturais'
    },
    {
      id: 'capV',
      title: 'Cap V - A Geopolítica na Modernidade Síntese',
      description: 'Integração dos avanços tecnológicos, do tempo e da História'
    },
    {
      id: 'capVI',
      title: 'Cap VI - Os Predecessores',
      description: 'José Bonifácio, Alexandre de Gusmão, Mario Travassos, Backheuser, Golbery e Meira Mattos'
    },
    {
      id: 'capVII',
      title: 'Cap VII - Síntese de Setenta Anos de Pensamento Geopolítico Brasileiro',
      description: 'Integração territorial, interiorização, valorização da Amazônia, presença estratégica no Atlântico Sul'
    },
    {
      id: 'anexo1',
      title: 'Anexo 1 - Síntese de Setenta Anos de Pensamento Geopolítico Brasileiro',
      description: 'Um território estratégico no Rimlands'
    },
    {
      id: 'anexo2',
      title: 'Anexo 2 - Síntese de Setenta Anos de Pensamento Geopolítico Brasileiro',
      description: 'Um território estratégico no Rimlands'
    }
  ];


  ngOnInit() {
    // Carrega o primeiro capítulo por padrão
    if (this.subMenuItems.length > 0) {
      this.selectedMenuItem = this.subMenuItems[0];
      this.loadContent(this.subMenuItems[0].id);
    }
  }

  onItemSelected(item: SubMenuItem) {
    this.selectedMenuItem = item;
    this.loadContent(item.id);
  }

  onBackToBibliografia() {
    this.router.navigate(['home', 'app6-geopolitica-relacoes-internacionais', 'bibliografia']);
  }

  private loadContent(chapterId: string) {
    this.isLoading = true;
    this.selectedContent = '';
    this.selectedHtmlContent = '';

    this.contentService.loadGeopoliticaModernidadeContent(chapterId).subscribe({
      next: (htmlContent) => {
        this.selectedHtmlContent = htmlContent;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar conteúdo:', error);
        this.selectedHtmlContent = '<p>Erro ao carregar o conteúdo. Tente novamente mais tarde.</p>';
        this.isLoading = false;
      }
    });
  }

  onSubMenuCollapsedChanged(isCollapsed: boolean) {
    this.isSubMenuCollapsed = isCollapsed;
  }
}
