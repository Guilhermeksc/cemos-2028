import { Component } from '@angular/core';
import { CheckAbandono } from '../../../components/check-abandono/check-abandono';

@Component({
  selector: 'app-app3-check-abandono',
  standalone: true,
  imports: [CheckAbandono],
  template: '<app-check-abandono jsonPath="planejamento/check-abandono.json"></app-check-abandono>'
})
export class App3CheckAbandono {

}
