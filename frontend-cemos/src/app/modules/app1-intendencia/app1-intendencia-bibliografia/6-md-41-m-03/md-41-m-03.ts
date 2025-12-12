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
  selector: 'app-md-41-m-03',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './md-41-m-03.html',
  styleUrl: './md-41-m-03.scss',
  encapsulation: ViewEncapsulation.None
})
export class Md41M03  implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/intendencia/6-md-41-m-03';
  fileNames: string[] = [
    'cap1.md',
    'cap3.md',
    'cap4.md',
    'cap5.md',
    'cap6.md',
    'anexo.md',
  ];
  backRoute: string = '/home/app1-intendencia/bibliografia';
  backLabel: string = 'Bibliografia';
  
  ngOnInit() {
    // Inicialização do componente
  }
  }