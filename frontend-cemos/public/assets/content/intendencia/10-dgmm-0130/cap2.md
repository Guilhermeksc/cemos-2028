## Página 1

OSTENSIVO DGMM-0130

CAPÍTULO 2 CONFIABILIDADE, MANTENABILIDADE E DISPONIBILIDADE

2.1 - INTRODUÇÃO

Normalmente associamos ao conceito de Confiabilidade idéias referentes à confiança, durabilidade, prontidão para operar e ausência de falhas. Assim, relacionamos a confiabilidade diretamente com a confiança que depositamos em um determinado sistema ou equipamento, desconsiderando-se a influência de variáveis que podem contribuir para a ocorrência de uma falha. Isso ocorre porque, muitas vezes, ignoramos a falha mediante o emprego, no projeto, de um coeficiente de segurança arbitrário. Ao se considerar a possibilidade de falha de um componente, é atribuído um enfoque probabilístico ao conceito de confiabilidade. Na realidade, sempre se mensura a confiabilidade em termos de probabilidade de um componente funcionar corretamente em condições esperadas durante um determinado período de tempo, ou de ainda estar em condições de trabalho após um determinado período de funcionamento. Por esse motivo, é fundamental entendermos o conceito estatístico de confiabilidade.

Se a possibilidade de ocorrência de uma falha é aceita, faz-se necessário, também, considerar o fato de se ter que empreender ações para restituir o funcionamento do componente quando ela se manifestar. A efetividade dessas ações será tão maior quanto melhor for: a nossa infraestrutura logística ou de apoio; o desempenho das nossas equipes de reparo; a característica do componente; e da área de trabalho, sintetizada pelo grau de facilidade para restituir, ao componente levado ao estado de indisponibilidade pela ocorrência da falha, a capacidade de desempenho da função requerida. Esses são os aspectos que irão definir o tempo despendido para o necessário reparo do componente que perdeu a capacidade de realizar a sua função específica. O grau de facilidade com que são realizadas as atividades de manutenção, preventivas e/ou corretivas, define a Mantenabilidade de determinado sistema ou equipamento.

Nestes termos, vimos que a variável relacionada à confiabilidade e à mantenabilidade é o tempo. Ao se somar o Tempo médio entre Falhas (Mean Time Between Failures — MTBF) com o Tempo Médio para Reparo (Mean Time To Repair —- MTTR) que integra as variáveis inerentes à infra-estrutura logística estará se definindo o ciclo operativo do componente. O tempo em que o equipamento ficou pronto para operar em relação ao tempo total do ciclo operativo é definido como Disponibilidade, o percentual de tempo em que o componente não estará em falha, pane ou revisão/reparo. Assim, se constata que a disponibilidade depende da confiabilidade, da mantenabilidade e, principalmente, da infra-estrutura de apoio logístico. Por esse motivo, aumentar a disponibilidade é um objetivo clássico da Função Logística Manutenção, o que

implica no aumento da confiabilidade do componente e na diminuição das durações das

OSTENSIVO -2-1 - ORIGINAL

---

## Página 2

OSTENSIVO DGMM-0130

intervenções. Busca-se aumentar o tempo médio entre falhas (MTBF) e/ou reduzir o tempo médio para reparo (MTTR), são ações básicas da gestão da manutenção. É por essa razão que o conhecimento da confiabilidade do componente é fundamental para as atividades de

manutenção”. (LAFRAIA, 2001).

2.2 - CONCEITOS 2.2.1 - CONFIABILIDADE?

Segundo o conceito estatístico, Confiabilidade é a probabilidade de que um sistema, funcionando dentro dos limites especificados de projeto e nas condições ambientais definidas pelo projeto, não falhe durante o período de tempo previsto para a sua vida. Nessa definição encontram-se implícitos os seguintes fatores básicos: a quantificação de confiabilidade em termos de uma probabilidade; o contexto operacional caracterizado pelo detalhamento do desempenho requerido ao componente; o tempo de operação exigido entre falhas; e as condições ambientais em que o componente irá funcionar. O emprego do componente em contexto operacional diverso acarretará a degradação do seu desempenho e, consequentemente, da sua confiabilidade. 2.2.1.1 — Parâmetros da Confiabilidade 2.2.1.1.1 - Taxa de Falha

