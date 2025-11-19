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

Resposta Letra D

**Apesar de avo ser 0 não deve aparecer na resposta uma vz que foi excluído.**

**28) (FCC / TJ-MA – 2019)** Considere a existência de um banco de dados aberto e em condições ideais, no qual a tabela Processo possui diversos campos, sendo um deles, o campo numero_processo, do tipo cadeia de caracteres (varchar). Para exibir todos os processos cujo número inicie por qualquer caractere seguido de "009.51.01.87348-6", utiliza-se a instrução SQL:

a) SELECT *.* FROM Processo WHERE numero_processo LIKE '_009.51.01.87348-6';
b) SELECT * FROM Processo WHERE numero_processo='#009.51.01.87348-6';
c) SELECT * FROM Processo WHERE numero_processo EQUALS '%009.51.01.87348-
d) SELECT * FROM Processo WHERE numero_processo LIKE '_009.51.01.87348-6';
e) SELECT *.* FROM Processo WHERE numero_processo LIKE '%009.51.01.87348-6';

Resposta Letra D

**29) (CESPE / TJ-AM – 2019)** Em SQL, o comando RIGHT OUTER JOIN exibe a união entre duas tabelas, apresentando as linhas da segunda tabela que também existem na primeira tabela, descartando-se as demais situações.

Resposta Falso, pega também na tabela da direita.

**30) (FCC / TRT4 – 2019)** Uma Analista digitou o comando TRUNCATE TABLE processos; em um banco de dados SQL aberto em condições ideais para:

a) excluir os dados da tabela, mas não a tabela em si.
b) excluir a estrutura da tabela e os dados nela contidos.
c) juntar a tabela aberta na memória com a tabela processos.
d) bloquear a tabela processos para uso exclusivo de seu usuário.
e) editar a estrutura da tabela em modo gráfico.

Resposta Letra A

**31)(FCC / TRT4 – 2019)** Em uma tabela chamada itemfatura há diversos registros em que constam o mesmo valor no campo idfatura. Para mostrar a quantidade de valores de idfatura diferentes que estão cadastrados na tabela, utiliza-se o comando:
a) SELECT DISTINCT (idfatura) FROM itemfatura;
b) SELECT * FROM itemfatura WHERE idfatura IS DIFFERENT;
c) SELECT SUM(DISTINCT idfatura) FROM itemfatura;
d) SELECT COUNT(DISTINCT idfatura) FROM itemfatura;
e) SELECT COUNT(DIFFERENT idfatura) FROM itemfatura;

Resposta Letra D

**32)(FCC / TRT4 – 2019)** Um Técnico Judiciário necessitou usar a linguagem padrão SQL para recuperar, de uma tabela do banco de dados relacional denominada tabela1,

I. o menor valor em uma determinada coluna denominada coluna1.
II. um padrão de valores denominado padrão_desejado em uma outra coluna denominada coluna2.

1.SELECT I
FROM tabela 1
WHERE condicao;

2. SELECT coluna2
FROM tabela1
WHERE II;

Para tanto, em duas operações distintas, ele utilizou, respectivamente, as expressões I e II são, correta e respectivamente,

a) MINVALUE(coluna1) e padrão_desejado %LIKE coluna2
b) THIN (coluna1) e coluna2 = padrão_desejado
c) SMALL(coluna1) e padrão_desejado = coluna2
d) MIN(coluna1) e coluna2 LIKE padrão_desejado
e) GETSMLL(coluna1) e padrão_desejado % coluna2

**33) (CCV / UFC – 2019)** Em alguns cenários, é necessário definir que uma coluna em um banco de dados não deve permitir a inserção de valores repetidos. Qual das cláusulas abaixo deverá ser usada no comando SQL (Structured Query Language)
para aplicar essa restrição no momento da criação da coluna?
a) CHECK
b) DEFAULT
c) UNIQUE
d) DISTINCT
e) CONSTRAINT

Resposta letra C

**34) (FCC / SEFAZ-BA – 2019)** Em uma tabela chamada Contribuinte de um banco de dados padrão SQL aberto e em condições ideais há o campo idContribuinte do tipo inteiro e chave primária.

Há também o campo nomeContribuinte que é do tipo varchar. Nessa tabela, um Auditor Fiscal deseja alterar o nome do contribuinte de id 1 para 'Marcos Silva'. Para isso, terá que utilizar o comando:

a) ALTER TABLE Contribuinte SET nomeContribuinte='Marcos Silva' WHERE idContribuinte =1;
b) UPDATE Contribuinte SET nomeContribuinte='Marcos Silva' WHERE idContribuinte = 1;
c) UPDATE nomeContribuinte TO 'Marcos Silva' FROM Contribuinte WHERE idContribuinte = 1;
d) ALTER TABLE Contribuinte FIELD nomeContribuinte='Marcos Silva' WHERE idContribuinte = 1;
e) UPDATE TABLE Contribuinte FIELD nomeContribuinte='Marcos Silva' WHERE idContribuinte = 1

Resposta Letra B

**35)(FCC / SEFAZ-BA – 2019)** Para buscar na tabela Contribuintes todos os nomes de contribuintes (campo nomeContribuinte) que terminam com a letra s, um Auditor utilizou corretamente a instrução SQL

a) SEARCH * FROM Contribuintes WHERE nomeContribuinte LIKE '%s';
b) SELECT nomeContribuinte FROM Contribuintes WHERE nomeContribuinte LIKE '*s';
c) SELECT * FROM Contribuintes WHERE nomeContribuinte FINISHED BY '%s';
d) SEARCH nomeContribuinte FROM Contribuintes WHERE nomeContribuinte FINISHED BY 's';
e) SELECT * FROM Contribuintes WHERE nomeContribuinte LIKE '%s';

Resposta Letra E

