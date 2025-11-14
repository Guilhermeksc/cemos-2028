import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-decreto-12481',
    imports: [
      CommonModule,
      HttpClientModule,
      LivroIndividual
    ],
  templateUrl: './decreto-12481.html',
  styleUrl: './decreto-12481.scss'
})
export class Decreto12481  implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/politica/6-decreto-12481';
  fileNames: string[] = [
    '1.md',
  ];
  backRoute: string = '/home/app7-politica/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}