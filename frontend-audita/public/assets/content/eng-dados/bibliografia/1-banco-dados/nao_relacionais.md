ARQUITETURA ANSI/SPARC – TRÊS ESQUEMAS

Na Informática, como na maioria das ciências, temos uma **grande preocupação com padrões** e era necessário padronizar a **representação dos dados** e o **nível de abstração** necessário em cada visão de acordo com o **usuário alvo**.

Preocupação com o padrão, de modo que todos atuem de maneira similar e evitar o retrabalho de refazer o código não compreendido do "zero".

**Importâncai de padrões para a informática.**

Abstração é a capacidade de resolver um problema omitindo a complexidade dos detalhes de como funciona (Tirar os detalhes).

Quanto menos abastração mais detalhe. Quanto mais abastração menos detalhe.

ANSI/SPARC(organização de banco de dados) é diferente de SPARK(Soluções deBig Data).

**O padrão sugerido para organização de SBGD é o ANSI/SPARC**

Em 1975, o instituto americano responsável pelo desenvolvimento de padrões de produtos, serviços, processos e sistemas sugeriu a Arquitetura ANSI/SPARC para padrões de organização de Sistemas Gerenciadores de Banco de Dados (SGBD) e ela é dividida em três níveis independentes: externo, conceitual e interno.

**Arquitetura ANSI/SPARC é dividida em três níveis independentes:**

1) externo, 
2) conceitual e 
3) interno.

Dois conceitos básicos são necessários para seguirmos nosso estudo:

**Esquema →** descrição da estrutura dos dados e do banco de dados. (é o Conjunto da Obra)

Ex: tabelas, campos, visões, índices

**Instância →** é o dado em si. A visão dos dados no banco em um determinado instante. (ocorrência/acontecimento dentro do esquema)

![Esquema ANSI/SPARC](./esquema_ansi_sparc.png)

Agora vamos estudar os níveis propostos pelo modelo ANSI/SPARC

<mark>a) Nível Externo →</mark>  Também chamado de **Nível de Visão** ou **Nível Lógico do Usuário**. Há três pontos importantes para ressaltarmos:
-- Esse nível se comunica **diretamente com o usuário**, ou seja faz interface direta com os usuários.
-- Exibe **apenas** a parte do BD **relevante para um(1) usuário** e **oculta** as demais.
-- Apresenta uma visão externa **individual** e **independente** para cada usuário final

<mark>b) Nível Conceitual →</mark>  Também chamado de **Nível Lógico**. Está entre os níveis interno
e externo.

Observaram na imagem que há um mapeamento externo/conceitual que **consolida dados** em um **único esquema!** Essa é a **“tarefa”** do Nível Conceitual. Ele descreve todo o banco de dados e define quais dados estão armazenados e quais são as relações entre esses dados.

Agora temos a **visão geral** da **estrutura do banco**, dos **dados armazenados** e da relação entre eles.

Ele **oculta/abstrai** os detalhes das estruturas de **armazenamento físico** e se concentra na descrição de **entidades**.

<mark> c) Nível Interno →</mark>  Também chamado de Nível de Armazenamento ou Físico. É o que está mais longe dos usuários e mais próximo do banco de dados.

Agora vamos nos **preocupar** com o modo como os dados estão **fisicamente armazenados** no banco de dados, com o hardware do computador e com o desempenho final da estrutura física. Descreve os detalhes completos do armazenamento de dados e dos caminhos de acesso para o banco de dados.


A maioria dos SGBDs **não** separa os **três níveis de maneira completa ou explícita**, mas **dá suporte a eles de alguma forma**. O usuário pode usar a arquitetura ANSI/SPARC para visualizar os níveis de esquema em um sistema de banco de dados, mas os dados armazenados existem mesmo apenas no nível físico.

Observe que os mapeamentos são importantes para ajudar a garantir a **independência dos dados**, que é exatamente a capacidade de que uma **alteração** em uma definição dos esquemas de **determinado nível**, **não afetem** o esquema de **nível superior**.

Temos dois tipos de independência dos dados:

• Independência Lógica
• Independência Física

**<mark>a) Independência Lógica dos Dados →</mark>** trata da capacidade de alterar o esquema conceitual sem modificar os esquemas externos ou programas/aplicações. O mapeamento **do nível externo para o conceitual** é a **chave para a independência lógica de dados**.
(Se mexer no nível atual não deve alterar o nível acima dele)

**<mark>b) Independência Física dos Dados →</mark>** trata da capacidade de alterar o esquema interno sem alterar o esquema conceitual e consequentemente os esquemas externos. O mapeamento nível conceitual para o interno é a **chave para a independência física de dados**.

**OBSERVAÇÃO →** um sistema de banco de dados é capaz de prover **independência física dos dados**, não se pode afirmar que esse sistema também permite independência lógica de dados.

A independência lógica, depende do analise e da estrutura que os dados foram mapeados.

Projetos de Banco de Dados

Existe uma outra classificação para os projetos de Banco de dados em si, e que apresentam nomes similares

**<mark>a)Modelo de Alto Nível →</mark>** também chamado de **Modelo Conceitual**. Está mais
**próximo do usuário** e utiliza conceitos como **entidades**, **atributos** e **relacionamentos**.

**O usuário leigo será capaz de interpretar.**

É mais utilizado para discutir com o cliente os aspectos do negócio sem se preocupar com tecnologias específicas. É independente de hardware ou software, podendo ser implementado por qualquer SGBD.

Está ligado à coleta de requisitos, mapeamento de requisitos, as chamadas regras de negócios.

modelo_alto_nivel o usuário final consegue interpretar.

![Modelo de Alto Nível](./modelo_alto_nivel.png)


**<mark>b) Modelo de Implementação →</mark>** Também chamado de **Modelo Representativo** ou **Modelo Lógico**. É um modelo intermediário pois ainda oferece conceitos que podem ser entendidos pelos usuários finais, mas que não está muito longe do modo como os dados são organizados e armazenados no computador, apesar de ocultar muitos detalhes.

Já é uma representação para um banco de dados específico e depende do tipo particular de SGBD que será utilizado (Ex: Modelo Relacional).

![Modelo de Implementação](./modelo_alto_nivel.png)

**<mark>c) Modelo de Baixo Nível →</mark>** Também chamado de Modelo Físico. Agora a preocupação é como o armazenamento dos dados realmente acontecerá em todos os **seus detalhes**. Tem por foco o **público especializado** e totalmente dependente do SGBD escolhido.

![Modelo de Baixo Nível](./modelo_baixo_nivel.png)


| MODELO               | GRAU DE ABSTRAÇÃO | DEPENDÊNCIA                       | COMPREENSÃO PELO USUÁRIO FINAL | EXEMPLO                              |
|----------------------|-------------------|-----------------------------------|--------------------------------|---------------------------------------|
| Modelo Conceitual    | Alto              | Nenhum                            | Fácil                          | Modelo Entidade-Relacionamento (MER)        |
| Modelo Lógico        | Médio             | Somente Software (Tipo do SGBD)   | Médio                          | Modelo Relacional                     |
| Modelo Físico        | Baixo             | Hardware e Software (SGBD Espec.) | Difícil                        | Depende do SGBD                       |


| ARQUITETURA ANSI/SPARC | PROJETO DE BANCO DE DADOS |
|------------------------|----------------------------|
| Nível Externo          | Modelo Conceitual          |
| Nível Conceitual       | Modelo Lógico              |
| Nível Interno          | Modelo Físico              |
