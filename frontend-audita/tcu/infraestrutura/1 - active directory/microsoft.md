Introdução

[Concluído 100 XP](https://learn.microsoft.com/pt-br/training/modules/introduction-to-ad-ds/1-introduction)


Cenário

A Contoso Ltda. é uma empresa de serviços financeiros sediada em Seattle e com grandes escritórios pelo mundo. A maior parte de seu ambiente de computação é executado localmente no Windows Server. Isso inclui as cargas de trabalho virtualizadas nos hosts do Windows Server 2016.

A equipe de TI da Contoso está migrando os servidores locais da Contoso para o Windows Server 2025. Como parte da migração, a Contoso está avaliando seu ambiente atual do AD DS. Como administrador do Windows Server, você é responsável por gerenciar objetos do AD DS, como usuários, grupos e UOs.

Depois de concluir este módulo, você compreenderá a estrutura fundamental do AD DS e como os usuários, os grupos e as contas de serviço gerenciado de grupo se relacionam com as UOs.
Objetivos de aprendizagem

Depois de concluir este módulo, você poderá:

    Descrever o AD DS.
    Descrever usuários, grupos e computadores.
    Identificar e descrever florestas e domínios do AD DS.
    Descrever UOs.
    Gerenciar objetos e suas propriedades no AD DS.

## Definir o AD DS

Definir o AD DS

O AD DS e seus serviços relacionados formam a base para redes corporativas que executam sistemas operacionais Windows. O banco de dados do AD DS é o repositório central de todos os objetos de domínio, como contas de usuário, contas de computador e grupos. O AD DS fornece um diretório hierárquico e pesquisável, bem como um método para aplicar definições de configuração e segurança para objetos em uma empresa.

O AD DS inclui componentes lógicos e físicos. Você deve entender como os componentes do AD DS funcionam juntos para que possa gerenciar sua infraestrutura com eficiência. Além disso, você pode usar opções do AD DS para executar ações como:

    Instalação, configuração e atualização de aplicativos.
    Gerenciamento da infraestrutura de segurança.
    Habilitação do serviço de acesso remoto e do DirectAccess.
    Emissão e gerenciamento de certificados digitais.

O que são os componentes lógicos?

Os componentes lógicos do AD DS são estruturas que você usa para implementar um design do AD DS apropriado em uma organização. A tabela a seguir descreve os tipos de componentes lógicos que um banco de dados do AD DS contém.

Componente lógico

Descrição

Partição

Uma partição, ou contexto de nomenclatura, é uma parte do banco de dados do AD DS. Embora o banco de dados consista em um arquivo chamado Ntds.dit, diferentes partições contêm dados distintos. Por exemplo, a partição de esquema contém uma cópia do esquema do Active Directory. A partição de configuração contém os objetos de configuração para a floresta, e a partição de domínio contém os usuários, computadores, grupos e outros objetos específicos do domínio. O Active Directory armazena cópias de partições em vários controladores de domínio e os atualiza por meio da replicação de diretório.

Esquema

Um esquema é o conjunto de definições dos tipos de objeto e atributos que você usa para definir os objetos criados no AD DS.

Domínio

Um domínio é um contêiner administrativo lógico para objetos como usuários e computadores. Um domínio é mapeado para uma partição específica, e você pode organizar o domínio com relações pai-filho com outros domínios.

Árvore de domínio

Uma árvore de domínio é uma coleção hierárquica de domínios que compartilham um domínio raiz comum e um namespace DNS (Sistema de Nomes de Domínio) contíguo.

Floresta

Uma floresta é uma coleção de um ou mais domínios que têm uma raiz do AD DS, um esquema comum e um catálogo global comum.

OU

Uma UO é um objeto de contêiner para usuários, grupos e computadores que fornece uma estrutura para delegar direitos administrativos e administração ao vincular GPOs (Objetos de Política de Grupo).

Contêiner

Um contêiner é um objeto que fornece uma estrutura organizacional para uso no AD DS. Você pode usar os contêineres padrão ou criar contêineres personalizados. Não é possível vincular GPOs a contêineres.
Quais são os componentes físicos?

Os componentes físicos no AD DS são aqueles que são tangíveis ou que descrevam componentes tangíveis no mundo real.

Captura de tela de Sites e Serviços do Active Directory. O administrador selecionou o nó Sites. São exibidos dois sites, Seattle e Vancouver. Duas sub-redes também são exibidas.

A tabela a seguir descreve alguns dos componentes físicos do AD DS.

Componente físico

Descrição

Controlador de domínio

Um controlador de domínio contém uma cópia do banco de dados do AD DS. Para a maioria das operações, cada controlador de domínio pode processar alterações e replicá-las em todos os outros controladores no domínio.

Armazenamento de dados

Há uma cópia do armazenamento de dados em cada controlador de domínio. O banco de dados do AD DS usa a tecnologia de banco de dados do Microsoft Jet e armazena as informações de diretório no arquivo Ntds.dit e nos arquivos de log associados. A pasta C:\Windows\NTDS armazena esses arquivos por padrão.

Servidor de catálogo global

Um servidor de catálogo global é um controlador de domínio que hospeda o catálogo global, que é uma cópia parcial e somente leitura de todos os objetos em uma floresta de vários domínios. Um catálogo global acelera as pesquisas de objetos que podem ser armazenados em controladores de domínio em um domínio diferente na floresta.

RODC (Controlador de domínio somente leitura)

Um RODC é uma instalação especial, somente leitura, do AD DS. Os RODCs são comuns em filiais em que a segurança física não é ideal, o suporte de ti é menos avançado do que nos centros corporativos principais ou os aplicativos de linha de negócios precisam ser executados em um controlador de domínio.

Site

Um site é um contêiner para objetos do AD DS, como computadores e serviços específicos de um local físico. Isso é em comparação com um domínio, que representa a estrutura lógica de objetos, como usuários e grupos, além de computadores.

Sub-rede

Uma sub-rede é uma parte dos endereços IP de rede de uma organização atribuídos a computadores em um site. Um site pode ter mais de uma sub-rede.


## Definir usuários, grupos e computadores

Definir usuários, grupos e computadores
Concluído 100 XP

    10 minutos

Além dos componentes e objetos de alto nível, o AD DS contém outros objetos, como usuários, grupos e computadores.
Criar objetos de usuário

No AD DS, você precisa providenciar uma conta para todos os usuários que precisam de acesso aos recursos da rede. Com essa conta, os usuários podem se autenticar no domínio do AD DS e acessar os recursos da rede.

No Windows Server, uma conta de usuário é um objeto que contém todas as informações que definem um usuário. Esse tipo de conta inclui:

    O nome de usuário.
    Uma senha de usuário.
    Associações de grupo.

Uma conta de usuário também contém configurações que você pode definir com base em seus requisitos organizacionais.

Captura de tela da conta de usuário de Jane Dow no Centro Administrativo do Active Directory.

O nome de usuário e a senha de uma conta de usuário servem como as credenciais de entrada do usuário. Um objeto de usuário também inclui vários outros atributos que descrevem e gerenciam o usuário. Você pode usar o seguinte para criar e gerenciar objetos de usuário no AD DS:

    Centro Administrativo do Active Directory.
    Usuários e Computadores do Active Directory.
    Windows Admin Center.
    Windows PowerShell.
    A ferramenta de linha de comando dsadd.

O que são contas de serviço gerenciado?

Muitos aplicativos contêm serviços que você instala no servidor que hospeda o programa. Esses serviços normalmente são executados na inicialização do servidor ou são disparados por outros eventos. Os serviços costumam ser executados em segundo plano e não exigem nenhuma interação do usuário. Para que um serviço seja iniciado e autenticado, você usa uma conta de serviço, que pode ser uma conta local do computador, como as contas internas de Serviço Local, Serviço de Rede ou Sistema Local. Você também pode configurar uma conta de serviço para usar uma conta baseada em domínio localizada no AD DS.

Para ajudar a centralizar a administração e atender aos requisitos do programa, muitas organizações optam por usar uma conta baseada em domínio para executar serviços do programa. Embora isso forneça algum benefício em comparação ao uso de uma conta local, há vários desafios associados, como os seguintes:

    Pode ser necessário um esforço administrativo extra para gerenciar a senha da conta de serviço com segurança.
    Pode ser difícil determinar onde uma conta baseada em domínio está sendo usada como uma conta de serviço.
    Pode ser necessário um esforço administrativo extra para gerenciar o SPN (nome da entidade de serviço).

O Windows Server dá suporte a um objeto do AD DS, chamado de conta de serviço gerenciado, que você usa para facilitar o gerenciamento da conta de serviço. Uma conta de serviço gerenciado é uma classe de objeto do AD DS que permite:

    Gerenciamento simplificado de senhas.
    Gerenciamento simplificado de SPN.

O que são contas de serviço gerenciado de grupo?

As gMSA (Contas de Serviço Gerenciado de Grupo) permitem estender os recursos das contas de serviço gerenciadas padrão para mais de um servidor em seu domínio. Em cenários de farm de servidores com clusters de NLB (Balanceamento de Carga de Rede) ou servidores IIS, muitas vezes é necessário executar serviços do sistema ou do programa na mesma conta de serviço. As contas de serviço gerenciado padrão não podem fornecer funcionalidade de conta de serviço gerenciada para serviços em execução em mais de um servidor. Por gMSA, você pode configurar vários servidores para usar a mesma conta de serviço gerenciada e ainda manter os benefícios que as contas de serviço gerenciadas fornecem, como manutenção automática de senha e gerenciamento simplificado de SPN.

Para dar suporte à funcionalidade de conta de serviço gerenciado de grupo, seu ambiente deve atender ao seguinte requisito:

    Você deve criar uma chave raiz do KDS em um controlador do domínio.

Para criar a chave raiz do KDS, execute o seguinte comando no Módulo do Active Directory para o Windows PowerShell em um controlador de domínio do Windows Server

PowerShell
Add-KdsRootKey –EffectiveImmediately

Crie contas de serviço gerenciado de grupo usando o cmdlet New-ADServiceAccount do Windows PowerShell com o parâmetro –PrinicipalsAllowedToRetrieveManagedPassword.

Por exemplo:
PowerShell

New-ADServiceAccount -Name LondonSQLFarm -PrincipalsAllowedToRetrieveManagedPassword SEA-SQL1, SEA-SQL2, SEA-SQL3

O que são contas de serviço gerenciado delegadas?

O Windows Server 2025 apresenta um novo tipo de conta de serviço chamada dMSA (Conta de Serviço Gerenciado Delegado). O tipo de conta dMSA permite que os usuários transicionem de contas de serviço tradicionais para contas de computador que tenham chaves gerenciadas e totalmente aleatórias, ao mesmo tempo em que desabilitam as senhas da conta de serviço original. A autenticação para dMSA está vinculada à identidade do dispositivo, o que significa que apenas identidades de computador especificadas mapeadas no AD podem acessar a conta. Usando o dMSA, os usuários podem evitar o problema comum de coleta de credenciais usando uma conta comprometida associada a contas de serviço tradicionais.

dMSAs e gMSAs são dois tipos de contas de serviço gerenciado usadas para executar serviços e aplicativos no Windows Server. Uma dMSA é gerenciada por um administrador e é usada para executar um serviço ou aplicativo em um servidor específico. Uma gMSA é gerenciada pelo AD e é usada para executar um serviço ou aplicativo em vários servidores. Outras diferenças incluem:

    Utilizar conceitos de gMSA para limitar o escopo de uso usando o Credential Guard para vincular a autenticação da máquina.
    O Credential Guard pode ser usado para aprimorar a segurança no dMSA girando automaticamente senhas e associando todos os tíquetes de conta de serviço. As contas herdadas são desativadas para melhorar ainda mais a segurança.
    Embora as gMSAs sejam protegidas com senhas geradas por computador e rotacionadas automaticamente, as senhas ainda não estão vinculadas ao computador e podem ser roubadas.

O que são objetos de grupo?

Embora possa ser prático atribuir permissões e direitos a contas de usuário individuais em redes pequenas, isso se torna impraticável e ineficiente em grandes redes corporativas.

Por exemplo, se vários usuários precisarem do mesmo nível de acesso a uma pasta, será mais eficiente criar um grupo que contenha as contas de usuário necessárias e, em seguida, atribuir as permissões necessárias ao grupo.

Dica

Como um benefício adicional, você pode alterar as permissões de arquivo dos usuários adicionando-os ou removendo-os de grupos em vez de editar as permissões de arquivo diretamente.

Antes de implementar grupos em sua organização, você deverá entender o escopo de vários tipos de grupo do AD DS. Além disso, você deve entender como usar tipos de grupo para gerenciar o acesso a recursos ou atribuir direitos e responsabilidades de gerenciamento.

Captura de tela da caixa de diálogo Criar Grupo: Gerentes de Vendas no Centro Administrativo do Windows.
Tipos de grupo

Em uma rede empresarial do Windows Server, há dois tipos de grupos, descritos na tabela a seguir.

Tipo de grupo

Descrição

Segurança

Os grupos de segurança são habilitados para segurança, e você os utiliza para atribuir permissões a vários recursos. Você pode usar grupos de segurança em entradas de permissão em ACLs (listas de controle de acesso) para ajudar a controlar a segurança do acesso aos recursos. Se você quiser usar um grupo para gerenciar a segurança, ele deverá ser um grupo de segurança.

Distribuição

Os aplicativos de email normalmente usam grupos de distribuição, que não são habilitados para segurança. Você também pode usar grupos de segurança como um meio de distribuição para aplicativos de email.

Observação

Ao criar um grupo, você escolhe o tipo e o escopo dele. O tipo determina os recursos do grupo.
Escopos de grupo

O Windows Server dá suporte ao escopo de grupo. O escopo de um grupo determina a gama de habilidades ou permissões de um grupo e a associação de grupo. Há quatro escopos de grupo.

    Local. Você usa esse tipo de grupo para servidores autônomos ou estações de trabalho, em servidores membros do domínio que não são controladores de domínio ou em estações de trabalho membro do domínio. Os grupos locais estão disponíveis apenas no computador em que eles existem. As características importantes de um grupo local são:
        Você pode atribuir habilidades e permissões somente a recursos locais, ou seja, do computador local.
        Os membros podem ser de qualquer lugar da floresta do AD DS.

    Local de domínio. Use esse tipo de grupo principalmente para gerenciar o acesso a recursos ou atribuir direitos e responsabilidades de gerenciamento. Grupos locais de domínio existem em controladores de domínio em um domínio do AD DS e, portanto, o escopo do grupo é local para o domínio em que reside. As características importantes dos grupos locais de domínio são:
        Você pode atribuir habilidades e permissões somente em recursos locais de domínio, ou seja, em todos os computadores do domínio local.
        Os membros podem ser de qualquer lugar da floresta do AD DS.

    Global. Use esse tipo de grupo principalmente para consolidar usuários que têm características semelhantes. Por exemplo, você pode usar grupos globais para ingressar usuários que fazem parte de um departamento ou uma localização geográfica. As características importantes dos grupos globais são:
        Você pode atribuir habilidades e permissões em qualquer lugar da floresta.
        Os membros podem ser somente do domínio local e podem incluir usuários, computadores e grupos globais do domínio local.

    Universal. Use esse tipo de grupo com mais frequência em redes multidomínio, porque ele combina as características de grupos locais de domínio e globais. Especificamente, as características importantes dos grupos universais são:
        Você pode atribuir habilidades e permissões em qualquer lugar da floresta, assim como as atribui em grupos globais.
        Os membros podem ser de qualquer lugar da floresta do AD DS.

O que são objetos de computador?

Os computadores, assim como os usuários, são entidades de segurança, porque:

    Eles têm uma conta com um nome e uma senha de entrada que o Windows altera de forma automática periodicamente.
    Eles se autenticam no domínio.
    Eles podem pertencer a grupos e ter acesso aos recursos, e você pode configurá-los usando a Política de Grupo.

Uma conta de computador inicia seu ciclo de vida quando você cria o objeto de computador e o ingressa em seu domínio. Depois que você ingressar a conta de computador no domínio, as tarefas administrativas diárias incluirão:

    Configurar propriedades do computador.
    Movimentar o computador entre as UOs.
    Gerenciar o próprio computador.
    Renomear, redefinir, desabilitar, habilitar e, eventualmente, excluir o objeto de computador.

Captura de tela da caixa de diálogo Criar Computador: SEA-CL5 no Centro Administrativo do Active Directory.
Contêiner Computadores

Antes de criar um objeto de computador no AD DS, você deverá ter um local para colocá-lo. O contêiner Computadores é um contêiner interno em um domínio do AD DS. Esse contêiner é o local padrão para as contas de computador quando um computador ingressa no domínio.

Esse contêiner não é uma UO. Em vez disso, é um objeto da classe Container. Seu nome comum é CN=Computers. Há diferenças sutis, mas importantes, entre um contêiner e uma UO. Você não pode criar uma UO dentro de um contêiner, portanto, não é possível subdividir o contêiner computadores. Você também não pode vincular um objeto de política de grupo a um contêiner. Portanto, recomendamos que você crie UOs personalizadas para hospedar objetos de computador, em vez de usar o contêiner Computadores.

## Definir florestas e domínios do AD DS



Uma floresta do AD DS é uma coleção de uma ou mais árvores do AD DS que contêm um ou mais domínios do AD DS. Domínios em uma floresta compartilham:

    Uma raiz comum.
    Um esquema comum.
    Um catálogo global.

Um domínio do AD DS é um contêiner administrativo lógico para objetos como:

    Usuários
    Grupos
    Computadores

O que é uma floresta do AD DS?

Uma floresta é um contêiner de nível superior no AD DS. Cada floresta é uma coleção de uma ou mais árvores de domínio que compartilham um esquema de diretório comum e um catálogo global. Uma árvore de domínio é uma coleção de um ou mais domínios que compartilham um namespace contíguo. O domínio raiz da floresta é o primeiro domínio que você cria na floresta.

O domínio raiz da floresta contém objetos que não existem em outros domínios da floresta. Como você sempre cria esses objetos no primeiro controlador de domínio, uma floresta pode consistir em apenas um domínio com um único controlador de domínio ou em vários domínios distribuídos por diversas árvores de domínio.

O gráfico a seguir exibe Contoso.com como o domínio raiz da floresta. Abaixo estão dois domínios, Adatum.com em uma árvore separada e Seattle.Contoso.com como um filho de Contoso.com.

Um elemento gráfico que exibe uma hierarquia de domínios, conforme descrito no texto anterior.

Os seguintes objetos existem no domínio raiz da floresta:

    A função de mestre de esquema.
    A função de mestre de nomeação de domínio.
    O grupo Administradores de Empresa.
    O grupo Administradores de Esquema.

Observação

Embora as funções de mestre de esquema e de nomeação de domínio sejam atribuídas inicialmente no domínio raiz no primeiro controlador de domínio que você cria, você pode movê-las para outros controladores de domínio em qualquer lugar da floresta.

Uma floresta do AD DS geralmente é descrita como:

    Um limite de segurança. Por padrão, nenhum usuário de fora da floresta pode acessar nenhum recursos dentro da floresta. Além disso, todos os domínios em uma floresta confiam automaticamente nos outros domínios dela. Isso facilita a habilitação do acesso a recursos para todos os usuários de uma floresta, independentemente do domínio ao qual eles pertencem.
    Um limite de replicação. Uma floresta do AD DS é o limite de replicação para a configuração e as partições de esquema no banco de dados do AD DS. Portanto, as organizações que desejam implantar aplicativos com esquemas incompatíveis devem implantar florestas adicionais. A floresta também é o limite de replicação para o catálogo global. Esse catálogo torna possível encontrar objetos de qualquer domínio na floresta.

Dica

Normalmente, uma organização cria apenas uma floresta.

Os seguintes objetos existem em cada domínio (incluindo a raiz da floresta):

    A função de mestre de RID.
    A função de mestre de infraestrutura.
    A função de mestre emulador PDC.
    O grupo Administradores de Domínio.

O que é um domínio do AD DS?

Um domínio do AD DS é um contêiner lógico para gerenciar usuários, computadores, grupos e outros objetos. O banco de dados do AD DS armazena todos os objetos de domínio, e cada controlador de domínio armazena uma cópia do banco de dados.

O gráfico a seguir exibe um domínio do AD DS. Ele contém usuários, computadores e grupos.

Um elemento gráfico exibindo um domínio do AD DS que contém usuários, computadores e grupos.

Os objetos usados com mais frequência são descritos na seguinte tabela:

Objeto

Descrição

Contas de usuário

As contas de usuário contêm informações sobre ele, incluindo os dados necessários para autenticá-lo durante o processo de entrada e criar o token de acesso do usuário.

Contas de computador

Cada computador conectado ao domínio tem uma conta no AD DS. Você pode usar contas de computador para computadores conectados ao domínio da mesma maneira que usa contas de usuário para usuários.

Grupos

Os grupos organizam usuários ou computadores para simplificar o gerenciamento de permissões e Objetos de Política de Grupo no domínio.

Observação

O AD DS permite que um único domínio contenha quase 2 bilhões de objetos. Isso significa que a maioria das organizações precisa apenas implantar um único domínio.

Um domínio do AD DS geralmente é descrito como:

    Um limite de replicação. Quando você faz alterações em qualquer objeto no domínio, o controlador de domínio onde a alteração ocorreu replica essa alteração para todos os outros controladores de domínio. Se houver vários domínios na floresta, apenas subconjuntos das alterações serão replicados para outros domínios. O AD DS usa um modelo de replicação de vários mestres que permite que cada controlador de domínio faça alterações em objetos no domínio.
    Uma unidade administrativa. O domínio do AD DS tem uma conta de administrador e um grupo Administradores de Domínio. Por padrão, a conta Administrador é um membro do grupo Administradores de Domínio, e esse grupo é membro de cada grupo de Administradores locais de computadores conectados ao domínio. Além disso, por padrão, os membros do grupo Administradores de Domínio têm controle total sobre cada objeto do domínio.

Observação

A conta de Administrador no domínio raiz da floresta tem direitos adicionais.

Um domínio do AD DS fornece:

    Autenticação. Sempre que um computador conectado ao domínio é iniciado ou um usuário entra em um computador conectado ao domínio, o AD DS o autentica. A autenticação verifica se o computador ou o usuário tem a identidade adequada no AD DS verificando suas credenciais.
    Autorização. O Windows usa as tecnologias de autorização e controle de acesso para determinar se os usuários autenticados poderão acessar os recursos.

Dica

As organizações com estruturas administrativas descentralizadas ou vários locais podem considerar a implementação de vários domínios na mesma floresta para acomodar suas necessidades administrativas.
O que são relações de confiança?

As relações de confiança do AD DS permitem o acesso a recursos em um ambiente complexo de AD DS. Ao implantar um único domínio, você pode conceder facilmente acesso a recursos dentro do domínio para usuários e grupos do domínio. Ao implementar vários domínios ou florestas, você deve garantir que as relações de confiança apropriadas estejam em vigor para habilitar o mesmo acesso aos recursos.

Em uma floresta do AD DS de vários domínios, as relações de confiança transitivas bidirecionais são geradas automaticamente entre domínios do AD DS para que exista um caminho de confiança entre todos os domínios do AD DS.

Observação

Todas as relações de confiança criadas automaticamente na floresta são transitivas, o que significa que, se o domínio A confiar no domínio B e o domínio B confiar no domínio C, o domínio A confiará no domínio C.

Você pode implantar outros tipos de relações de confiança. A tabela a seguir descreve os principais tipos de relações de confiança.

Tipo de relação de confiança

Descrição

Direção

Descrição

Pai e filho

Transitiva

Bidirecional

Ao adicionar um novo domínio do AD DS a uma árvore do AD DS existente, você cria relações de confiança pai e filho.

Raiz de árvore

Transitiva

Bidirecional

Ao criar uma árvore do AD DS em uma floresta do AD DS existente, você cria automaticamente uma relação de confiança entre raiz e árvore.

Externo

Não transitiva

Unidirecional ou bidirecional

As relações de confiança externas permitem o acesso a recursos com um domínio do Windows NT 4.0 ou um domínio do AD DS em outra floresta. Você também pode configurá-los para fornecer uma estrutura para uma migração.

Reino

Transitiva ou intransitiva

Unidirecional ou bidirecional

As relações de confiança de domínio estabelecem um caminho de autenticação entre um domínio do Windows Server AD DS e um domínio que utiliza o protocolo Kerberos versão 5 (v5), implementado por meio de um serviço de diretório diferente do AD DS.

Floresta (completa ou seletiva)

Transitiva

Unidirecional ou bidirecional

As relações de confiança entre florestas do AD DS permitem que duas florestas compartilhem recursos.

Atalho

Não transitiva

Unidirecional ou bidirecional

Configure as relações de confiança de atalho para reduzir o tempo necessário para a autenticação entre domínios do AD DS que estejam em diferentes partes de uma floresta do AD DS. Nenhum atalho de confiança existe por padrão, e um administrador deve criá-los se forem necessários.

Quando você configura relações de confiança entre domínios dentro da mesma floresta, entre florestas ou com um realm externo, o Windows Server cria um objeto de domínio confiável para armazenar as informações de relações de confiança, como transitividade e tipo, no AD DS. O Windows Server armazena esse objeto de domínio confiável no contêiner do sistema no AD DS.

## Definir UOs



Uma UO é um objeto de contêiner em um domínio que você pode usar para consolidar usuários, computadores, grupos e outros objetos. Você pode vincular GPOs (Objetos de Política de Grupo) diretamente a uma UO para gerenciar os usuários e computadores contidos na UO. Você também pode atribuir um gerenciador de UO e associar uma partição COM+ a uma UO.

Crie UOs no AD DS usando:

    Centro Administrativo do Active Directory.
    Usuários e Computadores do Active Directory.
    Windows Admin Center.
    Windows PowerShell com o módulo Active Directory para PowerShell.

Por que criar UOs?

Há dois motivos para criar uma UO:

    Para consolidar objetos a fim de facilitar o gerenciamento deles, aplicando GPOs ao coletivo. Quando você atribui GPOs a uma UO, as configurações se aplicam a todos os objetos dentro da UO. Os GPOs são políticas que os administradores criam a fim de gerenciar e definir configurações para computadores ou usuários. Você implanta os GPOs vinculando-os a UOs, domínios ou sites.
    Para delegar o controle administrativo de objetos dentro da UO. Você pode atribuir permissões de gerenciamento em uma UO, delegando assim o controle dessa UO a um usuário ou grupo dentro do AD DS, além do grupo Administradores de Domínio.

Você pode usar UOs para representar as estruturas hierárquicas e lógicas dentro de sua organização. Por exemplo, crie UOs que representem os departamentos ou as regiões geográficas da organização ou uma combinação de regiões geográficas e departamentais. Você pode usar UOs para gerenciar a configuração e o uso de contas de usuário, grupo e computador com base em seu modelo organizacional.
O que são os contêineres genéricos?

O AD DS tem vários contêineres internos, ou contêineres genéricos, como usuários e computadores. Esses contêineres armazenam objetos do sistema ou funcionam como objetos pai padrão para objetos que você criar. Não confunda esses objetos de contêiner genéricos com UOs. A principal diferença entre UOs e contêineres são os recursos de gerenciamento. Os contêineres têm recursos de gerenciamento limitados. Por exemplo, não é possível aplicar um GPO diretamente a um contêiner.

Captura de tela de Usuários e Computadores do Active Directory. O administrador selecionou o domínio

A instalação do AD DS cria a UO de Controladores de Domínio e vários objetos de contêiner genéricos por padrão. O AD DS usa principalmente alguns desses objetos padrão, que também ficam ocultos por padrão. Os seguintes objetos são exibidos por padrão:

    Domínio. O nível superior da hierarquia organizacional do domínio.
    Contêiner interno. Um contêiner que armazena vários grupos padrão.
    Contêiner de computadores. O local padrão para contas de computador que você cria no domínio.
    Contêiner de Entidades de Segurança externas. O local padrão para objetos confiáveis de domínios fora do domínio do AD DS local que você adiciona a um grupo no domínio do AD DS local.
    Contêiner Contas de Serviço Gerenciado. O local padrão para contas de serviço gerenciado. O AD DS fornece gerenciamento automático de senhas em contas de serviço gerenciado.
    Contêiner de usuários. O local padrão para contas de usuário e grupos que você cria no domínio. O contêiner Usuários também inclui o administrador, as contas de convidado para o domínio e alguns grupos padrão.
    UO de Controladores de Domínio. O local padrão das contas de computador dos controladores de domínio. Essa é a única UO que está presente em uma nova instalação do AD DS.

Há vários contêineres que você pode examinar ao selecionar Recursos Avançados. A tabela a seguir descreve os objetos que estão ocultos por padrão.

Objeto

Descrição

LostAndFound

Esse contêiner possui objetos órfãos.

Dados de programa

Esse contêiner possui dados do Active Directory para aplicativos da Microsoft, como Serviços de Federação do Active Directory (AD FS).

Sistema

Esse contêiner possui as configurações internas do sistema.

Cotas NTDS

Esse contêiner possui os dados de cota do serviço de diretório.

Dispositivos TPM

Esse contêiner armazena as informações de recuperação para dispositivos TPM (Trusted Platform Module).

Observação

Os contêineres em um domínio do AD DS não podem ter GPOs vinculados a eles. Para vincular GPOs a fim de aplicar configurações e restrições, crie uma hierarquia de UOs e vincule os GPOs a elas.
Usar um design hierárquico

As necessidades administrativas da organização ditam o design de uma hierarquia de UOs. As classificações geográficas, funcionais, de recursos ou de usuários podem influenciar o design. Seja qual for a ordem, a hierarquia deverá possibilitar a administração dos recursos do AD DS da maneira mais flexível e eficiente possível. Por exemplo, se você precisar configurar todos os computadores dos administradores de TI de determinada maneira, poderá agrupar esses computadores em uma UO e atribuir um GPO para gerenciá-los.

Também é possível criar UOs dentro de outras UOs. Por exemplo, sua organização pode ter vários escritórios, cada um com seu próprio administrador de TI responsável por gerenciar contas de usuário e de computador. Além disso, cada escritório pode ter diferentes departamentos com requisitos de configuração de computador diferentes. Nessa situação, você pode criar uma UO para cada escritório e, dentro de cada uma dessas UOs, criar uma UO para os administradores de TI e uma UO para cada um dos outros departamentos.

Embora não haja nenhum limite quanto ao número de níveis em sua estrutura de UO, restrinja-a a uma profundidade de, no máximo, dez níveis para garantir a capacidade de gerenciamento. A maioria das organizações usa cinco níveis ou menos para simplificar a administração.

Observação

Observe que os aplicativos que funcionam com o AD DS podem impor restrições quanto à profundidade da UO dentro da hierarquia para as partes da hierarquia que eles usam.

## Gerenciar objetos e suas propriedades no AD DS

Gerenciar objetos e suas propriedades no AD DS
200 XP

    10 minutos

O gerenciamento do ambiente do AD DS é uma das tarefas mais comuns que um profissional de TI realiza. Existem várias ferramentas que você pode usar para gerenciar o AD DS.
Centro Administrativo do Active Directory

O Centro Administrativo do Active Directory fornece uma GUI baseada no Windows PowerShell. Essa interface aprimorada permite que você execute o gerenciamento de objetos do AD DS usando a navegação orientada a tarefas e substitui a funcionalidade Usuários e Computadores do Active Directory.

Captura de tela do Centro Administrativo do Active Directory. O administrador selecionou a UO de TI no domínio Contoso.com.

As tarefas que você pode executar usando o Centro Administrativo do Active Directory incluem:

    Criar e gerenciar contas de usuário, computador e grupo.
    Criar e gerenciar UOs.
    Conectar-se a vários domínios e gerenciá-los em uma única instância do Centro Administrativo do Active Directory.
    Pesquisar e filtrar dados do AD DS criando consultas.
    Criar e gerenciar políticas de senha refinadas.
    Recuperar objetos da Lixeira do Active Directory.
    Gerenciar objetos que o recurso Controle de Acesso Dinâmico requer.

Windows Admin Center

O Windows Admin Center é um console baseado na Web que você pode usar para gerenciar computadores de servidor e computadores que executam o Windows 10. Normalmente, você usa o Windows Admin Center para gerenciar servidores em vez de usar as RSAT (Ferramentas de Administração de Servidor Remoto).

O Windows Admin Center funciona com qualquer navegador que esteja em conformidade com os padrões modernos, e você pode instalá-lo em computadores que executam o Windows 10 e o Windows Server com a Experiência Desktop.

Observação

Você não deve instalar o Windows Admin Center em um computador servidor configurado como um controlador de domínio AD DS.

Com um número decrescente de exceções, o Windows Admin Center dá suporte à maioria das funcionalidades administrativas atuais do Windows Server e do Windows 10. No entanto, a Microsoft pretende fazer com que o Windows Admin Center venha a dar suporte a toda a funcionalidade administrativa atualmente disponível por meio das RSAT.

Captura de tela do Windows Admin Center. O administrador selecionou o Gerenciador do Servidor. O painel Visão geral de um servidor chamado SEA-DC1 é exibido.

Para usar o Windows Admin Center, você deverá primeiro baixá-lo e instalá-lo. Você pode baixar o Windows Admin Center no site de download da Microsoft. Depois de baixar e instalar o Windows Admin Center, habilite a porta TCP apropriada no firewall local. Em um computador com Windows 10 (no modo autônomo), o padrão é a 6516. No Windows Server (no modo de gateway), o padrão é TCP 443. Nos dois casos, você pode alterar isso durante a instalação.

Observação

A menos que você esteja usando um certificado de uma AC confiável, na primeira vez que executar o Windows Admin Center, será solicitado que você selecione um certificado de cliente. Selecione o certificado rotulado Cliente do Windows Admin Center.
Ferramentas de Administração de Servidor Remoto

As RSAT são uma coleção de ferramentas que permitem que você gerencie funções e recursos do Windows Server remotamente.

Captura de tela da caixa de diálogo Adicionar um recurso opcional. É exibida uma lista de ferramentas RSAT.

Observação

Habilite as ferramentas RSAT no aplicativo Configurações. Em Configurações, pesquise Gerenciar recursos opcionais, selecione Adicionar um recurso e escolha as ferramentas RSAT apropriadas na lista retornada. Selecione Instalar para adicionar o recurso.

Você pode instalar os consoles disponíveis nas RSAT em computadores que executam o Windows 10 ou em computadores servidores que executam a opção Servidor com Experiência Desktop de uma instalação do Windows Server. Até a introdução do Windows Admin Center, os consoles das RSAT eram as principais ferramentas gráficas para administrar o sistema operacional Windows Server.
Outras ferramentas de gerenciamento do AD DS

Outras ferramentas de gerenciamento que você usa para realizar a administração do AD DS estão descritas na tabela a seguir.

| Ferramenta de gerenciamento                              | Descrição                                                                                                                                                                                                                                                                                                                                                     |
|----------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Módulo do Active Directory para o Windows PowerShell** | O módulo do Active Directory para o Windows PowerShell dá suporte à administração do AD DS e é um dos componentes de gerenciamento mais importantes. O Gerenciador do Servidor e o Centro de Administração do Active Directory são baseados no Windows PowerShell e usam cmdlets para executar suas tarefas.                                                |
| **Usuários e computadores do Active Directory**          | Usuários e Computadores do Active Directory é um snap-in do MMC (Console de Gerenciamento Microsoft) que gerencia os recursos mais comuns, incluindo usuários, grupos e computadores. Embora muitos administradores estejam familiarizados com esse snap-in, o Centro Administrativo do Active Directory o substitui e fornece mais recursos.                 |
| **Sites e Serviços do Active Directory**                 | O snap-in Sites e Serviços do Active Directory do MMC gerencia a replicação, a topologia de rede e os serviços relacionados.                                                                                                                                                                                                                                 |
| **Domínios e Relações de Confiança do Active Directory** | O snap-in Domínios e Relações de Confiança do Active Directory do MMC configura e mantém relações de confiança nos níveis funcionais de domínio e floresta.                                                                                                                                                                                                   |
| **Snap-in Esquema do Active Directory**                  | O snap-in Esquema do Active Directory do MMC examina e modifica as definições de atributos e classes de objeto do AD DS. Você não precisa examiná-lo nem alterá-lo com frequência. Portanto, por padrão, o snap-in do Esquema do Active Directory não está registrado.                                                                                         |


Demonstração

O vídeo a seguir demonstra como gerenciar objetos no AD DS usando o Centro Administrativo do Active Directory. As principais etapas do processo são:

    Em Gerenciador do Servidor, abra o Centro Administrativo do Active Directory.
    Selecione Controle de Acesso Dinâmico no domínio Contoso.
    Execute uma pesquisa global e examine os resultados.
    Redefina a senha de um usuário no domínio Contoso.
    Crie um objeto de computador chamado SEA-CL4.
    Abra o novo objeto de computador e examine suas propriedades, incluindo as Extensões.
    Examine o histórico do Windows PowerShell e o comando New-ADComputer.


## Avaliação do módulo