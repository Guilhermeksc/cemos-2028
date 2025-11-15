# Modelo Relacional

## Principais Modelos de Dados

Modelo plano - matrizes bidimensionais. matrizes simples, bidimensionais, compostas por elmentos de dados - é a base de polanilhas eletrônicas.

Modelo em rede - permite que várias tabelas sejam utilizadas simultanneamente por meio de referencias ou apontadores

Modelo hierárquivo - variação do modelo em rede que limita as relações à uma estutura semelhante à estrutura de uma árvore

Modelo orientado à objetos - trata os dados como objetos que possuem propriedades (atribuitos) e operações (métodos)
modelo relacional - trata os dados como uma coleção de tabelas compostas por linhas e colunas relacionadas por meio de chaves.

Modelo hierárquico-relacional - combina a simplicidade do modelo relacioal com algumas funcionalidades avançadas do modelo orientado a objetos.

Modelo Relacional

O Modelo de Dados trata da representação conceitual dos dados fisicamente armazenados e é capaz de representar dados por meio de uma linguagem matemática, 
utilizando teoria de conjuntos e lógica de predicado de primeira ordem. 

## 2.1- Tabelas 

**Relação ≠ é diferente de Relacionamento**

O modelo relacional representa os dados como **um conjunto de relações**. 
**Graficamente** os elementos são dispostos em tabelas, formadas por linhas e colunas, onde as tabelas devem representar **elementos do mundo real**, as colunas indicam **qualidades desses elementos (atributo)** e as linhas **agrupam valores** que representam um **fato do mundo real**. 

**O relacionamento é a relação entre as tabelas.**


Na terminologia formal, a tabela é chamada de relação, as linhas são chamadas de tuplas, as colunas são chamadas de atributos e o tipo do dado a ser armazenado é chamado de  domínio. 

![teoria relacional](img/teoria-relacional1.png)

| Termo (Português) | Termo (Modelo Relacional) | Descrição |
|-------------------|---------------------------|-----------|
| **Tabela**        | **Relação**               | Representa os dados e os relacionamentos entre os dados |
| **Linha**         | **Tupla (ou Registro)**   | Coleção ou registro de valores de dados relacionados |
| **Coluna**        | **Atributo**              | Dados que ajudam a interpretar o significado dos valores das linhas |
| **Tipo de Dado**  | **Domínio**               | Descreve os tipos de valores que podem ser exibidos em uma coluna |

Tipo de dado representa o domíno. Ex: é um dado do tipo data, do tipo charset, do tipo int, etc.
Obs: Dentro da Tupla os valores não pode ser divididos, são atômicos.

Na prática, alguns conceitos **são deduzidos sem muita rigidez**, mas a prova de  concurso, devemos ressaltar alguns detalhes: 

**a) A ordenação das tuplas na relação:** Uma relação é definida como um conjunto de tuplas, ou seja, um conjunto de elementos **não duplicados** que <u>não possuem ordem entre si, podendo ser ordenadas de acordo com a necessidade do usuário.</u> 

**b) Ordem dos valores nas tuplas e uma definição alternativa de uma relação:** a ordenação dos atributos/colunas **pode** ser <u>relevante dependendo do nível de abstração</u>. Existe uma divergência na literatura quanto a ordenação dos componentes em uma tupla onde os principais autores afirmam que a ordem das colunas é significativa, mesmo que afirmem que “... em um nível **mais abstrato**, a ordem dos atributos e seus valores não é tão importante, desde que a correspondência entre  atributos e valores seja mantida” (Navathe) 

**c) Valores e Null nas tuplas:** Cada valor em uma tupla é um **valor atômico**, ou seja, ele não é divisível em componentes dentro da estrutura básica do modelo relacional, não sendo permitidos atributos compostos ou multivalorados. Quando um campo não for preenchido por inexistência do valor ou por desconhecimento, assumirá o valor NULL. 

**d) Interpretação de uma relação:** O esquema de relação pode ser interpretado como uma declaração ou um tipo de afirmação (ou asserção), onde cada tupla na 
relação pode então ser interpretada como um **fato** ou **uma instância** em particular da afirmação. Algumas relações podem representar fatos sobre entidades e outras sobre relacionamentos 

## 2.2- Álgebra Relacional 

