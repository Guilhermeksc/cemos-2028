import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-politica-nacional-defesa',
    imports: [
      CommonModule,
      HttpClientModule,
      LivroIndividual
    ],
  templateUrl: './politica-nacional-defesa.html',
  styleUrl: './politica-nacional-defesa.scss'
})
export class PoliticaNacionalDefesa  implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/politica/4-politica-nacional-defesa';
  fileNames: string[] = [
    '1.md',
  ];
  backRoute: string = '/home/app7-politica/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}