# Modelo Relacional
 
## 2.2- Álgebra Relacional 

A álgebra relacional foi adotada por Codd como a base das linguagens de consulta de banco de dados, sendo uma linguagem de consulta formal, ou seja, uma coleção de operações de alto nível sobre relações ou conjuntos cujo resultado seja uma nova relação ou conjunto. 

As operações são: Seleção, Projeção, Produto Cartesiano, União, Diferença, Junção e Intersecção. Sendo as cinco primeiras primitivas (não podem ser obtidas a partir de outras) e as duas últimas derivadas. 

| Operação           | Símbolo | Exemplo                        |
| ------------------ | ------- | ------------------------------ |
| Seleção            | σ “sigma”      | σ<sub>idade > 30</sub>(Pessoa) |
| Projeção           | π “pi”      | π<sub>nome,cpf</sub>(Pessoa)   |
| Produto Cartesiano | ×       | Pessoa × Endereco              |
| União              | ∪       | A ∪ B                          |
| Diferença          | −       | A − B                          |
| Junção (Join)      | ⋈       | R ⋈<sub>R.id = S.id</sub> S    |
| Interseção         | ∩       | A ∩ B                          |


**a) Seleção:** Trata-se de uma operação unária que filtra as linhas de uma tabela que satisfazem um conjunto de condições ou predicados. 
Unária significa que é realizada em apenas um elemento da tabela.

## Exemplo "Seleção"
Tabela Aluno
| COD | Nome     | CPF        | Sexo |
|-----|----------|------------|------|
| 01  | Maria    | 1111111-1  | **F**    |
| 02  | João     | 2222222-2  | M    |
| 03  | Juliane  | 33333-3    | **F**    |
| 04  | Ana      | 44444-4    | ND   |
| 05  | Antônio  | 55555-5    | M    |

Seleção => σ<sub>sexo = F</sub>(Aluno)

**b) Projeção:**  Trata-se de uma operação unária que seleciona as colunas especificadas de todas as linhas da relação, **excluindo as linhas duplicadas do resultado (chamadas de duplicatas)**. Em contraste com a operação de Seleção – que seleciona as linhas que satisfazem uma condição –, a operação de Projeção projeta as colunas especificadas na lista de atributos. 

