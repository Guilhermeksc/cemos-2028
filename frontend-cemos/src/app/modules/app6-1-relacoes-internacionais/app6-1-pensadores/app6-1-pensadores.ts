import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { LivroIndividualService } from '../../../services/livro-individual.service';


interface MenuItem {
  id: string;
  title: string;
  flagPath?: string;
  imagePath?: string;
  markdownPath?: string;
  quote?: string;
  principal_obra?: string;
  ideia_central?: string;
  children?: MenuItem[];
}

interface PensadorFlat {
  id: string;
  title: string;
  flagPath?: string;
  imagePath?: string;
  markdownPath: string;
  quote?: string;
  principal_obra?: string;
  ideia_central?: string;
}

@Component({
  selector: 'app-app6-1-pensadores',
  imports: [
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './app6-1-pensadores.html',
  styleUrl: './app6-1-pensadores.scss',
  encapsulation: ViewEncapsulation.None
})

export class App61Pensadores implements OnInit {
  isLoading: boolean = false;
  htmlContent: SafeHtml = '';
  selectedMenuItemId: string = '';
  currentPensadorIndex: number = -1;
  flatPensadoresList: PensadorFlat[] = [];
  
  private readonly basePath = 'assets/content/relacoes-internacionais';
  private readonly flagsPath = 'assets/img/svg/flags';
  private readonly pensadoresImagePath = 'assets/img/svg/pensadores/relacoes-internacionais';
  
  menuItems: MenuItem[] = [
    {
      id: 'antiguidade-classica',
      title: 'Antiguidade Clássica (c. 460–347 a.C.)',
      children: [
        {
          id: 'tucidides',
          title: 'Tucídides (460–401 a.C.)',
          flagPath: `${this.flagsPath}/greece.svg`,
          imagePath: `${this.pensadoresImagePath}/1.png`,
          markdownPath: `${this.basePath}/pensadores/tucidides.md`,
          quote: 'Os fortes fazem o que podem e os fracos sofrem o que devem.',
          principal_obra: '📚 História da Guerra do Peloponeso'
        },
        {
          id: 'platao',
          title: 'Platão (427–347 a.C.)',
          flagPath: `${this.flagsPath}/greece.svg`,
          imagePath: `${this.pensadoresImagePath}/2.png`,
          markdownPath: `${this.basePath}/pensadores/platao.md`,
          quote: 'A justiça só é possível quando cada classe cumpre seu papel.',
          principal_obra: '📚 A República'
        },
        {
          id: 'aristoteles',
          title: 'Aristóteles (384–322 a.C.)',
          flagPath: `${this.flagsPath}/greece.svg`,
          imagePath: `${this.pensadoresImagePath}/3.png`,
          markdownPath: `${this.basePath}/pensadores/aristoteles.md`,
          quote: 'O homem é, por natureza, um animal político.',
          principal_obra: '📚 Política'
        }
      ]
    },
    {
      id: 'periodo-medieval',
      title: 'Período Medieval (c. 354–430 d.C.)',
      children: [
        {
          id: 'agostinho',
          title: 'Santo Agostinho (354–430)',
          flagPath: `${this.flagsPath}/argelia.svg`,
          imagePath: `${this.pensadoresImagePath}/4.png`,
          markdownPath: `${this.basePath}/pensadores/douhet.md`,
          quote: 'Todo ato é um ato de autopreservação da parte dos indivíduos.',
          principal_obra: '📚 A Cidade de Deus',
        }
      ]
    },
    {
      id: 'seculos-xvi-xvii',
      title: 'Séculos XVI–XVII',
      children: [
        {
          id: 'maquiavel',
          title: 'Nicolau Maquiavel (1469–1527)',
          flagPath: `${this.flagsPath}/italy.svg`,
          imagePath: `${this.pensadoresImagePath}/5.png`,
          markdownPath: `${this.basePath}/pensadores/maquiavel.md`,
          quote: '"Os fins justificam os meios" e “O príncipe responsável deve estar preparado para tomar qualquer iniciativa, desde que tenha em vista a preservação do Estado.”',
          principal_obra: '📚 O príncipe'
        },
        {
          id: 'bodin',
          title: 'Jean Bodin (1530–1596)',
          flagPath: `${this.flagsPath}/france.svg`,
          imagePath: `${this.pensadoresImagePath}/6.png`,
          markdownPath: `${this.basePath}/pensadores/bodin.md`,
          quote: 'Soberania era o “poder absoluto e perpétuo investido em uma comunidade”.',
          principal_obra: '📚 Os seis livros da república'
        },
        {
          id: 'hobbes',
          title: 'Thomas Hobbes (1588–1679)',
          flagPath: `${this.flagsPath}/england.svg`,
          imagePath: `${this.pensadoresImagePath}/7.png`,
          markdownPath: `${this.basePath}/pensadores/hobbes.md`,
          quote: 'A guerra é uma simples continuação da política por outros meios.',
          principal_obra: 'Da Guerra (Vom Kriege)'
        }
      ]
    },    
    {
      id: 'seculos-xviii',
      title: 'Século XVIII (Iluminismo)',
      children: [
        {
          id: 'locke',
          title: 'John Locke (1632–1704)',
          flagPath: `${this.flagsPath}/england.svg`,
          imagePath: `${this.pensadoresImagePath}/8.png`,
          markdownPath: `${this.basePath}/pensadores/locke.md`,
          quote: 'Jamais ataque de frente às posições que você pode obter ao contorná-las',
          principal_obra: 'Correspondência e Campanhas Napoleônicas'
        },
        {
          id: 'montesquieu',
          title: 'Montesquieu (1689–1755)',
          flagPath: `${this.flagsPath}/france.svg`,
          imagePath: `${this.pensadoresImagePath}/9.png`,
          markdownPath: `${this.basePath}/pensadores/montesquieu.md`,
          quote: 'A estratégia é a arte de fazer a guerra sobre o mapa.',
          principal_obra: 'Resumo da Arte da Guerra (Précis de l’art de la guerre) e Tratado de Grande Tática (Traité de grand tactique)'
        },
        {
          id: 'rousseau',
          title: 'Jean-Jacques Rousseau (1712–1778)',
          flagPath: `${this.flagsPath}/switzerland.svg`,
          imagePath: `${this.pensadoresImagePath}/10.png`,
          markdownPath: `${this.basePath}/pensadores/rousseau.md`,
          quote: 'A guerra é uma simples continuação da política por outros meios.',
          principal_obra: 'Da Guerra (Vom Kriege)'
        },
        {
          id: 'kant',
          title: 'Immanuel Kant (1724–1804)',
          flagPath: `${this.flagsPath}/german.svg`,
          imagePath: `${this.pensadoresImagePath}/9.png`,
          markdownPath: `${this.basePath}/pensadores/kant.md`,
          quote: 'A estratégia é a arte de fazer a guerra sobre o mapa.',
          principal_obra: 'Resumo da Arte da Guerra (Précis de l’art de la guerre) e Tratado de Grande Tática (Traité de grand tactique)'
        },
        {
          id: 'smith',
          title: 'Adam Smith (1723–1790)',
          flagPath: `${this.flagsPath}/scotland.svg`,
          imagePath: `${this.pensadoresImagePath}/11.png`,
          markdownPath: `${this.basePath}/pensadores/smith.md`,
          quote: 'A guerra é uma simples continuação da política por outros meios.',
          principal_obra: 'Da Guerra (Vom Kriege)'
        }
      ]
    },       
    {
      id: 'seculo-xix-inicio-seculo-xx',
      title: 'Século XIX e Início do Século XX',
      children: [
        {
          id: 'karl-marx',
          title: 'Karl Marx (1818–1883)',
          flagPath: `${this.flagsPath}/prussia.png`,
          imagePath: `${this.pensadoresImagePath}/12.png`,
          markdownPath: `${this.basePath}/pensadores/karl-marx.md`,
          quote: 'A guerra é uma simples continuação da política por outros meios.',
          principal_obra: 'Das 9 Habilidades da Guerra'
        },
        {
          id: 'john-a-hobson',
          title: 'John A. Hobson (1858–1940)',
          flagPath: `${this.flagsPath}/uk.svg`,
          imagePath: `${this.pensadoresImagePath}/13.png`,
          markdownPath: `${this.basePath}/pensadores/john-a-hobson.md`,
          quote: 'A guerra é uma simples continuação da política por outros meios.',
          principal_obra: 'Das 9 Habilidades da Guerra'
        },
        {
          id: 'v-i-lenin',
          title: 'V. I. Lênin (1870–1924)',
          flagPath: `${this.flagsPath}/russia.svg`,
          imagePath: `${this.pensadoresImagePath}/14.png`,
          markdownPath: `${this.basePath}/pensadores/v-i-lenin.md`,
          quote: 'A guerra é uma simples continuação da política por outros meios.',
          principal_obra: 'Das 9 Habilidades da Guerra'
        },
        {
          id: 'woodrow-wilson',
          title: 'Woodrow Wilson (1856–1924)',
          flagPath: `${this.flagsPath}/eua.svg`,
          imagePath: `${this.pensadoresImagePath}/15.png`,
          markdownPath: `${this.basePath}/pensadores/woodrow-wilson.md`,
          quote: 'A guerra é uma simples continuação da política por outros meios.',
          principal_obra: 'Das 9 Habilidades da Guerra'
        }
      ]
    },       
    {
      id: 'pos-segunda-guerra-mundial',
      title: 'Pós-Segunda Guerra Mundial (Realismo Clássico)',
      children: [
        {
          id: 'george-kennan',
          title: 'George Kennan (1904–2005)',
          flagPath: `${this.flagsPath}/uk.svg`,
          imagePath: `${this.pensadoresImagePath}/16.png`,
          markdownPath: `${this.basePath}/pensadores/george-kennan.md`,
          quote: 'A guerra é uma simples continuação da política por outros meios.',
          principal_obra: 'Das 9 Habilidades da Guerra'
        },
        {
          id: 'hans-morgenthau',
          title: 'Hans Morgenthau (1904–1980)',
          flagPath: `${this.flagsPath}/eua.svg`,
          imagePath: `${this.pensadoresImagePath}/17.png`,
          markdownPath: `${this.basePath}/pensadores/hans-morgenthau.md`,
          quote: 'A guerra é uma simples continuação da política por outros meios.',
          principal_obra: 'Das 9 Habilidades da Guerra'
        },
        {
          id: 'henry-kissinger',
          title: 'Henry Kissinger (1923–2023)',
          flagPath: `${this.flagsPath}/german.svg`,
          imagePath: `${this.pensadoresImagePath}/18.png`,
          markdownPath: `${this.basePath}/pensadores/henry-kissinger.md`,
          quote: 'A guerra é uma simples continuação da política por outros meios.',
          principal_obra: 'Das 9 Habilidades da Guerra'
        },
        {
          id: 'paul-kennedy',
          title: 'Paul Kennedy (1945–)',
          flagPath: `${this.flagsPath}/eua.svg`,
          imagePath: `${this.pensadoresImagePath}/19.png`,
          markdownPath: `${this.basePath}/pensadores/paul-kennedy.md`,
          quote: 'A guerra é uma simples continuação da política por outros meios.',
          principal_obra: 'Das 9 Habilidades da Guerra'
        }
      ]
    },       
    {
      id: 'pos-guerra-fria',
      title: 'Pós-Guerra Fria (Neorrealismo/Realismo Estrutural)',
      children: [
        {
          id: 'john-mearsheimer',
          title: 'John Mearsheimer (1947–)',
          flagPath: `${this.flagsPath}/uk.svg`,
          imagePath: `${this.pensadoresImagePath}/20.png`,
          markdownPath: `${this.basePath}/pensadores/john-mearsheimer.md`,
          quote: 'A guerra é uma simples continuação da política por outros meios.',
          principal_obra: 'Das 9 Habilidades da Guerra'
        },
        {
          id: 'kenneth-n-waltz',
          title: 'Kenneth N. Waltz (1924–2013)',
          flagPath: `${this.flagsPath}/eua.svg`,
          imagePath: `${this.pensadoresImagePath}/21.png`,
          markdownPath: `${this.basePath}/pensadores/kenneth-n-waltz.md`,
          quote: 'A guerra é uma simples continuação da política por outros meios.',
          principal_obra: 'Das 9 Habilidades da Guerra'
        },
        {
          id: 'j-david-singer',
          title: 'J. David Singer (1925–2009)',
          flagPath: `${this.flagsPath}/german.svg`,
          imagePath: `${this.pensadoresImagePath}/22.png`,
          markdownPath: `${this.basePath}/pensadores/j-david-singer.md`,
          quote: 'A guerra é uma simples continuação da política por outros meios.',
          principal_obra: 'Das 9 Habilidades da Guerra'
        },
        {
          id: 'robert-gilpin',
          title: 'Robert Gilpin (1930–2018)',
          flagPath: `${this.flagsPath}/eua.svg`,
          imagePath: `${this.pensadoresImagePath}/23.png`,
          markdownPath: `${this.basePath}/pensadores/robert-gilpin.md`,
          quote: 'A guerra é uma simples continuação da política por outros meios.',
          principal_obra: 'Das 9 Habilidades da Guerra'
        }
      ]
    },       
    {
      id: 'pos-guerra-fria-neoliberalismo',
      title: 'Pós-Guerra Fria (Neoliberalismo)',
      children: [
        {
          id: 'john-g-ikenberry',
          title: 'John G. Ikenberry (1954–)',
          flagPath: `${this.flagsPath}/eua.svg`,
          imagePath: `${this.pensadoresImagePath}/24.png`,
          markdownPath: `${this.basePath}/pensadores/john-g-ikenberry.md`,
          quote: 'A guerra é uma simples continuação da política por outros meios.',
          principal_obra: 'Das 9 Habilidades da Guerra'
        },
        {
          id: 'francis-fukuyama',
          title: 'Francis Fukuyama (1952–)',
          flagPath: `${this.flagsPath}/eua.svg`,
          imagePath: `${this.pensadoresImagePath}/25.png`,
          markdownPath: `${this.basePath}/pensadores/francis-fukuyama.md`,
          quote: 'A guerra é uma simples continuação da política por outros meios.',
          principal_obra: 'Das 9 Habilidades da Guerra'
        },
        {
          id: 'r-keohane-j-nye',
          title: 'R. Keohane (1941–) e J. Nye (1940–) ',
          flagPath: `${this.flagsPath}/german.svg`,
          imagePath: `${this.pensadoresImagePath}/26.png`,
          markdownPath: `${this.basePath}/pensadores/r-keohane-j-nye.md`,
          quote: 'A guerra é uma simples continuação da política por outros meios.',
          principal_obra: 'Das 9 Habilidades da Guerra'
        }
      ]
    },       
    {
      id: 'pos-guerra-fria-radicalismo',
      title: 'Pós-Guerra Fria (Radicalismo)',
      children: [
        {
          id: 'prebisch',
          title: 'Prebisch (1901–1986)',
          flagPath: `${this.flagsPath}/eua.svg`,
          imagePath: `${this.pensadoresImagePath}/27.png`,
          markdownPath: `${this.basePath}/pensadores/prebisch.md`,
          quote: 'A guerra é uma simples continuação da política por outros meios.',
          principal_obra: 'Das 9 Habilidades da Guerra'
        }
      ]
    }
  ];

  constructor(
    private livroService: LivroIndividualService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // Cria lista plana de todos os pensadores para navegação
    this.buildFlatPensadoresList();
    
    // Inicializa com o primeiro pensador (Napoleão Bonaparte)
    if (this.flatPensadoresList.length > 0) {
      const firstPensador = this.flatPensadoresList[0];
      this.currentPensadorIndex = 0;
      this.selectedMenuItemId = firstPensador.id;
      this.loadContent(firstPensador.markdownPath);
    }
  }

  /**
   * Constrói uma lista plana de todos os pensadores (incluindo subitens)
   * para facilitar a navegação no carrossel
   */
  private buildFlatPensadoresList(): void {
    this.flatPensadoresList = [];
    
    this.menuItems.forEach(item => {
      if (item.markdownPath) {
        // Item principal com markdown
            this.flatPensadoresList.push({
              id: item.id,
              title: item.title,
              flagPath: item.flagPath,
              imagePath: item.imagePath || `${this.pensadoresImagePath}/${item.id}.svg`,
              markdownPath: item.markdownPath,
              quote: item.quote,
              principal_obra: item.principal_obra,
              ideia_central: item.ideia_central
            });
      } else if (item.children) {
        // Item com subitens
        item.children.forEach(child => {
          if (child.markdownPath) {
            this.flatPensadoresList.push({
              id: child.id,
              title: child.title,
              flagPath: child.flagPath,
              imagePath: child.imagePath || `${this.pensadoresImagePath}/${child.id}.svg`,
              markdownPath: child.markdownPath,
              quote: child.quote,
              principal_obra: child.principal_obra,
              ideia_central: child.ideia_central
            });
          }
        });
      }
    });
  }

  /**
   * Retorna o pensador atual
   */
  get currentPensador(): PensadorFlat | null {
    if (this.currentPensadorIndex >= 0 && this.currentPensadorIndex < this.flatPensadoresList.length) {
      return this.flatPensadoresList[this.currentPensadorIndex];
    }
    return null;
  }

  /**
   * Retorna o pensador anterior
   */
  get previousPensador(): PensadorFlat | null {
    if (this.currentPensadorIndex > 0) {
      return this.flatPensadoresList[this.currentPensadorIndex - 1];
    }
    return null;
  }

  /**
   * Retorna o pensador próximo
   */
  get nextPensador(): PensadorFlat | null {
    if (this.currentPensadorIndex >= 0 && this.currentPensadorIndex < this.flatPensadoresList.length - 1) {
      return this.flatPensadoresList[this.currentPensadorIndex + 1];
    }
    return null;
  }

  /**
   * Retorna o pensador anterior do anterior
   */
  get previousPreviousPensador(): PensadorFlat | null {
    if (this.currentPensadorIndex > 1) {
      return this.flatPensadoresList[this.currentPensadorIndex - 2];
    }
    return null;
  }

  /**
   * Retorna o pensador próximo do próximo
   */
  get nextNextPensador(): PensadorFlat | null {
    if (this.currentPensadorIndex >= 0 && this.currentPensadorIndex < this.flatPensadoresList.length - 2) {
      return this.flatPensadoresList[this.currentPensadorIndex + 2];
    }
    return null;
  }

  selectMenuItem(item: MenuItem, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    
    if (item.markdownPath) {
      this.selectedMenuItemId = item.id;
      this.selectPensadorById(item.id);
    }
    // Itens com children sempre abertos, não faz nada ao clicar
  }

  selectSubMenuItem(parentId: string, subItem: MenuItem, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    
    if (subItem.markdownPath) {
      this.selectedMenuItemId = subItem.id;
      this.selectPensadorById(subItem.id);
    }
  }

  /**
   * Seleciona um pensador pelo ID e atualiza o índice do carrossel
   */
  selectPensadorById(id: string): void {
    const index = this.flatPensadoresList.findIndex(p => p.id === id);
    if (index >= 0) {
      this.currentPensadorIndex = index;
      const pensador = this.flatPensadoresList[index];
      this.loadContent(pensador.markdownPath);
    }
  }

  /**
   * Navega para o pensador anterior
   */
  navigatePrevious(): void {
    if (this.currentPensadorIndex > 0) {
      this.currentPensadorIndex--;
      const pensador = this.flatPensadoresList[this.currentPensadorIndex];
      this.selectedMenuItemId = pensador.id;
      this.loadContent(pensador.markdownPath);
    }
  }

  /**
   * Navega para o próximo pensador
   */
  navigateNext(): void {
    if (this.currentPensadorIndex < this.flatPensadoresList.length - 1) {
      this.currentPensadorIndex++;
      const pensador = this.flatPensadoresList[this.currentPensadorIndex];
      this.selectedMenuItemId = pensador.id;
      this.loadContent(pensador.markdownPath);
    }
  }

  /**
   * Navega para um pensador específico pelo índice
   */
  navigateToPensador(pensador: PensadorFlat): void {
    const index = this.flatPensadoresList.findIndex(p => p.id === pensador.id);
    if (index >= 0) {
      this.currentPensadorIndex = index;
      this.selectedMenuItemId = pensador.id;
      this.loadContent(pensador.markdownPath);
    }
  }

  isSubItemSelected(subItem: MenuItem): boolean {
    return this.selectedMenuItemId === subItem.id;
  }

  isSelected(item: MenuItem): boolean {
    return this.selectedMenuItemId === item.id;
  }

  private loadContent(markdownPath: string) {
    this.isLoading = true;
    
    this.livroService.loadMarkdownFile(markdownPath).subscribe({
      next: (content: string) => {
        const html = this.livroService.markdownToHtml(
          content,
          this.basePath
        );
        this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Erro ao carregar arquivo Markdown:', error);
        this.htmlContent = this.sanitizer.bypassSecurityTrustHtml('<p>Conteúdo não disponível.</p>');
        this.isLoading = false;
      }
    });
  }
}