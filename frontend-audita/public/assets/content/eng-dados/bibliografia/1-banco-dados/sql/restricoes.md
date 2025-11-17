#  RESTRIÇÕES (CONSTRAINT)

| **CONSTRAINT** | **DESCRIÇÃO** |
|----------------|----------------|
| **NOT NULL**   | Garante que uma coluna *v* **não possa ter um valor nulo**. |
| **UNIQUE**     | Garante que *b* **todos** os valores **de uma coluna sejam diferentes entre si.** |
| **PRIMARY KEY** | Garante que *b* **todos** os valores **de uma coluna sejam diferentes entre si e não nulos.** |
| **FOREIGN KEY** | Garante que *v* **ações não destruam links/relacionamentos** entre as tabelas. |
| **CHECK**      | Garante que **os valores em uma coluna** satisfaçam uma **condição específica.** *b* **(Valor Padrão)** |
| **DEFAULT**    | Define um valor padrão para uma coluna, se nenhum valor for especificado. |

![Restrições SQL](sql/restricoes.png)

**Restrições (Constraints)** são limitações utilizadas para determinar **regras** para os dados em uma tabela de um banco de dados relacional com o objetivo de **limitar o armazenamento** garantindo a qualidade e a confiabilidade aos dados e evitando que determinadas ações violem a integridade da estrutura dos dados especificada no esquema do banco de dados relacional.

Ex: Limitação para garantir a qualidade e confiabilidade do dado (Tipo do Dado), não tem haver com capacidade de armazenamento (GB, TB, etc.)

Podem ser no nível de coluna (se aplicam a uma coluna) ou no nível de tabela (se aplicam a toda a tabela).

*vbg* **Restrição para apenas um conjunto de linhas? Não! Restrições ou para coluna toda ou para a tabela toda!!**
<br>

## 1- Not Null

Por padrão, uma coluna pode conter valores nulos **(NULL)**, ou seja, se nada for especificado, não há nenhum problema em existir uma coluna que não contenha nenhum valor.

**NULL não é zero! É branco.**

Já a restrição NOT NULL força uma coluna a não aceitar valores nulos, ou seja, essa restrição obriga que determinada coluna contenha valores.

Logo, não podemos inserir um novo registro na tabela (ou atualizar um registro existente) sem adicionar valores a esse campo.

Existem basicamente duas maneiras de definir uma coluna como NOT NULL. 

<br>

**A primeira é durante a criação da tabela, onde definimos, para cada coluna: nome, tipo e restrição.**

```sql
CREATE TABLE ALUNO (
    NOME             VARCHAR(20)   NOT NULL,
    CPF              INT           PRIMARY KEY,
    SEXO             CHAR(1)       NOT NULL,
    DATA_NASCIMENTO  DATE          NOT NULL,
    CIDADE           VARCHAR(50)   NOT NULL,
    *b* **VALOR_PAGO**       INT           
);
```

Nesse caso, basta definir a coluna como NOT NULL. 

Isso significa que a tabela ALUNO não permitirá valores nulos para os campos NOME, CPF, SEXO, DATA_NASCIMENTO e CIDADE.

Logo, sempre que um registro for incluído nessa tabela, apenas o campo *b* **VALOR_PAGO** poderá ficar em branco porque nenhuma restrição foi definida para ele.

Todos os outros obrigatoriamente deverão ser preenchidos, caso contrário violarão a restrição especificada e a operação de inserção será abortada.

<br>

**A segunda maneira é por meio do comando ALTER TABLE:**

```sql
ALTER TABLE nome_tabela
  ALTER COLUMN nome_coluna TYPE novo_tipo;
```

## 2- Unique

Essa restrição garante que **todos os valores em uma coluna sejam diferentes**. Se uma coluna for definida com essa restrição, nenhum registro poderá ter valores iguais nessa coluna.

```sql
CREATE TABLE ALUNO (
    NOME             VARCHAR(20)   NOT NULL,
    CPF              INT           PRIMARY KEY,
    SEXO             CHAR(1)       NOT NULL,
    DATA_NASCIMENTO  DATE          NOT NULL,
    CIDADE           VARCHAR(50)   NOT NULL,
    MATRICULA        INT           *v* **UNIQUE**,
    VALOR_PAGO       INT           
);
```
Note que especificamos que a coluna **MATRICULA é UNIQUE!** Logo, em todos os registros da tabela, essa coluna não pode ficar vazia nem ter valores repetidos.

Um outro ponto interessante é que nós podemos dar um nome a uma restrição de unicidade ou defini-la para múltiplas colunas simultaneamente.

A sintaxe para ambas as situações é a mesma 