**36) (CCV / UFC – 2019)** Uma tabela chamada Area possui dois campos: arecod e aredes. Como podemos inserir um novo registro na tabela "Area"?
a) INSERT INTO Area (arecod, aredes) VALUES (100, "Técnico"), (200, "TI").
b) INSERT (100, "Técnico"), (200, "TI") INTO Area VALUES(arecod, aredes).
c) INSERT (arecod, aredes) INTO Area VALUES (100, "Técnico"), (200, "TI").
d) INSERT INTO (arecod, aredes) Area VALUES (100, "Técnico"), (200, "TI").
e) INSERT (100, "Técnico"), (200, "TI") INTO Area (arecod, aredes).

Resposta Letra A

**37) (CCV / UFC – 2019)** Utilizando SQL, como selecionamos todos os registros de uma tabela chamada "Pessoas" onde o valor da coluna "PrimeiroNome " começa com "a"?
a) SELECT * FROM Pessoas WHERE PrimeiroNome='a'
b) SELECT * FROM Pessoas WHERE PrimeiroNome LIKE 'a%'
c) SELECT * FROM Pessoas WHERE PrimeiroNome='%a%'
d) SELECT * FROM Pessoas WHERE PrimeiroNome LIKE '%a'
e) SELECT * FROM Pessoas WHERE PrimeiroNome HAVING='%a%'

Resposta Letra B

**38) (NC-UFPR / Itaipu Binacional – 2019)** A recursividade presente em consultas realizadas com SQL na forma SELECT a.id,... FROM a WHERE ... IN (SELECT atributo FROM b WHERE b.x=a.id) pode ser evitada por meio:
a) da substituição do operador IN por EXISTS.
b) da junção externa do tipo RIGHT JOIN com a verificação de atributos de b com o valor nulo.
c) da junção interna – INNER JOIN.
d) da junção externa do tipo LEFT JOIN com a verificação de atributos de b com o valor nulo.
e) da utilização de expressões de tabelas comuns (CTE).

Resposta Letra C
OBS: só pode fazer o JOIN se tiver colunas em comum, no caso WHERE b.x=a.id.


**39) (QUADRIX / CRA-PR – 2019)** Uma consulta aninhada pode retornar tanto um único atributo quanto vários atributos e(ou) várias tuplas.
SELECT DISTINCT cra
FROM TRABALHO
WHERE (forma_atuacao, uf) IN (
      SELECT forma_atuacao, uf FROM trabalho WHERE CRA=2019);

Resposta Verdadeiro.
      
**40) (QUADRIX / CRA-PR – 2019)** O operador DISTINCT não pode ser utilizado em consultas aninhadas.

SELECT DISTINCT cra
FROM TRABALHO
WHERE (forma_atuacao, uf) IN (
      SELECT forma_atuacao, uf FROM trabalho WHERE CRA=2019);

Resposta Falsa.

**41)(QUADRIX / CRA-PR – 2019)** A instrução demonstra que é permitido o uso de tuplas de valores em comparações, colocando-os entre parênteses, em consultas do tipo aninhada.

SELECT DISTINCT cra
FROM TRABALHO
WHERE (forma_atuacao, uf) IN (
      SELECT forma_atuacao, uf FROM trabalho WHERE CRA=2019);

Resposta Verdadeiro

**42) (QUADRIX / CRA-PR – 2019)** A instrução contém erro clássico de construção, pois, em uma consulta aninhada ou subconsulta, não é permitido o uso de nomes de tabelas repetidos, como, nesse caso, ocorre com a tabela TRABALHO

SELECT DISTINCT cra
FROM TRABALHO
WHERE (forma_atuacao, uf) IN (
      SELECT forma_atuacao, uf FROM trabalho WHERE CRA=2019);

Resposta Falsa.

**43) (NC-UFPR / Itaipu Binacional – 2019)** Considerando a linguagem SQL (Structured Query Language) para sistemas de banco de dados, assinale a alternativa que remove linhas de uma tabela chamada CLIENTE.
a) REMOVE FROM CLIENTE ...
b) CUT FROM CLIENTE ...
c) DELETE FROM CLIENTE WHERE ...
d) ERASE FROM CLIENTE …
e) CLEAR FROM CLIENTE ...

Resposta Letra C

**44)(FCC / AFAP – 2019)** Fernando está usando a linguagem SQL (ANSI) e pretende fazer uma atualização nos dados Nome_Cli e End_Cli do cliente cujo Cod_Cli é Cli01, na tabela Cliente.

Nome_Cli passará a ser Ariana e End_Cli passará a ser Rua ABC. O código SQL correto que Fernando escreveu foi:

..I.. Cliente
..II.. Nome_Cli = 'Ariana', End _Cli = 'Rua ABC'
..III.. Cod_Cli = 'Cli01';

Para que o código esteja correto, as lacunas I, II e III devem ser preenchidas, respectivamente, por

a) SET - WHERE - UPDATE
b) UPDATE - SET - WHERE
c) UPDATE - WHERE - SET
d) WHERE - SET - UPDATE
e) SET - UPDATE - WHERE

Resposta Letra B

**45) (IADES / CRF - TO - 2019)** A Linguagem de Consulta Estruturada (SQL – Structured Query Language) foi padronizada para utilização em bancos de dados em 1986 e é amplamente utilizada por diferentes Sistemas Gerenciadores de Bancos de Dados
(SGBDs). Essa linguagem é dividida em quatro conjuntos, sendo eles linguagens:

a) de estruturação, de dados, para argumentação de controles e orientada a objetos.
b) orientada à conexão, estruturada, de manipulação de dados e de paralelismo.
c) para argumentação de controles, de definição de dados, orientada à conexão e de paralelismo.
d) para controle de acesso a dados, para transações, orientada a objetos e de estruturação.
e) de manipulação de dados, de definição de dados, para controle de transações e para controle e acesso a dados.

Resposta Letra E

DDL – Data Definition Language → definição de dados
DML – Data Manipulation Language → manipulação de dados
DCL – Data Control Language → controle e acesso a dados (GRANT, REVOKE)
TCL – Transaction Control Language → controle de transações (COMMIT, ROLLBACK)

# 2023/2024

**01) CEBRASPE (CESPE)** - 2023 - Analista de Planejamento e Orçamento (SEPLAN RR)/Tecnologia da Informação 

A respeito de banco de dados, julgue o próximo item.

