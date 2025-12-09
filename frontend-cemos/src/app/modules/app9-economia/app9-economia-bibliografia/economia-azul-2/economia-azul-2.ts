import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-economia-azul-2',
    imports: [
      CommonModule,
      HttpClientModule,
      LivroIndividual
    ],
  templateUrl: './economia-azul-2.html',
  styleUrl: './economia-azul-2.scss'
})
export class EconomiaAzul2 implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/economia/3-economia-azul';
  fileNames: string[] = [
    'economia_azul_cap1.md'
  ];
  backRoute: string = '/home/app9-economia/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}