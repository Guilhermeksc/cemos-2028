# Axiomas de Armstrong

| **REGRAS / AXIOMAS DE ARMSTRONG**        | **DESCRIÇÃO**                                                    |
|------------------------------------------|------------------------------------------------------------------|
| **Reflexividade**                        | Se Y ⊇ X, então **X → Y**                                        |
| **Incremental / Aditiva / Expansibilidade** | Se **X → Y**, então **XZ → YZ**                                  |
| **Transitividade**                       | Se **X → Y** e **Y → Z**, então **X → Z**                        |
| **Trivialidade / Autodeterminação**      | **X → X**                                                        |
| **Decomposição / Separação**             | Se **X → YZ**, então **X → Y** e **X → Z**                       |
| **União / Reunião / Combinação**         | Se **X → Y** e **X → Z**, então **X → YZ**                       |
| **Composição**                           | Se **X → Y** e **A → B**, então **XA → YB**                      |
| **Pseudo-transitividade**                | Se **X → Y** e **YZ → W**, então **XZ → W**                      |
| **Acumulação**                           | Se **X → Y**, então **XZ → Y**                                   |


São as propriedades das dependências funcionais

*b* **a) Reﬂexividade Se Y ⊇ X, então X → Y** 
Y está contido em X, então X determina Y.

Exemplo: vamos supor o atributo X = {CPF, NOME} e o atributo Y = NOME. 

Ora, NOME (Y) está contido em {CPF, NOME} (X). 

Logo, podemos concluir que {CPF, NOME} (X) determina NOME (Y).

*b* **b) Incremental/aditiva/expansibilidade Se X → Y, então XZ → YZ**
X determina Y, então XZ determina YZ.

Exemplo: vamos supor os atributos X = CPF, Y = NOME e Z = IDADE.

Sabendo que CPF(X) determina NOME(Y), podemos concluir que {CPF, IDADE} determina {NOME, IDADE}.

Se os mesmos atributos são inseridos à esquerda e à direita, a dependência funcional permanece igual.

*b* **c) Transitividade Se X → Y e Y → Z, então X → Z**

Exemplo: vamos supor o atributo X = CPF, o atributo Y = CEP e o atributo Z = ESTADO.

Sabendo que CPF(X) determina CEP(Y), e que CEP(Y) determina ESTADO(Z), podemos concluir que CPF(X) determina ESTADO(Z).

Similar à propriedade matemática de transitividade.

Ex: Brasília está na América do Sul. Se Brasília estão no Brasil e Brasil está na américa do sul, então brasília está na América do Sul.

*b* **d) Trivialidade/autodeterminação X → X**

Exemplo: como o próprio nome diz, essa é simplesmente a propriedade trivial de um atributo **determinar-se a si próprio**.

É evidente que CPF(X) determina CPF(X) – trata-se do axioma da **autodeterminação**.

*b* **e) Decomposição/separação Se X → YZ, então X → Y e X → Z**

Exemplo: vamos supor os atributos X = CPF, Y = NOME e Z = ESTADO_CIVIL.

Se CPF(X) determina {NOME, ESTADO_CIVIL}, podemos decompor essa dependência funcional e aﬁrmar que CPF(X) determina NOME (Y) e CPF(X) determina ESTADO_CIVIL(Z).

*b* **f) União/reunião/combinação Se X → Y e X → Z, então X → YZ**

Exemplo: vamos supor os atributos X = CPF, Y = NOME e Z = ESTADO_CIVIL.

Se CPF(X) determina NOME (Y) e CPF(X) determina ESTADO_CIVIL(Z), podemos aﬁrmar que CPF(X) determina {NOME, ESTADO_CIVIL}.

*b* **g) Composição Se X → Y e A → B, então XA → YB**

Exemplo: vamos supor os atributos X = CPF, Y = NOME, A = CEP e B = ESTADO. Se CPF(X) determina NOME (Y) e CEP(A) determina ESTADO(B), podemos aﬁrmar que {CPF,CEP} determina {NOME,ESTADO}.

*b* **h) Pseudo-transitividade Se X → Y e YZ → W, então XZ → W**

Exemplo: vamos supor os atributos X = CPF, Y = COD_SIAPE3 , Z = MES e W = REMUNERACAO. 

Se CPF(X) determina COD_SIAPE(Y) e {COD_SIAPE,MES} determina REMUNERACAO(W), podemos aﬁrmar que {CPF, MES} determina REMUNERACAO.

*b* **i) Acumulação Se X → Y, então XZ → Y**

Exemplo: vamos supor os atributos X = CPF, Y = NOME e Z = IDADE.

Se CPF(X) determina NOME(Y), podemos aﬁrmar que {CPF, IDADE} determina NOME.

Na verdade, qualquer atributo inserido à esquerda continua determinando o atributo da direita.

