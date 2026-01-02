import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-estrategias-maritimas',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './estrategias-maritimas.html',
  styleUrl: './estrategias-maritimas.scss',
  encapsulation: ViewEncapsulation.None
})
export class EstrategiasMaritimas implements OnInit {
// Configuração do LivroIndividual
contentPath: string = 'assets/content/estrategia/2-estrategias-maritimas';
fileNames: string[] = [
  'cap1.md',
  'cap4.md',
  'cap5.md',
  'cap6.md',  
];
backRoute: string = '/home/app2-estrategia/bibliografia';
backLabel: string = 'Bibliografia';

ngOnInit() {
  // Inicialização do componente
}
}