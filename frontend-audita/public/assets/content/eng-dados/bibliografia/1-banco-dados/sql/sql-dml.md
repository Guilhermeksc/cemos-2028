# SQL - DML (Data Manipulation Language)

Essa linguagem possui um conjunto de comandos que podem ser utilizados para realizar transações em um banco de dados (inserir, excluir, deletar ou consultar).

Aqui estão agrupados os comandos para a manipulação dos dados em si.

| COMANDOS DML | DESCRIÇÃO |
|--------------|-----------|
| SELECT | Comando utilizado para realizar **consultas a dados de uma ou mais tabelas do banco de dados**.|
| INSERT | Comando utilizado para **inserir** um **registro em uma tabela do banco de dados**.|
| UPDATE | Comando utilizado para **mudar/atualizar** valores de dados de registros de uma tabela do banco de dados.|
| DELETE | Comando utilizado para **remover** registros de uma tabela do banco de dados.|

<br>

## INSERT

Insere **novos** registros em uma tabela do banco de dados.

A inserção *v* **deve** ser feita na **ordem correta dos campos**.

Se todos os campos forem preenchidos, não é necessário explicitar o nome da coluna, mas se não tivermos todos os campos a serem preenchidos, devemos explicitar os nomes das colunas no comando de inserção.


### Sintaxe I
```sql
-- INSERÇÃO DE TODOS OS VALORES PRESCINDE DA ESPECIFICAÇÃO DAS COLUNAS
INSERT INTO NOME_DA_TABELA
VALUES (VALOR_1, VALOR_2, VALOR_3, ...);
```

### Sintaxe II

```sql
-- INSERÇÃO DE TODOS OS VALORES PRECISA DA ESPECIFICAÇÃO DAS COLUNAS
INSERT INTO NOME_DA_TABELA (NOME_COLUNA1, NOME_COLUNA2, NOME_COLUNA3, ...)
VALUES (VALOR_1, VALOR_2, VALOR_3, ...);
```

---

### Exemplos do comando INSERT (Sintaxe II**

```sql
INSERT INTO ALUNO_ESTRATEGIA
VALUES ('ALICE', '11111111111', 'ALICE@ALICE.COM', '01-01-2001', 'BRASÍLIA', 200.00);

INSERT INTO ALUNO_ESTRATEGIA
VALUES ('BRUNO', '22222222222', 'BRUNO@BRUNO.COM', '02-02-2002', 'SÃO PAULO', 100.00);

INSERT INTO ALUNO_ESTRATEGIA
VALUES ('CAIO', '33333333333', 'CAIO@CAIO.COM', '03-03-2003', 'GOIÂNIA', 150.00);

INSERT INTO ALUNO_ESTRATEGIA
VALUES ('DIEGO', '44444444444', 'DIEGO@DIEGO.COM', '04-04-2004', 'SALVADOR', 250.00);

INSERT INTO ALUNO_ESTRATEGIA
VALUES ('ELIS', '55555555555', 'ELIS@ELIS.COM', '05-05-2005', 'BRASÍLIA', 50.00);
```

### Exemplos do Comando INSERT (Sintaxe II)

```sql
INSERT INTO ALUNO_ESTRATEGIA (NOME, CPF, EMAIL, DATA_NASCIMENTO, CIDADE, VALOR_PAGO)
VALUES ('FABIO', '66666666666', 'FABIO@FABIO.COM', '06-06-2006', 'SALVADOR', 125.00);

INSERT INTO ALUNO_ESTRATEGIA (NOME, CPF, EMAIL, DATA_NASCIMENTO, CIDADE, VALOR_PAGO)
VALUES ('GABI', '77777777777', 'GABI@GABI.COM', '07-07-2007', 'BRASÍLIA', 225.00);

INSERT INTO ALUNO_ESTRATEGIA (NOME, CPF, EMAIL, DATA_NASCIMENTO, CIDADE, VALOR_PAGO)
VALUES ('HUGO', '88888888888', 'HUGO@HUGO.COM', '08-08-2008', 'BRASÍLIA', 50.00);

INSERT INTO ALUNO_ESTRATEGIA (NOME, CPF, EMAIL, DATA_NASCIMENTO, CIDADE, VALOR_PAGO)
VALUES ('IGOR', '99999999999', 'IGOR@IGOR.COM', '09-09-2009', 'RECIFE', 75.00);

INSERT INTO ALUNO_ESTRATEGIA (NOME, CPF, EMAIL, DATA_NASCIMENTO, CIDADE, VALOR_PAGO)
VALUES ('JOÃO', '00000000000', 'JOAO@JOAO.COM', '10-10-2010', 'NATAL', 175.00);
```

### Resultado dos Comandos

| NOME  | CPF          | EMAIL           | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|-----------------|------------------|-----------|------------|
| ALICE | 11111111111  | ALICE@ALICE.COM | 01-01-2001       | BRASÍLIA  | 200.00     |
| BRUNO | 22222222222  | BRUNO@BRUNO.COM | 02-02-2002       | SÃO PAULO | 100.00     |
| CAIO  | 33333333333  | CAIO@CAIO.COM   | 03-03-2003       | GOIÂNIA   | 150.00     |
| DIEGO | 44444444444  | DIEGO@DIEGO.COM | 04-04-2004       | SALVADOR  | 250.00     |
| ELIS  | 55555555555  | ELIS@ELIS.COM   | 05-05-2005       | BRASÍLIA  | 50.00      |
| FABIO | 66666666666  | FABIO@FABIO.COM | 06-06-2006       | SALVADOR  | 125.00     |
| GABI  | 77777777777  | GABI@GABI.COM   | 07-07-2007       | BRASÍLIA  | 225.00     |
| HUGO  | 88888888888  | HUGO@HUGO.COM   | 08-08-2008       | BRASÍLIA  | 50.00      |
| IGOR  | 99999999999  | IGOR@IGOR.COM   | 09-09-2009       | RECIFE    | 75.00      |
| JOÃO  | 00000000000  | JOAO@JOAO.COM   | 10-10-2010       | NATAL     | 175.00     |


<br>

## UPDATE

Esse comando é utilizado para **atualizar registros existentes em uma tabela do banco de dados**.

Pode-se atualizar **todos os registros de uma tabela ou apenas alguns**.

Para atualizar **registros específicos**, devemos utilizar a *b* **cláusula WHERE**, que será detalhada mais à frente, mas, por enquanto, basta saber que ela permite filtrar dados a partir de um conjunto de condições.

### Sintaxe do comando UPDATE

```sql
UPDATE NOME_DA_TABELA
SET NOME_DA_COLUNA_1 = VALOR_1, NOME_COLUNA_2 = VALOR_2 ...
WHERE LISTA_DE_CONDICOES;
```


### Exemplo do comando UPDATE

```sql
UPDATE ALUNO_ESTRATEGIA
SET NOME = 'DIGO', EMAIL = 'DIOGO@GMAIL.COM'
WHERE CPF = 44444444444;
```


### Resultado dos Comandos


| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| ALICE | 11111111111  | ALICE@ALICE.COM  | 01-01-2001       | BRASÍLIA  | 200.00     |
| BRUNO | 22222222222  | BRUNO@BRUNO.COM  | 02-02-2002       | SÃO PAULO | 100.00     |
| CAIO  | 33333333333  | CAIO@CAIO.COM    | 03-03-2003       | GOIÂNIA   | 150.00     |
| *v* **DIOGO** | *v* **44444444444**  | *v* **DIOGO@DIOGO.COM**  | 04-04-2004       | SALVADOR  | 250.00     |
| ELIS  | 55555555555  | ELIS@ELIS.COM    | 05-05-2005       | BRASÍLIA  | 50.00      |
| FABIO | 66666666666  | FABIO@FABIO.COM  | 06-06-2006       | SALVADOR  | 125.00     |
| GABI  | 77777777777  | GABI@GABI.COM    | 07-07-2007       | BRASÍLIA  | 225.00     |
| HUGO  | 88888888888  | HUGO@HUGO.COM    | 08-08-2008       | BRASÍLIA  | 50.00      |
| IGOR  | 99999999999  | IGOR@IGOR.COM    | 09-09-2009       | RECIFE    | 75.00      |
| JOÃO  | 00000000000  | JOAO@JOAO.COM    | 10-10-2010       | NATAL     | 175.00     |

*vbg* **Atenção se usar o UPDATE SET sem o WHERE, todas as linhas receberação os valores informados**

Vamos supor que houvesse um erro e o nome de um aluno fosse Diogo em vez de Diego.

Vejam no exemplo acima que o código apresentado atualiza (UPDATE) a tabela ALUNO_ESTRATEGIA de tal forma que se configure (SET) o valor da coluna NOME para ‘Diogo’ e o valor da coluna EMAIL para ‘diogo@gmail.com’, porém apenas para os registros que tenham 44444444444 como valor de CPF.

Essa foi uma condição simples, mas você pode inserir a condição que quiser...
<br>

## DELETE

Esse comando é utilizado para deletar registros existentes em uma tabela do banco de dados.

Pode-se deletar todos os registros de uma tabela ou apenas alguns.

Para deletar registros específicos, devemos utilizar a cláusula WHERE.

Notem que se não for utilizada a cláusula WHERE, o DELETE funcionará como um **TRUNCATE** e apagará todos os registros de uma tabela, mas mantem a estrutura da mesma.

No exemplo seguinte, nós vamos excluir da tabela ALUNO_ESTRATEGIA as linhas/registros cujo valor da coluna VALOR_PAGO seja 175.00 ou cujo valor da coluna CIDADE seja RECIFE.



### Sintaxe do comando DELETE

```sql
DELETE FROM NOME_DA_TABELA WHERE LISTA_DE_CONDICOES;
```

### Exemplo do comando DELETE

```sql
DELETE FROM ALUNO_ESTRATEGIA 
WHERE VALOR_PAGO = 175.00 OR CIDADE = 'RECIFE';
```

---

### Resultado do Comando


| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| ALICE | 11111111111  | ALICE@ALICE.COM  | 01-01-2001       | BRASÍLIA  | 200.00     |
| BRUNO | 22222222222  | BRUNO@BRUNO.COM  | 02-02-2002       | SÃO PAULO | 100.00     |
| CAIO  | 33333333333  | CAIO@CAIO.COM    | 03-03-2003       | GOIÂNIA   | 150.00     |
| DIOGO | 44444444444  | DIOGO@DIOGO.COM  | 04-04-2004       | SALVADOR  | 250.00     |
| ELIS  | 55555555555  | ELIS@ELIS.COM    | 05-05-2005       | BRASÍLIA  | 50.00      |
| FABIO | 66666666666  | FABIO@FABIO.COM  | 06-06-2006       | SALVADOR  | 125.00     |
| GABI  | 77777777777  | GABI@GABI.COM    | 07-07-2007       | BRASÍLIA  | 225.00     |
| HUGO  | 88888888888  | HUGO@HUGO.COM    | 08-08-2008       | BRASÍLIA  | 50.00      |
| *v* **IGOR**  | *v* **99999999999**  | *v* **IGOR@IGOR.COM**    | *v* **09-09-2009**       | *vbg* **RECIFE**    | *v* **75.00**      |
| *v* **JOÃO**  | *v* **00000000000**  | *v* **JOAO@JOAO.COM**    | *v* **10-10-2010**       | *v* **NATAL**     | *vbg* **175.00**     |

*(Foram removidos JOÃO e IGOR, conforme a condição do DELETE.)*


**27) (MPU)** Os comandos SQL INTERT, UPDATE, DELETE e ALTER TABLE fazem parte da DML (Data Manipulation Language).

Resposta Falsa. Não possui ALTER TABLE e INTERT também não existe.

**28) (Banco da Amazônia)** Exemplos de comandos de SQL DML (Data Manipulation Language) incluem SELECT, UPDATE, DELETE, INSERT INTO.

Resposta Verdadeiro.

**29) (TRE/RJ)** INSERT INTO é o comando utilizado para inserir dados em uma tabela.
Resposta Verdadeiro.

**30) (Prefeitura de Congonhas/MG)** Qual instrução SQL é usada para inserir novos dados em uma tabela do banco de dados?

a) ADD NEW
b) ADD RECORD
c) INSERT INTO
d) INSERT NEW
e) INSERT

Resposta Letra C

**31) (STJ)** O comando INSERT INTO é capaz de inserir novos dados em um banco de dados, mas não é classificado como DML nem como DDL

Resposta Falsa. Pois é DML.

**32) (TCE/SP)** Alterações nos valores dos registros de determinada tabela são realizadas em SQL pelo comando:
a) Insert.
b) Update.
c) Drop.
d) Modify.
e) Modify_table.

Resposta Letra B

**33) (EBSERH)** Em SQL a instrução que remove uma ou mais linhas em uma tabela:
a) ERASE
b) DELETE
c) DROP
d) REMOVE

Resposta Letra B. 

*vbg* **DROP é ignorante! Apaga tudo inclusive a tabela!**

**34) (IF/TO)** José, técnico em informática do IFTO, deseja excluir somente um registro
de um banco de dados SQL. Qual dos comandos abaixo ele deverá usar:
a) TRUNCATE
b) DROP
c) DELETE
d) INSERT
e) COMMIT

Resposta Letra C.

<br> 

## SELECT

Esse comando é utilizado para **recuperar informações de um banco de dados**.

*v* **Recuperar no sentido de buscar os dados.**


### Sintaxe do comando SELECT

```sql
-- AS CLÁUSULAS SÃO OPCIONAIS
SELECT LISTA_DE_COLUNAS 
FROM LISTA_DE_TABELAS 
CLAUSULAS;
```

### Exemplo do comando SELECT

```sql
SELECT * FROM ALUNO_ESTRATEGIA;
```

### Resultado do Comando


| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| ALICE | 11111111111  | ALICE@ALICE.COM  | 01-01-2001       | BRASÍLIA  | 200.00     |
| BRUNO | 22222222222  | BRUNO@BRUNO.COM  | 02-02-2002       | SÃO PAULO | 100.00     |
| CAIO  | 33333333333  | CAIO@CAIO.COM    | 03-03-2003       | GOIÂNIA   | 150.00     |
| DIEGO | 44444444444  | DIOGO@DIOGO.COM  | 04-04-2004       | SALVADOR  | 250.00     |
| ELIS  | 55555555555  | ELIS@ELIS.COM    | 05-05-2005       | BRASÍLIA  | 50.00      |
| FABIO | 66666666666  | FABIO@FABIO.COM  | 06-06-2006       | SALVADOR  | 125.00     |
| GABI  | 77777777777  | GABI@GABI.COM    | 07-07-2007       | BRASÍLIA  | 225.00     |
| HUGO  | 88888888888  | HUGO@HUGO.COM    | 08-08-2008       | BRASÍLIA  | 50.00      |


Observem no exemplo acima que utilizamos o elemento asterisco (*) e isso significa que queremos recuperar todas as colunas da tabela.

Aliás, sempre que vocês virem o asterisco (*), podem interpretar como: “todas as colunas”.

Vejam no esquema abaixo o exemplo de comando e a sua respectiva interpretação para que vocês consigam entender isso melhor:

![Comandos SELECT](sql/select.png)


E para selecionar colunas específicas da tabela?

Não há problema: nós podemos selecionar, por exemplo, as colunas NOME e DATA_NASCIMENTO:


### Exemplo do comando SELECT

```sql
SELECT NOME, DATA_NASCIMENTO FROM ALUNO_ESTRATEGIA;
```

---

### Resultado do Comando


| NOME  | DATA_NASCIMENTO |
|-------|------------------|
| ALICE | 01-01-2001       |
| BRUNO | 02-02-2002       |
| CAIO  | 03-03-2003       |
| DIOGO | 04-04-2004       |
| ELIS  | 05-05-2005       |
| FABIO | 06-06-2006       |
| GABI  | 07-07-2007       |
| HUGO  | 08-08-2008       |



![Comandos SELECT2](sql/select2.png)
<br>

Eliminando duplicatas nas consultas.

Há casos em eu não desejamos que a consulta retorne valores repetidos, chamados de duplicatas.

Por exemplo: na tabela original, nós tínhamos uma coluna CIDADES e ela possui alguns valores repetidos, se desejamos saber quais as cidades de origem dos alunos cadastrados, não é necessário e nem desejável que as cidades se repitam no retorno da consulta.

Notem que essa é a nossa tabela original de referência! Ora, o resultado retornou cheio de duplicatas!
Já imaginaram se essa tabela contivesse 1000 registros? Ficaria inviável!

Queremos saber apenas quais são as cidades, sem repetições.

### *Sintaxe do comando SELECT DISTINCT

```sql
-- AS CLÁUSULAS SÃO OPCIONAIS
SELECT DISTINCT LISTA_DE_COLUNAS 
FROM LISTA_DE_TABELAS 
CLAUSULAS;
```


### Exemplo do comando

```sql
SELECT DISTINCT CIDADE FROM ALUNO_ESTRATEGIA;
```

Notem que os registro duplicados foram eliminados porque essa palavra-chave ajuda a selecionar apenas registros distintos (DISTINCT).

### Resultado do Comando


| CIDADE   |
|----------|
| BRASÍLIA |
| SÃO PAULO|
| GOIÂNIA  |
| SALVADOR |


E o Alias??!!

É um recurso utilizado para dar a uma tabela (ou a uma coluna de uma tabela) um nome temporário com o intuito de tornar os nomes das colunas mais legíveis, ou para retirar ambiguidades de consultas, como veremos mais tarde. Existe apenas durante a determinada consulta e é criado por meio da palavra-chave AS (que pode ser omitida).

Vamos ver como é a sua sintaxe:

### Sintaxe do comando (Aliases / Apelidos)

```sql
-- ALIAS PARA O NOME DA TABELA
SELECT NOME_COLUNA 
FROM NOME_DA_TABELA AS APELIDO 
CLAUSULAS;

-- ALIAS PARA O NOME DA COLUNA
SELECT NOME_COLUNA AS APELIDO 
FROM NOME_DA_TABELA 
CLAUSULAS;
```

### Exemplo do comando

```sql
SELECT NOME AS N, DATA_NASCIMENTO AS DN 
FROM ALUNO_ESTRATEGIA AS AE;
```

Vejam que demos apelidos pequenos, o que pode facilitar bastante!

Em geral, esse recurso é muito útil quando existe mais de uma tabela envolvida em uma consulta; quando funções são utilizadas dentro de uma consulta; quando nomes de colunas são muito grandes ou pouco intuitivos; e quando duas ou mais colunas são combinadas em uma só.

Podemos ainda inserir constantes em vez de nomes de tabelas. Por exemplo, podemos pedir para a consulta retornar uma constante para cada registro da tabela:

### QUESTÕES

**34) (UFFS)** Qual alternativa informa uma seleção de todas as colunas da tabela USUARIO no banco de dados?
a) SELECT % FROM USUARIO
b) SELECT *.* FROM USUARIO
c) SELECT @ FROM USUARIO
d) SELECT # FROM USUARIO
e) SELECT * FROM USUARIO

Resposta Letra E

**35) (ALGÁS)** Os operadores de Seleção, Projeção e Produto Cartesiano da álgebra relacional são implementados, respectivamente, através das seguintes cláusulas SQL:
a) Select, From e Where, respectivamente.
b) Where, Select e From, respectivamente.
c) Where, From e Select, respectivamente.
d) Select, From e Product, respectivamente.
e) Where, Select e Join, respectivamente.

Resposta Letra B

**36) (UFPA)** O comando SQL utilizado para exibir dados sem repetição em um banco de dados é o:
a) SELECT DISTINCT.
b) SELECT INDIVIDUAL.
c) EXTRACT ONE.
d) EXTRACT ONLYDIFFERENT.
e) RESUME SINGLE.

