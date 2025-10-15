import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibliografiaCompletaData, VideoDinamico, PodcastPerguntasDinamico } from '../../interfaces/bibliografia-completa.interface';
import { SubMenuItem } from '../sub-menu/sub-menu';

@Component({
  selector: 'app-bibliografia-completa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bibliografia-completa.html',
  styleUrls: ['./bibliografia-completa.scss']
})
export class BibliografiaCompleta implements OnInit {
  @Input() data?: BibliografiaCompletaData;
  @Input() selectedMenuItem?: SubMenuItem;
  @Input() selectedHtmlContent: string = '';
  @Input() isLoading: boolean = false;

  @ViewChild('videoPlayer', { static: false }) videoPlayer?: ElementRef<HTMLVideoElement>;

  activeTab: 'livro' | 'video' | 'podcastPerguntas' = 'livro';
  
  // Conteúdo dinâmico calculado
  currentVideo?: VideoDinamico;
  currentPodcastPerguntas?: PodcastPerguntasDinamico;

  // Estado do player de vídeo
  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  volume: number = 1;

  // Estado das perguntas expandidas
  expandedPerguntas = new Set<string>();

  ngOnInit(): void {}


  setActiveTab(tab: 'livro' | 'video' | 'podcastPerguntas'): void {
    this.activeTab = tab;
  }

  // Métodos do player de vídeo
  playPause(): void {
    if (!this.videoPlayer?.nativeElement) return;
    
    const video = this.videoPlayer.nativeElement;
    if (this.isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  onTimeUpdate(): void {
    if (this.videoPlayer?.nativeElement) {
      this.currentTime = this.videoPlayer.nativeElement.currentTime;
    }
  }

  onLoadedMetadata(): void {
    if (this.videoPlayer?.nativeElement) {
      this.duration = this.videoPlayer.nativeElement.duration;
    }
  }

  seek(event: Event): void {
    const input = event.target as HTMLInputElement;
    const time = parseFloat(input.value);
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.currentTime = time;
      this.currentTime = time;
    }
  }

  setVolume(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.volume = parseFloat(input.value);
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.volume = this.volume;
    }
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
