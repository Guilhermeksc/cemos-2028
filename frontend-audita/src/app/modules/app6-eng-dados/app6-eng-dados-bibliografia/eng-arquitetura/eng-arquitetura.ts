import { Component } from '@angular/core';
import { ContentTcu, ContentConfig } from '../../../../components/content-tcu/content-tcu';

@Component({
  selector: 'app-eng-arquitetura',
  imports: [ContentTcu],
  templateUrl: './eng-arquitetura.html',
  styleUrl: './eng-arquitetura.scss'
})
export class EngArquitetura {
  contentConfig: ContentConfig = {
    basePath: 'assets/content/eng-dados/bibliografia/2-arquitetura-inteligencia',
    tabGroups: [
      {
        id: 'datawarehouse',
        label: 'DataWarehouse',
        mainMarkdownPath: 'datawarehouse/datawarehouse.md',
        items: [
          {
            id: 'datawarehouse-tipos-dados',
            label: 'Tipos de Dados',
            markdownPath: 'datawarehouse/datawarehouse-tipos-dados.md'
          },          
          {
            id: 'datawarehouse-questoes-sql',
            label: 'Questões SQL',
            markdownPath: 'datawarehouse/datawarehouse-questoes-sql.md'
          }                      
        ]
      },
      {
        id: 'datamart',
        label: 'DataMart',
        mainMarkdownPath: 'datamart/datamart.md',
        items: [
          {
            id: 'datamart-tipos-dados',
            label: 'Tipos de Dados',
            markdownPath: 'datamart/datamart-tipos-dados.md'
          },          
          {
            id: 'datamart-questoes-sql',
            label: 'Questões SQL',
            markdownPath: 'datamart/datamart-questoes-sql.md'
          }                      
        ]
      },
      {
        id: 'datalake',
        label: 'DataLake',
        mainMarkdownPath: 'datalake/datalake.md',
        items: [
          {
            id: 'datalake-tipos-dados',
            label: 'Tipos de Dados',
            markdownPath: 'datalake/datalake-tipos-dados.md'
          },          
          {
            id: 'datalake-questoes-sql',
            label: 'Questões SQL',
            markdownPath: 'datalake/datalake-questoes-sql.md'
          }                      
        ]
      },
      {
        id: 'datamesh',
        label: 'DataMesh',
        mainMarkdownPath: 'datamesh/datamesh.md',
        items: [
          {
            id: 'datamesh-tipos-dados',
            label: 'Tipos de Dados',
            markdownPath: 'datamesh/datamesh-tipos-dados.md'
          },          
          {
            id: 'datamesh-questoes-sql',
            label: 'Questões SQL',
            markdownPath: 'datamesh/datamesh-questoes-sql.md'
          }                      
        ]
      }
    ]
  };
}
