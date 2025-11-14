01) FGV - 2024 - Consultor Técnico Legislativo (CM SP)
Com relação aos níveis da arquitetura ANSI/SPARC dos Sistemas Gerenciadores de Bancos de Dados (SGBD) relacionais, assinale (V) para a afirmativa verdadeira e (F) para a falsa.
I. O nível interno é o mais próximo do meio de armazenamento físico, é uma representação de baixo nível de todo o banco de dados, ele se ocupa do modo como os dados são fisicamente armazenados dentro do SGBD.
II. O nível externo, também conhecido como o nível lógico de comunidade, é o mais próximo dos usuários finais ou programadores de aplicação, é aquele que se ocupa do modo como os dados são vistos pelos usuários do sistema.
III. O nível conceitual, também conhecido nível lógico de usuário, é um nível indireto entre os outros dois níveis e representa todo o conteúdo do banco de dados de uma forma um tanto abstrata em comparação como os dados são armazenados logicamente.

As afirmativas são, respectivamente,
A) F – V – V.
B) F – F – V.
C) F – V – F.
D) V – V – F.
E) V – F – F.

Letra E

02) Instituto ACCESS - 2023 - Técnico (UFFS)
Banco de Dados é definido como uma coleção de dados interrelacionados, sendo o objetivo da arquitetura de sistemas de BD, estabelecida pela ANSI por meio do SPARC, separar o banco de dados físico das aplicações dos usuários, através de três diferentes níveis, descritos a seguir:
I. Nível mais alto da abstração, associada às partes do BD a que o usuário tem acesso conforme a necessidade individual de cada usuário.
II. Nível mais baixo da abstração, associada à estrutura física de armazenamento do BD, a organização de arquivos e os métodos de acesso.
III. Nível intermediário da abstração, associada à definição dos dados armazenados e às ligações entre eles, com destaque para as entidades, atributos, relacionamentos, operações e restrições.

Os níveis descritos em I, II e III são denominados, respectivamente,

A) das visões, lógico e relacional.
B) das visões, físico e conceitual.
C) das visões, físico e relacional.
D) das implementações, físico e relacional.
E) das implementações, lógico e conceitual.

Letra B


03) FUNDATEC - 2023 - (PROCERGS)
A arquitetura do SGBD é dividida em três níveis que proveem diferentes abstrações da estrutura do sistema de banco de dados, e é conhecida como arquitetura ANSI/SPARC. Essa organização em níveis efetiva a visão abstrata dos dados, reduzindo a complexidade do sistema conforme o nível em que o usuário trabalha.

Nesse contexto, analise as assertivas abaixo:

I. Nível físico: é onde se especifica o acesso aos dados conforme as necessidades de cada usuário ou aplicação.
II. Nível lógico: é onde se descreve a estrutura completa do banco de dados, que engloba a definição do esquema do banco de dados.
III. Nível de visão: relaciona-se com as estruturas de armazenamento dos dados e com o gerenciamento destas.

Quais estão corretas?
A) Apenas II.
B) Apenas I e II.
C) Apenas I e III.
D) Apenas II e III.
E) I, II e III.

Letra A

04) CESGRANRIO - 2023 - (TRANSPETRO)
O princípio de independência de dados é um conceito fundamental no modelo relacional de bancos de dados. A aplicação prática deste princípio permite que os bancos de dados sejam gerenciados, otimizados e modificados eficientemente sem a necessidade de realizar modificações extensivas em cada aplicação ou consulta que utiliza o banco de dados, facilitando a manutenção e a evolução dos sistemas. Na arquitetura de referência ANSI/SPARC, que é composta por três níveis de esquema
— externo, conceitual (ou lógico) e interno —, o princípio de independência de dados é expresso por meio da

A) necessidade de alterar o esquema externo quando ocorrem mudanças no esquema interno.
B) obrigatoriedade de alterar os programas aplicativos quando há uma modificação no esquema interno.
C) incapacidade de realizar mudanças no esquema conceitual sem afetar os esquemas externos.
D) dependência entre os esquemas, garantindo que uma modificação em um nível requer alterações em todos os níveis.
E) capacidade de modificar o esquema interno sem afetar o esquema conceitual e, portanto, sem afetar os esquemas externos e os programas aplicativos.

Letra E

05) FGV - 2024 - Residente (TJ RJ)
Com relação às três fases de um projeto de um novo banco de dados, avalie se as afirmativas a seguir são verdadeiras (V) ou falsas (F).
(V) O modelo conceitual pode ter a forma de um diagrama entidade-relacionamentos e captura as necessidades de uma organização em termos de armazenamento de dados independentemente da sua implementação.
(V) O projeto lógico tem como objetivo transformar o modelo conceitual obtido na primeira fase em um modelo lógico que definirá como o banco de dados será implementado em um SGBD.
(F) Na etapa do projeto físico, o modelo de banco d e dados é enriquecido com detalhes que influenciam no desempenho do banco mas interferem em suas funcionalidades.

A) V – F – F.
B) V – V – F.
C) F – F – F.
D) F – V – V.
E) F – F – V.

Letra B

06) CEBRASPE (CESPE) - 2024 - (CNPq)
Julgue o item a seguir, a respeito de mineração de dados, de arquitetura dos dados e de modelagem de dados.

Modelos de dados lógicos fornecem maiores detalhes acerca dos conceitos e relacionamentos no domínio em consideração, indicando atributos de dados, como tipos de dados e seus respectivos comprimentos, e relacionamentos entre entidades, **além de informar como será organizado** e quais regras de negócios estão envolvidas.

Errada

07) CEBRASPE (CESPE) - 2024 - (INPI)

Julgue o seguinte item, relacionados a modelagem de dados.

O modelo lógico **pode** conter chaves primárias e estrangeiras e pode ser usado em vários bancos de dados, tais como SQL Server, MySql, Oracle e PostgreSql.

Correta

08) CEBRASPE (CESPE) - 2023 - (CNMP)

Julgue o item subsecutivo, que se referem a conceitos de programação e banco de dados.

As estruturas para armazenamento dos dados e os métodos de acesso ao banco de dados fazem parte do projeto lógico de um banco de dados.

Errado

09) FUNDATEC - 2023 - (IFFAR)

Em um projeto de banco de dados, a etapa que objetiva definir as estruturas de dados que implementarão os requisitos identificados na modelagem conceitual é conhecida como:

A) Normalização.
B) Projeto lógico.
C) Modelo entidade-relacionamento.
D) Especificação de requisitos.
E) Projeto físico.

Letra B

10) FUNDATEC - 2023 - (IFC)
Para construir um banco de dados, são empregados três modelos, executados em ordem, que permitem a sua construção e utilização. O primeiro modelo especifica como os dados são armazenados e relacionados, independentemente de como serão implementados no banco de dados. O segundo modelo é criado com base no tipo de banco de dados utilizado. No terceiro modelo, são definidos os tipos de dados que serão armazenados e emprega a linguagem SQL. O primeiro, segundo e terceiro modelos são denominados, respectivamente:

A) Lógico, conceitual e físico.
B) Lógico, físico e conceitual.
C) Conceitual, lógico e físico.
D) Conceitual, físico e lógico.
E) Físico, conceitual e lógico.

Letra C