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
  selector: 'app-lei14133',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './lei14133.html',
  styleUrl: './lei14133.scss',
  encapsulation: ViewEncapsulation.None
})
export class Lei14133 implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/intendencia/16-14133-2021';
  fileNames: string[] = [
    'titulo1.md',
    'titulo2.md',
    'titulo3.md',
    'titulo4.md',
    'titulo5.md',
  ];
  backRoute: string = '/home/app1-intendencia/bibliografia';
  backLabel: string = 'Bibliografia';
  
  ngOnInit() {
    // Inicialização do componente
  }
  }
