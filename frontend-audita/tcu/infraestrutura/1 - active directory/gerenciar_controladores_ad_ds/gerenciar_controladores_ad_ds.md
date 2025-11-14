Implantar os controladores de domínio do AD DS em VMs (máquinas virtuais) do Azure

O Azure fornece IaaS (infraestrutura como serviço), que é uma plataforma de virtualização baseada em nuvem. Ao implantar o AD DS no Azure IaaS, você está instalando o controlador de domínio em uma VM, portanto, todas as regras que se aplicam à virtualização de um controlador de domínio se aplicam à implantação do AD DS no Azure.

Ao implementar o AD DS no Azure, considere o seguinte:

    A topologia de rede. Para atender aos requisitos do AD DS, crie uma rede virtual do Azure e anexe suas VMs a ela. Para ingressar em uma infraestrutura local existente do AD DS, estenda a conectividade de rede para seu ambiente local. Para isso, use métodos de conectividade híbrida, como uma conexão de VPN (rede privada virtual) ou um circuito do Azure ExpressRoute, dependendo da velocidade, da confiabilidade e da segurança que a sua empresa precisa.
    A topologia do site. Assim como em um site físico, você deve definir e configurar um site do AD DS que corresponda ao espaço de endereços IP da sua rede virtual do Azure.
    Endereçamento IP. Todas as VMs do Azure recebem endereços DHCP (protocolo de configuração dinâmica de hosts) por padrão, mas você pode configurar endereços estáticos que persistirão em reinicializações e desligamentos.
    DNS. O DNS interno do Azure não atende aos requisitos do AD DS, como registros de recurso de DNS e serviço (SRV) dinâmicos. Para fornecer a funcionalidade de DNS para um ambiente do AD DS no Azure, use a função de servidor DNS do Windows Server ou outras soluções de DNS disponíveis no Azure, como as zonas DNS privadas.
    Discos. Você tem controle sobre o armazenamento em cache das configurações de disco da VM do Azure. Ao instalar o AD DS em uma VM do Azure, você deverá colocar os arquivos NTDS.DIT e SYSVOL em um de seus discos de dados, e configurar a configuração Preferência de Cache do Host desse disco como NONE.


Gerenciar a função de catálogo global do AD DS

O catálogo global é uma cópia parcial, somente leitura e pesquisável de todos os objetos em uma floresta. O catálogo global pode ajudar a acelerar pesquisas de objetos que podem estar armazenados em controladores de um domínio diferente na floresta.

Em um único domínio, o banco de dados do AD DS em cada controlador contém todas as informações sobre todos os objetos do domínio. No entanto, apenas um subconjunto dessas informações é replicado nos servidores de catálogo global em outros domínios na floresta. Em um domínio, uma consulta de um objeto é direcionada para um dos controladores nesse domínio. No entanto, essa consulta não retorna resultados sobre objetos em outros domínios da floresta. Para uma consulta incluir resultados de outros domínios da floresta, você deve consultar um controlador de domínio que também seja um servidor de catálogo global.

O catálogo global não contém todos os atributos de todos os objetos. Em vez disso, ele mantém o subconjunto de atributos mais provavelmente úteis em pesquisas entre domínios. Esses atributos incluem, por exemplo, o givenName, o displayName e o mail. Você pode alterar o conjunto de atributos replicados no catálogo global modificando o esquema do AD DS.

Em uma floresta de vários domínios, a pesquisa no catálogo global pode ser útil em muitas situações. Por exemplo, quando um servidor que executa o Microsoft Exchange Server recebe um email de entrada, ele deve pesquisar a conta do destinatário para decidir como encaminhar a mensagem. Ao consultar automaticamente o catálogo global, o servidor pode encontrar o destinatário em um ambiente de vários domínios. Além disso, quando os usuários entram em suas contas do Active Directory, o controlador de domínio que executa a autenticação deve entrar em contato com o catálogo global para verificar se há associações de grupo universal antes de autenticá-los.

