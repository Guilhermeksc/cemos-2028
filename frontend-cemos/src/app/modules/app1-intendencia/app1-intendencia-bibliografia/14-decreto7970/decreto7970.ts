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
  selector: 'app-decreto7970',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './decreto7970.html',
  styleUrl: './decreto7970.scss',
  encapsulation: ViewEncapsulation.None
})
export class Decreto7970 implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/intendencia/14-7970-2013';
  fileNames: string[] = [
    'cap1.md',
  ];
  backRoute: string = '/home/app1-intendencia/bibliografia';
  backLabel: string = 'Bibliografia';
  
  ngOnInit() {
    // Inicialização do componente
  }
  }