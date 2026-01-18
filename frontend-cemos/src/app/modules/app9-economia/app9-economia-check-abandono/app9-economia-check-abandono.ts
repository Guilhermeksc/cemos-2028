import { Component } from '@angular/core';
import { CheckAbandono } from '../../../components/check-abandono/check-abandono';

@Component({
  selector: 'app-app9-economia-check-abandono',
  standalone: true,
  imports: [CheckAbandono],
  template: '<app-check-abandono jsonPath="economia/check-abandono.json"></app-check-abandono>'
})
export class App9EconomiaCheckAbandono { }