Resposta Letra A

![Comandos SQL](sql/comando_sql.png)

<br>

Vamos agora começar a estudar as cláusulas do SQL e isso vai exigir MUITA atenção!!

![Comandos SQL](sql/comando_sql.png)

FROM: ela especifica de onde (quais tabelas) devemos selecionar os dados.

```sql
SELECT LISTA_DE_COLUNAS FROM TABELA1, TABELA2, ... CLAUSULAS;
```

Observem que é possível especificar mais de uma tabela separada por *v* **vírgula** e que, quando isso ocorre, temos um **Produto Cartesiano**.

```sql
SELECT * FROM TABELA_PROFESSOR, TABELA_DISCIPLINA;
```

![Produto Cartesiano](sql/produto_cartesiano.png)

Notem que as colunas da tabela resultante é basicamente a união das colunas das tabelas especificadas, uma vez que utilizamos o asterisco (*).

Já linhas da tabela resultante é basicamente uma combinação de todas as linhas de uma tabela com todas as linhas de outra.

Chama-se produto cartesiano justamente porque o resultado é um produto, isto é, o número de linhas de uma tabela (3) vezes o número de linhas de outra tabela (2) retorna uma tabela resultante com 3x2 = 6 linhas.

*vbg* **Produto carteseano = a MERGE das tabelas envolvidas**

Agora vejam como as coisas se relacionam: quando fazemos combinações entre tabelas, os apelidos (alias) se tornam extremamente úteis, visto que, eventualmente, podemos fazer o produto de duas ou mais tabelas que possuem atributos com o mesmo nome.

Imagine o produto cartesiano entre uma tabela chamada PRODUTO e outra tabela chamada EMPRESA e imagine que ambas as tabelas possuem uma coluna chamada CÓDIGO.

Observe que, nesse caso, a tabela resultante teria duas colunas com o mesmo nome. Para evitar esse tipo de problema e reduzir a ambiguidade, utilizam-se os alias.

Podemos chamar a tabela **PRODUTO de P** e a tabela **EMPRESA de E** e, dessa forma, a tabela resultante teria uma coluna P.CODIGO e outra coluna chamada E.CODIGO e não temos mais ambiguidade.

<br>

## JOIN

Essa cláusula é utilizada para combinar linhas/registros de duas ou mais tabelas, com base em **uma COLUNA** em comum **entre elas**.

Podem ser de cinco tipos diferentes:

![Join](sql/join.png)

| TIPO DE JOIN       | DESCRIÇÃO     |
|--------------------|---------------|
| **INNER JOIN**     | Retorna registros que possuem **valores correspondentes em ambas as tabelas**.                    |
| **LEFT JOIN**      | Retorna todos os registros da tabela da **esquerda** e seus correspondentes da **tabela da direita**. |
| **RIGHT JOIN**     | Retorna todos os registros da tabela da **direita** e seus correspondentes da **tabela da esquerda**. |
| **FULL OUTER JOIN**| Retorna todos os registros quando há correspondência na tabela da esquerda ou da direita.     |
| **SELF JOIN**      | Join comum que relaciona registros de uma **tabela com ela mesma**.                                |


*b* **O INNER JOIN (ou apenas JOIN)** → é uma cláusula que seleciona registros que contenham valores correspondentes em ambas as tabelas.

```sql
SELECT NOME_DAS_COLUNAS
FROM TABELA1
INNER JOIN TABELA2
ON TABELA1.NOME_COLUNA = TABELA2.NOME_COLUNA;
```

### Tabela: PEDIDOS

| *b* **ID PEDIDO** | *v* **ID CLIENTE** | ID FUNCIONARIO | DATA       | ID ENTREGADOR |
|-----------|-------------|----------------|------------|----------------|
| 10308     | 2           | 7              | 18/09/1996 | 3              |
| 10309     | 37          | 3              | 19/09/1996 | 1              |
| 10310     | 77          | 8              | 20/09/1996 | 2              |


### Tabela: CLIENTES


| *v* **ID CLIENTE** | *b* **NOME CLIENTE** | ID INDICACAO | ENDERECO   | CIDADE  | CEP       | PAIS    |
|------------|---------------|--------------|------------|---------|-----------|---------|
| 1          | Alfredo       | 2            | Rua X, 58  | Berlin  | 70.000-00 | Alemanha |
| 2          | Ana           | 3            | Rua Y, 72  | Miami   | 71.000-00 | EUA      |
| 3          | Antonio       | 3            | Rua Z, 94  | Tijuana | 72.000-00 | Mexico   |


### Exemplo do comando

```sql
SELECT PEDIDOS.ID_PEDIDO, CLIENTES.NOME_CLIENTE
FROM PEDIDOS
INNER JOIN CLIENTES
ON PEDIDOS.ID_CLIENTE = CLIENTES.ID_CLIENTE;
```

O que esse comando está nos dizendo?

Ele está nos dizendo para selecionar (SELECT) todas as linhas de ambas as tabelas (FROM PEDIDOS INNER JOIN CLIENTES) desde que exista uma correspondência entre as colunas (ON PEDIDOS.ID_CLIENTE = CLIENTES.ID_CLIENTE)
e, após isso, retornar as colunas PEDIDOS.ID_PEDIDO e CLIENTES.NOME_CLIENTE.

O resultado é apresentado na tabela a seguir:

![Inner Join](sql/inner_join.png)

*vbg* **É uma intersecão entre tabela PEDIDOS e tabela CLIENTES!**

Note que a coluna em comum é **ID_CLIENTE**.

A tabela PEDIDOS possui três valores para essa coluna: [2, 37, 77]; já a tabela CLIENTES também possui três valores para essa coluna: [1, 2, 3].

A tabela PEDIDOS possui três valores para essa coluna: [2, 37, 77]; já a tabela CLIENTES também possui três valores para essa coluna: [1, 2, 3].

Como se trata de um INNER JOIN, a tabela resultante retornará apenas os registros que possuem correspondência em ambas as tabelas.

Qual é o valor comum entre as tabelas? **É o 2, que corresponde à cliente Ana.**

Lembrando também que é possível fazer um INNER JOIN com mais de duas tabelas, conforme mostra o exemplo seguinte (com três tabelas):

```sql
SELECT PEDIDOS.ID_PEDIDO, CLIENTES.NOME_CLIENTE, ENTREGADORES.NOME_ENTREGADOR
FROM ((PEDIDOS
INNER JOIN CLIENTES ON PEDIDOS.ID_CLIENTE = CLIENTES.ID_CLIENTE)
INNER JOIN ENTREGADORES ON PEDIDOS.ID_ENTREGADOR = ENTREGADORES.ID_ENTREGADOR);
```

Observem que as tabelas que compõem um INNER JOIN devem possuir uma **COLUNA** em comum que *v* **podem possuir o mesmo nome, mas isso não é obrigatório**. Caso elas possuam o mesmo nome, é possível utilizar a palavra-chave *b* **USING** **para melhorar a leitura do código e sua compreensão**.

```sql
SELECT LISTA_DE_COLUNAS
FROM TABELA1
INNER JOIN TABELA2
USING (NOME_COLUNA_COMUM);
```

```sql
SELECT PEDIDOS.ID_PEDIDO, CLIENTES.NOME_CLIENTE
FROM PEDIDOS
INNER JOIN CLIENTES
USING (ID_CLIENTE);
```
<br>

## O LEFT JOIN (ou LEFT OUTER JOIN)

O LEFT JOIN (ou LEFT OUTER JOIN) → retorna todos os registros da tabela da esquerda, além dos registros correspondentes da tabela da direita.

```sql
SELECT LISTA_DE_COLUNAS
FROM TABELA1
LEFT JOIN TABELA2
ON TABELA1.NOME_COLUNA = TABELA2.NOME_COLUNA;
```

```sql
SELECT PEDIDOS.ID_PEDIDO, CLIENTES.NOME_CLIENTE
FROM PEDIDOS
LEFT JOIN CLIENTES
ON PEDIDOS.ID_CLIENTE = CLIENTES.ID_CLIENTE;
```

### Tabela: PEDIDOS

| *b* **ID PEDIDO** | *v* **ID CLIENTE** | ID FUNCIONARIO | DATA       | ID ENTREGADOR |
|-----------|-------------|----------------|------------|----------------|
| 10308     | 2           | 7              | 18/09/1996 | 3              |
| 10309     | 37          | 3              | 19/09/1996 | 1              |
| 10310     | 77          | 8              | 20/09/1996 | 2              |


### Tabela: CLIENTES


| *v* **ID CLIENTE** | *b* **NOME CLIENTE** | ID INDICACAO | ENDERECO   | CIDADE  | CEP       | PAIS    |
|------------|---------------|--------------|------------|---------|-----------|---------|
| 1          | Alfredo       | 2            | Rua X, 58  | Berlin  | 70.000-00 | Alemanha |
| 2          | Ana           | 3            | Rua Y, 72  | Miami   | 71.000-00 | EUA      |
| 3          | Antonio       | 3            | Rua Z, 94  | Tijuana | 72.000-00 | Mexico   |

Como se trata de um LEFT JOIN, a tabela resultante retornará todos os registros da tabela da esquerda e seus valores correspondentes da tabela da direita (se houver).

O que esse comando está nos dizendo?

Ele está nos dizendo para selecionar (SELECT) todas as linhas da tabela da esquerda (FROM PEDIDOS LEFT JOIN), além dos registros da tabela da direita (CLIENTES) desde que exista uma correspondência entre as colunas (ON PEDIDOS.ID_CLIENTE = CLIENTES.ID_CLIENTE) e, após isso, retornar as colunas PEDIDOS.ID_PEDIDO e CLIENTES.NOME_CLIENTE.

![Left Join](sql/left_join.png)

Note que a coluna em comum é ID_CLIENTE.

A tabela PEDIDOS possui três valores para essa coluna: [2, 37, 77]; já a tabela CLIENTES também possui três valores para essa coluna: [1, 2, 3].

