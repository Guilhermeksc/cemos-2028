import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-historia-das-guerras',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './historia-das-guerras.html',
  styleUrl: './historia-das-guerras.scss'
})
export class HistoriaDasGuerras implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/historia/historia-guerras';
  fileNames: string[] = [
    'cap1.md',
    'cap2.md',
    'cap3.md',
  ];
  backRoute: string = '/home/app4-historia/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}