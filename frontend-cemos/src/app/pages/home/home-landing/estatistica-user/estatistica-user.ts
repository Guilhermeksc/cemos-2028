import { Component } from '@angular/core';
import { EstatisticasComponent } from '../../../../components/perguntas/estatisticas/estatisticas';

@Component({
  selector: 'app-estatistica-user',
  standalone: true,
  imports: [EstatisticasComponent],
  templateUrl: './estatistica-user.html',
  styleUrl: './estatistica-user.scss'
})
export class EstatisticaUser {

}
