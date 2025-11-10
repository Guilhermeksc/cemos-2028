Relatório Analítico: Serviços de Diretório (Active Directory e LDAP)
1. Introdução Conceitual

Os serviços de diretório são componentes fundamentais da infraestrutura de TI, responsáveis por armazenar, organizar e disponibilizar informações sobre objetos de rede — como usuários, grupos, impressoras e computadores — de maneira centralizada e segura.

O Active Directory (AD), da Microsoft, é a implementação mais difundida desses serviços, enquanto o LDAP (Lightweight Directory Access Protocol) é o protocolo padrão aberto utilizado para comunicação entre clientes e servidores de diretório

2. Descrição Técnica Detalhada
2.1 Funcionamento e Arquitetura

O Active Directory é estruturado em partições:

Schema: define classes e atributos de objetos.

Configuração: armazena a topologia do domínio.

Domínio: contém usuários, grupos e OUs

Sua hierarquia lógica é organizada em:

Domínios → agrupam objetos sob uma base comum de segurança.

Árvores → conjuntos de domínios que compartilham um namespace.

Florestas → conjuntos de árvores com esquemas independentes

O protocolo LDAP fornece o mecanismo de acesso aos objetos do AD, utilizando nomes hierárquicos denominados DN (Distinguished Names), compostos por atributos como CN, OU e DC

Fluxo de autenticação (Kerberos):

O usuário envia credenciais ao KDC (Key Distribution Center).

O KDC gera um TGT (Ticket-Granting Ticket) criptografado pela conta KRBTGT.

O TGT é usado para solicitar tickets de serviço sem necessidade de nova senha

2.2 Componentes Principais do Active Directory

| Serviço                                     | Função Principal                                |
| ------------------------------------------- | ----------------------------------------------- |
| **AD DS (Domain Services)**                 | Gerencia contas e autenticação.                 |
| **AD CS (Certificate Services)**            | Emite e gerencia certificados digitais.         |
| **AD FS (Federation Services)**             | Permite autenticação entre sistemas distintos.  |
| **AD LDS (Lightweight Directory Services)** | Oferece serviço LDAP sem controle de domínio.   |
| **AD RMS (Rights Management Services)**     | Protege informações sensíveis por criptografia. |


Arquivos críticos do AD:

NTDS.dit: banco de dados do diretório.

EDB.log: log de transações.

EDB.chk: checkpoint de recuperação

3. Aplicações em Auditoria

A auditoria de serviços de diretório verifica controles de acesso lógico, autenticação, integridade das políticas de grupo (GPO) e replicação segura entre controladores de domínio.

3.1 Procedimentos e Evidências

| Área de Controle            | Teste de Auditoria                            | Evidência Esperada                           |
| --------------------------- | --------------------------------------------- | -------------------------------------------- |
| **Gerência de Identidades** | Revisar criação e exclusão de contas.         | Logs do AD e políticas de expiração.         |
| **Autenticação Segura**     | Verificar uso de Kerberos e ausência de NTLM. | Configuração de política de segurança local. |
| **Segregação de Funções**   | Conferir perfis administrativos distintos.    | Mapeamento de grupos de segurança.           |
| **Logs e Rastreamento**     | Avaliar centralização no SIEM.                | Registro de eventos 4624/4625 (logon).       |
| **GPOs Críticas**           | Validar política de senha e bloqueio.         | Exportação do `gpresult /h`.                 |
| **Replicação Segura**       | Inspecionar protocolos de replicação.         | Logs de replicação sem falhas.               |

4. Principais Pegadinhas de Prova

