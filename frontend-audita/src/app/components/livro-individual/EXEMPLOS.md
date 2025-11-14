# Exemplos Práticos de Integração

## Exemplo 1: Integração no Módulo de Geopolítica

### Estrutura de arquivos
```
frontend/public/assets/content/geopolitica-ri/
├── 01-introducao.md
├── 02-teorias-classicas.md
├── 03-teorias-contemporaneas.md
├── 04-organizacoes-internacionais.md
└── 05-temas-atuais.md
```

### Componente
```typescript
// app6-geopolitica-relacoes-internacionais/pages/livros.component.ts
import { Component } from '@angular/core';
import { LivroIndividual } from '../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-geopolitica-livros',
  template: `
    <div class="page-container">
      <app-livro-individual
        [contentPath]="contentPath"
        [fileNames]="fileNames">
      </app-livro-individual>
    </div>
  `,
  styles: [`
    .page-container {
      width: 100%;
      height: calc(100vh - 64px); /* Ajuste conforme seu header */
    }
  `],
  imports: [LivroIndividual]
})
export class GeopoliticaLivrosComponent {
  contentPath = 'assets/content/geopolitica-ri';
  
  fileNames = [
    '01-introducao.md',
    '02-teorias-classicas.md',
    '03-teorias-contemporaneas.md',
    '04-organizacoes-internacionais.md',
    '05-temas-atuais.md'
  ];
}
```

## Exemplo 2: Com Carregamento Dinâmico do Backend

### Backend (Django)
```python
# django_cemos2028/apps/informacoes/views.py
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
import os

@api_view(['GET'])
def listar_arquivos_markdown(request, categoria):
    """
    Lista todos os arquivos .md de uma categoria
    """
    pasta = os.path.join(
        settings.BASE_DIR,
        '..',
        'frontend',
        'public',
        'assets',
        'content',
        categoria
    )
    
    if not os.path.exists(pasta):
        return Response({'error': 'Categoria não encontrada'}, status=404)
    
    arquivos = [
        f for f in os.listdir(pasta) 
        if f.endswith('.md')
    ]
    
    # Ordena por nome
    arquivos.sort()
    
    return Response({
        'categoria': categoria,
        'arquivos': arquivos,
        'total': len(arquivos)
    })

# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('api/markdown/<str:categoria>/', views.listar_arquivos_markdown),
]
```

### Frontend (Angular Service)
```typescript
// services/markdown-files.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

interface MarkdownFilesResponse {
  categoria: string;
  arquivos: string[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class MarkdownFilesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getArquivosPorCategoria(categoria: string): Observable<string[]> {
    return this.http
      .get<MarkdownFilesResponse>(`${this.apiUrl}/api/markdown/${categoria}/`)
      .pipe(
        map(response => response.arquivos)
      );
  }
}
```

### Componente com Carregamento Dinâmico
```typescript
// pages/livro-dinamico.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivroIndividual } from '../../components/livro-individual/livro-individual';
import { MarkdownFilesService } from '../../services/markdown-files.service';

@Component({
  selector: 'app-livro-dinamico',
  template: `
    <div class="loading" *ngIf="loading">
      <mat-spinner></mat-spinner>
      <p>Carregando arquivos...</p>
    </div>
    
    <app-livro-individual
      *ngIf="!loading && fileNames.length > 0"
      [contentPath]="contentPath"
      [fileNames]="fileNames">
    </app-livro-individual>
    
    <div class="error" *ngIf="!loading && error">
      <p>Erro ao carregar arquivos: {{ error }}</p>
    </div>
  `,
  imports: [LivroIndividual, CommonModule, MatProgressSpinnerModule]
})
export class LivroDinamicoComponent implements OnInit {
  contentPath = '';
  fileNames: string[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private markdownService: MarkdownFilesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoria = params['categoria'];
      this.contentPath = `assets/content/${categoria}`;
      this.carregarArquivos(categoria);
    });
  }

  carregarArquivos(categoria: string) {
    this.loading = true;
    this.error = null;

    this.markdownService.getArquivosPorCategoria(categoria).subscribe({
      next: (arquivos) => {
        this.fileNames = arquivos;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Erro desconhecido';
        this.loading = false;
      }
    });
  }
}
```

## Exemplo 3: Com Navegação por Módulos

### Estrutura de Rotas
```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { LivroDinamicoComponent } from './pages/livro-dinamico.component';

export const routes: Routes = [
  // Geopolítica
  {
    path: 'geopolitica/conteudo',
    component: LivroDinamicoComponent,
    data: { categoria: 'geopolitica-ri' }
  },
  
  // História
  {
    path: 'historia/conteudo',
    component: LivroDinamicoComponent,
    data: { categoria: 'historia' }
  },
  
  // Economia
  {
    path: 'economia/conteudo',
    component: LivroDinamicoComponent,
    data: { categoria: 'economia' }
  },
  
  // Rota genérica
  {
    path: 'conteudo/:categoria',
    component: LivroDinamicoComponent
  }
];
```

