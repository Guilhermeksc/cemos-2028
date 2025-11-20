import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Conceitos } from '../../interfaces/informacoes.interface';

@Component({
  selector: 'app-conceitos-table',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './conceitos-table.html',
  styleUrls: ['./conceitos-table.scss']
})
export class ConceitosTableComponent {
  @Input() conceitos: Conceitos[] = [];
  @Input() showBibliografia: boolean = true;
  @Input() title: string = 'Conceitos';
  @Input() emptyMessage: string = 'Nenhum conceito encontrado';

  constructor(private sanitizer: DomSanitizer) {}

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
   * Processa a descrição convertendo texto entre asteriscos (*texto*) em negrito
   * @param descricao Texto da descrição
   * @returns HTML seguro com texto em negrito onde houver asteriscos
   */
  formatDescricao(descricao: string): SafeHtml {
    if (!descricao) return this.sanitizer.bypassSecurityTrustHtml('');
    
    // Escapa HTML existente para segurança
    const escaped = descricao
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
    
    // Converte *texto* em <strong>texto</strong>
    // Usa regex para encontrar padrões *texto* (não greedy para evitar conflitos)
    const formatted = escaped.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
    
    return this.sanitizer.bypassSecurityTrustHtml(formatted);
  }

  /**
   * TrackBy function para melhor performance da lista
   */
  trackByConceito(index: number, conceito: Conceitos): number {
    return conceito.id;
  }
}