Em um comando SELECT, a cláusula WHERE define que o resultado da consulta é o produto cartesiano das tabelas envolvidas.

Resposta Falso. **O FROM que dá a possibilidade de produto cartesiano.**

**02) CEBRASPE (CESPE) - 2023 (SEPLAN RR)**

A respeito de banco de dados, julgue o próximo item.

Em SQL, o comando DISTINCT é utilizado para eliminar resultados repetidos em consultas a tabelas do banco de dados.

Resposta Verdadeiro.

**03) CEBRASPE (CESPE) - 2023 (SEPLAN RR)**

Julgue o item seguinte a respeito dos conceitos de administração de dados.

Os comandos TRUNCATE e DROP TABLE removem todas as linhas de uma tabela, porém o comando DROP TABLE exclui também a estrutura da tabela do banco de dados bem como todos os dados armazenados na tabela.

Resposta Verdadeiro.

**04) CEBRASPE (CESPE) - 2023 - (SEPLAN RR)**

Considerando os conceitos de tuning de banco de dados, julgue o item a seguir.

O comando EXPLAIN permite otimizar tabelas que executam muitas operações de UPDATE e DELETE em detrimento de operações de INSERT.

Resposta Falsa. **EXPLAIN não serve para otimizar e sim explicar e detalhar passos da operação para ai sim, pensar em como otimizar.**

**05) Instituto Consulplan - 2023 (MPE MG)**

Observe a imagem a seguir:

1 SELECT hp.numero_processo, u.codigo, hp.data_acesso, u.login, s.descricao
2 FROM historico_processo as hp, usuario as u, setor as s
3 WHERE hp.data_acesso = (SELECT MAX(h.data_acesso)
4                         FROM historico_processo h
5                         WHERE h.numero_processo = hp.numero_processo)
6 AND hp.cod_usuario = u.codigo
7 AND u.cod_setor = s.codigo;

Em relação ao código SQL anterior, assinale a afirmativa correta.
A) O código tem como finalidade mostrar dados do último acesso ao processo.
B) Na linha 3, há um erro de sintaxe, pois não se pode usar a função MAX em uma subconsulta.
C) O código tem como finalidade mostrar todos os acessos ao processo, ordenando-os pela data de acesso.
D) Para que o código seja executado sem erro, deve ser inserido o ponto-e-virgula (;) ao final da linha 5, ou seja, ao final da subconsulta.

Resposta Letra A

**06) Instituto Consulplan - 2023 - (MPE MG)**
O comando SELECT da linguagem SQL é usado para consultar o banco de dados e retornar dados recuperados que satisfazem determinada condição expressa no comando. Considerando a sintaxe do comando SELECT, assinale a afirmativa INCORRETA.

A) select id_aluno from aluno;
B) select * from aluno where id_aluno = 1000;
C) select id_aluno from aluno where id_aluno = 1004;
D) select id_aluno where id_aluno = 1008 and sobrenome = 'Silva';

Resposta Letra D. **A sintaxe correta do SELECT exige FROM especificando a tabela.**

**07) Instituto Consulplan - 2023 - (MPE MG)**

SQL foi desenvolvida na IBM Research no início da década de 1970; tornou-se a linguagem padrão para se lidar com bancos de dados relacionais. Seus comandos são divididos em grupos de acordo com sua funcionalidade. Sobre os comandos SQL de linguagem de controle de dados (Data Control Language – DCL), assinale a afirmativa INCORRETA.

A) DENY
B) GRANT
C) REVOKE
D) COMMIT

Resposta Letra D, **COMMIT e ROLLBACK são referentes a Transações**

**08) Instituto Consulplan - 2023 - (MPE MG)**
O operador LIKE é utilizado para buscar por uma determinada string dentro de um campo com valores textuais. Esse operador permite fazer comparações de partes de uma determinada string. Analise a consulta com operador LIKE a seguir e assinale a
alternativa que completa a lacuna para selecionar o nome dos professores que terminam com ‘Silva’.

SELECT nome_professor FROM professor WHERE
nome_professor LIKE '__Silva';

A) %
B) &
C) $
D) _

Resposta Letra A

**09)(FGV/ TCU – 2022)** 
### Tabela T

| sequencia | característica |
| :-------: | :-------------: |
| 1 | 23987 |
| 2 | 9845 |
| 3 | NULL |
| 4 | 40983 |
| 6 | 48750 |
| 7 | NULL |
| 8 | NULL |
| 10 | 48750 |
| 12 | 48750 |

### Tabela TX

| sequencia | característica |
| :-------: | :-------------: |
| 2 | 9845 |
| 3 | 998034 |
| 4 | 50932 |
| 5 | 24390 |
| 6 | 48750 |
| 6 | 50296 |
| 7 | NULL |
| 8 | 998746 |
| 9 | 32746 |
| 9 | NULL |
| 9 | 22798 |

### Tabela DUAL

| x |
| :-: |
| NULL |

Considere que é preciso atualizar os dados da tabela T a partir dos dados da tabela TX, ambas definidas anteriormente. A consolidação é feita por meio da alteração na tabela T a partir de registros de TX. O comando SQL utilizado nessa atualização é exibido a seguir.

UPDATE T
SET caracteristica = (
    SELECT MAX(caracteristica) x
    FROM TX tx
    WHERE tx.sequencia = t.sequencia
    AND NOT (tx.caracteristica IS NULL)
)
WHERE (
    EXISTS (
        SELECT *
        FROM TX tx
        WHERE tx.sequencia = t.sequencia
        AND NOT (tx.caracteristica IS NULL)
    )
    AND
    (
        t.caracteristica IS NULL
        OR
        t.caracteristica < (
            SELECT MAX(caracteristica) x
            FROM TX tx
            WHERE tx.sequencia = t.sequencia
            AND NOT (tx.caracteristica IS NULL)
        )
    )
);

O número de registros da tabela T afetados pela execução do comando SQL acima é:
a) zero;
b) três;
c) quatro;
d) seis;
e) nove.

Resposta Letra C

