# Capítulo 8 - Gestão de demanda na cadeia global de suprimentos

**8.1** Introdução, 213
**8.2** Conceitos, 216
**8.2.1** O que é e por que fazer gestão de demanda, 216
**8.2.2** Causas da variabilidade da demanda, 218
**8.2.3** Previsão de demanda, 224
**8.2.4** Processo de previsão, 228
**8.2.5** Processo de previsão de vendas, 229
**8.2.6** Métodos usados em previsões, 232
**8.2.7** Erros (ou incerteza) de previsão, 236
**8.2.8** Calibração de modelos de previsão – definição de parâmetros, 238
**8.2.9** Gestão de preços e de receitas (*revenue management*), 240
**8.3** Estudo de caso: Genexis em expansão, 242
**8.4** Resumo, 244

## Página 213

### 0BJETIVOS DE APRENDIZAGEM

📌 Entender o que é e por que é importante a gestão de demanda.

📌 Sintetizar as formas possíveis de se influenciar a demanda percebida por elos numa cadeia de suprimentos de forma a reduzir sua variabilidade.

📌 Identificar e explicar as formas possíveis de se prever demanda, de forma a reduzir sua incerteza.

📌 Entender as formas possíveis de gerenciar preços, de forma a influenciar a demanda e maximizar as receitas das cadeias de suprimentos.

### 8.1 INTRODUÇÃO

Uma das funções mais importantes da gestão da cadeia de suprimentos de uma empresa é conciliar eficientemente o suprimento e a demanda dos clientes/usuários finais, quanto aos produtos e serviços oferecidos, de forma a garantir que eles fiquem altamente satisfeitos, tornem-se clientes fiéis e frequentes e recomendem o produto ou serviço a outros clientes, como propagandistas gratuitos. No esforço de conciliação da demanda com o suprimento, é importante que o gestor de cadeias direcione sua atenção não apenas a fim de garantir que o suprimento responda adequadamente à demanda, por meio de uma boa gestão dos fluxos de informação, bens e clientes sendo processados, mas também se preocupe com possíveis formas de gerenciá-la (por exemplo, procurando prevê-la com níveis adequados de precisão e mesmo influenciá-la, tornando-a, por meio de ações, menos volátil e mais estável, quando possível). O objetivo deste capítulo é discutir as técnicas e meios pelos quais a gestão de demanda pode ser feita e também abordar importantes aspectos da gestão do nível de serviço logístico oferecido ao cliente.

A Figura 8.1 localiza a gestão de demanda e do nível de serviço ao cliente no quadro de referência geral usado neste livro.

## Página 214

![alt text](figura8-1.png)

**Gestão de demanda na Toyota, o maior fabricante de carros do mundo**

A Toyota Motor Co. Ltd (Toyota) iniciou suas operações em 1937, quando Kiichiro Toyoda estabeleceu uma fábrica de veículos automotores independente de sua empresa da época, a Toyoda Automatic Loom Works (ALW), uma fabricante de equipamentos para tecelagem. O capital inicial para os primeiros experimentos com a fabricação de automóveis veio da venda dos direitos de patente de uma das máquinas inventadas pelo fundador da Toyoda ALW, Sakichi Toyoda e pai de Kiichiro. No período de pós-guerra, mais especificamente em 1950, a Toyota experimentou a única greve da história da empresa, da qual, depois de extensas negociações, tanto os trabalhadores quanto a empresa e sua gestão saíram firmemente comprometidos com os princípios de confiança mútua e interdependência para o bem comum.

## Página 215

O bom relacionamento entre os trabalhadores e a empresa continua até hoje. Durante os anos 1950 e daí por diante, as técnicas de produção foram aperfeiçoadas, culminando com o desenvolvimento do chamado *Toyota Production System* (Sistema Toyota de Produção) pelo legendário gerente Taiichi Ohno (considerado o pai do sistema *just in time*), um sistema que se tornou a base do *lean production* (produção enxuta). adotado largamente não só na indústria automobilística, mas em muitas outras. O Sistema Toyota de Produção é baseado nos princípios de *jidoka* (sistema que interrompe a produção quando um defeito é encontrado, seguindo o postulado de que qualidade se constrói durante o processo de produção), *just in time* (por meio do sistema *kanban* de fluxos produtivos puxados, em que se produz só o que é necessário, quando necessário e na quantidade necessária) e *kaizen* (sistema de melhoramentos contínuos). Considera-se que o Sistema Toyota de Produção é, em grande parte, a razão de os níveis de estoques e defeitos dentro das fábricas da Toyota serem, por larga margem, os menores do mundo dentro do setor industrial.

Em 2018, a Toyota teve vendas líquidas de US$ 256 bilhões, tinha 16 fábricas no Japão e 53 ao redor do mundo, distribuídas entre 27 países/regiões, e foi em 2017 a terceira maior fabricante do mundo por produção de veículos, com pequena margem atrás da primeira e segunda. A Figura 8.3 traz os detalhes.

| Volkswagen | 10,742 milhões (+ 4,3% sobre 2016) |
| --- | --- |
| **Aliança Renault Nissan Mitsubishi** | 10,740 milhões (+ 6,2% sobre 2016) |
| **Toyota** | 10,466 milhões (+ 2,9% sobre 2016) |

**Figura 8.3** Os três maiores grupos automotivos do mundo ranqueados por produção de veículos (2017).

A Toyota é a líder do mercado japonês de veículos (Honda e Nissan são suas maiores e mais fortes rivais lá), onde sua atuação, desde os anos 1950, lançou as bases para a jornada que a tornou a maior fabricante de carros do mundo. Um dos fatores diferenciadores da Toyota que, com suas práticas de manufatura, tem garantido uma competitividade sustentada por décadas é a sua competência em gerenciar sua demanda, o que inclui não só a demanda de veículos por usuários finais, mas também a gestão dos seus canais de distribuição – as concessionárias, que são os clientes diretos da empresa.

### Canais de distribuição

No Japão, a Toyota trabalha com quatro canais de distribuição: Toyota (carros grandes), Toyopet (carros médios), Corolla (carros compactos) e Netz (carros subcompactos). A empresa oferece em torno de 60 modelos de carros, com cada canal distribuindo apenas de 15 a 25 modelos. Dessa forma, cada concessionária pode desenvolver um conhecimento profundo de cada modelo que vende. Cinquenta por cento dos modelos são vendidos como exclusivos de cada canal (não podendo ser encontrados em outros canais). A Toyota tem em torno de 300 concessionárias no Japão, cada uma com cerca de 18 a 20 lojas. A empresa aplica o "jeito Toyota" (*Toyota Way*) de fazer negócios também no seu relacionamento com as concessionárias. É baseado em três princípios:

1. **independência das concessionárias** como investidores externos à empresa;
2. **vitória compartilhada**: concessionárias e Toyota têm de prosperar juntos; e
3. **encorajamento de concorrência entre concessionárias**: essa é a forma de melhorar.

A empresa mede o desempenho das concessionárias periodicamente, a partir de um sistema de ranqueamento e recompensa. Fazem parte das dimensões medidas:

* vendas de carros novos e usados (unidades e fatia de mercado);
* vendas de serviços e peças pós-venda (unidades e fatia de mercado);
* satisfação do cliente;
* número de lojas, pessoal e oficinas; e
* lucratividade.

O contrato típico com uma concessionária dura três anos, e mau desempenho repetido pode resultar em suspensão ou desligamento da cadeia.

### Gestão de pedidos e de estoques de veículos na Toyota Japão

O processo de gestão de pedidos segue uma lógica puxada, com os clientes colocando pedidos na concessionária, que então os repassa à Toyota. Não é um sistema puxado puro, já que as concessionárias também fazem pedidos antecipados e recebem carros que foram produzidos para estoque, a fim de permitir atender clientes que querem disponibilidade imediata ou tempo muito curto de entrega. No caso de veículos para estoque, os carros são estocados em um ponto de armazenagem, onde as concessionárias podem inspecioná-los e instalar opcionais quando os pedidos entram. No geral, as concessionárias têm em média o volume de um mês de vendas em estoque em seus pontos de armazenagem, que em geral são localizados em regiões mais afastadas, devido ao alto custo do metro quadrado urbano no Japão. No final do ano, os veículos que foram comprados para estoque e sobraram, ou são vendidos como carros usados, ou sofrem descontos de preço para facilitar a venda como novos.

## Página 216

