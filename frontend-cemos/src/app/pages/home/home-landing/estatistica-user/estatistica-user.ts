import { Component } from '@angular/core';
import { EstatisticasComponent } from '../../../../components/perguntas/estatisticas/estatisticas';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estatistica-user',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, EstatisticasComponent],
  templateUrl: './estatistica-user.html',
  styleUrl: './estatistica-user.scss'
})
export class EstatisticaUser {

  constructor(private router: Router) {}

  navigateToBibliografia(): void {
    this.router.navigate(['/home/bibliografia-id']);
  }
}
