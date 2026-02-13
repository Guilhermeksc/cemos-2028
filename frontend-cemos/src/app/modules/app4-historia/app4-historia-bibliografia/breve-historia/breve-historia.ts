  import { Component, OnInit, ViewEncapsulation } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { HttpClientModule } from '@angular/common/http';
  import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-breve-historia',
  imports: [
    CommonModule,
    HttpClientModule,
    LivroIndividual
  ],
  templateUrl: './breve-historia.html',
  styleUrl: './breve-historia.scss',
  encapsulation: ViewEncapsulation.None
})
export class BreveHistoria implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/historia/breve-historia';
  fileNames: string[] = [
    'cap1.md',
    'cap3.md',
    'cap4.md',
    'cap5.md',
    'cap6.md',
    'cap7.md',
    'cap9.md',
    'cap10.md',
    'cap11.md',
    'cap12.md',
    'cap13.md',
    'cap14.md',
    'cap15.md',
    'cap16.md',
    'cap18.md',
    'cap19.md',
    'cap23.md',
    'cap24.md',
    'cap26.md',
  ];
  backRoute: string = '/home/app4-historia/bibliografia';
  backLabel: string = 'Bibliografia';
  
  // Configuração para PDF Slides (estrutura de subpastas)
  pdfSlidesFolders: Array<{name: string, path: string, files: string[]}> = [
    {
      name: 'Breve História do Século XX',
      path: 'historia/breve-historia/pdf',
      files: [
        'Cap1-Aurora_Resplandecente.pdf',
        'Cap3-Tempestade_Mudancas.pdf',
        'Cap4-Guerra_das_Guerras.pdf',
        'Cap5-Revolta_Petrogrado.pdf',
        'Cap6-Utopia_Pesadelo.pdf',
        'Cap7-Velho_Sultao.pdf',
        'Cap9-Percussionis_taItaliano.pdf',
        'Cap10-Depressao_Mundial.pdf',
        'Cap11-Ascensao_Hitler.pdf',
        'Cap12-Uma_Segunda_Guerra_Mundial.pdf',
        'Cap13-De_Pearl_Harbor_a_Berlim.pdf',
        'Cap14-Arma_Secreta_Fim_da_Guerra_Inicio_de_Uma_Era.pdf',
        'Cap15-Cai_o_pano.pdf',
        'Cap16-A_Flecha_Flamejante_e_os_Ventos_da_Mudança.pdf',
        'Cap18-AsNavesdaVinganca.pdf',
        'Cap19-AIlhaeoNavioFantasma.pdf',
        'Cap23-RaioseTrovoesemMoscoueVarsovia.pdf',
        'Cap24-AQuedadosMuros.pdf',
        'Cap26-LuadoIslaBrilhaoutraVez.pdf',
      ]
    }
  ];

  ngOnInit() {
    // Inicialização do componente
  }
}