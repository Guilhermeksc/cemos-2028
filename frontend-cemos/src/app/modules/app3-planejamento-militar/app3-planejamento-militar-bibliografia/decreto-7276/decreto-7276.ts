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
  selector: 'app-decreto-7276',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './decreto-7276.html',
  styleUrl: './decreto-7276.scss',
  encapsulation: ViewEncapsulation.None
})
export class Decreto7276 implements OnInit {
// Configuração do LivroIndividual
contentPath: string = 'assets/content/planejamento/2-decreto-7276';
fileNames: string[] = [
  '1.md',
];
backRoute: string = '/home/app3-planejamento-militar/bibliografia';
backLabel: string = 'Bibliografia';

ngOnInit() {
  // Inicialização do componente
}
}