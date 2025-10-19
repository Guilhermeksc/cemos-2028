# Flash Cards Component

Componente genérico e reutilizável para exibir flash cards interativos com sistema de flip 3D.

## 🎯 Funcionalidades

- ✅ Recebe um ou múltiplos IDs de bibliografia
- ✅ Combobox para filtrar por bibliografia
- ✅ Combobox para filtrar por assunto
- ✅ Cards com animação de flip 3D (pergunta/resposta)
- ✅ Carrega até 6 flash cards aleatórios por vez
- ✅ Botão para embaralhar e carregar novos cards
- ✅ Botão para virar todos os cards de uma vez
- ✅ Design responsivo e moderno
- ✅ Loading states
- ✅ Empty states

## 📦 Uso

### Importação

```typescript
import { FlashCards } from './components/flash-cards/flash-cards';
```

### Exemplo Básico

```html
<!-- Com um ID de bibliografia -->
<app-flash-cards [bibliografiaIds]="[1]"></app-flash-cards>

<!-- Com múltiplos IDs de bibliografia -->
<app-flash-cards [bibliografiaIds]="[1, 2, 3]"></app-flash-cards>
```

### Exemplo no Componente

```typescript
import { Component } from '@angular/core';
import { FlashCards } from './components/flash-cards/flash-cards';

@Component({
  selector: 'app-study',
  standalone: true,
  imports: [FlashCards],
  template: `
    <div class="study-container">
      <h1>Área de Estudo</h1>
      <app-flash-cards [bibliografiaIds]="bibliografiasIds"></app-flash-cards>
    </div>
  `
})
export class StudyComponent {
  bibliografiasIds = [1, 2, 5]; // IDs das bibliografias
}
```

## 🎨 Inputs

| Input | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `bibliografiaIds` | `number[]` | Sim | Array com IDs das bibliografias para carregar flash cards |

## 🎮 Interações do Usuário

### 1. Filtros

#### Filtro por Bibliografia
- Dropdown com todas as bibliografias recebidas
- Opção "Todas as Bibliografias" para ver todos os cards
- Ao selecionar, filtra os assuntos disponíveis

#### Filtro por Assunto
- Dropdown com assuntos únicos dos cards disponíveis
- Dinamicamente atualizado baseado na bibliografia selecionada
- Opção "Todos os Assuntos" para ver todos

### 2. Ações

#### 🎲 Embaralhar Cards
- Recarrega 6 cards aleatórios
- Respeita os filtros ativos
- Reseta o estado de flip dos cards

#### 🔄 Virar Todos
- Vira todos os cards exibidos de uma vez
- Alterna entre mostrar perguntas ou respostas
- Útil para revisão rápida

#### ✖️ Limpar Filtros
- Remove todos os filtros ativos
- Recarrega cards aleatórios de todas as bibliografias

### 3. Cards

#### Interação de Flip
- **Clique no card**: Vira o card individual
- **Frente (Roxo)**: Mostra a pergunta
- **Verso (Rosa)**: Mostra a resposta
- **Animação 3D**: Rotação suave de 180°

## 📊 Estrutura do Card

```
┌─────────────────────────────────┐
│ ❓ Pergunta        🏷️ Assunto   │  <- Header
├─────────────────────────────────┤
│                                 │
│     Conteúdo da Pergunta        │  <- Content
│        ou Resposta              │
│                                 │
├─────────────────────────────────┤
│ 📚 Nome da Bibliografia         │  <- Footer
│ 👆 Clique para ver a resposta   │
└─────────────────────────────────┘
```

## 🎨 Cores e Temas

