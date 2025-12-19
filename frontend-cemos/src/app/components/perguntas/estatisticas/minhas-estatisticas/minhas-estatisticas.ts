import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Bibliografia } from '../../../../interfaces/perguntas.interface';

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
  expanded: boolean;
}

@Component({
  selector: 'app-minhas-estatisticas',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './minhas-estatisticas.html',
  styleUrl: './minhas-estatisticas.scss'
})
export class MinhasEstatisticas {
  @Input() estatisticasUsuario: any = null;
  @Input() isLoading = false;
  @Input() isResetting = false;
  @Input() materiasEstatisticas: MateriaEstatisticas[] = [];
  @Input() isLoadingMaterias = false;
  @Input() questoesAcertadas: any[] = [];
  @Input() questoesErradas: any[] = [];
  @Input() isLoadingQuestoes = false;
  @Input() filtroQuestoes: 'todas' | 'acertadas' | 'erradas' = 'todas';

  @Output() resetarEstatisticas = new EventEmitter<void>();
  @Output() resetarEstatisticasMateria = new EventEmitter<number[]>();
  @Output() carregarQuestoes = new EventEmitter<'todas' | 'acertadas' | 'erradas'>();
  @Output() toggleMateria = new EventEmitter<number>();

  materiaSelecionada: MateriaEstatisticas | null = null;
  mostrarModalMateria = false;

  calcularTaxaAcerto(acertos: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((acertos / total) * 100 * 100) / 100;
  }

  getEstatisticasBibliografia(bibliografiaId: number): any {
    if (!this.estatisticasUsuario || !this.estatisticasUsuario.por_bibliografia) {
      return null;
    }
    
    return this.estatisticasUsuario.por_bibliografia.find(
      (bib: any) => bib.bibliografia_id === bibliografiaId
    );
  }

  getQuestoesAtuais(): any[] {
    if (this.filtroQuestoes === 'acertadas') {
      return this.questoesAcertadas;
    } else if (this.filtroQuestoes === 'erradas') {
      return this.questoesErradas;
    }
    return [];
  }

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

  getLetraColunaB(index: number): string {
    return String.fromCharCode(65 + index);
  }

  onResetarEstatisticas() {
    this.resetarEstatisticas.emit();
  }

  onResetarEstatisticasMateria(materiaStat: MateriaEstatisticas, event: Event) {
    event.stopPropagation();
    if (materiaStat.estatisticas.total === 0) {
      return;
    }
    // Emitir evento com os IDs das bibliografias da matéria
    this.resetarEstatisticasMateria.emit(materiaStat.bibliografiaIds);
  }

  onCarregarQuestoes(filtro: 'todas' | 'acertadas' | 'erradas') {
    this.carregarQuestoes.emit(filtro);
  }

  onToggleMateria(index: number) {
    this.toggleMateria.emit(index);
  }

  abrirModalMateria(materiaStat: MateriaEstatisticas, event: Event) {
    event.stopPropagation();
    this.materiaSelecionada = materiaStat;
    this.mostrarModalMateria = true;
  }

  fecharModalMateria() {
    this.mostrarModalMateria = false;
    this.materiaSelecionada = null;
  }

  /**
   * Retorna a classe CSS baseada no percentual de acerto
   */
  getPercentualClass(taxaAcerto: number, total: number): string {
    if (total === 0) return 'no-data';
    
    if (taxaAcerto < 50) return 'low';
    if (taxaAcerto < 60) return 'orange';
    if (taxaAcerto < 70) return 'yellow';
    if (taxaAcerto < 80) return 'yellow-green';
    if (taxaAcerto < 90) return 'green';
    return 'blue';
  }

  /**
   * Retorna a cor de fundo da barra de progresso baseada no percentual
   */
  getProgressBarColor(taxaAcerto: number, total: number): string {
    if (total === 0) return '#e9ecef';
    
    const percent = Math.min(100, Math.max(0, taxaAcerto));
    
    // Vermelho: 0-50%
    if (percent < 50) {
      const width = percent;
      return `linear-gradient(90deg, #c62828 0%, #e74c3c ${width}%, #e9ecef ${width}%, #e9ecef 100%)`;
    }
    
    // Laranja: 50-60%
    if (percent < 60) {
      const width = percent;
      const intensity = (percent - 50) / 10;
      const color = `rgb(${255 - Math.round(intensity * 30)}, ${111 - Math.round(intensity * 20)}, ${0})`;
      return `linear-gradient(90deg, ${color} 0%, #ffa000 ${width}%, #e9ecef ${width}%, #e9ecef 100%)`;
    }
    
    // Amarelo: 60-70%
    if (percent < 70) {
      const width = percent;
      const intensity = (percent - 60) / 10;
      const color = `rgb(${255 - Math.round(intensity * 20)}, ${193 + Math.round(intensity * 30)}, ${7})`;
      return `linear-gradient(90deg, ${color} 0%, #ffd54f ${width}%, #e9ecef ${width}%, #e9ecef 100%)`;
    }
    
    // Amarelo-Verde: 70-80%
    if (percent < 80) {
      const width = percent;
      const intensity = (percent - 70) / 10;
      // Transição de amarelo (#cddc39) para verde claro (#8bc34a)
      const r = 205 - Math.round(intensity * 60);
      const g = 220 - Math.round(intensity * 80);
      const b = 57 + Math.round(intensity * 100);
      const color = `rgb(${r}, ${g}, ${b})`;
      return `linear-gradient(90deg, ${color} 0%, #8bc34a ${width}%, #e9ecef ${width}%, #e9ecef 100%)`;
    }
    
    // Verde: 80-90% (com oscilação - mais vibrante conforme aumenta)
    if (percent < 90) {
      const width = percent;
      const intensity = (percent - 80) / 10; // 0 a 1 dentro da faixa 80-90%
      // Verde mais vibrante: 80% = #4caf50 (76, 175, 80), 89.99% = verde mais saturado
      const baseR = 76;
      const baseG = 175;
      const baseB = 80;
      // Aumenta a saturação e brilho conforme aumenta
      const r = Math.max(0, baseR - Math.round(intensity * 10));
      const g = Math.min(255, baseG + Math.round(intensity * 20));
      const b = Math.max(0, baseB - Math.round(intensity * 5));
      const color = `rgb(${r}, ${g}, ${b})`;
      return `linear-gradient(90deg, ${color} 0%, rgb(${r + 10}, ${g + 10}, ${b + 5}) ${width}%, #e9ecef ${width}%, #e9ecef 100%)`;
    }
    
    // Azul: 90-100%
    const width = percent;
    const intensity = (percent - 90) / 10;
    const r = 33 - Math.round(intensity * 5);
    const g = 150 - Math.round(intensity * 10);
    const b = 243 - Math.round(intensity * 20);
    const color = `rgb(${r}, ${g}, ${b})`;
    return `linear-gradient(90deg, ${color} 0%, #1976d2 ${width}%, #e9ecef ${width}%, #e9ecef 100%)`;
  }
}
