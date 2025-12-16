import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

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

interface BibliografiaNode {
  name: string;
  id?: number;
  children?: BibliografiaNode[];
}

@Component({
  selector: 'app-bibliografia-id',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatCardModule, MatTreeModule, MatIconModule, MatButtonModule],
  templateUrl: './bibliografia-id.html',
  styleUrl: './bibliografia-id.scss'
})
export class BibliografiaId implements OnInit {
  bibliografias: MateriaBibliografia[] = [];
  treeControl = new NestedTreeControl<BibliografiaNode>((node) => node.children || []);
  dataSource = new MatTreeNestedDataSource<BibliografiaNode>();
  isLoading = true;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<Record<string, BibliografiaItem[]>>('/assets/bibliografias.json').subscribe({
      next: (data) => {
        this.bibliografias = Object.entries(data).map(([materia, itens]) => ({
          materia,
          itens
        }));
        const treeData = this.bibliografias.map((mat) => ({
          name: mat.materia,
          children: mat.itens.map((item) => ({
            name: `${item.titulo} — ${item.autor}`,
            id: item.id
          }))
        }));
        this.dataSource.data = treeData;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Não foi possível carregar a bibliografia.';
        this.isLoading = false;
      }
    });
  }

  hasChild = (_: number, node: BibliografiaNode) => !!node.children && node.children.length > 0;

  navigateToBibliografia(): void {
    this.router.navigate(['/home/bibliografia-id']);
  }
}
