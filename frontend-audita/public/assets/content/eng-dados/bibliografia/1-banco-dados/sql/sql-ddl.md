# SQL - DDL (Data Definition Language)

É a Linguagem de Definição de Dados; um subconjunto dos comandos SQL que pode ser utilizado para definir ou descrever um esquema de um banco de dados, permitindo criar ou modificar a estrutura de objetos de uma base de dados relacional.

| **COMANDOS DDL** | **DESCRIÇÃO**                                                                 |
|------------------|-------------------------------------------------------------------------------|
| **CREATE**       | Comando utilizado para criar tabelas (e outros objetos) de um banco de dados. |
| **DROP**         | Comando utilizado para deletar uma tabela (e outros objetos) de um banco de dados. |
| **TRUNCATE**     | Comando utilizado para apagar os dados de uma tabela de um banco de dados.    |
| **ALTER**        | Comando utilizado para manipular colunas ou restrições de um banco de dados.  |
| **RENAME**       | Comando utilizado para renomear uma tabela de um banco de dados.              |


## DDL - COMANDOS

**a) CREATE TABLE:** permite criar uma tabela no banco de dados e criar também uma nova tabela a partir de outra já existente.

````markdown
## Sintaxe do comando

```sql
CREATE TABLE NOME_DA_TABELA (
    NOME_COLUNA1   TIPO_DE_DADO   RESTRIÇÕES,
    NOME_COLUNA2   TIPO_DE_DADO   RESTRIÇÕES,
    NOME_COLUNA3   TIPO_DE_DADO   RESTRIÇÕES,
    ...
);
````

---

## Exemplo do comando

```sql
CREATE TABLE ALUNO (
    NOME             VARCHAR(20)   NOT NULL,
    CPF              INT           PRIMARY KEY,
    SEXO             CHAR(1)       NOT NULL,
    DATA_NASCIMENTO  DATE          NOT NULL,
    CIDADE           VARCHAR(50)   NOT NULL,
    VALOR_PAGO       INT           NOT NULL
);
```


```
Observem que a sintaxe indica que é necessário especificar o nome da tabela e , para cada coluna, indicar seu nome, tipo de dado e eventuais restrições.

No exemplo acima, nós criamos uma tabela (ALUNO) que contém seis colunas (NOME, CPF, SEXO, DATA_NASCIMENTO, CIDADE, VALOR_PAGO). Cada coluna possui um tipo (VARCHAR(20), INT, CHAR(1), DATE, VARCHAR(50), INT) e pode armazenar
dados apenas desse respectivo tipo.

Os números após alguns tipos de dados indicam quantidade. A coluna que armazena dados do nome do aluno aceitará, no máximo, 20 caracteres; a coluna que armazena dados do sexo do aluno aceitará, no máximo, um caractere.

Por fim, note que as colunas possuem determinadas restrições que são limitações de uma coluna (Ex: determinada coluna deve ser chave primária;

determinada coluna deve ser chave estrangeira; determinada coluna não pode ser nula).

O resultado do comando é uma tabela com suas respectivas colunas e restrições, mas sem nenhum dado, uma vez que nós apenas criamos a tabela, mas ainda não inserimos nada dentro.

É possível também criar uma tabela a partir de outra tabela. Vamos imaginar que exista uma tabela já populada no banco de dados chamada ALUNO_ESCOLA_ANTIGA.

Se nós desejamos criar uma nova tabela a partir dessa tabela, basta seguir a sintaxe apresentada a seguir.

## Sintaxe do comando

```sql
CREATE TABLE NOME_TABELA_NOVA AS
SELECT NOME_COLUNA1, NOME_COLUNA2, NOME_COLUNA3, ...
FROM   NOME_TABELA_ANTIGA
WHERE  ...
```

## Exemplo do comando

```sql
CREATE TABLE ALUNO_ESCOLA_NOVA AS
SELECT NOME, CPF, SEXO, DATA_NASCIMENTO, CIDADE, VALOR_PAGO
FROM   ALUNO_ESCOLA_ANTIGA;
```

Ao criar uma tabela a partir de outra, os dados contidos na **tabela original também são copiados para a nova tabela**.

**b) DROP TABLE:** **Exclui tabela no BD** e, caso ela esteja populada, **apagará também os dados existentes**.

**c) TRUNCATE TABLE:** **apagará os dados** de uma tabela, mas **manterá a estrutura** da mesma no BD

**d) ALTER TABLE:** *b* **adiciona**, *b* **deleta** ou *b* **modifica** colunas de uma tabela existente ou **modifica as restrições**.

Vejam que nós adicionamos uma coluna do tipo texto chamada EMAIL capaz de armazenar até 255 caracteres.

Notem que a coluna SEXO foi excluída do resultado.

Há três opções de sintaxe diferentes, porque existem pequenas diferenças a depender do SGBD utilizado.
Vamos ver um exemplo utilizando a sintaxe do SQL Server:
Notem que alteramos a coluna CPF da tabela ALUNO convertendo o tipo de dado dessa coluna de INT para VARCHAR.

Por fim, é importante mencionar que, por meio desse comando, é possível também inserir ou excluir restrições de uma coluna. Você pode alterar uma coluna para indicar que ela não pode ser nula ou que ela será uma chave estrangeira.

SQL SERVER/MS-ACESS
ALTER TABLE NOME_DA_COLUINA
    **ALTER COLUMN** NOME_COLUNA TIPO DE DADO;

MYQL / ORACLE 10G EM DIANTE
ALTER TABLE NOME_DA_COLUINA
    **MODIFY**  NOME_COLUNA TIPO DE DADO;

e) RENAME TABLE : permite renomear tabelas.

OBS: Também é possível utilizar o comando ALTER TABLE para modificar o nome de uma determinada tabela.