A seguir, o relatório solicitado.

---

## 1. Definição detalhada do assunto

### 1.1. O que são arquivos planos

Em sentido amplo, **arquivos planos** são arquivos armazenados em **formato texto ou binário simples**, **sem necessidade de um SGBD** para sua interpretação, normalmente acessados por programas que fazem a leitura sequencial ou posicional de seus conteúdos.
Em provas, entram nesse “guarda-chuva” formatos como:

* **CSV (Comma-Separated Values)**
* **JSON (JavaScript Object Notation)**
* **XML (eXtensible Markup Language)**
* **Parquet (formato colunar para dados analíticos)**

Apesar de JSON e XML permitirem estruturas hierárquicas/análogas a “árvores”, as bancas frequentemente os tratam junto com CSV como **formatos de intercâmbio de dados estruturados**, em contraste com dados mantidos dentro de SGBDs.

### 1.2. Comparação geral

* **CSV**

  * Texto puro.
  * Registros em linhas; campos separados por delimitador (vírgula, ponto e vírgula, etc.).
  * Estrutura essencialmente **tabular**, sem hierarquia.
  * Tipicamente não traz tipos de dados nem metadados ricos; tudo chega como texto.

* **JSON**

  * Texto estruturado em pares **chave–valor**, listas e objetos.
  * Suporta **estruturas aninhadas**.
  * Muito usado em **APIs REST**, logs, configurações e troca de dados entre sistemas.

* **XML**

  * Texto estruturado por **tags** (marcação).
  * Fortemente baseado em **árvore**.
  * Suporta **esquemas** (XSD, DTD) para validação.
  * Muito utilizado em integrações legadas, documentos, notas fiscais eletrônicas, etc.

* **Parquet**

  * Formato **colunar**, normalmente binário, otimizado para **Big Data e data lakes**.
  * Suporta compressão eficiente, tipos de dados, metadados.
  * Usado por engines como Spark, Hive, Presto/Trino, etc.

---

## 2. Subtópicos essenciais exigidos em provas

### 2.1. Características do CSV

* Estrutura: registros em linhas; campos separados por delimitador.
* Cabeçalho (opcional) com os nomes das colunas.
* Problemas clássicos:

  * Separador podendo aparecer dentro do texto (ex.: campo com vírgula).
  * Necessidade de **escape** ou aspas.
  * Ausência de tipos (“tudo string”).
* Uso típico: exportação de relatórios, intercâmbio simples entre sistemas, insumo para ETL.

### 2.2. Características do JSON

* Estrutura:

  * Objetos: `{ "chave": valor }`
  * Arrays: `[ valor1, valor2, ... ]`
* Suporte a tipos básicos: string, número, booleano, null, objetos, arrays.
* Bom para dados **semi-estruturados** e **aninhados**.
* Muito cobrado em contexto de:

  * **APIs REST**
  * Armazenamento em bancos NoSQL (ex.: documentos).
  * Logs e configuração de sistemas.

### 2.3. Características do XML

* Baseado em **tags**: `<Tag>conteúdo</Tag>`.
* Suporta:

  * Atributos: `<Pessoa nome="João" idade="30" />`
  * Namespaces.
  * Comentários, instruções de processamento.
* Validação via:

  * **DTD (Document Type Definition)**.
  * **XSD (XML Schema Definition)**.
* Frequentemente cobrado:

  * Diferença entre **elementos e atributos**.
  * Conceito de **bem-formado** (well-formed) x **válido** (valid).

### 2.4. Características do Parquet

* Formato **colunar** (dados organizados por coluna, não por linha).
* Comum em ecossistemas Hadoop, data lakes, Spark, etc.
* Benefícios:

  * Compressão mais eficiente.
  * Melhor leitura para consultas analíticas (leitura apenas das colunas necessárias).
  * Tipagem explícita, metadados ricos.
* Muito associado a:

  * **Lakes, Data Warehouses em nuvem**.
  * Arquiteturas de **Big Data** e pipelines de **ETL/ELT**.

