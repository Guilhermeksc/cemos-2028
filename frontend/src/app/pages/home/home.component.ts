import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SideMenu } from './side-menu/side-menu';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    SideMenu
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild(MatSidenav) private readonly drawer?: MatSidenav;

  readonly isHandset = signal(false);
  readonly drawerMode = computed(() => (this.isHandset() ? 'over' : 'side'));

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.Handset])
      .pipe(takeUntilDestroyed())
      .subscribe((state) => this.isHandset.set(state.matches));
  }

  toggleDrawer(): void {
    if (this.drawerMode() === 'over') {
      this.drawer?.toggle();
    }
  }

  closeDrawerIfMobile(): void {
    if (this.drawerMode() === 'over') {
      this.drawer?.close();
    }
  }
}
