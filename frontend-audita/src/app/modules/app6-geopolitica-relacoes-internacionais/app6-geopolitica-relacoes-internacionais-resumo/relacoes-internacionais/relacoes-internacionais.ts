import { Component } from '@angular/core';
import { Resumo } from '../../../../components/resumo/resumo';

@Component({
  selector: 'app-relacoes-internacionais',
  standalone: true,
  imports: [Resumo],
  templateUrl: './relacoes-internacionais.html',
  styleUrl: './relacoes-internacionais.scss'
})
export class RelacoesInternacionais {
  // Configurações para o resumo de relações internacionais
  markdownPath = 'geopolitica-ri/resumo-ri.md';
  title = 'Resumo de Relações Internacionais';
  pdfDownloadUrl = '/assets/content/geopolitica-ri/resumo-ri.pdf';
  docxDownloadUrl = '/assets/content/geopolitica-ri/resumo-ri.docx';
}
