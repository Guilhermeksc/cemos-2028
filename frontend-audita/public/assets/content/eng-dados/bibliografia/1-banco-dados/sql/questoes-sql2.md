# QUESTÕES

**01) (Prefeitura de Teresina/PI – 2016)** Em um banco de dados relacional os comandos são classificados em: − DDL – Data Definition Language. − DML – Data
Manipulation Language. − DCL – Data Control Language. − TCL – Transaction Control Language.

Os seguintes comandos: COMMIT, CREATE, ROLLBACK, DELETE, REVOKE e UPDATE, são respectivos a:

a) DDL, DDL, TCL, DML, DML e DCL.
b) TCL, DDL, TCL, DML, DCL e DML.
c) DML, TCL, DDL, DDL, DCL e DML.
d) TCL, DDL, TCL, DDL, DCL e DML.
e) DCL, DDL, TCL, DDL, DCL e DML.

Resposta letra B

**02) (Itaipu Binacional – 2017)** Assinale a alternativa que identifica corretamente o comando SQL usado para tornar permanentes as alterações realizadas desde o início de uma transação.

a) COMMIT
b) SAVE
c) SYNC
d) FLUSH
e) APPEND

Resposta Letra A

**03) (Banco da Amazônia)** Uma transação é uma coleção de instruções SQL DML tratada como uma unidade lógica, de forma que não seja necessário o uso de
commit, mesmo que implícito, para tornar as alterações permanentes.

Resposta Falso é obrigatório o uso do COMMIT.

**04) (EBSERH – 2015)** Acerca dos conceitos de segurança dos sistemas de banco de dados, entre os “comandos” que estruturam o SQL, existem aqueles, que compõem
um grupo, e são utilizados para atribuir as permissões que os usuários irão ter dentro de um banco de dados (GRANT, DENY, REVOKE). Eles são classificados como:
a) DML.
b) DLL.
c) DDL.
d) DSQL.
e) DCL.

Resposta Letra E 

*vbg* **C de controle, controle lembra permissões**

**05) (EBSERH)** O comando REVOKE da linguagem SQL é utilizado para controle de:
a) bloqueios de transação.
b) acesso dos usuários do sistema.
c) monitoração e otimização de desempenho.
d) backup e restauração de dados.

Resposta Letra B

**06. (FGV / SEFAZ-BA – 2022)** Considere a seguinte tabela em um banco de dados relacional. 

|employess    |
|-------------|
|*employee_id |
|first_name   |
|last_name    |
|email        |
|phone_number |
|hire_date    |
|job_id       |
|salary       |
|manager_id   |
|department_id|

Assinale a opção que indica o comando SQL utilizado para localizar todos os nomes completos dos employees, cujos primeiros nomes começam com as letras Ma.

a)

    ```sql
    SELECT 
      first_name, 
      last_name 
    FROM 
      employees;
    ```

b)

    ```sql
    SELECT 
      * FROM 
      employees 
    WHERE 
      first_name = 'Ma';
    ```

c)

    ```sql
    SELECT 
      * FROM 
      employees 
    WHERE 
      first_name = 'Ma*';
    ```

d)

    ```sql
    SELECT 
      employee_id, 
      first_name, 
      last_name 
    FROM 
      employees 
    WHERE 
      first_name LIKE 'Ma%';
    ```

e)

    ```sql
    SELECT 
      employee_id, 
      first_name, 
      last_name 
    FROM 
      employees 
    WHERE 
      first_name IN 'Ma_';
    ```

Resposta Letra D

**07) (FADESP / SEFA-PA – 2022)** A linguagem de banco de dados relacional SQL (Structured Query Language) é um exemplo de linguagem de banco de dados abrangente que representa uma combinação de:
a) TTL, VDL e DML.
b) TDL, GDL e DML.
c) DDL, VDL e DML.
d) DDL, VDL e BML.
e) DDL, GDL e BML

Resposta Letra C