A álgebra relacional foi adotada por Codd como a base das linguagens de consulta de banco de dados, sendo uma linguagem de consulta formal, ou seja, uma 
coleção de operações de alto nível sobre relações ou conjuntos cujo resultado seja uma nova relação ou conjunto. 

As operações são: Seleção, Projeção, Produto Cartesiano, União, Diferença, Junção e Intersecção. Sendo as cinco primeiras primitivas (não podem ser obtidas a 
partir de outras) e as duas últimas derivadas. 

| Operação           | Símbolo | Exemplo                        |
| ------------------ | ------- | ------------------------------ |
| Seleção            | σ “sigma”      | σ<sub>idade > 30</sub>(Pessoa) |
| Projeção           | π “pi”      | π<sub>nome,cpf</sub>(Pessoa)   |
| Produto Cartesiano | ×       | Pessoa × Endereco              |
| União              | ∪       | A ∪ B                          |
| Diferença          | −       | A − B                          |
| Junção (Join)      | ⋈       | R ⋈<sub>R.id = S.id</sub> S    |
| Interseção         | ∩       | A ∩ B                          |


**a) Seleção:** Trata-se de uma operação unária que filtra as linhas de uma tabela que satisfazem um conjunto de condições ou predicados. 
Unária significa que é realizada em apenas um elemento da tabela.

ℹ️Exemploℹ️
Tabela Aluno
| COD | Nome     | CPF        | Sexo |
|-----|----------|------------|------|
| 01  | Maria    | 1111111-1  | **F**    |
| 02  | João     | 2222222-2  | M    |
| 03  | Juliane  | 33333-3    | **F**    |
| 04  | Ana      | 44444-4    | ND   |
| 05  | Antônio  | 55555-5    | M    |

Seleção => σ<sub>sexo = F</sub>(Aluno)

**b) Projeção:**  Trata-se de uma operação unária que seleciona as colunas especificadas de todas as linhas da relação, **excluindo as linhas duplicadas do resultado (chamadas de duplicatas)**. Em contraste com a operação de Seleção – que seleciona as linhas que satisfazem uma condição –, a operação de Projeção projeta as colunas especificadas na lista de atributos. 

