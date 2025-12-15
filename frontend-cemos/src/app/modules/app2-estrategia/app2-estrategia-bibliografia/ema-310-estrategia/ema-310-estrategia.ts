import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';


@Component({
  selector: 'app-ema-310-estrategia',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './ema-310-estrategia.html',
  styleUrl: './ema-310-estrategia.scss',
  encapsulation: ViewEncapsulation.None
})
export class Ema310Estrategia implements OnInit {
// Configuração do LivroIndividual
contentPath: string = 'assets/content/estrategia/3-ema-310';
fileNames: string[] = [
  'cap1.md',
  'cap2.md',
  'cap3.md',
];
backRoute: string = '/home/app2-estrategia/bibliografia';
backLabel: string = 'Bibliografia';

ngOnInit() {
  // Inicialização do componente
}
}