**10) (FGV/ TCU – 2022)** Analise os cinco comandos SQL exibidos abaixo, utilizando a tabela DUAL apresentada anteriormente.
(1) select * from dual where x = null
(2) select * from dual where x <> null
(3) select * from dual where x > 10
(4) select * from dual where not x > 10
(5) select * from dual where x > 10
union
select * from dual where x <= 10

Se os resultados desses comandos fossem separados em grupos homogêneos, de modo que em cada grupo todos sejam idênticos e distintos dos elementos dos demais grupos, haveria:

a) apenas um grupo;
b) apenas dois grupos;
c) apenas três grupos;
d) apenas quatro grupos;
e) cinco grupos.

Resposta Letra A

**11) INQC - 2024 - (CPTRANS)**
Um usuário técnico de um ambiente com Sistema Gerenciador de Banco de Dados, baseado no SQL, deseja remover todos os registros de uma tabela, mas mantendo a estrutura da mesma.

Para isso, ele vai usar o comando da DDL do SQL conhecido como:
A) DROP
B) ALTER
C) DELETE
D) TRUNCATE

Resposta Letra D

**12) CEBRASPE (CESPE) - 2024 - (CNPq)** 
Acerca de técnicas de modelagem de BI (business intelligence), de big data e de linguagem de manipulação de dados (DML), julgue o item que se segue.

A DML não procedimental exige que um usuário especifique quais dados são necessários sem especificar como obtê-los.

Resposta Verdadeiro. SQL é não procedural.

**13) IGEDUC - 2024 - Analista (CM V Santo Antão)/Informática**

Julgue o item a seguir.

Na linguagem SQL, utilizada para interagir com bancos de dados relacionais, os comandos são divididos em categorias, incluindo DML (Data Manipulation Language) e DDL (Data Definition Language). DML é usado para manipular dados (como INSERT, UPDATE, DELETE) enquanto DDL é usado para definir e gerenciar a estrutura dos objetos do banco de dados (como CREATE, ALTER, DROP).

Resposta Verdadeiro.

**14) Instituto Consulplan - 2024 - (DPE PR)**
SQL é uma linguagem declarativa baseada em álgebra e cálculo relacional, que permite a manipulação de dados com suporte a estrutura de dados, regras e restrições de integridade. Para que o SQL forneça tantos recursos, seus comandos são divididos
em grupos. Considerando os grupos dos comandos SQL, relacione adequadamente as colunas a seguir.
1. DDL.
2. DML.
3. DCL.
4. DTL.
5. DQL.
( ) Permite a manipulação dos dados, ou seja, inclusão, alteração e exclusão de dados.
( ) Oferece comandos para trabalhar com transações.
( ) Proporciona consulta de dados.
( ) Permite determinar o esquema do banco de dados, bem como alterá-lo, exclui-lo e trabalhar com os metadados.
( ) Permite controlar a licença e a autorização de acesso dos usuários para com os dados.

A sequência está correta em
A) 1, 2, 4, 3, 5.
B) 2, 4, 5, 1, 3.
C) 3, 5, 1, 4, 2.
D) 5, 1, 3, 2, 4.

Resposta Letra B


**15) IBFC - 2024 - (TRF 5ª Região)**
Uma linguagem que tem por objetivo servir de interface entre o usuário e o Sistema Gerenciador de Banco de Dados conhecida por SQL (Structured Query Languag). A SQL está dividida em partes as quais são apresentadas a seguir:

( ) A DDL (Data Definition Language), responsável por definir os metadados.
( ) A DML (Data Manipulation Language), que possibilita a manipulação e consulta dos dados.
( ) A DCL (Data Control Language), que trabalha com comandos para auxiliar na segurança do banco de dados.

Assinale a alternativa que apresenta a sequência correta de cima para baixo.
A) V - F - V
B) F - V - V
C) F - V - F
D) V - V - V

Resposta Letra D
A DDL (Data Definition Language) é responsável por definir os metadados.

**16) CEBRASPE (CESPE) - 2024 - (INPI)**

ALUNOS(ID,Nome,Endereço,Cidade,UF)
DISCIPLINA(Cod_disciplina, Nome_diciplina, Carga_horaria)

Considerando que as tabelas precedentes façam parte de um banco de dados relacional, julgue o item subsequente.

A seguir, é apresentado um exemplo de comando DDL.

DELETE TABLE DISCIPLINA WHERE Carga_horaria > 3;

Resposta Falso. 

DELETE é DML e não DDL
E não existe DELETE TABLE, apenas DELETE.

**17) CEBRASPE (CESPE) - 2024 - (CTI)**
Considerando as linguagens e os fundamentos de bancos de dados relacionais, julgue o item subsequente.

No DML (data manipulation language), a instrução TRUNCATE elimina todas as linhas de uma tabela simultaneamente, enquanto a instrução DELETE oferece a possibilidade de excluir dados específicos ou todos os dados.

Resposta Falso.
TRUNCATE é DDL e não DML.

**18) CESGRANRIO - 2024 - (UNEMAT)**
Considere a criação de um banco de dados relacional para a biblioteca de uma universidade.
Nesse contexto, Data Definition Language, DDL; Data Manipulation Language, DML; e Data Query Language, DQL, são utilizados para
A)
DDL: Criar tabelas para armazenar informações sobre livros, autores e editoras.
DML: Inserir registros nas tabelas com detalhes específicos de um novo livro.
DQL: Recuperar todos os livros de um determinado autor.
B)
DDL: Criar tabelas para armazenar informações sobre livros, autores e editoras.
DML: Atualizar a quantidade disponível de exemplares de um livro.
DQL: Inserir registros nas tabelas com detalhes específicos de um novo livro.
C)
DDL: Atualizar a quantidade disponível de exemplares de um livro.
DML: Criar tabelas para armazenar informações sobre livros, autores e editoras.
DQL: Recuperar todos os livros emprestados por um usuário específico.
D)
DDL: Inserir registros nas tabelas com detalhes específicos de um novo livro
DML: Criar tabelas para armazenar informações sobre livros, autores e editoras.
DQL: Atualizar a quantidade disponível de exemplares de um livro.
E)
DDL: Recuperar todos os livros de um determinado autor.
DML: Criar tabelas para armazenar informações sobre livros, autores e editoras.
DQL: Inserir registros nas tabelas com detalhes específicos de um novo livro.

