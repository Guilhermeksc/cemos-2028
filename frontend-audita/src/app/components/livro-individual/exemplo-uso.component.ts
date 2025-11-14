import { Component } from '@angular/core';
import { LivroIndividual } from './livro-individual';

/**
 * Exemplo de uso do componente LivroIndividual
 * 
 * Este componente demonstra como usar o LivroIndividual
 * para exibir arquivos Markdown de uma pasta específica
 */
@Component({
  selector: 'app-exemplo-livro',
  template: `
    <div class="exemplo-container">
      <app-livro-individual
        [contentPath]="contentPath"
        [fileNames]="fileNames">
      </app-livro-individual>
    </div>
  `,
  styles: [`
    .exemplo-container {
      width: 100%;
      height: 100vh;
    }
  `],
  imports: [LivroIndividual]
})
export class ExemploLivroComponent {
  // Caminho base onde estão os arquivos Markdown
  contentPath: string = 'assets/content';

  // Lista de arquivos a serem carregados
  // Você pode substituir isso por uma chamada a um serviço
  fileNames: string[] = [
    'exemplo-livro.md'
  ];

  // Exemplo com múltiplos arquivos da pasta geopolitica-ri:
  // contentPath: string = 'assets/content/geopolitica-ri';
  // fileNames: string[] = [
  //   'introducao.md',
  //   'teorias.md',
  //   'organizacoes.md'
  // ];
}
