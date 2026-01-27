# Capítulo 8: Gestão de demanda na cadeia global de suprimentos

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

**Gestão de demanda na Toyota, o maior fabricante de carros do mundo**

A Toyota Motor Co. Ltd (Toyota) iniciou suas operações em 1937, quando Kiichiro Toyoda estabeleceu uma fábrica de veículos automotores independente de sua empresa da época, a Toyoda Automatic Loom Works (ALW), uma fabricante de equipamentos para tecelagem. O capital inicial para os primeiros experimentos com a fabricação de automóveis veio da venda dos direitos de patente de uma das máquinas inventadas pelo fundador da Toyoda ALW, Sakichi Toyoda e pai de Kiichiro. No período de pós-guerra, mais especificamente em 1950, a Toyota experimentou a única greve da história da empresa, da qual, depois de extensas negociações, tanto os trabalhadores quanto a empresa e sua gestão saíram firmemente comprometidos com os princípios de confiança mútua e interdependência para o bem comum.

**Figura 8.2** Concessionária Toyota.

O bom relacionamento entre os trabalhadores e a empresa continua até hoje. Durante os anos 1950 e daí por diante, as técnicas de produção foram aperfeiçoadas, culminando com o desenvolvimento do chamado *Toyota Production System* (Sistema Toyota de Produção) pelo legendário gerente Taiichi Ohno (considerado o pai do sistema *just in time*), um sistema que se tornou a base do *lean production* (produção enxuta).

## Página 215

adotado largamente não só na indústria automobilística, mas em muitas outras. O Sistema Toyota de Produção é baseado nos princípios de *jidoka* (sistema que interrompe a produção quando um defeito é encontrado, seguindo o postulado de que qualidade se constrói durante o processo de produção), *just in time* (por meio do sistema *kanban* de fluxos produtivos puxados, em que se produz só o que é necessário, quando necessário e na quantidade necessária) e *kaizen* (sistema de melhoramentos contínuos). Considera-se que o Sistema Toyota de Produção é, em grande parte, a razão de os níveis de estoques e defeitos dentro das fábricas da Toyota serem, por larga margem, os menores do mundo dentro do setor industrial.

Em 2018, a Toyota teve vendas líquidas de US$ 256 bilhões, tinha 16 fábricas no Japão e 53 ao redor do mundo, distribuídas entre 27 países/regiões, e foi em 2017 a terceira maior fabricante do mundo por produção de veículos, com pequena margem atrás da primeira e segunda. A Figura 8.3 traz os detalhes.

---

| Volkswagen | 10,742 milhões (+ 4,3% sobre 2016) |
| --- | --- |
| **Aliança Renault Nissan Mitsubishi** | 10,740 milhões (+ 6,2% sobre 2016) |
| **Toyota** | 10,466 milhões (+ 2,9% sobre 2016) |

**Figura 8.3** Os três maiores grupos automotivos do mundo ranqueados por produção de veículos (2017).

---

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

Similarmente, embora a Toyota vise a basear toda a produção doméstica japonesa em pedidos firmes de consumidores ou de concessionárias (produzindo apenas contra pedido), na realidade alguns carros são feitos para estoque. O departamento de marketing prepara

Deseja que eu transcreva a próxima página para verificar se nela aparecem os quadros de Conceito-chave ou Teoria na Prática?

## Página 216

planos de pedido baseados em previsões e os transmite ao departamento de produção. A empresa controla esse processo muito de perto e reajusta previsões e planos de produção mensalmente e com cuidado, de forma que um mínimo de veículos reste em estoque ao final do ano. Em média, a empresa mantém apenas cinco mil carros em estoque (ou em torno de 2% a 3% do volume mensal produzido). Solicita periodicamente às concessionárias que absorvam parte do seu estoque extra a fim de reduzir a sua posição de estoques. Em tempos de falta de veículos, como foi o caso do lançamento do carro híbrido Prius, a Toyota faz alguma alocação de carros para as concessionárias, baseada nos tamanhos de pedidos. Isso pode acarretar nas concessionárias o comportamento de "jogar" com o sistema, inflacionando pedidos para conseguir maior alocação. Na prática, isso acontece muito raramente, porque a Toyota deixa claro que, se esse comportamento for identificado, a alocação passará imediatamente a zero. A relação de confiança entre concessionárias e empresa parece auxiliar para que o efeito chicote seja atenuado. O efeito chicote, brevemente descrito no Capítulo 2 e tratado em mais detalhes adiante neste capítulo, nesse caso, ocorre quando concessionárias, exagerando seus pedidos, distorcem os padrões de demanda que a Toyota percebe nas suas vendas, causando, assim, ineficiências.

