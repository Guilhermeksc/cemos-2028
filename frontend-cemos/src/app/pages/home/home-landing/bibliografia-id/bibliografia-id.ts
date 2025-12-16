import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

interface BibliografiaItem {
  id: number;
  titulo: string;
  autor: string;
  descricao: string;
}

interface MateriaBibliografia {
  materia: string;
  itens: BibliografiaItem[];
}

@Component({
  selector: 'app-bibliografia-id',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatCardModule],
  templateUrl: './bibliografia-id.html',
  styleUrl: './bibliografia-id.scss'
})
export class BibliografiaId implements OnInit {
  bibliografias: MateriaBibliografia[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Record<string, BibliografiaItem[]>>('/assets/bibliografias.json').subscribe({
      next: (data) => {
        this.bibliografias = Object.entries(data).map(([materia, itens]) => ({
          materia,
          itens
        }));
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Não foi possível carregar a bibliografia.';
        this.isLoading = false;
      }
    });
  }
}
