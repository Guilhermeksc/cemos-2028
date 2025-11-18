# QUESTÕES

01). (UFG – 2018) SQL é uma linguagem utilizada para manipular e consultar os dados das tabelas de um banco de dados. A SQL é considerada uma linguagem:

a) lógica.
b) declarativa.
c) imperativa.
d) funcional.


Resposta Letra B

02) (TJ/RS – 2014) Os tipos de dados básicos para atributos em SQL incluem: 

a) classes, listas e conjuntos ordenados.
b) vetores e matrizes.
c) ponteiros e estruturas.
d) números, cadeia de caractere, cadeia de bits, booleanos, data e hora.
e) listas, pilhas, filas e deques.

Resposta Letra D

03) (TRT/AL ) É um comando do tipo DDL (Data Definition Language) no SQL:
a) SELECT
b) DELETE
c) INSERT
d) UPDATE
e) CREATE

Resposta Letra E

04) (IF/TO – 2018) O comando TRUNCATE, pertence a qual tipo de linguagem de dados SQL:
a) DCL (Data Control Language)
b) DTL (Data Transaction Language)
c) SDL (Storage Definition Language)
d) DDL (Data Definition Language)
e) DML (Data Manipulation Language)

Resposta letra D

05) (SEDF – 2017) O comando CREATE TABLE é responsável pela criação de tabelas, incluindo as colunas e seus tipos de dados. No entanto, com esse comando, não é possível especificar a chave primária da tabela

Resposta Falso

06) (SUFRAMA ) O comando drop table remove toda a tabela da base de dados. Um exemplo de utilização desse comando é o seguinte: drop table examplo_timestamp;

Resposta Verdadeiro

✔️ Quando um ALTER TABLE poderia ser necessário

Um ALTER TABLE só seria usado antes se você quisesse:
remover apenas uma coluna (ALTER TABLE … DROP COLUMN);
remover apenas uma restrição (ALTER TABLE … DROP CONSTRAINT);
renomear a tabela;
modificar estrutura antes de deletá-la.
*vbg* **Mas para excluir a tabela inteira, o DROP TABLE é suficiente e completo.**

07) (MPE/AM) O comando SQL utilizado para adicionar, modificar ou remover colunas em uma tabela existente é chamado:
a) INSERT INTO.
b) DROP TABLE.
c) CREATE TABLE.
d) ALTER TABLE.
e) TRUNCATE.

Resposta Letra D

08) (BAHIAGÁS – 2016) A Linguagem de Definição de Dados (DDL) é um conjunto de comandos dentro da SQL utilizada para a definição de estrutura dos dados e tabelas.

Com relação a este assunto assinale a alternativa correta:
a) Os comandos DDL mais comuns são CREATE, ALTER, DROP, RENAME e TRUNCATE
b) Os comandos DDL mais comuns são ALTER, GRANT, INSERT e TRUNCATE
c) Os comandos DDL mais comuns são ALTER, GRANT, INSERT, RENAME e SELECT
d) Os comandos DDL mais comuns são CREATE, ALTER, GRANT, INSERT e SELECT
e) Os comandos DDL mais comuns são CREATE, ALTER, INSERT, SELECT e TRUNCATE

Resposta letra A

09. (FADESP / SEFA-PA – 2022) A linguagem de banco de dados relacional SQL (Structured Query Language) é um exemplo de linguagem de banco de dados abrangente que representa uma combinação de:

a) TTL, VDL e DML.
b) TDL, GDL e DML.
c) DDL, VDL e DML.
d) DDL, VDL e BML.
e) DDL, GDL e BML

Resposta letra C

10. (CESPE / Petrobrás - 2022) Duas expressões SQL são equivalentes se e somente se elas tiverem os mesmos comandos em suas respectivas sequências. 

Resposta Falsa

Duas expressões SQL **podem ser equivalentes mesmo com comandos diferentes**.
Equivalência significa **retornar o mesmo resultado**, não possuir a mesma sequência de comandos.

Exemplo simples:

```sql
SELECT nome FROM clientes WHERE idade > 30;
```

é equivalente a:

```sql
SELECT nome FROM clientes WHERE NOT (idade <= 30);
```

Os **comandos são diferentes**, mas o **resultado é o mesmo**.

Portanto, a assertiva está **errada**.

11) . (CESPE / Petrobrás - 2022) O comando truncate PESSOA; permite excluir todos os registros da tabela de nome PESSOA


**13. (CESPE / DPE-RO – 2021)**

