import { Component, OnInit, computed, signal, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { RevisaoService } from '../../../../services/revisao.service';
import { CalendarioEstudos } from './calendario-estudos/calendario-estudos';
import { PerguntasService } from '../../../../services/perguntas.service';
import { 
  ProjetoEstudo, 
  ProjetoEstudoCreate,
  Materia,
  MateriaCreateUpdate,
  SessaoEstudo,
  Revisao,
  IndicadoresProjeto
} from '../../../../interfaces/revisao.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

interface MateriaDisponivel {
  id: number;
  nome: string;
  selected?: boolean;
  ordem?: number;
  data_inicio?: string;
  data_fim?: string;
}

interface MateriaAgrupada {
  nome: string;
  passada: number;
  sessoes: SessaoEstudo[];
  dataInicio: Date;
  dataFim: Date;
}

interface RevisaoEnriquecida extends Revisao {
  sessaoInfo?: SessaoEstudo;
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
  selector: 'app-cronograma',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTabsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    DragDropModule,
    CalendarioEstudos
  ],
  templateUrl: './cronograma.html',
  styleUrl: './cronograma.scss'
})
export class Cronograma implements OnInit {
  @ViewChild('calendarioEstudos') calendarioEstudosComponent?: CalendarioEstudos;
  
  private revisaoService = inject(RevisaoService);
  private perguntasService = inject(PerguntasService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  // Signals para estado
  projetos = toSignal(this.revisaoService.projetos, { initialValue: [] as ProjetoEstudo[] });
  loadingProjetos = toSignal(this.revisaoService.loadingProjetos, { initialValue: false });
  
  projetoSelecionado = signal<ProjetoEstudo | null>(null);
  indicadores = signal<IndicadoresProjeto | null>(null);
  loadingIndicadores = signal(false);
  loadingMaterias = signal(false);
  
  // Abas
  selectedTab = signal(0);
  
  // Formulário de projeto
  projetoForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.maxLength(150)]],
    data_inicio: ['', Validators.required],
    minutos_diarios: [120, [Validators.required, Validators.min(1)]],
    total_passadas: [3, [Validators.required, Validators.min(1), Validators.max(10)]]
  });

  // Matérias disponíveis e selecionadas
  materiasDisponiveis = signal<MateriaDisponivel[]>([]);
  materiasSelecionadas = signal<MateriaDisponivel[]>([]);
  showSelecaoMaterias = signal(false);
  
  // Ordem padrão (IDs: 2,5,6,7,8,2,3,1)
  ordemPadraoIds = [2, 5, 6, 7, 8, 2, 3, 1];
  
  // Cores para matérias no calendário
  coresMaterias: { [materiaId: number]: string } = {};
  private coresDisponiveis = [
    '#667eea', '#43e97b', '#fa709a', '#f093fb', '#4facfe',
    '#00f2fe', '#ffecd2', '#fcb69f', '#a8edea', '#fed6e3',
    '#ff9a9e', '#fecfef', '#fecfef', '#ffecd2', '#fcb69f'
  ];
  
  // Controle de configuração de datas das matérias
  showConfigDatas = signal(false);
  materiasInfo = signal<MateriaInfo[]>([]);
  materiasDatas = signal<{ [materiaId: number]: { data_inicio?: Date | null; data_fim?: Date | null } }>({});
  loadingConfigDatas = signal(false);

  ngOnInit(): void {
    this.carregarProjetos();
    this.carregarMateriasDisponiveis();
  }

  carregarMateriasDisponiveis(): void {
    this.loadingMaterias.set(true);
    this.perguntasService.getMaterias().pipe(
      catchError(error => {
        console.error('Erro ao carregar matérias:', error);
        this.mostrarMensagem('Erro ao carregar matérias', 'error');
        return of([]);
      }),
      finalize(() => this.loadingMaterias.set(false))
    ).subscribe(materias => {
      this.materiasDisponiveis.set(materias.map(m => ({ id: m.id, nome: m.nome, selected: false })));
    });
  }

  carregarProjetos(): void {
    this.revisaoService.getProjetos().subscribe({
      next: (response) => {
        if (response.results && response.results.length > 0) {
          const projetoAtivo = response.results.find(p => p.ativo) || response.results[0];
          if (projetoAtivo && projetoAtivo.id) {
            this.selecionarProjeto(projetoAtivo);
          }
        }
      },
      error: (error) => {
        console.error('Erro ao carregar projetos:', error);
        this.mostrarMensagem('Erro ao carregar projetos', 'error');
      }
    });
  }

  selecionarProjeto(projeto: ProjetoEstudo | null): void {
    console.log('[Cronograma] selecionarProjeto - Projeto recebido:', projeto);
    
    if (!projeto) {
      console.warn('[Cronograma] selecionarProjeto - Tentativa de selecionar projeto nulo');
      return;
    }
    
    if (!projeto.id) {
      console.warn('[Cronograma] selecionarProjeto - Projeto sem ID:', projeto);
      return;
    }
    
    console.log('[Cronograma] selecionarProjeto - Selecionando projeto:', projeto.id, projeto.nome);
    this.projetoSelecionado.set(projeto);
    console.log('[Cronograma] selecionarProjeto - projetoSelecionado atualizado:', this.projetoSelecionado());
    
    // Recarrega o projeto completo para ter acesso às matérias com datas
    console.log('[Cronograma] selecionarProjeto - Carregando projeto completo...');
    this.revisaoService.getProjeto(projeto.id).subscribe({
      next: (projetoCompleto) => {
        console.log('[Cronograma] selecionarProjeto - Projeto completo carregado:', projetoCompleto);
        this.projetoSelecionado.set(projetoCompleto);
        console.log('[Cronograma] selecionarProjeto - projetoSelecionado após carregar completo:', this.projetoSelecionado());
        this.carregarMateriasInfo(projeto.id);
        this.carregarIndicadores(projeto.id);
      },
      error: (error) => {
        console.error('[Cronograma] selecionarProjeto - Erro ao carregar projeto completo:', error);
        // Continua mesmo se houver erro
        this.carregarMateriasInfo(projeto.id);
        this.carregarIndicadores(projeto.id);
      }
    });
  }

  carregarMateriasInfo(projetoId: number): void {
    if (!this.projetoSelecionado()) return;
    
    this.revisaoService.getMaterias(projetoId).subscribe({
      next: (response) => {
        const materias = response.results || [];
        const materiasInfo: MateriaInfo[] = materias.map((m, index) => {
          // Atribui cor para a matéria se ainda não tiver
          if (!this.coresMaterias[m.id]) {
            this.coresMaterias[m.id] = this.coresDisponiveis[index % this.coresDisponiveis.length];
          }
          
          return {
            id: m.id,
            nome: m.nome,
            ordem_sugerida: m.ordem_sugerida,
            total_capitulos: m.total_capitulos || 0,
            data_inicio: m.data_inicio || null,
            data_fim: m.data_fim || null
          };
        });
        
        this.materiasInfo.set(materiasInfo);
      },
      error: (error) => {
        console.error('Erro ao carregar matérias:', error);
      }
    });
  }

  carregarIndicadores(projetoId: number | undefined | null): void {
    if (!projetoId || projetoId === undefined || projetoId === null) {
      console.warn('Tentativa de carregar indicadores sem ID de projeto válido:', projetoId);
      return;
    }
    console.log('Carregando indicadores para projeto:', projetoId);
    this.loadingIndicadores.set(true);
    this.revisaoService.getIndicadores(projetoId).pipe(
      catchError(error => {
        console.error('Erro ao carregar indicadores:', error);
        return of(null);
      }),
      finalize(() => this.loadingIndicadores.set(false))
    ).subscribe(response => {
      if (response) {
        this.indicadores.set(response);
      }
    });
  }

  toggleSelecaoMaterias(): void {
    // Verifica se já existe um projeto
    const projetosExistentes = this.projetos();
    if (projetosExistentes && projetosExistentes.length > 0 && !this.showSelecaoMaterias()) {
      this.mostrarMensagem(
        `Para criar um novo projeto, é necessário deletar o projeto existente primeiro (${projetosExistentes[0].nome}).`,
        'warning'
      );
      return; // Não abre o formulário
    }
    
    this.showSelecaoMaterias.update(v => !v);
    if (!this.showSelecaoMaterias()) {
      // Reset seleções
      this.materiasDisponiveis.update(materias => 
        materias.map(m => ({ ...m, selected: false }))
      );
      this.materiasSelecionadas.set([]);
    }
  }

  toggleMateria(materia: MateriaDisponivel): void {
    const disponiveis = this.materiasDisponiveis();
    const index = disponiveis.findIndex(m => m.id === materia.id);
    
    if (index !== -1) {
      disponiveis[index].selected = !disponiveis[index].selected;
      this.materiasDisponiveis.set([...disponiveis]);
      
      // Atualizar lista de selecionadas
      const selecionadas = disponiveis.filter(m => m.selected);
      selecionadas.forEach((m, idx) => m.ordem = idx + 1);
      this.materiasSelecionadas.set(selecionadas);
    }
  }

  usarOrdemPadrao(): void {
    const disponiveis = this.materiasDisponiveis();
    const selecionadas: MateriaDisponivel[] = [];
    
    // Obtém a data de início do projeto
    const dataInicioProjeto = this.projetoForm.get('data_inicio')?.value;
    if (!dataInicioProjeto) {
      this.mostrarMensagem('Defina a data de início do projeto primeiro', 'warning');
      return;
    }
    
    let dataAtual = new Date(dataInicioProjeto);
    const diasPorMateria = 10; // 10 dias corridos por matéria
    
    this.ordemPadraoIds.forEach((id, index) => {
      const materia = disponiveis.find(m => m.id === id);
      if (materia) {
        // Calcula data de início e fim para esta matéria
        const dataInicio = new Date(dataAtual);
        const dataFim = new Date(dataAtual);
        dataFim.setDate(dataFim.getDate() + diasPorMateria - 1); // -1 porque o primeiro dia conta
        
        selecionadas.push({ 
          ...materia, 
          selected: true, 
          ordem: index + 1,
          data_inicio: this.formatarData(dataInicio),
          data_fim: this.formatarData(dataFim)
        });
        
        // Atribui cor para esta matéria
        if (!this.coresMaterias[id]) {
          this.coresMaterias[id] = this.coresDisponiveis[index % this.coresDisponiveis.length];
        }
        
        // Avança para a próxima matéria (pode sobrepor se necessário)
        dataAtual = new Date(dataFim);
        dataAtual.setDate(dataAtual.getDate() + 1);
      }
    });

    // Marcar como selecionadas
    disponiveis.forEach(m => {
      m.selected = this.ordemPadraoIds.includes(m.id);
    });

    this.materiasDisponiveis.set([...disponiveis]);
    this.materiasSelecionadas.set(selecionadas);
  }
  
  getCorMateria(materiaId: number): string {
    return this.coresMaterias[materiaId] || '#9e9e9e';
  }

  dropMateria(event: CdkDragDrop<MateriaDisponivel[]>): void {
    const selecionadas = [...this.materiasSelecionadas()];
    moveItemInArray(selecionadas, event.previousIndex, event.currentIndex);
    selecionadas.forEach((m, idx) => m.ordem = idx + 1);
    this.materiasSelecionadas.set(selecionadas);
  }

  criarProjeto(): void {
    if (this.projetoForm.invalid) {
      this.mostrarMensagem('Preencha todos os campos obrigatórios', 'warning');
      return;
    }

    if (this.materiasSelecionadas().length === 0) {
      this.mostrarMensagem('Selecione pelo menos uma matéria', 'warning');
      return;
    }

    // O backend já deleta projetos anteriores automaticamente ao criar um novo
    this.criarNovoProjeto();
  }

  private criarNovoProjeto(): void {
    const formValue = this.projetoForm.value;
    const projetoData: ProjetoEstudoCreate = {
      nome: formValue.nome,
      data_inicio: this.formatarData(formValue.data_inicio),
      minutos_diarios: formValue.minutos_diarios,
      total_passadas: formValue.total_passadas
    };

    // Preparar dados com matérias (incluindo datas se definidas)
    const materiasData = this.materiasSelecionadas().map(m => ({
      nome: m.nome,
      ordem: m.ordem || 1,
      prioridade: 1,
      data_inicio: m.data_inicio || null,
      data_fim: m.data_fim || null
    }));

    const projetoComMaterias: ProjetoEstudoCreate = {
      ...projetoData,
      materias: materiasData
    };

    this.revisaoService.createProjeto(projetoComMaterias).subscribe({
      next: (projeto) => {
        console.log('Projeto criado:', projeto);
        
        if (!projeto || !projeto.id) {
          console.error('Projeto criado sem ID válido:', projeto);
          this.mostrarMensagem('Projeto criado, mas houve um problema ao carregá-lo', 'warning');
          this.carregarProjetos();
          return;
        }
        
        this.mostrarMensagem('Projeto criado com sucesso!', 'success');
        this.showSelecaoMaterias.set(false);
        this.projetoForm.reset({
          minutos_diarios: 120,
          total_passadas: 3
        });
        this.materiasSelecionadas.set([]);
        
        // Selecionar o projeto recém-criado
        this.selecionarProjeto(projeto);
        
        // Recarrega as matérias para inicializar cores
        if (projeto.id) {
          this.carregarMateriasInfo(projeto.id);
        }
        
        this.selectedTab.set(1); // Ir para aba Cronograma
      },
      error: (error) => {
        console.error('Erro ao criar projeto:', error);
        this.mostrarMensagem('Erro ao criar projeto', 'error');
      }
    });
  }

  deletarProjeto(projeto: ProjetoEstudo, event: Event): void {
    event.stopPropagation(); // Evita que o clique também selecione o projeto
    
    if (!confirm(`Tem certeza que deseja deletar o projeto "${projeto.nome}"? Esta ação não pode ser desfeita.`)) {
      return;
    }

    if (!projeto.id) {
      this.mostrarMensagem('Projeto inválido', 'error');
      return;
    }

    this.revisaoService.deleteProjeto(projeto.id).subscribe({
      next: () => {
        this.mostrarMensagem('Projeto deletado com sucesso!', 'success');
        
        // Se o projeto deletado era o selecionado, limpa a seleção
        if (this.projetoSelecionado()?.id === projeto.id) {
          this.projetoSelecionado.set(null);
        }
        
        // Recarrega a lista de projetos
        this.carregarProjetos();
      },
      error: (error) => {
        console.error('Erro ao deletar projeto:', error);
        this.mostrarMensagem('Erro ao deletar projeto', 'error');
      }
    });
  }


  concluirSessao(sessao: SessaoEstudo): void {
    if (!this.projetoSelecionado()) return;

    const dataRealizada = new Date().toISOString().split('T')[0];
    
    this.revisaoService.concluirSessao(sessao.id, {
      data_realizada: dataRealizada,
      tempo_estudado: sessao.tempo_estudado ?? undefined
    }).subscribe({
      next: () => {
        this.mostrarMensagem('Sessão concluída com sucesso!', 'success');
        // Recarrega o calendário através do componente filho
        if (this.calendarioEstudosComponent) {
          this.calendarioEstudosComponent.recarregar();
        }
        this.carregarIndicadores(this.projetoSelecionado()!.id);
      },
      error: (error) => {
        console.error('Erro ao concluir sessão:', error);
        this.mostrarMensagem('Erro ao concluir sessão', 'error');
      }
    });
  }

  concluirRevisao(revisao: Revisao): void {
    if (!this.projetoSelecionado()) return;

    const dataRealizada = new Date().toISOString().split('T')[0];
    
    this.revisaoService.concluirRevisao(revisao.id, {
      data_realizada: dataRealizada
    }).subscribe({
      next: () => {
        this.mostrarMensagem('Revisão concluída com sucesso!', 'success');
        // Recarrega o calendário através do componente filho
        if (this.calendarioEstudosComponent) {
          this.calendarioEstudosComponent.recarregar();
        }
        this.carregarIndicadores(this.projetoSelecionado()!.id);
      },
      error: (error) => {
        console.error('Erro ao concluir revisão:', error);
        this.mostrarMensagem('Erro ao concluir revisão', 'error');
      }
    });
  }

  formatarData(data: Date | string): string {
    if (!data) return '';
    const d = typeof data === 'string' ? new Date(data) : data;
    return d.toISOString().split('T')[0];
  }

  formatarDataBR(data: string): string {
    if (!data) return '';
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR');
  }

  mostrarMensagem(mensagem: string, tipo: 'success' | 'error' | 'warning' | 'info' = 'success'): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [`snackbar-${tipo}`]
    });
  }

  navigateHome(): void {
    this.router.navigate(['/home']);
  }


  // Métodos para configuração de datas das matérias
  toggleConfigDatas(): void {
    this.showConfigDatas.update(v => !v);
    if (this.showConfigDatas()) {
      this.carregarMateriasDatas();
    }
  }

  carregarMateriasDatas(): void {
    const materias = this.materiasInfo();
    const datas: { [materiaId: number]: { data_inicio?: Date | null; data_fim?: Date | null } } = {};
    
    materias.forEach(materia => {
      datas[materia.id] = {
        data_inicio: materia.data_inicio ? new Date(materia.data_inicio) : null,
        data_fim: materia.data_fim ? new Date(materia.data_fim) : null
      };
    });
    
    this.materiasDatas.set(datas);
  }

  getDataInicioMateria(materiaId: number): Date | null {
    const datas = this.materiasDatas();
    return datas[materiaId]?.data_inicio || null;
  }

  getDataFimMateria(materiaId: number): Date | null {
    const datas = this.materiasDatas();
    return datas[materiaId]?.data_fim || null;
  }

  atualizarDataInicioMateria(materiaId: number, event: any): void {
    const datas = { ...this.materiasDatas() };
    if (!datas[materiaId]) {
      datas[materiaId] = {};
    }
    datas[materiaId].data_inicio = event.value;
    this.materiasDatas.set(datas);
  }

  atualizarDataFimMateria(materiaId: number, event: any): void {
    const datas = { ...this.materiasDatas() };
    if (!datas[materiaId]) {
      datas[materiaId] = {};
    }
    datas[materiaId].data_fim = event.value;
    this.materiasDatas.set(datas);
  }

  limparDatasMateria(materiaId: number): void {
    const datas = { ...this.materiasDatas() };
    if (datas[materiaId]) {
      datas[materiaId].data_inicio = null;
      datas[materiaId].data_fim = null;
      this.materiasDatas.set(datas);
    }
  }

  aplicarConfigDatas(): void {
    const projeto = this.projetoSelecionado();
    if (!projeto || !projeto.id) {
      this.mostrarMensagem('Selecione um projeto primeiro', 'warning');
      return;
    }

    this.loadingConfigDatas.set(true);
    const datas = this.materiasDatas();
    const materiasParaAtualizar = Object.entries(datas).map(([materiaId, datasMateria]) => ({
      id: parseInt(materiaId),
      data_inicio: datasMateria.data_inicio ? this.formatarData(datasMateria.data_inicio) : null,
      data_fim: datasMateria.data_fim ? this.formatarData(datasMateria.data_fim) : null
    }));

    this.revisaoService.atualizarDatasMaterias(materiasParaAtualizar).pipe(
      catchError(error => {
        console.error('Erro ao atualizar datas:', error);
        this.mostrarMensagem('Erro ao atualizar datas das matérias', 'error');
        return of(null);
      }),
      finalize(() => this.loadingConfigDatas.set(false))
    ).subscribe(response => {
      if (response) {
        this.mostrarMensagem('Datas atualizadas com sucesso!', 'success');
        // Recarrega as matérias para obter os dados atualizados
        this.carregarMateriasInfo(projeto.id!);
        // Atualiza o componente filho com as novas matérias e recarrega
        setTimeout(() => {
          if (this.calendarioEstudosComponent) {
            this.calendarioEstudosComponent.atualizarMaterias(this.materiasInfo());
            this.calendarioEstudosComponent.recarregar();
          }
        }, 100);
        this.showConfigDatas.set(false);
      }
    });
  }
}
