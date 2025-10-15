# Botão "Voltar" no Sub-Menu

Foi implementado um botão "Voltar" no componente `SubMenu` que permite navegar de volta à página de bibliografia correspondente.

## Funcionalidade Implementada

### No Componente SubMenu

**Novas propriedades:**
- `@Input() showBackButton: boolean = false` - Controla se o botão deve ser exibido
- `@Input() backButtonLabel: string = 'Voltar à Bibliografia'` - Texto customizável do botão
- `@Output() backButtonClicked = new EventEmitter<void>()` - Evento emitido ao clicar no botão

**Novo método:**
- `onBackButtonClick()` - Emite o evento de clique

### Estilos

O botão foi estilizado para seguir o tema Dracula com:
- Border sutil com cor roxa
- Hover effects com cor cyan
- Ícone de seta para trás
- Transições suaves

## Como Usar

### 1. No Template do Componente Pai

```html
<app-sub-menu
  [title]="menuTitle"
  [subtitle]="menuSubtitle" 
  [items]="subMenuItems"
  [showBackButton]="true"
  [backButtonLabel]="'Voltar à Bibliografia'"
  (itemSelected)="onItemSelected($event)"
  (backButtonClicked)="onBackToBibliografia()">
</app-sub-menu>
```

### 2. No Componente TypeScript

```typescript
import { Router } from '@angular/router';

constructor(private router: Router) {}

onBackToBibliografia() {
  this.router.navigate(['home', 'nome-do-modulo', 'bibliografia']);
}
```

## Exemplo Implementado

O componente `BreveHistoria` já foi atualizado com esta funcionalidade:

```typescript
// breve-historia.ts
onBackToBibliografia() {
  this.router.navigate(['home', 'app4-historia', 'bibliografia']);
}
```

```html
<!-- breve-historia.html -->
<app-sub-menu
  [showBackButton]="true"
  [backButtonLabel]="'Voltar à Bibliografia'"
  (backButtonClicked)="onBackToBibliografia()">
</app-sub-menu>
```

## Próximos Componentes a Implementar

Quando outros componentes similares forem criados (com sub-menus detalhados), eles podem usar esta funcionalidade:

1. **Guerra no Mar** - Quando for expandido com capítulos
2. **História das Guerras** - Quando for expandido com seções
3. **Síntese Histórica** - Quando for expandido com partes
4. **Outros módulos** - Componentes de geopolítica, estratégia, etc.

## Benefícios

- **UX Melhorada**: Navegação intuitiva de volta à bibliografia
- **Consistência**: Padrão uniforme em todos os sub-menus
- **Flexibilidade**: Texto do botão configurável
- **Opcional**: Só aparece quando `showBackButton="true"`
- **Acessibilidade**: Usa ícones do Material Design

## Responsividade

O botão se adapta automaticamente a diferentes tamanhos de tela mantendo a legibilidade e usabilidade.