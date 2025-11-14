import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-ema-323',
    imports: [
      CommonModule,
      HttpClientModule,
      LivroIndividual
    ],
  templateUrl: './ema-323.html',
  styleUrl: './ema-323.scss'
})
export class Ema323  implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/politica/8-ema-323';
  fileNames: string[] = [
    '1.md',
  ];
  backRoute: string = '/home/app7-politica/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}