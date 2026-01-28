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
      // Regex consistente com markdownToHtml - captura #, ## ou ### seguido de espaço(s) e título
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

    // Converter tabelas (GFM) antes das demais transformações
    processedContent = this.parseTables(processedContent);
    
    const lines = processedContent.split('\n');
    let html = '';

    // Primeiro, processar headers com IDs consistentes
    // IMPORTANTE: Processa na mesma ordem e com os mesmos índices que parseMarkdownHeadings
    lines.forEach((line, index) => {
      // Headers com IDs para scroll (usa o mesmo índice do parseMarkdownHeadings)
      // Regex mais flexível para capturar headings com espaços opcionais após #
      const h4Match = line.match(/^####\s+(.+)$/);
      if (h4Match) {
        const title = h4Match[1].trim();
        const id = this.generateId(title, index);
        html += `<h4 id="${id}">${title}</h4>\n`;
        return;
      }

      const h3Match = line.match(/^###\s+(.+)$/);
      if (h3Match) {
        const title = h3Match[1].trim();
        const id = this.generateId(title, index);
        html += `<h3 id="${id}">${title}</h3>\n`;
        return;
      }

      const h2Match = line.match(/^##\s+(.+)$/);
      if (h2Match) {
        const title = h2Match[1].trim();
        const id = this.generateId(title, index);
        html += `<h2 id="${id}">${title}</h2>\n`;
        return;
      }

      const h1Match = line.match(/^#\s+(.+)$/);
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
    // Suporta parâmetros opcionais: ![alt?parametros](imagem.png)
    // Parâmetros: width=50%, height=100mm, scale=0.8, skip, small, medium, large
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, altText, src) => {
      // Extrai parâmetros do alt text (formato: alt?parametros)
      let alt = altText;
      let params = '';
      
      if (altText.includes('?')) {
        const parts = altText.split('?');
        alt = parts[0];
        params = parts.slice(1).join('?'); // Permite múltiplos ? se necessário
      }
      
      // Cria o atributo data-pdf-params se houver parâmetros
      const dataAttr = params ? ` data-pdf-params="${params}"` : '';
      return `<img src="${src}" alt="${alt}"${dataAttr} />`;
    });

    // Links (não captura imagens porque já foram processadas)
    html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Listas não ordenadas
    html = html.replace(/^\- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Listas ordenadas
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

    // Parágrafos (não envolve elementos de bloco HTML como tabelas, listas, códigos, etc.)
    html = html.replace(
      /^(?!<(h[1-6]|ul|ol|li|pre|code|blockquote|table|thead|tbody|tr|th|td)|<\/(ul|ol|li|pre|code|blockquote|table|thead|tbody|tr|th|td)>)(.+)$/gm,
      '<p>$3</p>'
    );

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre><code class="language-$1">$2</code></pre>');
    html = html.replace(/`(.+?)`/g, '<code>$1</code>');

    return html;
  }

  /**
   * Converte blocos de tabelas em Markdown (GFM) para HTML
   * Suporta sintaxe com pipes e linha separadora com hífens/alinhamento.
   */
  private parseTables(markdown: string): string {
    const lines = markdown.split('\n');
    const result: string[] = [];

    let i = 0;
    while (i < lines.length) {
      const headerLine = lines[i];

      // Verifica se a linha parece um cabeçalho de tabela (contém pelo menos um pipe)
      if (this.isTableRow(headerLine)) {
        const separatorLine = lines[i + 1] ?? '';
        if (this.isSeparatorRow(separatorLine)) {
          // Coleta linhas da tabela
          const tableRows: string[] = [];
          tableRows.push(headerLine);
          tableRows.push(separatorLine);

          let j = i + 2;
          while (j < lines.length && this.isTableRow(lines[j])) {
            tableRows.push(lines[j]);
            j++;
          }

          // Constrói HTML da tabela
          const tableHtml = this.buildTableHtml(tableRows);
          result.push(tableHtml);
          i = j; // avança além da tabela
          continue;
        }
      }

      // Linha normal
      result.push(headerLine);
      i++;
    }

    return result.join('\n');
  }

  private isTableRow(line: string): boolean {
    if (!line) return false;
    // Deve conter ao menos um pipe e não ser apenas pipes/whitespace
    const hasPipe = line.includes('|');
    if (!hasPipe) return false;
    // Evita considerar cabeçalhos markdown (### | etc.), exige algum texto entre pipes
    const content = line.replace(/^\s*\|?|\|?\s*$/g, '').trim();
    return content.length > 0 && content.split('|').some(cell => cell.trim().length > 0);
  }

  private isSeparatorRow(line: string): boolean {
    if (!line) return false;
    // GFM: linha composta por |, :, -, e espaços. Ex: | --- | :---: | ---: |
    // Suporta também tabelas de uma coluna: | --- |
    return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/.test(line);
  }

  private buildTableHtml(rows: string[]): string {
    if (rows.length < 2) return rows.join('\n');

    const headerCells = this.splitRow(rows[0]).map(cell => cell.trim());

    const allRows = rows.map(row => this.splitRow(row));
    const isSingleColumn = allRows.every(row => row.length === 1);
    let headerBgColor: 'verde' | 'azul' | 'vermelho' | 'amarelo' | null = null;

    if (isSingleColumn && headerCells.length === 1) {
      const extracted = this.extractSingleColumnHeaderColor(headerCells[0]);
      headerCells[0] = extracted.text;
      headerBgColor = extracted.color;
    }

    // Alinhamentos (opcional, por ora ignorado)
    // const aligns = this.splitRow(rows[1]).map(seg => this.parseAlign(seg));

    const bodyRows = rows.slice(2).map(r => this.splitRow(r));

    // Usamos estilos inline para bordas estruturais básicas
    // As cores de fundo e texto são controladas pelo CSS do componente
    const tableStyle = 'border-collapse: collapse; width: 100%; border: 2px solid #000000;';
    const cellStyle = 'padding: 8px; border: 1px solid #000000;';
    const headerBg = this.getHeaderBgColor(headerBgColor);
    const headerCellStyle = `${cellStyle} font-weight: 600; border-bottom: 2px solid #000000;${headerBg ? ` background-color: ${headerBg};` : ''}`;

    const tableClasses = ['md-table'];
    if (isSingleColumn) {
      tableClasses.push('md-single-column');
      if (headerBgColor) {
        tableClasses.push(`md-single-column--${headerBgColor}`);
      }
    }

    const thead = `<thead><tr>${headerCells.map(h => `<th style="${headerCellStyle}">${h}</th>`).join('')}</tr></thead>`;

    // Construir tbody sem cores de fundo inline para permitir controle via CSS
    const tbodyRows = bodyRows
      .map((cols) => {
        const trOpen = `<tr>`;
        const tds = cols.map(c => `<td style="${cellStyle}">${c.trim()}</td>`).join('');
        return `${trOpen}${tds}</tr>`;
      })
      .join('');

    const tbody = `<tbody>${tbodyRows}</tbody>`;

    return `<table style="${tableStyle}" class="${tableClasses.join(' ')}">\n${thead}\n${tbody}\n</table>`;
  }

  private extractSingleColumnHeaderColor(text: string): { text: string; color: 'verde' | 'azul' | 'vermelho' | 'amarelo' | null } {
    const match = text.match(/\{\s*bg\s*[:=]\s*(verde|azul|vermelho|amarelo)\s*\}/i);
    if (!match) {
      return { text: text.trim(), color: null };
    }

    const cleanedText = text.replace(match[0], '').trim();
    const color = match[1].toLowerCase() as 'verde' | 'azul' | 'vermelho' | 'amarelo';
    return { text: cleanedText, color };
  }

  private getHeaderBgColor(color: 'verde' | 'azul' | 'vermelho' | 'amarelo' | null): string | null {
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
        return null;
    }
  }

  private splitRow(line: string): string[] {
    // Remove pipe inicial/final e divide
    const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '');
    return trimmed.split('|').map(s => s.trim());
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