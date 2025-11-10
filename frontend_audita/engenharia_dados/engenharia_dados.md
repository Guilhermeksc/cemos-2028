O que é a engenharia de dados
Concluído 100 XP

    5 minutos

O engenheiro de dados geralmente trabalhará com vários tipos de dados para executar muitas operações usando muitas linguagens de script ou codificação que são apropriadas para sua organização individual.
Tipos de dados

Há três tipos principais de dados com os quais um engenheiro de dados trabalhará.
Estruturado 	Semiestruturados 	Desestruturado
Diagrama do tipo de dados estruturados. 	Diagrama do tipo de dados semiestruturados. 	Diagrama do tipo de dados não estruturados.
Os dados estruturados vêm principalmente de sistemas de origem baseados em tabela, como um banco de dados relacional ou de um arquivo simples, como um arquivo CSV (separado por vírgulas). O elemento principal de um arquivo estruturado é que as linhas e colunas são alinhadas consistentemente em todo o arquivo. 	Dados semiestruturados são dados como arquivos JSON (notação de objeto JavaScript), que podem exigir nivelamento antes de carregar em seu sistema de origem. Quando achatados, esses dados não precisam caber perfeitamente em uma estrutura de tabela. 	Os dados não estruturados incluem dados armazenados como pares chave-valor que não aderem a modelos relacionais padrão e outros tipos de dados não estruturados que normalmente são usados incluem pdf (formato de dados portátil), documentos do processador de palavras e imagens.
Operações de dados

Como engenheiro de dados, algumas das principais tarefas que você executará no Azure incluem integração de dados, transformação de dados e consolidação de dados.
Integração de dados

Diagrama que representa uma operação de integração de dados.

A integração de dados envolve o estabelecimento de vínculos entre serviços operacionais e analíticos e fontes de dados para habilitar o acesso seguro e confiável aos dados em vários sistemas. Por exemplo, um processo de negócios pode depender de dados que são distribuídos em vários sistemas e um engenheiro de dados é necessário para estabelecer links para que os dados necessários possam ser extraídos de todos esses sistemas.
Transformação de dados

Diagrama que representa uma operação de transformação de dados.

Os dados operacionais geralmente precisam ser transformados em estrutura e formato adequados para análise, muitas vezes como parte de um processo de ETL (extração, transformação e carga ). embora cada vez mais uma variação na qual você extrai, carregue e transforme (ELT) os dados são usados para ingerir rapidamente os dados em um data lake e, em seguida, aplicar técnicas de processamento de "Big Data" para transformá-los. Independentemente da abordagem usada, os dados estão preparados para dar suporte às necessidades analíticas downstream.
Consolidação de dados

Diagrama que representa uma operação de consolidação de dados.

A consolidação de dados é o processo de combinação de dados extraídos de várias fontes de dados em uma estrutura consistente , geralmente para dar suporte a análises e relatórios. Normalmente, os dados de sistemas operacionais são extraídos, transformados e carregados em repositórios analíticos, como um data lake ou data warehouse.
Idiomas comuns

Os Engenheiros de Dados devem ser proficientes com uma variedade de ferramentas e linguagens de script , em particular SQL e Python, e potencialmente outras.

    SQL – Uma das linguagens mais comuns que os engenheiros de dados usam é o SQL ou a Linguagem de Consulta Estruturada, que é uma linguagem relativamente fácil de aprender. O SQL usa consultas que incluem instruções SELECT, INSERT, UPDATE e DELETE para trabalhar diretamente com os dados armazenados em tabelas.

    Python – Python é uma das linguagens de programação que mais crescem no mundo. Ele é usado para todos os tipos de tarefas, incluindo programação da Web e análise de dados. Ele surgiu como o idioma a aprender para aprendizado de máquina e está aumentando em popularidade na engenharia de dados com o uso de notebooks.

    Outros – dependendo das necessidades da organização e do conjunto de habilidades individuais, você também pode usar outras linguagens populares dentro ou fora de blocos de anotações, incluindo R, Java, Scala, C#e muito mais. O uso de notebooks está crescendo em popularidade e permite a colaboração usando idiomas diferentes no mesmo bloco de anotações.

## Conceitos importantes de engenharia de dados

Conceitos importantes de engenharia de dados
Concluído 100 XP

    6 minutos

Há alguns conceitos fundamentais com os quais os engenheiros de dados devem estar familiarizados. Esses conceitos sustentam muitas das cargas de trabalho que os engenheiros de dados devem implementar e dar suporte.
Dados operacionais e analíticos

Diagrama que representa dados operacionais e analíticos.

