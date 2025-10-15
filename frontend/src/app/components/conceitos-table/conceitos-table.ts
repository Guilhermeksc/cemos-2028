import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Conceitos } from '../../interfaces/informacoes.interface';

@Component({
  selector: 'app-conceitos-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conceitos-table.html',
  styleUrls: ['./conceitos-table.scss']
})
export class ConceitosTableComponent {
  @Input() conceitos: Conceitos[] = [];
  @Input() showBibliografia: boolean = true;
  @Input() title: string = 'Conceitos';
  @Input() emptyMessage: string = 'Nenhum conceito encontrado';

  constructor() {}

  /**
   * Verifica se o conceito caiu em prova e retorna o ano
   */
  getCaiuEmProvaText(conceito: Conceitos): string {
    if (conceito.caiu_em_prova && conceito.ano_prova) {
      return `Prova ${conceito.ano_prova}`;
    }
    return '';
  }

  /**
   * Retorna a classe CSS para o alerta de prova
   */
  getProvaAlertClass(conceito: Conceitos): string {
    if (conceito.caiu_em_prova) {
      return 'prova-alert';
    }
    return '';
  }

  /**
   * Verifica se a descrição está disponível
   */
  hasDescricao(conceito: Conceitos): boolean {
    return !!(conceito.descricao && conceito.descricao.trim().length > 0);
  }

  /**
   * Trunca a descrição se for muito longa
   */
  getTruncatedDescricao(descricao: string, maxLength: number = 150): string {
    if (!descricao) return '';
    return descricao.length > maxLength 
      ? descricao.substring(0, maxLength) + '...' 
      : descricao;
  }

  /**
   * TrackBy function para melhor performance da lista
   */
  trackByConceito(index: number, conceito: Conceitos): number {
    return conceito.id;
  }
}