3- REGRAS DE CODD

Edgar F. Codd foi matemático britânico que formulou as bases para a ideia de banco de dados, com a criação do modelo de banco de dados relacional

Temos 13 Regras de Codd numeradas de 0 a 12. Elas deﬁnem o que é necessário para que um Banco de Dados seja considerado relacional.


## Regras de Codd

As 12 regras de Codd, que, na verdade, são treze regras, são um conjunto de regras que definem o que é necessário para que determinado modelo de banco de dados seja considerado como um modelo relacional. Elas surgiram através de um movimento criado por Edgar Frank Codd, considerado o pai do modelo relacional, para que esse modelo tivesse uma certa padronização.

Galera, aqui não tem para onde correr - as regras são bem literais, e você tem que entender todas elas. Mas quero que você vá além disso, leia cada uma das regras de forma a realmente entender o propósito e o funcionamento do modelo relacional, não simplesmente para decorar o que é a regra - até porque não temos cobranças literais do tipo "a regra 04 fala x y z”. 

*b* **REGRA 00 - REGRA DA FUNDAÇÃO**
 
Para que um sistema que seja considerado como um **SGBD Relacional**, ele deverá gerenciar bancos de dados *v* **exclusivamente** através de suas capacidades relacionais (tabelas, linhas, colunas, restrições, etc).

Não só o **armazenamento**, mas também o **controle** deve ser feito com os fundamentos do modelo relacional (controle de permissão, catálogo de metadados, controle de concorrência)
 
*vbg* **O SGBD para ser considerado relacional deve ter tanto o armazenamento quanto o controle com fundamentos do modelo relacional.**
<br>

*b* **REGRA 01 - REGRA DA INFORMAÇÃO**

Todas as **informações** de um banco de dados relacional devem ser representadas **logicamente** como dados dentro de **colunas** pertencentes a **registros** de uma tabela. 
 
<br>

*b* **REGRA 02 - REGRA DO ACESSO GARANTIDO**  
 
Os dados devem ser **acessíveis**. Deve-se garantir que **todos** os **valores** de uma tabela possam ser acessados por meio de uma combinação de nome de tabela, valor de chave primária e nome de coluna.

*vbg* **Todo dado armazenado deve poder ser recuperado posteriormente. A definição de quem pode acessá-lo pertence a outro conjunto de regras!**
<br>

*b* **REGRA 03 - REGRA DO TRATAMENTO SISTEMÁTICO DE VALORES NULOS**  
 
O SGBD deve permitir que cada campo possa permanecer nulo (ou vazio). Especificamente, ele deve suportar uma representação de "falta de informação e informações inaplicáveis" que é **sistemática**, diferente de todos os valores regulares (por exemplo, "diferente de zero ou qualquer outro número", no caso de valores numéricos), e **independente de tipo de dados (numérico ou string)**. É também implícito que tais representações devem ser manipuladas pelo SGBD de maneira sistemática.

Numérico pode ser => Null
String pode ser => Null
<br>

*b* **REGRA 04 - REGRA DO SISTEMA DE CATÁLOGO DINÂMICO ONLINE**  
 
A descrição do banco de dados está representada, **no nível lógico**, da mesma maneira que os dados comuns, de forma que **os usuários autorizados** possam aplicar a eles <u>a mesma linguagem relacional de consulta utilizada para consultar dados normais.</u>
<br>

*b* **REGRA 05 - REGRA DA LINGUAGEM DE SUBDADOS ABRANGENTE**  
 
O Banco de Dados Relacional pode oferecer suporte a múltiplas linguagens e meios de acesso. No entanto, deve existir **pelo menos** uma <u>linguagem declarativa bem deﬁnida com suporte às seguintes operações</u>:
deﬁnição de dados;
deﬁnição de views;
manipulação de dados;
restrições de integridade;
autorização;
controle de transação.

*vbd* **Exemplo: Linguagem Declarativa SQL! Não fala em linguagem de programação.**
<br> 