Baseado em informações do site da Toyota. Consultado em 22 de julho de 2018 e disponível em: [http://www.annualreports.com/HostedData/AnnualReports/PDF/NYSE_TM_2017.pdf](https://www.google.com/search?q=http://www.annualreports.com/HostedData/AnnualReports/PDF/NYSE_TM_2017.pdf); e em LEE, H.; PELEG, B.; WHANG, S. Toyota: Demand Chain Management. Stanford Graduate School of Business, case GS-42.

### QUESTÕES PARA DISCUSSÃO

1. Atualmente, com a quantidade de acessórios oferecida, o total de diferentes veículos que podem ser produzidos é imenso. Como você imagina que a Toyota organiza seu processo de gestão de demanda para lidar com essa quase impossibilidade de alta precisão de previsão por variante individual de veículo?
2. Por que a Toyota avalia suas concessionárias em termos de como elas satisfazem os seus clientes? Afinal, as concessionárias são clientes ou fornecedores de serviços da Toyota?
3. Cite exemplos do caso mencionado, nos quais a Toyota e sua cadeia agem para alterar a sua demanda, mais do que apenas tentar prevê-la passivamente.
4. Quando se fazem previsões de demanda em cadeias de suprimentos, um dos grandes problemas é o chamado efeito chicote, que faz com que a demanda imediata (aquela representada por pedidos dos clientes imediatos) percebida por empresas da cadeia seja distorcida por ações propositais ou não das empresas da cadeia que se encontram no encadeamento cliente-fornecedor entre a empresa analisada (focal) e o consumidor final. Uma das ações é o cliente imediato "jogar" com o sistema, por exemplo, exagerando pedidos em situações de escassez, como mencionado no caso. Você é capaz de pensar em outras ações que também aumentem o efeito chicote?

---

## 8.2 CONCEITOS

### 8.2.1 O que é e por que fazer gestão de demanda

A principal função da gestão de cadeias de suprimentos é garantir que o suprimento e a demanda sejam compatíveis. Essa compatibilidade pode ser obtida por meio de planos e ações que façam com que o suprimento se adeque à demanda, que façam com que a demanda se adeque às possibilidades do suprimento ou, ainda, por uma combinação de ambas. De todas as formas, uma boa gestão de cadeias de suprimentos começa com uma boa gestão de demanda. Neste capítulo, serão discutidos os seguintes tópicos referentes à gestão de demanda:

* **Ações sobre a demanda para redução de sua variabilidade:** são recomendáveis às vezes, porque, em geral, atender a demandas mais variáveis requer mais recursos ou acarreta que estes sejam utilizados de forma menos eficiente, por parte da cadeia de suprimentos. Às vezes, a necessidade de lidar com demandas mais variáveis é inevitável, mas outras vezes não. Com frequência, as próprias cadeias de suprimentos, por decisões internas inadequadas, fazem a variabilidade de sua própria demanda aumentar. Nesses casos, reduzir o nível de variabilidade com a qual a cadeia de suprimentos tem de lidar levará a uma maior eficiência de uso dos recursos da cadeia.
* **Previsão de demanda para reduzir incertezas:** é necessário que os gestores da cadeia de suprimentos trabalhem com o menor nível possível de incerteza, já que a necessidade de lidar com a dúvida normalmente reduz a eficiência e/ou a eficácia da operação. Há vários tipos de incerteza que podem afetar negativamente o desempenho da gestão de cadeias de suprimentos, e a incerteza da demanda futura é uma das mais importantes. Ela fará com que a cadeia tenha de se preparar para uma faixa de possibilidades futuras, o que demandará mais recursos quanto maior for a faixa. O uso de boas técnicas de previsão faz com que a incerteza sobre a demanda futura seja menor e, portanto, com que o uso dos recursos da cadeia de suprimentos seja mais eficiente com simultâneo maior nível de serviço logístico.

## Página 217

■ **Gestão de preço e de receitas:** um último aspecto importante sobre a gestão de demanda em cadeias de suprimentos diz respeito à gestão de receitas. Gestão de receitas é um tópico essencial no ato de balancear adequadamente o uso de recursos e o nível de serviço ao cliente e inclui o tratamento analítico de questões como: quanto, em cada momento, o cliente está disposto a pagar pelo serviço ou produto solicitado? Quanto da capacidade disponível na cadeia de suprimentos deveria ser alocada a cada tipo de cliente para maximização de receitas? Respostas erradas a essas perguntas podem comprometer receitas por preços subestimados e/ou acarretar perda de clientes importantes por incapacidade de atendê-los.

Esses três aspectos da gestão de demanda em cadeias de suprimentos serão tratados em detalhes no restante deste capítulo.

### Ações sobre a demanda para redução de variabilidade

A variabilidade da demanda diz respeito a quanto a demanda varia dentro de um ciclo; por exemplo, um ano para produtos sazonais (demandas sazonais variam de acordo com as estações do ano). Pense na demanda de sorvetes no Brasil. A demanda no pico do verão chega a ser de cinco a sete vezes maior do que a demanda no vale de demanda, no inverno. A cadeia de suprimentos dos fabricantes de sorvetes tem, portanto, sua demanda bastante variável. Já outros produtos podem apresentar demanda bem menos variável ao longo do ano. A demanda de algumas peças de reposição, como as pastilhas de freio, varia, com uma demanda levemente maior no período que antecede as férias (quando muita gente faz revisões em seus veículos), mas essa variação não é drástica – os gestores da cadeia de suprimentos de pastilhas de freio, então, encaram uma demanda muito menos variável que os gestores da cadeia de sorvetes. A Figura 8.4 ilustra o conceito.

*(Imagens da Figura 8.4: Gráficos comparativos de "Grande variação" vs "Pequena variação" da demanda ao longo do tempo)*

**Figura 8.4** Diferentes níveis de variação da demanda encarada por uma cadeia de suprimentos.

A implicação de terem de lidar com uma demanda mais variável é que as cadeias de suprimentos têm de responder a essa variação. A resposta a qualquer variação requer recursos adicionais (e quanto maior o nível de variação, maiores os níveis de recursos necessários). Por exemplo, se a cadeia de suprimento de sorvetes decidir por fabricar e entregar sorvetes nas mesmas taxas em que o produto é consumido (em unidades por semana), a cadeia terá de produzir uma enorme quantidade de sorvetes por semana no verão – e, portanto, a capacidade das fábricas terá de ser equivalente ao pico da demanda. Isso requererá um investimento em capital (máquinas e instalações) bastante grande, que ficará subutilizado durante o inverno, quando as fábricas produzirão a uma taxa equivalente ao nível mínimo da demanda.

Assim, a cadeia trabalhará de forma ineficiente, com baixo índice médio de utilização de seus recursos. Esse efeito e a decorrente ineficiência da cadeia será menor para o fabricante de pastilhas de freio: o investimento em capital terá de ser menor (pois o pico de demanda é menor) e a ociosidade durante o período de demanda baixa também será menor. Veja a Figura 8.5.

*(Imagens da Figura 8.5: Gráficos demonstrando a "Ociosidade" e "Grande variação" em relação ao capital e produção)*

**Figura 8.5** Implicações de uma maior variabilidade de demanda na eficiência das cadeias de suprimentos quando a produção segue a demanda.

## Página 218

Mesmo que as cadeias de suprimentos trabalhem no sentido de manterem seus níveis de produção mais estáveis ao longo do tempo (para conseguir índices mais constantes de utilização de recursos e menor necessidade de investimento de capital), usando estoques para conseguir compatibilizar suprimento e demanda (continuando a produzir durante o período de baixa demanda a fim de construir estoques que serão usados posteriormente para atender o pico), os custos de fazer isso serão maiores para as cadeias que encaram maior variabilidade de demanda, pois os níveis de estoques necessários serão maiores. Veja a Figura 8.6.

---

**Figura 8.6** Implicações de uma maior variabilidade de demanda na eficiência das cadeias de suprimentos quando a produção é nivelada e estoques são usados.

---

São infinitas as opções de escolha que uma cadeia de suprimentos tem para compatibilizar seu suprimento com sua demanda, possivelmente sem usar nenhum dos casos extremos ilustrados anteriormente, mas combinações deles. Uma coisa, entretanto, fica clara, qualquer que seja a opção escolhida: uma cadeia de suprimentos incorre em custos maiores quando precisa lidar com maior variabilidade de demanda.

| 💡**Fique atento**💡{bg=amarelo} |
| --- |
| Se for possível reduzir a variabilidade da demanda por meio de ações, isso deve ser feito sempre que os custos das ações forem menores que os custos de lidar com a variabilidade. Isso porque os custos incorridos por uma cadeia de suprimentos para lidar com uma demanda mais variável são, na grande maioria das vezes, maiores do que os custos de lidar com uma demanda menos variável. |

### 8.2.2 Causas da variabilidade da demanda

Há duas causas possíveis para a variabilidade de demanda que afetam as cadeias de suprimentos:

* **variações da demanda do consumidor final:** são variações – necessárias ou não – nos padrões de compra e consumo dos produtos e serviços oferecidos; e
* **variações causadas pelo efeito chicote:** são variações na demanda de partes da cadeia de suprimentos causadas não apenas pelas variações nos padrões de compra e consumo do usuário, mas por ações evitáveis e condições controláveis internas à cadeia de suprimentos.

Cada uma é analisada a seguir, juntamente com as opções gerenciais disponíveis para combatê-las.

**Variações da demanda do consumidor final**

As ciclicidades da demanda são exemplos. Pode haver ciclicidade *diária* na demanda de restaurantes *fast-food*, por exemplo (acúmulo de demanda nos horários de refeição); pode haver ciclicidade *semanal* na demanda por entretenimento, como nos cinemas, em que a demanda se concentra nos fins de semana; pode haver ciclicidade *mensal* na demanda por itens de supermercado, que se concentra depois dos dias de pagamento; pode haver ciclicidades *anuais*, como a demanda por cerveja, maior no verão que no inverno. Há basicamente duas políticas que podem ser usadas para atenuar as variações da demanda do consumidor final: a primeira se refere a tentar *alterar as curvas de demanda*, de modo que pelo menos parte da demanda do período de pico seja transferida para o período de baixa, e a segunda se refere a *oferecer produtos e serviços com padrão oposto de ciclicidade* em relação aos produtos e serviços originais. Ambas as políticas são discutidas a seguir.

Alterar as curvas de demanda significa conceber e implantar estratégias de persuasão (pelo menos, de parte) dos clientes que demandariam seus produtos e serviços no período de pico a fazê-lo no período de baixa demanda. Isso pode ser feito por meio da oferta dos produtos...

## Página 219

...a preços reduzidos nos períodos de baixa demanda. As companhias telefônicas fazem isso, oferecendo alguns pacotes com tarifas reduzidas para madrugada e fim de semana, os cinemas oferecem entradas cerca de 10% mais baratas de segunda a quarta-feira, os hotéis e companhias aéreas oferecem preços especiais para baixa estação, alguns varejistas oferecem descontos para os clientes que anteciparem suas compras de Natal.

| 🔵**SAIBA MAIS**{bg=azul} |
| --- |
| **Vantagens adicionais de procurar antecipar demanda do pico**<br>

<br>

<br>Quando foram mencionadas empresas que oferecem descontos a fim de que os clientes efetuem seus pedidos antecipadamente ao pico de Natal, por exemplo, é importante perceber que, além de suavizar a demanda, essa ação pode trazer outro benefício. Os clientes que resolverem aceitar a oferta de colocarem pedidos antecipadamente poderão se tornar uma amostra com representatividade do total de pedidos a serem recebidos no pico. Essa amostra pode dar importantes informações antecipadas para permitir melhores previsões sobre quais produtos serão pedidos pelos outros clientes. Como isso ocorre com antecipação, a cadeia de suprimentos poderá se preparar melhor, com menor incerteza sobre a demanda futura. Confecções como a Benetton e a Zara usam esse artifício para "testar" suas coleções antes de cada estação e verificar com antecipação quais modelos vão agradar mais ou menos aos seus clientes.<br>

<br>

<br>**Questões para discussão**<br>

<br>1. Quais os riscos e benefícios envolvidos em usar pedidos antecipados como uma amostra dos pedidos futuros?<br>

<br>2. Que tipo de empresa mais provavelmente pode se beneficiar das vantagens adicionais de antecipar demanda do pico descritas anteriormente? |

| 💡**Fique atento**💡{bg=amarelo} |
| --- |
| **Algumas fontes de variabilidade de demanda são autoimpostas**<br>

<br>

<br>Às vezes, as empresas se autoimpõem maiores necessidades de lidar com níveis de variabilidade do que seria necessário. Um exemplo típico são as cotas mensais que as equipes de vendas muitas vezes têm de cumprir. Isso induz um comportamento nas equipes de vendas (e nas equipes de compras dos clientes) que se traduz no seguinte: os compradores dos clientes aguardam até que o final do mês se aproxime para fazer seus pedidos, e que os vendedores comecem a ficar preocupados com o cumprimento de suas metas mensais, porque isso fará com que estes se tornem mais "permeáveis" a pressões por redução de preços.<br>

<br>

<br>Os vendedores, correspondentemente, também começam a se esforçar mais para conseguir pedidos quando o fim do mês se aproxima. Ambas as atitudes colaboram para que os pedidos se acumulem nos últimos dias do mês. Algumas empresas brasileiras chegam a ter mais de 40% de sua demanda concentrada nos últimos quatro ou cinco dias do mês. Isso faz com que a demanda seja baixa no início e meio do mês e tenha um pico (com o qual a cadeia de suprimentos terá de lidar) no final. Essa variabilidade prejudica muito o nível de eficiência das cadeias. Uma solução adotada por muitas empresas é estabelecer, em vez de metas mensais aos seus vendedores, metas, por exemplo, para cada dez dias ou mesmo metas semanais. Com isso, tentam atenuar os picos de demanda autoimpostos.<br>

<br>

<br>**Questões para discussão**<br>

<br>1. Quais outras decisões internas também podem causar ciclos indesejáveis de demanda?<br>

<br>2. A solução de mudar as metas de vendas mensais para semanais pode alterar o comportamento interno da força de vendas. Qual solução pode ser dada para alterar o comportamento dos compradores das empresas clientes a fim de atenuar ciclicidades? |

Redução de preço não é a única forma de alterar a curva de demanda. Às vezes, comunicação pode também ser eficaz. Divulgar que uma ligação para um *call center* será atendida muito mais rapidamente depois das oito horas da noite pode levar uma boa parte da demanda a buscar o serviço neste período. A ideia dessas políticas é tentar nivelar, tanto quanto possível, a curva de demanda, com vistas a diminuir seu nível de variabilidade.

Oferecer produtos e serviços com padrão oposto de ciclicidade se refere a tentar achar produtos e serviços que utilizem os mesmos recursos da cadeia de suprimentos para serem produzidos e entregues, mas que tenham a ciclicidade de suas curvas de demanda diametralmente opostas à ciclicidade das curvas dos produtos e serviços originais. Os hotéis fazem isso para lidar com suas ciclicidades semanais. Sabendo que seus hóspedes executivos demandam muito mais seus serviços durante os dias úteis da semana, criam pacotes promocionais para famílias a passeio, cuja demanda é oposta àquelas dos executivos: concentra-se nos fins de semana. Com isso, a soma total da demanda de executivos e de famílias a passeio será muito menos variável que a demanda de cada uma separadamente. Isso também...

## Página 220

pode ter influência positiva na receita dos hotéis, como será visto adiante neste capítulo. As cadeias fabricantes de sorvetes também procuram explorar demandas por sobremesas geladas com maior teor de gordura que possam ser consumidas no inverno para se contrapor a uma ciclicidade com pico no verão de produtos como os picolés. Ambos utilizam muitos dos mesmos recursos da cadeia, mas em diferentes períodos do ano – dessa forma, resultando numa demanda global muito mais nivelada, com correspondentes em maiores níveis de eficiência. O mesmo ocorre com as cadeias de suprimentos de cerveja, que tendem a lançar produtos mais encorpados (como as cervejas tipo *Stout* ou *Bock*) para consumo no inverno, a fim de se contrapor a uma demanda, muito mais concentrada no verão, de cervejas mais leves, como as do tipo *Lager*.

A Figura 8.7 ilustra as duas políticas descritas anteriormente.

**Demanda original** ----
**Demanda nivelada** —

Transferência de parte da demanda do pico para o vale por promoções e/ou comunicação

**Produto A** —
**Produto B** ----
**Demanda total** ........

Exploração de produtos com ciclicidade oposta de demanda

**Figura 8.7** Duas políticas para nivelar demanda de produtos e serviços com demanda cíclica.

### Efeito chicote (*bullwhip effect*)

Em cadeias de suprimentos, grande parte da variabilidade que as operações têm de enfrentar é causada não pelas variações da demanda do consumidor final, mas por práticas e decisões tomadas por outros membros da cadeia de suprimentos. O efeito da variabilidade (também chamada de volatilidade) ampliada percebida por empresas dentro de uma cadeia de suprimentos (em geral, mais a montante da cadeia) e causado por razões internas à própria cadeia é chamado de efeito chicote, brevemente descrito no Capítulo 2 e discutido em mais detalhes agora.

| 💡**Fique atento**💡{bg=amarelo} |
| --- |
| O efeito chicote é um fenômeno dinâmico que faz com que pequenas variações de demanda no nível do consumidor final de uma cadeia de suprimentos se amplifiquem crescentemente à medida que as informações sobre essa demanda (normalmente na forma de *pedidos*) são transmitidas (e distorcidas) sequencialmente ao longo das relações cliente-fornecedor na cadeia de suprimentos. |

Uma ilustração do efeito chicote pode ser observada a partir de uma cadeia de suprimentos simplificada, como a mostrada na Figura 8.8.

## Página 221

Imagine que cada um desses nós da cadeia de suprimentos (varejista, distribuidor, fabricante e fornecedor) tenha a política de manter em estoque o equivalente a um mês de sua demanda imediata. Assim, se a demanda imediata do nó sobe, o sistema de gestão faz também subir o seu nível de estoques, e se a demanda cai, o sistema ajusta para baixo o nível de estoques. Imagine que a demanda do consumidor, percebida pelo varejista dessa cadeia, tem sido estável há vários meses e igual a 50 unidades por mês. Como a cadeia trabalha para manter a demanda atendida e para manter o equivalente à demanda de um mês em estoque, no mês corrente (Mês 1), todos os nós da cadeia têm demanda percebida de 50 unidades, entregam 50 unidades para seus clientes imediatos, compram 50 unidades de seus fornecedores imediatos e mantêm em estoque 50 unidades. A cadeia toda está estável. Isso pode ser visto pela primeira linha (correspondente ao Mês 1) da tabela da Figura 8.9. Essa tabela demonstra o que acontece com as demandas imediatas dos nós da cadeia quando uma pequena alteração de demanda acontece no nível do consumidor final, que passa de 50 a 53 unidades a partir do Mês 2, mantendo-se então nesse novo patamar estável de 53 unidades por mês. As linhas da tabela representam os meses, de 1 até 6, e as colunas representam o que ocorre com os pedidos e com os estoques (de final do mês) de cada um dos nós da cadeia, mês a mês.

| Mês | Fornecedor Pedido / Estoque | Fabricante Pedido / Estoque | Distribuidor Pedido / Estoque | Varejista Pedido / Estoque | Consumidor Pedido |
| --- | --- | --- | --- | --- | --- |
| 1 | 50 / 50 | 50 / 50 | 50 / 50 | 50 / 50 | 50 |
| 2 | 98 / 74 | 74 / 62 | 62 / 56 | 56 / 53 | 53 |
| 3 | 2 / 38 | 38 / 50 | 50 / 53 | 53 / 53 | 53 |
| 4 | 74 / 56 | 56 / 53 | 53 / 53 | 53 / 53 | 53 |
| 5 | 50 / 53 | 53 / 53 | 53 / 53 | 53 / 53 | 53 |
| 6 | 53 / 53 | 53 / 53 | 53 / 53 | 53 / 53 | 53 |

[Gráfico demonstrando as oscilações de pedidos por nó da cadeia: Fornecedor, Fabricante, Distribuidor, Varejista e Consumidor]

**Figura 8.9** Ilustração simplificada do efeito chicote numa cadeia de suprimento de quatro nós que atende ao consumidor final (adaptado de Slack, 2002).

Observe que, quando a demanda do consumidor final vai de 50 unidades no Mês 1 para 53 unidades no Mês 2, o novo nível de estoque do varejista definido para o Mês 2 passa a ser de 53 unidades, de acordo com sua política. Isso quer dizer que o pedido do varejista para o distribuidor, no Mês 2, é de 56 unidades (53 para atender a demanda do consumidor e mais três para que o nível de estoques passe de 50 para 53 unidades). A demanda imediata percebida pelo atacadista, então, no Mês 2, é de 56 unidades. Como sua política de estoque também é de manter em estoque o equivalente a um mês de demanda, ele define que seu estoque tem de passar de 50 para 56 unidades (que é a demanda percebida pelo atacadista). Para isso, faz um pedido de 62 unidades ao fabricante (56 para atender ao pedido do varejista e mais seis para que seu próprio estoque aumente de 50 para 56 unidades). Essa distorção da informação a respeito da demanda do consumidor continua ocorrendo para outros nós da cadeia, com amplitude aumentada. No Mês 3, a demanda do consumidor é novamente de 53 unidades. O varejista, então, pede 53 unidades para o distribuidor. Este agora redefine seu nível de estoque para 53 unidades, o que o...

## Página 222

faz colocar um pedido de apenas 50 unidades com o fabricante (já que três das unidades necessárias são tiradas de seu estoque, que deve diminuir de 56 para 53 unidades). O efeito se propaga com novas distorções para trás na cadeia. Isso ocorre nos meses subsequentes, de forma que só no sexto mês a cadeia atinge estabilidade no novo patamar de demanda de 53 unidades. Observe no gráfico da Figura 8.9 como a variabilidade da demanda aumenta à medida que a informação sobre a demanda do consumidor viaja para trás na cadeia, devido a distorções causadas pelos reajustes nos níveis de estoques dos vários nós da cadeia. Lembre-se de que essa volatilidade aumentada da demanda tem de ser atendida pelos nós da cadeia, o que exige deles mais recursos, aumentando seus custos.

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

**Flutuações de preço:** flutuações de preço ocorrem, por exemplo, quando empresas lançam mão de ferramentas de marketing, como promoções. Imagine alguém que compre o produto fraldas descartáveis para bebês, na

## Página 223

quantidade de 50 unidades por semana. O consumo desse produto em geral é exclusivamente determinado pela necessidade do pequeno usuário final, que não varia muito de semana para semana. O pai do bebê vai, então, comprar fraldas no sábado e percebe que o supermercado está fazendo uma promoção, vendendo as fraldas por um preço 30% menor que o normal. A decisão do pai então muda e, em vez de comprar 50 unidades, compra 150 unidades, para aproveitar o bom preço e estocar o produto para uso futuro. Qual a consequência? Ele passa três semanas sem comprar o produto. A demanda aumenta agora, como resposta à promoção, e diminui no futuro, causando uma variação artificial, que distorce a informação sobre a demanda quando essa viaja para trás na cadeia. E essa distorção de informação é crescente, quanto mais para trás ela viaja na cadeia. A solução aqui é o que alguns varejistas (como o Walmart) fazem quando usam a lógica de "preço baixo todo dia" – optam por não fazer muito uso de promoções a fim de não distorcerem a demanda, pois sabem que isso vai aumentar a ocorrência do efeito chicote, aumentando os custos na cadeia e, como consequência, no médio e longo prazos, os preços finais dos produtos terão de subir para compensar os custos mais altos, tornando a cadeia toda menos competitiva. Quanto menos se permitirem flutuações de preço, portanto, numa cadeia, menos será sentido o efeito chicote.

**Racionamento/comportamento oportunista:** quando ocorre racionamento de um produto, ou seja, quando não há produto suficiente para atender a toda a demanda (por exemplo, porque o efeito chicote está na sua fase de aumento desproporcional e artificial da demanda percebida), muitas vezes os fornecedores, para não deixarem nenhum cliente totalmente desatendido, optam por atender parcialmente a todos os pedidos que recebe. Por exemplo, suponha que o total dos pedidos recebidos por um fornecedor, de vários clientes, seja de 100 mil produtos. Suponha que a capacidade do fornecedor é de apenas 80 mil produtos. Ele decide, então, atender a apenas 80% dos pedidos de cada um dos clientes, assim, não atende a nenhum de forma completa, mas também não deixa nenhum sem produto. Parece uma política justa, mas que pode acabar gerando um comportamento indesejável por parte de alguns clientes, que, percebendo que só têm 80% dos seus pedidos atendidos, passam a inflar seus pedidos para obter a totalidade de suas necessidades. Por exemplo, se um cliente necessita de dez mil unidades, mas sabe que se pedir dez mil só vai receber oito mil, acaba solicitando 12.500 para receber 80%, ou seja, os dez mil que necessita. Isso acaba fazendo com que o total de pedidos colocados seja ainda mais distorcido, de forma artificial, ampliando o impacto do efeito chicote. Nesses casos, é importante analisar com cuidado as ações de racionamento a fim de evitar que a empresa acabe sofrendo ainda mais com os efeitos da distorção artificial da sua demanda (veja o caso de abertura deste capítulo do produto Prius, no quadro sobre a Toyota).

**Demoras nos fluxos de materiais e de informação:** cadeias de suprimentos que trabalham com produtos físicos em geral sofrem mais com o problema das demoras nos fluxos de materiais (*lead times*), os tempos decorridos entre o momento de identificação da necessidade de um material e o momento em que o material passa a estar disponível para uso. Incluídos no *lead time* estão os tempos de produção, transporte, desembaraços alfandegários, inspeções de recebimento e outros. Demoras no fluxo de informação ocorrem no processo de colocação do pedido: elaboração do pedido, transmissão do pedido, recebimento do pedido pelo fornecedor, análise de crédito e outras atividades que ocorrem antes mesmo que a produção e despacho do produto físico se iniciem. A literatura sugere que, quanto maiores as demoras envolvidas nas cadeias de suprimentos, mais se faz sentir o efeito chicote (Sterman, 2000). Muitas vezes, a decisão pela troca de um fornecedor próximo para um fornecedor localizado do outro lado do mundo se faz só com base numa comparação de preços. Isso pode trazer riscos para a cadeia, porque, em geral, acompanhando a troca vem também um aumento substancial nas demoras – tanto do fluxo de informação como do fluxo de materiais, o que aumenta a volatilidade da cadeia, e esse efeito e seu impacto no custo da cadeia é muitas vezes negligenciado quando a empresa toma a decisão de trocar um fornecedor.

A solução aqui é combater as demoras – seja mantendo fornecedores mais próximos fisicamente ou organizacionalmente, ou por aumentar a agilidade dos fluxos envolvidos. Além disso, também é necessário que as decisões referentes às cadeias de suprimentos sejam tomadas de forma a contemplar amplamente os seus impactos na cadeia, e não apenas levando em conta custos ou impactos localizados (como, por exemplo, considerar apenas o preço do item na decisão de qual fornecedor usar).

| 🔵**SAIBA MAIS**{bg=azul} |
| --- |
| **"O Jogo da cerveja", uma excelente maneira de entender e estudar o efeito chicote** <br>

<br> Existem alguns sites nos quais você pode jogar o clássico "The beer game", um jogo que demonstra claramente o efeito chicote, simulando uma simples cadeia de suprimentos que fabrica e distribui cerveja. Aqui estão alguns deles. Todos os sites disponibilizam instruções sobre como jogar: |

Deseja que eu transcreva a próxima página para verificar se nela aparecem os quadros de Conceito-chave ou Teoria na Prática?

## Página 224

Versão MIT
Fonte: [http://supplychain.mit.edu/games/beer-game](https://www.google.com/search?q=http://supplychain.mit.edu/games/beer-game)
Acesso em: 2 jul. 2019

Versão da MA Systems
Fonte: [http://www.masystem.com/MA-system-Consulting/Play-The-Beer-Game](http://www.masystem.com/MA-system-Consulting/Play-The-Beer-Game)
Acesso em: 2 jul. 2019

Versão criada pelo Dr. Kai Riemer, da Universidade de Sydney
Fonte: [http://www.beergame.org/](http://www.beergame.org/)
Acesso em: 2 jul. 2019

Divirta-se!

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
| * Previsões de demanda são estimativas de como vai se comportar o mercado demandante no futuro, sobre o potencial de compra do mercado. <br>

<br> * Metas são a parcela do potencial de compra do mercado que a empresa deseja atender e pode ter um objetivo motivacional, de incentivo a uma maior proatividade dos vendedores, por exemplo. <br>

<br> * Previsão de vendas é a melhor estimativa realista sobre quantos produtos a empresa vai vender no futuro, considerando as informações disponíveis. |

Muitas empresas confundem estes dois conceitos: previsões e metas.

Uma meta excessivamente ambiciosa, com intuito motivacional, considerada como previsão pode ter como consequência um suprimento superestimado em relação às

## Página 225

## Página 226

## Página 227

## Página 228

## Página 229

## Página 230

## Página 231

## Página 232

## Página 233
## Página 234
## Página 235