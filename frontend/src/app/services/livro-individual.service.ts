import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MarkdownFile, MarkdownHeading } from '../interfaces/livro-individual.interface';

@Injectable({
  providedIn: 'root'
})
export class LivroIndividualService {

  constructor(private http: HttpClient) { }

  /**
   * Carrega um arquivo Markdown específico
   */
  loadMarkdownFile(filePath: string): Observable<string> {
    return this.http.get(filePath, { responseType: 'text' }).pipe(
      catchError(error => {
        console.error(`Erro ao carregar arquivo: ${filePath}`, error);
        return of('');
      })
    );
  }

  /**
   * Carrega múltiplos arquivos Markdown de uma pasta
   * Nota: Em produção, você precisaria de um endpoint no backend que liste os arquivos
   * Por enquanto, vamos usar uma lista estática de arquivos
   */
  loadMarkdownFiles(basePath: string, fileNames: string[]): Observable<MarkdownFile[]> {
    const requests = fileNames.map(fileName => {
      const filePath = `${basePath}/${fileName}`;
      return this.loadMarkdownFile(filePath).pipe(
        map(content => ({
          fileName,
          filePath,
          basePath, // Adiciona basePath para processamento de imagens
          title: this.extractTitle(content),
          content
        }))
      );
    });

    return forkJoin(requests);
  }

  /**
   * Extrai o título do arquivo (primeiro #)
   */
  private extractTitle(content: string): string {
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : 'Sem título';
  }

  /**
   * Parseia o conteúdo Markdown para extrair os headings em estrutura hierárquica
   */
  parseMarkdownHeadings(content: string): MarkdownHeading[] {
    const lines = content.split('\n');
    const headings: MarkdownHeading[] = [];
    const stack: { level: number; heading: MarkdownHeading }[] = [];

    lines.forEach((line, index) => {
      const match = line.match(/^(#{1,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const title = match[2].trim();
        const id = this.generateId(title, index);

        const heading: MarkdownHeading = {
          id,
          level,
          title,
          children: [],
          isExpanded: false
        };

        // Remove itens do stack que são do mesmo nível ou mais profundos
        while (stack.length > 0 && stack[stack.length - 1].level >= level) {
          stack.pop();
        }

        if (stack.length === 0) {
          // É um heading de nível superior
          headings.push(heading);
        } else {
          // É um heading filho
          const parent = stack[stack.length - 1].heading;
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(heading);
        }

        stack.push({ level, heading });
      }
    });

    return headings;
  }

  /**
   * Converte Markdown para HTML básico
   */
  markdownToHtml(content: string, basePath?: string): string {
    let processedContent = content;
    
    // Se temos o basePath, processar caminhos de imagens primeiro
    if (basePath) {
      processedContent = this.processImagePaths(content, basePath);
    }
    
    const lines = processedContent.split('\n');
    let html = '';

    // Primeiro, processar headers com IDs consistentes
    lines.forEach((line, index) => {
      // Headers com IDs para scroll (usa o mesmo índice do parseMarkdownHeadings)
      const h3Match = line.match(/^### (.+)$/);
      if (h3Match) {
        const title = h3Match[1].trim();
        const id = this.generateId(title, index);
        html += `<h3 id="${id}">${title}</h3>\n`;
        return;
      }

      const h2Match = line.match(/^## (.+)$/);
      if (h2Match) {
        const title = h2Match[1].trim();
        const id = this.generateId(title, index);
        html += `<h2 id="${id}">${title}</h2>\n`;
        return;
      }

      const h1Match = line.match(/^# (.+)$/);
      if (h1Match) {
        const title = h1Match[1].trim();
        const id = this.generateId(title, index);
        html += `<h1 id="${id}">${title}</h1>\n`;
        return;
      }

      // Outras linhas
      html += line + '\n';
    });

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.+?)_/g, '<em>$1</em>');

    // Imagens (processar ANTES de links para evitar conflito)
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

    // Links (não captura imagens porque já foram processadas)
    html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Listas não ordenadas
    html = html.replace(/^\- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Listas ordenadas
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

    // Parágrafos
    html = html.replace(/^(?!<[h|u|o|l]|<\/[u|o])(.+)$/gm, '<p>$1</p>');

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre><code class="language-$1">$2</code></pre>');
    html = html.replace(/`(.+?)`/g, '<code>$1</code>');

    return html;
  }

  /**
   * Gera um ID único para um heading
   */
  private generateId(title: string, index: number): string {
    const normalized = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-') // Remove hífens duplicados
      .trim();
    
    return `${normalized}-${index}`;
  }

  /**
   * Processa caminhos de imagens no markdown para torná-los absolutos
   * Baseado na mesma lógica do ContentService
   */
  private processImagePaths(markdown: string, basePath: string): string {
    // Regex para encontrar imagens em markdown: ![alt](src)
    return markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
      // Se já é um caminho absoluto (inicia com http ou /), não processar
      if (src.startsWith('http') || src.startsWith('/')) {
        return match;
      }
      
      // Construir caminho absoluto baseado na estrutura de assets
      // basePath já vem no formato correto: 'assets/content/geopolitica-ri/vinganca-geografia'
      const absolutePath = `/${basePath}/${src}`;
      return `![${alt}](${absolutePath})`;
    });
  }

  /**
   * Obtém lista de arquivos de uma pasta específica
   * Nota: Esta é uma implementação de exemplo. Em produção, você precisaria
   * de um endpoint no backend que liste os arquivos da pasta
   */
  getMarkdownFilesFromFolder(folderPath: string): Observable<string[]> {
    // Exemplo: retorna uma lista estática
    // Em produção, isso deveria vir de um endpoint do backend
    return of([]);
  }
}