### 2.5. Comparações que caem em prova

* **Linha x Coluna**:

  * CSV, JSON, XML: leitura, em geral, linha a linha ou registro a registro.
  * Parquet: armazenamento colunar.
* **Estruturação**:

  * CSV: estruturado, porém simples e tabular.
  * JSON/XML: semi-estruturados, com suporte a aninhamento.
  * Parquet: estruturado, com metadados e tipos.
* **Interoperabilidade vs. Performance**:

  * CSV/JSON/XML: maior interoperabilidade, mais legíveis.
  * Parquet: menos legível, mais eficiente para análise em grande volume.

---

## 3. Aspectos normativos e de governança

Embora as bancas não cobrem artigo por artigo de normas específicas para esses formatos, costumam relacioná-los a:

* **LGPD / privacidade**

  * Arquivos CSV/JSON/XML/Parquet com dados pessoais exigem:

    * Controles de acesso.
    * Criptografia em repouso e em trânsito, conforme políticas de segurança.
    * Minimização de dados: evitar exportar mais dados que o necessário.
* **Normas de segurança da informação (ISO/IEC 27001, 27002)**

  * Tratamento de mídias e arquivos:

    * Classificação da informação.
    * Controles de acesso, trilhas de auditoria, backup.
* **Governança de dados**

  * Catalogação de datasets (data catalog).
  * Definição de padrões de formatos (ex.: adoção corporativa de Parquet em data lake, JSON para APIs, etc.).
* **Padrões abertos**

  * JSON: especificado em RFC (IETF).
  * XML: especificações W3C.
  * CSV: amplamente utilizado, com recomendações W3C (CSV on the Web).

Para o Auditor de TI, o foco é: **risco, controle, governança e rastreabilidade** na manipulação desses arquivos em processos de auditoria de dados, BI e Big Data.

---

## 4. Exemplos práticos

### 4.1. CSV

```csv
id;nome;idade;cidade
1;Ana;30;Brasília
2;Bruno;25;Rio de Janeiro
3;Carlos;40;São Paulo
```

Uso típico: arquivo exportado do sistema de RH para ser analisado em planilha ou ferramenta de BI.

### 4.2. JSON

```json
[
  {
    "id": 1,
    "nome": "Ana",
    "enderecos": [
      { "tipo": "residencial", "cidade": "Brasília" },
      { "tipo": "trabalho", "cidade": "Gama" }
    ]
  },
  {
    "id": 2,
    "nome": "Bruno",
    "enderecos": [
      { "tipo": "residencial", "cidade": "Rio de Janeiro" }
    ]
  }
]
```

Uso típico: resposta de uma API de cadastro de usuários, contendo estrutura aninhada de endereços.

### 4.3. XML

```xml
<Pessoas>
  <Pessoa id="1">
    <Nome>Ana</Nome>
    <Cidade>Brasília</Cidade>
  </Pessoa>
  <Pessoa id="2">
    <Nome>Bruno</Nome>
    <Cidade>Rio de Janeiro</Cidade>
  </Pessoa>
</Pessoas>
```

Uso típico: integração legada entre sistemas, com esquema XSD definindo tipos e obrigatoriedades.

### 4.4. Parquet

* Não é comum escrever manualmente um arquivo Parquet; ele é gerado/consumido por ferramentas:

  * Ex.: Spark, Pandas, Hive, Presto, etc.
* Exemplo conceitual:

  * Uma tabela de faturamento com 100 milhões de linhas é armazenada em Parquet no data lake.
  * Uma consulta que precisa apenas da coluna “valor” lê somente essa coluna, com grande economia de I/O.

---

## 5. Erros comuns em provas

1. **“CSV é formato binário”**

   * Falso. CSV é um formato **texto**.

2. **“JSON não suporta estruturas aninhadas”**

   * Falso. JSON é justamente muito usado para **estruturas hierárquicas/aninhadas**.

