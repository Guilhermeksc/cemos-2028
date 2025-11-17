Aula 03 (Prof. Felipe
Mathias e Emannuelle
Gouveia)
TCU (Auditor de Controle Externo -
Tecnologia da Informação) Banco de
Dados - 2025 (Pós-Edital)
Autor:
Emannuelle Gouveia Rolim, Felipe
Mathias
31 de Outubro de 2025
05490709405 - Lorenna Siza
Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
Índice
..............................................................................................................................................................................................1) Oracle - Teoria 3
..............................................................................................................................................................................................2) Oracle - Questões Comentadas 48
..............................................................................................................................................................................................3) Oracle - Lista de Questões 60
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
2
67
ORACLE DATABASE
Conceitos Gerais
O Oracle Database é um Sistema Gerenciador de Banco de Dados Relacional
(SGBDr) desenvolvido e comercializado pela Oracle Corporation. Reconhecido
mundialmente por sua robustez, segurança e escalabilidade, o Oracle tornou-se
uma das soluções mais utilizadas e relevantes no mercado corporativo e
governamental, especialmente para ambientes que exigem alta disponibilidade,
segurança avançada e grande capacidade de gerenciamento de dados.
Atualmente, o Oracle Database suporta não apenas o tradicional modelo relacional, mas também
oferece suporte avançado para dados não estruturados e semiestruturados, permitindo, por
exemplo, armazenamento e consulta eficiente de documentos JSON, XML, arquivos multimídia,
informações geoespaciais e até mesmo modelos analíticos avançados (Machine Learning e
Analytics embutidos no banco). Com isso, consegue atender demandas modernas de Big Data e
Data Science, posicionando-se estrategicamente em múltiplos contextos empresariais.
Outra característica relevante do Oracle é a sua constante preocupação com a segurança e
disponibilidade dos dados. A Oracle oferece diversas tecnologias proprietárias como o Oracle
Data Guard, para replicação e recuperação de dados em tempo real, e o Oracle Real Application
Clusters (RAC), para alta disponibilidade e balanceamento de carga em ambientes distribuídos.
Para essa aula, usaremos a versão Oracle Database 23c, lançado em 2023. Existe
uma versão modificada um pouco mais recente, o Oracle Database 23ai (23.4.0),
implementada em maio de 2024 – mas ela ainda não é explorada em provas.
Arquitetura do Oracle
De forma geral, a arquitetura do Oracle Database pode ser dividida em duas grandes partes
interdependentes:
• Instância (Instance)
• Banco de Dados (Database)
Instância
Uma instância é um conjunto integrado de estruturas de memória e processos em execução no
servidor. A instância, por sua vez, é composta por 3 componentes: SGA (System Global Area),
PGA (Program Global Aera) e Processos de Segundo Plano (Background Processes).Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
3
67
A System Global Area (SGA) é uma área de memória compartilhada por todos os processos do
banco de dados, responsável por armazenar dados e informações necessárias ao funcionamento
do banco. É aqui que temos o buffer cache, a shared pool (que armazena comandos SQL já
executados, planos de execução e metadados, acelerando as consultas), o redo log buffer, entre
outros.
A Program Global Area (PGA) é uma área de memória exclusiva para cada processo servidor que
atende diretamente às sessões de usuários. A PGA contém informações específicas para execução
de comandos individuais, como variáveis locais, áreas para ordenação de dados, processamento
de joins e cálculos intermediários necessários em consultas SQL complexas.
(FGV/SEF MG/2023) O sistema de gerenciamento de banco de dados Oracle possui uma
arquitetura complexa. Uma das estruturas mais importantes que podemos destacar é a de
memória.
Duas das principais áreas de memória no Oracle são SGA (System Global Area) e PGA (Program
Global Area).
Relacione as áreas de memória com a sua respectiva utilização e definição.
1. PGA
2. SGA
( ) Ao executar uma instrução SQL é armazenado: tabelas temporárias, Linhas de classificação,
bitmaps de mesclagem, variáveis e pilha de chamadas
( ) Contém estruturas que podem ser dimensionadas de forma independente
( ) Está associada a cada sessão e irá variar seu tamanho de acordo com as necessidades de
memória da sessão em dado momento.
( ) Aloca e desaloca a memória do servidor ao iniciar ou desligar a instância.
( ) Está presente em sua composição além de outras estruturas o stream pool, java pool. Também
fazem parte.
Assinale a opção que indica a relação correta, na ordem apresentada.
a) 2, 2, 1, 2 e 1.
b) 1, 1, 2, 2 e 2.
c) 1, 2, 1, 1 e 1.
d) 2, 1, 1, 2 e 1.
e) 1, 2, 1, 2 e 2.
Comentários:Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
4
67
Vamos associar cada item.
( ) Ao executar uma instrução SQL é armazenado: tabelas temporárias, Linhas de classificação,
bitmaps de mesclagem, variáveis e pilha de chamadas
Aqui temos o PGA, que armazena dados privados da sessão, como áreas temporárias de
ordenação, pilha de chamadas, variáveis de execução, entre outros. (1)
( ) Contém estruturas que podem ser dimensionadas de forma independente
A SGA possui várias estruturas ajustáveis separadamente, como o buffer cache e as pools. (2)
( ) Está associada a cada sessão e irá variar seu tamanho de acordo com as necessidades de
memória da sessão em dado momento.
É a PGA que fornece uma área de memória privada, associada a cada sessão. (1)
( ) Aloca e desaloca a memória do servidor ao iniciar ou desligar a instância.
Alocamos a SGA quando a instância do Oracle é iniciada, e a desalocamos quando o banco é
desligado. (2)
( ) Está presente em sua composição além de outras estruturas o stream pool, java pool. Também
fazem parte.
As pools fazem parte do SGA. (2)
Portanto, ficamos com 1-2-1-2-2. (Gabarito: Letra E)
Por fim, os processos de segundo plano são processos que trabalham continuamente, de maneira
transparente ao usuário, garantindo o bom funcionamento do banco. Os principais processos
incluem:
• DBWn (Database Writer): Grava alterações do Buffer Cache (em memória) nos arquivos de
dados físicos (Datafiles).
• LGWR (Log Writer): Escreve registros do Redo Log Buffer nos arquivos Redo Log.
• CKPT (Checkpoint Process): Marca o ponto até onde todas as alterações feitas em memória
foram gravadas fisicamente nos arquivos de dados.
• SMON (System Monitor): Recupera instâncias após falhas, realiza manutenção periódica e
libera espaços inutilizados.
• PMON (Process Monitor): Gerencia processos servidor, recupera falhas individuais, libera
recursos e registra serviços com o Listener.
• MMON (Manageability Monitor): Realiza a coleta periódica de informações para o
Automatic Workload Repository (AWR) e auxilia o diagnóstico e otimização do banco.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
5
67
Banco de Dados
O banco de dados Oracle é um conjunto estruturado de arquivos físicos armazenados no sistema
operacional, que contêm os dados efetivos, as configurações e os logs necessários para
recuperação e manutenção da integridade. As estruturas físicas principais incluem:
• Arquivos de Dados (Datafiles): Arquivos físicos onde os dados reais das tabelas e índices
são armazenados permanentemente. Cada banco de dados possui um ou mais datafiles
agrupados logicamente em Tablespaces.
• Arquivos de Controle (Control Files): Arquivos binários essenciais que guardam informações
críticas sobre a estrutura física do banco, como nomes e localizações dos arquivos de dados
e de redo log, além de sequências internas para recuperação.
• Arquivos de Redo Log: Armazenam registros sequenciais das alterações feitas no banco
(inserções, atualizações e exclusões), permitindo recuperação rápida em casos de falha.
• Arquivos de Parâmetros (SPFILE ou PFILE): Definem os parâmetros de configuração da
instância e do banco de dados, como tamanho de memória (SGA/PGA), localizações e
limites operacionais.
Assim, quando um usuário executa algum comando SQL dentro do Oracle, como um simples
SELECT, temos o seguinte fluxo:
• O usuário envia um comando SQL que é processado pelo servidor.
• O Oracle verifica primeiro o Buffer Cache da SGA:
o Caso os dados estejam presentes, são imediatamente retornados.
o Caso contrário, o Oracle lê os dados dos Datafiles para o Buffer Cache, antes de retorná-
los ao usuário.
• Se houver alterações (INSERT, UPDATE, DELETE), elas são registradas primeiramente no
Redo Log Buffer, depois o processo LGWR grava estas alterações nos arquivos de redo log.
Periodicamente, o DBWR escreve os blocos alterados da memória para os arquivos físicos.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
6
67
O funcionamento do Oracle é sempre integrado entre instância e banco de dados. Uma instância
só pode, regra geral, estar conectada a um banco de dados por vez. Contudo, para aumentar a
disponibilidade e balancear cargas em ambientes maiores, podemos ter múltiplas instâncias
conectadas ao mesmo banco físico através do Oracle RAC (Real Application Clusters).Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
7
67
Estruturas Físicas e Lógicas
O Oracle Database trabalha com duas grandes categorias de estruturas:
• Estruturas Físicas: representam os arquivos físicos que efetivamente armazenam os dados
do banco em dispositivos de armazenamento do sistema operacional.
• Estruturas Lógicas: são estruturas abstratas, organizadas para permitir gerenciamento e
manipulação facilitados dos dados, sem necessidade de manipulação direta dos arquivos
físicos.
Estruturas Físicas
As estruturas físicas são os arquivos de dados, dos mais diferentes tipos. Vamos ver aqui os
datafiles, control files, redo log, password files e arquivos de parâmetros.
Datafiles
Datafiles são os arquivos físicos principais do Oracle, responsáveis pelo armazenamento efetivo
dos dados dos usuários e das aplicações seguindo o formato de arquivo .dbf. Esses arquivos
armazenam diretamente tabelas, índices, objetos de esquema, além de informações
administrativas como metadados.
Cada banco Oracle possui ao menos um datafile (tipicamente vários), organizados logicamente
em tablespaces (que veremos logo mais).
São os Datafiles que garantem a persistência dos dados armazenados no Oracle Database. Se um
datafile for perdido ou corrompido, os dados dentro dele podem ser irrecuperáveis, a menos que
existam backups adequados. Por isso, é fundamental gerenciar corretamente esses arquivos,
garantindo espaço suficiente e monitorando sua integridade.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
8
67
Control Files
Os Control Files são arquivos binários críticos que armazenam metadados essenciais sobre a
estrutura do banco de dados. Eles são vitais para o funcionamento e recuperação do banco, pois
contêm informações sobre a localização dos datafiles, redo logs, entre outros.
Redo Logs
O Redo Log é uma estrutura responsável por garantir a recuperação de dados em caso de falha.
Ele mantém um registro de todas as alterações feitas no banco, permitindo restaurar transações
recentes mesmo que o sistema tenha sido desligado abruptamente. Eles são compostos por dois
tipos de arquivos:
• Redo Log Files → arquivos físicos que armazenam todas as alterações feitas no banco de
dados.
• Archive Log Files → cópias dos redo logs quando o banco está operando no modo
ARCHIVELOG, permitindo recuperação total em caso de falha.
Aqui nos importa mais os Redo Log Files. Eles são arquivos físicos que armazenam todas as
modificações realizadas no banco de dados, antes mesmo de os dados serem gravados
definitivamente nos Datafiles. Eles garantem a consistência das transações e possibilitam a
recuperação de dados em caso de falha.
Já os Archive Log Files são cópias dos redo logs salvas antes de serem sobrescritas. Eles permitem
que o banco de dados seja completamente recuperado até um ponto específico no tempo (point-
in-time recovery), garantindo alta disponibilidade e continuidade das operações.
Os arquivos de redo log só são arquivados quando o banco de dados está no modo ARCHIVELOG.
Se o banco estiver no modo NOARCHIVELOG, os redo logs são sobrescritos sem serem salvos,
tornando impossível recuperar dados que não tenham sido gravados nos Datafiles.
Password Files
O Password File é um arquivo armazenado no servidor do Oracle Database que contém as
credenciais criptografadas dos usuários com permissões administrativas especiais, como SYSDBA,
SYSOPER e SYSASM. Ele permite que administradores se autentiquem no banco de dados sem
depender da autenticação do sistema operacional.
Arquivos de Parâmetros
Os Arquivos de Parâmetros armazenam todas as configurações da instância do Oracle Database.
Eles definem aspectos como uso de memória, localização de arquivos, número de processos,
modo de arquivamento e muito mais. O Oracle pode usar dois tipos de arquivos de parâmetros:Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
9
67
• PFILE (Parameter File) → Arquivo de configuração baseado em texto, editável
manualmente.
• SPFILE (Server Parameter File) → Arquivo binário gerenciado pelo Oracle, que permite
mudanças dinâmicas sem reiniciar o banco.
Esses parâmetros podem ser alterados por comandos SQL, através do comando ALTER SYSTEM.
Veja um exemplo:
Aqui, definimos o valor do parâmetro processos como 400 – ou seja, podemos ter 400 processos
simultâneos. O SCOPE define que a gravação será feita no SPFILE.
(FGV/TJ MS/2024) João, administrador de Banco de Dados Oracle, percebe que a configuração
de um parâmetro específico precisa ser ajustada para otimizar o desempenho do banco de dados.
Ele precisa fazer essa alteração, de forma persistente, no arquivo de inicialização (spfile) e garantir
que ela seja aplicada após o reinício do banco de dados.
Para isso, João deverá executar o comando:
a) UPDATE SYSTEM SET parameter_name = novo_valor;
b) ALTER SESSION SET parameter_name = novo_valor;
c) ALTER SYSTEM SET parameter_name = novo_valor SCOPE=PFILE;
d) ALTER SYSTEM SET parameter_name = novo_valor SCOPE=SPFILE;
e) ALTER DATABASE SET parameter_name = novo_valor SCOPE=SPFILE;
Comentários:
Como queremos alterar o SPFILE (de forma persistente), garantindo que a reaplicação seja feita
no reinício do banco de dados, usamos o comando ALTER SYSTEM, definimos o parâmetro com
SET parameter_name = novo_valor e o escopo com SCOP=SPFILE. (Gabarito: Letra D
)
Estruturas Lógicas
Diferentemente das estruturas físicas, que lidam com arquivos armazenados no sistema
operacional, as estruturas lógicas permitem que os dados sejam manipulados e acessados de
maneira eficiente, sem a necessidade de intervenção direta nos arquivos subjacentes.
O Oracle Database adota uma organização hierárquica para suas estruturas lógicas: Tablespace →
Segmentos → Extents → Blocos.
SQL
ALTER SYSTEM SET processes=400 SCOPE=SPFILE;Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
10
67
Tablespaces
Os tablespaces são a principal unidade lógica de armazenamento no Oracle Database. Eles
funcionam como contêineres que agrupam Datafiles, definindo como e onde os dados serão
armazenados dentro do banco.
Cada banco de dados tem pelo menos um tablespace chamado SYSTEM, que contém dicionários
de dados e objetos críticos para a operação do Oracle. Outros tablespaces podem ser criados
para organizar os dados de maneira eficiente, como o SYSAUX (auxiliar ao SYSTEM), USERS (para
dados de usuários), TEMP (para operações temporárias) e UNDO (para gerenciar transações e
permitir rollback/recuperação).
Os tablespaces são criados a partir de comandos SQL, por exemplo:
A sintaxe aponta a criação do tablespace exemplo, a partir de um arquivo de dados (datafile, que
segue o formato .dbf). Além disso, definimos o tamanho inicial do arquivo (500MB) e ativamos o
crescimento automático (AUTOEXTEND ON), que acontecerá quando a memória originalmente
alocada for atingida. Também o tamanho do incremento (NEXT), e o tamanho máximo (MAXSIZE).
SQL
CREATE TABLESPACE exemplo
DATAFILE '/u01/oracle/data/exemplo.dbf'
SIZE 500M AUTOEXTEND ON NEXT 100M MAXSIZE 2G;Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
11
67
(VUNESP/Pref. Santo André/2024) Considerando o Sistema Gerenciador de Bancos de Dados
Oracle 12c, o comando para criar um Tablespace denominado abc, com o Datafile abc01.dbf, com
um tamanho inicial de 200 KB, sendo extensível em parcelas de 100 KB, com um máximo de 50
MB é:
(A) CREATE TABLESPACE abc
DATAFILE abc01.dbf 200K
STEP 100K UNTIL 50M;
(B) CREATE TABLESPACE abc
DATAFILE abc01.dbf BEGIN 200K
PLUS 100K MAX 50M;
(C) CREATE TABLESPACE abc
DATAFILE abc01.dbf START FROM 200K
EXTEND 100K UNTIL MAX 50M;
(D) CREATE TABLESPACE abc
DATAFILE abc01.dbf SIZE 200K REUSE
AUTOEXTEND ON NEXT 100K MAXSIZE 50M;
(E) CREATE TABLESPACE abc
DATAFILE abc01.dbf FROM 200K + 100K
MAXSIZE 50M;
Comentários:
A criação é padrão para todas as alternativas, o que difere é a forma de criar o autoextend:Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
12
67
Ligar o autoextend → AUTOEXTEND ON.
Definir o tamanho de extensão em 100K → NEXT 100K
Definir o tamanho máximo como 50MB → MAXSIZE 50MB
A alternativa que traz essas 3 definições é a letra D. (Gabarito: Letra D)
As principais tablespaces padrões do Oracle que você deve saber são:
Tabela Descriçao
SYSTEM Tablespace principal do banco de dados, contendo o dicionário de dados
(metadados essenciais do banco). Criado automaticamente e obrigatório.
SYSAUX
Tablespace auxiliar ao SYSTEM, usado para armazenar informações de
componentes opcionais do Oracle, como estatísticas do AWR (Automatic
Workload Repository), Enterprise Manager, entre outros.
UNDO Usado para armazenar informações de undo (desfazer), permitindo rollback
de transações e garantia de consistência de leitura.
TEMP
Tablespace temporário, utilizado pelo Oracle para operações que exigem
espaço temporário, como ordenações (ORDER BY), joins grandes e criação
de índices.
USERS
Tablespace padrão para armazenar objetos de usuários comuns (tabelas,
índices, etc.), caso não seja especificado outro tablespace no momento da
criação dos objetos.
EXAMPLE
Tablespace opcional que contém exemplos de esquemas e tabelas de
demonstração fornecidos pela Oracle. Geralmente instalado apenas para
fins educacionais ou de teste.
DATA
Tablespace criado para armazenar dados de aplicação em ambientes
organizados separadamente do tablespace USERS. É comum encontrá-lo
com nomes específicos como DATA_TS ou APP_DATA.
INDEX Em algumas organizações, um tablespace separado para armazenar índices
pode ser criado, melhorando a performance e facilitando o gerenciamento.
Segmentos
Os segmentos (segments) são as estruturas dentro dos tablespaces que armazenam objetos
específicos do banco, como tabelas, índices, clusters e segmentos de undo. Temos alguns tipos
de segmentos:
• Segmentos de Tabela: Armazenam os dados das tabelas.
• Segmentos de Índice: Armazenam índices para otimização de consultas.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
13
67
• Segmentos de Undo: Armazenam informações necessárias para rollback e recuperação de
transações.
• Segmentos Temporários: Utilizados pelo banco para operações de ordenação e
manipulação temporária de dados.
Cada segmento será composto por um conjunto de extents, nosso próximo tópico.
Extensões
Uma extensão (extent) é um conjunto contíguo de blocos de dados dentro de um segmento. O
Oracle aloca automaticamente extents adicionais quando um segmento precisa crescer,
garantindo espaço suficiente para armazenar novos dados.
Cada segmento pode conter múltiplos extents, que são compostos por um número variável de
blocos. Podemos garantir essa alocação de extents automaticamente, garantida pelo próprio
Oracle, ou manualmente, através da intervenção do DBA.
Blocos de Dados
Os blocos de dados são a menor e mais essencial unidade de armazenamento do Oracle. Cada
bloco corresponde a uma unidade mínima de leitura/gravação do banco e pode conter múltiplas
linhas de tabela.
O tamanho de um bloco é definido no momento da criação do banco de dados e pode variar de
2 KB a 32 KB, dependendo do sistema operacional e do tamanho do banco. O tamanho padrão é
8 KB. Esse tamanho influencia diretamente o desempenho – blocos maiores são bons para
consultas analíticas e OLAP, enquanto blocos menores são bons para situações transacionais.
O bloco possui uma estrutura específica, veja:Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
14
67
• Common/Variable Header: Contém informações de controle sobre o bloco, como
identificadores de transação e status.
• Table Directory: Armazena metadados sobre as tabelas contidas no bloco.
• Row Directory: Um índice das linhas armazenadas dentro do bloco.
• Free Space: Espaço ainda disponível para novos registros.
• Row Data: Os dados efetivos das tabelas armazenadas.
Os dados em si estão armazenados na Row Data, armazenados em formato binário interno do
Oracle. Cada linha armazenada ocupa uma posição dentro do bloco, e cada linha possui duas
seções: seu header (ou row header), e o colum data, que armazena os dados em si. Cada linha
armazenada no Row Data recebe um identificador, que atua como uma pseudocoluna, chamada
de RowID. Ela retorna o endereço da row, e permite a otimização de processos de recuperação
da informação.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
15
67
Essas estruturas lógicas que vimos basicamente se integram da seguinte forma:
• O tablespace aloca um ou mais datafiles físicos.
• Dentro de um tablespace, os dados são organizados em segmentos (tabelas, índices, undo).
• Cada segmento é composto por múltiplos extents, que representam áreas de alocação
dentro do tablespace.
• Os extents são formados por múltiplos blocos de dados, que são a menor unidade de
armazenamento e contêm os registros efetivos.
É importante entender que cada nível lógico possui uma tabela de metadados associada, e que
podemos retornar esses valores a partir de consultas (usando um comando SELECT). Veja as
principais tabelas associadas a cada componente lógico:
Nível Lógico Nome da Tabela Colunas*
Tablespaces DBA_TABLESPACES
• tablespace_name: Nome do tablespace.
• status: Indica se o tablespace está ONLINE,
OFFLINE ou READ ONLY.
• contents: Indica se o tablespace contém DADOS
PERMANENTES, TEMPORÁRIOS ou UNDO.
• logging: Indica se operações DML são registradas
nos redo logs.
• extent_management: Mostra se o gerenciamento
de extents é LOCAL ou DICIONÁRIO.
Tablespaces DBA_DATA_FILES • tablespace_name: Nome do tablespace ao qual o
arquivo pertence.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
16
67
• file_name: Caminho completo do arquivo de
dados (datafile).
• tamanho_mb: Tamanho do arquivo de dados em
MB.
• autoextensible: Se o arquivo pode crescer
automaticamente (YES ou NO).
Segmentos DBA_SEGMENTS
• segment_name: Nome do segmento (tabela, índice
etc.).
• segment_type: Tipo do segmento (TABLE,
INDEX, LOB SEGMENT, UNDO SEGMENT).
• tablespace_name: Tablespace onde o segmento
está armazenado.
Extents DBA_EXTENTS
• segment_name: Nome do segmento ao qual o
extent pertence.
• tablespace_name: Tablespace onde o extent está
localizado.
• extent_id: Número do extent dentro do
segmento.
Blocos DBA_FREE_SPACE
• tablespace_name: Tablespace onde o espaço
livre está localizado.
• file_id: Identificador do arquivo dentro do
tablespace.
• block_id: Identificador do primeiro bloco de um
extent livre.
Blocos USER_TABLES
• blocks: Número total de blocos alocados para a
tabela.
• empty_blocks: Quantidade de blocos vazios
dentro do segmento.
• avg_row_len: Tamanho médio das linhas
armazenadas na tabela.
OBS: São aproximadamente 389 tabelas para administração do banco de dados, cada uma com
suas próprias colunas. É completamente inviável que você saiba todas.
(FGV/CVM/2024) Durante uma manutenção de rotina, a equipe de banco de dados Oracle da
Comissão de Valores Mobiliários identificou que uma tablespace de sistema estava com um
crescimento descontrolado. Ao refinar a pesquisa, observou que os registros de auditoria ainda
estavam com a sua tablespace default. Conforme a documentação de melhores práticas da Oracle,
é recomendado que seja criada uma tablespace específica para os dados de auditoria e que estes
sejam removidos da tablespace:Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
17
67
a) system;
b) users;
c) temp;
d) sysaux;
e) undo.
Comentários:
Segundo a documentação oficial da Oracle, os registros de auditoria, por padrão, são
armazenados na tablespace SYSAUX, mas a Oracle recomenda que esses registros sejam movidos
para uma tablespace específica para auditoria, evitando crescimento excessivo e impactando
menos as operações do banco de dados. A Oracle sugere o uso da tablespace AUDIT_DATA (ou
qualquer outra específica definida pelo DBA. (Gabarito: Letra D)
Tipos de Dados
Você deve lembrar que as definições de restrições de domínio – ou, em linguagem mais leiga, os
tipos de dados – são definidos em nível físico, isso é, pelo próprio SGBD. Isso acontece pois cada
um trabalha com diferentes tipos e diferentes notações para esses tipos de dados. Aqui no Oracle
não é diferente.
Temos diferentes tipos de dados suportados:
• Embutidos (built-in) no Oracle
• Tipos ANSI (padrão SQL)
• Definidos pelo usuário
• Fornecidos pelo Oracle
Vamos focar nos built-in, isso é, que estão dentro do Oracle por padrão. Esses tipos se dividem
em 6 categorias, abordadas abaixo.
TIPOS DE CARACTERESEmannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
18
67
Nome Descrição Exemplo
CHAR(n)
Armazena uma sequência de caracteres de
comprimento fixo n. Completa espaços à direita
se necessário.
CHAR(10) (armazena
sempre 10 caracteres)
VARCHAR2(n) Armazena strings de comprimento variável até n
caracteres. VARCHAR2(50)
NCHAR(n) Versão Unicode do CHAR, usado para armazenar
caracteres em múltiplos idiomas. NCHAR(20)
NVARCHAR2(n) Versão Unicode do VARCHAR2, armazena strings
de tamanho variável em Unicode. NVARCHAR2(100)
TIPOS NUMÉRICOS
Nome Descrição Exemplo
NUMBER(p,s)
Número com precisão definida. p é o número
total de dígitos, e s é a escala (quantidade de
casas decimais).
NUMBER(10,2)
FLOAT Tipo de ponto flutuante com precisão binária
variável, equivalente a NUMBER. FLOAT(10)
BINARY_FLOAT Número de ponto flutuante de precisão simples
(32 bits). BINARY_FLOAT
BINARY_DOUBLE Número de ponto flutuante de precisão dupla (64
bits), mais preciso que BINARY_FLOAT. BINARY_DOUBLE
TIPOS DATA E HORA
Nome Descrição Exemplo
DATE Armazena data e hora (segundos incluídos). '10-APR-2025
15:30:00'
TIMESTAMP Armazena data e hora com precisão de frações de
segundo (n pode ser de 0 a 9).
TIMESTAMP(6)
TIPOS DE OBJETOS GRANDES
Nome Descrição Capacidade Máx.
BLOB Armazena dados binários grandes, como
imagens, vídeos, arquivos PDF e documentos. 128TBEmannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
19
67
CLOB Armazena grandes quantidades de texto em
formato de caracteres padrão do banco. 128TB
NCLOB Similar ao CLOB, mas suporta Unicode para
armazenar texto em múltiplos idiomas. 128TB
BFILE
Armazena caminhos de arquivos externos,
mantendo apenas uma referência ao arquivo no
banco de dados.
Até 4PB
TIPOS ESPECIAIS
Nome Descrição Exemplo
LONG Armazena grandes textos (sem suporte a
indexação ou manipulação eficiente) – até 2GB
LONG
LONGRAW
Armazena grandes volumes de dados binários,
mas sem suporte para operações eficientes – até
2GB
LONG RAW
RAW(n) Armazena dados binários pequenos, como senhas
criptografadas e chaves de autenticação.
RAW(2000)
ROWID Endereço físico da linha armazenada no banco de
dados.
ROWID
UROWID ROWID para tabelas organizadas por índice (IOT). UROWID
(IBFC/TRF 5/2024) No Oracle Database o tipo de dados conhecido por armazenar um número de
ponto flutuante de 64 bits e precisão dupla tem a notação .
Assinale a alternativa que preencha a lacuna corretamente.
a) CHAR_DOUBLE
b) CHAR_FLOAT
c) BINARY_FLOAT
d) BINARY_DOUBLE
Comentários:
Como vimos, para ponto flutuante de precisão dupla, usamos BINARY_DOUBLE. (Gabarito: Letra
D)Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
20
67
Database Resource Manager
O Database Resource Manager (DBRM) é um recurso do Oracle Database que permite controlar
a alocação de recursos entre diferentes grupos de usuários e processos. Ele é essencial para
garantir que usuários críticos recebam mais recursos do que usuários de baixa prioridade,
prevenindo que consultas de alto consumo sobrecarreguem o sistema.
Diferente do sistema operacional, que gerencia recursos entre processos, o DBRM gerencia
recursos dentro do banco de dados. Com isso, podemos definir prioridades e limites de CPU,
consumo de I/O e sessões para diferentes usuários ou grupos.
Basicamente, usamos o DBRM para:
• Priorizar usuários e processos críticos em ambientes multiusuário.
• Evitar consumo excessivo de recursos por consultas que prejudicam o desempenho do
banco.
• Garantir tempo de resposta adequado para aplicações prioritárias.
• Impedir bloqueios de recursos por sessões inativas ou mal configuradas.
• Distribuir CPU, I/O e memória de forma justa entre grupos de usuários.
O DBRM organiza a alocação de recursos utilizando os seguintes componentes:
Componente Descrição
Resource Plan Define regras e prioridades para a alocação de recursos entre
diferentes grupos de usuários.
Resource Consumer
Group
Conjunto de usuários ou sessões que compartilham as mesmas
regras de alocação de recursos.
Resource Plan Directive
Especifica as regras dentro de um plano de recursos, como
prioridade de CPU, limites de consumo e tempo de execução
máximo.
Então, basicamente, um Plano de Recursos conterá Grupos de Consumidores que, por sua vez,
seguem regras definidas pela Diretiva de Recursos.
Veja um exemplo de criação de um Resource Consumer Group:Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
21
67
O Oracle possui uma série de pacotes (advindos do PL/SQL, a linguagem procedural de SQL
aplicada no seu contexto). Veja os principais:
Componente Descrição
DBMS_RESOURCE_MANAGER Principal pacote para criação, modificação e ativação
de planos de recursos e grupos de consumidores.
DBMS_RESOURCE_MANAGER_PRIVS Gerencia os privilégios de usuários para administrar o
Resource Manager.
DBMS_RESOURCE_MANAGER_CALIBRATE Permite calibrar os recursos do banco para otimizar a
alocação de CPU e I/O.
DBMS_RESOURCE_MANAGER_CLOUD Usado em bancos Oracle Cloud para gerenciamento de
recursos em ambientes multi-tenant (CDB/PDB).
Cada pacote conta com seus respectivos procedimentos específicos.
• DBMS_RESOURCE_MANAGER:
o CREATE_PLAN / DELETE_PLAN
o CREATE_CONSUMER_GROUP / DELETE_CONSUMER_GROUP
o CREATE_PLAN_DIRECTIVE / DELETE
• DBMS_RESOURCE_MANAGER_PRIVS:
o GRANT_SYSTEM_PRIVILEGE / REVOKE_SYSTEM_PRIVILEGE
o GRANT_SWITCH_CONSUMER_GROUP / REVOKE_SWITCH_CONSUMER_GROUP
• DBMS_RESOURCE_MANAGER_CALIBRATE:
o CALIBRATE_IO
o CALIBRATE_CPU
Vamos ver uma questãozinha que aborda esse contexto.
SQL
BEGIN
DBMS_RESOURCE_MANAGER.CREATE_CONSUMER_GROUP(
CONSUMER_GROUP => 'GRUPO_ANALISTAS',
COMMENT => 'Grupo de analistas com acesso limitado a CPU'
);
END;
/Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
22
67
(FGV/STN/2024) Num ambiente Oracle, no âmbito do Database Resource Manager, analise o
comando a seguir.
EXEC
DBMS_RESOURCE_MANAGER_PRIVS.GRANT_SYSTEM_PRIVILEGE -
(GRANTEE_NAME => 'xxxxx', -
PRIVILEGE_NAME =>
'ADMINISTER_RESOURCE_MANAGER', -
ADMIN_OPTION => FALSE);
Assinale o efeito desse comando.
a) O banco de dados “xxxxx” é incluído e pode ser gerenciado de acordo com o pacote
DBMS_RESOURCE_MANAGER.
b) O banco de dados “xxxxx” passa a ser gerenciado somente por administradores do pacote
DBMS_RESOURCE_MANAGER.
c) O usuário “xxxxx” é retirado do papel de administrador do pacote
DBMS_RESOURCE_MANAGER.
d) O usuário “xxxxx” fica impedido de executar todos os procedimentos do pacote
DBMS_RESOURCE_MANAGER
e) O usuário “xxxxx” pode executar todos os procedimentos do pacote
DBMS_RESOURCE_MANAGER, mas não pode atribuir esse privilégio a outros usuários.
Comentários:
Vamos dissecar o comando, que explora o gerenciamento de privilégios (PRIVS) dentro do
Resource Manager:
GRANTEE_NAME => ‘xxxxx’ → especifica quem vai receber o privilégio;
PRIVILEGE_NAME => 'ADMINISTER_RESOURCE_MANAGER' → especifica qual é o privilégio
concedido. No caso, esse privilégio permite ao usuário administrar o Resource Manager;
ADMIN_OPTION => FALSE → indica se o usuário pode repassar (TRUE) ou não (FALSE) esse
privilégio a outros (como um WITH GRANT OPTION).Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
23
67
Portanto, podemos perceber que foi concedido a permissão para administrar o ODRM, mas que
essa permissão não pode ser estendida a outros usuários. Correta a letra E. (Gabarito: Letra E)Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
24
67
Gerenciamento de Usuários
A cobrança de SGBDs é muito orientada à perspectiva de um DBA. Nessa situação, o
gerenciamento de usuários é um dos aspectos fundamentais da atividade - garantindo segurança,
controle de acesso e organização das permissões para diferentes tipos de usuários e aplicações.
Os usuários no Oracle são identificados dentro do banco e podem ter permissões específicas
sobre objetos (tabelas, views, procedimentos) e recursos do sistema. Além disso, é possível
agrupá-los por meio de roles (funções) para facilitar a administração.
Veja um exemplo de sintaxe que cria um usuário:
Criamos o usuário candidato com a senha senha123, além de definir um limite de 100mb para
armazenamento no tablespace users. A concessão de permissões é feita conforme vimos em SQL,
através de comandos GRANT (para conceder) e REVOKE (para revogar).
O Oracle permite definir regras de senha e limites de recursos por meio de perfis (PROFILE). Cada
usuário pode ser vinculado a um perfil específico. Podemos definir regras como tempo de
expiração de senha, número máximo de tentativas de login e tempo de inatividade:
Acima, criamos o perfil seguranca. Podemos atribuí-lo a partir de um ALTER USE:
SQL
CREATE USER candidato IDENTIFIED BY senha123
DEFAULT TABLESPACE users
TEMPORARY TABLESPACE temp
QUOTA 100M ON users;
SQL
CREATE PROFILE seguranca STRICT
LIMIT
FAILED_LOGIN_ATTEMPTS 5
PASSWORD_LIFE_TIME 90
PASSWORD_LOCK_TIME 1
PASSWORD_REUSE_TIME 365;
SQL
ALTER USER candidato PROFILE seguranca;Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
25
67
Também é possível criar uma role (função ou papel). Uma role é um conjunto de permissões que
pode ser concedido a múltiplos usuários, simplificando o gerenciamento de privilégios. Com ela,
conseguimos implementar o RBAC – Role Based Access Control – dentro do contexto do Oracle.
Veja como criaríamos uma role analista, atribuindo permissões a ela e atribuindo essa role ao
usuário candidato:
O monitoramento dos usuários pode ser feito a partir da tablespace dba_users. Os atributos
dessa tabela incluem:
• USERNAME → nome do usuário
• USER_ID → ID do usuário
• AUTHENTICATION_TYPE → substitui a coluna PASSWORD. Pode receber os valores:
o NONE – o usuário não configurou um método de autenticação;
o EXTERNAL – método externo de autenticação, a partir do sistema operacional;
o GLOBAL – usa um servidor LDAP corporativo, como o Microsoft Active Directory;
o PASSWORD – usuário autenticado por uma senha;
• ACCOUNT_STATUS → aponta o estado da conta, como OPEN, EXPIRED, LOCKED, entre outras;
• DEFAULT_TABLESPACE → tablespace padrão para os dados;
• PROFILE → perfil alocado ao usuário;
(Inédita/Prof. Felipe Mathias) Acerca dos conhecimentos sobre o Oracle Database, julgue o item
subsecutivo.
Carlos, DBA da Secretaria de Fazenda de Tilambuco, que adota o Oracle como seu banco de
dados, deseja realizar o gerenciamento de usuários encontrando os nomes de usuários, e os IDs
para usuários com a conta ativa. A sintaxe abaixo retorna o resultado pretendido.
SELECT username, user_id FROM dba_users
WHERE account_status = ‘OPEN’;
Comentários:
Correto! A sintaxe está bem construída, retornando apenas os usuários cujo account_status seja
‘OPEN’, ou seja, estejam ativos no momento. (Gabarito: Certo)
SQL
CREATE ROLE analista;
GRANT CREATE TABLE, CREATE VIEW TO analista;
GRANT SELECT, INSERT, UPDATE ON candidatos TO analista;
GRANT analista TO candidato;Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
26
67
Controle de Transações e Concorrência
Oracle Database utiliza um sofisticado mecanismo de controle de transações e concorrência para
garantir consistência, isolamento e integridade dos dados em um ambiente multiusuário. Esse
controle permite que múltiplas transações sejam executadas simultaneamente sem comprometer
a integridade do banco de dados.
O banco implementa o conceito de Multi-Version Concurrency Control (MVCC), que permite que
leituras consistentes sejam feitas sem bloquear operações de escrita, melhorando o desempenho
e evitando problemas comuns, como bloqueios e deadlocks. Além disso, o banco segue as
propriedades ACID (Atomicidade, Consistência, Isolamento e Durabilidade) para assegurar que
cada transação seja concluída corretamente ou revertida em caso de falhas.
Uma transação é uma sequência de operações DML (Data Manipulation Language) que deve ser
tratada como uma unidade atômica, garantindo que todas as mudanças sejam aplicadas ou
descartadas corretamente. O Oracle gerencia transações por meio dos comandos COMMIT,
ROLLBACK e SAVEPOINT.
• COMMIT → confirma a transação, tornando as operações permanentes;
• ROLLBACK → reverte todas as alterações feitas na transação em andamento;
• SAVEPOINT → cria um ponto dentro da transação que permite um rollback parcial;
Vale ressaltar que o início de uma transação é implícita, e ocorre junto da primeira transação –
sendo as mudanças não visíveis até que ocorra um COMMIT, sem necessidade de uma declaração
(como com o comando BEGIN).
(FGV/ALESC/2024) O Oracle 19G possui três declarações básicas de controle de transações
conhecidas como
a) do, redo e undo.
b) confirm, do e abort.
c) checkpoint, do e save.
d) checkpoint, commit e undo.
e) commit, rollback e savepoint.
Comentários:
Como vimos, o Oracle adota três declarações básicas para controlar as transações: COMMIT,
ROLLBACK e SAVEPOINT. (Gabarito: Letra E)
Os níveis de isolamento determinam como as transações interagem entre si no Oracle Database,
controlando concorrência, bloqueios e integridade dos dados. O objetivo principal é evitarEmannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
27
67
problemas como leitura suja (dirty read), leitura não repetível (non-repeatable read) e leitura
fantasma (phantom read), garantindo que cada transação seja executada de forma segura e
previsível. O Oracle segue o padrão ANSI SQL, mas não suporta todos os níveis. Veja:
• READ UNCOMMITED → Permite leitura de dados não confirmados (dirty read). Não suportado
no Oracle.
• READ COMMITED → Comportamento padrão do Oracle. Cada consulta vê apenas os dados
confirmados no momento da execução. Garante consistência de leitura sem bloquear
outras transações.
• REPEATABLE READ → Garante que leituras repetidas dentro da mesma transação sejam
sempre iguais, evitando leitura não repetível. Não suportado no Oracle.
• SERIALIZABLE → Mantém a consistência total entre leituras, evitando alterações
concorrentes. As transações são executadas de forma sequencial, como se não houvesse
concorrência.
Para evitar as condições de corrida e inconsistências nas leituras, garantindo um isolamento melhor
entre as transações, o Oracle implementa alguns mecanismos de bloqueio – ou locks:
Tipo de Lock Descrição
TM (Table Lock) Protege a estrutura de uma tabela contra alterações simultâneas.
TX (Transaction Lock) Bloqueia linhas que estão sendo modificadas por uma transação
ativa.
ROW SHARE (RS) Permite múltiplas leituras e atualizações simultâneas na tabela.
EXCLUSIVE (X) Bloqueia completamente a tabela para escrita, permitindo
apenas leituras.
(CEBRASPE/TCE AC/2024) Acerca dos níveis de isolamento do Oracle 21C, julgue o item que se
segue.
No nível de isolamento SERIALIZABLE, uma transação em andamento pode visualizar as alterações
realizadas por outras transações, independentemente delas terem sido confirmadas ou não.
Comentários:
No SERIALIZABLE não conseguimos visualizar as alterações antes da confirmação, caracterizando
o mais alto nível de isolamento. (Gabarito: Errado)Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
28
67
Auditoria e Segurança
A segurança no Oracle Database é um aspecto crítico da administração do banco, garantindo que
somente usuários autorizados possam acessar e modificar dados sensíveis. O Oracle oferece um
modelo de segurança robusto, abrangendo autenticação, controle de acesso, criptografia,
auditoria e proteção contra ameaças. Podemos dividir os elementos de segurança em 5 categorias
distintas: autenticação, autorização, criptografia, auditoria e proteção contra ameaças.
A autenticação é responsável por controlar quem pode acessar o banco de dados, e é feita, entre
outros, através de:
• Senha local, armazenada no Oracle
• Sistema operacional (OP$)
• Autenticação Externa (LDAP, Kerberos ou certificados SSL)
• Autenticação Global (Oracle Internet Directory ou Active Directory)
Nesse exemplo acima, criamos um usuário identificado a partir do sistema operacional.
A audi-toria é outro tópico importante no Oracle. Ela é essencial para rastrear atividades de
usuários e garantir conformidade com normas de segurança, como a LGPD, registrando tentativas
de acesso, alterações de dados e comandos SQL executados. Com isso, conseguimos registrar e
monitorar atividades no database, garantindo que os DBAs possam:
• Identificar ações suspeitas ou não autorizadas.
• Monitorar alterações em tabelas críticas.
• Rastrear quem acessou ou tentou acessar dados sensíveis.
• Cumprir normas regulatórias, como LGPD e SOX.
Basicamente, conseguimos realizar auditorias de três formas:
Tipo de Auditoria Descrição
Auditoria Baseada em Parâmetro
(Legacy Audit) Auditoria tradicional ativada via AUDIT_TRAIL.
Unified Audit (Padrão a partir do
Oracle 12c) “Novo” modelo centralizado, mais eficiente e flexível.
FGA (Fine-Grained Auditing) Auditoria avançada baseada em condições específicas.
SQL
CREATE USER "OPS$JOAO" IDENTIFIED EXTERNALLY;Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
29
67
A verificação da auditoria é feita pelo comando SHOW PARAMETER audit_trail;, retornando os
possíveis valores:
• NONE → Auditoria desativada.
• DB → Logs armazenados dentro do banco (AUD$).
• DB, EXTENDED → Inclui informações sobre valores de colunas e comandos SQL completos.
• XML → Logs armazenados em arquivos XML.
• OS → Auditoria salva em arquivos de log do sistema operacional.
Se a auditoria estiver desativada, é possível alterar seu estado pelo ALTER SYSTEM:
Em alguns casos, é necessário reiniciar o banco de dados, fazendo a ação através
do comando SHUTDOWN e STARTUP. Quanto à forma de desligamento, o Oracle
fornece algumas abordagens:
• SHUTDOWN → padrão, permite que transações ativas sejam concluídas antes
de encerrar, ocorrendo sem perda de dados;
• SHUTDOWN TRANSACTIONAL → permite que transações ativas sejam
concluídas, não permitindo novas ações após o comando;
• SHUTDOWN IMMEDIATE → desconecta todos os usuários imediatamente,
encerrando as transações sem esperar um COMMIT, fazendo um rollback
automático das transações incompletas;
• SHUTDOWN ABORT → encerra imediatamente a instância, sem salvar
transações ou liberar locks;
SQL
ALTER SYSTEM SET audit_trail = 'DB, EXTENDED' SCOPE=SPFILE;
SHUTDOWN IMMEDIATE;
STARTUP;/Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
30
67
(FGV/TJ AP/2024) João, administrador de banco de dados, deverá configurar a inicialização de
uma instância do Banco de Dados Oracle. Para isso, deverá considerar que somente poderá
executar o “shutdown” da instância após o “rollback” das transações não submetidas a “commit”.
Para tanto, como João não precisa aguardar a conclusão de todas as transações, ele deverá
executar o modo de “shutdown”:
a) abort;
b) mount;
c) nomount;
d) immediate;
e) transactional.
Comentários:
A questão quer um shutdown que realize rollback automático das transações que não estão
submetidas a nenhum COMMIT no momento, não exija aguardar a finalização manual das
transações e permita o encerramento imediato da instância. Vamos ver que alternativa se alinha.
a) Errado. O ABORT desliga o banco imediatamente, sem rollback das transações ativas.
b) Errado. Não é um tipo de shutdown.
c) Errado. Não é um tipo de shutdown.
d) Certo. O IMMEDIATE desconecta todos os usuários imediatamente, e realiza o rollbakc
automático das transações sem COMMIT, se alinhando ao requisitado pela questão.
e) Errado. O TRANSACTIONAL não força o rollback imediato, permitindo que todas as transações
terminem – o que elimina a necessidade do rollback.
Portanto, correta a letra D. (Gabarito: Letra D)
Voltando à auditoria, a tabela que lida com os registros de auditoria é a DBA_AUDIT_TRAIL. Ela
recebe, dentre outros, os seguintes atributos:Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
31
67
• USERNAME → Usuário que executou o comando.
• ACTION_NAME → Tipo de operação (SELECT, UPDATE, DELETE, etc.).
• TIMESTAMP → Data e hora da ação.
• SQL_TEXT → Comando SQL executado.
Os outros aspectos da segurança acabam não sendo tão cobrados – mas saiba que podemos
criptografar os dados (com o Transparent Data Encryption e o DBMS_CRYPTO) e implementar
ferramentas de segurança, como o Database Fireweall e outras medidas que protegem contra
ataques como SQL Injection.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
32
67
Otimização de Performance
Empregamos, no Oracle, um conjunto de técnicas e estratégia para a otimização de performance,
buscando maximizar a eficiência do banco de dados, reduzindo tempo de resposta, uso de
recursos e congestionamento do sistema. Esse processo envolve ajustes em consultas SQL,
índices, gerenciamento de memória, otimização de transações e monitoramento do desempenho.
A performance do Oracle é otimizada por meio de quatro pilares principais:
1. Otimização de Consultas SQL e Índices
2. Gerenciamento de Memória e Processamento
3. Gerenciamento de I/O e Armazenamento
4. Monitoramento e Diagnóstico de Performance
Índices
O primeiro passo é justamente a otimização de consultas – e, conforme sempre lhe falo, pensou
em otimização de consultas, pensou em índices. Eles são estruturas auxiliares, que reduzem a
necessidade de se fazer uma varredura completa na tabela, a chamada full table scan, trazendo o
uso do index sacn. O Oracle trabalha com alguns tipos de índices, em sua maioria do tipo não
clusterizado:
Tipo de Índice Descrição
B-tree (Padrão) Estrutura de árvore balanceada, otimizada para buscas rápidas.
Bitmap Usa mapas de bits para indexação eficiente de valores repetidos.
Function-Based Indexa o resultado de uma função aplicada à coluna.
Composite Indexa duas ou mais colunas ao mesmo tempo.
Os índices podem ser criados manualmente, através do comando CREATE INDEX. Veja um
exemplo de um índice composite:
Agora, para índices clusterizados, precisamos de uma “adaptação”, uma aproximação. Não é
possível criar diretamente esses índices, mas é possível usar o que é chamado de Index Organized
Table (IOT), que organiza a tabela de acordo com o índice, se aproximando do que é um
verdadeiro índice clusterizado (dados da tabela seguindo a ordem dos dados na memória).
SQL
CREATE INDEX idx_pedidos_estado_cidade ON pedidos (estado, cidade);Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
33
67
Isso pode ser feito da seguinte forma:
Veja que tivemos o ORGANIZATION index apontando que a tabela deverá ser organizada de
acordo com o índice. Além disso, por padrão apenas pegamos a chave primária para essa
organização – para adicionarmos mais colunas, usamos a diretiva INCLUDING xxxxx, onde xxxxx
representa a coluna desejada.
(FGV/TJ RN/2023) Tabelas do tipo Indexed-organized tables no Oracle têm uma correspondência
de organização e funcionalidade com:
a) Clusterized indexes, no SQL Server;
b) HEAP tables, no MySQL;
c) Memory tables, no MySQL;
d) Partition tables, no SQL Server;
e) Table Clusters, no Oracle.
Comentários:
Como vimos, as Index Organized Tables (IOT) são tabelas organizadas de acordo com o índice, se
assemelhando a o que temos nos índices clusterizados (ou clusterized index, no SQL Server).
Correta, portanto, a letra A. (Gabarito: Letra A)
É possível consultar os índices na tabela DBA_INDEXES.
Cache e Pools
Vimos lá no início da aula, os espaços de memória o como a System Global Area (SGA) e a Program
Global Area (PGA). Especialmente dentro da SGA, temos algumas estruturas específicas que
otimizam o acesso aos dados, minimizam I/O no disco e melhoram a eficiência das consultas.
Dentre essas estruturas, se destacam o Buffer Cache, a Shared Pool e a Large Pool.
SQL
CREATE TABLE exemplo
(
exemplo_id integer not null,
linha_id integer not null,
primary key (exemplo_id, linha_id)
)
ORGANIZATION indexEmannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
34
67
As operações I/O (Input/Output) no Oracle Database referem-se ao processo de
leitura e escrita de dados entre a memória (SGA) e o armazenamento físico (disco).
Essas operações ocorrem quando os dados necessários para uma consulta não
estão no Buffer Cache, exigindo uma busca no disco, ou quando transações
confirmadas (COMMIT) precisam ser persistidas nos Datafiles e Redo Logs.
Buffer Cache
O Database Buffer Cache é uma das áreas mais importantes da SGA. Ele mantém cópias dos
blocos de dados lidos do disco na memória RAM, reduzindo a necessidade de acessos ao disco,
que são muito mais lentos. Isso pois a memória cache é muito mais rápida do que a memória de
disco.
Quando uma consulta SQL busca os dados, primeiro ela vai verificar se o bloco consultado já se
encontra no Buffer. Se o bloco já estiver na memória, o Oracle o lê diretamente, evitando I/O no
disco. Também há limpeza quando a memória está cheia, removendo-se os blocos menos
utilizados.
Um Buffer Cache é composto por três áreas:
• Keep Pool → aborda os dados críticos, mantendo-os por mais tempo na memória;
• Recyle Pool → contém dados acessados ocasionalmente;
• Default Pool → armazena a maior parte dos blocos acessados.
É possível também o uso do Redo Buffer. Ele é responsável por armazenar alterações feitas no
banco de dados antes que sejam gravadas fisicamente nos Redo Log Files. Esse mecanismo
garante recuperação de dados em caso de falha do sistema e melhora o desempenho ao reduzir
acessos diretos ao disco.
Pools
A SGA contém diferentes pools de memória, cada um projetado para otimizar um aspecto
específico do desempenho do banco de dados. Vamos abordar os três principais: a Shared Pool,
a Streams Pool e a Large Pool. A Shared Pool é uma das partes mais importantes da SGA e
armazena dados frequentemente acessados para melhorar a performance do banco. Seu tamanho
impacta diretamente a reutilização de consultas e PL/SQL, reduzindo a necessidade de
recompilações.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
35
67
A Large Pool é uma área opcional da SGA que melhora a performance de operações que exigem
grandes quantidades de memória, como backup, restore e processamento paralelo. Por fim, as
Streams Pool gerenciam operações de replicação e captura de mudanças no banco de dados.
Então, basicamente:
• Shared Pool → Armazena SQLs analisados e metadados.
• Large Pool → Gerencia backup, restore e operações paralelas.
• Streams Pool → Suporta replicação e a captura na mudança de dados.
(SELECON/EMGEPRON/2021) No que concerne à arquitetura de sistemas de bancos de dados
Oracle, existem diversos termos específicos, siglas e nomes de serviços e aplicações. Entre estes
termos, dois são descritos a seguir.
I. Arquivos físicos de log que permitem a recuperação da instância do banco de dados. Esses
arquivos contêm um registro de todas as alterações feitas nos dados nas tabelas e índices do
banco, assim como mudanças realizadas na estrutura do banco de dados em si. A instância pode
recuperar o banco com as informações contidas nesses arquivos – se os datafiles não forem
perdidos.
II. Área da SGA que armazena dados como declarações SQL executadas, cópias do dicionário de
dados do banco e cache de resultados de consultas SQL e PL/SQL para reuso. Também contém
dados das tabelas de sistema, como informações do conjunto de caracteres e informações de
segurança.
Os termos descritos em I e em II são denominados, respectivamente:
a) Redo log files e Shared Pool
b) Redo Log Buffer e Shared Pool
c) Redo log files e Shared SQL Area
d) Redo Log Buffer e Shared SQL Area
Comentários:
I. Falou em “arquivos de log”, “recuperação de instância”, temos os Redo Log Files.
II. A área que representa as declarações SQL armazenadas, entre outras informações, é a Shared
Pool.
Portanto, correta a letra A. (Gabarito: Letra A)
Otimização de SQLEmannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
36
67
A otimização de SQL, ou SQL Performance Tuning, é um conjunto de técnicas utilizadas para
otimizar a execução de consultas, garantindo um melhor uso dos recursos do banco, como CPU,
memória e I/O. A otimização de consultas no Oracle envolve análise de planos de execução, uso
de variáveis de bind, dicas de otimização (Hints) e estatísticas atualizadas para ajudar o Otimizer a
escolher a melhor estratégia de execução.
O SQL Tuning se baseia em 3 ferramentas: EXPLAIN PLAN, HINTS e BIND VARIABLES.
O EXPLAIN PLAN permite visualizar como o Oracle executará uma query, identificando Full Table
Scans, uso de índices, joins e operações de Sorting e Filtering. A saída do EXPLAIN PLAN
geralmente inclui as seguintes colunas:
• OPERATION → Tipo de operação (TABLE ACCESS, INDEX SCAN, SORT, HASH JOIN).
• OBJECT_NAME → Nome da tabela ou índice utilizado.
• COST → Custo estimado da operação (quanto menor, melhor).
• CARDINALITY → Quantidade estimada de registros retornados.
Um exemplo de EXPLAIN PLAN:
E um exemplo de saída:
Id Operation Name Rows Bytes Cost (%CPU) Time
0 SELECT STATEMENT 100 4000 12 (2) 00:00:01
1 TABLE ACCESS FULL FUNCIONARIOS 100 4000 12 (2) 00:00:01
(CEBRASPE/DPE RO/2022) O utilitário Explain Plan
a) é criado pegando-se uma string de qualquer comprimento e codificando-a em uma impressão
digital de 128 bits.
b) serve para criar uma expressão da álgebra relacional.
c) relata a maneira como uma consulta usa os índices do banco de dados.
d) deve executar o SQL para determinar o tamanho do resultado.
e) cria os índices necessários para executar uma consulta.
SQL
EXPLAIN PLAN FOR
SELECT nome, salario FROM funcionarios WHERE departamento_id = 10;
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
37
67
Comentários:
O EXPLAIN PLAN descreve a consulta, relatando, dentre outros, os índices usados, tipo de
operação, custo estimado, quantidade de registros retornados, entre outros. Correta, portanto, a
letra C. (Gabarito: Letra C)
As HINTS são diretivas manuais que podem ser inseridas NA CONSULTAS PARA FORÇAR O
Oracle a escolher um plano d execução específico. Eles são colocados entre marcadores da
seguinte forma: /*+ ... */. Você pode indicar o tipo de hint a ser seguido:
• FULL(tablename) → Força um Full Table Scan.
• INDEX(tablename indexname) → Força o uso de um índice específico.
• LEADING(tablename) → Define a ordem de execução do JOIN.
• USE_HASH(tablename) → Força um Hash Join ao invés de Nested Loops.
• PARALLEL(tablename degree) → Ativa execução paralela para a tabela.
Por fim, as Bind Variables são substituições de valores fixos por variáveis de entrada, permitindo
ao Oracle reutilizar planos de execução em queries semelhantes. Essas variáveis são resolvidas no
momento da execução, permitindo que a mesma estrutura de query seja reutilizada, ao invés de
gerar um novo plano de execução a cada consulta. Por exemplo, a consulta abaixo é realizada sem
as bind variables:
Cada consulta gerará um novo plano de execução. Podemos usar as bind variables da seguinte
forma:
Assim, o Oracle usa um mesmo plano de execução, economizando memória.
SQL
SELECT * FROM pedidos WHERE cliente_id = 101;
SELECT * FROM pedidos WHERE cliente_id = 102;
SELECT * FROM pedidos WHERE cliente_id = 103;
SQL
SELECT * FROM pedidos WHERE cliente_id = :id_cliente;Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
38
67
Views Dinâmicas
As views V$ (views dinâmicas de desempenho) são uma coleção de visões internas do Oracle
Database, utilizadas para monitoramento, diagnóstico e otimização do banco de dados. Elas
fornecem informações detalhadas sobre sessões ativas, consumo de recursos, operações de I/O,
locks, caches de memória, Redo Logs, processos em execução e muito mais.
Essas views não armazenam dados permanentemente; em vez disso, refletem o estado atual da
instância do banco, sendo atualizadas em tempo real pelo Oracle Background Processes. Essas
views sempre são indicadas pelo prefixo V$, e é necessário privilégios de acesso, de forma que
usuários comuns não podem acessá-las.
Veja as principais views:
Categoria Descrição Views
Sessões e
Processos
Informações sobre sessões ativas e processos em
execução. V$SESSION, V$PROCESS
Locks e
Conflitos
Monitoramento de locks, deadlocks e contenção
de recursos.
V$LOCK,
V$SESSION_BLOCKERS
Memória
(SGA/PGA)
Análise de uso da Shared Pool, Buffer Cache e
outras áreas de memória.
V$SGA, V$PGA_MEMORY,
V$SHARED_POOL_RESERVED
I/O e Storage Estatísticas de leitura/gravação em discos e
tablespaces.
V$FILESTAMP,
V$TEMPFILE
Redo Logs e
Undo
Monitoramento de Redo Logs, Undo Tablespace
e recuperação de transações. V$LOG, V$UNDOSTAT
Otimização e
SQL
Dados sobre execução de queries, estatísticas e
planos de execução. V$SQLAREA, V$SQL
É importante perceber que as views V$ mostram dados da instância em tempo real. As tabelas
DBA_ também possuem informações sobre o gerenciamento do banco de dados, mas lá as
informações são persistentes, sem atualização em tempo real – mas com histórico pra análises de
séries temporais. Por exemplo, V$SQLAREA mostra as queries executadas atualmente, enquanto o
DBA_HIST_SQLSTAT mantém o histórico dessas transações.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
39
67
Views Materializadas
As visões materializadas (MATERIALIZED VIEWS) permitem armazenar fisicamente os resultados de
uma consulta SQL para otimizar o desempenho de consultas repetitivas, reduzir a carga no banco
de dados e possibilitar a sincronização de dados distribuídos.
Diferente das views tradicionais, que são apenas uma representação lógica dos dados e não
armazenam fisicamente os resultados, as visões materializadas persistem os dados gerados pela
consulta, podendo ser atualizadas periodicamente.
As views materializadas trazem:
• Melhoria de desempenho de consulta
• Redução da carga no banco
• Suporte a sincronização de dados
• Entre outros
Criamos uma view pelo comando CREATE MATERIALIZED VIEW nome_da_view. Ainda, podemos
atualizar automaticamente essas visões (ao contrário do que é comumente passado sobre views
materializadas, que elas não “se atualizam). Podemos ter dois tipos de atualização – ou refresh:
• Refresh Completo (COMPLETE REFRESH) – Recalcula toda a visão materializada do zero,
requerendo a leitura completa da tabela da origem. Pode ser mais lento, justamente por
ler a tabela inteira.
• Refresh Incremental (FAST REFRESH) – Atualiza apenas os dados modificados desde o últmo
refresh, usando os logs das views materializadas para identificar as mudanças na tabela
base.
Além disso, as visões podem ser atualizadas em diferentes momentos: ON COMMIT, atualiza quando
ocorre um COMMIT na tabela base; ON DEMAND, que ocorre quando for solicitada manualmente pelo
DBMS_MVIEW.REFRESH; ON SCHEDULE, que define um agendamento, como diário ou mensal. Veja
um exemplo:
Acima, criamos uma atualização incremental, que será feita a cada COMMIT.
SQL
CREATE MATERIALIZED VIEW mv_pedidos
REFRESH FAST ON COMMIT
AS
SELECT id_pedido, data_pedido, valor_total
FROM pedidos;Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
40
67
O gerenciamento das views materializadas é feito pela tabela DBA_MVIEW.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
41
67
==263e72==
SQL Oracle
O SQL no Oracle Database segue o padrão SQL ANSI, mas possui extensões e particularidades
que o diferenciam de outras implementações SQL. Essas diferenças estão presentes na sintaxe,
nos tipos de dados, nos comandos DML e DDL, no controle transacional e nas funções de
agregação.
Além do SQL puro, o Oracle também oferece o PL/SQL (Procedural Language for SQL), uma
extensão procedural do SQL que permite controle de fluxo, variáveis e programação estruturada
diretamente dentro do banco – extensão essa que é vista em uma aula específica para a
linguagem.
Nosso foco é ver algumas diferenças entre o SQL padrão e o empregado dentro do Oracle. A
primeira diferença está no suo da tabela DUAL. Ela é uma tabela especial, usada para executar
funções e expressões que não dependem de uma tabela real. Ela permite executar consultas sem
acessar dados de um esquema específico, sendo amplamente utilizada em cálculos, funções de
data/hora e chamadas a funções do sistema.
A tabela contém apenas uma linha e uma coluna (de nome DUMMY), com um valor fixo ‘X’. O SQL
ANSI não precisa de uma tabela fictícia para executar expressões. Então, por exemplo, enquanto
no SQL ANSI podemos executar SELECT CURRENT_DATE; para retornar a data atual, no Oracle
precisaríamos usar SELECT SYSDATE FROM dual;, com a tabela dual atuando como um “coringa”.
(FGV/TRT 13/2022) No âmbito do Oracle, o termo DUAL refere-se
a) a um objeto que gera valores para auto-incremento automático de valores numéricos.
b) a uma área física (tablespace) padrão previamente criada para cada usuário.
c) a uma tabela automaticamente definida, que contém apenas uma linha.
d) um trigger padrão que é acionado automaticamente nas operações de inserção numa tabela
específica.
e) uma codificação de caracteres (collation) que são representados por dois bytes.
Comentários:
A DUAL é uma tabela automática, com apenas uma coluna e uma linha, servindo para operações
que dependam da existência de alguma tabela. Correta, portanto, a letra C. (Gabarito: Letra C)
Uma segunda diferença, muito explorada em provas, é a abordagem do Oracle quanto ao
tratamento de valores nulos. No padrão ANSI, podemos usar o comando COALESCE ou uma
manipulação do comando CASE para esse tratamento – o COALESCE irá retornar o primeiro valor
não NULL de uma lista, e o CASE irá empregar uma estrutura condicional que pode ser manipulada
para uma lógica mais complexa.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
42
67
O Oracle, além de suportar esses padrões, traz a função NVL(). Ela irá substituir valores NULL por
um valor único. A sintaxe é NVL(coluna, valor_se_null). Veja um exemplo:
(FCC/TJ SC/2021) No Oracle NVL(expr1, expr2) retornará expr2 quando expr1 for nula. Enquanto
a função NVL é específica do Oracle, uma função com certa similaridade retorna a primeira
expressão não nula entre os argumentos fornecidos e pode ser utilizada em outros SGBDs
compatíveis com o padrão ANSI SQL-92. Trata-se da função
a) SWITCH.
b) MERGE.
c) TRUNCATE.
d) PREPARE.
e) COALESCE.
Comentários:
Como vimos, o NVL() acaba substituindo o COALESCE, em questões de funcionalidades similares.
(Gabarito: Letra E)
São várias diferenças e particularidades no SQL Oracle, de forma que fica impossível abordar todas
aqui. Porém, talvez a mais cobrada entre todas as particularidades, é a cláusula SEQUENCE. Ele
permite gerar valores numéricos únicos automaticamente, normalmente usados para gerenciar
chaves primárias (IDs) em tabelas, eliminando necessidades de cálculos manuais de
autoincremento.
A sintaxe padrão do SEQUENCE é:
SQL
SELECT nome, NVL(salario, 0) AS salario_final
FROM funcionarios;Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
43
67
Veja o que cada parâmetro significa:
Categoria Descrição
START WITH Define o primeiro valor da sequência. Valor padrão: 1
INCREMENT BY Define o intervalo entre os valores gerados. Valor padrão: 1
MAXVALUE Define o valor máximo que a sequência pode atingir.
MINVALUE Define o valor mínimo que a sequência pode atingir.
CYCLE Quando atinge o limite (MAXVALUE ou MINVALUE), a sequência
recomeça do início.
NOCYCLE A sequência para de gerar valores ao atingir o limite.
CACHE Armazena valores pré-gerados na memória para melhorar o
desempenho.
NOCACHE Não armazena valores na memória (gera um novo a cada requisição).
ORDER Garante que os valores sejam gerados em ordem exata (usado em
ambientes RAC).
NOORDER Permite que os valores sejam gerados sem seguir estritamente a
ordem.
Em cima dessa sequência, podemos ainda interagir com outras cláusulas, principalmente usando
CURRVAL, para retornar o valor atual, e NEXTVAL, para retornar o próximo valor da sequência.
(FGV/Pref. Niterói/2023) Numa instalação Oracle, considere o script a seguir.
create sequence xxxx;
select xxxx.nextval from dual;
A execução desse script provoca:
SQL
CREATE SEQUENCE nome_da_sequence
START WITH número_inicial
INCREMENT BY incremento
[MAXVALUE valor_max | NOMAXVALUE]
[MINVALUE valor_min | NOMINVALUE]
[CYCLE | NOCYCLE]
[CACHE tamanho_cache | NOCACHE]
[ORDER | NOORDER];Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
44
67
a) a exibição do número 0;
b) a exibição do número 1;
c) a exibição do valor NULL;
d) a exibição dos números de 1 até 1000;
e) um erro, pois não foi criada a tabela dual.
Comentários:
A sintaxe cria uma sequência com os parâmetros padrões – começa com o número 1, e incrementa
os valores em 1 unidade também. O comando XXXX.NEXTVAL seleciona o próximo valor da
sequência – mas, como essa é a primeira execução, iremos retornar o primeiro valor (como se
estivéssemos fora da sequência, e NEXTVAL nos coloca dentro) – retornando o número 1. (Gabarito:
Letra B)Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
45
67
Backup e Recuperação
A gestão de backup e recuperação de dados é uma das tarefas mais importantes na administração
de bancos de dados Oracle. O Oracle fornece múltiplas estratégias de backup, recuperação e
restauração, garantindo a integridade dos dados em caso de falhas, corrupção, exclusões
acidentais ou desastres.
A manutenção da integridade do banco de dados é um dos trabalhos essenciais.
Backups entram em duas situações principais – em desastres, onde se perde a
maior parte da informação armazenada, ou em comandos errados (como um
DELETE sem WHERE), em que é preciso dar rollback para um estado anterior,
muito comum quando DBAs ou desenvolvedores júnior começam a trabalhar rs
O backup é uma cópia dos dados do banco armazenada para recuperação em caso de falhas. O
Oracle suporta diferentes tipos de backup, como incremental, completo, consistente (realizado
quando o banco está desligado) e inconsistente (realizado com o banco de dados aberto).
Para recuperações, é muito comum o uso do Recovery Manager (RMAN). Essa é a ferramenta
oficial da Oracle para backup, restauração e recuperação. Ele substitui backups manuais com
cópias diretas dos arquivos físicos, garantindo mais eficiência, menor espaço e maior velocidade.
Veja um comando para criar um backup, que segue o formato .bkp:
Também podemos usar o Flashback Technology, que permite reverter o banco de dados para um
estado anterior sem a necessidade de restaurar um backup. Isso evita perda de dados por erros
humanos ou transações acidentais. Para isso, recuperamos informações a partir dos Redo Logs,
que vimos anteriormente.
Aqui é comum que usemos a diretiva AS OF ou TO, para retornar a um ponto específico, de acordo
com o tipo de flashback.
Tipo de Flashback Descrição
Flashback Query Permite visualizar dados em um estado passado (AS OF TIMESTAMP).
Flashback Table Restaura uma tabela inteira para um estado anterior.
Flashback Drop Recupera tabelas excluídas (RECYCLEBIN).
Flashback Database Reverte o banco inteiro para um ponto no tempo.
SQL
BACKUP DATABASE FORMAT '/backup/ORCL_%U.bkp';Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
46
67
Veja um exemplo de flashback query, que recuperará o estado do banco para 1h antes da sua
execução:
Agora, para um flashback tabl, recuperando o estado para 2 dias antes da execução do comando:
(CESGRANRIO/DECEA/2009) Que recurso do Oracle 11g permite retornar, a partir de uma
consulta SQL, dados no estado em que se encontravam em determinado momento no passado?
a) active guard
b) flashback
c) recycle bin
d) grid control
e) database replay
Comentários:
Para retornar a determinado momento no passado, usamos o flashback – no caso, estamos usando
a flasbhack query. (Gabarito: Letra B)
SQL
SELECT * FROM pedidos AS OF TIMESTAMP SYSDATE - INTERVAL '1' HOUR;
SQL
FLASHBACK TABLE pedidos TO TIMESTAMP SYSDATE - INTERVAL '2' DAY;Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
47
67
QUESTÕES COMENTADAS
01. (CEBRASPE/TCE AC/2024) Acerca dos níveis de isolamento do Oracle 21C, julgue o item que
se segue.
O nível de isolamento REPEATABLE READ é suscetível ao problema de “fantasmas”, que ocorre
quando novas linhas inseridas por outras transações podem não ser visíveis para a transação atual.
Comentários:
A própria Oracle traz uma tabela interessante correlacionando os níveis de isolamento com os
problemas que eles resolvem. Veja:
Nível de Isolamento Dirty Read Nonrepeatable Read Phantom Read
Read Uncommited Possível Possível Possível
Read Commited Não é possível Possível Possível
Repeatable Read Não é possível Não é possível Possível
Serializable Não é possível Não é possível Não é possível
Quanto aos problemas:
• Dirty Read: Leitura de dados não confirmados (COMMIT), permitindo visualizar alterações
de uma transação que pode ser desfeita.
• Nonrepeatable Read: Uma mesma consulta retorna resultados diferentes dentro da mesma
transação, pois outra transação modificou os dados entre as leituras.
• Phantom Read: Uma transação percebe novas linhas inseridas ou deletadas por outra
transação ao repetir a mesma consulta.
Então, de fato, o REPEATABLE READ (embora não seja aceito pelo Oracle), é um formato que é
suscetível às Phantom Reads. Para removê-las, precisamos partir para o nível Serializable, que é
aceito pelo Oracle.
Gabarito: Certo
02. (CEBRASPE/SEPLAN RR/2024) Julgue o item a seguir a respeito dos conceitos do SGBD
Oracle.
A tabela BDA_SORT _SEGMENT informa a quantidade de espaço destinado para ordenar uma
consulta no SGBD Oracle.
Comentários:Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
48
67
Errado! O nome correto da view utilizada para monitorar o espaço alocado para ordenação de
consultas no Oracle é V$SORT_SEGMENT.
Quando operações de ORDER BY, GROUP BY, DISTINCT e JOINS exigem mais memória do que
o disponível na PGA, elas utilizam a Temporary Tablespace para armazenar os dados temporários.
O espaço utilizado para essas operações pode ser monitorado na view V$SORT_SEGMENT, que
exibe estatísticas sobre o uso de segmentos temporários durante ordenações e operações de
classificação.
Gabarito: Errado
03. (QUADRIX/CRN 8/2024) No SGBD Oracle, o comando alter table nutricionista add
constraint nutricionista_fk foreign key (area_id) references area (area_id); tem
como objetivo
a) inserir um novo campo na tabela nutricionista, o campo area_id.
b) adicionar uma chave primária na tabela area.
c) adicionar uma chave estrangeira na tabela area.
d) adicionar uma chave estrangeira na tabela nutricionista.
e) adicionar uma chave primária na tabela nutricionista.
Comentários:
Sintaxe tranquila, adicionando uma constraint de chave estrangeira (foreign key) no atributo
area_id, na tabela nutricionista. Ele referencia area_id na tabela area.
Gabarito: Letra D
04. (FGV/TJ AP/2024) João, administrador de Banco de Dados Oracle, deverá criar índices para
melhorar o desempenho de consultas complexas sobre processos judiciais.
Para isso, deverá escolher a estrutura que facilita a busca rápida de informações em operações de
junção e intervalo, como:
SELECT parte.nome, movimento.descricao,
movimento.data
FROM parte
JOIN movimento ON parte.processoID = movimento.processoID
WHERE parte.processoID BETWEEN 10 AND 20;
Para tanto, João criou um índice específico na coluna “processoID” da tabela “movimento”:Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
49
67
CREATE INDEX idx_movimento_processoID ON movimento(processoID);
Após a execução do script apresentado, o tipo de índice criado por João é:
a) bitmap;
b) hashing;
c) espacial;
d) árvore B;
e) sequencial.
Comentários:
A sintaxe apresenta a criação de um índice na tabela movimento, a partir da coluna processoID.
Acontece que não temos nenhuma especificação do tipo de índice que vai ser usado – então, por
padrão, usamos o índice Árvore B no Oracle.
Gabarito: Letra D
05. (FGV/TJ AP/2024) João, administrador de banco de dados, deverá configurar a inicialização
de uma instância do Banco de Dados Oracle. Para isso, deverá considerar que somente poderá
executar o “shutdown” da instância após o “rollback” das transações não submetidas a “commit”.
Para tanto, como João não precisa aguardar a conclusão de todas as transações, ele deverá
executar o modo de “shutdown”:
a) abort;
b) mount;
c) nomount;
d) immediate;
e) transactional.
Comentários:
A questão quer um shutdown que realize rollback automático das transações que não estão
submetidas a nenhum COMMIT no momento, não exija aguardar a finalização manual das
transações e permita o encerramento imediato da instância. Vamos ver que alternativa se alinha.
a) Errado. O ABORT desliga o banco imediatamente, sem rollback das transações ativas.
b) Errado. Não é um tipo de shutdown.
c) Errado. Não é um tipo de shutdown.
d) Certo. O IMMEDIATE desconecta todos os usuários imediatamente, e realiza o rollbakc
automático das transações sem COMMIT, se alinhando ao requisitado pela questão.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
50
67
e) Errado. O TRANSACTIONAL não força o rollback imediato, permitindo que todas as
transações terminem – o que elimina a necessidade do rollback.
Portanto, correta a letra D.
Gabarito: Letra D
06. (VUNESP/Pref. Santo André/2024) Considerando o Sistema Gerenciador de Bancos de Dados
Oracle 12c, o comando para criar um Tablespace denominado abc, com o Datafile abc01.dbf, com
um tamanho inicial de 200 KB, sendo extensível em parcelas de 100 KB, com um máximo de 50
MB é:
(A) CREATE TABLESPACE abc
DATAFILE abc01.dbf 200K
STEP 100K UNTIL 50M;
(B) CREATE TABLESPACE abc
DATAFILE abc01.dbf BEGIN 200K
PLUS 100K MAX 50M;
(C) CREATE TABLESPACE abc
DATAFILE abc01.dbf START FROM 200K
EXTEND 100K UNTIL MAX 50M;
(D) CREATE TABLESPACE abc
DATAFILE abc01.dbf SIZE 200K REUSE
AUTOEXTEND ON NEXT 100K MAXSIZE 50M;
(E) CREATE TABLESPACE abc
DATAFILE abc01.dbf FROM 200K + 100K
MAXSIZE 50M;
Comentários:
A criação é padrão para todas as alternativas, o que difere é a forma de criar o autoextend:
• Ligar o autoextend → AUTOEXTEND ON.
• Definir o tamanho de extensão em 100K → NEXT 100K
• Definir o tamanho máximo como 50MB → MAXSIZE 50MB
A alternativa que traz essas 3 definições é a letra D.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
51
67
Gabarito: Letra D
07. (FGV/TJ MS/2024) João pretende enriquecer a documentação do banco de dados registrando
o propósito das tabelas e as descrições de suas colunas. Isso é crucial para facilitar a compreensão
e a manutenção do seu esquema.
Para tanto, o comando em Oracle que ele deverá usar para alcançar seu objetivo, em relação à
tabela “Processo”, é:
a) DESCRIBE Processo IS ‘Esta tabela armazena informações sobre processos judiciais.’;
b) SHOW TABLE Processo IS ‘Esta tabela armazena informações sobre processos judiciais.’;
c) ALTER TABLE Processo (‘Esta tabela armazena informações sobre processos judiciais.’);
d) COMMENT ON TABLE Processo IS ‘Esta tabela armazena informações sobre processos
judiciais.’;
e) INSERT INTO Processo VALUES (‘Propósito’, ‘Esta tabela armazena informações sobre
processos judiciais.’);
Comentários:
O comando correto no Oracle para adicionar descrições a tabelas e colunas é COMMENT ON TABLE
ou COMMENT ON COLUMN. O comentário fica armazenado na view DBA_TAB_COMMENTS para tabelas
e em DBA_COL_COMMENTS para colunas.
Gabarito: Letra D
08. (FGV/Pref. Caraguatatuba/2024) Um aspecto importante do ajuste de desempenho do sistema
de banco de dados é o ajuste do SQL.
O mecanismo do SQL Tuning Advisor, da ORACLE, que é usado para resolver problemas
relacionados a instruções SQL com desempenho abaixo do ideal, funciona da seguinte forma:
a) o processamento demanda privilégios administrativos do Oracle Database e ocorre
empregando uma ou mais instruções SQL ou um STS (SQL Tuning Set) como entrada e
chama o Otimizador de Ajuste Automático para analisar as instruções.
b) em bancos de dados gerenciados o hub de desempenho é compatível com todas as versões
do Oracle Database e as recomendações de ajuste incluem coleta de estatísticas de objetos
e criação de índices.
c) as recomendações de ajuste incluem reescrita de instruções SQL e criação de perfis SQL e
elaboração de um conjunto de ajustes SQL, que representa um objeto de banco de dados
que serve como um mecanismo para coletar, manter e acessar dados de carga de trabalho
SQL para monitoramento e ajuste do desempenho de SQL.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
52
67
d) as recomendações de ajuste incluem criação de linhas de base do plano SQL e seu
processamento demanda privilégios de acesso exclusivo por common roles do Oracle
Database.
e) a saída do processamento é feita na forma de predições e análises lógicas de decisão,
juntamente com uma justificativa para cada análise e seu benefício esperado.
Comentários:
O SQL Tuning Advisor identifica problemas de desempenho em queries SQL e indica otimizações
possíveis. Com isso em mente, vamos analisar as alternativas.
a) Certo. O SQL Tuning Advisor exige privilégios administrativos para execução e pode
analisar tanto instruções SQL individuais quanto um SQL Tuning Set (STS), utilizando o
Otimizador de Ajuste Automático para gerar recomendações de otimização.
b) Errado. O hub de desempenho não é compatível com todas as versões do Oracle Database,
já que algumas funcionalidades avançadas do SQL Tuning Advisor estão disponíveis apenas
em edições mais recentes. Além disso, embora a coleta de estatísticas e a criação de índices
sejam sugestões comuns, não são as únicas recomendações feitas pelo SQL Tuning Advisor.
c) Errado. O SQL Tuning Advisor pode sugerir reescrita de instruções SQL, criação de perfis
SQL (SQL Profiles) e a elaboração de um SQL Tuning Set (STS). O STS permite coletar,
armazenar e monitorar consultas SQL para análise de desempenho e ajustes futuros, sendo
uma ferramenta essencial para otimização.
d) Errado. A criação de linhas de base do plano SQL (SQL Plan Baselines) não é parte do SQL
Tuning Advisor, mas sim do SQL Plan Management (SPM), que é uma funcionalidade
diferente do Oracle Database. Além disso, o SQL Tuning Advisor não exige que o
processamento seja feito exclusivamente por common roles, podendo ser executado por
usuários com privilégios apropriados.
e) Errado. O SQL Tuning Advisor não gera apenas predições e análises lógicas, mas fornece
recomendações concretas, como reescrita de consultas, criação de índices e ajustes de
estatísticas, junto com uma justificativa e impacto esperado de cada ação recomendada.
Portanto, correta a letra A.
Gabarito: Letra A
09. (VUNESP/TCM SP/2023) O sistema gerenciador de bancos de dados Oracle 12c implementa
o conceito de visões materializadas (materialized views), sendo correto afirmar que
a) uma vez criada uma visão materializada, ela não é mais atualizada.
b) uma visão materializada é destruída quando houver reinicialização da base de dados.
c) seus métodos de atualização (refresh) são denominados completo e incremental.
d) uma visão materializada não consome espaço de armazenamento.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
53
67
e) uma visão materializada não pode acessar mais do que três atributos de uma tabela.
Comentários:
As views materializadas armazenam fisicamente os resultados de uma consulta, otimizando sua
execução. Vamos ver que alternativa está correta.
a) Errado. Uma visão materializada pode ser atualizada periodicamente, manualmente ou
automaticamente, por meio dos métodos de refresh. O Oracle permite que essas
atualizações ocorram de acordo com a necessidade do usuário, tornando essa afirmação
incorreta.
b) Errado. As visões materializadas não são destruídas com a reinicialização do banco de
dados. Elas são armazenadas fisicamente como tabelas e permanecem disponíveis até que
sejam explicitamente removidas usando DROP MATERIALIZED VIEW.
c) Certo. O Oracle fornece duas formas de atualização, o COMPLETE REFRESH, onde a View é
recalculada inteiramente a partir da consulta base, ou a FAST REFRESH (incremental), onde
apenas os dados alterados desde o último refresh são atualizados.
d) Errado. Diferente das views comuns, que apenas armazenam a consulta e não os dados, as
visões materializadas ocupam espaço de armazenamento, pois os resultados da consulta
são fisicamente persistidos no banco de dados.
e) Errado. Não há limitação quanto ao número de atributos que podem ser acessados em uma
visão materializada. Elas podem conter qualquer número de colunas e unir múltiplas
tabelas.
Portanto, correta a letra C.
Gabarito: Letra C
10. (FCC/TRT 18/2023) Considerando um banco de dados Oracle 19 aberto e funcionando em
condições ideais, uma Analista foi solicitada a remover o tablespace tbs_trt18a, eliminando todas
as restrições de integridade referencial que se referem às chaves primárias e únicas dentro
de tbs_trt18a. Tendo os privilégios para tal ação, ela utilizou o comando:
a) DROP TABLESPACE tbs_trt18a REMOVING CONSTRAINTS KEEPING CONTENTS AND
DATAFILES;
b) DELETE TABLESPACE tbs_trt18a INCLUDING CONTENTS AND CONSTRAINTS;
c) DROP TABLESPACE tbs_trt18a WITH CONTENTS AND CONSTRAINTS ON CASCADE;
d) DROP TABLESPACE tbs_trt18a INCLUDING CONTENTS CASCADE CONSTRAINTS;
e) DELETE TABLESPACE tbs_trt18a ADDING CONTENTS ON CASCADE CONSTRAINTS;
Comentários:Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
54
67
Vamos analisar as alternativas.
a) Errado. O comando DROP TABLESPACE existe no Oracle, mas não há cláusula REMOVING
CONSTRAINTS nem KEEPING CONTENTS AND DATAFILES.
b) Errado. Não existe DELETE TABLESPACE.
c) Errado. O comando WITH CONTENTS AND CONSTRAINTS ON CASCADE não existe no Oracle.
A sintaxe correta para remover constraints é CASCADE CONSTRAINTS.
d) Certo. Esse é o comando correta para remover a tablespace e as constraints associadas a
ele.
e) Errado. Não existe DELETE TABLESPACE.
Portanto, correta a letra D.
Gabarito: Letra D
11. (CEBRASPE/EMPREL/2023) A arquitetura de banco de dados relacional, como o Oracle, é um
modelo de organização de dados que se baseia em tabelas estruturadas. Nesse contexto, assinale
a opção que apresenta a denominação correta de uma coluna ou um conjunto de colunas que
identifica exclusivamente cada linha em uma tabela e garante a unicidade e a integridade dos
dados.
a) relacionamentos
b) índices
c) álgebra relacional
d) chave primária
e) diagrama de entidade-relacionamento (DER)
Comentários:
Embora a questão “explore” o Oracle, usando-o como exemplo, é tranquilo respondê-la apenas
com conhecimentos básicos de bancos de dados. A coluna (ou conjunto de colunas) que identifica
unicamente cada registro em uma tabela é chamada de chave primária.
Gabarito: Letra D
12. (CEBRASPE/DPE RO/2022) O utilitário Explain Plan
a) é criado pegando-se uma string de qualquer comprimento e codificando-a em uma
impressão digital de 128 bits.
b) serve para criar uma expressão da álgebra relacional.
c) relata a maneira como uma consulta usa os índices do banco de dados.
d) deve executar o SQL para determinar o tamanho do resultado.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
55
67
e) cria os índices necessários para executar uma consulta.
Comentários:
O EXPLAIN PLAN é utilizado para analisar como o Oracle executará uma consulta SQL, mostrando
a estratégia de acesso escolhida pelo otimizador de consultas. Vamos analisar as alternativas.
a) Errado. A descrição se aproxima mais à criptografia, não ao EXPLAIN PLAN.
b) Errado. O EXPLAIN não gera expressões de álgebra relacional, apenas um plano de
execução da query.
c) Certo. O EXPLAIN PLAN mostra se um índice será utilizado, se haverá Full Table Scan, Joins,
Sorts, entre outras informações relevantes para otimização da query.
d) Errado. O EXPLAIN PLAN não executa a consulta, apenas gera um plano teórico de
execução.
e) Errado. O EXPLAIN PLAN não cria índices. Ele apenas informa se um índice existente será
utilizado.
Portanto, correta a letra C.
Gabarito: Letra C
13. (CEBRASPE/TELEBRAS/2022) Julgue o seguinte item, pertinentes a bancos de dados.
Em um SGBD Oracle, as tabelas e suas visões (views) do banco de dados são armazenadas
localmente em arquivos físicos que são denominados de tablespace.
Comentários:
Lembre-se, as tablespaces são espaços de armazenamento lógico, não físico. Quando falamos em
espaço físico, ainda que se trate de uma View, seu armazenamento é feito nos datafiles – e não
nas tablespaces.
Gabarito: Errado
14. (CEBRASPE/PGE RJ/2022) No que diz respeito aos sistemas gerenciadores de banco de dados
(SGBD) Oracle 21C e MySQL, julgue o item.
O comando RMAN> SHUTDOWN IMMEDIATE; não pode ser executado no Oracle, pois a
operação de desligar o banco de dados somente é permitida por meio do SQL PLUS.
Comentários:Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
56
67
O item está incorreto. É possível fazer tanto o desligamento através do SQL PLUS (que é o SQL
do Oracle), quanto através do RMAN, o Recovery Manager – que permite a execução de vários
comandos administrativos, como o STARTUP e SHUTDOWN.
Gabarito: Errado
15. (CEBRASPE/PGE RJ/2022) No que diz respeito aos sistemas gerenciadores de banco de dados
(SGBD) Oracle 21C e MySQL, julgue o item.
Com a view V$SYSMETRIC do SGBD Oracle, é possível exibir a porcentagem de tempo usada pela
CPU em relação ao tempo total do banco de dados.
Comentários:
Aqui é uma questãozinha chata, afinal temos uma infinidade de views que permitem analisar
diferentes valores – sugiro que siga pela literalidade do nome, ela costuma indicar bastante coisa.
No nosso caso, a V$SYSMETRIC aponta as métricas de sistema, em intervalos de 1 ou 15 minutos.
Dentre as métricas, temos a "Database CPU Time Ratio", que indica a porcentagem do tempo
total de processamento do banco usada pela CPU. Portanto, correto o item.
Gabarito: Certo
16. (CEBRASPE/PC PB/2022) A vista (view) de dicionário de dados da Oracle que se pode consultar
para encontrar as colunas de chave primária de tabelas é
a) DBA_APPLY.
b) DBA_RULE.
c) DBA_TABLES.
d) DBA_SQLSET.
e) DBA_CONSTRAINTS.
Comentários:
Outra questão que explora uma das 380 tabelas DBA_, um pouco irrazoável, mas vamos lá... No
Oracle, as restrições de chave primária são armazenadas como constraints (CONSTRAINT_TYPE =
'P'), dentro da view DBA_CONSTRAINTS. Meu conselho quanto às views é seguir pela literalidade
do nome da tabela/v$,
Gabarito: Letra E
17. (CEBRASPE/ME/2020) Com relação ao sistema gerenciador de banco de dados Oracle, julgue
o próximo item.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
57
67
Um banco de dados executado em modo de ARCHIVELOG permite que arquivos de redo
log atualizem, em tempo real, banco de dados em formato active.
Comentários:
O item está errado. O modo ARCHIVELOG instrui o Oracle a salvar uma cópia dos redo logs antes
de serem sobrescritos, garantindo a possibilidade de recuperação ponto-a-ponto (point-in-time
recovery) em caso de falha. Porém, os redo logs não atualizam automaticamente um banco de
dados ativo. Eles apenas armazenam todas as transações confirmadas (COMMIT) para permitir a
reconstrução do banco após falhas.
Gabarito: Errado
18. (CEBRASPE/ME/2020) Com relação ao sistema gerenciador de banco de dados Oracle, julgue
o próximo item.
Arquivos de controle possuem formato texto plano, que registra toda a estrutura lógica do banco
de dados; sem eles, o banco pode ser montado, mas não pode ser recuperado em caso de
incidente.
Comentários:
Os arquivos de controle armazenam informações críticas, incluindo a estrutura física, sequência de
redo logs, configuração de modo ARCHIVELOG, entre outros. Eles são arquivos binários, não
arquivos de texto plano, armazenados no disco e protegidos pelo Oracle. Portanto, errado o item.
Gabarito: Errado
19. (CEBRASPE/PC DF/2025) Julgue o item a seguir, a respeito de Oracle e de MySQL.
No Oracle, gatilhos podem invocar procedimentos armazenados.
Comentários:
Uma questão que não exige necessariamente o conhecimento de Oracle – basta o conhecimento
básico de modelo relacional que é possível responder à questão. Os triggers são espécies de
procedimentos armazenados, disparados automaticamente, podendo inclusive chamar outro
procedimento armazenado, o que é uma abordagem bem comum.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
58
67
==263e72==
Portanto, correto o item.
Gabarito: Certo
20. (CEBRASPE/PC DF/2025) A respeito de arquitetura, segurança, integridade, concorrência,
recuperação após falhas e gerenciamento de transições em sistemas de gerenciamento de banco
de dados (SGDB), julgue o item a seguir.
Em um ambiente Oracle, a implementação de controle de concorrência por meio de isolamento
de transações, combinada ao uso de backups incrementais e de log de redo, é suficiente para
garantir a integridade e a recuperação completa dos dados após falha inesperada.
Comentários:
A banca considerou o item correto – mas discordo veemente. O isolamento de transações,
backups incrementais e redo logs são fundamentais para integridade e recuperação de dados,
mas podem não ser suficientes para todos os cenários de falha. O Oracle implementa vários outros
controles para garantir a integridade do banco de dados, como o MVCC, control files, data guard,
flashback technoogy, RMAN, entre outros. Reduzir a integridade a apenas backups e redu logs é,
no mínimo, superficial e incorreto.
Gabarito da Banca: Certo
Gabarito do Professor: ErradoEmannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
59
67
LISTA DE QUESTÕES
01. (CEBRASPE/TCE AC/2024) Acerca dos níveis de isolamento do Oracle 21C, julgue o item que
se segue.
O nível de isolamento REPEATABLE READ é suscetível ao problema de “fantasmas”, que ocorre
quando novas linhas inseridas por outras transações podem não ser visíveis para a transação atual.
02. (CEBRASPE/SEPLAN RR/2024) Julgue o item a seguir a respeito dos conceitos do SGBD
Oracle.
A tabela BDA_SORT _SEGMENT informa a quantidade de espaço destinado para ordenar uma
consulta no SGBD Oracle.
03. (QUADRIX/CRN 8/2024) No SGBD Oracle, o comando alter table nutricionista add
constraint nutricionista_fk foreign key (area_id) references area (area_id); tem
como objetivo
a) inserir um novo campo na tabela nutricionista, o campo area_id.
b) adicionar uma chave primária na tabela area.
c) adicionar uma chave estrangeira na tabela area.
d) adicionar uma chave estrangeira na tabela nutricionista.
e) adicionar uma chave primária na tabela nutricionista.
04. (FGV/TJ AP/2024) João, administrador de Banco de Dados Oracle, deverá criar índices para
melhorar o desempenho de consultas complexas sobre processos judiciais.
Para isso, deverá escolher a estrutura que facilita a busca rápida de informações em operações de
junção e intervalo, como:
SELECT parte.nome, movimento.descricao,
movimento.data
FROM parte
JOIN movimento ON parte.processoID = movimento.processoID
WHERE parte.processoID BETWEEN 10 AND 20;
Para tanto, João criou um índice específico na coluna “processoID” da tabela “movimento”:
CREATE INDEX idx_movimento_processoID ON movimento(processoID);
Após a execução do script apresentado, o tipo de índice criado por João é:Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
60
67
a) bitmap;
b) hashing;
c) espacial;
d) árvore B;
e) sequencial.
05. (FGV/TJ AP/2024) João, administrador de banco de dados, deverá configurar a inicialização
de uma instância do Banco de Dados Oracle. Para isso, deverá considerar que somente poderá
executar o “shutdown” da instância após o “rollback” das transações não submetidas a “commit”.
Para tanto, como João não precisa aguardar a conclusão de todas as transações, ele deverá
executar o modo de “shutdown”:
a) abort;
b) mount;
c) nomount;
d) immediate;
e) transactional.
06. (VUNESP/Pref. Santo André/2024) Considerando o Sistema Gerenciador de Bancos de Dados
Oracle 12c, o comando para criar um Tablespace denominado abc, com o Datafile abc01.dbf, com
um tamanho inicial de 200 KB, sendo extensível em parcelas de 100 KB, com um máximo de 50
MB é:
(A) CREATE TABLESPACE abc
DATAFILE abc01.dbf 200K
STEP 100K UNTIL 50M;
(B) CREATE TABLESPACE abc
DATAFILE abc01.dbf BEGIN 200K
PLUS 100K MAX 50M;
(C) CREATE TABLESPACE abc
DATAFILE abc01.dbf START FROM 200K
EXTEND 100K UNTIL MAX 50M;
(D) CREATE TABLESPACE abc
DATAFILE abc01.dbf SIZE 200K REUSE
AUTOEXTEND ON NEXT 100K MAXSIZE 50M;
(E) CREATE TABLESPACE abc
DATAFILE abc01.dbf FROM 200K + 100KEmannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
61
67
MAXSIZE 50M;
07. (FGV/TJ MS/2024) João pretende enriquecer a documentação do banco de dados registrando
o propósito das tabelas e as descrições de suas colunas. Isso é crucial para facilitar a compreensão
e a manutenção do seu esquema.
Para tanto, o comando em Oracle que ele deverá usar para alcançar seu objetivo, em relação à
tabela “Processo”, é:
a) DESCRIBE Processo IS ‘Esta tabela armazena informações sobre processos judiciais.’;
b) SHOW TABLE Processo IS ‘Esta tabela armazena informações sobre processos judiciais.’;
c) ALTER TABLE Processo (‘Esta tabela armazena informações sobre processos judiciais.’);
d) COMMENT ON TABLE Processo IS ‘Esta tabela armazena informações sobre processos
judiciais.’;
e) INSERT INTO Processo VALUES (‘Propósito’, ‘Esta tabela armazena informações sobre
processos judiciais.’);
08. (FGV/Pref. Caraguatatuba/2024) Um aspecto importante do ajuste de desempenho do sistema
de banco de dados é o ajuste do SQL.
O mecanismo do SQL Tuning Advisor, da ORACLE, que é usado para resolver problemas
relacionados a instruções SQL com desempenho abaixo do ideal, funciona da seguinte forma:
a) o processamento demanda privilégios administrativos do Oracle Database e ocorre
empregando uma ou mais instruções SQL ou um STS (SQL Tuning Set) como entrada e
chama o Otimizador de Ajuste Automático para analisar as instruções.
b) em bancos de dados gerenciados o hub de desempenho é compatível com todas as versões
do Oracle Database e as recomendações de ajuste incluem coleta de estatísticas de objetos
e criação de índices.
c) as recomendações de ajuste incluem reescrita de instruções SQL e criação de perfis SQL e
elaboração de um conjunto de ajustes SQL, que representa um objeto de banco de dados
que serve como um mecanismo para coletar, manter e acessar dados de carga de trabalho
SQL para monitoramento e ajuste do desempenho de SQL.
d) as recomendações de ajuste incluem criação de linhas de base do plano SQL e seu
processamento demanda privilégios de acesso exclusivo por common roles do Oracle
Database.
e) a saída do processamento é feita na forma de predições e análises lógicas de decisão,
juntamente com uma justificativa para cada análise e seu benefício esperado.
09. (VUNESP/TCM SP/2023) O sistema gerenciador de bancos de dados Oracle 12c implementa
o conceito de visões materializadas (materialized views), sendo correto afirmar queEmannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
62
67
==263e72==
a) uma vez criada uma visão materializada, ela não é mais atualizada.
b) uma visão materializada é destruída quando houver reinicialização da base de dados.
c) seus métodos de atualização (refresh) são denominados completo e incremental.
d) uma visão materializada não consome espaço de armazenamento.
e) uma visão materializada não pode acessar mais do que três atributos de uma tabela.
10. (FCC/TRT 18/2023) Considerando um banco de dados Oracle 19 aberto e funcionando em
condições ideais, uma Analista foi solicitada a remover o tablespace tbs_trt18a, eliminando todas
as restrições de integridade referencial que se referem às chaves primárias e únicas dentro
de tbs_trt18a. Tendo os privilégios para tal ação, ela utilizou o comando:
a) DROP TABLESPACE tbs_trt18a REMOVING CONSTRAINTS KEEPING CONTENTS AND
DATAFILES;
b) DELETE TABLESPACE tbs_trt18a INCLUDING CONTENTS AND CONSTRAINTS;
c) DROP TABLESPACE tbs_trt18a WITH CONTENTS AND CONSTRAINTS ON CASCADE;
d) DROP TABLESPACE tbs_trt18a INCLUDING CONTENTS CASCADE CONSTRAINTS;
e) DELETE TABLESPACE tbs_trt18a ADDING CONTENTS ON CASCADE CONSTRAINTS;
11. (CEBRASPE/EMPREL/2023) A arquitetura de banco de dados relacional, como o Oracle, é um
modelo de organização de dados que se baseia em tabelas estruturadas. Nesse contexto, assinale
a opção que apresenta a denominação correta de uma coluna ou um conjunto de colunas que
identifica exclusivamente cada linha em uma tabela e garante a unicidade e a integridade dos
dados.
a) relacionamentos
b) índices
c) álgebra relacional
d) chave primária
e) diagrama de entidade-relacionamento (DER)
12. (CEBRASPE/DPE RO/2022) O utilitário Explain Plan
a) é criado pegando-se uma string de qualquer comprimento e codificando-a em uma
impressão digital de 128 bits.
b) serve para criar uma expressão da álgebra relacional.
c) relata a maneira como uma consulta usa os índices do banco de dados.
d) deve executar o SQL para determinar o tamanho do resultado.
e) cria os índices necessários para executar uma consulta.
13. (CEBRASPE/TELEBRAS/2022) Julgue o seguinte item, pertinentes a bancos de dados.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
63
67
Em um SGBD Oracle, as tabelas e suas visões (views) do banco de dados são armazenadas
localmente em arquivos físicos que são denominados de tablespace.
14. (CEBRASPE/PGE RJ/2022) No que diz respeito aos sistemas gerenciadores de banco de dados
(SGBD) Oracle 21C e MySQL, julgue o item.
O comando RMAN> SHUTDOWN IMMEDIATE; não pode ser executado no Oracle, pois a
operação de desligar o banco de dados somente é permitida por meio do SQL PLUS.
15. (CEBRASPE/PGE RJ/2022) No que diz respeito aos sistemas gerenciadores de banco de dados
(SGBD) Oracle 21C e MySQL, julgue o item.
Com a view V$SYSMETRIC do SGBD Oracle, é possível exibir a porcentagem de tempo usada pela
CPU em relação ao tempo total do banco de dados.
16. (CEBRASPE/PC PB/2022) A vista (view) de dicionário de dados da Oracle que se pode consultar
para encontrar as colunas de chave primária de tabelas é
a) DBA_APPLY.
b) DBA_RULE.
c) DBA_TABLES.
d) DBA_SQLSET.
e) DBA_CONSTRAINTS.
17. (CEBRASPE/ME/2020) Com relação ao sistema gerenciador de banco de dados Oracle, julgue
o próximo item.
Um banco de dados executado em modo de ARCHIVELOG permite que arquivos de redo
log atualizem, em tempo real, banco de dados em formato active.
18. (CEBRASPE/ME/2020) Com relação ao sistema gerenciador de banco de dados Oracle, julgue
o próximo item.
Arquivos de controle possuem formato texto plano, que registra toda a estrutura lógica do banco
de dados; sem eles, o banco pode ser montado, mas não pode ser recuperado em caso de
incidente.
19. (CEBRASPE/PC DF/2025) Julgue o item a seguir, a respeito de Oracle e de MySQL.
No Oracle, gatilhos podem invocar procedimentos armazenados.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
64
67
20. (CEBRASPE/PC DF/2025) A respeito de arquitetura, segurança, integridade, concorrência,
recuperação após falhas e gerenciamento de transições em sistemas de gerenciamento de banco
de dados (SGDB), julgue o item a seguir.
Em um ambiente Oracle, a implementação de controle de concorrência por meio de isolamento
de transações, combinada ao uso de backups incrementais e de log de redo, é suficiente para
garantir a integridade e a recuperação completa dos dados após falha inesperada.Emannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
65
67
GABARITO
1. Certo
2. Errado
3. Letra D
4. Letra D
5. Letra D
6. Letra D
7. Letra D
8. Letra A
9. Letra C
10. Letra D
11. Letra D
12. Letra C
13. Errado
14. Errado
15. Certo
16. Letra E
17. Errado
18. Errado
19. Certo
20. CertoEmannuelle Gouveia Rolim, Felipe Mathias
Aula 03 (Prof. Felipe Mathias e Emannuelle Gouveia)
TCU (Auditor de Controle Externo - Tecnologia da Informação) Banco de Dados - 2025 (Pós-Edital)
www.estrategiaconcursos.com.br
05490709405 - Lorenna Siza
66
67