É representada pela notação A(t) e considerado um “estimador” da confiabilidade. É um valor numérico que prevê o número de falhas que ocorrerão durante um período especificado de operação. A taxa de falha é levantada por meio de testes, experiências de campo e por meio da exploração de dados de falhas ocorridas, existentes nos históricos de manutenção. De uma forma mais usual é calculada usando-se os dados obtidos do uso real, dividindo-se o número de falhas pelo intervalo de tempo considerado. A expressão de taxa de falha é:

Mt) = C/At, onde C é o número de falhas ocorridas no intervalo de tempo At.

2.2.1.1.2 — A Curva da Banheira A Curva da Banheira (Bathtub curve) é a representação gráfica característica do comportamento da Taxa de Falha de um sistema ao longo do seu tempo de operação que se divide em três fases: partida ou mortalidade infantil (falhas prematuras), vida útil ou vida adulta (falhas aleatórias) e fim de vida econômica ou fase de desgaste (falhas por

desgaste), conhecida também como obsolescência.

1 LAFRAIA, João Ricardo Barusso. Manual de confiabilidade, mantenabilidade e disponibilidade. Rio de Janeiro: Qualitymark: Petrobras, 2001. >» Td.

OSTENSIVO - 2-2 - ORIGINAL

---

## Página 3

OSTENSIVO DGMM-0130

taxa de falha

descarte

Figura 2.1: Curva da Banheira

A Figura 2.1 ilustra as fases de operação do equipamento através da representação da Curva da Banheira. A denominação da curva tem origem na representação clássica do comportamento da taxa de falha de sistemas eletromecânicos.

A Figura 2.2 apresenta outras curvas representativas de falhas em equipamentos. Quanto mais complexo se torna o equipamento, mais o padrão se aproxima das curvas

2d e 2e (equipamento eletrônico, hidráulico e pneumático).

Figura 2.2: Outros Padrões de Falhas

OSTENSIVO - 2-3 - ORIGINAL

---

## Página 4

OSTENSIVO DGMM-0130

Estudos realizados pela National Aeronautics and Space Administration (NASA) em diversos equipamentos concluíram que 95% deles apresentam características de taxa de falha constante durante a maior parte da vida útil. Essa constatação permite que a Confiabilidade seja aproximada utilizando-se a distribuição exponencial, que caracteriza o modelo de falha constante. Contudo, essa é apenas uma alternativa para uma primeira aproximação. Na realidade, grandes sistemas e sistemas complexos tendem ao comportamento exponencial, que caracteriza o modelo de falha constante dos padrões 2d e 2e, da Figura 2.2. Entretanto, qualquer que seja o comportamento de falhas apresentado pelo equipamento, sua taxa de falha pode ser obtida mediante a investigação do comportamento ou do uso de probabilidade. Para o uso do papel de probabilidade, devemos analisar as amostras de tempos entre falhas obtidos por meio de ensaio ou exploração de dados existentes nos históricos de manutenção e aí compará-los com as funções

estatísticas. O tema tem alguns detalhes expandidos no Anexo A. 2.2.1.1.3 — Função Acumulada de Falhas e Confiabilidade

No cálculo da confiabilidade é usual utilizarmos funções estatísticas, com base nos dados existentes nos históricos de manutenção. O registro das falhas dos sistemas permite plotar a ocorrência das falhas em função dos tempos decorridos de operação. A frequência com que as falhas ocorrem ao longo do tempo de operação permite obter a função acumulada de falhas F(t), que permite conhecer a probabilidade de falha entre um período de tempo t1 e t2.

Se F(t) é a probabilidade de falha do sistema/componente, a confiabilidade R(t) (a probabilidade de sobrevivência num dado intervalo estabelecido) será determinada empregando-

se a fórmula R(t) = 1 - F(t). 2.2.1.1.4—- Os Tempos e a Confiabilidade

