## ✔️ O que são **atributos**?

Atributos são as **características** de uma entidade.
No banco de dados, cada atributo aparece como uma **coluna** da tabela.

Eles descrevem aquilo que queremos registrar.

### Exemplos de atributos para a entidade **Aluno**:

| id_aluno | nome | idade | curso |
| -------- | ---- | ----- | ----- |

Cada coluna acima é um **atributo**:

* **id_aluno** → identifica o aluno
* **nome** → informa como ele se chama
* **idade** → característica numérica
* **curso** → indica o curso em que ele está matriculado

Atributos definem **o tipo de informação** guardada na tabela.

---

## ✔️ O que são **registros**?

Um registro (também chamado de **tupla**, **linha** ou **instância**) é um **fato completo** sobre uma entidade.

É uma linha da tabela que preenche todos os atributos com valores reais.

### Exemplos de registros:

| id_aluno | nome  | idade | curso    |
| -------- | ----- | ----- | -------- |
| 1        | João  | 20    | História |
| 2        | Maria | 22    | TI       |

Cada linha representa um **aluno existente**.
Interpretando os registros:

* **“Aluno 1 se chama João, tem 20 anos e cursa História.”**
* **“Aluno 2 se chama Maria, tem 22 anos e cursa TI.”**

Ou seja, um registro é uma **afirmação verdadeira** dentro do banco.

## ✔️ Tipos especiais de atributos

Além dos atributos simples (como nome, idade, curso), há categorias importantes no modelo relacional conceitual.

---

## ✔️ **Atributo Multivalorado**

É o atributo que pode ter **mais de um valor ao mesmo tempo** para a mesma entidade.

Exemplo clássico:
**Aluno.telefones**

Um aluno pode ter **vários** números:

| id_aluno | nome  | telefones                   |
| -------- | ----- | --------------------------- |
| 1        | João  | (61) 99999-1111, 99988-2222 |
| 2        | Maria | (61) 98888-3333             |

Características:

* Armazena **múltiplos valores**.
* Em um banco relacional real, costuma ser **separado em outra tabela** (`telefone_aluno`) para normalizar.

---

## ✔️ **Atributo Composto**

É o atributo que pode ser **decomposto** em partes menores e mais específicas.

Exemplo: **endereço**

Em vez de um único campo, ele pode ser dividido em:

* rua
* número
* cidade
* estado
* CEP

Representação:

| id_aluno | nome | endereço                                 |
| -------- | ---- | ---------------------------------------- |
| 1        | João | Rua A, nº 10, Brasília-DF, CEP 70000-000 |

Decomposição:

**endereço = rua + número + cidade + estado + CEP**

Características:

* O atributo possui **subatributos**.
* Permite uma estrutura mais detalhada.

---

## ✔️ Resumo rápido (incluindo novos tipos)

| Conceito                   | Explicação                                                                 |
| -------------------------- | -------------------------------------------------------------------------- |
| **Atributo**               | Característica da entidade (coluna).                                       |
| **Registro**               | Instância real da entidade (linha).                                        |
| **Atributo Multivalorado** | Pode ter **vários valores** simultâneos (ex: vários telefones).            |
| **Atributo Composto**      | Pode ser **decomposto** em partes menores (ex: endereço → rua, número...). |

Se quiser, posso incluir diagramas ER com símbolos desses atributos.

