# FlashCards Service - Exemplos de Uso

Este documento fornece exemplos práticos de como usar o `FlashCardsService` no seu componente Angular.

## Importação

```typescript
import { FlashCardsService } from '../services/flashcards.service';
import { FlashCards, FlashCardsFilters } from '../interfaces/perguntas.interface';
```

## Injeção no Componente

```typescript
export class MeuComponente implements OnInit {
  constructor(private flashcardsService: FlashCardsService) {}
}
```

## Exemplos de Uso

### 1. Listar Todos os FlashCards

```typescript
ngOnInit() {
  this.flashcardsService.getFlashCards().subscribe(response => {
    console.log('Total de flashcards:', response.count);
    console.log('FlashCards:', response.results);
  });
}
```

### 2. Listar FlashCards com Filtros

```typescript
// Filtrar por bibliografia
const filters: FlashCardsFilters = {
  bibliografia: 1,
  page_size: 50
};

this.flashcardsService.getFlashCards(filters).subscribe(response => {
  console.log('FlashCards da bibliografia:', response.results);
});

// Filtrar por assunto
const filtroAssunto: FlashCardsFilters = {
  assunto: 'Princípios Constitucionais'
};

this.flashcardsService.getFlashCards(filtroAssunto).subscribe(response => {
  console.log('FlashCards do assunto:', response.results);
});

// Buscar por texto
const filtroBusca: FlashCardsFilters = {
  search: 'legalidade'
};

this.flashcardsService.getFlashCards(filtroBusca).subscribe(response => {
  console.log('Resultados da busca:', response.results);
});

// Ordenar resultados
const filtroOrdenado: FlashCardsFilters = {
  ordering: 'assunto'  // ou '-assunto' para ordem decrescente
};

this.flashcardsService.getFlashCards(filtroOrdenado).subscribe(response => {
  console.log('FlashCards ordenados:', response.results);
});
```

### 3. Buscar FlashCard por ID

```typescript
const flashcardId = 1;

this.flashcardsService.getFlashCard(flashcardId).subscribe(flashcard => {
  console.log('FlashCard:', flashcard);
  console.log('Pergunta:', flashcard.pergunta);
  console.log('Resposta:', flashcard.resposta);
  console.log('Assunto:', flashcard.assunto);
});
```

### 4. Buscar FlashCards de uma Bibliografia

```typescript
const bibliografiaId = 1;

this.flashcardsService.getFlashCardsByBibliografia(bibliografiaId).subscribe(flashcards => {
  console.log('FlashCards da bibliografia:', flashcards);
});
```

### 5. Criar Novo FlashCard

```typescript
const novoFlashCard: Partial<FlashCards> = {
  bibliografia: 1,
  pergunta: 'O que é legalidade?',
  resposta: 'É o princípio que estabelece que ninguém será obrigado a fazer ou deixar de fazer algo senão em virtude de lei.',
  assunto: 'Princípios Constitucionais'
};

this.flashcardsService.createFlashCard(novoFlashCard).subscribe(
  flashcard => {
    console.log('FlashCard criado com sucesso:', flashcard);
  },
  error => {
    console.error('Erro ao criar flashcard:', error);
  }
);
```

### 6. Atualizar FlashCard

```typescript
const flashcardId = 1;
const dadosAtualizados: Partial<FlashCards> = {
  resposta: 'Nova resposta atualizada',
  assunto: 'Novo Assunto'
};

// Atualização completa (PUT)
this.flashcardsService.updateFlashCard(flashcardId, dadosAtualizados).subscribe(
  flashcard => {
    console.log('FlashCard atualizado:', flashcard);
  }
);

// Atualização parcial (PATCH)
this.flashcardsService.patchFlashCard(flashcardId, { assunto: 'Assunto Modificado' }).subscribe(
  flashcard => {
    console.log('FlashCard atualizado parcialmente:', flashcard);
  }
);
```

### 7. Deletar FlashCard

```typescript
const flashcardId = 1;

this.flashcardsService.deleteFlashCard(flashcardId).subscribe(
  () => {
    console.log('FlashCard deletado com sucesso');
  },
  error => {
    console.error('Erro ao deletar flashcard:', error);
  }
);
```

### 8. Buscar Todos os FlashCards (sem paginação)

```typescript
this.flashcardsService.getAllFlashCards().subscribe(flashcards => {
  console.log('Todos os flashcards:', flashcards);
});
```

### 9. Obter Estatísticas

```typescript
this.flashcardsService.getEstatisticasFlashCards().subscribe(stats => {
  console.log('Total de flashcards:', stats.total_flashcards);
  console.log('FlashCards por assunto:', stats.flashcards_por_assunto);
  console.log('FlashCards por bibliografia:', stats.flashcards_por_bibliografia);
});
```

### 10. Buscar por Assunto