- Tempo Médio para Falha (“Mean Time To Failure-MTTF?) — é o tempo médio para a falha de componentes que não são reparáveis. A vida do componente acaba com a primeira falha. Quando o componente é reparável temos o Tempo Médio Entre Falhas (“Mean Time Betweem Failure — MTBF?), definido pelo intervalo de tempo transcorrido entre falhas subsequentes; e

- Tempo Médio Para Reparo (“Mean Time To Repair —- MTTR?) — é o tempo para a

substituição ou reparo do componente.

2.2.1.2 — Métodos e Ferramentas para aumento da Confiabilidade” 2.2.1.2.1 — Práticas Básica da Manutenção Moderna

Os especialistas demonstram que a confiabilidade de um sistema varia diretamente

3 PINTO, A.K.e NASCIF, J.X. Manutenção: função estratégica. Rio de Janeiro: Qualitymark Ed. 1999.

OSTENSIVO - 2-4 - ORIGINAL

---

## Página 5

OSTENSIVO DGMM-0130

em função da qualidade do programa de manutenção. Uma elevada confiabilidade inerente poderá ser perdida em decorrência de um programa de manutenção inadequado. Por outro lado, a confiabilidade inerente de um equipamento pode não ser um aspecto significativo, pois um bom programa de manutenção, dentro de certos limites, poderá melhorar a sua confiabilidade. Contudo, dois são os desafios: uma correta especificação do equipamento/sistema em função da sua aplicação; e o impacto dos fatores humanos (influência do inter-relacionamento entre humanos, as ferramentas que eles usam, e o meio ambiente no qual eles vivem e trabalham) na operação e manutenção de um sistema.

O Programa 5S, a Manutenção Produtiva Total (ou TPM — Total Productive Maintenance) e a Polivalência, ou Multiespecialização, são algumas práticas que estão sendo consideradas na manutenção moderna.

O Programa 5S, prática originada no Japão, é aplicado como base para o desenvolvimento do Sistema da Qualidade. É um programa que tem por objetivo a melhoria da participação dos funcionários na organização, por meio de incentivos à higiene, ao senso de ordenação e de organização, à autodisciplina, ao treinamento e à união entre os funcionários.

A Manutenção Produtiva Total é a ampliação do conceito de manutenção, mediante a participação das pessoas da Operação, na manutenção da planta ou instalação.

A Polivalência tem como propósito aumentar a capacitação do homem de manutenção (multiespecialização) com vistas à ampliação de suas habilidades, a fim de obter

sensível racionalização e maior garantia de qualidade dos serviços.

2.2.1.2.2— Análise do Modo e Efeito de Falha (FMEA -— Failure Mode and Effect Analysis)

É uma abordagem que possibilita a identificação e a priorização das falhas potenciais em equipamentos, sistemas ou processos.

Trata-se de um sistema lógico que possibilita a hierarquização das falhas potenciais e o fornecimento de recomendações para ações preventivas. É um processo formal utilizado por especialistas que se dedicam a analisar as falhas e solucioná-las.

Normalmente, é empregada como primeiro passo para o estabelecimento de um programa de Análise das Causas Raízes da Falha.

A FMEA pode ser empregada no projeto, processo e sistema.

No projeto, tem por objetivo a eliminação das causas de falha originadas durante o projeto do equipamento. Considera todos os aspectos, desde a mantenabilidade até os afetos à segurança, tendo como objetivo a identificação antecipada, de todos os modos de falha,

catastróficos ou críticos, para que sejam eliminados ou minimizados, no estágio inicial de

4 Id.

OSTENSIVO - 2-5 - ORIGINAL

---

## Página 6

OSTENSIVO DGMM-0130

desenvolvimento do sistema. A busca da causa raiz de cada modo de falha é determinante para a eliminação de falhas nessa etapa. Aplicada, no processo, tem seu foco principal em como o componente (sistema/equipamento) é mantido e operado.

Por sua vez no sistema, terá como alvo as falhas potenciais e gargalos no processo global (por exemplo: uma linha de produção; uma planta de geração de energia; um motor de geração de vapor; ou a propulsão de um navio).

A FMEA constitui-se fundamentalmente na medida do risco de falha.

