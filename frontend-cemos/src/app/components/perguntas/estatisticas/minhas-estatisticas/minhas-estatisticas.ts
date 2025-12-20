import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Bibliografia } from '../../../../interfaces/perguntas.interface';
import { InfoMateriaEstatistica } from './info-materia-estatistica/info-materia-estatistica';

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
  imports: [CommonModule, MatIconModule, InfoMateriaEstatistica],
  templateUrl: './minhas-estatisticas.html',
  styleUrl: './minhas-estatisticas.scss'
})
export class MinhasEstatisticas implements OnDestroy {
  @Input() estatisticasUsuario: any = null;
  @Input() isLoading = false;
  @Input() isResetting = false;
  @Input() materiasEstatisticas: MateriaEstatisticas[] = [];
  @Input() isLoadingMaterias = false;

  @Output() resetarEstatisticas = new EventEmitter<void>();
  @Output() resetarEstatisticasMateria = new EventEmitter<number[]>();

  materiaSelecionada: MateriaEstatisticas | null = null;
  mostrarDetalhesMateria = false;

  // Tooltip customizado que segue o mouse
  showTooltipFlag: boolean = false;
  tooltipX: number = 0;
  tooltipY: number = 0;
  tooltipTimeout: any = null;

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

  abrirDetalhesMateria(materiaStat: MateriaEstatisticas, event: Event) {
    // Não fazer stopPropagation aqui para permitir que o clique no card funcione
    // O stopPropagation será feito apenas no botão de resetar
    this.materiaSelecionada = materiaStat;
    this.mostrarDetalhesMateria = true;
  }

  fecharDetalhesMateria() {
    this.mostrarDetalhesMateria = false;
    this.materiaSelecionada = null;
  }

  /**
   * Obtém o ícone da matéria
   */
  getMateriaIcon(materia: string): string {
    const icons: { [key: string]: string } = {
      'Intendência': 'inventory_2',
      'Estratégia': 'route',
      'Planejamento Militar': 'military_tech',
      'História': 'history_edu',
      'Geopolítica e Relações Internacionais': 'public',
      'Política': 'account_balance',
      'Direito': 'gavel',
      'Economia': 'show_chart'
    };
    return icons[materia] || 'school';
  }

  /**
   * Obtém o índice da cor baseado no nome da matéria
   */
  getMateriaColorIndex(materia: string): number {
    const colorMap: { [key: string]: number } = {
      'Intendência': 0,
      'Estratégia': 1,
      'Política': 2,
      'Planejamento Militar': 3,
      'Economia': 4,
      'História': 5,
      'Direito': 6,
      'Geopolítica e Relações Internacionais': 7
    };
    return colorMap[materia] ?? 0;
  }

  /**
   * Mostra o tooltip ao passar o mouse sobre o card (com delay de 0.5s)
   */
  showTooltip(event: MouseEvent) {
    // Limpa qualquer timeout anterior
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }
    
    // Atualiza a posição do tooltip enquanto aguarda
    this.moveTooltip(event);
    
    // Define um timeout de 0.5 segundos antes de mostrar
    this.tooltipTimeout = setTimeout(() => {
      this.showTooltipFlag = true;
      this.moveTooltip(event);
    }, 500);
  }

  /**
   * Esconde o tooltip ao sair do mouse do card
   */
  hideTooltip() {
    // Cancela o timeout se ainda não foi executado
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
      this.tooltipTimeout = null;
    }
    this.showTooltipFlag = false;
  }

  /**
   * Move o tooltip seguindo o cursor do mouse
   */
  moveTooltip(event: MouseEvent) {
    // Offset para posicionar o tooltip ao lado do cursor
    const offsetX = 15;
    const offsetY = -10;
    this.tooltipX = event.clientX + offsetX;
    this.tooltipY = event.clientY + offsetY;
  }

  /**
   * Limpa o timeout ao destruir o componente
   */
  ngOnDestroy() {
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }
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
