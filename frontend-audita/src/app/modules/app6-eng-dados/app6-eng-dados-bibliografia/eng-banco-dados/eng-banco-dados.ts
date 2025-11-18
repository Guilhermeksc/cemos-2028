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
            id: 'tuplas',
            label: 'Tuplas',
            markdownPath: 'tuplas.md'
          },            
          {
            id: 'entidade',
            label: 'Entidade',
            markdownPath: 'entidade.md'
          },   
          {
            id: 'atributos-registros',
            label: 'Atributos e Registros',
            markdownPath: 'atributos-registros.md'
          },             
          {
            id: 'dominio  ',
            label: 'Domínio',
            markdownPath: 'dominio.md'
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
            },
            {
              id: 'dependencia-funcional',
              label: 'Dependência Funcional',
              markdownPath: 'dependencia-funcional.md'
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
            id: 'algebra-relacional',
            label: 'Álgebra Relacional',
            markdownPath: 'algebra-relacional.md'
          },
          {
            id: 'view',
            label: 'View, Índices e Chaves',
            markdownPath: 'view.md'
          },      
          {
            id: 'relacionamento-tabelas',
            label: 'Relacionamento entre Tabelas',
            markdownPath: 'relacionamento-tabelas.md'
          }, 
          {
            id: 'regras-codd',
            label: 'Regras de Codd',
            markdownPath: 'regras-codd.md'
          },                                       
          {
            id: 'normalizacao',
            label: 'Normalização',
            markdownPath: 'normalizacao.md'
          },
          {
            id: 'axiomas-armstrong',
            label: 'Axiomas de Armstrong',
            markdownPath: 'axiomas-armstrong.md'
          },
          {
            id: 'questoes-relacionais',
            label: 'Questões',
            markdownPath: 'questoes-relacionais.md'
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
        id: 'oracle-db',
        label: 'Oracle DB',
        mainMarkdownPath: 'oracle-db/oracle.md', 
        items: [
          {
            id: 'oracle-db-tipos-dados',
            label: 'Tipos de Dados',
            markdownPath: 'oracle/oracle-db-tipos-dados.md'
          },
          {
            id: 'oracle-db-tipos-dados',
            label: 'Tipos de Dados',
            markdownPath: 'oracle/oracle-db-tipos-dados.md'
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
        mainMarkdownPath: 'sql/sql.md',
        items: [
          {
            id: 'questoes-sql',
            label: 'Questões SQL',
            markdownPath: 'sql/questoes-sql.md'
          },          
          {
            id: 'sql-tipos-dados',
            label: 'Tipos de Dados',
            markdownPath: 'sql/sql-tipos-dados.md'
          },
          {
            id: 'sql-tcl',
            label: 'DTL/TCL e DCL',
            markdownPath: 'sql/sql-tcl.md'
          },
          {
            id: 'sql-ddl',
            label: 'DDL (Data Definition Language)',
            markdownPath: 'sql/sql-ddl.md'
          },
          {
            id: 'sql-dml',
            label: 'DML (Data Manipulation Language)',
            markdownPath: 'sql/sql-dml.md'
          },
          {
            id: 'restricoes',
            label: 'Restrições (Constraints)',
            markdownPath: 'sql/restricoes.md'
          },
          {
            id: 'calculo-relacional',
            label: 'Calculo Relacional',
            markdownPath: 'sql/calculo-relacional.md'
          },
          {
            id: 'clausulas-sql',
            label: 'Clausulas SQL',
            markdownPath: 'sql/clausulas-sql.md'
          },
          {
            id: 'juncao-sql',
            label: 'Junção SQL',
            markdownPath: 'sql/juncao-sql.md'
          },
          {
            id: 'sql-conceitos-avancados',
            label: 'Conceitos Avançados',
            markdownPath: 'sql/conceitos-avancados.md'
          },
          {
            id: 'sql-questoes2',
            label: 'Questões SQL 2',
            markdownPath: 'sql/questoes-sql2.md'
          },          
          {
            id: 'sql-questoes',
            label: 'Questões SQL',
            markdownPath: 'sql/sql-questoes.md'
          },
          {
            id: 'juncao-sql',
            label: 'Junção SQL',
            markdownPath: 'sql/juncao-sql.md'
          },
          {
            id: 'sql-sintaxe',
            label: 'Sintaxe SQL',
            markdownPath: 'sql/sql-sintaxe.md'
          },
          {
            id: 'sql-sintaxe-questoes',
            label: 'Sintaxe SQL Questões',
            markdownPath: 'sql/sql-sintaxe-questoes.md'
          }                       
        ]
      }
    ]
  };
}