Similarmente, embora a Toyota vise a basear toda a produção doméstica japonesa em pedidos firmes de consumidores ou de concessionárias (produzindo apenas contra pedido), na realidade alguns carros são feitos para estoque. O departamento de marketing prepara planos de pedido baseados em previsões e os transmite ao departamento de produção. A empresa controla esse processo muito de perto e reajusta previsões e planos de produção mensalmente e com cuidado, de forma que um mínimo de veículos reste em estoque ao final do ano. Em média, a empresa mantém apenas cinco mil carros em estoque (ou em torno de 2% a 3% do volume mensal produzido). Solicita periodicamente às concessionárias que absorvam parte do seu estoque extra a fim de reduzir a sua posição de estoques. Em tempos de falta de veículos, como foi o caso do lançamento do carro híbrido Prius, a Toyota faz alguma alocação de carros para as concessionárias, baseada nos tamanhos de pedidos. Isso pode acarretar nas concessionárias o comportamento de "jogar" com o sistema, inflacionando pedidos para conseguir maior alocação. Na prática, isso acontece muito raramente, porque a Toyota deixa claro que, se esse comportamento for identificado, a alocação passará imediatamente a zero. A relação de confiança entre concessionárias e empresa parece auxiliar para que o efeito chicote seja atenuado. O efeito chicote, brevemente descrito no Capítulo 2 e tratado em mais detalhes adiante neste capítulo, nesse caso, ocorre quando concessionárias, exagerando seus pedidos, distorcem os padrões de demanda que a Toyota percebe nas suas vendas, causando, assim, ineficiências.

### 8.2 CONCEITOS

### 8.2.1 O que é e por que fazer gestão de demanda

A principal função da gestão de cadeias de suprimentos é garantir que o suprimento e a demanda sejam compatíveis. Essa compatibilidade pode ser obtida por meio de planos e ações que façam com que o suprimento se adeque à demanda, que façam com que a demanda se adeque às possibilidades do suprimento ou, ainda, por uma combinação de ambas. De todas as formas, uma boa gestão de cadeias de suprimentos começa com uma boa gestão de demanda. Neste capítulo, serão discutidos os seguintes tópicos referentes à gestão de demanda:

▪️**Ações sobre a demanda para redução de sua variabilidade:** são recomendáveis às vezes, porque, em geral, atender a demandas mais variáveis requer mais recursos ou acarreta que estes sejam utilizados de forma menos eficiente, por parte da cadeia de suprimentos. Às vezes, a necessidade de lidar com demandas mais variáveis é inevitável, mas outras vezes não. Com frequência, as próprias cadeias de suprimentos, por decisões internas inadequadas, fazem a variabilidade de sua própria demanda aumentar. Nesses casos, reduzir o nível de variabilidade com a qual a cadeia de suprimentos tem de lidar levará a uma maior eficiência de uso dos recursos da cadeia.

▪️**Previsão de demanda para reduzir incertezas:** é necessário que os gestores da cadeia de suprimentos trabalhem com o menor nível possível de incerteza, já que a necessidade de lidar com a dúvida normalmente reduz a eficiência e/ou a eficácia da operação. Há vários tipos de incerteza que podem afetar negativamente o desempenho da gestão de cadeias de suprimentos, e a incerteza da demanda futura é uma das mais importantes. Ela fará com que a cadeia tenha de se preparar para uma faixa de possibilidades futuras, o que demandará mais recursos quanto maior for a faixa. O uso de boas técnicas de previsão faz com que a incerteza sobre a demanda futura seja menor e, portanto, com que o uso dos recursos da cadeia de suprimentos seja mais eficiente com simultâneo maior nível de serviço logístico.

## Página 217

▪️**Gestão de preço e de receitas:** um último aspecto importante sobre a gestão de demanda em cadeias de suprimentos diz respeito à gestão de receitas. Gestão de receitas é um tópico essencial no ato de balancear adequadamente o uso de recursos e o nível de serviço ao cliente e inclui o tratamento analítico de questões como: quanto, em cada momento, o cliente está disposto a pagar pelo serviço ou produto solicitado? Quanto da capacidade disponível na cadeia de suprimentos deveria ser alocada a cada tipo de cliente para maximização de receitas? Respostas erradas a essas perguntas podem comprometer receitas por preços subestimados e/ou acarretar perda de clientes importantes por incapacidade de atendê-los.

Esses três aspectos da gestão de demanda em cadeias de suprimentos serão tratados em detalhes no restante deste capítulo.

### Ações sobre a demanda para redução de variabilidade

A variabilidade da demanda diz respeito a quanto a demanda varia dentro de um ciclo; por exemplo, um ano para produtos sazonais (demandas sazonais variam de acordo com as estações do ano). Pense na demanda de sorvetes no Brasil. A demanda no pico do verão chega a ser de cinco a sete vezes maior do que a demanda no vale de demanda, no inverno. A cadeia de suprimentos dos fabricantes de sorvetes tem, portanto, sua demanda bastante variável. Já outros produtos podem apresentar demanda bem menos variável ao longo do ano. A demanda de algumas peças de reposição, como as pastilhas de freio, varia, com uma demanda levemente maior no período que antecede as férias (quando muita gente faz revisões em seus veículos), mas essa variação não é drástica – os gestores da cadeia de suprimentos de pastilhas de freio, então, encaram uma demanda muito menos variável que os gestores da cadeia de sorvetes. A Figura 8.4 ilustra o conceito.

![alt text](figura8-4.png)

**Figura 8.4** Diferentes níveis de variação da demanda encarada por uma cadeia de suprimentos.

A implicação de terem de lidar com uma demanda mais variável é que as cadeias de suprimentos têm de responder a essa variação. A resposta a qualquer variação requer recursos adicionais (e quanto maior o nível de variação, maiores os níveis de recursos necessários). Por exemplo, se a cadeia de suprimento de sorvetes decidir por fabricar e entregar sorvetes nas mesmas taxas em que o produto é consumido (em unidades por semana), a cadeia terá de produzir uma enorme quantidade de sorvetes por semana no verão – e, portanto, a capacidade das fábricas terá de ser equivalente ao pico da demanda. Isso requererá um investimento em capital (máquinas e instalações) bastante grande, que ficará subutilizado durante o inverno, quando as fábricas produzirão a uma taxa equivalente ao nível mínimo da demanda.

Assim, a cadeia trabalhará de forma ineficiente, com baixo índice médio de utilização de seus recursos. Esse efeito e a decorrente ineficiência da cadeia será menor para o fabricante de pastilhas de freio: o investimento em capital terá de ser menor (pois o pico de demanda é menor) e a ociosidade durante o período de demanda baixa também será menor. Veja a Figura 8.5.

![alt text](figura8-5.png)

**Figura 8.5** Implicações de uma maior variabilidade de demanda na eficiência das cadeias de suprimentos quando a produção segue a demanda.

## Página 218

Mesmo que as cadeias de suprimentos trabalhem no sentido de manterem seus níveis de produção mais estáveis ao longo do tempo (para conseguir índices mais constantes de utilização de recursos e menor necessidade de investimento de capital), usando estoques para conseguir compatibilizar suprimento e demanda (continuando a produzir durante o período de baixa demanda a fim de construir estoques que serão usados posteriormente para atender o pico), os custos de fazer isso serão maiores para as cadeias que encaram maior variabilidade de demanda, pois os níveis de estoques necessários serão maiores. Veja a Figura 8.6.

![alt text](figura8-6.png)

**Figura 8.6** Implicações de uma maior variabilidade de demanda na eficiência das cadeias de suprimentos quando a produção é nivelada e estoques são usados.

São infinitas as opções de escolha que uma cadeia de suprimentos tem para compatibilizar seu suprimento com sua demanda, possivelmente sem usar nenhum dos casos extremos ilustrados anteriormente, mas combinações deles. Uma coisa, entretanto, fica clara, qualquer que seja a opção escolhida: uma cadeia de suprimentos incorre em custos maiores quando precisa lidar com maior variabilidade de demanda.

| 💡**Fique atento**💡{bg=amarelo} |
| --- |
| Se for possível reduzir a variabilidade da demanda por meio de ações, isso deve ser feito sempre que os custos das ações forem menores que os custos de lidar com a variabilidade. Isso porque os custos incorridos por uma cadeia de suprimentos para lidar com uma demanda mais variável são, na grande maioria das vezes, maiores do que os custos de lidar com uma demanda menos variável. |

### 8.2.2 Causas da variabilidade da demanda

Há duas causas possíveis para a variabilidade de demanda que afetam as cadeias de suprimentos:

▪️**variações da demanda do consumidor final:** são variações – necessárias ou não – nos padrões de compra e consumo dos produtos e serviços oferecidos; e

