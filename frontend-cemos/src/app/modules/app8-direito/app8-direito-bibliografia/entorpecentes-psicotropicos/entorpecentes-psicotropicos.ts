import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-entorpecentes-psicotropicos',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './entorpecentes-psicotropicos.html',
  styleUrl: './entorpecentes-psicotropicos.scss'
})
export class EntorpecentesPsicotropicos implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/direito/9-entorpecentes';
  fileNames: string[] = [
    'entorpecentes.md'
  ];
  backRoute: string = '/home/app8-direito/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}