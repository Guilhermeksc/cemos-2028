import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Conceitos as ConceitosInterface } from '../../interfaces/informacoes.interface';
import { Bibliografia } from '../../interfaces/perguntas.interface';
import { InformacoesService } from '../../services/informacoes.service';
import { PerguntasService } from '../../services/perguntas.service';
import { ConceitosTableComponent } from '../conceitos-table/conceitos-table';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-conceitos',
  standalone: true,
  imports: [CommonModule, FormsModule, ConceitosTableComponent, MatButtonModule, MatIconModule, MatProgressSpinnerModule, LoadingSpinner],
  templateUrl: './conceitos.html',
  styleUrls: ['./conceitos.scss']
})
export class ConceitosComponent implements OnInit, OnDestroy {

  // Filtros (UI)
  selectedAssunto: string = '';
  assuntosDisponiveis: string[] = [];
  @Input() bibliografiaIds: number[] = []; // IDs das bibliografias a serem exibidas
  @Input() title: string = 'Conceitos'; // Título customizável
  @Input() emptyMessage: string = 'Nenhum conceito encontrado. Adicione conceitos para visualizá-los aqui.';
  // Paths/options to enable navigation buttons
  @Input() conceitosPath: string = '';
  @Input() mediaPath: string = '';
  @Input() perguntasPath: string = '';
  @Input() flashcardsPath: string = '';
  @Input() backToBibliografiaPath: string = ''; // ex: '/home/app6-geopolitica-relacoes-internacionais/bibliografia/vinganca-geografia'
  // Breadcrumb customization (used by parent modules to pass a module name/icon)
  @Input() moduleLabel: string = '';
  @Input() moduleEmoji: string = '';
  @Input() showHeader: boolean = true;
  
  
  conceitos: ConceitosInterface[] = [];
  bibliografias: Bibliografia[] = [];
  selectedBibliografiaId: number | null = null;
  loading: boolean = false;
  error: string | null = null;
  isFullscreen = false;
  isGeneratingPDF: boolean = false;

  // Router injection using functional `inject` (same approach used in flash-cards.ts)
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  // Compatibility alias for templates that use `isLoading` (some templates expect this name)
  get isLoading(): boolean {
    return this.loading;
  }

  set isLoading(value: boolean) {
    this.loading = value;
  }
  constructor(
    private informacoesService: InformacoesService,
    private perguntasService: PerguntasService
  ) {}

  ngOnInit() {
    // Inferir base do módulo para navegação (fallbacks usados pelos botões)
    this.computeModuleBase();

    this.loadData();

    // Escutar eventos de fullscreen para sincronizar o estado
    this.setupFullscreenListeners();
  }

