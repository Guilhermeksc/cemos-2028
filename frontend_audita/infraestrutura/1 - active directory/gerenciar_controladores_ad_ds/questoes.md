1. Sua empresa está se expandindo para vários novos sites globalmente e precisa garantir a alta disponibilidade dos serviços de autenticação em todos os locais. Qual é o número mínimo recomendado de controladores de domínio por região geográfica para garantir a alta disponibilidade?

Um controlador de domínio

Três controladores de domínio

Dois controladores de domínio

✅ Dois controladores de domínio

Recomendação da Microsoft: manter pelo menos dois DCs por região geográfica para garantir alta disponibilidade e redundância caso um falhe.

2. Qual método é recomendado para implementar extensões de esquema personalizadas para um novo aplicativo interno no AD DS?

Usar uma ferramenta de terceiros para automatizar alterações de esquema

Aplicar alterações diretamente ao ambiente de produção para economizar tempo

Usar um ambiente de teste para validar as alterações antes de aplicá-las à produção

✅ Usar um ambiente de teste para validar as alterações antes de aplicá-las à produção
Alterações de esquema são permanentes e impactam toda a floresta — devem sempre ser testadas previamente.

3. Qual função mestra de operações do AD DS é responsável por lidar com alterações no esquema do AD DS?

Mestre RID

Mestre de esquema

Mestre de nomenclatura de domínio

✅ Mestre de esquema
Esta função FSMO é a única que pode modificar o esquema do AD DS (criar/alterar classes e atributos).

4. Sua empresa desenvolveu um aplicativo interno que requer atributos adicionais para objetos do AD DS. Qual é a etapa inicial para integrar esses atributos à infraestrutura existente do AD DS?

Reconfigure o catálogo global para incluir os novos atributos.

Atualize o nível funcional do domínio para a versão mais recente.

Estenda o esquema do AD DS para incluir os novos atributos.

✅ Estenda o esquema do AD DS para incluir os novos atributos
Antes que o AD DS armazene novos dados, o esquema deve ser estendido com as definições desses atributos.

5. Um novo aplicativo requer que atributos adicionais sejam adicionados ao esquema do AD DS. Qual é o procedimento correto para atualizar o esquema?

Use o Catálogo Global para adicionar novos atributos ao esquema.

Instale um novo controlador de domínio para atualizar o esquema.

Modifique o esquema usando o snap-in do Esquema do Active Directory.

✅ Modifique o esquema usando o snap-in do Esquema do Active Directory
Ferramenta oficial para adicionar classes e atributos no esquema do AD DS.

6. Você tem a tarefa de implantar um aplicativo recém-desenvolvido que requer extensões de esquema adicionais. Qual deve ser o foco principal para garantir a integração bem-sucedida?

Realizando uma revisão completa do design do esquema para evitar conflitos com atributos existentes.

Aumentar o nível funcional da floresta para dar suporte a novos recursos.

Garantir que todos os controladores de domínio estejam executando a versão mais recente do sistema operacional.

✅ Realizando uma revisão completa do design do esquema para evitar conflitos com atributos existentes
Garantir que não haja sobreposição ou conflito de nomes antes da extensão do esquema é essencial para estabilidade e compatibilidade.

7. Sua organização precisa garantir alta disponibilidade e desempenho para serviços de autenticação. Qual é o número mínimo recomendado de controladores de domínio por região geográfica?

Dois controladores de domínio por região.

Três controladores de domínio por região.

Um controlador de domínio por região.

✅ Dois controladores de domínio por região
Repetição da questão 1 — a resposta permanece a mesma: dois DCs é o mínimo recomendado.

8. Qual ação é necessária para aplicar uma nova extensão de esquema para um aplicativo personalizado no AD DS?

Modifique o nível funcional da floresta para dar suporte ao novo esquema.

Instale o aplicativo no controlador de domínio primário primeiro.

Use o grupo Administradores de Esquema para aplicar alterações de esquema.

✅ Use o grupo Administradores de Esquema para aplicar alterações de esquema
🔹 Apenas membros desse grupo podem modificar o esquema do AD DS.

9. Qual função mestra de operações do AD DS é responsável por processar alterações no esquema de diretório?

Mestre de nomenclatura de domínio

Emulador PDC

Mestre de esquema 

✅ Mestre de esquema
🔹 Responsável exclusivo por processar alterações no esquema do diretório em toda a floresta.



1.

Qual recurso do Windows Server permite a instalação da função de controlador de domínio em uma instalação do Server Core sem uma GUI?

Console de gerenciamento de política de grupo

Windows Admin Center

Usuários e computadores do Active Directory

✅ Windows Admin Center
🔹 O Windows Admin Center (WAC) permite instalar funções e recursos — como controladores de domínio — em servidores Server Core, que não possuem interface gráfica (GUI).

2.

Você está comparando dois métodos de extensão de esquema para adicionar novos atributos ao AD DS. O método A envolve o uso de um ambiente de teste separado antes da implantação, enquanto o Método B ignora esta etapa. Qual é a principal vantagem do Método A?

Garante que as alterações não afetem negativamente as operações existentes do AD DS.

Reduz o tempo necessário para a implantação em todos os domínios.

Atualiza automaticamente todos os controladores de domínio com esforço mínimo.
3.

Qual é a função primária do catálogo global do AD DS em uma floresta de vários domínios?

