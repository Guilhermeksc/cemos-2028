**Domínio**, no modelo relacional, é o **conjunto de valores permitidos** para um atributo (coluna) de uma tabela.
Ele define **o tipo, o formato e as restrições** dos dados que podem ser armazenados naquele campo.

---

## ✔️ O que é um domínio?

Um **domínio** é um **conjunto de valores válidos** para um atributo.  
Serve para garantir **consistência**, **correção** e **integridade** dos dados.

Exemplos de domínios:

* Domínio **IDADE** → inteiros de 0 a 120  
* Domínio **CPF** → 11 dígitos numéricos  
* Domínio **DATA_NASC** → datas válidas  
* Domínio **SIGLA_OM** → texto em maiúsculas de 2 a 6 caracteres  
* Domínio **VALOR_MONETÁRIO** → número decimal positivo  

Um domínio pode ser **simples** (inteiro, texto, decimal) ou **restrito** (ex.: “Ativo”, “Inativo”).

---

## ✔️ Para que serve um domínio?

O domínio determina:

* **Tipo de dado permitido** (int, varchar, date…)
* **Faixas ou limites** (ex.: idade ≥ 0)
* **Formato** (ex.: AAA-999)
* **Regras de validação** (ex.: e-mail válido)
* **Conjunto fechado de valores** (ex.: “Masculino”, “Feminino”, “Outro”)

Ele impede que valores inválidos entrem no banco.

---

## ✔️ Exemplo simples

Atributo: **idade**

Domínio válido:  
`{ x ∈ Inteiros | 0 ≤ x ≤ 120 }`

Tabela **Pessoa**:

| id_pessoa | nome  | idade |
|-----------|-------|-------|
| 1         | Ana   | 25    |
| 2         | Paulo | 150 ❌ inválido |

O valor “150” viola o domínio da coluna *idade*.

---

## ✔️ Domínios garantem integridade semântica

O domínio protege não só o tipo, mas o **significado** dos dados.

Exemplos:

* Atributo **sigla_om** deve aceitar apenas textos curtos e válidos.
* Atributo **curso** pode aceitar apenas valores presentes em uma lista oficial.
* Atributo **categoria_navio** pode aceitar apenas tipos definidos pela Marinha.

É uma forma de garantir que cada coluna receba dados **corretos e coerentes com o mundo real**.

---

## ✔️ Exemplo com domínio enumerado

Atributo: **situacao**

Domínio: `{ 'Ativo', 'Inativo', 'Em manutenção' }`

Tabela **Navio**:

| id_navio | nome         | situacao         |
|----------|--------------|------------------|
| 1        | Ceará        | Ativo            |
| 2        | Amazonas     | Em manutenção    |
| 3        | Riachuelo    | Afastado ❌ inválido |

---

## ✔️ Relação entre domínio e integridade

Os domínios dão suporte a regras de integridade:

* **Integridade de domínio** → cada valor pertence ao domínio declarado
* **Integridade de entidade** → chaves primárias válidas
* **Integridade referencial** → foreign keys usando domínios compatíveis

O domínio é a **base** para todos os outros tipos de integridade.

---

## ✔️ Resumo rápido

* **Domínio** → conjunto de valores possíveis para um atributo  
* **Define tipo, formato e restrições**  
* **Garante consistência e validade dos dados**  
* **Evita inserção de valores sem sentido**  
* Ex.: inteiros positivos, datas válidas, lista de valores, padrões de texto

---

Se quiser, posso criar um exemplo completo com **domínios formais**, **diagramas**, e **restrições SQL (CHECK)**.```
