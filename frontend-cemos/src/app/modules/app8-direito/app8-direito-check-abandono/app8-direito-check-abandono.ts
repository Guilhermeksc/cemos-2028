import { Component } from '@angular/core';
import { CheckAbandono } from '../../../components/check-abandono/check-abandono';

@Component({
  selector: 'app-app8-direito-check-abandono',
  standalone: true,
  imports: [CheckAbandono],
  template: '<app-check-abandono jsonPath="direito/check-abandono.json"></app-check-abandono>'
})
export class App8DireitoCheckAbandono { }