  ngOnDestroy() {
    // Garantir que saia do fullscreen ao destruir o componente
    if (this.isFullscreen) {
      this.exitFullscreen();
    }
    // Garantir que o overflow do body seja restaurado ao destruir o componente
    document.body.style.overflow = '';
    document.body.classList.remove('conceitos-fullscreen-active');
    this.removeFullscreenListeners();
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData() {
    this.loading = true;
    this.error = null;

    // Se não há IDs específicos, carrega todas as bibliografias
    const bibliografiasRequest = this.bibliografiaIds.length > 0 
      ? this.perguntasService.getBibliografias({ page_size: 1000 })
      : this.perguntasService.getBibliografias({ page_size: 1000 });

    // Usar getAllConceitos para buscar todas as páginas automaticamente
    const conceitosRequest = this.informacoesService.getAllConceitos({ page_size: 100 });

    forkJoin({
      bibliografias: bibliografiasRequest,
      conceitos: conceitosRequest
    }).subscribe({
      next: (response) => {
        // getAllConceitos retorna um array direto, não um objeto com results
        const allConceitos = response.conceitos;
        
        // Filtra bibliografias se IDs específicos foram fornecidos
        if (this.bibliografiaIds.length > 0) {
          this.bibliografias = response.bibliografias.results.filter(
            bib => this.bibliografiaIds.includes(bib.id)
          );
          // Filtra conceitos apenas das bibliografias especificadas
          this.conceitos = allConceitos.filter(conceito =>
            this.bibliografiaIds.includes(conceito.bibliografia)
          );
        } else {
          // Filtra apenas bibliografias que têm conceitos
          const conceitosWithBib = allConceitos.map(c => c.bibliografia);
          const uniqueBibIds = [...new Set(conceitosWithBib)];
          this.bibliografias = response.bibliografias.results.filter(
            bib => uniqueBibIds.includes(bib.id)
          );
          this.conceitos = allConceitos;
        }

        // Define a primeira bibliografia como selecionada se houver alguma
        if (this.bibliografias.length > 0) {
          this.selectedBibliografiaId = this.bibliografias[0].id;
        } else {
          this.selectedBibliografiaId = null;
        }

        // Extrair assuntos únicos disponíveis (conforme bibliografia selecionada)
        this.extractAssuntos(this.selectedBibliografiaId);
        
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

  /** Extrai assuntos únicos da lista de conceitos (considera apenas conceitos filtrados por bibliografiaIds) */
  private extractAssuntos(bibliografiaId: number | null = null) {
    const set = new Set<string>();
    // Usa os conceitos já filtrados por bibliografiaIds
    const conceitosParaAnalisar = this.conceitosFiltradosPorBibliografia;

    conceitosParaAnalisar.forEach(c => {
      const matchesBib = bibliografiaId ? c.bibliografia === bibliografiaId : true;
      if (matchesBib && c.assunto && typeof c.assunto === 'string' && c.assunto.trim().length > 0) {
        set.add(c.assunto.trim());
      }
    });

    this.assuntosDisponiveis = Array.from(set).sort();

    // Se o assunto atualmente selecionado não existe mais na lista, resetá-lo
    if (this.selectedAssunto && !this.assuntosDisponiveis.includes(this.selectedAssunto)) {
      this.selectedAssunto = '';
    }
  }

  onBibliografiaChange() {
    // Quando a bibliografia é alterada via select, atualizar a lista de assuntos
    // para conter apenas assuntos daquela bibliografia. Também sincroniza o tab.
    if (this.selectedBibliografiaId) {
      // sincroniza tab
      // (a seleção do tab já é feita pelo método selectBibliografia quando o usuário clica;
      // aqui apenas garantimos que a variável está coerente)
    }
    this.extractAssuntos(this.selectedBibliografiaId);
    // limpar assunto selecionado caso não exista nos novos assuntos
    this.selectedAssunto = '';
  }

  onAssuntoChange() {
    // reload view via getter filteredConceitos
  }

  resetFilters() {
    this.selectedBibliografiaId = null;
    this.selectedAssunto = '';
  }

  selectBibliografia(bibliografiaId: number) {
    this.selectedBibliografiaId = bibliografiaId;
  }

  /**
   * Retorna os conceitos filtrados pelas bibliografias especificadas (se houver bibliografiaIds)
   * antes de aplicar os filtros de UI (bibliografia selecionada e assunto)
   */
  get conceitosFiltradosPorBibliografia(): ConceitosInterface[] {
    if (this.bibliografiaIds.length > 0) {
      return this.conceitos.filter(conceito => 
        this.bibliografiaIds.includes(conceito.bibliografia)
      );
    }
    return this.conceitos;
  }

  get filteredConceitos(): ConceitosInterface[] {
    // Começa com os conceitos já filtrados por bibliografiaIds (se aplicável)
    let list = [...this.conceitosFiltradosPorBibliografia];

    if (this.selectedBibliografiaId) {
      list = list.filter(conceito => conceito.bibliografia === this.selectedBibliografiaId);
    }

    if (this.selectedAssunto && this.selectedAssunto.trim().length > 0) {
      const needle = this.selectedAssunto.trim().toLowerCase();
      list = list.filter(conceito => (conceito.assunto || '').toString().toLowerCase().includes(needle));
    }

    return list;
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
    return this.conceitosFiltradosPorBibliografia.filter(conceito => conceito.bibliografia === bibliografiaId).length;
  }

  getEmptyMessage(): string {
    if (this.bibliografias.length > 1 && this.selectedBibliografia) {
      return `Nenhum conceito encontrado para a bibliografia "${this.selectedBibliografia.titulo}".`;
    }
    return this.emptyMessage;
  }


  private moduleBasePath: string = '/home';

  /**
   * Tenta inferir a base do módulo a partir da URL atual.
   * Exemplo: '/home/app6-geopolitica-relacoes-internacionais/flash-cards' -> '/home/app6-geopolitica-relacoes-internacionais'
   */
  private computeModuleBase() {
    try {
      const url = this.router.url || '';
      const segments = url.split('/').filter(Boolean); // remove empty
      const homeIndex = segments.indexOf('home');
      if (homeIndex >= 0 && segments.length > homeIndex + 1) {
        const moduleSeg = segments[homeIndex + 1];
        this.moduleBasePath = `/home/${moduleSeg}`;
      } else if (segments.length > 0) {
        // Fallback: take first segment as module
        this.moduleBasePath = `/${segments[0]}`;
      } else {
        this.moduleBasePath = '/home';
      }
    } catch (err) {
      console.warn('Não foi possível inferir moduleBasePath da URL:', err);
      this.moduleBasePath = '/home';
    }
  }

  /**
   * Retorna um path para navegação. Se um input específico foi fornecido, usa ele;
   * caso contrário, monta a rota com base no módulo inferido.
   * segment deve ser o segmento final como 'bibliografia', 'media', 'perguntas', 'conceitos' ou 'flash-cards'
   */
  getPath(segment: string): string {
    if (!segment) return '';
    switch (segment) {
      case 'bibliografia':
        return this.backToBibliografiaPath || `${this.moduleBasePath}/bibliografia`;
      case 'flash-cards':
        return this.flashcardsPath || `${this.moduleBasePath}/flash-cards`;
      case 'media':
        return this.mediaPath || `${this.moduleBasePath}/media`;
      case 'perguntas':
        return this.perguntasPath || `${this.moduleBasePath}/perguntas`;
      case 'conceitos':
        return this.conceitosPath || `${this.moduleBasePath}/conceitos`;
      default:
        return `${this.moduleBasePath}/${segment}`;
    }
  }

  /**
   * Navega para um caminho fornecido (aceita caminhos absolutos iniciando com '/')
   */
  navigateTo(path: string) {
    if (!path) return;
    const segments = path.startsWith('/') ? path.substring(1).split('/') : path.split('/');
    this.router.navigate(segments).catch(err => console.error('Erro ao navegar:', err));
  }

  /**
   * Volta para a bibliografia específica quando um path é fornecido.
   * Se `backToBibliografiaPath` não estiver definido, tenta navegar para a home.
   */
  navigateBackToBibliografia() {
    if (this.backToBibliografiaPath) {
      this.navigateTo(this.backToBibliografiaPath);
      return;
    }

    // Se estivermos em um contexto com uma única bibliografia conhecida, podemos
    // tentar navegar para a lista de bibliografias (fallback) — usar '/home' como fallback final.
    if (this.bibliografiaIds.length === 1) {
      // tentativa conservadora: navegar para a rota de bibliografia do módulo pai não é trivial
      // sem informação adicional, então apenas navegar para '/home' como fallback.
      this.router.navigate(['/home']);
      return;
    }

    this.router.navigate(['/home']);
  }

  /**
   * Configura listeners para eventos de fullscreen
   */
  private setupFullscreenListeners() {
    document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange);
  }

  /**
   * Remove listeners de fullscreen
   */
  private removeFullscreenListeners() {
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange);
  }

  /**
   * Handler para mudanças no estado de fullscreen
   */
  private handleFullscreenChange = () => {
    const isCurrentlyFullscreen = !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    );

    if (!isCurrentlyFullscreen && this.isFullscreen) {
      // Sincronizar estado se o usuário saiu do fullscreen via ESC ou outro método
      this.isFullscreen = false;
      document.body.style.overflow = '';
      document.body.classList.remove('conceitos-fullscreen-active');
      
      // Restaurar z-index dos sidenavs
      const sidenavs = document.querySelectorAll('.mat-sidenav, .mat-drawer, mat-sidenav, mat-drawer, .mat-sidenav-container, .mat-drawer-container');
      sidenavs.forEach((el: Element) => {
        (el as HTMLElement).style.zIndex = '';
        (el as HTMLElement).style.pointerEvents = '';
      });
      
      console.log('🖥️ Fullscreen desativado (via evento)');
    }
  }

  /**
   * Abre o modo fullscreen usando a API do navegador
   */
  async openFullscreen() {
    if (this.filteredConceitos.length === 0) {
      return;
    }

    const element = document.documentElement;

    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        // Safari
        await (element as any).webkitRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        // Firefox
        await (element as any).mozRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        // IE/Edge
        await (element as any).msRequestFullscreen();
      } else {
        console.warn('⚠️ Fullscreen API não suportada neste navegador');
        // Fallback para overlay se a API não estiver disponível
        this.isFullscreen = true;
        document.body.style.overflow = 'hidden';
        document.body.classList.add('conceitos-fullscreen-active');
        
        // Forçar z-index baixo em todos os sidenavs do Angular Material
        setTimeout(() => {
          const sidenavs = document.querySelectorAll('.mat-sidenav, .mat-drawer, mat-sidenav, mat-drawer, .mat-sidenav-container, .mat-drawer-container');
          sidenavs.forEach((el: Element) => {
            (el as HTMLElement).style.zIndex = '1';
            (el as HTMLElement).style.pointerEvents = 'none';
          });
          
          // Garantir que o overlay tenha z-index máximo
          const overlay = document.querySelector('.fullscreen-overlay');
          if (overlay) {
            (overlay as HTMLElement).style.zIndex = '2147483647';
            (overlay as HTMLElement).style.pointerEvents = 'auto';
          }
        }, 0);
        return;
      }

      this.isFullscreen = true;
      document.body.style.overflow = 'hidden';
      // Adicionar classe ao body para aplicar estilos globais
      document.body.classList.add('conceitos-fullscreen-active');
      
      // Forçar z-index baixo em todos os sidenavs do Angular Material
      setTimeout(() => {
        const sidenavs = document.querySelectorAll('.mat-sidenav, .mat-drawer, mat-sidenav, mat-drawer, .mat-sidenav-container, .mat-drawer-container');
        sidenavs.forEach((el: Element) => {
          (el as HTMLElement).style.zIndex = '1';
          (el as HTMLElement).style.pointerEvents = 'none';
        });
        
        // Garantir que o overlay tenha z-index máximo
        const overlay = document.querySelector('.fullscreen-overlay');
        if (overlay) {
          (overlay as HTMLElement).style.zIndex = '2147483647';
          (overlay as HTMLElement).style.pointerEvents = 'auto';
        }
      }, 0);
      
      console.log('🖥️ Modo fullscreen ativado');
    } catch (error) {
      console.error('❌ Erro ao entrar em fullscreen:', error);
      // Fallback para overlay em caso de erro
      this.isFullscreen = true;
      document.body.style.overflow = 'hidden';
      document.body.classList.add('conceitos-fullscreen-active');
      
      // Forçar z-index baixo em todos os sidenavs do Angular Material
      setTimeout(() => {
        const sidenavs = document.querySelectorAll('.mat-sidenav, .mat-drawer, mat-sidenav, mat-drawer, .mat-sidenav-container, .mat-drawer-container');
        sidenavs.forEach((el: Element) => {
          (el as HTMLElement).style.zIndex = '1';
          (el as HTMLElement).style.pointerEvents = 'none';
        });
        
        // Garantir que o overlay tenha z-index máximo
        const overlay = document.querySelector('.fullscreen-overlay');
        if (overlay) {
          (overlay as HTMLElement).style.zIndex = '2147483647';
          (overlay as HTMLElement).style.pointerEvents = 'auto';
        }
      }, 0);
    }
  }

