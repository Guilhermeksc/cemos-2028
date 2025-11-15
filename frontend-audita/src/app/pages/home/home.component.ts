import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild, computed, signal, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SideMenu } from './side-menu/side-menu';
import { NgIf } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from '../../services/auth.service';
import { TabsMenuService } from '../../services/tabs-menu.service';
import { Subject, takeUntil } from 'rxjs';

type DeviceType = 'mobile' | 'desktop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    SideMenu,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('topMenuCollapse', [
      state('collapsed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1,
        overflow: 'visible'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav) private readonly drawer?: MatSidenav;

  private readonly destroy$ = new Subject<void>();

  readonly deviceType = signal<DeviceType>('desktop');
  readonly isTopMenuExpanded = signal(false);
  readonly isTabsMenuOpen = signal(false);
  readonly showTabsMenuButton = signal(false);
  
  readonly showSideMenu = computed(() => {
    return this.deviceType() === 'desktop';
  });

  readonly showTopMenu = computed(() => {
    return this.deviceType() === 'mobile';
  });

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly tabsMenuService: TabsMenuService
  ) {
    // Observar breakpoint: Mobile/Tablet vs Desktop
    this.breakpointObserver
      .observe([
        '(max-width: 1023px)',   // Mobile/Tablet
        '(min-width: 1024px)'    // Desktop
      ])
      .pipe(takeUntilDestroyed())
      .subscribe((state) => {
        if (state.breakpoints['(max-width: 1023px)']) {
          this.deviceType.set('mobile');
          this.drawer?.close();
        } else {
          this.deviceType.set('desktop');
          this.isTopMenuExpanded.set(false);
        }
      });
  }

  ngOnInit(): void {
    // Observa mudanças no estado do menu de tabs
    this.tabsMenuService.isMenuOpen
      .pipe(takeUntil(this.destroy$))
      .subscribe(isOpen => {
        this.isTabsMenuOpen.set(isOpen);
      });
    
    // Observa se há um content-tcu na página
    this.tabsMenuService.hasContentTcu
      .pipe(takeUntil(this.destroy$))
      .subscribe(hasContentTcu => {
        // Em tablets, não mostra o botão (menu sempre visível)
        const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1023;
        this.showTabsMenuButton.set(hasContentTcu && !isTablet);
      });
    
    // Observa mudanças de tamanho de tela para atualizar visibilidade do botão
    this.breakpointObserver
      .observe(['(min-width: 768px) and (max-width: 1023px)'])
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        if (state.matches) {
          // Em tablets, oculta o botão
          this.showTabsMenuButton.set(false);
          this.tabsMenuService.closeMenu();
        } else {
          // Fora de tablets, mostra o botão se houver content-tcu
          const hasContentTcu = this.tabsMenuService.getHasContentTcuValue();
          this.showTabsMenuButton.set(hasContentTcu);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleTopMenu(): void {
    // Se o menu de tabs estiver aberto, fecha ele primeiro
    if (this.isTabsMenuOpen()) {
      this.tabsMenuService.closeMenu();
    }
    this.isTopMenuExpanded.update(value => !value);
  }

  closeTopMenu(): void {
    this.isTopMenuExpanded.set(false);
  }

  toggleTabsMenu(): void {
    // Se o menu lateral estiver aberto, fecha ele primeiro
    if (this.isTopMenuExpanded()) {
      this.closeTopMenu();
    }
    this.tabsMenuService.toggleMenu();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateHome(): void {
    this.router.navigate(['/home']);
  }
}
