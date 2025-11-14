# Componente ConceitosTable

## Descrição
O `ConceitosTableComponent` é um componente reutilizável para exibir conceitos em formato de tabela responsiva. O componente mostra título, descrição, bibliografia e destaca conceitos que caíram em provas com alertas visuais.

## Recursos
- ✅ Tabela responsiva com scroll horizontal em dispositivos pequenos
- ✅ Alertas visuais para conceitos que caíram em provas
- ✅ Suporte a descrições longas com truncamento automático
- ✅ Estado vazio personalizado
- ✅ Contador de itens
- ✅ Estilos modernos com gradientes e animações
- ✅ Suporte a modo escuro (preparado para implementação)
- ✅ Acessibilidade com bom contraste de cores

## Inputs

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `conceitos` | `Conceitos[]` | `[]` | Array de conceitos a serem exibidos |
| `showBibliografia` | `boolean` | `true` | Mostra/oculta a coluna de bibliografia |
| `title` | `string` | `'Conceitos'` | Título do componente |
| `emptyMessage` | `string` | `'Nenhum conceito encontrado'` | Mensagem exibida quando não há conceitos |

## Interface Conceitos
```typescript
export interface Conceitos {
  id: number;
  bibliografia: number;
  bibliografia_titulo?: string;
  titulo: string;
  descricao?: string;
  caiu_em_prova: boolean;
  ano_prova?: number;
}
```

## Exemplo de Uso

### Uso Básico
```html
<app-conceitos-table 
  [conceitos]="meuArrayDeConceitos">
</app-conceitos-table>
```

### Uso Personalizado
```html
<app-conceitos-table 
  [conceitos]="conceitos"
  [title]="'Conceitos Importantes'"
  [showBibliografia]="false"
  [emptyMessage]="'Nenhum conceito importante encontrado.'">
</app-conceitos-table>
```

### No Component TypeScript
```typescript
import { Component } from '@angular/core';
import { ConceitosTableComponent } from './components/conceitos-table/conceitos-table';
import { Conceitos } from './interfaces/informacoes.interface';

@Component({
  selector: 'app-exemplo',
  imports: [ConceitosTableComponent],
  template: `
    <app-conceitos-table 
      [conceitos]="conceitos"
      [title]="'Meus Conceitos'"
      [showBibliografia]="true">
    </app-conceitos-table>
  `
})
export class ExemploComponent {
  conceitos: Conceitos[] = [
    {
      id: 1,
      bibliografia: 1,
      bibliografia_titulo: 'História do Brasil',
      titulo: 'República Velha',
      descricao: 'Período da história brasileira de 1889 a 1930...',
      caiu_em_prova: true,
      ano_prova: 2023
    },
    // ... mais conceitos
  ];
}
```

## Funcionalidades Especiais

### Alertas de Prova
- Conceitos que caíram em prova são destacados com badges coloridos
- Se houver `ano_prova`, o badge fica vermelho com o ano
- Se não houver ano, o badge fica amarelo com "Prova"

### Responsividade
- **Desktop**: Tabela completa com todas as colunas
- **Tablet**: Colunas otimizadas, bibliografia oculta em telas pequenas
- **Mobile**: Layout simplificado, badges de prova movidos para baixo do título

### Truncamento de Texto
- Descrições longas são automaticamente truncadas
- Limite padrão de 200 caracteres para desktop
- Limite de 150 caracteres para mobile

## Estilos Customizáveis

O componente usa variáveis CSS e classes que podem ser sobrescritas:

```scss
// Exemplo de customização
.conceitos-table-container {
  .table-header {
    background: linear-gradient(135deg, #your-color-1, #your-color-2);
  }
  
  .prova-badge {
    background: #your-alert-color;
  }
}
```

## Performance

- Utiliza `trackBy` para otimizar renderização de listas grandes
- Lazy loading de imagens (preparado para implementação futura)
- Animações CSS otimizadas

## Acessibilidade

- Contrastes de cor adequados (WCAG AA)
- Estrutura semântica HTML
- Suporte a navegação por teclado
- Texto alternativo para ícones

## Dependências

- Angular Common Module
- Interface `Conceitos` do projeto
- Não requer bibliotecas externas

## Arquivos do Componente

```
conceitos-table/
├── conceitos-table.ts        # Lógica do componente
├── conceitos-table.html      # Template HTML
└── conceitos-table.scss      # Estilos SCSS
```