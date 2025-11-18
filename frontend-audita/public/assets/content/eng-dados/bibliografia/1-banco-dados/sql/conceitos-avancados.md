# CONCEITOS AVANÇADOS

## DATABASES

CREATE DATABASE → permite criar um banco de dados.

DROP DATABASE → permite excluir um banco de dados.

DROP DATABASE NOME_BANCO;

> DROP DATABASE BANCO_ESTRATEGIA;

OBS:

Ao excluir um banco de dados seus dados também serão apagados, por isso, a exclusão só pode ser realizada por usuários que tenham privilégios de administrador; Apesar de estarmos estudando em tópicos separados e ao final da aula, ambos os comandos de bancos de dados fazem parte da *v* **DDL** e precedem todos os outros, visto que é necessário criar um banco de dados para poder manipulá-lo.

## VIEWS

Uma visão (view) é uma tabela virtual baseada no conjunto de resultados de uma instrução SQL.

Ela contém linhas e colunas, assim como uma tabela real.

Os campos em uma visão são campos de uma ou mais tabelas reais no banco de dados.

Você pode adicionar instruções e funções a uma visualização e apresentar os dados como se fossem provenientes de uma única tabela.

*vbf* **View serve para melhorar a performace do banco!**

Dito isso, vamos ver seus principais comandos a partir da tabela abaixo:

| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| ELIS  | 55555555555  | ELIS@ELIS.COM    | 05-05-2005       | BRASÍLIA  | 50.00      |
| HUGO  | 88888888888  | HUGO@HUGO.COM    | 08-08-2008       | BRASÍLIA  | 50.00      |
| BRUNO | 22222222222  | BRUNO@BRUNO.COM  | 02-02-2002       | SÃO PAULO | 100.00     |
| FABIO | 66666666666  | FABIO@FABIO.COM  | 06-06-2006       | SALVADOR  | 125.00     |
| CAIO  | 33333333333  | CAIO@CAIO.COM    | 03-03-2003       | GOIÂNIA   | 150.00     |
| ALICE | 11111111111  | ALICE@ALICE.COM  | 01-01-2001       | BRASÍLIA  | 200.00     |
| GABI  | 77777777777  | GABI@GABI.COM    | 07-07-2007       | BRASÍLIA  | 225.00     |
| DIEGO | 44444444444  | DIOGO@DIOGO.COM  | 04-04-2004       | SALVADOR  | 250.00     |


## CREATE VIEW

```sql
CREATE VIEW [HOME_VIEW] AS
SELECT NOME_COLUNA1, NOME_COLUNA2, ...
FROM NOME_DA_TABELA
WHERE CONDICAO;
```

```sql
CREATE VIEW [BRASILIENTES] AS
SELECT NOME, CIDADE
FROM ALUNO_ESTRATEGIA
WHERE CIDADE = "BRASÍLIA";
```

### BRASILIENSES

| NOME  | CIDADE    |
|-------|-----------|
| ALICE | BRASÍLIA  |
| ELIS  | BRASÍLIA  |
| GABI  | BRASÍLIA  |
| HUGO  | BRASÍLIA  |

Vejam no exemplo anterior que nós criamos uma view para retornar apenas alunos brasilienses, logo nós fizemos uma seleção de NOME e CIDADE da tabela ALUNO_ESTRATEGIA em que a cidade seja BRASÍLIA.

Uma vez criada a view, eu posso consultá-la diretamente da seguinte forma:

SELECT * FROM [BRASILIENSES].

Lembrando que uma visão sempre mostra dados atualizados, pois o mecanismo de banco de dados recria a visualização sempre que um usuário a consulta.

## CREATE OR REPLACE VIEW

Esse comando permite alterar uma view existente ou, caso ela ainda não exista, permite criá-la.


```sql
CREATE OR REPLACE VIEW [BRASILIENTES] AS
SELECT NOME, E-MAIL, CIDADE
FROM ALUNO_ESTRATEGIA
WHERE CIDADE = "BRASÍLIA";
```

| NOME  | E-MAIL           | CIDADE    |
|-------|------------------|-----------|
| ALICE | ALICE@ALICE.COM  | BRASÍLIA  |
| ELIS  | ELIS@ELIS.COM    | BRASÍLIA  |
| GABI  | GABI@GABI.COM    | BRASÍLIA  |
| HUGO  | HUGO@HUGO.COM    | BRASÍLIA  |
No exemplo abaixo, nós alteramos a view para que ela retorne também o e-mail:

## DROP VIEW

A ideia aqui é simplesmente excluir uma view.

Lembrando que a manipulação de views faz parte da DDL, sendo considerada uma sublinguagem chamada *b* **VDL (View Definition Language)**.

DROP VIEW [NOME_VIEW];

> DROP VIEW [BRASILIENSES];

## STORED PROCEDURES

Uma Stored Procedure é um **código pré-preparado** que pode ser salvo, para que possa ser **reutilizado em outras ocasiões repetidamente**.

*vbg* **STORED PROCEDURES - COMO SE FOSSE UMA FUNÇÃO COM PARÂMETROS**

Logo, se há uma consulta SQL que utilizada frequentemente, é possível salvá-la como uma espécie de procedimento armazenado e, em seguida, apenas chamá-lo para que a consulta seja executada.

Lembrando que se pode passar parâmetros de entrada para um procedimento armazenado.

```sql
CREATE PROCEDURE NOME_PROCEDIMENTO
      @NOME_PARAMETRO1 TIPO, @NOME_PARAMETRO2 TIPO, ...
AS
      DECLARACOES_SQL
GO;
```

```sql
CREATE PROCEDURE RETORNA_CIDADE_ALUNO
      @CIDADE VARCHAR(20)
AS
      SELECT NOME, E-MAIL, CIDADE
      FROM ALUNO_ESTRATEGIA
      WHERE CIDADE = @CIDADE
GO;
```

```sql
EXEC RETORNA_CIDADE_ALUNO CIDADE = "BRASÍLIA";
```

```sql
CREATE PROCEDURE RETORNA_CIDADE_ALUNO
      @CIDADE VARCHAR(20), @ALUNO VARCHAR(50)
AS
      SELECT NOME, E-MAIL, CIDADE
      FROM ALUNO_ESTRATEGIA
      WHERE CIDADE = @CIDADE AND
            ALUNO = @ALUNO;
GO;
```

```sql
EXEC RETORNA_CIDADE_ALUNO CIDADE = "BRASÍLIA", ALUNO = "FÁBIO";
```

Note que o resultado foi idêntico ao da view.

Então, uma view é a mesma coisa que uma stored procedure?

Não, uma visão representa uma Tabela Virtual e se pode juntar várias tabelas em uma visão e utilizá-la para apresentar os dados como se todos eles viessem de
uma única tabela.

Uma Stored Procedure utiliza parâmetros para executar uma atividade, seja atualizando e inserindo dados ou retornando valores únicos ou conjuntos de dados.
