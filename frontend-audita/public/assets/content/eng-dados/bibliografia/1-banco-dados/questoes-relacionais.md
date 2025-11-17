# Questões

1. (FGV / SEFAZ-BA – 2022) Leia o fragmento a seguir. “Uma tabela está na _____ se, e somente se, para cada _____, onde X e A são atributos simples ou compostos, uma das duas condições precisam ser mantidas: ou o atributo X é
uma _____, ou o atributo A é uma chave candidata. Se o atributo A é membro de uma chave candidata”. Assinale a opção cujos itens completam corretamente as lacunas do fragmento acima.

a) forma normal boyce-codd – dependência multivalorada – chave primária.
b) forma normal boyce-codd – dependência funcional não trivial X ->-> A – chave primária.
c) terceira forma normal – dependência funcional trivial X -> A – chave candidata.
d) terceira forma normal – dependência funcional não trivial X -> A – superchave.
e) quarta forma normal – dependência funcional trivial X ->-> A – chave candidata.

Resposta Letra D

2. (CESPE / FUNPRESP-EXE - 2022) Colocar uma tabela na segunda forma normal (2FN) signiﬁca que toda coluna não chave depende diretamente da chave primária.
Resposta Falsa

A frase está incompleta.
Para estar na 2FN, não basta dizer que a coluna não-chave “depende diretamente” da chave.
É necessário dizer que ela depende totalmente da chave primária (chave inteira), isto é, não pode haver dependência parcial.


3. (CESPE / Petrobrás - 2022) Uma tabela está na segunda forma normal (2FN) se ela estiver na 1FN e se todos os seus atributos não chave forem totalmente dependentes da chave primária. 

Resposta Verdadeira

4. (CESPE / TELEBRÁS - 2021) Conforme os conceitos de modelagem e normalização de dados, uma tabela estará na primeira forma normal (1FN) se todos os seus atributos forem considerados como unidades indivisíveis.

Resposta Verdadeira

5. (CESPE / ISS-Aracaju – 2021) Na normalização de tabelas, ao eliminar as dependências transitivas, chega-se à:
a) primeira forma normal(1FN).
b) quinta forma normal(5FN).
c) segunda forma normal(2FN).
d) terceira forma normal(3FN).
e) quarta forma normal(4FN).

Resposta letra D

6. (CESPE / PCDF – 2021) De acordo com a primeira forma normal do modelo relacional, atributos compostos por vários valores são representados diretamente em um tupla e em suas relações nas tabelas do banco de dados.

Resposta Falsa

Atributos compostos não podem estar na tupla, precisam ser quebrados (destrinchados)

7. (CESPE / APEX-BRASIL – 2021) Uma tabela estará na segunda forma normal se tiver atendido a todos os requisitos da primeira forma normal e se não houver:

a) atributos que não sejam funcionalmente dependentes da chave primária da relação.
b) dependências funcionais.
c) valores nulos nos campos de chave primária.
d) grupos de repetição.

Resposta letra A.

Justificativa - funcionalmente dependentes refere-se a dependência funcional parcial parcial.
Ainda existem as dependências funcinais total(2FN) e a dependência transitiva(3FN).

8.(CESPE / ME – 2020) O processo de normalização de dados consiste em encontrar informações que atinjam um plano de normalização com as informações constantes nas tuplas adjacentes.

Respostas Falso - Normalização não obtem os valores da linhas seguints(Tuplas adjacents)

9.(COVEST / UFPE – 2019) Quais formas normais lidam com Dependência Funcional Parcial e Dependência Funcional Transitiva, respectivamente?
a) 2ª e 3ª
b) 3ª e 2ª
c) 3ª e 4ª
d) 4ª e 3ª
e) 4ª e 5ª

Resposta Letra A

10. (FCC / TJ/MA – 2019) Uma entidade de ligação possui uma chave primária composta pelos atributos que são chaves primárias nas entidades ligadas a ela. A verificação para saber se os atributos não chave são dependentes total ou parcialmente da chave primária composta, com objetivo de eliminar as dependências funcionais parciais, é feita na:

a) 5FN
b) 4FN
c) 3FN
d) 1FN
e) 2FN

Resposta Letra E

