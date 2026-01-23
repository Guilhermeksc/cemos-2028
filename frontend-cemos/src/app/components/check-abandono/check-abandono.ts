import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import jsPDF from 'jspdf';

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

  gerarPDF(): void {
    const doc = new jsPDF();
    let yPosition = 10;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    const maxWidth = doc.internal.pageSize.width - (margin * 2);
    const lineHeight = 4;
    const smallSpacing = 1;

    // Função para adicionar nova página se necessário
    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
    };

    // Função para adicionar texto com quebra de linha automática
    const addText = (text: string, fontSize: number, isBold: boolean = false, color: number[] = [0, 0, 0]) => {
      doc.setFontSize(fontSize);
      doc.setTextColor(color[0], color[1], color[2]);
      if (isBold) {
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setFont('helvetica', 'normal');
      }

      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line: string) => {
        checkPageBreak(lineHeight);
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
    };

    // Função para adicionar texto e mnemônico na mesma linha quando possível
    const addItemWithMnemonico = (numero: number, texto: string, mnemonico: string | undefined) => {
      checkPageBreak(lineHeight);
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      
      const textoBase = `${numero}. ${texto}`;
      
      // Tentar colocar mnemônico na mesma linha
      if (mnemonico && mnemonico.trim()) {
        // Verificar se o texto base cabe em uma linha
        const linesBase = doc.splitTextToSize(textoBase, maxWidth);
        
        if (linesBase.length === 1) {
          // Texto cabe em uma linha, tentar adicionar mnemônico na mesma linha
          // Medir largura do texto base com fonte normal 9pt
          doc.setFontSize(9);
          doc.setFont('helvetica', 'normal');
          const textoWidthBase = doc.getTextWidth(textoBase);
          
          const mnemonicoText = ` [${mnemonico}]`;
          // Medir largura do mnemônico com fonte bold 8pt
          doc.setFontSize(8);
          doc.setFont('helvetica', 'bold');
          const mnemonicoWidth = doc.getTextWidth(mnemonicoText);
          
          if (textoWidthBase + mnemonicoWidth <= maxWidth) {
            // Cabe na mesma linha!
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);
            doc.text(textoBase, margin, yPosition);
            
            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(211, 47, 47);
            doc.text(mnemonicoText, margin + textoWidthBase, yPosition);
            yPosition += lineHeight + smallSpacing;
            return;
          }
        }
        
        // Não cabe na mesma linha, adicionar em linhas separadas
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        const lines = doc.splitTextToSize(textoBase, maxWidth);
        lines.forEach((line: string) => {
          checkPageBreak(lineHeight);
          doc.text(line, margin, yPosition);
          yPosition += lineHeight;
        });
        
        // Adicionar mnemônico na linha seguinte
        checkPageBreak(lineHeight);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(211, 47, 47);
        doc.text(`[${mnemonico}]`, margin, yPosition);
        yPosition += lineHeight + smallSpacing;
      } else {
        // Sem mnemônico, apenas texto
        const lines = doc.splitTextToSize(textoBase, maxWidth);
        lines.forEach((line: string) => {
          checkPageBreak(lineHeight);
          doc.text(line, margin, yPosition);
          yPosition += lineHeight;
        });
        yPosition += smallSpacing;
      }
    };

    // Iterar sobre os livros
    this.livros.forEach((livro, livroIndex) => {
      // Título do livro
      if (livroIndex > 0) {
        checkPageBreak(lineHeight * 2);
        yPosition += smallSpacing;
      }
      addText(livro.titulo, 12, true);
      yPosition += smallSpacing;

      // Iterar sobre os capítulos
      livro.capitulos.forEach((capitulo) => {
        // Título do capítulo
        checkPageBreak(lineHeight * 2);
        yPosition += smallSpacing;
        addText(capitulo.titulo, 10, true);
        yPosition += smallSpacing;

        // Iterar sobre os itens
        capitulo.itens.forEach((item) => {
          addItemWithMnemonico(item.numero, item.texto, item.mnemonico);
        });
      });
    });

    // Salvar o PDF
    doc.save('check-abandono.pdf');
  }
}
