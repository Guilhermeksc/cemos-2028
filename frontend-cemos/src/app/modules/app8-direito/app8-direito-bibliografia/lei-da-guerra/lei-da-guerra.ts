import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-lei-da-guerra',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './lei-da-guerra.html',
  styleUrl: './lei-da-guerra.scss'
})
export class LeiDaGuerra implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/direito/2-lei-da-guerra';
  fileNames: string[] = [
    'cap1.md',
    'cap2.md',
    'cap3.md',
    'cap4.md',
    'cap5.md',
  ];
  backRoute: string = '/home/app8-direito/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}
