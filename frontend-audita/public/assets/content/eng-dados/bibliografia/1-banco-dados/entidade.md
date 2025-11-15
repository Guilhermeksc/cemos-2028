**Entidades**, no modelo relacional, são **objetos do mundo real** sobre os quais desejamos armazenar dados.
São elementos identificáveis, que possuem **atributos** (características) e aparecem representados como **tabelas** no banco de dados.

---

## ✔️ O que é uma entidade?

Uma **entidade** é algo que existe de forma distinta e sobre o qual precisamos guardar informações.
Exemplos:

* **Pessoa**
* **Produto**
* **Aluno**
* **Fornecedor**
* **Navio**
* **Unidade Militar (UASG)**

Cada entidade se torna uma **tabela**.

---

## ✔️ Exemplo simples

**Entidade: Aluno**

Atributos → colunas da tabela:

| id_aluno | nome | idade | curso |
| -------- | ---- | ----- | ----- |

Cada **linha (tupla)** é um **fato**: uma instância daquela entidade.

---

## ✔️ Relações que representam fatos sobre entidades

Uma relação pode representar um fato:

### Exemplo

**Relação Aluno:**

| id_aluno | nome  | curso    |
| -------- | ----- | -------- |
| 1        | João  | História |
| 2        | Maria | TI       |

Cada tupla expressa o fato:

* **“Aluno 1 se chama João e é do curso de História”**
* **“Aluno 2 se chama Maria e é do curso de TI”**

Isso é uma **asserção** válida dentro do banco.

---

## ✔️ Relações que representam fatos sobre relacionamentos

Algumas relações armazenam **relações entre entidades**, não as entidades em si.

### Exemplo clássico: Entidades **Aluno** e **Disciplina**

Tabelas:

**Aluno(id_aluno, nome)**
**Disciplina(id_disciplina, nome)**

Para relacioná-las (ex: matrícula), cria-se uma relação intermediária:

### Relação MATRÍCULA (Aluno ↔ Disciplina)

| id_aluno | id_disciplina | semestre |
| -------- | ------------- | -------- |
| 1        | 101           | 2025.1   |
| 2        | 101           | 2025.1   |
| 2        | 202           | 2025.1   |

Cada tupla representa o **fato**:

* **“O aluno 1 está matriculado na disciplina 101 no semestre 2025.1”**
* **“O aluno 2 está matriculado nas disciplinas 101 e 202”**

Esse tipo de tabela **não é uma entidade**, mas sim um **relacionamento** entre entidades.

---

### ✔️ Interpretação de uma relação (como afirmação)

Um esquema de relação pode ser lido como uma **declaração lógica**.

Exemplo:

**Aluno(id_aluno, nome, curso)**
→ pode ser interpretado como:
**“Existe um aluno com id X, nome Y e curso Z.”**

**Matrícula(id_aluno, id_disciplina, semestre)**
→ pode ser interpretado como:
**“O aluno X está matriculado na disciplina Y no semestre Z.”**

Cada tupla é um **fato concreto**, uma **instância** dessa declaração.

---

### ✔️ Resumo rápido

* **Entidade** → objeto do mundo real (vira tabela)
* **Atributos** → características (viram colunas)
* **Tupla** → fato sobre aquela entidade (linha)
* **Relacionamento** → fato que conecta duas entidades (tabela intermediária)
* **Relação** pode representar:

  * fatos sobre entidades (Aluno, Produto, Navio)
  * fatos sobre relacionamentos (Matrícula, Encomenda, Participação)

---

Se quiser, posso te dar um exemplo completo com **diagrama ER**, **tabelas**, e **interpretação lógica**.
