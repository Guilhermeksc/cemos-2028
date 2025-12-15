import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-guerra-no-mar',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './guerra-no-mar.html',
  styleUrl: './guerra-no-mar.scss'
})
export class GuerraNoMar implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/historia/guerras-mar';
  fileNames: string[] = [
    'cap12.md',
    'cap13.md',
    'cap14.md',
    'cap15.md',
  ];
  backRoute: string = '/home/app4-historia/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}