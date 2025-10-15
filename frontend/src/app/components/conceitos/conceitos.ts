import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Conceitos as ConceitosInterface } from '../../interfaces/informacoes.interface';
import { InformacoesService } from '../../services/informacoes.service';
import { ConceitosTableComponent } from '../conceitos-table/conceitos-table';

@Component({
  selector: 'app-conceitos',
  imports: [CommonModule, ConceitosTableComponent],
  templateUrl: './conceitos.html',
  styleUrl: './conceitos.scss'
})
export class ConceitosComponent implements OnInit {
  conceitos: ConceitosInterface[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private informacoesService: InformacoesService) {}

  ngOnInit() {
    this.loadConceitos();
  }

  loadConceitos() {
    this.loading = true;
    this.error = null;
    
    this.informacoesService.getConceitos().subscribe({
      next: (response) => {
        this.conceitos = response.results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar conceitos:', error);
        this.error = 'Erro ao carregar conceitos. Tente novamente.';
        this.loading = false;
      }
    });
  }
}
