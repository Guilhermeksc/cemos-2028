import { Component } from '@angular/core';
import { CheckAbandono } from '../../../components/check-abandono/check-abandono';

@Component({
  selector: 'app-app7-politica-check-abandono',
  standalone: true,
  imports: [CheckAbandono],
  template: '<app-check-abandono jsonPath="politica/check-abandono.json"></app-check-abandono>'
})
export class App7PoliticaCheckAbandono { }
