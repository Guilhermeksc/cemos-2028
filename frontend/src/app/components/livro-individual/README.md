# Componente LivroIndividual

## Descrição
Componente Angular para visualização de arquivos Markdown com navegação hierárquica por headings (h1, h2, h3) e menu lateral colapsável.

## Funcionalidades
- ✅ Carrega múltiplos arquivos .md de uma pasta específica
- ✅ Menu lateral com lista de arquivos
- ✅ Navegação hierárquica por headings (até 3 níveis)
- ✅ Apenas um subnível aberto por vez
- ✅ Menu lateral colapsável para maximizar área de visualização
- ✅ Scroll suave ao clicar em um heading
- ✅ Renderização de Markdown para HTML
- ✅ Responsivo para mobile

## Como usar

### 1. Importar o componente em sua rota ou módulo

```typescript
import { LivroIndividual } from './components/livro-individual/livro-individual';

// Em routes
{
  path: 'livro/:categoria',
  component: LivroIndividual
}
```

### 2. Usar no template

```html
<app-livro-individual
  [contentPath]="'assets/content/geopolitica-ri'"
  [fileNames]="['introducao.md', 'capitulo1.md', 'capitulo2.md']">
</app-livro-individual>
```

### 3. Exemplo com carregamento dinâmico

```typescript
export class MeuComponente {
  arquivosMd: string[] = [];
  pastaMd: string = 'assets/content/historia';

  ngOnInit() {
    // Carregar lista de arquivos dinamicamente
    this.arquivosMd = [
      'introducao.md',
      'periodo-colonial.md',
      'imperio.md',
      'republica.md'
    ];
  }
}
```

```html
<app-livro-individual
  [contentPath]="pastaMd"
  [fileNames]="arquivosMd">
</app-livro-individual>
```

## Estrutura dos arquivos Markdown

### Exemplo de arquivo .md:

```markdown
# Título Principal (H1)
Este será exibido como título do arquivo e primeiro item do menu.

Conteúdo do primeiro parágrafo...

## Seção 1 (H2)
Conteúdo da seção 1...

### Subseção 1.1 (H3)
Conteúdo da subseção...

### Subseção 1.2 (H3)
Conteúdo da subseção...

## Seção 2 (H2)
Conteúdo da seção 2...

### Subseção 2.1 (H3)
Conteúdo...
```

### Regras importantes:
1. **H1 (#)**: Título principal do arquivo (apenas um por arquivo recomendado)
2. **H2 (##)**: Seções principais
3. **H3 (###)**: Subseções
4. Apenas **3 níveis** de profundidade são suportados

## Inputs do Componente

| Input | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `contentPath` | `string` | `'assets/content'` | Pasta base onde estão os arquivos .md |
| `fileNames` | `string[]` | `[]` | Lista de nomes dos arquivos .md a carregar |

## Navegação

### Menu Lateral
- Clique no ícone de menu para colapsar/expandir
- Quando colapsado, área de conteúdo fica maior
- Lista de arquivos (se múltiplos)
- Índice de navegação com headings

### Navegação por Headings
- **H1**: Sempre visível
- **H2**: Expandir/colapsar clicando no H1
- **H3**: Expandir/colapsar clicando no H2
- **Regra**: Apenas um H2 expandido por vez
- Clicar em qualquer heading rola suavemente até a seção

## Estilos de Markdown Suportados

- ✅ Headings (H1-H6)
- ✅ Negrito (**texto** ou __texto__)
- ✅ Itálico (*texto* ou _texto_)
- ✅ Links ([texto](url))
- ✅ Listas não ordenadas (- item)
- ✅ Listas ordenadas (1. item)
- ✅ Code inline (`código`)
- ✅ Code blocks (```código```)
- ✅ Imagens

## Exemplo completo de uso

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { LivroIndividual } from './components/livro-individual/livro-individual';

export const routes: Routes = [
  {
    path: 'geopolitica',
    component: LivroIndividual,
    data: {
      contentPath: 'assets/content/geopolitica-ri',
      fileNames: [
        'introducao.md',
        'teorias-ri.md',
        'geopolitica-mundial.md'
      ]
    }
  }
];
```

```typescript
// Componente wrapper
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivroIndividual } from './components/livro-individual/livro-individual';

@Component({
  selector: 'app-geopolitica',
  template: `
    <app-livro-individual
      [contentPath]="contentPath"
      [fileNames]="fileNames">
    </app-livro-individual>
  `,
  imports: [LivroIndividual]
})
export class GeopoliticaComponent implements OnInit {
  contentPath: string = '';
  fileNames: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.contentPath = this.route.snapshot.data['contentPath'];
    this.fileNames = this.route.snapshot.data['fileNames'];
  }
}
```

## Observações

### Listagem de Arquivos
O serviço `LivroIndividualService` possui um método `getMarkdownFilesFromFolder()` que atualmente retorna uma lista vazia. 

**Em produção**, você precisará:
1. Criar um endpoint no backend que liste os arquivos .md de uma pasta
2. Ou usar um arquivo JSON com a lista de arquivos
3. Ou passar a lista de arquivos via Input do componente (método atual)

### Exemplo com backend:
```python
# Django view example
@api_view(['GET'])
def list_markdown_files(request, folder):
    path = os.path.join(settings.MEDIA_ROOT, 'content', folder)
    files = [f for f in os.listdir(path) if f.endswith('.md')]
    return Response(files)
```

## Performance

O componente carrega todos os arquivos especificados no início. Para melhor performance com muitos arquivos:
- Considere carregamento sob demanda
- Implemente cache
- Use paginação ou virtualização para listas muito grandes

## Dependências

- @angular/common
- @angular/material (List, Icon, Button, Expansion, ProgressSpinner)
- @angular/platform-browser (DomSanitizer)
- HttpClient para carregar arquivos

## Próximas melhorias

- [ ] Busca/filtro no índice
- [ ] Highlight de código com syntax highlighting
- [ ] Suporte a tabelas Markdown
- [ ] Export para PDF
- [ ] Modo escuro
- [ ] Bookmarks/favoritos
- [ ] Histórico de navegação