```
create table aluno (
    id integer not null primary key,
    nome varchar,
    datanascimento date
);

create table cidade (
    ibge bigint not null primary key,
    município varchar
);

create table alunocidade (
    cidade bigint,
    aluno integer,
    tipo varchar,
    constraint fkcidade foreign key (cidade)
        references cidade,
    constraint fkaluno foreign key (aluno)
        references aluno,
    constraint pkcidade primary key
        (cidade, aluno, tipo)
);
```
Para a expressão SQL anterior, a cardinalidade entre as entidades aluno e cidade é:

a) zero-para-muitos.
b) muitos-para-muitos.
c) um-para-um.
d) muitos-para-um.
e) um-para-muitos.

Resposta letra B

✔ Justificativa

A tabela alunocidade é uma tabela associativa, contendo:
cidade (FK → cidade.ibge)
aluno (FK → aluno.id)
tipo (campo adicional)
chave primária composta (cidade, aluno, tipo)

Isso significa que:
**Um aluno pode estar associado a várias cidades.**
**Uma cidade pode estar associada a vários alunos.**

Portanto, a relação entre aluno e cidade é **N:M (muitos-para-muitos)** — exatamente o padrão de tabelas de associação.

**14.(CESPE / DPE-RO – 2021)** Assinale a opção que apresenta o comando SQL usado para excluir todos os registros de uma tabela de nome aluno, mantendo-se a estrutura da tabela:
a) delete aluno
b) erase aluno
c) erase from aluno
d) delete from aluno
e) drop from aluno

Resposta Letra D

*v* **Justificativa, erase não existe, o drop também apaga a tabela!! o Truncate também apaga só os registros, se tivesse truncate estaria correto também**

**15.(CESPE / APEX-BRASIL – 2021)** create database pessoa;
O comando SQL apresentado anteriormente criará:

a) um banco de dados denominado pessoa;
b) uma tabela denominada pessoa;
c) um tipo de dados denominado pessoa;
d) um esquema denominado pessoa

Resposta Letra A

**16.(FCC / TRT4 – 2019)** Uma Analista digitou o comando TRUNCATE TABLE processos; em um banco de dados SQL aberto em condições ideais para:

a) excluir os dados da tabela, mas não a tabela em si.
b) excluir a estrutura da tabela e os dados nela contidos.
c) juntar a tabela aberta na memória com a tabela processos.
d) bloquear a tabela processos para uso exclusivo de seu usuário.
e) editar a estrutura da tabela em modo gráfico.

Resposta Letra A
**Truncate = excluir os dados da tabela, mas não a tabela em si.**
**Drop = excluir a estrutura da tabela e os dados nela contidos.**

**17.(INAZ DO PARÁ / CORE-SP – 2019)** SQL é uma linguagem de banco de dados abrangente, que possui instruções para definições de dados, consultas e atualizações. Apresenta alguns comandos principais e, entre eles, o “CREATE TABLE”, que serve para:

a) Definir uma nova tabela de banco de dados relacional, criando as relações necessárias aos registros dessa tabela.
b) Especificar uma nova relação, dando-lhe um nome e especificando seus atributos e restrições iniciais.
c) Criar uma nova tabela a partir dos registros encontrados em tabelas diversificadas de banco de dados distintos.
d) Juntamente com o comando “CREATE DOMAIN”, estabelecer todos os endereços dos registros de uma tabela.
e) Definir uma tabela centralizada a partir dos registros encontrados em banco de dados distribuídos.

Resposta Letra B

**18.(INAZ DO PARÁ / CORE-SP – 2019)** “Embora o SQL tenha sido originalmente criado pela IBM, rapidamente surgiram vários "dialectos" desenvolvidos por outros produtores. Essa expansão levou à necessidade de ser criado e adaptado um padrão para a linguagem. Esta tarefa foi realizada pela American National Standards Institute (ANSI) em 1986 e ISO em 1987.”
Disponível em: https://pt.wikipedia.org/wiki/SQL. Acesso em: 13.12.2018
Qual o código SQL contém comandos do tipo DDL?
a) drop table questoes.
b) insert into questoes select * from questoesmodelo.
c) delete from questoes.
d) select * from questoes.
e) select * from questoes.

Resposta Letra A

**19.(CCV / UFC – 2019)** Em alguns cenários, é necessário definir que uma coluna em um banco de dados não deve permitir a inserção de valores repetidos. Qual das cláusulas abaixo deverá ser usada no comando SQL (Structured Query Language) para aplicar essa restrição no momento da criação da coluna?

a) CHECK
b) DEFAULT
c) UNIQUE
d) DISTINCT
e) CONSTRAINT

Resposta Letra C

