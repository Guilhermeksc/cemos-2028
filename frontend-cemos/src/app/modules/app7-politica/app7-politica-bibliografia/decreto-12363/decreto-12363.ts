import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-decreto-12363',
    imports: [
      CommonModule,
      HttpClientModule,
      LivroIndividual
    ],
  templateUrl: './decreto-12363.html',
  styleUrl: './decreto-12363.scss'
})
export class Decreto12363  implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/politica/9-decreto-12363';
  fileNames: string[] = [
    '1.md',
  ];
  backRoute: string = '/home/app7-politica/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}