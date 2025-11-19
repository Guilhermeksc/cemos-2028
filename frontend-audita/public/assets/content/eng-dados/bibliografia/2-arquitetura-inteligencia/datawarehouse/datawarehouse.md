# DATA WAREHOSUE

Os dados evoluíram ao longo dos últimos anos, saímos de um mundo físico para um mundo digital.

Armazenar os dados de forma normalizada (da melhor forma possível, com o mínimo de redundância, maior clareza, organização lógica nos bancos de dados relacionais).

**A grande virada de chave do século XIX foi compreender que a análise de dado que geram informação é o grande valor, ouro do século XIX.**

*vbg* **Permite a tomada de decisão assertiva e tempestiva.**

## SISTEMAS DE SUPORTE À DECISÃO

Conceitos Básicos

É um conjunto de procedimentos baseados em modelos para processamento de dados e julgamentos, utilizando um grande volume de
dados e cálculos para ajudar o seu utilizador a tomar decisões altamente consistentes e tempestivas.

![BI](datawarehouse/bi.png)


Aqui está a conversão do conteúdo das imagens para o formato Markdown, preservando a estrutura de definições e palavras-chave.

## DEFINIÇÕES

Business Intelligence é o processo de recolhimento e tratamento de informações que apoiarão a gestão de um negócio.

> **Palavras-chave:** processo; tratamento de informações; apoio à gestão de negócio.

Business Intelligence é o processo inteligente de coleta, organização, análise, compartilhamento e monitoração de dados que, depois de processados, geram informações para o suporte e para a tomada de decisões no ambiente de negócios.

> **Palavras-chave:** processo inteligente; coleta, organização, análise, compartilhamento e monitoração de dados; tomada de decisões.

Business Intelligence trata da capacidade de cruzar informações de diferentes bancos de dados, gerando relatórios analíticos diversos.

> **Palavras-chave:** cruzamento de informações; diferentes bancos de dados; relatórios analíticos.

Business Intelligence se refere à aplicação de técnicas analíticas para informações sobre condições de negócio no sentido de melhorá-las, de uma maneira automatizada, mas com a interpretação e respostas humanas, de forma a melhorar a tomada de decisões.

> **Palavras-chave:** técnica analíticas; automatizada; tomada de decisões;

Business Intelligence trata da descrição de habilidades das organizações para acessar dados e explorar informações, analisando e desenvolvendo percepções e entendimentos a seu respeito.

> **Palavras-chave:** habilidade; explorar informações; análise de percepções e entendimentos.

Business Intelligence são técnicas, métodos e ferramentas de análise de dados para subsidiar processos de decisão de uma empresa.

> **Palavras-chave:** técnicos, métodos e ferramentas; análise de dados; processo de decisão.

Business Intelligence nada mais é que uma série de conceitos e metodologias para auxiliar na tomada de decisões estratégicas nas empresas através principalmente de geração de relatórios gerenciais analíticos.

> **Palavras-chave:** conceitos e metodologias; tomada de decisões estratégicas; geração de relatórios analíticos.

Business Intelligence é um termo utilizado para descrever as habilidades das corporações para coletar dados e explorar informações, analisá-las e desenvolver entendimentos para tomada de melhores decisões.

> **Palavras-chave:** habilidades; coleta, exploração e análise de dados; tomada de decisão.


## Business Intelligence (Inteligência de Negócio)

“Business Intelligence (Inteligência de Negócio) é um termo criado pelo Gartner Group utilizado para representar um conjunto de **processos, técnicas, metodologias, habilidades, ferramentas e capacidades utilizadas para acessar, coletar, organizar, tratar, analisar, cruzar, processar, compartilhar e monitorar** *v* **dados de diversas fontes** com o intuito de gerar *b* **informações e relatórios analíticos** que suportem a gestão corporativa, a definição de estratégias e a tomada de decisão em ambientes de negócio. Sendo capaz de fornecer uma visão dos dados que facilita análises diagnósticas, descritivas e até preditivas para *v* **suporte a tomada de decisão.**”

*b* **▪ Análise descritiva:** é o exame de dados ou conteúdos para responder à pergunta: **“O que aconteceu?”** ou “o que está acontecendo?”. É caracterizado pelo Business Intelligence tradicional e visualizações como gráficos de pizza, gráficos de barras, etc que servem para que gestores tomem decisões;
*vbg* **Tivemos um prejuízo de 1 milhão de reais!**

*b* **▪ Análise Diagnóstica:** é uma forma de análise avançada que examina dados ou conteúdos para responder à pergunta: “Por que isso aconteceu?”, e é caracterizada por técnicas como detalhamento, descoberta de dados, **mineração de dados** e **correlações**. Esse é o tipo de análise empregada em investigações de causa-raiz;
*vbg* **O prejuízo foi causado pela crise do petróleo do oriente médio!**

*b* **▪ Análise Preditiva:** combina técnicas de **estatística, mineração de dados e aprendizagem de máquina (Machine Learning)** para encontrar significado em grandes quantidades de dados, trabalhando com probabilidades, entre outros para antecipar comportamentos futuros com base em eventos passados. Responde à pergunta: “O que vai acontecer?”;
*vbg* **Encontrar tendências e antecipar comportamentos futuros para que não tenhamos mais prejuízo. A tendência é o preço continuar alto**

