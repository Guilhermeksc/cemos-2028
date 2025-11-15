# Modelo Relacional
 
## 2.3 View

Uma visão é um objeto que não armazena dados, ela é um conjunto de dados agrupados e criados como resultado de uma consulta a uma estrutura física (tabelas). Elas não fazem parte do esquema físico, é uma espécie de “tabela virtual” computada ou coletada dinamicamente dos dados no banco de dados todas as vezes em que o acesso àquela visão for solicitado. 

Sendo assim, alterações feitas em dados das tabelas, serão automaticamente refletidos nas visões.

Exemplo:
Uma view melhora a **segurança** porque permite expor apenas parte dos dados de uma tabela, ocultando colunas sensíveis sem dar acesso direto à estrutura real. Assim, usuários consultam apenas o que a visão permite.
Ela também melhora a performance quando usada como view materializada, pois armazena resultados pré-calculados de consultas complexas, evitando que o banco execute a mesma operação repetidamente.


Suas principais vantagens são: 
• Aumentar a *b* **segurança** pois propicia uma **visão limitada** e **controlada dos dados** 
• Aumenta a *b* **performance** porque utiliza uma consulta previamente otimizada e evita a busca dessa **junção** de dados dinamicamente no BD. 
• Pode *v* **restringir** o **acesso aos usuários** 
• *b* **Simplifica** a **interação entre usuário final e o  banco de dados**. 


OBS: temos ainda a View Materializada que é armazenada de forma não volátil. Tem um melhor desempenho visto que o seu resultado já fica armazenado no banco de dados. 

## 2.4 Indices

Otimizar a **velocidade**!

São referências associadas **as chaves** e são utilizados para otimizar buscas, pois permite a localização mais rápida de um registro em uma tabela, para  isso, cria ponteiros para os dados armazenados em colunas específicas. Seria a mesma idéia de usar o índice de um livro para facilitar o acesso a uma parte de um livro. 

## 2.5 Chave

s chaves são muito importantes nos bancos relacionais. Vamos agora conhecer os principais tipos: 

*v* **a) Superchave:** é  um conjunto de uma ou mais colunas que, tomadas **coletivamente**, permitem identificar de maneira **unívoca** uma linha de uma tabela. <mark>Toda tabela possui pelo menos uma superchave padrão, que é o conjunto de todas as colunas de uma tabela</mark>. 

Conceito Acadêmico: Chave de uma tabela que se comunica com a chave candidata de outra tabela;
*vbg* **Conceito CESPE: Chave de uma tabela que se comunica com a chave primária de outra tabela;**
<br>

*v* **b) Chave primária (Primary Key - PK):** conjunto de atributos **mínimo** que identifica de forma unívoca qualquer linha de uma tabela. <mark>Também chamada de superchave mínima.</mark>
<br>

*v* **c) Chave Composta:** é uma superchave **mínima** que possui **mais de um atributo**. 
<br>

*v* **d) Chave candidata:** campo que também ser escolhido como chave primária.

Exemplo "Chave candidata":
Em uma tabela de alunos, tanto o e-mail institucional quanto o número de matrícula identificam unicamente cada aluno. Portanto, ambos são chaves candidatas, e o banco pode escolher um deles como chave primária.

👉 Assim, chave candidata = atributo único que poderia ser a chave primária.
<br>

*v* **e) Chave Secundária:** a chave candidata que não foi escolhida como primária 

<br>

*v* **f) Chave estrangeira (Foreing Key - FK):** chave de **uma tabela** que se relacionam com a chave de **outra tabela** ou até mesmo da própria tabela (auto relacionamento). **Deve satisfazer duas regras**: as colunas que a compõem devem ter o mesmo domínio que as colunas da chave candidata da tabela referenciada; o valor da chave estrangeira em uma relação deve ocorrer também na tabela referenciada ou ser nula. 

<br>

| **TIPOS DE CHAVE**                | **EM INGLÊS**    | **DESCRIÇÃO**                                                                                                                                                  |
|----------------------------------|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **SUPERCHAVE**                   | Superkey          | Conjunto de **uma ou mais colunas** que, tomadas **coletivamente**, permitem **identificar de maneira unívoca** uma linha.                                      |
| **CHAVE CANDIDATA**              | Candidate Key     | Superchaves de **tamanho mínimo**, candidatas a serem possíveis **chaves primárias** de uma tabela.                                                            |
| **CHAVE PRIMÁRIA**               | Primary Key       | Chaves cujas colunas são utilizadas para identificar linhas em uma tabela – em geral, vêm sublinhadas.                                                         |
| **CHAVE SECUNDÁRIA / ALTERNATIVA** | Secondary Key   | Chaves candidatas a serem possíveis chaves primárias de uma tabela, mas que **não foram escolhidas**.                                                          |
| **CHAVE ESTRANGEIRA**            | Foreign Key       | Chaves de uma tabela que fazem **referência** à chave candidata de outra tabela, ou até mesmo da própria tabela.                                               |


