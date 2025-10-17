# Centralização de Estilos Markdown

## 📁 Arquivo Criado

**Localização**: `frontend/src/app/styles/_markdown.scss`

Este arquivo contém todos os estilos compartilhados para renderização de conteúdo Markdown, centralizando a formatação em um único local.

## 🎯 Objetivo

Evitar duplicação de código CSS e garantir que todo conteúdo Markdown tenha a mesma aparência consistente em toda a aplicação.

## 📋 Estilos Incluídos

O arquivo `_markdown.scss` inclui formatação para:

### 1. Headings (H1-H6)
- **H1**: Título principal com borda inferior
- **H2**: Subtítulo com borda inferior mais fina
- **H3-H6**: Títulos menores sem borda
- Todos com `scroll-margin-top` para melhor navegação

### 2. Parágrafos e Texto
- Espaçamento adequado
- Cores consistentes
- Line-height otimizado para leitura

### 3. Links
- Cor azul padrão (#1976d2)
- Underline no hover
- Transição suave

### 4. Listas (UL e OL)
- Indentação padronizada
- Espaçamento entre itens
- Marcadores consistentes

### 5. Citações (Blockquote)
- Borda esquerda colorida
- Texto em itálico
- Estilo diferenciado

### 6. Código
- **Inline**: Fundo cinza claro, texto vermelho
- **Blocos**: Fundo escuro com syntax highlighting
- Font monospace

### 7. Formatação
- **Negrito**: Peso 600, cor mais escura
- **Itálico**: Estilo itálico padrão

### 8. Imagens
- Width 100% (responsivo)
- Border-radius arredondado
- Sombra sutil

### 9. Tabelas
- Bordas consistentes
- Cabeçalho com fundo cinza
- Linhas alternadas (zebra striping)

### 10. Linha Horizontal (HR)
- Borda superior simples
- Espaçamento vertical

## 🔧 Como Usar

### Método 1: Usando o Mixin (Recomendado)

```scss
// seu-componente.scss
@import '../../styles/markdown';

.seu-container {
  .conteudo {
    @include markdown-content-styles;
  }
}
```

### Método 2: Usando a Classe Diretamente

O arquivo também exporta uma classe `.markdown-content` que pode ser usada diretamente no HTML:

```html
<div class="markdown-content" [innerHTML]="htmlContent"></div>
```

## 📦 Componentes Atualizados

### 1. LivroIndividual (`livro-individual.scss`)

**Antes**: ~150 linhas de CSS duplicado

**Depois**:
```scss
@import '../../styles/markdown';

.markdown-content {
  padding: 0;
  
  .content-wrapper {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 60px;
    
    @include markdown-content-styles;
    padding: 0; // Sobrescreve padding do mixin
  }
}
```

### 2. Resumo (`resumo.scss`)

**Antes**: ~50 linhas de CSS duplicado

**Depois**:
```scss
.markdown-content {
  @import '../../styles/markdown';
  @include markdown-content-styles;
}
```

## 🎨 Customizações

Se você precisar customizar os estilos para um componente específico, pode sobrescrevê-los após incluir o mixin:

```scss
@import '../../styles/markdown';

.meu-componente {
  .conteudo {
    @include markdown-content-styles;
    
    // Customizações específicas
    h1 {
      color: #ff0000; // Sobrescreve a cor do H1
    }
    
    p {
      font-size: 18px; // Sobrescreve o tamanho da fonte
    }
  }
}
```

## 📱 Responsividade

O arquivo inclui breakpoints para diferentes tamanhos de tela:

- **Desktop**: Estilos padrão
- **Tablet (≤ 768px)**: Fontes ligeiramente menores, padding reduzido
- **Mobile (≤ 480px)**: Fontes e padding ainda menores

## 🔄 Benefícios

### ✅ Manutenção Simplificada
- Altere uma vez, reflita em todos os componentes
- Menos código para revisar e testar

### ✅ Consistência Visual
- Todos os componentes Markdown têm a mesma aparência
- Experiência de usuário uniforme

### ✅ Performance
- Menos código CSS duplicado
- Arquivo menor no bundle final

### ✅ Escalabilidade
- Fácil adicionar novos componentes que usam Markdown
- Basta importar e aplicar o mixin

## 🚀 Adicionando Novos Componentes

Para adicionar estilos Markdown a um novo componente:

1. Importe o arquivo SCSS:
```scss
@import '../../styles/markdown';
```

2. Aplique o mixin onde necessário:
```scss
.seu-container {
  @include markdown-content-styles;
}
```

3. Pronto! Todos os estilos estão aplicados.

## 📝 Exemplo Completo

```typescript
// novo-componente.ts
@Component({
  selector: 'app-novo-componente',
  template: `
    <div class="container">
      <div [innerHTML]="markdownHtml"></div>
    </div>
  `,
  styleUrl: './novo-componente.scss'
})
export class NovoComponente {
  markdownHtml = '...';
}
```

```scss
// novo-componente.scss
@import '../../styles/markdown';

.container {
  padding: 20px;
  
  // Aplica todos os estilos de markdown
  @include markdown-content-styles;
  
  // Customizações específicas (opcional)
  h1 {
    text-align: center;
  }
}
```

## 🎯 Estrutura de Cores

O arquivo usa uma paleta de cores consistente:

- **Texto Principal**: #333333, #424242
- **Headings**: #1a1a1a, #212121
- **Links**: #1976d2 (Material Blue)
- **Códigos**: #d32f2f (Material Red)
- **Bordas**: #e0e0e0
- **Fundos**: #f5f5f5, #fafafa
- **Code Blocks**: #263238 (fundo), #aed581 (texto)

## 📚 Referências

- [Markdown Guide](https://www.markdownguide.org/)
- [Material Design Typography](https://material.io/design/typography)
- [SCSS Mixins](https://sass-lang.com/documentation/at-rules/mixin)

## 🔍 Versionamento

- **v1.0.0** (Atual): Implementação inicial
  - Estilos básicos para todos os elementos Markdown
  - Responsividade para mobile e tablet
  - Mixin reutilizável

## 💡 Dicas

1. **Sempre use o mixin** ao invés de copiar os estilos
2. **Teste em diferentes tamanhos de tela** após aplicar
3. **Documente customizações** específicas no componente
4. **Mantenha o arquivo `_markdown.scss` puro** - evite estilos específicos de componentes

## 🐛 Troubleshooting

### Estilos não estão sendo aplicados

1. Verifique se o caminho do import está correto:
```scss
@import '../../styles/markdown'; // Ajuste conforme a profundidade
```

2. Verifique se o mixin foi incluído:
```scss
@include markdown-content-styles;
```

3. Verifique a especificidade CSS - pode precisar de !important em casos específicos

### Conflitos de estilo

Se houver conflitos com outros estilos:

1. Use escopo específico:
```scss
.meu-componente {
  .conteudo-markdown {
    @include markdown-content-styles;
  }
}
```

2. Ou aumente a especificidade:
```scss
.meu-componente .markdown-content {
  @include markdown-content-styles;
}
```

---

**Criado**: 2025-10-16  
**Última Atualização**: 2025-10-16  
**Autor**: Sistema de Centralização de Estilos
