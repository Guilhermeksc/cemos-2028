import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-san-remo-manual',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './san-remo-manual.html',
  styleUrl: './san-remo-manual.scss'
})
export class SanRemoManual implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/direito/7-sanremo';
  fileNames: string[] = [
    'parteI.md',
    'parteII.md',
    'parteIII.md',
    'parteIV.md',
    'parteV.md',
    'parteVI.md'
  ];
  backRoute: string = '/home/app8-direito/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}