<br>

## Tipos de Restrição

| **Tipo de Restrição**                          | **Descrição**                                                                                         |
|------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| **Restrição de Chave ou Unicidade**            | Restringe que uma chave **primária se repita** – uma chave primária diferencia de **forma única** os registros de uma relação. *v* **Não pode ter duas tuplas com a mesma chave primária**. Os bancos autoincrementais evitam a repetição de pk. Ex: Em uma tabela Aluno(id_aluno, nome), dois alunos não podem possuir o mesmo id_aluno. Ex: não pode existir (1, João) e (1, Maria).  |
| **Restrição de Integridade de Domínio**        | Restringe que um campo de uma relação tenha valores **diferentes daqueles definidos para o campo específico**. Ex: não pode inserir "ABC", "99/99/9999" ou "João". |
| **Restrição de Integridade de Entidade**       | Restringe que uma chave primária **tenha valores nulos (NULL)**. Ex: Em uma tabela Produto(id_produto, nome), o campo id_produto não pode ser NULL. Ex: não pode existir (NULL, “Caneta”). |
| **Restrição de Integridade Referencial**      | Restringe que a chave estrangeira de uma tabela seja **inconsistente com a chave candidata da tabela referenciada.** Ex: Em uma tabela Pedido(id_pedido, id_cliente), o id_cliente deve existir na tabela Cliente(id_cliente). Ex: não pode registrar um pedido com id_cliente = 99 se não existir cliente com esse código.|

<br>

OBS:  AS restrições de chave e as restrições de *v* **integridade de entidade** são especificadas sobre **relações individuais**, já a  restrição de *v* **integridade referencial** e é especificada entre **duas tabelas** e utilizada para manter a consistência entre linhas nas duas tabelas. 

OBS2: O cespe entende que a *v* **chave estrangeira** referencia a **chave primária e não a chave candidata** de outra tabela ou da mesma tabela.


## Questões 

05. (CESPE / FUNPRESP-EXE - 2022) Seguindo uma visão relacional, além de seus próprios atributos, a entidade ENDERECO deve possuir como chave estrangeira a chave primária CODIGO da tabela PESSOA. 

Verdadeiro


06. (FGV / SEFAZ-BA – 2022) Com relação aos conceitos de banco de dados relacionais, analise as afirmativas a seguir. 

I. Instância do banco se refere à supressão de detalhes da organização e do armazenamento de dados, descartando para um melhor conhecimento desses dados os recursos essenciais. 

II. Modelo de dados se refere a uma coleção de conceitos que podem ser utilizados para descrever a estrutura de um banco de dados, oferecendo os meios necessários para alcançar essa abstração. 

III. Abstração de dados refere aos conjuntos de dados e metadados e usuários presentes no servidor de dados em um determinado instante. Está correto o que se afirma em: 

a) I, somente. 
b) II, somente. 
c) III, somente. 
d) I e II, somente. 
e) I e III, somente. 

Resposta letra B

Abstração e Instância foi trocado, o correto seria:
I. *b* **Abstração** se refere à supressão de detalhes da organização e do armazenamento de dados, descartando para um melhor conhecimento desses dados os recursos essenciais. 
III. *b* **Instância** de dados refere aos conjuntos de dados e metadados e usuários presentes no servidor de dados em um determinado instante. Está correto o que se afirma em: 

07. (CESPE / FUNPRESP-EXE - 2022) View é uma visualização customizada de uma ou mais tabelas, com seus dados armazenados *v* **fisicamente** e montada a partir da execução de uma consulta. 

Resposta Falsa. A view por padrão não faz a amazenagem física.

08. (CESPE / ISS-Aracaju – 2021) Em um banco de dados relacional, a condição que garante que valores não possam se repetir dentro da mesma coluna denomina-se: 

a) Foregin key. 
b) Cláusula unique. 
c) Domain restriction. 
d) Índice cluster. 
e) Reference key. 

Resposta letra B - unique togethers do django

09.(CESPE / APEX-BRASIL – 2021) Não pode ter valor nulo em uma tabela do banco de dados um campo: 

a) que seja chave estrangeira. 
b) que tenha sido utilizado em um índice. 
c) que seja chave primária. 
d) que represente uma data de nascimento. 

Resposta letra C

10. (CESPE / TCE-RJ – 2021) Superchaves e chaves primárias são utilizadas para diferenciar de maneira única as instâncias de uma entidade, assim como para facilitar o processamento 

Resposta correta

11. (CESPE / TCE-RJ – 2021) No modelo relacional de bancos de dados, os elementos ficam armazenados em tabelas bidimensionais simples, contendo linhas (registros) e colunas (campos), e os elementos de um arquivo do banco **podem** relacionar-se com diversos elementos de outros arquivos. 

Resposta correta

12. (CESPE / Polícia Federal – 2021) Se uma tabela de banco de dados tiver 205 atributos, então isso significa que ela tem 205 registros. 

Resposta falsa
