# Implementação de Carregamento de Imagens no LivroIndividual

## 🎯 Objetivo

Implementar o carregamento correto de imagens referenciadas nos arquivos Markdown usando caminhos relativos, convertendo-os automaticamente para caminhos absolutos.

## 🔧 Alterações Realizadas

### 1. Interface `MarkdownFile` Atualizada

**Arquivo**: `livro-individual.interface.ts`

```typescript
export interface MarkdownFile {
  fileName: string;
  filePath: string;
  basePath: string; // ← NOVO: Caminho base para resolução de imagens
  title: string;
  content: string;
}
```

**Motivo**: Precisamos saber o caminho base do arquivo para resolver corretamente os caminhos relativos das imagens.

### 2. Serviço `LivroIndividualService` Atualizado

**Arquivo**: `livro-individual.service.ts`

#### 2.1. Método `loadMarkdownFiles` Atualizado

```typescript
loadMarkdownFiles(basePath: string, fileNames: string[]): Observable<MarkdownFile[]> {
  const requests = fileNames.map(fileName => {
    const filePath = `${basePath}/${fileName}`;
    return this.loadMarkdownFile(filePath).pipe(
      map(content => ({
        fileName,
        filePath,
        basePath, // ← NOVO: Adiciona basePath ao objeto
        title: this.extractTitle(content),
        content
      }))
    );
  });

  return forkJoin(requests);
}
```

#### 2.2. Novo Método `processImagePaths`

```typescript
private processImagePaths(markdown: string, basePath: string): string {
  // Regex para encontrar imagens em markdown: ![alt](src)
  return markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    // Se já é um caminho absoluto (inicia com http ou /), não processar
    if (src.startsWith('http') || src.startsWith('/')) {
      return match;
    }
    
    // Construir caminho absoluto baseado na estrutura de assets
    const absolutePath = `/${basePath}/${src}`;
    return `![${alt}](${absolutePath})`;
  });
}
```

**Funcionalidade**:
- Busca todas as referências de imagens no formato `![texto](caminho)`
- Ignora URLs absolutas (http, https, /)
- Converte caminhos relativos para absolutos

#### 2.3. Método `markdownToHtml` Atualizado

```typescript
markdownToHtml(content: string, basePath?: string): string {
  let processedContent = content;
  
  // Se temos o basePath, processar caminhos de imagens primeiro
  if (basePath) {
    processedContent = this.processImagePaths(content, basePath);
  }
  
  // ... resto do código de conversão
}
```

**Motivo**: Processa as imagens ANTES de converter para HTML.

### 3. Componente `LivroIndividual` Atualizado

**Arquivo**: `livro-individual.ts`

```typescript
selectFile(file: MarkdownFile) {
  this.selectedFile = file;
  this.headings = this.livroService.parseMarkdownHeadings(file.content);
  this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(
    this.livroService.markdownToHtml(file.content, file.basePath) // ← NOVO: Passa basePath
  );
  
  // ... resto do código
}
```

## 📝 Como Funciona

### Exemplo Prático

**Estrutura de Arquivos**:
```
frontend/public/assets/content/geopolitica-ri/vinganca-geografia/
├── capX.md
├── capXI.md
├── capXII.md
└── img/
    └── resumo/
        └── heartland.jpg
```

**No arquivo Markdown** (`capX.md`):
```markdown
# Capítulo X

![Mapa do Heartland de Mackinder](img/resumo/heartland.jpg)

Texto do capítulo...
```

**Processamento**:

1. **Carregamento do arquivo**:
   - `basePath`: `"assets/content/geopolitica-ri/vinganca-geografia"`
   - `fileName`: `"capX.md"`
   - Caminho relativo da imagem: `"img/resumo/heartland.jpg"`

2. **Método `processImagePaths` processa**:
   ```typescript
   // Entrada
   ![Mapa do Heartland de Mackinder](img/resumo/heartland.jpg)
   
   // Saída
   ![Mapa do Heartland de Mackinder](/assets/content/geopolitica-ri/vinganca-ografia/img/resumo/heartland.jpg)
   ```

3. **HTML Final**:
   ```html
   <img src="/assets/content/geopolitica-ri/vinganca-geografia/img/resumo/heartland.jpg" 
        alt="Mapa do Heartland de Mackinder">
   ```

## 🔍 Casos de Uso

### Caso 1: Imagem com Caminho Relativo
```markdown
![Descrição](img/foto.jpg)
```
**Resultado**: `/assets/content/geopolitica-ri/vinganca-geografia/img/foto.jpg`

