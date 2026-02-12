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
        'Cap6-UtopiaPesadelo.pdf',
        'Cap7-VelhoSultao.pdf',
        'Cap9-PercussionistaItaliano.pdf',
        'Cap10-DepressaoMundial.pdf',
        'Cap11-AscensaoHitler.pdf',
        'Cap12-UmaSegundaGuerraMundial.pdf',
        'Cap13-DePearlHarboraQuedadeBerlim.pdf',
        'Cap14-UmaArmaMuitoSecreta.pdf',
        'Cap15-CaioPano.pdf',
        'Cap16-AFlechaFlamenjanteeosVentosdaMudanca.pdf',
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
