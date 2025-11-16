# ✔️ Dependência Funcional e Dependência Parcial

## ✔️ O que é **Dependência Funcional**?

Dependência funcional é uma **relação lógica entre atributos** de uma tabela.

Dizemos que um atributo **Y depende funcionalmente de X** quando **cada valor de X determina exatamente um valor de Y**.

A notação usada é:

```
X → Y
```

Interpretação:

* **X determina Y**
* **Y depende de X**

### ✔️ Exemplo simples

Considere a entidade **Aluno**:

| matricula | nome  | curso   |
| --------- | ----- | ------- |
| 101       | João  | TI      |
| 102       | Maria | Direito |

Aqui temos:

```
matricula → nome
matricula → curso
```

Porque **uma matrícula identifica exatamente um nome e um curso**.

---

# ✔️ O que é **Dependência Parcial**?

A dependência parcial ocorre quando:

* A tabela possui **chave primária composta** (mais de um atributo).
* Um atributo **não-chave** depende **somente de parte da chave**, e não da chave inteira.

Ou seja:
O atributo deveria depender de **toda a chave**, mas depende apenas de um pedaço dela.

### ✔️ Exemplo didático

Tabela **Inscrição**:

| id_aluno | id_disciplina | nome_aluno | nota |
| -------- | ------------- | ---------- | ---- |
| 1        | 10            | João       | 8.5  |
| 1        | 11            | João       | 9.0  |
| 2        | 10            | Maria      | 7.0  |

A chave primária é:

```
(id_aluno, id_disciplina)
```

Mas observe:

```
id_aluno → nome_aluno
```

Ou seja, **nome_aluno depende apenas de id_aluno**, e não da chave inteira.

Isso é **dependência parcial**.

### ✔️ Por que isso é um problema?

* Gera **redundância** (o nome do aluno se repete).
* Gera **risco de inconsistência**.
* Impede alcançar a **Segunda Forma Normal (2FN)**.

---

# ✔️ Resumo rápido

| Conceito                  | Explicação                                                            |
| ------------------------- | --------------------------------------------------------------------- |
| **Dependência Funcional** | Quando um atributo **determina** outro. Ex: CPF → nome.               |
| **Dependência Parcial**   | Quando um atributo depende apenas de **parte** de uma chave composta. |
