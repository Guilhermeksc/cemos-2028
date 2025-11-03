import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-constituicao-brasil',
    imports: [
      CommonModule,
      HttpClientModule,
      LivroIndividual
    ],
  templateUrl: './constituicao-brasil.html',
  styleUrl: './constituicao-brasil.scss'
})
export class ConstituicaoBrasil  implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/politica/2-constituicao-brasil';
  fileNames: string[] = [
    'III.md',
    'IV.md',
    'V.md',
  ];
  backRoute: string = '/home/app7-politica/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}