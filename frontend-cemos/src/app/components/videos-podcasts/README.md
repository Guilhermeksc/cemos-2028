# Componente Videos-Podcasts

## 📋 Visão Geral

O componente `videos-podcasts` é um player de mídia completo que exibe vídeos e podcasts organizados por bibliografias. Ele oferece:

- **Tab Groups**: Separação entre vídeos e podcasts
- **Players Nativos**: Players HTML5 de vídeo e áudio
- **Filtros**: Por bibliografia e busca textual
- **Suporte Multi-ambiente**: Caminhos diferentes para desenvolvimento e produção
- **Controle Automático**: Pausa automaticamente outros players ao iniciar reprodução

## 🎯 Como Usar

### 1. Importar no Componente Pai

```typescript
import { VideosPodcasts } from '../../components/videos-podcasts/videos-podcasts';
import { BibliografiaMedia } from '../../interfaces/videos-podcasts.interface';
```

### 2. Adicionar no Template

```html
<app-videos-podcasts [bibliografiasMedia]="bibliografiasMedia"></app-videos-podcasts>
```

### 3. Preparar os Dados

```typescript
export class SeuComponente {
  bibliografiasMedia: BibliografiaMedia[] = [
    {
      bibliografiaId: 1,
      bibliografiaTitulo: 'Geopolítica e RI',
      caminho: 'geopolitica-ri/vinganca-geografia', // Caminho relativo
      capitulos: [
        {
          id: 1,
          titulo: 'Capítulo 1 - Introdução',
          descricao: 'Visão geral dos conceitos fundamentais',
          videoPath: 'cap01-introducao.mp4',  // Nome do arquivo
          audioPath: 'cap01-introducao.mp3',  // Nome do arquivo
          duracao: '45:30',
          ordem: 1
        },
        {
          id: 2,
          titulo: 'Capítulo 2 - Geografia e Poder',
          descricao: 'Relação entre geografia e poder político',
          videoPath: 'cap02-geografia-poder.mp4',
          audioPath: 'cap02-geografia-poder.wav',
          duracao: '52:15',
          ordem: 2
        }
      ]
    },
    {
      bibliografiaId: 2,
      bibliografiaTitulo: 'História Militar',
      caminho: 'historia/militar',
      capitulos: [
        {
          id: 3,
          titulo: 'Estratégia Naval',
          videoPath: 'estrategia-naval.mp4',
          audioPath: 'estrategia-naval.mp3',
          duracao: '38:20',
          ordem: 1
        }
      ]
    }
  ];
}
```

## 📁 Estrutura de Arquivos

### Desenvolvimento
```
C:\Users\guilh\projeto\www\midias\
  └── geopolitica-ri\
      └── vinganca-geografia\
          ├── video\
          │   ├── cap01-introducao.mp4
          │   └── cap02-geografia-poder.mp4
          └── audio\
              ├── cap01-introducao.mp3
              └── cap02-geografia-poder.wav
```

### Produção
```
/var/www/arquivos/
  └── geopolitica-ri/
      └── vinganca-geografia/
          ├── video/
          │   ├── cap01-introducao.mp4
          │   └── cap02-geografia-poder.mp4
          └── audio/
              ├── cap01-introducao.mp3
              └── cap02-geografia-poder.wav
```

## 🎨 Recursos

### Tabs
- **Vídeos**: Grid de cards com players de vídeo
- **Podcasts**: Lista de cards com players de áudio
- Contador de itens em cada tab

### Filtros
- **Por Bibliografia**: Dropdown para selecionar bibliografia específica
- **Busca**: Campo de texto para buscar por título ou descrição
- **Limpar Filtros**: Botão para resetar todos os filtros

### Players
- **Controles Nativos**: Play, pause, volume, progresso
- **AutoPause**: Pausa outros players ao iniciar novo
- **No Download**: Desabilita opção de download
- **Responsivo**: Adapta-se a diferentes tamanhos de tela

## 🔧 Interface de Dados

### BibliografiaMedia
```typescript
interface BibliografiaMedia {
  bibliografiaId: number;        // ID da bibliografia
  bibliografiaTitulo?: string;   // Nome da bibliografia
  caminho: string;               // Caminho variado (ex: 'geopolitica/modulo1')
  capitulos: Capitulo[];         // Lista de capítulos
}
```

### Capitulo
```typescript
interface Capitulo {
  id: number;            // ID único do capítulo
  titulo: string;        // Título do capítulo
  descricao?: string;    // Descrição opcional
  videoPath?: string;    // Nome do arquivo de vídeo (MP4)
  audioPath?: string;    // Nome do arquivo de áudio (MP3/WAV)
  duracao?: string;      // Duração no formato "HH:MM:SS" ou "MM:SS"
  ordem?: number;        // Ordem de exibição
}
```

## 🌍 Configuração de Ambientes

Os caminhos base são configurados nos arquivos de ambiente:

