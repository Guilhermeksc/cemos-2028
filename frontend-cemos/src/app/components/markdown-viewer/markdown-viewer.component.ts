import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subject, Observable, forkJoin } from 'rxjs';
import { takeUntil, switchMap, finalize } from 'rxjs/operators';

import { PerguntasService } from '../../services/perguntas.service';
import { LivroIndividualService } from '../../services/livro-individual.service';
import { AuthService } from '../../services/auth.service';
import { Pergunta, PerguntaHighlightRange, MarkdownAggregatedHighlight, PerguntaHighlightPayload } from '../../interfaces/perguntas.interface';

type RenderableHighlight = PerguntaHighlightRange & {
  color: string;
  perguntaId?: number;
  perguntaTipo?: 'multipla' | 'vf' | 'correlacao';
};

type TextSegment = {
  node: Text;
  start: number;
  end: number;
};

@Component({
  selector: 'app-markdown-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule],
  templateUrl: './markdown-viewer.component.html',
  styleUrl: './markdown-viewer.component.scss'
})
export class MarkdownViewerComponent implements OnInit, OnDestroy {
  @ViewChild('markdownContainer') markdownContainer?: ElementRef<HTMLDivElement>;

  private perguntasService = inject(PerguntasService);
  private livroService = inject(LivroIndividualService);
  private authService = inject(AuthService);
  private sanitizer = inject(DomSanitizer);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();

  tipo: 'multipla' | 'vf' | 'correlacao' = 'multipla';
  questionId = 0;
  question: Pergunta | null = null;

  isAdmin = false;
  isLoadingQuestion = true;
  isLoadingMarkdown = false;
  savingHighlight = false;
  showGlobalHighlights = false;

  errorMessage: string | null = null;
  markdownHtml: SafeHtml | null = null;
  rawHtml = '';
  questionHighlights: PerguntaHighlightRange[] = [];
  globalHighlights: MarkdownAggregatedHighlight[] = [];
  pendingHighlight: PerguntaHighlightRange | null = null;
  globalActionInProgress = false;
  globalActionTarget: string | null = null;