```sql
-- PARA NOMEAR UMA RESTRIÇÃO OU DEFINI-LA PARA MÚLTIPLAS COLUNAS
ALTER TABLE nome_tabela
  nome_coluna_1     tipo_de_dado    PRIMARY KEY,
  nome_coluna_2     tipo_de_dado    NOT NULL,
  nome_coluna_3     tipo_de_dado    ,
  nome_coluna_4     tipo_de_dado    NOT NULL,
  nome_coluna_5     tipo_de_dado    ,
  CONSTRAINT nome_da_restricao UNIQUE (nome_coluna3, nome_coluna5)
```

É possível também adicionar uma restrição de unicidade a uma coluna de uma tabela pré-existente por meio da sintaxe apresentada a seguir.

E se a tabela já tiver valores repetidos, antes de inserir a restrição, o Sistema Gerenciador de Banco de Dados (SGBD) analisará os dados da coluna para garantir que todos os valores pré-existentes nela são únicos. Se ele encontrar algum valor duplicado, **retornará um erro** e não alterará a tabela com a **adição da restrição de unidade.**

```sql
ALTER TABLE nome_tabela
  ADD UNIQUE (nome_da_coluna);
```

Por fim, da mesma forma que é possível adicionar uma restrição de unicidade a uma determinada coluna, é também possível retirá-la por meio da seguinte sintaxe:

```sql
ALTER TABLE nome_tabela
  DROP CONSTRAINT NOME_DA_RESTRICAO;
```
<br>

## 3- Primary Key

Essa restrição permite identificar **unicamente** cada registro de uma tabela, o que fornece uma garantia **de exclusividade para uma coluna ou conjunto de colunas**.

*vbg* **PRIMARY KEY é NOT NULL e UNIQUE, mas nem todo UNIQUE é PRIMARY KEY!!**

A restrição PRIMARY KEY combina as duas restrições analisadas nos tópicos anteriores: PRIMARY KEY = NOT NULL + UNIQUE!

Em outras palavras, uma coluna que seja definida com a restrição PRIMARY KEY necessariamente não poderá receber valores nulos nem repetidos.

Eu vou detalhar novamente para não haver confusão: uma coluna que possua a restrição UNIQUE jamais poderá se repetir, mas poderá ser nula; uma coluna que possua a restrição NOT NULL jamais poderá ser nula, mas poderá se repetir; uma coluna que possua a restrição PRIMARY KEY jamais poderá ser nula e jamais poderá se repetir.

Uma tabela poderá ter apenas uma chave primária composta de uma **coluna (simples)** ou mais **colunas (composta)**. Vamos ver a sintaxe:

Da mesma forma que nós vimos anteriormente, é possível também adicionar uma restrição PRIMARY KEY a uma tabela pré-existente. Para tal, utiliza-se a seguinte sintaxe:

Por fim, da mesma forma que é possível adicionar uma restrição PRIMARY KEY a uma determinada coluna, é também possível retirá-la por meio da seguinte sintaxe: 

Colunas compostas de PK é o equivalente a unique_together / UniqueConstraint do django
<br>

## 4- Foreing Key

As chaves estrangeiras são utilizadas para **unir duas tabelas**, em que a **chave estrangeira de uma tabela** referencia uma **chave candidata de outra tabela** (em geral, a **chave primária**).

A restrição FOREIGN KEY é utilizada justamente para definir uma ou mais colunas como chaves estrangeiras e prevenir que alguma ação possa destruir essa ligação entre tabelas.

A tabela com a chave estrangeira é chamada de Tabela Filha, e a tabela com a chave primária é chamada de Tabela Referenciada ou Tabela Pai.

Essa é a sintaxe para a definição dessa restrição:

É possível adicionar essa restrição a uma tabela pré-existente. Vejamos sua sintaxe:

```sql
ALTER TABLE nome_tabela
  ADD FOREIGN KEY (NOME_COLUNA1) REFERENCES TABELA_REFERENCIADA(CHAVE);
```
<br>

```sql
ALTER TABLE nome_tabela
  DROP FOREIGN KEY;
```
<br>

```sql
ALTER TABLE nome_tabela
  DROP CONSTRAINT NOME_RESTRICAO;
```
<br>

Por fim, da mesma forma que é possível adicionar uma restrição FOREIGN KEY a uma determinada coluna, é também possível retirá-la por meio da seguinte sintaxe

### Problema professor e disciplina

Agora nós temos um problema bastante interessante: nós sabemos que a chave estrangeira de uma tabela referencia uma chave candidata de outra tabela (em geral, a chave primária). Logo, se algo muda na tabela pai, mudará também na tabela filha, então, **ao deletar um registro da tabela pai todos os registro da tabela filha (problema de integridade)** que referencie esse registro deletado da tabela pai terá um valor inválido, porque ela perderá a sua referência.

