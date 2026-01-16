import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, of } from 'rxjs';

interface CheckAbandonoItem {
  numero: number;
  texto: string;
  complemento: string;
  mnemonico?: string;
}

interface CheckAbandonoCapitulo {
  titulo: string;
  itens: CheckAbandonoItem[];
}

interface CheckAbandonoLivro {
  titulo: string;
  capitulos: CheckAbandonoCapitulo[];
}

interface CheckAbandonoData {
  livros: CheckAbandonoLivro[];
}

@Component({
  selector: 'app-check-abandono',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './check-abandono.html',
  styleUrl: './check-abandono.scss'
})
export class CheckAbandono implements OnInit {
  @Input() jsonPath: string = 'estrategia/check-abandono.json';
  @Input() basePath: string = '/assets/content';

  livros: CheckAbandonoLivro[] = [];
  loading = false;
  error?: string;
  openItemId: string | null = null;
  menuOpen = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = undefined;
    
    const fullPath = this.jsonPath.startsWith('/')
      ? this.jsonPath
      : `${this.basePath}/${this.jsonPath}`.replace(/\/+/g, '/');

    this.http.get<CheckAbandonoData>(fullPath)
      .pipe(
        catchError((err) => {
          this.error = `Erro ao carregar arquivo: ${fullPath}`;
          this.loading = false;
          return of(null);
        })
      )
      .subscribe((data) => {
        if (data && data.livros) {
          this.livros = data.livros;
        } else {
          this.error = 'Formato de dados inválido';
        }
        this.loading = false;
      });
  }

  getItemId(livroIndex: number, capituloIndex: number, itemIndex: number): string {
    return `livro-${livroIndex}-cap-${capituloIndex}-item-${itemIndex}`;
  }

  toggleItem(livroIndex: number, capituloIndex: number, itemIndex: number): void {
    const itemId = this.getItemId(livroIndex, capituloIndex, itemIndex);
    
    if (this.openItemId === itemId) {
      this.openItemId = null;
    } else {
      this.openItemId = itemId;
    }
  }

  isItemOpen(livroIndex: number, capituloIndex: number, itemIndex: number): boolean {
    return this.openItemId === this.getItemId(livroIndex, capituloIndex, itemIndex);
  }

  getCapituloId(livroIndex: number, capituloIndex: number): string {
    return `livro-${livroIndex}-capitulo-${capituloIndex}`;
  }

  scrollToCapitulo(livroIndex: number, capituloIndex: number): void {
    const elementId = this.getCapituloId(livroIndex, capituloIndex);
    
    // Função auxiliar para tentar fazer scroll com retry
    const attemptScroll = (retries: number = 0) => {
      const element = document.getElementById(elementId);
      
      if (element) {
        // Usar scrollIntoView que é mais confiável
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
        
        // Fechar menu em mobile após clicar
        if (window.innerWidth <= 768) {
          setTimeout(() => {
            this.menuOpen = false;
          }, 300);
        }
        return true;
      } else if (retries < 5) {
        // Tentar novamente após um pequeno delay
        setTimeout(() => attemptScroll(retries + 1), 100);
        return false;
      } else {
        console.warn(`Elemento não encontrado após ${retries + 1} tentativas: ${elementId}`);
        return false;
      }
    };
    
    // Iniciar tentativa de scroll
    requestAnimationFrame(() => {
      setTimeout(() => attemptScroll(), 50);
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
