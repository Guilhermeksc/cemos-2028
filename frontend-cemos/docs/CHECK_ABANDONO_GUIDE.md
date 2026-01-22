# Guia: Como Adicionar um Novo Check Abandono

Este guia explica passo a passo como adicionar um novo componente Check Abandono para qualquer módulo da aplicação.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Componente Reutilizável](#componente-reutilizável)
3. [Estrutura de Arquivos](#estrutura-de-arquivos)
4. [Passo a Passo](#passo-a-passo)
5. [Exemplos](#exemplos)
6. [Estrutura do JSON](#estrutura-do-json)

---

## 🎯 Visão Geral

O componente `CheckAbandono` é um componente Angular reutilizável que:
- Carrega dados de um arquivo JSON
- Exibe conteúdo organizado por livros e capítulos
- Permite expandir/comprimir itens para ver complementos
- Possui menu lateral para navegação entre capítulos
- É totalmente responsivo (desktop, tablet, mobile)

---

## 🔧 Componente Reutilizável

### Localização

O componente reutilizável está localizado em:
```
frontend-cemos/src/app/components/check-abandono/
```

### Estrutura do Componente

```
check-abandono/
├── check-abandono.ts      # Lógica do componente
├── check-abandono.html    # Template HTML
└── check-abandono.scss    # Estilos CSS
```

### Interface TypeScript

O componente espera os seguintes `@Input()`:

```typescript
@Input() jsonPath: string = 'estrategia/check-abandono.json';  // Caminho relativo ao /assets/content
@Input() basePath: string = '/assets/content';                  // Caminho base (geralmente não precisa alterar)
```

### Uso Básico

```typescript
import { Component } from '@angular/core';
import { CheckAbandono } from '../../../components/check-abandono/check-abandono';

@Component({
  selector: 'app-meu-modulo-check-abandono',
  standalone: true,
  imports: [CheckAbandono],
  template: '<app-check-abandono jsonPath="meu-modulo/check-abandono.json"></app-check-abandono>'
})
export class MeuModuloCheckAbandono { }
```

---

## 📁 Estrutura de Arquivos

### 1. Arquivo JSON

O arquivo JSON deve estar localizado em:
```
frontend-cemos/public/assets/content/[nome-do-modulo]/check-abandono.json
```

**Exemplos:**
- `frontend-cemos/public/assets/content/estrategia/check-abandono.json`
- `frontend-cemos/public/assets/content/planejamento/check-abandono.json`
- `frontend-cemos/public/assets/content/historia/check-abandono.json`

### 2. Componente Wrapper

O componente wrapper deve estar em:
```
frontend-cemos/src/app/modules/[nome-do-modulo]/[nome-do-modulo]-check-abandono/
```

**Exemplos:**
- `frontend-cemos/src/app/modules/app2-estrategia/app2-estrategia-check-abandono/`
- `frontend-cemos/src/app/modules/app3-planejamento-militar/app3-check-abandono/`

---

## 📝 Passo a Passo

### Passo 1: Criar o Componente Wrapper

1. Navegue até o diretório do módulo:
   ```bash
   cd frontend-cemos/src/app/modules/[nome-do-modulo]/
   ```

2. Crie o diretório do componente:
   ```bash
   mkdir [nome-do-modulo]-check-abandono
   cd [nome-do-modulo]-check-abandono
   ```

3. Crie o arquivo TypeScript:
   ```typescript
   // [nome-do-modulo]-check-abandono.ts
   import { Component } from '@angular/core';
   import { CheckAbandono } from '../../../components/check-abandono/check-abandono';

   @Component({
     selector: 'app-[nome-do-modulo]-check-abandono',
     standalone: true,
     imports: [CheckAbandono],
     template: '<app-check-abandono jsonPath="[nome-do-modulo]/check-abandono.json"></app-check-abandono>'
   })
   export class [NomeDoModulo]CheckAbandono { }
   ```

   **⚠️ Importante:**
   - Substitua `[nome-do-modulo]` pelo nome real do módulo (ex: `estrategia`, `planejamento`)
   - Substitua `[NomeDoModulo]` pelo nome em PascalCase (ex: `Estrategia`, `Planejamento`)
   - O `jsonPath` deve corresponder ao caminho relativo dentro de `/assets/content/`

### Passo 2: Adicionar a Rota

1. Abra o arquivo de rotas:
   ```
   frontend-cemos/src/app/routes/module-route.config.ts
   ```

2. Encontre a seção do seu módulo (ex: `App3 Planejamento Militar`)

3. Adicione o novo segmento dentro do array `segments`:

   ```typescript
   {
     title: 'App3 Planejamento Militar',
     path: 'app3-planejamento-militar',
     defaultChild: 'bibliografia',
     segments: [
       // ... outros segmentos ...
       {
         title: 'Check Abandono',
         path: 'check-abandono',
         loadComponent: () =>
           import('../modules/app3-planejamento-militar/app3-check-abandono/app3-check-abandono').then(
             (m) => m.App3CheckAbandono
           )
       },
     ]
   }
   ```

   **⚠️ Importante:**
   - Ajuste o caminho do `import()` para corresponder ao local do seu componente
   - Ajuste o nome da classe exportada (`App3CheckAbandono`)

### Passo 3: Adicionar ao Menu Lateral

1. Abra o arquivo do menu:
   ```
   frontend-cemos/src/app/pages/home/side-menu/side-menu.ts
   ```

2. Encontre o array `menuItems` e localize o item do seu módulo

3. Adicione `'Check Abandono'` ao array `children`:

   ```typescript
   { 
     title: 'Planejamento Militar', 
     icon: 'military_tech', 
     children: [
       {
         title: 'Bibliografia',
         children: [ /* ... */ ]
       },
       'Flash Cards',
       'Perguntas',
       'Check Abandono',  // ← Adicione aqui
     ],
     expanded: false
   }
   ```

4. Adicione a lógica de navegação no método `navigate()`:

   Encontre o `case` do seu módulo e adicione:

   ```typescript
   case 'Planejamento Militar':
     pathParts.push('app3-planejamento-militar');
     if (division === 'Bibliografia') {
       // ... lógica existente ...
     } else if (optionText) {
       switch (optionText) {
         case 'Bibliografia':
           pathParts.push('bibliografia');
           break;
         case 'Flash Cards':
           pathParts.push('flash-cards');
           break;  
         case 'Perguntas':
           pathParts.push('perguntas');
           break;
         case 'Conceitos':
           pathParts.push('conceitos');
           break;
         case 'Check Abandono':  // ← Adicione este case
           pathParts.push('check-abandono');
           break;
       }
     }
     break;
   ```

5. Verifique se o método `isItemActive()` já tem suporte:

   O método `isItemActive()` já deve ter um case genérico para `'Check Abandono'`:

   ```typescript
   if (division) {
     switch (division) {
       // ... outros cases ...
       case 'Check Abandono':
         pathParts.push('check-abandono');
         break;
       // ...
     }
   }
   ```

   Se não existir, adicione-o.

### Passo 4: Criar/Verificar o Arquivo JSON

1. Certifique-se de que o arquivo JSON existe em:
   ```
   frontend-cemos/public/assets/content/[nome-do-modulo]/check-abandono.json
   ```

2. Verifique se o JSON segue a estrutura correta (veja seção abaixo)

---

## 📚 Exemplos

### Exemplo 1: App2 Estratégia

**Componente:**
```typescript
// app2-estrategia-check-abandono.ts
import { Component } from '@angular/core';
import { CheckAbandono } from '../../../components/check-abandono/check-abandono';

@Component({
  selector: 'app-app2-estrategia-check-abandono',
  standalone: true,
  imports: [CheckAbandono],
  template: '<app-check-abandono jsonPath="estrategia/check-abandono.json"></app-check-abandono>'
})
export class App2EstrategiaCheckAbandono { }
```

**Rota:**
```typescript
{
  title: 'Check Abandono',
  path: 'check-abandono',
  loadComponent: () =>
    import('../modules/app2-estrategia/app2-estrategia-check-abandono/app2-estrategia-check-abandono').then(
      (m) => m.App2EstrategiaCheckAbandono
    )
}
```

**Menu:**
```typescript
{ 
  title: 'Estratégia', 
  icon: 'route', 
  children: [
    // ...
    'Check Abandono',
  ],
  expanded: false
}
```

### Exemplo 2: App3 Planejamento Militar

**Componente:**
```typescript
// app3-check-abandono.ts
import { Component } from '@angular/core';
import { CheckAbandono } from '../../../components/check-abandono/check-abandono';

@Component({
  selector: 'app-app3-check-abandono',
  standalone: true,
  imports: [CheckAbandono],
  template: '<app-check-abandono jsonPath="planejamento/check-abandono.json"></app-check-abandono>'
})
export class App3CheckAbandono { }
```

**Rota:**
```typescript
{
  title: 'Check Abandono',
  path: 'check-abandono',
  loadComponent: () =>
    import('../modules/app3-planejamento-militar/app3-check-abandono/app3-check-abandono').then(
      (m) => m.App3CheckAbandono
    )
}
```

---

## 📄 Estrutura do JSON

O arquivo JSON deve seguir esta estrutura:

```json
{
  "livros": [
    {
      "titulo": "Nome do Livro",
      "capitulos": [
        {
          "titulo": "Nome do Capítulo",
          "itens": [
            {
              "numero": 1,
              "texto": "Texto do item",
              "complemento": "Texto complementar (opcional)",
              "mnemonico": "Mnemônico em vermelho (opcional)"
            }
          ]
        }
      ]
    }
  ]
}
```

### Campos do Item

- **`numero`** (number, obrigatório): Número do item
- **`texto`** (string, obrigatório): Texto principal do item
- **`complemento`** (string, opcional): Texto que aparece ao clicar no item
- **`mnemonico`** (string, opcional): Mnemônico exibido em vermelho entre colchetes `[mnemonico]`

### Exemplo Completo

```json
{
  "livros": [
    {
      "titulo": "COUTAU-BÉGARIE",
      "capitulos": [
        {
          "titulo": "Cap 1",
          "itens": [
            {
              "numero": 1,
              "texto": "Origem da palavra",
              "complemento": "Estratego",
              "mnemonico": ""
            },
            {
              "numero": 11,
              "texto": "General Iung – estratégia em 3 partes:",
              "complemento": "",
              "mnemonico": "PoPA"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## ✅ Checklist de Verificação

Antes de considerar concluído, verifique:

- [ ] Componente wrapper criado e importando `CheckAbandono`
- [ ] Rota adicionada em `module-route.config.ts`
- [ ] Item `'Check Abandono'` adicionado ao menu em `side-menu.ts`
- [ ] Case `'Check Abandono'` adicionado no método `navigate()`
- [ ] Case `'Check Abandono'` verificado no método `isItemActive()`
- [ ] Arquivo JSON criado em `/public/assets/content/[modulo]/check-abandono.json`
- [ ] JSON segue a estrutura correta com `livros` → `capitulos` → `itens`
- [ ] Caminho no `jsonPath` corresponde ao caminho real do arquivo

---

## 🔍 Troubleshooting

### O componente não aparece no menu

- Verifique se adicionou `'Check Abandono'` ao array `children` do menu
- Verifique se o case no método `navigate()` está correto

### Erro ao carregar o JSON

- Verifique se o caminho do `jsonPath` está correto
- Verifique se o arquivo JSON existe em `/public/assets/content/[modulo]/check-abandono.json`
- Verifique se o JSON é válido (use um validador JSON online)

### Erro de rota

- Verifique se o caminho do `import()` na rota está correto
- Verifique se o nome da classe exportada está correto
- Verifique se o componente é `standalone: true`

### O menu lateral não funciona

- Verifique se os IDs dos capítulos estão sendo gerados corretamente
- Verifique se o método `scrollToCapitulo()` está funcionando
- Verifique o console do navegador para erros JavaScript

---

## 📖 Referências

- **Componente Reutilizável:** `frontend-cemos/src/app/components/check-abandono/`
- **Arquivo de Rotas:** `frontend-cemos/src/app/routes/module-route.config.ts`
- **Menu Lateral:** `frontend-cemos/src/app/pages/home/side-menu/side-menu.ts`
- **Assets:** `frontend-cemos/public/assets/content/`

---

## 💡 Dicas

1. **Nomenclatura Consistente:**
   - Use o mesmo padrão de nomenclatura dos outros módulos
   - Mantenha consistência entre o nome do módulo e o caminho do JSON

2. **Teste Localmente:**
   - Sempre teste localmente antes de fazer commit
   - Verifique em diferentes tamanhos de tela (desktop, tablet, mobile)

3. **Validação do JSON:**
   - Use um validador JSON antes de adicionar o arquivo
   - Certifique-se de que todos os campos obrigatórios estão presentes

4. **Reutilização:**
   - O componente é totalmente reutilizável
   - Não é necessário criar novos estilos ou lógica
   - Apenas configure o `jsonPath` corretamente

---

**Última atualização:** Janeiro 2025