Resposta Letra A

DDL (Data Definition Language) → usada para criar, alterar, excluir estruturas do banco (ex.: CREATE TABLE).
✔ Criar tabelas de livros, autores e editoras → correto.

DML (Data Manipulation Language) → usada para inserir, atualizar e excluir dados dentro das tabelas (ex.: INSERT, UPDATE, DELETE).
✔ Inserir registros de um novo livro → correto.

DQL (Data Query Language) → usada para consultar dados (ex.: SELECT).
✔ Recuperar todos os livros de um autor → correto.

**19) AVANÇASP - 2023 - (Pref Americana)**
Com relação às linguagens, analise os itens a seguir e, ao final, assinale a alternativa correta:

I – A linguagem SQL está dividida em subconjuntos de acordo com as operações que queremos efetuar sobre um banco de dados.
II – Linguagem de definição de dados (DDL) é um conjunto de comandos dentro da SQL, usada para a definição das estruturas de dados.
III – Linguagem de controle de dados (DCL) é o grupo de comandos que permitem ao administrador de banco de dados controlar o acesso aos dados deste banco.

A) Apenas o item I é verdadeiro.
B) Apenas o item II é verdadeiro.
C) Apenas o item III é verdadeiro.
D) Apenas os itens I e II são verdadeiros.
E) Todos os itens são verdadeiros.

Resposta Letra E

**20) AVANÇASP - 2023 - Analista (Pref Americana)/Administração de Dados**

O Comando ALTER TABLE pertence a qual grupo de comandos da linguagem SQL?

A) DML.
B) DCL.
C) DPL.
D) DDL.
E) DXL.

Resposta Letra D

**21) FGV - 2023 - Fiscal de Tributos Estaduais (MT)**

No contexto da concessão de privilégios/permissões na administração de bancos de dados relacionais, assinale a opção que indica dois dos comandos básicos disponíveis na maior parte dos SGDB.

A) ADD e DELETE.
B) ALLOW e CONSTAINT.
C) ATTACH e DETACH.
D) GRANT e REVOKE.
E) INSERT e REMOVE.

Resposta Letra D

**22) DIRENS Aeronáutica - 2023 - (EEAR)**

Na linguagem SQL ocorre a subdivisão de comandos de acordo com as funções que desempenham. As duas principais subdivisões são DDL (Data Definition Language) e DML (Data Manipulation Language).

Assinale a alternativa que apresenta somente comandos SQL DML utilizados no SGBD MySQL.

A) INSERT - ALTER DATABASE - DROP DATABASE
B) DROP DATABASE - UPDATE - MERGE
C) UPDATE - CONSTRAINT - MERGE
D) INSERT - UPDATE - DELETE

Resposta Letra D

**23) FUNDATEC - 2023 - (IFFAR)**
São subconjuntos da linguagem SQL, EXCETO:

A) Linguagem de Consulta de Dados (DQL).
B) Linguagem de Manipulação de Dados (DML).
C) Linguagem de Configuração de Dados (DCL).
D) Linguagem de Definição de Dados (DDL).
E) Linguagem de Transação de Dados (DTL).

Resposta Letra C

**24) FUNDATEC - 2023 - (IFC)**
Dentro da linguagem SQL, qual instrução NÃO faz parte do subconjunto de comandos DDL?
A) create
B) delete
C) alter
D) drop
E) truncate

Resposta Letra B

**25) FUNDATEC - 2023 - (IFC)**

Uma vez concluído o projeto de um banco de dados e escolhido um SGDB (Sistema de Gerenciamento de Banco de Dados) para implementá-lo, o primeiro passo é especificar esquemas conceituais e internos para o banco de dados e quaisquer mapeamentos entre os dois. A linguagem de definição para uma verdadeira arquitetura de três esquemas para especificar as visualizações do usuário e seus mapeamentos para o esquema conceitual é a Linguagem de:

A) Definição de dados (DDL).
B) Definição de armazenamento (SDL).
C) Consulta estruturada (SQL).
D) Manipulação de dados (DML).
E) Definição de visão (VDL).

Resposta Letra E


**26) FGV - 2023 - (DPE RS)**

Júlia é a administradora do banco de dados da empresa KASA, onde será implantado o novo sistema estratégico da empresa, para fornecimento de relatórios gerenciais em tempo real. No sistema antigo, o perfil GERENTE permitia acesso aos dados operacionais, para que eles fossem tratados em planilhas, mas agora os relatórios serão gerados a partir de visualizações específicas, diretamente na nova ferramenta.

Para impedir o acesso aos dados operacionais e permitir o acesso às novas visualizações, Júlia utilizou, respectivamente, os comandos:

A) Drop e Create;
B) Delete e Insert;
C) Rollback e Commit;
D) Revoke e Grant;
E) Alter e Use.

Resposta Letra D

**27) CEBRASPE (CESPE) - 2023 - (Pref Fortaleza)**

Julgue o item a seguir, a respeito de arquitetura de dados, metadados e linguagens de bancos de dados.

Comandos expressos em linguagem de definição de dados (DDL) são utilizados para criar estruturas de um banco de dados, e o seu processamento irá incluir ou alterar metadados desse mesmo banco de dados.

Resposta Verdadeiro.

**28) CEBRASPE (CESPE) - 2023 - (Pref Fortaleza)**

No que diz respeito a banco de dados relacional e banco de dados geográfico, julgue o item a seguir.

A SQL (structured query language) pode ser subdividida em duas sublinguagens: a linguagem de definição de dados (DDL), que fornece comandos visando definir e modificar esquemas de tabelas, remover tabelas, criar índices e definir restrições de integridade; e a linguagem de manipulação de dados (DML), formada por comandos para consulta, inserção, modificação e remoção de dados no banco de dados.

Resposta Verdadeiro. 

