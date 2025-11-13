
import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Perguntas } from '../../../components/perguntas/perguntas';
import { PerguntasService } from '../../../services/perguntas.service';
import { Bibliografia, EstatisticasBibliografia } from '../../../interfaces/perguntas.interface';

@Component({
  selector: 'app-app7-politica-perguntas',
  standalone: true,
  imports: [CommonModule, FormsModule, Perguntas],
  templateUrl: './app7-politica-perguntas.html',
  styleUrl: './app7-politica-perguntas.scss'
})

export class App7PoliticaPerguntas implements OnInit, OnDestroy {
  private perguntasService = inject(PerguntasService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  // Bibliografias disponíveis para este módulo
  readonly bibliografiasDisponiveisIds: number[] = [9];
  
  // Bibliografias carregadas do backend
  bibliografias: Bibliografia[] = [];
  bibliografiasComEstatisticas: Array<Bibliografia & { estatisticas?: EstatisticasBibliografia }> = [];
  isLoadingBibliografias = false;
  
  // Bibliografia selecionada (null = "Todas")
  selectedBibliografiaId: number | null = null;
  
  // IDs das bibliografias a serem usadas (atualizado baseado na seleção)
  bibliografiaIds: number[] = [9];
  
  // Rota para voltar à bibliografia
  bibliografiaPath = '/home/app7-politica/bibliografia';
  
  pageTitle = 'Perguntas de Política';

  ngOnInit() {
    console.log('Módulo de Perguntas - Política iniciado');
    console.log('Bibliografias disponíveis:', this.bibliografiasDisponiveisIds);
    
    this.loadBibliografias();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadBibliografias() {
    this.isLoadingBibliografias = true;
    
    this.perguntasService.getBibliografias({ page_size: 100 })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          // Filtrar apenas as bibliografias disponíveis para este módulo
          this.bibliografias = response.results.filter(b => 
            this.bibliografiasDisponiveisIds.includes(b.id)
          );
          
          // Buscar estatísticas para cada bibliografia
          this.loadEstatisticasBibliografias();
        },
        error: (error) => {
          console.error('❌ Erro ao carregar bibliografias:', error);
          this.isLoadingBibliografias = false;
        }
      });
  }

  loadEstatisticasBibliografias() {
    // Se não há bibliografias, não fazer nada
    if (this.bibliografias.length === 0) {
      this.bibliografiasComEstatisticas = [];
      this.isLoadingBibliografias = false;
      return;
    }

    // Criar array de observables para buscar estatísticas de cada bibliografia
    const estatisticasRequests = this.bibliografias.map(bib => 
      this.perguntasService.getEstatisticasBibliografia(bib.id).pipe(
        takeUntil(this.destroy$)
      )
    );

    forkJoin(estatisticasRequests)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (estatisticas) => {
          // Combinar bibliografias com suas estatísticas
          this.bibliografiasComEstatisticas = this.bibliografias.map((bib, index) => ({
            ...bib,
            estatisticas: estatisticas[index]
          }));
          
          this.isLoadingBibliografias = false;
          
          console.log('📖 Bibliografias com estatísticas carregadas:', {
            total: this.bibliografiasComEstatisticas.length,
            bibliografias: this.bibliografiasComEstatisticas.map(b => ({
              id: b.id,
              titulo: b.titulo,
              autor: b.autor,
              estatisticas: b.estatisticas
            }))
          });
        },
        error: (error) => {
          console.error('❌ Erro ao carregar estatísticas:', error);
          // Em caso de erro, usar bibliografias sem estatísticas
          this.bibliografiasComEstatisticas = this.bibliografias.map(bib => ({ ...bib }));
          this.isLoadingBibliografias = false;
        }
      });
  }

  onBibliografiaChange() {
    if (this.selectedBibliografiaId === null) {
      // "Todas" selecionada - usar todas as bibliografias disponíveis
      this.bibliografiaIds = [...this.bibliografiasDisponiveisIds];
    } else {
      // Uma bibliografia específica selecionada
      this.bibliografiaIds = [this.selectedBibliografiaId];
    }
    
    console.log('📚 Bibliografia selecionada:', {
      selectedId: this.selectedBibliografiaId,
      bibliografiaIds: this.bibliografiaIds
    });
  }

  getBibliografiaIdsString(): string {
    return this.bibliografiaIds.join(', ');
  }

  getSelectedBibliografiaName(): string {
    if (this.selectedBibliografiaId === null) {
      return 'Todas';
    }
    const bibliografia = this.bibliografias.find(b => b.id === this.selectedBibliografiaId);
    return bibliografia ? bibliografia.titulo : 'Desconhecida';
  }

  onSimuladoStarted() {
    console.log('Simulado de Política');
  }

  /**
   * Formata o texto da opção do select com números em negrito usando caracteres Unicode
   */
  getBibliografiaOptionText(bibliografia: Bibliografia & { estatisticas?: EstatisticasBibliografia }): string {
    let texto = bibliografia.titulo;
    
    if (bibliografia.autor) {
      texto += ` - ${bibliografia.autor}`;
    }
    
    if (bibliografia.estatisticas) {
      const total = this.formatBoldNumber(bibliografia.estatisticas.total_perguntas);
      const vf = this.formatBoldNumber(bibliografia.estatisticas.perguntas_vf);
      const multipla = this.formatBoldNumber(bibliografia.estatisticas.perguntas_multipla);
      const correlacao = this.formatBoldNumber(bibliografia.estatisticas.perguntas_correlacao);
      
      texto += ` (Total: ${total} | V/F: ${vf} | Múltipla: ${multipla} | Correlação: ${correlacao})`;
    } else if (bibliografia.perguntas_count !== undefined) {
      const count = this.formatBoldNumber(bibliografia.perguntas_count);
      texto += ` (${count} questões)`;
    }
    
    return texto;
  }

  /**
   * Converte um número para caracteres Unicode em negrito matemático
   */
  private formatBoldNumber(num: number): string {
    const boldMap: { [key: string]: string } = {
      '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒',
      '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗'
    };
    
    return num.toString().split('').map(digit => boldMap[digit] || digit).join('');
  }

  /**
   * Navega de volta para a página de bibliografia
   */
  goToBibliografia() {
    this.router.navigate([this.bibliografiaPath]);
  }
}
