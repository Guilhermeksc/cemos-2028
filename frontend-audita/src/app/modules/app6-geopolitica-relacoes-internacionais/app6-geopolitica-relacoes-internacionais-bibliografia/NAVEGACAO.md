# Navegação da Bibliografia - App6 Geopolítica e RI

## 🎯 Como Funciona

A navegação da bibliografia está estruturada em dois níveis:

### 1️⃣ Item Pai: "Bibliografia"
**Rota**: `/app6-geopolitica-relacoes-internacionais/bibliografia`

**Componente**: `App6GeopoliticaRelacoesInternacionaisBibliografia`

**O que exibe**:
- ✅ Componente `capa-bibliografia`
- ✅ Imagem da capa (`vinganca-geografia.jpg`)
- ✅ Conteúdo do arquivo `Bibliografia.md`

**Quando é exibido**:
- Ao clicar no item "Bibliografia" no menu lateral
- É a **página inicial** da seção de bibliografia

### 2️⃣ Itens Filhos: Livros Específicos

Ao clicar nos itens filhos do menu lateral, cada livro tem sua própria rota e componente:

#### 📚 A Vingança da Geografia
- **Rota**: `/app6-geopolitica-relacoes-internacionais/bibliografia/vinganca-geografia`
- **Componente**: `VingancaGeografia`
- **Usa**: `livro-individual` component
- **Conteúdo**: Capítulos do livro (capX.md, capXI.md, etc.)

#### 📚 Geopolítica e Modernidade
- **Rota**: `/app6-geopolitica-relacoes-internacionais/bibliografia/geopolitica-modernidade`
- **Componente**: `GeopoliticaModernidade`
- **Usa**: `livro-individual` component
- **Conteúdo**: Capítulos específicos deste livro

#### 📚 Novas Geopolíticas
- **Rota**: `/app6-geopolitica-relacoes-internacionais/bibliografia/novas-geopoliticas`
- **Componente**: `NovasGeopoliticas`
- **Usa**: `livro-individual` component
- **Conteúdo**: Capítulos específicos deste livro

#### 📚 Princípios de Relações Internacionais
- **Rota**: `/app6-geopolitica-relacoes-internacionais/bibliografia/principios-ri`
- **Componente**: `PrincipiosRi`
- **Usa**: `livro-individual` component
- **Conteúdo**: Capítulos específicos deste livro

## 📂 Estrutura de Arquivos

```
app6-geopolitica-relacoes-internacionais/
└── app6-geopolitica-relacoes-internacionais-bibliografia/
    ├── app6-geopolitica-relacoes-internacionais-bibliografia.ts    ← Item PAI
    ├── app6-geopolitica-relacoes-internacionais-bibliografia.html
    ├── app6-geopolitica-relacoes-internacionais-bibliografia.scss
    ├── vinganca-geografia/                                          ← Item FILHO
    │   ├── vinganca-geografia.ts
    │   └── vinganca-geografia.html
    ├── geopolitica-modernidade/                                     ← Item FILHO
    │   ├── geopolitica-modernidade.ts
    │   └── geopolitica-modernidade.html
    ├── novas-geopoliticas/                                          ← Item FILHO
    │   ├── novas-geopoliticas.ts
    │   └── novas-geopoliticas.html
    └── principios-ri/                                               ← Item FILHO
        ├── principios-ri.ts
        └── principios-ri.html
```

## 🗂️ Estrutura de Conteúdo (Assets)

```
frontend/public/assets/content/geopolitica-ri/
├── Bibliografia.md                           ← Usado pela CAPA
├── img/
│   └── vinganca-geografia.jpg               ← Usado pela CAPA
├── vinganca-geografia/                       ← Usado pelo FILHO
│   ├── capX.md
│   ├── capXI.md
│   ├── capXII.md
│   └── img/
│       └── (imagens específicas do livro)
├── geopolitica-modernidade/                  ← Usado pelo FILHO
│   ├── cap1.md
│   ├── cap2.md
│   └── img/
├── novas-geopoliticas/                       ← Usado pelo FILHO
│   ├── cap1.md
│   ├── cap2.md
│   └── img/
└── principios-ri/                            ← Usado pelo FILHO
    ├── cap1.md
    ├── cap2.md
    └── img/
```

## 🔄 Fluxo de Navegação

### Cenário 1: Usuário clica em "Bibliografia"
```
Menu Lateral: "Bibliografia"
    ↓
Rota: /app6-geopolitica-relacoes-internacionais/bibliografia
    ↓
Componente: App6GeopoliticaRelacoesInternacionaisBibliografia
    ↓
Renderiza: <app-capa-bibliografia>
    ↓
Exibe: Imagem + Bibliografia.md
```