A banca não afirmou que só existem essas duas; apenas disse que a SQL pode ser subdividida nelas — e isso é verdadeiro.

✔️ Sublinguagens adicionais (que não invalidam o item)

DQL (Data Query Language) → SELECT (consultas)

DCL (Data Control Language) → GRANT, REVOKE (controle de acesso)

DTL/TCL (Data Transaction Language) → COMMIT, ROLLBACK, SAVEPOINT (transações)

Todas existem, mas não são exigidas no julgamento do item, porque ele não disse que a SQL é composta somente de duas.

**29) CEBRASPE (CESPE) - 2023 - (DATAPREV)**

Em relação às linguagens de banco de dados SQL, DDL e DML, julgue o item a seguir.

Na DDL, que é uma linguagem declarativa, é descrito o que se deseja fazer, em vez de como fazê-lo, como comandos para definir tabelas e procedures, tal qual exemplificado a seguir.

CREATE TABLE <tablename> (col1 int, col2 int, col3 int)

Resposta Verdadeiro.

**30) CEBRASPE (CESPE) - 2023 - (DATAPREV)**

Em relação às linguagens de banco de dados SQL, DDL e DML, julgue o item a seguir.

A DML é uma linguagem que interage com os objetos do banco de dados, em vez de interagir com os dados.

Resposta Falto. Interage com os dados.

**31) CEBRASPE (CESPE) - 2023 - (DATAPREV)**

A respeito de administração de dados e de bancos de dados, julgue o item a seguir. 
A DCL (Data Control Language) é utilizada para controlar quem tem acesso aos objetos do banco de dados.

Resposta Verdadeiro

**32) CEBRASPE (CESPE) - 2023 - (DATAPREV)**
A respeito de administração de dados e de bancos de dados, julgue o item a seguir.
A DDL (Data Definition Language) é utilizada em bancos de dados para comandos de UPDATE nas tabelas.

Resposta FAlso

**33) CEBRASPE (CESPE) - 2023 - (DATAPREV)**
A respeito de administração de dados e de bancos de dados, julgue o item abaixo.
A DCL (Data Control Language) é utilizada para controlar quem tem acesso aos objetos do banco de dados.

Resposta Verdadeiro

**34) FCC - 2023 - (TRT 12ª Região)**
Considere o seguinte caso:
Utilizando comandos SQL, um analista criou uma tabela de cidadão dando permissão de acesso ao usuário Roberto. Posteriormente inseriu dados nessa tabela, mas logo em seguida teve que deletá-los, retirar a permissão de Roberto que estava saindo do tribunal e dar permissão a Carla.

A sequência de comandos SQL utilizada no caso é, correta e respectivamente, categorizada como
A) DML - DCL - DDL - DDL - DCL - DCL
B) DML - DCL - DML - DDL - DML - DCL
C) DDL - DCL - DML - DML - DCL - DCL
D) DDL - DCL - DDL - DML - DML - DCL
E) DCL - DDL - DML - DML - DCL - DCL

Resposta Letra C

**35) FGV - 2024 - Auditor Tributário Municipal (Pref SJC)**
Com relação à linguagem SQL e seus operadores, avalie se as afirmativas a seguir são verdadeiras (V) ou falsas (F).
( ) O operador LIKE é usado em uma cláusula WHERE para procurar um padrão especificado em uma coluna. Existem dois curingas frequentemente usados em conjunto com este operador; o sinal de % representa zero, um ou vários caracteres, já o sinal de - representa um único caractere.
( ) O operador IN permite especificar vários valores em uma cláusula WHERE. Ele é uma abreviação para múltiplas condições OR e AND sequenciais. Ao usar a palavra-chave NOT na frente do operador IN, haverá o retorno todos os registros que não são nenhum dos valores de uma lista.
( ) A palavra-chave RIGHT JOIN retorna todos os registros da tabela à direita em uma junção e os registros correspondentes da tabela à esquerda em uma junção. O resultado é zero registro do lado esquerdo, se não houver correspondência.

As afirmativas são, respectivamente,
A) F – V – V.
B) F – F – V.
C) V – V – F.
D) V – F – V.
E) F – F – F.

Resposta Letra B. Atenção ao hífen '-' o correto é '_'.

**36) Instituto Verbena - 2024 - (CM Anápolis)**

Qual a consulta SQL ANSI adequada para calcular a média de propostas que cada vereador apresentou no ano de 2023, agrupadas por assunto e garantir que a média seja maior que zero? Considere uma tabela chamada “propostas” com informações sobre as propostas, incluindo a coluna “vereador” para representar o autor da proposta, a coluna “assunto” para indicar o tema da proposta e a coluna “data_apresentacao” para armazenar a data de apresentação.

a)

```sql
SELECT vereador, assunto, AVG(COUNT(*)) AS media_propostas
FROM propostas
WHERE YEAR(data_apresentacao) = 2023
GROUP BY vereador, assunto
HAVING AVG(numero_propostas) > 0;
```


b)

```sql
SELECT vereador, assunto, COUNT(*) AS numero_propostas
FROM propostas
WHERE YEAR(data_apresentacao) = 2023
GROUP BY vereador, assunto
HAVING COUNT(*) > 0;
```

c)

```sql
SELECT vereador, assunto, AVG(numero_propostas) AS media_propostas
FROM (
        SELECT vereador, assunto, COUNT(*) AS numero_propostas
        FROM propostas
        WHERE YEAR(data_apresentacao) = 2023
        GROUP BY vereador, assunto
     ) subconsulta
GROUP BY vereador, assunto
HAVING AVG(numero_propostas) > 0;
```

d)

```sql
SELECT vereador, assunto, AVG(numero_propostas) AS media_propostas
FROM (
        SELECT vereador, assunto, COUNT(*) AS numero_propostas
        FROM propostas
        WHERE YEAR(data_apresentacao) = 2023
        GROUP BY vereador, assunto
     ) subconsulta
HAVING AVG(numero_propostas) > 0
GROUP BY vereador, assunto;
```
Resposta Letra C

