import { Component, OnInit, OnDestroy, AfterViewInit, signal, inject, ViewChild, Input, Output, EventEmitter, computed, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { RevisaoService } from '../../../../../services/revisao.service';
import { 
  ProjetoEstudo, 
  Materia,
  SessaoEstudo,
  Revisao,
  CalendarioResponse
} from '../../../../../interfaces/revisao.interface';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

interface CalendarEvent {
  title: string;
  start: string;
  end?: string;
  color?: string;
  extendedProps?: any;
}

interface MateriaInfo {
  id: number;
  nome: string;
  ordem_sugerida: number;
  total_capitulos?: number;
  data_inicio?: string | null;
  data_fim?: string | null;
}

@Component({
  selector: 'app-calendario-estudos',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FullCalendarModule
  ],
  templateUrl: './calendario-estudos.html',
  styleUrl: './calendario-estudos.scss'
})
export class CalendarioEstudos implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @ViewChild('fullCalendar') fullCalendarComponent?: any;
  
  @Input() projeto: ProjetoEstudo | null = null;
  @Input() materiasInfo: MateriaInfo[] = [];
  @Input() coresMaterias: { [materiaId: number]: string } = {};
  
  @Output() concluirSessaoEvent = new EventEmitter<SessaoEstudo>();
  @Output() concluirRevisaoEvent = new EventEmitter<Revisao>();
  
  private revisaoService = inject(RevisaoService);
  
  calendario = signal<CalendarioResponse | null>(null);
  loadingCalendario = signal(false);
  calendarEvents = signal<CalendarEvent[]>([]);
  
  // FullCalendar configuration
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    locale: 'pt',
    firstDay: 0, // Domingo
    editable: false,
    selectable: true,
    dayMaxEvents: true,
    events: [],
    eventClick: (info) => this.handleEventClick(info),
    eventDidMount: (info) => this.handleEventMount(info)
  };
  
  ngOnInit(): void {
    console.log('[CalendarioEstudos] ngOnInit - projeto:', this.projeto);
    console.log('[CalendarioEstudos] ngOnInit - loadingCalendario:', this.loadingCalendario());
    if (this.projeto?.id) {
      console.log('[CalendarioEstudos] ngOnInit - Carregando calendário para projeto ID:', this.projeto.id);
      this.carregarCalendario(this.projeto.id);
    } else {
      console.warn('[CalendarioEstudos] ngOnInit - Projeto não disponível ou sem ID');
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    
    // Recarrega quando o projeto muda
    if (changes['projeto']) {
      if (this.projeto?.id) {
        this.carregarCalendario(this.projeto.id);
      } else {
        console.warn('[CalendarioEstudos] ngOnChanges - Projeto sem ID válido');
      }
    }
    
    // Atualiza eventos quando matérias mudam
    if (changes['materiasInfo'] || changes['coresMaterias']) {
      const calendario = this.calendario();
      if (calendario) {
        this.prepararEventosCalendario(calendario);
      } else {
      }
    }
  }
  
  ngOnDestroy(): void {
    // Remove listener de resize se existir
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
    // Remove observer de visibilidade se existir
    if (this.visibilityObserver) {
      this.visibilityObserver.disconnect();
    }
    // FullCalendar será destruído automaticamente
  }
  
  private resizeListener?: () => void;
  private visibilityObserver?: IntersectionObserver;
  
  ngAfterViewInit(): void {
    // Adiciona listener para redimensionamento da janela
    this.resizeListener = () => {
      if (this.fullCalendarComponent) {
        setTimeout(() => {
          this.fullCalendarComponent.getApi().updateSize();
        }, 100);
      }
    };
    window.addEventListener('resize', this.resizeListener);
    
    // Usa MutationObserver para detectar quando o elemento está visível
    this.observeCalendarVisibility();
  }
  
  private observeCalendarVisibility(): void {
    // Aguarda um pouco para garantir que o DOM está pronto
    setTimeout(() => {
      const calendarElement = document.querySelector('.fullcalendar-container');
      if (!calendarElement) {
        // Tenta novamente após um delay maior
        setTimeout(() => this.observeCalendarVisibility(), 500);
        return;
      }
      
      // Usa IntersectionObserver para detectar quando o elemento está visível
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && this.fullCalendarComponent) {
            setTimeout(() => {
              if (this.fullCalendarComponent) {
                this.fullCalendarComponent.getApi().updateSize();
              }
            }, 200);
            // Para de observar após a primeira atualização bem-sucedida
            observer.disconnect();
          }
        });
      }, {
        threshold: 0.1 // Dispara quando pelo menos 10% do elemento está visível
      });
      
      observer.observe(calendarElement);
      
      // Também força atualização após um delay maior como fallback
      setTimeout(() => {
        if (this.fullCalendarComponent) {
          console.log('[CalendarioEstudos]  - Fallback: forçando atualização após delay');
          this.fullCalendarComponent.getApi().updateSize();
        }
      }, 1000);
    }, 100);
  }
  
  carregarCalendario(projetoId: number): void {

    if (!projetoId) {
      return;
    }
    
    this.loadingCalendario.set(true);
    
    this.revisaoService.getCalendario(projetoId).pipe(
      catchError(error => {
        return of(null);
      }),
      finalize(() => {
        this.loadingCalendario.set(false);
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          this.calendario.set(response);
          this.prepararEventosCalendario(response);
          
          // Força atualização do tamanho após múltiplos delays para garantir renderização
          const updateSizes = [100, 300, 600, 1000];
          updateSizes.forEach(delay => {
            setTimeout(() => {
              if (this.fullCalendarComponent) {
                this.fullCalendarComponent.getApi().updateSize();
              }
            }, delay);
          });
        } else {
          console.warn('[CalendarioEstudos] carregarCalendario - Resposta vazia ou nula');
        }
      },
      error: (error) => {
        console.error('[CalendarioEstudos] carregarCalendario - Erro no subscribe:', error);
      }
    });
  }
  
  prepararEventosCalendario(calendario: CalendarioResponse): void {
    const events: EventInput[] = [];
    
    // Primeiro, adiciona eventos de período por matéria (se houver matérias com datas)
    const materiasComDatas = this.materiasInfo.filter(m => m.data_inicio && m.data_fim);
    
    materiasComDatas.forEach(materia => {
      if (materia.data_inicio && materia.data_fim) {
        const corMateria = this.getCorMateria(materia.id);
        console.log('[CalendarioEstudos] prepararEventosCalendario - Adicionando período para matéria:', materia.nome, 'cor:', corMateria);
        events.push({
          title: materia.nome,
          start: materia.data_inicio,
          end: materia.data_fim,
          backgroundColor: corMateria,
          borderColor: corMateria,
          textColor: '#ffffff',
          display: 'block',
          extendedProps: {
            tipo: 'periodo_materia',
            materia: materia
          }
        });
      }
    });
    
    // Adicionar sessões como eventos
    console.log('[CalendarioEstudos] prepararEventosCalendario - Total de sessões para processar:', calendario.sessoes?.length || 0);
    calendario.sessoes.forEach(sessao => {
      const color = this.getCorPassada(sessao.passada);
      events.push({
        title: `${sessao.capitulo_titulo || 'Capítulo'} - ${sessao.passada}ª Passada`,
        start: sessao.data_planejada,
        end: sessao.data_planejada,
        backgroundColor: color,
        borderColor: color,
        textColor: '#ffffff',
        extendedProps: {
          tipo: 'sessao',
          sessao: sessao,
          concluida: sessao.concluida,
          materiaNome: sessao.materia_nome
        }
      });
    });

    // Adicionar revisões como eventos
    console.log('[CalendarioEstudos] prepararEventosCalendario - Total de revisões para processar:', calendario.revisoes?.length || 0);
    calendario.revisoes.forEach(revisao => {
      if (!revisao.concluida) {
        events.push({
          title: `Revisão D+${revisao.intervalo_dias}`,
          start: revisao.data_prevista,
          end: revisao.data_prevista,
          backgroundColor: '#ff9800',
          borderColor: '#ff9800',
          textColor: '#ffffff',
          extendedProps: {
            tipo: 'revisao',
            revisao: revisao
          }
        });
      }
    });

    console.log('[CalendarioEstudos] prepararEventosCalendario - Total de eventos criados:', events.length);
    this.calendarEvents.set(events as CalendarEvent[]);
    this.calendarOptions.events = events;
    
    // Atualiza o calendário se já estiver inicializado
    if (this.fullCalendarComponent) {
      console.log('[CalendarioEstudos] prepararEventosCalendario - Refazendo busca de eventos no FullCalendar');
      const calendarApi = this.fullCalendarComponent.getApi();
      calendarApi.refetchEvents();
      
      // Força o recalculo do tamanho do calendário em múltiplos momentos
      const updateSizes = [50, 150, 300, 500];
      updateSizes.forEach(delay => {
        setTimeout(() => {
          if (this.fullCalendarComponent) {
            console.log(`[CalendarioEstudos] prepararEventosCalendario - Forçando atualização de tamanho após ${delay}ms`);
            this.fullCalendarComponent.getApi().updateSize();
          }
        }, delay);
      });
    } else {
      console.warn('[CalendarioEstudos] prepararEventosCalendario - fullCalendarComponent não disponível ainda');
      // Tenta novamente após um delay
      setTimeout(() => {
        if (this.fullCalendarComponent) {
          console.log('[CalendarioEstudos] prepararEventosCalendario - Tentando novamente após delay');
          this.prepararEventosCalendario(calendario);
        }
      }, 500);
    }
  }

  handleEventClick(info: any): void {
    const event = info.event;
    const extendedProps = event.extendedProps;
    
    if (extendedProps.tipo === 'sessao' && !extendedProps.concluida) {
      this.concluirSessaoEvent.emit(extendedProps.sessao);
    } else if (extendedProps.tipo === 'revisao' && !extendedProps.revisao.concluida) {
      this.concluirRevisaoEvent.emit(extendedProps.revisao);
    }
  }

  handleEventMount(info: any): void {
    // Customização visual dos eventos se necessário
  }

  getCorPassada(passada: number): string {
    const cores: { [key: number]: string } = {
      1: '#667eea',
      2: '#43e97b',
      3: '#fa709a'
    };
    return cores[passada] || '#9e9e9e';
  }
  
  getCorMateria(materiaId: number): string {
    return this.coresMaterias[materiaId] || '#9e9e9e';
  }
  
  // Método helper para debug do template
  getLoadingState(): boolean {
    const loading = this.loadingCalendario();
    console.log('[CalendarioEstudos] getLoadingState - Estado atual:', loading);
    return loading;
  }
  
  // Método público para recarregar o calendário quando necessário
  recarregar(): void {
    if (this.projeto?.id) {
      this.carregarCalendario(this.projeto.id);
    }
  }
  
  // Método público para atualizar matérias e recarregar eventos
  atualizarMaterias(materias: MateriaInfo[]): void {
    this.materiasInfo = materias;
    const calendario = this.calendario();
    if (calendario) {
      this.prepararEventosCalendario(calendario);
    }
  }
}
