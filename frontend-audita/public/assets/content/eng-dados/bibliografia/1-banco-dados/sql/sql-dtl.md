# DTL (DATA TRANSACTION LANGUAGE) ou TCL (Transaction Control Language)

## 💾 COMANDOS DTL (Transaction Control Language)

| COMANDOS DTL | DESCRIÇÃO |
| :--- | :--- |
| **COMMIT** | Comando utilizado para **finalizar/confirmar uma transação** dentro de um SGBD. |
| **ROLLBACK** | Comando utilizado para **descartar mudanças nos dados** desde o último `COMMIT` ou `ROLLBACK`. |

## COMMIT

É o comando utilizado para salvar permanentemente uma transação em um banco de dados, visto que as transações DML não apresentam efeitos permanentes,
ficam em um estado intermediário até que sejam confirmadas.

Esse comando efetiva todas as transações de uma base de dados desde o último COMMIT ou ROLLBACK.

## ROLLBACK

É o comando utilizado para cancelar transações e retornar para o último estado em que foi realizado COMMIT.

Serão desfeitas transações desde o último COMMIT ou ROLLBACK.

# DCL (DATA CONTROL LANGUAGE)

## 💻 Comandos DCL

| **COMANDOS DCL** | **DESCRIÇÃO** |
| :--- | :--- |
| **GRANT** | Comando utilizado para **conceder permissão** a um usuário em relação a algum objeto. |
| **REVOKE** | Comando utilizado para **remover/restringir** a capacidade de um usuário de executar operações. |

## GRANT

É o comando utilizado para conceder permissões a usuários em relação a objetos.

Há nove funções permitidas: SELECT, INSERT, UPDATE, DELETE, REFERENCES, USAGE, UNDER, TRIGGER e EXECUTE.

### SINTAXE DO COMANDO

```sql
GRANT LISTA_DE_PRIVILEGIOS ON OBJETO TO LISTA_DE_USUARIOS;
```

-----

### EXEMPLO DO COMANDO

```sql
GRANT SELECT ON ALUNO_ESTRATEGIA TO PROFESSOR;
GRANT INSERT ON ALUNO_ESTRATEGIA TO GERENTE;
GRANT UPDATE ON ALUNO_ESTRATEGIA TO HEBER;
GRANT DELETE ON ALUNO_ESTRATEGIA TO RICARDO;
GRANT REFERENCES ON ALUNO_ESTRATEGIA TO DUDU;
```

-----

### RESULTADO DO COMANDO

*-- TODOS OS COMANDOS GARANTEM ALGUM TIPO DE PERMISSÃO À TABELA ALUNO\_ESTRATEGIA*

| PRIVILÉGIO | USUÁRIO | DESCRIÇÃO DA PERMISSÃO |
| :--- | :--- | :--- |
| **SELECT** | PROFESSOR | PERMITE QUE PROFESSOR CONSULTE DADOS; |
| **INSERT** | GERENTE | PERMITE QUE GERENTE INSIRA DADOS; |
| **UPDATE** | HEBER | PERMITE QUE HEBER MODIFIQUE DADOS; |
| **DELETE** | RICARDO | PERMITE QUE RICARDO DELETE DADOS; |
| **REFERENCES** | DUDU | PERMITE QUE DUDU REFERENCIE OUTRA TABELA; |

## REVOKE

É o comando usado para revogar permissões a usuários em relação a objetos.

Há nove funções: SELECT, INSERT, UPDATE, DELETE, REFERENCES, USAGE, UNDER, TRIGGER e EXECUTE.

### SINTAXE DO COMANDO

```sql
REVOKE LISTA_DE_PRIVILEGIOS ON OBJETO FROM LISTA_DE_USUARIOS;
```

-----

### EXEMPLO DO COMANDO

```sql
REVOKE SELECT ON ALUNO_ESTRATEGIA FROM PROFESSOR;
REVOKE INSERT ON ALUNO_ESTRATEGIA FROM GERENTE;
REVOKE UPDATE ON ALUNO_ESTRATEGIA FROM HEBER;
REVOKE DELETE ON ALUNO_ESTRATEGIA FROM RICARDO;
REVOKE REFERENCES ON ALUNO_ESTRATEGIA FROM DUDU;
```

-----

### RESULTADO DO COMANDO

*// TODOS OS COMANDOS REVOGAM ALGUM TIPO DE PERMISSÃO À TABELA ALUNO\_ESTRATEGIA*

| PRIVILÉGIO | USUÁRIO | DESCRIÇÃO DA AÇÃO (REVOGAÇÃO) |
| :--- | :--- | :--- |
| **SELECT** | PROFESSOR | REVOGA A PERMISSÃO DE QUE PROFESSOR CONSULTE DADOS; |
| **INSERT** | GERENTE | REVOGA A PERMISSÃO DE QUE GERENTE INSIRA DADOS; |
| **UPDATE** | HEBER | REVOGA A PERMISSÃO DE QUE HEBER MODIFIQUE DADOS; |
| **DELETE** | RICARDO | REVOGA A PERMISSÃO DE QUE RICARDO DELETE DADOS; |
| **REFERENCES** | DUDU | REVOGA A PERMISSÃO DE QUE DUDU REFERENCIE OUTRA TABELA; |