**08) (CESPE / SEFAZ-SE – 2022)** A respeito do código SQL (Structured Query Language) anteriormente apresentado, assinale a opção correta.

select C.CPF as CPF, C.NOME as NOME 
from CONTRIBUINTE as C, PARCELAMENTO as P
where C.CPF=P.CPF
and P.TIPO=’IPVA’
and P.DATAADESAO between ‘01/01/2021’ and
‘31/12/2021’
and P.STATUS=’ADIMPLENTE’

a) Há um erro de sintaxe em and P.DATAADESAO between ‘01/01/2021’ and ‘31/12/2021’, pois não é permitida a utilização do operador and mais de uma vez na
mesma linha.
b) Há uma junção (JOIN) nesse código, a qual é especificada no trecho from CONTRIBUINTE as C, PARCELAMENTO as P.
c) O objetivo do código é mostrar o CPF e o nome de todos os contribuintes que não aderiram ao programa de parcelamento do IPVA no ano de 2021.
d) A palavra reservada between foi inserida no código equivocadamente, pois somente deveria ser usada nos comandos de update e delete.
e) A finalidade do código é mostrar o CPF e o nome de todos os contribuintes que aderiram ao parcelamento do IPVA no ano de 2021 e que estão com o seu
parcelamento em dia.

Resposta Letra E

![figura 6](sql/questao_img1.png)
**Figura 6**

A próxima questão se baseia na Figura 6, que mostra, esquematicamente, um Diagrama Entidade-Relacionamento (DER) elaborado no MySQL Workbench 8.0, no
qual se inseriu, intencionalmente, nos locais apontados pelas setas nº 1 e 2, retângulos para ocultar os relacionamentos existentes nesses locais.
Nesse DER, constam as entidades "Produto", "Aquisicao" e "Cliente", implementadas de acordo com as seguintes regras de negócio:

(1) um cliente poderá adquirir um ou mais produtos, inclusive os mesmos produtos mais de uma vez, em data/hora diferentes;
(2) um produto poderá ser adquirido por um ou mais clientes, inclusive o mesmo cliente, mais de uma vez;
(3) deve ser possível cadastrar qualquer produto ou cliente, no banco de dados, sem associá-los a qualquer outra tabela;
(4) ao se associar um cliente a um produto, armazena-se, no banco de dados, a quantidade adquirida, a correspondente data/hora de aquisição e o preço efetivamente pago (que poderá ser diferente do preço de tabela do produto, devido ao cliente ter recebido um desconto no preço do produto).