*b* **REGRA 06 - REGRA DA ATUALIZAÇÃO DE VISÕES**  
 
Toda view teoricamente atualizável deve ser também atualizável na prática por meio do sistema.
<br> 

*b* **REGRA 07 - REGRA DE OPERAÇÕES RELACIONAIS**  
 
A capacidade de gerenciar uma relação base ou uma relação derivada com um só operando se aplica não somente à **extração de dados**, mas também à **inserção**, **atualização** e **remoção dos dados**. 
<br> 

*b* **REGRA 08 - REGRA DA INDEPENDÊNCIA DOS DADOS FÍSICOS**  
 
Aplicações e recursos permanecem **logicamente inalterados** quando ocorrem mudanças no <u>método de acesso ou na forma de armazenamento físico.</u>
<br> 

*b* **REGRA 09 - REGRA DA INDEPENDÊNCIA LÓGICA DOS DADOS**  
 
Aplicações e recursos ad hoc (formas mais ﬂexíveis de pesquisar informações sobre dados) não são afetados logicamente quando de alterações de estruturas de tabela que preservem os valores originais da tabela (alteração da ordem ou inserção de colunas). 
<br> 

*b* **REGRA 10 - REGRA DA INDEPENDÊNCIA DE INTEGRIDADE**  
 
As aplicações não são afetadas quando ocorrem mudanças nas regras de restrições de integridade. Deve ser possível que todas as regras de integridade sejam deﬁnidas na linguagem relacional e armazenadas no catálogo de sistema e, não, no nível de aplicação. 
<br>

*b* **REGRA 11 - REGRA DA INDEPENDÊNCIA DE DISTRIBUIÇÃO**
 
Aplicações não são logicamente afetadas quando ocorrem mudanças geográﬁcas de dados, ou seja, os usuários ﬁnais não devem perceber o fato de o banco de dados ser distribuído ou local. 
<br> 

*b* **REGRA 12 - REGRA DA NÃO SUBVERSÃO**
 
Se um sistema possui uma linguagem de baixo nível, essa linguagem não pode ser usada para subverter as regras de integridades e as restrições deﬁnidas no nível mais alto. 
 
Aqui cabe um adendo: As linguagens de baixo nível são aquelas próximas à linguagem de máquina e fornecem pouco ou nenhum abstração sobre o hardware do computador. Elas são difíceis de ler e escrever para humanos, mas são eficientes para o computador execut ar. Já as linguagens de alto nível são mais distantes da linguagem de máquina e mais próximas da linguagem humana. 

Elas fornecem abstrações que facilitam a programação, permitindo que os programadores expressem ideias em um nível mais alto, sem se preocupa r com detalhes específicos do hardware.  

![regras_codd](img/relacional_3.png)


| REGRAS DE CODD | DESCRIÇÃO                                                   |
|----------------|-------------------------------------------------------------|
| REGRA 00       | Regra Fundamental/Base                                      |
| REGRA 01       | Regra da Informação                                         |
| REGRA 02       | Regra de Garantia de Acesso                                 |
| REGRA 03       | Regra do Tratamento Sistemático de Valores Nulos            |
| REGRA 04       | Regra do Catálogo Online baseado no Modelo Relacional       |
| REGRA 05       | Regra da Sublinguagem Ampla/Compreensiva de Dados           |
| REGRA 06       | Regra da Atualização por meio de Views                      |
| REGRA 07       | Regra da Inserção, Atualização e Exclusão de Alto Nível     |
| REGRA 08       | Regra da Independência Física de Dados                      |
| REGRA 09       | Regra da Independência Lógica de Dados                      |
| REGRA 10       | Regra da Independência de Integridade                       |
| REGRA 11       | Regra da Independência de Distribuição                      |
| REGRA 12       | Regra da Não-Transposição/Subversão                         |


