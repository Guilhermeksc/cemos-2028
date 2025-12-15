import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubMenu, SubMenuItem } from '../../../../components/sub-menu/sub-menu';
import { ContentService } from '../../../../services/content.service';
import { BibliografiaCompleta } from '../../../../components/bibliografia-completa/bibliografia-completa';
import { BibliografiaCompletaData } from '../../../../interfaces/bibliografia-completa.interface';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-md-30-m-01',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './md-30-m-01.html',
  styleUrl: './md-30-m-01.scss',
  encapsulation: ViewEncapsulation.None
})
export class Md30M01 implements OnInit {
// Configuração do LivroIndividual
contentPath: string = 'assets/content/planejamento/3-md-30-m-01';
fileNames: string[] = [
  'cap2.md',
  'cap3.md',
  'cap4.md',
  'cap5.md',
  'cap6.md',
  'cap7.md',
  'cap8.md',
  'cap10.md',
  'cap11.md',
  'cap14.md',
];
backRoute: string = '/home/app3-planejamento-militar/bibliografia';
backLabel: string = 'Bibliografia';

ngOnInit() {
  // Inicialização do componente
}
}