A está errada pois:
AVG(COUNT(*)) é inválido. 
HAVING AVG(numero_propostas) usa coluna numero_propostas, que não existe na consulta.

B está errada pois:
Não calcula média, apenas conta propostas.

D está errada pois:
HAVING deve vir depois de GROUP BY, e não antes.

**37) CESGRANRIO - 2024 - (IPEA)**
Para a avaliação de políticas públicas na área de Segurança Alimentar e Nutricional, um município brasileiro utilizou dados persistidos em três relações (tabelas) organizadas de acordo com o seguinte modelo relacional:

PRODUTO (cod-produto, nome-produto, grupo-alimentar)
FORNECEDOR (CNPJ, nome-empresa, tipo)
COMPRADO (CNPJ, cod-produto, data, quantidade, valor)

Os atributos que formam as chaves primárias de cada tabela estão sublinhados. Nesse contexto, considere o comando SQL apresentado a seguir.

SELECT P.cod-produto, SUM (quantidade)
FROM PRODUTO P, FORNECEDOR F, COMPRADO C
WHERE P.cod-produto = C.cod-produto
AND C.CNPJ = F.CNPJ
AND F.tipo = 'agricultura familiar'
GROUP BY P.cod-produto
HAVING SUM (quantidade) > 10000

Os resultados produzidos pela execução desse comando apresentam o código do produto e a soma das quantidades compradas dos produtos de

A) fornecedores com mais de 10.000 produtos distintos.
B) fornecedores do tipo 'agricultura familiar' que tiveram mais de 10.000 unidades compradas.
C) fornecedores do tipo 'agricultura familiar' que fornecem mais de 10.000 produtos distintos.
D) todos os fornecedores do tipo 'agricultura familiar'.
E) produtos que tiveram mais de 10.000 unidades compradas.

Resposta Letra B

**38) CEBRASPE (CESPE) - 2024 - (CAU BR)**
No que se refere a banco de dados relacional e orientado a objeto, julgue o item a seguir.
A principal finalidade da linguagem SQL (structured query language) em um banco de dados relacional é permitir operações como consulta, adição e exclusão de dados.

Resposta Verdadeiro.

**39) CESGRANRIO - 2024 - (IPEA)**
Considere que um banco de dados foi criado para dar apoio à avaliação de instrumentos e políticas de gestão de trânsito no Brasil, nos últimos cinco anos. Os dados foram organizados e persistidos nas três seguintes tabelas, definidas de acordo
com modelo relacional de dados: SINISTRO, com dados dos acidentes de trânsito; MUNICIPIO, com dados de municípios; e RODOVIA, com dados de rodovias estaduais e federais.

SINISTRO (cod-sinistro, data-e-hora, localizacao, cod-rodovia, cod-municipio, quantidade-de-vitimas)
RODOVIA (cod-rodovia, nome, estadual-ou-federal)
MUNICIPIO (cod-municipio, uf, quantidade-de-habitantes)

Os atributos que formam as chaves primárias de cada tabela estão sublinhados.

Na tabela SINISTRO, há duas chaves estrangeiras: cod-rodovia, que indica onde ocorreu o sinistro, caso ele tenha ocorrido em uma rodovia, e cod-municipio, que indica em que municipio ocorreu o sinistro.

Nesse contexto, considere o seguinte comando SQL:

SELECT S.cod-rodovia, S.data-e-hora, quantidade-de-vitimas
FROM SINISTRO S
WHERE S.cod-rodovia IN (
SELECT R.cod-rodovia
FROM RODOVIA R
WHERE R.estadual-ou-federal = 'federal')
AND EXISTS (
SELECT *
FROM MUNICIPIO M
WHERE M.cod-municipio = S.cod-municipio
AND M.quantidade-de-habitantes < 50000)

Os resultados produzidos pela execução desse comando apresentam o código da
rodovia, a data e hora e a quantidade de vítimas de sinistros ocorridos em
A) rodovias federais que passam por municípios com menos de 50.000 habitantes.
B) rodovias federais, em municípios com menos de 50.000 habitantes.
C) rodovias federais que têm como origem ou destino municípios com menos de 50.000 habitantes.
D) município com menos de 50.000 habitantes ou em rodovias federais.
E) município com menos de 50.000 habitantes com duas ou mais rodovias federais.

Resposta Letra B

**40) Instituto Consulplan - 2024 - (DPE PR)**

O comando SQL ALTER TABLE pertence ao grupo de comandos DDL do SQL. São características do comando SQL ALTER TABLE, EXCETO:

A) Permite alterar o nome da tabela.
B) Não permite alterar a tabela excluindo um campo.
C) Permite alterar a tabela adicionando uma chave primária.
D) Permite alterar a tabela adicionando uma chave estrangeria.

Resposta Letra B

**41) IBFC - 2024 - (TRF 5ª Região)**

De acordo com a linguagem de manipulação de dados em SQL, para atualizar o valor da coluna "quantidade" para 50 na tabela "estoque" para todos os registros onde o produto é "Leite" é:

A) ALTER estoque SET quantidade = 50 WHERE produto = 'Leite'
B) CHANGE estoque SET quantidade = 50 WHERE produto EQUALS 'Leite'
C) UPDATE estoque SET quantidade = 50 WHERE produto = 'Leite'
D) MODIFY estoque SET quantidade = 50 WHERE produto LIKE 'Leite'

Resposta Letra C

**42) IBFC - 2024 - (TRF 5ª Região)**

A linguagem SQL dispõe de diversos comandos. Assinale a alternativa que apresenta qual comando SQL é usado para agrupar registros com base em valores em uma ou mais colunas:

A) ROUNDED BY
B) SORT BY
C) ARRANGE BY
D) GROUP BY

Resposta Letra D

**43) CEBRASPE (CESPE) - 2024 - (INPI)**

ALUNOS(ID,Nome,Endereço,Cidade,UF)
DISCIPLINA(Cod_disciplina, Nome_diciplina,Carga_horaria)

Considerando que as tabelas precedentes façam parte de um banco de dados relacional, julgue o item subsequente.

O comando DML a seguir está correto, pois a cláusula WHERE é opcional.