Em um único domínio, você deve configurar todos os controladores de domínio para que tenham uma cópia do catálogo global. Em florestas de vários domínios e multissite, às vezes, pode fazer sentido limitar o número de controladores de domínio que hospedam a função de catálogo global para reduzir o volume de tráfego de replicação, embora esse seja um cenário incomum. No entanto, observe que isso causará a dependência de conectividade com outros sites ao executar consultas de catálogo global.

Dica

Considere configurar todos os controladores de domínio como um catálogo global, a menos que precise reduzir o volume de tráfego de replicação.

Gerenciar mestres de operações do AD DS
200 XP

    15 minutos

O AD DS usa um processo de vários mestres para copiar dados entre controladores de domínio e implementa automaticamente um algoritmo de resolução de conflitos que corrige atualizações simultâneas e conflitantes. Essas provisões permitem um modelo de gerenciamento distribuído, em que vários usuários e aplicativos podem aplicar alterações simultaneamente a objetos do AD DS em diferentes controladores de domínio. Esse modelo é necessário para dar suporte a qualquer ambiente do AD DS com dois ou mais controladores de domínio. No entanto, é particularmente crítico para ambientes grandes e distribuídos, como o da Contoso. É importante lembrar que, apesar disso, determinadas operações podem ser executadas apenas por uma função específica, em um controlador de domínio específico.
O que são os mestres de operações do AD DS?

As funções de mestre de operações do AD DS são responsáveis por realizar operações que são não adequadas para um modelo de vários mestres. Um controlador de domínio com uma dessas funções é um mestre de operações. Uma função mestra de operações também é conhecida como uma função FSMO (Operação Mestra Única Flexível). Há cinco funções de mestre de operações:

    Mestre de esquema
    Mestre de nomeação de domínio
    Mestre de infraestrutura
    Mestre RID
    Mestre emulador PDC

Por padrão, o primeiro controlador de domínio instalado em uma floresta hospeda todas as cinco funções. No entanto, elas podem ser transferidas depois da implantação de controladores de domínio adicionais. Ao executar alterações específicas do mestre de operações, você deve se conectar ao controlador de domínio com a função. As cinco funções de mestre de operações têm a seguinte distribuição:

    Cada floresta conta com um mestre de esquema e um de nomeação de domínio.
    Cada domínio do AD DS tem um mestre de ID relativo (RID), um mestre de infraestrutura e um emulador de controlador de domínio primário (PDC).

Você pode posicionar todas as cinco em um único controlador de domínio ou distribuí-las entre vários.
Mestres de operações de floresta

Uma floresta tem as seguintes funções de mestre de operações:

    Mestre de nomeação de domínio. Entre em contato com esse controlador de domínio ao adicionar ou remover um domínio ou ao fazer alterações de nome de domínio.

Importante

Se o mestre de nomeação de domínio não estiver disponível, você não poderá adicionar domínios à floresta.

    Mestre de esquema. Você faz todas as alterações do esquema neste controlador de domínio.

Importante

Se o mestre de esquema não estiver disponível, as alterações no esquema não serão possíveis.

Observação

O comando do Windows PowerShell Get-ADForest, no módulo do Active Directory para o Windows PowerShell, exibe as propriedades da floresta, incluindo o mestre de nomeação de domínio atual e o de esquema.
Mestres de operações de domínio

Um domínio tem as seguintes funções de mestre de operações:

    Mestre RID. Sempre que você cria uma entidade de segurança, como um usuário, computador ou grupo no AD DS, o controlador de domínio em que você criou o objeto atribui ao objeto um número de identificação exclusivo conhecido como SID (ID de segurança). Para garantir que nenhum dos dois controladores atribua o mesmo SID a dois objetos diferentes, o mestre RID aloca blocos de RIDs a cada controlador no domínio para usar na compilação de SIDs.

Importante

