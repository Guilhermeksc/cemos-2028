# ✔️ O que é uma tupla no modelo relacional

No modelo relacional, uma **tupla** é uma **linha** de uma tabela.
Ela representa um **fato completo**, contendo valores para cada atributo daquela entidade.

Cada tupla é uma **instância única** dentro da relação.
É o equivalente ao **registro** no banco de dados.

---

## ✔️ Como interpretar uma tupla

Uma tupla pode ser lida como uma **afirmação completa** sobre uma entidade.

Exemplo:

Tabela **Aluno(id_aluno, nome, idade, curso)**

| id_aluno | nome | idade | curso |
| -------- | ---- | ----- | ----- |
| 1        | João | 21    | TI    |

A tupla acima afirma o fato:

**“Existe um aluno com id 1, nome João, idade 21, cursando TI.”**

---

## ✔️ Relação entre tupla e chave primária

Quando se fala:

> “A chave candidata a primária é formada por um ou mais atributos que identificam uma única **tupla**.”

Isso significa:

* A **chave primária** identifica **exatamente uma linha**.
* Cada tupla é **única** dentro da tabela.
* A chave evita duplicações.

Exemplo:

| id_aluno (PK) | nome  |
| ------------- | ----- |
| 1             | João  |
| 2             | Maria |

Cada tupla é identificada por seu **id_aluno**.

---

## ✔️ Exemplo simples de entidade e tupla

**Entidade: Aluno**

Atributos (colunas):

| id_aluno | nome | idade | curso |
| -------- | ---- | ----- | ----- |

Cada **tupla** é uma linha contendo valores:

| id_aluno | nome  | idade | curso   |
| -------- | ----- | ----- | ------- |
| 1        | João  | 22    | Direito |
| 2        | Maria | 20    | TI      |

Tuplas representam **fatos concretos** no banco.

---

## ✔️ Relações que representam fatos sobre entidades

### Exemplo

**Relação Aluno:**

| id_aluno | nome  | curso    |
| -------- | ----- | -------- |
| 1        | João  | História |
| 2        | Maria | TI       |

Cada tupla expressa o fato:

* **“Aluno 1 se chama João e é do curso de História.”**
* **“Aluno 2 se chama Maria e é do curso de TI.”**

---

## ✔️ Relações que representam fatos sobre relacionamentos

Quando duas entidades se relacionam, a tabela resultante também é formada por **tuplas**.

### Exemplo: Aluno ↔ Disciplina

**Aluno(id_aluno, nome)**
**Disciplina(id_disciplina, nome)**

Tabela intermediária:

### Relação MATRÍCULA

| id_aluno | id_disciplina | semestre |
| -------- | ------------- | -------- |
| 1        | 101           | 2025.1   |
| 2        | 101           | 2025.1   |
| 2        | 202           | 2025.1   |

Cada tupla é o fato:

* **“Aluno 1 matriculado na disciplina 101 em 2025.1.”**
* **“Aluno 2 matriculado nas disciplinas 101 e 202.”**

---

## ✔️ Interpretação de uma relação (como afirmação)

Um esquema de relação é uma **declaração lógica**.

**Aluno(id_aluno, nome, curso)**
→ “Existe um aluno X, nome Y e curso Z.”

**Matrícula(id_aluno, id_disciplina, semestre)**
→ “O aluno X está matriculado na disciplina Y no semestre Z.”

Cada **tupla** é uma **instância real** dessa declaração.