**c) Produto Cartesiano:** Também chamado de Produto Cruzado ou Junção Cruzada, trata-se de uma operação binária que produz um resultado que **combina as 
linhas de uma tabela com as linhas de outra tabela/**. Notem que o resultado contempla todas as combinações das duas tabelas. Além disso, a quantidade de colunas é igual à soma das colunas das tabelas e a quantidade de linhas é igual ao produto da quantidade de linhas de cada tabela. 

ℹ️Exemploℹ️
Aluno
| Cod | Nome |
|-----|-------|
| 01  | João  |
| 02  | Ana   |


Turma
| CodT | NomeT |
|------|--------|
| 01   | PF     |
| 02   | RF     |

**Aluno × Turma (Produto Cartesiano)**
| Cod | Nome | CodT | NomeT |
|-----|-------|-------|--------|
| 01  | João  | 01    | PF     |
| 01  | João  | 02    | RF     |
| 02  | Ana   | 01    | PF     |
| 02  | Ana   | 02    | RF     |


**d) Junção:** É uma operação binária que produz um resultado que combina as linhas de uma tabela com as linhas de outra tabela, onde as colunas duplicadas são removidas 
Aqui vai um **exemplo claro, curto e direto** de **junção (⋈)** usando duas tabelas relacionadas.


# **Tabelas**

## **Aluno**

```markdown
| Cod | Nome  |
|-----|--------|
| 01  | João   |
| 02  | Ana    |
| 03  | Carla  |
```

## **Turma**

```markdown
| CodT | NomeT |
|------|--------|
| 01   | PF     |
| 02   | RF     |
| 03   | MF     |
```

## **Matrícula** (Aluno ↔ Turma)

```markdown
| Cod | CodT |
|-----|-------|
| 01  | 01    |
| 01  | 02    |
| 02  | 03    |
```

---

# ✔️ **Junção Natural (⋈)**

### Junção entre **Aluno** e **Matrícula**, pela coluna **Cod**

**Expressão:**

[
Aluno \ \bowtie_{\text{Aluno.Cod = Matricula.Cod}} \ Matricula
]

**Resultado:**

```markdown
| Cod | Nome | CodT |
|-----|-------|-------|
| 01  | João  | 01    |
| 01  | João  | 02    |
| 02  | Ana   | 03    |
```

---

# ✔️ **Junção completa: Aluno ⋈ Matrícula ⋈ Turma**

**Expressão:**

[
Aluno \ \bowtie_{\text{Cod}} \ Matrícula \ \bowtie_{\text{CodT}} \ Turma
]

**Resultado:**

```markdown
| Cod | Nome | CodT | NomeT |
|-----|--------|-------|--------|
| 01  | João   | 01    | PF     |
| 01  | João   | 02    | RF     |
| 02  | Ana    | 03    | MF     |
```


**e) União:** É uma operação binária que produz como resultado uma nova tabela que contém todas as linhas da primeira tabela seguidas de todas as linhas da segunda tabela. A tabela resultante possui a mesma quantidade de colunas que as tabelas originais, e tem um número de linhas que é – no máximo – igual à soma das linhas de ambas as tabelas. 

Essa operação só pode ser realizada se as tabelas possuírem a mesma estrutura: mesma quantidade de colunas e as colunas devem possuir o mesmo domínio. 

Aqui vai um **exemplo simples e direto** de **União (∪)** na Álgebra Relacional.


# ✔️ Exemplo de União (∪)

A **união** combina tuplas de duas relações **compatíveis** (mesmo número de atributos e mesmo domínio).

---

## **Tabela A – Alunos da Manhã**

```markdown
| Cod | Nome  |
|-----|--------|
| 01  | João   |
| 02  | Ana    |
| 03  | Carlos |
```

## **Tabela B – Alunos da Tarde**

```markdown
| Cod | Nome  |
|-----|--------|
| 03  | Carlos |
| 04  | Maria  |
| 05  | Pedro  |
```

---

# ✔️ Operação de União

**Expressão:**

[
A \ \cup \ B
]

---

# ✔️ Resultado da União

```markdown
| Cod | Nome  |
|-----|--------|
| 01  | João   |
| 02  | Ana    |
| 03  | Carlos |
| 04  | Maria  |
| 05  | Pedro  |
```

**Observação:**

* O elemento repetido (`03, Carlos`) aparece **somente uma vez**, pois a união elimina duplicatas.



**f) Intersecção:** É uma operação binária que produz como resultado uma tabela que contém, sem repetições, todos os elementos que são comuns às duas tabelas 
fornecidas como operandos. É importante ressaltar que a mesma restrição que valia para a operação de União também vale para a operação de Intersecção. 

**g) Diferença:** É uma operação binária que produz como resultado uma tabela que contém todas as linhas que existem na primeira tabela e não existem na segunda 
tabela. 



Vale salientar que é uma é dita comutativa quando a ordem da operação é indiferente. Das operações vistas, apenas a projeção e diferença não são comutativas. 
Informática 


01- (IFB – 2017) Segundo Elmasri (2011), na terminologia formal do modelo relacional, uma linha, um cabeçalho de coluna e a tabela, são chamados, respectivamente, de: 

a) Registro, atributo, domínio 
b) Tupla, atributo e relação 
c) Registro, atributo e relação 
d) Relação, domínio e registro 
e) Relação, tupla e registro 

02- (TCE/PE – 2017) Em uma relação, os nomes das colunas são únicos, as linhas são distintas entre si, e a ordem da disposição das linhas e colunas é irrelevante para o banco de dados. 

03- (UFC – 2018) De acordo com a álgebra relacional, marque a opção que contenha apenas operações fundamentais. 
a) Divisão, seleção, diferença. 
b) Agregação, projeção, união. 
c) Junção natural, seleção, projeção. 
d) Seleção, projeção, produto cartesiano. 
e) Interseção, produto cartesiano, junção natural. 


04. (CESPE / PC-PB - 2022) Na álgebra relacional, a operação que permite combinar 
informações de duas relações quaisquer é: 
a) o produto cartesiano. 
b) a seleção. 
c) a projeção. 
d) a renomeação. 
e) a união. 
Informática 
Profa: Emannuelle Gouveia 
@Emannuelle Gouveia 05490709405 - Lorenna Siza

---

## Página 39

2.3) View: Uma visão é um objeto que não armazena dados, ela é um conjunto de 
dados agrupados e criados como resultado de uma consulta a uma estrutura física 
(tabelas). Elas não fazem parte do esquema físico, é uma espécie de “tabela virtual” 
computada ou coletada dinamicamente dos dados no banco de dados todas as vezes 
em que o acesso àquela visão for solicitado. 
            Sendo assim, alterações feitas em dados das tabelas, serão automaticamente 
refletidos nas visões 
Informática 
Profa: Emannuelle Gouveia 
@Emannuelle Gouveia 2- MODELO RELACIONAL 05490709405 - Lorenna Siza

---

## Página 40

Suas principais vantagens são: 
•Aumentar a segurança pois propicia uma visão limitada e controlada dos dados 
•Aumenta a performance porque utiliza uma consulta previamente otimizada e evita 
a busca dessa junção de dados dinamicamente no BD. 
•Pode restringir o acesso aos usuários 
•Simplifica a interação entre usuário final e o  banco de dados. 
Informática 
Profa: Emannuelle Gouveia 
@Emannuelle Gouveia 2- MODELO RELACIONAL 05490709405 - Lorenna Siza

---

## Página 41

OBS: temos ainda a View Materializada que é armazenada de forma não volátil. Tem 
um melhor desempenho visto que o seu resultado já fica armazenado no banco de 
dados. 
Informática 
Profa: Emannuelle Gouveia 
@Emannuelle Gouveia 2- MODELO RELACIONAL 05490709405 - Lorenna Siza

---

## Página 42

2.4) Indices: S ão referências associadas as chaves e são utilizados para otimizar 
buscas, pois permite a localização mais rápida de um registro em uma tabela, para 
isso, cria ponteiros para os dados armazenados em colunas específicas. Seria a mesma 
idéia de usar o índice de um livro para facilitar o acesso a uma parte de um livro. 
Informática 
Profa: Emannuelle Gouveia 
@Emannuelle Gouveia 2- MODELO RELACIONAL 05490709405 - Lorenna Siza

---

## Página 43

2.5) Chave : as chaves são muito importantes nos bancos relacionais. Vamos 
agora conhecer os principais tipos: 
a)Superchave: é  um conjunto de uma ou mais colunas que, tomadas coletivamente, 
permitem identificar de maneira unívoca uma linha de uma tabela. Toda tabela 
possui pelo menos uma superchave padrão, que é o conjunto de todas as colunas 
de uma tabela. 
Informática 
Profa: Emannuelle Gouveia 
@Emannuelle Gouveia 2- MODELO RELACIONAL 05490709405 - Lorenna Siza

---

## Página 44

b) Chave primária: conjunto de atributos mínimo que identifica de forma unívoca 
qualquer linha de uma tabela. Também chamada de superchave mínima. 
c) Chave Composta: é uma superchave mínima que possui mais de um atributo. 
d) Chave candidata: campo que também ser escolhido como chave primária 
e) Chave Secundária: a chave candidata que não foi escolhida como primária 
Informática 
Profa: Emannuelle Gouveia 
@Emannuelle Gouveia 2- MODELO RELACIONAL 05490709405 - Lorenna Siza

---

## Página 45

f) Chave estrangeira: chave de uma tabela que se relacionam com a chave de 
outra tabela ou até mesmo da própria tabela (auto relacionamento). Deve satisfazer 
duas regras: as colunas que a compõem devem ter o mesmo domínio que as colunas da 
chave candidata da tabela referenciada; o valor da chave estrangeira em uma relação 
deve ocorrer também na tabela referenciada ou ser nula. 
Informática 
Profa: Emannuelle Gouveia 
@Emannuelle Gouveia 2- MODELO RELACIONAL 05490709405 - Lorenna Siza

---

## Página 46

Informática 
Profa: Emannuelle Gouveia 
@Emannuelle Gouveia 2- MODELO RELACIONAL 
05490709405 - Lorenna Siza

---

## Página 47

Informática 
Profa: Emannuelle Gouveia 
@Emannuelle Gouveia 2- MODELO RELACIONAL 
05490709405 - Lorenna Siza

---

## Página 48

OBS:  AS restrições de chave e as restrições de integridade de entidade são 
especificadas sobre relações individuais, já a  restrição de integridade referencial é é 
especificada entre duas tabelas e utilizada para manter a consistência entre linhas nas 
duas tabelas. 
Informática 
Profa: Emannuelle Gouveia 
@Emannuelle Gouveia 2- MODELO RELACIONAL 05490709405 - Lorenna Siza

---

## Página 49

05. (CESPE / FUNPRESP-EXE - 2022) Seguindo uma visão relacional, além de seus 
próprios atributos, a entidade ENDERECO deve possuir como chave estrangeira a 
chave primária CODIGO da tabela PESSOA. 
Informática 
Profa: Emannuelle Gouveia 
@Emannuelle Gouveia 05490709405 - Lorenna Siza

---

## Página 50

06. (FGV / SEFAZ-BA – 2022) Com relação aos conceitos de banco de dados 
relacionais, analise as afirmativas a seguir. 
I. Instância do banco se refere à supressão de detalhes da organização e do 
armazenamento de dados, descartando para um melhor conhecimento desses dados os 
recursos essenciais. 
II. Modelo de dados se refere a uma coleção de conceitos que podem ser utilizados 
para descrever a estrutura de um banco de dados, oferecendo os meios necessários 
para alcançar essa abstração. 
 
Informática 
Profa: Emannuelle Gouveia 
@Emannuelle Gouveia 05490709405 - Lorenna Siza

---

## Página 51

III. Abstração de dados refere aos conjuntos de dados e metadados e usuários 
presentes no servidor de dados em um determinado instante. Está correto o que se 
afirma em: 
a) I, somente. 
b) II, somente. 
c) III, somente. 
d) I e II, somente. 
e) I e III, somente. 
Informática 
Profa: Emannuelle Gouveia 
@Emannuelle Gouveia 05490709405 - Lorenna Siza

---

## Página 52

07. (CESPE / FUNPRESP-EXE - 2022) View é uma visualização customizada de uma 
ou mais tabelas, com seus dados armazenados fisicamente e montada a partir da 
execução de uma consulta. 
Informática 
Profa: Emannuelle Gouveia 
@Emannuelle Gouveia 05490709405 - Lorenna Siza

---

## Página 53

08. (CESPE / ISS-Aracaju – 2021) Em um banco de dados relacional, a condição que 
garante que valores não possam se repetir dentro da mesma coluna denomina-se: 
a) Foregin key. 
b) Cláusula unique. 
c) Domain restriction. 
d) Índice cluster. 
e) Reference key. 
Informática 
Profa: Emannuelle Gouveia 
@Emannuelle Gouveia 05490709405 - Lorenna Siza

---

## Página 54

09. .(CESPE / APEX-BRASIL – 2021) Não pode ter valor nulo em uma tabela do 
banco de dados um campo: 
a) que seja chave estrangeira. 
b) que tenha sido utilizado em um índice. 
c) que seja chave primária. 
d) que represente uma data de nascimento. 
Informática 
Profa: Emannuelle Gouveia 
@Emannuelle Gouveia 05490709405 - Lorenna Siza

---

## Página 55

10. (CESPE / TCE-RJ – 2021) Superchaves e chaves primárias são utilizadas para 
diferenciar de maneira única as instâncias de uma entidade, assim como para facilitar o 
processamento 
Informática 
Profa: Emannuelle Gouveia 
@Emannuelle Gouveia 05490709405 - Lorenna Siza

---

## Página 56

11.CESPE / TCE-RJ – 2021) No modelo relacional de bancos de dados, os elementos 
ficam armazenados em tabelas bidimensionais simples, contendo linhas (registros) e 
colunas (campos), e os elementos de um arquivo do banco podem relacionar-se com 
diversos elementos de outros arquivos. 
Informática 
Profa: Emannuelle Gouveia 
@Emannuelle Gouveia 05490709405 - Lorenna Siza

---

## Página 57

12.CESPE / Polícia Federal – 2021) Se uma tabela de banco de dados tiver 205 
atributos, então isso significa que ela tem 205 registros. 
Informática 
Profa: Emannuelle Gouveia 
@Emannuelle Gouveia 05490709405 - Lorenna Siza

---

## Página 58

OBRIGADA 
Prof. Emannuelle Gouveia 
@emannuellegouveia 05490709405 - Lorenna Siza

---

## Página 59

05490709405 - Lorenna Siza

---