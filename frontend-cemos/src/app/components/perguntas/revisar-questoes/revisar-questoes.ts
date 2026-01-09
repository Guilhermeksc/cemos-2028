import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, forkJoin, of, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PerguntasService } from '../../../services/perguntas.service';
import { AuthService } from '../../../services/auth.service';
import {
  Pergunta,
  PerguntaMultipla,
  PerguntaVF,
  PerguntaCorrelacao
} from '../../../interfaces/perguntas.interface';

interface RevisarQuestaoRow {
  id: number;
  tipo: 'multipla' | 'vf' | 'correlacao';
  pergunta: string;
  justificativa_resposta_certa: string;
  bibliografiaId: number;
  bibliografiaTitulo: string;
  assunto_titulo?: string | null;
  caiu_em_prova: boolean;
  ano_prova?: number;
  data: PerguntaMultipla | PerguntaVF | PerguntaCorrelacao;
  uniqueKey: string;
}

interface RevisarQuestaoGrupo {
  bibliografiaId: number;
  bibliografiaTitulo: string;
  questoes: RevisarQuestaoRow[];
}

@Component({
  selector: 'app-revisar-questoes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './revisar-questoes.html',
  styleUrl: './revisar-questoes.scss'
})
export class RevisarQuestoes implements OnInit, OnDestroy {
  private perguntasService = inject(PerguntasService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>();

  isAdmin = false;
  bibliografiaIds: number[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  tableData: RevisarQuestaoGrupo[] = [];

  editingRowKey: string | null = null;
  editingFormData: any = null;
  isSavingEdit = false;
  editError: string | null = null;
  togglingCaiuEmProva = new Set<string>();

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.isAdmin = !!(user && (user.is_staff || user.perfil === 'admin'));
      });

    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const idsParam = params.get('bibliografias');
        this.bibliografiaIds = idsParam
          ? idsParam.split(',').map(id => Number(id.trim())).filter(id => !isNaN(id))
          : [];
        if (this.bibliografiaIds.length === 0) {
          this.errorMessage = 'Nenhuma bibliografia foi informada.';
          this.tableData = [];
          return;
        }
        this.loadQuestoes();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  reload(): void {
    this.loadQuestoes();
  }

  openAddQuestion(): void {
    const query = this.bibliografiaIds.length
      ? `?bibliografias=${this.bibliografiaIds.join(',')}&modo=adicionar`
      : '';
    const base = typeof window !== 'undefined' ? window.location.origin : '';
    window.open(`${base}/home/bibliografia-id${query}`, '_blank');
  }

  closeWindow(): void {
    if (typeof window !== 'undefined') {
      window.close();
    }
  }

