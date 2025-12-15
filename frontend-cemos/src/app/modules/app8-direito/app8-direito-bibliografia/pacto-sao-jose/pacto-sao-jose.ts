import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';


@Component({
  selector: 'app-pacto-sao-jose',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './pacto-sao-jose.html',
  styleUrl: './pacto-sao-jose.scss'
})
export class PactoSaoJose implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/direito/10-pacto-san-jose';
  fileNames: string[] = [
    'san_jose.md'
  ];
  backRoute: string = '/home/app8-direito/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}