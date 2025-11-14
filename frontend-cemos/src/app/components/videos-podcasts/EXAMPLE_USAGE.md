# Exemplo de Uso do Componente Videos-Podcasts

## 📚 Exemplo Real: Módulo de Geopolítica

### Arquivo: `app6-geopolitica-relacoes-internacionais-videos.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosPodcasts } from '../../../components/videos-podcasts/videos-podcasts';
import { BibliografiaMedia } from '../../../interfaces/videos-podcasts.interface';

@Component({
  selector: 'app-geopolitica-videos',
  standalone: true,
  imports: [CommonModule, VideosPodcasts],
  template: `
    <div class="content-wrapper">
      <app-videos-podcasts [bibliografiasMedia]="bibliografiasMedia"></app-videos-podcasts>
    </div>
  `,
  styles: [`
    .content-wrapper {
      padding: 2rem;
    }
  `]
})
export class GeopoliticaVideosComponent implements OnInit {
  bibliografiasMedia: BibliografiaMedia[] = [];

  ngOnInit() {
    this.loadMediaData();
  }

  private loadMediaData() {
    this.bibliografiasMedia = [
      // Bibliografia 1: A Vingança da Geografia
      {
        bibliografiaId: 1,
        bibliografiaTitulo: 'A Vingança da Geografia - Robert Kaplan',
        caminho: 'geopolitica-ri/vinganca-geografia',
        capitulos: [
          {
            id: 1,
            titulo: 'Capítulo 1 - A Geografia como Destino',
            descricao: 'Introdução aos conceitos fundamentais da geopolítica e a influência determinante da geografia nas relações internacionais.',
            videoPath: 'cap01-geografia-destino.mp4',
            audioPath: 'cap01-geografia-destino.mp3',
            duracao: '45:30',
            ordem: 1
          },
          {
            id: 2,
            titulo: 'Capítulo 2 - A Europa e o Poder Marítimo',
            descricao: 'Análise do papel da geografia europeia na formação do poder marítimo e na expansão colonial.',
            videoPath: 'cap02-europa-maritimo.mp4',
            audioPath: 'cap02-europa-maritimo.mp3',
            duracao: '52:15',
            ordem: 2
          },
          {
            id: 3,
            titulo: 'Capítulo 3 - O Heartland de Mackinder',
            descricao: 'Estudo da teoria do Heartland de Halford Mackinder e sua relevância contemporânea.',
            videoPath: 'cap03-heartland.mp4',
            audioPath: 'cap03-heartland.mp3',
            duracao: '48:42',
            ordem: 3
          }
        ]
      },

      // Bibliografia 2: O Choque de Civilizações
      {
        bibliografiaId: 2,
        bibliografiaTitulo: 'O Choque de Civilizações - Samuel Huntington',
        caminho: 'geopolitica-ri/choque-civilizacoes',
        capitulos: [
          {
            id: 4,
            titulo: 'Introdução - A Nova Era das Relações Internacionais',
            descricao: 'Apresentação da tese central sobre o choque de civilizações no mundo pós-Guerra Fria.',
            videoPath: 'intro-nova-era.mp4',
            audioPath: 'intro-nova-era.wav',
            duracao: '38:20',
            ordem: 1
          },
          {
            id: 5,
            titulo: 'Parte 1 - Um Mundo de Civilizações',
            descricao: 'Definição e mapeamento das principais civilizações contemporâneas.',
            videoPath: 'parte1-mundo-civilizacoes.mp4',
            audioPath: 'parte1-mundo-civilizacoes.mp3',
            duracao: '56:12',
            ordem: 2
          }
        ]
      },

      // Bibliografia 3: Destino de Nações
      {
        bibliografiaId: 3,
        bibliografiaTitulo: 'O Destino das Nações - Tim Marshall',
        caminho: 'geopolitica-ri/destino-nacoes',
        capitulos: [
          {
            id: 6,
            titulo: 'Rússia - A Prisão Geográfica',
            descricao: 'Como a geografia moldou a política externa russa ao longo dos séculos.',
            videoPath: 'russia-prisao-geografica.mp4',
            audioPath: 'russia-prisao-geografica.mp3',
            duracao: '43:15',
            ordem: 1
          },
          {
            id: 7,
            titulo: 'China - A Muralha e o Mar',
            descricao: 'A tensão entre o continente e o oceano na estratégia chinesa.',
            videoPath: 'china-muralha-mar.mp4',
            audioPath: 'china-muralha-mar.mp3',
            duracao: '50:28',
            ordem: 2
          },
          {
            id: 8,
            titulo: 'Estados Unidos - O Poder do Isolamento',
            descricao: 'As vantagens geográficas que permitiram a ascensão americana.',
            videoPath: 'eua-poder-isolamento.mp4',
            audioPath: 'eua-poder-isolamento.mp3',
            duracao: '47:35',
            ordem: 3
          }
        ]
      }
    ];
  }
}
```

## 🗂️ Estrutura de Pastas Correspondente

### Ambiente de Desenvolvimento
```
C:\Users\guilh\projeto\www\midias\
├── geopolitica-ri\
│   ├── vinganca-geografia\
│   │   ├── video\
│   │   │   ├── cap01-geografia-destino.mp4
│   │   │   ├── cap02-europa-maritimo.mp4
│   │   │   └── cap03-heartland.mp4
│   │   └── audio\
│   │       ├── cap01-geografia-destino.mp3
│   │       ├── cap02-europa-maritimo.mp3
│   │       └── cap03-heartland.mp3
│   │
│   ├── choque-civilizacoes\
│   │   ├── video\
│   │   │   ├── intro-nova-era.mp4
│   │   │   └── parte1-mundo-civilizacoes.mp4
│   │   └── audio\
│   │       ├── intro-nova-era.wav
│   │       └── parte1-mundo-civilizacoes.mp3
│   │
│   └── destino-nacoes\
│       ├── video\
│       │   ├── russia-prisao-geografica.mp4
│       │   ├── china-muralha-mar.mp4
│       │   └── eua-poder-isolamento.mp4
│       └── audio\
│           ├── russia-prisao-geografica.mp3
│           ├── china-muralha-mar.mp3
│           └── eua-poder-isolamento.mp3
```

### Ambiente de Produção
```
/var/www/arquivos/
└── geopolitica-ri/
    ├── vinganca-geografia/
    │   ├── video/
    │   │   ├── cap01-geografia-destino.mp4
    │   │   ├── cap02-europa-maritimo.mp4
    │   │   └── cap03-heartland.mp4
    │   └── audio/
    │       ├── cap01-geografia-destino.mp3
    │       ├── cap02-europa-maritimo.mp3
    │       └── cap03-heartland.mp3
    │
    ├── choque-civilizacoes/
    │   ├── video/
    │   │   ├── intro-nova-era.mp4
    │   │   └── parte1-mundo-civilizacoes.mp4
    │   └── audio/
    │       ├── intro-nova-era.wav
    │       └── parte1-mundo-civilizacoes.mp3
    │
    └── destino-nacoes/
        ├── video/
        │   ├── russia-prisao-geografica.mp4
        │   ├── china-muralha-mar.mp4
        │   └── eua-poder-isolamento.mp4
        └── audio/
            ├── russia-prisao-geografica.mp3
            ├── china-muralha-mar.mp3
            └── eua-poder-isolamento.mp3
