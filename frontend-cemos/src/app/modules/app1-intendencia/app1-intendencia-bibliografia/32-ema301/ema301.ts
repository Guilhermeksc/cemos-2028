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
  selector: 'app-ema301',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './ema301.html',
  styleUrl: './ema301.scss',
  encapsulation: ViewEncapsulation.None
})
export class Ema301 implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/intendencia/32-ema-301';
  fileNames: string[] = [
    'cap1.md',
  ];
  backRoute: string = '/home/app1-intendencia/bibliografia';
  backLabel: string = 'Bibliografia';
  
  ngOnInit() {
    // Inicialização do componente
  }
  }