### `environment.ts` (Desenvolvimento)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8088/api',
  mediasBasePath: 'C:\\Users\\guilh\\projeto\\www\\midias'
};
```

### `environment.prod.ts` (Produção)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://cemos2028.com/api',
  mediasBasePath: '/var/www/arquivos'
};
```

## 📊 Service

O `VideosPodcastsService` fornece métodos úteis:

```typescript
// Construir caminho completo
construirCaminhoMidia(caminho: string, tipo: MediaType, nomeArquivo: string): string

// Obter caminhos base
obterCaminhosBiblografia(caminho: string): MediaPaths

// Carregar capítulos processados
carregarCapitulos(bibliografiaMedia: BibliografiaMedia): Observable<Capitulo[]>

// Carregar múltiplas bibliografias
carregarBibliografiasMedia(bibliografias: BibliografiaMedia[]): Observable<BibliografiaMedia[]>

// Filtrar capítulos
filtrarCapitulos(capitulos: Capitulo[], searchTerm: string): Capitulo[]

// Ordenar capítulos
ordenarCapitulos(capitulos: Capitulo[], ordenarPor: 'ordem' | 'titulo'): Capitulo[]

// Obter estatísticas
obterEstatisticas(bibliografias: BibliografiaMedia[]): {
  totalCapitulos: number;
  totalVideos: number;
  totalAudios: number;
  bibliografiasComMedia: number;
}
```

## 💡 Exemplo Completo de Uso

```typescript
import { Component, OnInit } from '@angular/core';
import { VideosPodcasts } from '../../components/videos-podcasts/videos-podcasts';
import { BibliografiaMedia } from '../../interfaces/videos-podcasts.interface';

@Component({
  selector: 'app-geopolitica-videos',
  standalone: true,
  imports: [VideosPodcasts],
  template: `
    <div class="page-container">
      <h1>Vídeos e Podcasts - Geopolítica</h1>
      <app-videos-podcasts [bibliografiasMedia]="bibliografiasMedia"></app-videos-podcasts>
    </div>
  `
})
export class GeopoliticaVideosComponent implements OnInit {
  bibliografiasMedia: BibliografiaMedia[] = [];

  ngOnInit() {
    this.loadBibliografiasMedia();
  }

  private loadBibliografiasMedia() {
    this.bibliografiasMedia = [
      {
        bibliografiaId: 1,
        bibliografiaTitulo: 'A Vingança da Geografia',
        caminho: 'geopolitica-ri/vinganca-geografia',
        capitulos: [
          {
            id: 1,
            titulo: 'Introdução à Geopolítica',
            descricao: 'Conceitos fundamentais e histórico',
            videoPath: 'intro-geopolitica.mp4',
            audioPath: 'intro-geopolitica.mp3',
            duracao: '45:30',
            ordem: 1
          },
          {
            id: 2,
            titulo: 'Geografia e Poder',
            descricao: 'A influência da geografia nas relações de poder',
            videoPath: 'geografia-poder.mp4',
            audioPath: 'geografia-poder.mp3',
            duracao: '52:15',
            ordem: 2
          }
        ]
      }
    ];
  }
}
```

## 🎨 Personalização de Estilos

O componente usa SCSS e pode ser personalizado através de variáveis CSS:

```scss
// Cores dos tabs
$tab-active-color: #3498db;
$tab-hover-color: rgba(52, 152, 219, 0.1);

// Cores dos cards de vídeo
$video-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

// Cores dos cards de áudio
$audio-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```

## 📱 Responsividade

- **Desktop**: Grid de 2-3 colunas para vídeos
- **Tablet**: Grid de 1-2 colunas
- **Mobile**: Coluna única, tabs em stack vertical

## ⚠️ Notas Importantes

1. **Formatos Suportados**:
   - Vídeos: MP4 (recomendado: H.264)
   - Áudios: MP3, WAV, OGG

2. **Caminhos**:
   - Use APENAS o nome do arquivo em `videoPath` e `audioPath`
   - O caminho completo é construído automaticamente pelo service

3. **Performance**:
   - Apenas um player de cada tipo (vídeo/áudio) pode tocar por vez
   - Players pausam automaticamente ao trocar de tab

4. **Segurança**:
   - Opção de download desabilitada por padrão
   - Controles nativos do navegador

## 🔍 Troubleshooting

### Vídeo não carrega
- Verifique se o arquivo existe no caminho correto
- Confirme o formato do vídeo (MP4 com H.264)
- Verifique permissões de leitura do arquivo

### Áudio não toca
- Verifique formato do áudio (MP3/WAV)
- Confirme o caminho do arquivo
- Teste em navegador diferente

### Caminhos incorretos
- Verifique configuração em `environment.ts`
- Confirme o `caminho` em `BibliografiaMedia`
- Use barras corretas para cada OS (\ para Windows, / para Linux)