**09) (FUNDATEC / ISS-Porto Alegre – 2022)** Sabe-se que, a partir do DER mostrado na Figura 6, foram criadas e populadas as tabelas correspondentes em um Sistema Gerenciador de Banco de Dados Relacional (SGBDR), tendo se respeitado, rigorosamente, os conceitos do modelo relacional. Nesse caso, para criar a tabela
"Aquisicao", bastou executar a seguinte declaração, em SQL padrão ANSI:

  * **a)**

    ```sql
    CREATE TABLE Aquisicao (
      Produto_prod_codigo INT NOT NULL,
      Cliente_cli_codigo INT NOT NULL,
      aquisicao_quantidade_venda FLOAT NOT NULL,
      aquisicao_preco_venda FLOAT NOT NULL,
      aquisicao_data_hora DATE NOT NULL,
      PRIMARY KEY (aquisicao_data_hora, Produto_prod_codigo, Cliente_cli_codigo),
      FOREIGN KEY (Produto_prod_codigo) REFERENCES Produto (prod_codigo),
      FOREIGN KEY (Cliente_cli_codigo) REFERENCES Cliente (cli_codigo)
    );
    ```

  * **b)**

    ```sql
    CREATE TABLE Aquisicao (
      Produto_prod_codigo INT NOT NULL,
      Cliente_cli_codigo INT NOT NULL,
      aquisicao_quantidade_venda FLOAT NOT NULL,
      aquisicao_preco_venda FLOAT NOT NULL,
      aquisicao_data_hora DATE NOT NULL,
      PRIMARY KEY (Produto_prod_codigo, Cliente_cli_codigo),
      FOREIGN KEY (Produto_prod_codigo) REFERENCES Produto (prod_codigo),
      FOREIGN KEY (Cliente_cli_codigo) REFERENCES Cliente (cli_codigo)
    );
    ```

  * **c)**

    ```sql
    CREATE TABLE Aquisicao (
      Produto_prod_codigo INT PRIMARY KEY,
      Cliente_cli_codigo INT PRIMARY KEY,
      aquisicao_quantidade_venda FLOAT NOT NULL,
      aquisicao_preco_venda FLOAT NOT NULL,
      aquisicao_data_hora DATE PRIMARY KEY,
      FOREIGN KEY (Produto_prod_codigo) REFERENCES Produto (prod_codigo),
      FOREIGN KEY (Cliente_cli_codigo) REFERENCES Cliente (cli_codigo)
    );
    ```

  * **d)**

    ```sql
    CREATE TABLE Aquisicao (
      Produto_prod_codigo INT PRIMARY KEY REFERENCES Produto (prod_codigo),
      Cliente_cli_codigo INT PRIMARY KEY REFERENCES Cliente (cli_codigo),
      aquisicao_quantidade_venda FLOAT NOT NULL,
      aquisicao_preco_venda FLOAT NOT NULL,
      aquisicao_data_hora DATE PRIMARY KEY
    );
    ```

  * **e)**

    ```sql
    CREATE TABLE Aquisicao (
      Produto_prod_codigo INT PRIMARY KEY REFERENCES Produto (prod_codigo) NOT NULL,
      Cliente_cli_codigo INT PRIMARY KEY REFERENCES Cliente (cli_codigo) NOT NULL,
      aquisicao_quantidade_venda FLOAT NOT NULL,
      aquisicao_preco_venda FLOAT NOT NULL,
      aquisicao_data_hora DATE NOT NULL
    );
    ```

Resposta Letra A - **A e C estão certas, as a letra A está mais organizada conforme o padrão ANSI.**

![questao_img2](sql/questao_img2.png)
Com base no modelo entidade-relacionamento (MER) precedente, que apresenta a representação das regras de uma instituição de pesquisa, existe um
Pesquisador cadastrado com o nome Pedro.

Todos os atributos do MER são do tipo caractere e um dos comandos SQL usados para a construção do modelo é mostrado a seguir.

create table Projeto codNacionalProjeto char(2), 
                     codPesquisadorResponsavel char(2),
                     codPesquisadorOrientador char(2),
                     tituloProjeto char(50), 
                     primary key(codNacionalProjeto));

A partir das informações constantes no modelo e dos dados sobre o conteúdo dos atributos, julgue o item subsecutivo.

**10) (CESPE / PETROBRAS – 2022)** Por meio do comando SQL a seguir, é possível recuperar o nome dos pesquisadores responsáveis por projetos, seguido pelo nome
de seu orientador, mas apenas os projetos orientados por Pedro.

select responsavel.nome nomeresponsavel,
orientador.nome nomeorientador,
tituloProjeto
from Pesquisador responsavel, Pesquisador orientador, Projeto
where orientador.nome = 'Pedro'
and codPesquisadorResponsavel = codPesquisador
and codPesquisadorOrientador = codPesquisador;

Resposta Falso. Faltou o Alias em:
"
and codPesquisadorResponsavel = codPesquisador
and codPesquisadorOrientador = codPesquisador;
"

não especifica a qual tabela cada codPesquisador pertence.

Como há duas tabelas Pesquisador na consulta (uma como responsavel e outra como orientador), o comando é ambíguo.

**11) (CESPE / Petrobrás - 2022)** Duas expressões SQL são equivalentes se e somente se elas tiverem os mesmos comandos em suas respectivas sequências.

Resposta Falso.

Existem diversas formas de fazer os mesmos comandos.

