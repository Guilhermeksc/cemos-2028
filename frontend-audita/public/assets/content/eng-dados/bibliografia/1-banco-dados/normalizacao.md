# NORMALIZAÇÃO

A normalização é um processo que busca **reavaliar a modelagem de um banco** buscando *v* **eliminar**, ou pelo menos *v* **minimizar**, a **redundância** e alcançar a melhoria de performance. Esse procedimento é feito a partir da identiﬁcação de uma anomalia em uma tabela, <u>decompondo-a em tabelas mais bem estruturadas</u>.
<br>
*vbg* **A Normalização aumenta a quantidade de tabelas no banco de dados!**
<br>

*v* **Anomalias** são problemas que ocorrem em bancos de **dados mal projetados**. Um bom projeto de banco de dados garante ao usuário a possibilidade de modificar o conteúdo do banco de dados sem causar efeitos colaterais inesperados que são as anomalias.


Existem basicamente três tipos de anomalias:
anomalia de inserção;
anomalia de exclusão e
anomalia de modificação.

*b* **a) ANOMALIA DE INCLUSÃO:** Não deve ser possível adicionar um dado em uma tabela a não ser que outro dado esteja disponível. Por exemplo: não deve ser permitido cadastrar um novo conteúdo na tabela Conteúdo sem que a disciplina desse conteúdo esteja cadastrada na Tabela de Disciplinas.

*b* **b) ANOMALIA DE EXCLUSÃO:** Ao excluir um registro do banco de dados, dados referenciados em outra tabela devem ser excluídos. Por exemplo: se excluirmos um aluno na Tabela de Alunos, as matrículas desse aluno também devem ser excluídas, em cascata, na Tabela de Matrículas.

*b* **c) ANOMALIA DE MODIFICAÇÃO:** Ao alterar um dado em uma tabela, dados em outras tabelas precisam ser alterados. Por exemplo: se o código que identiﬁca um aluno for modiﬁcado, esse código deve ser modiﬁcado na Tabela de Alunos e na Tabela de Matriculas para manter o relacionamento correto entre alunos e suas matrículas.

<br>

| TIPO DE ANOMALIA | DESCRIÇÃO  |
|------------------|------------|
| *b* **ANOMALIA DE INCLUSÃO**     | Não deve ser possível adicionar um dado em uma tabela a não ser que outro dado esteja disponível. Exemplo: não deve ser permitido cadastrar um novo livro na Tabela de Livros sem que o autor desse livro esteja cadastrado na Tabela de Autores. |
| *b* **ANOMALIA DE EXCLUSÃO**      | Ao excluir um registro do banco de dados, dados referenciados em outra tabela devem ser excluídos. Exemplo: se excluirmos um autor na Tabela de Autores, os livros desse autor também devem ser excluídos, em cascata, na Tabela de Livros.        |
| *b* **ANOMALIA DE MODIFICAÇÃO**   | Ao alterar um dado em uma tabela, dados em outras tabelas precisam ser alterados. Exemplo: se o código que identifica um autor for modificado, esse código deve ser atualizado na Tabela de Autores e na Tabela de Livros para manter o relacionamento correto entre livros e autores. |

<br> 

Em 1972, **Edgar F. Codd** criou o processo de normalização, que é utilizado para se certiﬁcar que determinada **tabela satisfaça** um conjunto de regras chamada **Formas Normais (FN)**. Cada forma normal representa uma condição mais forte que a sua precedente.

Na maioria dos casos, a **terceira forma normal (3FN)** é o mínimo necessário para considerar que um banco de dados está normalizado.

![Formas Normais](img/normalizacao.png)

## Primeira Forma Normal (1FN)

Uma tabela está na 1FN se, e somente se, todos os valores dos atributos forem atômicos (indivisíveis), ISTO É, NÃO DEVEM EXISTIR ATRIBUTOS MULTIVALORADOS ou compostos.

Para entender melhor, vamos utilizar a tabela abaixo.
Ela está na 1FN? Não, porque a coluna TELEFONE é multivalorada e a coluna ENDEREÇO é composta — ambas descumprem a Primeira Forma Normal.
| **CÓDIGO** | **NOME**| **TELEFONE**| **ENDEREÇO** |
| ---------- | ------- | ----------- | ------------ |
| 001        | Kobe Bryant    | 99685-1648<br>99381-5468 | Rua Conceição de Monte Alegre 198, Cidade Monções – São Paulo/SP |
| 002        | Michael Jordan | 99513-4678               | Estrada dos Bandeirantes 6900, Jacarepaguá – Rio de Janeiro/RJ   |
| 003        | LeBron James   | 99328-4687               | Avenida Portugal 744, Setor Marista – Goiânia/GO                 |
| 004        | Allen Iverson  | 99325-1688<br>99466-7719 | Rua Mexilhão 33, Praia do Francês – Marechal Deodoro/AL          |


