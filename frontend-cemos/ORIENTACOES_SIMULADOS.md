# Orientações: Adicionar Simulados em um Novo Módulo

Este documento descreve passo a passo como adicionar a funcionalidade de Simulados em um novo módulo do sistema CEMOS.

## Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura de Arquivos](#estrutura-de-arquivos)
3. [Passo 1: Criar Componente Wrapper do Módulo](#passo-1-criar-componente-wrapper-do-módulo)
4. [Passo 2: Configurar Rota no module-route.config.ts](#passo-2-configurar-rota-no-module-routeconfigts)
5. [Passo 3: Adicionar Link no Side Menu](#passo-3-adicionar-link-no-side-menu)
6. [Passo 4: Adicionar Botão na Página de Bibliografia](#passo-4-adicionar-botão-na-página-de-bibliografia)
7. [Verificação e Testes](#verificação-e-testes)
8. [Troubleshooting](#troubleshooting)

---

## Visão Geral

O componente `Simulados` é um componente compartilhado que permite gerar simulados rápidos (PDF direto) e um simulado customizado único. Cada módulo deve:

1. Criar um componente wrapper que passa os `bibliografiaIds` específicos do módulo
2. Configurar a rota para carregar o wrapper
3. Adicionar o link no menu lateral
4. Adicionar o botão na página de Bibliografia

---

## Estrutura de Arquivos

```
frontend-cemos/src/app/
├── components/
│   └── simulados/
│       ├── simulados.ts              # Componente principal (compartilhado)
│       ├── simulados.html
│       ├── simulados.scss
│       ├── simulados.types.ts        # Interfaces e tipos
│       └── services/
│           └── simulados-pdf.service.ts  # Serviço de geração de PDF
├── modules/
│   └── appX-nome-modulo/
│       └── appX-nome-modulo-simulados/
│           ├── appX-nome-modulo-simulados.ts    # Wrapper do módulo
│           ├── appX-nome-modulo-simulados.html
│           └── appX-nome-modulo-simulados.scss
├── routes/
│   └── module-route.config.ts        # Configuração de rotas
└── pages/
    └── home/
        └── side-menu/
            └── side-menu.ts           # Menu lateral
```

---

## Passo 1: Criar Componente Wrapper do Módulo

### 1.1. Criar a estrutura de arquivos

Crie a pasta e os arquivos do componente wrapper:

```bash
mkdir -p src/app/modules/appX-nome-modulo/appX-nome-modulo-simulados
touch src/app/modules/appX-nome-modulo/appX-nome-modulo-simulados/appX-nome-modulo-simulados.ts
touch src/app/modules/appX-nome-modulo/appX-nome-modulo-simulados/appX-nome-modulo-simulados.html
touch src/app/modules/appX-nome-modulo/appX-nome-modulo-simulados/appX-nome-modulo-simulados.scss
```

### 1.2. Implementar o componente TypeScript

**Arquivo:** `appX-nome-modulo-simulados.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Simulados } from '../../../components/simulados/simulados';

@Component({
  selector: 'app-appX-nome-modulo-simulados',
  standalone: true,
  imports: [CommonModule, Simulados],
  templateUrl: './appX-nome-modulo-simulados.html',
  styleUrl: './appX-nome-modulo-simulados.scss'
})
export class AppXNomeModuloSimulados implements OnInit {
  // ⚠️ IMPORTANTE: Substitua pelos IDs reais das bibliografias do seu módulo
  // Para descobrir os IDs:
  // 1. Acesse o admin do Django ou a API diretamente
  // 2. Liste as bibliografias: GET /api/bibliografia/api/bibliografias/
  // 3. Encontre os IDs das bibliografias do seu módulo
  // 4. Substitua este array pelos IDs reais
  readonly bibliografiasDisponiveisIds: number[] = [ID1, ID2, ID3, ...];
  
  // Rota para voltar à bibliografia
  bibliografiaPath = '/home/appX-nome-modulo/bibliografia';
  
  pageTitle = 'Simulados de Nome do Módulo';

  constructor() {
    console.log('🏗️ [AppXNomeModuloSimulados] Constructor chamado');
    console.log('📚 [AppXNomeModuloSimulados] Bibliografias configuradas:', this.bibliografiasDisponiveisIds);
  }

  ngOnInit() {
    console.log('🚀 [AppXNomeModuloSimulados] Módulo de Simulados iniciado');
    console.log('📚 [AppXNomeModuloSimulados] Bibliografias disponíveis:', this.bibliografiasDisponiveisIds);
  }
}
```

**Exemplo real (App3 Planejamento Militar):**

```typescript
readonly bibliografiasDisponiveisIds: number[] = [69, 70, 71];
bibliografiaPath = '/home/app3-planejamento-militar/bibliografia';
pageTitle = 'Simulados de Planejamento Militar';
```

### 1.3. Criar o template HTML

**Arquivo:** `appX-nome-modulo-simulados.html`

```html
<app-simulados 
  [bibliografiaIds]="bibliografiasDisponiveisIds"
  [assuntoId]="null">
</app-simulados>
```

### 1.4. Criar o arquivo SCSS (opcional)

**Arquivo:** `appX-nome-modulo-simulados.scss`

```scss
// Estilos específicos do módulo, se necessário
// Por padrão, pode ficar vazio pois o componente Simulados já tem seus próprios estilos
```

---

## Passo 2: Configurar Rota no module-route.config.ts

### 2.1. Localizar a configuração do módulo

Abra `frontend-cemos/src/app/routes/module-route.config.ts` e localize a configuração do seu módulo no array `MODULE_ROUTE_CONFIGS`.

### 2.2. Adicionar o segmento Simulados

Adicione o segmento "Simulados" **após** o segmento "Perguntas" no array `segments`:

```typescript
{
  title: 'AppX Nome do Módulo',
  path: 'appX-nome-modulo',
  defaultChild: 'bibliografia',
  segments: [
    // ... outros segmentos ...
    {
      title: 'Perguntas',
      path: 'perguntas',
      loadComponent: () =>
        import('../modules/appX-nome-modulo/appX-nome-modulo-perguntas/appX-nome-modulo-perguntas').then(
          (m) => m.AppXNomeModuloPerguntas
        )
    },
    // ✅ ADICIONAR AQUI
    {
      title: 'Simulados',
      path: 'simulados',
      loadComponent: () =>
        import('../modules/appX-nome-modulo/appX-nome-modulo-simulados/appX-nome-modulo-simulados').then(
          (m) => m.AppXNomeModuloSimulados
        )
    },
    // ... outros segmentos ...
  ]
}
```

**Exemplo real (App3 Planejamento Militar):**

```typescript
{
  title: 'Simulados',
  path: 'simulados',
  loadComponent: () =>
    import('../modules/app3-planejamento-militar/app3-simulados/app3-simulados').then(
      (m) => m.App3Simulados
    )
}
```

**⚠️ IMPORTANTE:** 
- O caminho do import deve corresponder exatamente à estrutura de pastas
- O nome da classe exportada deve corresponder ao nome do arquivo (PascalCase)

---

## Passo 3: Adicionar Link no Side Menu

### 3.1. Adicionar "Simulados" no array de children

Abra `frontend-cemos/src/app/pages/home/side-menu/side-menu.ts` e localize o objeto do seu módulo no array `menuItems`.

Adicione `'Simulados'` **após** `'Perguntas'` no array `children`:

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
    'Simulados',  // ✅ ADICIONAR AQUI
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
    'Simulados',  // ✅ Adicionado aqui
    'Conceitos',
    'Check Abandono',
  ],
  expanded: false
}
```

### 3.2. Adicionar case no método `navigate`

No método `navigate()`, localize o `switch` do seu módulo e adicione o case `'Simulados'`:

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
          case 'Simulados':  // ✅ ADICIONAR AQUI
            pathParts.push('simulados');
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
      case 'Conceitos':
        pathParts.push('conceitos');
        break;
      case 'Check Abandono':
        pathParts.push('check-abandono');
        break;
    }
  }
  break;
```

### 3.3. Verificar método `isItemActive`

O método `isItemActive` já deve ter o case `'Simulados'` no switch de `division`. Se não tiver, adicione:

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
      case 'Simulados':  // ✅ Verificar se existe
        pathParts.push('simulados');
        break;
      // ... outros cases ...
    }
  }
  // ...
}
```

---

## Passo 4: Adicionar Botão na Página de Bibliografia

### 4.1. Adicionar propriedade `simuladosPath`

Abra o arquivo do componente de Bibliografia do módulo:
`frontend-cemos/src/app/modules/appX-nome-modulo/appX-nome-modulo-bibliografia/appX-nome-modulo-bibliografia.ts`

Adicione a propriedade `simuladosPath` junto com as outras rotas:

```typescript
export class AppXNomeModuloBibliografia implements OnInit {
  private readonly ROUTE_BASE = '/home/appX-nome-modulo';
  // ...
  
  /** 🔹 Subrotas */
  public conceitosPath = `${this.ROUTE_BASE}/conceitos`;
  public flashcardsPath = `${this.ROUTE_BASE}/flash-cards`;
  public perguntasPath = `${this.ROUTE_BASE}/perguntas`;
  public simuladosPath = `${this.ROUTE_BASE}/simulados`;  // ✅ ADICIONAR AQUI
}
```

**Exemplo real (App3 Planejamento Militar):**

```typescript
public conceitosPath = `${this.ROUTE_BASE}/conceitos`;
public flashcardsPath = `${this.ROUTE_BASE}/flash-cards`;
public perguntasPath = `${this.ROUTE_BASE}/perguntas`;
public simuladosPath = `${this.ROUTE_BASE}/simulados`;
```

### 4.2. Passar `simuladosPath` para o componente CapaBibliografia

Abra o template HTML da Bibliografia:
`frontend-cemos/src/app/modules/appX-nome-modulo/appX-nome-modulo-bibliografia/appX-nome-modulo-bibliografia.html`

Adicione `[simuladosPath]="simuladosPath"` no componente `<app-capa-bibliografia>`:

```html
<app-capa-bibliografia
  *ngIf="showCapa"
  [capas]="capas"
  [markdownPath]="markdownPath"
  [basePath]="basePath"
  [conceitosPath]="conceitosPath"
  [flashcardsPath]="flashcardsPath"
  [perguntasPath]="perguntasPath"
  [simuladosPath]="simuladosPath">  <!-- ✅ ADICIONAR AQUI -->
</app-capa-bibliografia>
```

### 4.3. Verificar componente CapaBibliografia

O componente `CapaBibliografia` já deve ter o input `simuladosPath` e o botão configurado. Se não tiver, verifique:

**Arquivo:** `frontend-cemos/src/app/components/capa-bibliografia/capa-bibliografia.ts`

```typescript
@Input() simuladosPath: string = '';
```

**Arquivo:** `frontend-cemos/src/app/components/capa-bibliografia/capa-bibliografia.html`

```html
<button mat-stroked-button (click)="navigateTo(simuladosPath)" *ngIf="simuladosPath">
  <span class="button-content">
    <mat-icon class="button-icon">assignment</mat-icon>
    <span class="button-text">Simulados</span>
  </span>
</button>
```

---

## Verificação e Testes

### Checklist de Verificação

- [ ] Componente wrapper criado com os `bibliografiaIds` corretos
- [ ] Rota configurada em `module-route.config.ts`
- [ ] "Simulados" adicionado no array `children` do menu
- [ ] Case `'Simulados'` adicionado no método `navigate()`
- [ ] Case `'Simulados'` verificado no método `isItemActive()`
- [ ] `simuladosPath` adicionado no componente de Bibliografia
- [ ] `[simuladosPath]` passado para `CapaBibliografia` no template

### Testes a Realizar

1. **Navegação pelo Side Menu:**
   - Abra o menu lateral
   - Expanda o módulo
   - Clique em "Simulados"
   - ✅ Deve navegar para `/home/appX-nome-modulo/simulados`
   - ✅ Deve carregar o componente com as bibliografias corretas

2. **Navegação pela Página de Bibliografia:**
   - Acesse a página de Bibliografia do módulo
   - Clique no botão "Simulados"
   - ✅ Deve navegar para `/home/appX-nome-modulo/simulados`
   - ✅ Deve carregar o componente com as bibliografias corretas

3. **Funcionalidade do Componente:**
   - Verifique se as bibliografias aparecem pré-selecionadas
  - Clique em "Gerar Simulado" em um preset (PDF direto)
  - Configure o Simulado Customizado
  - Gere questões no Simulado Customizado
  - Gere o PDF do Simulado Customizado
   - ✅ Todas as funcionalidades devem funcionar corretamente

---

## Troubleshooting

### Problema: Página em branco ao clicar em Simulados

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
ls -la src/app/modules/appX-nome-modulo/appX-nome-modulo-simulados/

# Verificar erros de compilação no terminal
# Procurar por erros relacionados ao módulo
```

### Problema: Navegação não funciona pelo side-menu

**Possíveis causas:**

1. **Case 'Simulados' faltando no método `navigate()`**
   - Verifique se o case está adicionado no switch correto do módulo

2. **Path construído incorretamente**
   - Adicione logs no método `navigate()` para verificar o path construído
   - Verifique se o path corresponde à rota configurada

**Solução:**
```typescript
// Adicionar logs temporários para debug
navigate(section: string, division?: string, subDivision?: string, option?: string) {
  console.log('🧭 [SideMenu] navigate:', { section, division, option });
  // ... resto do código
  console.log('📍 [SideMenu] Path final:', pathParts.join('/'));
}
```

### Problema: Bibliografias não aparecem pré-selecionadas

**Possíveis causas:**

1. **IDs incorretos**
   - Verifique se os IDs das bibliografias estão corretos
   - Consulte a API para confirmar os IDs: `GET /api/bibliografia/api/bibliografias/`

2. **Input não sendo passado corretamente**
   - Verifique se `[bibliografiaIds]="bibliografiasDisponiveisIds"` está no template
   - Verifique se a propriedade está definida no componente wrapper

**Solução:**
```typescript
// Verificar no console do navegador
console.log('📚 Bibliografias configuradas:', this.bibliografiasDisponiveisIds);

// Verificar na API
// GET http://localhost:8000/api/bibliografia/api/bibliografias/
// Procurar pelas bibliografias do módulo e anotar os IDs
```

### Problema: Botão Simulados não aparece na Bibliografia

**Possíveis causas:**

1. **`simuladosPath` não definido**
   - Verifique se a propriedade está definida no componente de Bibliografia

2. **`[simuladosPath]` não passado para CapaBibliografia**
   - Verifique se o binding está no template HTML

3. **Componente CapaBibliografia não atualizado**
   - Verifique se o componente tem o input `@Input() simuladosPath`
   - Verifique se o botão está no template HTML

**Solução:**
```typescript
// No componente de Bibliografia
public simuladosPath = `${this.ROUTE_BASE}/simulados`;
console.log('🔗 simuladosPath:', this.simuladosPath);
```

---

## Exemplo Completo: App3 Planejamento Militar

### 1. Componente Wrapper

**Arquivo:** `app3-simulados/app3-simulados.ts`
```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Simulados } from '../../../components/simulados/simulados';

@Component({
  selector: 'app-app3-simulados',
  standalone: true,
  imports: [CommonModule, Simulados],
  templateUrl: './app3-simulados.html',
  styleUrl: './app3-simulados.scss'
})
export class App3Simulados implements OnInit {
  readonly bibliografiasDisponiveisIds: number[] = [69, 70, 71];
  bibliografiaPath = '/home/app3-planejamento-militar/bibliografia';
  pageTitle = 'Simulados de Planejamento Militar';

  ngOnInit() {
    console.log('🚀 [App3Simulados] Módulo iniciado');
  }
}
```

**Arquivo:** `app3-simulados/app3-simulados.html`
```html
<app-simulados 
  [bibliografiaIds]="bibliografiasDisponiveisIds"
  [assuntoId]="null">
</app-simulados>
```

### 2. Rota Configurada

**Arquivo:** `routes/module-route.config.ts`
```typescript
{
  title: 'Simulados',
  path: 'simulados',
  loadComponent: () =>
    import('../modules/app3-planejamento-militar/app3-simulados/app3-simulados').then(
      (m) => m.App3Simulados
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
    'Perguntas',
    'Simulados',  // ✅ Adicionado
    // ...
  ]
}

// No método navigate()
case 'Planejamento Militar':
  // ...
  case 'Simulados':
    pathParts.push('simulados');
    break;
```

### 4. Bibliografia

**Arquivo:** `modules/app3-planejamento-militar/app3-planejamento-militar-bibliografia/app3-planejamento-militar-bibliografia.ts`
```typescript
public simuladosPath = `${this.ROUTE_BASE}/simulados`;
```

**Arquivo:** `modules/app3-planejamento-militar/app3-planejamento-militar-bibliografia/app3-planejamento-militar-bibliografia.html`
```html
<app-capa-bibliografia
  [simuladosPath]="simuladosPath">
</app-capa-bibliografia>
```

---

## Arquitetura do Componente Simulados

### Componente Principal: `Simulados`

**Localização:** `frontend-cemos/src/app/components/simulados/simulados.ts`

**Responsabilidades:**
- Gerar PDFs diretamente a partir dos presets rápidos
- Manter um único simulado customizado configurável
- Carregar bibliografias disponíveis
- Gerar questões aleatórias conforme configuração
- Persistir a configuração do simulado customizado no `localStorage`
- Integrar com o serviço de PDF para gerar documentos

**Inputs:**
- `@Input() bibliografiaIds: number[]` - IDs das bibliografias a serem usadas
- `@Input() assuntoId?: number | null` - ID do assunto (opcional)

**Funcionalidades Principais:**
- Gerar PDF direto a partir de presets rápidos
- Configurar um simulado customizado único
- Gerar questões automaticamente
- Gerar PDFs personalizados

### Serviço de PDF: `SimuladosPdfService`

**Localização:** `frontend-cemos/src/app/components/simulados/services/simulados-pdf.service.ts`

**Responsabilidades:**
- Gerar PDFs com questões misturadas
- Gerar PDFs por tipo de questão
- Aplicar personalizações (agrupamento, justificativas, etc.)
- Processar texto (remover emojis, estilização markdown)

**Métodos Principais:**
- `generateMixedPdf()` - Gera PDF único com todas as questões
- `generatePdfByType()` - Gera PDF por tipo específico

### Tipos Compartilhados: `simulados.types.ts`

**Localização:** `frontend-cemos/src/app/components/simulados/simulados.types.ts`

**Interfaces Principais:**
- `SimuladoQuestion` - Representa uma questão no simulado
- `SimuladoConfig` - Configuração de quantidades por tipo
- `SimuladoCard` - Card completo com questões e estado
- `PdfCustomizationOptions` - Opções de personalização do PDF

**Presets:**
- `SIMULADO_PRESETS` - Array com 3 presets pré-configurados

---

## Fluxo de Funcionamento

### 1. Usuário acessa a página de Simulados

```
URL: /home/appX-nome-modulo/simulados
  ↓
Router carrega AppXNomeModuloSimulados
  ↓
AppXNomeModuloSimulados renderiza <app-simulados>
  ↓
Componente Simulados recebe bibliografiaIds via @Input
  ↓
Simulados carrega bibliografias do PerguntasService
  ↓
Simulados carrega configuração do simulado customizado (localStorage)
```

### 2. Usuário gera um simulado rápido (preset)

```
Usuário clica em "Gerar Simulado" em um preset
  ↓
Simulados.generatePresetPdf()
  ↓
Busca questões de cada tipo via PerguntasService
  ↓
Seleciona questões aleatórias conforme configuração do preset
  ↓
Delega para SimuladosPdfService.generateMixedPdf()
  ↓
PDF baixado automaticamente
```

### 3. Usuário configura o simulado customizado

```
Usuário seleciona bibliografias (se necessário)
  ↓
Usuário ajusta quantidades (V/F, Múltipla, Correlação)
  ↓
Usuário clica em "Gerar Questões"
  ↓
Simulados.generateCustomQuestions()
  ↓
Busca questões de cada tipo via PerguntasService
  ↓
Seleciona questões aleatórias conforme configuração
  ↓
Embaralha questões
  ↓
Atualiza simulado customizado com questões geradas
```

### 4. Usuário gera PDF do simulado customizado

```
Usuário clica em "Gerar PDF"
  ↓
Simulados.generateCustomPdf()
  ↓
Delega para SimuladosPdfService.generateMixedPdf()
  ↓
Serviço gera PDF usando jsPDF
  ↓
PDF baixado automaticamente
```

---

## Boas Práticas

### 1. IDs de Bibliografias

- **Sempre verifique os IDs reais** antes de configurar
- Use a API ou admin do Django para confirmar
- Documente de onde vieram os IDs

### 2. Nomenclatura

- Use o padrão: `appX-nome-modulo-simulados`
- Classe: `AppXNomeModuloSimulados` (PascalCase)
- Arquivo: `appX-nome-modulo-simulados.ts` (kebab-case)

### 3. Logs de Debug

- Mantenha logs durante desenvolvimento
- Remova logs excessivos antes de produção
- Use prefixos consistentes: `[AppXNomeModuloSimulados]`

### 4. Tratamento de Erros

- Sempre trate erros ao buscar questões
- Exiba mensagens claras ao usuário
- Valide quantidade de questões disponíveis antes de gerar

---

## Referências

- **Componente Simulados:** `frontend-cemos/src/app/components/simulados/`
- **Serviço PDF:** `frontend-cemos/src/app/components/simulados/services/simulados-pdf.service.ts`
- **Tipos:** `frontend-cemos/src/app/components/simulados/simulados.types.ts`
- **Exemplo completo:** `frontend-cemos/src/app/modules/app3-planejamento-militar/app3-simulados/`
- **Documentação de refatoração:** `frontend-cemos/refatoracao_perguntas.md`

---

## Suporte

Em caso de dúvidas ou problemas:

1. Verifique os logs no console do navegador
2. Verifique os logs no terminal do Angular
3. Consulte este documento
4. Consulte o exemplo do App3 Planejamento Militar
5. Verifique se todos os passos foram seguidos corretamente

---

**Última atualização:** Janeiro 2025
**Versão:** 1.0