▪️**variações causadas pelo efeito chicote:** são variações na demanda de partes da cadeia de suprimentos causadas não apenas pelas variações nos padrões de compra e consumo do usuário, mas por ações evitáveis e condições controláveis internas à cadeia de suprimentos.

Cada uma é analisada a seguir, juntamente com as opções gerenciais disponíveis para combatê-las.

**Variações da demanda do consumidor final**

As ciclicidades da demanda são exemplos. Pode haver ciclicidade *diária* na demanda de restaurantes *fast-food*, por exemplo (acúmulo de demanda nos horários de refeição); pode haver ciclicidade *semanal* na demanda por entretenimento, como nos cinemas, em que a demanda se concentra nos fins de semana; pode haver ciclicidade *mensal* na demanda por itens de supermercado, que se concentra depois dos dias de pagamento; pode haver ciclicidades *anuais*, como a demanda por cerveja, maior no verão que no inverno. Há basicamente duas políticas que podem ser usadas para atenuar as variações da demanda do consumidor final: a primeira se refere a tentar *alterar as curvas de demanda*, de modo que pelo menos parte da demanda do período de pico seja transferida para o período de baixa, e a segunda se refere a *oferecer produtos e serviços com padrão oposto de ciclicidade* em relação aos produtos e serviços originais. Ambas as políticas são discutidas a seguir.

## Página 219

Alterar as curvas de demanda significa conceber e implantar estratégias de persuasão (pelo menos, de parte) dos clientes que demandariam seus produtos e serviços no período de pico a fazê-lo no período de baixa demanda. Isso pode ser feito por meio da oferta dos produtos a preços reduzidos nos períodos de baixa demanda. As companhias telefônicas fazem isso, oferecendo alguns pacotes com tarifas reduzidas para madrugada e fim de semana, os cinemas oferecem entradas cerca de 10% mais baratas de segunda a quarta-feira, os hotéis e companhias aéreas oferecem preços especiais para baixa estação, alguns varejistas oferecem descontos para os clientes que anteciparem suas compras de Natal.

| 🔵**SAIBA MAIS**{bg=azul} |
| --- |
| **Vantagens adicionais de procurar antecipar demanda do pico**<br><br>Quando foram mencionadas empresas que oferecem descontos a fim de que os clientes efetuem seus pedidos antecipadamente ao pico de Natal, por exemplo, é importante perceber que, além de suavizar a demanda, essa ação pode trazer outro benefício. Os clientes que resolverem aceitar a oferta de colocarem pedidos antecipadamente poderão se tornar uma amostra com representatividade do total de pedidos a serem recebidos no pico. Essa amostra pode dar importantes informações antecipadas para permitir melhores previsões sobre quais produtos serão pedidos pelos outros clientes. Como isso ocorre com antecipação, a cadeia de suprimentos poderá se preparar melhor, com menor incerteza sobre a demanda futura. Confecções como a Benetton e a Zara usam esse artifício para "testar" suas coleções antes de cada estação e verificar com antecipação quais modelos vão agradar mais ou menos aos seus clientes.<br><br>**Questões para discussão** |

Redução de preço não é a única forma de alterar a curva de demanda. Às vezes, comunicação pode também ser eficaz. Divulgar que uma ligação para um *call center* será atendida muito mais rapidamente depois das oito horas da noite pode levar uma boa parte da demanda a buscar o serviço neste período. A ideia dessas políticas é tentar nivelar, tanto quanto possível, a curva de demanda, com vistas a diminuir seu nível de variabilidade.

| 💡**Fique atento**💡{bg=amarelo} |
| --- |
| **Algumas fontes de variabilidade de demanda são autoimpostas**<br><br>Às vezes, as empresas se autoimpõem maiores necessidades de lidar com níveis de variabilidade do que seria necessário. Um exemplo típico são as cotas mensais que as equipes de vendas muitas vezes têm de cumprir. Isso induz um comportamento nas equipes de vendas (e nas equipes de compras dos clientes) que se traduz no seguinte: os compradores dos clientes aguardam até que o final do mês se aproxime para fazer seus pedidos, e que os vendedores comecem a ficar preocupados com o cumprimento de suas metas mensais, porque isso fará com que estes se tornem mais "permeáveis" a pressões por redução de preços.<br><br>Os vendedores, correspondentemente, também começam a se esforçar mais para conseguir pedidos quando o fim do mês se aproxima. Ambas as atitudes colaboram para que os pedidos se acumulem nos últimos dias do mês. Algumas empresas brasileiras chegam a ter mais de 40% de sua demanda concentrada nos últimos quatro ou cinco dias do mês. Isso faz com que a demanda seja baixa no início e meio do mês e tenha um pico (com o qual a cadeia de suprimentos terá de lidar) no final. Essa variabilidade prejudica muito o nível de eficiência das cadeias. Uma solução adotada por muitas empresas é estabelecer, em vez de metas mensais aos seus vendedores, metas, por exemplo, para cada dez dias ou mesmo metas semanais. Com isso, tentam atenuar os picos de demanda autoimpostos.|

## Página 220

Oferecer produtos e serviços com padrão oposto de ciclicidade se refere a tentar achar produtos e serviços que utilizem os mesmos recursos da cadeia de suprimentos para serem produzidos e entregues, mas que tenham a ciclicidade de suas curvas de demanda diametralmente opostas à ciclicidade das curvas dos produtos e serviços originais. Os hotéis fazem isso para lidar com suas ciclicidades semanais. Sabendo que seus hóspedes executivos demandam muito mais seus serviços durante os dias úteis da semana, criam pacotes promocionais para famílias a passeio, cuja demanda é oposta àquelas dos executivos: concentra-se nos fins de semana. Com isso, a soma total da demanda de executivos e de famílias a passeio será muito menos variável que a demanda de cada uma separadamente. Isso também pode ter influência positiva na receita dos hotéis, como será visto adiante neste capítulo. As cadeias fabricantes de sorvetes também procuram explorar demandas por sobremesas geladas com maior teor de gordura que possam ser consumidas no inverno para se contrapor a uma ciclicidade com pico no verão de produtos como os picolés. Ambos utilizam muitos dos mesmos recursos da cadeia, mas em diferentes períodos do ano – dessa forma, resultando numa demanda global muito mais nivelada, com correspondentes em maiores níveis de eficiência. O mesmo ocorre com as cadeias de suprimentos de cerveja, que tendem a lançar produtos mais encorpados (como as cervejas tipo *Stout* ou *Bock*) para consumo no inverno, a fim de se contrapor a uma demanda, muito mais concentrada no verão, de cervejas mais leves, como as do tipo *Lager*.

A Figura 8.7 ilustra as duas políticas descritas anteriormente.

![alt text](figura8-7.png)

**Figura 8.7** Duas políticas para nivelar demanda de produtos e serviços com demanda cíclica.

### Efeito chicote (*bullwhip effect*)

Em cadeias de suprimentos, grande parte da variabilidade que as operações têm de enfrentar é causada não pelas variações da demanda do consumidor final, mas por práticas e decisões tomadas por outros membros da cadeia de suprimentos. O efeito da variabilidade (também chamada de volatilidade) ampliada percebida por empresas dentro de uma cadeia de suprimentos (em geral, mais a montante da cadeia) e causado por razões internas à própria cadeia é chamado de efeito chicote, brevemente descrito no Capítulo 2 e discutido em mais detalhes agora.

| 💡**Fique atento**💡{bg=amarelo} |
| --- |
| O efeito chicote é um fenômeno dinâmico que faz com que pequenas variações de demanda no nível do consumidor final de uma cadeia de suprimentos se amplifiquem crescentemente à medida que as informações sobre essa demanda (normalmente na forma de *pedidos*) são transmitidas (e distorcidas) sequencialmente ao longo das relações cliente-fornecedor na cadeia de suprimentos. |

Uma ilustração do efeito chicote pode ser observada a partir de uma cadeia de suprimentos simplificada, como a mostrada na Figura 8.8.

![alt text](figura8-8.png)

## Página 221

