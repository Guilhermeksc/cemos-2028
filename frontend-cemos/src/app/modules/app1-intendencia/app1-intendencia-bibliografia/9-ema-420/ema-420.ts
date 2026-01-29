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
  selector: 'app-ema-420',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './ema-420.html',
  styleUrl: './ema-420.scss',
  encapsulation: ViewEncapsulation.None
})
export class Ema420 implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/intendencia/9-ema-420';
  fileNames: string[] = [
    'cap1.md',
    'cap2.md',
  ];
  backRoute: string = '/home/app1-intendencia/bibliografia';
  backLabel: string = 'Bibliografia';
  
  ngOnInit() {
    // Inicialização do componente
  }
  }