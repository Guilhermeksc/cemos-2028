import { Component } from '@angular/core';
import { Resumo } from '../../../../components/resumo/resumo';

@Component({
  selector: 'app-geopolitica',
  standalone: true,
  imports: [Resumo],
  templateUrl: './geopolitica.html',
  styleUrl: './geopolitica.scss'
})
export class Geopolitica {
  // Configurações para o resumo de geopolítica
  markdownPath = 'geopolitica-ri/resumo-geopolitica.md';
  title = 'Resumo de Geopolítica';
  pdfDownloadUrl = '/assets/content/geopolitica-ri/resumo-geopolitica.pdf';
  docxDownloadUrl = '/assets/content/geopolitica-ri/resumo-geopolitica.docx';
}
