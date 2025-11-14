// Auto-generated file
// Do not edit manually

import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from '../../../services/auth.service';
import { RouteMappingService } from '../../../services/route-mapping.service';

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
  imports: [NgFor, NgIf, MatIconModule, MatListModule, MatButtonModule],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.scss',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', overflow: 'hidden' })),
      state('expanded', style({ height: '*', overflow: 'hidden' })),
      transition('collapsed <=> expanded', [animate('300ms ease-in-out')])
    ])
  ]
})
export class SideMenu {
  @Input() isTopMenuMode: boolean = false;
  @Output() itemClicked = new EventEmitter<void>();
  currentActivePath = signal<string>('');

  // Mapping from menu titles to route paths
  private readonly titleToPathMap: Record<string, string> = {
    'Controle Externo': 'app1-controle-ext',
    'Administração Pública': 'app2-adm-pub',
    'Direito Constitucional': 'app3-dir-const',
    'Direito Administrativo': 'app4-dir-adm',
    'Infraestrutura de TI': 'app5-infra-ti',
    'Engenharia de Dados': 'app6-eng-dados',
    'Engenharia de Software': 'app7-eng-software',
    'Segurança da Informação': 'app8-seg-info',
    'Computação em Nuvem': 'app9-comp-nuvem',
    'Inteligência Artificial': 'app10-IA',
    'Contratação de TI': 'app11-contratacao-ti',
    'Gestão de TI': 'app12-gestao-ti',
  };

  // Mapping from child titles to route paths
  private readonly childTitleToPathMap: Record<string, string> = {
    'Flash Cards': 'flashcards',
    'Flashcards': 'flashcards',
    'Perguntas': 'perguntas',
    'Conceitos': 'conceitos',
    'Bibliografia': 'bibliografia',
  };

