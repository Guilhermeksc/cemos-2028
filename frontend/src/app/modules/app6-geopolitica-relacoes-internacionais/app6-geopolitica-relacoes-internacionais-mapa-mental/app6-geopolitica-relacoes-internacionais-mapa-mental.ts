import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaMental } from '../../../components/mapa-mental/mapa-mental';
import { HeaderConcentComponent } from '../../../components/header-concent/header-concent';

@Component({
  selector: 'app-app6-geopolitica-relacoes-internacionais-mapa-mental',
  standalone: true,
  imports: [CommonModule, MapaMental, HeaderConcentComponent],
  templateUrl: './app6-geopolitica-relacoes-internacionais-mapa-mental.html',
  styleUrls: ['./app6-geopolitica-relacoes-internacionais-mapa-mental.scss']
})
export class App6GeopoliticaRelacoesInternacionaisMapaMental {
  // Allow the parent module/page to pass a list of files (absolute or relative) to the MapaMental component.
  @Input() files?: string[] = [
    '/assets/content/geopolitica-ri/json/cap1.json',
    '/assets/content/geopolitica-ri/json/cap2.json',
    '/assets/content/geopolitica-ri/json/cap3.json'
  ];
  @Input() basePath = '/assets/content';
  @Input() folder = 'geopolitica-ri/json';
  @Input() requireExplicitFiles = true;

  pageTitle = 'Mapa Mental de Geopolítica e Relações Internacionais';
}