UPDATE ALUNOS SET Cidade=’Curitiba’, UF=’PR’;

Resposta Verdadeiro. **Mas vai alterar para todo mundo!**

**44) FUNCERN - 2024 - (IF RN)**
Sejam as tabelas, "Estudantes" e "Projetos", com as seguintes informações:

![questao 44](sql/questao44.png)

A instrução SQL que permite selecionar o nome de todos os estudantes e o nome de seus respectivos projetos, incluindo estudantes que não têm um projeto atribuído, é

A) SELECT Estudantes.Nome, Projetos.Nome FROM
Projetos ON Estudantes.ProjetoID = Projetos.ProjetoID;EstudantesJOIN
B) SELECT Estudantes.Nome, Projetos.Nome FROM
JOIN Projetos ON Estudantes.ProjetoID = Projetos.ProjetoID;EstudantesLEFT
C) SELECT Estudantes.Nome, Projetos.Nome FROM Estudantes
Projetos ON Estudantes.ProjetoID = Projetos.ProjetoID;RIGHT JOIN
D) SELECT Estudantes.Nome, Projetos.Nome FROM Estudantes
Projetos ON Estudantes. ProjetoID = Projetos.ProjetosID;

Resposta Letra B

**45) CEBRASPE (CESPE) - 2024 - (ANAC)**
Acerca de bancos de dados relacionais, julgue o item que se segue.

Em um banco de dados relacional, a estratégia de implementação de uma view denominada materialização da view implica criar fisicamente uma tabela temporária a partir da primeira consulta a essa view e mantê-la ativa por um determinado período, considerando que poderão seguir-se outras consultas.

Resposta Verdadeira.

**46) IDECAN - 2024 - (BANDES)**

No contexto da SQL, uma cláusula é utilizada juntamente com um comando SQL para classificar o resultado obtido em uma consulta. Essa classificação pode ser aplicada a uma ou mais colunas da tabela consultada. Nesse contexto, um BD contém diversas tabelas, das quais uma é identificada por aluno, que por sua vez, contém diversoscampos, dos quais um é id, um atributo que deve ser utilizado como referência para se obter uma tabela RESULTADO, que contenha todas as informações de aluno, ordenadas por id, de forma crescente. A sintaxe correta para esse comando e cláusula está indicada na seguinte opção:

A) SELECT * ON aluno HAVING id DESC
B) SEARCH * ON aluno HAVING id DESC
C) SELECT * FROM aluno ORDER BY id ASC
D) SEARCH * FROM aluno ORDER BY id ASC

Resposta Letra C

**47) IDECAN - 2024 - (BANDES)**

Em um banco de dados relacional SQL SERVER, um DBA precisa excluir uma tabela.

Nessa situação, o comando SQL que descarta a tabela é:

A) DROP TABLE table_name;
B) CRASH TABLE table_name;
C) REMOVE TABLE table_name;
D) EXCLUDE TABLE table_name;

Resposta LEtra A

**48) FGV - 2024 - (TJ AP)**
Quando referenciadas, considere as tabelas relacionais Competidor e Disputa, cujas estruturas e instâncias são descritas abaixo. Todas as colunas são definidas como strings.

A tabela Disputa contém as disputas realizadas entre competidores que aparecem na tabela Competidor. Em cada disputa há dois competidores, um com camisa azul e outro com camisa verde.

Aqui está a conversão para **Markdown**, mantendo o formato das tabelas:

### Competidor

| **Nome** |
| -------- |
| A        |
| B        |
| C        |
| D        |
| E        |
| F        |

---

### Disputa

| **Azul** | **Verde** |
| -------- | --------- |
| A        | B         |
| C        | A         |
| B        | A         |
| C        | E         |
| F        | A         |
| F        | D         |


Considerando as tabelas Competidor e Disputa, descritas anteriormente, analise o comando SQL a seguir.

select *
from competidor c, disputa d
where (c.nome = d.azul and c.nome = d.verde)
or (c.nome = d.verde and c.nome = d.azul)

O número de linhas produzidas pela execução desse comando, sem contar a linha de títulos, é:

A) 0;
B) 1;
C) 6;
D) 18;
E) 36.

Resposta Letra A

**49) FGV - 2024 - (TJ AP)**
Observe a estrutura da tabela “Cliente” abaixo:

CREATE TABLE cliente (
cliente_ID NUMBER(12) PRIMARY KEY,
cidade VARCHAR2(50) NOT NULL,
limite_credito NUMBER(13,2) DEFAULT 0
);

Com o objetivo de gerar um relatório que mostre o limite de crédito médio para clientes em “Sao Paulo” e “Belo Horizonte”, a consulta a ser executada é:

**A)**

```sql
SELECT cidade, AVG(NVL(limite_credito,0)) 
FROM cliente 
WHERE cidade IN ('SAO PAULO','BELO HORIZONTE');
```

**B)**

```sql
SELECT cidade, AVG(limite_credito) 
FROM cliente
WHERE cidade IN ('SAO PAULO','BELO HORIZONTE')
GROUP BY cidade;
```

**C)**

```sql
SELECT cidade, AVG(limite_credito) 
FROM cliente
WHERE cidade IN ('SAO PAULO','BELO HORIZONTE')
GROUP BY cliente_ID;
```

**D)**

```sql
SELECT cidade, AVG(limite_credito) 
FROM cliente
WHERE cidade IN ('SAO PAULO','BELO HORIZONTE')
GROUP BY cidade, limite_credito;
```


**E)**

```sql
SELECT cidade, AVG(limite_credito) 
FROM cliente
WHERE cidade IN ('SAO PAULO','BELO HORIZONTE')
GROUP BY limite_credito, cidade;
```

Resposta Letra B

**50) CEBRASPE (CESPE) - 2023 - (SEPLAN RR)**

A respeito de banco de dados, julgue o próximo item.

Em um comando SELECT, a cláusula WHERE define que o resultado da consulta é o produto cartesiano das tabelas envolvidas.

Resposta Falsa. O FROM que está ligado a produto cartesiano.