16. (CESPE / SEFAZ - RS – 2019) Uma das regras de Codd para o modelo relacional consiste:
a) na independência de distribuição.
b) na presença de uma linguagem **de programação** no SGBD que promova interface com o banco de dados, com a segurança e com a atualização dos dados.
c) na subversão das regras de integridade ou restrições quando utilizada uma linguagem de baixo nível.
d) no não tratamento das atualizações de visões de dados.
e) na dependência de dados físicos (mudança na memória e no método de acesso).

Letra A

17. (FCC / TRF4 – 2019) Dentre as regras de Codd que caracterizam Bancos de Dados Relacionais, a regra da Independência de Integridade estipula que as várias formas de integridade relacional de banco de dados:
a) precisam ser deﬁnidas na linguagem relacional e armazenadas dentro do catálogo do sistema ou dicionário de dados, e ser totalmente independentes da lógica dos aplicativos.
b) podem ser representadas em tabelas relacionais especíﬁcas que se relacionam com as tabelas de cada aplicativo. Quando um aplicativo mudar, a regra de independência muda automaticamente.
c) precisam ser deﬁnidas na linguagem de cada aplicativo e armazenadas como tabelas relacionais dentro do banco de cada aplicativo, pois somente desta forma, ao mudar o aplicativo, as regras de integridade mudarão também, automaticamente.
d) podem ser deﬁnidas em linguagem natural ou em Shell script e armazenadas no dicionário de dados ou dentro do catálogo do sistema; contudo, não há como garantir que elas sejam totalmente independentes da lógica dos aplicativos na totalidade das situações.
e) devem ser escritas em linguagem hierárquica ou de rede pois, desta forma, tanto a hierarquia das tabelas quanto os links entre elas, como ocorre nos bancos em rede, conduzirão às mudanças automáticas das integridades ao se mudar algum aplicativo.

Letra A

18.(FGV / IBGE - 2017) Na década de 80, Edgar Frank Codd deﬁniu um conjunto de regras para deﬁnir o que são bancos de dados relacionais. A opção que *v* **NÃO** faz parte dessas regras, é:
a) qualquer visualização que teoricamente possa ser atualizada deve ser realizada através do próprio sistema;
b) aplicativos e recursos ad hoc não devem ser afetados logicamente quando os métodos de acesso ou as estruturas de armazenamento físico forem alterados;
c) restrições de integridade necessitam ser especiﬁcadas dentro dos programas de aplicação, de modo que mudanças nessas restrições sejam
observadas por essas aplicações;
d) todas as informações no banco devem ser representadas logicamente como valores de coluna em linhas dentro das tabelas;
e) os usuários ﬁnais e aplicativos não devem conhecer nem serem afetados pela localização dos dados.

Letra C - Devem ser especificados independentes dos programas de aplicação.

19.(FCC / SEFAZ - SP - 2009) Considere a seguinte regra de Codd, aplicada aos bancos de dados relacionais: A descrição do banco de dados é representada no nível lógico da mesma forma que os dados ordinários, permitindo que usuários autorizados utilizem a mesma linguagem relacional aplicada aos dados regulares. O sentido dessa regra diz respeito à:
a) formação do catálogo.
b) manipulação, por meio de visões.
c) independência física.
d) independência lógica.
e) independência de distribuição.

Letra A

20.(FCC/ TRF – 4 REGIÃO(RS) - 2011) No contexto de banco de dados relacional, das 12 regras deﬁnidas por Codd, aquela que determina que os programas de aplicação e as operações interativas devem permanecer logicamente inalteradas, quaisquer que sejam as trocas efetuadas nas representações de armazenamento e métodos de acesso, chama-se independência:
a) lógica dos dados.
b) física dos dados.
c) de acesso.
d) de integridade.
e) de distribuição.

Letra B - representações de **armazenamento(físico)** e métodos de acesso

21.(SELECON / EMGEPRON - 2012) Considere:
I. Regra 1 - Todas as informações são representadas de forma explícita no nível lógico e exatamente em apenas uma forma, por valores em tabelas.
II. Regra 2 - Cada um e qualquer valor atômico (datum) possui a garantia de ser logicamente acessado pela combinação do nome da tabela, do valor da chave primária e do nome da coluna.
III. Regra 3 - Valores nulos não devem ser utilizados de forma sistemática, independente do tipo de dado ainda que para representar informações inexistentes e informações inaplicáveis.
Das regras de Codd para bancos de dados relacionais, está correto o que consta em:

a) I, apenas.
b) II, apenas.
c) I e II, apenas.
d) II e III, apenas.
e) I, II e III.

Letra C - *vbg* **Valores Null devem ser sistematicamente tratados também**, para representar os valores inexistentes ou que não se aplicam naquela circunstância.

22.(CESPE / ME – 2020) Chaves estrangeiras não podem ser nulas e cada registro na tabela deve possuir uma, e somente uma, chave estrangeira. 

**Falso essa é a definição de Chave Primária (Primary Key).**
<br>

23.(CESPE / ME – 2020) Em um banco de dados relacional, a chave candidata a primária é formada por um ou mais atributos que identiﬁcam uma única tupla.

Verdadeira 
<br>

24.(CESPE / ME – 2020) A restrição de integridade referencial exige que os valores que aparecem nos atributos especiﬁcados de qualquer tupla na relação referenciadora também apareçam nos atributos de pelo menos uma tupla na relação referenciada.

Verdadeira
<br>

25.(CESPE / ME – 2020) Um banco de dados relacional organiza os dados em tabelas e os vincula, com base em campos-chave, e essas relações permitem recuperar e combinar dados de uma ou mais tabelas com uma única consulta.

Verdadeira
<br>

26.(CESPE / Polícia Federal – 2018) Situação hipotética: Ao analisar um computador, Marcos encontrou inúmeros emails, vídeos e textos advindos, em sua maioria, de comentários em redes sociais. Descobriu também que havia relação entre vários vídeos e textos encontrados em um diretório especíﬁco. Assertiva: Nessa situação, tendo como referência somente essas informações, Marcos poderá inferir que se trata de um grande banco de dados relacional, visto que um diretório é equivalente a uma tabela e cada arquivo de texto é equivalente a uma tupla; além disso, como cada arquivo possui um código único, poderá deduzir que esse código é a chave primária que identiﬁca o arquivo de forma unívoca.
Falso
<br>

27.(CESPE / FUB – 2018) Álgebra relacional é um conjunto de operações sobre relações, sendo gerada dessas operações uma relação de saída.
Verdadeira
<br>

28.(CESPE / Polícia Federal – 2018)
CPF
NOME
DATA DE NASCIMENTO
NOME DO PAI
NOME DA MAE
TELEFONE
CEP
NUMERO
As informações anteriormente apresentadas correspondem aos campos de uma tabela de um banco de dados, a qual é acessada por mais de um sistema de informação e também por outras tabelas. Esses dados são utilizados para simples cadastros, desde a consulta até sua alteração, e também para prevenção à fraude, por meio de veriﬁcação dos dados da tabela e de outros dados em diferentes bases de dados ou outros meios de informação.

A referida tabela faz parte de um banco de dados relacional.
Verdadeira
<br>

29.(FGV / MPE-AL – 2018) Em um banco de dados relacional, um nome da tabela, uma chave primária e um nome de coluna garantem o acesso a:
a) um dado.
b) um SGBD.
c) uma linguagem de consulta.
d) uma partição.
e) uma visão.

Letra A

30.(FGV / AL-RO – 2018) No processo de otimização e processamento de consultas em bancos de dados relacionais, a construção da query tree (ou árvore de consulta) é feita com base nas operações da Álgebra Relacional. 

Assinale a opção que indica as operações primitivas dessa álgebra, ou seja, as operações que não podem ser expressas por combinações das demais operações:

a) Diferença, Divisão, Projeção, Produto, Seleção.
b) Diferença, Projeção, Produto, Seleção, União.
c) Divisão, Interseção, Junção, Produto, Seleção, União.
d) Junção, Projeção, Produto, Seleção, União.
e) Junção, Produto, Projeção, Seleção, União.

Letra B