### Cenário 2: Usuário clica em "A Vingança da Geografia"
```
Menu Lateral: "A Vingança da Geografia"
    ↓
Rota: /app6-geopolitica-relacoes-internacionais/bibliografia/vinganca-geografia
    ↓
Componente: VingancaGeografia
    ↓
Renderiza: <app-livro-individual>
    ↓
Exibe: Menu lateral com capítulos + Conteúdo do capítulo selecionado
```

## ⚙️ Configuração das Rotas

As rotas estão configuradas em `module-route.config.ts`:

```typescript
{
  title: 'App6 Geopolítica',
  path: 'app6-geopolitica-relacoes-internacionais',
  defaultChild: 'bibliografia',
  segments: [
    {
      title: 'Bibliografia',                  // ← ITEM PAI
      path: 'bibliografia',
      loadComponent: () => import('...').then(
        (m) => m.App6GeopoliticaRelacoesInternacionaisBibliografia
      ),
      children: [                             // ← ITENS FILHOS
        {
          title: 'A Vingança da Geografia',
          path: 'vinganca-geografia',
          loadComponent: () => import('...').then(
            (m) => m.VingancaGeografia
          )
        },
        // ... outros livros
      ]
    }
  ]
}
```

## 🎨 Componentes Utilizados

### 📄 `capa-bibliografia`
**Responsabilidade**: Exibir capa com imagem e markdown introdutório

**Inputs**:
- `imagePath`: Caminho da imagem
- `markdownPath`: Caminho do arquivo .md
- `basePath`: Caminho base para resolver imagens relativas

**Usado em**: Item PAI (Bibliografia)

### 📖 `livro-individual`
**Responsabilidade**: Exibir conteúdo completo de um livro com navegação por capítulos

**Inputs**:
- `contentPath`: Pasta com os arquivos .md
- `fileNames`: Array com nomes dos arquivos (capítulos)

**Usado em**: Itens FILHOS (cada livro)

## 🚀 Exemplo de Uso

### Configurar um novo livro filho

1. **Criar pasta do livro**:
```
app6-geopolitica-relacoes-internacionais-bibliografia/
└── novo-livro/
    ├── novo-livro.ts
    └── novo-livro.html
```

2. **Configurar o componente** (`novo-livro.ts`):
```typescript
import { Component } from '@angular/core';
import { LivroIndividual } from '../../../../components/livro-individual/livro-individual';

@Component({
  selector: 'app-novo-livro',
  standalone: true,
  imports: [LivroIndividual],
  templateUrl: './novo-livro.html',
  styleUrl: './novo-livro.scss'
})
export class NovoLivro {
  contentPath = 'assets/content/geopolitica-ri/novo-livro';
  fileNames = ['cap1.md', 'cap2.md', 'cap3.md'];
}
```

3. **Template** (`novo-livro.html`):
```html
<app-livro-individual
  [contentPath]="contentPath"
  [fileNames]="fileNames">
</app-livro-individual>
```

4. **Adicionar à rota** (`module-route.config.ts`):
```typescript
{
  title: 'Novo Livro',
  path: 'novo-livro',
  loadComponent: () =>
    import('.../novo-livro/novo-livro').then((m) => m.NovoLivro)
}
```

5. **Criar conteúdo**:
```
frontend/public/assets/content/geopolitica-ri/
└── novo-livro/
    ├── cap1.md
    ├── cap2.md
    ├── cap3.md
    └── img/
        └── (imagens do livro)
```

## ✅ Checklist de Implementação

- [x] Componente pai exibe apenas `capa-bibliografia`
- [x] Removido `GenericBibliografia` do componente pai
- [x] Componentes filhos usam `livro-individual`
- [x] Rotas configuradas corretamente
- [x] Estrutura de assets organizada
- [x] Documentação criada

## 🔧 Troubleshooting

### Problema: Ao clicar em "Bibliografia" não aparece nada
**Solução**: Verifique se os arquivos existem:
- `assets/content/geopolitica-ri/img/vinganca-geografia.jpg`
- `assets/content/geopolitica-ri/Bibliografia.md`

### Problema: Ao clicar no livro filho não aparece conteúdo
**Solução**: Verifique:
1. Se a pasta do livro existe em `assets/content/geopolitica-ri/`
2. Se os arquivos .md estão no array `fileNames`
3. Se os nomes dos arquivos estão corretos (case-sensitive)

### Problema: Imagens não aparecem nos capítulos
**Solução**: Verifique se as imagens estão em:
```
assets/content/geopolitica-ri/[nome-do-livro]/img/
```

---

**Data**: 2025-10-17  
**Versão**: 1.0.0  
**Status**: ✅ Implementado
