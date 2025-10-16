import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SubMenu, SubMenuItem } from '../../../../components/sub-menu/sub-menu';
import { ContentService } from '../../../../services/content.service';
import { BibliografiaCompleta } from '../../../../components/bibliografia-completa/bibliografia-completa';
import { BibliografiaCompletaData } from '../../../../interfaces/bibliografia-completa.interface';

@Component({
  selector: 'app-novas-geopoliticas',
  imports: [
    CommonModule,
    SubMenu,
    HttpClientModule,
    BibliografiaCompleta
  ],
  templateUrl: './novas-geopoliticas.html',
  styleUrl: './novas-geopoliticas.scss',
  encapsulation: ViewEncapsulation.None
})

export class NovasGeopoliticas implements OnInit {
  menuTitle = 'A Vingança da Geografia:';
  menuSecondTitle = 'A construção do mundo geopolítico a partir da perspectiva geográfica';
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
      id: 'capX',
      title: 'CapX - A Rússia e o Heartland Independente',
      description: 'A importância do Heartland na geopolítica global'
    },
    {
      id: 'capXI',
      title: 'CapXI - A Geografia do Poder Chinês',
      description: 'O poder da China  '
    },
    {
      id: 'capXII',
      title: 'CapXII - O Dilema Geográfico da Índia',
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

    this.contentService.loadVingancaGeografiaContent(chapterId).subscribe({
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
