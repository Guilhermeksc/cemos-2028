  import { Component, OnInit, ViewEncapsulation } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { HttpClientModule } from '@angular/common/http';
  import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-breve-historia',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './breve-historia.html',
  styleUrl: './breve-historia.scss',
  encapsulation: ViewEncapsulation.None
})
export class BreveHistoria implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/historia/breve-historia';
  fileNames: string[] = [
    'cap1.md',
    'cap3.md',
    'cap4.md',
    'cap5.md',
    'cap6.md',
    'cap7.md',
    'cap9.md',
    'cap10.md',
    'cap11.md',
    'cap12.md',
    'cap13.md',
    'cap14.md',
    'cap15.md',
    'cap16.md',
    'cap18.md',
    'cap19.md',
    'cap23.md',
    'cap24.md',
    'cap26.md',
  ];
  backRoute: string = '/home/app4-historia/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}