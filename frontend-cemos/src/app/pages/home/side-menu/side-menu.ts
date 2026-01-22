// ...existing code...
import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output, Input, signal, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

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
export class SideMenu implements OnInit, OnDestroy {
  @Input() isTopMenuMode: boolean = false;
  @Output() itemClicked = new EventEmitter<void>();
  
  // Rastrear o item ativo atual
  currentActivePath = signal<string>('');
  
  // Nome do usuário logado
  currentUsername = signal<string>('');
  
  private userSubscription?: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    // Subscribe to route changes to update active path
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActivePath();
      });
    this.updateActivePath();
  }
  
  ngOnInit(): void {
    // Subscribe ao usuário atual para obter o username
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUsername.set(user?.username || '');
    });
  }
  
  ngOnDestroy(): void {
    // Limpar subscription ao destruir o componente
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
  
  /**
   * Navega para a página Home
   */
  navigateHome(): void {
    this.currentActivePath.set('');
    this.router.navigate(['/home']);
    this.itemClicked.emit();
  }

  /**
   * Navega para a página de Estatísticas
   */
  navigateEstatisticas(): void {
    this.currentActivePath.set('estatisticas');
    this.router.navigate(['/home/estatisticas']);
    this.itemClicked.emit();
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
        'Flash Cards',
        'Perguntas',
        'Simulados',
        'Check Abandono',
        'Conceitos',
        'Líderes Históricos',   
      ],
      expanded: false
    },  
    { 
      title: 'Geopolítica', 
      icon: 'public', 
      children: [
        {
          title: 'Bibliografia',
          children: [
            'A Vingança da Geografia',
            'Geopolítica e Modernidade',
            'Novas Geopolíticas'
          ]
        },
        'Flash Cards',
        'Perguntas',
        'Simulados',
        'Check Abandono',
        'Conceitos',
        'Teóricos',
      ],
      expanded: false
    },      
    { 
      title: 'Relações Internacionais', 
      icon: 'language', 
      children: [
        {
          title: 'Bibliografia',
          children: [
            'Princípios de Relações Internacionais'
          ]
        },
        'Flash Cards',
        'Perguntas',
        'Simulados',
        'Check Abandono',
        'Pensadores',
      ],
      expanded: false
    },
    { 
      title: 'Intendência', 
      icon: 'inventory_2', 
      children: [
        {
          title: 'Bibliografia',
          children: [
            'Cadeias de Suprimentos e Logística',
            'EMA-400 - Logística da Marinha',
            'EMA-401 - Mobilização Marítima',
            'MD-41-M-01 - Doutrina de Mobilização Militar',
            'MD-41-M-02 - Manual de Mobilização Militar',
            'MD-41-M-03 - Planejamento da Mobilização',
            'Lei nº 11.631/2007 (Mobilização Nacional)',  
            'Decreto nº 6.592/2008 (Regulamenta a Mobilização Nacional)',
            'EMA-420 - Sistemas de Defesa',
            'DGMM-0130 - Apoio Logístico Integrado',
            'MD-40-M-01 - Doutrina de Mobilização Militar',
            'MD-40-M-02 - Manual de Mobilização Militar',
          ]
        },
        'Flash Cards',
        'Perguntas',
        'Simulados',
        'Check Abandono',    
      ],
      expanded: false
    },
    { 
      title: 'Estratégia', 
      icon: 'route', 
      children: [
        {
          title: 'Bibliografia',
          children: [
            'COUTAU-BÉGARIE. Tratado de Estratégia',
            'WEDIN. Estratégias Marítimas no Século XXI: A contribuição do Almirante Castex',
            'EMA-310 - Estratégia de Defesa Marítima',
          ]
        },
        'Objetivos Estratégicos',
        'Flash Cards',
        'Perguntas',
        'Simulados',
        'Pensadores',
        'Check Abandono',
      ],
      expanded: false
    },
    { 
      title: 'Planejamento Militar', 
      icon: 'military_tech', 
      children: [
        {
          title: 'Bibliografia',
          children: [
            'Lei nº 97/1999 - Organização, Preparo e o Emprego das Forças Armadas',
            'Decreto 7.276/2010 - Estrutura Militar de Defesa',
            'MD30-M-01 - Doutrina de Operações Conjuntas',
          ]
        },
        'Flash Cards',
        'Perguntas',
        'Simulados',
        'Check Abandono',
      ],
      expanded: false
    },
    { 
      title: 'Política', 
      icon: 'account_balance', 
      children: [
        {
          title: 'Bibliografia',
          children: [
            'Ciência Política',
            'Constituição da República Federativa do Brasil',
            'Estratégia Nacional de Defesa',
            'Política Nacional de Defesa',
            'Lei Complementar nº 97',
            'Decreto nº 12.481 - Política Marítima Nacional (PMN)',
            'Economia Azul - vetor para o desenvolvimento do Brasil',
            'EMA-323 - Política Naval',
            'Decreto nº 12.363 - Plano Setorial para os Recursos do Mar',
          ]
        },
        'Conceitos',
        'Flash Cards',
        'Perguntas',
        'Simulados',
        'Check Abandono',  
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
        'Conceitos',
        'Flash Cards',
        'Perguntas',
        'Simulados',
        'Check Abandono', 
      ],
      expanded: false
    },
    { 
      title: 'Economia', 
      icon: 'show_chart', 
      children: [
        {
          title: 'Bibliografia',
          children: [
            'Economia Brasileira Contemporânea',
            'Economia Micro e Macro – Teoria, Exercícios e Casos',
            'Economia Azul',
          ]
        },
        'Flash Cards',
        'Perguntas',
        'Simulados',
        'Check Abandono',
        'Conceitos',
      ],
      expanded: false
    }
  ]);

  toggleSection(index: number): void {
    this.menuItems.update(items => {
      const updatedItems = [...items];
      const section = updatedItems[index];
      const isCurrentlyExpanded = section.expanded;
      
      // Navega para a bibliografia da seção quando clicar no header
      this.navigateToSectionBibliografia(section.title);
      
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

  /**
   * Navega para a bibliografia de uma seção específica
   */
  navigateToSectionBibliografia(sectionTitle: string): void {
    // Build path parts array
    const pathParts = ['home'];
    
    // Add section path and bibliografia
    switch (sectionTitle) {
      case 'Intendência':
        pathParts.push('app1-intendencia', 'bibliografia');
        break;
      case 'Estratégia':
        pathParts.push('app2-estrategia', 'bibliografia');
        break;
      case 'Planejamento Militar':
        pathParts.push('app3-planejamento-militar', 'bibliografia');
        break;
      case 'História':
        pathParts.push('app4-historia', 'bibliografia');
        break;
      case 'Geopolítica':
        pathParts.push('app6-geopolitica-relacoes-internacionais', 'bibliografia');
        break;
      case 'Relações Internacionais':
        pathParts.push('app6-1-relacoes-internacionais', 'bibliografia');
        break;
      case 'Política':
        pathParts.push('app7-politica', 'bibliografia');
        break;
      case 'Direito':
        pathParts.push('app8-direito', 'bibliografia');
        break;
      case 'Economia':
        pathParts.push('app9-economia', 'bibliografia');
        break;
      default:
        console.warn(`No route path found for section: ${sectionTitle}`);
        return;
    }

    // Set active path for highlighting
    const pathString = pathParts.slice(1).join('/');
    this.currentActivePath.set(pathString);
    
    // Navigate to the constructed path
    this.router.navigate(pathParts);
    
    // Emit the itemClicked event to close drawer on mobile
    this.itemClicked.emit();
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
    console.log('🧭 [SideMenu] navigate chamado:', { section, division, subDivision, option });
    
    // Determine the selected menu option
    const optionText = option || subDivision || division || '';
    console.log('📝 [SideMenu] optionText:', optionText);

    // Build path parts array
    const pathParts = ['home'];
    
    // Add section path
    switch (section) {
      case 'Intendência':
        pathParts.push('app1-intendencia');
        if (division === 'Bibliografia') {
          pathParts.push('bibliografia');
          if (optionText) {
            switch (optionText) {
              case 'Cadeias de Suprimentos e Logística':
                pathParts.push('cadeias-suprimentos-logistica');
                break;              
              case 'EMA-400 - Logística da Marinha':
                pathParts.push('ema-400');
                break;
              case 'EMA-401 - Mobilização Marítima':
                pathParts.push('ema-401');
                break;
              case 'MD-41-M-01 - Doutrina de Mobilização Militar':
                pathParts.push('md-41-m-01');
                break;
              case 'MD-41-M-02 - Manual de Mobilização Militar':
                pathParts.push('md-41-m-02');
                break;
              case 'MD-41-M-03 - Planejamento da Mobilização':
                pathParts.push('md-41-m-03');
                break;
              case 'Lei nº 11.631/2007 (Mobilização Nacional)':
                pathParts.push('lei-mobilizacao-nacional');
                break;
              case 'Decreto nº 6.592/2008 (Regulamenta a Mobilização Nacional)':
                pathParts.push('regulamento-mobilizacao-nacional');
                break;
              case 'EMA-420 - Sistemas de Defesa':
                pathParts.push('ema-420');
                break;
              case 'DGMM-0130 - Apoio Logístico Integrado':
                pathParts.push('dgmm-0130');
                break;
              case 'MD-40-M-01 - Doutrina de Mobilização Militar':
                pathParts.push('md-41-m-01');
                break;
              case 'MD-40-M-02 - Manual de Mobilização Militar':
                pathParts.push('md-41-m-02');
                break;                
            }
          }
        } else if (optionText) {
          switch (optionText) {
            case 'Bibliografia':
              pathParts.push('bibliografia');
              break;
            case 'Flash Cards':
              pathParts.push('flash-cards');
              break;
            case 'Perguntas':
              pathParts.push('perguntas');
              break;
            case 'Simulados':
              pathParts.push('simulados');
              break;
            case 'Check Abandono':
              pathParts.push('check-abandono');
              break;
          }
        }
        break;
      case 'Estratégia':
        pathParts.push('app2-estrategia');
        if (division === 'Bibliografia') {
          pathParts.push('bibliografia');
          if (optionText) {
            switch (optionText) {
              case 'COUTAU-BÉGARIE. Tratado de Estratégia':
                pathParts.push('tratado-de-estrategia');
                break;
              case 'WEDIN. Estratégias Marítimas no Século XXI: A contribuição do Almirante Castex':
                pathParts.push('estrategias-maritimas');
                break;
              case 'EMA-310 - Estratégia de Defesa Marítima':
                pathParts.push('ema-310-estrategia');
                break;
            }
          }
        } else if (optionText) {
          switch (optionText) {
            case 'Bibliografia':
              pathParts.push('bibliografia');
              break;
            case 'Objetivos Estratégicos':
              pathParts.push('bibliografia', 'objetivos-estrategicos');
              break;
            case 'Flash Cards':
              pathParts.push('flash-cards');
              break;  
            case 'Perguntas':
              pathParts.push('perguntas');
              break;
            case 'Simulados':
              pathParts.push('simulados');
              break;
            case 'Pensadores':
              pathParts.push('pensadores');
              break;
            case 'Check Abandono':
              pathParts.push('check-abandono');
              break;
          }
        }
        break;
      case 'Planejamento Militar':
        pathParts.push('app3-planejamento-militar');
        if (division === 'Bibliografia') {
          pathParts.push('bibliografia');
          if (optionText) {
            switch (optionText) {
              case 'Lei nº 97/1999 - Organização, Preparo e o Emprego das Forças Armadas':
                pathParts.push('lei-97');
                break;
              case 'Decreto 7.276/2010 - Estrutura Militar de Defesa':
                pathParts.push('decreto-7276');
                break;
              case 'MD30-M-01 - Doutrina de Operações Conjuntas':
                pathParts.push('md-30-m-01');
                break;
            }
          }
        } else if (optionText) {
          switch (optionText) {
            case 'Bibliografia':
              pathParts.push('bibliografia');
              break;
            case 'Flash Cards':
              pathParts.push('flash-cards');
              break;  
            case 'Perguntas':
              pathParts.push('perguntas');
              break;
            case 'Simulados':
              pathParts.push('simulados');
              break;
            case 'Conceitos':
              pathParts.push('conceitos');
              break;
            case 'Check Abandono':
              pathParts.push('check-abandono');
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
            case 'Flash Cards':
              pathParts.push('flash-cards');
              break;                
            case 'Perguntas':
              pathParts.push('perguntas');
              break;
            case 'Simulados':
              pathParts.push('simulados');
              break;
            case 'Check Abandono':
              pathParts.push('check-abandono');
              break;
          }
        }
        break;
      case 'Geopolítica':
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
            }
          }
        } else if (optionText) {
          switch (optionText) {
            case 'Bibliografia':
              pathParts.push('bibliografia');
              break;
            case 'Flash Cards':
              pathParts.push('flash-cards');
              break;  
            case 'Perguntas':
              pathParts.push('perguntas');
              break;
            case 'Simulados':
              pathParts.push('simulados');
              break;
            case 'Check Abandono':
              pathParts.push('check-abandono');
              break;
            case 'Conceitos':
              pathParts.push('conceitos');
              break;
            case 'Teóricos':
              pathParts.push('teoricos');
              break;
          }
        }
        break;
      case 'Relações Internacionais':
        pathParts.push('app6-1-relacoes-internacionais');
        if (division === 'Bibliografia') {
          pathParts.push('bibliografia');
          if (optionText) {
            switch (optionText) {
              case 'Princípios de Relações Internacionais':
                pathParts.push('principios-ri');
                break;
            }
          }
        } else if (optionText) {
          switch (optionText) {
            case 'Bibliografia':
              pathParts.push('bibliografia');
              break;
            case 'Flash Cards':
              pathParts.push('flash-cards');
              break;  
            case 'Perguntas':
              pathParts.push('perguntas');
              break;
            case 'Simulados':
              pathParts.push('simulados');
              break;
            case 'Check Abandono':
              pathParts.push('check-abandono');
              break;
            case 'Pensadores':
              pathParts.push('pensadores');
              break;
          }
        }
        break;
      case 'Política':
        pathParts.push('app7-politica');
        if (division === 'Bibliografia') {
          pathParts.push('bibliografia');
          if (optionText) {
            switch (optionText) {
              case 'Ciência Política':
                pathParts.push('ciencia-politica');
                break;
              case 'Constituição da República Federativa do Brasil':
                pathParts.push('constituicao-brasil');
                break;
              case 'Estratégia Nacional de Defesa':
                pathParts.push('estrategia-nacional-defesa');
                break;
              case 'Política Nacional de Defesa':
                pathParts.push('politica-nacional-defesa');
                break;
              case 'Lei Complementar nº 97':
                pathParts.push('lei-complementar-97');
                break;
              case 'Decreto nº 12.481 - Política Marítima Nacional (PMN)':
                pathParts.push('decreto-12481');
                break;
              case 'Economia Azul - vetor para o desenvolvimento do Brasil':
                pathParts.push('economia-azul');
                break;
              case 'EMA-323 - Política Naval':
                pathParts.push('ema-323');
                break;
              case 'Decreto nº 12.363 - Plano Setorial para os Recursos do Mar':
                pathParts.push('decreto-12363');
                break;
            }
          }
        } else if (optionText) {
          switch (optionText) {
            case 'Bibliografia':
              pathParts.push('bibliografia');
              break;
            case 'Flash Cards':
              pathParts.push('flash-cards');
              break;  
            case 'Perguntas':
              pathParts.push('perguntas');
              break;
            case 'Simulados':
              pathParts.push('simulados');
              break;
            case 'Check Abandono':
              pathParts.push('check-abandono');
              break;
            case 'Conceitos':
              pathParts.push('conceitos');
              break;
            case 'Teóricos':
              pathParts.push('teoricos');
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
            case 'Flash Cards':
              pathParts.push('flash-cards');
              break;  
            case 'Perguntas':
              pathParts.push('perguntas');
              break;
            case 'Simulados':
              pathParts.push('simulados');
              break;
            case 'Conceitos':
              pathParts.push('conceitos');
              break;
            case 'Teóricos':
              pathParts.push('teoricos');
              break;
          }
        }
        break;
      case 'Economia':
        pathParts.push('app9-economia');
        if (division === 'Bibliografia') {
          pathParts.push('bibliografia');
          if (optionText) {
            switch (optionText) {
              case 'Economia Brasileira Contemporânea':
                pathParts.push('economia-brasileira');
                break;
              case 'Economia Micro e Macro – Teoria, Exercícios e Casos':
                pathParts.push('economia-micro-macro');
                break;
              case 'Economia Azul':
                pathParts.push('economia-azul-2');
                break;
            }
          }
        } else if (optionText) {
          switch (optionText) {
            case 'Bibliografia':
              pathParts.push('bibliografia');
              break;
            case 'Flash Cards':
              pathParts.push('flash-cards');
              break;
            case 'Perguntas':
              pathParts.push('perguntas');
              break;
            case 'Simulados':
              pathParts.push('simulados');
              break;
            case 'Check Abandono':
              pathParts.push('check-abandono');
              break;
            case 'Conceitos':
              pathParts.push('conceitos');
              break;              
          }
        }
        break;
    }

    // Set active path for highlighting
    const finalPath = pathParts.join('/');
    console.log('📍 [SideMenu] Path final construído:', finalPath);
    this.currentActivePath.set(finalPath);
    
    // Navigate to the constructed path
    console.log('🚀 [SideMenu] Navegando para:', pathParts);
    this.router.navigate(pathParts).then(
      (success) => {
        if (success) {
          console.log('✅ [SideMenu] Navegação bem-sucedida para:', finalPath);
        } else {
          console.error('❌ [SideMenu] Navegação falhou para:', finalPath);
        }
      },
      (error) => {
        console.error('❌ [SideMenu] Erro na navegação:', error);
      }
    );
    
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
      case 'Geopolítica':
        pathParts.push('app6-geopolitica-relacoes-internacionais');
        break;
      case 'Relações Internacionais':
        pathParts.push('app6-1-relacoes-internacionais');
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
        case 'Objetivos Estratégicos':
          pathParts.push('bibliografia', 'objetivos-estrategicos');
          break;
        case 'Flash Cards':
          pathParts.push('flash-cards');
          break;
        case 'Perguntas':
          pathParts.push('perguntas');
          break;
        case 'Simulados':
          pathParts.push('simulados');
          break;
        case 'Pensadores':
          pathParts.push('pensadores');
          break;
        case 'Check Abandono':
          pathParts.push('check-abandono');
          break;
        case 'Conceitos':
          pathParts.push('conceitos');
          break;
        case 'Teóricos':
          pathParts.push('teoricos');
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

    if (subDivision) {
      switch (subDivision) {
        case 'Lei nº 97/1999 - Organização, Preparo e o Emprego das Forças Armadas':
          pathParts.push('lei-97');
          break;
        case 'Decreto 7.276/2010 - Estrutura Militar de Defesa':
          pathParts.push('decreto-7276');
          break;
        case 'MD30-M-01 - Doutrina de Operações Conjuntas':
          pathParts.push('md-30-m-01');
          break;
      }
    }

    if (subDivision) {
      switch (subDivision) {
        case 'COUTAU-BÉGARIE. Tratado de Estratégia':
          pathParts.push('tratado-de-estrategia');
          break;
        case 'WEDIN. Estratégias Marítimas no Século XXI: A contribuição do Almirante Castex':
          pathParts.push('estrategias-maritimas');
          break;
        case 'EMA-310 - Estratégia de Defesa Marítima':
          pathParts.push('ema-310-estrategia');
          break;
      }
    }

    if (subDivision) {
      switch (subDivision) {
        case 'Economia Brasileira Contemporânea':
          pathParts.push('economia-brasileira');
          break;
        case 'Economia Micro e Macro – Teoria, Exercícios e Casos':
          pathParts.push('economia-micro-macro');
          break;
        case 'Economia Azul':
          pathParts.push('economia-azul');
          break;
      }
    }

    if (subDivision) {
      switch (subDivision) {
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


    if (subDivision) {
      switch (subDivision) {
        case 'Cadeias de Suprimentos e Logística':
          pathParts.push('cadeias-suprimentos-logistica');
          break;              
        case 'EMA-400 - Logística da Marinha':
          pathParts.push('ema-400');
          break;
        case 'EMA-401 - Mobilização Marítima':
          pathParts.push('ema-401');
          break;
        case 'MD-41-M-01 - Doutrina de Mobilização Militar':
          pathParts.push('md-41-m-01');
          break;
        case 'MD-41-M-02 - Manual de Mobilização Militar':
          pathParts.push('md-41-m-02');
          break;
        case 'MD-41-M-03 - Planejamento da Mobilização':
          pathParts.push('md-41-m-03');
          break;
        case 'Lei nº 11.631/2007 (Mobilização Nacional)':
          pathParts.push('lei-mobilizacao-nacional');
          break;
        case 'Decreto nº 6.592/2008 (Regulamenta a Mobilização Nacional)':
          pathParts.push('regulamento-mobilizacao-nacional');
          break;
        case 'EMA-420 - Sistemas de Defesa':
          pathParts.push('ema-420');
          break;
        case 'DGMM-0130 - Apoio Logístico Integrado':
          pathParts.push('dgmm-0130');
          break;
        case 'MD-40-M-01 - Doutrina de Mobilização Militar':
          pathParts.push('md-40-m-01');
          break;
        case 'MD-40-M-02 - Manual de Mobilização Militar':
          pathParts.push('md-40-m-02');
          break;
      }
    }

    if (subDivision) {
      switch (subDivision) {
        case 'Ciência Política':
          pathParts.push('ciencia-politica');
          break;
        case 'Constituição da República Federativa do Brasil':
          pathParts.push('constituicao-brasil');
          break;
        case 'Estratégia Nacional de Defesa':
          pathParts.push('estrategia-nacional-defesa');
          break;
        case 'Política Nacional de Defesa':
          pathParts.push('politica-nacional-defesa');
          break;
        case 'Lei Complementar nº 97':
          pathParts.push('lei-complementar-97');
          break;
        case 'Decreto nº 12.481 - Política Marítima Nacional (PMN)':
          pathParts.push('decreto-12481');
          break;
        case 'Economia Azul - vetor para o desenvolvimento do Brasil':
          pathParts.push('economia-azul');
          break;
        case 'EMA-323 - Política Naval':
          pathParts.push('ema-323');
          break;
        case 'Decreto nº 12.363 - Plano Setorial para os Recursos do Mar':
          pathParts.push('decreto-12363');
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
   * Atualiza o caminho ativo baseado na URL atual
   */
  private updateActivePath(): void {
    const url = this.router.url;
    // Remove '/home' prefix if present
    const path = url.startsWith('/home') ? url.substring(5) : url;
    // Remove leading slash
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    this.currentActivePath.set(cleanPath);
  }

  /**
   * Realiza logout do usuário e redireciona para a página de login
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
