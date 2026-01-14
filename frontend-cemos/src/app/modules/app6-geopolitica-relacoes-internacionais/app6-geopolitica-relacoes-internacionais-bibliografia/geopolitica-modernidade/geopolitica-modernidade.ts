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
    selector: 'app-geopolitica-modernidade',
    imports: [
      CommonModule,
      HttpClientModule,
      LivroIndividual
    ],
    templateUrl: './geopolitica-modernidade.html',
    styleUrl: './geopolitica-modernidade.scss',
    encapsulation: ViewEncapsulation.None
  })
  
export class GeopoliticaModernidade implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/geopolitica-ri/geopolitica-modernidade';
  fileNames: string[] = [
    'capI.md',
    'capII.md',
    'capIII.md',
    'capIV.md',
    'capV.md',
    'capVI.md',
    'capVII.md',
    'capVIII.md',
    'anexo1.md',
    'anexo2.md',    
  ];
  backRoute: string = '/home/app6-geopolitica-relacoes-internacionais/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}