**20. (FCC / SEFAZ-BA – 2019)** Em uma tabela chamada Contribuinte de um banco de dados padrão SQL aberto e em condições ideais há o campo idContribuinte do tipo inteiro e chave primária. Há também o campo nomeContribuinte que é do tipo varchar. Nessa tabela, um Auditor Fiscal deseja alterar o nome do contribuinte de id1 para 'Marcos Silva'. Para isso, terá que utilizar o comando:

a) ALTER TABLE Contribuinte SET nomeContribuinte='Marcos Silva' WHERE idContribuinte =1;
b) UPDATE Contribuinte SET nomeContribuinte='Marcos Silva' WHERE idContribuinte = 1;
c) UPDATE nomeContribuinte TO 'Marcos Silva' FROM Contribuinte WHERE idContribuinte = 1;
d) ALTER TABLE Contribuinte FIELD nomeContribuinte='Marcos Silva' WHERE idContribuinte = 1;
e) UPDATE TABLE Contribuinte FIELD nomeContribuinte='Marcos Silva' WHERE idContribuinte = 1;

Resposta Letra B

**21. (IADES / CRF - TO - 2019)** A Linguagem de Consulta Estruturada (SQL – Structured Query Language) foi padronizada para utilização em bancos de dados em 1986 e é amplamente utilizada por diferentes Sistemas Gerenciadores de Bancos de Dados (SGBDs). Essa linguagem é dividida em quatro conjuntos, sendo eles linguagens:

a) de estruturação, de dados, para argumentação de controles e orientada a objetos.
b) orientada à conexão, estruturada, de manipulação de dados e de paralelismo.
c) para argumentação de controles, de definição de dados, orientada à conexão e de paralelismo.
d) para controle de acesso a dados, para transações, orientada a objetos e de estruturação.
e) de manipulação de dados, de definição de dados, para controle de transações e para controle de acesso a dados.

Resposta Letra E

**22.(FGV / Prefeitura de Niterói-RJ – 2018)** A otimização de consultas em gerenciadores de bancos de dados é fundamental para o desempenho do sistema.

Consultas escritas em SQL são particularmente propícias à otimização, porque essa linguagem:

a) não é procedural, permitindo a criação de diferentes planos de execução.
b) tem uma sintaxe simples e é largamente utilizada.
c) suporta todas as operações da Álgebra Relacional.
d) permite o uso de subconsultas, facilitando os processos de busca.
e) permite a criação de camadas de software de persistência.

Resposta Letra A

**23.(COPESE / UFPI – 2018)** As definições de uma tabela básica ou de outros elementos do esquema que possuírem denominação poderão, em linguagem SQL, ser alteradas pelo comando:

a) ALTER
b) DROP.
c) RESET.
d) RESET.
e) TABLE.

Resposta Letra A

**24) CEBRASPE (CESPE)** - 2023 - (SEPLAN RR) Julgue o item seguinte a respeito dos conceitos de administração de dados. Os comandos TRUNCATE e DROP TABLE removem todas as linhas de uma tabela, porém o comando DROP TABLE exclui também a estrutura da tabela do banco de dados bem como todos os dados armazenados na tabela.

Resposta Verdadeiro

**25) VUNESP - 2023 - Analista (Pref Marília)** O comando SQL para excluir completamente uma tabela (dados e estrutura) denominada Paper de um banco de dados relacional é

A) UNDO Paper.
B) EXC Paper.
C) DROP Paper.
D) DELETE Paper.
E) TRASH Paper.

Resposta Letra C.

**26) Instituto Consulplan - 2023 - (SEGER ES)** Determinado analista de TI recebeu uma solicitação: criar um código em SQL com o objetivo de implementar, em um banco de dados relacional, uma tabela com o nome de SIGA, contendo os seguintes campos: cod_siga, descricao, data_acesso e id_pessoa. Considerando a situação hipotética, assinale o código SQL que deverá ser apresentado pelo referido analista.

A)

```sql
create table siga
(
    cod_siga,
    descricao,
    data_acesso,
    id_pessoa,
    primary key (cod_siga)
);
```

B)

```sql
insert table siga
(
    cod_siga,
    descricao,
    data_acesso,
    id_pessoa,
    primary key (cod_siga)
);
```

C)

```sql
create table siga
(
    cod_siga:
    descricao:
    data_acesso:
    id_pessoa:
    primary key (cod_siga)
);
```

D)

```sql
create table siga
(
    cod_siga,
    descricao,
    data_acesso,
    id_pessoa,
    foreign key (cod_siga)
);
```

E)

```sql
append table siga
(
    cod_siga,
    descricao,
    data_acesso,
    id_pessoa,
    foreign key (cod_siga)
);
```

Resposta Letra A