Imagine que cada um desses nós da cadeia de suprimentos (varejista, distribuidor, fabricante e fornecedor) tenha a política de manter em estoque o equivalente a um mês de sua demanda imediata. Assim, se a demanda imediata do nó sobe, o sistema de gestão faz também subir o seu nível de estoques, e se a demanda cai, o sistema ajusta para baixo o nível de estoques. Imagine que a demanda do consumidor, percebida pelo varejista dessa cadeia, tem sido estável há vários meses e igual a 50 unidades por mês. Como a cadeia trabalha para manter a demanda atendida e para manter o equivalente à demanda de um mês em estoque, no mês corrente (Mês 1), todos os nós da cadeia têm demanda percebida de 50 unidades, entregam 50 unidades para seus clientes imediatos, compram 50 unidades de seus fornecedores imediatos e mantêm em estoque 50 unidades. A cadeia toda está estável. Isso pode ser visto pela primeira linha (correspondente ao Mês 1) da tabela da Figura 8.9. Essa tabela demonstra o que acontece com as demandas imediatas dos nós da cadeia quando uma pequena alteração de demanda acontece no nível do consumidor final, que passa de 50 a 53 unidades a partir do Mês 2, mantendo-se então nesse novo patamar estável de 53 unidades por mês. As linhas da tabela representam os meses, de 1 até 6, e as colunas representam o que ocorre com os pedidos e com os estoques (de final do mês) de cada um dos nós da cadeia, mês a mês.

![alt text](figura8-9.png)

**Figura 8.9** Ilustração simplificada do efeito chicote numa cadeia de suprimento de quatro nós que atende ao consumidor final (adaptado de Slack, 2002).

Observe que, quando a demanda do consumidor final vai de 50 unidades no Mês 1 para 53 unidades no Mês 2, o novo nível de estoque do varejista definido para o Mês 2 passa a ser de 53 unidades, de acordo com sua política. Isso quer dizer que o pedido do varejista para o distribuidor, no Mês 2, é de 56 unidades (53 para atender a demanda do consumidor e mais três para que o nível de estoques passe de 50 para 53 unidades). A demanda imediata percebida pelo atacadista, então, no Mês 2, é de 56 unidades. Como sua política de estoque também é de manter em estoque o equivalente a um mês de demanda, ele define que seu estoque tem de passar de 50 para 56 unidades (que é a demanda percebida pelo atacadista). Para isso, faz um pedido de 62 unidades ao fabricante (56 para atender ao pedido do varejista e mais seis para que seu próprio estoque aumente de 50 para 56 unidades). Essa distorção da informação a respeito da demanda do consumidor continua ocorrendo para outros nós da cadeia, com amplitude aumentada. No Mês 3, a demanda do consumidor é novamente de 53 unidades. O varejista, então, pede 53 unidades para o distribuidor. Este agora redefine seu nível de estoque para 53 unidades, o que o faz colocar um pedido de apenas 50 unidades com o fabricante (já que três das unidades necessárias são tiradas de seu estoque, que deve diminuir de 56 para 53 unidades). O efeito se propaga com novas distorções para trás na cadeia. Isso ocorre nos meses subsequentes, de forma que só no sexto mês a cadeia atinge estabilidade no novo patamar de demanda de 53 unidades. Observe no gráfico da Figura 8.9 como a variabilidade da demanda aumenta à medida que a informação sobre a demanda do consumidor viaja para trás na cadeia, devido a distorções causadas pelos reajustes nos níveis de estoques dos vários nós da cadeia. Lembre-se de que essa volatilidade aumentada da demanda tem de ser atendida pelos nós da cadeia, o que exige deles mais recursos, aumentando seus custos.

## Página 222

Esse exemplo simplificado demonstra o efeito chicote, mas de uma forma muito mais suave do que o que ocorre na realidade das cadeias de suprimentos. Isso porque, nesse exemplo, a cadeia trabalha só com um produto, não há nós concorrentes (só há um varejista, um distribuidor, um fabricante e um fornecedor), a demanda do consumidor final é relativamente bem comportada (apenas passa de um patamar estável de 50 unidades por mês para outro patamar estável de 53 unidades por mês), não há exigência de quantidades mínimas a serem produzidas e despachadas, entre outras simplificações.

Em outras palavras, nas cadeias de suprimentos reais, o efeito chicote e suas consequências são muito mais sérios.

Faz parte da função de gestão de demanda, dentro das cadeias de suprimentos, a análise e tomada de ações que combatam as causas do efeito chicote, para que as variabilidades evitáveis de demanda sejam reduzidas e, por consequência, as eficiências da cadeia aumentem. Analisemos as possíveis causas do efeito chicote.

| 💡**Fique atento**💡{bg=amarelo} |
| --- |
| Em situações reais, há cinco principais motivos para o efeito chicote: as atualizações descoordenadas de previsões de demanda dos nós da cadeia, as formações de lotes de produção e de transporte, as flutuações de preço, o racionamento/comportamento oportunista e as demoras nos fluxos de materiais e informação. |

Analisemos os cinco motivos para o surgimento do efeito chicote e formas de combatê-los: atualizações descoordenadas de previsões, formações de lotes, flutuações de preço, racionamento/comportamento oportunista e demoras nos fluxos envolvidos.

**Atualizações descoordenadas de previsões dos nós da cadeia:** pode ser observado pelo exemplo da Figura 8.6 que, quando um nó da cadeia percebe um crescimento de sua demanda imediata, esse crescimento é visto como indicativo de uma *tendência* de crescimento. Essa percepção faz com que o nó reveja suas previsões de demanda e, com base nisso, reveja para cima seus níveis de estoques. Isso faz com que os pedidos ao seu fornecedor sejam maiores do que aqueles recebidos do seu cliente. Seu fornecedor, portanto, percebe uma "tendência" de crescimento ainda maior e reajusta seus níveis de estoque de acordo. As atualizações descoordenadas das previsões fazem com que a volatilidade aumente para trás na cadeia de suprimentos.

Uma solução é aumentar os níveis de coordenação e troca de informação entre nós da cadeia a fim de que a visibilidade da demanda do consumidor final seja maior e mais compartilhada. Dessa forma, os nós coordenados trabalharão com previsões de demanda comuns. Uma das iniciativas formais que pregam essa coordenação é o CPFR, ou *collaborative planning, forecasting and replenishment*, descrito adiante neste capítulo.

**Formação de lotes de produção e/ou transporte:** sempre que se formam lotes (e o problema é maior quanto maiores os lotes) de produção e/ou de transporte, ocorre distorção da informação a respeito da demanda do cliente para o fornecedor. Imagine um produto com demanda constante de 50 unidades por semana, no nível do varejo. Na ausência de formação de lotes no processo de ressuprimento do varejista, a demanda percebida pelo nó imediatamente a montante, por exemplo, um distribuidor, será também de 50 unidades por semana. A informação da demanda não é, portanto, distorcida. Imagine agora que o varejista prefira comprar quantidades mínimas de 200 unidades do produto para que se obtenham economias de escala no transporte. O varejista agora faz pedidos de 200 unidades quando decide ressuprir e passa, a partir daí, quatro semanas sem colocar pedidos com o distribuidor. A informação sobre a demanda constante de 50 unidades por semana foi distorcida, e a demanda percebida pelo distribuidor agora é muito mais variável, de 200 unidades em algumas semanas e zero nas outras.

Fica claro aqui que o combate aos lotes, tanto de produção (com iniciativas como a redução dos tempos e custos de preparação de máquina – para uma boa referência, ver Dillon e Shingo, 1985) como de transporte (com o uso de opções de transporte que permitam transportes de quantidades menores e mais frequentemente, por exemplo, com a consolidação de cargas com uso de operadores logísticos – ver Capítulo 10) pode ajudar a reduzir a variabilidade da demanda dentro das cadeias de suprimentos.

## Página 223

**Flutuações de preço:** flutuações de preço ocorrem, por exemplo, quando empresas lançam mão de ferramentas de marketing, como promoções. Imagine alguém que compre o produto fraldas descartáveis para bebês, na quantidade de 50 unidades por semana. O consumo desse produto em geral é exclusivamente determinado pela necessidade do pequeno usuário final, que não varia muito de semana para semana. O pai do bebê vai, então, comprar fraldas no sábado e percebe que o supermercado está fazendo uma promoção, vendendo as fraldas por um preço 30% menor que o normal. A decisão do pai então muda e, em vez de comprar 50 unidades, compra 150 unidades, para aproveitar o bom preço e estocar o produto para uso futuro. Qual a consequência? Ele passa três semanas sem comprar o produto. A demanda aumenta agora, como resposta à promoção, e diminui no futuro, causando uma variação artificial, que distorce a informação sobre a demanda quando essa viaja para trás na cadeia. E essa distorção de informação é crescente, quanto mais para trás ela viaja na cadeia. A solução aqui é o que alguns varejistas (como o Walmart) fazem quando usam a lógica de "preço baixo todo dia" – optam por não fazer muito uso de promoções a fim de não distorcerem a demanda, pois sabem que isso vai aumentar a ocorrência do efeito chicote, aumentando os custos na cadeia e, como consequência, no médio e longo prazos, os preços finais dos produtos terão de subir para compensar os custos mais altos, tornando a cadeia toda menos competitiva. Quanto menos se permitirem flutuações de preço, portanto, numa cadeia, menos será sentido o efeito chicote.

