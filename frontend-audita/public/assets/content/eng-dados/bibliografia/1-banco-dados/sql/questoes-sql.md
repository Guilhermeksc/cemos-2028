# QUESTÕES

01). (UFG – 2018) SQL é uma linguagem utilizada para manipular e consultar os dados das tabelas de um banco de dados. A SQL é considerada uma linguagem:

a) lógica.
b) declarativa.
c) imperativa.
d) funcional.

02) (TJ/RS – 2014) Os tipos de dados básicos para atributos em SQL incluem: 
a) classes, listas e conjuntos ordenados.
b) vetores e matrizes.
c) ponteiros e estruturas.
d) números, cadeia de caractere, cadeia de bits, booleanos, data e hora.
e) listas, pilhas, filas e deques.

03) (TRT/AL ) É um comando do tipo DDL (Data Definition Language) no SQL:
a) SELECT
b) DELETE
c) INSERT
d) UPDATE
e) CREATE

04) (IF/TO – 2018) O comando TRUNCATE, pertence a qual tipo de linguagem de dados SQL:

a) DCL (Data Control Language)
b) DTL (Data Transaction Language)
c) SDL (Storage Definition Language)
d) DDL (Data Definition Language)
e) DML (Data Manipulation Language)
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza05) (SEDF – 2017) O comando CREATE TABLE é responsável pela criação de tabelas,
incluindo as colunas e seus tipos de dados. No entanto, com esse comando, não é
possível especificar a chave primária da tabela
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza06) (SUFRAMA ) O comando drop table remove toda a tabela da base de dados. Um
exemplo de utilização desse comando é o seguinte: drop table examplo_timestamp;
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza07) (MPE/AM) O comando SQL utilizado para adicionar, modificar ou remover
colunas em uma tabela existente é chamado:
a) INSERT INTO.
b) DROP TABLE.
c) CREATE TABLE.
d) ALTER TABLE.
e) TRUNCATE.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza08) (BAHIAGÁS – 2016) A Linguagem de Definição de Dados (DDL) é um conjunto de
comandos dentro da SQL utilizada para a definição de estrutura dos dados e tabelas.
Com relação a este assunto assinale a alternativa correta:
a) Os comandos DDL mais comuns são CREATE, ALTER, DROP, RENAME e TRUNCATE
b) Os comandos DDL mais comuns são ALTER, GRANT, INSERT e TRUNCATE
c) Os comandos DDL mais comuns são ALTER, GRANT, INSERT, RENAME e SELECT
d) Os comandos DDL mais comuns são CREATE, ALTER, GRANT, INSERT e SELECT
e) Os comandos DDL mais comuns são CREATE, ALTER, INSERT, SELECT e TRUNCATE
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaOBRIGADA
Prof. Emannuelle Gouveia
@emannuellegouveia
05490709405 - Lorenna Siza05490709405 - Lorenna Siza05490709405 - Lorenna Siza05490709405 - Lorenna SizaINFORMÁTICA
Profa. Emannuelle Gouveia
@Emannuellegouveia
05490709405 - Lorenna SizaBANCO DE DADOS
RELACIONAIS
Prof. Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaSQL
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaPARTE 2
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Restrições (Constraints) são limitações utilizadas para determinar regras para os
dados em uma tabela de um banco de dados relacional com o objetivo de limitar o
armazenamento garantindo a qualidade e a confiabilidade aos dados e evitando que
determinadas ações violem a integridade da estrutura dos dados especificada no
esquema do banco de dados relacional.
Podem ser no nível de coluna (se aplicam a uma coluna) ou no nível de tabela
(se aplicam a toda a tabela).
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
1- Not Null: Por padrão, uma coluna pode conter valores nulos (NULL), ou seja, se
nada for especificado, não há nenhum problema em existir uma coluna que não
contenha nenhum valor.
Já a restrição NOT NULL força uma coluna a não aceitar valores nulos, ou seja,
essa restrição obriga que determinada coluna contenha valores.
Logo, não podemos inserir um novo registro na tabela (ou atualizar um registro
existente) sem adicionar valores a esse campo.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Existem basicamente duas maneiras de definir uma coluna como NOT NULL. A
primeira é durante a criação da tabela, onde definimos, para cada coluna: nome, tipo
e restrição.
Nesse caso, basta definir a coluna como NOT NULL.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
A segunda maneira é por meio do comando ALTER TABLE:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Isso significa que a tabela ALUNO não permitirá valores nulos para os campos
NOME, CPF, SEXO, DATA_NASCIMENTO e CIDADE.
Logo, sempre que um registro for incluído nessa tabela, apenas o campo
VALOR_PAGO poderá ficar em branco porque nenhuma restrição foi definida para
ele.
Todos os outros obrigatoriamente deverão ser preenchidos, caso contrário
violarão a restrição especificada e a operação de inserção será abortada.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
2- Unique: Essa restrição garante que todos os valores em uma coluna sejam
diferentes. Se uma coluna for definida com essa restrição, nenhum registro poderá
ter valores iguais nessa coluna.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Note que especificamos que a coluna MATRICULA é UNIQUE! Logo, em todos os
registros da tabela, essa coluna não pode ficar vazia nem ter valores repetidos.
Um outro ponto interessante é que nós podemos dar um nome a uma restrição
de unicidade ou defini-la para múltiplas colunas simultaneamente.
A sintaxe para ambas as situações é a mesma
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
É possível também adicionar uma restrição de unicidade a uma coluna de uma
tabela pré-existente por meio da sintaxe apresentada a seguir.
E se a tabela já tiver valores repetidos, antes de inserir a restrição, o Sistema
Gerenciador de Banco de Dados (SGBD) analisará os dados da coluna para garantir
que todos os valores pré-existentes nela são únicos. Se ele encontrar algum valor
duplicado, retornará um erro e não alterará a tabela com a adição da restrição de
unidade.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Por fim, da mesma forma que é possível adicionar uma restrição de unicidade a
uma determinada coluna, é também possível retirá-la por meio da seguinte sintaxe:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
3- Primary Key: Essa restrição permite identificar unicamente cada registro de uma
tabela, o que fornece uma garantia de exclusividade para uma coluna ou conjunto de
colunas.
A restrição PRIMARY KEY combina as duas restrições analisadas nos tópicos
anteriores: PRIMARY KEY = NOT NULL + UNIQUE!
Em outras palavras, uma coluna que seja definida com a restrição PRIMARY KEY
necessariamente não poderá receber valores nulos nem repetidos.
Eu vou detalhar novamente para não haver confusão: uma coluna que possua a
restrição UNIQUE jamais poderá se repetir, mas poderá ser nula; uma coluna que
possua a restrição NOT NULL jamais poderá ser nula, mas poderá se repetir; uma
coluna que possua a restrição PRIMARY KEY jamais poderá ser nula e jamais poderá
se repetir.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Uma tabela poderá ter apenas uma chave primária composta de uma coluna
(simples) ou mais colunas (composta). Vamos ver a sintaxe:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Da mesma forma que nós vimos anteriormente, é possível também adicionar
uma restrição PRIMARY KEY a uma tabela pré-existente. Para tal, utiliza-se a seguinte
sintaxe:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Por fim, da mesma forma que é possível adicionar uma restrição PRIMARY KEY a
uma determinada coluna, é também possível retirá-la por meio da seguinte sintaxe:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
4- Foreing Key: As chaves estrangeiras são utilizadas para unir duas tabelas, em que
a chave estrangeira de uma tabela referencia uma chave candidata de outra tabela
(em geral, a chave primária).
A restrição FOREIGN KEY é utilizada justamente para definir uma ou mais
colunas como chaves estrangeiras e prevenir que alguma ação possa destruir essa
ligação entre tabelas.
A tabela com a chave estrangeira é chamada de Tabela Filha, e a tabela com a
chave primária é chamada de Tabela Referenciada ou Tabela Pai.
Essa é a sintaxe para a definição dessa restrição:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
É possível adicionar essa restrição a uma tabela pré-existente. Vejamos sua
sintaxe:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Por fim, da mesma forma que é possível adicionar uma restrição FOREIGN
KEY a uma determinada coluna, é também possível retirá-la por meio da seguinte
sintaxe
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Agora nós temos um problema bastante interessante: nós sabemos que a
chave estrangeira de uma tabela referencia uma chave candidata de outra tabela
(em geral, a chave primária). Logo, se algo muda na tabela pai, mudará também na
tabela filha, então, ao deletar um registro da tabela pai todos os registro da tabela
filha que referencie esse registro deletado da tabela pai terá um valor inválido,
porque ela perderá a sua referência.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Vejam o exemplo: se excluíssemos o registro da TABELA PROFESSOR cuja
chave primária é 111.111.111-11, a disciplina cujo código é 101 da TABELA
DISCIPLINA ficaria sem referência. E como podemos resolver esse problema?
Podemos utilizar a cláusula ON DELETE CASCADE. Essa cláusula basicamente obriga a
exclusão dos registros correspondentes das Tabelas Filhas que referenciam o registro
excluído da Tabela Pai.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
5- Check: Essa restrição é utilizada para limitar o intervalo de valores que pode ser
inserido em uma coluna. É possível defini-la para uma coluna ou para uma tabela.
Caso seja definida para uma coluna, ela permitirá apenas alguns valores para esta
coluna. Caso seja definida para uma tabela, ela limitará os valores de certas colunas
com base nos valores de outras colunas da linha.
Vamos ver como tudo isso funciona.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
No exemplo, temos uma restrição composta, dado que limita a inserção de
registros apenas àqueles que tenham IDADE >= 18 e SEXO = ‘F’. Em outras palavras,
será permitido o armazenamento de registros apenas de mulheres maiores de idade.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Conforme vimos nas restrições anteriores, também é possível adicioná-la após a
criação da tabela, isto é, em uma tabela pré-existente. Vamos ver como seria a
sintaxe:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Por fim, da mesma forma que é possível adicionar uma restrição de checagem, é
também possível retirá-la por meio da seguinte sintaxe:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
6- Default: Essa restrição é utilizada para configurar um valor padrão para uma
coluna. Esse valor padrão é adicionado em todos os novos registros, caso nenhum
outro valor tenha sido especificado.
No exemplo abaixo, todo registro que não tenha especificado um valor para a
coluna CIDADE será automaticamente preenchido com o valor Brasília pelo próprio
sistema.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaRESTRIÇÕES
Podemos alterar uma tabela já existente:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaPode
05490709405 - Lorenna SizaRESTRIÇÕES
Por fim, da mesma forma que é possível adicionar um valor padrão, é também
possível retirá-lo por meio da seguinte sintaxe:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaQUESTÕES
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza01). (UFG – 2018) SQL é uma linguagem utilizada para manipular e consultar os
dados das tabelas de um banco de dados. A SQL é considerada uma linguagem:
a) lógica.
b) declarativa.
c) imperativa.
d) funcional.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza02) (TJ/RS – 2014) Os tipos de dados básicos para atributos em SQL incluem:
a) classes, listas e conjuntos ordenados.
b) vetores e matrizes.
c) ponteiros e estruturas.
d) números, cadeia de caractere, cadeia de bits, booleanos, data e hora.
e) listas, pilhas, filas e deques.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza03) (TRT/AL ) É um comando do tipo DDL (Data Definition Language) no SQL:
a) SELECT
b) DELETE
c) INSERT
d) UPDATE
e) CREATE
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza04) (IF/TO – 2018) O comando TRUNCATE, pertence a qual tipo de linguagem de
dados SQL:
a) DCL (Data Control Language)
b) DTL (Data Transaction Language)
c) SDL (Storage Definition Language)
d) DDL (Data Definition Language)
e) DML (Data Manipulation Language)
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza05) (SEDF – 2017) O comando CREATE TABLE é responsável pela criação de tabelas,
incluindo as colunas e seus tipos de dados. No entanto, com esse comando, não é
possível especificar a chave primária da tabela
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza06) (SUFRAMA ) O comando drop table remove toda a tabela da base de dados. Um
exemplo de utilização desse comando é o seguinte: drop table examplo_timestamp;
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza07) (MPE/AM) O comando SQL utilizado para adicionar, modificar ou remover
colunas em uma tabela existente é chamado:
a) INSERT INTO.
b) DROP TABLE.
c) CREATE TABLE.
d) ALTER TABLE.
e) TRUNCATE.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza08) (BAHIAGÁS – 2016) A Linguagem de Definição de Dados (DDL) é um conjunto de
comandos dentro da SQL utilizada para a definição de estrutura dos dados e tabelas.
Com relação a este assunto assinale a alternativa correta:
a) Os comandos DDL mais comuns são CREATE, ALTER, DROP, RENAME e TRUNCATE
b) Os comandos DDL mais comuns são ALTER, GRANT, INSERT e TRUNCATE
c) Os comandos DDL mais comuns são ALTER, GRANT, INSERT, RENAME e SELECT
d) Os comandos DDL mais comuns são CREATE, ALTER, GRANT, INSERT e SELECT
e) Os comandos DDL mais comuns são CREATE, ALTER, INSERT, SELECT e TRUNCATE
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza09. (FADESP / SEFA-PA – 2022) A linguagem de banco de dados relacional SQL
(Structured Query Language) é um exemplo de linguagem de banco de dados
abrangente que representa uma
combinação de:
a) TTL, VDL e DML.
b) TDL, GDL e DML.
c) DDL, VDL e DML.
d) DDL, VDL e BML.
e) DDL, GDL e BML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza10. (FUNDATEC / ISS-Porto Alegre – 2022) Sabe-se que, a partir do DER mostrado na
Figura 6, foram criadas e populadas as tabelas correspondentes em um Sistema
Gerenciador de Banco de Dados Relacional (SGBDR), tendo se respeitado,
rigorosamente, os conceitos do modelo relacional. Nesse caso, para criar a tabela
"Aquisicao", bastou executar a seguinte declaração, em SQL padrão ANSI:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza11. (CESPE / Petrobrás - 2022) Duas expressões SQL são equivalentes se e somente
se elas tiverem os mesmos comandos em suas respectivas sequências.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza12) . (CESPE / Petrobrás - 2022) O comando truncate PESSOA; permite excluir todos
os registros da tabela de nome PESSOA
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza13.(CESPE / DPE-RO – 2021)
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaPara a expressão SQL anterior, a cardinalidade entre as entidades aluno e cidade é:
a) zero-para-muitos.
b) muitos-para-muitos.
c) um-para-um.
d) muitos-para-um.
e) um-para-muitos.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza14.(CESPE / DPE-RO – 2021) Assinale a opção que apresenta o comando SQL usado
para excluir todos os registros de uma tabela de nome aluno, mantendo-se a
estrutura da tabela:
a) delete aluno
b) erase aluno
c) erase from aluno
d) delete from aluno
e) drop from aluno
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza15.(CESPE / APEX-BRASIL – 2021) create database pessoa;
O comando SQL apresentado anteriormente criará:
a) um banco de dados denominado pessoa;
b) uma tabela denominada pessoa;
c) um tipo de dados denominado pessoa;
d) um esquema denominado pessoa
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza16) .(FCC / TRT4 – 2019) Uma Analista digitou o comando TRUNCATE TABLE
processos; em um banco de dados SQL aberto em condições ideais para:
a) excluir os dados da tabela, mas não a tabela em si.
b) excluir a estrutura da tabela e os dados nela contidos.
c) juntar a tabela aberta na memória com a tabela processos.
d) bloquear a tabela processos para uso exclusivo de seu usuário.
e) editar a estrutura da tabela em modo gráfico.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza17.(INAZ DO PARÁ / CORE-SP – 2019) SQL é uma linguagem de banco de dados
abrangente, que possui instruções para definições de dados, consultas e
atualizações. Apresenta alguns comandos principais e, entre eles, o “CREATE TABLE”,
que serve para:
a) Definir uma nova tabela de banco de dados relacional, criando as relações
necessárias aos registros dessa tabela.
b) Especificar uma nova relação, dando-lhe um nome e especificando seus atributos
e restrições iniciais.
c) Criar uma nova tabela a partir dos registros encontrados em tabelas diversificadas
de banco de dados distintos.
d) Juntamente com o comando “CREATE DOMAIN”, estabelecer todos os endereços
dos registros de uma tabela.
e) Definir uma tabela centralizada a partir dos registros encontrados em banco de
dados distribuídos.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza18.(INAZ DO PARÁ / CORE-SP – 2019) “Embora o SQL tenha sido originalmente criado
pela IBM, rapidamente surgiram vários "dialectos" desenvolvidos por outros
produtores. Essa expansão levou à necessidade de ser criado e adaptado um padrão
para a linguagem. Esta tarefa foi realizada pela American National Standards Institute
(ANSI) em 1986 e ISO em 1987.”
Disponível em: https://pt.wikipedia.org/wiki/SQL. Acesso em: 13.12.2018
Qual o código SQL contém comandos do tipo DDL?
a) drop table questoes.
b) insert into questoes select * from questoesmodelo.
c) delete from questoes.
d) select * from questoes.
e) select * from questoes.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza19.(CCV / UFC – 2019) Em alguns cenários, é necessário definir que uma coluna em
um banco de dados não deve permitir a inserção de valores repetidos. Qual das
cláusulas abaixo deverá ser usada no comando SQL (Structured Query Language)
para aplicar essa restrição no momento da criação da coluna?
a) CHECK
b) DEFAULT
c) UNIQUE
d) DISTINCT
e) CONSTRAINT
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza20. (FCC / SEFAZ-BA – 2019) Em uma tabela chamada Contribuinte de um banco de
dados padrão SQL aberto e em condições ideais há o campo idContribuinte do tipo
inteiro e chave primária. Há também o campo nomeContribuinte que é do tipo
varchar. Nessa tabela, um Auditor Fiscal deseja alterar o nome do contribuinte de id
1 para 'Marcos Silva'. Para isso, terá que utilizar o comando:
a) ALTER TABLE Contribuinte SET nomeContribuinte='Marcos Silva' WHERE
idContribuinte =1;
b) UPDATE Contribuinte SET nomeContribuinte='Marcos Silva' WHERE idContribuinte
= 1;
c) UPDATE nomeContribuinte TO 'Marcos Silva' FROM Contribuinte WHERE
idContribuinte = 1;
d) ALTER TABLE Contribuinte FIELD nomeContribuinte='Marcos Silva' WHERE
idContribuinte = 1;
e) UPDATE TABLE Contribuinte FIELD nomeContribuinte='Marcos Silva' WHERE
idContribuinte = 1;
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza21.(IADES / CRF - TO - 2019) A Linguagem de Consulta Estruturada (SQL – Structured
Query Language) foi padronizada para utilização em bancos de dados em 1986 e é
amplamente utilizada por diferentes Sistemas Gerenciadores de Bancos de Dados
(SGBDs). Essa linguagem é dividida em quatro conjuntos, sendo eles linguagens:
a) de estruturação, de dados, para argumentação de controles e orientada a objetos.
b) orientada à conexão, estruturada, de manipulação de dados e de paralelismo.
c) para argumentação de controles, de definição de dados, orientada à conexão e de
paralelismo.
d) para controle de acesso a dados, para transações, orientada a objetos e de
estruturação.
e) de manipulação de dados, de definição de dados, para controle de transações e
para controle de acesso a dados.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza22.(FGV / Prefeitura de Niterói-RJ – 2018) A otimização de consultas em
gerenciadores de bancos de dados é fundamental para o desempenho do sistema.
Consultas escritas em SQL são particularmente propícias à otimização, porque essa
linguagem:
a) não é procedural, permitindo a criação de diferentes planos de execução.
b) tem uma sintaxe simples e é largamente utilizada.
c) suporta todas as operações da Álgebra Relacional.
d) permite o uso de subconsultas, facilitando os processos de busca.
e) permite a criação de camadas de software de persistência.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza23.(COPESE / UFPI – 2018) As definições de uma tabela básica ou de outros
elementos do esquema que possuírem denominação poderão, em linguagem SQL,
ser alteradas pelo comando:
a) ALTER
b) DROP.
c) RESET.
d) RESET.
e) TABLE.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza24) CEBRASPE (CESPE) - 2023 - (SEPLAN RR)
Julgue o item seguinte a respeito dos conceitos de administração de dados.
Os comandos TRUNCATE e DROP TABLE removem todas as linhas de uma tabela,
porém o comando DROP TABLE exclui também a estrutura da tabela do banco de
dados bem como todos os dados armazenados na tabela.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza25) VUNESP - 2023 - Analista (Pref Marília) O comando SQL para excluir
completamente uma tabela (dados e estrutura) denominada Paper de um banco de
dados relacional é
A) UNDO Paper.
B) EXC Paper.
C) DROP Paper.
D) DELETE Paper.
E) TRASH Paper.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza26) Instituto Consulplan - 2023 - (SEGER ES)
Determinado analista de TI recebeu uma solicitação: criar um código em SQL com o
objetivo de implementar, em um banco de dados relacional, uma tabela com o nome
de SIGA, contendo os seguintes campos: cod_siga, descricao, data_acesso e
id_pessoa. Considerando a situação hipotética, assinale o código SQL que deverá ser
apresentado pelo referido analista.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaOBRIGADA
Prof. Emannuelle Gouveia
@emannuellegouveia
05490709405 - Lorenna Siza05490709405 - Lorenna Siza05490709405 - Lorenna Siza05490709405 - Lorenna SizaINFORMÁTICA
Profa. Emannuelle Gouveia
@Emannuellegouveia
05490709405 - Lorenna SizaBANCO DE DADOS
RELACIONAIS
Prof. Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaSQL
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaPARTE 3
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaQUESTÕES
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza14.(CESPE / DPE-RO – 2021) Assinale a opção que apresenta o comando SQL usado
para excluir todos os registros de uma tabela de nome aluno, mantendo-se a
estrutura da tabela:
a) delete aluno
b) erase aluno
c) erase from aluno
d) delete from aluno
e) drop from aluno
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza15.(CESPE / APEX-BRASIL – 2021) create database pessoa;
O comando SQL apresentado anteriormente criará:
a) um banco de dados denominado pessoa;
b) uma tabela denominada pessoa;
c) um tipo de dados denominado pessoa;
d) um esquema denominado pessoa
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza16) .(FCC / TRT4 – 2019) Uma Analista digitou o comando TRUNCATE TABLE
processos; em um banco de dados SQL aberto em condições ideais para:
a) excluir os dados da tabela, mas não a tabela em si.
b) excluir a estrutura da tabela e os dados nela contidos.
c) juntar a tabela aberta na memória com a tabela processos.
d) bloquear a tabela processos para uso exclusivo de seu usuário.
e) editar a estrutura da tabela em modo gráfico.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza17.(INAZ DO PARÁ / CORE-SP – 2019) SQL é uma linguagem de banco de dados
abrangente, que possui instruções para definições de dados, consultas e
atualizações. Apresenta alguns comandos principais e, entre eles, o “CREATE TABLE”,
que serve para:
a) Definir uma nova tabela de banco de dados relacional, criando as relações
necessárias aos registros dessa tabela.
b) Especificar uma nova relação, dando-lhe um nome e especificando seus atributos
e restrições iniciais.
c) Criar uma nova tabela a partir dos registros encontrados em tabelas diversificadas
de banco de dados distintos.
d) Juntamente com o comando “CREATE DOMAIN”, estabelecer todos os endereços
dos registros de uma tabela.
e) Definir uma tabela centralizada a partir dos registros encontrados em banco de
dados distribuídos.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza18.(INAZ DO PARÁ / CORE-SP – 2019) “Embora o SQL tenha sido originalmente criado
pela IBM, rapidamente surgiram vários "dialectos" desenvolvidos por outros
produtores. Essa expansão levou à necessidade de ser criado e adaptado um padrão
para a linguagem. Esta tarefa foi realizada pela American National Standards Institute
(ANSI) em 1986 e ISO em 1987.”
Disponível em: https://pt.wikipedia.org/wiki/SQL. Acesso em: 13.12.2018
Qual o código SQL contém comandos do tipo DDL?
a) drop table questoes.
b) insert into questoes select * from questoesmodelo.
c) delete from questoes.
d) select * from questoes.
e) select * from questoes.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza19.(CCV / UFC – 2019) Em alguns cenários, é necessário definir que uma coluna em
um banco de dados não deve permitir a inserção de valores repetidos. Qual das
cláusulas abaixo deverá ser usada no comando SQL (Structured Query Language)
para aplicar essa restrição no momento da criação da coluna?
a) CHECK
b) DEFAULT
c) UNIQUE
d) DISTINCT
e) CONSTRAINT
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza20. (FCC / SEFAZ-BA – 2019) Em uma tabela chamada Contribuinte de um banco de
dados padrão SQL aberto e em condições ideais há o campo idContribuinte do tipo
inteiro e chave primária. Há também o campo nomeContribuinte que é do tipo
varchar. Nessa tabela, um Auditor Fiscal deseja alterar o nome do contribuinte de id
1 para 'Marcos Silva'. Para isso, terá que utilizar o comando:
a) ALTER TABLE Contribuinte SET nomeContribuinte='Marcos Silva' WHERE
idContribuinte =1;
b) UPDATE Contribuinte SET nomeContribuinte='Marcos Silva' WHERE idContribuinte
= 1;
c) UPDATE nomeContribuinte TO 'Marcos Silva' FROM Contribuinte WHERE
idContribuinte = 1;
d) ALTER TABLE Contribuinte FIELD nomeContribuinte='Marcos Silva' WHERE
idContribuinte = 1;
e) UPDATE TABLE Contribuinte FIELD nomeContribuinte='Marcos Silva' WHERE
idContribuinte = 1;
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza21.(IADES / CRF - TO - 2019) A Linguagem de Consulta Estruturada (SQL – Structured
Query Language) foi padronizada para utilização em bancos de dados em 1986 e é
amplamente utilizada por diferentes Sistemas Gerenciadores de Bancos de Dados
(SGBDs). Essa linguagem é dividida em quatro conjuntos, sendo eles linguagens:
a) de estruturação, de dados, para argumentação de controles e orientada a objetos.
b) orientada à conexão, estruturada, de manipulação de dados e de paralelismo.
c) para argumentação de controles, de definição de dados, orientada à conexão e de
paralelismo.
d) para controle de acesso a dados, para transações, orientada a objetos e de
estruturação.
e) de manipulação de dados, de definição de dados, para controle de transações e
para controle de acesso a dados.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza22.(FGV / Prefeitura de Niterói-RJ – 2018) A otimização de consultas em
gerenciadores de bancos de dados é fundamental para o desempenho do sistema.
Consultas escritas em SQL são particularmente propícias à otimização, porque essa
linguagem:
a) não é procedural, permitindo a criação de diferentes planos de execução.
b) tem uma sintaxe simples e é largamente utilizada.
c) suporta todas as operações da Álgebra Relacional.
d) permite o uso de subconsultas, facilitando os processos de busca.
e) permite a criação de camadas de software de persistência.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza23.(COPESE / UFPI – 2018) As definições de uma tabela básica ou de outros
elementos do esquema que possuírem denominação poderão, em linguagem SQL,
ser alteradas pelo comando:
a) ALTER
b) DROP.
c) RESET.
d) RESET.
e) TABLE.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza24) CEBRASPE (CESPE) - 2023 - (SEPLAN RR)
Julgue o item seguinte a respeito dos conceitos de administração de dados.
Os comandos TRUNCATE e DROP TABLE removem todas as linhas de uma tabela,
porém o comando DROP TABLE exclui também a estrutura da tabela do banco de
dados bem como todos os dados armazenados na tabela.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza25) VUNESP - 2023 - Analista (Pref Marília) O comando SQL para excluir
completamente uma tabela (dados e estrutura) denominada Paper de um banco de
dados relacional é
A) UNDO Paper.
B) EXC Paper.
C) DROP Paper.
D) DELETE Paper.
E) TRASH Paper.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza26) Instituto Consulplan - 2023 - (SEGER ES)
Determinado analista de TI recebeu uma solicitação: criar um código em SQL com o
objetivo de implementar, em um banco de dados relacional, uma tabela com o nome
de SIGA, contendo os seguintes campos: cod_siga, descricao, data_acesso e
id_pessoa. Considerando a situação hipotética, assinale o código SQL que deverá ser
apresentado pelo referido analista.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Essa linguagem possui um conjunto de comandos que podem ser utilizados para
realizar transações em um banco de dados (inserir, excluir, deletar ou consultar).
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Aqui estão agrupados os comandos para a manipulação dos dados em si.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Insert :
Insere novos registros em uma tabela do banco de dados.
A inserção deve ser feita na ordem correta dos campos.
Se todos os campos forem preenchidos, não é necessário explicitar o nome da
coluna, mas se não tivermos todos os campos a serem preenchidos, devemos
explicitar os nomes das colunas no comando de inserção.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Update:
Esse comando é utilizado para atualizar registros existentes em uma tabela do
banco de dados.
Pode-se atualizar todos os registros de uma tabela ou apenas alguns.
Para atualizar registros específicos, devemos utilizar a cláusula WHERE, que será
detalhada mais à frente, mas, por enquanto, basta saber que ela permite filtrar
dados a partir de um conjunto de condições.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Vamos conhecer a sintaxe desse comando:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Vamos supor que houvesse um erro e o nome de um aluno fosse Diogo em vez
de Diego.
Vejam no exemplo acima que o código apresentado atualiza (UPDATE) a tabela
ALUNO_ESTRATEGIA de tal forma que se configure (SET) o valor da coluna NOME
para ‘Diogo’ e o valor da coluna EMAIL para ‘diogo@gmail.com’, porém apenas para
os registros que tenham 44444444444 como valor de CPF.
Essa foi uma condição simples, mas você pode inserir a condição que quiser...
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Delete:
Esse comando é utilizado para deletar registros existentes em uma tabela do
banco de dados.
Pode-se deletar todos os registros de uma tabela ou apenas alguns.
Para deletar registros específicos, devemos utilizar a cláusula WHERE.
Notem que se não for utilizada a cláusula WHERE, o DELETE funcionará como
um TRUNCATE e apagará todos os registros de uma tabela, mas mantem a estrutura
da mesma.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
No exemplo seguinte, nós vamos excluir da tabela ALUNO_ESTRATEGIA as
linhas/registros cujo valor da coluna VALOR_PAGO seja 175.00 ou cujo valor da
coluna CIDADE seja RECIFE.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaQUESTÕES
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza27) (MPU) Os comandos SQL INTERT, UPDATE, DELETE e ALTER TABLE fazem parte da
DML (Data Manipulation Language).
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza28) (Banco da Amazônia) Exemplos de comandos de SQL DML (Data Manipulation
Language) incluem SELECT, UPDATE, DELETE, INSERT INTO.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza29) (TRE/RJ) INSERT INTO é o comando utilizado para inserir dados em uma tabela.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza30) (Prefeitura de Congonhas/MG) Qual instrução SQL é usada para inserir novos
dados em uma tabela do banco de dados?
a) ADD NEW
b) ADD RECORD
c) INSERT INTO
d) INSERT NEW
e) INSERT
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza31) (STJ) O comando INSERT INTO é capaz de inserir novos dados em um banco de
dados, mas não é classificado como DML nem como DDL
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza32) (TCE/SP) Alterações nos valores dos registros de determinada tabela são
realizadas em SQL pelo comando:
a) Insert.
b) Update.
c) Drop.
d) Modify.
e) Modify_table.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza33) (EBSERH) Em SQL a instrução que remove uma ou mais linhas em uma tabela:
a) ERASE
b) DELETE
c) DROP
d) REMOVE
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza34) (IF/TO) José, técnico em informática do IFTO, deseja excluir somente um registro
de um banco de dados SQL. Qual dos comandos abaixo ele deverá usar:
a) TRUNCATE
b) DROP
c) DELETE
d) INSERT
e) COMMIT
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaSELECT
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Select:
Esse comando é utilizado para recuperar informações de um banco de dados.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Observem no exemplo acima que utilizamos o elemento asterisco (*) e isso
significa que queremos recuperar todas as colunas da tabela.
Aliás, sempre que vocês virem o asterisco (*), podem interpretar como: “todas
as colunas”.
Vejam no esquema abaixo o exemplo de comando e a sua respectiva
interpretação para que vocês consigam entender isso melhor:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
E para selecionar colunas específicas da tabela?
Não há problema: nós podemos selecionar, por exemplo, as colunas NOME e
DATA_NASCIMENTO:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Eliminando duplicatas nas consultas.
Há casos em eu não desejamos que a consulta retorne valores repetidos,
chamados de duplicatas.
Por exemplo: na tabela original, nós tínhamos uma coluna CIDADES e ela possui
alguns valores repetidos, se desejamos saber quais as cidades de origem dos alunos
cadastrados, não é necessário e nem desejável que as cidades se repitam no retorno
da consulta.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSeS
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSeS
05490709405 - Lorenna SizaDML
Notem que essa é a nossa tabela original de referência!
Poderíamos selecionar a coluna cidade da tabela por meio do seguinte
comando:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSeS
05490709405 - Lorenna SizaDML
Ora, o resultado retornou cheio de duplicatas!
Já imaginaram se essa tabela contivesse 1000 registros? Ficaria inviável!
Queremos saber apenas quais são as cidades, sem repetições.
Dito isso, existe uma palavra-chave que pode ser utilizada junto com o comando
SELECT que tem a função justamente de eliminar os registros duplicados.
Essa palavra-chave se chama DINSTINCT!
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSeS
05490709405 - Lorenna SizaDML
Vamos ver como é a sua sintaxe:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSeS
05490709405 - Lorenna SizaDML
Notem que os registro duplicados foram eliminados porque essa palavra-chave
ajuda a selecionar apenas registros distintos (DISTINCT).
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSeS
05490709405 - Lorenna SizaDML
E o Alias??!!
É um recurso utilizado para dar a uma tabela (ou a uma coluna de uma tabela)
um nome temporário com o intuito de tornar os nomes das colunas mais legíveis, ou
para retirar ambiguidades de consultas, como veremos mais tarde. Existe apenas
durante a determinada consulta e é criado por meio da palavra-chave AS (que pode
ser omitida).
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Vamos ver como é a sua sintaxe:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Vejam que demos apelidos pequenos, o que pode facilitar bastante!
Em geral, esse recurso é muito útil quando existe mais de uma tabela envolvida
em uma consulta; quando funções são utilizadas dentro de uma consulta; quando
nomes de colunas são muito grandes ou pouco intuitivos; e quando duas ou mais
colunas são combinadas em uma só.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Podemos ainda inserir constantes em vez de nomes de tabelas. Por exemplo,
podemos pedir para a consulta retornar uma constante para cada registro da tabela:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaQUESTÕES
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza34) (UFFS) Qual alternativa informa uma seleção de todas as colunas da tabela
USUARIO no banco de dados?
a) SELECT % FROM USUARIO
b) SELECT *.* FROM USUARIO
c) SELECT @ FROM USUARIO
d) SELECT # FROM USUARIO
e) SELECT * FROM USUARIO
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza35) (ALGÁS) Os operadores de Seleção, Projeção e Produto Cartesiano da álgebra
relacional são implementados, respectivamente, através das seguintes cláusulas SQL:
a) Select, From e Where, respectivamente.
b) Where, Select e From, respectivamente.
c) Where, From e Select, respectivamente.
d) Select, From e Product, respectivamente.
e) Where, Select e Join, respectivamente.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza36) (UFPA) O comando SQL utilizado para exibir dados sem repetição em um banco
de dados é o:
a) SELECT DISTINCT.
b) SELECT INDIVIDUAL.
c) EXTRACT ONE.
d) EXTRACT ONLYDIFFERENT.
e) RESUME SINGLE.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaOBRIGADA
Prof. Emannuelle Gouveia
@emannuellegouveia
05490709405 - Lorenna Siza05490709405 - Lorenna Siza05490709405 - Lorenna Siza05490709405 - Lorenna SizaINFORMÁTICA
Profa. Emannuelle Gouveia
@Emannuellegouveia
05490709405 - Lorenna SizaBANCO DE DADOS
RELACIONAIS
Prof. Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaSQL
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaPARTE 4
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Essa linguagem possui um conjunto de comandos que podem ser utilizados para
realizar transações em um banco de dados (inserir, excluir, deletar ou consultar).
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Aqui estão agrupados os comandos para a manipulação dos dados em si.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaSELECT
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Select:
Esse comando é utilizado para recuperar informações de um banco de dados.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Observem no exemplo acima que utilizamos o elemento asterisco (*) e isso
significa que queremos recuperar todas as colunas da tabela.
Aliás, sempre que vocês virem o asterisco (*), podem interpretar como: “todas
as colunas”.
Vejam no esquema abaixo o exemplo de comando e a sua respectiva
interpretação para que vocês consigam entender isso melhor:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
E para selecionar colunas específicas da tabela?
Não há problema: nós podemos selecionar, por exemplo, as colunas NOME e
DATA_NASCIMENTO:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Eliminando duplicatas nas consultas.
Há casos em eu não desejamos que a consulta retorne valores repetidos,
chamados de duplicatas.
Por exemplo: na tabela original, nós tínhamos uma coluna CIDADES e ela possui
alguns valores repetidos, se desejamos saber quais as cidades de origem dos alunos
cadastrados, não é necessário e nem desejável que as cidades se repitam no retorno
da consulta.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSeS
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSeS
05490709405 - Lorenna SizaDML
Notem que essa é a nossa tabela original de referência!
Poderíamos selecionar a coluna cidade da tabela por meio do seguinte
comando:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSeS
05490709405 - Lorenna SizaDML
Ora, o resultado retornou cheio de duplicatas!
Já imaginaram se essa tabela contivesse 1000 registros? Ficaria inviável!
Queremos saber apenas quais são as cidades, sem repetições.
Dito isso, existe uma palavra-chave que pode ser utilizada junto com o comando
SELECT que tem a função justamente de eliminar os registros duplicados.
Essa palavra-chave se chama DINSTINCT!
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSeS
05490709405 - Lorenna SizaDML
Vamos ver como é a sua sintaxe:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSeS
05490709405 - Lorenna SizaDML
Notem que os registro duplicados foram eliminados porque essa palavra-chave
ajuda a selecionar apenas registros distintos (DISTINCT).
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSeS
05490709405 - Lorenna SizaDML
E o Alias??!!
É um recurso utilizado para dar a uma tabela (ou a uma coluna de uma tabela)
um nome temporário com o intuito de tornar os nomes das colunas mais legíveis, ou
para retirar ambiguidades de consultas, como veremos mais tarde. Existe apenas
durante a determinada consulta e é criado por meio da palavra-chave AS (que pode
ser omitida).
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Vamos ver como é a sua sintaxe:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Vejam que demos apelidos pequenos, o que pode facilitar bastante!
Em geral, esse recurso é muito útil quando existe mais de uma tabela envolvida
em uma consulta; quando funções são utilizadas dentro de uma consulta; quando
nomes de colunas são muito grandes ou pouco intuitivos; e quando duas ou mais
colunas são combinadas em uma só.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Podemos ainda inserir constantes em vez de nomes de tabelas. Por exemplo,
podemos pedir para a consulta retornar uma constante para cada registro da tabela:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Vamos agora começar a estudar as cláusulas do SQL e isso vai exigir MUITA
atenção!!
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
FROM: ela especifica de onde (quais tabelas) devemos selecionar os dados.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Observem que é possível especificar mais de uma tabela separada por vírgula e
que, quando isso ocorre, temos um Produto Cartesiano .
Vejamos um exemplo:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Notem que as colunas da tabela resultante é basicamente a união das colunas
das tabelas especificadas, uma vez que utilizamos o asterisco (*).
Já linhas da tabela resultante é basicamente uma combinação de todas as linhas
de uma tabela com todas as linhas de outra.
Chama-se produto cartesiano justamente porque o resultado é um produto, isto
é, o número de linhas de uma tabela (3) vezes o número de linhas de outra tabela (2)
retorna uma tabela resultante com 3x2 = 6 linhas.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Agora vejam como as coisas se relacionam: quando fazemos combinações entre
tabelas, os apelidos (alias) se tornam extremamente úteis, visto que, eventualmente,
podemos fazer o produto de duas ou mais tabelas que possuem atributos com o
mesmo nome.
Imagine o produto cartesiano entre uma tabela chamada PRODUTO e outra
tabela chamada EMPRESA e imagine que ambas as tabelas possuem uma coluna
chamada CÓDIGO.
Observe que, nesse caso, a tabela resultante teria duas colunas com o mesmo
nome. Para evitar esse tipo de problema e reduzir a ambiguidade, utilizam-se os
alias.
Podemos chamar a tabela PRODUTO de P e a tabela EMPRESA de E e, dessa
forma, a tabela resultante teria uma coluna P.CODIGO e outra coluna chamada
E.CODIGO e não temos mais ambiguidade.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
JOIN: Essa cláusula é utilizada para combinar linhas/registros de duas ou mais
tabelas, com base em uma COLUNA em comum entre elas.
Podem ser de cinco tipos diferentes:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
O INNER JOIN (ou apenas JOIN) → é uma cláusula que seleciona registros que
contenham valores correspondentes em ambas as tabelas.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
O que esse comando está nos dizendo?
Ele está nos dizendo para selecionar (SELECT) todas as linhas de ambas as
tabelas (FROM PEDIDOS INNER JOIN CLIENTES) desde que exista uma
correspondência entre as colunas (ON PEDIDOS.ID_CLIENTE = CLIENTES.ID_CLIENTE)
e, após isso, retornar as colunas PEDIDOS.ID_PEDIDO e CLIENTES.NOME_CLIENTE.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
O resultado é apresentado na tabela a seguir:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Note que a coluna em comum é ID_CLIENTE.
A tabela PEDIDOS possui três valores para essa coluna: [2, 37, 77]; já a tabela
CLIENTES também possui três valores para essa coluna: [1, 2, 3].
Como se trata de um INNER JOIN, a tabela resultante retornará apenas os
registros que possuem correspondência em ambas as tabelas.
Qual é o valor comum entre as tabelas? É o 2, que corresponde à cliente Ana.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Lembrando também que é possível fazer um INNER JOIN com mais de duas
tabelas, conforme mostra o exemplo seguinte (com três tabelas):
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Observem que as tabelas que compõem um INNER JOIN devem possuir uma
COLUNA em comum que podem possuir o mesmo nome, mas isso não é obrigatório.
Caso elas possuam o mesmo nome, é possível utilizar a palavra-chave USING para
melhorar a leitura do código e sua compreensão.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
O LEFT JOIN (ou LEFT OUTER JOIN) → retorna todos os registros da tabela da
esquerda, além dos registros correspondentes da tabela da direita.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
O que esse comando está nos dizendo?
Ele está nos dizendo para selecionar (SELECT) todas as linhas da tabela da
esquerda (FROM PEDIDOS LEFT JOIN), além dos registros da tabela da direita
(CLIENTES) desde que exista uma correspondência entre as colunas (ON
PEDIDOS.ID_CLIENTE = CLIENTES.ID_CLIENTE) e, após isso, retornar as colunas
PEDIDOS.ID_PEDIDO e CLIENTES.NOME_CLIENTE.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
O resultado é apresentado na tabela a seguir:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Note que a coluna em comum é ID_CLIENTE.
A tabela PEDIDOS possui três valores para essa coluna: [2, 37, 77]; já a tabela
CLIENTES também possui três valores para essa coluna: [1, 2, 3].
Como se trata de um LEFT JOIN, a tabela resultante retornará todos os registros
da tabela da esquerda e seus valores correspondentes da tabela da direita (se
houver).
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
O RIGHT JOIN (ou RIGHT OUTER JOIN) --> retorna todos os registros da tabela da
direita, além dos registros correspondentes da tabela da esquerda.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
O que esse comando está nos dizendo?
Ele está nos dizendo para selecionar (SELECT) todas as linhas da tabela da
direita (CLIENTES), além dos registros da tabela da esquerda (FROM PEDIDOS RIGHT
JOIN) desde que exista uma correspondência entre as colunas (ON
PEDIDOS.ID_CLIENTE = CLIENTES.ID_CLIENTE) e, após isso, retornar as colunas
PEDIDOS.ID_PEDIDO e CLIENTES.NOME_CLIENTE.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
O resultado é apresentado na tabela a seguir:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Note que a coluna em comum é ID_CLIENTE. A tabela PEDIDOS possui três
valores para essa coluna: [2, 37, 77]; já a tabela CLIENTES também possui três valores
para essa coluna: [1, 2, 3].
Como se trata de um RIGHT JOIN, a tabela resultante retornará todos os
registros da tabela da direita e seus valores correspondentes da tabela da esquerda
(se houver).
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
O FULL JOIN (ou FULL OUTER JOIN) → retorna todos os registros quando há uma
correspondência da tabela esquerda com a direita ou da direita com a esquerda.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
O que esse comando está nos dizendo?
Ele está nos dizendo para selecionar (SELECT) todas as linhas da tabela da
direita e da esquerda (FROM PEDIDOS FULL OUTER JOIN CLIENTES) desde que exista
uma correspondência entre as colunas (ON PEDIDOS.ID_CLIENTE =
CLIENTES.ID_CLIENTE) e, após isso, retornar as colunas PEDIDOS.ID_PEDIDO e
CLIENTES.NOME_CLIENTE.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
O resultado é apresentado na tabela a seguir:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Note que a coluna em comum é ID_CLIENTE. A tabela PEDIDOS possui três
valores para essa coluna: [2, 37, 77]; já a tabela CLIENTES também possui três valores
para essa coluna: [1, 2, 3].
Como se trata de um FULL OUTER JOIN, a tabela resultante retornará todos os
registros da tabela da direita e da esquerda e seus valores correspondentes (se
houver).
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
O SELF JOIN → Relaciona uma tabela consigo mesma é um auto-relacionamento.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Deem uma olhadinha para as três primeiras colunas da tabela e observem que a
tabela de clientes armazena dados sobre quem foi o cliente que realizou a indicação.
É possível concluir, por exemplo, que Alfredo (1) foi indicado por Ana (2), Ana
(2) foi indicada por Antonio (3) e Antonio (3) não foi indicado por ninguém (NULL).
Nesse caso, o SELF JOIN retornará quem foi o cliente que indicou outro cliente.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Vamos ver um exemplo:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
O resultado é apresentado na tabela a seguir:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
WHERE → Essa cláusula é responsável por permitir a filtragem dos registros de uma
tabela por meio de uma ou mais condições.
Lembremos da nossa tabela ALUNO_ESTRATEGIA
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Ao aplicarmos o comando:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Essa cláusula pode ser usada com os comando SELECT, UPDATE e DELETE.
A condição é uma expressão booleana que retornará um valor TRUE ou FALSE.
Existem diversas maneiras de definir uma condição utilizando operadores relacionais
e lógicos para comparar valores.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Resumo do que já aprendemos:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Vamos agora estudar os operadores relacionais:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Os operadores lógicos são um pouco mais complexos, logo vamos vê-los com
um pouco mais de detalhes.
Vamos começar pelos operadores AND, OR e NOT!
Os dois primeiros são utilizados para filtrar registros baseado em mais de uma
condição, de forma que o AND exibe um registro se todas as condições separadas
por ele forem verdadeiras; e o OR exibe um registro se qualquer uma das condições
separadas por ele for verdadeira.
Já o NOT é basicamente uma negação que inverte o significado de um operador
lógico.
Vamos ver a sintaxe de cada um e seus respectivos exemplos.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
AND
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Vejam que o resultado filtrou a tabela original, retornando apenas os registros
cuja cidade era Salvador E cujo valor pago foi maior ou igual a 250.00.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
OR
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Vejam que o resultado filtrou a tabela original, retornando apenas os registros
cuja cidade era Salvador OU cujo valor pago foi maior ou igual a 250.00.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
NOT
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Vejam que o resultado filtrou a tabela original, retornando apenas os registros
cuja cidade NÃO era Brasília, tanto que ele retorna registros com São Paulo, Goiânia
e Salvador.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Observem que todos esses operadores podem ser
combinados entre si.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
BETWEEN
O BETWEEN permite selecionar valores (números, textos ou datas) dentro
de um determinado intervalo, incluindo as extremidades.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Observem que o resultado contém valores entre 150.00 e 300.00 incluindo o
150.00 e 300.00.
Por essa razão, retornou o registro cujo nome é Caio!
Lembrando que é possível combinar esse operador com outros operadores,
além de poder utilizá-lo também com textos ou datas.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
LIKE
O LIKE é utilizado em uma cláusula WHERE para pesquisar um padrão
especificado em uma coluna por meio da utilização de caracteres curingas
(wildcards) que são utilizados para substituir um ou mais caracteres em uma string
(cadeia de caracteres).
Existem diversos caracteres curingas que variam a depender do SGBD, mas os
dois caracteres curingas principais são:
sinal de porcentagem (%) → substitui zero, um ou mais caracteres
sinal de sublinhado (_) → substitui um único caractere
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Vejamos a sintaxe:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Vejamos – para cada operador curinga – quais palavras poderiam ser aceitas
(em verde) e quais não poderiam (em vermelho):
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Dada a nossa clássica tabela apresentada abaixo, vamos ver como seriam
diversos exemplos de comandos utilizando o operador LIKE e seus caracteres
curingas:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaOBRIGADA
Prof. Emannuelle Gouveia
@emannuellegouveia
05490709405 - Lorenna Siza05490709405 - Lorenna Siza05490709405 - Lorenna Siza05490709405 - Lorenna SizaINFORMÁTICA
Profa. Emannuelle Gouveia
@Emannuellegouveia
05490709405 - Lorenna SizaBANCO DE DADOS
RELACIONAIS
Prof. Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaSQL
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaPARTE 5
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Essa linguagem possui um conjunto de comandos que podem ser utilizados para
realizar transações em um banco de dados (inserir, excluir, deletar ou consultar).
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaSELECT
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Vamos agora começar a estudar as cláusulas do SQL e isso vai exigir MUITA
atenção!!
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
WHERE → Essa cláusula é responsável por permitir a filtragem dos registros de uma
tabela por meio de uma ou mais condições.
Lembremos da nossa tabela ALUNO_ESTRATEGIA
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Ao aplicarmos o comando:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Essa cláusula pode ser usada com os comando SELECT, UPDATE e DELETE.
A condição é uma expressão booleana que retornará um valor TRUE ou FALSE.
Existem diversas maneiras de definir uma condição utilizando operadores relacionais
e lógicos para comparar valores.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
IS NULL e IS NOT NULL
São operadores utilizados para avaliar se uma coluna é nula ou não, pois os
operadores relacionais não podem ser utilizados para comparar valores nulos, caso
sejam utilizados para isso não gerará erro, mas retornará vazio.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
IN e NOT IN→
Permitem especificar múltiplos valores dentro de uma cláusula WHERE .
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Note que esse comando retorna todas as colunas da tabela em que a cidade
seja Salvador OU Goiânia. Aliás, esse operador é como a abreviação para várias
condições OR. Vamos comparar:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Com o operador IN podemos ter o aninhamento de consultas, ou seja uma
consulta dentro da outra que se torna uma subconsulta.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Podem ser de dois tipos:
Correlacionadas → são consultas que dependem e fazem referências às colunas de
consultas externas a qual estão contidas as subconsultas correlacionadas ;
Não correlacionadas → são consultas independentes das consultas externas nas
quais estão contidas.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Vamos usar essas tabelas como exemplos:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Esse caso trata de uma subconsulta não correlacionada.
Note que primeiro executamos a consulta interna e depois executamos a
consulta externa.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Vamos ver o resultado da consulta interna:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Agora vamos executar a consulta externa.
Observe que ela retornará todas as colunas da tabela ALUNO_ESTRATEGIA em
que a cidade esteja dentre as cidades da tabela acima:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Já a subconsulta correlacionada será explicada dentro do contexto do operador
EXISTS, logo vamos entendê-lo primeiro em detalhes...
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Exists
Testa a existência de qualquer registro em uma subconsulta. Ele retorna TRUE
se a subconsulta retornar um ou mais registros; caso contrário, retorna FALSE.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Note que esse comando retorna todos os registros da tabela de CAPITAIS desde
que a capital exista como uma das cidades da tabela ALUNO_ESTRATEGIA.
Esse é um clássico exemplo de subconsulta correlacionada.
Ao contrário da subconsulta não correlacionada, essa não pode ser executada
independentemente da consulta externa, dado que contém uma ou mais referências
a colunas da consulta externa.
Inclusive, ela retornará erro caso se tente executá-la de forma independente.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Uma subconsulta correlacionada (interna) será executada uma vez para cada
linha candidata da consulta externa.
Os valores de cada linha da coluna candidata serão utilizados para fornecer
valores para as colunas da consulta externa no interior de cada execução da
subconsulta correlacionada.
Os resultados finais serão baseados nos resultados de cada execução da
subconsulta correlacionada.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Considerem a tabela abaixo com a base para os exemplos que vamos analisar:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Vamos começar por meio da seguinte consulta:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Em primeiro lugar, podemos notar que se trata de uma consulta aninhada, dado
que temos uma consulta dentro de outra.
Em segundo lugar, podemos notar que a consulta interna é uma subconsulta
correlacionada, dado que temos uma referência a uma coluna da consulta externa.
Dito isso, agora vamos analisar, para cada tupla da consulta externa, se a
consulta interna retorna algum valor.
Se sim, retornaremos também para a consulta externa; caso contrário, não.
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Observe que temos a consulta interna e a consulta externa tratando da mesma
tabela, porém uma é chamada de ARVORE_GENEALOGICA e a outra tem um alias
chamado AG:
Informática
Profa: Emannuelle Gouveia
@Emannuelle GouveiaSe
05490709405 - Lorenna SizaDML
Agora vamos pegar cada tupla da consulta externa e vamos validar a consulta
interna, de modo que a tupla da consulta externa será retornada se, e somente se, a
consulta interna retornar alguma tupla.
Perceba que a consulta interna retornará todas as tuplas da tabela AG desde
que a coluna ASCENDENTE da tabela AG seja “Bruno” e a coluna DESCENDENTE da
tabela AG seja igual à coluna ASCENDENTE da tabela ARVORE_GENEALOGICA.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Agora vamos para a prática:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
A primeira tupla da tabela da consulta externa é (ALICE, LAURA) e essa tupla
será retornada apenas se a consulta interna retornar alguma tupla. Vamos ver se ela
retorna?
A primeira tupla da consulta interna também é (ALICE, LAURA), porém, a
consulta interna só retornará essa tupla se AG.ASCENDENTE = “Bruno”.
Ora, acabamos de ver que, para essa tupla, AG.ASCENDENTE é “Alice”, logo
nem precisamos ver o restante da consulta porque essa tupla já não será retornada.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Vamos agora para a segunda tupla da tabela da consulta interna: (BRUNO,
ELIS).
A consulta interna só retornará essa tupla se AG.ASCENDENTE = “Bruno”.
É realmente “Bruno”, mas ainda não acabou: AG.DESCENDENTE deve ser igual a
ARVORE_GENEALOGICA.ASCENDENTE.
Ora, AG.DESCENDENTE é ELIS e ARVORE_GENEALOGICA.ASCENDENTE é ALICE,
logo, essa tupla também não será retornada porque não cumpriu as duas condições
do operador AND.
Viram que nós temos que fazer um por um?
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Em tese, teríamos que fazer 7 x 7 = 49 avaliações, no entanto, é possível
identificar alguns atalhos: o nome de AG.ASCENDENTE deve ser “Bruno”.
Isso só ocorre em duas oportunidades:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Vejam que ocorre somente nas tuplas (BRUNO, ELIS) e (BRUNO, HUGO).
Nesses dois casos, temos AG.DESCENDENTE = (ELIS, HUGO).
Por fim, vejam que temos ELIS ou HUGO como ASCENDENTE na tabela
ARVORE_GENEALOGICA apenas em duas oportunidades: (ELIS, CAIO) e (HUGO,
GABI).
Logo, essas são as tuplas que serão retornadas pela consulta externa.
Interessante, não?
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Vejam como isso seria em termos de tabela:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Resultado final do comando:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
GROUP BY
A cláusula GROUP BY foi criada e adicionada à linguagem SQL porque a cláusula
WHERE não podia ser utilizada com funções de agregação.
Imaginem que vocês queiram um relatório com alguma quantidade, soma,
valores máximos, valores mínimos, média, entre outros, para isso, você precisará
utilizar uma função de agregação junto com a cláusula GROUP BY.
Vamos ver a seguir sintaxes e exemplos...
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Essa cláusula buscará registros de uma tabela que possuem um valor em
comum para um ou mais atributos e os agrupará baseado em algum critério de
agrupamento (soma, média, quantidade, etc).
No caso do comando anterior, ele buscará registros que tenham o mesmo valor
para o atributo CIDADE e os agrupará pela quantidade (Brasília tem quatro aparições;
São Paulo tem uma aparição; Goiânia tem uma aparição; e Salvador tem duas
aparições).
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Vejamos o resultado do comando:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Na tabela a seguir, podemos ver outras funções de agregação – lembrando que
todas elas podem ser utilizadas com o operador DISTINCT!
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Vamos relembrar a nossa tabela de exemplo:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
SUM
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
OBS:
Na função SUM, é possível inserir um valor de tal modo que, para cada registro
encontrado, esse valor seja somado.
Ex: SUM(2) somará duas unidades para cada registro encontrado. Logo, se
encontrou 3 registros, retornará 2x3 = 6.
Lembrando que SUM(1) = COUNT(*) = COUNT(1).
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
AVG
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
MAX
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
MIN
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Funções de agregação em geral, podem ser utilizadas sem necessariamente o
uso do GROUP BY.
Vamos ver alguns exemplos:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
HAVING
A cláusula WHERE filtra linhas de acordo com alguma condição, já a cláusula
HAVING filtra agrupamentos também de acordo com alguma condição.
Dessa forma, podemos concluir que a cláusula HAVING só pode existir se houver
anteriormente uma cláusula GROUP BY.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
No exemplo a seguir, queremos filtrar o agrupamento de modo que só mostre
as linhas cuja função agregada COUNT(CPF) seja maior que 1.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Nossa tabela usada como exemplo.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
A coluna utilizada na cláusula HAVING deve necessariamente estar na lista de
colunas selecionadas no SELECT ou estar contida dentro de uma função de
agregação.
Dessa forma, se fizermos um SELECT de CIDADE junto de uma função de
agregação selecionada, a cláusula HAVING poderá filtrar por CIDADE, pela função de
agregação selecionada ou por uma coluna (Ex: VALOR_PAGO) desde que ela esteja
contida dentro de uma função de agregação.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Note que VALOR_PAGO não pode ser utilizado no HAVING porque não consta
do SELECT, mas como está dentro de uma função de agregação (MAX), sua utilização
é permitida.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
ORDER BY
Permite ordenar registros/linhas de uma tabela em ordem crescente (ASC) ou
decrescente (DESC).
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Nossa tabela usada como exemplo.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
•
•
•
•
•
OBSERVAÇÕES:
A coluna utilizada para ordenação na cláusula ORDER BY deve necessariamente
estar na lista de colunas do SELECT, em uma função de agregação qualquer ou
ainda em uma coluna definida em uma tabela do FROM.
O valor padrão para ordenação, em caso de ausência no comando, é ASC.
Observe que várias combinações são possíveis, logo é permitido utilizar o ORDER
BY apenas com SELECT e FROM.
É possível também representar a coluna responsável pela ordenação por meio de
um número que indique a ordem da coluna (Ex: 1 é primeira coluna, 2 é segunda
coluna, 3 é terceira coluna, etc).
É possível indicar mais de uma coluna para ordenação (no caso de empates).
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Note que ele ordenou pela coluna #6 (VALOR_PAGO), mas – como houve um
empate de VALOR_PAGO de 50.00 – ele ordenou pela coluna #1 (NOME).
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
LIMIT
Essa cláusula restringe o conjunto de resultados a um número fixo de linhas ou
até ele em caso de quantidade menor no BD.
Essa cláusula não faz parte do padrão SQL puro, logo outros dialetos possuem
variações: MS-SQL Server chama de TOP e o Oracle chama de ROWNUM.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
OPERADOR UNION
É utilizado para combinar os resultados de duas ou mais instruções SELECT.
No seu uso, cada uma dessas instruções deve conter o mesmo número de
colunas, as colunas devem ter tipos de dados semelhantes e a mesma ordem.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Esse comando elimina eventuais linhas duplicadas. Caso se queira permitir
linhas duplicadas, utiliza-se a instrução UNION ALL:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
O resultado é muito simples: esse comando basicamente une/junta as linhas
das tabelas que compõem a união.
Se tinham 10 linhas em cada tabela, teremos 20 (exceto se houver duplicatas).
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Observe que a única cláusula obrigatória do SELECT é o FROM e todas as outras
são opcionais.
Observe também que elas devem vir na ordem abaixo e, se houver um HAVING,
antes deve existir um GROUP BY.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDTL
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDTL
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDTL
Commit
É o comando utilizado para salvar permanentemente uma transação em um
banco de dados, visto que as transações DML não apresentam efeitos permanentes,
ficam em um estado intermediário até que sejam confirmadas
Esse comando efetiva todas as transações de uma base de dados desde o último
COMMIT ou ROLLBACK.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDTL
Rollback
É o comando utilizado para cancelar transações e retornar para o último estado
em que foi realizado COMMIT.
Serão desfeitas transações desde o último COMMIT ou ROLLBACK.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDCL
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDCL
Conjunto de comandos que são utilizados para controle de permissões de
usuários para a manipulação de dados.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDCL
GRANT
É o comando utilizado para conceder permissões a usuários em relação a
objetos.
Há nove funções permitidas: SELECT, INSERT, UPDATE, DELETE, REFERENCES,
USAGE, UNDER, TRIGGER e EXECUTE.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDCL
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDCL
REVOKE
É o comando usado para revogar permissões a usuários em relação a objetos.
Há nove funções: SELECT, INSERT, UPDATE, DELETE, REFERENCES, USAGE, UNDER,
TRIGGER e EXECUTE.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDCL
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaOBRIGADA
Prof. Emannuelle Gouveia
@emannuellegouveia
05490709405 - Lorenna Siza05490709405 - Lorenna Siza05490709405 - Lorenna Siza05490709405 - Lorenna SizaINFORMÁTICA
Profa. Emannuelle Gouveia
@Emannuellegouveia
05490709405 - Lorenna SizaBANCO DE DADOS
RELACIONAIS
Prof. Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaSQL
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaPARTE 6
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaSELECT
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
LIMIT
Essa cláusula restringe o conjunto de resultados a um número fixo de linhas ou
até ele em caso de quantidade menor no BD.
Essa cláusula não faz parte do padrão SQL puro, logo outros dialetos possuem
variações: MS-SQL Server chama de TOP e o Oracle chama de ROWNUM.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
OPERADOR UNION
É utilizado para combinar os resultados de duas ou mais instruções SELECT.
No seu uso, cada uma dessas instruções deve conter o mesmo número de
colunas, as colunas devem ter tipos de dados semelhantes e a mesma ordem.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Esse comando elimina eventuais linhas duplicadas. Caso se queira permitir
linhas duplicadas, utiliza-se a instrução UNION ALL:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
O resultado é muito simples: esse comando basicamente une/junta as linhas
das tabelas que compõem a união.
Se tinham 10 linhas em cada tabela, teremos 20 (exceto se houver duplicatas).
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Observe que a única cláusula obrigatória do SELECT é o FROM e todas as outras
são opcionais.
Observe também que elas devem vir na ordem abaixo e, se houver um HAVING,
antes deve existir um GROUP BY.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDTL
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDTL
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDTL
Commit
É o comando utilizado para salvar permanentemente uma transação em um
banco de dados, visto que as transações DML não apresentam efeitos permanentes,
ficam em um estado intermediário até que sejam confirmadas
Esse comando efetiva todas as transações de uma base de dados desde o último
COMMIT ou ROLLBACK.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDTL
Rollback
É o comando utilizado para cancelar transações e retornar para o último estado
em que foi realizado COMMIT.
Serão desfeitas transações desde o último COMMIT ou ROLLBACK.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDCL
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDCL
Conjunto de comandos que são utilizados para controle de permissões de
usuários para a manipulação de dados.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDCL
GRANT
É o comando utilizado para conceder permissões a usuários em relação a
objetos.
Há nove funções permitidas: SELECT, INSERT, UPDATE, DELETE, REFERENCES,
USAGE, UNDER, TRIGGER e EXECUTE.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDCL
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDCL
REVOKE
É o comando usado para revogar permissões a usuários em relação a objetos.
Há nove funções: SELECT, INSERT, UPDATE, DELETE, REFERENCES, USAGE, UNDER,
TRIGGER e EXECUTE.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaDCL
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaCONCEITOS AVANÇADOS
DATABASES
CREATE DATABASE → permite criar um banco de dados.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaCONCEITOS AVANÇADOS
DROP DATABASE → permite excluir um banco de dados.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaCONCEITOS AVANÇADOS
OBS:
Ao excluir um banco de dados seus dados também serão apagados, por isso, a
exclusão só pode ser realizada por usuários que tenham privilégios de administrador;
Apesar de estarmos estudando em tópicos separados e ao final da aula, ambos
os comandos de bancos de dados fazem parte da DDL e precedem todos os outros,
visto que é necessário criar um banco de dados para poder manipulá-lo.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaCONCEITOS AVANÇADOS
Views
Uma visão (view) é uma tabela virtual baseada no conjunto de resultados de
uma instrução SQL.
Ela contém linhas e colunas, assim como uma tabela real.
Os campos em uma visão são campos de uma ou mais tabelas reais no banco de
dados.
Você pode adicionar instruções e funções a uma visualização e apresentar os
dados como se fossem provenientes de uma única tabela.
Dito isso, vamos ver seus principais comandos a partir da tabela abaixo:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaCONCEITOS AVANÇADOS
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaCONCEITOS AVANÇADOS
CREATE VIEW
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaCONCEITOS AVANÇADOS
Vejam no exemplo anterior que nós criamos uma view para retornar apenas
alunos brasilienses, logo nós fizemos uma seleção de NOME e CIDADE da tabela
ALUNO_ESTRATEGIA em que a cidade seja BRASÍLIA.
Uma vez criada a view, eu posso consultá-la diretamente da seguinte forma:
SELECT * FROM [BRASILIENSES].
Lembrando que uma visão sempre mostra dados atualizados, pois o mecanismo
de banco de dados recria a visualização sempre que um usuário a consulta.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaCONCEITOS AVANÇADOS
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaCONCEITOS AVANÇADOS
CREATE OR REPLACE VIEW
Esse comando permite alterar uma view existente ou, caso ela ainda não exista,
permite criá-la.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaCONCEITOS AVANÇADOS
No exemplo abaixo, nós alteramos a view para que ela retorne também o e-
mail:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaCONCEITOS AVANÇADOS
DROP VIEW
A ideia aqui é simplesmente excluir uma view.
Lembrando que a manipulação de views faz parte da DDL, sendo considerada
uma sublinguagem chamada VDL (View Definition Language).
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaCONCEITOS AVANÇADOS
Stored Procedures
Uma Stored Procedure é um código pré-preparado que pode ser salvo, para
que possa ser reutilizado em outras ocasiões repetidamente.
Logo, se há uma consulta SQL que utilizada frequentemente, é possível salvá-la
como uma espécie de procedimento armazenado e, em seguida, apenas chamá-lo
para que a consulta seja executada.
Lembrando que se pode passar parâmetros de entrada para um procedimento
armazenado.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaCONCEITOS AVANÇADOS
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaCONCEITOS AVANÇADOS
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaCONCEITOS AVANÇADOS
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaCONCEITOS AVANÇADOS
Note que o resultado foi idêntico ao da view.
Então, uma view é a mesma coisa que uma stored procedure?
Não, uma visão representa uma Tabela Virtual e se pode juntar várias tabelas
em uma visão e utilizá-la para apresentar os dados como se todos eles viessem de
uma única tabela.
Uma Stored Procedure utiliza parâmetros para executar uma atividade, seja
atualizando e inserindo dados ou retornando valores únicos ou conjuntos de dados.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaQUESTÕES
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza01) (Prefeitura de Teresina/PI – 2016) Em um banco de dados relacional os
comandos são classificados em: − DDL – Data Definition Language. − DML – Data
Manipulation Language. − DCL – Data Control Language. − TCL – Transaction Control
Language.
Os seguintes comandos: COMMIT, CREATE, ROLLBACK, DELETE, REVOKE e
UPDATE, são respectivos a:
a) DDL, DDL, TCL, DML, DML e DCL.
b) TCL, DDL, TCL, DML, DCL e DML.
c) DML, TCL, DDL, DDL, DCL e DML.
d) TCL, DDL, TCL, DDL, DCL e DML.
e) DCL, DDL, TCL, DDL, DCL e DML.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza02) (Itaipu Binacional – 2017) Assinale a alternativa que identifica corretamente o
comando SQL usado para tornar permanentes as alterações realizadas desde o início
de uma transação.
a) COMMIT
b) SAVE
c) SYNC
d) FLUSH
e) APPEND
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza03) (Banco da Amazônia) Uma transação é uma coleção de instruções SQL DML
tratada como uma unidade lógica, de forma que não seja necessário o uso de
commit, mesmo que implícito, para tornar as alterações permanentes.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza04) (EBSERH – 2015) Acerca dos conceitos de segurança dos sistemas de banco de
dados, entre os “comandos” que estruturam o SQL, existem aqueles, que compõem
um grupo, e são utilizados para atribuir as permissões que os usuários irão ter dentro
de um banco de dados (GRANT, DENY, REVOKE). Eles são classificados como:
a) DML.
b) DLL.
c) DDL.
d) DSQL.
e) DCL.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza05) (EBSERH) O comando REVOKE da linguagem SQL é utilizado para controle de:
a) bloqueios de transação.
b) acesso dos usuários do sistema.
c) monitoração e otimização de desempenho.
d) backup e restauração de dados.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza06. (FGV / SEFAZ-BA – 2022) Considere a seguinte tabela em um banco de dados
relacional.
Assinale a opção que indica o comando SQL utilizado para localizar todos os nomes
completos dos employees, cujos primeiros nomes começam com as letras Ma.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza07) (FADESP / SEFA-PA – 2022) A linguagem de banco de dados relacional SQL
(Structured Query Language) é um exemplo de linguagem de banco de dados
abrangente que representa uma combinação de:
a) TTL, VDL e DML.
b) TDL, GDL e DML.
c) DDL, VDL e DML.
d) DDL, VDL e BML.
e) DDL, GDL e BML
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza08) (CESPE / SEFAZ-SE – 2022) A respeito do código SQL (Structured Query Language)
anteriormente apresentado, assinale a opção correta.
select C.CPF as CPF, C.NOME as NOME
from CONTRIBUINTE as C, PARCELAMENTO as P
where C.CPF=P.CPF
and P.TIPO=’IPVA’
and P.DATAADESAO between ‘01/01/2021’ and
‘31/12/2021’
and P.STATUS=’ADIMPLENTE’
a) Há um erro de sintaxe em and P.DATAADESAO between ‘01/01/2021’ and
‘31/12/2021’, pois não é permitida a utilização do operador and mais de uma vez na
mesma linha.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Sizab) Há uma junção (JOIN) nesse código, a qual é especificada no trecho from
CONTRIBUINTE as C, PARCELAMENTO as P.
c) O objetivo do código é mostrar o CPF e o nome de todos os contribuintes que não
aderiram ao programa de parcelamento do IPVA no ano de 2021.
d) A palavra reservada between foi inserida no código equivocadamente, pois
somente deveria ser usada nos comandos de update e delete.
e) A finalidade do código é mostrar o CPF e o nome de todos os contribuintes que
aderiram ao parcelamento do IPVA no ano de 2021 e que estão com o seu
parcelamento em dia.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaA próxima questão se baseia na Figura 6, que mostra, esquematicamente, um
Diagrama Entidade-Relacionamento (DER) elaborado no MySQL Workbench 8.0, no
qual se inseriu, intencionalmente, nos locais apontados pelas setas nº 1 e 2,
retângulos para ocultar os relacionamentos existentes nesses locais.
Nesse DER, constam as entidades "Produto", "Aquisicao" e "Cliente",
implementadas de acordo com as seguintes regras de negócio:
(1) um cliente poderá adquirir um ou mais produtos, inclusive os mesmos produtos
mais de uma vez, em data/hora diferentes;
(2) um produto poderá ser adquirido por um ou mais clientes, inclusive o mesmo
cliente, mais de uma vez;
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza(3) deve ser possível cadastrar qualquer produto ou cliente, no banco de dados, sem
associá-los a qualquer outra tabela;
(4) ao se associar um cliente a um produto, armazena-se, no banco de dados, a
quantidade adquirida, a correspondente data/hora de aquisição e o preço
efetivamente pago (que poderá ser diferente do preço de tabela do produto, devido
ao cliente ter recebido um desconto no preço do produto).
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza09) (FUNDATEC / ISS-Porto Alegre – 2022) Sabe-se que, a partir do DER mostrado na
Figura 6, foram criadas e populadas as tabelas correspondentes em um Sistema
Gerenciador de Banco de Dados Relacional (SGBDR), tendo se respeitado,
rigorosamente, os conceitos do modelo relacional. Nesse caso, para criar a tabela
"Aquisicao", bastou executar a seguinte declaração, em SQL padrão ANSI:
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaCom base no modelo entidade-relacionamento (MER) precedente, que
apresenta a representação das regras de uma instituição de pesquisa, existe um
Pesquisador cadastrado com o nome Pedro.
Todos os atributos do MER são do tipo caractere e um dos comandos SQL
usados para a construção do modelo é mostrado a seguir.
create table Projeto codNacionalProjeto
char(2), codPesquisadorResponsavel char(2),
codPesquisadorOrientador char(2),
tituloProjeto char(50), primary
key(codNacionalProjeto));
A partir das informações constantes no modelo e dos dados sobre o conteúdo
dos atributos, julgue o item subsecutivo.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza10) (CESPE / PETROBRAS – 2022) Por meio do comando SQL a seguir, é possível
recuperar o nome dos pesquisadores responsáveis por projetos, seguido pelo nome
de seu orientador, mas apenas os projetos orientados por Pedro.
select responsavel.nome nomeresponsavel,
orientador.nome nomeorientador,
tituloProjeto
from Pesquisador responsavel, Pesquisador orientador, Projeto
where orientador.nome = 'Pedro'
andcodPesquisadorResponsavel = codPesquisador
and codPesquisadorOrientador = codPesquisador;
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza11) (CESPE / Petrobrás - 2022) Duas expressões SQL são equivalentes se e somente
se elas tiverem os mesmos comandos em suas respectivas sequências.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza12) (CESPE / Petrobrás - 2022) O comando truncate PESSOA; permite excluir todos os
registros da tabela de nome PESSOA
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza13.(CESPE / Petrobrás - 2022) A expressão SQL a seguir está sintaticamente correta e
permite inserir dois alunos de nomes Pedro e Maria na tabela alunos.
INSERT VALUES ('Pedro', 'Maria') INTO alunos;
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza14.(CESPE
/
TJ-RJ
-
2021)
Processo
(codprocesso,
autor,
reu,
dataultimamovimentacao, assunto, codjuiz) Juiz (codjuiz, nome).
Considerando as tabelas anteriores, de um banco de dados relacional, assinale a
opção cuja consulta em SQL mostra os nomes dos juízes para os quais não há
processos distribuídos (relacionados).
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza15) .(CESPE / DPE-RO – 2021)
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaPara a expressão SQL anterior, a cardinalidade entre as entidades aluno e cidade é:
a) zero-para-muitos.
b) muitos-para-muitos.
c) um-para-um.
d) muitos-para-um.
e) um-para-muitos.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza16) (CESPE / DPE-RO – 2021) Assinale a opção que apresenta o comando SQL usado
para excluir todos os registros de uma tabela de nome aluno, mantendo-se a
estrutura da tabela:
a) delete aluno
b) erase aluno
c) erase from aluno
d) delete from aluno
e) drop from aluno
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza17) (CESPE / APEX-BRASIL – 2021) create database pessoa;
O comando SQL apresentado anteriormente criará:
a) um banco de dados denominado pessoa;
b) uma tabela denominada pessoa;
c) um tipo de dados denominado pessoa;
d) um esquema denominado pessoa;
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza18)(CESPE / Polícia Federal – 2021) Na linguagem SQL (structured query language),
DTL (data transaction language) são comandos responsáveis por gerenciar diferentes
transações ocorridas dentro de um banco de dados.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza19)(FGV / FUNSÚDE-CE – 2021) Atenção: na próxima questão, considere a definição e
as instâncias das tabelas de bancos de dados CLUBE e JOGO exibidas a seguir.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaCada clube deve jogar quatro vezes, duas como mandante e duas como
visitante. As colunas golsM e golsV registram o número de gols dos times mandantes
e visitantes, respectivamente, em cada jogo. Ambas são nulas enquanto o jogo não
for realizado.
Analise o comando SQL a seguir, à luz das definições e instâncias das tabelas
CLUBE e JOGO, apresentadas anteriormente.
select distinct mandante, visitante from JOGO, CLUBE
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaAssinale o número de linhas, sem incluir os títulos, produzidas pela execução desse
comando:
a) 4.
b) 6.
c) 10.
d) 24.
e) 48.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza20.(FGV / FUNSÚDE-CE – 2021) Analise o comando SQL a seguir, à luz das definições
e instâncias das tabelas CLUBE e JOGO, definidas anteriormente.
select c.nome from CLUBE c where (
select count(*) from JOGO j where c.nome = j.mandante) <> 2 or (
select count(*) from JOGO j where c.nome = j.visitante) <> 2
O resultado produzido pela execução desse comando é a lista de todos os clubes
que:
a) aparecem em quatro jogos.
b) não aparecem em quatro jogos.
c) não aparecem em dois jogos como mandante ou que não aparecem em dois jogos
como visitante.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Sizad) aparecem em dois jogos como mandante ou que aparecem em dois jogos como
visitante.
e) aparecem em dois jogos como mandante e aparecem em dois jogos como
visitante.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza21) (FGV / TCE-AM – 2021) Considerando-se a instância da tabela T (descrita
anteriormente), analise o comando SQL abaixo.
delete from T where b + d = c
O número de registros da tabela T afetados pela execução desse comando é:
a) zero;
b) um;
c) dois;
d) três;
e) quatro.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza22) (FGV / TCE-AM – 2021) Considerando-se a instância da tabela T (descrita
anteriormente), analise o comando SQL abaixo.
update T
set a = a + 32
where
exists (select * from T t2 where T.c > t2.D)
O número de registros da tabela T afetados pela execução desse comando é:
a) zero;
b) um;
c) dois;
d) três;
e) quatro.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza23) .(FGV / TCE-AM – 2021) Considerando-se a instância da tabela T (descrita
anteriormente), analise o comando SQL abaixo.
select distinct * from T t1, T t2, T t3
A execução desse comando produz um resultado que, além da linha de títulos,
contém:
a) 8 linhas;
b) 24 linhas;
c) 32 linhas;
d) 64 linhas;
e) 128 linhas.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza24) .(FGV / IMBEL - 2021) Considere a instância da tabela R1 e o comando SQL
exibidos a seguir.
select distinct A
from R1
where A not in
(select B from R1)
Assinale a lista de números que é exibida quando esse comando SQL é executado.
a) 5.
b) 1,2.
c) 2,3.
d) 4,5.
e) 1, 2, 3, 4.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza25) (FGV / IMBEL – 2021) Considere o comando SQL a seguir, executado num banco
de dados relacional com duas tabelas, R1 e R2, contendo 2.000 e 5.000 registros,
respectivamente. R1 e R2 possuem chaves primárias definidas.
SELECT DISTINCT * FROM A, B
Assinale o número de linhas produzidas na execução:
a) 1.
b) 2.000.
c) 5.000.
d) 7.000.
e) 10.000.000
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaOBRIGADA
Prof. Emannuelle Gouveia
@emannuellegouveia
05490709405 - Lorenna Siza05490709405 - Lorenna Siza05490709405 - Lorenna Siza05490709405 - Lorenna SizaINFORMÁTICA
Profa. Emannuelle Gouveia
@Emannuellegouveia
05490709405 - Lorenna SizaBANCO DE DADOS
RELACIONAIS
Prof. Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaSQL
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaPARTE 7
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaQUESTÕES
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza14.(CESPE
/
TJ-RJ
-
2021)
Processo
(codprocesso,
autor,
reu,
dataultimamovimentacao, assunto, codjuiz) Juiz (codjuiz, nome).
Considerando as tabelas anteriores, de um banco de dados relacional, assinale a
opção cuja consulta em SQL mostra os nomes dos juízes para os quais não há
processos distribuídos (relacionados).
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza15) .(CESPE / DPE-RO – 2021)
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaPara a expressão SQL anterior, a cardinalidade entre as entidades aluno e cidade é:
a) zero-para-muitos.
b) muitos-para-muitos.
c) um-para-um.
d) muitos-para-um.
e) um-para-muitos.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza16) (CESPE / DPE-RO – 2021) Assinale a opção que apresenta o comando SQL usado
para excluir todos os registros de uma tabela de nome aluno, mantendo-se a
estrutura da tabela:
a) delete aluno
b) erase aluno
c) erase from aluno
d) delete from aluno
e) drop from aluno
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza17) (CESPE / APEX-BRASIL – 2021) create database pessoa;
O comando SQL apresentado anteriormente criará:
a) um banco de dados denominado pessoa;
b) uma tabela denominada pessoa;
c) um tipo de dados denominado pessoa;
d) um esquema denominado pessoa;
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza18)(CESPE / Polícia Federal – 2021) Na linguagem SQL (structured query language),
DTL (data transaction language) são comandos responsáveis por gerenciar diferentes
transações ocorridas dentro de um banco de dados.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza19)(FGV / FUNSÚDE-CE – 2021) Atenção: na próxima questão, considere a definição e
as instâncias das tabelas de bancos de dados CLUBE e JOGO exibidas a seguir.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaCada clube deve jogar quatro vezes, duas como mandante e duas como
visitante. As colunas golsM e golsV registram o número de gols dos times mandantes
e visitantes, respectivamente, em cada jogo. Ambas são nulas enquanto o jogo não
for realizado.
Analise o comando SQL a seguir, à luz das definições e instâncias das tabelas
CLUBE e JOGO, apresentadas anteriormente.
select distinct mandante, visitante from JOGO, CLUBE
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaAssinale o número de linhas, sem incluir os títulos, produzidas pela execução desse
comando:
a) 4.
b) 6.
c) 10.
d) 24.
e) 48.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza20.(FGV / FUNSÚDE-CE – 2021) Analise o comando SQL a seguir, à luz das definições
e instâncias das tabelas CLUBE e JOGO, definidas anteriormente.
select c.nome from CLUBE c where (
select count(*) from JOGO j where c.nome = j.mandante) <> 2 or (
select count(*) from JOGO j where c.nome = j.visitante) <> 2
O resultado produzido pela execução desse comando é a lista de todos os clubes
que:
a) aparecem em quatro jogos.
b) não aparecem em quatro jogos.
c) não aparecem em dois jogos como mandante ou que não aparecem em dois jogos
como visitante.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Sizad) aparecem em dois jogos como mandante ou que aparecem em dois jogos como
visitante.
e) aparecem em dois jogos como mandante e aparecem em dois jogos como
visitante.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza21) (FGV / TCE-AM – 2021) Considerando-se a instância da tabela T (descrita
anteriormente), analise o comando SQL abaixo.
delete from T where b + d = c
O número de registros da tabela T afetados pela execução desse comando é:
a) zero;
b) um;
c) dois;
d) três;
e) quatro.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza22) (FGV / TCE-AM – 2021) Considerando-se a instância da tabela T (descrita
anteriormente), analise o comando SQL abaixo.
update T
set a = a + 32
where
exists (select * from T t2 where T.c > t2.D)
O número de registros da tabela T afetados pela execução desse comando é:
a) zero;
b) um;
c) dois;
d) três;
e) quatro.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza23) .(FGV / TCE-AM – 2021) Considerando-se a instância da tabela T (descrita
anteriormente), analise o comando SQL abaixo.
select distinct * from T t1, T t2, T t3
A execução desse comando produz um resultado que, além da linha de títulos,
contém:
a) 8 linhas;
b) 24 linhas;
c) 32 linhas;
d) 64 linhas;
e) 128 linhas.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza24) .(FGV / IMBEL - 2021) Considere a instância da tabela R1 e o comando SQL
exibidos a seguir.
select distinct A
from R1
where A not in
(select B from R1)
Assinale a lista de números que é exibida quando esse comando SQL é executado.
a) 5.
b) 1,2.
c) 2,3.
d) 4,5.
e) 1, 2, 3, 4.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza25) (FGV / IMBEL – 2021) Considere o comando SQL a seguir, executado num banco
de dados relacional com duas tabelas, R1 e R2, contendo 2.000 e 5.000 registros,
respectivamente. R1 e R2 possuem chaves primárias definidas.
SELECT DISTINCT * FROM A, B
Assinale o número de linhas produzidas na execução:
a) 1.
b) 2.000.
c) 5.000.
d) 7.000.
e) 10.000.000
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza26) (FGV / IMBEL – 2021) Considere a instância da tabela R1 e o comando SQL
exibidos a seguir.
select distinct A
from R1
where exists
(select * from R1 x Where x.B > R1.A)
Assinale a lista de números que é exibida quando esse comando SQL é executado:
a) 5.
b) 1,2.
c) 2,3.
d) 3,4,5.
e) 1, 2, 3, 4.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza27) .(FGV / DPE-RJ – 2019) Considere a tabela FAMILIA descrita anteriormente e o
comando SQL a seguir.
select relação, sum(1)
from familia
group by relação
having count(*) > 1
order by 2 desc, 1
Os valores exibidos pela execução desse comando, na ordem, são:
a) mãe 4
pai 2
avo 1
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Sizab) mãe 2
pai 4
c) pai 2
mãe 4
d) mãe 4
pai 2
e) mãe 4
pai 2
avo ø
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza28) (FCC / TJ-MA – 2019) Considere a existência de um banco de dados aberto e em
condições ideais, no qual a tabela Processo possui diversos campos, sendo um deles,
o campo numero_processo, do tipo cadeia de caracteres (varchar). Para exibir todos
os processos cujo número inicie por qualquer caractere seguido de
"009.51.01.87348-6", utiliza-se a instrução SQL:
a) SELECT *.* FROM Processo WHERE numero_processo LIKE '_009.51.01.87348-6';
b) SELECT * FROM Processo WHERE numero_processo='#009.51.01.87348-6';
c) SELECT * FROM Processo WHERE numero_processo EQUALS '%009.51.01.87348-
6';
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Sizad) SELECT * FROM Processo WHERE numero_processo LIKE '_009.51.01.87348-6';
e) SELECT *.* FROM Processo WHERE numero_processo LIKE '%009.51.01.87348-6';
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza29) (CESPE / TJ-AM – 2019) Em SQL, o comando RIGHT OUTER JOIN exibe a união
entre duas tabelas, apresentando as linhas da segunda tabela que também existem
na primeira tabela, descartando-se as demais situações.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza30) .(FCC / TRT4 – 2019) Uma Analista digitou o comando TRUNCATE TABLE
processos; em um banco de dados SQL aberto em condições ideais para:
a) excluir os dados da tabela, mas não a tabela em si.
b) excluir a estrutura da tabela e os dados nela contidos.
c) juntar a tabela aberta na memória com a tabela processos.
d) bloquear a tabela processos para uso exclusivo de seu usuário.
e) editar a estrutura da tabela em modo gráfico.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza31)(FCC / TRT4 – 2019) Em uma tabela chamada itemfatura há diversos registros em
que constam o mesmo valor no campo idfatura. Para mostrar a quantidade de
valores de idfatura diferentes que estão cadastrados na tabela, utiliza-se o comando:
a) SELECT DISTINCT (idfatura) FROM itemfatura;
b) SELECT * FROM itemfatura WHERE idfatura IS DIFFERENT;
c) SELECT SUM(DISTINCT idfatura) FROM itemfatura;
d) SELECT COUNT(DISTINCT idfatura) FROM itemfatura;
e) SELECT COUNT(DIFFERENT idfatura) FROM itemfatura;
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza32)(FCC / TRT4 – 2019) Um Técnico Judiciário necessitou usar a linguagem padrão
SQL para recuperar, de uma tabela do banco de dados relacional denominada
tabela1,
I. o menor valor em uma determinada coluna denominada coluna1.
II. um padrão de valores denominado padrão_desejado em uma outra coluna
denominada coluna2.
Para tanto, em duas operações distintas, ele utilizou, respectivamente, as expressões
I e II são, correta e respectivamente,
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Sizaa) MINVALUE(coluna1) e padrão_desejado %LIKE coluna2
b) THIN (coluna1) e coluna2 = padrão_desejado
c) SMALL(coluna1) e padrão_desejado = coluna2
d) MIN(coluna1) e coluna2 LIKE padrão_desejado
e) GETSMLL(coluna1) e padrão_desejado % coluna2
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza33) (CCV / UFC – 2019) Em alguns cenários, é necessário definir que uma coluna em
um banco de dados não deve permitir a inserção de valores repetidos. Qual das
cláusulas abaixo deverá ser usada no comando SQL (Structured Query Language)
para aplicar essa restrição no momento da criação da coluna?
a) CHECK
b) DEFAULT
c) UNIQUE
d) DISTINCT
e) CONSTRAINT
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza34) (FCC / SEFAZ-BA – 2019) Em uma tabela chamada Contribuinte de um banco de
dados padrão SQL aberto e em condições ideais há o campo idContribuinte do tipo
inteiro e chave primária.
Há também o campo nomeContribuinte que é do tipo varchar. Nessa tabela, um
Auditor Fiscal deseja alterar o nome do contribuinte de id 1 para 'Marcos Silva'. Para
isso, terá que utilizar o comando:
a) ALTER TABLE Contribuinte SET nomeContribuinte='Marcos Silva' WHERE
idContribuinte =1;
b) UPDATE Contribuinte SET nomeContribuinte='Marcos Silva' WHERE idContribuinte
= 1;
c) UPDATE nomeContribuinte TO 'Marcos Silva' FROM Contribuinte WHERE
idContribuinte = 1;
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Sizad) ALTER TABLE Contribuinte FIELD nomeContribuinte='Marcos Silva' WHERE
idContribuinte = 1;
e) UPDATE TABLE Contribuinte FIELD nomeContribuinte='Marcos Silva' WHERE
idContribuinte = 1
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza35)(FCC / SEFAZ-BA – 2019) Para buscar na tabela Contribuintes todos os nomes de
contribuintes (campo nomeContribuinte) que terminam com a letra s, um Auditor
utilizou corretamente a instrução SQL
a) SEARCH * FROM Contribuintes WHERE nomeContribuinte LIKE '%s';
b) SELECT nomeContribuinte FROM Contribuintes WHERE nomeContribuinte LIKE
'*s';
c) SELECT * FROM Contribuintes WHERE nomeContribuinte FINISHED BY '%s';
d) SEARCH nomeContribuinte FROM Contribuintes WHERE nomeContribuinte
FINISHED BY 's';
e) SELECT * FROM Contribuintes WHERE nomeContribuinte LIKE '%s';
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza36) (CCV / UFC – 2019) Uma tabela chamada Area possui dois campos: arecod e
aredes. Como podemos inserir um novo registro na tabela "Area"?
a) INSERT INTO Area (arecod, aredes) VALUES (100, "Técnico"), (200, "TI").
b) INSERT (100, "Técnico"), (200, "TI") INTO Area VALUES(arecod, aredes).
c) INSERT (arecod, aredes) INTO Area VALUES (100, "Técnico"), (200, "TI").
d) INSERT INTO (arecod, aredes) Area VALUES (100, "Técnico"), (200, "TI").
e) INSERT (100, "Técnico"), (200, "TI") INTO Area (arecod, aredes).
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza37) (CCV / UFC – 2019) Utilizando SQL, como selecionamos todos os registros de uma
tabela chamada "Pessoas" onde o valor da coluna "PrimeiroNome " começa com
"a"?
a) SELECT * FROM Pessoas WHERE PrimeiroNome='a'
b) SELECT * FROM Pessoas WHERE PrimeiroNome LIKE 'a%'
c) SELECT * FROM Pessoas WHERE PrimeiroNome='%a%'
d) SELECT * FROM Pessoas WHERE PrimeiroNome LIKE '%a'
e) SELECT * FROM Pessoas WHERE PrimeiroNome HAVING='%a%'
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza38) (NC-UFPR / Itaipu Binacional – 2019) A recursividade presente em consultas
realizadas com SQL na forma SELECT a.id,... FROM a WHERE ... IN (SELECT atributo
FROM b WHERE b.x=a.id) pode ser evitada por meio:
a) da substituição do operador IN por EXISTS.
b) da junção externa do tipo RIGHT JOIN com a verificação de atributos de b com o
valor nulo.
c) da junção interna – INNER JOIN.
d) da junção externa do tipo LEFT JOIN com a verificação de atributos de b com o
valor nulo.
e) da utilização de expressões de tabelas comuns (CTE).
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza39) (QUADRIX / CRA-PR – 2019) Uma consulta aninhada pode retornar tanto um
único atributo quanto vários atributos e(ou) várias tuplas
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza40) .(QUADRIX / CRA-PR – 2019) O operador DISTINCT não pode ser utilizado em
consultas aninhadas.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza41)(QUADRIX / CRA-PR – 2019) A instrução demonstra que é permitido o uso de
tuplas de valores em comparações, colocando-os entre parênteses, em consultas do
tipo aninhada.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza42) (QUADRIX / CRA-PR – 2019) A instrução contém erro clássico de construção, pois,
em uma consulta aninhada ou subconsulta, não é permitido o uso de nomes de
tabelas repetidos, como, nesse caso, ocorre com a tabela TRABALHO
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza43).(NC-UFPR / Itaipu Binacional – 2019) Considerando a linguagem SQL (Structured
Query Language) para sistemas de banco de dados, assinale a alternativa que
remove linhas de uma tabela chamada CLIENTE.
a) REMOVE FROM CLIENTE ...
b) CUT FROM CLIENTE ...
c) DELETE FROM CLIENTE WHERE ...
d) ERASE FROM CLIENTE …
e) CLEAR FROM CLIENTE ...
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza44).(FCC / AFAP – 2019) Fernando está usando a linguagem SQL (ANSI) e pretende
fazer uma atualização nos dados Nome_Cli e End_Cli do cliente cujo Cod_Cli é Cli01,
na tabela Cliente.
Nome_Cli passará a ser Ariana e End_Cli passará a ser Rua ABC. O código SQL correto
que Fernando escreveu foi:
..I.. Cliente
..II.. Nome_Cli = 'Ariana', End _Cli = 'Rua ABC'
..III.. Cod_Cli = 'Cli01';
Para que o código esteja correto, as lacunas I, II e III devem ser preenchidas,
respectivamente, por
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Sizaa) SET - WHERE - UPDATE
b) UPDATE - SET - WHERE
c) UPDATE - WHERE - SET
d) WHERE - SET - UPDATE
e) SET - UPDATE - WHERE
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza45) (IADES / CRF - TO - 2019) A Linguagem de Consulta Estruturada (SQL – Structured
Query Language) foi padronizada para utilização em bancos de dados em 1986 e é
amplamente utilizada por diferentes Sistemas Gerenciadores de Bancos de Dados
(SGBDs). Essa linguagem é dividida em quatro conjuntos, sendo eles linguagens:
a) de estruturação, de dados, para argumentação de controles e orientada a objetos.
b) orientada à conexão, estruturada, de manipulação de dados e de paralelismo.
c) para argumentação de controles, de definição de dados, orientada à conexão e de
paralelismo.
d) para controle de acesso a dados, para transações, orientada a objetos e de
estruturação.
e) de manipulação de dados, de definição de dados, para controle de transações e
para controle e acesso a dados.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaOBRIGADA
Prof. Emannuelle Gouveia
@emannuellegouveia
05490709405 - Lorenna Siza05490709405 - Lorenna Siza05490709405 - Lorenna Siza05490709405 - Lorenna SizaINFORMÁTICA
Profa. Emannuelle Gouveia
@Emannuellegouveia
05490709405 - Lorenna SizaBANCO DE DADOS
RELACIONAIS
Prof. Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaSQL
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaQUESTÕES
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza26) (FGV / IMBEL – 2021) Considere a instância da tabela R1 e o comando SQL
exibidos a seguir.
select distinct A
from R1
where exists
(select * from R1 x Where x.B > R1.A)
Assinale a lista de números que é exibida quando esse comando SQL é executado:
a) 5.
b) 1,2.
c) 2,3.
d) 3,4,5.
e) 1, 2, 3, 4.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaInformática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza27) .(FGV / DPE-RJ – 2019) Considere a tabela FAMILIA descrita anteriormente e o
comando SQL a seguir.
select relação, sum(1)
from familia
group by relação
having count(*) > 1
order by 2 desc, 1
Os valores exibidos pela execução desse comando, na ordem, são:
a) mãe 4
pai 2
avo 1
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Sizab) mãe 2
pai 4
c) pai 2
mãe 4
d) mãe 4
pai 2
e) mãe 4
pai 2
avo ø
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza28) (FCC / TJ-MA – 2019) Considere a existência de um banco de dados aberto e em
condições ideais, no qual a tabela Processo possui diversos campos, sendo um deles,
o campo numero_processo, do tipo cadeia de caracteres (varchar). Para exibir todos
os processos cujo número inicie por qualquer caractere seguido de
"009.51.01.87348-6", utiliza-se a instrução SQL:
a) SELECT *.* FROM Processo WHERE numero_processo LIKE '_009.51.01.87348-6';
b) SELECT * FROM Processo WHERE numero_processo='#009.51.01.87348-6';
c) SELECT * FROM Processo WHERE numero_processo EQUALS '%009.51.01.87348-
6';
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Sizad) SELECT * FROM Processo WHERE numero_processo LIKE '_009.51.01.87348-6';
e) SELECT *.* FROM Processo WHERE numero_processo LIKE '%009.51.01.87348-6';
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza29) (CESPE / TJ-AM – 2019) Em SQL, o comando RIGHT OUTER JOIN exibe a união
entre duas tabelas, apresentando as linhas da segunda tabela que também existem
na primeira tabela, descartando-se as demais situações.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza30) .(FCC / TRT4 – 2019) Uma Analista digitou o comando TRUNCATE TABLE
processos; em um banco de dados SQL aberto em condições ideais para:
a) excluir os dados da tabela, mas não a tabela em si.
b) excluir a estrutura da tabela e os dados nela contidos.
c) juntar a tabela aberta na memória com a tabela processos.
d) bloquear a tabela processos para uso exclusivo de seu usuário.
e) editar a estrutura da tabela em modo gráfico.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza31)(FCC / TRT4 – 2019) Em uma tabela chamada itemfatura há diversos registros em
que constam o mesmo valor no campo idfatura. Para mostrar a quantidade de
valores de idfatura diferentes que estão cadastrados na tabela, utiliza-se o comando:
a) SELECT DISTINCT (idfatura) FROM itemfatura;
b) SELECT * FROM itemfatura WHERE idfatura IS DIFFERENT;
c) SELECT SUM(DISTINCT idfatura) FROM itemfatura;
d) SELECT COUNT(DISTINCT idfatura) FROM itemfatura;
e) SELECT COUNT(DIFFERENT idfatura) FROM itemfatura;
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza32)(FCC / TRT4 – 2019) Um Técnico Judiciário necessitou usar a linguagem padrão
SQL para recuperar, de uma tabela do banco de dados relacional denominada
tabela1,
I. o menor valor em uma determinada coluna denominada coluna1.
II. um padrão de valores denominado padrão_desejado em uma outra coluna
denominada coluna2.
Para tanto, em duas operações distintas, ele utilizou, respectivamente, as expressões
I e II são, correta e respectivamente,
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Sizaa) MINVALUE(coluna1) e padrão_desejado %LIKE coluna2
b) THIN (coluna1) e coluna2 = padrão_desejado
c) SMALL(coluna1) e padrão_desejado = coluna2
d) MIN(coluna1) e coluna2 LIKE padrão_desejado
e) GETSMLL(coluna1) e padrão_desejado % coluna2
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza33) (CCV / UFC – 2019) Em alguns cenários, é necessário definir que uma coluna em
um banco de dados não deve permitir a inserção de valores repetidos. Qual das
cláusulas abaixo deverá ser usada no comando SQL (Structured Query Language)
para aplicar essa restrição no momento da criação da coluna?
a) CHECK
b) DEFAULT
c) UNIQUE
d) DISTINCT
e) CONSTRAINT
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza34) (FCC / SEFAZ-BA – 2019) Em uma tabela chamada Contribuinte de um banco de
dados padrão SQL aberto e em condições ideais há o campo idContribuinte do tipo
inteiro e chave primária.
Há também o campo nomeContribuinte que é do tipo varchar. Nessa tabela, um
Auditor Fiscal deseja alterar o nome do contribuinte de id 1 para 'Marcos Silva'. Para
isso, terá que utilizar o comando:
a) ALTER TABLE Contribuinte SET nomeContribuinte='Marcos Silva' WHERE
idContribuinte =1;
b) UPDATE Contribuinte SET nomeContribuinte='Marcos Silva' WHERE idContribuinte
= 1;
c) UPDATE nomeContribuinte TO 'Marcos Silva' FROM Contribuinte WHERE
idContribuinte = 1;
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Sizad) ALTER TABLE Contribuinte FIELD nomeContribuinte='Marcos Silva' WHERE
idContribuinte = 1;
e) UPDATE TABLE Contribuinte FIELD nomeContribuinte='Marcos Silva' WHERE
idContribuinte = 1
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza35)(FCC / SEFAZ-BA – 2019) Para buscar na tabela Contribuintes todos os nomes de
contribuintes (campo nomeContribuinte) que terminam com a letra s, um Auditor
utilizou corretamente a instrução SQL
a) SEARCH * FROM Contribuintes WHERE nomeContribuinte LIKE '%s';
b) SELECT nomeContribuinte FROM Contribuintes WHERE nomeContribuinte LIKE
'*s';
c) SELECT * FROM Contribuintes WHERE nomeContribuinte FINISHED BY '%s';
d) SEARCH nomeContribuinte FROM Contribuintes WHERE nomeContribuinte
FINISHED BY 's';
e) SELECT * FROM Contribuintes WHERE nomeContribuinte LIKE '%s';
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza36) (CCV / UFC – 2019) Uma tabela chamada Area possui dois campos: arecod e
aredes. Como podemos inserir um novo registro na tabela "Area"?
a) INSERT INTO Area (arecod, aredes) VALUES (100, "Técnico"), (200, "TI").
b) INSERT (100, "Técnico"), (200, "TI") INTO Area VALUES(arecod, aredes).
c) INSERT (arecod, aredes) INTO Area VALUES (100, "Técnico"), (200, "TI").
d) INSERT INTO (arecod, aredes) Area VALUES (100, "Técnico"), (200, "TI").
e) INSERT (100, "Técnico"), (200, "TI") INTO Area (arecod, aredes).
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza37) (CCV / UFC – 2019) Utilizando SQL, como selecionamos todos os registros de uma
tabela chamada "Pessoas" onde o valor da coluna "PrimeiroNome " começa com
"a"?
a) SELECT * FROM Pessoas WHERE PrimeiroNome='a'
b) SELECT * FROM Pessoas WHERE PrimeiroNome LIKE 'a%'
c) SELECT * FROM Pessoas WHERE PrimeiroNome='%a%'
d) SELECT * FROM Pessoas WHERE PrimeiroNome LIKE '%a'
e) SELECT * FROM Pessoas WHERE PrimeiroNome HAVING='%a%'
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza38) (NC-UFPR / Itaipu Binacional – 2019) A recursividade presente em consultas
realizadas com SQL na forma SELECT a.id,... FROM a WHERE ... IN (SELECT atributo
FROM b WHERE b.x=a.id) pode ser evitada por meio:
a) da substituição do operador IN por EXISTS.
b) da junção externa do tipo RIGHT JOIN com a verificação de atributos de b com o
valor nulo.
c) da junção interna – INNER JOIN.
d) da junção externa do tipo LEFT JOIN com a verificação de atributos de b com o
valor nulo.
e) da utilização de expressões de tabelas comuns (CTE).
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza39) (QUADRIX / CRA-PR – 2019) Uma consulta aninhada pode retornar tanto um
único atributo quanto vários atributos e(ou) várias tuplas
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza40) .(QUADRIX / CRA-PR – 2019) O operador DISTINCT não pode ser utilizado em
consultas aninhadas.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza41)(QUADRIX / CRA-PR – 2019) A instrução demonstra que é permitido o uso de
tuplas de valores em comparações, colocando-os entre parênteses, em consultas do
tipo aninhada.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza42) (QUADRIX / CRA-PR – 2019) A instrução contém erro clássico de construção, pois,
em uma consulta aninhada ou subconsulta, não é permitido o uso de nomes de
tabelas repetidos, como, nesse caso, ocorre com a tabela TRABALHO
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza43).(NC-UFPR / Itaipu Binacional – 2019) Considerando a linguagem SQL (Structured
Query Language) para sistemas de banco de dados, assinale a alternativa que
remove linhas de uma tabela chamada CLIENTE.
a) REMOVE FROM CLIENTE ...
b) CUT FROM CLIENTE ...
c) DELETE FROM CLIENTE WHERE ...
d) ERASE FROM CLIENTE …
e) CLEAR FROM CLIENTE ...
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza44).(FCC / AFAP – 2019) Fernando está usando a linguagem SQL (ANSI) e pretende
fazer uma atualização nos dados Nome_Cli e End_Cli do cliente cujo Cod_Cli é Cli01,
na tabela Cliente.
Nome_Cli passará a ser Ariana e End_Cli passará a ser Rua ABC. O código SQL correto
que Fernando escreveu foi:
..I.. Cliente
..II.. Nome_Cli = 'Ariana', End _Cli = 'Rua ABC'
..III.. Cod_Cli = 'Cli01';
Para que o código esteja correto, as lacunas I, II e III devem ser preenchidas,
respectivamente, por
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Sizaa) SET - WHERE - UPDATE
b) UPDATE - SET - WHERE
c) UPDATE - WHERE - SET
d) WHERE - SET - UPDATE
e) SET - UPDATE - WHERE
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza45) (IADES / CRF - TO - 2019) A Linguagem de Consulta Estruturada (SQL – Structured
Query Language) foi padronizada para utilização em bancos de dados em 1986 e é
amplamente utilizada por diferentes Sistemas Gerenciadores de Bancos de Dados
(SGBDs). Essa linguagem é dividida em quatro conjuntos, sendo eles linguagens:
a) de estruturação, de dados, para argumentação de controles e orientada a objetos.
b) orientada à conexão, estruturada, de manipulação de dados e de paralelismo.
c) para argumentação de controles, de definição de dados, orientada à conexão e de
paralelismo.
d) para controle de acesso a dados, para transações, orientada a objetos e de
estruturação.
e) de manipulação de dados, de definição de dados, para controle de transações e
para controle e acesso a dados.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaQUESTÕES
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza2023/2024
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza01) CEBRASPE (CESPE) - 2023 - Analista de Planejamento e Orçamento (SEPLAN
RR)/Tecnologia da Informação
A respeito de banco de dados, julgue o próximo item.
Em um comando SELECT, a cláusula WHERE define que o resultado da consulta é o
produto cartesiano das tabelas envolvidas.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza02) CEBRASPE (CESPE) - 2023 (SEPLAN RR)
A respeito de banco de dados, julgue o próximo item.
Em SQL, o comando DISTINCT é utilizado para eliminar resultados repetidos em
consultas a tabelas do banco de dados.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza03) CEBRASPE (CESPE) - 2023 (SEPLAN RR)
Julgue o item seguinte a respeito dos conceitos de administração de dados.
Os comandos TRUNCATE e DROP TABLE removem todas as linhas de uma tabela,
porém o comando DROP TABLE exclui também a estrutura da tabela do banco de
dados bem como todos os dados armazenados na tabela.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza04) CEBRASPE (CESPE) - 2023 - (SEPLAN RR)
Considerando os conceitos de tuning de banco de dados, julgue o item a seguir.
O comando EXPLAIN permite otimizar tabelas que executam muitas operações de
UPDATE e DELETE em detrimento de operações de INSERT.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza05) Instituto Consulplan - 2023 (MPE MG)
Observe a imagem a seguir:
Em relação ao código SQL anterior, assinale a afirmativa correta.
A) O código tem como finalidade mostrar dados do último acesso ao processo.
B) Na linha 3, há um erro de sintaxe, pois não se pode usar a função MAX em uma
subconsulta.
C) O código tem como finalidade mostrar todos os acessos ao processo, ordenando-
os pela data de acesso.
D) Para que o código seja executado sem erro, deve ser inserido o ponto-e-virgula (;)
ao final da linha 5, ou seja, ao final da subconsulta.
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza06) Instituto Consulplan - 2023 - (MPE MG)
O comando SELECT da linguagem SQL é usado para consultar o banco de dados e
retornar dados recuperados que satisfazem determinada condição expressa no
comando. Considerando a sintaxe do comando SELECT, assinale a afirmativa
INCORRETA.
A) select id_aluno from aluno;
B) select * from aluno where id_aluno = 1000;
C) select id_aluno from aluno where id_aluno = 1004;
D) select id_aluno where id_aluno = 1008 and sobrenome = 'Silva';
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza06) Instituto Consulplan - 2023 - (MPE MG)
O comando SELECT da linguagem SQL é usado para consultar o banco de dados e
retornar dados recuperados que satisfazem determinada condição expressa no
comando. Considerando a sintaxe do comando SELECT, assinale a afirmativa
INCORRETA.
A) select id_aluno from aluno;
B) select * from aluno where id_aluno = 1000;
C) select id_aluno from aluno where id_aluno = 1004;
D) select id_aluno where id_aluno = 1008 and sobrenome = 'Silva';
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza07) Instituto Consulplan - 2023 - (MPE MG)
SQL foi desenvolvida na IBM Research no início da década de 1970; tornou-se a
linguagem padrão para se lidar com bancos de dados relacionais. Seus comandos são
divididos em grupos de acordo com sua funcionalidade. Sobre os comandos SQL de
linguagem de controle de dados (Data Control Language – DCL), assinale a afirmativa
INCORRETA.
A) DENY
B) GRANT
C) REVOKE
D) COMMIT
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna Siza08) Instituto Consulplan - 2023 - (MPE MG)
O operador LIKE é utilizado para buscar por uma determinada string dentro de um
campo com valores textuais. Esse operador permite fazer comparações de partes de
uma determinada string. Analise a consulta com operador LIKE a seguir e assinale a
alternativa que completa a lacuna para selecionar o nome dos professores que
terminam com ‘Silva’.
SELECT nome_professor FROM professor WHERE
nome_professor LIKE '__Silva';
Informática
Profa: Emannuelle Gouveia
@Emannuelle Gouveia
05490709405 - Lorenna SizaOBRIGADA
Prof. Emannuelle Gouveia
@emannuellegouveia
05490709405 - Lorenna Siza05490709405 - Lorenna Siza