```

## 🔧 Configuração de Rota

### `app6-geopolitica-relacoes-internacionais-routing.ts`

```typescript
import { Routes } from '@angular/router';
import { GeopoliticaVideosComponent } from './app6-geopolitica-relacoes-internacionais-videos';

export const geopoliticaRoutes: Routes = [
  // ... outras rotas
  {
    path: 'videos',
    component: GeopoliticaVideosComponent,
    data: { title: 'Vídeos e Podcasts - Geopolítica' }
  }
];
```

## 🎯 Uso no Menu

### `sub-menu.ts`

```typescript
export class SubMenuComponent {
  menuItems = [
    { label: 'Bibliografia', route: 'bibliografia' },
    { label: 'Conceitos', route: 'conceitos' },
    { label: 'Flash Cards', route: 'flash-cards' },
    { label: 'Vídeos & Podcasts', route: 'videos' }, // Nova opção
    { label: 'Perguntas', route: 'perguntas' }
  ];
}
```

## 📊 Exemplo Simples (Uma Bibliografia)

```typescript
export class SimpleVideosComponent implements OnInit {
  bibliografiasMedia: BibliografiaMedia[] = [];

  ngOnInit() {
    this.bibliografiasMedia = [
      {
        bibliografiaId: 1,
        bibliografiaTitulo: 'História Militar do Brasil',
        caminho: 'historia/militar-brasil',
        capitulos: [
          {
            id: 1,
            titulo: 'Guerra do Paraguai',
            videoPath: 'guerra-paraguai.mp4',
            audioPath: 'guerra-paraguai.mp3',
            duracao: '35:20',
            ordem: 1
          },
          {
            id: 2,
            titulo: 'FEB na Segunda Guerra',
            videoPath: 'feb-segunda-guerra.mp4',
            audioPath: 'feb-segunda-guerra.mp3',
            duracao: '42:15',
            ordem: 2
          }
        ]
      }
    ];
  }
}
```

## 🎬 Exemplo: Apenas Vídeos

```typescript
// Capítulos que só têm vídeo (sem podcast)
capitulos: [
  {
    id: 1,
    titulo: 'Aula 01 - Introdução',
    videoPath: 'aula01.mp4',
    // audioPath não definido
    duracao: '30:00',
    ordem: 1
  }
]
```

## 🎙️ Exemplo: Apenas Podcasts

```typescript
// Capítulos que só têm podcast (sem vídeo)
capitulos: [
  {
    id: 1,
    titulo: 'Podcast 01 - Entrevista',
    // videoPath não definido
    audioPath: 'podcast01.mp3',
    duracao: '45:00',
    ordem: 1
  }
]
```

## 🔄 Carregando de um Backend

```typescript
export class DynamicVideosComponent implements OnInit {
  bibliografiasMedia: BibliografiaMedia[] = [];