Ele acelera as pesquisas de objetos em diferentes domínios na floresta.

Ele gerencia serviços DNS para todos os domínios na floresta.

Ele contém uma cópia completa do banco de dados do AD DS para todos os domínios na floresta.
4.

Qual das funções a seguir é considerada uma função mestra de operações no AD DS?

Mestre de esquema

Mestre de Infra-Estrutura

Servidor de Catálogo Global
5.

Você tem a tarefa de implantar um aplicativo recém-desenvolvido que requer extensões de esquema adicionais. Qual deve ser o foco principal para garantir a integração bem-sucedida?

Aumentar o nível funcional da floresta para dar suporte a novos recursos.

Realizando uma revisão completa do design do esquema para evitar conflitos com atributos existentes.

Garantir que todos os controladores de domínio estejam executando a versão mais recente do sistema operacional.
6.

Um novo aplicativo requer que atributos adicionais sejam adicionados ao esquema do AD DS. Qual é o procedimento correto para atualizar o esquema?

Use o Catálogo Global para adicionar novos atributos ao esquema.

Modifique o esquema usando o snap-in do Esquema do Active Directory.

Instale um novo controlador de domínio para atualizar o esquema.
7.

Qual método é recomendado para implementar extensões de esquema personalizadas para um novo aplicativo interno no AD DS?

Aplicar alterações diretamente ao ambiente de produção para economizar tempo

Usar um ambiente de teste para validar as alterações antes de aplicá-las à produção

Usar uma ferramenta de terceiros para automatizar alterações de esquema
8.

Você precisa estender o esquema do AD DS para dar suporte a um novo aplicativo. O que é um pré-requisito crítico antes de fazer essas alterações?

Verifique se toda a replicação em toda a floresta está funcionando corretamente.

Atualize todos os controladores de domínio para a versão mais recente do Windows Server.

Converta todos os controladores de domínio de somente leitura em gravável.
9.

Sua empresa está se expandindo para vários novos sites globalmente e precisa garantir a alta disponibilidade dos serviços de autenticação em todos os locais. Qual é o número mínimo recomendado de controladores de domínio por região geográfica para garantir a alta disponibilidade?

Um controlador de domínio

Três controladores de domínio

Dois controladores de domínio 


1️⃣ ✅ Windows Admin Center
🔹 O Windows Admin Center (WAC) permite instalar funções e recursos — como controladores de domínio — em servidores Server Core, que não possuem interface gráfica (GUI).

2️⃣ ✅ Garante que as alterações não afetem negativamente as operações existentes do AD DS.
🔹 O uso de ambiente de teste protege o ambiente de produção contra erros de schema irreversíveis e evita impactos no AD DS em toda a floresta.

3️⃣ ✅ Ele acelera as pesquisas de objetos em diferentes domínios na floresta.
🔹 O Catálogo Global (GC) mantém uma cópia parcial dos objetos de todos os domínios, permitindo consultas rápidas entre domínios diferentes.

4️⃣ ✅ Mestre de esquema (ou Mestre de Infraestrutura — ambos são FSMO, mas a pergunta pede “qual é considerada uma função mestra”, logo qualquer uma é válida, preferencialmente o Mestre de Esquema)
🔹 As funções mestras FSMO incluem:

✅ Resposta correta: Mestre de Infraestrutura

Explicação:

No Active Directory, existem cinco funções FSMO (Flexible Single Master Operations) — também chamadas funções mestras de operações. São elas:

Mestre de Esquema

Mestre de Nomes de Domínio

Mestre RID

Emulador PDC

Mestre de Infraestrutura

🔹 Portanto, o “Mestre de Infraestrutura” é uma das funções mestras FSMO.
🔹 Já o Servidor de Catálogo Global (GC) não é uma função FSMO, e sim um função adicional que permite localizar objetos em qualquer domínio da floresta.

📘 Resumo:

✅ Função FSMO: Mestre de Infraestrutura

❌ Mestre de Esquema → também FSMO, mas provavelmente a questão esperava a alternativa mais diretamente relacionada ao domínio (não à floresta).

❌ Servidor de Catálogo Global → não é FSMO, apenas um serviço de consulta distribuída.


5️⃣ ✅ Realizando uma revisão completa do design do esquema para evitar conflitos com atributos existentes.
🔹 Essa etapa é crítica antes de aplicar uma extensão de esquema, garantindo consistência e compatibilidade entre atributos.

6️⃣ ✅ Modifique o esquema usando o snap-in do Esquema do Active Directory.
🔹 O Schmmgmt.msc é a ferramenta apropriada para adicionar classes e atributos personalizados no esquema do AD DS.

7️⃣ ✅ Usar um ambiente de teste para validar as alterações antes de aplicá-las à produção.
🔹 É a boa prática recomendada pela Microsoft, pois o esquema é replicado em toda a floresta e não pode ser revertido.

8️⃣ ✅ Verifique se toda a replicação em toda a floresta está funcionando corretamente.
🔹 Antes de modificar o esquema, é essencial garantir que todos os controladores estejam sincronizados, evitando inconsistências durante a replicação.

9️⃣ ✅ Dois controladores de domínio.
🔹 A Microsoft recomenda no mínimo dois DCs por região geográfica para alta disponibilidade, tolerância a falhas e continuidade de autenticação.