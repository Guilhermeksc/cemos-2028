// ...existing code...
import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from '../../../services/auth.service';

interface MenuItem {
  title: string;
  icon: string;
  children: (string | SubMenuItem)[];
  expanded: boolean;
}

interface SubMenuItem {
  title: string;
  icon?: string;
  children?: (string | SubSubMenuItem)[];
  expanded?: boolean;
}

interface SubSubMenuItem {
  title: string;
  icon?: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.scss',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0px',
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        overflow: 'hidden'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class SideMenu {
  @Input() isTopMenuMode: boolean = false;
  @Output() itemClicked = new EventEmitter<void>();
  
  // Rastrear o item ativo atual
  currentActivePath = signal<string>('');

  constructor(private router: Router, private authService: AuthService) {}
      /**
       * Navega para a página Home
       */
      navigateHome(): void {
        this.router.navigate(['/home']);
      }

  readonly menuItems = signal<MenuItem[]>([
    { 
      title: 'História', 
      icon: 'history_edu', 
      children: [
        {
          title: 'Bibliografia',
          children: [
            'Breve História',
            'Guerra no Mar',
            'História das Guerras',
            'Síntese Histórica'
          ]
        },
        'Mídia',
        'Perguntas',
        'Resumo',    
      ],
      expanded: false
    },  
    { 
      title: 'Geopolítica e Relações Internacionais', 
      icon: 'public', 
      children: [
        {
          title: 'Bibliografia',
          children: [
            'A Vingança da Geografia',
            'Geopolítica e Modernidade',
            'Novas Geopolíticas',
            'Princípios de Relações Internacionais'
          ]
        },
        'Vídeos / Podcasts',
        'Flash Cards',
        'Perguntas',
        'Conceitos',
        {
          title: 'Resumo',
          children: [
            'Geopolítica',
            'Relações Internacionais'
          ]
        }, 
      ],
      expanded: false
    },      
    { 
      title: 'Intendência', 
      icon: 'inventory_2', 
      children: [
        'Bibliografia',
        'Mídia',
        'Perguntas',
        'Resumo',    
      ],
      expanded: false
    },
    { 
      title: 'Estratégia', 
      icon: 'route', 
      children: [
        'Bibliografia',
        'Mídia',
        'Perguntas',
        'Resumo',    
      ],
      expanded: false
    },
    { 
      title: 'Planejamento Militar', 
      icon: 'military_tech', 
      children: [
        'Bibliografia',
        'Mídia',
        'Perguntas',
        'Resumo',    
      ],
      expanded: false
    },
    { 
      title: 'Inglês', 
      icon: 'translate', 
      children: [
        'Bibliografia',
        'Mídia',
        'Perguntas',
        'Resumo',    
      ],
      expanded: false
    },
    { 
      title: 'Política', 
      icon: 'account_balance', 
      children: [
        'Bibliografia',
        'Mídia',
        'Perguntas',
        'Resumo',    
      ],
      expanded: false
    },
    { 
      title: 'Direito', 
      icon: 'gavel', 
      children: [
        {
          title: 'Bibliografia',
          children: [
            'EMA-135',
            'A Lei da Guerra',
            'Carta das Nações Unidas',
            'Feridos, enfermos e náufragos',
            'Protocolo I',
            'Protocolo II',
            'San Remo Manual',
            'Concenção das Nações Unidas sobre o Direito do Mar',
            'Entorpecentes e Psicotrópicos',
            'Pacto de São José',
            'Declaração Universal dos Direitos Humanos',
            'Direito dos Tratados'
          ]
        },
        'Mídia',
        'Perguntas',
        'Resumo',    
      ],
      expanded: false
    },
    { 
      title: 'Economia', 
      icon: 'show_chart', 
      children: [
        'Bibliografia',
        'Mídia',
        'Perguntas',
        'Resumo',    
      ],
      expanded: false
    }
  ]);

  toggleSection(index: number): void {
    this.menuItems.update(items => {
      const updatedItems = [...items];
      const isCurrentlyExpanded = updatedItems[index].expanded;
      
      // Close all sections first
      updatedItems.forEach((item, i) => {
        updatedItems[i] = {
          ...item,
          expanded: false
        };
      });
      
      // If the clicked section was closed, open it
      if (!isCurrentlyExpanded) {
        updatedItems[index] = {
          ...updatedItems[index],
          expanded: true
        };
      }
      
      return updatedItems;
    });
  }

  toggleSubSection(sectionIndex: number, subIndex: number): void {
    this.menuItems.update(items => {
      const updatedItems = [...items];
      const section = updatedItems[sectionIndex];
      const subItem = section.children[subIndex];
      
      if (typeof subItem === 'object' && subItem.children) {
        const updatedChildren = [...section.children];
        const isCurrentlyExpanded = subItem.expanded || false;
        
        // Close all subsections in this section first
        updatedChildren.forEach((child, i) => {
          if (typeof child === 'object' && child.children) {
            updatedChildren[i] = {
              ...child,
              expanded: false
            };
          }
        });
        
        // If the clicked subsection was closed, open it
        if (!isCurrentlyExpanded) {
          updatedChildren[subIndex] = {
            ...subItem,
            expanded: true
          };
        }
        
        updatedItems[sectionIndex] = {
          ...section,
          children: updatedChildren
        };
      }
      
      return updatedItems;
    });
  }

  onSubSectionClick(section: string, division: string, sectionIndex: number, subIndex: number): void {
    // First, toggle the subsection expansion
    this.toggleSubSection(sectionIndex, subIndex);
    
    // Then, navigate to the division route (item pai)
    this.navigate(section, division);
  }

  navigate(section: string, division?: string, subDivision?: string, option?: string) {
    // Determine the selected menu option
    const optionText = option || subDivision || division || '';

    // Build path parts array
    const pathParts = ['home'];
    
    // Add section path
    switch (section) {
      case 'Intendência':
        pathParts.push('app1-intendencia');
        if (optionText) {
          switch (optionText) {
            case 'Bibliografia':
              pathParts.push('bibliografia');
              break;
            case 'Mídia':
              pathParts.push('media');
              break;
            case 'Perguntas':
              pathParts.push('perguntas');
              break;
            case 'Resumo':
              pathParts.push('resumo');
              break;
          }
        }
        break;
      case 'Estratégia':
        pathParts.push('app2-estrategia');
        if (optionText) {
          switch (optionText) {
            case 'Bibliografia':
              pathParts.push('bibliografia');
              break;
            case 'Mídia':
              pathParts.push('media');
              break;
            case 'Perguntas':
              pathParts.push('perguntas');
              break;
            case 'Resumo':
              pathParts.push('resumo');
              break;
          }
        }
        break;
      case 'Planejamento Militar':
        pathParts.push('app3-planejamento-militar');
        if (optionText) {
          switch (optionText) {
            case 'Bibliografia':
              pathParts.push('bibliografia');
              break;
            case 'Mídia':
              pathParts.push('media');
              break;
            case 'Perguntas':
              pathParts.push('perguntas');
              break;
            case 'Resumo':
              pathParts.push('resumo');
              break;
          }
        }
        break;
      case 'História':
        pathParts.push('app4-historia');
        if (division === 'Bibliografia') {
          pathParts.push('bibliografia');
          if (optionText) {
            switch (optionText) {
              case 'Breve História':
                pathParts.push('breve-historia');
                break;
              case 'Guerra no Mar':
                pathParts.push('guerra-no-mar');
                break;
              case 'História das Guerras':
                pathParts.push('historia-das-guerras');
                break;
              case 'Síntese Histórica':
                pathParts.push('sintese-historica');
                break;
            }
          }
        } else if (optionText) {
          switch (optionText) {
            case 'Bibliografia':
              pathParts.push('bibliografia');
              break;
            case 'Mídia':
              pathParts.push('media');
              break;
            case 'Perguntas':
              pathParts.push('perguntas');
              break;
            case 'Resumo':
              pathParts.push('resumo');
              break;
          }
        }
        break;
      case 'Inglês':
        pathParts.push('app5-ingles');
        if (optionText) {
          switch (optionText) {
            case 'Bibliografia':
              pathParts.push('bibliografia');
              break;
            case 'Mídia':
              pathParts.push('media');
              break;
            case 'Perguntas':
              pathParts.push('perguntas');
              break;
            case 'Resumo':
              pathParts.push('resumo');
              break;
          }
        }
        break;
      case 'Geopolítica e Relações Internacionais':
        pathParts.push('app6-geopolitica-relacoes-internacionais');
        if (division === 'Bibliografia') {
          pathParts.push('bibliografia');
          if (optionText) {
            switch (optionText) {
              case 'A Vingança da Geografia':
                pathParts.push('vinganca-geografia');
                break;
              case 'Geopolítica e Modernidade':
                pathParts.push('geopolitica-modernidade');
                break;
              case 'Novas Geopolíticas':
                pathParts.push('novas-geopoliticas');
                break;
              case 'Princípios de Relações Internacionais':
                pathParts.push('principios-ri');
                break;
            }
          }
        } else if (division === 'Resumo') {
          pathParts.push('resumo');
          if (optionText) {
            switch (optionText) {
              case 'Geopolítica':
                pathParts.push('geopolitica');
                break;
              case 'Relações Internacionais':
                pathParts.push('relacoes-internacionais');
                break;
            }
          }
        } else if (optionText) {
          switch (optionText) {
            case 'Bibliografia':
              pathParts.push('bibliografia');
              break;
            case 'Vídeos / Podcasts':
              pathParts.push('media');
              break;
            case 'Flash Cards':
              pathParts.push('flash-cards');
              break;  
            case 'Perguntas':
              pathParts.push('perguntas');
              break;
            case 'Conceitos':
              pathParts.push('conceitos');
              break;
            case 'Resumo':
              pathParts.push('resumo');
              break;
          }
        }
        break;
      case 'Política':
        pathParts.push('app7-politica');
        if (optionText) {
          switch (optionText) {
            case 'Bibliografia':
              pathParts.push('bibliografia');
              break;
            case 'Mídia':
              pathParts.push('media');
              break;
            case 'Perguntas':
              pathParts.push('perguntas');
              break;
            case 'Resumo':
              pathParts.push('resumo');
              break;
          }
        }
        break;
      case 'Direito':
        pathParts.push('app8-direito');
        if (division === 'Bibliografia') {
          pathParts.push('bibliografia');
          if (optionText) {
            switch (optionText) {
              case 'EMA-135':
                pathParts.push('ema-135');
                break;
              case 'A Lei da Guerra':
                pathParts.push('lei-da-guerra');
                break;
              case 'Carta das Nações Unidas':
                pathParts.push('carta-nacoes-unidas');
                break;
              case 'Feridos, enfermos e náufragos':
                pathParts.push('feridos-enfermos');
                break;
              case 'Protocolo I':
                pathParts.push('protocolo-i');
                break;
              case 'Protocolo II':
                pathParts.push('protocolo-ii');
                break;
              case 'San Remo Manual':
                pathParts.push('san-remo-manual');
                break;
              case 'Concenção das Nações Unidas sobre o Direito do Mar':
                pathParts.push('cnudm');
                break;
              case 'Entorpecentes e Psicotrópicos':
                pathParts.push('entorpecentes-psicotropicos');
                break;
              case 'Pacto de São José':
                pathParts.push('pacto-sao-jose');
                break;
              case 'Declaração Universal dos Direitos Humanos':
                pathParts.push('declaracao-direitos-humanos');
                break;
              case 'Direito dos Tratados':
                pathParts.push('declaracao-direito-tratados');
                break;
            }
          }
        } else if (optionText) {
          switch (optionText) {
            case 'Bibliografia':
              pathParts.push('bibliografia');
              break;
            case 'Mídia':
              pathParts.push('media');
              break;
            case 'Perguntas':
              pathParts.push('perguntas');
              break;
            case 'Resumo':
              pathParts.push('resumo');
              break;
          }
        }
        break;
      case 'Economia':
        pathParts.push('app9-economia');
        if (optionText) {
          switch (optionText) {
            case 'Bibliografia':
              pathParts.push('bibliografia');
              break;
            case 'Mídia':
              pathParts.push('media');
              break;
            case 'Perguntas':
              pathParts.push('perguntas');
              break;
            case 'Resumo':
              pathParts.push('resumo');
              break;
          }
        }
        break;
    }

    // Set active path for highlighting
    this.currentActivePath.set(pathParts.join('/'));
    
    // Navigate to the constructed path
    this.router.navigate(pathParts);
    
    // Emit the itemClicked event to close drawer on mobile
    this.itemClicked.emit();
  }

  isItemActive(section: string, division?: string, subDivision?: string): boolean {
    const currentPath = this.currentActivePath();
    
    // Build the expected path for comparison
    const pathParts = ['home'];
    
    switch (section) {
      case 'Intendência':
        pathParts.push('app1-intendencia');
        break;
      case 'Estratégia':
        pathParts.push('app2-estrategia');
        break;
      case 'Planejamento Militar':
        pathParts.push('app3-planejamento-militar');
        break;
      case 'História':
        pathParts.push('app4-historia');
        break;
      case 'Inglês':
        pathParts.push('app5-ingles');
        break;
      case 'Geopolítica e Relações Internacionais':
        pathParts.push('app6-geopolitica-relacoes-internacionais');
        break;
      case 'Política':
        pathParts.push('app7-politica');
        break;
      case 'Direito':
        pathParts.push('app8-direito');
        break;
      case 'Economia':
        pathParts.push('app9-economia');
        break;
    }
    
    if (division) {
      switch (division) {
        case 'Bibliografia':
          pathParts.push('bibliografia');
          break;
        case 'Mídia':
          pathParts.push('media');
          break;
        case 'Flash Cards':
          pathParts.push('flash-cards');
          break;
        case 'Perguntas':
          pathParts.push('perguntas');
          break;
        case 'Conceitos':
          pathParts.push('conceitos');
          break;
        case 'Pensadores':
          pathParts.push('pensadores');
          break;
        case 'Resumo':
          pathParts.push('resumo');
          break;
      }
    }
    
    if (subDivision) {
      switch (subDivision) {
        case 'Breve História':
          pathParts.push('breve-historia');
          break;
        case 'Guerra no Mar':
          pathParts.push('guerra-no-mar');
          break;
        case 'História das Guerras':
          pathParts.push('historia-das-guerras');
          break;
        case 'Síntese Histórica':
          pathParts.push('sintese-historica');
          break;
      }
    }

    if (subDivision) {
      switch (subDivision) {
        case 'A Vingança da Geografia':
          pathParts.push('vinganca-geografia');
          break;
        case 'Geopolítica e Modernidade':
          pathParts.push('geopolitica-modernidade');
          break;
        case 'Novas Geopolíticas':
          pathParts.push('novas-geopoliticas');
          break;
        case 'Princípios de Relações Internacionais':
          pathParts.push('principios-ri');
          break;
        case 'Geopolítica':
          pathParts.push('geopolitica');
          break;
        case 'Relações Internacionais':
          pathParts.push('relacoes-internacionais');
          break;          
      }
    }

    return currentPath === pathParts.join('/');
  }

  getItemIcon(item: string): string {
    switch (item) {

      case 'Breve História':
        return 'history';
      default:
        return '';
    }
  }

  /**
   * Realiza logout do usuário e redireciona para a página de login
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
