# Modelo Relacional
 
## 2.6 Relacionamentos: é a relação entre as tabelas.

Podem ser:
• um-para-um (1:1);
• um-para-muitos (1:N);
• muitos-para-muitos (N:M).

## ✔️ Relacionamento **Um-para-Um (1:1)**

Relacionamento um-para-um (1:1): Quando uma linha de uma tabela está associada com uma linha de outra tabela.

**Exemplo:**
Tabela **Cliente** e tabela **Contrato**.
Cada cliente tem **um único contrato**, e cada contrato pertence **a um único cliente**.

| Cliente | Contrato      |
| ------- | ------------- |
| João    | Contrato #001 |


## ✔️ Relacionamento **Um-para-Muitos (1:N)**

Relacionamento um-para-muitos : quando uma linha de uma tabela está associada a diversas linhas de outra tabela.

**Exemplo:**
Um **cliente** pode ter **várias apólices de seguro**.

| Cliente | Apólices de Seguro       |
| ------- | ------------------------ |
| Maria   | Apólice #10, Apólice #11 |

Maria (1) → várias apólices (N).

## ✔️ Relacionamento **Muitos-para-Muitos (N:M)**

Relacionamento Muitos-Para-Muitos : quando várias linhas de uma tabela se associam a várias linhas de outra tabela. Deve ser mapeado para uma tabela associativa.

Vários registros de uma tabela podem se relacionar com **vários** registros da outra.
Esse tipo exige uma **tabela associativa**.

Aqui está o **mesmo exemplo da imagem**, mas agora organizado em **markdown**, com a **tabela associativa** para representar o relacionamento **muitos-para-muitos (N:M)** entre **Aluno** e **Turma**.

Um aluno pode participar de **várias turmas**, e uma turma pode ter **vários alunos**.

Para representar isso, é criada uma **tabela associativa** chamada **Matrícula**.


📌 Tabela: **Aluno**
| CODALU (PK) | Nome  |
| ----------- | ----- |
| 01          | Monic |
| 02          | Ju    |
| 03          | Mora  |
| 04          | Anita |
| 05          | Igor  |


📌 Tabela: **Turma**
| CODTurma (PK) | Nome |
| ------------- | ---- |
| 01            | RFB  |
| 02            | BF   |
| 03            | TRIB |

 📌 **Tabela Associativa: Matrícula**

Relaciona cada **Aluno** com uma **Turma**.

| CODAluno (FK) | CODTurma (FK) |
| ------------- | ------------- |
| 01            | 01            |
| 02            | 01            |
| 02            | 02            |
| 05            | 01            |
| 05            | 03            |

---

# ✔️ Explicação simples

* O aluno **01 (Monic)** está na turma **01 (RFB)**.
* O aluno **02 (Ju)** está na turma **01 (RFB)** **e** na **02 (BF)**.
* O aluno **05 (Igor)** está na turma **01 (RFB)** **e** na **03 (TRIB)**.

Assim, **um aluno pode ter várias turmas**, e **uma turma pode ter vários alunos** → por isso é **N:M**.


13 (QUADRIX – 2019) Em um modelo entidade-relacionamento (MER), diz-se que, em um relacionamento 1..1 – um para um, cada entidade pode referenciar múltiplas unidades daquele com o qual se relaciona.

Resposta Falso

14. (UFVJM/MG – 2017) Em um relacionamento entre duas entidades, em que a primeira pode se relacionar com vários registros na segunda, e a segunda se relaciona com apenas uma na primeira, tem-se:

a) Relacionamento 1-1
b) Relacionamento 1-N
c) Relacionamento N-N
d) Relacionamento N-M

Resposta B

15 (SEFAZ/RS–2018) No mapeamento de um modelo entidade-relacionamento para um modelo relacional de banco de dados, o tipo de relacionamento que implica a criação de uma terceira tabela para onde serão transpostos as chaves primárias e os eventuais atributos das duas tabelas originais é denominado:

a) relacionamento N:N.
b) relacionamento 1:1.
c) relacionamento 1:N.
d) autorrelacionamento 1:N.
e) relacionamento ternário.

Resposta A