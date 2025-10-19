import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VideosPodcastsService } from '../../services/videospodcasts.service';
import { 
  BibliografiaMedia, 
  Capitulo, 
  TabType 
} from '../../interfaces/videos-podcasts.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-videos-podcasts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './videos-podcasts.html',
  styleUrl: './videos-podcasts.scss'
})
export class VideosPodcasts implements OnInit, OnChanges, OnDestroy {
  @Input() bibliografiasMedia: BibliografiaMedia[] = [];
  
  private videosPodcastsService = inject(VideosPodcastsService);
  private destroy$ = new Subject<void>();

  // Estados do componente
  isLoading = false;
  activeTab: TabType = TabType.VIDEOS;
  TabType = TabType; // Exportar enum para template
  
  // Capítulos processados
  capitulosProcessados: Capitulo[] = [];
  capitulosComVideo: Capitulo[] = [];
  capitulosComAudio: Capitulo[] = [];
  
  // Filtros
  searchTerm = '';
  selectedBibliografiaId: number | null = null;
  
  // Player states
  currentPlayingVideo: number | null = null;
  currentPlayingAudio: number | null = null;

  ngOnInit() {
    console.log('🎬 Videos-Podcasts Component inicializado');
    console.log('📚 Bibliografias Media recebidas no ngOnInit:', this.bibliografiasMedia);
    
    if (this.bibliografiasMedia.length > 0) {
      this.loadData();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Detecta mudanças no Input bibliografiasMedia
    if (changes['bibliografiasMedia'] && !changes['bibliografiasMedia'].firstChange) {
      console.log('🔄 Bibliografias Media atualizadas:', this.bibliografiasMedia);
      
      if (this.bibliografiasMedia.length > 0) {
        this.loadData();
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carrega e processa os dados das mídias
   */
  private loadData() {
    this.isLoading = true;
    console.log('📥 Carregando mídias...');

    this.videosPodcastsService.carregarBibliografiasMedia(this.bibliografiasMedia)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (bibliografias) => {
          console.log('✅ Mídias carregadas:', bibliografias);
          
          // Extrair todos os capítulos
          this.capitulosProcessados = [];
          bibliografias.forEach(bib => {
            this.capitulosProcessados.push(...bib.capitulos);
          });

          // Filtrar capítulos com vídeo e áudio
          this.atualizarCapitulosFiltrados();
          
          // Obter estatísticas
          const stats = this.videosPodcastsService.obterEstatisticas(bibliografias);
          console.log('📊 Estatísticas:', stats);
          
          this.isLoading = false;
        },
        error: (error) => {
          console.error('❌ Erro ao carregar mídias:', error);
          this.isLoading = false;
        }
      });
  }

  /**
   * Atualiza os capítulos filtrados por vídeo e áudio
   */
  private atualizarCapitulosFiltrados() {
    let capitulos = [...this.capitulosProcessados];

    // Filtrar por bibliografia se selecionada
    if (this.selectedBibliografiaId) {
      const bibliografia = this.bibliografiasMedia.find(b => b.bibliografiaId === this.selectedBibliografiaId);
      if (bibliografia) {
        capitulos = capitulos.filter(cap => 
          bibliografia.capitulos.some(c => c.id === cap.id)
        );
      }
    }

    // Filtrar por termo de busca
    if (this.searchTerm) {
      capitulos = this.videosPodcastsService.filtrarCapitulos(capitulos, this.searchTerm);
    }

    // Ordenar por ordem
    capitulos = this.videosPodcastsService.ordenarCapitulos(capitulos, 'ordem');

    // Separar por tipo
    this.capitulosComVideo = capitulos.filter(cap => cap.videoPath);
    this.capitulosComAudio = capitulos.filter(cap => cap.audioPath);

    console.log(`🎥 Capítulos com vídeo: ${this.capitulosComVideo.length}`);
    console.log(`🎙️ Capítulos com áudio: ${this.capitulosComAudio.length}`);
  }

  /**
   * Alterna entre tabs
   */
  setActiveTab(tab: TabType) {
    console.log(`📑 Alternando para tab: ${tab}`);
    this.activeTab = tab;
    
    // Pausar todos os players ao trocar de tab
    this.pauseAllPlayers();
  }

  /**
   * Quando a bibliografia é alterada
   */
  onBibliografiaChange() {
    console.log('📚 Bibliografia alterada:', this.selectedBibliografiaId);
    this.atualizarCapitulosFiltrados();
  }

  /**
   * Quando o termo de busca é alterado
   */
  onSearchChange() {
    console.log('🔍 Busca alterada:', this.searchTerm);
    this.atualizarCapitulosFiltrados();
  }

  /**
   * Reseta todos os filtros
   */
  resetFilters() {
    console.log('🔄 Resetando filtros...');
    this.selectedBibliografiaId = null;
    this.searchTerm = '';
    this.atualizarCapitulosFiltrados();
  }

  /**
   * Quando um vídeo começa a tocar
   */
  onVideoPlay(capituloId: number) {
    console.log(`▶️ Vídeo ${capituloId} iniciado`);
    
    // Pausar outros vídeos
    if (this.currentPlayingVideo && this.currentPlayingVideo !== capituloId) {
      this.pauseVideo(this.currentPlayingVideo);
    }
    
    this.currentPlayingVideo = capituloId;
  }

  /**
   * Quando um áudio começa a tocar
   */
  onAudioPlay(capituloId: number) {
    console.log(`▶️ Áudio ${capituloId} iniciado`);
    
    // Pausar outros áudios
    if (this.currentPlayingAudio && this.currentPlayingAudio !== capituloId) {
      this.pauseAudio(this.currentPlayingAudio);
    }
    
    this.currentPlayingAudio = capituloId;
  }

  /**
   * Pausa um vídeo específico
   */
  private pauseVideo(capituloId: number) {
    const videoElement = document.getElementById(`video-${capituloId}`) as HTMLVideoElement;
    if (videoElement) {
      videoElement.pause();
    }
  }

  /**
   * Pausa um áudio específico
   */
  private pauseAudio(capituloId: number) {
    const audioElement = document.getElementById(`audio-${capituloId}`) as HTMLAudioElement;
    if (audioElement) {
      audioElement.pause();
    }
  }

  /**
   * Pausa todos os players
   */
  private pauseAllPlayers() {
    // Pausar todos os vídeos
    this.capitulosComVideo.forEach(cap => {
      this.pauseVideo(cap.id);
    });

    // Pausar todos os áudios
    this.capitulosComAudio.forEach(cap => {
      this.pauseAudio(cap.id);
    });

    this.currentPlayingVideo = null;
    this.currentPlayingAudio = null;
  }

  /**
   * Retorna o nome da bibliografia por ID
   */
  getBibliografiaNome(id: number): string {
    const bib = this.bibliografiasMedia.find(b => b.bibliografiaId === id);
    return bib?.bibliografiaTitulo || 'Desconhecido';
  }

  /**
   * Retorna a bibliografia de um capítulo
   */
  getCapituloBibliografia(capitulo: Capitulo): BibliografiaMedia | undefined {
    return this.bibliografiasMedia.find(bib => 
      bib.capitulos.some(cap => cap.id === capitulo.id)
    );
  }

  /**
   * Retorna estatísticas
   */
  getStats() {
    return this.videosPodcastsService.obterEstatisticas(this.bibliografiasMedia);
  }

  /**
   * TrackBy function para otimizar renderização do ngFor
   */
  trackByCapituloId(index: number, capitulo: Capitulo): number {
    return capitulo.id;
  }
}
