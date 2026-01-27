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
  selector: 'app-cadeias-suprimentos-logistica',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './cadeias-suprimentos-logistica.html',
  styleUrl: './cadeias-suprimentos-logistica.scss',
  encapsulation: ViewEncapsulation.None
})

export class CadeiasSuprimentosLogistica {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/intendencia/1-correa';
  fileNames: string[] = [
    'cap1.md',
    'cap1-execicios.md',
    'cap2.md',
    'cap2-execicios.md',
    'cap3.md',
    'cap3-exercicios.md',
    'cap4.md',
    'cap4-exercicios.md',
    'cap5.md',
    'cap5-exercicios.md',
    'cap8.md',
    'cap8-exercicios.md',
    'cap9.md',
    'cap9-exercicios.md'
  ];
  backRoute: string = '/home/app1-intendencia/bibliografia';
  backLabel: string = 'Bibliografia';
  
  ngOnInit() {
    // Inicialização do componente
  }
}
