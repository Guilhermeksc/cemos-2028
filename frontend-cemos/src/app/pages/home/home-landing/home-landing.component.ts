import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-landing',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './home-landing.component.html',
  styleUrl: './home-landing.component.scss'
})
export class HomeLandingComponent {
  constructor(private router: Router) {}

  navigateTo(path: string[]): void {
    this.router.navigate(['home', ...path]);
  }

  navigateBibliografiaId(): void {
    this.router.navigate(['/home/bibliografia-id']);
  }

  navigateCronograma(): void {
    this.router.navigate(['/home/cronograma']);
  }

  navigateEstatisticas(): void {
    this.router.navigate(['/home/estatisticas']);
  }
}
