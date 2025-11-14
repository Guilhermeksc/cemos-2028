import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-manifesto-agil',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './manifesto-agil.html',
  styleUrl: './manifesto-agil.scss'
})
export class ManifestoAgil  implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/eng-software/bibliografia/manifesto-agil';
  fileNames: string[] = [
    '1.md',
  ];
  backRoute: string = '/home/app7-eng-software/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}