É utilizada na Manutenção Centrada na Confiabilidade (MCC) com o propósito de avaliar, documentar e priorizar o impacto potencial de cada falha funcional, visando definir formas de prevenção ou correção. Uma forma de análise de criticidade pode ser acrescentada

dando origem a FMECA (Failure Mode, Effects and Criticality Analysis).

2.2.1.2.3 — Analises dos Modos, Efeitos e Criticalidade das Falhas ( Failure Mode, Effects and Criticality Analysis- FMECA)

Um estudo completo de FMEA pode se inviabilizar em face da constatação de um número elevado de falhas potenciais. Isto pode ocorrer em função da dimensão dos sistemas em análise.

Na FMEA, o nosso objetivo é a determinação de todos os modos de falha potenciais de um sistema. Com a aplicação da FMECA, identificam-se apenas os modos de falha que são suficientemente críticos para justificar ações adicionais. 2.2.1.2.4 — Análise das Causas Raízes da Falha (RCFA — Root Cause Failure Analysis)

Recomenda-se o uso desse tipo de análise em problemas crônicos, que podem comprometer até 50% do orçamento de manutenção, o que significa que o seu custo é muito mais elevado do que o das falhas ocorridas em equipamentos importantes.

Esta análise está fundamentada no questionamento: POR QUÊ? Em todas as etapas a mesma questão deve ser respondida. A técnica recomendada é a de que se faça o questionamento até que ele não faça mais sentido”. 2.2.1.2.5 — Análise de Falhas Ocorridas

Este tipo de análise demanda exploração dos dados existentes nos históricos de manutenção, mediante a aplicação de técnicas estatísticas. O objetivo é identificar o grupo de

componentes causadores dos 80% dos eventos de falhas ou dos custos (este fato segue o

5 SIQUEIRA, Iony Patriota de. Manutenção centrada na confiabilidade: manual de implementação. Rio de Janeiro: Qualitymark. 2005. 6 PINTO e NACIFE, p.96.

OSTENSIVO - 2-6 - ORIGINAL

---

## Página 7

OSTENSIVO DGMM-0130

Princípio de Pareto que afirma que para muitos fenômenos 80% das conseqgiiências advem de 20% das causas). O conhecimento obtido possibilitará o foco nos pontos fracos do sistema em

estudo.

2.2.1.2.6 — Manutenção Centrada na Confiabilidade (MCC ou Reliability Centred Maintenance, RMC)”

Manutenção Centrada na Confiabilidade é um processo utilizado para determinar os requisitos de manutenção de qualquer item físico no seu contexto operacional.

Igualmente às análises precedentes, a MCC é uma ferramenta de apoio à decisão gerencial, cuja abordagem clássica inclui:

- seleção do sistema;

- definição das funções e padrões de desempenho;

- determinação das falhas funcionais e padrões de desempenho;

- análise dos modos e efeitos das falhas;

- histórico de manutenção e revisão da documentação técnica; e

- determinação de ações de manutenção — política, tarefas, fregiiência.

Para o início de um processo de MCC, uma equipe multidisciplinar deverá

responder às sete questões básicas da manutenção:

- Quais são as funções e padrões de desempenho do item no seu contexto operacional atual?

- De que forma ele falha em cumprir suas funções?

- O que causa cada falha operacional?

- O que acontece quando ocorre cada falha?

- De que forma cada falha tem importância?

- O que pode ser feito para prevenir cada falha?

- O que deve ser feito, se não for encontrada uma tarefa preventiva apropriada?

A MCC propõe uma mudança significativa nos objetivos da manutenção. Se a função manutenção buscava preservar o equipamento, parando-o , atuando em todos os itens e realizando todas as ações que podiam ser feitas para prevenir as falhas, a MCC propõe:

- preservar as funções do equipamento, com a segurança requerida;

- restaurar sua confiabilidade e segurança projetada, após a deteriorização;

- otimizar a disponibilidade;

- minimizar o custo do ciclo de vida;

- atuar conforme os modos de falhas;

Id, p.104.

OSTENSIVO - 2-7 - ORIGINAL

---

## Página 8

OSTENSIVO DGMM-0130

- realizar apenas as atividades que precisam ser feitas;

