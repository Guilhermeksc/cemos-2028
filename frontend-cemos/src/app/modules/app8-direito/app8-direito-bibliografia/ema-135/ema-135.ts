import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-ema-135',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './ema-135.html',
  styleUrl: './ema-135.scss'
})
export class Ema135 implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/direito/1-ema-135';
  fileNames: string[] = [
    'cap1.md',
    'cap2.md',
    'cap3.md',
    'cap4.md',
    'cap5.md',
    'cap6.md',
    'cap7.md',
    'cap8.md',
    'cap9.md',
    'cap10.md',
    'cap11.md',
    'cap12.md',
    'cap13.md',
    'cap14.md',
  ];
  backRoute: string = '/home/app8-direito/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}