3. **“XML não tem mecanismo para validação de estrutura”**

   * Falso. XML pode ser validado via **DTD** ou **XML Schema (XSD)**.

4. **“Parquet é formato linha a linha, como CSV”**

   * Falso. Parquet é um formato **colunar**.

5. **“Arquivos CSV sempre mantêm o tipo de dado (inteiro, data, etc.)”**

   * Falso. Geralmente tudo é texto; a interpretação de tipo depende da aplicação que lê.

6. **Confundir bem-formado x válido (XML)**

   * Bem-formado: segue regras sintáticas básicas (tags bem fechadas, hierarquia correta etc.).
   * Válido: além de bem-formado, **conforma a um esquema** (DTD/XSD).

7. **“JSON e XML exigem SGBD específico para serem utilizados”**

   * Falso. São formatos de **intercâmbio**, não dependem de SGBD, embora possam ser armazenados em bancos.

8. **“Parquet não é adequado para compressão”**

   * Falso. Um dos pontos fortes de Parquet é **alta compressão**, principalmente por ser colunar.

---

## 6. Questões típicas (estilo CEBRASPE)

Julgue os itens a seguir como **Certo (C)** ou **Errado (E)**.

1. ( ) Arquivos CSV são exemplos de arquivos planos em que os dados são representados em texto, em formato tabular, com campos separados por um delimitador e, em geral, sem metadados ricos sobre tipos de dados.

2. ( ) JSON e XML são formatos de dados que permitem representar estruturas hierárquicas, mas, ao contrário do CSV, exigem a utilização de um SGBD relacional para serem interpretados.

3. ( ) Em um arquivo XML, diz-se que o documento é válido quando, além de bem-formado, ele atende às regras definidas em um esquema, como um XML Schema (XSD) ou uma DTD.

4. ( ) O formato Parquet é um exemplo de formato colunar, amplamente utilizado em ambientes de Big Data e data lakes, pois permite a leitura seletiva de colunas e costuma apresentar boa taxa de compressão.

5. ( ) Em processos de auditoria de TI, arquivos CSV, JSON, XML e Parquet contendo dados pessoais devem ser tratados em conformidade com a LGPD, o que inclui a adoção de controles de acesso, criptografia e minimização de dados, quando cabível.

**Gabarito comentado:**

1. **Certo.** Descrição típica de CSV.
2. **Errado.** JSON e XML **não exigem** SGBD; podem ser interpretados por qualquer parser apropriado.
3. **Certo.** Conceito clássico de documento XML válido.
4. **Certo.** É exatamente o papel do Parquet.
5. **Certo.** Arquivos com dados pessoais devem seguir princípios e controles da LGPD.

---

## 7. Resumo final altamente sintético para revisão

* **Arquivos planos**: formatos de dados que não dependem de SGBD para leitura; usados para **intercâmbio e armazenamento** de dados.
* **CSV**: texto tabular, delimitado, simples, sem tipos explícitos; muito usado para exportar/importar dados.
* **JSON**: formato texto em pares chave–valor, com **estruturas aninhadas**; padrão de fato em **APIs REST**.
* **XML**: formato marcado por tags, estruturado em árvore; suporta **validação via DTD/XSD**; muito usado em integrações e documentos formais.
* **Parquet**: formato **colunar** e normalmente binário, otimizado para **Big Data** e data lakes, com forte compressão e metadados ricos.
* **Normativos**: LGPD, segurança da informação (ISO 27001/27002) e governança de dados tratam dos **controles e riscos** desses arquivos (acesso, privacidade, integridade, rastreabilidade).
* **Pontos-chave para prova**:

  * CSV = texto, tabular, sem tipos.
  * JSON/XML = suportam hierarquia; não exigem SGBD.
  * XML válido x bem-formado.
  * Parquet = colunar, eficiente em consultas analíticas.
  * Tratamento desses arquivos com dados pessoais deve atender à LGPD e às políticas de SI.
