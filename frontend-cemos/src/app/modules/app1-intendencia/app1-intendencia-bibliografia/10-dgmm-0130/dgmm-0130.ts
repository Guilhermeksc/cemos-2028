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
  selector: 'app-dgmm-0130',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './dgmm-0130.html',
  styleUrl: './dgmm-0130.scss',
  encapsulation: ViewEncapsulation.None
})
export class Dgmm0130 implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/intendencia/10-dgmm-0130';
  fileNames: string[] = [
    'cap1.md',
    'cap2.md',
    'cap8.md',
    'cap9.md',            
  ];
  backRoute: string = '/home/app1-intendencia/bibliografia';
  backLabel: string = 'Bibliografia';
  
  ngOnInit() {
    // Inicialização do componente
  }
  }