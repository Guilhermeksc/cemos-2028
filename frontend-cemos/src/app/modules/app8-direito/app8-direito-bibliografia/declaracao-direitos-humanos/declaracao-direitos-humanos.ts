import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';


@Component({
  selector: 'app-declaracao-direitos-humanos',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './declaracao-direitos-humanos.html',
  styleUrl: './declaracao-direitos-humanos.scss'
})
export class DeclaracaoDireitosHumanos implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/direito/11-declaracao-universal';
  fileNames: string[] = [
    'declaracao_universal.md'
  ];
  backRoute: string = '/home/app8-direito/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}