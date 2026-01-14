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
  children?: MenuItem[];
}

interface PensadorFlat {
  id: string;
  title: string;
  flagPath?: string;
  imagePath?: string;
  markdownPath: string;
  quote?: string;
}

@Component({
  selector: 'app-app2-estrategia-pensadores',
  imports: [
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './app2-estrategia-pensadores.html',
  styleUrl: './app2-estrategia-pensadores.scss',
  encapsulation: ViewEncapsulation.None
})
export class App2EstrategiaPensadores implements OnInit {
  isLoading: boolean = false;
  htmlContent: SafeHtml = '';
  selectedMenuItemId: string = '';
  currentPensadorIndex: number = -1;
  flatPensadoresList: PensadorFlat[] = [];
  
  private readonly basePath = 'assets/content/estrategia/3-ema-310';
  private readonly flagsPath = 'assets/img/svg/flags';
  private readonly pensadoresImagePath = 'assets/img/svg/pensadores';
  
  menuItems: MenuItem[] = [
    {
      id: 'principais-pensadores',
      title: 'PRINCIPAIS PENSADORES',
      children: [
        {
          id: 'napoleao-bonaparte',
          title: 'Napoleão Bonaparte (1769-1821)',
          flagPath: `${this.flagsPath}/france.svg`,
          imagePath: `${this.pensadoresImagePath}/bonaparte.png`,
          markdownPath: `${this.basePath}/pensadores/napoleao-bonaparte.md`,
          quote: 'Jamais ataque de frente às posições que você pode obter ao contorná-las'
        },
        {
          id: 'antoine-henri-jomini',
          title: 'Antoine Henri Jomini (1779-1869)',
          flagPath: `${this.flagsPath}/switzerland.svg`,
          imagePath: `${this.pensadoresImagePath}/jomini.png`,
          markdownPath: `${this.basePath}/pensadores/antoine-henri-jomini.md`,
          quote: 'A estratégia é a arte de fazer a guerra sobre o mapa.'
        },
        {
          id: 'carl-von-clausewitz',
          title: 'Carl von Clausewitz (1780-1831)',
          flagPath: `${this.flagsPath}/prussia.png`,
          imagePath: `${this.pensadoresImagePath}/clausewitz.png`,
          markdownPath: `${this.basePath}/pensadores/carl-von-clausewitz.md`,
          quote: 'A guerra é uma simples continuação da política por outros meios.'
        },
        {
          id: 'philip-colomb',
          title: 'Philip Colomb (1831-1899)',
          flagPath: `${this.flagsPath}/uk.svg`,
          imagePath: `${this.pensadoresImagePath}/colomb.png`,
          markdownPath: `${this.basePath}/pensadores/philip-colomb.md`
        },
        {
          id: 'alfred-thayer-mahan',
          title: 'Alfred Thayer Mahan (1840-1914)',
          flagPath: `${this.flagsPath}/eua.svg`,
          imagePath: `${this.pensadoresImagePath}/mahan.png`,
          markdownPath: `${this.basePath}/pensadores/alfred-thayer-mahan.md`,
          quote: 'O poder marítimo é essencial para o comércio e a prosperidade das nações.'
        },
        {
          id: 'aube',
          title: 'Aube (1826-1890)',
          flagPath: `${this.flagsPath}/france.svg`,
          imagePath: `${this.pensadoresImagePath}/aube.png`,
          markdownPath: `${this.basePath}/pensadores/aube.md`,
          quote: 'A marinha deve ser uma força de ataque, não apenas de defesa.'
        },
        {
          id: 'julian-corbett',
          title: 'Julian Corbett (1854-1922)',
          flagPath: `${this.flagsPath}/uk.svg`,
          imagePath: `${this.pensadoresImagePath}/corbett.png`,
          markdownPath: `${this.basePath}/pensadores/julian-corbett.md`,
          quote: 'A estratégia naval deve estar subordinada à estratégia geral.'
        },
        {
          id: 'raoul-castex',
          title: 'Raoul Castex (1878-1968)',
          flagPath: `${this.flagsPath}/france.svg`,
          imagePath: `${this.pensadoresImagePath}/castex.png`,
          markdownPath: `${this.basePath}/pensadores/raoul-castex.md`,
          quote: 'A estratégia marítima é a arte de aplicar o poder naval aos objetivos políticos.'
        },
        {
          id: 'liddell-hart',
          title: 'Liddell Hart (1895-1970)',
          flagPath: `${this.flagsPath}/uk.svg`,
          imagePath: `${this.pensadoresImagePath}/liddell-hart.png`,
          markdownPath: `${this.basePath}/pensadores/liddell-hart.md`,
          quote: 'A estratégia indireta busca desequilibrar o inimigo antes de atacar.'
        }
      ]
    },
    {
      id: 'pensadores-estrategicos-aereos',
      title: 'PENSADORES ESTRATÉGICOS AÉREOS',
      children: [
        {
          id: 'douhet',
          title: 'Douhet (1869-1930)',
          flagPath: `${this.flagsPath}/italy.svg`,
          imagePath: `${this.pensadoresImagePath}/douhet.svg`,
          markdownPath: `${this.basePath}/pensadores/douhet.md`,
          quote: 'A vitória sorri àqueles que antecipam as mudanças no caráter da guerra.'
        },
        {
          id: 'trenchard',
          title: 'Trenchard (1873-1956)',
          flagPath: `${this.flagsPath}/uk.svg`,
          imagePath: `${this.pensadoresImagePath}/trenchard.svg`,
          markdownPath: `${this.basePath}/pensadores/trenchard.md`,
          quote: 'O poder aéreo pode atacar o coração do inimigo, evitando suas forças principais.'
        },
        {
          id: 'billy-mitchell',
          title: 'Billy Mitchell (1879-1936)',
          flagPath: `${this.flagsPath}/eua.svg`,
          imagePath: `${this.pensadoresImagePath}/billy-mitchell.svg`,
          markdownPath: `${this.basePath}/pensadores/billy-mitchell.md`,
          quote: 'O poder aéreo é o fator decisivo na guerra moderna.'
        },
        {
          id: 'seversky',
          title: 'Seversky (1894-1974)',
          flagPath: `${this.flagsPath}/russia.svg`,
          imagePath: `${this.pensadoresImagePath}/seversky.svg`,
          markdownPath: `${this.basePath}/pensadores/seversky.md`
        },
        {
          id: 'coronel-mendigal',
          title: 'Coronel Mendigal',
          flagPath: `${this.flagsPath}/france.svg`,
          imagePath: `${this.pensadoresImagePath}/coronel-mendigal.svg`,
          markdownPath: `${this.basePath}/pensadores/coronel-mendigal.md`
        },
        {
          id: 'general-bertrand',
          title: 'General Bertrand',
          flagPath: `${this.flagsPath}/france.svg`,
          imagePath: `${this.pensadoresImagePath}/general-bertrand.svg`,
          markdownPath: `${this.basePath}/pensadores/general-bertrand.md`
        },
        {
          id: 'general-mcpeak',
          title: 'General Mcpeak (1936-XXXX)',
          flagPath: `${this.flagsPath}/eua.svg`,
          imagePath: `${this.pensadoresImagePath}/general-mcpeak.svg`,
          markdownPath: `${this.basePath}/pensadores/general-mcpeak.md`
        },
        {
          id: 'david-lupton',
          title: 'David Lupton',
          flagPath: `${this.flagsPath}/eua.svg`,
          imagePath: `${this.pensadoresImagePath}/david-lupton.svg`,
          markdownPath: `${this.basePath}/pensadores/david-lupton.md`
        },
        {
          id: 'alexsander-lapchinsky',
          title: 'Alexsander Lapchinsky (1936-XXXX)',
          flagPath: `${this.flagsPath}/russia.svg`,
          imagePath: `${this.pensadoresImagePath}/alexsander-lapchinsky.svg`,
          markdownPath: `${this.basePath}/pensadores/alexsander-lapchinsky.md`
        }
      ]
    },
    {
      id: 'teoricos-paralisia-estrategica',
      title: 'TEÓRICOS DA PARALISIA ESTRATÉGICA',
      children: [
        {
          id: 'coronel-boyd',
          title: 'Coronel Boyd (1895-1967)',
          flagPath: `${this.flagsPath}/eua.svg`,
          imagePath: `${this.pensadoresImagePath}/coronel-boyd.svg`,
          markdownPath: `${this.basePath}/pensadores/coronel-boyd.md`
        },
        {
          id: 'coronel-warde',
          title: 'Coronel Warde (1895-1967)',
          flagPath: `${this.flagsPath}/eua.svg`,
          imagePath: `${this.pensadoresImagePath}/coronel-warde.svg`,
          markdownPath: `${this.basePath}/pensadores/coronel-warde.md`
        },
        {
          id: 'brigadeiro-david-deptula',
          title: 'Brigadeiro David Deptula (1895-1967)',
          flagPath: `${this.flagsPath}/eua.svg`,
          imagePath: `${this.pensadoresImagePath}/brigadeiro-david-deptula.svg`,
          markdownPath: `${this.basePath}/pensadores/brigadeiro-david-deptula.md`
        },
        {
          id: 'shock-and-awe',
          title: 'SHOCK AND AWE',
          flagPath: `${this.flagsPath}/eua.svg`,
          imagePath: `${this.pensadoresImagePath}/shock-and-awe.svg`,
          markdownPath: `${this.basePath}/pensadores/shock-and-awe.md`
        },
        {
          id: 'halt-phase-concept',
          title: 'HALT PHASE CONCEPT',
          flagPath: `${this.flagsPath}/eua.svg`,
          imagePath: `${this.pensadoresImagePath}/halt-phase-concept.svg`,
          markdownPath: `${this.basePath}/pensadores/halt-phase-concept.md`
        }
      ]
    },
    {
      id: 'outros-pensadores',
      title: 'OUTROS PENSADORES',
      children: [
        {
          id: 'sun-tzu',
          title: 'Sun Tzu (544 a.C. – 496 a.C)',
          flagPath: `${this.flagsPath}/china.svg`,
          imagePath: `${this.pensadoresImagePath}/sun-tzu.svg`,
          markdownPath: `${this.basePath}/pensadores/sun-tzu.md`,
          quote: 'A suprema arte da guerra é subjugar o inimigo sem lutar.'
        },
        {
          id: 'almirante-herbert',
          title: 'Almirante Herbert (1847-1923)',
          flagPath: `${this.flagsPath}/uk.svg`,
          imagePath: `${this.pensadoresImagePath}/almirante-herbert.svg`,
          markdownPath: `${this.basePath}/pensadores/almirante-herbert.md`
        },
        {
          id: 'joly-de-maizeroy',
          title: 'Joly de Maizeroy (1719-1780)',
          flagPath: `${this.flagsPath}/france.svg`,
          imagePath: `${this.pensadoresImagePath}/joly-de-maizeroy.svg`,
          markdownPath: `${this.basePath}/pensadores/joly-de-maizeroy.md`
        },
        {
          id: 'helwig-e-venturini',
          title: 'Helwig e Venturini (1750-1815)',
          flagPath: `${this.flagsPath}/prussia.png`,
          imagePath: `${this.pensadoresImagePath}/helwig-e-venturini.svg`,
          markdownPath: `${this.basePath}/pensadores/helwig-e-venturini.md`
        },
        {
          id: 'von-massenbach',
          title: 'Von Massenbach (1750-1815)',
          flagPath: `${this.flagsPath}/prussia.png`,
          imagePath: `${this.pensadoresImagePath}/von-massenbach.svg`,
          markdownPath: `${this.basePath}/pensadores/von-massenbach.md`
        },
        {
          id: 'coronel-carrion-nisas',
          title: 'Coronel Carrion Nisas (1767-1841)',
          flagPath: `${this.flagsPath}/france.svg`,
          imagePath: `${this.pensadoresImagePath}/coronel-carrion-nisas.svg`,
          markdownPath: `${this.basePath}/pensadores/coronel-carrion-nisas.md`
        },
        {
          id: 'marechal-von-moltke',
          title: 'Marechal Von Moltke (1800-1891)',
          flagPath: `${this.flagsPath}/prussia.png`,
          imagePath: `${this.pensadoresImagePath}/marechal-von-moltke.svg`,
          markdownPath: `${this.basePath}/pensadores/marechal-von-moltke.md`
        },
        {
          id: 'general-lewal',
          title: 'General Lewal (1875)',
          flagPath: `${this.flagsPath}/france.svg`,
          imagePath: `${this.pensadoresImagePath}/general-lewal.svg`,
          markdownPath: `${this.basePath}/pensadores/general-lewal.md`
        },
        {
          id: 'general-iung',
          title: 'General Iung (1875)',
          flagPath: `${this.flagsPath}/france.svg`,
          imagePath: `${this.pensadoresImagePath}/general-iung.svg`,
          markdownPath: `${this.basePath}/pensadores/general-iung.md`
        },
        {
          id: 'serge-grouard',
          title: 'Serge Grouard (1895)',
          flagPath: `${this.flagsPath}/france.svg`,
          imagePath: `${this.pensadoresImagePath}/serge-grouard.svg`,
          markdownPath: `${this.basePath}/pensadores/serge-grouard.md`
        },
        {
          id: 'clemenceau',
          title: 'Clemenceau (1841-1929)',
          flagPath: `${this.flagsPath}/france.svg`,
          imagePath: `${this.pensadoresImagePath}/clemenceau.svg`,
          markdownPath: `${this.basePath}/pensadores/clemenceau.md`
        },
        {
          id: 'gabriel-tarde',
          title: 'Gabriel Tarde (1843-1904)',
          flagPath: `${this.flagsPath}/france.svg`,
          imagePath: `${this.pensadoresImagePath}/gabriel-tarde.svg`,
          markdownPath: `${this.basePath}/pensadores/gabriel-tarde.md`
        },
        {
          id: 'general-ludendorff',
          title: 'General Ludendorff (1865-1937)',
          flagPath: `${this.flagsPath}/prussia.png`,
          imagePath: `${this.pensadoresImagePath}/general-ludendorff.svg`,
          markdownPath: `${this.basePath}/pensadores/general-ludendorff.md`
        },
        {
          id: 'coronel-grandmaison',
          title: 'Coronel Grandmaison (1865-1937)',
          flagPath: `${this.flagsPath}/france.svg`,
          imagePath: `${this.pensadoresImagePath}/coronel-grandmaison.svg`,
          markdownPath: `${this.basePath}/pensadores/coronel-grandmaison.md`
        },
        {
          id: 'robert-caplow',
          title: 'Robert Caplow (1865-1937)',
          flagPath: `${this.flagsPath}/eua.svg`,
          imagePath: `${this.pensadoresImagePath}/robert-caplow.svg`,
          markdownPath: `${this.basePath}/pensadores/robert-caplow.md`
        },
        {
          id: 'alexsandr-svechin',
          title: 'Alexsandr Svechin (1878-1938)',
          flagPath: `${this.flagsPath}/russia.svg`,
          imagePath: `${this.pensadoresImagePath}/alexsandr-svechin.svg`,
          markdownPath: `${this.basePath}/pensadores/alexsandr-svechin.md`
        },
        {
          id: 'carl-schmitt',
          title: 'Carl Schmitt (1888-1985)',
          flagPath: `${this.flagsPath}/german.svg`,
          imagePath: `${this.pensadoresImagePath}/carl-schmitt.svg`,
          markdownPath: `${this.basePath}/pensadores/carl-schmitt.md`
        },
        {
          id: 'adolf-hittler',
          title: 'Adolf Hitler (1889-1945)',
          flagPath: `${this.flagsPath}/german.svg`,
          imagePath: `${this.pensadoresImagePath}/adolf-hittler.svg`,
          markdownPath: `${this.basePath}/pensadores/adolf-hittler.md`
        },
        {
          id: 'general-beaufre',
          title: 'General Beaufre (1902-1975)',
          flagPath: `${this.flagsPath}/france.svg`,
          imagePath: `${this.pensadoresImagePath}/general-beaufre.svg`,
          markdownPath: `${this.basePath}/pensadores/general-beaufre.md`
        },
        {
          id: 'raymond-aron',
          title: 'Raymond Aron (1905-1983)',
          flagPath: `${this.flagsPath}/france.svg`,
          imagePath: `${this.pensadoresImagePath}/raymond-aron.svg`,
          markdownPath: `${this.basePath}/pensadores/raymond-aron.md`
        },
        {
          id: 'bernard-brodie',
          title: 'Bernard Brodie (1910-1978)',
          flagPath: `${this.flagsPath}/eua.svg`,
          imagePath: `${this.pensadoresImagePath}/bernard-brodie.svg`,
          markdownPath: `${this.basePath}/pensadores/bernard-brodie.md`
        },
        {
          id: 'general-lucien-poirier',
          title: 'General Lucien Poirier (1918-2013)',
          flagPath: `${this.flagsPath}/france.svg`,
          imagePath: `${this.pensadoresImagePath}/general-lucien-poirier.svg`,
          markdownPath: `${this.basePath}/pensadores/general-lucien-poirier.md`
        },
        {
          id: 'julien-freund',
          title: 'Julien Freund (1921-1993)',
          flagPath: `${this.flagsPath}/france.svg`,
          imagePath: `${this.pensadoresImagePath}/julien-freund.svg`,
          markdownPath: `${this.basePath}/pensadores/julien-freund.md`
        },
        {
          id: 'joseph-s-nye',
          title: 'Joseph S. Nye (1937-XXXX)',
          flagPath: `${this.flagsPath}/eua.svg`,
          imagePath: `${this.pensadoresImagePath}/joseph-s-nye.svg`,
          markdownPath: `${this.basePath}/pensadores/joseph-s-nye.md`
        },
        {
          id: 'hugues-eudeline',
          title: 'Hugues Eudeline (1937-XXXX)',
          flagPath: `${this.flagsPath}/france.svg`,
          imagePath: `${this.pensadoresImagePath}/hugues-eudeline.svg`,
          markdownPath: `${this.basePath}/pensadores/hugues-eudeline.md`
        },
        {
          id: 'lars-wedin',
          title: 'Lars Wedin (1937-XXXX)',
          flagPath: `${this.flagsPath}/sweden.svg`,
          imagePath: `${this.pensadoresImagePath}/lars-wedin.svg`,
          markdownPath: `${this.basePath}/pensadores/lars-wedin.md`
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
              quote: item.quote
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
              quote: child.quote
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