| Nº | Pegadinha                                               | Correção e Comentário                                                  |
| -- | ------------------------------------------------------- | ---------------------------------------------------------------------- |
| 1  | “LDAP é um serviço de diretório.”                       | **Errado.** LDAP é o **protocolo** que acessa serviços como AD.        |
| 2  | “Active Directory é igual ao domínio.”                  | **Errado.** Domínio é apenas **uma partição lógica** dentro do AD.     |
| 3  | “O AD utiliza o protocolo DNS para autenticação.”       | **Errado.** DNS é usado **para resolução de nomes**, não autenticação. |
| 4  | “AD LDS depende de controladores de domínio.”           | **Errado.** O LDS é **independente** de domínios.                      |
| 5  | “Kerberos é menos seguro que NTLM.”                     | **Errado.** Kerberos é **mais seguro** e moderno.                      |
| 6  | “O AD só funciona em FAT32.”                            | **Errado.** Requer **NTFS** por causa de permissões e logs.            |
| 7  | “Catálogo Global contém apenas dados do domínio local.” | **Errado.** Contém cópia **parcial de outros domínios**.               |
| 8  | “Floresta e árvore são a mesma coisa.”                  | **Errado.** Floresta é um **conjunto de árvores**.                     |
| 9  | “O protocolo LDAP usa a porta 485.”                     | **Errado.** Usa **porta 389/TCP**.                                     |
| 10 | “O DCPromo ainda é usado no Windows Server 2019.”       | **Errado.** Foi substituído por **PowerShell e Server Manager**.       |

5. Questões Simuladas Comentadas

Múltipla Escolha

1. (Avançada – Auditor TI TCU)
O protocolo utilizado para autenticação e autorização em domínios Active Directory é:
a) NTLM
b) Kerberos
c) SMB
d) LDAP
✅ Gabarito: b)
Comentário: O Kerberos autentica usuários e serviços, emitindo tickets criptografados.

2.
O arquivo principal de banco de dados do Active Directory é:
a) Schema.ini
b) Ntds.dit
c) Res1.log
d) Edb.chk
✅ Gabarito: b)
Comentário: O NTDS.dit armazena todos os objetos do diretório.

3.
No contexto do AD, o conjunto de árvores com diferentes esquemas é denominado:
a) Domínio
b) Floresta
c) Catálogo Global
d) OU
✅ Gabarito: b)
Comentário: A floresta representa a estrutura lógica máxima do AD.

Verdadeiro ou Falso

| Nº | Afirmativa                                                 | Gabarito | Comentário                                        |
| -- | ---------------------------------------------------------- | -------- | ------------------------------------------------- |
| 1  | O AD utiliza DNS para localizar recursos de rede.          | V        | Integração obrigatória para nomeação de domínios. |
| 2  | O LDAP é proprietário da Microsoft.                        | F        | É um **padrão aberto** da IETF/ISO.               |
| 3  | A conta KRBTGT é utilizada para autenticação via Kerberos. | V        | Responsável por criptografar os TGTs.             |
| 4  | AD RMS fornece serviços de autenticação multifator.        | F        | Fornece **proteção de informações**.              |
| 5  | O AD DS é opcional em controladores de domínio.            | F        | É **essencial** ao funcionamento do AD.           |
| 6  | O Catálogo Global replica dados de todos os domínios.      | V        | Mantém cópias completas/parciais.                 |
| 7  | O AD LDS requer domínio configurado.                       | F        | Funciona **sem domínio**.                         |
| 8  | NTFS é obrigatório para AD por segurança.                  | V        | Permite ACLs e logs transacionais.                |
| 9  | O DCPromo é o método atual de instalação do AD.            | F        | Substituído no Windows Server 2012+.              |
| 10 | O protocolo LDAP usa porta 389/TCP.                        | V        | Padrão definido pela IETF.                        |


6. Resumo Final
Conceitos-Chave

AD é o serviço de diretório do Windows.

LDAP é o protocolo de acesso.

Estrutura hierárquica: domínios → árvores → florestas.

Autenticação segura via Kerberos.

Controle via GPOs e NTFS.

Erros Comuns

Confundir LDAP com AD.

Acreditar que AD usa FAT32.

Ignorar o papel do DNS e do Kerberos.

Esquecer que AD LDS é independente de domínio.

Recomendações de Auditoria

Revisar políticas de senha e logon.

Verificar GPOs aplicadas a OUs críticas.

Avaliar logs de replicação e autenticação.

Validar a proteção da conta KRBTGT e a rotação periódica de senhas administrativas.