**Racionamento/comportamento oportunista:** quando ocorre racionamento de um produto, ou seja, quando não há produto suficiente para atender a toda a demanda (por exemplo, porque o efeito chicote está na sua fase de aumento desproporcional e artificial da demanda percebida), muitas vezes os fornecedores, para não deixarem nenhum cliente totalmente desatendido, optam por atender parcialmente a todos os pedidos que recebe. Por exemplo, suponha que o total dos pedidos recebidos por um fornecedor, de vários clientes, seja de 100 mil produtos. Suponha que a capacidade do fornecedor é de apenas 80 mil produtos. Ele decide, então, atender a apenas 80% dos pedidos de cada um dos clientes, assim, não atende a nenhum de forma completa, mas também não deixa nenhum sem produto. Parece uma política justa, mas que pode acabar gerando um comportamento indesejável por parte de alguns clientes, que, percebendo que só têm 80% dos seus pedidos atendidos, passam a inflar seus pedidos para obter a totalidade de suas necessidades. Por exemplo, se um cliente necessita de dez mil unidades, mas sabe que se pedir dez mil só vai receber oito mil, acaba solicitando 12.500 para receber 80%, ou seja, os dez mil que necessita. Isso acaba fazendo com que o total de pedidos colocados seja ainda mais distorcido, de forma artificial, ampliando o impacto do efeito chicote. Nesses casos, é importante analisar com cuidado as ações de racionamento a fim de evitar que a empresa acabe sofrendo ainda mais com os efeitos da distorção artificial da sua demanda (veja o caso de abertura deste capítulo do produto Prius, no quadro sobre a Toyota).

**Demoras nos fluxos de materiais e de informação:** cadeias de suprimentos que trabalham com produtos físicos em geral sofrem mais com o problema das demoras nos fluxos de materiais (*lead times*), os tempos decorridos entre o momento de identificação da necessidade de um material e o momento em que o material passa a estar disponível para uso. Incluídos no *lead time* estão os tempos de produção, transporte, desembaraços alfandegários, inspeções de recebimento e outros. Demoras no fluxo de informação ocorrem no processo de colocação do pedido: elaboração do pedido, transmissão do pedido, recebimento do pedido pelo fornecedor, análise de crédito e outras atividades que ocorrem antes mesmo que a produção e despacho do produto físico se iniciem. A literatura sugere que, quanto maiores as demoras envolvidas nas cadeias de suprimentos, mais se faz sentir o efeito chicote (Sterman, 2000). Muitas vezes, a decisão pela troca de um fornecedor próximo para um fornecedor localizado do outro lado do mundo se faz só com base numa comparação de preços. Isso pode trazer riscos para a cadeia, porque, em geral, acompanhando a troca vem também um aumento substancial nas demoras – tanto do fluxo de informação como do fluxo de materiais, o que aumenta a volatilidade da cadeia, e esse efeito e seu impacto no custo da cadeia é muitas vezes negligenciado quando a empresa toma a decisão de trocar um fornecedor.

A solução aqui é combater as demoras – seja mantendo fornecedores mais próximos fisicamente ou organizacionalmente, ou por aumentar a agilidade dos fluxos envolvidos. Além disso, também é necessário que as decisões referentes às cadeias de suprimentos sejam tomadas de forma a contemplar amplamente os seus impactos na cadeia, e não apenas levando em conta custos ou impactos localizados (como, por exemplo, considerar apenas o preço do item na decisão de qual fornecedor usar).

| 🔵**SAIBA MAIS**{bg=azul} |
| --- |
| **"O Jogo da cerveja", uma excelente maneira de entender e estudar o efeito chicote** <br><br> Existem alguns sites nos quais você pode jogar o clássico "The beer game", um jogo que demonstra claramente o efeito chicote, simulando uma simples cadeia de suprimentos que fabrica e distribui cerveja. |

## Página 224

### 8.2.3 Previsão de demanda

O primeiro mandamento das previsões é "evitarás fazê-las".

**"Evitando" fazer previsões**

Evidentemente, não se está falando de fugir à responsabilidade de fazer as previsões, mas de evitar ter de fazê-las quando isso é possível. Quando uma empresa que vende para outra empresa parceira faz suas previsões sobre as compras que seu cliente colocará, está na verdade tentando antecipar um processo decisório do seu cliente. Por meio de uma maior aproximação, troca de informações e coordenação de processos decisórios, é possível ter do cliente informações a respeito de seus planos de produção para o futuro, com horizonte mais longo, para, dessa forma, ser capaz de, em vez de tentar "prever" o processo decisório de compra do cliente, "coordenar" a visão futura de demanda da empresa com o processo de planejamento do cliente. Com isso, as vantagens podem ser muito substanciais, principalmente em termos de redução das incertezas das previsões (e, portanto, melhorando o processo decisório da empresa). Entretanto, em muitas situações, principalmente quando se trata de prever a demanda do consumidor, previsões necessitam ser feitas.

**Conceitos básicos de previsão de demanda**

Em gestão de cadeias de suprimentos, muitos dos recursos têm "materialidade", têm existência física, como máquinas, equipamentos, instalações, materiais e pessoas. Esses recursos físicos apresentam uma característica importante para o gestor: eles têm inércia decisória, ou seja, as decisões com relação a esses recursos levam tempo para tomar efeito. Se um pedido de material é colocado com um fornecedor, só depois de certo tempo é que o material estará disponível para uso. O mesmo ocorre para a necessidade de um funcionário adicional, para uma nova máquina ou uma nova fábrica.

| 💡**Fique atento**💡{bg=amarelo} |
| --- |
| Para que o gestor da cadeia tome uma boa decisão, é necessário que tenha a visão mais clara possível (ou com a menor incerteza possível) do futuro, porque a decisão tomada hoje deve ser adequada, não ao presente, mas ao momento no futuro em que a decisão tomar efeito. |

Essa visão de futuro se obtém por intermédio das previsões — daí sua importância para um bom processo de tomada de decisões. Como diferentes decisões têm inércias decisórias diferentes (levam diferentes períodos de tempo para tomar efeito), previsões de diferentes horizontes são necessárias para um adequado suporte à decisão.

**Erros comuns em previsão de demanda**

Previsão, principalmente de demanda é, em geral, um dos assuntos mais controversos dentro das organizações. É muito frequente, também, em situações práticas, que as empresas incorram em certos erros quando tratam do assunto "previsões". Quatro desses erros são discutidos a seguir.

> *Erro 1 das previsões: confundir previsões com metas e, um erro subsequente, considerar as metas como se fossem previsões.*

| ⚠️**Conceito-chave**⚠️{bg=verde} |
| --- |
| * Previsões de demanda são estimativas de como vai se comportar o mercado demandante no futuro, sobre o potencial de compra do mercado. <br><br> * Metas são a parcela do potencial de compra do mercado que a empresa deseja atender e pode ter um objetivo motivacional, de incentivo a uma maior proatividade dos vendedores, por exemplo. <br><br> * Previsão de vendas é a melhor estimativa realista sobre quantos produtos a empresa vai vender no futuro, considerando as informações disponíveis. |

Muitas empresas confundem estes dois conceitos: previsões e metas.

## Página 225

Uma meta excessivamente ambiciosa, com intuito motivacional, considerada como previsão pode ter como consequência um suprimento superestimado em relação às previsões, acarretando excesso de estoques com os correspondentes custos associados. Isso ilustra o primeiro erro em gestão de previsões: a confusão entre metas e previsões. É crescente o número de operações que deliberadamente definem dois números separados para representar metas e previsões, com diferentes propósitos: as metas, com propósitos motivacionais; as previsões, com propósitos de subsídio à tomada de decisão quanto a suprimentos. A Unilever Brasil, divisão HPC (health and personal care), apenas para citar um exemplo, recentemente estabeleceu novos processos de gestão de demanda nesse sentido, com bons resultados preliminares.

> Erro 2 das previsões: gastar tempo e esforço discutindo se se acerta ou erra nas previsões, quando o mais relevante é discutir o quanto se está errando e as formas de alterar processos envolvidos, de forma a reduzir esses erros, ou incertezas.

