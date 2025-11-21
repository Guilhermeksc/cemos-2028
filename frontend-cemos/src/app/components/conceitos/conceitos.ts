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
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-conceitos',
  standalone: true,
  imports: [CommonModule, FormsModule, ConceitosTableComponent, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
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
    const margin = 15; // Margem reduzida para usar mais espaço
    const maxWidth = pageWidth - (margin * 2);
    let y = margin;
    
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
        if (currentY + lineHeight > pageHeight - margin) {
          pdf.addPage();
          currentY = margin;
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
    
    // Título do documento
    pdf.setFontSize(14); // Reduzido de 18
    pdf.setFont('helvetica', 'bold');
    const title = this.moduleLabel || 'Conceitos';
    const titleText = removeEmojis(title);
    pdf.text(titleText, margin, y);
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
      pdf.text(filterInfo, margin, y);
      y += 5; // Reduzido de 8
    }
    
    // Linha separadora
    y += 1; // Reduzido de 2
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.3); // Reduzido de 0.5
    pdf.line(margin, y, pageWidth - margin, y);
    y += 4; // Reduzido de 5
    
    // Processa cada conceito
    this.filteredConceitos.forEach((conceito, index) => {
      // Verifica se precisa de nova página
      if (y + 20 > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      
      // Título do conceito (em negrito e vermelho simulado com fonte maior)
      pdf.setFontSize(11); // Reduzido de 14
      pdf.setFont('helvetica', 'bold');
      const tituloText = removeEmojis(conceito.titulo);
      const tituloLines = pdf.splitTextToSize(tituloText, maxWidth);
      tituloLines.forEach((line: string) => {
        if (y + 5 > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, margin, y);
        y += 5; // Reduzido de 6
      });
      
      // Meta informações (palavra-chave e assunto)
      if (conceito.palavra_chave || conceito.assunto) {
        pdf.setFontSize(7); // Reduzido de 9
        pdf.setFont('helvetica', 'italic');
        let metaText = '';
        if (conceito.palavra_chave) {
          metaText += `(${removeEmojis(conceito.palavra_chave)})`;
        }
        if (conceito.assunto) {
          if (metaText) metaText += ' ';
          metaText += `Assunto: ${removeEmojis(conceito.assunto)}`;
        }
        if (metaText) {
          if (y + 4 > pageHeight - margin) {
            pdf.addPage();
            y = margin;
          }
          pdf.text(metaText, margin, y);
          y += 4; // Reduzido de 5
        }
      }
      
      // Descrição
      if (conceito.descricao && conceito.descricao.trim().length > 0) {
        pdf.setFontSize(9); // Reduzido de 11
        pdf.setFont('helvetica', 'normal');
        
        // Processa a descrição preservando formatação markdown e quebras de linha
        const segments = extractTextWithStyles(conceito.descricao);
        
        if (segments.length > 0) {
          y = renderStyledText(segments, margin, y, maxWidth, 9); // Reduzido de 11
        } else {
          // Fallback para texto simples
          const descricaoText = removeEmojis(conceito.descricao);
          // Processa quebras de linha manualmente
          const lines = descricaoText.split('\n');
          lines.forEach((line: string) => {
            if (line.trim().length === 0) {
              y += 2; // Reduzido de 3 - Espaço para linha vazia
              return;
            }
            const wrappedLines = pdf.splitTextToSize(line, maxWidth);
            wrappedLines.forEach((wrappedLine: string) => {
              if (y + 5 > pageHeight - margin) {
                pdf.addPage();
                y = margin;
              }
              pdf.text(wrappedLine, margin, y);
              y += 5; // Reduzido de 7
            });
          });
        }
      } else {
        pdf.setFontSize(8); // Reduzido de 10
        pdf.setFont('helvetica', 'italic');
        pdf.setTextColor(150, 150, 150);
        if (y + 4 > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text('Sem descrição', margin, y);
        pdf.setTextColor(0, 0, 0);
        y += 4; // Reduzido de 5
      }
      
      // Espaço entre conceitos
      y += 5; // Reduzido de 8
      
      // Linha separadora entre conceitos (exceto no último)
      if (index < this.filteredConceitos.length - 1) {
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.15); // Reduzido de 0.2
        pdf.line(margin, y - 3, pageWidth - margin, y - 3);
        y += 1; // Reduzido de 2
      }
    });
    
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
