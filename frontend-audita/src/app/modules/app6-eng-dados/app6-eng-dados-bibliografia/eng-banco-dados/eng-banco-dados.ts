import { Component } from '@angular/core';
import { ContentTcu, ContentConfig } from '../../../../components/content-tcu/content-tcu';

@Component({
  selector: 'app-eng-banco-dados',
  imports: [ContentTcu],
  templateUrl: './eng-banco-dados.html',
  styleUrl: './eng-banco-dados.scss'
})
export class EngBancoDados {
  contentConfig: ContentConfig = {
    basePath: 'assets/content/eng-dados/bibliografia/1-banco-dados',
    tabGroups: [
      {
        id: 'Conhecimentos Gerais',
        label: 'Conhecimentos Gerais',
        mainMarkdownPath: 'dados.md',        
        // mainMarkdownPath: 'conhecimentos_gerais.md',
        items: [
          {
            id: 'entidade',
            label: 'Entidade',
            markdownPath: 'entidade.md'
          },          
          {
            id: 'dados',
            label: 'Dados',
            markdownPath: 'dados.md'
          },
          {
            id: 'banco-de-dados',
            label: 'Banco de Dados',
            markdownPath: 'banco-de-dados.md'
          },
          {
            id: 'sgbd',
            label: 'SGBD',
            markdownPath: 'sgbd.md'
          }
        ]
      },      
      {
        id: 'relacionais',
        label: 'Relacionais',
        mainMarkdownPath: 'relacional-base.md',
        items: [
          {
            id: 'teoria-relacional',
            label: 'Teoria Relacional',
            markdownPath: 'teoria-relacional.md'
          },
          {
            id: 'normalizacao',
            label: 'Normalização',
            markdownPath: 'normalizacao.md'
          },
          {
            id: 'modelo-entidade-relacionamento',
            label: 'Modelo Entidade Relacionamento',
            markdownPath: 'modelo-entidade-relacionamento.md'
          },   
          {
            id: 'valores-nulos',
            label: 'Valores Nulos',
            markdownPath: 'valores-nulos.md'
          }
        ]
      },
      {
        id: 'nao-relacionais',
        label: 'Não Relacionais',
        mainMarkdownPath: 'nao_relacionais.md',
        items: [
          {
            id: 'menu2_1',
            label: 'Menu 2.1',
            markdownPath: 'menu2_1.md'
          }
        ]
      },
      {
        id: 'modelagem-dados',
        label: 'Modelagem de Dados',
        mainMarkdownPath: 'modelagem_dados.md',
        items: []
      },
      {
        id: 'sql',
        label: 'SQL',
        mainMarkdownPath: 'sql.md',
        items: []
      }
    ]
  };
}