- agir em função dos efeitos e conseqgiiência da falha; e

- documentar as razões para a escolha das atividades.

As atividades de manutenção das funções significantes são definidas com base em critérios de aplicabilidade e de efetividade, e de acordo com avaliação da visibilidade e consequência de cada modo de falha, conforme será apresentado no Capítulo 5 e expandido no

Anexo E.

2.2.1.3 - Confiabilidade de Sistemas

Define-se como o valor de Confiabilidade de Sistemas a função R(t)= e (At), onde À corresponde a taxa de falhas e t o intervalo de tempo a ser utilizado, normalmente expresso em horas.

A configuração do sistema, mediante o tipo de arranjo dos seus componentes

proporcionam a obtenção de maiores níveis de confiabilidade.

Figura 2.3: Gráfico da função Confiabilidade de Sistemas

2.2.1.3.1 — Sistemas Simples com Componentes em Série e em Paralelo

A Confiabilidade (R — Reliability) de um sistema está associada à confiabilidade de seus componentes. Um sistema se diz em série, do ponto de vista da Confiabilidade, quando a falha de qualquer um dos componentes deste sistema provocar a falha de todo o sistema, ficando completamente inoperante. Na configuração em série, como aquela apresentada na Figura 2.4, a

Confiabilidade resultante é obtida pelo produto das Confiabilidades dos itens que compõem o

OSTENSIVO - 2-8 - ORIGINAL

---

## Página 9

OSTENSIVO DGMM-0130

arranjo. Sendo assim, a Confiabilidade do sistema em série será menor que a Confiabilidade do seu componente mais fraco.

Para o exemplo abaixo, onde teríamos um sistema eletrônico cujo transmissor tenha Confiabilidade igual a R(t)=0,8521, um receptor com R(r)= 0,9712 e uma fonte de energia com R(e)= 0,9357, terá como Confiabilidade de Sistema R(s):

R(s)= R(t) x R(r1) x R(e) = (0,8521) x (0,9712) x (0,9357) = 0,7743

ENTRADA SAÍDA

