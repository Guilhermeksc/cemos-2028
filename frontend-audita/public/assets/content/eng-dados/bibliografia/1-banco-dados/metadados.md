# **Metadados – Relatório Técnico (TCU – Auditor de TI)**

## **1. Definição Detalhada do Assunto**

Metadados são dados que descrevem outros dados. Constituem informações estruturadas que permitem identificar, localizar, compreender, gerenciar e preservar ativos informacionais. Em auditoria de TI, metadados são essenciais para análise de integridade, autenticidade, rastreabilidade, governança de dados e conformidade normativa.

Os metadados podem descrever **conteúdo**, **estrutura**, **contexto**, **qualidade**, **ciclo de vida**, **restrições legais**, **permissões**, **formato**, **origem** e **transformações** aplicadas aos dados.

Dividem-se tradicionalmente em:

* **Metadados descritivos:** identificam conteúdo (título, autor, data, palavras-chave).
* **Metadados estruturais:** explicam organização dos dados (versões, relacionamentos, schema, índices).
* **Metadados administrativos:** tratam de gestão (permissões, acessos, logs, auditoria, retenção).
* **Metadados de proveniência (provenance):** registram origem, modificações, agentes envolvidos.
* **Metadados de qualidade:** completude, acurácia, consistência.
* **Metadados técnicos:** formatos, codificações, tamanho, hashes.

Em sistemas auditáveis, metadados são parte crítica de trilhas de auditoria, governança, catalogação de dados, interoperabilidade e reprodutibilidade de processos.

---

## **2. Subtópicos Essenciais Exigidos em Provas**

* Tipos de metadados (descritivos, estruturais, administrativos, técnicos, de proveniência).
* Metadados em Bancos de Dados (catálogo, dicionário de dados, schema, data dictionary).
* Metadados em Data Warehouse (DW) e Business Intelligence.
* Metadados em Data Lakes (governança, catálogo, lineage).
* Metadados na ISO/IEC 11179 (padrão de metadados para registros).
* Metadados e LGPD (art. 5°, art. 6°, minimização, transparência).
* Metadados e trilhas de auditoria digital (logs, timestamps, integridade).
* Metadados em arquivos digitais (EXIF, PDF, DOCX, XML, JSON).
* Metadados e padrões de interoperabilidade governamental (ex: ePING).
* Metadados e Mecanismos de Controle Interno (COSO, COBIT).
* Gestão de metadados em sistemas distribuídos e big data.
* Metadados e catalogação de dados (Data Catalog, Data Governance).
* Linhagem de dados (Data Lineage).
* Metadados e ontologias.
* Preservação digital (OAIS).

---

## **3. Aspectos Normativos**

### **3.1. ISO/IEC 11179 – Padrão de Metadados**

* Define princípios para dicionários de metadados.
* Estabelece regras para identificar, nomear, classificar e registrar elementos de dados.
* É referência direta para governança e integridade semântica.

### **3.2. ISO/IEC 27001 e 27002**

* Exigem classificação da informação e controle de registros (metadados administrativos).
* Tratam de logs e eventos como mecanismo de segurança.

### **3.3. ISO/IEC 14721 (OAIS – Arquivo Aberto de Informação)**

* Especifica preservação digital.
* Metadados essenciais para garantir autenticidade e reprodutibilidade.

### **3.4. COBIT 2019**

* APO03 (Gerenciar Arquitetura da Informação) e DSS06 (Gerenciar Serviços).
* Foca em catálogo de dados e metadados confiáveis.

### **3.5. LGPD**

* Metadados contribuem para:

  * registro de tratamento,
  * rastreabilidade,
  * transparência,
  * responsabilização (accountability).

### **3.6. Arquiteturas de Governo Digital (ePING, interoperabilidade)**

* Metadados são base para integração de sistemas e formatos padronizados (XML, JSON, RDF).

---

## **4. Exemplos Práticos**

### **4.1. Banco de Dados**

O "dicionário de dados" (data dictionary) armazena metadados como:

* nomes de tabelas e colunas;
* tipos de dados;
* índices e chaves;
* triggers;
* permissões.

### **4.2. Arquivos Digitais**

* Fotos: EXIF (geolocalização, lente, data, modelo da câmera).
* PDFs: autor, data de criação, versão, permissões.
* DOCX: histórico, autor, revisões, comentários.
* XML/JSON: schema, namespace, tipos, estrutura.

### **4.3. Logs de Auditoria**

* timestamp,
* usuário,
* IP,
* ação executada,
* antes/depois da alteração,
* resultado.

### **4.4. Data Warehouse**

* Tabelas fato e dimensão possuem metadados detalhados para ETL/ELT.
* Data lineage: caminho que o dado percorre desde a origem até os dashboards.

### **4.5. Data Lakes**

* Metadados catalogados por ferramentas como Glue, Hive Metastore ou DataHub.

---

## **5. Erros Comuns em Provas**

* Confundir *dados* com *metadados*.
* Acreditar que metadados são apenas informações descritivas — ignoram metadados técnicos ou administrativos.
* Confundir metadados com logs (logs *são* um tipo de metadado administrativo).
* Considerar metadados como opcionais em Data Lakes (na prática, são essenciais para governança).
* Achar que metadados são irrelevantes para LGPD.
* Confundir metadados com documentação de sistemas.
* Supor que metadados são gerados manualmente; na maioria dos casos, são automatizados.

---

## **6. Questões Típicas (Estilo CESPE/CEBRASPE)**

**( )** Metadados estruturais descrevem como dados são organizados e como diferentes partes de uma informação se relacionam.
**Gabarito:** Certo

**( )** Em bancos de dados relacionais, metadados incluem o conteúdo das tabelas armazenadas.
**Gabarito:** Errado (conteúdo não é metadado)

**( )** Logs de acesso são exemplos de metadados administrativos.
**Gabarito:** Certo

**( )** No contexto da LGPD, metadados não são considerados dados pessoais.
**Gabarito:** Errado (podem identificar o titular)

**( )** A ISO/IEC 11179 trata de metadados relacionados à segurança da informação.
**Gabarito:** Errado (trata de registro e gestão de metadados)

**( )** Em um Data Lake, a ausência de metadados inviabiliza governança e descoberta de dados.
**Gabarito:** Certo

**( )** Metadados de proveniência registram a origem e as transformações aplicadas aos dados.
**Gabarito:** Certo

---

## **7. Resumo Final para Revisão**

* **Metadados = dados sobre dados.**
* Classificação fundamental: descritivos, estruturais, administrativos, técnicos, proveniência.
* Essenciais para auditoria: logs, rastreabilidade, transparência e governança.
* Padrões chave: **ISO/IEC 11179**, **ISO 27001/27002**, **OAIS**, **COBIT 2019**, **LGPD**.
* Em bancos de dados: dicionário de dados e catálogo são metadados.
* Em Data Lakes e DW: suporte a lineage, catálogo, ETL/ELT.
* Metadados podem ser sensíveis e sujeitos à LGPD.
* Questões de prova exploram: classificação, normas, exemplos, confusões conceituais e governança.