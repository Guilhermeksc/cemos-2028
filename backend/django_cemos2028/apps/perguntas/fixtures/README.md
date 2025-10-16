# Fixtures para o Sistema de Perguntas

Este diretório contém os arquivos XLSX que são automaticamente carregados quando as migrações são executadas.

## Estrutura dos Arquivos

### 1. bibliografias.xlsx

Colunas obrigatórias:
- `titulo` (string): Título da bibliografia
- `autor` (string, opcional): Autor da bibliografia
- `materia` (string, opcional): Matéria da bibliografia
- `descricao` (string, opcional): Descrição da bibliografia

### 2. perguntas_multipla.xlsx

Colunas obrigatórias:
- `bibliografia_titulo` (string): Título da bibliografia (deve existir em bibliografias.xlsx)
- `pergunta` (string): Texto da pergunta
- `alternativa_a` (string): Texto da alternativa A
- `alternativa_b` (string): Texto da alternativa B
- `alternativa_c` (string): Texto da alternativa C
- `alternativa_d` (string): Texto da alternativa D
- `resposta_correta` (string): 'a', 'b', 'c' ou 'd'
- `justificativa_resposta_certa` (string): Justificativa da resposta

Colunas opcionais:
- `caiu_em_prova` (boolean): Se a pergunta caiu em prova
- `ano_prova` (int): Ano da prova

### 3. perguntas_vf.xlsx

Colunas obrigatórias:
- `bibliografia_titulo` (string): Título da bibliografia
- `pergunta` (string): Texto da pergunta
- `afirmacao` (string): Afirmação a ser avaliada
- `resposta_correta` (string/boolean): 'true'/'false', 'verdadeiro'/'falso', '1'/'0', etc.
- `justificativa_resposta_certa` (string): Justificativa da resposta

Colunas opcionais:
- `caiu_em_prova` (boolean): Se a pergunta caiu em prova
- `ano_prova` (int): Ano da prova

### 4. perguntas_correlacao.xlsx

Colunas obrigatórias:
- `bibliografia_titulo` (string): Título da bibliografia
- `pergunta` (string): Texto da pergunta
- `coluna_a` (string/JSON): Lista de itens da coluna A (JSON ou separado por vírgulas)
- `coluna_b` (string/JSON): Lista de itens da coluna B (JSON ou separado por vírgulas)
- `resposta_correta` (string/JSON): Pares corretos em formato JSON: {"0": "1", "1": "0", "2": "2"}
- `justificativa_resposta_certa` (string): Justificativa da resposta

Colunas opcionais:
- `caiu_em_prova` (boolean): Se a pergunta caiu em prova
- `ano_prova` (int): Ano da prova

## Exemplos de Dados

### Bibliografia
```
titulo | autor | materia | descricao
Direito Constitucional | José Silva | Direito | 2020 | Livro sobre direito constitucional
```

### Pergunta Múltipla Escolha
```
bibliografia_titulo | pergunta | alternativa_a | alternativa_b | alternativa_c | alternativa_d | resposta_correta | justificativa_resposta_certa
Direito Constitucional | Qual é o princípio da legalidade? | Fazer tudo | Fazer apenas o permitido | Não fazer nada | Fazer o proibido | b | O princípio da legalidade...
```

### Pergunta V/F
```
bibliografia_titulo | pergunta | afirmacao | resposta_correta | justificativa_resposta_certa
Direito Constitucional | Sobre princípios constitucionais | A legalidade é um princípio | true | A legalidade é sim um princípio...
```

### Pergunta Correlação
```
bibliografia_titulo | pergunta | coluna_a | coluna_b | resposta_correta | justificativa_resposta_certa
Direito Constitucional | Relacione os princípios | ["Legalidade", "Moralidade"] | ["Art. 5º", "Art. 37"] | {"0": "1", "1": "0"} | Legalidade está no art. 5º...
```

## Observações

- Os arquivos devem estar no formato XLSX
- As colunas devem ter exatamente os nomes especificados
- Linhas com campos obrigatórios vazios serão ignoradas
- Bibliografias devem ser carregadas antes das perguntas
- O sistema evita duplicações baseando-se nos campos únicos