Vejam o exemplo: se excluíssemos o registro da TABELA PROFESSOR cuja chave primária é 111.111.111-11, a disciplina cujo código é 101 da TABELA DISCIPLINA ficaria sem referência. E como podemos resolver esse problema?

Podemos utilizar a cláusula ON DELETE CASCADE. Essa cláusula basicamente obriga a exclusão dos registros correspondentes das Tabelas Filhas que referenciam o registro excluído da Tabela Pai.

### 📘 **Tabela Pai: PROFESSOR**

| cpf            | nome         |
| -------------- | ------------ |
| 111.111.111-11 | Ana Pereira  |
| 222.222.222-22 | João Almeida |
| 333.333.333-33 | Ricardo Vale |

**cpf** é a **PRIMARY KEY**.

---

### 📗 **Tabela Filha: DISCIPLINA**

| cod_disciplina | nome_disciplina | cpf_professor  |
| -------------- | --------------- | -------------- |
| 101            | Banco de Dados  | 111.111.111-11 |
| 102            | Redes           | 222.222.222-22 |
| 102            | Português       | 333.333.333-33 |

A coluna **cpf_professor** é uma **FOREIGN KEY**, pois **referencia** o **cpf** da tabela PROFESSOR.

---

### 🔗 **Como isso conecta as tabelas?**

A disciplina **101 – Banco de Dados** só pode existir se houver um professor com CPF **111.111.111-11** na tabela PROFESSOR.

A FOREIGN KEY garante essa regra.

---

### 🧹 Problema ao excluir o professor

Se apagarmos da tabela PROFESSOR o registro:

```
cpf = 111.111.111-11
```

A disciplina **101** ficaria órfã (sem professor).
O banco não permite isso *por padrão*.

---

### 🧨 Como resolver? — `ON DELETE CASCADE`

Se definirmos a FOREIGN KEY assim:

```sql
FOREIGN KEY (cpf_professor)
    REFERENCES professor(cpf)
    ON DELETE CASCADE
```

Então, ao excluir o professor, o banco **automaticamente** excluirá todas as disciplinas vinculadas a ele.

---

### 🔎 Resumo visual

**PROFESSOR (Pai)**
`cpf`  ← PRIMARY KEY

⬇️ Referenciado por

**DISCIPLINA (Filha)**
`cpf_professor`  ← FOREIGN KEY


```
CREATE TABLE NOME_DA_TABELA
    NOME_COLUNA1   TIPO_DE_DADO   RESTRIÇÕES,
    NOME_COLUNA2   TIPO_DE_DADO   RESTRIÇÕES,
    NOME_COLUNA3   TIPO_DE_DADO   RESTRIÇÕES,
    ...

    CONSTRAINT NOME_DA_RESTRICAO FOREIGN KEY (NOME_COLUNA1, ...)
        REFERENCES TABELA_REFERENCIADA (CHAVE1, ...)
        ON DELETE CASCADE
);
```

## 5- Check

Essa restrição é utilizada para limitar o intervalo de valores que **pode ser inserido em uma coluna**. É possível defini-la para uma coluna ou para uma tabela.

Caso seja definida para uma coluna, ela permitirá apenas alguns valores para esta coluna. Caso seja definida para uma tabela, ela limitará os valores de certas colunas com base nos valores de outras colunas da linha.

Vamos ver como tudo isso funciona.

```sql
CREATE TABLE ALUNO (
    NOME       VARCHAR(20)  NOT NULL,
    CPF        INT          PRIMARY KEY,
    SEXO       CHAR(1)      NOT NULL,
    CIDADE     VARCHAR(50),
    MATRICULA  INT          UNIQUE,
    IDADE      INT          *v* **CHECK (IDADE >= 18)**
);
```


No exemplo, temos uma restrição composta, dado que limita a inserção de registros apenas àqueles que tenham IDADE >= 18 e SEXO = ‘F’. Em outras palavras, será permitido o armazenamento de registros apenas de mulheres maiores de idade.
Informática

Conforme vimos nas restrições anteriores, também é possível adicioná-la após a criação da tabela, isto é, em uma tabela pré-existente. Vamos ver como seria a sintaxe:

Por fim, da mesma forma que é possível adicionar uma restrição de checagem, é também possível retirá-la por meio da seguinte sintaxe:

### 6- Default

Essa restrição é utilizada para configurar um valor padrão para uma coluna. Esse valor padrão é adicionado em todos os novos registros, caso nenhum outro valor tenha sido especificado.

No exemplo abaixo, todo registro que não tenha especificado um valor para a coluna CIDADE será automaticamente preenchido com o valor Brasília pelo próprio sistema.

Podemos alterar uma tabela já existente:

Por fim, da mesma forma que é possível adicionar um valor padrão, é também possível retirá-lo por meio da seguinte sintaxe: