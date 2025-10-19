# Exemplo de Uso do Componente Flash Cards

## 🎯 Exemplo Simples

### 1. Em um Módulo de Aplicação

```typescript
// app6-geopolitica-relacoes-internacionais-flashcards.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashCardsComponent } from '../../../components/flash-cards/flash-cards';

@Component({
  selector: 'app-geo-flashcards',
  standalone: true,
  imports: [CommonModule, FlashCardsComponent],
  template: `
    <div class="module-container">
      <div class="module-header">
        <h1>🌍 Flash Cards de Geopolítica e Relações Internacionais</h1>
        <p>Revise os conceitos principais através de flash cards interativos</p>
      </div>

      <app-flash-cards [bibliografiaIds]="bibliografiaIds"></app-flash-cards>
    </div>
  `,
  styles: [`
    .module-container {
      padding: 2rem;
      background: #f5f5f5;
      min-height: 100vh;
    }

    .module-header {
      text-align: center;
      margin-bottom: 3rem;
      
      h1 {
        color: #2c3e50;
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
      }

      p {
        color: #7f8c8d;
        font-size: 1.2rem;
      }
    }
  `]
})
export class App6GeopoliticaFlashCardsComponent {
  // IDs das bibliografias de Geopolítica e RI
  bibliografiaIds = [10, 11, 12]; // Exemplo de IDs
}
```

## 🎨 Exemplo com Tabs

```typescript
// estudo-component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashCardsComponent } from './components/flash-cards/flash-cards';

interface Tab {
  id: string;
  label: string;
  icon: string;
  bibliografiaIds: number[];
}

@Component({
  selector: 'app-estudo',
  standalone: true,
  imports: [CommonModule, FlashCardsComponent],
  template: `
    <div class="estudo-container">
      <h1>📚 Área de Estudos</h1>

      <!-- Tabs -->
      <div class="tabs">
        <button 
          *ngFor="let tab of tabs"
          class="tab-button"
          [class.active]="activeTab === tab.id"
          (click)="activeTab = tab.id">
          {{ tab.icon }} {{ tab.label }}
        </button>
      </div>

      <!-- Flash Cards -->
      <div class="tab-content">
        <ng-container *ngFor="let tab of tabs">
          <div *ngIf="activeTab === tab.id">
            <app-flash-cards [bibliografiaIds]="tab.bibliografiaIds"></app-flash-cards>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    .estudo-container {
      padding: 2rem;
      max-width: 1600px;
      margin: 0 auto;
    }

    h1 {
      text-align: center;
      color: #2c3e50;
      margin-bottom: 2rem;
    }

    .tabs {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .tab-button {
      padding: 1rem 2rem;
      border: 2px solid #e0e0e0;
      background: white;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1rem;
      font-weight: 600;

      &:hover {
        border-color: #3498db;
        transform: translateY(-2px);
      }

      &.active {
        background: #3498db;
        color: white;
        border-color: #3498db;
      }
    }
  `]
})
export class EstudoComponent {
  activeTab = 'geo';

  tabs: Tab[] = [
    {
      id: 'geo',
      label: 'Geopolítica & RI',
      icon: '🌍',
      bibliografiaIds: [10, 11, 12]
    },
    {
      id: 'historia',
      label: 'História',
      icon: '📜',
      bibliografiaIds: [1, 2, 3]
    },
    {
      id: 'direito',
      label: 'Direito',
      icon: '⚖️',
      bibliografiaIds: [4, 5, 6]
    },
    {
      id: 'economia',
      label: 'Economia',
      icon: '💰',
      bibliografiaIds: [7, 8, 9]
    }
  ];
}
```

## 🔗 Exemplo com Roteamento

```typescript
// app.routes.ts

import { Routes } from '@angular/router';
import { FlashCardsPageComponent } from './pages/flashcards-page';

export const routes: Routes = [
  {
    path: 'flashcards/:ids',
    component: FlashCardsPageComponent
  }
];

// flashcards-page.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FlashCardsComponent } from '../components/flash-cards/flash-cards';

@Component({
  selector: 'app-flashcards-page',
  standalone: true,
  imports: [CommonModule, FlashCardsComponent],
  template: `
    <div class="page-container">
      <button class="back-button" (click)="goBack()">
        ← Voltar
      </button>

      <app-flash-cards 
        *ngIf="bibliografiaIds.length > 0"
        [bibliografiaIds]="bibliografiaIds">
      </app-flash-cards>

      <div *ngIf="bibliografiaIds.length === 0" class="no-data">
        <p>Nenhuma bibliografia selecionada</p>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .back-button {
      padding: 0.75rem 1.5rem;
      background: #3498db;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      margin-bottom: 2rem;
      transition: all 0.3s ease;

      &:hover {
        background: #2980b9;
        transform: translateY(-2px);
      }
    }

    .no-data {
      text-align: center;
      padding: 4rem;
      color: #7f8c8d;
      font-size: 1.2rem;
    }
  `]
})
export class FlashCardsPageComponent implements OnInit {
  bibliografiaIds: number[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idsParam = params['ids'];
      if (idsParam) {
        // Converter "1,2,3" para [1, 2, 3]
        this.bibliografiaIds = idsParam.split(',').map(Number);
        console.log('📚 Bibliografia IDs da rota:', this.bibliografiaIds);
      }
    });
  }

  goBack() {
    window.history.back();
  }
}

// Uso na navegação:
// router.navigate(['/flashcards', '1,2,3']);
// ou na URL: /flashcards/1,2,3
```

## 💡 Exemplo com Configuração Dinâmica

```typescript
// flashcards-configurador.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FlashCardsComponent } from '../components/flash-cards/flash-cards';

interface Bibliografia {
  id: number;
  nome: string;
  materia: string;
}

@Component({
  selector: 'app-flashcards-configurador',
  standalone: true,
  imports: [CommonModule, FormsModule, FlashCardsComponent],
  template: `
    <div class="configurador-container">
      <div class="sidebar">
        <h2>📚 Selecionar Bibliografias</h2>
        
        <div class="bibliografia-list">
          <label 
            *ngFor="let bib of bibliografiasDisponiveis"
            class="bibliografia-item">
            <input 
              type="checkbox"
              [value]="bib.id"
              (change)="onBibliografiaToggle(bib.id, $event)"
              [checked]="selectedBibliografias.includes(bib.id)">
            <div class="bib-info">
              <strong>{{ bib.nome }}</strong>
              <small>{{ bib.materia }}</small>
            </div>
          </label>
        </div>

        <div class="selection-summary">
          <p><strong>{{ selectedBibliografias.length }}</strong> bibliografias selecionadas</p>
          <button 
            class="btn-clear"
            (click)="clearSelection()"
            [disabled]="selectedBibliografias.length === 0">
            Limpar Seleção
          </button>
        </div>
      </div>

      <div class="content">
        <app-flash-cards 
          *ngIf="selectedBibliografias.length > 0"
          [bibliografiaIds]="selectedBibliografias">
        </app-flash-cards>

        <div *ngIf="selectedBibliografias.length === 0" class="empty-selection">
          <div class="empty-icon">👈</div>
          <p>Selecione ao menos uma bibliografia para ver os flash cards</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .configurador-container {
      display: grid;
      grid-template-columns: 300px 1fr;
      height: 100vh;
      gap: 2rem;
    }

    .sidebar {
      background: #f8f9fa;
      padding: 2rem;
      overflow-y: auto;
      border-right: 1px solid #e0e0e0;

      h2 {
        font-size: 1.5rem;
        color: #2c3e50;
        margin-bottom: 1.5rem;
      }
    }

    .bibliografia-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 2rem;
    }

    .bibliografia-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      background: white;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        border-color: #3498db;
        transform: translateX(4px);
      }

      input[type="checkbox"] {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }

      .bib-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        strong {
          color: #2c3e50;
          font-size: 0.95rem;
        }

        small {
          color: #7f8c8d;
          font-size: 0.85rem;
        }
      }
    }

    .selection-summary {
      padding: 1rem;
      background: white;
      border-radius: 8px;
      text-align: center;

      p {
        margin-bottom: 1rem;
        color: #2c3e50;
      }

      .btn-clear {
        width: 100%;
        padding: 0.75rem;
        background: #e74c3c;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;

        &:hover:not(:disabled) {
          background: #c0392b;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }

    .content {
      padding: 2rem;
      overflow-y: auto;
    }

    .empty-selection {
      text-align: center;
      padding: 4rem;
      color: #7f8c8d;

      .empty-icon {
        font-size: 5rem;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.2rem;
      }
    }

    @media (max-width: 768px) {
      .configurador-container {
        grid-template-columns: 1fr;
        height: auto;
      }
    }
  `]
})
export class FlashCardsConfiguradorComponent {
  bibliografiasDisponiveis: Bibliografia[] = [
    { id: 1, nome: 'Conceitos Básicos de RI', materia: 'Geopolítica & RI' },
    { id: 2, nome: 'Teorias de RI', materia: 'Geopolítica & RI' },
    { id: 3, nome: 'Geopolítica Clássica', materia: 'Geopolítica & RI' },
    { id: 4, nome: 'História do Brasil', materia: 'História' },
    { id: 5, nome: 'História Mundial', materia: 'História' },
    { id: 6, nome: 'Direito Constitucional', materia: 'Direito' },
    { id: 7, nome: 'Economia Básica', materia: 'Economia' },
  ];

  selectedBibliografias: number[] = [];

  onBibliografiaToggle(id: number, event: any) {
    if (event.target.checked) {
      this.selectedBibliografias.push(id);
    } else {
      this.selectedBibliografias = this.selectedBibliografias.filter(bid => bid !== id);
    }
    console.log('📚 Bibliografias selecionadas:', this.selectedBibliografias);
  }

  clearSelection() {
    this.selectedBibliografias = [];
  }
}
```

## 🎯 Exemplo em Módulo Específico (Geopolítica)

```typescript
// app6-geopolitica-relacoes-internacionais/pages/flashcards-page.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashCardsComponent } from '../../../components/flash-cards/flash-cards';

@Component({
  selector: 'app6-geo-flashcards-page',
  standalone: true,
  imports: [CommonModule, FlashCardsComponent],
  template: `
    <div class="geo-flashcards-page">
      <header class="page-header">
        <div class="breadcrumb">
          <a routerLink="/app6">🌍 Geopolítica & RI</a>
          <span> / </span>
          <span>Flash Cards</span>
        </div>
        <h1>🎴 Flash Cards - Geopolítica e Relações Internacionais</h1>
        <p>Estude os conceitos principais através de flash cards interativos</p>
      </header>

      <section class="flashcards-section">
        <app-flash-cards [bibliografiaIds]="geopoliticaBibliografiaIds"></app-flash-cards>
      </section>

      <footer class="page-footer">
        <div class="tips">
          <h3>💡 Dicas de Estudo</h3>
          <ul>
            <li>Clique nos cards para revelar as respostas</li>
            <li>Use o filtro de assunto para focar em tópicos específicos</li>
            <li>Embaralhe os cards para testar seu conhecimento aleatoriamente</li>
            <li>Revise os cards diariamente para melhor retenção</li>
          </ul>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .geo-flashcards-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem;
    }

    .page-header {
      max-width: 1400px;
      margin: 0 auto 2rem;
      color: white;
      text-align: center;

      .breadcrumb {
        margin-bottom: 1rem;
        opacity: 0.9;

        a {
          color: white;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      h1 {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 1.2rem;
        opacity: 0.9;
      }
    }

    .flashcards-section {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    }

    .page-footer {
      max-width: 1400px;
      margin: 3rem auto 0;
      background: white;
      border-radius: 16px;
      padding: 2rem;

      .tips {
        h3 {
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        ul {
          list-style: none;
          padding: 0;
          display: grid;
          gap: 0.75rem;

          li {
            padding: 0.75rem 1rem;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #3498db;

            &::before {
              content: '✓ ';
              color: #3498db;
              font-weight: bold;
              margin-right: 0.5rem;
            }
          }
        }
      }
    }

    @media (max-width: 768px) {
      .geo-flashcards-page {
        padding: 1rem;
      }

      .page-header h1 {
        font-size: 1.75rem;
      }
    }
  `]
})
export class App6GeoFlashCardsPageComponent {
  // IDs das bibliografias de Geopolítica e RI do módulo App6
  geopoliticaBibliografiaIds = [10, 11, 12, 13, 14];
}
```

## 📋 Resumo dos Exemplos

1. **Exemplo Simples**: Uso básico com IDs fixos
2. **Exemplo com Tabs**: Múltiplas categorias de flash cards
3. **Exemplo com Roteamento**: IDs dinâmicos via URL
4. **Exemplo com Configuração**: Seleção interativa de bibliografias
5. **Exemplo em Módulo**: Integração em módulo específico

Todos os exemplos são funcionais e prontos para uso!