Se o mestre RID não estiver disponível, você poderá enfrentar dificuldades ao adicionar entidades de segurança ao domínio. Além disso, como os controladores de domínio utilizam os RIDs existentes, eles eventualmente ficam sem eles e são incapazes de criar novos objetos.

    Mestre de infraestrutura. Essa função mantém referências a objetos entre domínios, como quando um grupo em um domínio tem um membro de outro domínio. Nessa situação, o mestre de infraestrutura gerencia a manutenção da integridade dessa referência. Por exemplo, quando você revisa a guia Segurança de um objeto, o sistema faz referência aos SIDs listados e os converte em nomes. Em uma floresta de vários domínios, o mestre de infraestrutura atualiza as referências aos SIDs de outros domínios com os nomes de entidade de segurança correspondentes.

Importante

Se o mestre de infraestrutura não estiver disponível, os controladores de domínio que não são catálogos globais não conseguem realizar a tradução dos SIDs em nomes de entidade de segurança.

Importante

A função de mestre de infraestrutura não deve estar no controlador de domínio que hospeda a função de catálogo global, a menos que todos os controladores na floresta estejam configurados para atuar como um catálogo global. Nesse caso, a função de mestre de infraestrutura não é necessária porque cada controlador de domínio sabe sobre cada objeto na floresta.

    Mestre emulador PDC. O mestre emulador PDC é o controlador de domínio que atua como a fonte de tempo para o domínio. O mestre emulador PDC de cada domínio de uma floresta sincroniza o tempo com o mestre emulador PDC no domínio raiz da floresta. Você define o mestre emulador PDC no domínio raiz da floresta para sincronizar com uma fonte de tempo externa confiável. Além disso, por padrão, as alterações em GPOs (objetos de política de grupo) são gravadas no mestre emulador PDC. Esse mestre também é o controlador de domínio que recebe alterações urgentes de senha. Se a senha de um usuário for alterada, o controlador de domínio com a função de mestre emulador PDC receberá essas informações imediatamente. Isso significa que, se o usuário tentar entrar, o controlador de domínio no local atual do usuário entra em contato com o controlador com a função de mestre emulador PDC para verificar se há alterações recentes. Isso ocorre mesmo que um controlador de domínio em um local diferente, que ainda não recebeu as novas informações de senha, tenha autenticado o usuário.

Importante

Se o mestre emulador PDC não estiver disponível, os usuários poderão ter problemas para entrar até que suas alterações de senha tenham sido replicadas em todos os controladores de domínio.

Observação

O comando do Windows PowerShell Get-ADDomain, no módulo Active Directory para Windows PowerShell, exibe as propriedades de domínio, incluindo o mestre RID atual, o mestre de infraestrutura e o mestre emulador PDC.
Gerenciar mestres de operações do AD DS

Em um ambiente do AD DS em que você distribui funções de mestre de operações entre os controladores de domínio, pode ser necessário mover uma função de um controlador para outro. Quando você executa uma movimentação de maneira planejada entre dois controladores de domínio online, a movimentação é conhecida como transferência da função. Em emergências, se o titular da função atual não estiver disponível, a ação será conhecida como assumir a função. Ao transferir uma função, os dados mais recentes do controlador de domínio que está nela são replicados no servidor de destino.

Importante

Você deve capturar uma função somente como último recurso, quando não houver possibilidade de recuperar o detentor atual da função.

 . Qual ferramenta permite a transferência da função de mestre de operações do mestre de infraestrutura?

Usuários e Computadores do Active Directory

Domínios e Relações de Confiança do Active Directory

Esquema do Active Directory Domain Services 

✅ Usuários e Computadores do Active Directory

Explicação:

O mestre de infraestrutura é uma das cinco funções FSMO (Flexible Single Master Operations) no Active Directory.

Essa função é responsável por atualizar referências de objetos entre domínios em uma floresta.

A transferência dessa função é feita por meio do snap-in “Usuários e Computadores do Active Directory” (dsa.msc), que gerencia as funções FSMO de mestre de infraestrutura, mestre RID e PDC Emulator.

As demais ferramentas:

Domínios e Relações de Confiança do Active Directory → usada para transferir o mestre de nomes de domínio.

Esquema do Active Directory Domain Services → usada para transferir o mestre de esquema.

Gerenciar o esquema do AD DS

