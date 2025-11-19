A seguir, o relatório solicitado.

---

## 1. Definição detalhada do assunto

### 1.1. Conceito de mensageria

**Mensageria** é o conjunto de tecnologias, padrões e serviços que permitem a **troca de mensagens entre sistemas** de forma desacoplada, confiável e, em geral, assíncrona. Em vez de um sistema chamar diretamente o outro (ex.: requisições síncronas HTTP), os sistemas **publicam e consomem mensagens** em canais intermediários, como filas (*queues*) ou tópicos (*topics*).

Características centrais:

* **Desacoplamento**: o produtor da mensagem não precisa conhecer detalhes internos do consumidor (linguagem, tecnologia, banco de dados).
* **Assincronia**: o produtor envia a mensagem e segue o processamento, sem esperar que o consumidor termine.
* **Confiabilidade**: mensagens podem ser armazenadas em disco, replicadas, reentregues em caso de falha.
* **Escalabilidade**: múltiplos consumidores podem processar mensagens em paralelo.

Exemplos de infraestrutura de mensageria:
RabbitMQ, Apache Kafka, IBM MQ, ActiveMQ, AWS SQS/SNS, Azure Service Bus, Google Pub/Sub, JMS em servidores de aplicação Java.

### 1.2. Conceito de eventos

**Evento** é um **fato ocorrido no sistema ou no mundo real** que é registrado e propagado para que outros componentes possam reagir. Ex.:

* “Usuário foi cadastrado”.
* “Pagamento confirmado”.
* “Arquivo de log foi gerado”.
* “Nova linha incluída em tabela do banco X”.

Em arquiteturas **orientadas a eventos** (*Event-Driven Architecture – EDA*), os sistemas:

* **Publicam eventos** em um barramento/stream.
* **Assinam eventos** de interesse para executar ações (atualizar bancos, acionar fluxos, etc.).

Eventos são frequentemente transportados por mecanismos de mensageria.

### 1.3. Conectores e fontes de dados

**Conectores** são componentes que integram sistemas e fontes de dados com o barramento de mensageria ou com o mecanismo de eventos. Exemplos:

* Conector de banco de dados que lê **logs de transação (CDC – Change Data Capture)** e envia eventos de “linha inserida/alterada/excluída”.
* Conector de arquivos (CSV/JSON/XML/Parquet) que lê arquivos em uma pasta ou *storage* e publica eventos de novo arquivo disponível.
* Conector de aplicações SaaS (ex.: ERP, CRM) via APIs, que transforma chamadas REST em mensagens/eventos.

O objetivo é **integrar múltiplas fontes de dados** (bancos relacionais, NoSQL, filas legadas, arquivos, APIs) a uma **infraestrutura comum de integração e eventos**, possibilitando:

* ETL/ELT em tempo quase real.
* Sincronização entre sistemas.
* Arquiteturas de data lake, data warehouse, streaming analytics, etc.

---

## 2. Subtópicos essenciais exigidos em provas

### 2.1. Modelos de comunicação

* **Síncrono x Assíncrono**

  * Síncrono: cliente espera resposta imediata (ex.: HTTP tradicional).
  * Assíncrono: envio de mensagem para fila/tópico; resposta pode vir depois, ou nem vir (fire-and-forget).

* **Ponto a ponto (fila)**

  * Mensagens enviadas para uma fila.
  * Cada mensagem é consumida por **apenas um** consumidor.
  * Padrão típico de **work queue** (fila de trabalho).

* **Publicação/assinatura (tópico)**

  * Produtor publica em um tópico.
  * Vários consumidores “assinantes” recebem o mesmo evento.
  * Usado para **notificações** e **distribuição de eventos**.

### 2.2. Arquitetura orientada a eventos (EDA)

Elementos típicos:

* **Produtores de eventos**: sistemas que geram eventos (aplicações, conectores, sensores, bancos via CDC).
* **Canal de eventos**: filas, tópicos ou streams (Kafka, etc.).
* **Consumidores de eventos**: sistemas que reagem (atualizam bancos, disparam fluxos de negócio, alimentam dashboards).

Benefícios frequentemente cobrados:

* Maior desacoplamento entre sistemas.
* Suporte a **processamento em tempo real** (ou quase real).
* Melhor escalabilidade horizontal.
* Maior flexibilidade para integrar novas aplicações sem alterar as existentes.

### 2.3. Padrões de integração com fontes de dados

Alguns padrões clássicos (muitas vezes indiretamente cobrados):

