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
  selector: 'app-lei-97',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './lei-97.html',
  styleUrl: './lei-97.scss',
  encapsulation: ViewEncapsulation.None
})
export class Lei97 implements OnInit {
// Configuração do LivroIndividual
contentPath: string = 'assets/content/planejamento/1-lei-97';
fileNames: string[] = [
  '1.md',
];
backRoute: string = '/home/app3-planejamento-militar/bibliografia';
backLabel: string = 'Bibliografia';

ngOnInit() {
  // Inicialização do componente
}
}