# Componente Conceitos

O componente `ConceitosComponent` é um componente reutilizável para exibir conceitos organizados por bibliografia com suporte a tabs.

## Características

- ✅ **Tabs por Bibliografia**: Exibe tabs para cada bibliografia quando há múltiplas
- ✅ **Filtragem**: Filtra conceitos por bibliografia selecionada
- ✅ **Parametrizável**: Aceita IDs específicos de bibliografias
- ✅ **Responsivo**: Interface totalmente responsiva usando Tailwind CSS
- ✅ **Estados de Loading/Error**: Tratamento completo de estados
- ✅ **Contador de Conceitos**: Mostra número de conceitos por bibliografia

## Uso Básico

### 1. Todos os Conceitos (sem filtro)
```html
<app-conceitos></app-conceitos>
```

### 2. Conceitos com Título Personalizado
```html
<app-conceitos
  [title]="'Meus Conceitos Personalizados'"
  [emptyMessage]="'Nenhum conceito encontrado.'">
</app-conceitos>
```

### 3. Conceitos de Bibliografias Específicas
```html
<app-conceitos
  [bibliografiaIds]="[1, 5, 12]"
  [title]="'Conceitos de Geopolítica'"
  [emptyMessage]="'Nenhum conceito de geopolítica encontrado.'">
</app-conceitos>
```

## Parâmetros de Entrada

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `bibliografiaIds` | `number[]` | `[]` | IDs das bibliografias a serem exibidas. Se vazio, mostra todas. |
| `title` | `string` | `'Conceitos'` | Título da página/seção |
| `emptyMessage` | `string` | `'Nenhum conceito encontrado...'` | Mensagem quando não há conceitos |

## Como Descobrir IDs de Bibliografia

### Método 1: Via API
```bash
# Listar todas as bibliografias
curl http://localhost:8000/perguntas/api/bibliografias/

# Resposta exemplo:
{
  "results": [
    {
      "id": 1,
      "titulo": "Geopolítica do Brasil - Golbery do Couto e Silva",
      "materia": "Geopolítica"
    },
    {
      "id": 5,
      "titulo": "Geografia Política - José William Vesentini",
      "materia": "Geopolítica"
    }
  ]
}
```

### Método 2: Via Admin Django
1. Acesse `/admin/` 
2. Vá em `Perguntas > Bibliografias`
3. Anote os IDs das bibliografias desejadas

## Exemplo de Implementação Completa

```typescript
// meu-modulo-conceitos.component.ts
import { Component } from '@angular/core';
import { ConceitosComponent } from '../../components/conceitos/conceitos';

@Component({
  selector: 'app-meu-modulo-conceitos',
  standalone: true,
  imports: [ConceitosComponent],
  template: `
    <div class="container">
      <h1>{{ pageTitle }}</h1>
      <app-conceitos
        [bibliografiaIds]="selectedBibliografiaIds"
        [title]="conceitosTitle"
        [emptyMessage]="emptyMessage">
      </app-conceitos>
    </div>
  `
})
export class MeuModuloConceitosComponent {
  // IDs das bibliografias específicas do módulo
  selectedBibliografiaIds = [1, 5, 12, 18]; // Geopolítica
  
  pageTitle = 'Conceitos de Geopolítica';
  conceitosTitle = ''; // Deixe vazio para não duplicar título
  emptyMessage = 'Nenhum conceito de geopolítica encontrado.';
}
```

## Comportamento dos Tabs

- **1 Bibliografia**: Não exibe tabs, apenas a tabela de conceitos
- **2+ Bibliografias**: Exibe tabs com:
  - Nome da bibliografia
  - Contador de conceitos
  - Informações da bibliografia selecionada
  - Coluna "Bibliografia" oculta na tabela (já está implícita no tab)

## Estrutura Visual

```
┌─────────────────────────────────────────┐
│                 Título                  │
├─────────────────────────────────────────┤
│ [Tab 1] [Tab 2] [Tab 3]                │
├─────────────────────────────────────────┤
│ 📖 Bibliografia Selecionada            │
│    Autor, Matéria, Ano, Descrição      │
├─────────────────────────────────────────┤
│           Tabela de Conceitos           │
│ ┌─────────┬─────────────┬─────────────┐ │
│ │ Título  │ Descrição   │ Prova       │ │
│ └─────────┴─────────────┴─────────────┘ │
└─────────────────────────────────────────┘
```

## Estados do Componente

1. **Loading**: Spinner + mensagem "Carregando conceitos..."
2. **Error**: Ícone de erro + mensagem + botão "Tentar novamente"
3. **Empty**: Mensagem personalizada quando não há conceitos
4. **Success**: Tabs + informações + tabela de conceitos

## Integração com Outros Módulos

Para usar em outros módulos da aplicação, simplesmente importe e configure:

```typescript
// app8-direito-conceitos.component.ts
export class App8DireitoConceitosComponent {
  direitoBibliografiaIds = [23, 24, 25]; // IDs das bibliografias de Direito
  pageTitle = 'Conceitos de Direito';
  emptyMessage = 'Nenhum conceito de direito encontrado.';
}
```

```html
<!-- app8-direito-conceitos.component.html -->
<app-conceitos
  [bibliografiaIds]="direitoBibliografiaIds"
  [title]="''"
  [emptyMessage]="emptyMessage">
</app-conceitos>
```