* **CDC – Change Data Capture**

  * Captura alterações em bancos de dados (insert, update, delete).
  * Gera eventos correspondentes.
  * Permite replicação e sincronização quase em tempo real.

* **Polling**

  * Conector consulta periodicamente um sistema/banco/arquivo.
  * Se houver mudança, gera evento.
  * Simples, mas pode ser menos eficiente.

* **Event Sourcing (conceito correlato)**

  * Em vez de gravar apenas o estado final, o sistema grava **todos os eventos** que levaram ao estado atual.
  * Útil para auditoria, reprocessamento, reconstrução de estado.

### 2.4. Formatos de mensagens

* Tipicamente **texto estruturado**: JSON, XML, ou formatos binários específicos (Avro, Protobuf, etc.).
* Devem conter:

  * **Identificador** da mensagem/evento.
  * **Tipo de evento** (ex.: “usuario_cadastrado”).
  * **Payload** (dados do evento).
  * **Metadados** (timestamp, origem, versão do esquema, etc.).

### 2.5. Confiabilidade, ordenação e idempotência

Pontos de prova:

* **Garantias de entrega**:

  * *At most once* (no máximo uma vez, pode perder mensagens).
  * *At least once* (pode haver reentrega, risco de duplicidade).
  * *Exactly once* (mais complexa, envolve coordenação, geralmente em plataformas específicas).

* **Ordenação**:

  * Alguns sistemas garantem ordem por partição (Kafka), outros não.
  * Auditor deve saber que nem sempre há garantia de ordem global.

* **Idempotência**:

  * Consumidores devem ser capazes de lidar com **mensagens duplicadas** sem causar efeitos indesejados (ex.: aplicar mesma atualização duas vezes).

---

## 3. Aspectos normativos e de governança

### 3.1. Segurança e LGPD

Em **integração e mensageria envolvendo dados pessoais**:

* Aplicação dos princípios da **LGPD**:

  * Minimização de dados nas mensagens (enviar apenas o necessário).
  * Controle de acesso às filas/tópicos.
  * Criptografia em trânsito (TLS) e, quando aplicável, em repouso.
  * Registros de acesso e trilhas de auditoria (quem consumiu, quando, de onde).

### 3.2. Normas de segurança da informação (ISO/IEC 27001/27002)

* Controles aplicáveis:

  * Gestão de chaves de criptografia para canais de mensageria.
  * Gestão de contas de serviço usadas por conectores.
  * Hardening de brokers e servidores intermediários.
  * Monitoramento e *logging* centralizado dos eventos de integração.

### 3.3. Governança de dados e integração

* Padrões de integração corporativa:

  * Definição centralizada de **esquemas de mensagem/evento** (catálogo de eventos).
  * Uso de **contratos de API** (OpenAPI, AsyncAPI).
  * Adoção de barramento de integração (ESB, iPaaS, *event mesh*).
* Do ponto de vista de auditoria:

  * Verificar aderência à **arquitetura de referência**.
  * Verificar controles de **integridade, disponibilidade e rastreabilidade** no fluxo de mensagens/eventos.

---

## 4. Exemplos práticos

### 4.1. Integração de sistema transacional com data lake via eventos

1. Sistema de vendas grava transação no banco relacional.
2. Conector CDC lê o log de transações.
3. Para cada `INSERT` de venda, publica evento “venda_realizada” em Kafka.
4. Consumidor no lado do data lake lê eventos e grava em formato Parquet para análises futuras.

Benefícios:

* Dados analíticos são atualizados quase em tempo real.
* O sistema de origem não precisa conhecer detalhes do data lake.

### 4.2. Notificações de cadastro de usuário

1. Aplicação de cadastro envia mensagem “usuario_cadastrado” para uma fila/tópico.
2. Módulo de envio de e-mail consome essa mensagem e envia mensagem de boas-vindas.
3. Módulo de BI consome o mesmo evento para atualizar indicadores de novos cadastros.

Caso típico de **publish/subscribe** e **reutilização de evento por múltiplos consumidores**.

### 4.3. Integração com sistema legado via arquivos

1. Sistema legado apenas gera arquivos diários CSV em uma pasta compartilhada.
2. Conector monitora a pasta:

   * Ao detectar novo arquivo, publica evento “arquivo_disponivel”.
   * Em seguida, processa o arquivo e publica eventos por registro (ex.: “conta_atualizada”).
3. Outros sistemas consomem esses eventos para atualização de seus próprios bancos.

---

## 5. Erros comuns em provas

