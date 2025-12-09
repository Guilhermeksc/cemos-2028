import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-economia-brasileira',
    imports: [
      CommonModule,
      HttpClientModule,
      LivroIndividual
    ],
  templateUrl: './economia-brasileira.html',
  styleUrl: './economia-brasileira.scss'
})
export class EconomiaBrasileira implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/economia/1-economia-br';
  fileNames: string[] = [
    'economia_cap1_ocr.md',
    'economia_cap2_ocr.md',
    'economia_cap3_ocr.md',
    'economia_cap5_ocr.md',
    'economia_cap6_ocr.md',
    'economia_cap7_ocr.md',
    'economia_cap8_ocr.md',
    'economia_cap9_ocr.md',
    'economia_cap10_ocr.md',
    'economia_cap19_ocr.md',
  ];
  backRoute: string = '/home/app9-economia/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}