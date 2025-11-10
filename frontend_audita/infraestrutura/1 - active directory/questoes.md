# Infraestrutura

## Active Directory

### 1

**Ano:** 2011  
**Banca:** FCC  
**Prova:** TRT 14 – Técnico Judiciário TI  
**Tipo:** múltipla escolha  

**Enunciado:**  
Os elementos que definem as permissões de **controle de acesso** sobre os objetos no Active Directory incluem

a) apenas autenticação do usuário.
b) apenas descritores de segurança e herança de objetos.
c) apenas herança de objetos e autenticação do usuário.
d) apenas descritores de segurança e autenticação do usuário.
e) descritores de segurança, herança de objetos e autenticação do usuário.

Resposta: e

Justificativa: O controle de acesso no Active Directory é definido por três elementos principais: descritores de segurança (que contêm as listas de controle de acesso, ACLs), herança de objetos (que permite a propagação de permissões em hierarquias) e autenticação do usuário (para validar a identidade antes de aplicar as permissões).

### 2

**Ano:** 2011  
**Banca:** CONSULPLAN  
**Prova:** COFEN – Programador
**Tipo:** múltipla escolha  

**Enunciado:**
Qual dos componentes a seguir NÃO faz parte da estrutura lógica do Active Directory no Windows Server?

a) Objects.
b) Organizational Units.
c) Domain Forests.
d) Domains.
e) Forests.

Resposta: c

Justificativa: A estrutura lógica do AD inclui objetos, unidades organizacionais (OUs), domínios e florestas. Não existe o termo Domain Forests, pois “forest” já é o conjunto de domínios. A alternativa combina incorretamente os termos. 

### 3

**Ano:** 2014  
**Banca:** UNIRIO  
**Prova:** Analista Tecnologia da Informação - Rede de Computadores
**Tipo:** múltipla escolha  

**Enunciado:**
Active Directory está relacionado aos itens a seguir, EXCETO:

a) Catálogo global.
b) implementação de serviço de diretório no protocolo DHCP.
c) Distribuição de Software Automática.
d) Gerenciamento centralizado.
e) Replicação automática.

Resposta: b

Justificativa: O Active Directory utiliza LDAP e Kerberos, não o DHCP, que é um serviço de configuração dinâmica de endereços IP. Logo, o AD não é implementado sobre DHCP.

### 4

**Ano:** 2015  
**Banca:** CESPE  
**Prova:** MEC - Administrador de Rede
**Tipo:** v ou f

Julgue o item que se segue, relativo a Active Directory, IIS e Terminal Service. 
Um formato conhecido como um Active Directory com menos recursos é o AD LDS ou Active Directory Lightweight Directory Services.

Resposta: Verdadeiro.
Justificativa:
O AD LDS (Active Directory Lightweight Directory Services) é de fato uma versão “leve” do AD DS, que fornece funcionalidades de diretório sem depender de domínios ou controladores de domínio.

### 5

**Ano:** 2016  
**Banca:** Makiyama  
**Prova:** Prefeitura de Salgueiro/PE - Auxiliar de Enfermagem
**Tipo:** múltipla escolha  

**Enunciado:**
O Active Directory (AD) do Windows

a) somente pode ser utilizado no sistema de arquivos FAT32.
b) pode ser utilizado no sistema de arquivos FAT32 ou ExFAT.
c) somente pode ser utilizado no sistema de arquivos NTFS.
d) pode ser utilizado no sistema de arquivos FAT32 ou NTFS.

Resposta: c

Justificativa:
O Active Directory requer NTFS, pois depende de recursos de segurança e permissões de arquivos que não estão disponíveis no FAT32 ou ExFAT.

### 6

**Ano:** 2017  
**Banca:** FCC  
**Prova:** TRF - 5ª Região - Técnico Judiciário - Informática
**Tipo:** múltipla escolha  