>» oR [O RR tt RR -———

Figura 2.4: Sistema com Componentes em Série

Um sistema se diz em paralelo quando somente deixar de funcionar se todos os componentes falharem. A Figura 2.5 representa um sistema em paralelo, que funcionará adequadamente quando o componente A ou o B, ou ambos estiverem operando normalmente. Para um sistema em paralelo com dois componentes a Confiabilidade de Sistema (Rs) é expressa

por:

RS = Ra+ Rb-— ( Ra xRb)

——p A

ENTRADA —» SAÍDA

Figura 2.5: Sistema com Componentes em Paralelo

Sistemas redundantes, nos quais os componentes em paralelo A e B são idênticos,

são usados para melhorar a Confiabilidade do sistema. 2.2.1.3.2 — Sistemas Simples com Componentes em Série Paralelo

Nos sistemas mistos, onde vários níveis de Confiabilidade podem ser obtidos devido à combinação de subsistemas em série e em paralelo, o método para o cálculo da Confiabilidade do sistema consiste em primeiro calcular a Confiabilidade dos elementos em paralelo e em seguida obter o produto das Confiabilidades em série. A Figura 2-6 ilustra uma configuração do

sistema misto, cuja Confiabilidade resultante será:

OSTENSIVO - 2-9 - ORIGINAL

---

## Página 10

OSTENSIVO DGMM-0130

Rs= Ra x[Rb+Rc-—(Rbx Rc)]

——p B

ENTRADA —— A ++ SAÍDA

Lp C

Figura 2-6: Sistema misto

2.2.2 - MANTENABILIDADE

A mantenabilidade é conceituada como a probabilidade de que um item avariado possa ser colocado novamente em seu estado operacional, em um período de tempo predefinido, quando a manutenção é realizada nas condições e com os meios e procedimentos estabelecidos. Na realidade, a mantenabilidade é uma característica de projeto que define a facilidade da manutenção, o tempo necessário para realizá-la e os custos inerentes. Sendo uma predição estatística, assim como a confiabilidade, a mantenabilidade pode ser significativamente influenciada por variáveis como a disponibilidade de recursos e as condições ambientais nas quais a manutenção é executada. O conceito assume como premissa básica que o conjunto especificado de recursos estará disponível para apoiar o reparo.

A mantenabilidade de uma instalação sempre poderá ser melhorada, contribuindo para a redução dos prazos de intervenções e paradas, quando integrada ao processo de planejamento da manutenção. As melhorias terão como fonte as dificuldades encontradas pelo pessoal da manutenção ou pela análise, na fase de planejamento dos serviços a serem realizados, pois se herdam, do projeto, da fabricação, da montagem e da instalação, problemas potenciais que devem constituir preocupação constante do planejamento, da manutenção e do setor de engenharia de manutenção. 2.2.2.1 —- O Foco e os Objetivos da Mantenabilidade

A mantenabilidade tem como foco, dentre outros, a determinação do:

- tempo para a manutenção;

- HH de manutenção/horas de operação; e

- custo de manutenção/horas de operação.

Nos seus objetivos, estão incluídas:

- a otimização dos tempos e custo de manutenção já na fase de projeto;

- a estima dos tempos para a manutenção em função da disponibilidade requerida. Esse aspecto também é importante para avaliação da necessidade de adoção de redundância;

- a estima da disponibilidade; e

- a estima dos recursos requeridos para a execução da manutenção.

OSTENSIVO - 2-10 - ORIGINAL

---

## Página 11

OSTENSIVO DGMM-0130

2.2.2.2 — A Distribuição dos Tempos de Manutenção

O Tempo Médio para Reparo (MTTR — “Mean Time To Repair” é o tempo médio para executar a manutenção, reparo ou substituição de componente, num ciclo operativo especificado. Inicialmente, o MTTR é encontrado usando as predições de tempo para execução das tarefas de manutenção. Quando o projeto tiver sido concluído, o MTTR pode ser aperfeiçoado pela medida dos tempos efetivamente necessários para executar as tarefas. A exatidão do MTTR vai depender da correção das predições de mantenabilidade e dos recursos necessários para executar a manutenção (sobressalentes, manuais técnicos e ferramentas).

A taxa de reparos (|) é a relação entre o número de reparos efetuados pelo período de tempo considerado. O MTTR é a recíproca da taxa de reparos, sendo representado matematicamente pelo inverso do seu valor.

MTTR=1/u

De modo análogo à Confiabilidade, a Mantenabilidade pode ser definida por um método de cálculo estatístico utilizando a distribuição exponencial, cuja expressão considera a taxa de reparos constante.

Como visto anteriormente, a Mantenabilidade está associada ao parâmetro MTTR, que mede o tempo médio de indisponibilidade do item. Assim, os períodos de tempo entre a parada e o retorno do equipamento à operação deverão ser contabilizados no tempo total em que o sistema

não operou. Os indicadores de tempo a serem adotados são os seguintes:

Tempo total de indisponibilidade do equipamento ou Tempo

Técnico de Reparo

1/2 //3 |4/ |5 |6 |7/ |8 |9 //10/11/12 7/13 [14

to te tO Instante em que se verifica a falha ti Tempo para identificação do modo de falha 2 Tempo para emissão do Pedido de Serviço (PS) t3 Tempo para o delineamento do PS t4 Tempo para emissão da DS t5 Tempo para autorização da DS

t6 Tempo para geração da Ordem de Serviço (OS)

t7 Tempo para remoção das interferências (acesso) t8 Tempo para remoção do equipamento t9 Tempo de espera de sobressalentes

tiO Tempo para substituição de peças ou de reparo

OSTENSIVO - 2-11 - ORIGINAL

---

## Página 12

OSTENSIVO DGMM-0130

ti1 Tempo para remontagem

ti2 Tempo para ajustes e testes

t13 Tempo para reinstalação do equipamento

ti4 Tempo para montagem das interferências

tf Instante do retorno do equipamento à operação

Quando se analisa os tempos descritos acima, verifica-se que todos eles, direta ou indiretamente, influenciam o andamento do serviço. Os seguintes tempos devem ser eliminados do Tempo Técnico de Reparo: tempos de espera devido a indisponibilidade de técnicos, de ferramentas, ou de peças de reposição; e tempos mortos com causas variadas tais como paradas de trabalho, burocracia, etc. Se o somatório dos tempos de espera com o tempos mortos for superior ou igual ao Tempo Técnico de Reparo, precisaremos olhar criticamente para o apoio

logístico: a coordenação; a gerência de estoques; e os meios de execução.

2.2.2.3 — A Influência da Mantenabilidade na Disponibilidade

O custo de ciclo de vida de um determinado sistema poderá ser minimizado mediante a seleção, pelo projetista, de níveis adequados de disponibilidade, confiabilidade e mantenabilidade. Normalmente, busca-se um maior nível de confiabilidade e mantenabilidade possível, para se aumentar o Tempo Médio entre Falhas e se reduzir o Tempo Médio para o Reparo, a fim de se maximizar a disponibilidade. Mas, é conveniente ressaltar que se pode, também, maximizar a disponibilidade trabalhando com menores níveis de confiabilidade e maiores níveis de mantenabilidade. A redução do nível de confiabilidade só será exegiiível se

não houver o comprometimento da segurança.

2.2.3 — DISPONIBILIDADE

A disponibilidade pode ser conceituada como a relação entre o tempo em que o equipamento ou sistema ficou pronto para operar em relação ao tempo total de um ciclo operativo. De acordo com essa conceituação, a disponibilidade é função da confiabilidade e da mantenabilidade, pois é diretamente proporcional ao tempo médio em que o sistema ficou disponível para operar (MTBF) e inversamente proporcional ao tempo total do ciclo operativo, representado pela soma do MTBF com o MTTR, indicadores de tempo relacionados com o período operativo e o período de manutenção do sistema.

Existem três versões diferentes para o cálculo da disponibilidade: a inerente, a alcançada e a operacional. A disponibilidade inerente (DI) é a mais simples das três versões, pois considera somente as tarefas de manutenção corretiva no cálculo do MTTR. A DI fornece um ponto de partida para comparação do projeto do novo sistema com outros já existentes, permitindo avaliar

a adequação de sua confiabilidade e do conceito de manutenção utilizado.

OSTENSIVO - 2-12 - ORIGINAL

---

## Página 13

OSTENSIVO DGMM-0130

A disponibilidade alcançada (DA) é mais realista do que a da DI, pois inclui as tarefas de manutenção corretiva e preventiva que são necessárias para manter o sistema. Esse cálculo é feito numa fase mais adiantada do projeto, quando o conhecimento do sistema já permite estabelecer as rotinas de manutenção preventiva a serem executadas. A DA leva em conta o fator tempo médio entre manutenções MTBM (“Mean Time Between Maintenance”), em lugar de MTBF, uma vez que são computados além do tempo médio de manutenção corretiva (MTCM), o tempo médio de manutenção preventiva (MTPM) para o sistema.

A Disponibilidade Operacional (DO) é a medida real da disponibilidade de um sistema. Representa a porcentagem do tempo que ele estará disponível para cumprir a sua missão nas condições reais de operação. A diferença chave entre a fórmula para cálculo de DO e as fórmulas para outras medidas de disponibilidade é que todo o tempo decorrido num determinado período é considerado na mensuração, seja o tempo operacional, aquele destinado à manutenção e, ainda, o tempo não operacional (“downtime”) caracterizado por atrasos ao longo do serviço, devido à indisponibilidade de máquinas, de mão-de-obra e de sobressalentes. Essa é a disponibilidade real do sistema, que mede, na média, o tempo real em que um sistema estará pronto para executar a sua missão.

A importância do tempo entre “overhaul” é caracterizada pela avaliação da disponibilidade do meio entre os períodos de manutenção geral. Essa disponibilidade pode ser obtida pelo tempo total em que o meio esteve disponível para operar em relação ao tempo total

entre “overhaul” consecutivos.

2.3 - DIRETRIZES PARA A APLICAÇÃO DOS CONCEITOS DE COMFIABI-LIDADE, MANTENABILIDADE E DISPONIBILIDADE NA MB

2.3.1 — CONFIABILIDADE a) Confiabilidade de Sistemas

A configuração do sistema será definida pelo arranjo de componentes que proporcionar a obtenção do maior nível de confiabilidade possível. Essa deverá ser uma premissa permanente para especificação de desenvolvimento de novos sistemas e meios.

A confiabilidade inerente à configuração adotada irá definir a filosofia, os métodos e o plano de manutenção, pois consolida o comportamento da taxa de falha dos componentes (sistemas e equipamentos). Os aspectos em questão irão condicionar a mantenabilidade e a disponibilidade do sistema. Esses parâmetros devem ser analisados quanto ao atendimento das necessidades operacionais (Dias de Mar/ano e Período Operativo) e do limite, se houver, do

custo de manutenção. Esta é uma tarefa típica de planejamento de emprego e de configuração de

OSTENSIVO - 2-13 - ORIGINAL

---

## Página 14

OSTENSIVO DGMM-0130

sistemas, a ser definida na fase de concepção do meio, que envolve diretamente o Setor Operativo e o CPN, ou o Escritório de Projeto contratado pela MB.

O fluxograma, apresentado na Fig 2.8, ilustra a sequência de eventos e condicionantes.

b) Confiabilidade Operacional

