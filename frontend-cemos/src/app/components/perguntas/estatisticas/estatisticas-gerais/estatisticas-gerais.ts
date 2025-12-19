import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-estatisticas-gerais',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './estatisticas-gerais.html',
  styleUrl: './estatisticas-gerais.scss'
})
export class EstatisticasGerais {
  @Input() rankingGeral: any = null;
  @Input() estatisticasGeraisErros: any = null;
  @Input() isAdmin = false;

  materiaSelecionada: any = null;
  mostrarModalMateria = false;

  // Mapeamento de matérias para IDs de bibliografias
  materiasConfig: { [key: string]: number[] } = {
    'Intendência': [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68],
    'Estratégia': [33, 34, 35],
    'Política': [9, 10, 11, 12, 13, 14, 15, 16, 17],
    'Planejamento Militar': [69, 70, 71],
    'Economia': [30, 31, 32],
    'História': [5, 6, 7, 8],
    'Direito': [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    'Geopolítica e Relações Internacionais': [1, 2, 3, 4]
  };

  materiasEstatisticasGerais: any[] = [];

  calcularTaxaAcerto(acertos: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((acertos / total) * 100 * 100) / 100;
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

  getEstatisticasPorMateria() {
    if (!this.estatisticasGeraisErros || !this.estatisticasGeraisErros.ranking_materias) {
      return [];
    }

    return this.estatisticasGeraisErros.ranking_materias.map((materia: any) => {
      const bibliografiaIds = this.materiasConfig[materia.materia] || [];
      const totalErros = materia.total_erros || 0;
      
      // Se temos dados de acertos e total, calcular taxa de acerto
      // Caso contrário, usar uma taxa baseada nos erros (estimativa)
      let taxaAcerto = 0;
      if (materia.total_respostas && materia.total_acertos !== undefined) {
        taxaAcerto = this.calcularTaxaAcerto(materia.total_acertos, materia.total_respostas);
      } else if (materia.total_respostas && totalErros) {
        // Calcular taxa baseada em total - erros = acertos estimados
        const acertosEstimados = materia.total_respostas - totalErros;
        taxaAcerto = this.calcularTaxaAcerto(acertosEstimados, materia.total_respostas);
      }
      
      return {
        materia: materia.materia,
        totalErros: totalErros,
        totalRespostas: materia.total_respostas || 0,
        totalAcertos: materia.total_acertos || (materia.total_respostas ? materia.total_respostas - totalErros : 0),
        taxaAcerto: taxaAcerto,
        bibliografias: materia.bibliografias || [],
        bibliografiaIds: bibliografiaIds
      };
    });
  }

  abrirModalMateria(materiaStat: any, event: Event) {
    event.stopPropagation();
    this.materiaSelecionada = materiaStat;
    this.mostrarModalMateria = true;
  }

  fecharModalMateria() {
    this.mostrarModalMateria = false;
    this.materiaSelecionada = null;
  }
}