**Enunciado:**
O Active Directory − AD
a) tem um banco de dados denominado NTDS.dit e está localizado na pasta %SystemAD%\NTDS\ntds.dit em uma instalação default do AD. O diretório NTDS existirá em todos os servidores, independentemente de terem a função de Domain Controllers.
b) ao ser instalado, cria 5 arquivos: 1) Ntds.dit, banco de dados do AD; 2) Edb.log, armazena todas as transações feitas no AD; 3) Edb.chk, controla transações no arquivo Edb.log já foram commited em Ntds.dit; 4) Res1.log, arquivo de reserva; 5) Res2.log, arquivo de reserva.
c) pode ter um ou mais servidores com a função de Domain Controller − DC. Em um AD com três DCs, por exemplo, somente o DC-raiz é atualizado com todos os dados do AD. Esta operação recebe o nome de replicação do Active Directory.
d) pode ter Operational Units − OUs. As OUs podem ser classificadas de 3
formas diferentes: 1) Geográfica, as OUs representam Estados ou Cidades; 2)
Setorial, as OUs representam setores ou unidades de negócio da estrutura da
empresa; 3) Departamental, as OUs representam departamentos da empresa.
e) pode ter um ou dois domínios. O 2º domínio é denominado domínio-filho.
O conjunto domínio-pai com seu domínio-filho é chamado de floresta, pois o
domínio-filho pode ter vários ramos chamados de subdomínios.

Resposta: b

Justificativa:
Esses arquivos são gerados pelo AD: o NTDS.dit é o banco de dados, Edb.log registra transações, Edb.chk controla o ponto de gravação e Res1/Res2.log são logs de reserva.
a) Está errada pois é necessário ser um Domain Controllers.
c) A replicação no Active Directory é multimaster, ou seja, todos os controladores de domínio (DCs) possuem cópias equivalentes do banco de dados e podem receber atualizações, que são então replicadas automaticamente entre eles. Não existe um “DC-raiz” exclusivo para atualizações.
d) Operational Units - Organizacional Units.
e) Uma floresta não é limitada a dois domínios.

### 7

**Ano:** 2017  
**Banca:** IADES  
**Prova:** Fundação Hemocentro de Brasília/DF - Técnico de Informática
**Tipo:** múltipla escolha  

**Enunciado:**
O Active Directory (AD) é o 

a) repositório de informações referentes a objetos da rede e também ao serviço que permite que essas informações sejam utilizadas.
b) mecanismo que permite aos usuários o acesso a recursos de outros domínios.
c) conjunto de arquivos que armazena informações de usuários, grupos e recursos.
d) mecanismo responsável pela cópia de todas as informações entre os controladores de domínio da floresta.
e) conjunto de uma ou mais árvores.

✅ Resposta: a

Justificativa:
O AD é tanto um banco de dados de objetos (usuários, grupos, recursos) quanto um serviço de diretório que fornece autenticação, autorização e consulta.
b) refere-se a relação de confiança
c) não se limita a apenas usuários, grupos e recursos.
e) refere-se a florestas

### 8

**Ano:** 2018  
**Banca:** COMPERVE  
**Prova:** UFRN - Analista de Tecnologia da Informação
**Tipo:** múltipla escolha  

**Enunciado:**
O Active Directory (AD) é composto por diversos serviços, tais como, Active Directory Certificate Services (AD CS), Active Directory
Domain Services (AD DS), Active Directory Federation Services (AD FS), Active Directory Lightweight Directory Services (AD LDS), e
Active Directory Rights Management Services (AD RMS). O serviço que armazena os dados de diretório e gerencia a comunicação entre usuários e domínios, incluindo processos de logon de usuário, autenticação e pesquisas de diretório é o

a) Active Directory Domain Services (AD DS).
b) Active Directory Rights Management Services (AD RMS). 
c) Active Directory Certificate Services (AD CS).
d) Active Directory Certificate Functions (AD CF).

✅ Resposta: a

Justificativa:
O AD DS é o serviço central do Active Directory, responsável por armazenar dados, autenticar usuários e gerenciar a comunicação entre domínios.
AD DS é chamado por alguns como apenas AD.

### 9

**Ano:** 2018  
**Banca:** UFLA  
**Prova:** UFLA - Analista de Tecnologia da Informação
**Tipo:** múltipla escolha  

**Enunciado:**
Active Directory (AD) é um serviço de diretório nas redes Windows. Assinale a alternativa CORRETA:

a) Quando um Administrador realiza alterações em um controlador de domínio (DC), é gerado um pacote chamado de Global Catalog (GC).
b) A partição Schema contém informações sobre a estrutura do AD incluindo quais domínios, sites, controladores de domínio e cada serviço existente na floresta.
c) Quando um Administrador realiza alterações em um controlador de domínio (DC), o servidor precisa atualizar a sua base do AD com os outros controladores de domínio da rede.
d) A partição Configuração contém a definição dos objetos e atributos que são criados no diretório e as regras para criá-los e
manipulá-los.

✅ Resposta: c

Justificativa:
O AD utiliza replicação automática entre controladores de domínio (DCs) para manter a consistência dos dados. Nenhum controlador é isolado.

### 10

**Ano:** 2016  
**Banca:** FIOCRUZ  
**Prova:** Técnico em Saúde Pública - Suporte em rede  de computadores
**Tipo:** múltipla escolha 

**Enunciado:**
Em um servidor Windows 2008 utilizado apenas como servidor de arquivos será criado um ambiente com Active Directory Domain Services. Para iniciar o assistente de instalação do AD deve ser executado o comando:

a) Promote.exe
b) DCPromo.exe
c) ADDS_Promo.exe
d) DomainPromote.exe
e) DCPromote.exe

✅ Resposta: b

Justificativa:
O comando DCPromo.exe era utilizado até o Windows Server 2008 para iniciar o assistente de instalação do Active Directory Domain Services (AD DS).

### 11

**Ano:** 2018  
**Banca:** FAURGS  
**Prova:** TJ-RS - Analista de Suporte
**Tipo:** múltipla escolha 

**Enunciado:**
No Active Directory (AD), o conjunto lógico composto por objetos ou recursos como computadores, usuários e grupos de objetos definidos administrativamente, e que compartilham a mesma base de dados, é denominado

a) domínio.
b) árvore.
c) floresta.
d) organizational units (OU).
e) schema.

✅ Resposta: a

Justificativa:
Um domínio é a unidade lógica fundamental que agrupa usuários, grupos e computadores sob uma mesma base de dados e políticas de segurança no AD.

### 12

**Ano:** 2018  
**Banca:** Quadrix  
**Prova:** CRM-PR - Técnico em Tecnologia da Informação
**Tipo:** v ou f

**Enunciado:**

Julgue o item a seguir, relativo a serviços de diretórios. O serviço de diretórios AD (Active Directory) foi criado com a finalidade de armazenar diversas senhas de um usuário para diferentes sistemas.

✅ Resposta: Falso

Justificativa:
O AD não foi criado para armazenar múltiplas senhas de um mesmo usuário. Ele mantém uma identidade única e centralizada para autenticação única (SSO) em diferentes sistemas.

### 13

**Ano:** 2018  
**Banca:** FGV  
**Prova:** AL-RO - Analista Legislativo - Infraestrutura de Redes e Comunicação
**Tipo:** múltipla escolha 

**Enunciado:**
O principal arquivo do Microsoft Active Directory que tem por função servir como base de dados para armazenar as informações sobre objetos de usuários, grupos e associação de grupos, é denominado

a) Ntds.dit
b) Edb.chk
c) Edb.log.
d) Res1.log.
e) Schema.db.

✅ Resposta: a

Justificativa:
O arquivo NTDS.dit é o banco de dados do AD, armazenando informações sobre usuários, grupos, permissões e estrutura hierárquica do diretório.

### 14

**Ano:** 2018  
**Banca:** CESPE  
**Prova:** FUB - Técnico de Tecnologia da Informação
**Tipo:** v ou f

**Enunciado:**
Julgue o item seguinte, a respeito dos sistemas operacionais Windows e Linux.
No que se refere ao ambiente Windows, desde o Windows 2000, os nomes de domínio do Active Directory são, geralmente, os nomes DNS (domain name service) completos dos domínios.

✅ Resposta: Verdadeiro

Justificativa:
Desde o Windows 2000, os domínios do Active Directory são nomeados com nomes DNS completos (FQDN), como empresa.local ou dominio.gov.br, para facilitar a integração com o DNS.