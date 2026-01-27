import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, of, retry, delay } from 'rxjs';
import { marked } from 'marked';

export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  content?: string;
  htmlContent?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private baseUrl = '/assets/content';

  constructor(private http: HttpClient) {
    const getHeaderBgColor = (color: 'verde' | 'azul' | 'vermelho' | 'amarelo' | null): string => {
      switch (color) {
        case 'verde':
          return '#d1f5d3';
        case 'azul':
          return '#d1e9ff';
        case 'vermelho':
          return '#ffd6d9';
        case 'amarelo':
          return '#fff5b1';
        default:
          return '#f5f5f5';
      }
    };

    const renderer = new marked.Renderer();

    renderer.table = (token: any) => {
      const headers: string[] = Array.isArray(token.header)
        ? token.header
        : Array.isArray(token.headers)
          ? token.headers
          : [];
      const aligns: string[] = Array.isArray(token.align) ? token.align : [];
      const rows: string[][] = Array.isArray(token.rows) ? token.rows : [];

      const thCount = headers.length;

      let headerBgColor: 'verde' | 'azul' | 'vermelho' | 'amarelo' | null = null;
      if (thCount === 1) {
        const match = headers[0].match(/\{\s*bg\s*[:=]\s*(verde|azul|vermelho|amarelo)\s*\}/i);
        if (match) {
          headerBgColor = match[1].toLowerCase() as 'verde' | 'azul' | 'vermelho' | 'amarelo';
          headers[0] = headers[0].replace(match[0], '').trim();
        }
      }

      const renderCell = (cell: string, tag: 'th' | 'td', align?: string, style?: string) => {
        const alignAttr = align ? ` align=\"${align}\"` : '';
        const styleAttr = style ? ` style=\"${style}\"` : '';
        return `<${tag}${alignAttr}${styleAttr}>${cell}</${tag}>`;
      };

      const headerStyle = headerBgColor
        ? `background-color: ${getHeaderBgColor(headerBgColor)};`
        : '';

      const headerHtml = `<tr>${headers.map((cell, i) => renderCell(cell, 'th', aligns[i], headerStyle)).join('')}</tr>`;
      const bodyHtml = rows
        .map(row => `<tr>${row.map((cell, i) => renderCell(cell, 'td', aligns[i])).join('')}</tr>`)
        .join('');

      const classes = ['md-table'];
      if (thCount === 1) {
        classes.push('md-single-column');
        if (headerBgColor) {
          classes.push(`md-single-column--${headerBgColor}`);
        }
      }

      return `<table class=\"${classes.join(' ')}\">\n<thead>${headerHtml}</thead>\n<tbody>${bodyHtml}</tbody>\n</table>`;
    };

    // Configurar marked para renderização segura
    marked.setOptions({
      breaks: true,
      gfm: true,
      renderer
    });
  }

  /**
   * Carrega conteúdo Markdown de um arquivo e converte para HTML
   */
  loadMarkdownContent(path: string): Observable<string> {
    const fullPath = `${this.baseUrl}/${path}`;
    
    const options = { 
      responseType: 'text' as const,
      headers: {
        'Content-Type': 'text/plain',
        'Accept': 'text/plain, text/markdown, */*'
      }
    };
    
    return this.http.get(fullPath, options).pipe(
      retry(2),
      map(markdown => this.convertMarkdownToHtml(markdown, path)),
      catchError(error => {
        console.error(`Erro ao carregar conteúdo: ${path}`, error);
        console.error(`URL completa: ${fullPath}`);
        console.error('Detalhes do erro:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          message: error.message,
          name: error.name
        });
        
        // Se for erro de status 0, pode ser problema de CORS ou conexão
        if (error.status === 0) {
          console.warn('Status 0 detectado - possível problema de CORS ou conexão');
          console.warn('Verifique se o servidor Angular está rodando na porta 4200');
          return of('<p>Problema de conectividade. Verifique se o servidor está rodando.</p>');
        }
        
        return of('<p>Erro ao carregar o conteúdo. Tente novamente mais tarde.</p>');
      })
    );
  }

  /**
   * Converte Markdown para HTML usando marked
   */
  private convertMarkdownToHtml(markdown: string, contentPath?: string): string {
    try {
      let processedMarkdown = markdown;
      
      // Se temos o caminho do conteúdo, processar imagens relativas
      if (contentPath) {
        processedMarkdown = this.processImagePaths(markdown, contentPath);
      }
      
      return marked(processedMarkdown) as string;
    } catch (error) {
      console.error('Erro ao converter Markdown:', error);
      return '<p>Erro ao processar o conteúdo.</p>';
    }
  }

  /**
   * Processa caminhos de imagens no markdown para torná-los absolutos
   */
  private processImagePaths(markdown: string, contentPath: string): string {
    // Extrair o diretório base do arquivo markdown
    const basePath = contentPath.substring(0, contentPath.lastIndexOf('/'));
    
    // Regex para encontrar imagens em markdown: ![alt](src)
    return markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
      // Se já é um caminho absoluto (inicia com http ou /), não processar
      if (src.startsWith('http') || src.startsWith('/')) {
        return match;
      }
      
      // Construir caminho absoluto baseado na estrutura de assets
      const absolutePath = `/assets/content/${basePath}/${src}`;
      return `![${alt}](${absolutePath})`;
    });
  }

  /**
   * Carrega múltiplos conteúdos de uma vez
   */
  loadMultipleContents(paths: string[]): Observable<ContentItem[]> {
    const requests = paths.map(path => {
      const id = this.extractIdFromPath(path);
      return this.loadMarkdownContent(path).pipe(
        map(htmlContent => ({
          id,
          title: this.extractTitleFromPath(path),
          htmlContent
        }))
      );
    });

    // Combina todas as requisições
    return new Observable(observer => {
      Promise.all(requests.map(req => req.toPromise()))
        .then(results => {
          observer.next(results as ContentItem[]);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  /**
   * Extrai ID do caminho do arquivo
   */
  private extractIdFromPath(path: string): string {
    return path.split('/').pop()?.replace('.md', '') || '';
  }

  /**
   * Extrai título do caminho do arquivo
   */
  private extractTitleFromPath(path: string): string {
    const filename = path.split('/').pop()?.replace('.md', '') || '';
    return filename.charAt(0).toUpperCase() + filename.slice(1);
  }

  /**
   * Método específico para carregar conteúdo de História
   */
  loadBreveHistoriaContent(chapterId: string): Observable<string> {
    return this.loadMarkdownContent(`historia/breve-historia/${chapterId}.md`);
  }

  /**
   * Carrega a bibliografia completa de História
   */
  loadHistoriaBibliografia(): Observable<string> {
    return this.loadMarkdownContent('historia/Bibliografia.md');
  }

  /**
   * Carrega a bibliografia completa de Geopolítica e Relações Internacionais
   */
  loadGeopoliticaBibliografia(): Observable<string> {
    return this.loadMarkdownContent('geopolitica-ri/Bibliografia.md');
  }

    /**
   * Método específico para carregar conteúdo de Geopolítica e Relações Internacionais
   */
  loadVingancaGeografiaContent(chapterId: string): Observable<string> {
    return this.loadMarkdownContent(`geopolitica-ri/vinganca-geografia/${chapterId}.md`);
  }

  loadGeopoliticaModernidadeContent(chapterId: string): Observable<string> {
    return this.loadMarkdownContent(`geopolitica-ri/geopolitica-modernidade/${chapterId}.md`);
  }  

  /**
   * Carrega lista de capítulos disponíveis (pode ser expandido para ler um índice)
   */
  getAvailableChapters(): string[] {
    return [
      'cap1',
      'cap3',
      'cap4',
      'cap5',
      'cap6',
      'cap7',
      'cap9',
      'cap10',
      'cap11',
      'cap12',
      'cap13',
      'cap14',
      'cap15',
      'cap16',
      'cap18',
      'cap19',
      'cap23',
      'cap24',
      'cap26',
      'capI',
      'capII',
      'capIII',
      'capVI',
      'capV',
    ];
  }
}