import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PerguntasService } from '../../../../../services/perguntas.service';
import { Bibliografia } from '../../../../../interfaces/perguntas.interface';

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
}

@Component({
  selector: 'app-info-materia-estatistica',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './info-materia-estatistica.html',
  styleUrl: './info-materia-estatistica.scss'
})
export class InfoMateriaEstatistica implements OnInit {
  private perguntasService = inject(PerguntasService);

  @Input() materiaEstatistica!: MateriaEstatisticas;
  @Output() voltar = new EventEmitter<void>();

  estatisticasUsuario: any = null;
  isLoading = false;
  isLoadingQuestoes = false;
  
  // Estatísticas filtradas por matéria
  estatisticasPorTipo: any[] = [];
  estatisticasPorBibliografia: any[] = [];
  estatisticasPorAssunto: any[] = [];
  
  // Questões erradas filtradas
  questoesErradas: any[] = [];
  mostrarQuestoesErradas = false;
  paginaQuestoes = 1;
  totalQuestoes = 0;
  limiteQuestoes = 50; // Limite para não ficar infinito

  // Mapeamento de matérias para ícones e cores
  materiasConfig: { [key: string]: { icon: string; gradient: string } } = {
    'Intendência': {
      icon: 'inventory_2',
      gradient: 'linear-gradient(135deg, #667eea 0%, #10001f 100%)'
    },
    'Estratégia': {
      icon: 'route',
      gradient: 'linear-gradient(135deg, #200000 0%, #f5576c 100%)'
    },
    'Planejamento Militar': {
      icon: 'military_tech',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #0a2526 100%)'
    },
    'História': {
      icon: 'history_edu',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #001a15 100%)'
    },
    'Geopolítica e Relações Internacionais': {
      icon: 'public',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #3a3200 100%)'
    },
    'Política': {
      icon: 'account_balance',
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    },
    'Direito': {
      icon: 'gavel',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #360011 100%)'
    },
    'Economia': {
      icon: 'show_chart',
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #320022 100%)'
    }
  };

  ngOnInit() {
    this.carregarEstatisticasMateria();
  }

  /**
   * Obtém o ícone da matéria
   */
  getMateriaIcon(): string {
    return this.materiasConfig[this.materiaEstatistica.materia]?.icon || 'school';
  }

  /**
   * Obtém o degradê da matéria
   */
  getMateriaGradient(): string {
    return this.materiasConfig[this.materiaEstatistica.materia]?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }

  /**
   * Carrega estatísticas específicas da matéria
   */
  carregarEstatisticasMateria() {
    this.isLoading = true;
    
    this.perguntasService.getEstatisticasUsuario().subscribe({
      next: (data) => {
        this.estatisticasUsuario = data;
        this.processarEstatisticasMateria(data);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar estatísticas:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Processa estatísticas filtradas pela matéria selecionada
   */
  private processarEstatisticasMateria(stats: any) {
    const bibliografiaIds = this.materiaEstatistica.bibliografiaIds;
    
    // Filtrar por tipo de questão (apenas desta matéria)
    if (stats.por_tipo) {
      // Precisamos filtrar por bibliografia_id para pegar apenas desta matéria
      // Como não temos bibliografia_id direto em por_tipo, vamos usar por_bibliografia
      this.estatisticasPorTipo = this.calcularEstatisticasPorTipo(stats, bibliografiaIds);
    }
    
    // Filtrar por bibliografia (apenas desta matéria)
    if (stats.por_bibliografia) {
      this.estatisticasPorBibliografia = stats.por_bibliografia.filter((bib: any) =>
        bibliografiaIds.includes(bib.bibliografia_id)
      );
    }
    
    // Filtrar por assunto (apenas desta matéria)
    if (stats.por_assunto) {
      // Precisamos filtrar por bibliografia_id também
      this.estatisticasPorAssunto = this.calcularEstatisticasPorAssunto(stats, bibliografiaIds);
    }
  }

  /**
   * Calcula estatísticas por tipo de questão para esta matéria
   * Usa uma aproximação baseada na proporção de respostas desta matéria
   */
  private calcularEstatisticasPorTipo(stats: any, bibliografiaIds: number[]): any[] {
    if (!stats.por_tipo || stats.por_tipo.length === 0) {
      return [];
    }

    const totalMateria = this.materiaEstatistica.estatisticas.total;
    const totalGeral = stats.total_respostas || 1;
    
    if (totalGeral === 0) {
      return [];
    }

    // Calcular proporção baseada no total desta matéria
    const proporcao = totalMateria / totalGeral;
    
    // Calcular estatísticas proporcionais por tipo
    const porTipoCalculado = stats.por_tipo.map((tipo: any) => {
      const totalTipo = Math.round(tipo.total * proporcao);
      const acertosTipo = Math.round(tipo.acertos * proporcao);
      const errosTipo = Math.round(tipo.erros * proporcao);
      
      return {
        pergunta_tipo: tipo.pergunta_tipo,
        total: totalTipo,
        acertos: acertosTipo,
        erros: errosTipo
      };
    }).filter((item: any) => item.total > 0);

    // Ajustar para garantir que a soma seja igual ao total da matéria
    const somaTotal = porTipoCalculado.reduce((sum: number, item: any) => sum + item.total, 0);
    if (somaTotal !== totalMateria && porTipoCalculado.length > 0) {
      const diferenca = totalMateria - somaTotal;
      // Ajustar o maior item
      const maiorItem = porTipoCalculado.reduce((max: any, item: any) => 
        item.total > max.total ? item : max
      );
      maiorItem.total += diferenca;
    }

    return porTipoCalculado;
  }

  /**
   * Calcula estatísticas por assunto para esta matéria
   * Usa uma aproximação baseada na proporção de respostas desta matéria
   */
  private calcularEstatisticasPorAssunto(stats: any, bibliografiaIds: number[]): any[] {
    if (!stats.por_assunto || stats.por_assunto.length === 0) {
      return [];
    }

    const totalMateria = this.materiaEstatistica.estatisticas.total;
    const totalGeral = stats.total_respostas || 1;
    
    if (totalGeral === 0) {
      return [];
    }

    // Calcular proporção baseada no total desta matéria
    const proporcao = totalMateria / totalGeral;
    
    // Calcular estatísticas proporcionais por assunto
    const porAssuntoCalculado = stats.por_assunto.map((assunto: any) => {
      const totalAssunto = Math.round(assunto.total * proporcao);
      const acertosAssunto = Math.round(assunto.acertos * proporcao);
      const errosAssunto = Math.round(assunto.erros * proporcao);
      
      return {
        assunto: assunto.assunto || 'Sem assunto',
        total: totalAssunto,
        acertos: acertosAssunto,
        erros: errosAssunto
      };
    }).filter((item: any) => item.total > 0);

    // Ajustar para garantir que a soma seja igual ao total da matéria
    const somaTotal = porAssuntoCalculado.reduce((sum: number, item: any) => sum + item.total, 0);
    if (somaTotal !== totalMateria && porAssuntoCalculado.length > 0) {
      const diferenca = totalMateria - somaTotal;
      // Ajustar o maior item
      const maiorItem = porAssuntoCalculado.reduce((max: any, item: any) => 
        item.total > max.total ? item : max
      );
      maiorItem.total += diferenca;
    }

    return porAssuntoCalculado;
  }

  /**
   * Carrega questões erradas desta matéria
   */
  carregarQuestoesErradas() {
    if (this.mostrarQuestoesErradas) {
      this.mostrarQuestoesErradas = false;
      this.questoesErradas = [];
      return;
    }

    this.isLoadingQuestoes = true;
    this.mostrarQuestoesErradas = true;
    
    // Carregar questões erradas com limite maior para ter mais opções de filtro
    // Vamos carregar mais questões e filtrar depois
    this.perguntasService.getMinhasRespostas(false, 1, this.limiteQuestoes * 2).subscribe({
      next: (response) => {
        // Filtrar apenas questões desta matéria (por bibliografia_id)
        const bibliografiaIds = this.materiaEstatistica.bibliografiaIds;
        const todasQuestoes = response.results || [];
        
        // Filtrar questões desta matéria
        const questoesFiltradas = todasQuestoes.filter((item: any) => {
          // Verificar se a questão pertence a uma bibliografia desta matéria
          // Tentar diferentes caminhos para encontrar bibliografia_id
          const bibliografiaId = 
            item.resposta?.bibliografia_id || 
            item.questao?.bibliografia_id ||
            item.bibliografia_id ||
            item.bibliografia?.id;
          
          if (bibliografiaId) {
            return bibliografiaIds.includes(bibliografiaId);
          }
          
          // Se não tiver bibliografia_id, tentar verificar pelo título da bibliografia
          if (item.questao?.bibliografia_titulo) {
            const bibliografia = this.materiaEstatistica.bibliografias.find(
              bib => bib.titulo === item.questao.bibliografia_titulo
            );
            return bibliografia !== undefined;
          }
          
          return false;
        }).slice(0, this.limiteQuestoes); // Limitar resultado final
        
        this.questoesErradas = questoesFiltradas;
        this.totalQuestoes = questoesFiltradas.length;
        this.isLoadingQuestoes = false;
      },
      error: (error) => {
        console.error('Erro ao carregar questões erradas:', error);
        this.isLoadingQuestoes = false;
      }
    });
  }

  /**
   * Calcula taxa de acerto
   */
  calcularTaxaAcerto(acertos: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((acertos / total) * 100 * 100) / 100;
  }

  /**
   * Formata resposta do usuário
   */
  formatarRespostaUsuario(resposta: any, tipo: string): string {
    if (tipo === 'multipla') {
      return resposta.toUpperCase();
    } else if (tipo === 'vf') {
      return resposta ? 'Verdadeiro' : 'Falso';
    } else if (tipo === 'correlacao') {
      const pares: string[] = [];
      for (const [key, value] of Object.entries(resposta)) {
        const itemIndex = parseInt(key) + 1;
        const letterIndex = parseInt(value as string);
        const letter = String.fromCharCode(65 + letterIndex);
        pares.push(`${itemIndex} → ${letter}`);
      }
      return pares.join(', ');
    }
    return String(resposta);
  }

  /**
   * Formata resposta correta
   */
  formatarRespostaCorreta(questao: any): string {
    if (!questao) return 'N/A';
    
    if (questao.tipo === 'multipla') {
      return questao.resposta_correta.toUpperCase();
    } else if (questao.tipo === 'vf') {
      return 'Verdadeiro';
    } else if (questao.tipo === 'correlacao') {
      const pares: string[] = [];
      for (const [key, value] of Object.entries(questao.resposta_correta)) {
        const itemIndex = parseInt(key) + 1;
        const letterIndex = parseInt(value as string);
        const letter = String.fromCharCode(65 + letterIndex);
        pares.push(`${itemIndex} → ${letter}`);
      }
      return pares.join(', ');
    }
    return String(questao.resposta_correta);
  }

  /**
   * Retorna letra da coluna B
   */
  getLetraColunaB(index: number): string {
    return String.fromCharCode(65 + index);
  }

  /**
   * Obtém nome da bibliografia por ID
   */
  getBibliografiaNome(bibliografiaId: number): string {
    const bibliografia = this.materiaEstatistica.bibliografias.find(
      bib => bib.id === bibliografiaId
    );
    return bibliografia?.titulo || `Bibliografia #${bibliografiaId}`;
  }

  /**
   * Volta para a visualização principal
   */
  onVoltar() {
    this.voltar.emit();
  }
}