Como se trata de um LEFT JOIN, a tabela resultante retornará todos os registros da tabela da esquerda e seus valores correspondentes da tabela da direita (se houver).

## O RIGHT JOIN (ou RIGHT OUTER JOIN) 

O RIGHT JOIN (ou RIGHT OUTER JOIN) --> retorna todos os registros da tabela da direita, além dos registros correspondentes da tabela da esquerda.

```sql
SELECT NOME_DAS_COLUNAS
FROM TABELA1
RIGHT JOIN TABELA2
ON TABELA1.NOME_COLUNA = TABELA2.NOME_COLUNA;
```

```sql
SELECT PEDIDOS.ID_PEDIDO, CLIENTES.NOME_CLIENTE
FROM PEDIDOS
RIGHT JOIN CLIENTES
ON PEDIDOS.ID_CLIENTE = CLIENTES.ID_CLIENTE;
```

O que esse comando está nos dizendo?

Ele está nos dizendo para selecionar (SELECT) todas as linhas da tabela da direita (CLIENTES), além dos registros da tabela da esquerda (FROM PEDIDOS RIGHT JOIN) desde que exista uma correspondência entre as colunas (ON
PEDIDOS.ID_CLIENTE = CLIENTES.ID_CLIENTE) e, após isso, retornar as colunas PEDIDOS.ID_PEDIDO e CLIENTES.

O resultado é apresentado na tabela a seguir:

![Right Join](sql/right_join.png)

Note que a coluna em comum é ID_CLIENTE. A tabela PEDIDOS possui três valores para essa coluna: [2, 37, 77]; já a tabela CLIENTES também possui três valores para essa coluna: [1, 2, 3].

Como se trata de um RIGHT JOIN, a tabela resultante retornará todos os registros da tabela da direita e seus valores correspondentes da tabela da esquerda (se houver).

## O FULL JOIN (ou FULL OUTER JOIN) 

O FULL JOIN (ou FULL OUTER JOIN) → retorna todos os registros quando há uma correspondência da tabela esquerda com a direita ou da direita com a esquerda.

```sql
SELECT NOME_DAS_COLUNAS
FROM TABELA1
FULL OUTER JOIN TABELA2
ON TABELA1.NOME_COLUNA = TABELA2.NOME_COLUNA;
```

```sql
SELECT PEDIDOS.ID_PEDIDO, CLIENTES.NOME_CLIENTE
FROM PEDIDOS
FULL OUTER JOIN CLIENTES
ON PEDIDOS.ID_CLIENTE = CLIENTES.ID_CLIENTE;
```

O que esse comando está nos dizendo?

Ele está nos dizendo para selecionar (SELECT) todas as linhas da tabela da direita e da esquerda (FROM PEDIDOS FULL OUTER JOIN CLIENTES) desde que exista uma correspondência entre as colunas (ON PEDIDOS.ID_CLIENTE = CLIENTES.ID_CLIENTE) e, após isso, retornar as colunas PEDIDOS.ID_PEDIDO e CLIENTES.NOME_CLIENTE.

O resultado é apresentado na tabela a seguir:

![Full Outer Join](sql/fullouterjoin.png)

Note que a coluna em comum é ID_CLIENTE. A tabela PEDIDOS possui três valores para essa coluna: [2, 37, 77]; já a tabela CLIENTES também possui três valores para essa coluna: [1, 2, 3].

Como se trata de um FULL OUTER JOIN, a tabela resultante retornará todos os registros da tabela da direita e da esquerda e seus valores correspondentes (se houver).

## O SELF JOIN 

O SELF JOIN → Relaciona uma tabela consigo mesma é um auto-relacionamento.

![Self Join](sql/self_join.png)

Deem uma olhadinha para as três primeiras colunas da tabela e observem que a tabela de clientes armazena dados sobre quem foi o cliente que realizou a indicação.

É possível concluir, por exemplo, que Alfredo (1) foi indicado por Ana (2), Ana (2) foi indicada por Antonio (3) e Antonio (3) não foi indicado por ninguém (NULL). 

Nesse caso, o SELF JOIN retornará quem foi o cliente que indicou outro cliente.

Vamos ver um exemplo:

```sql
SELECT C1.NOME_CLIENTE AS CLIENTE_INDICADOR, C2.NOME_CLIENTE AS CLIENTE_INDICADO
FROM CLIENTES C1
JOIN CLIENTES C2
ON C1.ID_CLIENTE = C2.ID_INDICACAO;
```
O resultado é apresentado na tabela a seguir:

![Self Join](sql/self_join_cliente_indicado.png)

## WHERE

WHERE → Essa cláusula é responsável por permitir a filtragem dos registros de uma tabela por meio de uma ou mais condições.

Lembremos da nossa tabela ALUNO_ESTRATEGIA

| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| ALICE | 11111111111  | ALICE@ALICE.COM  | 01-01-2001       | BRASÍLIA  | 200.00     |
| BRUNO | 22222222222  | BRUNO@BRUNO.COM  | 02-02-2002       | SÃO PAULO | 100.00     |
| CAIO  | 33333333333  | CAIO@CAIO.COM    | 03-03-2003       | GOIÂNIA   | 150.00     |
| DIEGO | 44444444444  | DIOGO@DIOGO.COM  | 04-04-2004       | SALVADOR  | 250.00     |
| ELIS  | 55555555555  | ELIS@ELIS.COM    | 05-05-2005       | BRASÍLIA  | 50.00      |
| FABIO | 66666666666  | FABIO@FABIO.COM  | 06-06-2006       | SALVADOR  | 125.00     |
| GABI  | 77777777777  | GABI@GABI.COM    | 07-07-2007       | BRASÍLIA  | 225.00     |
| HUGO  | 88888888888  | HUGO@HUGO.COM    | 08-08-2008       | BRASÍLIA  | 50.00      |


Ao aplicarmos o comando:

```sql
SELECT NOME_COLUNA1, NOME_COLUNA2, ...
FROM NOME_DA_TABELA1
WHERE CONDICAO;
```

```sql
SELECT *
FROM ALUNO_ESTRATEGIA
WHERE CIDADE = 'BRASÍLIA';
```
| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| ALICE | 11111111111  | ALICE@ALICE.COM  | 01-01-2001       | BRASÍLIA  | 200.00     |
| ELIS  | 55555555555  | ELIS@ELIS.COM    | 05-05-2005       | BRASÍLIA  | 50.00      |
| GABI  | 77777777777  | GABI@GABI.COM    | 07-07-2007       | BRASÍLIA  | 225.00     |
| HUGO  | 88888888888  | HUGO@HUGO.COM    | 08-08-2008       | BRASÍLIA  | 50.00      |


Essa cláusula pode ser usada com os comando SELECT, UPDATE e DELETE.

A condição é uma expressão booleana que retornará um valor TRUE ou FALSE. Existem diversas maneiras de definir uma condição utilizando operadores relacionais e lógicos para comparar valores.

| OPERADOR | DESCRIÇÃO | EXEMPLO |
| :--- | :--- | :--- |
| **=** | IGUAL | ... WHERE NOME = 'DIEGO'; |
| **>** | MAIOR | ... WHERE VALOR_PAGO > 1000.00; |
| **>=** | MAIOR OU IGUAL | ... WHERE IDADE >= 18; |
| **<** | MENOR | ... WHERE DATA_NASCIMENTO < '01/01/2000'; |
| **<=** | MENOR OU IGUAL | ... WHERE VELOCIDADE <= 100; |
| **<>** | DIFERENTE | ... WHERE CIDADE <> 'São Paulo'; |

<br>

Os operadores lógicos são um pouco mais complexos, logo vamos vê-los com um pouco mais de detalhes.

Vamos começar pelos operadores AND, OR e NOT!

Os dois primeiros são utilizados para filtrar registros baseado em mais de uma condição, de forma que o AND exibe um registro se todas as condições separadas por ele forem verdadeiras; e o OR exibe um registro se qualquer uma das condições separadas por ele for verdadeira.

Já o NOT é basicamente uma negação que inverte o significado de um operador lógico.

Vamos ver a sintaxe de cada um e seus respectivos exemplos.

### Tabela Verdade – Operador AND

| A | B | C (= A AND B) |
|---|---|----------------|
| V | V | V              |
| V | F | F              |
| F | V | F              |
| F | F | F              |

### Tabela Verdade – Operador OR

| A | B | C (= A OR B) |
|---|---|---------------|
| V | V | V             |
| V | F | V             |
| F | V | V             |
| F | F | F             |

### Tabela Verdade – Operador NOT

| A | NOT A |
|---|--------|
| V | F      |
| F | V      |

## AND

```sql
SELECT NOME_COLUNA1, NOME_COLUNA2, ...
FROM NOME_DA_TABELA1
WHERE CONDICAO AND CONDICAO2 AND CONDICAO3 ... ;
```

```sql
SELECT *
FROM ALUNO_ESTRATEGIA
WHERE CIDADE = 'SALVADOR' AND VALOR_PAGO >= 200.00 ;
```

Vejam que o resultado filtrou a tabela original, retornando apenas os registros cuja cidade era Salvador E cujo valor pago foi maior ou igual a 250.00.

| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| DIEGO | 44444444444  | DIOGO@DIOGO.COM  | 04-04-2004       | SALVADOR  | 250.00     |


## OR

```sql
SELECT NOME_COLUNA1, NOME_COLUNA2, ...
FROM NOME_DA_TABELA1
WHERE CONDICAO OR CONDICAO2 OR CONDICAO3 ... ;
```

```sql
SELECT *
FROM ALUNO_ESTRATEGIA
WHERE CIDADE = 'SALVADOR' OR VALOR_PAGO >= 200.00 ;
```

| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| ALICE | 11111111111  | ALICE@ALICE.COM  | 01-01-2001       | BRASÍLIA  | 200.00     |
| DIEGO | 44444444444  | DIOGO@DIOGO.COM  | 04-04-2004       | SALVADOR  | 250.00     |
| FABIO | 66666666666  | FABIO@FABIO.COM  | 06-06-2006       | SALVADOR  | 125.00     |
| GABI  | 77777777777  | GABI@GABI.COM    | 07-07-2007       | BRASÍLIA  | 225.00     |