### Componente Atualizado
```typescript
ngOnInit() {
  // Prioriza o parâmetro de rota
  this.route.params.subscribe(params => {
    const categoria = params['categoria'] || this.route.snapshot.data['categoria'];
    if (categoria) {
      this.contentPath = `assets/content/${categoria}`;
      this.carregarArquivos(categoria);
    }
  });
}
```

## Exemplo 4: Com Menu de Navegação

### Menu Component
```typescript
// components/menu-modulos.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

interface Modulo {
  nome: string;
  icone: string;
  categoria: string;
  descricao: string;
}

@Component({
  selector: 'app-menu-modulos',
  template: `
    <mat-nav-list>
      <h3 matSubheader>Módulos de Estudo</h3>
      
      <mat-list-item 
        *ngFor="let modulo of modulos"
        (click)="navegarPara(modulo.categoria)"
        class="modulo-item">
        <mat-icon matListItemIcon>{{ modulo.icone }}</mat-icon>
        <div matListItemTitle>{{ modulo.nome }}</div>
        <div matListItemLine>{{ modulo.descricao }}</div>
      </mat-list-item>
    </mat-nav-list>
  `,
  styles: [`
    .modulo-item {
      cursor: pointer;
      transition: background-color 0.2s;
      
      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
    }
  `],
  imports: [CommonModule, MatListModule, MatIconModule]
})
export class MenuModulosComponent {
  modulos: Modulo[] = [
    {
      nome: 'Geopolítica e RI',
      icone: 'public',
      categoria: 'geopolitica-ri',
      descricao: 'Relações Internacionais e Geopolítica'
    },
    {
      nome: 'História',
      icone: 'history_edu',
      categoria: 'historia',
      descricao: 'História Geral e do Brasil'
    },
    {
      nome: 'Economia',
      icone: 'attach_money',
      categoria: 'economia',
      descricao: 'Macroeconomia e Microeconomia'
    },
    {
      nome: 'Direito',
      icone: 'gavel',
      categoria: 'direito',
      descricao: 'Direito Constitucional e Internacional'
    }
  ];

  constructor(private router: Router) {}

  navegarPara(categoria: string) {
    this.router.navigate(['/conteudo', categoria]);
  }
}
```

## Exemplo 5: Com Breadcrumb e Navegação

```typescript
// components/breadcrumb.component.ts
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <nav class="breadcrumb">
      <a (click)="navegarPara('/')">
        <mat-icon>home</mat-icon>
        Início
      </a>
      <span class="separator">/</span>
      <a (click)="navegarPara('/modulos')">Módulos</a>
      <span class="separator">/</span>
      <span class="current">{{ categoria }}</span>
    </nav>
  `,
  styles: [`
    .breadcrumb {
      display: flex;
      align-items: center;
      padding: 16px;
      background-color: #f5f5f5;
      border-bottom: 1px solid #e0e0e0;
      gap: 8px;
      
      a {
        display: flex;
        align-items: center;
        gap: 4px;
        color: #1976d2;
        cursor: pointer;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
        
        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
        }
      }
      
      .separator {
        color: #9e9e9e;
      }
      
      .current {
        color: #424242;
        font-weight: 500;
      }
    }
  `],
  imports: [CommonModule, MatIconModule]
})
export class BreadcrumbComponent {
  @Input() categoria: string = '';

  constructor(private router: Router) {}

  navegarPara(rota: string) {
    this.router.navigate([rota]);
  }
}
```

### Uso Completo
```typescript
// pages/livro-completo.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivroIndividual } from '../../components/livro-individual/livro-individual';
import { BreadcrumbComponent } from '../../components/breadcrumb.component';

@Component({
  selector: 'app-livro-completo',
  template: `
    <app-breadcrumb [categoria]="categoriaNome"></app-breadcrumb>
    
    <app-livro-individual
      [contentPath]="contentPath"
      [fileNames]="fileNames">
    </app-livro-individual>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
  `],
  imports: [LivroIndividual, BreadcrumbComponent]
})
export class LivroCompletoComponent implements OnInit {
  contentPath = '';
  fileNames: string[] = [];
  categoriaNome = '';

  private categorias: Record<string, any> = {
    'geopolitica-ri': {
      nome: 'Geopolítica e RI',
      arquivos: ['01-intro.md', '02-teorias.md']
    },
    'historia': {
      nome: 'História',
      arquivos: ['01-colonial.md', '02-imperio.md']
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoria = params['categoria'];
      const config = this.categorias[categoria];
      
      if (config) {
        this.categoriaNome = config.nome;
        this.contentPath = `assets/content/${categoria}`;
        this.fileNames = config.arquivos;
      }
    });
  }
}
```

## Resumo de URLs

Com estas configurações, você terá as seguintes URLs funcionando:

- `/conteudo/geopolitica-ri` - Conteúdo de Geopolítica
- `/conteudo/historia` - Conteúdo de História
- `/conteudo/economia` - Conteúdo de Economia
- `/geopolitica/conteudo` - Alternativa para Geopolítica
- `/historia/conteudo` - Alternativa para História

Todas renderizando o componente LivroIndividual com o conteúdo apropriado!
