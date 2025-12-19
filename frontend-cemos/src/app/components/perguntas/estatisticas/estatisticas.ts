import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { PerguntasService } from '../../../services/perguntas.service';
import { AuthService } from '../../../services/auth.service';
import { Bibliografia } from '../../../interfaces/perguntas.interface';
import { first } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { MinhasEstatisticas } from './minhas-estatisticas/minhas-estatisticas';
import { EstatisticasGerais } from './estatisticas-gerais/estatisticas-gerais';

interface MateriaEstatisticas {
  materia: string;
  bibliografiaIds: number[];
  bibliografias: Bibliografia[];
  estatisticas: {
    total: number;
    acertos: number;
    erros: number;
    taxa_acerto: number;
  };
  expanded: boolean;
}

@Component({
  selector: 'app-estatisticas',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTabsModule, MatButtonModule, MinhasEstatisticas, EstatisticasGerais],
  templateUrl: './estatisticas.html',
  styleUrl: './estatisticas.scss'
})
export class EstatisticasComponent implements OnInit {
  private perguntasService = inject(PerguntasService);
  private authService = inject(AuthService);
  private router = inject(Router);

  estatisticasUsuario: any = null;
  rankingGeral: any = null;
  estatisticasGeraisErros: any = null;
  isLoading = false;
  isAdmin = false;
  isResetting = false;
  
