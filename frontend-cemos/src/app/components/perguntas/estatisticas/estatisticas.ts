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
import { JanelaGenerica, BotaoJanela } from '../../janela-generica/janela-generica';

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
  imports: [CommonModule, MatIconModule, MatTabsModule, MatButtonModule, MinhasEstatisticas, EstatisticasGerais, JanelaGenerica],
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

  // Janela genérica para confirmação
  mostrarJanelaConfirmacao = false;
  tituloJanela = '';
  mensagemJanela = '';
  botoesJanela: BotaoJanela[] = [];
  tipoReset: 'todas' | 'materia' | null = null;
  bibliografiaIdsParaReset: number[] = [];

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
        // Se for erro 401, o interceptor já vai tratar o refresh token
        // Não precisamos fazer nada aqui, apenas logar o erro
        if (error.status === 401) {
          console.warn('Erro 401 ao carregar ranking geral - interceptor vai tentar renovar token');
        } else if (error.status === 403) {
          console.warn('Erro 403 - usuário não tem permissão para acessar ranking geral');
          // Não faz logout, apenas não carrega os dados
        }
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
        // Se for erro 401, o interceptor já vai tratar o refresh token
        // Não precisamos fazer nada aqui, apenas logar o erro
        if (error.status === 401) {
          console.warn('Erro 401 ao carregar estatísticas gerais - interceptor vai tentar renovar token');
        } else if (error.status === 403) {
          console.warn('Erro 403 - usuário não tem permissão para acessar estatísticas gerais');
          // Não faz logout, apenas não carrega os dados
        }
      }
    });
  }

  resetarEstatisticas() {
    this.tipoReset = 'todas';
    this.tituloJanela = 'Resetar Todas as Estatísticas';
    this.mensagemJanela = 'Tem certeza que deseja resetar todas as suas estatísticas?\n\nTodas as suas respostas serão deletadas, mas as questões erradas serão preservadas para estatísticas gerais.';
    this.botoesJanela = [
      {
        texto: 'Cancelar',
        tipo: 'secondary',
        acao: () => this.fecharJanelaConfirmacao()
      },
      {
        texto: 'Confirmar',
        tipo: 'danger',
        acao: () => this.confirmarResetEstatisticas()
      }
    ];
    this.mostrarJanelaConfirmacao = true;
  }

  confirmarResetEstatisticas() {
    this.isResetting = true;
    this.perguntasService.resetarEstatisticas().subscribe({
      next: (response) => {
        this.fecharJanelaConfirmacao();
        this.mostrarJanelaSucesso(
          'Estatísticas Resetadas',
          `Estatísticas resetadas com sucesso!\n\n${response.total_respostas_deletadas} respostas deletadas\n${response.questoes_erradas_preservadas} questões erradas preservadas`
        );
        // Recarregar estatísticas
        this.carregarEstatisticasUsuario();
        this.carregarEstatisticasPorMateria();
        this.isResetting = false;
      },
      error: (error) => {
        console.error('Erro ao resetar estatísticas:', error);
        this.fecharJanelaConfirmacao();
        this.mostrarJanelaErro('Erro ao resetar estatísticas. Tente novamente.');
        this.isResetting = false;
      }
    });
  }

  resetarEstatisticasMateria(bibliografiaIds: number[]) {
    if (!bibliografiaIds || bibliografiaIds.length === 0) {
      return;
    }

    // Encontrar o nome da matéria a partir dos bibliografiaIds
    const nomeMateria = this.obterNomeMateriaPorBibliografiaIds(bibliografiaIds);

    this.tipoReset = 'materia';
    this.bibliografiaIdsParaReset = bibliografiaIds;
    this.tituloJanela = `Resetar Estatísticas da Matéria ${nomeMateria ? nomeMateria : ''}`.trim();
    this.mensagemJanela = 'Tem certeza que deseja resetar as estatísticas desta matéria?\n\nTodas as respostas relacionadas a esta matéria serão deletadas do perfil do usuário no Banco de Dados.';
    this.botoesJanela = [
      {
        texto: 'Cancelar',
        tipo: 'secondary',
        acao: () => this.fecharJanelaConfirmacao()
      },
      {
        texto: 'Confirmar',
        tipo: 'danger',
        acao: () => this.confirmarResetEstatisticasMateria()
      }
    ];
    this.mostrarJanelaConfirmacao = true;
  }

  confirmarResetEstatisticasMateria() {
    this.isResetting = true;
    this.perguntasService.resetarEstatisticas(undefined, this.bibliografiaIdsParaReset).subscribe({
      next: (response) => {
        this.fecharJanelaConfirmacao();
        this.mostrarJanelaSucesso(
          'Estatísticas Resetadas',
          `Estatísticas da matéria resetadas com sucesso!\n\n${response.total_respostas_deletadas} respostas deletadas\n${response.questoes_erradas_preservadas} questões erradas preservadas`
        );
        // Recarregar estatísticas
        this.carregarEstatisticasUsuario();
        this.carregarEstatisticasPorMateria();
        this.isResetting = false;
      },
      error: (error) => {
        console.error('Erro ao resetar estatísticas da matéria:', error);
        this.fecharJanelaConfirmacao();
        this.mostrarJanelaErro('Erro ao resetar estatísticas. Tente novamente.');
        this.isResetting = false;
      }
    });
  }

  fecharJanelaConfirmacao() {
    this.mostrarJanelaConfirmacao = false;
    this.tipoReset = null;
    this.bibliografiaIdsParaReset = [];
  }

  mostrarJanelaSucesso(titulo: string, mensagem: string) {
    this.tituloJanela = titulo;
    this.mensagemJanela = mensagem;
    this.botoesJanela = [
      {
        texto: 'OK',
        tipo: 'primary',
        acao: () => this.fecharJanelaConfirmacao()
      }
    ];
    this.mostrarJanelaConfirmacao = true;
  }

  mostrarJanelaErro(mensagem: string) {
    this.tituloJanela = 'Erro';
    this.mensagemJanela = mensagem;
    this.botoesJanela = [
      {
        texto: 'OK',
        tipo: 'primary',
        acao: () => this.fecharJanelaConfirmacao()
      }
    ];
    this.mostrarJanelaConfirmacao = true;
  }

  /**
   * Converte quebras de linha (\n) em tags <br> para exibição no HTML
   */
  formatarMensagemComQuebrasDeLinha(mensagem: string): string {
    if (!mensagem) return '';
    return mensagem.replace(/\n/g, '<br>');
  }

  /**
   * Obtém o nome da matéria a partir dos IDs de bibliografia
   */
  obterNomeMateriaPorBibliografiaIds(bibliografiaIds: number[]): string {
    if (!bibliografiaIds || bibliografiaIds.length === 0) {
      return '';
    }

    // Verificar se todos os IDs pertencem à mesma matéria
    for (const [materia, ids] of Object.entries(this.materiasConfig)) {
      // Verificar se todos os bibliografiaIds estão na lista desta matéria
      const todosPertencem = bibliografiaIds.every(id => ids.includes(id));
      if (todosPertencem) {
        return materia;
      }
    }

    // Se não encontrou uma matéria específica, tentar encontrar pela primeira bibliografia
    if (bibliografiaIds.length > 0) {
      const primeiroId = bibliografiaIds[0];
      for (const [materia, ids] of Object.entries(this.materiasConfig)) {
        if (ids.includes(primeiroId)) {
          return materia;
        }
      }
    }

    return '';
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
