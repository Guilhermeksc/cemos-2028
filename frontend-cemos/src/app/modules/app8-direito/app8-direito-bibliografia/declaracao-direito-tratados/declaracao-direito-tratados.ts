import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-declaracao-direito-tratados',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './declaracao-direito-tratados.html',
  styleUrl: './declaracao-direito-tratados.scss'
})
export class DeclaracaoDireitoTratados implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/direito/12-convencao-viena';
  fileNames: string[] = [
    'viena_ocr.md'
  ];
  backRoute: string = '/home/app8-direito/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}