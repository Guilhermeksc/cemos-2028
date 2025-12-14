import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerguntasService } from '../../../services/perguntas.service';
import { AuthService } from '../../../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-estatisticas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estatisticas.html',
  styleUrl: './estatisticas.scss'
})
export class EstatisticasComponent implements OnInit {
  private perguntasService = inject(PerguntasService);
  private authService = inject(AuthService);

  estatisticasUsuario: any = null;
  rankingGeral: any = null;
  isLoading = false;
  isAdmin = false;

  ngOnInit() {
    // Obter valor atual do usuário do Observable
    this.authService.currentUser$.pipe(first()).subscribe(user => {
      this.isAdmin = user?.is_staff || false;
      this.carregarEstatisticasUsuario();
      
      if (this.isAdmin) {
        this.carregarRankingGeral();
      }
    });
  }

  carregarEstatisticasUsuario() {
    this.isLoading = true;
    this.perguntasService.getEstatisticasUsuario().subscribe({
      next: (data) => {
        this.estatisticasUsuario = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar estatísticas:', error);
        this.isLoading = false;
      }
    });
  }

  carregarRankingGeral() {
    this.perguntasService.getRankingGeral().subscribe({
      next: (data) => {
        this.rankingGeral = data;
      },
      error: (error) => {
        console.error('Erro ao carregar ranking geral:', error);
      }
    });
  }

  calcularTaxaAcerto(acertos: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((acertos / total) * 100 * 100) / 100;
  }
}