*b* **▪ Análise Prescritiva:** é uma forma de análise avançada que examina os dados ou os conteúdos para responder à pergunta: “O que deve ser feito?” ou “O que podemos fazer caso algo aconteça?”, e é caracterizada por técnicas como análise de gráficos, simulação, redes neurais, mecanismos de recomendação, heurísticas, aprendizado de máquina, etc.
*vbg* **Vamos investir na produção de novos produtos que consumem menos petróleo durante o período**

É interessante mencionar que um usuário que desejar utilizar os conceitos de BI precisará de uma infraestrutura arquitetural específica capaz de extrair, limpar, formatar, transformar e carregar dados estruturados ou não estruturados de diversas fontes em depósitos de informações que possam ser acessados por sistemas analíticos.

BI possui quatro habilidades:

 1. memória organizacional;
 2. informação integrada;
 3. criação de conhecimento (insight);
 4. e apresentação.

![BI](datawarehouse/4-bi.png)

## Memória Organizacional

O principal recurso é a Memória Organizacional pois a informação e o conhecimento são armazenados no sistema de BI de forma que possam ser acessados e observados posteriormente o que ajuda na *b* **Integração de Informações**, que é a habilidade de centralizar informações de diversas fontes, o que, por sua vez, ajuda na *b* **Criação de Insights** que significa desenvolver a capacidade de ter percepções sobre o negócio para ajudar a melhorar a tomada de decisões e está fornece contribuições para o recurso de **Apresentação que é a habilidade de gerar relatórios e ferramentas adequados, legíveis e inteligíveis para a maioria dos usuários das ferramentas**.

*vbg* **De nada adianta ter os melhores dados se não tem uma apresentação adequada ao tomador de decisão!**

**Segundo o Gartner Group:**

BI é a habilidade das corporações de acessar dados e explorar as informações (normalmente contidas em um Data Warehouse ou Data Mart), analisando-as e desenvolvendo percepções e entendimentos a seu respeito permitindo tornar a tomada de **decisões mais pautada em informações**.

A Arquitetura de BI possui quatro grandes componentes:

(1) Data Warehouse, com seus dados-fonte;
(2) Análise de Negócio, uma coleção de ferramentas para manipular e analisar os dados do Data Warehouse, incluindo Data Mining;
(3) Business Performance Management (BPM), para monitoria e análise do desempenho; e
(4) uma interface de usuário, como um dashboard.

Observe que o ambiente de **Data Warehousing** é sobretudo de **responsabilidade de uma equipe técnica**, e o ambiente de análise (também conhecido como análise de negócios) está no âmbito dos usuários de negócios que podem se conectar ao sistema por meio de uma interface de usuário (um navegador, o componente de BPM ou o dashboard, a depender da permissão do usuário).

![BI](datawarehouse/bi-datawarehouse.png)

| COMPONENTES | DESCRIÇÃO |
| :--- | :--- |
| **DATA WAREHOUSE** | Partindo do lado esquerdo da figura, vemos um fluxo de dados dos sistemas operacionais (Ex: CRM, ERP, etc) até um Data Warehouse, que é um banco ou repositório de dados de interesse dos gestores preparado para dar suporte a aplicações de tomada de decisão. As aplicações variam de simples gerações de relatórios ou consultas a complexas otimizações. |
| **ANÁLISE DE NEGÓCIOS** | Trata-se de um conjunto de ferramentas para manipular, minerar e analisar dados, criar relatórios, realizar consultas sob demanda, entre outros. Dessa forma, usuários de negócio são capazes de identificar com rapidez e facilidade as tendências de desempenho (Ex: usuários podem isolar e identificar produtos, clientes ou regiões que apresentam tendências significativas de alta ou de baixa, ou que constituem fontes de problemas). |
| **BPM** | Este componente permite otimizar o desempenho geral de uma organização por meio da conexão de métricas (Ex: informações financeiras) com desempenhos reais da organização. Para tal, utiliza-se da análise, geração de relatórios e consultas para comparar o desempenho de negócios às metas estabelecidas – além de oferecer uma plataforma para compartilhar metas de desempenho e resultados da empresa. |
| **INTERFACE DE USUÁRIO** | Esse componente permite uma visão rápida dos dados por meio de ferramentas de visualização, como dashboards, painéis, portais, gráficos, cockpits, etc. Os dashboards fornecem uma visão abrangente das medidas, tendências e exceções do desempenho corporativo provenientes de múltiplas áreas do negócio, propiciando uma visão imediata da saúde da organização. |

![BI](datawarehouse/arquitetura-bi.png)

## Questões

**1- (SERPRO)** Sistemas de apoio à decisão são sistemas que, substituindo a intervenção humana, tomam decisão em situações críticas que envolvem o processamento de grande volume de informações em paralelo.

Resposta Falsa. Não há previsão de substituir a interfenção humanal.

