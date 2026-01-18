import { Component } from '@angular/core';
import { CheckAbandono } from '../../../components/check-abandono/check-abandono';

@Component({
  selector: 'app-app6-geopolitica-relacoes-internacionais-check-abandono',
  standalone: true,
  imports: [CheckAbandono],
  template: '<app-check-abandono jsonPath="geopolitica-ri/check-abandono.json"></app-check-abandono>'
})
export class App6GeopoliticaRelacoesInternacionaisCheckAbandono { }
