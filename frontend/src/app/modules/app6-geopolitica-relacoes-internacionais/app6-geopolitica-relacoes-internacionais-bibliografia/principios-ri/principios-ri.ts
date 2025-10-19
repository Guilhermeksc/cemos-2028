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
  selector: 'app-principios-ri',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './principios-ri.html',
  styleUrl: './principios-ri.scss',
  encapsulation: ViewEncapsulation.None
})

export class PrincipiosRi implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/geopolitica-ri/principios-ri';
  fileNames: string[] = [
    'cap1.md',
    'cap2.md',
    'cap3.md'
  ];
  backRoute: string = '/home/app6-geopolitica-relacoes-internacionais/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}