Frequentemente, ouvem-se discussões nas empresas, muitas vezes inócuas, sobre "acertar" ou "errar" previsões. Inócuas, porque os envolvidos deveriam, desde o princípio, estabelecer que não se deveria discutir sobre acertar ou errar previsões, porque previsões estão sempre erradas. É de sua natureza. Por isso chamam-se PREvisões, uma visão obtida antes de as coisas acontecerem (que não passa de uma estimativa educada e informada sobre o futuro).

Quando uma previsão acerta exatamente, em geral o acaso teve um papel importante. Nenhuma estimativa de pluviosidade para um determinado dia futuro será exatamente certa, seja ela feita por leigos ou por profissionais de meteorologia bem equipados. A diferença é que, em média, os erros de previsão cometidos pelos profissionais serão menores do que os cometidos pelos leigos. O importante, portanto, é que, embora ambas as previsões apresentem incerteza, as mais elaboradas, que se utilizam de dados melhores e que saibam concluir melhor a respeito desses dados, têm menor erro (ou incerteza). Com menor incerteza sobre a pluviosidade, um tomador de decisão sobre um evento futuro externo terá menores custos de erros associados ao processo de tomada de decisão. O mesmo ocorre com previsões para decisões sobre cadeias de suprimentos: o importante é procurar diminuir as incertezas, não discutir se há ou não incertezas nas previsões.

> Erro 3 das previsões: levar em conta, nas previsões que servirão para apoiar decisões em cadeias de suprimentos, um número só. Previsões, para gestão de cadeias de suprimentos, devem sempre ser consideradas com dois números: a previsão em si e uma estimativa do erro (ou grau de incerteza) dessa previsão.

Para gestores de cadeias de suprimentos, é importante saber não só quanto se espera ter de demanda ou vendas, mas também qual é o erro esperado para essa previsão. Em outras palavras, para cadeias de suprimentos, previsões são sempre dois números:

* uma estimativa da demanda ou da venda; e
* uma estimativa da incerteza, ou seja, do erro de previsão esperado, porque dele derivarão importantes decisões sobre os "colchões" de segurança (veja o Capítulo 9) que serão dimensionados para a cadeia de suprimentos (na forma de estoques, tempos ou capacidade extra), de forma a fazer frente a essas incertezas mantendo níveis desejados de serviço aos clientes.

> Erro 4 das previsões: desistir ou não se esforçar o suficiente para melhorar os processos de previsão por não se conseguir reduzir os erros às previsões, quando, em cadeias de suprimentos, não se necessita ter previsões perfeitas, mas sim previsões consistentemente melhores que as da concorrência.

Outro erro frequente que se ouve nas empresas acerca de previsões pode ser ilustrado pela frase: "tentamos muito fazer previsões de forma técnica, mas continuávamos a errar, então paramos!". Esse é um erro, porque "errar" é normal em previsões; o que interessa é quanto erramos. Quanto menores os erros, menores "colchões" de segurança – e correspondentes custos – teremos de providenciar. Vale a pena, então, continuar a colocar esforços no sentido de melhorar a qualidade de previsões, mesmo que os erros continuem aparentemente grandes. Não são necessárias previsões perfeitas num mercado competitivo. São, sim, necessárias previsões melhores (ou seja, com menos incertezas) que as previsões da concorrência.

### Horizontes e nível de agregação nas previsões

Um bom processo decisório sobre recursos que tenham inércia decisória se baseia em uma boa visão do futuro, obtida a partir de previsões. Nesse processo decisório, em geral, diferentes decisões têm inércias diferentes (ou seja, requerem diferentes períodos de tempo para tomarem efeito). Para bem apoiar essas decisões, portanto, é necessário que as previsões tenham diferentes horizontes. É necessário considerar um horizonte de curto prazo, para que a partir deste se tomem boas decisões de inércia pequena; um horizonte médio, para a consideração de decisões de inércia média; e um horizonte longo, para suportar decisões de inércia maior. A Figura 8.10 ilustra essa ideia.

## Página 226

![alt text](figura8-10.png)

| ⚠️**Conceito-chave**⚠️{bg=verde} |
| --- |
| O horizonte da previsão é definido pelo tamanho da inércia decisória (tempo decorrido entre a decisão ser tomada e a decisão efetivamente ser levada a efeito) da decisão à qual ela deve suportar. |

Geralmente, as decisões de inércia pequena envolvem níveis mais moderados de recursos – o efeito de uma decisão equivocada, portanto, não é tão relevante financeiramente; por exemplo, as referentes à decisão de usar horas extras.

As decisões de inércia maior, por outro lado, envolvem níveis mais elevados de recursos; em decorrência, os efeitos de uma decisão errada serão mais maléficos. Por exemplo, uma decisão de ampliação substancial de capacidade produtiva que inclua expansão de fábrica deve ser tomada com muita antecedência e envolve uma possível escolha e compra de terreno, projeto industrial, construção, aquisição de equipamentos, entre muitos outros.

Essa constatação pode ser um pouco inquietante numa primeira análise. Isso porque é sabido que decisões tomadas com maior antecedência requerem uma visão sobre um futuro mais longo. Em outras palavras, requerem previsões de mais longo prazo, que em geral são feitas sob condições de maior incerteza. Até intuitivamente sabemos que a probabilidade de erro nas previsões cresce com o horizonte. A Figura 8.11 ilustra essa ideia.

![alt text](figura8-11.png)

## Página 227

Se as decisões que envolvem maior volume de recursos têm de ser tomadas com maior antecedência e se tomar decisões com maior antecedência implica decidir com maior probabilidade de erro, isso indica que justamente aquelas decisões cujos erros podem ter consequências mais sérias são aquelas com maior probabilidade de erro. Como é então que a maioria das empresas tem sobrevivido? A resposta está relacionada ao conceito de *risk pooling* discutido inicialmente no Capítulo 2.

### Risk pooling (ou "consolidação de riscos")

Vamos analisar um pouco mais profundamente a questão de nossa previsão de venda para os sanduíches do exemplo hipotético do Capítulo 2. Imagine que as previsões de sanduíche tenham sido feitas não para a demanda do mês que vem, mas de um determinado mês, daqui a um ano. Por que nós nos preocuparíamos em desenvolver uma visão de futuro com um ano de antecedência para uma lanchonete de *fast-food*? Certamente para subsidiar aquelas decisões com inércia compatível. Quais são estas para uma lanchonete? Compra de hambúrguer ou peixe? Programação de turnos de trabalho? Provavelmente não. Estas são decisões de inércia menor – ou seja, podem ser tomadas com antecedência menor. As decisões que demandam antecedência de um ano são aquelas referentes a, por exemplo, expansão da loja.

Entretanto, para decidir sobre expansão da loja é necessário que se desenvolva uma visão de futuro desagregada, por sanduíche? Provavelmente não. Uma expansão da loja será capaz de produzir qualquer *mix* de sanduíches e, portanto, para esse tipo de decisão, que necessita desse nível de antecedência, uma visão agregada é suficiente. Como a visão agregada é muito menos sujeita a erro que a visão desagregada, pelo efeito de *risk pooling*, a decisão acaba por ser tomada sob menor nível de incerteza.

| 💡**Fique atento**💡{bg=amarelo} |
| --- |
| A agregação dos dados, que faz reduzir o nível de incerteza das previsões, compensa, até certo ponto, o aumento de incerteza causado pelo necessário aumento do horizonte de previsão nas decisões de inércia decisória alta. |

Em suma, por um lado, as decisões de maior inércia, que envolvem maiores recursos, necessitam de maior antecedência e também requerem uma visão de futuro com maior horizonte; portanto, estão mais sujeitas a incertezas. Por outro lado, essas mesmas decisões tendem a não requerer previsões desagregadas. Com a agregação, os erros de previsão ficam reduzidos, compensando a necessidade de antecedências mais longas com a possibilidade do tratamento agregado de informações.

Entretanto, para o mesmo planejamento da lanchonete, em algum momento haverá a necessidade de tratar o futuro com uma visão desagregada. Por exemplo, em determinado momento, será necessário decidir quanto hambúrguer ou peixe comprar. Então, necessariamente, uma previsão desagregada terá de ser feita, pois, se a nossa lanchonete vender mais ou menos BigFast (sanduíche de hambúrguer), por exemplo, isso implicará uma necessidade maior ou menor de hambúrgueres. Entretanto, a antecedência com que se precisará tomar essa decisão será muito menor que um ano. Talvez uma semana seja suficiente para permitir a reação do fornecedor de hambúrguer. Portanto, a previsão desagregada poderá ser feita com uma antecedência bem menor. Se, por um lado, a incerteza com que se trabalha nesse momento é maior em razão do grau de desagregação, por outro, a incerteza devida à antecedência é muito menor, pelo fato de a própria antecedência ser muito menor.

