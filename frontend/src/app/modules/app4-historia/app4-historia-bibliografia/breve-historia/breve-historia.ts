import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubMenu, SubMenuItem } from '../../../../components/sub-menu/sub-menu';
import { ContentService } from '../../../../services/content.service';
import { BibliografiaCompleta } from '../../../../components/bibliografia-completa/bibliografia-completa';
import { BibliografiaCompletaData } from '../../../../interfaces/bibliografia-completa.interface';

@Component({
  selector: 'app-breve-historia',
  imports: [
    CommonModule,
    SubMenu,
    HttpClientModule,
    BibliografiaCompleta
  ],
  templateUrl: './breve-historia.html',
  styleUrl: './breve-historia.scss',
  encapsulation: ViewEncapsulation.None
})
export class BreveHistoria implements OnInit {
  menuTitle = 'Breve História do Mundo';
  menuSubtitle = 'H. G. Wells - Selecione um capítulo para estudar';
  
  selectedContent = '';
  selectedHtmlContent = '';
  isLoading = false;
  isSubMenuCollapsed = false;
  selectedMenuItem?: SubMenuItem;

  // Dados para o component Bibliografia Completa
  bibliografiaData: BibliografiaCompletaData = {
    livro: {
      titulo: 'Breve História do Mundo',
      autor: 'H. G. Wells'
    },
    video: {
      titulo: 'Documentários Históricos',
      descricao: 'Vídeos educativos sobre os períodos históricos abordados no livro',
      basePath: '/assets/content/historia/breve-historia/video'
    },
    podcastPerguntas: {
      titulo: 'História em Debate',
      descricao: 'Podcasts e questões baseadas no capítulo selecionado para aprofundar o conhecimento histórico',
      basePath: '/assets/content/historia/breve-historia/podcast'
    }
  };
  
  constructor(private contentService: ContentService, private router: Router) {}

  subMenuItems: SubMenuItem[] = [
    {
      id: 'cap1',
      title: 'Cap1 - Uma Aurora Resplandecente',
      description: 'O início promissor do século XX'
    },
    {
      id: 'cap3',
      title: 'Cap3 - Uma Tempestade de Mudanças',
      description: 'Transformações sociais e políticas'
    },
    {
      id: 'cap4',
      title: 'Cap4 - A Guerra das Guerras',
      description: 'Páginas 50-65'
    },
    {
      id: 'cap5',
      title: 'Cap5 - Revolta em Petrogrado, Paz em Paris',
      description: 'Páginas 65-78'
    },
    {
      id: 'cap6',
      title: 'Cap6 - Utopia e Pesadelo',
      description: 'Páginas 78-91'
    },
    {
      id: 'cap7',
      title: 'Cap7 - O Velho Sultão e o Jovem Turco',
      description: 'Páginas 91 a 98'
    },
    {
      id: 'cap9',
      title: 'Cap9 - Um Percussionista Italiano',
      description: 'Páginas 111-117'
    },
    {
      id: 'cap10',
      title: 'Cap10 - Uma Depressão Mundial',
      description: 'Páginas 118-124'
    },
    {
      id: 'cap11',
      title: 'Cap11 - A Ascensão de Hitler',
      description: 'Páginas 125-133'
    },
    {
      id: 'cap12',
      title: 'Cap12 - Uma Segunda Guerra Mundial',
      description: 'Páginas 134-144'
    },
    {
      id: 'cap13',
      title: 'Cap13 - De Pearl Harbor à Queda de Berlim',
      description: 'Páginas 145-158'
    },
    {
      id: 'cap14',
      title: 'Cap14 - Uma Arma muito Secreta',
      description: 'Páginas 159-165'
    },
    {
      id: 'cap15',
      title: 'Cap15 - Cai o Pano',
      description: 'Páginas 166-178'
    },
    {
      id: 'cap16',
      title: 'Cap16 - A Flecha Flamejante e os Ventos da Mudança',
      description: 'Páginas 179-192'
    },
    {
      id: 'cap18',
      title: 'Cap18 - As Naves da Vingança',
      description: 'Páginas 202-211'
    },
    {
      id: 'cap19',
      title: 'Cap19 - A Ilha Explosiva e o Navio Fantasma',
      description: 'Páginas 212-221'
    },
    {
      id: 'cap23',
      title: 'Cap23 - Raios e Trovões em Moscou e Varsóvia',
      description: 'Páginas 258-266'
    },
    {
      id: 'cap24',
      title: 'Cap24 - A Queda dos Muros',
      description: 'Páginas 267-280'
    },
    {
      id: 'cap26',
      title: 'Cap26 - A Lua do Islã brilha outra vez',
      description: 'Páginas 293-302'
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
    this.router.navigate(['home', 'app4-historia', 'bibliografia']);
  }

  private loadContent(chapterId: string) {
    this.isLoading = true;
    this.selectedContent = '';
    this.selectedHtmlContent = '';

    this.contentService.loadBreveHistoriaContent(chapterId).subscribe({
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