  // Mapeamento de matérias para IDs de bibliografias
  materiasConfig: { [key: string]: number[] } = {
    'Intendência': [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68],
    'Estratégia': [33, 34, 35],
    'Política': [9, 10, 11, 12, 13, 14, 15, 16, 17],
    'Planejamento Militar': [69, 70, 71],
    'Economia': [30, 31, 32],
    'História': [5, 6, 7, 8],
    'Direito': [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    'Geopolítica e Relações Internacionais': [1, 2, 3, 4]
  };

  materiasEstatisticas: MateriaEstatisticas[] = [];
  isLoadingMaterias = false;

  // Visualização de questões
  questoesAcertadas: any[] = [];
  questoesErradas: any[] = [];
  isLoadingQuestoes = false;
  filtroQuestoes: 'todas' | 'acertadas' | 'erradas' = 'todas';
  paginaQuestoes = 1;
  totalQuestoes = 0;

  ngOnInit() {
    // Obter valor atual do usuário do Observable
    this.authService.currentUser$.pipe(first()).subscribe(user => {
      this.isAdmin = user?.is_staff || false;
      this.carregarEstatisticasUsuario();
      this.carregarEstatisticasPorMateria();
      
      if (this.isAdmin) {
        this.carregarRankingGeral();
        this.carregarEstatisticasGeraisErros();
      }
    });
  }


  carregarEstatisticasUsuario() {
    this.isLoading = true;
    this.perguntasService.getEstatisticasUsuario().subscribe({
      next: (data) => {
        this.estatisticasUsuario = data;
        this.isLoading = false;
        // Carregar questões acertadas após carregar estatísticas
        if (data.total_acertos > 0) {
          this.carregarQuestoes('acertadas');
        }
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

  carregarEstatisticasGeraisErros() {
    this.perguntasService.getEstatisticasGeraisErros().subscribe({
      next: (data) => {
        this.estatisticasGeraisErros = data;
      },
      error: (error) => {
        console.error('Erro ao carregar estatísticas gerais de erros:', error);
      }
    });
  }

  resetarEstatisticas() {
    // Resetar todas as estatísticas
    const mensagem = `Tem certeza que deseja resetar todas as suas estatísticas?\n\nTodas as suas respostas serão deletadas, mas as questões erradas serão preservadas para estatísticas gerais.`;
    
    if (!confirm(mensagem)) {
      return;
    }

    this.isResetting = true;
    this.perguntasService.resetarEstatisticas().subscribe({
      next: (response) => {
        alert(`Estatísticas resetadas com sucesso!\n\n${response.total_respostas_deletadas} respostas deletadas\n${response.questoes_erradas_preservadas} questões erradas preservadas`);
        // Recarregar estatísticas
        this.carregarEstatisticasUsuario();
        this.carregarEstatisticasPorMateria();
        this.questoesAcertadas = [];
        this.questoesErradas = [];
        this.isResetting = false;
      },
      error: (error) => {
        console.error('Erro ao resetar estatísticas:', error);
        alert('Erro ao resetar estatísticas. Tente novamente.');
        this.isResetting = false;
      }
    });
  }

  resetarEstatisticasMateria(bibliografiaIds: number[]) {
    if (!bibliografiaIds || bibliografiaIds.length === 0) {
      return;
    }

    const mensagem = `Tem certeza que deseja resetar as estatísticas desta matéria?\n\nTodas as respostas relacionadas a esta matéria serão deletadas, mas as questões erradas serão preservadas para estatísticas gerais.`;
    
    if (!confirm(mensagem)) {
      return;
    }

    this.isResetting = true;
    this.perguntasService.resetarEstatisticas(undefined, bibliografiaIds).subscribe({
      next: (response) => {
        alert(`Estatísticas da matéria resetadas com sucesso!\n\n${response.total_respostas_deletadas} respostas deletadas\n${response.questoes_erradas_preservadas} questões erradas preservadas`);
        // Recarregar estatísticas
        this.carregarEstatisticasUsuario();
        this.carregarEstatisticasPorMateria();
        this.questoesAcertadas = [];
        this.questoesErradas = [];
        this.isResetting = false;
      },
      error: (error) => {
        console.error('Erro ao resetar estatísticas da matéria:', error);
        alert('Erro ao resetar estatísticas. Tente novamente.');
        this.isResetting = false;
      }
    });
  }


  calcularTaxaAcerto(acertos: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((acertos / total) * 100 * 100) / 100;
  }

  /**
   * Carrega estatísticas agrupadas por matéria
   */
  carregarEstatisticasPorMateria() {
    this.isLoadingMaterias = true;
    
    // Carregar bibliografias primeiro
    this.perguntasService.getBibliografias({ page_size: 1000 }).subscribe({
      next: (bibliografiasResponse) => {
        const todasBibliografias = bibliografiasResponse.results || [];
        
        // Inicializar array de matérias com estatísticas
        this.materiasEstatisticas = Object.keys(this.materiasConfig).map(materia => {
          const bibliografiaIds = this.materiasConfig[materia];
          const bibliografiasFiltradas = todasBibliografias.filter((bib: Bibliografia) => 
            bibliografiaIds.includes(bib.id)
          );
          
          return {
            materia,
            bibliografiaIds,
            bibliografias: bibliografiasFiltradas,
            estatisticas: {
              total: 0,
              acertos: 0,
              erros: 0,
              taxa_acerto: 0
            },
            expanded: false
          };
        });

        // Usar estatísticas já carregadas ou carregar novamente
        const stats = this.estatisticasUsuario || null;
        
        if (stats?.por_bibliografia) {
          this.processarEstatisticasPorMateria(stats);
        } else {
          // Se não tiver estatísticas carregadas, carregar agora
          this.perguntasService.getEstatisticasUsuario().subscribe({
            next: (statsData) => {
              this.processarEstatisticasPorMateria(statsData);
              this.isLoadingMaterias = false;
            },
            error: (error) => {
              console.error('Erro ao carregar estatísticas:', error);
              this.isLoadingMaterias = false;
            }
          });
          return;
        }
        
        this.isLoadingMaterias = false;
      },
      error: (error) => {
        console.error('Erro ao carregar bibliografias:', error);
        this.isLoadingMaterias = false;
      }
    });
  }

  /**
   * Processa estatísticas por matéria
   */
  private processarEstatisticasPorMateria(stats: any) {
    if (stats?.por_bibliografia) {
      this.materiasEstatisticas.forEach(materiaStat => {
        let total = 0;
        let acertos = 0;
        let erros = 0;

        stats.por_bibliografia.forEach((bibStat: any) => {
          if (materiaStat.bibliografiaIds.includes(bibStat.bibliografia_id)) {
            total += bibStat.total || 0;
            acertos += bibStat.acertos || 0;
            erros += bibStat.erros || 0;
          }
        });

        materiaStat.estatisticas = {
          total,
          acertos,
          erros,
          taxa_acerto: this.calcularTaxaAcerto(acertos, total)
        };
      });
    }
  }

  /**
   * Alterna expansão de uma matéria
   */
  toggleMateria(index: number) {
    this.materiasEstatisticas[index].expanded = !this.materiasEstatisticas[index].expanded;
  }

  /**
   * Obtém estatísticas de uma bibliografia específica
   */
  getEstatisticasBibliografia(bibliografiaId: number): any {
    if (!this.estatisticasUsuario || !this.estatisticasUsuario.por_bibliografia) {
      return null;
    }
    
    return this.estatisticasUsuario.por_bibliografia.find(
      (bib: any) => bib.bibliografia_id === bibliografiaId
    );
  }

  /**
   * Carrega questões acertadas ou erradas
   */
  carregarQuestoes(filtro: 'todas' | 'acertadas' | 'erradas' = 'todas') {
    this.filtroQuestoes = filtro;
    this.isLoadingQuestoes = true;
    
    const acertou = filtro === 'acertadas' ? true : filtro === 'erradas' ? false : undefined;
    
    this.perguntasService.getMinhasRespostas(acertou, this.paginaQuestoes, 50).subscribe({
      next: (response) => {
        if (filtro === 'acertadas') {
          this.questoesAcertadas = response.results || [];
        } else if (filtro === 'erradas') {
          this.questoesErradas = response.results || [];
        }
        this.totalQuestoes = response.count || 0;
        this.isLoadingQuestoes = false;
      },
      error: (error) => {
        console.error('Erro ao carregar questões:', error);
        this.isLoadingQuestoes = false;
      }
    });
  }

  /**
   * Obtém questões baseado no filtro atual
   */
  getQuestoesAtuais(): any[] {
    if (this.filtroQuestoes === 'acertadas') {
      return this.questoesAcertadas;
    } else if (this.filtroQuestoes === 'erradas') {
      return this.questoesErradas;
    }
    return [];
  }

  /**
   * Formata resposta do usuário para exibição
   */
  formatarRespostaUsuario(resposta: any, tipo: string): string {
    if (tipo === 'multipla') {
      return resposta.toUpperCase();
    } else if (tipo === 'vf') {
      return resposta ? 'Verdadeiro' : 'Falso';
    } else if (tipo === 'correlacao') {
      // Converter formato do backend para exibição
      const pares: string[] = [];
      for (const [key, value] of Object.entries(resposta)) {
        const itemIndex = parseInt(key) + 1;
        const letterIndex = parseInt(value as string);
        const letter = String.fromCharCode(65 + letterIndex); // A, B, C...
        pares.push(`${itemIndex} → ${letter}`);
      }
      return pares.join(', ');
    }
    return String(resposta);
  }

  /**
   * Formata resposta correta para exibição
   */
  formatarRespostaCorreta(questao: any): string {
    if (!questao) return 'N/A';
    
    if (questao.tipo === 'multipla') {
      return questao.resposta_correta.toUpperCase();
    } else if (questao.tipo === 'vf') {
      return 'Verdadeiro';
    } else if (questao.tipo === 'correlacao') {
      const pares: string[] = [];
      for (const [key, value] of Object.entries(questao.resposta_correta)) {
        const itemIndex = parseInt(key) + 1;
        const letterIndex = parseInt(value as string);
        const letter = String.fromCharCode(65 + letterIndex); // A, B, C...
        pares.push(`${itemIndex} → ${letter}`);
      }
      return pares.join(', ');
    }
    return String(questao.resposta_correta);
  }

  /**
   * Retorna letra da coluna B baseado no índice
   */
  getLetraColunaB(index: number): string {
    return String.fromCharCode(65 + index); // A, B, C...
  }

  getMateriaPorBibliografiaId(bibliografiaId: number): string {
    for (const materiaStat of this.materiasEstatisticas) {
      if (materiaStat.bibliografiaIds.includes(bibliografiaId)) {
        return materiaStat.materia;
      }
    }
    return 'Desconhecida';
  }

  navigateHome(): void {
    this.router.navigate(['/home']);
  }
}