## NOT
```sql
SELECT NOME_COLUNA1, NOME_COLUNA2, ...
FROM NOME_DA_TABELA1
WHERE NOT CONDICAO1;
```

```sql
SELECT *
FROM ALUNO_ESTRATEGIA
WHERE NOT CIDADE = 'BRASÍLIA' ;
```

Vejam que o resultado filtrou a tabela original, retornando apenas os registros cuja cidade NÃO era Brasília, tanto que ele retorna registros com São Paulo, Goiânia e Salvador.

| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| BRUNO | 22222222222  | BRUNO@BRUNO.COM  | 02-02-2002       | SÃO PAULO | 100.00     |
| CAIO  | 33333333333  | CAIO@CAIO.COM    | 03-03-2003       | GOIÂNIA   | 150.00     |
| DIEGO | 44444444444  | DIOGO@DIOGO.COM  | 04-04-2004       | SALVADOR  | 250.00     |
| FABIO | 66666666666  | FABIO@FABIO.COM  | 06-06-2006       | SALVADOR  | 125.00     |


Observem que todos esses operadores podem ser combinados entre si.

## BETWEEN
```sql
SELECT NOME_COLUNA1, NOME_COLUNA2, ...
FROM NOME_DA_TABELA1
WHERE NOME_COLUNA1 BETWEEN VALOR1 AND VALOR2;
```

```sql
SELECT *
FROM ALUNO_ESTRATEGIA
WHERE VALOR_PAGO BETWEEN 150.00 AND 300.00;
```

O BETWEEN permite selecionar valores (números, textos ou datas) dentro de um determinado intervalo, incluindo as extremidades.

Observem que o resultado contém valores entre 150.00 e 300.00 incluindo o 150.00 e 300.00.

Por essa razão, retornou o registro cujo nome é Caio!

Lembrando que é possível combinar esse operador com outros operadores, além de poder utilizá-lo também com textos ou datas.

| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| ALICE | 11111111111  | ALICE@ALICE.COM  | 01-01-2001       | BRASÍLIA  | 200.00     |
| CAIO  | 33333333333  | CAIO@CAIO.COM    | 03-03-2003       | GOIÂNIA   | 150.00     |
| DIEGO | 44444444444  | DIOGO@DIOGO.COM  | 04-04-2004       | SALVADOR  | 250.00     |
| GABI  | 77777777777  | GABI@GABI.COM    | 07-07-2007       | BRASÍLIA  | 225.00     |

## LIKE

O LIKE é utilizado em uma cláusula WHERE para pesquisar um padrão especificado em uma coluna por meio da utilização de caracteres curingas (wildcards) que são utilizados para substituir um ou mais caracteres em uma string (cadeia de caracteres).

Existem diversos caracteres curingas que variam a depender do SGBD, mas os dois caracteres curingas principais são:

sinal de porcentagem (%) → substitui zero, um ou mais caracteres
sinal de sublinhado (_) → substitui um único caractere

Vejamos a sintaxe:

```sql
SELECT NOME_COLUNA1, NOME_COLUNA2, ...
FROM NOME_DA_TABELA1
WHERE NOME_COLUNA1 LIKE PADRAO;
```

| **OPERADOR**              | **DESCRIÇÃO**                                                           |
|---------------------------|-------------------------------------------------------------------------|
| `... WHERE NOME LIKE 'A%'`   | Retorna valores que comecem com “A”.                                   |
| `... WHERE NOME LIKE '%A'`   | Retorna valores que terminem com “A”.                                  |
| `... WHERE NOME LIKE '%IO%'` | Retorna valores que possuam “IO” em qualquer posição.                  |
| `... WHERE NOME LIKE '_R%'`  | Retorna valores que possuam um caractere e depois a letra “R”.         |
| `... WHERE NOME LIKE '%A_'`  | Retorna valores que terminem com “A” mais apenas um caractere.         |
| `... WHERE NOME LIKE 'A_%'`  | Retorna valores que comecem com “A” e possuam ao menos 3 caracteres.   |
| `... WHERE NOME LIKE '%A%O'` | Retorna valores que possuam “A” depois “O” (imediatamente ou não).     |


### Exemplos de Palavras Aceitas e Rejeitadas pelos Operadores LIKE

Vejamos – para cada operador curinga – quais palavras poderiam ser aceitas
(em verde) e quais não poderiam (em vermelho):

| **OPERADOR**        | **ACEITAS (VERDE)**                                                                 | **REJEITADAS (VERMELHO)**     |
|---------------------|--------------------------------------------------------------------------------------|-------------------------------|
| LIKE '%A'         | A • BOLA • PERSPECTIVA • GLÓRIA                                                      | PUXAR • ARCO                  |
| LIKE 'A%'        | A • ACRÉSCIMO • ALVENARIA • ARCO                                                     | BOLA • PUXAR                  |
| LIKE '%IO%'       | IO • CAIO • DIOGO • FABIO                                                            | ELIAS • LOURA                 |
| LIKE '_R%'        | ARCO • IRMÃ • ORATÓRIA • URANIO                                                      | PUXAR • BARCO                 |
| LIKE '%A '        | AR • ARMAS • AURICULAR • BAÚ                                                         | A • ALÔ                       |
| LIKE 'A_%'        | AVÔ • AVERIGUAR • ALÔ • AMOR                                                         | AR • A                        |
| LIKE '%A%O'       | LAGO • AVÔ • AO • AVERIGUADO                                                         | LOBA • PIVOTAR                |


Dada a nossa clássica tabela apresentada abaixo, vamos ver como seriam diversos exemplos de comandos utilizando o operador LIKE e seus caracteres curingas:


```sql
SELECT *
FROM ALUNO_ESTRATEGIA
WHERE NOME LIKE 'A%';
```
| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| ALICE | 11111111111  | ALICE@ALICE.COM  | 01-01-2001       | BRASÍLIA  | 200.00     |


| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| ALICE | 11111111111  | ALICE@ALICE.COM  | 01-01-2001       | BRASÍLIA  | 200.00     |
| BRUNO | 22222222222  | BRUNO@BRUNO.COM  | 02-02-2002       | SÃO PAULO | 100.00     |
| CAIO  | 33333333333  | CAIO@CAIO.COM    | 03-03-2003       | GOIÂNIA   | 150.00     |
| DIEGO | 44444444444  | DIOGO@DIOGO.COM  | 04-04-2004       | SALVADOR  | 250.00     |
| ELIS  | 55555555555  | ELIS@ELIS.COM    | 05-05-2005       | BRASÍLIA  | 50.00      |
| FABIO | 66666666666  | FABIO@FABIO.COM  | 06-06-2006       | SALVADOR  | 125.00     |
| GABI  | 77777777777  | GABI@GABI.COM    | 07-07-2007       | BRASÍLIA  | 225.00     |
| HUGO  | 88888888888  | HUGO@HUGO.COM    | 08-08-2008       | BRASÍLIA  | 50.00      |

```sql
SELECT *
FROM ALUNO_ESTRATEGIA
WHERE NOME LIKE '%IO';
```

### RESPOSTA

| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| CAIO  | 33333333333  | CAIO@CAIO.COM    | 03-03-2003       | GOIÂNIA   | 150.00     |
| FABIO | 66666666666  | FABIO@FABIO.COM  | 06-06-2006       | SALVADOR  | 125.00     |

```sql
SELECT *
FROM ALUNO_ESTRATEGIA
WHERE NOME LIKE '_R%';
```

### RESPOSTA

| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| BRUNO | 22222222222  | BRUNO@BRUNO.COM  | 02-02-2002       | SÃO PAULO | 100.00     |

```sql
SELECT *
FROM ALUNO_ESTRATEGIA
WHERE NOME LIKE '%A_';
```

*vbg* **VAZIO**

```sql
SELECT *
FROM ALUNO_ESTRATEGIA
WHERE NOME LIKE 'A__%';
```
| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| ALICE | 11111111111  | ALICE@ALICE.COM  | 01-01-2001       | BRASÍLIA  | 200.00     |


```sql
SELECT *
FROM ALUNO_ESTRATEGIA
WHERE NOME LIKE '%A%O';
```

| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| CAIO  | 33333333333  | CAIO@CAIO.COM    | 03-03-2003       | GOIÂNIA   | 150.00     |
| FABIO | 66666666666  | FABIO@FABIO.COM  | 06-06-2006       | SALVADOR  | 125.00     |

## IS NULL e IS NOT NULL

São operadores utilizados para avaliar se uma coluna é nula ou não, pois **os operadores relacionais** *v* **não podem** ser utilizados para comparar valores nulos, caso sejam utilizados para isso *v* **não gerará erro, mas retornará vazio**.

*vbg* **não pode usar operadores ex, '= NULL' pois o resultado vazio!!**
```sql
SELECT NOME_COLUNA1, NOME_COLUNA2, ...
FROM NOME_DA_TABELA1
WHERE NOME_COLUNA1 IS NULL;
```

```sql
SELECT NOME_COLUNA1, NOME_COLUNA2, ...
FROM NOME_DA_TABELA1
WHERE NOME_COLUNA1 IS NOT NULL;
```

## IN e NOT IN

Permitem especificar múltiplos valores dentro de uma cláusula WHERE.

```sql
SELECT NOME_COLUNA1, NOME_COLUNA2, ...
FROM NOME_DA_TABELA1
WHERE NOME_COLUNA1 IN (VALOR1, VALOR2, ...);
```

```sql
SELECT *
FROM ALUNO_ESTRATEGIA
WHERE CIDADE IN ('SALVADOR', 'GOINIA');
```

| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| CAIO  | 33333333333  | CAIO@CAIO.COM    | 03-03-2003       | GOIÂNIA   | 150.00     |
| DIEGO | 44444444444  | DIOGO@DIOGO.COM  | 04-04-2004       | SALVADOR  | 250.00     |
| FABIO | 66666666666  | FABIO@FABIO.COM  | 06-06-2006       | SALVADOR  | 125.00     |

Note que esse comando retorna todas as colunas da tabela em que a cidade seja Salvador OU Goiânia. Aliás, esse operador é como a abreviação para várias condições OR. Vamos comparar:

```sql
SELECT *
FROM ALUNO_ESTRATEGIA
WHERE CIDADE = 'SALVADOR' OR CIDADE = 'GOIANIA';
```

```sql
SELECT *
FROM ALUNO_ESTRATEGIA
WHERE CIDADE IN ('SALVADOR', 'GOINIA');
```

Com o operador IN podemos ter o aninhamento de consultas, ou seja uma consulta dentro da outra que se torna uma subconsulta.

```sql
SELECT NOME_COLUNA1, NOME_COLUNA2, ...
FROM NOME_DA_TABELA1
WHERE NOME_COLUNA1 IN (SELECT ... FROM ...);
```

Podem ser de dois tipos:

*b* **Correlacionadas →** são consultas que dependem e fazem referências às colunas de consultas externas a qual estão contidas as subconsultas correlacionadas ;

*b* **Não correlacionadas →** são consultas independentes das consultas externas nas quais estão contidas.


Vamos usar essas tabelas como exemplos:

### CAPITAIS

| **CODIGO**| **CAPITAL**  | **ESTADO**        | **SIGLA** | **REGIAO**     |
|-----------|--------------|-------------------|-----------|----------------|
| 001       | MACEIÓ       | ALAGOAS           | AL        | NORDESTE       |
| 002       | **SALVADOR** | BAHIA             | BA        | NORDESTE       |
| 003       | BELÉM        | PARÁ              | PA        | NORTE          |
| 004       | MANAUS       | AMAZONAS          | AM        | NORTE          |
| 005       | **GOIÂNIA**  | GOIÁS             | GO        | CENTRO-OESTE   |
| 006       | SÃO LUIS     | MARANHÃO          | MA        | NORDESTE       |
| 007       | CURITIBA     | PARANÁ            | PR        | SUL            |
| 008       | PORTO ALEGRE | RIO GRANDE DO SUL | RS        | SUL            |

### ALUNO_ESTRATEGIA

| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| ALICE | 11111111111  | ALICE@ALICE.COM  | 01-01-2001       | BRASÍLIA  | 200.00     |
| BRUNO | 22222222222  | BRUNO@BRUNO.COM  | 02-02-2002       | SÃO PAULO | 100.00     |
| CAIO  | 33333333333  | CAIO@CAIO.COM    | 03-03-2003       | GOIÂNIA   | 150.00     |
| DIEGO | 44444444444  | DIOGO@DIOGO.COM  | 04-04-2004       | SALVADOR  | 250.00     |
| ELIS  | 55555555555  | ELIS@ELIS.COM    | 05-05-2005       | BRASÍLIA  | 50.00      |
| FABIO | 66666666666  | FABIO@FABIO.COM  | 06-06-2006       | SALVADOR  | 125.00     |
| GABI  | 77777777777  | GABI@GABI.COM    | 07-07-2007       | BRASÍLIA  | 225.00     |
| HUGO  | 88888888888  | HUGO@HUGO.COM    | 08-08-2008       | BRASÍLIA  | 50.00      |


Esse caso trata de uma subconsulta não correlacionada.

Note que primeiro executamos a consulta interna *b* **(SELECT CAPITAL FROM CAPITAIS)** e depoios executamos a consulta externa.

```sql
SELECT *
FROM ALUNO_ESTRATEGIA
WHERE CIDADE IN (SELECT CAPITAL FROM CAPITAIS);
```

Observe que ela retornará todas as colunas da tabela ALUNO_ESTRATEGIA em que a cidade esteja dentre as cidades da tabela acima:

| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| CAIO  | 33333333333  | CAIO@CAIO.COM    | 03-03-2003       | GOIÂNIA   | 150.00     |
| DIEGO | 44444444444  | DIOGO@DIOGO.COM  | 04-04-2004       | SALVADOR  | 250.00     |
| FABIO | 66666666666  | FABIO@FABIO.COM  | 06-06-2006       | SALVADOR  | 125.00     |

*vbg* **Já a subconsulta correlacionada será explicada dentro do contexto do operador EXIST**

## EXISTS

Testa a existência de qualquer registro em uma subconsulta. Ele retorna TRUE se a subconsulta retornar um ou mais registros; caso contrário, retorna FALSE.

```sql
SELECT NOME_COLUNA1, NOME_COLUNA2, ...
FROM NOME_DA_TABELA1
WHERE EXISTS (SELECT ... FROM ... WHERE ...);
```

```sql
SELECT *
FROM CAPITAIS C
WHERE EXISTS (SELECT CIDADE FROM ALUNO_ESTRATEGIA AE WHERE AE.CIDADE = C.CAPITAL);
```
| **CODIGO**| **CAPITAL**  | **ESTADO**        | **SIGLA** | **REGIAO**     |
|-----------|--------------|-------------------|-----------|----------------|
| 002       | **SALVADOR** | BAHIA             | BA        | NORDESTE       |
| 005       | **GOIÂNIA**  | GOIÁS             | GO        | CENTRO-OESTE   |


Note que esse comando retorna todos os registros da tabela de CAPITAIS desde que a capital exista como uma das cidades da tabela ALUNO_ESTRATEGIA.

Esse é um clássico exemplo de subconsulta correlacionada.

Ao contrário da subconsulta não correlacionada, essa não pode ser executada independentemente da consulta externa, dado que contém uma ou mais referências a colunas da consulta externa.

Inclusive, ela retornará erro caso se tente executá-la de forma independente.

Uma subconsulta correlacionada (interna) será executada uma vez para cada linha candidata da consulta externa.

Os valores de cada linha da coluna candidata serão utilizados para fornecer valores para as colunas da consulta externa no interior de cada execução da subconsulta correlacionada.

Os resultados finais serão baseados nos resultados de cada execução da subconsulta correlacionada.

Considerem a tabela abaixo com a base para os exemplos que vamos analisar:


### ARVORE_GENEALOGICA

| **ASCENDENTE** | **DESCENDENTE** |
|----------------|-----------------|
| ALICE          | LAURA           |
| BRUNO          | ELIS            |
| BRUNO          | HUGO            |
| ELIS           | CAIO            |
| GABI           | ALICE           |
| HUGO           | GABI            |
| JUDITH         | LAURA           |

Vamos começar por meio da seguinte consulta:

```sql
SELECT *
FROM ARVORE_GENEALOGICA
WHERE EXISTS (SELECT * FROM ARVORE_GENEALOGICA AG
              WHERE AG.ASCENDENTE = 'BRUNO'
              AND AG.DESCENTENTE = ARVORE_GENEALOGICA.ASCENDENTE);
```

Em primeiro lugar, podemos notar que se trata de uma **consulta aninhada (aninhada = consulta dentro da outra)**, dado que temos uma consulta dentro de outra.