**12) (CESPE / Petrobrás - 2022)** O comando truncate PESSOA; permite excluir todos os registros da tabela de nome PESSOA
Resposta Verdadeiro.

**13.(CESPE / Petrobrás - 2022)** A expressão SQL a seguir está sintaticamente correta e permite inserir dois alunos de nomes Pedro e Maria na tabela alunos.

INSERT VALUES ('Pedro', 'Maria') INTO alunos;

Resposta Falso

Resposta correta seria::
INSERT INTO alunos
VALUES ('Pedro', 'Maria');

**14.(CESPE/TJ-RJ-2021)** Processo (codprocesso, autor, reu, dataultimamovimentacao, assunto, codjuiz) Juiz (codjuiz, nome).

Considerando as tabelas anteriores, de um banco de dados relacional, assinale a opção cuja consulta em SQL mostra os nomes dos juízes para os quais não há
processos distribuídos (relacionados).

  * **a)**

    ```sql
    SELECT J.nome
    FROM Juiz AS J
    WHERE J.nome NOT IN (SELECT P.codjuiz 
    FROM Processo AS P);
    ```

  * **b)**

    ```sql
    SELECT J.nome
    FROM Juiz AS J, Processo AS P
    WHERE J.codjuiz inner join P.codjuiz;
    ```

  * **c)**

    ```sql
    SELECT J.nome
    FROM Juiz AS J
    WHERE J.codjuiz NOT IN (SELECT P.codjuiz FROM Processo AS P);
    ```

  * **d)**

    ```sql
    SELECT J.nome
    FROM Juiz AS J
    WHERE J.codjuiz LIKE (SELECT P.codjuiz FROM Processo AS P);
    ```

  * **e)**

    ```sql
    SELECT J.nome
    FROM Juiz AS J, Processo AS P
    WHERE J.nome NOT EXISTS (P.codjuiz);
    ```

Resposta Letra C

**15) .(CESPE / DPE-RO – 2021)**

```sql
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
  constraint fkcidade foreign key (cidade) references cidade,
  constraint fkaluno foreign key (aluno) references aluno,
  constraint pkcidade primary key (cidade, aluno, tipo)
);
```

Para a expressão SQL anterior, a cardinalidade entre as entidades aluno e cidade é:

a) zero-para-muitos.
b) muitos-para-muitos.
c) um-para-um.
d) muitos-para-um.
e) um-para-muitos.

Resposta Letra B **por que alunocidade é uma tabela associativa.**

**16) (CESPE / DPE-RO – 2021)** Assinale a opção que apresenta o comando SQL usado para excluir todos os registros de uma tabela de nome aluno, mantendo-se a estrutura da tabela:

a) delete aluno
b) erase aluno
c) erase from aluno
d) delete from aluno
e) drop from aluno

Resposta Letra D

```sql
DELETE FROM nome_da_tabela;
```

### ✔️ Comparação

| Comando                  | Correto?         | Motivo                                      |
| ------------------------ | ---------------- | ------------------------------------------- |
| **DELETE aluno**         | ❌                | Sintaxe inválida: falta o **FROM**          |
| **DELETE FROM aluno**    | ✔️               | Remove todas as linhas e mantém a estrutura |
| **TRUNCATE TABLE aluno** | ✔️ (alternativo) | Também remove tudo, mas é DDL e mais rápido |


**17) (CESPE / APEX-BRASIL – 2021)** create database pessoa;

O comando SQL apresentado anteriormente criará:

a) um banco de dados denominado pessoa;
b) uma tabela denominada pessoa;
c) um tipo de dados denominado pessoa;
d) um esquema denominado pessoa;

Resposta Letra A

**18)(CESPE / Polícia Federal – 2021)** Na linguagem SQL (structured query language), DTL (data transaction language) são comandos responsáveis por gerenciar diferentes transações ocorridas dentro de um banco de dados.

Resposta Verdadeira

