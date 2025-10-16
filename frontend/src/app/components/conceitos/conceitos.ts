import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Conceitos as ConceitosInterface } from '../../interfaces/informacoes.interface';
import { Bibliografia } from '../../interfaces/perguntas.interface';
import { InformacoesService } from '../../services/informacoes.service';
import { PerguntasService } from '../../services/perguntas.service';
import { ConceitosTableComponent } from '../conceitos-table/conceitos-table';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-conceitos',
  standalone: true,
  imports: [CommonModule, ConceitosTableComponent],
  templateUrl: './conceitos.html',
  styleUrl: './conceitos.scss'
})
export class ConceitosComponent implements OnInit {
  @Input() bibliografiaIds: number[] = []; // IDs das bibliografias a serem exibidas
  @Input() title: string = 'Conceitos'; // Título customizável
  @Input() emptyMessage: string = 'Nenhum conceito encontrado. Adicione conceitos para visualizá-los aqui.';

  conceitos: ConceitosInterface[] = [];
  bibliografias: Bibliografia[] = [];
  selectedBibliografiaId: number | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private informacoesService: InformacoesService,
    private perguntasService: PerguntasService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.error = null;

    // Se não há IDs específicos, carrega todas as bibliografias
    const bibliografiasRequest = this.bibliografiaIds.length > 0 
      ? this.perguntasService.getBibliografias({ page_size: 1000 })
      : this.perguntasService.getBibliografias({ page_size: 1000 });

    const conceitosRequest = this.informacoesService.getConceitos();

    forkJoin({
      bibliografias: bibliografiasRequest,
      conceitos: conceitosRequest
    }).subscribe({
      next: (response) => {
        // Filtra bibliografias se IDs específicos foram fornecidos
        if (this.bibliografiaIds.length > 0) {
          this.bibliografias = response.bibliografias.results.filter(
            bib => this.bibliografiaIds.includes(bib.id)
          );
        } else {
          // Filtra apenas bibliografias que têm conceitos
          const conceitosWithBib = response.conceitos.results.map(c => c.bibliografia);
          const uniqueBibIds = [...new Set(conceitosWithBib)];
          this.bibliografias = response.bibliografias.results.filter(
            bib => uniqueBibIds.includes(bib.id)
          );
        }

        this.conceitos = response.conceitos.results;
        
        // Define a primeira bibliografia como selecionada se houver alguma
        if (this.bibliografias.length > 0) {
          this.selectedBibliografiaId = this.bibliografias[0].id;
        }
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar dados:', error);
        
        // Tratamento específico para erro 401
        if (error.status === 401) {
          this.error = 'Acesso não autorizado. Por favor, faça login para continuar.';
        } else if (error.status === 0) {
          this.error = 'Erro de conexão. Verifique se o servidor está rodando.';
        } else {
          this.error = 'Erro ao carregar conceitos. Tente novamente.';
        }
        
        this.loading = false;
      }
    });
  }

  selectBibliografia(bibliografiaId: number) {
    this.selectedBibliografiaId = bibliografiaId;
  }

  get filteredConceitos(): ConceitosInterface[] {
    if (!this.selectedBibliografiaId) {
      return this.conceitos;
    }
    return this.conceitos.filter(conceito => conceito.bibliografia === this.selectedBibliografiaId);
  }

  get selectedBibliografia(): Bibliografia | null {
    if (!this.selectedBibliografiaId) return null;
    return this.bibliografias.find(bib => bib.id === this.selectedBibliografiaId) || null;
  }

  loadConceitos() {
    this.loadData();
  }

  trackByBibliografia(index: number, bibliografia: Bibliografia): number {
    return bibliografia.id;
  }

  getConceptCountByBibliografia(bibliografiaId: number): number {
    return this.conceitos.filter(conceito => conceito.bibliografia === bibliografiaId).length;
  }

  getEmptyMessage(): string {
    if (this.bibliografias.length > 1 && this.selectedBibliografia) {
      return `Nenhum conceito encontrado para a bibliografia "${this.selectedBibliografia.titulo}".`;
    }
    return this.emptyMessage;
  }
}
