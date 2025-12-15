import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-protocolo-i',
    imports: [
      CommonModule,
      HttpClientModule,
      LivroIndividual
    ],
  templateUrl: './protocolo-i.html',
  styleUrl: './protocolo-i.scss'
})
export class ProtocoloI  implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/direito/5-protocolo-I';
  fileNames: string[] = [
    'protocolo-I.md'
  ];
  backRoute: string = '/home/app8-direito/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}