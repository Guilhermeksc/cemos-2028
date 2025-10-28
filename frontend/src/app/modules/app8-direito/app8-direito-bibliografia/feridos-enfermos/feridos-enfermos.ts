import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-feridos-enfermos',
    imports: [
      CommonModule,
      HttpClientModule,
      LivroIndividual
    ],
  templateUrl: './feridos-enfermos.html',
  styleUrl: './feridos-enfermos.scss'
})
export class FeridosEnfermos  implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/direito/4-feridos-enfermos';
  fileNames: string[] = [
    '1.md'
  ];
  backRoute: string = '/home/app8-direito/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}