Isso significa que, se ao longo do horizonte de planejamento os níveis de antecedência e agregação dos dados forem trabalhados adequadamente, pode-se trabalhar com um nível de incerteza mais uniforme ao longo de todo o horizonte. A Figura 8.12 ilustra essa ideia.

A mensagem, então, é clara: só é possível desenhar adequados processos de previsão a partir do uso a ser feito das previsões, ou, em outras palavras, quais decisões elas vão apoiar. Só então se poderá definir, por exemplo, qual nível de agregação de dados será necessário. E lembre-se: previsões mais agregadas tendem a ser mais acertadas.

| 💡**Fique atento**💡{bg=amarelo} |
| --- |
| Para um determinado horizonte, as previsões devem ser feitas sempre com o nível máximo de agregação de dados que o processo decisório ao qual suportará permitir. |

## Página 228

![alt text](figura8-12.png)

### 8.2.4 Processo de previsão

Previsões são, em geral, o resultado de um processo, um encadeamento de atividades que inclui: a) a coleta de informações relevantes; b) o tratamento dessas informações; c) a busca de padrões de comportamento, muitas vezes fazendo uso de métodos quantitativos de tratamento de séries temporais de dados do passado; d) a consideração de fatores qualitativos relevantes; e) a projeção de padrões de comportamento; f) a estimativa de erros da previsão.

**Informações para previsão**

As principais informações que devem ser consideradas pelo sistema de previsão de vendas são (Corrêa e Corrêa, 2017):

* dados históricos de vendas, período a período;
* dados históricos referentes a vendas perdidas, possivelmente por não disponibilidade de produto;
* informações relevantes que expliquem comportamentos atípicos das vendas passadas, como, por exemplo, um aumento localizado de demanda devido a um incêndio ocorrido num concorrente que o tornou atipicamente impedido de fornecer por certo período;
* dados de variáveis correlacionadas às vendas que ajudem a explicar o comportamento das vendas passadas, como, por exemplo, a identificação do tipo de influência que a ocorrência de feriados emendados (pontes) exerce na demanda de um parque temático;
* situação atual de variáveis que podem afetar o comportamento das vendas no futuro ou estejam a ele correlacionados, como, por exemplo, os planos atuais de expansão de oferta da concorrência;
* previsão da situação futura de variáveis que podem afetar o comportamento das vendas no futuro ou estejam a ele correlacionados, por exemplo, qual tendência de evolução das compras por *e-commerce* (comércio eletrônico) afetará diretamente a demanda por serviços de telefonia para acesso rápido à internet;
* conhecimento sobre a conjuntura econômica atual e previsão da conjuntura econômica no futuro, por exemplo, quais as expectativas de crescimento econômico, de padrões de renda dos mercados-alvo, entre outros;
* informações de clientes que possam indicar seu comportamento de compra futuro, por exemplo, vindas de pesquisas de mercado sobre intenções de compra;
* informações relevantes sobre a atuação de concorrentes que influenciam o comportamento das vendas, por exemplo, padrões de comportamento da concorrência quanto a promoções e eventos; e
* informações sobre decisões da área comercial que podem influenciar o comportamento das vendas, por exemplo, planos de promoções, lançamentos e relançamentos de produtos, entre outros.

**Cuidados preliminares com dados históricos**

Os dados históricos de vendas, informações fundamentais para se elaborarem as previsões, podem esconder algumas armadilhas; por isso, é importante saber analisá-los. Um ponto fundamental é que os dados de vendas sejam referentes às quantidades e momentos em que o cliente gostaria de receber o produto, e não às quantidades e datas

## Página 229

efetivas da entrega. Se isto não for garantido, os dados de vendas passadas poderão representar aquilo que a empresa conseguiu entregar no momento em que conseguiu entregar (possivelmente por limitações de capacidade), e não o que os clientes gostariam de receber. Isso pode fazer com que, em algumas situações, a empresa projete sua própria capacidade de produção passada como previsão de vendas futuras.

Outro aspecto importante é coletar informações sobre eventos relevantes que possam explicar comportamentos atípicos das vendas passadas. Caso esses eventos não sejam passíveis de se repetir no futuro, sua influência sobre os dados históricos de vendas deve ser expurgada a fim de que o tratamento estatístico não venha a projetar tais efeitos no futuro.

Em termos gerais, o importante é que, antes de se começar a trabalhar com dados do passado, eles sejam "limpos" para que as eventuais projeções não sejam distorcidas, levando a más decisões.

### 8.2.5 Processo de previsão de vendas

A Figura 8.13 ilustra um modelo de processo de previsão de vendas que determina, em linhas gerais, a forma com que uma série de atividades inter-relacionadas contribui para a compreensão das informações consideradas na discussão anterior e, com base nelas, gerar uma previsão. Esse modelo apresenta inicialmente o tratamento estatístico (matemático) dos dados históricos de vendas e de outras variáveis que ajudem a explicar o comportamento das vendas no passado. Outros fatores são, então, considerados numa etapa posterior, para a qual são levantadas informações de clientes, informações sobre a conjuntura econômica atual e futura, informações de concorrentes, além de outras informações relevantes do mercado. Também é importante que se conheçam e se levem em conta as decisões da área comercial que podem afetar o comportamento das vendas, como variações de preço, promoções, esforços especiais de vendas, entre outras.

O tratamento de todas essas informações e sua combinação com os dados históricos tratados estatisticamente deve ser feito com a participação de representantes das principais áreas e parceiros da cadeia envolvidos no processo de planejamento da cadeia de suprimentos para que se obtenha legitimidade dos resultados e que se consiga que todos os nós da cadeia de suprimentos trabalhem com as mesmas previsões, para que o efeito chicote analisado anteriormente seja reduzido.

![alt text](figura8-13.png)

## Página 230

**CPFR (*collaborative planning, forecasting and replenishment*): colaboração nos processos de previsão**

Em 1995, por iniciativa da gestão de cadeia de suprimentos do Walmart e da Benchmarking Partners, iniciou-se o desenvolvimento do CPFR (planejamento, previsões e ressuprimento colaborativos), ainda à época com o nome de CFAR (*collaborative forecasting and replenishment*). Hoje com a participação de numerosos parceiros, a iniciativa de CPFR evoluiu e consiste em uma prática gerencial que combina a inteligência de múltiplos parceiros de negócio no processo de planejamento e atendimento da demanda do consumidor. Visa a melhorar a integração das cadeias suportando e auxiliando o desenvolvimento de práticas e visibilidade compartilhadas entre parceiros da cadeia na previsão da demanda, gestão dos estoques e dos processos de ressuprimento de produtos ao longo da cadeia de suprimentos. Informações constantemente compartilhadas entre fornecedores e clientes na cadeia ajudam no planejamento e atendimento dos usuários finais. Isso permite a contínua atualização das informações de estoque e das necessidades futuras, tornando a cadeia de suprimentos como um todo mais eficiente.

O CPFR tem um modelo de referência, mostrado na Figura 8.14 (visite o *site*, informado no *boxe* a seguir, para mais informações).

![alt text](figura8-14.png)

## Página 231

O anel externo se refere ao fabricante; o anel intermediário, ao varejista; e o anel interno, ao consumidor. Percebe-se, portanto, que o CPFR é um modelo que trabalha mais com previsão, planejamento e reposição de produtos acabados, mais do que com os mesmos processos entre fabricante e fornecedores, embora o guia geral do CPFR mencione a possibilidade de extensão do modelo de referência. Quanto ao processo específico de previsão, esta é, segundo o que prescreve o CPFR, feita no nível do ponto de venda e de forma colaborativa entre os parceiros envolvidos na cadeia, visando a que os vários parceiros trabalhem sobre uma base comum, reduzindo assim um dos fatores causadores do efeito chicote, a atualização descoordenada de previsões entre membros da cadeia. O CPFR depende de interconectividade entre os parceiros da cadeia de suprimentos, mas certamente o problema técnico não é o mais difícil de resolver – hoje a tecnologia de internet permite interconectividade plena por custos aceitáveis. A dificuldade em geral está mais em criar as condições organizacionais para que a colaboração ocorra. Por exemplo, como obter os níveis necessários de confiança entre parceiros para que a troca de informações ocorra, como obter o alinhamento de interesses dos parceiros da cadeia para que todos ajam para o bem comum da cadeia, e não de forma oportunista. A ideia de colaboração entre parceiros da cadeia de suprimentos nos processos de planejamento, previsões e decisões sobre políticas de gestão de estoques é bastante poderosa e o potencial é bastante promissor.

