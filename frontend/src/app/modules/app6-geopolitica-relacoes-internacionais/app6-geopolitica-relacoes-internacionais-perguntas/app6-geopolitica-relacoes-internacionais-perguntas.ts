import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Perguntas } from '../../../components/perguntas/perguntas';
import { HeaderConcentComponent } from '../../../components/header-concent/header-concent';
import { PerguntasService } from '../../../services/perguntas.service';
import { Bibliografia } from '../../../interfaces/perguntas.interface';

@Component({
  selector: 'app-app6-geopolitica-relacoes-internacionais-perguntas',
  standalone: true,
  imports: [CommonModule, FormsModule, Perguntas, HeaderConcentComponent],
  templateUrl: './app6-geopolitica-relacoes-internacionais-perguntas.html',
  styleUrl: './app6-geopolitica-relacoes-internacionais-perguntas.scss'
})
export class App6GeopoliticaRelacoesInternacionaisPerguntas implements OnInit, OnDestroy {
  private perguntasService = inject(PerguntasService);
  private destroy$ = new Subject<void>();

  // Bibliografias disponíveis para este módulo
  readonly bibliografiasDisponiveisIds: number[] = [1, 2, 3, 4];
  
  // Bibliografias carregadas do backend
  bibliografias: Bibliografia[] = [];
  isLoadingBibliografias = false;
  
  // Bibliografia selecionada (null = "Todas")
  selectedBibliografiaId: number | null = null;
  
  // IDs das bibliografias a serem usadas (atualizado baseado na seleção)
  bibliografiaIds: number[] = [1, 2, 3, 4];
  
  pageTitle = 'Perguntas de Geopolítica e Relações Internacionais';
  // Estado do simulado
  simuladoAtivo: boolean = false;
  ultimoResultado: any | null = null;

  ngOnInit() {
    console.log('Módulo de Perguntas - Geopolítica e Relações Internacionais iniciado');
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
          
          this.isLoadingBibliografias = false;
          
          console.log('📖 Bibliografias carregadas para Geopolítica:', {
            total: this.bibliografias.length,
            bibliografias: this.bibliografias.map(b => ({
              id: b.id,
              titulo: b.titulo,
              autor: b.autor
            }))
          });
        },
        error: (error) => {
          console.error('❌ Erro ao carregar bibliografias:', error);
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
    console.log('Simulado de Geopolítica iniciado');
    this.simuladoAtivo = true;
    this.ultimoResultado = null;
  }

  resetarSimulado() {
    this.simuladoAtivo = false;
    this.ultimoResultado = null;
    // Recarregar a página ou resetar o estado do componente
    window.location.reload();
  }
}