  private loadQuestoes(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.tableData = [];

    const ids = this.bibliografiaIds;
    if (ids.length === 0) {
      this.isLoading = false;
      return;
    }

    const multiplaRequests = ids.map(id => this.perguntasService.getAllPerguntasMultipla({ bibliografia: id }));
    const vfRequests = ids.map(id => this.perguntasService.getAllPerguntasVF({ bibliografia: id }));
    const correlacaoRequests = ids.map(id => this.perguntasService.getAllPerguntasCorrelacao({ bibliografia: id }));

    const multiplas$ = multiplaRequests.length ? forkJoin(multiplaRequests) : of([]);
    const vfs$ = vfRequests.length ? forkJoin(vfRequests) : of([]);
    const correlacoes$ = correlacaoRequests.length ? forkJoin(correlacaoRequests) : of([]);

    forkJoin({ multiplas: multiplas$, vfs: vfs$, correlacoes: correlacoes$ })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          const multiplas: PerguntaMultipla[] = Array.isArray(results.multiplas)
            ? (results.multiplas as PerguntaMultipla[][]).flat()
            : [];
          const vfs: PerguntaVF[] = Array.isArray(results.vfs)
            ? (results.vfs as PerguntaVF[][]).flat()
            : [];
          const correlacoes: PerguntaCorrelacao[] = Array.isArray(results.correlacoes)
            ? (results.correlacoes as PerguntaCorrelacao[][]).flat()
            : [];

          this.tableData = this.buildTableData([...multiplas, ...vfs, ...correlacoes]);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('❌ Erro ao carregar questões para revisão:', error);
          this.errorMessage = 'Erro ao carregar as questões. Atualize a página para tentar novamente.';
          this.isLoading = false;
        }
      });
  }

  private buildTableData(questoes: Array<PerguntaMultipla | PerguntaVF | PerguntaCorrelacao>): RevisarQuestaoGrupo[] {
    const grupos = new Map<number, RevisarQuestaoGrupo>();

    questoes.forEach(questao => {
      const bibliografiaId = questao.bibliografia;
      if (!grupos.has(bibliografiaId)) {
        grupos.set(bibliografiaId, {
          bibliografiaId,
          bibliografiaTitulo: questao.bibliografia_titulo || `Bibliografia #${bibliografiaId}`,
          questoes: []
        });
      }

      grupos.get(bibliografiaId)!.questoes.push({
        id: questao.id,
        tipo: questao.tipo,
        pergunta: questao.pergunta,
        justificativa_resposta_certa: questao.justificativa_resposta_certa,
        bibliografiaId,
        bibliografiaTitulo: questao.bibliografia_titulo || `Bibliografia #${bibliografiaId}`,
        assunto_titulo: questao.assunto_titulo,
        caiu_em_prova: questao.caiu_em_prova,
        ano_prova: questao.ano_prova,
        data: questao,
        uniqueKey: `${questao.tipo}-${questao.id}`
      });
    });

    return Array.from(grupos.values()).map(grupo => ({
      ...grupo,
      questoes: grupo.questoes.sort((a, b) => a.id - b.id)
    }));
  }

  getQuestaoTipoDisplay(tipo: 'multipla' | 'vf' | 'correlacao'): string {
    switch (tipo) {
      case 'multipla':
        return 'Múltipla';
      case 'vf':
        return 'V/F';
      case 'correlacao':
        return 'Correlação';
      default:
        return tipo;
    }
  }

  isEditing(row: RevisarQuestaoRow): boolean {
    return this.editingRowKey === row.uniqueKey;
  }

  startEditingRow(row: RevisarQuestaoRow): void {
    if (!this.isAdmin) {
      return;
    }
    this.editingRowKey = row.uniqueKey;
    this.editingFormData = this.buildEditFormData(row);
    this.editError = null;
  }

  cancelEditing(): void {
    this.editingRowKey = null;
    this.editingFormData = null;
    this.editError = null;
    this.isSavingEdit = false;
  }

  saveEditingRow(row: RevisarQuestaoRow): void {
    if (!this.editingRowKey || !this.editingFormData) {
      return;
    }

    let payload: any;
    try {
      payload = this.buildPayload(row, this.editingFormData);
    } catch (error: any) {
      this.editError = error?.message || 'Erro ao preparar os dados para salvar.';
      return;
    }

    this.isSavingEdit = true;
    this.updatePergunta(row, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updated: Pergunta) => {
          this.applyUpdatedRow(row, updated);
          this.cancelEditing();
          this.isSavingEdit = false;
        },
        error: (error: any) => {
          console.error('❌ Erro ao salvar questão:', error);
          this.editError = 'Erro ao salvar alterações. Tente novamente.';
          this.isSavingEdit = false;
        }
      });
  }

  private updatePergunta(row: RevisarQuestaoRow, payload: any): Observable<Pergunta> {
    switch (row.tipo) {
      case 'multipla':
        return this.perguntasService.updatePerguntaMultipla(row.id, payload) as unknown as Observable<Pergunta>;
      case 'vf':
        return this.perguntasService.updatePerguntaVF(row.id, payload) as unknown as Observable<Pergunta>;
      case 'correlacao':
        return this.perguntasService.updatePerguntaCorrelacao(row.id, payload) as unknown as Observable<Pergunta>;
      default:
        throw new Error('Tipo de pergunta inválido para edição.');
    }
  }

  private applyUpdatedRow(row: RevisarQuestaoRow, updated: Pergunta): void {
    row.pergunta = updated.pergunta;
    row.justificativa_resposta_certa = updated.justificativa_resposta_certa;
    row.assunto_titulo = updated.assunto_titulo || row.assunto_titulo;
    row.caiu_em_prova = updated.caiu_em_prova;
    row.ano_prova = updated.ano_prova;
    row.data = updated as PerguntaMultipla | PerguntaVF | PerguntaCorrelacao;
  }

  private buildEditFormData(row: RevisarQuestaoRow) {
    const base = {
      pergunta: row.pergunta,
      justificativa_resposta_certa: row.justificativa_resposta_certa
    };

    const data: any = row.data;
    switch (row.tipo) {
      case 'multipla':
        return {
          ...base,
          alternativa_a: data.alternativa_a || '',
          alternativa_b: data.alternativa_b || '',
          alternativa_c: data.alternativa_c || '',
          alternativa_d: data.alternativa_d || '',
          resposta_correta: data.resposta_correta || 'a'
        };
      case 'vf':
        return {
          ...base,
          afirmacao_verdadeira: data.afirmacao_verdadeira || '',
          afirmacao_falsa: data.afirmacao_falsa || ''
        };
      case 'correlacao':
        return {
          ...base,
          coluna_a_text: (data.coluna_a || []).join('\n'),
          coluna_b_text: (data.coluna_b || []).join('\n'),
          resposta_correta_text: JSON.stringify(data.resposta_correta || {}, null, 2)
        };
      default:
        return base;
    }
  }

  private buildPayload(row: RevisarQuestaoRow, formData: any) {
    const payload: any = {
      pergunta: formData.pergunta,
      justificativa_resposta_certa: formData.justificativa_resposta_certa
    };

    switch (row.tipo) {
      case 'multipla':
        payload.alternativa_a = formData.alternativa_a;
        payload.alternativa_b = formData.alternativa_b;
        payload.alternativa_c = formData.alternativa_c;
        payload.alternativa_d = formData.alternativa_d;
        payload.resposta_correta = formData.resposta_correta || 'a';
        return payload;
      case 'vf':
        payload.afirmacao_verdadeira = formData.afirmacao_verdadeira;
        payload.afirmacao_falsa = formData.afirmacao_falsa;
        return payload;
      case 'correlacao':
        try {
          payload.coluna_a = (formData.coluna_a_text || '')
            .split('\n')
            .map((item: string) => item.trim())
            .filter((item: string) => item.length > 0);
          payload.coluna_b = (formData.coluna_b_text || '')
            .split('\n')
            .map((item: string) => item.trim())
            .filter((item: string) => item.length > 0);
          payload.resposta_correta = formData.resposta_correta_text
            ? JSON.parse(formData.resposta_correta_text)
            : {};
        } catch (error) {
          throw new Error('Resposta correta inválida. Use um JSON válido.');
        }
        return payload;
      default:
        return payload;
    }
  }

  onToggleCaiuEmProva(row: RevisarQuestaoRow, value: boolean): void {
    if (!this.isAdmin) {
      return;
    }

    const key = row.uniqueKey;
    if (this.togglingCaiuEmProva.has(key)) {
      return;
    }

    this.togglingCaiuEmProva.add(key);
    this.perguntasService.updatePerguntaCaiuEmProva(row.id, row.tipo, value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updated: Pergunta) => {
          this.applyUpdatedRow(row, updated);
          this.togglingCaiuEmProva.delete(key);
        },
        error: (error: any) => {
          console.error('❌ Erro ao atualizar caiu_em_prova:', error);
          this.togglingCaiuEmProva.delete(key);
        }
      });
  }
}
