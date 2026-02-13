import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CapaBibliografia, CapaConfig } from '../../../components/capa-bibliografia/capa-bibliografia';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-app4-historia-bibliografia',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    CapaBibliografia
  ],
  templateUrl: './app4-historia-bibliografia.html',
  styleUrl: './app4-historia-bibliografia.scss'
})
export class App4HistoriaBibliografia implements OnInit {
  public flashcardsPath = '/home/app4-historia/flash-cards';
  public perguntasPath = '/home/app4-historia/perguntas';
  public simuladosPath = '/home/app4-historia/simulados';
  public slidesPath = '/home/app4-historia/slides';
  // Configuração de múltiplas capas
  capas: CapaConfig[] = [
    {
      imagePath: 'assets/content/historia/img/breve_historia.jpg',
      routePath: '/home/app4-historia/bibliografia/breve-historia',
      title: 'Breve História',
      description: 'BLAINEY, Geoffrey.',
      permite_consulta: false
    },
    {
      imagePath: 'assets/content/historia/img/guerra_no_mar.jpg',
      routePath: '/home/app4-historia/bibliografia/guerra-no-mar',
      title: 'Guerra no Mar',
      description: 'VIDIGAL, Armando A. F.; ALVES DE ALMEIDA, Francisco E. (org.)',
      permite_consulta: false
    },
    {
      imagePath: '/assets/content/historia/img/historia_das_guerras.jpg',
      routePath: '/home/app4-historia/bibliografia/historia-das-guerras',
      title: 'História das Guerras',
      description: 'MAGNOLI, Demétrio (org.)',
      permite_consulta: false
    },
    {
      imagePath: 'assets/content/historia/img/sintese_historica.jpg',
      routePath: '/home/app4-historia/bibliografia/sintese-historica',
      title: 'Síntese Histórica',
      description: 'ABREU, Guilherme Mattos de; BARBOSA JUNIOR, Ilques (et al.).',
      permite_consulta: false
    }
  ];

  // Configuração do Markdown (opcional)
  markdownPath = 'assets/content/historia/Bibliografia.md';
  basePath = 'assets/content/historia';

  // Controla se deve mostrar a capa ou não
  showCapa = true;
  
  // Configuração para PDF Slides (passado para capa-bibliografia)
  // Estrutura de subpastas para organizar os PDFs
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
      ] // Adicionar arquivos quando disponíveis
    },
    {
      name: 'Síntese Histórica',
      path: 'historia/sintese-historica/pdf',
      files: [] // Adicionar arquivos quando disponíveis
    }
  ];

  constructor(private router: Router) {}

  /**
   * NOTA: Este componente exibe a capa quando na rota /bibliografia
   * e renderiza os componentes filhos quando navegamos para subrotas.
   * 
   * Rotas:
   * - /app6-geopolitica-relacoes-internacionais/bibliografia → Mostra CAPA
   * - /app6-geopolitica-relacoes-internacionais/bibliografia/vinganca-geografia → Mostra LIVRO
   * - /app6-geopolitica-relacoes-internacionais/bibliografia/geopolitica-modernidade → Mostra LIVRO
   * - etc.
   * 
   * Os componentes filhos são renderizados pelo <router-outlet>
   */

  ngOnInit(): void {
    // Escuta mudanças de rota para decidir se mostra a capa ou não
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Mostra capa apenas se estamos exatamente na rota /bibliografia
        // (sem subrotas ativas)
        this.showCapa = event.url.endsWith('/bibliografia');
      });

    // Verifica a rota inicial
    this.showCapa = this.router.url.endsWith('/bibliografia');
  }
}