A efetividade das ações de manutenção deverá ser avaliada por meio do acompanhamento da confiabilidade operacional do meio e seus sistemas. O objetivo permanente será o de mantê-la no mesmo patamar da confiabilidade inerente do meio e seus sistemas/equipamentos. Isto significa preservar a confiabilidade e a capacidade de emprego dos meios da MB. Para tanto, deverá existir procedimentos para a pesquisa da confiabilidade com base nos dados de falhas ocorridas, cujo objetivo será o de determinar o Tempo Médio entre Falhas (MT'BF) do meio/sistemas/equipamentos e o comportamento da taxa instantânea de falha A(t). Esses dois indicadores possibilitarão avaliar se a baixa confiabilidade operacional observada é decorrente de deficiências: de operação (influência do erro humano ou de fatores humanos); de manutenção (inadequação do método empregado ou execução); ou de mau funcionamento do sistema/equipamento, cuja solução poderá depender de proposta de MODTEC ou ALTERNAV, fundamentada em análise ou estudo realizado por uma equipe de Manutenção

Centrada em Confiabilidade (MCC).

2.3.2 -MANTENABILIDADE Utilizar as propostas de MODTEC e ALTERNAV como oportunidade para a melhoria da

mantenabilidade dos sistemas.

2.3.3 — DISPONIBILIDADE

Adotar a disponibilidade operacional como parâmetro de gerenciamento dos meios navais, aeronavais e de fuzileiros navais. A disponibilidade operacional deverá ser maximizada mediante a adoção de ações que:

- aumentem o Tempo Médio entre Falhas (MTBF), com base nos resultados de análise da confiabilidade operacional; e ou

- diminuam o Tempo Médio para o Reparo (MTTR).

Com relação ao MTTR, envidar esforços no sentido de que o Tempo Total de Indisponibilidade do sistema/equipamento coincida com o Tempo Técnico de Reparo, que é o tempo para que uma equipe de manutenção ou uma OMPS-I realize o serviço, tendo à sua

disposição todo o material e ferramentas necessárias. Para tanto, torna-se fundamental conhecer

e administrar os tempos mortos ou logísticos, minimizando-os.

OSTENSIVO - 2-14 - ORIGINAL

---

## Página 15

OSTENSIVO DGMM-0130

FLUXOGRAMA

SETOR OPERATIVO Análise do Contexto Operacional

Determinação da necessidade de Dias de Mar/Ano e Período operativo

Rever

Definição da Confiabilidade, Mantenabilidade e Disponibilidade

Definição da Filosofia, dos Métodos e do plano de Manutenção em função do comportamento da taxa de falha dos

componentes (sistemas e equipamentos)

Limita o Período Operativo e os Dias de Mar pré-fixados?

Existe limitação para o custo de manutenção?

EALI

possível. Integra o PALI

Define a

Figura 2-8: Sequência de Eventos e Condicionantes

OSTENSIVO - 2-15 - ORIGINAL

---