**c) Produto Cartesiano:** Também chamado de Produto Cruzado ou Junção Cruzada, trata-se de uma operação binária que produz um resultado que **combina as 
linhas de uma tabela com as linhas de outra tabela/**. Notem que o resultado contempla todas as combinações das duas tabelas. Além disso, a quantidade de colunas é igual à soma das colunas das tabelas e a quantidade de linhas é igual ao produto da quantidade de linhas de cada tabela. 

## Exemplo "Produto Cartesiano"
Aluno
| Cod | Nome |
|-----|-------|
| 01  | João  |
| 02  | Ana   |


Turma
| CodT | NomeT |
|------|--------|
| 01   | PF     |
| 02   | RF     |

**Aluno × Turma (Produto Cartesiano)**
| Cod | Nome | CodT | NomeT |
|-----|-------|-------|--------|
| 01  | João  | 01    | PF     |
| 01  | João  | 02    | RF     |
| 02  | Ana   | 01    | PF     |
| 02  | Ana   | 02    | RF     |


**d) Junção:** É uma operação binária que produz um resultado que combina as linhas de uma tabela com as linhas de outra tabela, onde as colunas duplicadas são removidas 
Aqui vai um **exemplo claro, curto e direto** de **junção (⋈)** usando duas tabelas relacionadas.


### **Tabelas**

### **Aluno**

```markdown
| Cod | Nome  |
|-----|--------|
| 01  | João   |
| 02  | Ana    |
| 03  | Carla  |
```

### **Turma**

```markdown
| CodT | NomeT |
|------|--------|
| 01   | PF     |
| 02   | RF     |
| 03   | MF     |
```

### **Matrícula** (Aluno ↔ Turma)

```markdown
| Cod | CodT |
|-----|-------|
| 01  | 01    |
| 01  | 02    |
| 02  | 03    |
```

---

### ✔️ **Junção Natural (⋈)**

### Junção entre **Aluno** e **Matrícula**, pela coluna **Cod**

**Expressão:**

[
Aluno \ \bowtie_{\text{Aluno.Cod = Matricula.Cod}} \ Matricula
]

**Resultado:**

```markdown
| Cod | Nome | CodT |
|-----|-------|-------|
| 01  | João  | 01    |
| 01  | João  | 02    |
| 02  | Ana   | 03    |
```

---

### ✔️ **Junção completa: Aluno ⋈ Matrícula ⋈ Turma**

**Expressão:**

[
Aluno \ \bowtie_{\text{Cod}} \ Matrícula \ \bowtie_{\text{CodT}} \ Turma
]

**Resultado:**

```markdown
| Cod | Nome | CodT | NomeT |
|-----|--------|-------|--------|
| 01  | João   | 01    | PF     |
| 01  | João   | 02    | RF     |
| 02  | Ana    | 03    | MF     |
```


**e) União:** É uma operação binária que produz como resultado uma nova tabela que contém todas as linhas da primeira tabela seguidas de todas as linhas da segunda tabela. A tabela resultante possui a mesma quantidade de colunas que as tabelas originais, e tem um número de linhas que é – no máximo – igual à soma das linhas de ambas as tabelas. 

Essa operação só pode ser realizada se as tabelas possuírem a mesma estrutura: mesma quantidade de colunas e as colunas devem possuir o mesmo domínio. 

Aqui vai um **exemplo simples e direto** de **União (∪)** na Álgebra Relacional.


###  ✔️ Exemplo de União (∪)

A **união** combina tuplas de duas relações **compatíveis** (mesmo número de atributos e mesmo domínio).

---

### **Tabela A – Alunos da Manhã**

```markdown
| Cod | Nome  |
|-----|--------|
| 01  | João   |
| 02  | Ana    |
| 03  | Carlos |
```

### **Tabela B – Alunos da Tarde**

```markdown
| Cod | Nome  |
|-----|--------|
| 03  | Carlos |
| 04  | Maria  |
| 05  | Pedro  |
```

---

### ✔️ Operação de União

**Expressão:**

[
A \ \cup \ B
]

---

### ✔️ Resultado da União

```markdown
| Cod | Nome  |
|-----|--------|
| 01  | João   |
| 02  | Ana    |
| 03  | Carlos |
| 04  | Maria  |
| 05  | Pedro  |
```

**Observação:**

* O elemento repetido (`03, Carlos`) aparece **somente uma vez**, pois a união elimina duplicatas.



**f) Intersecção:** É uma operação *v* **binária** que produz como resultado uma tabela que contém, sem repetições, todos os elementos que são comuns às duas tabelas fornecidas como operandos. É importante ressaltar que a mesma restrição que valia para a operação de União também vale para a operação de Intersecção. 

**g) Diferença:** É uma operação binária que produz como resultado uma tabela que contém todas as linhas que existem na primeira tabela e não existem na segunda 
tabela. 

Vale salientar que é uma é dita **comutativa** quando a ordem da operação **é indiferente**. Das operações vistas, apenas a **projeção e diferença** não são comutativas. 


| **OPERAÇÃO**          | **SÍMBOLO**   | **COMUTATIVA** | **ARIDADE** | **FINALIDADE** |
|-----------------------|---------------|----------------|-------------|----------------|
| **SELEÇÃO**           | σ(T₁)         | Sim            | Unária      | Seleciona todas as linhas que satisfazem a condição de seleção de uma Tabela T₁. |
| **PROJEÇÃO**          | Π(T₁)         | Não            | Unária      | Produz uma nova tabela com apenas algumas das colunas de uma tabela T₁ e remove linhas duplicadas. |
| **PRODUTO CARTESIANO**| T₁ × T₂       | Sim            | Binária     | Produz uma nova tabela com todas as combinações possíveis de linhas de duas tabelas T₁ e T₂. |
| **JUNÇÃO**            | T₁ ⋈ T₂       | Sim            | Binária     | Produz uma nova tabela com todas as combinações possíveis de linhas de duas tabelas T₁ e T₂ que satisfazem uma condição de seleção. |
| **UNIÃO**             | T₁ ∪ T₂       | Sim            | Binária     | Produz uma nova tabela que inclui todas as linhas das Tabelas T₁ e T₂, eliminando duplicatas — requer que as tabelas sejam união-compatíveis. |
| **INTERSECÇÃO**       | T₁ ∩ T₂       | Sim            | Binária     | Produz uma tabela que inclui todas as linhas **em comum** entre T₁ e T₂ — também exige união-compatibilidade. |
| **DIFERENÇA**         | T₁ − T₂       | Não            | Binária     | Produz uma tabela com as linhas de T₁ que **não aparecem** em T₂ — as tabelas devem ser união-compatíveis. |


## Questões

01- (IFB – 2017) Segundo Elmasri (2011), na terminologia formal do modelo relacional, uma linha, um cabeçalho de coluna e a tabela, são chamados, respectivamente, de: 

a) Registro, atributo, domínio 
b) Tupla, atributo e relação 
c) Registro, atributo e relação 
d) Relação, domínio e registro 
e) Relação, tupla e registro 

Resposta letra B

02- (TCE/PE – 2017) Em uma relação, os nomes das colunas são únicos, as linhas são distintas entre si, e a ordem da disposição das linhas e colunas é irrelevante para o banco de dados. 

Resposta Falsa **pode ser relevante também**

03- (UFC – 2018) De acordo com a álgebra relacional, marque a opção que contenha apenas operações fundamentais. 
a) Divisão, seleção, diferença. 
b) Agregação, projeção, união. 
c) Junção natural, seleção, projeção. 
d) Seleção, projeção, produto cartesiano. 
e) Interseção, produto cartesiano, junção natural. 

Resposta letra D

04. (CESPE / PC-PB - 2022) Na álgebra relacional, a operação que permite combinar informações de duas relações quaisquer é: 

a) o produto cartesiano. 
b) a seleção. 
c) a projeção. 
d) a renomeação. 
e) a união. 

Resposta letra A, quem faz a **combinação é o produto cartesiano**. A união junta todos.

Justificativa

A resposta correta é o produto cartesiano porque ele é a única operação capaz de combinar, de fato, os dados de duas relações, formando pares entre as tuplas de ambas e produzindo uma nova relação com atributos de R e S juntos. Já a união não combina nada: ela apenas agrupa linhas semelhantes de duas relações que possuem o mesmo esquema (mesmo número de atributos e mesmos domínios). Enquanto o produto cartesiano gera novas tuplas resultantes da combinação entre elementos das duas tabelas, a união apenas acrescenta tuplas, sem relacionar atributos ou cruzar informações. Por isso, a operação que realmente “combina” relações na álgebra relacional é o produto cartesiano, e não a união.
