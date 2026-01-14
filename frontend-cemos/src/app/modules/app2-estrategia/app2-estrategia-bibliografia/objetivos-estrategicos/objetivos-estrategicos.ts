import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LivroIndividualService } from '../../../../services/livro-individual.service';

interface MenuItem {
  id: string;
  title: string;
  markdownPath?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-objetivos-estrategicos',
  imports: [
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './objetivos-estrategicos.html',
  styleUrl: './objetivos-estrategicos.scss',
  encapsulation: ViewEncapsulation.None
})
export class ObjetivosEstrategicos implements OnInit {
  isLoading: boolean = false;
  htmlContent: SafeHtml = '';
  selectedMenuItemId: string = 'objetivos-estrategicos';
  
  private readonly basePath = 'assets/content/estrategia/3-ema-310';
  
  menuItems: MenuItem[] = [
    {
      id: 'objetivos-estrategicos',
      title: 'Objetivos Estratégicos',
      markdownPath: `${this.basePath}/tabela.md`
    },
    {
      id: 'prioridades-estrategicas',
      title: 'Prioridades Estratégicas',
      children: [
        {
          id: 'pe-apoio-acoes-estado',
          title: 'Apoio às Ações do Estado',
          markdownPath: `${this.basePath}/PE_apoio_acoes_estado.md`
        },
        {
          id: 'pe-defesa-naval',
          title: 'Defesa Naval',
          markdownPath: `${this.basePath}/PE_defesa_naval.md`
        },
        {
          id: 'pe-diplomacia-naval',
          title: 'Diplomacia Naval',
          markdownPath: `${this.basePath}/PE_diplomacia_naval.md`
        },
        {
          id: 'pe-seguranca-maritima',
          title: 'Segurança Marítima',
          markdownPath: `${this.basePath}/PE_seguranca_maritima.md`
        }
      ]
    },
    {
      id: 'analise-riscos',
      title: 'Análise de Riscos',
      markdownPath: `${this.basePath}/riscos.md`
    },
    {
      id: 'dimensionamento-forca',
      title: 'Dimensionamento da Força',
      children: [
        {
          id: 'dimensionamento-dimensionados',
          title: 'Elementos de Força dimensionados',
          markdownPath: `${this.basePath}/dimensionamento_1.md`
        },
        {
          id: 'dimensionamento-nao-dimensionados',
          title: 'Elementos de Força ainda não foram dimensionados',
          markdownPath: `${this.basePath}/dimensionamento_2.md`
        }
      ]
    }
  ];

  constructor(
    private livroService: LivroIndividualService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadContent(this.menuItems[0].markdownPath!);
  }

  selectMenuItem(item: MenuItem, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    
    if (item.markdownPath) {
      this.selectedMenuItemId = item.id;
      this.loadContent(item.markdownPath);
    }
    // Itens com children sempre abertos, não faz nada ao clicar
  }

  selectSubMenuItem(parentId: string, subItem: MenuItem, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    
    if (subItem.markdownPath) {
      this.selectedMenuItemId = subItem.id;
      this.loadContent(subItem.markdownPath);
    }
  }

  isSelected(item: MenuItem): boolean {
    return this.selectedMenuItemId === item.id;
  }

  isSubItemSelected(subItem: MenuItem): boolean {
    return this.selectedMenuItemId === subItem.id;
  }

  private loadContent(markdownPath: string) {
    this.isLoading = true;
    
    this.livroService.loadMarkdownFile(markdownPath).subscribe({
      next: (content) => {
        const html = this.livroService.markdownToHtml(
          content,
          this.basePath
        );
        this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar arquivo Markdown:', error);
        this.isLoading = false;
      }
    });
  }
}

