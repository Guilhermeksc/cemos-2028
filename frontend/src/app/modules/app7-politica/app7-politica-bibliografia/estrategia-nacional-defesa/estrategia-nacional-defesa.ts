import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-estrategia-nacional-defesa',
    imports: [
      CommonModule,
      HttpClientModule,
      LivroIndividual
    ],
  templateUrl: './estrategia-nacional-defesa.html',
  styleUrl: './estrategia-nacional-defesa.scss'
})
export class EstrategiaNacionalDefesa  implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/politica/3-estrategia-nacional-defesa';
  fileNames: string[] = [
    '1.md',
  ];
  backRoute: string = '/home/app7-politica/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}