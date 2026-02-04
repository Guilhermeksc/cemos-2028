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
  selector: 'app-sgm201',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './sgm201.html',
  styleUrl: './sgm201.scss',
  encapsulation: ViewEncapsulation.None
})
export class Sgm201 implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/intendencia/13-sgm-201';
  fileNames: string[] = [
    'cap1.md',
    'cap6.md',    
    'cap7.md',
    'cap13.md',
    'cap15.md',
    'cap16.md',                
  ];
  backRoute: string = '/home/app1-intendencia/bibliografia';
  backLabel: string = 'Bibliografia';
  
  ngOnInit() {
    // Inicialização do componente
  }
  }