  constructor(private mediaService: MediaService) {}

  ngOnInit() {
    this.loadFromBackend();
  }

  private loadFromBackend() {
    this.mediaService.getBibliografiasMedia().subscribe({
      next: (data) => {
        this.bibliografiasMedia = data.map(bib => ({
          bibliografiaId: bib.id,
          bibliografiaTitulo: bib.titulo,
          caminho: bib.caminho_midias,
          capitulos: bib.capitulos.map(cap => ({
            id: cap.id,
            titulo: cap.titulo,
            descricao: cap.descricao,
            videoPath: cap.arquivo_video,
            audioPath: cap.arquivo_audio,
            duracao: cap.duracao,
            ordem: cap.ordem
          }))
        }));
      },
      error: (error) => {
        console.error('Erro ao carregar mídias:', error);
      }
    });
  }
}
```

## 🎨 Preview de Como Ficará

```
┌─────────────────────────────────────────────┐
│        🎬 Vídeos & Podcasts                 │
│     3 vídeos  3 podcasts  3 bibliografias  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ 📖 Bibliografia: [Todas ▼]                  │
│ 🔍 Buscar: [_____________________]          │
└─────────────────────────────────────────────┘

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🎥 Vídeos (3)  │  🎙️ Podcasts (3)        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┌──────────────────────┐ ┌──────────────────────┐
│ 1. Cap 1 - Intro     │ │ 2. Cap 2 - Europa    │
│ ⏱️ 45:30             │ │ ⏱️ 52:15             │
│ ┌──────────────────┐ │ │ ┌──────────────────┐ │
│ │                  │ │ │ │                  │ │
│ │   [VIDEO PLAYER] │ │ │ │   [VIDEO PLAYER] │ │
│ │                  │ │ │ │                  │ │
│ └──────────────────┘ │ │ └──────────────────┘ │
│ Conceitos...         │ │ Análise do papel...  │
│ 📚 A Vingança...     │ │ 📚 A Vingança...     │
└──────────────────────┘ └──────────────────────┘
```