**19)(FGV / FUNSÚDE-CE – 2021)** Atenção: na próxima questão, considere a definição e as instâncias das tabelas de bancos de dados CLUBE e JOGO exibidas a seguir.

### Tabela CLUBE

| nome |
| :--- |
| Barcelona |
| Boca Juniors |
| The Strongest |

### Tabela JOGO

| mandante | visitante | golsM | golsV |
| :--- | :--- | :---: | :---: |
| Barcelona | Boca Juniors | 1 | 0 |
| Barcelona | The Strongest | NULL | NULL |
| Boca Juniors | Barcelona | 0 | 0 |
| Boca Juniors | The Strongest | 3 | 0 |
| The Strongest | Barcelona | 2 | 0 |
| The Strongest | Boca Juniors | 2 | 0 |

![questao_img3](sql/questao_img3.png)

Cada clube deve jogar quatro vezes, duas como mandante e duas como visitante. As colunas golsM e golsV registram o número de gols dos times mandantes
e visitantes, respectivamente, em cada jogo. Ambas são nulas enquanto o jogo não for realizado.

Analise o comando SQL a seguir, à luz das definições e instâncias das tabelas CLUBE e JOGO, apresentadas anteriormente. 

select distinct mandante, visitante from JOGO, CLUBE

Assinale o número de linhas, sem incluir os títulos, produzidas pela execução desse comando:

a) 4.
b) 6.
c) 10.
d) 24.
e) 48.

Resposta Letra B

## 3\. 📝 Seleção das Colunas (`mandante, visitante`)

A cláusula `SELECT mandante, visitante` seleciona apenas as colunas `mandante` e `visitante`. É crucial notar que **ambas as colunas vêm exclusivamente da Tabela `JOGO`**.

As 18 linhas resultantes do Produto Cartesiano **terão as colunas** `mandante` e `visitante` (que se repetem 3 vezes para cada linha original de `JOGO`).

As 6 linhas originais de pares (`mandante`, `visitante`) da tabela `JOGO` são:

1.  (Barcelona, Boca Juniors)
2.  (Barcelona, The Strongest)
3.  (Boca Juniors, Barcelona)
4.  (Boca Juniors, The Strongest)
5.  (The Strongest, Barcelona)
6.  (The Strongest, Boca Juniors)

Ao realizar o Produto Cartesiano, cada um desses 6 pares aparece **3 vezes** nas 18 linhas do resultado intermediário.

## 4\. 🧹 Aplicação do `DISTINCT`

A cláusula `DISTINCT` remove as linhas duplicadas. Como o par (`mandante`, `visitante`) da Tabela `JOGO` é repetido exatamente 3 vezes na tabela resultante do `CROSS JOIN`:

* O comando `SELECT DISTINCT mandante, visitante` pegará a lista de pares únicos (`mandante`, `visitante`) que existiam na Tabela `JOGO`.

O número de linhas únicas é o número de linhas originais da Tabela `JOGO` (apenas as colunas `mandante` e `visitante`): **6**.

### 💡 Conclusão

O resultado final terá **6** linhas, correspondendo a cada par único de mandante e visitante que está registrado na Tabela `JOGO`.

A resposta correta é a **b) 6**.
<br>

**20.(FGV / FUNSÚDE-CE – 2021)** Analise o comando SQL a seguir, à luz das definições e instâncias das tabelas CLUBE e JOGO, definidas anteriormente.

select c.nome from CLUBE c where (
select count(*) from JOGO j where c.nome = j.mandante) <> 2 or (
select count(*) from JOGO j where c.nome = j.visitante) <> 2

O resultado produzido pela execução desse comando é a lista de todos os clubes que:

a) aparecem em quatro jogos.
b) não aparecem em quatro jogos.
c) não aparecem em dois jogos como mandante ou que não aparecem em dois jogos
d) aparecem em dois jogos como mandante ou que aparecem em dois jogos como visitante.
e) aparecem em dois jogos como mandante e aparecem em dois jogos como visitante.