Para normalizar essa tabela, precisamos inicialmente identificar sua chave primária (**CÓDIGO**).
Em seguida, identificamos o atributo **multivalorado** e criamos uma nova tabela.

TABELA TELEFONE

| **CÓDIGO** | **TELEFONE** |
| ---------- | ------------ |
| 001        | 99685-1648   |
| 001        | 99381-5468   |
| 002        | 99513-4678   |
| 003        | 99328-4687   |
| 004        | 99325-1688   |
| 004        | 99466-7719   |


Notem que agora nós temos uma nova tabela com apenas dois atributos e que podemos retirar a coluna **TELEFONE** da tabela **JOGADOR**.
Vejam também que o Código **001** (correspondente ao Kobe Bryant) continua com seus dois números — assim como o Código **004** (correspondente ao Allen Iverson).
Dessa forma, sempre que for necessário inserir, excluir, atualizar ou consultar um telefone, basta que eu saiba o código do jogador e busque na **Tabela TELEFONE**.

Agora vamos resolver o problema da coluna **ENDEREÇO**.
Nesse caso, não precisamos de uma nova tabela: basta inserir uma coluna para cada subdivisão do atributo composto **ENDEREÇO**. Vejamos:

## TABELA JOGADOR

| **CÓDIGO** | **NOME**       | **LOGRADOURO**                | **NÚMERO** | **BAIRRO**       | **CIDADE**     | **UF** |
| ---------- | -------------- | ----------------------------- | ---------- | ---------------- | -------------- | ------ |
| 001        | Kobe Bryant    | Rua Conceição de Monte Alegre | 198        | Cidade Monções   | São Paulo      | SP     |
| 002        | Michael Jordan | Estrada dos Bandeirantes      | 6900       | Jacarepaguá      | Rio de Janeiro | RJ     |
| 003        | LeBron James   | Avenida Portugal              | 744        | Setor Marista    | Goiânia        | GO     |
| 004        | Allen Iverson  | Rua Mexilhão                  | 33         | Praia do Francês | Maceió         | AL     |


Para normalizar o banco, podemos converter os atributos não atômicos em outras tabelas ou em outros campos na mesma tabela evitando repetições e campos com múltiplos valores. Ao reorganizar todos os campos não-atômicos das tabelas de um banco de dados, podemos aﬁrmar que ela atinge uma forma estrutural denominada de Primeira Forma Normal (1FN)1.

## Segunda Forma Normal (2FN)

Uma tabela está na 2FN se, e somente se, estiver na 1fn e cada atributo não-chave for dependente da chave primária(ou candidata) inteira, isto é, não devem existir dependências parciais.

Dependência funcional total: ocorre quando todo atributo não-chave de uma relação depende da chave primária como um todo e, não, somente de parte dela;

Dependência funcional parcial: ocorre quando algum atributo não chave de uma relação depende apenas de parte da chave primária e, não, dela como um todo e somente ocorre quando temos uma chave primária composta.

Via de regra, a **chave primária** é responsável por identificar uma tupla em uma relação, logo a chave primária é a **coluna (ou conjunto de colunas) determinante** e as outras colunas **são dependentes**.

Será que isso ocorre na tabela abaixo?
Por meio do **código de um pedido**, é possível identificar a **data** e a **hora**, mas **não é possível identificar as outras colunas** — todas elas podem ser diferentes para um mesmo código de pedido.

## Tabela Venda (Markdown)

| CÓDIGO PEDIDO | CÓDIGO ITEM | NOME_ITEM | DATA       | HORA  | OBSERVAÇÃO                            |
| ------------- | ----------- | --------- | ---------- | ----- | ------------------------------------- |
| 111           | 555         | X-Tudo    | 12/11/2020 | 15:59 | Gostaria do meu sanduíche sem picles. |
| 111           | 666         | X-Salada  | 12/11/2020 | 15:59 | Enviem sem maionese, por favor.       |
| 333           | 777         | X-Bacon   | 07/09/2020 | 19:20 | Sou alérgico à cebola.                |
| 444           | 555         | X-Tudo    | 01/08/2020 | 12:10 | Talheres de plástico, por gentileza!  |


## Terceira Forma Normal (3FN)

Uma tabela está na 3FN se, e somente se, estiver na 2fn e cada atributo não-chave **NÃO POSSUIR DEPENDÊNCIA TRANSITIVA PARA CADA CHAVE CANDIDATA.**

