A seguir, o relatório solicitado.

---

## 1. Definição detalhada do assunto

### 1.1. Conceito de integridade de dados

**Integridade de dados** é o conjunto de **propriedades, regras e mecanismos** que asseguram que os dados mantidos em um sistema de informação sejam **corretos, consistentes, completos e válidos** ao longo de todo o seu ciclo de vida (criação, armazenamento, processamento, transmissão e descarte).

Na perspectiva de Auditoria de TI e de SGBDs, integridade de dados envolve:

* **Manter consistência interna** entre registros (ex.: chaves primárias e estrangeiras).
* **Respeitar regras de negócio** (ex.: data de encerramento ≥ data de início).
* **Evitar dados inválidos, contraditórios, duplicados ou ausentes** indevidamente.
* **Garantir que operações concorrentes e falhas não degradem o estado dos dados.**

### 1.2. Controle de integridade de dados

**Controle de integridade de dados** é o conjunto de:

* **Regras** (constraints, gatilhos, validações).
* **Procedimentos** (rotinas de verificação, reconciliação).
* **Mecanismos técnicos** (transações, logs, bloqueios, versionamento).
* **Controles organizacionais** (separação de funções, revisão, reconciliação contábil).

voltados a **prevenir, detectar e corrigir violações de integridade**.

---

## 2. Subtópicos essenciais exigidos em provas

### 2.1. Tipos clássicos de integridade em banco de dados relacional

1. **Integridade de entidade**

   * Garante que cada linha de uma tabela é **única e identificável**.
   * Implementada, em geral, por:

     * **Chave primária (PRIMARY KEY)**: não nula, única.
     * Atributos NOT NULL que compõem identificadores.

2. **Integridade referencial**

   * Garante a **consistência entre tabelas relacionadas**.
   * Implementada por **chaves estrangeiras (FOREIGN KEY)**.
   * Exemplo: não permitir que exista matrícula de aluno em turma inexistente.

3. **Integridade de domínio**

   * Garante que os valores de um atributo pertençam a um **conjunto permitido** (tipo, faixa, lista de valores).
   * Implementada por:

     * Tipo de dado apropriado (INTEGER, DATE, VARCHAR com tamanho).
     * Restrições CHECK (ex.: CHECK (idade >= 0)).
     * Tabelas de domínio (ex.: tabela de códigos de situação).

4. **Integridade de negócio (ou semântica)**

   * Regras específicas do contexto da organização:

     * Ex.: “data_fim ≥ data_inicio”, “saldo_não_negativo”.
   * Implementada via:

     * Constraints, triggers, regras de aplicação, stored procedures.

### 2.2. Mecanismos técnicos de controle de integridade

* **Constraints (restrições de integridade)**

  * PRIMARY KEY, UNIQUE, FOREIGN KEY, CHECK, NOT NULL.
  * Executadas pelo SGBD, de forma centralizada e automática.

* **Transações e propriedades ACID**

  * Atomicidade, Consistência, Isolamento, Durabilidade.
  * Garantem que operações agrupadas mantenham o banco em estado consistente.

* **Triggers (gatilhos)**

  * Código executado automaticamente em eventos (INSERT, UPDATE, DELETE).
  * Utilizados para:

    * Validar regras complexas.
    * Manter tabelas derivadas, logs de auditoria, etc.

* **Controle de concorrência**

  * Locks (bloqueios), MVCC (controle de versão).
  * Evitam anomalias como:

    * Dirty reads, lost updates, phantom reads.

### 2.3. Controles organizacionais e processuais

* **Reconciliação e conferências periódicas**

  * Conciliação bancária, reconciliação contábil, conferência de saldos.

* **Políticas de qualidade de dados**

  * Procedimentos para tratamento de duplicidades, registros órfãos, valores nulos indevidos.

* **Segregação de funções**

  * Quem desenvolve não aprova dados críticos.
  * Quem insere dados não aprova alterações em massa.

---

## 3. Aspectos normativos e de governança

### 3.1. Normas de qualidade e integridade de dados

* **ISO/IEC 25012 – Modelo de qualidade de dados**

  * Inclui características como **acurácia, consistência, completude, atualidade**.
  * Integridade de dados está alinhada, principalmente, com:

    * **Consistência**, **acurácia** e **conformidade**.

* **LGPD (Lei Geral de Proteção de Dados)**

  * Dados pessoais **íntegros e atualizados**:

    * Princípios da **exatidão** e **atualização**, quando necessário.
    * Controle de integridade é relevante também para evitar:

      * Dados desatualizados que prejudiquem titulares.
      * Inconsistências em cadastros, decisões automatizadas injustas etc.

* **Normas de Auditoria Governamental**

  * Diretrizes relacionadas à confiabilidade de informações utilizadas em:

    * Prestação de contas.
    * Demonstrações contábeis.
    * Relatórios gerenciais e de desempenho.

### 3.2. Governança de dados

* **Data governance**

  * Processos, papéis e responsabilidades para garantir que os dados mantidos sejam:

    * Confiáveis, íntegros, compreensíveis.
  * Envolve:

    * Data stewards, comitês de dados, catálogo de dados.
    * Definição de regras de integridade corporativas.

* **Controles que interessam ao Auditor de TI**

  * Se a organização possui:

    * Padrões formalizados de modelagem de dados.
    * Regras de integridade implementadas no SGBD (e não apenas na aplicação).
    * Procedimentos para correção de inconsistências.