  /**
   * Fecha o modo fullscreen
   */
  async closeFullscreen() {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        // Safari
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        // Firefox
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        // IE/Edge
        await (document as any).msExitFullscreen();
      } else {
        // Fallback se não houver API
        this.isFullscreen = false;
        document.body.style.overflow = '';
        document.body.classList.remove('conceitos-fullscreen-active');
        
        // Restaurar z-index dos sidenavs
        const sidenavs = document.querySelectorAll('.mat-sidenav, .mat-drawer, mat-sidenav, mat-drawer, .mat-sidenav-container, .mat-drawer-container');
        sidenavs.forEach((el: Element) => {
          (el as HTMLElement).style.zIndex = '';
          (el as HTMLElement).style.pointerEvents = '';
        });
        return;
      }

      // O estado será atualizado pelo listener de eventos
    } catch (error) {
      console.error('❌ Erro ao sair do fullscreen:', error);
      // Forçar saída mesmo em caso de erro
      this.isFullscreen = false;
      document.body.style.overflow = '';
      document.body.classList.remove('conceitos-fullscreen-active');
      
      // Restaurar z-index dos sidenavs
      const sidenavs = document.querySelectorAll('.mat-sidenav, .mat-drawer, mat-sidenav, mat-drawer, .mat-sidenav-container, .mat-drawer-container');
      sidenavs.forEach((el: Element) => {
        (el as HTMLElement).style.zIndex = '';
        (el as HTMLElement).style.pointerEvents = '';
      });
    }
  }

  /**
   * Alias para closeFullscreen (usado no template)
   */
  exitFullscreen() {
    this.closeFullscreen();
  }

  /**
   * Converte os conceitos filtrados para PDF pesquisável e faz o download
   */
  async downloadAsPDF() {
    if (this.filteredConceitos.length === 0) {
      return;
    }

    this.isGeneratingPDF = true;

    try {
      await this.downloadAsPDFSearchable();
    } catch (error) {
      console.error('❌ Erro ao gerar PDF pesquisável:', error);
      alert('Erro ao gerar PDF. Por favor, tente novamente.');
    } finally {
      this.isGeneratingPDF = false;
    }
  }

  /**
   * Gera PDF pesquisável com os conceitos filtrados
   * Preserva estilos (negrito) e trata emojis corretamente
   */
  private async downloadAsPDFSearchable() {
    if (this.filteredConceitos.length === 0) {
      return;
    }

    const jsPDF = (await import('jspdf')).default;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Configurações de página
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const marginLeft = 15; // Margem esquerda (mantida como estava)
    const marginRight = 5; // Margem direita reduzida até próximo do limite
    const marginTop = 12; // Margem superior aumentada um pouco
    const marginBottom = 5; // Margem inferior reduzida até próximo do limite
    const maxWidth = pageWidth - marginLeft - marginRight;
    let y = marginTop;
    
    // Interface para representar texto com estilo
    interface TextSegment {
      text: string;
      bold: boolean;
      italic: boolean;
    }
    
    // Remove emojis e caracteres especiais problemáticos do texto
    const removeEmojis = (text: string): string => {
      let cleaned = text
        .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
        .replace(/[\u{1F600}-\u{1F64F}]/gu, '')
        .replace(/[\u{1F680}-\u{1F6FF}]/gu, '')
        .replace(/[\u{2600}-\u{26FF}]/gu, '')
        .replace(/[\u{2700}-\u{27BF}]/gu, '')
        .replace(/[\u{1F900}-\u{1F9FF}]/gu, '')
        .replace(/[\u{1FA00}-\u{1FAFF}]/gu, '')
        .replace(/[\u{FE00}-\u{FE0F}]/gu, '')
        .replace(/[\u{200D}]/gu, '')
        .replace(/[\u{FE0F}]/gu, '');
      
      cleaned = cleaned.replace(/[ \t]+/g, ' ');
      return cleaned;
    };
    
    // Extrai texto com estilos de uma string (processa markdown básico)
    const extractTextWithStyles = (text: string): TextSegment[] => {
      if (!text) return [];
      
      const segments: TextSegment[] = [];
      // Processa *texto* para negrito (não greedy para evitar conflitos)
      // Primeiro, preserva quebras de linha substituindo temporariamente
      const textWithPlaceholders = text.replace(/\n/g, ' \n ');
      const parts = textWithPlaceholders.split(/(\*[^*]+\*)/g);
      
      parts.forEach(part => {
        if (!part) return;
        
        // Restaura quebras de linha
        const partWithBreaks = part.replace(/ \n /g, '\n');
        
        const boldMatch = partWithBreaks.match(/^\*(.+)\*$/);
        if (boldMatch) {
          const cleanText = removeEmojis(boldMatch[1]);
          if (cleanText.trim().length > 0 || cleanText.includes('\n')) {
            segments.push({ text: cleanText, bold: true, italic: false });
          }
        } else {
          const cleanText = removeEmojis(partWithBreaks);
          if (cleanText.trim().length > 0 || cleanText.includes('\n')) {
            segments.push({ text: cleanText, bold: false, italic: false });
          }
        }
      });
      
      return segments;
    };
    
    // Renderiza texto com estilos em uma linha
    const renderStyledText = (segments: TextSegment[], x: number, yPos: number, maxLineWidth: number, fontSize: number = 9): number => {
      let currentX = x;
      let currentY = yPos;
      const lineHeight = fontSize * 0.4;
      
      // Coleta todas as palavras de todos os segmentos, respeitando quebras de linha
      const allWords: Array<{text: string, bold: boolean, italic: boolean, isNewLine?: boolean}> = [];
      
      segments.forEach(segment => {
        // Divide por quebras de linha primeiro
        const lines = segment.text.split('\n');
        lines.forEach((line, lineIndex) => {
          if (lineIndex > 0) {
            // Adiciona marcador de quebra de linha
            allWords.push({ text: '', bold: segment.bold, italic: segment.italic, isNewLine: true });
          }
          
          // Processa palavras da linha
          const parts = line.split(/(\s+)/);
          parts.forEach(part => {
            if (part && !/^\s+$/.test(part)) {
              allWords.push({ text: part, bold: segment.bold, italic: segment.italic, isNewLine: false });
            }
          });
        });
      });
      
      if (allWords.length === 0) {
        return currentY;
      }
      
      // Processa palavras linha por linha
      let lineWords: Array<{text: string, bold: boolean, italic: boolean}> = [];
      let lineWidth = 0;
      const spaceWidth = pdf.getTextWidth(' ');
      
      const renderLine = (words: Array<{text: string, bold: boolean, italic: boolean}>) => {
        if (words.length === 0) return;
        
        // Verifica se precisa de nova página
        if (currentY + lineHeight > pageHeight - marginBottom) {
          pdf.addPage();
          currentY = marginTop;
        }
        
        // Renderiza palavras
        let xPos = x;
        words.forEach((word, index) => {
          pdf.setFontSize(fontSize);
          if (word.bold && word.italic) {
            pdf.setFont('helvetica', 'bolditalic');
          } else if (word.bold) {
            pdf.setFont('helvetica', 'bold');
          } else if (word.italic) {
            pdf.setFont('helvetica', 'italic');
          } else {
            pdf.setFont('helvetica', 'normal');
          }
          
          try {
            pdf.text(word.text, xPos, currentY);
            xPos += pdf.getTextWidth(word.text);
            
            // Adiciona espaço entre palavras (exceto após a última palavra)
            if (index < words.length - 1) {
              xPos += spaceWidth;
            }
          } catch (e) {
            console.warn('Erro ao renderizar palavra:', word.text, e);
          }
        });
        
        currentY += lineHeight;
      };
      
      // Agrupa palavras em linhas
      allWords.forEach((word) => {
        // Se for uma quebra de linha explícita, renderiza a linha atual e inicia nova
        if (word.isNewLine) {
          if (lineWords.length > 0) {
            renderLine(lineWords);
            lineWords = [];
            lineWidth = 0;
          }
          return;
        }
        
        pdf.setFontSize(fontSize);
        if (word.bold && word.italic) {
          pdf.setFont('helvetica', 'bolditalic');
        } else if (word.bold) {
          pdf.setFont('helvetica', 'bold');
        } else if (word.italic) {
          pdf.setFont('helvetica', 'italic');
        } else {
          pdf.setFont('helvetica', 'normal');
        }
        
        const wordWidth = pdf.getTextWidth(word.text);
        const newLineWidth = lineWidth + (lineWords.length > 0 ? spaceWidth : 0) + wordWidth;
        
        // Se a palavra não cabe na linha atual, renderiza a linha anterior
        if (newLineWidth > maxLineWidth && lineWords.length > 0) {
          renderLine(lineWords);
          lineWords = [word];
          lineWidth = wordWidth;
        } else {
          lineWords.push(word);
          lineWidth = newLineWidth;
        }
      });
      
      // Renderiza a última linha
      if (lineWords.length > 0) {
        renderLine(lineWords);
      }
      
      return currentY;
    };
    
    // Função para renderizar título e descrição na mesma linha, separados por hífen
    const renderTituloDescricao = (titulo: string, descricao: string, x: number, yPos: number, maxLineWidth: number, fontSize: number = 9, numero?: number): number => {
      let currentX = x;
      let currentY = yPos;
      const lineHeight = fontSize * 0.4;
      
      // Remove emojis e prepara textos
      const tituloText = removeEmojis(titulo);
      const descricaoText = descricao ? removeEmojis(descricao) : '';
      
      // Adiciona número no início se fornecido
      const prefixoNumero = numero !== undefined ? `${numero}. ` : '';
      
      // Se não há descrição, renderiza apenas o número e título
      if (!descricaoText || descricaoText.trim().length === 0) {
        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', 'bold');
        const textoCompleto = prefixoNumero + tituloText;
        const tituloLines = pdf.splitTextToSize(textoCompleto, maxLineWidth);
        tituloLines.forEach((line: string) => {
          if (currentY + lineHeight > pageHeight - marginBottom) {
            pdf.addPage();
            currentY = marginTop;
          }
          pdf.text(line, x, currentY);
          currentY += lineHeight;
        });
        return currentY;
      }
      
      // Processa a descrição preservando formatação markdown básica
      const descricaoSegments = extractTextWithStyles(descricaoText);
      
      // Divide o título em palavras, incluindo o número se houver
      // O número já vem no formato "1. " então vamos preservá-lo como está
      const tituloComNumero = prefixoNumero + tituloText;
      const tituloWords = tituloComNumero.split(/(\s+)/).filter(part => part && !/^\s+$/.test(part));
      
      // Prepara palavras da descrição, tratando quebras de linha
      const descricaoWords: Array<{text: string, bold: boolean, italic: boolean, isNewLine?: boolean}> = [];
      descricaoSegments.forEach(segment => {
        // Divide por quebras de linha primeiro
        const lines = segment.text.split('\n');
        lines.forEach((line, lineIndex) => {
          if (lineIndex > 0) {
            // Adiciona marcador de quebra de linha
            descricaoWords.push({ text: '', bold: segment.bold, italic: segment.italic, isNewLine: true });
          }
          
          // Processa palavras da linha
          const words = line.split(/(\s+)/);
          words.forEach(word => {
            if (word && !/^\s+$/.test(word)) {
              descricaoWords.push({ text: word, bold: segment.bold, italic: segment.italic, isNewLine: false });
            }
          });
        });
      });
      
      // Combina título + " - " + descrição
      const allWords: Array<{text: string, bold: boolean, italic: boolean, isNewLine?: boolean}> = [];
      
      // Adiciona palavras do título (todas em negrito, incluindo o número)
      tituloWords.forEach(word => {
        allWords.push({ text: word, bold: true, italic: false, isNewLine: false });
      });
      
      // Adiciona separador " - " apenas na primeira linha
      allWords.push({ text: '-', bold: false, italic: false, isNewLine: false });
      
      // Adiciona palavras da descrição (com seus estilos)
      descricaoWords.forEach(word => {
        allWords.push(word);
      });
      
      // Renderiza linha por linha
      let lineWords: Array<{text: string, bold: boolean, italic: boolean}> = [];
      let lineWidth = 0;
      const spaceWidth = pdf.getTextWidth(' ');
      
      const renderLine = (words: Array<{text: string, bold: boolean, italic: boolean}>) => {
        if (words.length === 0) return;
        
        if (currentY + lineHeight > pageHeight - marginBottom) {
          pdf.addPage();
          currentY = marginTop;
        }
        
        let xPos = x;
        words.forEach((word, index) => {
          pdf.setFontSize(fontSize);
          if (word.bold && word.italic) {
            pdf.setFont('helvetica', 'bolditalic');
          } else if (word.bold) {
            pdf.setFont('helvetica', 'bold');
          } else if (word.italic) {
            pdf.setFont('helvetica', 'italic');
          } else {
            pdf.setFont('helvetica', 'normal');
          }
          
          try {
            pdf.text(word.text, xPos, currentY);
            xPos += pdf.getTextWidth(word.text);
            
            if (index < words.length - 1) {
              xPos += spaceWidth;
            }
          } catch (e) {
            console.warn('Erro ao renderizar palavra:', word.text, e);
          }
        });
        
        currentY += lineHeight;
      };
      
      // Agrupa palavras em linhas
      allWords.forEach((word) => {
        // Se for uma quebra de linha explícita, renderiza a linha atual e inicia nova
        if (word.isNewLine) {
          if (lineWords.length > 0) {
            renderLine(lineWords);
            lineWords = [];
            lineWidth = 0;
          }
          return;
        }
        
        pdf.setFontSize(fontSize);
        if (word.bold && word.italic) {
          pdf.setFont('helvetica', 'bolditalic');
        } else if (word.bold) {
          pdf.setFont('helvetica', 'bold');
        } else if (word.italic) {
          pdf.setFont('helvetica', 'italic');
        } else {
          pdf.setFont('helvetica', 'normal');
        }
        
        const wordWidth = pdf.getTextWidth(word.text);
        const newLineWidth = lineWidth + (lineWords.length > 0 ? spaceWidth : 0) + wordWidth;
        
        // Se a palavra não cabe na linha atual, renderiza a linha anterior
        if (newLineWidth > maxLineWidth && lineWords.length > 0) {
          renderLine(lineWords);
          lineWords = [word];
          lineWidth = wordWidth;
        } else {
          lineWords.push(word);
          lineWidth = newLineWidth;
        }
      });
      
      if (lineWords.length > 0) {
        renderLine(lineWords);
      }
      
      return currentY;
    };
    
    // Título do documento
    pdf.setFontSize(14); // Reduzido de 18
    pdf.setFont('helvetica', 'bold');
    const title = this.moduleLabel || 'Conceitos';
    const titleText = removeEmojis(title);
    pdf.text(titleText, marginLeft, y);
    y += 6; // Reduzido de 10
    
    // Informações de filtros aplicados
    if (this.selectedBibliografia || this.selectedAssunto) {
      pdf.setFontSize(8); // Reduzido de 10
      pdf.setFont('helvetica', 'normal');
      let filterInfo = 'Filtros aplicados: ';
      if (this.selectedBibliografia) {
        filterInfo += `Bibliografia: ${removeEmojis(this.selectedBibliografia.titulo)}`;
      }
      if (this.selectedAssunto) {
        if (this.selectedBibliografia) filterInfo += ' | ';
        filterInfo += `Assunto: ${removeEmojis(this.selectedAssunto)}`;
      }
      pdf.text(filterInfo, marginLeft, y);
      y += 3; // Reduzido de 8
    }
    
    // Espaço entre filtros e primeiro assunto
    y += 6;
    
    // Agrupa conceitos por assunto
    const conceitosPorAssunto = new Map<string, ConceitosInterface[]>();
    const conceitosSemAssunto: ConceitosInterface[] = [];
    
    this.filteredConceitos.forEach(conceito => {
      const assunto = conceito.assunto?.trim() || '';
      if (assunto) {
        if (!conceitosPorAssunto.has(assunto)) {
          conceitosPorAssunto.set(assunto, []);
        }
        conceitosPorAssunto.get(assunto)!.push(conceito);
      } else {
        conceitosSemAssunto.push(conceito);
      }
    });
    
    // Ordena os assuntos alfabeticamente
    const assuntosOrdenados = Array.from(conceitosPorAssunto.keys()).sort();
    
      // Contador incremental para numerar os conceitos
    let conceitoNumero = 1;
    
    // Processa cada grupo de assunto
    assuntosOrdenados.forEach((assunto, assuntoIndex) => {
      const conceitosDoAssunto = conceitosPorAssunto.get(assunto)!;
      
      // Verifica se precisa de nova página antes de adicionar o título do assunto
      if (y + 15 > pageHeight - marginBottom) {
        pdf.addPage();
        y = marginTop;
      }
      
      // Título do assunto (em negrito, maior e centralizado)
      pdf.setFontSize(12); // Tamanho maior para o título do assunto
      pdf.setFont('helvetica', 'bold');
      const assuntoText = removeEmojis(assunto);
      const assuntoLines = pdf.splitTextToSize(assuntoText, maxWidth);
      assuntoLines.forEach((line: string) => {
        if (y + 6 > pageHeight - marginBottom) {
          pdf.addPage();
          y = marginTop;
        }
        pdf.text(line, pageWidth / 2, y, { align: 'center' });
        y += 6;
      });
      
      // Espaço após o título do assunto (sem linha separadora)
      y += 4;
      
      // Processa cada conceito do assunto
      conceitosDoAssunto.forEach((conceito, conceitoIndex) => {
        // Verifica se precisa de nova página
        if (y + 20 > pageHeight - marginBottom) {
          pdf.addPage();
          y = marginTop;
        }
        
        // Título e descrição na mesma linha, separados por hífen, com número incremental
        y = renderTituloDescricao(
          conceito.titulo,
          conceito.descricao || '',
          marginLeft,
          y,
          maxWidth,
          9, // Mesmo tamanho de fonte para título e descrição
          conceitoNumero // Número incremental
        );
        
        // Incrementa o contador para o próximo conceito
        conceitoNumero++;
        
        // Espaço mínimo entre conceitos
        y += 1;
      });
      
      // Espaço maior entre assuntos diferentes (exceto no último)
      if (assuntoIndex < assuntosOrdenados.length - 1 || conceitosSemAssunto.length > 0) {
        y += 8; // Espaço maior entre seções de assunto
      }
    });
    
    // Processa conceitos sem assunto (se houver)
    if (conceitosSemAssunto.length > 0) {
      // Verifica se precisa de nova página antes de adicionar o título
      if (y + 15 > pageHeight - marginBottom) {
        pdf.addPage();
        y = marginTop;
      }
      
      // Título para conceitos sem assunto (centralizado)
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      const semAssuntoText = 'Sem Assunto';
      pdf.text(semAssuntoText, pageWidth / 2, y, { align: 'center' });
      y += 6;
      
      // Espaço após o título (sem linha separadora)
      y += 4;
      
      // Processa cada conceito sem assunto
      conceitosSemAssunto.forEach((conceito, conceitoIndex) => {
        // Verifica se precisa de nova página
        if (y + 20 > pageHeight - marginBottom) {
          pdf.addPage();
          y = marginTop;
        }
        
        // Título e descrição na mesma linha, separados por hífen, com número incremental
        y = renderTituloDescricao(
          conceito.titulo,
          conceito.descricao || '',
          marginLeft,
          y,
          maxWidth,
          9, // Mesmo tamanho de fonte para título e descrição
          conceitoNumero // Número incremental
        );
        
        // Incrementa o contador para o próximo conceito
        conceitoNumero++;
        
        // Espaço mínimo entre conceitos
        y += 1;
      });
    }
    
    // Função para remover acentos e caracteres especiais
    const removeAccents = (str: string): string => {
      return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/gi, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();
    };
    
    // Gera o nome do arquivo
    let fileName = 'conceitos';
    if (this.selectedBibliografia) {
      fileName = removeAccents(this.selectedBibliografia.titulo);
    } else if (this.moduleLabel) {
      fileName = removeAccents(this.moduleLabel);
    }
    if (this.selectedAssunto) {
      fileName += '-' + removeAccents(this.selectedAssunto);
    }
    fileName += '.pdf';
    
    // Faz o download
    pdf.save(fileName);
    
    console.log('✅ PDF pesquisável gerado com sucesso:', fileName);
  }
}
