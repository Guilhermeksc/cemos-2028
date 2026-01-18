import { Component } from '@angular/core';
import { CheckAbandono } from '../../../components/check-abandono/check-abandono';

@Component({
  selector: 'app-app4-historia-check-abandono',
  standalone: true,
  imports: [CheckAbandono],
  template: '<app-check-abandono jsonPath="historia/check-abandono.json"></app-check-abandono>'
})
export class App4HistoriaCheckAbandono { }