---

## 4. Exemplos práticos

### 4.1. Integridade referencial simples

```sql
CREATE TABLE Departamento (
    id_depto INT PRIMARY KEY,
    nome     VARCHAR(100) NOT NULL
);

CREATE TABLE Funcionario (
    id_func   INT PRIMARY KEY,
    nome      VARCHAR(100) NOT NULL,
    id_depto  INT NOT NULL,
    CONSTRAINT fk_func_depto
        FOREIGN KEY (id_depto)
        REFERENCES Departamento (id_depto)
);
```

* Não é possível inserir funcionário com `id_depto` inexistente.
* Não é possível excluir departamento referenciado por funcionários (sem ação adequada, como CASCADE).

### 4.2. Integridade de domínio

```sql
CREATE TABLE Pedido (
    id_pedido   INT PRIMARY KEY,
    valor_total DECIMAL(10,2) NOT NULL,
    status      CHAR(1) NOT NULL,
    CONSTRAINT chk_valor_pos
        CHECK (valor_total >= 0),
    CONSTRAINT chk_status
        CHECK (status IN ('A','F','C'))  -- Aberto, Fechado, Cancelado
);
```

* Impede valor total negativo.
* Impede status inválido.

### 4.3. Integridade de negócio com trigger

```sql
CREATE TRIGGER trg_valida_datas
BEFORE INSERT OR UPDATE ON Contrato
FOR EACH ROW
BEGIN
    IF :NEW.data_fim < :NEW.data_inicio THEN
        RAISE_APPLICATION_ERROR(-20001, 'Data fim não pode ser anterior à data início');
    END IF;
END;
```

* Garante regra de negócio independentemente da aplicação cliente.

---

## 5. Erros comuns em provas

1. **Achar que integridade de dados é apenas “segurança” (confidencialidade)**

   * Integridade é um pilar distinto da segurança da informação.
   * Confundir integridade com confidencialidade é erro clássico.

2. **Supor que integridade de dados é garantida somente pela aplicação**

   * Correto é afirmar que o **SGBD** deve ser responsável por parte crítica da integridade (constraints, transações).
   * Aplicação pode complementar, mas não substituir totalmente os mecanismos do SGBD.

3. **Dizer que chave primária pode ser nula**

   * Em modelos relacionais típicos, chave primária **não aceita valores nulos**.

4. **Achar que integridade referencial não impede registros órfãos**

   * Justamente o objetivo da integridade referencial é **evitar órfãos** (filho sem pai).

5. **Afirmar que transações ACID apenas garantem desempenho**

   * ACID está diretamente relacionado à **consistência** dos dados, não a desempenho.

6. **Considerar que integridade de domínio é só escolher tipo de dado**

   * Vai além de tipo; inclui restrições de faixa, listas de valores, regras de formato (regex), etc.

---

## 6. Questões típicas (estilo CEBRASPE)

Julgue os itens a seguir como **Certo (C)** ou **Errado (E)**.

1. ( ) A integridade de entidade é garantida, nos bancos de dados relacionais, pela definição de chaves primárias que identificam univocamente cada tupla e que podem conter valores nulos, desde que não haja duplicidade.

2. ( ) A integridade referencial visa evitar a existência de registros órfãos em tabelas dependentes, sendo usualmente implementada por meio de chaves estrangeiras que referenciam chaves primárias ou candidatas em outras tabelas.

3. ( ) A integridade de domínio está relacionada à restrição dos valores possíveis para determinados atributos, podendo ser implementada por tipos de dados, restrições CHECK e tabelas de domínio.

4. ( ) Em sistemas que utilizam SGBDs com suporte a propriedades ACID, as transações são importantes para garantir que o banco de dados transite apenas entre estados consistentes, contribuindo para o controle de integridade dos dados.

5. ( ) Em termos de governança de dados, políticas de reconciliação periódica, correção de inconsistências e tratamento de registros duplicados podem ser consideradas mecanismos de controle de integridade de dados em nível organizacional.

**Gabarito comentado:**

1. **Errado.** Chave primária não admite valores nulos.
2. **Certo.** Essa é a finalidade da integridade referencial.
3. **Certo.** Definição clássica de integridade de domínio.
4. **Certo.** Transações ACID asseguram consistência lógica do banco.
5. **Certo.** São controles organizacionais voltados à integridade de dados.

---

## 7. Resumo final altamente sintético para revisão

* **Integridade de dados**: correção, consistência, completude e validade dos dados ao longo do tempo.
* **Tipos principais**:

  * Integridade de entidade → chave primária, identificação única, sem nulos.
  * Integridade referencial → chaves estrangeiras, sem registros órfãos.
  * Integridade de domínio → tipos, faixas, listas de valores, CHECK.
  * Integridade de negócio → regras específicas, triggers, lógica de aplicação.
* **Mecanismos técnicos**:

  * Constraints, triggers, transações ACID, controle de concorrência.
* **Controles organizacionais**:

  * Reconciliações, políticas de qualidade de dados, segregação de funções.
* **Normativos e governança**:

  * ISO 25012 (qualidade de dados), LGPD (exatidão/atualização), data governance.
* **Para o Auditor de TI**:

  * Verificar se a integridade está:

    * Formalmente definida (modelo de dados, regras).
    * Implementada no SGBD e nas aplicações.
    * Apoiada por processos de monitoramento e correção de inconsistências.
