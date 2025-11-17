# SQL - TIPOS DE DADOS

Antes de partirmos para as sub-linguagens, é importante estudar os tipos de dados pré-definidos pela linguagem SQL e reconhecidos pelo padrão ANSI/SQL.

Vamos agora conhecer os principais:

*b* **a) Textual ou literal:** são cadeias de caracteres.
<br>

Podem ter um **tamanho fixo** (Ex: CHAR(n), em que n é o número fixo de caracteres) ou um tamanho variável (Ex: VARCHAR(n), em que n é o número máximo de caracteres).

Ex: 
CHAR(8) - tamanho fixo 8 caracters (exemplo NIP)
VARCHAR(30) - tamanho de até 30 caracters.

O **Padrão ANSI/SQL-99** trouxe ainda um tipo de texto chamado **CLOB (Character Large Object)** capaz de armazenar **textos gigantescos**, sendo que o tamanho máximo depende da especificidade de cada SGBD.

Textos inseridos diretamente no banco de dados devem ser colocados entre aspas simples (apóstrofos).

*vbg* **Ex: "Emannuelle"**

O SQL é Case Sensitive (diferencia maiúsculas de minúsculas).

*vbg* **Ex: Emannuele é diferente de EMANNUELE (Emannuele != EMANNUELE)**

**Observação importante:** os valores do tipo texto inseridos em uma linha do banco de dados são Case Sensitive, mas as palavras-chave que compõem a linguagem, não, então, podemos escrever tanto CREATE TABLE quanto create table.

*vbg* **Ex: SELECT = select**

<br>

*b* **b) Numérico:** Esse tipo de dado inclui números **inteiros de diversos tamanhos** (Ex: INTEGER, INT ou SMALLINT) e **números reais** (FLOAT, REAL e DOUBLE PRECISION), também conhecidos como ponto flutuante.

*v* **Número real = ponto flutuante!**

O nome ponto flutuante é devido ao fato de que em números reais o ponto varia de posição (Ex: 35.2 ou 0.458). Podemos definir a precisão e a escala desses números: a **precisão** é o número total de dígitos; e a **escala** é o número de dígitos após o ponto decimal.

| Conceito | Definição  | Exemplo  | Explicação   |
|----------|------------|----------|--------------|
| Precisão   | Quantidade **total** de dígitos do número (antes e depois do ponto).      | 123.45 → precisão = 5     | O número possui 5 dígitos no total.                                       |
| Escala     | Quantidade de dígitos **após** o ponto decimal.                           | 123.45 → escala = 2       | Existem 2 dígitos depois do ponto.                                        |
| Exemplo 2  | Número com precisão 7 e escala 3                                           | 3456.789                   | Total de 7 dígitos, sendo 3 após o ponto e 4 antes do ponto.             |
| Exemplo SQL| Definição de tipo numérico com precisão e escala                          | DECIMAL(7,3)              | Primeiro valor = precisão; segundo = escala.                              |


Respondam-me: qual é a escala e a precisão do número 527918.436? Precisão é o número total de dígitos, logo é 9; e a escala é o número de dígitos após o ponto decimal, logo é 3; portanto, esse número poderia estar armazenado em uma coluna do banco de dados como FLOAT(9,3).

FLOAT(9,3) - deve ter **até** 9 dígitos no total e **até** 3 após o ponto.

*b* **c) Binário:** Esse tipo de dado é basicamente uma **cadeia de bits**. Podem ter um tamanho fixo (Ex: BIT(n), em que n é o número fixo de bits) ou um tamanho variável (Ex: BIT VARYING(n), em que n é o número máximo de bits).

Há ainda o **BLOB (Binary Large Object)**, capaz de armazenar uma quantidade gigantesca de bits.

Em geral, todo arquivo fica em uma coluna desse tipo de dado porque ele é capaz de suportar uma quantidade gigantesca de bits e os arquivos são basicamente conjuntos de bits (seja ele uma foto, um documento, um software, um vídeo, entre outros).

Ex:
BIT (64) tamanho fixo 64 bits
BIT VARYING(64) variável até 64 bits.

### CLOB e BLOB (Large Objects)

Além dos tipos textuais, numéricos e binários comuns, os bancos de dados modernos precisam armazenar grandes volumes de informação. Para isso existem os tipos LOB – Large Objects, divididos principalmente em CLOB e BLOB.

CLOB é como um documento de texto gigante.
(Um “bloco de notas” enorme guardado no banco.)

BLOB é como guardar um arquivo dentro do banco.
(Uma foto, um vídeo ou um PDF “anexado” à tabela.)

| Tipo     | Armazena                | Interpretação     | Exemplos                              |
| -------- | ----------------------- | ----------------- | ------------------------------------- |
| **CLOB** | Texto muito grande      | Texto, caracteres | artigos, relatórios, XML, JSON        |
| **BLOB** | Arquivo bruto (binário) | Bits, bytes       | fotos, vídeos, pdfs, ZIP, executáveis |


*b* **d) Booleano:** Esse tipo de dado tem como valores tradicionais TRUE (Verdadeiro) ou FALSE (Falso) e um terceiro valor, que é o NULL.

O tipo Booleano utiliza apenas **1 byte para seu armazenamento**, uma vez que:
<br>
o valor falso é representado por **0 (00000000)**, e
o valor verdadeiro é representado por **1 (00000001)**.
<br>

*b* **e) Data:** Esse tipo de dado possui **dez posições**, e seus componentes são DAY (Dia), MONTH (Mês) e YEAR (Ano) na forma **DD-MM-YYYY** (Ex: 30/03/2019). 

Somente datas válidas devem ser permitidas pela implementação do SQL, ou seja, os meses devem estar entre 1 e 12 e os dias devem estar entre 1 e 31. Além disso, os dias devem ser válidos para o mês correspondente, logo, não é possível haver a data 30/02/2020 porque o mês de fevereiro nunca tem 30 dias.

*b* **f) Hora:** Esse tipo de dado possui pelo menos oito posições compostas por HOUR (Hora), MINUTE (Minuto) e SECOND (Segundo) na forma HH:MM:SS. 

O SQL já faz o controle das horas válidas que devem estar entre 0 e 23 e os minutos e segundos entre 0 e 59.

Outros tipos de dados foram acrescentados em versões posteriores do Padrão

**ANSI/SQL, como por exemplo:**

*b* **TIMESTAMP:** junção da Data com a Hora e fuso horário;
*b* **INTERVAL:** permite calcular o intervalo entre Datas ou Horas;
*b* **DATETIME:** combina data e hora em um único tipo, com intervalo de datas.

Um campo com valor **NULL é um campo sem valor**. Se um campo em uma tabela for opcional, é possível inserir um novo registro ou atualizar um registro sem adicionar um valor a este campo. Em seguida, o campo será salvo com um valor
NULL.

Observação: um valor NULL é diferente de um valor zero ou de um campo que contém espaços, um campo com um valor NULL é aquele que foi deixado em branco durante a criação do registro!

*vbg* **NULL é um campo em branco(sem valor)**