import { Component } from '@angular/core';
import { CheckAbandono } from '../../../components/check-abandono/check-abandono';

@Component({
  selector: 'app-app2-estrategia-check-abandono',
  standalone: true,
  imports: [CheckAbandono],
  template: '<app-check-abandono jsonPath="estrategia/check-abandono.json"></app-check-abandono>'
})
export class App2EstrategiaCheckAbandono {

}

