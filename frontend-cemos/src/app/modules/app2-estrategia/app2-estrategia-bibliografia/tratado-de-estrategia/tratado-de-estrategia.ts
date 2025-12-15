import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';


@Component({
  selector: 'app-tratado-de-estrategia',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './tratado-de-estrategia.html',
  styleUrl: './tratado-de-estrategia.scss',
  encapsulation: ViewEncapsulation.None
})
export class TratadoDeEstrategia implements OnInit {
// Configuração do LivroIndividual
contentPath: string = 'assets/content/estrategia/1-tratado-estrategia';
fileNames: string[] = [
  'cap1.md',
  'cap2.md',
  'cap3.md',
  'cap4.md',
  'cap5.md',
  'cap8.md',
  'cap9.md',
  'cap10.md',
  'cap11.md',
  'cap12.md',
  'cap14.md',
  'cap15.md',
  'cap16.md',
  'cap17.md',
];
backRoute: string = '/home/app2-estrategia/bibliografia';
backLabel: string = 'Bibliografia';

ngOnInit() {
  // Inicialização do componente
}
}