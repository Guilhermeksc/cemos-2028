# Instalação e Configuração do LivroIndividual

## 1. Verificar HttpClient no app.config.ts

O componente precisa do `HttpClient` para carregar os arquivos Markdown. Verifique se está configurado em `app.config.ts`:

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()), // ← Certifique-se de que está incluído
    provideAnimationsAsync()
  ]
};
```

## 2. Verificar Angular Material

O componente usa os seguintes módulos do Angular Material:
- MatListModule
- MatIconModule
- MatButtonModule
- MatExpansionModule
- MatProgressSpinnerModule

Se ainda não tiver o Angular Material instalado:

```bash
ng add @angular/material
```

## 3. Estrutura de Pastas

Organize seus arquivos Markdown na seguinte estrutura:

```
frontend/
  public/
    assets/
      content/
        geopolitica-ri/
          introducao.md
          teorias.md
          organizacoes.md
        historia/
          brasil-colonia.md
          brasil-imperio.md
        economia/
          macroeconomia.md
          microeconomia.md
```

## 4. Adicionar Rota

Adicione uma rota para usar o componente em `app.routes.ts`:

### Opção A: Uso Direto

```typescript
import { Routes } from '@angular/router';
import { LivroIndividual } from './components/livro-individual/livro-individual';

export const routes: Routes = [
  {
    path: 'livro/geopolitica',
    component: LivroIndividual,
    // Não funciona diretamente - precisa de um wrapper
  }
];
```

### Opção B: Com Componente Wrapper (Recomendado)

```typescript
// geopolitica.component.ts
import { Component } from '@angular/core';
import { LivroIndividual } from './components/livro-individual/livro-individual';

@Component({
  selector: 'app-geopolitica',
  template: `
    <app-livro-individual
      [contentPath]="'assets/content/geopolitica-ri'"
      [fileNames]="['introducao.md', 'teorias.md', 'organizacoes.md']">
    </app-livro-individual>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
    }
  `],
  imports: [LivroIndividual]
})
export class GeopoliticaComponent {}
```

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { GeopoliticaComponent } from './pages/geopolitica.component';

export const routes: Routes = [
  {
    path: 'geopolitica',
    component: GeopoliticaComponent
  }
];
```

### Opção C: Múltiplas Categorias com Parâmetro

```typescript
// livro-wrapper.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivroIndividual } from './components/livro-individual/livro-individual';

interface LivroConfig {
  contentPath: string;
  fileNames: string[];
}

@Component({
  selector: 'app-livro-wrapper',
  template: `
    <app-livro-individual
      *ngIf="config"
      [contentPath]="config.contentPath"
      [fileNames]="config.fileNames">
    </app-livro-individual>
  `,
  imports: [LivroIndividual, CommonModule]
})
export class LivroWrapperComponent implements OnInit {
  config: LivroConfig | null = null;

  private readonly configs: Record<string, LivroConfig> = {
    'geopolitica': {
      contentPath: 'assets/content/geopolitica-ri',
      fileNames: ['introducao.md', 'teorias.md', 'organizacoes.md']
    },
    'historia': {
      contentPath: 'assets/content/historia',
      fileNames: ['brasil-colonia.md', 'brasil-imperio.md', 'brasil-republica.md']
    },
    'economia': {
      contentPath: 'assets/content/economia',
      fileNames: ['macro.md', 'micro.md']
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoria = params['categoria'];
      this.config = this.configs[categoria] || null;
    });
  }
}
```

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { LivroWrapperComponent } from './components/livro-wrapper.component';

export const routes: Routes = [
  {
    path: 'livro/:categoria',
    component: LivroWrapperComponent
  }
];
```

Agora você pode navegar para:
- `/livro/geopolitica`
- `/livro/historia`
- `/livro/economia`

## 5. Teste o Componente

### Teste Rápido

1. Crie um arquivo de teste em `public/assets/content/teste.md`:

```markdown
# Teste do LivroIndividual

Este é um teste.

## Seção 1

Conteúdo da seção 1.

### Subseção 1.1

Conteúdo da subseção 1.1.

### Subseção 1.2

Conteúdo da subseção 1.2.

## Seção 2

Conteúdo da seção 2.

### Subseção 2.1

Conteúdo da subseção 2.1.
```

2. Crie um componente de teste:

```typescript
import { Component } from '@angular/core';
import { LivroIndividual } from './components/livro-individual/livro-individual';

@Component({
  selector: 'app-teste',
  template: `
    <app-livro-individual
      [contentPath]="'assets/content'"
      [fileNames]="['teste.md']">
    </app-livro-individual>
  `,
  imports: [LivroIndividual]
})
export class TesteComponent {}
```

3. Adicione a rota e navegue para `/teste`

## 6. Troubleshooting

### Erro: "Cannot read properties of null"

**Causa**: HttpClient não configurado  
**Solução**: Adicione `provideHttpClient()` no `app.config.ts`

### Erro: "Failed to load resource"

**Causa**: Arquivo Markdown não encontrado  
**Solução**: Verifique o caminho do arquivo e se está em `public/assets/content/`

### Erro: Material components not found

**Causa**: Angular Material não instalado  
**Solução**: `ng add @angular/material`

### Conteúdo não renderiza

**Causa**: Segurança do Angular bloqueia HTML  
**Solução**: O componente já usa `DomSanitizer.bypassSecurityTrustHtml()`

### Menu não colapsa

**Causa**: Falta de estilos ou imports  
**Solução**: Verifique se o SCSS foi carregado corretamente

## 7. Customização

### Alterar Cores

Edite o arquivo `livro-individual.scss`:

```scss
// Cor do menu lateral
.side-menu {
  background-color: #f5f5f5; // ← Altere aqui
  border-right: 1px solid #e0e0e0; // ← E aqui
}

// Cor de item ativo
.file-selector mat-list-item.active {
  background-color: #e3f2fd; // ← Altere aqui
  border-left: 3px solid #1976d2; // ← E aqui
}
```

### Alterar Largura do Menu

```scss
.side-menu {
  width: 320px; // ← Altere aqui (padrão)
  
  &.collapsed {
    width: 56px; // ← Largura quando colapsado
  }
}
```

### Alterar Parser de Markdown

Edite `livro-individual.service.ts` no método `markdownToHtml()` para adicionar mais suporte a sintaxes Markdown.

## 8. Próximos Passos

- Integrar com backend para listagem dinâmica de arquivos
- Adicionar busca no conteúdo
- Implementar syntax highlighting para código
- Adicionar modo escuro
- Implementar favoritos/bookmarks
