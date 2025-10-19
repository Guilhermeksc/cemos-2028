import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosPodcasts } from '../../../components/videos-podcasts/videos-podcasts';
import { BibliografiaMedia } from '../../../interfaces/videos-podcasts.interface';
import { MediaConfigService } from '../../../services/media-config.service';

@Component({
  selector: 'app-app6-geopolitica-relacoes-internacionais-media',
  standalone: true,
  imports: [CommonModule, VideosPodcasts],
  templateUrl: './app6-geopolitica-relacoes-internacionais-media.html',
  styleUrl: './app6-geopolitica-relacoes-internacionais-media.scss'
})
export class App6GeopoliticaRelacoesInternacionaisMedia implements OnInit {
  private mediaConfigService = inject(MediaConfigService);
  
  bibliografiasMedia: BibliografiaMedia[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit() {
    console.log('🎬 Geopolítica e RI - Media Component inicializado');
    this.loadBibliografiasMedia();
  }

  private loadBibliografiasMedia() {
    this.isLoading = true;
    
    // Carrega configuração do arquivo JSON
    this.mediaConfigService.carregarConfigMedia('geopolitica').subscribe({
      next: (bibliografias) => {
        this.bibliografiasMedia = bibliografias;
        this.isLoading = false;
        
        console.log('📚 Bibliografias Media carregadas do arquivo:', bibliografias.length);
        console.log('🎥 Total de capítulos:', 
          bibliografias.reduce((sum, bib) => sum + bib.capitulos.length, 0)
        );
        
        // Log dos arquivos que serão carregados
        bibliografias.forEach(bib => {
          console.log(`\n📖 ${bib.bibliografiaTitulo}`);
          console.log(`   Caminho: ${bib.caminho}`);
          bib.capitulos.forEach(cap => {
            console.log(`   - ${cap.titulo}`);
            if (cap.videoPath) console.log(`     🎥 Vídeo: ${cap.videoPath}`);
            if (cap.audioPath) console.log(`     🎙️ Áudio: ${cap.audioPath}`);
          });
        });
      },
      error: (error) => {
        console.error('❌ Erro ao carregar configuração de mídia:', error);
        this.errorMessage = 'Erro ao carregar configuração de mídias. Verifique o arquivo geopolitica-media.json';
        this.isLoading = false;
        
        // Fallback para dados de exemplo (apenas bibliografia 1)
        this.bibliografiasMedia = [
          // Fallback: Bibliografia 1 apenas com os arquivos especificados
          {
            bibliografiaId: 1,
            bibliografiaTitulo: 'A Vingança da Geografia',
            caminho: 'geopolitica\\vinganca-geografia',
            capitulos: [
              {
                id: 1,
                titulo: 'Capítulo X',
                videoPath: 'capX.mp4',
                audioPath: 'podcast_capX.mp3',
                ordem: 1
              },
              {
                id: 2,
                titulo: 'Capítulo XI',
                videoPath: 'capXI.mp4',
                audioPath: 'podcast_capXI.mp3',
                ordem: 2
              },
              {
                id: 3,
                titulo: 'Capítulo XII',
                videoPath: 'capXII.mp4',
                audioPath: 'podcast_capXII.mp3',
                ordem: 3
              }
            ]
          }
        ];
      }
    });
  }
}
