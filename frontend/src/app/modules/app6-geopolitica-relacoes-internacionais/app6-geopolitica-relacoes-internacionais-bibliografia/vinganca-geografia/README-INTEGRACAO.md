# Integração do LivroIndividual no VingancaGeografia

## ✅ Alterações Realizadas

### 1. Arquivo TypeScript (`vinganca-geografia.ts`)

**Importações adicionadas:**
```typescript
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';
```

**Módulo adicionado aos imports:**
```typescript
imports: [
  CommonModule,
  SubMenu,
  HttpClientModule,
  BibliografiaCompleta,
  LivroIndividual  // ← NOVO
]
```

**Propriedades adicionadas:**
```typescript
export class VingancaGeografia implements OnInit {
  // Configuração do LivroIndividual
  contentPath: string = 'assets/content/geopolitica-ri/vinganca-geografia';
  fileNames: string[] = [
    'capX.md',
    'capXI.md',
    'capXII.md'
  ];

  ngOnInit() {
    // Inicialização do componente
  }
}
```

### 2. Arquivo HTML (`vinganca-geografia.html`)

Template criado:
```html
<div class="vinganca-geografia-container">
  <app-livro-individual
    [contentPath]="contentPath"
    [fileNames]="fileNames">
  </app-livro-individual>
</div>
```

### 3. Arquivo SCSS (`vinganca-geografia.scss`)

Estilos básicos adicionados:
```scss
.vinganca-geografia-container {
  width: 100%;
  height: 100%;
  
  // Se você tiver um header ou navegação, ajuste a altura
  // height: calc(100vh - 64px);
  
  // O componente LivroIndividual já tem seus próprios estilos
  // Aqui você pode adicionar customizações específicas se necessário
}
```

## 📁 Arquivos Carregados

Os seguintes arquivos Markdown serão carregados da pasta:
`frontend/public/assets/content/geopolitica-ri/vinganca-geografia/`

1. **capX.md** - CAPÍTULO X - A RÚSSIA E O HEARTLAND INDEPENDENTE
2. **capXI.md** - Capítulo XI (a ser verificado)
3. **capXII.md** - Capítulo XII (a ser verificado)

## 🎯 Como Funciona

Quando o componente `VingancaGeografia` é carregado:

1. O componente `LivroIndividual` recebe o caminho e lista de arquivos
2. Ele carrega automaticamente todos os 3 arquivos MD
3. Parseia os headings (# ## ###) de cada arquivo
4. Cria um menu lateral navegável
5. Renderiza o conteúdo em HTML

## 📋 Funcionalidades Disponíveis

- ✅ Menu lateral com os 3 capítulos
- ✅ Índice de navegação baseado nos headings do MD
- ✅ Menu colapsável (clique no ícone de menu)
- ✅ Navegação hierárquica (H1 > H2 > H3)
- ✅ Apenas um H2 expandido por vez
- ✅ Scroll suave ao clicar em qualquer seção
- ✅ Renderização de Markdown para HTML

## 🎨 Customizações Possíveis

### Ajustar altura do container

Se você tiver um header/navbar, ajuste a altura no SCSS:

```scss
.vinganca-geografia-container {
  height: calc(100vh - 64px); // 64px = altura do header
}
```

### Adicionar título ao componente

Se quiser um título antes do LivroIndividual:

```html
<div class="vinganca-geografia-container">
  <div class="header">
    <h1>A Vingança da Geografia</h1>
    <p class="subtitle">Robert D. Kaplan</p>
  </div>
  
  <app-livro-individual
    [contentPath]="contentPath"
    [fileNames]="fileNames">
  </app-livro-individual>
</div>
```

### Personalizar cores

Adicione estilos customizados no `vinganca-geografia.scss`:

```scss
.vinganca-geografia-container {
  // Sobrescrever cores do menu lateral
  ::ng-deep .side-menu {
    background-color: #e8f5e9; // Verde claro
  }
  
  // Sobrescrever cor do item ativo
  ::ng-deep .file-selector mat-list-item.active {
    background-color: #c8e6c9;
    border-left-color: #4caf50;
  }
}
```

## 🧪 Testando

1. Navegue até a rota do componente VingancaGeografia
2. Você verá o menu lateral com os 3 capítulos
3. Clique em um capítulo para ver o conteúdo
4. Use o índice para navegar pelas seções
5. Clique no ícone de menu para colapsar/expandir

## ⚠️ Observações

### Encoding dos arquivos MD

Notei que os arquivos MD têm alguns caracteres especiais que podem não estar sendo exibidos corretamente (Ã¡, Ã©, etc.). Isso indica um problema de encoding.

**Solução**: Certifique-se de que os arquivos MD estão salvos em UTF-8.

Se necessário, você pode converter usando PowerShell:
```powershell
$files = Get-ChildItem "frontend\public\assets\content\geopolitica-ri\vinganca-geografia\*.md"
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Encoding Default
    $content | Set-Content $file.FullName -Encoding UTF8
}
```

### Adicionar mais capítulos

Para adicionar mais capítulos no futuro, basta atualizar o array `fileNames`:

```typescript
fileNames: string[] = [
  'capX.md',
  'capXI.md',
  'capXII.md',
  'capXIII.md',  // Novo capítulo
  'capXIV.md'    // Novo capítulo
];
```

## 🚀 Próximos Passos

1. **Teste** o componente navegando até a rota
2. **Verifique** se todos os capítulos estão carregando
3. **Corrija** o encoding dos arquivos MD se necessário
4. **Customize** cores e estilos conforme sua necessidade
5. **Repita** este processo para outros livros da bibliografia

## 📝 Exemplo de Uso em Outras Rotas

Você pode seguir o mesmo padrão para outros livros:

```typescript
// poder-geografia.ts
export class PoderGeografia {
  contentPath = 'assets/content/geopolitica-ri/poder-geografia';
  fileNames = ['cap1.md', 'cap2.md', 'cap3.md'];
}

// diplomacia.ts  
export class Diplomacia {
  contentPath = 'assets/content/geopolitica-ri/diplomacia';
  fileNames = ['parte1.md', 'parte2.md'];
}
```

Todas as funcionalidades do LivroIndividual estarão disponíveis automaticamente! 🎉