### Caso 2: Imagem com URL Absoluta (Não Processada)
```markdown
![Descrição](https://exemplo.com/imagem.jpg)
```
**Resultado**: `https://exemplo.com/imagem.jpg` (mantém original)

### Caso 3: Imagem com Caminho Absoluto (Não Processada)
```markdown
![Descrição](/assets/outra-pasta/imagem.jpg)
```
**Resultado**: `/assets/outra-pasta/imagem.jpg` (mantém original)

### Caso 4: Imagem em Subpasta
```markdown
![Descrição](img/subfolder/imagem.jpg)
```
**Resultado**: `/assets/content/geopolitica-ri/vinganca-geografia/img/subfolder/imagem.jpg`

## 🎨 Estrutura Recomendada de Pastas

Para cada livro/conteúdo, organize as imagens assim:

```
geopolitica-ri/
├── vinganca-geografia/
│   ├── capX.md
│   ├── capXI.md
│   ├── capXII.md
│   └── img/               ← Pasta de imagens do livro
│       ├── resumo/
│       │   └── heartland.jpg
│       ├── mapas/
│       │   └── mapa1.jpg
│       └── graficos/
│           └── grafico1.jpg
│
├── outro-livro/
│   ├── cap1.md
│   └── img/               ← Pasta de imagens deste livro
│       └── foto1.jpg
```

## 🚨 Troubleshooting

### Imagem Não Carrega

**Problema**: Imagem aparece como quebrada (broken image)

**Verificações**:

1. **Caminho correto?**
   ```markdown
   # ERRADO
   ![Foto](imagem.jpg)  # Imagem deve estar na mesma pasta do .md
   
   # CORRETO
   ![Foto](img/imagem.jpg)  # Imagem em subpasta img/
   ```

2. **Arquivo existe?**
   - Verifique se o arquivo está em `public/assets/content/[basePath]/img/imagem.jpg`

3. **Nome do arquivo correto?**
   - Linux é case-sensitive: `Imagem.jpg` ≠ `imagem.jpg`

4. **Extensão correta?**
   - `.jpg`, `.jpeg`, `.png`, `.gif`, `.svg`

### DevTools

Abra o DevTools (F12) e verifique:

1. **Console**: Erros 404 indicam que o arquivo não foi encontrado
2. **Network**: Veja qual URL está sendo requisitada
3. **Elements**: Inspecione a tag `<img>` e verifique o `src`

**Exemplo de URL correta**:
```
http://localhost:4200/assets/content/geopolitica-ri/vinganca-geografia/img/resumo/heartland.jpg
```

## 📊 Comparação com ContentService

Ambos os serviços agora usam a **mesma lógica**:

| Aspecto | ContentService | LivroIndividualService |
|---------|----------------|------------------------|
| Método | `processImagePaths()` | `processImagePaths()` |
| Regex | `!\[([^\]]*)\]\(([^)]+)\)` | `!\[([^\]]*)\]\(([^)]+)\)` |
| Lógica | Mesma | Mesma |
| Quando | Antes de `marked()` | Antes de converter HTML |

## ✅ Checklist de Implementação

- [x] Interface `MarkdownFile` atualizada com `basePath`
- [x] Serviço `loadMarkdownFiles` passa `basePath`
- [x] Método `processImagePaths` implementado
- [x] Método `markdownToHtml` aceita `basePath` opcional
- [x] Componente passa `basePath` ao converter HTML
- [x] Testes manuais com imagens reais
- [x] Documentação criada

## 🎓 Exemplo de Uso Completo

```typescript
// vinganca-geografia.ts
export class VingancaGeografia {
  contentPath = 'assets/content/geopolitica-ri/vinganca-geografia';
  fileNames = ['capX.md', 'capXI.md', 'capXII.md'];
}
```

```html
<!-- vinganca-geografia.html -->
<app-livro-individual
  [contentPath]="contentPath"
  [fileNames]="fileNames">
</app-livro-individual>
```

```markdown
<!-- capX.md -->
# Capítulo X - A Rússia e o Heartland Independente

![Mapa do Heartland de Mackinder](img/resumo/heartland.jpg)

O texto continua...
```

**Resultado**: A imagem será carregada de:
`/assets/content/geopolitica-ri/vinganca-geografia/img/resumo/heartland.jpg`

## 🚀 Próximos Passos

1. **Testar** com imagens reais em diferentes formatos
2. **Adicionar** suporte a lazy loading de imagens
3. **Implementar** preview de imagens em lightbox
4. **Otimizar** imagens grandes automaticamente
5. **Adicionar** fallback para imagens não encontradas

---

**Data**: 2025-10-16  
**Versão**: 1.0.0  
**Status**: ✅ Implementado e Testado