**2- (CFO/DF)** Os sistemas de suporte à decisão utilizam uma coleção de dados relativos a uma empresa. A essa coleção dá-se o nome de Data Warehouse.

Resposta Verdadeira.

**3- (SEFAZ/SC )** As aplicações de Business Intelligence, nas últimas décadas, se utilizam de dados multidimensionais, armazenados em Data Warehouse, para gerar visões de negócios baseados em análises:

a) descritivas, diagnósticas, preditivas e prescritivas.
b) prescritivas, preditivas e diagnósticas, apenas.
c) preditivas, prescritivas e descritivas, apenas.
d) diagnósticas, descritivas e preditivas, apenas.
e) descritivas, diagnósticas e prescritivas, apenas.

Resposta Letra A, mas a maioria da literatura não considera pescritiva e a certa seria a letra D.

**4- (ANTT – 2013)** Uma solução de business intelligence, usualmente, provê as seguintes capacidades: memória da organização, integração da informação, criação de insights e apresentação dos dados.

Resposta Verdadeira.

5- (MPE-AP) Em um sistema de BI, a coleção de ferramentas utilizada como componente para manipular, minerar e analisar os dados no DW (Data Warehouse) denomina-se:

a) OLAP (Online Analytical Processing).
b) BPM (Business Performance Management).
c) Análise de Negócio.
d) Dashboard.
e) Processamento de Transações.

Resposta Letra C

## Contexto Geral

Com o aumento do tamanho e complexidade dos bancos de dados e a necessidade de obtenção de informações mais complexas e com maior velocidade, os modelos tradicionais de bancos começaram a se tornar obsoletos. Ao passo em que a necessidade de aumento de performance passa ser cada vez mais uma variável do negócio **soluções escalonáveis e elásticas são desenvolvidas no mercado.**

O Data Warehouse permite armazenar **dados de relatórios consolidados**, com flexibilidade de **criação de subgrupos** e disponibilização de **visões adaptadas aos mais diversos setores das empresas**.

Obviamente, para isso, exige técnicas avançadas de gerenciamento e análise para que se mantenha o custo/benefício do processo.


### Tabela 1: Comparativo entre Dados Operacionais e Informacionais

| CARACTERÍSTICAS | DADOS OPERACIONAIS | DADOS INFORMACIONAIS |
| :--- | :--- | :--- |
| **CONTEÚDO** | Valores correntes | Valores sumarizados, calculados, integrados de várias fontes |
| **ORGANIZAÇÃO DOS DADOS** | Por aplicação/Sistema de informação | Por assuntos/negócios |
| **NATUREZA DOS DADOS** | Dinâmica | Estática (até a atualização dos dados, de tempos em tempos) |
| **FORMATO DAS ESTRUTURAS** | Relacional, próprio para computação transacional | Dimensional, simplificado, próprio para atividades analíticas |
| **ATUALIZAÇÃO DOS DADOS** | Atualização campo a campo | Acesso granular ou agregado, normalmente sem update direto |
| **USO** | Altamente estruturado em tabelas, processamento repetitivo | Estruturado em fatos/dimensões, com processamento analítico e preditivo |
| **TEMPO DE RESPOSTA** | Otimizado para faixas abaixo de 1 segundo | Análises mais complexas, com tempos de respostas maiores |

---

### Tabela 2: Definições Acadêmicas de Data Warehouse (DW)

| AUTOR | DEFINIÇÕES ACADÊMICAS |
| :--- | :--- |
| **RALPH KIMBALL** | Conjunto de ferramentas e técnicas de projeto³ que – quando aplicadas às necessidades específicas dos usuários e aos bancos de dados específicos – permitirá que planejem e construam um Data Warehouse. |
| **BILL INMON** | Coleção de dados⁴ **orientados por assunto, integrados, variáveis com o tempo e não-voláteis**, para dar suporte ao processo de tomada de decisão. |
| **ARUN SEN** | Banco de dados construídos no interesse de **suporte à decisão de negócios** e contêm dados históricos sumarizados e consolidados provenientes de registros individuais de bancos de dados operacionais. |
| **KENNETH LAUDON** | Banco de dados – com ferramentas de consulta e relatório – que armazena dados atuais e históricos extraídos de vários sistemas/ambientes operacionais e **consolidados para fins de análises e relatórios administrativos**. |


Dessas definições tiramos várias palavras chaves que vamos esmiuçar ao longo da aula: Coleção de dados; ferramentas de consulta e relatório; orientados por assuntos; integrados; variáveis com o tempo; não-voláteis; dados históricos sumarizados e consolidados; suporte à tomada de decisão.

Características Essenciais

![Características Essenciais](datawarehouse/caract-essenciais.png)

**▪ Data Warehouse é orientado por assunto:**

Um Data Warehouse é montado por assunto, isto é, ele trata de temas específicos e importantes para o negócio da organização.
<br>

**▪ Data Warehouse é não-volátil:**

Um Data Warehouse é não-volátil, ou seja, os dados ficam disponíveis apenas para que os usuários realizem consultas e façam relatórios que auxiliem a tomada de decisão por parte dos gestores de uma organização, sendo somente leitura para os usuários finais de um banco de dados.