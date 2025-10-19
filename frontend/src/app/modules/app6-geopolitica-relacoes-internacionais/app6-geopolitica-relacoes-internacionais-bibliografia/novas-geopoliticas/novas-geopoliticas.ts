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
  selector: 'app-novas-geopoliticas',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './novas-geopoliticas.html',
  styleUrl: './novas-geopoliticas.scss',
  encapsulation: ViewEncapsulation.None
})

export class NovasGeopoliticas implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/geopolitica-ri/novas-geopoliticas';
  fileNames: string[] = [
    'cap1.md'
  ];
  backRoute: string = '/home/app6-geopolitica-relacoes-internacionais/bibliografia';
  backLabel: string = 'Bibliografia';

  ngOnInit() {
    // Inicialização do componente
  }
}