  // Mapping from bibliografia sub-item titles to route paths
  private readonly bibliografiaSubItemToPathMap: Record<string, string> = {
    'Manifesto Ágil': 'manifesto-agil',
    'Bancos de Dados': 'bancos-de-dados',
    'Arquitetura de Inteligência de Negócio': 'arquitetura-de-inteligencia-de-negocio',
    'Conectores e Integração com Fontes de Dados': 'conectores-e-integracao-com-fontes-de-dados',
    'Fluxo de Manipulação de Dados': 'fluxo-de-manipulacao-de-dados',
    'Governança e Qualidade de Dados': 'governanca-e-qualidade-de-dados',
    'Integração com Nuvem': 'integracao-com-nuvem',
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private routeMappingService: RouteMappingService
  ) {
    // Subscribe to route changes to update active path
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActivePath();
      });
    this.updateActivePath();
  }

  readonly menuItems = signal<MenuItem[]>([
    {
      title: 'Controle Externo',
      icon: 'inventory_2',
      children: [
        {
          title: 'Bibliografia',
          children: []
        },
        'Flash Cards',
        'Perguntas',
        'Conceitos',
      ],
      expanded: false
    },
    {
      title: 'Administração Pública',
      icon: 'account_balance',
      children: [
        {
          title: 'Bibliografia',
          children: []
        },
        'Flash Cards',
        'Perguntas',
        'Conceitos',
      ],
      expanded: false
    },
    {
      title: 'Direito Constitucional',
      icon: 'gavel',
      children: [
        {
          title: 'Bibliografia',
          children: []
        },
        'Flash Cards',
        'Perguntas',
        'Conceitos',
      ],
      expanded: false
    },
    {
      title: 'Direito Administrativo',
      icon: 'balance_scale',
      children: [
        {
          title: 'Bibliografia',
          children: []
        },
        'Flash Cards',
        'Perguntas',
        'Conceitos',
      ],
      expanded: false
    },
    {
      title: 'Infraestrutura de TI',
      icon: 'memory',
      children: [
        {
          title: 'Bibliografia',
          children: []
        },
        'Flash Cards',
        'Perguntas',
        'Conceitos',
      ],
      expanded: false
    },
    {
      title: 'Engenharia de Dados',
      icon: 'storage',
      children: [
        {
          title: 'Bibliografia',
          children: [
            'Bancos de Dados',
            'Arquitetura de Inteligência de Negócio',
            'Conectores e Integração com Fontes de Dados',
            'Fluxo de Manipulação de Dados',
            'Governança e Qualidade de Dados',
            'Integração com Nuvem',
          ]
        },
        'Flash Cards',
        'Perguntas',
        'Conceitos',
      ],
      expanded: false
    },
    {
      title: 'Engenharia de Software',
      icon: 'terminal',
      children: [
        {
          title: 'Bibliografia',
          children: [
           'Manifesto Ágil',
          ]
        },
        'Flash Cards',
        'Perguntas',
        'Conceitos',
      ],
      expanded: false
    },
    {
      title: 'Segurança da Informação',
      icon: 'security',
      children: [
        {
          title: 'Bibliografia',
          children: []
        },
        'Flash Cards',
        'Perguntas',
        'Conceitos',
      ],
      expanded: false
    },
    {
      title: 'Computação em Nuvem',
      icon: 'cloud',
      children: [
        {
          title: 'Bibliografia',
          children: []
        },
        'Flash Cards',
        'Perguntas',
        'Conceitos',
      ],
      expanded: false
    },
    {
      title: 'Inteligência Artificial',
      icon: 'smart_toy',
      children: [
        {
          title: 'Bibliografia',
          children: []
        },
        'Flash Cards',
        'Perguntas',
        'Conceitos',
      ],
      expanded: false
    },
    {
      title: 'Contratação de TI',
      icon: 'assignment',
      children: [
        {
          title: 'Bibliografia',
          children: []
        },
        'Flash Cards',
        'Perguntas',
        'Conceitos',
      ],
      expanded: false
    },
    {
      title: 'Gestão de TI',
      icon: 'settings',
      children: [
        {
          title: 'Bibliografia',
          children: []
        },
        'Flash Cards',
        'Perguntas',
        'Conceitos',
      ],
      expanded: false
    },
  ]);

  toggleSection(index: number): void {
    this.menuItems.update(items => {
      const updated = [...items];
      const wasOpen = updated[index].expanded;
      updated.forEach(i => (i.expanded = false));
      updated[index].expanded = !wasOpen;
      return updated;
    });
  }

  toggleSubSection(sectionIndex: number, subIndex: number): void {
    this.menuItems.update(items => {
      const updated = [...items];
      const sec = updated[sectionIndex];
      const sub = sec.children[subIndex];

      if (typeof sub === 'object' && sub.children) {
        const was = sub.expanded ?? false;
        sec.children = sec.children.map(c => {
          if (typeof c === 'object' && c.children) return { ...c, expanded: false };
          return c;
        });
        sec.children[subIndex] = { ...sub, expanded: !was };
      }
      return updated;
    });
  }

  navigate(sectionTitle: string, childTitle?: string, subChildTitle?: string): void {
    const sectionPath = this.titleToPathMap[sectionTitle];
    if (!sectionPath) {
      console.warn(`No route path found for section: ${sectionTitle}`);
      return;
    }

    const pathSegments: string[] = ['home', sectionPath];

    if (childTitle) {
      const childPath = this.childTitleToPathMap[childTitle] || childTitle.toLowerCase().replace(/\s+/g, '-');
      pathSegments.push(childPath);

      if (subChildTitle) {
        // Check bibliografia sub-item map first, then childTitleToPathMap, then fallback to slug conversion
        const subChildPath = typeof subChildTitle === 'string' 
          ? (this.bibliografiaSubItemToPathMap[subChildTitle] || 
             this.childTitleToPathMap[subChildTitle] || 
             subChildTitle.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
          : subChildTitle;
        pathSegments.push(subChildPath);
      }
    }

    const pathString = pathSegments.slice(1).join('/');
    this.currentActivePath.set(pathString);
    this.router.navigate(pathSegments);
    this.itemClicked.emit();
  }

  navigateHome(): void {
    this.currentActivePath.set('');
    this.router.navigate(['/home']);
    this.itemClicked.emit();
  }

  isItemActive(sectionTitle: string, childTitle?: string, subChildTitle?: string): boolean {
    const currentPath = this.currentActivePath();
    if (!currentPath) return false;

    const sectionPath = this.titleToPathMap[sectionTitle];
    if (!sectionPath) return false;

    if (!childTitle) {
      return currentPath === sectionPath;
    }

    const childPath = this.childTitleToPathMap[childTitle] || childTitle.toLowerCase().replace(/\s+/g, '-');
    const expectedPath = `${sectionPath}/${childPath}`;

    if (!subChildTitle) {
      // For Bibliografia (or other items with children), only mark as active if:
      // 1. Exact match (e.g., /app7-eng-software/bibliografia)
      // 2. OR it starts with the path but we need to check if there's actually a child route
      // We check if the next segment after bibliografia exists
      if (currentPath === expectedPath) {
        return true;
      }
      // If path starts with expectedPath + '/', check if it's a valid child route
      if (currentPath.startsWith(expectedPath + '/')) {
        // Get the menu item to check if it has children
        const menuItem = this.menuItems().find(item => item.title === sectionTitle);
        if (menuItem) {
          const child = menuItem.children.find(c => 
            typeof c === 'object' && c.title === childTitle
          );
          // If Bibliografia has children, don't mark it as active when a child is active
          if (typeof child === 'object' && child.children && child.children.length > 0) {
            return false; // A child is active, so Bibliografia should not be marked as active
          }
        }
        return true;
      }
      return false;
    }

    // Check bibliografia sub-item map first, then childTitleToPathMap, then fallback to slug conversion
    const subChildPath = typeof subChildTitle === 'string'
      ? (this.bibliografiaSubItemToPathMap[subChildTitle] || 
         this.childTitleToPathMap[subChildTitle] || 
         subChildTitle.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
      : subChildTitle;
    const fullExpectedPath = `${expectedPath}/${subChildPath}`;
    return currentPath === fullExpectedPath;
  }

  onSubSectionClick(sectionTitle: string, childTitle: string, sectionIndex: number, childIndex: number): void {
    // Toggle the subsection
    this.toggleSubSection(sectionIndex, childIndex);
    
    // Navigate to the subsection (Bibliografia) when clicked
    // This allows navigation even when it has children
    this.navigate(sectionTitle, childTitle);
  }

  private updateActivePath(): void {
    const url = this.router.url;
    // Remove '/home' prefix if present
    const path = url.startsWith('/home') ? url.substring(5) : url;
    // Remove leading slash
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    this.currentActivePath.set(cleanPath);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
