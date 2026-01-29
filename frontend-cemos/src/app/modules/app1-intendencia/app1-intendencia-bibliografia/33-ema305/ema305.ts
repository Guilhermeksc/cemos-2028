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
  selector: 'app-ema305',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './ema305.html',
  styleUrl: './ema305.scss',
  encapsulation: ViewEncapsulation.None
})
export class Ema305 implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/intendencia/33-ema-305';
  fileNames: string[] = [
    'cap3.md',
    'cap4.md',
    'cap5.md',
  ];
  backRoute: string = '/home/app1-intendencia/bibliografia';
  backLabel: string = 'Bibliografia';
  
  ngOnInit() {
    // Inicialização do componente
  }
  }