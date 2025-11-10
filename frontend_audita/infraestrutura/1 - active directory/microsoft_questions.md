1. Quais dos seguintes elementos são considerados entidades de segurança em ambientes do AD DS?

Usuários e computadores

Grupos e controladores de domínio

Impressoras e scanners

✅ Usuários e computadores
➡️ São entidades de segurança no AD DS, pois podem receber permissões e autenticações. Impressoras e scanners não possuem SID, e grupos/controladores de domínio não são considerados entidades individuais de segurança.

2. Qual é o principal benefício do uso de UOs (Unidades Organizacionais) no AD DS?

Eles facilitam a delegação de tarefas administrativas

Eles armazenam todo o banco de dados do AD DS

Eles gerenciam a distribuição de endereço IP

✅ Eles facilitam a delegação de tarefas administrativas
➡️ UOs (Unidades Organizacionais) permitem agrupar objetos e delegar permissões administrativas específicas sem conceder acesso total ao domínio.

3. Um serviço em execução em vários servidores em um domínio do Windows Server precisa usar a mesma conta de serviço. Qual tipo de conta de serviço você deve implantar para garantir a segurança e a facilidade de gerenciamento?

Contas de Serviço Gerenciado Delegado (dMSA)

GMSA (Contas de Serviço Gerenciado de Grupo)

Contas de serviço local

✅ GMSA (Contas de Serviço Gerenciado de Grupo)
➡️ As GMSAs fornecem gerenciamento automático de senhas e podem ser usadas em múltiplos servidores de forma segura, ideal para serviços distribuídos.

4. Sua organização deseja melhorar a velocidade de pesquisa em vários domínios em uma floresta do AD DS. Qual componente do AD DS deve ser utilizado para essa finalidade?

Servidor de catálogo global

Controlador de domínio

Sítio

✅ Servidor de catálogo global
➡️ O catálogo global contém informações parciais de todos os objetos da floresta, acelerando buscas entre domínios.

5. Qual é o componente do AD DS responsável por armazenar uma cópia somente leitura de todos os objetos em uma floresta de vários domínios?

Armazenamento de dados

Controlador de domínio somente leitura (RODC) (ERRADA)

Servidor de catálogo global

✅ VERIFICAR Controlador de domínio somente leitura (RODC)
➡️ O RODC armazena uma cópia somente leitura do banco de dados do AD DS, adequado para locais remotos com menor segurança física.

✅ Servidor de Catálogo Global

Explicação técnica:

O Servidor de Catálogo Global (Global Catalog Server) armazena uma cópia parcial, somente leitura, de todos os objetos da floresta, contendo os atributos mais usados em consultas de pesquisa e autenticação.

Já o RODC (Read-Only Domain Controller) mantém apenas uma cópia somente leitura do banco de dados do domínio local, não da floresta inteira.

Resposta corrigida:
5. ✅ Servidor de Catálogo Global
➡️ Ele é responsável por armazenar uma cópia somente leitura dos objetos de todos os domínios da floresta, otimizando pesquisas e autenticações interdomínios.

6. Qual é uma característica primária de um RODC (controlador de domínio somente leitura)?

Ele é usado em ambientes com segurança física limitada.

Ele atua como um servidor de catálogo global.

Ele contém uma cópia gravável do banco de dados do AD DS.

✅ Ele é usado em ambientes com segurança física limitada.
➡️ O RODC não permite gravação e é projetado para locais onde o servidor pode estar fisicamente exposto, evitando comprometimento do AD.

7. Sua organização está se expandindo e planeja criar vários domínios em uma única floresta do AD DS. Que vantagem isso oferece?

Todos os domínios na floresta confiam automaticamente uns nos outros

Cada domínio opera de forma independente sem recursos compartilhados

Domínios em uma floresta não podem se comunicar entre si

✅ Todos os domínios na floresta confiam automaticamente uns nos outros
➡️ Em uma floresta, as relações de confiança transitivas e bidirecionais são criadas automaticamente entre todos os domínios.

8. Em um cenário em que você precisa organizar usuários por departamento e aplicar políticas diferentes a cada departamento, qual componente do AD DS facilitaria melhor isso?

Controladores de Domínio

Catálogo Global

Unidades organizacionais (UOs)

✅ Unidades organizacionais (UOs)
➡️ As UOs permitem organizar usuários e aplicar GPOs (Group Policy Objects) diferentes por departamento.

9. Qual é a principal vantagem de segurança de usar dMSA (Contas de Serviço Gerenciado Delegado) em relação às contas de serviço tradicionais no Windows Server 2025?

O dMSA impede a coleta de credenciais associando a autenticação à identidade do dispositivo.

O dMSA fornece tempos de logon mais rápidos para serviços.

DMSA requer menos esforço de configuração do que contas de serviço gerenciadas por grupo. 
✅ O dMSA impede a coleta de credenciais associando a autenticação à identidade do dispositivo.
➡️ As dMSA (Delegated Managed Service Accounts) introduzem vínculo de autenticação ao dispositivo, aumentando a proteção contra roubo de credenciais.