Resposta Letra C

**21) (FGV / TCE-AM – 2021)** Considerando-se a instância da tabela T (descrita anteriormente), analise o comando SQL abaixo.

| A | B | C | D |
| :---: | :---: | :---: | :---: |
| 12 | 2 | 3 | 1 |2+1=3
| 14 | 3 | 8 | 2 |3+2=5 != 8
| 18 | 2 | 9 | 3 |2+3=5 != 9
| 21 | 5 | 4 | 4 |5+4=9 != 5

delete from T where b + d = c

O número de registros da tabela T afetados pela execução desse comando é:

a) zero;
b) um;
c) dois;
d) três;
e) quatro.

Resposta Letra B
2+1=3

**22) (FGV / TCE-AM – 2021)** Considerando-se a instância da tabela T (descrita anteriormente), analise o comando SQL abaixo.

| A | B | C | D |
| :---: | :---: | :---: | :---: |
| 12 | 2 | 3 | 1 |
| 14 | 3 | 8 | 2 |
| 18 | 2 | 9 | 3 |
| 21 | 5 | 4 | 4 |

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

Resposta Letra D

**23) (FGV / TCE-AM – 2021)** Considerando-se a instância da tabela T (descrita anteriormente), analise o comando SQL abaixo.

| A | B | C | D |
| :---: | :---: | :---: | :---: |
| 12 | 2 | 3 | 1 |
| 14 | 3 | 8 | 2 |
| 18 | 2 | 9 | 3 |
| 21 | 5 | 4 | 4 |

select distinct * from T t1, T t2, T t3

A execução desse comando produz um resultado que, além da linha de títulos, contém:

a) 8 linhas;
b) 24 linhas;
c) 32 linhas;
d) 64 linhas;
e) 128 linhas.

Resposta Letra D

**24) (FGV / IMBEL - 2021)** Considere a instância da tabela R1 e o comando SQL exibidos a seguir.

| A | B |
| :---: | :---: |
| 1 | 2 |
| 2 | 2 |
| 3 | 3 |
| 4 | 3 |
| 4 | 2 |
| 4 | 1 |
| 5 | 0 |

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

Resposta Letra D

**25) (FGV / IMBEL – 2021)** Considere o comando SQL a seguir, executado num banco de dados relacional com duas tabelas, R1 e R2, contendo 2.000 e 5.000 registros, respectivamente. R1 e R2 possuem chaves primárias definidas.

SELECT DISTINCT * FROM A, B

Assinale o número de linhas produzidas na execução:
a) 1.
b) 2.000.
c) 5.000.
d) 7.000.
e) 10.000.000

Resposta Letra E

**26) (FGV / IMBEL – 2021)** Considere a instância da tabela R1 e o comando SQL exibidos a seguir.

| A | B |
| :---: | :---: |
| 1 | 2 |
| 2 | 2 |
| 3 | 3 |
| 4 | 3 |
| 4 | 2 |
| 4 | 1 |
| 5 | 0 |

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

Resposta Letra B

**27) (FGV / DPE-RJ – 2019)** Considere a tabela FAMILIA descrita anteriormente e o comando SQL a seguir.

| pessoa1 | pessoa2 | relação |
| :---: | :---: | :---: |
| João | Rafael | pai |
| Maria | Rafael | mãe |
| Rafael | Gabriela | pai |
| Gabriela | Rita | mãe |
| Rita | Bruna | mãe |
| Bruna | Ana | mãe |
| Rafael | Rita | avô |

select relação, sum(1)
from familia
group by relação
having count(*) > 1
order by 2 desc, 1

Os valores exibidos pela execução desse comando, na ordem, são:

a) mãe 4
pai 2
avo 1

b) mãe 2
pai 4

c) pai 2
mãe 4

d) mãe 4
pai 2

e) mãe 4
pai 2
avo ø

28) (FCC / TJ-MA – 2019) Considere a existência de um banco de dados aberto e em
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