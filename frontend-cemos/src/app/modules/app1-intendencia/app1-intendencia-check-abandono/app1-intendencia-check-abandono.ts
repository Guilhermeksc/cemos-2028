import { Component } from '@angular/core';
import { CheckAbandono } from '../../../components/check-abandono/check-abandono';

@Component({
  selector: 'app-app1-intendencia-check-abandono',
  standalone: true,
  imports: [CheckAbandono],
  template: '<app-check-abandono jsonPath="intendencia/check-abandono.json"></app-check-abandono>'
})
export class App1IntendenciaCheckAbandono { }