### Frente do Card (Pergunta)
- Gradiente: Roxo (#667eea) para Roxo Escuro (#764ba2)
- Badge: "❓ Pergunta"

### Verso do Card (Resposta)
- Gradiente: Rosa (#f093fb) para Vermelho (#f5576c)
- Badge: "✅ Resposta"

## 📱 Responsividade

### Desktop (> 768px)
- Grid de 3 colunas (auto-fill)
- Cards com 320px mínimo
- Altura de 400px

### Mobile (≤ 768px)
- Grid de 1 coluna
- Cards com 350px de altura
- Filtros em coluna única
- Botões em largura total

## 🔧 Configuração

### Máximo de Cards Exibidos

Por padrão, exibe até 6 cards por vez. Pode ser alterado na propriedade:

```typescript
maxCardsToShow = 6; // Altere para o número desejado
```

## 📈 Estatísticas

O componente exibe estatísticas em tempo real:

- **Total de cards exibidos** / Total de cards disponíveis
- **Número de bibliografias** selecionadas
- **Número de assuntos** disponíveis

## 🔄 Fluxo de Dados

```
┌─────────────────────────────────────┐
│  1. Recebe bibliografiaIds [@Input] │
└────────────────┬────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│  2. Carrega Bibliografias (API)     │
└────────────────┬────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│  3. Carrega Flash Cards (API)       │
│     - Um request por bibliografia   │
│     - Combina todos os resultados   │
└────────────────┬────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│  4. Extrai Assuntos Únicos          │
└────────────────┬────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│  5. Seleciona 6 Cards Aleatórios    │
└────────────────┬────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│  6. Exibe Cards com Estado de Flip  │
└─────────────────────────────────────┘
```

## 🎯 Exemplo de Uso Completo

```typescript
// Em um módulo de estudos
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashCards } from '../../components/flash-cards/flash-cards';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estudo',
  standalone: true,
  imports: [CommonModule, FlashCards],
  template: `
    <div class="page-container">
      <header>
        <h1>📚 Área de Estudos</h1>
        <p>Revise os conceitos com flash cards interativos</p>
      </header>

      <section class="flashcards-section">
        <app-flash-cards 
          [bibliografiaIds]="selectedBibliografias">
        </app-flash-cards>
      </section>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    header {
      text-align: center;
      margin-bottom: 3rem;
    }
  `]
})
export class EstudoComponent implements OnInit {
  selectedBibliografias: number[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Exemplo: Receber IDs da rota
    this.route.params.subscribe(params => {
      const ids = params['ids'];
      if (ids) {
        this.selectedBibliografias = ids.split(',').map(Number);
      }
    });

    // Ou definir manualmente
    this.selectedBibliografias = [1, 2, 3];
  }
}
```

## 🐛 Tratamento de Erros

O componente trata os seguintes cenários:

1. **Nenhum flash card encontrado**: Exibe empty state com sugestão
2. **Sem dados**: Mostra mensagem quando não há cards cadastrados
3. **Filtros sem resultado**: Permite resetar filtros
4. **Loading**: Mostra spinner durante carregamento

## 🔍 Debug

O componente possui logs detalhados no console:

```typescript
console.log('🎴 Flash Cards Component inicializado');
console.log('📚 Bibliografia IDs recebidos:', this.bibliografiaIds);
console.log('✅ Total de flash cards carregados:', count);
console.log('🏷️ Assuntos disponíveis:', assuntos);
console.log('🎲 Carregando flash cards aleatórios...');
```

## 📦 Dependências

- `@angular/common` - CommonModule
- `@angular/forms` - FormsModule
- `FlashCardsService` - Serviço de flash cards
- `PerguntasService` - Serviço de bibliografias
- `rxjs` - Observables e operadores

## 🚀 Performance

- **ForkJoin**: Carrega flash cards de múltiplas bibliografias em paralelo
- **TrackBy**: Usa ID para otimizar renderização da lista
- **TakeUntil**: Cancela observables ao destruir componente
- **Lazy Loading**: Cards são carregados sob demanda

## 🎨 Customização

### Alterar Cores dos Cards

Edite o `flash-cards.scss`:

```scss
.flashcard-front {
  background: linear-gradient(135deg, #SUA_COR 0%, #SUA_COR2 100%);
}

.flashcard-back {
  background: linear-gradient(135deg, #SUA_COR 0%, #SUA_COR2 100%);
}
```

### Alterar Altura dos Cards

```scss
.flashcard-wrapper {
  height: 400px; // Altere aqui
}
```

### Alterar Número de Colunas

```scss
.flashcards-grid {
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  //                                               ↑ Altere o mínimo
}
```

## 📋 Checklist de Implementação

- [x] Componente standalone
- [x] Inputs configuráveis
- [x] Filtros por bibliografia
- [x] Filtros por assunto
- [x] Sistema de flip 3D
- [x] Embaralhar aleatório
- [x] Virar todos os cards
- [x] Loading states
- [x] Empty states
- [x] Design responsivo
- [x] Animações suaves
- [x] Estatísticas em tempo real
- [x] Documentação completa

