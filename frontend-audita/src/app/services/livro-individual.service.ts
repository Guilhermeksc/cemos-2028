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

    // PROTEGER BLOCOS DE CÓDIGO ANTES DE PROCESSAR OUTRAS TRANSFORMAÇÕES
    // Armazena os blocos de código e código inline em arrays temporários
    const codeBlocks: string[] = [];
    const inlineCodes: string[] = [];
    
    // Extrair blocos de código (``` código ```)
    // Usa placeholders únicos que não conflitam com sintaxe markdown
    // Usa um padrão HTML comment-like que não será processado por regexes markdown
    processedContent = processedContent.replace(/```(\w+)?\n([\s\S]+?)```/g, (match, lang, code) => {
      const placeholder = `<!--CODEBLOCK_${codeBlocks.length}-->`;
      codeBlocks.push(`\`\`\`${lang || ''}\n${code}\`\`\``);
      return placeholder;
    });
    
    // Extrair código inline (` código `)
    // Usa placeholders únicos que não conflitam com sintaxe markdown
    processedContent = processedContent.replace(/`([^`\n]+?)`/g, (match, code) => {
      const placeholder = `<!--INLINECODE_${inlineCodes.length}-->`;
      inlineCodes.push(`\`${code}\``);
      return placeholder;
    });

    // Converter tabelas (GFM) antes das demais transformações
    processedContent = this.parseTables(processedContent);
    
    // Processar cores customizadas ANTES de processar negritos padrão
    // Padrão: *v* **texto** -> texto vermelho negrito
    // Padrão: *b* **texto** -> texto azul negrito
    // Padrão: *vbg* **texto** -> texto preto negrito com background vermelho
    // Exige pelo menos um espaço entre *v*/*b*/*vbg* e **
    processedContent = processedContent.replace(/\*v\*\s+\*\*(.+?)\*\*/g, '<strong style="color:rgb(255, 0, 25);">$1</strong>');
    processedContent = processedContent.replace(/\*b\*\s+\*\*(.+?)\*\*/g, '<strong style="color: #0066cc;">$1</strong>');
    processedContent = processedContent.replace(/\*vbg\*\s+\*\*(.+?)\*\*/g, '<strong style="background-color:rgb(235, 200, 203); color: #000000; padding: 0.1rem 0.3rem; border-radius: 3px;">$1</strong>');
    
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

    // Bold (processar depois das cores customizadas para não conflitar)
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

    // Italic (os marcadores *v* e *b* já foram processados acima, então não serão capturados aqui)
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.+?)_/g, '<em>$1</em>');

    // Imagens (processar ANTES de links para evitar conflito)
    // Adiciona estilos inline para garantir redimensionamento correto
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; width: auto; height: auto; display: block; margin: 1rem auto;" />');

    // Links (não captura imagens porque já foram processadas)
    html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Listas não ordenadas
    html = html.replace(/^\- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Listas ordenadas
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

    // RESTAURAR E PROCESSAR BLOCOS DE CÓDIGO ANTES DE PROCESSAR PARÁGRAFOS
    // Isso evita que os placeholders sejam envolvidos em tags <p>
    codeBlocks.forEach((codeBlock, index) => {
      const placeholder = `<!--CODEBLOCK_${index}-->`;
      const match = codeBlock.match(/```(\w+)?\n([\s\S]+?)```/);
      if (match) {
        const lang = match[1] || '';
        const code = match[2];
        
        let finalCode: string;
        
        if (lang.toLowerCase() === 'sql') {
          // Para SQL, aplicar highlighting usando uma abordagem que preserva as tags
          finalCode = this.highlightSqlWithEscaping(code);
        } else {
          // Para outros idiomas, apenas escapar HTML
          finalCode = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        }
        
        // Substituir o placeholder, removendo possíveis tags <p> ao redor
        const placeholderEscaped = this.escapeRegex(placeholder);
        const placeholderRegex = new RegExp(`<p>\\s*${placeholderEscaped}\\s*</p>|${placeholderEscaped}`, 'g');
        const replacement = `<pre><code class="language-${lang}">${finalCode}</code></pre>`;
        html = html.replace(placeholderRegex, replacement);
      }
    });
    
    // Restaurar código inline (` código `)
    inlineCodes.forEach((inlineCode, index) => {
      const placeholder = `<!--INLINECODE_${index}-->`;
      const match = inlineCode.match(/`(.+?)`/);
      if (match) {
        const code = match[1];
        // Escapar HTML no código inline
        const escapedCode = code
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
        // Substituir o placeholder, removendo possíveis tags <p> ao redor
        const placeholderEscaped = this.escapeRegex(placeholder);
        const placeholderRegex = new RegExp(`<p>\\s*${placeholderEscaped}\\s*</p>|${placeholderEscaped}`, 'g');
        html = html.replace(placeholderRegex, `<code>${escapedCode}</code>`);
      }
    });

    // Parágrafos (não envolve elementos de bloco HTML como tabelas, listas, códigos, etc.)
    // Processar DEPOIS de restaurar os blocos de código
    html = html.replace(
      /^(?!<(h[1-6]|ul|ol|li|pre|code|blockquote|table|thead|tbody|tr|th|td)|<\/(ul|ol|li|pre|code|blockquote|table|thead|tbody|tr|th|td)>)(.+)$/gm,
      '<p>$3</p>'
    );

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
    return /^\s*\|?\s*(:?-{3,}:?\s*\|\s*)+:?-{3,}:?\s*\|?\s*$/.test(line);
  }

  private buildTableHtml(rows: string[]): string {
    if (rows.length < 2) return rows.join('\n');

    const headerCells = this.splitRow(rows[0]).map(cell => cell.trim());

    // Alinhamentos (opcional, por ora ignorado)
    // const aligns = this.splitRow(rows[1]).map(seg => this.parseAlign(seg));

    const bodyRows = rows.slice(2).map(r => this.splitRow(r));

    // Usamos estilos inline para bordas estruturais básicas
    // As cores de fundo e texto são controladas pelo CSS do componente
    const tableStyle = 'border-collapse: collapse; width: 100%; border: 2px solid #000000;';
    const cellStyle = 'padding: 8px; border: 1px solid #000000;';
    // Header sem background-color inline para permitir controle via CSS
    const headerCellStyle = `${cellStyle} font-weight: 600; border-bottom: 2px solid #000000;`;

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

    return `<table style="${tableStyle}">\n${thead}\n${tbody}\n</table>`;
  }

  private splitRow(line: string): string[] {
    // Remove pipe inicial/final e divide
    const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '');
    return trimmed.split('|').map(s => s.trim());
  }

  /**
   * Escapa caracteres especiais para uso em regex
   */
  private escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Aplica syntax highlighting básico ao código SQL com escape de HTML adequado
   */
  private highlightSqlWithEscaping(sql: string): string {
    // Lista de palavras-chave SQL (case-insensitive) - ordenadas por tamanho (maior primeiro)
    const keywords = [
      'REFERENCES', 'CONSTRAINT', 'TRANSACTION', 'DATETIME', 'TIMESTAMP', 'VARBINARY',
      'NVARCHAR', 'BIGINT', 'SMALLINT', 'TINYINT', 'DECIMAL', 'NUMERIC', 'EXECUTE',
      'ROLLBACK', 'INTERSECT', 'DISTINCT', 'BETWEEN', 'EXISTS', 'OFFSET',
      'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'TABLE',
      'DATABASE', 'INDEX', 'VIEW', 'TRIGGER', 'PRIMARY', 'FOREIGN', 'UNIQUE', 'DEFAULT',
      'CHECK', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'OUTER', 'GROUP', 'ORDER',
      'HAVING', 'COUNT', 'CASE', 'WHEN', 'THEN', 'ELSE', 'LIKE', 'UNION', 'LIMIT',
      'ASC', 'DESC', 'WITH', 'WHILE', 'BEGIN', 'COMMIT', 'GRANT', 'REVOKE', 'DENY',
      'EXEC', 'DECLARE', 'VARCHAR', 'FLOAT', 'DOUBLE', 'NCHAR', 'NTEXT', 'BINARY',
      'FROM', 'WHERE', 'INTO', 'VALUES', 'SET', 'KEY', 'NOT', 'NULL', 'AND', 'OR',
      'AS', 'ON', 'JOIN', 'BY', 'SUM', 'AVG', 'MAX', 'MIN', 'END', 'IN', 'IS', 'ALL',
      'TOP', 'FOR', 'VAR', 'INT', 'REAL', 'BIT', 'CHAR', 'TEXT', 'DATE', 'TIME',
      'IMAGE', 'XML', 'JSON'
    ];
    
    // Processar linha por linha
    const lines = sql.split('\n');
    const processedLines = lines.map(line => {
      // Usar placeholders temporários para proteger partes do código
      const placeholders: { [key: string]: string } = {};
      let placeholderIndex = 0;
      
      // Proteger strings (entre aspas simples ou duplas)
      let protectedLine = line.replace(/(['"])((?:\\.|(?!\1)[^\\])*?)\1/g, (match) => {
        const key = `__PL${placeholderIndex}__`;
        placeholders[key] = match;
        placeholderIndex++;
        return key;
      });
      
      // Proteger comentários de linha (--)
      protectedLine = protectedLine.replace(/--.*$/gm, (match) => {
        const key = `__PL${placeholderIndex}__`;
        placeholders[key] = match;
        placeholderIndex++;
        return key;
      });
      
      // Proteger comentários de bloco (/* */)
      protectedLine = protectedLine.replace(/\/\*[\s\S]*?\*\//g, (match) => {
        const key = `__PL${placeholderIndex}__`;
        placeholders[key] = match;
        placeholderIndex++;
        return key;
      });
      
      // Destacar palavras-chave SQL (ANTES de escapar)
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${this.escapeRegex(keyword)}\\b`, 'gi');
        protectedLine = protectedLine.replace(regex, '<span class="sql-keyword">$&</span>');
      });
      
      // Destacar números (ANTES de escapar, mas não dentro de placeholders)
      protectedLine = protectedLine.replace(/\b(\d+\.?\d*)\b/g, (match) => {
        if (!match.startsWith('__PL') && !match.endsWith('__')) {
          return `<span class="sql-number">${match}</span>`;
        }
        return match;
      });
      
      // Restaurar placeholders e aplicar highlighting apropriado
      Object.keys(placeholders).forEach(key => {
        const original = placeholders[key];
        let replacement = original;
        
        // Escapar HTML do conteúdo original
        replacement = replacement
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
        
        // Aplicar classe apropriada
        if (original.match(/^(['"])/)) {
          replacement = `<span class="sql-string">${replacement}</span>`;
        } else if (original.startsWith('--') || original.startsWith('/*')) {
          replacement = `<span class="sql-comment">${replacement}</span>`;
        }
        
        protectedLine = protectedLine.replace(key, replacement);
      });
      
      // Escapar HTML restante (mas preservar tags span)
      // Estratégia: escapar o conteúdo dentro das tags span primeiro, depois proteger as tags
      const spanMatches: Array<{placeholder: string, tag: string}> = [];
      let spanIndex = 0;
      
      // Primeiro, escapar o conteúdo dentro das tags span
      protectedLine = protectedLine.replace(/<span class="(sql-\w+)">(.*?)<\/span>/gs, (match, className, content) => {
        // Escapar o conteúdo dentro da tag
        const escapedContent = content
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        return `<span class="${className}">${escapedContent}</span>`;
      });
      
      // Agora proteger todas as tags span antes de escapar o resto
      protectedLine = protectedLine.replace(/<span class="(sql-\w+)">(.*?)<\/span>/gs, (match) => {
        const placeholder = `__SPAN_${spanIndex}__`;
        spanMatches.push({ placeholder, tag: match });
        spanIndex++;
        return placeholder;
      });
      
      // Escapar tudo que restou (exceto placeholders)
      protectedLine = protectedLine
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      
      // Restaurar tags span (elas já têm o conteúdo escapado dentro delas)
      spanMatches.forEach(({ placeholder, tag }) => {
        protectedLine = protectedLine.replace(placeholder, tag);
      });
      
      return protectedLine;
    });
    
    return processedLines.join('\n');
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