```typescript
this.flashcardsService.getFlashCardsByAssunto('Princípios Constitucionais').subscribe(
  flashcards => {
    console.log('FlashCards do assunto:', flashcards);
  }
);
```

### 11. Obter Lista de Assuntos Únicos

```typescript
this.flashcardsService.getAssuntos().subscribe(assuntos => {
  console.log('Assuntos disponíveis:', assuntos);
  // Exemplo de uso em um select/dropdown
  this.assuntosDisponiveis = assuntos;
});
```

### 12. Buscar FlashCards com Texto

```typescript
this.flashcardsService.searchFlashCards('princípio').subscribe(flashcards => {
  console.log('Resultados da busca:', flashcards);
});
```

## Monitorando Loading State

```typescript
export class MeuComponente implements OnInit {
  isLoading$ = this.flashcardsService.loadingFlashCards;
  
  constructor(private flashcardsService: FlashCardsService) {}
}
```

No template:

```html
<div *ngIf="isLoading$ | async">
  Carregando flashcards...
</div>

<div *ngIf="!(isLoading$ | async)">
  <!-- Conteúdo dos flashcards -->
</div>
```

## Exemplo Completo de Componente

```typescript
import { Component, OnInit } from '@angular/core';
import { FlashCardsService } from '../services/flashcards.service';
import { FlashCards, FlashCardsFilters } from '../interfaces/perguntas.interface';

@Component({
  selector: 'app-flashcards-list',
  templateUrl: './flashcards-list.component.html'
})
export class FlashcardsListComponent implements OnInit {
  flashcards: FlashCards[] = [];
  assuntos: string[] = [];
  isLoading$ = this.flashcardsService.loadingFlashCards;
  
  currentFilter: FlashCardsFilters = {
    page_size: 20
  };

  constructor(private flashcardsService: FlashCardsService) {}

  ngOnInit() {
    this.loadFlashCards();
    this.loadAssuntos();
  }

  loadFlashCards(filters?: FlashCardsFilters) {
    const finalFilters = { ...this.currentFilter, ...filters };
    
    this.flashcardsService.getFlashCards(finalFilters).subscribe(
      response => {
        this.flashcards = response.results;
      },
      error => {
        console.error('Erro ao carregar flashcards:', error);
      }
    );
  }

  loadAssuntos() {
    this.flashcardsService.getAssuntos().subscribe(
      assuntos => {
        this.assuntos = assuntos;
      }
    );
  }

  filterByAssunto(assunto: string) {
    this.loadFlashCards({ assunto });
  }

  searchFlashCards(searchTerm: string) {
    this.loadFlashCards({ search: searchTerm });
  }

  deleteFlashCard(id: number) {
    if (confirm('Deseja realmente deletar este flashcard?')) {
      this.flashcardsService.deleteFlashCard(id).subscribe(
        () => {
          console.log('FlashCard deletado');
          this.loadFlashCards();
        }
      );
    }
  }
}
```

## Paginação

```typescript
currentPage = 1;
pageSize = 20;
totalItems = 0;

loadPage(page: number) {
  const filters: FlashCardsFilters = {
    page: page,
    page_size: this.pageSize
  };

  this.flashcardsService.getFlashCards(filters).subscribe(response => {
    this.flashcards = response.results;
    this.totalItems = response.count;
    this.currentPage = page;
  });
}

nextPage() {
  this.loadPage(this.currentPage + 1);
}

previousPage() {
  if (this.currentPage > 1) {
    this.loadPage(this.currentPage - 1);
  }
}
```

## Ordenação

```typescript
ordenarPor(campo: string) {
  const filters: FlashCardsFilters = {
    ordering: campo  // ou `-${campo}` para ordem decrescente
  };

  this.flashcardsService.getFlashCards(filters).subscribe(response => {
    this.flashcards = response.results;
  });
}

// Exemplos de uso:
// ordenarPor('assunto')       -> Ordem crescente por assunto
// ordenarPor('-assunto')      -> Ordem decrescente por assunto
// ordenarPor('bibliografia__titulo')  -> Ordem por título da bibliografia
```

## Tratamento de Erros

```typescript
this.flashcardsService.getFlashCard(id).subscribe(
  flashcard => {
    console.log('Sucesso:', flashcard);
  },
  error => {
    if (error.status === 404) {
      console.error('FlashCard não encontrado');
    } else if (error.status === 403) {
      console.error('Sem permissão');
    } else {
      console.error('Erro ao carregar flashcard:', error);
    }
  }
);
```

## Combinando Múltiplos Filtros

```typescript
const filtrosComplexos: FlashCardsFilters = {
  bibliografia: 1,
  assunto: 'Princípios Constitucionais',
  search: 'legalidade',
  ordering: 'assunto',
  page: 1,
  page_size: 50
};

this.flashcardsService.getFlashCards(filtrosComplexos).subscribe(response => {
  console.log('Resultados filtrados:', response.results);
});
```