1. **Confundir mensageria com API síncrona**

   * Dizer que mensageria pressupõe requisições síncronas tipo *request/response* via HTTP é erro.
   * Mensageria normalmente é **assíncrona**, com filas/tópicos.

2. **Afirmar que evento é sempre igual a comando**

   * Comando: algo que se **pede** para o sistema fazer (“criar usuário”).
   * Evento: algo que **já aconteceu** (“usuário criado”).
   * Provas gostam de explorar essa diferença.

3. **Ignorar a possibilidade de duplicidade na entrega de mensagens**

   * Muitos sistemas garantem *at least once*, então **duplicidade é possível**.
   * Afirmar que “mensageria sempre garante entrega exata e sem duplicação” é incorreto.

4. **Achar que conectores sempre funcionam apenas com bancos relacionais**

   * Conectores podem integrar:

     * Bancos relacionais, NoSQL, arquivos, APIs, filas, SaaS, etc.

5. **Afirmar que a utilização de mensageria elimina a necessidade de controles de segurança e LGPD**

   * Falso. A infraestrutura de mensageria deve ser protegida, monitorada e auditada.

6. **Supor que mensageria substitui totalmente ETL/ELT**

   * Não necessariamente. Mensageria é um **mecanismo de transporte**;
     o processo de ETL/ELT ainda precisa transformar, limpar, consolidar dados.

---

## 6. Questões típicas (estilo CEBRASPE)

Julgue os itens a seguir como **Certo (C)** ou **Errado (E)**.

1. ( ) Em uma arquitetura orientada a eventos, sistemas produtores publicam eventos em um barramento de mensageria, e sistemas consumidores podem reagir a esses eventos de forma assíncrona, o que favorece o desacoplamento entre as aplicações.

2. ( ) Em ambientes corporativos, conectores utilizados para integrar fontes de dados a uma infraestrutura de mensageria podem apoiar-se em mecanismos como captura de dados de alteração (CDC) ou *polling*, de modo a transformar alterações em bancos de dados ou arquivos em eventos consumíveis por outros sistemas.

3. ( ) Uma vantagem dos sistemas de mensageria é que, em todos os casos, eles garantem a entrega exatamente uma vez (*exactly once*), sem risco de duplicidade de mensagens, o que dispensa preocupações com idempotência nos consumidores.

4. ( ) Em integrações que utilizam mensageria e eventos contendo dados pessoais, é desnecessária a aplicação de princípios da LGPD, uma vez que tais dados já se encontram protegidos no banco de dados de origem.

5. ( ) Em um modelo de comunicação *publish/subscribe*, um evento publicado em um tópico pode ser consumido por múltiplos sistemas assinantes, o que permite que a mesma informação dispare diferentes fluxos de processamento em paralelo.

**Gabarito comentado:**

1. **Certo.** Descreve a essência de EDA e do uso de mensageria para desacoplamento e assincronia.
2. **Certo.** CDC e *polling* são formas comuns de transformar alterações em fontes de dados em eventos.
3. **Errado.** Muitos sistemas trabalham com *at least once*, havendo possibilidade de duplicidade; idempotência continua importante.
4. **Errado.** LGPD e controles de segurança continuam obrigatórios no fluxo de mensagens e eventos.
5. **Certo.** É a característica central do modelo *publish/subscribe*.

---

## 7. Resumo final altamente sintético para revisão

* **Mensageria**: uso de filas/tópicos para troca de mensagens entre sistemas, geralmente de forma **assíncrona** e **desacoplada**.
* **Eventos**: fatos ocorridos no sistema; em EDA, são publicados em barramento para que outros sistemas reajam.
* **Conectores**: componentes que integram **fontes de dados** (bancos, arquivos, APIs, sistemas legados) à infraestrutura de mensageria/eventos, usando padrões como **CDC** e *polling*.
* **Modelos**:

  * Fila (ponto a ponto): 1 mensagem → 1 consumidor.
  * Tópico (*publish/subscribe*): 1 evento → vários consumidores.
* **Desafios**:

  * Garantias de entrega (*at most/at least/exactly once*).
  * Ordenação parcial (por partição, não necessariamente global).
  * Necessidade de **idempotência** nos consumidores para lidar com duplicidades.
* **Normativos**:

  * LGPD: minimização de dados, controles de acesso, criptografia, auditoria.
  * ISO 27001/27002: segurança da infraestrutura de mensageria e dos conectores.
* **Ponto-chave para Auditor de TI**:

  * Verificar se a **arquitetura de integração via mensageria e eventos** está adequada em termos de segurança, confiabilidade, rastreabilidade e aderência às políticas de governança e proteção de dados.