Dependência Funcional **Transitiva**. Essa dependência ocorre quando uma coluna, além de depender da chave primária da tabela, depende de outra coluna (ou conjunto de colunas) dessa tabela.

> Um atributo não-chave **não pode depender de outro atributo não-chave**.

No exemplo abaixo, a coluna **NOME_MARCA** depende de **CÓDIGO_MARCA**, que por sua vez depende da chave **CÓDIGO_ITEM**.  
Isso configura **dependência transitiva**, violando a 3FN.

---

# ❌ Tabela (violando a 3FN)

A tabela mistura informações de itens e de marcas:

| CÓDIGO_ITEM | NOME                   | CÓDIGO_MARCA | NOME_MARCA | PREÇO  | QTD  |
|-------------|-------------------------|--------------|------------|--------|------|
| 111         | Camisa do Flamengo     | 856          | Adidas     | 299,99 | 1000 |
| 222         | Camisa do Corinthians  | 514          | Nike       | 249,99 | 750  |
| 333         | Camisa do São Paulo    | 856          | Adidas     | 199,99 | 500  |
| 444         | Camisa do Palmeiras    | 254          | Puma       | 149,99 | 250  |

### 🔎 Problema
- **NOME_MARCA** depende de **CÓDIGO_MARCA**, e não diretamente da chave **CÓDIGO_ITEM** → **Dependência transitiva**.

---

### ✔️ Tabelas (em conformidade com a 3FN)

A solução é **remover o atributo derivado (NOME_MARCA)** e colocá-lo em outra tabela que representa corretamente a entidade “Marca”.

### 1️⃣ Tabela ESTOQUE (após normalização)

| CÓDIGO_ITEM | NOME                  | CÓDIGO_MARCA | PREÇO  | QTD  |
|-------------|------------------------|--------------|--------|------|
| 111         | Camisa do Flamengo    | 856          | 299,99 | 1000 |
| 222         | Camisa do Corinthians | 514          | 249,99 | 750  |
| 333         | Camisa do São Paulo   | 856          | 199,99 | 500  |
| 444         | Camisa do Palmeiras   | 254          | 149,99 | 250  |

### 2️⃣ Tabela MARCA (com dados dependentes apenas da chave marca)

| CÓDIGO_MARCA | NOME_MARCA |
|--------------|------------|
| 254          | Puma       |
| 514          | Nike       |
| 856          | Adidas     |

---

### ✅ Por que agora está na 3FN?

- Nenhum atributo da tabela ESTOQUE depende de outro atributo não-chave.
- O nome da marca foi movido para sua própria tabela.
- A relação agora é feita por meio de **chave estrangeira (CÓDIGO_MARCA)**.

<br>

## Forma Normal de Boyce-Codd (FNBC)

Uma tabela está na FNBC se, e somente se, estiver na 3fn e, para cada dependência x -> y NÃO TRIVIAL, X deverá ser uma superchave, isto é, todo determinante é uma chave candidata Ela é basicamente uma forma normal um pouco mais forte que a 3FN. É importante saber que toda tabela que esteja na FNBC está na 3FN, mas nem toda tabela na 3FN está na FNBC.

As demais formas normais são raríssimas tanto na prática do proﬁssional de tecnologia da informação quanto nas questões de prova. Logo, apresentaremos só as deﬁnições:
<br>

## Quarta Forma Normal (4FN)

Uma tabela está na 4FN se, e somente se, estiver na 3fn e não existirem **dependências multivaloradas**
<br>

## Quinta Forma Normal (5FN)

Uma tabela está na 5FN se, e somente se, estiver na 4fn e não existirem **dependências de junções**

| **TIPO DE DEPENDÊNCIA** | **DESCRIÇÃO** |
|-------------------------|---------------|
| **FUNCIONAL** | Dada uma tabela qualquer, há uma dependência funcional sempre que um atributo (ou conjunto de atributos) depende funcionalmente de outro atributo (ou conjunto de atributos). Se A determina B, temos que – para cada valor de A – existe apenas um valor de B, logo A determina B ou B é dependente de A. |
| **FUNCIONAL TOTAL** | Dada uma tabela qualquer, há uma dependência funcional total quando um atributo não-chave (ou conjunto de atributos) depende da totalidade da chave primária e não apenas de parte dela (caso seja composta). |
| **FUNCIONAL PARCIAL** | Dada uma tabela qualquer, há uma dependência funcional parcial quando um atributo não-chave (ou conjunto de atributos) depende apenas de parte da chave primária composta e não de sua totalidade. |
| **FUNCIONAL TRANSITIVA** | Dada uma tabela qualquer, há uma dependência funcional transitiva quando um atributo não-chave depende de outro atributo não-chave. Em outras palavras, um atributo não-chave determina outro atributo não-chave. |