  readonly defaultColor = '#fff59d';
  private readonly tipoColorMap: Record<'multipla' | 'vf' | 'correlacao', string> = {
    vf: '#fff9c4',
    multipla: '#c8e6c9',
    correlacao: '#bbdefb'
  };
  readonly legendEntries = [
    { tipo: 'vf' as const, label: 'Questões V/F', color: '#fff9c4' },
    { tipo: 'multipla' as const, label: 'Questões de múltipla escolha', color: '#c8e6c9' },
    { tipo: 'correlacao' as const, label: 'Questões de correlação', color: '#bbdefb' }
  ];

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.isAdmin = !!user?.is_staff;
      });

    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const tipoParam = params.get('tipo');
        const idParam = Number(params.get('id'));
        if (!tipoParam || !['multipla', 'vf', 'correlacao'].includes(tipoParam) || !idParam) {
          this.errorMessage = 'Parâmetros inválidos na URL.';
          this.isLoadingQuestion = false;
          return;
        }
        this.tipo = tipoParam as 'multipla' | 'vf' | 'correlacao';
        this.questionId = idParam;
        this.loadQuestion();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadQuestion(): void {
    this.isLoadingQuestion = true;
    this.errorMessage = null;
    const request = this.getQuestionRequest();
    request.pipe(takeUntil(this.destroy$)).subscribe({
      next: (question) => {
        this.question = question;
        this.questionHighlights = [...(question.markdown_highlights || [])];
        this.logHighlightDiagnostics('Resposta /perguntas-*/<id>', this.questionHighlights);
        this.isLoadingQuestion = false;

        if (!question.markdown_file) {
          console.warn(
            '[MarkdownViewer] Pergunta %s não possui markdown_file herdado do assunto %s.',
            question.id,
            question.assunto_titulo || '(sem assunto)'
          );
          this.errorMessage = 'O assunto desta pergunta não possui um arquivo Markdown configurado. Atualize o campo "Arquivo Markdown" no cadastro do capítulo.';
          return;
        }

        this.loadMarkdown(question.markdown_file);
        this.loadGlobalHighlights(question.markdown_file);
      },
      error: () => {
        this.errorMessage = 'Não foi possível carregar a pergunta.';
        this.isLoadingQuestion = false;
      }
    });
  }

  private getQuestionRequest(tipo: 'multipla' | 'vf' | 'correlacao' = this.tipo, id: number = this.questionId): Observable<Pergunta> {
    switch (tipo) {
      case 'vf':
        return this.perguntasService.getPerguntaVF(id);
      case 'correlacao':
        return this.perguntasService.getPerguntaCorrelacao(id);
      default:
        return this.perguntasService.getPerguntaMultipla(id);
    }
  }

  private loadMarkdown(path: string): void {
    this.isLoadingMarkdown = true;
    const publicPath = this.normalizeMarkdownPath(path);
    const basePath = this.extractBasePath(publicPath);

    this.livroService.loadMarkdownFile(publicPath)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (markdown) => {
          const html = this.livroService.markdownToHtml(markdown, basePath);
          this.rawHtml = html;
          this.markdownHtml = this.sanitizer.bypassSecurityTrustHtml(html);
          this.isLoadingMarkdown = false;
          this.cdr.markForCheck();
          setTimeout(() => this.applyHighlights(), 50);
        },
        error: (err) => {
          this.isLoadingMarkdown = false;
          console.error(
            '[MarkdownViewer] Falha ao carregar arquivo Markdown %s para pergunta %s: %o',
            publicPath,
            this.question?.id,
            err
          );
          this.errorMessage = `Não foi possível carregar o arquivo Markdown vinculado (${publicPath}). Verifique se o caminho existe em public/assets/content.`;
        }
      });
  }

  private loadGlobalHighlights(path: string): void {
    if (!path) {
      this.globalHighlights = [];
      this.applyHighlights();
      return;
    }
    const normalized = path.replace(/^\/+/, '');
    this.perguntasService.listarHighlightsPorArquivo(normalized)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.globalHighlights = response.results || [];
          console.debug('[MarkdownViewer] Highlights globais carregados:', this.globalHighlights.length);
          this.logAggregatedHighlightDiagnostics('Highlights globais', this.globalHighlights);
          this.applyHighlights();
        },
        error: (err) => {
          console.error('[MarkdownViewer] Não foi possível carregar highlights globais para', normalized, err);
        }
      });
  }

  toggleGlobalHighlights(): void {
    this.showGlobalHighlights = !this.showGlobalHighlights;
    console.debug('[MarkdownViewer] Toggle global highlights', this.showGlobalHighlights ? 'expandindo' : 'colapsando');
  }

  onMarkdownMouseUp(): void {
    if (!this.isAdmin || !this.markdownContainer) {
      return;
    }

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      return;
    }

    const range = selection.getRangeAt(0);
    if (!this.markdownContainer.nativeElement.contains(range.commonAncestorContainer)) {
      return;
    }

    const offsets = this.getOffsetsFromRange(this.markdownContainer.nativeElement, range);
    const selectedText = selection.toString().trim();
    if (!offsets || !selectedText) {
      return;
    }

    const defaultColor = this.tipoColorMap[this.tipo] || this.defaultColor;
    this.pendingHighlight = {
      id: `hl-${Date.now()}`,
      text: selectedText,
      start_offset: offsets.start,
      end_offset: offsets.end,
      heading_id: this.getHeadingFromRange(range)?.id || null,
      note: '',
      color: defaultColor
    };

    console.debug('[MarkdownViewer] Seleção capturada', {
      textPreview: selectedText.slice(0, 80),
      start: offsets.start,
      end: offsets.end,
      headingId: this.pendingHighlight.heading_id,
      color: this.pendingHighlight.color
    });
  }

  savePendingHighlight(): void {
    if (!this.pendingHighlight || !this.question) {
      return;
    }
    this.persistHighlights([...this.questionHighlights, this.pendingHighlight]);
  }

  removeHighlight(highlight: PerguntaHighlightRange): void {
    if (!this.isAdmin || !this.question) {
      return;
    }
    const updated = this.questionHighlights.filter(h => h.id !== highlight.id);
    this.persistHighlights(updated);
  }

  clearAllHighlights(): void {
    if (!this.isAdmin || !this.question || this.questionHighlights.length === 0) {
      return;
    }
    if (confirm('Remover todas as marcações deste arquivo?')) {
      this.persistHighlights([]);
    }
  }

  removeGlobalHighlight(entry: MarkdownAggregatedHighlight): void {
    if (!this.isAdmin || this.globalActionInProgress) {
      return;
    }
    this.globalActionInProgress = true;
    this.globalActionTarget = `${entry.pergunta_tipo}-${entry.pergunta_id}-${entry.highlight.id}`;

    this.getQuestionRequest(entry.pergunta_tipo, entry.pergunta_id)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(pergunta => {
          const updated = (pergunta.markdown_highlights || []).filter(h => h.id !== entry.highlight.id);
          if (!pergunta.markdown_file) {
            throw new Error('Pergunta sem arquivo Markdown configurado.');
          }
          return this.perguntasService.salvarMarcacaoPergunta(entry.pergunta_tipo, entry.pergunta_id, {
            markdown_file: pergunta.markdown_file,
            markdown_highlights: updated
          });
        }),
        finalize(() => {
          this.globalActionInProgress = false;
          this.globalActionTarget = null;
        })
      )
      .subscribe({
        next: (updatedPergunta) => {
          if (this.question && updatedPergunta.id === this.question.id) {
            this.question = updatedPergunta;
            this.questionHighlights = [...(updatedPergunta.markdown_highlights || [])];
            this.applyHighlights();
          }
          this.loadGlobalHighlights(this.question?.markdown_file || '');
        },
        error: (err) => {
          console.error('[MarkdownViewer] Falha ao remover marcação agregada', entry, err);
          this.errorMessage = 'Não foi possível remover a marcação selecionada.';
        }
      });
  }

  clearAllHighlightsForPage(): void {
    if (!this.isAdmin || this.globalHighlights.length === 0 || this.globalActionInProgress) {
      return;
    }
    if (!confirm('Remover TODAS as marcações deste arquivo para todas as perguntas relacionadas?')) {
      return;
    }

    this.globalActionInProgress = true;
    this.globalActionTarget = 'clear-page';

    const questionMap = new Map<string, { tipo: 'multipla' | 'vf' | 'correlacao'; id: number }>();
    this.globalHighlights.forEach(entry => {
      const key = `${entry.pergunta_tipo}-${entry.pergunta_id}`;
      if (!questionMap.has(key)) {
        questionMap.set(key, { tipo: entry.pergunta_tipo, id: entry.pergunta_id });
      }
    });

    const operations = Array.from(questionMap.values()).map(({ tipo, id }) =>
      this.getQuestionRequest(tipo, id).pipe(
        switchMap(pergunta => {
          if (!pergunta.markdown_file) {
            throw new Error('Pergunta sem arquivo Markdown configurado.');
          }
          return this.perguntasService.salvarMarcacaoPergunta(tipo, id, {
            markdown_file: pergunta.markdown_file,
            markdown_highlights: []
          });
        })
      )
    );

    forkJoin(operations)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.globalActionInProgress = false;
          this.globalActionTarget = null;
        })
      )
      .subscribe({
        next: (responses) => {
          const updatedCurrent = responses.find(pergunta => pergunta.id === this.question?.id);
          if (updatedCurrent) {
            this.question = updatedCurrent;
            this.questionHighlights = [...(updatedCurrent.markdown_highlights || [])];
          }
          this.loadGlobalHighlights(this.question?.markdown_file || '');
          this.applyHighlights();
        },
        error: (err) => {
          console.error('[MarkdownViewer] Falha ao limpar marcações do arquivo', err);
          this.errorMessage = 'Não foi possível limpar todas as marcações deste arquivo. Tente novamente.';
        }
      });
  }

  private persistHighlights(highlights: PerguntaHighlightRange[]): void {
    if (!this.question || !this.question.markdown_file) {
      return;
    }
    this.savingHighlight = true;
    const payload: PerguntaHighlightPayload = {
      markdown_file: this.question.markdown_file,
      markdown_highlights: highlights
    };

    console.groupCollapsed('[MarkdownViewer] Enviando salvarMarcacaoPergunta');
    console.debug('Pergunta', this.question.id, 'Tipo', this.tipo);
    this.logHighlightDiagnostics('Payload', payload.markdown_highlights || []);
    console.groupEnd();

    this.perguntasService.salvarMarcacaoPergunta(this.tipo, this.question.id, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updated) => {
          console.groupCollapsed('[MarkdownViewer] Resposta salvarMarcacaoPergunta recebida');
          this.logHighlightDiagnostics('Resposta', updated.markdown_highlights || []);
          console.groupEnd();
          this.question = updated;
          this.questionHighlights = [...(updated.markdown_highlights || [])];
          this.pendingHighlight = null;
          this.savingHighlight = false;
          this.loadGlobalHighlights(updated.markdown_file || '');
          this.applyHighlights();
        },
        error: () => {
          this.savingHighlight = false;
          this.errorMessage = 'Não foi possível salvar a marcação. Tente novamente.';
        }
      });
  }

  private applyHighlights(): void {
    if (!this.rawHtml) {
      console.debug('[MarkdownViewer] HTML bruto ainda não carregado; adiando aplicação de highlights.');
      return;
    }

    const container = this.markdownContainer?.nativeElement;
    if (!container) {
      console.warn('[MarkdownViewer] container do markdown não encontrado, abortando highlights.');
      return;
    }

    container.innerHTML = this.rawHtml;

    const highlights = this.buildRenderableHighlights();
    if (highlights.length === 0) {
      console.debug('[MarkdownViewer] Nenhuma marcação disponível, mantendo HTML original.');
      return;
    }

    console.debug('[MarkdownViewer] Aplicando', highlights.length, 'highlights globais/localizados.');
    highlights.forEach(highlight => this.applyHighlightToContainer(container, highlight));

    console.debug('[MarkdownViewer] HTML atualizado com highlights aplicados.');
  }

  private buildRenderableHighlights(): RenderableHighlight[] {
    const merged: RenderableHighlight[] = [];
    const seen = new Set<string>();

    this.globalHighlights.forEach(entry => {
      const key = `${entry.pergunta_id}:${entry.highlight.id}`;
      if (seen.has(key)) {
        return;
      }
      seen.add(key);
      merged.push({
        ...entry.highlight,
        color: entry.highlight.color || this.getTipoColor(entry.pergunta_tipo),
        perguntaId: entry.pergunta_id,
        perguntaTipo: entry.pergunta_tipo
      });
    });

    if (this.question) {
      this.questionHighlights.forEach(highlight => {
        const key = `${this.question!.id}:${highlight.id}`;
        if (seen.has(key)) {
          return;
        }
        merged.push({
          ...highlight,
          color: highlight.color || this.getTipoColor(this.question!.tipo),
          perguntaId: this.question!.id,
          perguntaTipo: this.question!.tipo
        });
      });
    }

    return merged.sort((a, b) => {
      if (a.start_offset === b.start_offset) {
        return a.end_offset - b.end_offset;
      }
      return a.start_offset - b.start_offset;
    });
  }

  private applyHighlightToContainer(container: HTMLElement, highlight: RenderableHighlight): void {
    const segments = this.collectTextSegments(container, highlight.start_offset, highlight.end_offset);
    if (segments.length === 0) {
      console.warn(
        '[MarkdownViewer] Não foi possível localizar texto para highlight %s (start=%s, end=%s).',
        highlight.id,
        highlight.start_offset,
        highlight.end_offset
      );
      return;
    }

    segments.forEach(segment => {
      const range = document.createRange();
      range.setStart(segment.node, segment.start);
      range.setEnd(segment.node, segment.end);
      const mark = this.createHighlightElement(highlight);
      try {
        range.surroundContents(mark);
      } catch (error) {
        console.warn('[MarkdownViewer] Falha ao envolver trecho do highlight', highlight.id, error);
      }
    });

    console.debug('[MarkdownViewer] Highlight aplicado', highlight.id, highlight.text, 'segmentos:', segments.length);
  }

  private collectTextSegments(container: HTMLElement, start: number, end: number): TextSegment[] {
    if (start >= end) {
      return [];
    }

    const segments: TextSegment[] = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    let currentOffset = 0;

    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      const length = node.textContent?.length ?? 0;
      const nodeStart = currentOffset;
      const nodeEnd = nodeStart + length;

      if (nodeEnd <= start) {
        currentOffset = nodeEnd;
        continue;
      }

      if (nodeStart >= end) {
        break;
      }

      const segmentStart = Math.max(start, nodeStart) - nodeStart;
      const segmentEnd = Math.min(end, nodeEnd) - nodeStart;

      if (segmentStart !== segmentEnd) {
        segments.push({ node, start: segmentStart, end: segmentEnd });
      }

      currentOffset = nodeEnd;
    }

    return segments;
  }

  private createHighlightElement(highlight: RenderableHighlight): HTMLElement {
    const mark = document.createElement('mark');
    mark.classList.add('markdown-highlight');
    const resolvedColor = highlight.color || this.defaultColor;
    mark.style.setProperty('background', resolvedColor);
    mark.style.setProperty('background-color', resolvedColor);
    mark.dataset['highlightId'] = highlight.id;
    return mark;
  }

  private getOffsetsFromRange(container: HTMLElement, range: Range): { start: number; end: number } | null {
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    let currentOffset = 0;
    let start = -1;
    let end = -1;

    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      if (node === range.startContainer) {
        start = currentOffset + range.startOffset;
      }
      if (node === range.endContainer) {
        end = currentOffset + range.endOffset;
        break;
      }
      currentOffset += node.textContent?.length ?? 0;
    }

    if (start === -1 || end === -1) {
      return null;
    }

    return end >= start ? { start, end } : { start: end, end: start };
  }

  private getHeadingFromRange(range: Range): HTMLElement | null {
    const containerNode = range.startContainer instanceof HTMLElement
      ? range.startContainer
      : range.startContainer.parentElement;
    return containerNode ? containerNode.closest('h1,h2,h3,h4,h5,h6') : null;
  }

  private normalizeMarkdownPath(path: string): string {
    let sanitized = path.replace(/\\/g, '/').trim();
    sanitized = sanitized.replace('frontend-cemos/public/assets/content/', '');
    sanitized = sanitized.replace('public/assets/content/', '');
    if (sanitized.startsWith('/')) {
      sanitized = sanitized.replace(/^\/+/, '');
    }
    if (!sanitized.startsWith('assets/')) {
      sanitized = `assets/content/${sanitized}`;
    }
    console.debug('[MarkdownViewer] Caminho normalizado:', path, '->', sanitized);
    return sanitized;
  }

  private extractBasePath(path: string): string {
    const idx = path.lastIndexOf('/');
    return idx > 0 ? path.substring(0, idx) : 'assets/content';
  }

  closeWindow(): void {
    window.close();
  }

  getTipoColor(tipo: 'multipla' | 'vf' | 'correlacao'): string {
    return this.tipoColorMap[tipo] || this.defaultColor;
  }

  getTipoLabel(tipo: 'multipla' | 'vf' | 'correlacao'): string {
    switch (tipo) {
      case 'vf':
        return 'Verdadeiro ou Falso';
      case 'multipla':
        return 'Múltipla escolha';
      case 'correlacao':
        return 'Correlação';
      default:
        return tipo;
    }
  }

  get sortedGlobalHighlights(): MarkdownAggregatedHighlight[] {
    return [...this.globalHighlights].sort(
      (a, b) => (a.highlight.start_offset - b.highlight.start_offset)
    );
  }

  private logHighlightDiagnostics(source: string, highlights: PerguntaHighlightRange[] | null | undefined): void {
    const list = highlights || [];
    console.groupCollapsed(`[MarkdownViewer] ${source} · ${list.length} itens`);
    if (list.length === 0) {
      console.debug('Sem marcações para inspecionar.');
      console.groupEnd();
      return;
    }
    const table = list.map((highlight, index) => ({
      index,
      id: highlight.id,
      start: highlight.start_offset,
      end: highlight.end_offset,
      color: highlight.color || '(sem cor)'
    }));
    console.table(table);
    const missingColor = table.filter(item => item.color === '(sem cor)');
    if (missingColor.length > 0) {
      console.warn(`[MarkdownViewer] ${source} possui ${missingColor.length} marcações sem cor configurada.`, missingColor.map(item => item.id));
    }
    console.groupEnd();
  }

  private logAggregatedHighlightDiagnostics(source: string, entries: MarkdownAggregatedHighlight[] | null | undefined): void {
    const list = entries || [];
    console.groupCollapsed(`[MarkdownViewer] ${source} · ${list.length} entradas`);
    if (list.length === 0) {
      console.debug('Sem dados agregados.');
      console.groupEnd();
      return;
    }
    const table = list.map(entry => ({
      pergunta: `${entry.pergunta_tipo}#${entry.pergunta_id}`,
      id: entry.highlight.id,
      start: entry.highlight.start_offset,
      end: entry.highlight.end_offset,
      color: entry.highlight.color || '(sem cor)'
    }));
    console.table(table);
    const missingColor = table.filter(item => item.color === '(sem cor)');
    if (missingColor.length > 0) {
      console.warn(`[MarkdownViewer] ${source} contém ${missingColor.length} marcações sem cor.`, missingColor.map(item => item.pergunta));
    }
    console.groupEnd();
  }
}
