import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfSlidesViewer, PDFFolder } from '../../../components/pdf-slides-viewer/pdf-slides-viewer';

@Component({
  selector: 'app-app4-historia-slides',
  standalone: true,
  imports: [
    CommonModule,
    PdfSlidesViewer
  ],
  templateUrl: './app4-historia-slides.html',
  styleUrl: './app4-historia-slides.scss'
})
export class App4HistoriaSlides implements OnInit {
  // Configuração para PDF Slides
  pdfSlidesFolders: PDFFolder[] = [
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
    },
    {
      name: 'Guerra no Mar',
      path: 'historia/guerras-mar/pdf',
      files: [] // Adicionar arquivos quando disponíveis
    },
    {
      name: 'História das Guerras',
      path: 'historia/historia-guerras/pdf',
      files: [
        'Cap1-Guerra_da_Indochina.pdf',
        'Cap2-Guerras_Árabe_Israelenses.pdf',
        'Cap3-Guerras_do_Golfo.pdf',
      ]
    },
    {
      name: 'Síntese Histórica',
      path: 'historia/sintese-historica/pdf',
      files: [] // Adicionar arquivos quando disponíveis
    }
  ];

  ngOnInit() {
    // Inicialização do componente
  }
}
