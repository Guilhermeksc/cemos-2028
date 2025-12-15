import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-protocolo-ii',
    imports: [
      CommonModule,
      HttpClientModule,
      LivroIndividual
    ],
  templateUrl: './protocolo-ii.html',
  styleUrl: './protocolo-ii.scss'
})
export class ProtocoloII  implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/direito/6-protocolo-II';
  fileNames: string[] = [
    'protocolo-II.md'
  ];
  backRoute: string = '/home/app8-direito/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}