### Previsão de vendas de curto prazo

Para previsões de curto prazo (até três meses), normalmente se aceita mais a hipótese de que o futuro seja uma "continuação" do passado, ao menos do passado recente, ou seja, as mesmas tendências de crescimento ou declínio observadas no passado devem permanecer no futuro, assim como a sazonalidade ou ciclicidade observadas no passado. A técnica então geralmente utilizada é a de projeção; são os chamados *modelos intrínsecos*, ou de séries temporais simples. Essa denominação vem do fato de que nesses modelos de previsão se busca fazer uma correlação entre as vendas passadas e o tempo, projetando-se comportamento (padrão de variação) similar para o tempo futuro, como pode ser visto na Figura 8.15.

![alt text](figura8-15.png)

## Página 232

A projeção é feita modelando-se matematicamente os dados do passado. Geralmente, procura-se decompor as vendas passadas em duas ou mais componentes que possam ser modeladas matematicamente, como mostrado na Figura 8.15.

### Previsão de vendas de médio prazo

Quando o horizonte da previsão começa a aumentar, a hipótese de o futuro "repetir" o passado (nos padrões de variação) deixa, muitas vezes, de ser válida. Devem-se então adotar outros modelos, cujas hipóteses sejam válidas para horizontes maiores. Exemplos são os modelos extrínsecos, modelos causais ou modelos de explicação. Nesses, a hipótese é de que as relações que existiam no passado, entre as vendas e outras variáveis, continuam a valer no futuro. A ideia é que se procurem estabelecer as relações entre as vendas do passado e outras variáveis que expliquem seu comportamento. Essas relações, entre variáveis causais e a demanda buscada, costumam permanecer válidas por períodos relativamente mais longos, o que faz com que os modelos causais sejam mais adequados para previsões de horizonte mais longo.

O resultado da correlação é uma equação do tipo:

![alt text](formula_v.png)

obtida em geral a partir da técnica estatística de regressão (em geral, linear) múltipla em que x1, x2, .. Xn são os valores das variáveis escolhidas num determinado ponto do tempo.

Da mesma forma que nos modelos temporais de projeção, utilizados para previsão de curto prazo, também aqui é essencial que se proceda à segunda parte (qualitativa) do modelo do processo de previsão anteriormente apresentado, pois, por mais sofisticado que seja o modelo causal, jamais conseguirá incorporar todos os fatores que interferem no comportamento da demanda.

### Previsão de vendas de longo prazo

Quando o horizonte aumenta ainda mais (um a vários anos), a hipótese de que as relações existentes no passado entre a demanda e outras variáveis continuam a valer no futuro deixa, muitas vezes, de ser válida. Nesses casos, adota-se a hipótese de que o futuro não guarda relação direta com o passado, pelo menos não uma relação que possa ser modelada matematicamente. A previsão, muitas vezes, necessita ser mais qualitativa.

## Página 244

### 8.4 RESUMO

▪️A principal função da gestão de cadeias de suprimentos é garantir que o suprimento e a demanda sejam compatíveis.

▪️Uma boa gestão de cadeias de suprimentos começa com uma boa gestão de demanda.

▪️Gestão de demanda envolve: ações sobre a demanda para redução de sua variabilidade, previsão de demanda para reduzir incertezas e gestão de preço e de receitas.

▪️A variabilidade da demanda se refere a quanto a demanda varia dentro de um ciclo.

▪️Uma cadeia de suprimentos incorre em custos maiores quando tem de lidar com maior variabilidade de demanda; se for possível reduzir a variabilidade da demanda por meio de ações, isso deve ser feito.

▪️Há duas causas possíveis para a variabilidade de demanda que afetam as cadeias de suprimentos: variações da demanda do consumidor final e variações causadas pelo efeito chicote.

▪️O efeito chicote é um fenômeno dinâmico que faz com que pequenas variações de demanda no nível do consumidor final de uma cadeia de suprimentos se amplifiquem crescentemente à medida que as informações sobre essa demanda (normalmente na forma de pedidos) são transmitidas (e distorcidas) sequencialmente ao longo das relações cliente-fornecedor na cadeia de suprimentos.

▪️Em situações reais, há cinco principais motivos para o efeito chicote: as atualizações descoordenadas de previsões de demanda dos nós da cadeia, as formações de lotes de produção e de transporte, as flutuações de preço, o racionamento/comportamento oportunista e as demoras nos fluxos de materiais e informação.

▪️O primeiro mandamento das previsões é "evitará fazê-las".

▪️Para que o gestor da cadeia tome uma boa decisão, é necessário que tenha a visão mais clara possível (ou com a menor incerteza possível) do futuro.

▪️Há quatro erros comuns que as empresas cometem quanto a previsões:

▪️Erro 1 das previsões: confundir previsões com metas e, um erro subsequente, considerar as metas como se fossem previsões.
▪️Erro 2 das previsões: gastar tempo e esforço discutindo se se acerta ou erra nas previsões, quando o mais relevante é discutir o quanto se está errando e as formas de alterar processos envolvidos, de forma a reduzir esses erros, ou incertezas.
▪️Erro 3 das previsões: levar em conta, nas previsões que servirão para apoiar decisões em cadeias de suprimentos, um número só. Previsões, para gestão de cadeias de suprimentos, devem sempre ser consideradas com dois números: a previsão em si e uma estimativa do erro (ou grau de incerteza) dessa previsão.
▪️Erro 4 das previsões: desistir ou não se esforçar o suficiente para melhorar os processos de previsão por não se conseguir reduzir os erros às previsões, quando, em cadeias de suprimentos, não se necessita ter previsões perfeitas, mas sim previsões consistentemente melhores que as da concorrência.

▪️O horizonte da previsão é definido pelo tamanho da inércia decisória (tempo decorrido entre a decisão ser tomada e a decisão efetivamente ser levada a efeito) da decisão à qual ela deve suportar.

▪️A agregação dos dados, que faz reduzir o nível de incerteza das previsões, compensa, até certo ponto, o aumento de incerteza causado pelo necessário aumento do horizonte de previsão nas decisões de inércia decisória alta.

▪️Para um determinado horizonte, as previsões devem ser feitas sempre com o nível máximo de agregação de dados que o processo decisório ao qual suportará permitir.

▪️Para previsões de curto prazo (até três meses), normalmente se aceita mais a hipótese de que o futuro seja uma "continuação" do passado; a técnica então geralmente utilizada é a de projeção; são os chamados modelos intrínsecos, ou de séries temporais simples.

▪️Quando o horizonte da previsão começa a aumentar, a hipótese de que o futuro vai "repetir" o passado (nos padrões de variação) deixa, muitas vezes, de ser válida. Devem-se então adotar outros modelos, cujas hipóteses sejam válidas para horizontes maiores. Exemplos são os modelos extrínsecos, modelos causais ou modelos de explicação.

▪️Quando o horizonte aumenta ainda mais (um a vários anos), a hipótese de que as relações existentes no passado entre a demanda e outras variáveis continuam a valer no futuro deixa, muitas vezes, de ser válida. A previsão, muitas vezes, necessita ser mais qualitativa.

▪️Os métodos qualitativos incorporam fatores de julgamento e intuição, em geral mais subjetivos, nas análises dos dados disponíveis. São exemplos: Delphi, júri de executivos, estimativa da força de vendas, pesquisa de mercado e analogia histórica.

▪️Os métodos quantitativos são aqueles métodos de previsão baseados em séries de dados históricos nas quais se procura, por meio de análises, identificar padrões de comportamento para que sejam então projetados para o futuro.

▪️Uma série temporal de dados em geral tem três principais componentes: tendência, ciclicidade e aleatoriedade.

▪️Alguns métodos quantitativos são: médias móveis, suavização exponencial e regressão (simples ou múltipla), com ou sem ciclicidade.

▪️É sempre importante acompanhar dois tipos de erros de previsão: a "amplitude" ou o "tamanho" dos erros e o chamado "viés" dos erros.

▪️A escolha dos parâmetros de um modelo de previsão é uma decisão importante e é chamada "calibração".

▪️Gestão de receitas se refere a vender a unidade certa do item de estoque para o tipo certo de cliente e pelo preço certo. Os métodos de gestão de receitas integram estratégias de preço e de alocação de estoques e de capacidade de recursos para influenciar a demanda e, em última análise, aumentar a lucratividade.