Os dados operacionais geralmente são dados transacionais gerados e armazenados por aplicativos, geralmente em um banco de dados relacional ou não relacional. Dados analíticos são dados otimizados para análise e relatórios, geralmente em um data warehouse.

Uma das principais responsabilidades de um engenheiro de dados é projetar, implementar e gerenciar soluções que integram fontes de dados operacionais e analíticas ou extraem dados operacionais de vários sistemas, transformá-los em estruturas apropriadas para análise e carregá-los em um armazenamento de dados analíticos (geralmente chamados de soluções ETL).
Dados de streaming

Diagrama que representa dados de streaming.

Os dados de streaming referem-se a fontes perpétuas de dados que geram valores de dados em tempo real, geralmente relacionados a eventos específicos. Fontes comuns de dados de streaming incluem dispositivos IoT (Internet das Coisas) e feeds de mídia social.

Os engenheiros de dados geralmente precisam implementar soluções que capturam o fluxo de dados em tempo real e os ingerem em sistemas de dados analíticos, geralmente combinando os dados em tempo real com outros dados de aplicativo que são processados em lotes.
Pipelines de dados

Diagrama que representa um pipeline de dados.

Os pipelines de dados são usados para orquestrar atividades que transferem e transformam dados. Os pipelines são a principal maneira pela qual os engenheiros de dados implementam soluções de ETL (extração, transformação e carregamento) repetíveis que podem ser disparadas com base em um agendamento ou em resposta a eventos.
Lagos de dados

Diagrama representando um data lake.

Um data lake é um repositório de armazenamento que contém grandes quantidades de dados em formatos nativos e brutos. ** Os repositórios de data lake são otimizados para escalarem a volumes maciços (terabytes ou petabytes) de dados. Normalmente, os dados são provenientes de várias fontes heterogêneas e podem ser estruturados, semiestruturados ou não estruturados.

A ideia com um data lake é armazenar tudo em seu estado original e nãotransformado. Essa abordagem difere de um data warehouse tradicional, que transforma e processa os dados no momento da ingestão.
Armazéns de dados

Diagrama que representa um data Warehouse.

Um data warehouse é um repositório central, organizacional e relacional de dados integrados de uma ou mais fontes diferentes. Os data warehouses armazenam dados atuais e históricos em tabelas relacionais organizadas em um esquema que otimiza o desempenho de consultas analíticas.

Os engenheiros de dados são responsáveis por projetar e implementar data warehouses relacionais e gerenciar cargas de dados regulares em tabelas.
Apache Spark

Diagrama que representa um cluster do Apache Spark.

O Apache Spark é uma estrutura de processamento paralela que aproveita o processamento na memória e um armazenamento de arquivos distribuído. É uma ferramenta comum de software livre (OSS) para cenários de Big Data.

Os engenheiros de dados precisam ser proficientes com o Spark, usando notebooks e outros artefatos de código para processar dados em um data lake e prepará-los para modelagem e análise.

## Engenharia de dados no Microsoft Azure

Engenharia de dados no Microsoft Azure
Concluído 100 XP

    6 minutos

Diagrama do fluxo de uma solução típica de análise de dados corporativos.

O Microsoft Azure inclui muitos serviços que podem ser usados para implementar e gerenciar cargas de trabalho de engenharia de dados.

O diagrama exibe o fluxo da esquerda para a direita de uma solução típica de análise de dados corporativa, incluindo alguns dos principais serviços do Azure que podem ser usados. Os dados operacionais são gerados por aplicativos e dispositivos e armazenados nos serviços de armazenamento de dados do Azure, como o Banco de Dados SQL do Azure, o Azure Cosmos DB e o Microsoft Dataverse. Os dados de streaming são capturados em serviços do agente de eventos, como Os Hubs de Eventos do Azure.

Esses dados operacionais devem ser capturados, ingeridos e consolidados em repositórios analíticos; de onde ele pode ser modelado e visualizado em relatórios e dashboards. Essas tarefas representam a área principal de responsabilidade para o engenheiro de dados. As principais tecnologias do Azure usadas para implementar cargas de trabalho de engenharia de dados incluem:

    Azure Synapse Analytics
    Azure Data Lake Storage Gen2
    Azure Stream Analytics
    Azure Data Factory
    Azure Databricks

Os armazenamentos de dados analíticos preenchidos com dados produzidos por cargas de trabalho de engenharia de dados dão suporte à modelagem e à visualização de dados para relatórios e análises, muitas vezes usando ferramentas de visualização sofisticadas, como o Microsoft Power BI.
