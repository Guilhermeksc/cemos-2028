import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-lei-complementar-97',
    imports: [
      CommonModule,
      HttpClientModule,
      LivroIndividual
    ],
  templateUrl: './lei-complementar-97.html',
  styleUrl: './lei-complementar-97.scss'
})
export class LeiComplementar97  implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/politica/5-lei-complementar-97';
  fileNames: string[] = [
    '1.md',
  ];
  backRoute: string = '/home/app7-politica/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}