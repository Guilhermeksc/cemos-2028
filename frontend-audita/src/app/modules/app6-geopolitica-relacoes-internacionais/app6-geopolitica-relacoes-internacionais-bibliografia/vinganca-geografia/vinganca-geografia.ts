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
  selector: 'app-vinganca-geografia',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './vinganca-geografia.html',
  styleUrl: './vinganca-geografia.scss',
  encapsulation: ViewEncapsulation.None
})

export class VingancaGeografia implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/geopolitica-ri/vinganca-geografia';
  fileNames: string[] = [
    'capX.md',
    'capXI.md',
    'capXII.md'
  ];
  backRoute: string = '/home/app6-geopolitica-relacoes-internacionais/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}