Em segundo lugar, podemos notar que a consulta interna é uma subconsulta **correlacionada (pq internamente faz referência a outra externa ARVORE_GENEALOGICA.ASCENDENTE 
**, dado que temos uma referência a uma coluna da consulta externa.

Dito isso, agora vamos analisar, para cada tupla da consulta externa, se a consulta interna retorna algum valor.

Se sim, retornaremos também para a consulta externa; caso contrário, não.

Observe que temos a consulta interna e a consulta externa tratando da mesma tabela, porém uma é chamada de ARVORE_GENEALOGICA e a outra tem um alias chamado AG:

### ARVORE_GENEALOGICA

| **ASCENDENTE** | **DESCENDENTE** |
|----------------|-----------------|
| ALICE          | LAURA           |
| BRUNO          | ELIS            |
| BRUNO          | HUGO            |
| ELIS           | CAIO            |
| GABI           | ALICE           |
| HUGO           | GABI            |
| JUDITH         | LAURA           |

### AG
| **ASCENDENTE** | **DESCENDENTE** |
|----------------|-----------------|
| ALICE          | LAURA           |
| BRUNO          | ELIS            |
| BRUNO          | HUGO            |
| ELIS           | CAIO            |
| GABI           | ALICE           |
| HUGO           | GABI            |
| JUDITH         | LAURA           |

Agora vamos pegar cada tupla da consulta externa e vamos validar a consulta interna, de modo que a tupla da consulta externa será retornada se, e somente se, a consulta interna retornar alguma tupla.

Perceba que a consulta interna retornará todas as tuplas da tabela AG desde que a coluna ASCENDENTE da tabela AG seja “Bruno” e a coluna DESCENDENTE da tabela AG seja igual à coluna ASCENDENTE da tabela ARVORE_GENEALOGICA.

Agora vamos para a prática:

![Comandos EXISTS](sql/exists1.png)

A primeira tupla da tabela da consulta externa é (ALICE, LAURA) e essa tupla será retornada apenas se a consulta interna retornar alguma tupla. Vamos ver se ela cretorna?

A primeira tupla da consulta interna também é (ALICE, LAURA), porém, a consulta interna só retornará essa tupla se AG.ASCENDENTE = “Bruno”.

Ora, acabamos de ver que, para essa tupla, AG.ASCENDENTE é “Alice”, logo nem precisamos ver o restante da consulta porque essa tupla já não será retornada.

Vamos agora para a segunda tupla da tabela da consulta interna: (BRUNO, ELIS).

A consulta interna só retornará essa tupla se AG.ASCENDENTE = “Bruno”.

É realmente “Bruno”, mas ainda não acabou: AG.DESCENDENTE deve ser igual a ARVORE_GENEALOGICA.ASCENDENTE.

Ora, AG.DESCENDENTE é ELIS e ARVORE_GENEALOGICA.ASCENDENTE é ALICE, logo, essa tupla também não será retornada porque não cumpriu as duas condições do operador AND.

Viram que nós temos que fazer um por um?

Em tese, teríamos que fazer 7 x 7 = 49 avaliações, no entanto, é possível identificar alguns atalhos: o nome de AG.ASCENDENTE deve ser “Bruno”.

Isso só ocorre em duas oportunidades:

![Comandos EXISTS2](sql/exists2.png)

Vejam que ocorre somente nas tuplas (BRUNO, ELIS) e (BRUNO, HUGO).

Nesses dois casos, temos AG.DESCENDENTE = (ELIS, HUGO).

Por fim, vejam que temos ELIS ou HUGO como ASCENDENTE na tabela ARVORE_GENEALOGICA apenas em duas oportunidades: (ELIS, CAIO) e (HUGO, GABI).

Logo, essas são as tuplas que serão retornadas pela consulta externa.

Interessante, não?

Vejam como isso seria em termos de tabela:

![Comandos EXISTS3](sql/exists3.png)

Resultado final do comando:

| **ASCENDENTE** | **DESCENDENTE** |
|----------------|-----------------|
| ELIS           | CAIO            |
| HUGO           | GABI            |

Se fosse com *OR* as tuplas com 'BRUNO' como ascendente também entrariam;

```sql
SELECT *
FROM ARVORE_GENEALOGICA
WHERE EXISTS (SELECT * FROM ARVORE_GENEALOGICA AG
              WHERE AG.ASCENDENTE = 'BRUNO'
              OR AG.DESCENTENTE = ARVORE_GENEALOGICA.ASCENDENTE);
```

| **ASCENDENTE** | **DESCENDENTE** |
|----------------|-----------------|
| BRUNO          | ELIS            |
| BRUNO          | HUGO            |
| ELIS           | CAIO            |
| HUGO           | GABI            |

## GROUP BY

A cláusula GROUP BY foi criada e adicionada à linguagem SQL **porque a cláusula WHERE não podia ser utilizada com funções de agregação.**

Imaginem que vocês queiram um relatório com alguma quantidade, soma, valores máximos, valores mínimos, média, entre outros, para isso, você precisará utilizar uma função de agregação junto com a cláusula GROUP BY.

Vamos ver a seguir sintaxes e exemplos...


```sql
SELECT LISTA_DE_COLUNAS, FUNCAO_DE_AGREGACAP(COLUNA)
FROM NOME_DA_TABELA
WHERE CONDICOES --OPCIONAL
GROUP BY LISTA_DE_COLUNAS

```

```sql
SELECT CIDADE, COUNT(CPF)
FROM ALUNO_ESTRATEGIA
GROUP BY CIDADE;
```
![Comandos GROUP BY](sql/group_by.png)

Essa cláusula buscará registros de uma tabela que possuem um valor em comum para um ou mais atributos e os agrupará baseado em algum critério de
agrupamento (soma, média, quantidade, etc).

No caso do comando anterior, ele buscará registros que tenham o mesmo valor para o atributo CIDADE e os agrupará pela quantidade (Brasília tem quatro aparições;
São Paulo tem uma aparição; Goiânia tem uma aparição; e Salvador tem duas aparições).

Vejamos o resultado do comando:

### RESULTADO

| CIDADE | COUNT (CPF) |
| :--- | :--- |
| BRASÍLIA | 4 |
| SÃO PAULO | 1 |
| GOIÂNIA | 1 |
| SALVADOR | 2 |

Na tabela a seguir, podemos ver outras funções de agregação – lembrando que todas elas podem ser utilizadas com o operador DISTINCT!

### Funções de Agregação

| FUNÇÕES | AGREGAÇÃO | DESCRIÇÃO |
| :--- | :--- | :--- |
| **COUNT()** | Quantidade | Essa função **conta a quantidade total de dados** de um dado campo. |
| **SUM()** | Soma | Essa função **soma valores numéricos** de um dado campo. |
| **AVG()** | Média | Essa função **calcula a média aritmética simples** de um conjunto de valores numéricos. |
| **MAX()** | Máximo | Essa função **retorna o maior valor** encontrado de um dado campo. |
| **MIN()** | Mínimo | Essa função **retorna o menor valor** encontrado de um dado campo. |


Vamos relembrar a nossa tabela de exemplo:
| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| ALICE | 11111111111  | ALICE@ALICE.COM  | 01-01-2001       | BRASÍLIA  | 200.00     |
| BRUNO | 22222222222  | BRUNO@BRUNO.COM  | 02-02-2002       | SÃO PAULO | 100.00     |
| CAIO  | 33333333333  | CAIO@CAIO.COM    | 03-03-2003       | GOIÂNIA   | 150.00     |
| DIEGO | 44444444444  | DIOGO@DIOGO.COM  | 04-04-2004       | SALVADOR  | 250.00     |
| ELIS  | 55555555555  | ELIS@ELIS.COM    | 05-05-2005       | BRASÍLIA  | 50.00      |
| FABIO | 66666666666  | FABIO@FABIO.COM  | 06-06-2006       | SALVADOR  | 125.00     |
| GABI  | 77777777777  | GABI@GABI.COM    | 07-07-2007       | BRASÍLIA  | 225.00     |
| HUGO  | 88888888888  | HUGO@HUGO.COM    | 08-08-2008       | BRASÍLIA  | 50.00      |

### SUM

```sql
SELECT CIDADE, SUM(VALOR_PAGO)
FROM ALUNO_ESTRATEGIA
GROUP BY CIDADE;
```

### SUM-RESULTADO

| CIDADE | SUM(VALOR_PAGO) |
| :--- | :--- |
| BRASÍLIA | 525.00 |
| SÃO PAULO | 100.00 |
| GOIÂNIA | 150.00 |
| SALVADOR | 375.00 |

Na função SUM, é possível inserir um valor de tal modo que, para cada registro encontrado, esse valor seja somado.

Ex: SUM(2) somará **duas unidades para cada registro encontrado.** Logo, se encontrou 3 registros, retornará 2x3 = 6.

Lembrando que SUM(1) = COUNT(*) = COUNT(1).

### AVG

```sql
SELECT CIDADE, AVG(VALOR_PAGO)
FROM ALUNO_ESTRATEGIA
GROUP BY CIDADE;
```

| CIDADE | AVG(VALOR_PAGO) |
| :--- | :--- |
| BRASÍLIA | 131.25 |
| SÃO PAULO | 100.00 |
| GOIÂNIA | 150.00 |
| SALVADOR | 187.50 |

### MAX

```sql
SELECT CIDADE, MAX(VALOR_PAGO)
FROM ALUNO_ESTRATEGIA
GROUP BY CIDADE;
```

| CIDADE | MAX(VALOR_PAGO) |
| :--- | :--- |
| BRASÍLIA | 225.00 |
| SÃO PAULO | 100.00 |
| GOIÂNIA | 150.00 |
| SALVADOR | 250.00 |

### MIN

```sql
SELECT CIDADE, MIN(VALOR_PAGO)
FROM ALUNO_ESTRATEGIA
GROUP BY CIDADE;
```

| CIDADE | MIN(VALOR_PAGO) |
| :--- | :--- |
| BRASÍLIA | 50.00 |
| SÃO PAULO | 100.00 |
| GOIÂNIA | 150.00 |
| SALVADOR | 125.00 |


Funções de agregação em geral, podem ser utilizadas sem necessariamente o uso do GROUP BY.

Vamos ver alguns exemplos:

```sql
SELECT MAX(VALOR_PAGO)
FROM ALUNO_ESTRATEGIA
```

Vamos relembrar a nossa tabela de exemplo:
| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| DIEGO | 44444444444  | DIOGO@DIOGO.COM  | 04-04-2004       | SALVADOR  | 250.00     |

## HAVING

A cláusula WHERE filtra linhas de acordo com alguma condição, já a cláusula HAVING filtra agrupamentos também de acordo com alguma condição.

Dessa forma, podemos concluir que a cláusula *b* **HAVING** só pode existir se houver anteriormente uma *b* **cláusula GROUP BY**.

No exemplo a seguir, queremos filtrar o agrupamento de modo que só mostre as linhas cuja função agregada COUNT(CPF) seja maior que 1.

```sql
SELECT LISTA_DE_COLUNAS, FUNCAO_DE_AGREGACAO(COLUNA)
FROM NOME_DA_TABELA
WHERE CONDICOES --OPCIONAL
GROUP BY LISTA_DE_COLUNAS
HAVING CONDICOES;
```

```sql
SELECT CIDADE, COUNT(CPF)
FROM ALUNO_ESTRATEGIA
GROUP BY CIDADE
HAVING COUNT(CPF) >1;
```
![Comandos HAVING](sql/having.png)

### RESULTADO

| CIDADE | COUNT (CPF) |
| :--- | :--- |
| BRASÍLIA | 4 |
| SALVADOR | 2 |


A coluna utilizada na cláusula **HAVING** deve necessariamente estar na lista de colunas selecionadas no SELECT ou estar contida **dentro de uma função de agregação.**

Dessa forma, se fizermos um SELECT de CIDADE junto de uma função de agregação selecionada, a cláusula HAVING poderá filtrar por CIDADE, pela função de
agregação selecionada ou por uma coluna (Ex: VALOR_PAGO) desde que ela esteja contida dentro de uma função de agregação.

Note que VALOR_PAGO não pode ser utilizado no HAVING porque não consta do SELECT, mas como está dentro de uma função de agregação (MAX), sua utilização
é permitida.

| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| ALICE | 11111111111  | ALICE@ALICE.COM  | 01-01-2001       | BRASÍLIA  | 200.00     |
| BRUNO | 22222222222  | BRUNO@BRUNO.COM  | 02-02-2002       | SÃO PAULO | 100.00     |
| CAIO  | 33333333333  | CAIO@CAIO.COM    | 03-03-2003       | GOIÂNIA   | 150.00     |
| DIEGO | 44444444444  | DIOGO@DIOGO.COM  | 04-04-2004       | SALVADOR  | 250.00     |
| ELIS  | 55555555555  | ELIS@ELIS.COM    | 05-05-2005       | BRASÍLIA  | 50.00      |
| FABIO | 66666666666  | FABIO@FABIO.COM  | 06-06-2006       | SALVADOR  | 125.00     |
| GABI  | 77777777777  | GABI@GABI.COM    | 07-07-2007       | BRASÍLIA  | 225.00     |
| HUGO  | 88888888888  | HUGO@HUGO.COM    | 08-08-2008       | BRASÍLIA  | 50.00      |


```sql
SELECT CIDADE, COUNT(CPF)
FROM ALUNO_ESTRATEGIA
GROUP BY CIDADE
HAVING MAX(VALOR_PAGO) > 100;
```
### RESULTADO

| CIDADE | COUNT (CPF) |
| :--- | :--- |
| BRASÍLIA | 4 |
| GOIÂNIA | 1 |
| SALVADOR | 2 |

*vbg* **BS: Basta ter o 'MAX(VALOR_PAGO) > 100' que satisfaz a consulta, logo, mesmo os valores que sejam menores ou iguais a 100, eles serão contabilizados.**


## ORDER BY

Permite ordenar registros/linhas de uma tabela em ordem crescente (ASC) ou decrescente (DESC).

```sql
SELECT LISTA_DE_COLUNAS, FUNCAO_DE_AGRAGACAO(COLUNA)
FROM NOME_DA_TABELA
WHERE CONDICOES --OPCIONAL
GROUP BY LISTA_DE_COLUNAS --OPCIONAL
HAVING CONDICOES --OPCIONAL
ORDER BY COLUNA1 ASC | DESC, COLUNA2 ASC | DESCE, ...;
```

```sql
SELECT CIDADE, COUNT(cpf)
FROM ALUNO_ESTRATEGIA
GROUP BY CIDADE
HAVING COUNT(cpf) > 1
ORDER BY COUNT(cpf) ASC;
```
| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| ALICE | 11111111111  | ALICE@ALICE.COM  | 01-01-2001       | BRASÍLIA  | 200.00     |
| BRUNO | 22222222222  | BRUNO@BRUNO.COM  | 02-02-2002       | SÃO PAULO | 100.00     |
| CAIO  | 33333333333  | CAIO@CAIO.COM    | 03-03-2003       | GOIÂNIA   | 150.00     |
| DIEGO | 44444444444  | DIOGO@DIOGO.COM  | 04-04-2004       | SALVADOR  | 250.00     |
| ELIS  | 55555555555  | ELIS@ELIS.COM    | 05-05-2005       | BRASÍLIA  | 50.00      |
| FABIO | 66666666666  | FABIO@FABIO.COM  | 06-06-2006       | SALVADOR  | 125.00     |
| GABI  | 77777777777  | GABI@GABI.COM    | 07-07-2007       | BRASÍLIA  | 225.00     |
| HUGO  | 88888888888  | HUGO@HUGO.COM    | 08-08-2008       | BRASÍLIA  | 50.00      |

*vbg* **ASC = DO MENOR PARA O MAIOR**

| CIDADE | COUNT (CPF) |
| :--- | :--- |
| SALVADOR | 2 |
| BRASÍLIA | 4 |

```sql
SELECT CIDADE, COUNT(cpf)
FROM ALUNO_ESTRATEGIA
GROUP BY CIDADE
HAVING COUNT(cpf) > 1
ORDER BY COUNT(cpf) DESC;
```
*vbg* **DESC = DO MAIOR PARA O MENOR**

| CIDADE | COUNT (CPF) |
| :--- | :--- |
| BRASÍLIA | 4 |
| SALVADOR | 2 |

### OBSERVAÇÕES:

 - A coluna utilizada para ordenação na cláusula ORDER BY deve necessariamente estar na lista de colunas do SELECT, em uma função de agregação qualquer ou ainda em uma coluna definida em uma tabela do FROM.
 - O valor padrão para ordenação, em caso de ausência no comando, é ASC.
 - Observe que várias combinações são possíveis, logo é permitido utilizar o ORDER BY apenas com SELECT e FROM.
 - É possível também representar a coluna responsável pela ordenação por meio de um número que indique a ordem da coluna (Ex: 1 é primeira coluna, 2 é segunda coluna, 3 é terceira coluna, etc).
 - É possível indicar mais de uma coluna para ordenação (no caso de empates).
 
Note que ele ordenou pela coluna #6 (VALOR_PAGO), mas – como houve um empate de VALOR_PAGO de 50.00 – ele ordenou pela coluna #1 (NOME).

```sql
SELECT *
FROM ALUNO_ESTRATEGIA
ORDER BY 6,1;
```
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

<BR>

## LIMIT

Essa cláusula restringe o conjunto de resultados a um número fixo de linhas ou até ele em caso de quantidade menor no BD.

*vbg* **Essa cláusula não faz parte do padrão SQL puro**, logo outros dialetos possuem variações: *b* **MS-SQL Server chama de TOP** e o *v* **Oracle chama de ROWNUM.**

```sql
SELECT LISTA_DE_COLUNAS
FROM NOME_DA_TABELA
LIMIT QTD_LINHAS;
```

```sql
SELECT *
FROM ALUNO_ESTRATEGIA
LIMIT 2;

```
| NOME  | CPF          | EMAIL            | DATA_NASCIMENTO | CIDADE    | VALOR_PAGO |
|-------|--------------|------------------|------------------|-----------|------------|
| ALICE | 11111111111  | ALICE@ALICE.COM  | 01-01-2001       | BRASÍLIA  | 200.00     |
| BRUNO | 22222222222  | BRUNO@BRUNO.COM  | 02-02-2002       | SÃO PAULO | 100.00     |

## OPERADOR UNION

É utilizado para **combinar os resultados de duas ou mais instruções SELECT.**

No seu uso, cada uma dessas instruções deve conter o **mesmo número de colunas**, as colunas devem ter tipos de *b* **dados semelhantes** e a *b* **mesma ordem**.

```sql
SELECT LISTA_DE_COLUNAS
FROM NOME_DA_TABELA1

UNION

SELECT LISTA_DE_COLUNAS
FROM NOME_DA_TABELA2;
```

Esse comando elimina eventuais linhas duplicadas. Caso se queira permitir linhas duplicadas, utiliza-se a instrução UNION ALL:


```sql
SELECT LISTA_DE_COLUNAS
FROM NOME_DA_TABELA1

UNION ALL

SELECT LISTA_DE_COLUNAS
FROM NOME_DA_TABELA2;
```
*vbg* **Por padrão UNION elimina as linha duplicadas, se quiser incluir as duplicadas deve inserir UNION ALL.**

O resultado é muito simples: esse comando basicamente une/junta as linhas das tabelas que compõem a união.

Se tinham 10 linhas em cada tabela, teremos 20 (exceto se houver duplicatas).

*vbg* **Observe que a única cláusula obrigatória do SELECT é o FROM e todas as outras são opcionais.**

*v* **FROM obrigatório**

*vbg* **Observe também que elas devem vir na ordem abaixo e, se houver um HAVING, antes deve existir um GROUP BY.**


### 🟢 Exemplo que Dá Certo (Uso Correto)

Imagine duas tabelas: Clientes_BR e Clientes_PT, que armazenam informações de clientes no Brasil e em Portugal, respectivamente. Queremos uma lista única contendo o nome e a cidade de todos os clientes.

#### Estrutura das Tabelas:

| Tabela: **Clientes\_BR** | | |
| :--- | :--- | :--- |
| **ID** (INT) | **Nome** (VARCHAR) | **Cidade** (VARCHAR) |
| 1 | Ana Silva | São Paulo |
| 2 | Bruno Costa | Rio de Janeiro |

| Tabela: **Clientes\_PT** | | |
| :--- | :--- | :--- |
| **Código** (INT) | **Nome** (VARCHAR) | **Localidade** (VARCHAR) |
| 101 | Sofia Gomes | Lisboa |
| 102 | Bruno Costa | Porto |

#### Consulta com `UNION`:

```sql
-- As colunas 'Nome' e 'Cidade' (ou Localidade)
-- têm o mesmo número (2), tipos de dados semelhantes (VARCHAR), e a mesma ordem.
SELECT Nome, Cidade
FROM Clientes_BR

UNION

SELECT Nome, Localidade
FROM Clientes_PT;
```

#### Resultado:

| Nome | Cidade |
| :--- | :--- |
| Ana Silva | São Paulo |
| Bruno Costa | Rio de Janeiro |
| Sofia Gomes | Lisboa |
| Bruno Costa | Porto |

> **Observação:** O nome **Bruno Costa** aparece duas vezes porque a combinação **(Bruno Costa, Rio de Janeiro)** é diferente da combinação **(Bruno Costa, Porto)**. Se as duas linhas fossem idênticas, UNION eliminaria a duplicata.

-----

### 🔴 Exemplo que Não Dá Certo (Uso Incorreto)

Usaremos as mesmas tabelas, mas tentaremos combinar um número diferente de colunas na segunda `SELECT`.

#### Consulta com `UNION` Incorreta:

```sql
-- Erro: A primeira SELECT tem 2 colunas, mas a segunda tem 3 colunas.
SELECT Nome, Cidade
FROM Clientes_BR

UNION

SELECT Código, Nome, Localidade -- Esta linha tem 3 colunas
FROM Clientes_PT;
```

#### Erro Retornado:

> **ERRO:** *As instruções SELECT de um UNION devem ter o mesmo número de colunas.*

#### Por que não funciona?

O operador `UNION` precisa empilhar os resultados, um em cima do outro. Se o número de colunas for diferente, o SGBD não sabe como alinhar os dados e onde preencher as colunas que faltam, violando a regra fundamental do operador.

-----

Gostaria de ver exemplos de como usar o `UNION ALL` para incluir todas as linhas, inclusive as duplicadas?

![Comandos DMG Final](sql/dml_final.png)