import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-sintese-historica',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './sintese-historica.html',
  styleUrl: './sintese-historica.scss'
})
export class SinteseHistorica implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/historia/sintese-historica';
  fileNames: string[] = [
    'capix.md',
    'capx.md',
    'capxi.md',
    'capxii.md',
    'capxiii.md',
  ];
  backRoute: string = '/home/app4-historia/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}