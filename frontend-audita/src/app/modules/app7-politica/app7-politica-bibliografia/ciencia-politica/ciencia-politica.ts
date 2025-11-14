import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-ciencia-politica',
    imports: [
      CommonModule,
      HttpClientModule,
      LivroIndividual
    ],
  templateUrl: './ciencia-politica.html',
  styleUrl: './ciencia-politica.scss'
})
export class CienciaPolitica  implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/politica/1-ciencia-politica';
  fileNames: string[] = [
    '1.md',
    '2.md',
    '3.md',
    '4.md',
    '5.md',
    '6.md',
    '7.md',
    '8.md',
    '10.md',
  ];
  backRoute: string = '/home/app7-politica/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}