Muitos aplicativos e serviços utilizam dados que são armazenados em um banco de dado do AD DS. Alguns deles, como o aplicativo interno recentemente desenvolvido pela Contoso, que você precisa implementar, exigem que os dados estejam em um formato específico. Isso, por sua vez, pode exigir a extensão do esquema do AD DS.

O que é um esquema?

O AD DS armazena e recupera informações de uma ampla variedade de aplicativos e serviços. Ele faz isso, em parte, padronizando a forma como o diretório do AD DS armazena os dados. O AD DS é capaz de recuperar, atualizar e replicar os dados ao padronizar o armazenamento deles, além de ajudar a manter sua integridade.

Um esquema do AD DS é o componente que define todas as classes de objeto e atributos que o AD DS usa para armazenar dados. Todos os domínios em uma floresta contêm uma cópia do esquema que se aplica a ela. Qualquer alteração no esquema é replicada em cada controlador de domínio na floresta por meio de seus parceiros de replicação. No entanto, as alterações se originam no controlador do esquema.
Objetos

O AD DS usa objetos como unidades de armazenamento. O esquema define todos os tipos de objeto. Cada vez que o diretório gerencia dados, ele consulta o esquema para obter uma definição de objeto apropriada. Com base na definição do objeto no esquema, o diretório cria o objeto e armazena os dados.

As definições de objeto especificam os tipos de dados que os objetos podem armazenar e a sintaxe de dados. Você só pode criar objetos definidos pelo esquema. Como os objetos armazenam dados em um formato definido rigidamente, o AD DS pode armazenar, recuperar e validar os dados que ele gerencia, independentemente do aplicativo que o fornece.
Relações entre objetos, regras, atributos e classes

Os objetos de esquema do AD DS consistem em atributos agrupados em classes. Cada classe tem regras que definem quais atributos são obrigatórios e quais são opcionais. Por exemplo, a classe de usuário consiste em mais de 400 atributos possíveis, incluindo cm (o atributo de nome comum), givenName, displayName, objectSID e manager. Desses, os atributos cn e objectSID são obrigatórios.

A classe de usuário é um exemplo de uma classe estrutural. Uma classe estrutural é o único tipo de classe que pode ter objetos em um banco de dados do AD DS. Para modificar o esquema, você pode criar uma classe auxiliar com os próprios atributos e fazer referência a ela na definição de uma classe estrutural.

Gerenciar o esquema do AD DS

Ao gerenciar o esquema do AD DS, você só poderá modificá-lo se fizer parte do grupo Administradores do esquema no domínio raiz da floresta do AD DS. Para isso, você pode usar o snap-in do esquema do Active Directory.

Importante

O esquema do AD DS não oferece suporte a exclusões.

Você deve alterar o esquema somente quando necessário, pois ele controla o armazenamento de informações. Além disso, todas as alterações feitas no esquema afetam cada controlador de domínio. Antes de alterar o esquema, revise as alterações e as implemente apenas depois de realizar testes. Isso ajudará a garantir que essas alterações não afetem negativamente o restante da floresta nem os aplicativos que usam o AD DS.

 1.

Qual ferramenta pode ser usada para disparar uma atualização de esquema do AD DS?

ADSIEDIT.MSC

Console do esquema do Active Directory

Console de usuários e computadores do Active Directory 

✅ Resposta correta: Console do esquema do Active Directory

Explicação:

A atualização (ou recarregamento) do esquema do AD DS deve ser feita por meio do snap-in “Esquema do Active Directory” (Schmmgmt.msc).
Esse console permite gerenciar, visualizar e forçar a atualização do esquema, incluindo a opção “Atualizar esquema agora” disponível no menu de contexto do contêiner Esquema.

Outras opções:

ADSIEDIT.MSC → Ferramenta avançada para edição de atributos individuais no AD DS, não é usada para atualizar o esquema.

Usuários e Computadores do Active Directory → Usada para gerenciar contas, grupos e OUs, não tem acesso às definições de esquema.

📘 Resumo:
Para disparar uma atualização de esquema, utilize:

Console do esquema do Active Directory (Schmmgmt.msc)