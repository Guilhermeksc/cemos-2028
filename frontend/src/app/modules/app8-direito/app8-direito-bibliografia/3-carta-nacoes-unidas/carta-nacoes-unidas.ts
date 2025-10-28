  import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { HttpClientModule } from '@angular/common/http';
  import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-carta-nacoes-unidas',
    imports: [
      CommonModule,
      HttpClientModule,
      LivroIndividual
    ],
  templateUrl: './carta-nacoes-unidas.html',
  styleUrl: './carta-nacoes-unidas.scss'
})
export class CartaNacoesUnidas  implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/direito/3-carta-nacoes-unidas';
  fileNames: string[] = [
    '1.md'
  ];
  backRoute: string = '/home/app8-direito/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}