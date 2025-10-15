import { Component, ChangeDetectorRef, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ContentService } from '../../services/content.service';
import { BibliografiaConfig, BibliografiaTopic } from '../../interfaces/bibliografia-topic.interface';

@Component({
  selector: 'app-generic-bibliografia',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, NgIf, NgFor],
  templateUrl: './generic-bibliografia.html',
  styleUrl: './generic-bibliografia.scss',
  encapsulation: ViewEncapsulation.None
})
export class GenericBibliografia implements OnInit {
  /** Configuração base */
  @Input() config!: BibliografiaConfig;

  /** Parâmetros configuráveis */
  @Input() assunto = '';
  @Input() proposito = '';
  @Input() materias: { letra: string; titulo: string; topicos: string[] }[] = [];
  @Input() bibliografias: { letra: string; titulo: string; itens: string[] }[] = [];
  @Input() pdfUrl = '';
  @Input() wordUrl = '';

  hasActiveChild = false;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private contentService: ContentService
  ) {}

  ngOnInit(): void {}

  /** Converte número em algarismo romano */
  toRoman(num: number): string {
    const map: Record<number, string> = {
      1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V',
      6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X'
    };
    return map[num] || num.toString();
  }

  /** Ativação/desativação do router-outlet */
  onRouteActivate(): void {
    this.hasActiveChild = true;
    this.cdr.detectChanges();
  }

  onRouteDeactivate(): void {
    this.hasActiveChild = false;
    this.cdr.detectChanges();
  }

  /** Navegação dinâmica */
  navigateToTopic(topic: BibliografiaTopic): void {
    this.router.navigate(['home', this.config.moduleRoute, 'bibliografia', topic.routePath]);
  }
}
