import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-cnudm',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './cnudm.html',
  styleUrl: './cnudm.scss'
})
export class Cnudm implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/direito/8-cnudm';
  fileNames: string[] = [
    'parteI.md',
    'parteII.md',
    'parteIII.md',
    'parteIV.md',
    'parteV.md',
    'parteVI.md',
    'parteVII.md',
    'parteVIII-IX-X.md',
    'parteXI.md',
    'parteXII.md',
    'parteXIII.md',
    'parteXIV.md',
  ];
  backRoute: string = '/home/app8-direito/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}