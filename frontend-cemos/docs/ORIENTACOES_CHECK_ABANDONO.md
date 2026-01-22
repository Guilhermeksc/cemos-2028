# Orientações: Adicionar Check Abandono em um Novo Módulo

Este documento descreve passo a passo como adicionar a funcionalidade de Check Abandono em um novo módulo do sistema CEMOS.

## Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura de Arquivos](#estrutura-de-arquivos)
3. [Passo 1: Criar Componente Wrapper do Módulo](#passo-1-criar-componente-wrapper-do-módulo)
4. [Passo 2: Configurar Rota no module-route.config.ts](#passo-2-configurar-rota-no-module-routeconfigts)
5. [Passo 3: Adicionar Link no Side Menu](#passo-3-adicionar-link-no-side-menu)
6. [Passo 4: Adicionar Botão na Página de Bibliografia](#passo-4-adicionar-botão-na-página-de-bibliografia)
7. [Passo 5: Criar/Verificar Arquivo JSON](#passo-5-criarverificar-arquivo-json)
8. [Verificação e Testes](#verificação-e-testes)
9. [Troubleshooting](#troubleshooting)

---

## Visão Geral

O componente `CheckAbandono` é um componente reutilizável que:
- Carrega dados de um arquivo JSON
- Exibe conteúdo organizado por livros e capítulos
- Permite expandir/comprimir itens para ver complementos
- Possui menu lateral para navegação entre capítulos
- É totalmente responsivo (desktop, tablet, mobile)

Cada módulo deve criar um componente wrapper que passa o caminho do JSON específico.

---

## Estrutura de Arquivos

```
frontend-cemos/
├── src/app/
│   ├── components/
│   │   └── check-abandono/
│   │       ├── check-abandono.ts      # Componente reutilizável
│   │       ├── check-abandono.html
│   │       └── check-abandono.scss
│   └── modules/
│       └── appX-nome-modulo/
│           └── appX-nome-modulo-check-abandono/
│               └── appX-nome-modulo-check-abandono.ts    # Wrapper do módulo
├── public/
│   └── assets/
│       └── content/
│           └── nome-modulo/
│               └── check-abandono.json    # Dados do módulo
└── routes/
    └── module-route.config.ts        # Configuração de rotas
```

---

## Passo 1: Criar Componente Wrapper do Módulo

### 1.1. Criar a estrutura de arquivos

```bash
mkdir -p src/app/modules/appX-nome-modulo/appX-nome-modulo-check-abandono
touch src/app/modules/appX-nome-modulo/appX-nome-modulo-check-abandono/appX-nome-modulo-check-abandono.ts
```

### 1.2. Implementar o componente TypeScript

**Arquivo:** `appX-nome-modulo-check-abandono.ts`

```typescript
import { Component } from '@angular/core';
import { CheckAbandono } from '../../../components/check-abandono/check-abandono';

@Component({
  selector: 'app-appX-nome-modulo-check-abandono',
  standalone: true,
  imports: [CheckAbandono],
  template: '<app-check-abandono jsonPath="nome-modulo/check-abandono.json"></app-check-abandono>'
})
export class AppXNomeModuloCheckAbandono { }
```

**⚠️ IMPORTANTE:**
- Substitua `nome-modulo` pelo nome real do módulo (ex: `intendencia`, `historia`, `geopolitica-ri`)
- O `jsonPath` deve corresponder ao caminho relativo dentro de `/assets/content/`
- O nome do seletor deve seguir o padrão: `app-appX-nome-modulo-check-abandono`

**Exemplos reais:**

**App1 Intendência:**
```typescript
template: '<app-check-abandono jsonPath="intendencia/check-abandono.json"></app-check-abandono>'
```

**App4 História:**
```typescript
template: '<app-check-abandono jsonPath="historia/check-abandono.json"></app-check-abandono>'
```

**App6 Geopolítica:**
```typescript
template: '<app-check-abandono jsonPath="geopolitica-ri/check-abandono.json"></app-check-abandono>'
```

---

## Passo 2: Configurar Rota no module-route.config.ts

### 2.1. Localizar a configuração do módulo

Abra `frontend-cemos/src/app/routes/module-route.config.ts` e localize a configuração do seu módulo.

### 2.2. Adicionar o segmento Check Abandono

Adicione o segmento "Check Abandono" no array `segments`:

```typescript
{
  title: 'AppX Nome do Módulo',
  path: 'appX-nome-modulo',
  defaultChild: 'bibliografia',
  segments: [
    // ... outros segmentos ...
    {
      title: 'Check Abandono',
      path: 'check-abandono',
      loadComponent: () =>
        import('../modules/appX-nome-modulo/appX-nome-modulo-check-abandono/appX-nome-modulo-check-abandono').then(
          (m) => m.AppXNomeModuloCheckAbandono
        )
    },
    // ... outros segmentos ...
  ]
}
```

**Exemplo real (App3 Planejamento Militar):**

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

**⚠️ IMPORTANTE:** 
- O caminho do import deve corresponder exatamente à estrutura de pastas
- O nome da classe exportada deve corresponder ao nome do arquivo (PascalCase)

---

## Passo 3: Adicionar Link no Side Menu

### 3.1. Adicionar "Check Abandono" no array de children

Abra `frontend-cemos/src/app/pages/home/side-menu/side-menu.ts` e localize o objeto do seu módulo no array `menuItems`.

Adicione `'Check Abandono'` no array `children`:

```typescript
{
  title: 'Nome do Módulo',
  icon: 'icone_aqui',
  children: [
    {
      title: 'Bibliografia',
      children: [
        // ... bibliografias ...
      ]
    },
    'Flash Cards',
    'Perguntas',
    'Simulados',
    'Check Abandono',  // ✅ ADICIONAR AQUI
    // ... outros itens ...
  ],
  expanded: false
}
```

**Exemplo real (Planejamento Militar):**

```typescript
{
  title: 'Planejamento Militar',
  icon: 'military_tech',
  children: [
    {
      title: 'Bibliografia',
      children: [
        'Lei nº 97/1999 - Organização, Preparo e o Emprego das Forças Armadas',
        'Decreto 7.276/2010 - Estrutura Militar de Defesa',
        'MD30-M-01 - Doutrina de Operações Conjuntas'
      ]
    },
    'Flash Cards',
    'Perguntas',
    'Simulados',
    'Check Abandono',  // ✅ Adicionado aqui
    'Conceitos',
  ],
  expanded: false
}
```

### 3.2. Adicionar case no método `navigate`

No método `navigate()`, localize o `switch` do seu módulo e adicione o case `'Check Abandono'`:

```typescript
navigate(section: string, division?: string, subDivision?: string, option?: string) {
  // ...
  switch (section) {
    case 'Nome do Módulo':
      pathParts.push('appX-nome-modulo');
      // ...
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
          case 'Simulados':
            pathParts.push('simulados');
            break;
          case 'Check Abandono':  // ✅ ADICIONAR AQUI
            pathParts.push('check-abandono');
            break;
          // ... outros cases ...
        }
      }
      break;
  }
  // ...
}
```

**Exemplo real (Planejamento Militar):**

```typescript
case 'Planejamento Militar':
  pathParts.push('app3-planejamento-militar');
  // ...
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
      case 'Simulados':
        pathParts.push('simulados');
        break;
      case 'Check Abandono':
        pathParts.push('check-abandono');
        break;
      case 'Conceitos':
        pathParts.push('conceitos');
        break;
    }
  }
  break;
```

### 3.3. Verificar método `isItemActive`

O método `isItemActive` já deve ter o case `'Check Abandono'` no switch de `division`. Se não tiver, adicione:

```typescript
isItemActive(section: string, division?: string, subDivision?: string): boolean {
  // ...
  if (division) {
    switch (division) {
      case 'Bibliografia':
        pathParts.push('bibliografia');
        break;
      case 'Flash Cards':
        pathParts.push('flash-cards');
        break;
      case 'Perguntas':
        pathParts.push('perguntas');
        break;
      case 'Simulados':
        pathParts.push('simulados');
        break;
      case 'Check Abandono':  // ✅ Verificar se existe
        pathParts.push('check-abandono');
        break;
      // ... outros cases ...
    }
  }
  // ...
}
```

---

## Passo 4: Adicionar Botão na Página de Bibliografia

### 4.1. Adicionar propriedade `checkAbandonoPath`

Abra o arquivo do componente de Bibliografia do módulo:
`frontend-cemos/src/app/modules/appX-nome-modulo/appX-nome-modulo-bibliografia/appX-nome-modulo-bibliografia.ts`

Adicione a propriedade `checkAbandonoPath` junto com as outras rotas:

```typescript
export class AppXNomeModuloBibliografia implements OnInit {
  private readonly ROUTE_BASE = '/home/appX-nome-modulo';
  // ...
  
  /** 🔹 Subrotas */
  public conceitosPath = `${this.ROUTE_BASE}/conceitos`;
  public flashcardsPath = `${this.ROUTE_BASE}/flash-cards`;
  public perguntasPath = `${this.ROUTE_BASE}/perguntas`;
  public simuladosPath = `${this.ROUTE_BASE}/simulados`;
  public checkAbandonoPath = `${this.ROUTE_BASE}/check-abandono`;  // ✅ ADICIONAR AQUI
}
```

**Exemplo real (App3 Planejamento Militar):**

```typescript
public conceitosPath = `${this.ROUTE_BASE}/conceitos`;
public flashcardsPath = `${this.ROUTE_BASE}/flash-cards`;
public perguntasPath = `${this.ROUTE_BASE}/perguntas`;
public simuladosPath = `${this.ROUTE_BASE}/simulados`;
public checkAbandonoPath = `${this.ROUTE_BASE}/check-abandono`;
```

### 4.2. Passar `checkAbandonoPath` para o componente CapaBibliografia

Abra o template HTML da Bibliografia:
`frontend-cemos/src/app/modules/appX-nome-modulo/appX-nome-modulo-bibliografia/appX-nome-modulo-bibliografia.html`

Adicione `[checkAbandonoPath]="checkAbandonoPath"` no componente `<app-capa-bibliografia>`:

```html
<app-capa-bibliografia
  *ngIf="showCapa"
  [capas]="capas"
  [markdownPath]="markdownPath"
  [basePath]="basePath"
  [conceitosPath]="conceitosPath"
  [flashcardsPath]="flashcardsPath"
  [perguntasPath]="perguntasPath"
  [simuladosPath]="simuladosPath"
  [checkAbandonoPath]="checkAbandonoPath">  <!-- ✅ ADICIONAR AQUI -->
</app-capa-bibliografia>
```

### 4.3. Verificar componente CapaBibliografia

O componente `CapaBibliografia` já deve ter o input `checkAbandonoPath` e o botão configurado. Se não tiver, verifique:

**Arquivo:** `frontend-cemos/src/app/components/capa-bibliografia/capa-bibliografia.ts`

```typescript
@Input() checkAbandonoPath: string = '';
```

**Arquivo:** `frontend-cemos/src/app/components/capa-bibliografia/capa-bibliografia.html`

```html
<button mat-stroked-button (click)="navigateTo(checkAbandonoPath)" *ngIf="checkAbandonoPath">
  <span class="button-content">
    <mat-icon class="button-icon">checklist</mat-icon>
    <span class="button-text">Check Abandono</span>
  </span>
</button>
```

---

## Passo 5: Criar/Verificar Arquivo JSON

### 5.1. Localização do arquivo JSON

O arquivo JSON deve estar localizado em:
```
frontend-cemos/public/assets/content/[nome-do-modulo]/check-abandono.json
```

**Exemplos:**
- `frontend-cemos/public/assets/content/intendencia/check-abandono.json`
- `frontend-cemos/public/assets/content/historia/check-abandono.json`
- `frontend-cemos/public/assets/content/geopolitica-ri/check-abandono.json`

### 5.2. Estrutura do JSON

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

### 5.3. Campos do Item

- **`numero`** (number, obrigatório): Número do item
- **`texto`** (string, obrigatório): Texto principal do item
- **`complemento`** (string, opcional): Texto que aparece ao clicar no item
- **`mnemonico`** (string, opcional): Mnemônico exibido em vermelho entre colchetes `[mnemonico]`

### 5.4. Exemplo Completo

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

## Verificação e Testes

### Checklist de Verificação

- [ ] Componente wrapper criado e importando `CheckAbandono`
- [ ] Rota configurada em `module-route.config.ts`
- [ ] "Check Abandono" adicionado no array `children` do menu
- [ ] Case `'Check Abandono'` adicionado no método `navigate()`
- [ ] Case `'Check Abandono'` verificado no método `isItemActive()`
- [ ] `checkAbandonoPath` adicionado no componente de Bibliografia
- [ ] `[checkAbandonoPath]` passado para `CapaBibliografia` no template
- [ ] Arquivo JSON criado em `/public/assets/content/[modulo]/check-abandono.json`
- [ ] JSON segue a estrutura correta com `livros` → `capitulos` → `itens`

### Testes a Realizar

1. **Navegação pelo Side Menu:**
   - Abra o menu lateral
   - Expanda o módulo
   - Clique em "Check Abandono"
   - ✅ Deve navegar para `/home/appX-nome-modulo/check-abandono`
   - ✅ Deve carregar o componente e exibir o conteúdo do JSON

2. **Navegação pela Página de Bibliografia:**
   - Acesse a página de Bibliografia do módulo
   - Clique no botão "Check Abandono"
   - ✅ Deve navegar para `/home/appX-nome-modulo/check-abandono`
   - ✅ Deve carregar o componente e exibir o conteúdo do JSON

3. **Funcionalidade do Componente:**
   - Verifique se o conteúdo do JSON é exibido corretamente
   - Clique em um item para expandir/comprimir
   - Use o menu lateral para navegar entre capítulos
   - ✅ Todas as funcionalidades devem funcionar corretamente

---

## Troubleshooting

### Problema: Página em branco ao clicar em Check Abandono

**Possíveis causas:**

1. **Rota não configurada corretamente**
   - Verifique se o caminho do import em `module-route.config.ts` está correto
   - Verifique se o nome da classe exportada corresponde ao nome do arquivo

2. **Componente não encontrado**
   - Verifique se o arquivo `.ts` existe e está no caminho correto
   - Verifique se a classe está exportada corretamente

3. **Erro de compilação**
   - Abra o console do navegador (F12) e verifique erros
   - Verifique o terminal onde o Angular está rodando

**Solução:**
```bash
# Verificar se o arquivo existe
ls -la src/app/modules/appX-nome-modulo/appX-nome-modulo-check-abandono/

# Verificar erros de compilação no terminal
# Procurar por erros relacionados ao módulo
```

### Problema: Erro ao carregar o JSON

**Possíveis causas:**

1. **Caminho do JSON incorreto**
   - Verifique se o `jsonPath` no componente wrapper está correto
   - Verifique se o arquivo JSON existe em `/public/assets/content/[modulo]/check-abandono.json`

2. **JSON inválido**
   - Valide o JSON usando um validador online
   - Verifique se a estrutura está correta (livros → capitulos → itens)

**Solução:**
```typescript
// Verificar o caminho no componente
template: '<app-check-abandono jsonPath="nome-modulo/check-abandono.json"></app-check-abandono>'

// Verificar se o arquivo existe
ls -la public/assets/content/nome-modulo/check-abandono.json

// Validar JSON
cat public/assets/content/nome-modulo/check-abandono.json | jq .
```

### Problema: Botão Check Abandono não aparece na Bibliografia

**Possíveis causas:**

1. **`checkAbandonoPath` não definido**
   - Verifique se a propriedade está definida no componente de Bibliografia

2. **`[checkAbandonoPath]` não passado para CapaBibliografia**
   - Verifique se o binding está no template HTML

3. **Componente CapaBibliografia não atualizado**
   - Verifique se o componente tem o input `@Input() checkAbandonoPath`
   - Verifique se o botão está no template HTML

**Solução:**
```typescript
// No componente de Bibliografia
public checkAbandonoPath = `${this.ROUTE_BASE}/check-abandono`;
console.log('🔗 checkAbandonoPath:', this.checkAbandonoPath);
```

### Problema: Menu lateral não funciona

**Possíveis causas:**

1. **IDs dos capítulos não sendo gerados corretamente**
   - Verifique se o método `getCapituloId()` está funcionando
   - Verifique se os IDs estão sendo atribuídos corretamente no HTML

2. **Método `scrollToCapitulo()` não funcionando**
   - Verifique o console do navegador para erros JavaScript
   - Verifique se os elementos estão sendo encontrados

**Solução:**
```typescript
// Adicionar logs para debug
scrollToCapitulo(livroIndex: number, capituloIndex: number): void {
  const elementId = this.getCapituloId(livroIndex, capituloIndex);
  console.log('📍 Tentando fazer scroll para:', elementId);
  const element = document.getElementById(elementId);
  console.log('🔍 Elemento encontrado:', !!element);
  // ... resto do código
}
```

---

## Exemplo Completo: App3 Planejamento Militar

### 1. Componente Wrapper

**Arquivo:** `app3-check-abandono/app3-check-abandono.ts`
```typescript
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

### 2. Rota Configurada

**Arquivo:** `routes/module-route.config.ts`
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

### 3. Side Menu

**Arquivo:** `pages/home/side-menu/side-menu.ts`
```typescript
// No array menuItems
{
  title: 'Planejamento Militar',
  children: [
    // ...
    'Check Abandono',  // ✅ Adicionado
    // ...
  ]
}

// No método navigate()
case 'Planejamento Militar':
  // ...
  case 'Check Abandono':
    pathParts.push('check-abandono');
    break;
```

### 4. Bibliografia

**Arquivo:** `modules/app3-planejamento-militar/app3-planejamento-militar-bibliografia/app3-planejamento-militar-bibliografia.ts`
```typescript
public checkAbandonoPath = `${this.ROUTE_BASE}/check-abandono`;
```

**Arquivo:** `modules/app3-planejamento-militar/app3-planejamento-militar-bibliografia/app3-planejamento-militar-bibliografia.html`
```html
<app-capa-bibliografia
  [checkAbandonoPath]="checkAbandonoPath">
</app-capa-bibliografia>
```

---

## Arquitetura do Componente CheckAbandono

### Componente Principal: `CheckAbandono`

**Localização:** `frontend-cemos/src/app/components/check-abandono/check-abandono.ts`

**Responsabilidades:**
- Carregar dados do arquivo JSON via HTTP
- Exibir conteúdo organizado por livros e capítulos
- Gerenciar estado de expansão/compreensão dos itens
- Navegação entre capítulos via menu lateral
- Scroll suave para capítulos específicos

**Inputs:**
- `@Input() jsonPath: string` - Caminho relativo ao JSON (ex: `"planejamento/check-abandono.json"`)
- `@Input() basePath: string` - Caminho base (padrão: `"/assets/content"`)

**Funcionalidades Principais:**
- Carregamento assíncrono do JSON
- Menu lateral responsivo (mobile/desktop)
- Expansão/compreensão de itens individuais
- Scroll suave para capítulos
- Tratamento de erros de carregamento

---

## Mapeamento de Módulos para Nomes de Arquivos JSON

| Módulo | Nome do Arquivo JSON | Caminho Completo |
|--------|---------------------|------------------|
| App1 Intendência | `intendencia/check-abandono.json` | `/assets/content/intendencia/check-abandono.json` |
| App2 Estratégia | `estrategia/check-abandono.json` | `/assets/content/estrategia/check-abandono.json` |
| App3 Planejamento Militar | `planejamento/check-abandono.json` | `/assets/content/planejamento/check-abandono.json` |
| App4 História | `historia/check-abandono.json` | `/assets/content/historia/check-abandono.json` |
| App6 Geopolítica | `geopolitica-ri/check-abandono.json` | `/assets/content/geopolitica-ri/check-abandono.json` |
| App7 Política | `politica/check-abandono.json` | `/assets/content/politica/check-abandono.json` |
| App8 Direito | `direito/check-abandono.json` | `/assets/content/direito/check-abandono.json` |
| App9 Economia | `economia/check-abandono.json` | `/assets/content/economia/check-abandono.json` |

---

## Boas Práticas

### 1. Nomenclatura

- Use o padrão: `appX-nome-modulo-check-abandono`
- Classe: `AppXNomeModuloCheckAbandono` (PascalCase)
- Arquivo: `appX-nome-modulo-check-abandono.ts` (kebab-case)

### 2. Caminhos JSON

- Use nomes consistentes com a estrutura de pastas
- Verifique se o caminho corresponde ao arquivo real
- Use caminhos relativos ao `/assets/content/`

### 3. Estrutura JSON

- Mantenha a estrutura consistente: `livros` → `capitulos` → `itens`
- Valide o JSON antes de commit
- Use campos opcionais quando apropriado (`complemento`, `mnemonico`)

### 4. Tratamento de Erros

- Sempre trate erros de carregamento do JSON
- Exiba mensagens claras ao usuário
- Use logs para debug durante desenvolvimento

---

## Referências

- **Componente CheckAbandono:** `frontend-cemos/src/app/components/check-abandono/`
- **Exemplo App2:** `frontend-cemos/src/app/modules/app2-estrategia/app2-estrategia-check-abandono/`
- **Exemplo App3:** `frontend-cemos/src/app/modules/app3-planejamento-militar/app3-check-abandono/`
- **Arquivos JSON:** `frontend-cemos/public/assets/content/[modulo]/check-abandono.json`

---

## Suporte

Em caso de dúvidas ou problemas:

1. Verifique os logs no console do navegador
2. Verifique os logs no terminal do Angular
3. Consulte este documento
4. Consulte os exemplos existentes (App2, App3)
5. Verifique se todos os passos foram seguidos corretamente

---

**Última atualização:** Janeiro 2025
**Versão:** 1.0
