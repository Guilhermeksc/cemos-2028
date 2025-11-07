# Template para flashcards.xlsx

## 📋 Estrutura do Arquivo

O arquivo `flashcards.xlsx` deve conter as seguintes colunas:

| Coluna | Tipo | Obrigatório | Descrição | Exemplo |
|--------|------|-------------|-----------|---------|
| `bibliografia_id` | Inteiro | ✅ Sim | ID da bibliografia (deve existir na tabela) | 1 |
| `pergunta` | Texto | ✅ Sim | Pergunta do flash card | "O que é legalidade?" |
| `resposta` | Texto | ✅ Sim | Resposta do flash card | "É o princípio..." |
| `assunto` | Texto | ✅ Sim | Assunto/categoria do flash card | "Princípios Constitucionais" |

## 📊 Exemplo de Estrutura Excel

### Linha 1 (Cabeçalho):
```
bibliografia_id | pergunta | resposta | assunto
```

### Linhas de Dados:
```
1 | O que é legalidade? | É o princípio que estabelece que ninguém será obrigado a fazer ou deixar de fazer algo senão em virtude de lei. | Princípios Constitucionais
1 | O que é moralidade administrativa? | É o princípio que impõe ao administrador público atuar com ética, probidade e boa-fé. | Princípios Constitucionais
2 | O que é geopolítica? | É o estudo das relações entre o poder político e o espaço geográfico. | Conceitos Básicos
2 | Quem é considerado o pai da geopolítica? | Friedrich Ratzel é considerado um dos fundadores da geopolítica. | História da Geopolítica
```

## 🔍 Observações Importantes

### 1. **bibliografia_id**
- ⚠️ Deve ser um **número inteiro**
- ⚠️ O ID deve **existir** na tabela de bibliografias
- ⚠️ Você pode verificar os IDs disponíveis no admin Django ou no banco de dados
- ✅ Para encontrar IDs: Acesse `/admin/perguntas/bibliografiamodel/`

### 2. **pergunta**
- ✅ Texto livre (não deve estar vazio)
- ✅ Pode conter caracteres especiais, acentos, pontuação
- ✅ Recomendado: Perguntas curtas e diretas (idealmente até 200 caracteres)

### 3. **resposta**
- ✅ Texto livre (não deve estar vazio)
- ✅ Pode ser tão longa quanto necessário
- ✅ Suporta múltiplos parágrafos (use quebras de linha no Excel)

### 4. **assunto**
- ✅ Texto livre (não deve estar vazio)
- ✅ Use nomes consistentes para facilitar a filtragem
- ✅ Exemplos de bons assuntos:
  - "Princípios Constitucionais"
  - "Teoria Clássica"
  - "Conceitos Fundamentais"
  - "Autores Importantes"

## 💡 Dicas para Criar Flash Cards Eficazes

### ✅ Boas Práticas:

1. **Uma informação por card**
   - ❌ Ruim: "Quais são os 5 princípios da administração pública e o que significa cada um?"
   - ✅ Bom: "O que é o princípio da legalidade?"

2. **Perguntas específicas**
   - ❌ Ruim: "O que você sabe sobre Ratzel?"
   - ✅ Bom: "Qual é a principal contribuição de Friedrich Ratzel para a geopolítica?"

3. **Respostas concisas**
   - ✅ Foque no essencial
   - ✅ Use bullet points quando necessário
   - ✅ Evite respostas muito longas (máx. 2-3 parágrafos)

4. **Assuntos organizados**
   - ✅ Use uma hierarquia consistente
   - ✅ Agrupe cards relacionados no mesmo assunto
   - ✅ Evite muitos assuntos diferentes (idealmente 5-10 por bibliografia)

## 🎯 Exemplo Completo

```excel
bibliografia_id | pergunta | resposta | assunto
1 | O que é o princípio da legalidade? | É o princípio que determina que o administrador público só pode fazer o que a lei permite, enquanto o particular pode fazer tudo que a lei não proíbe. | Direito Administrativo - Princípios
1 | O que é o princípio da impessoalidade? | É o princípio que determina que a administração deve tratar todos de forma igual, sem favorecimentos ou discriminações. | Direito Administrativo - Princípios
1 | O que é o princípio da moralidade? | É o princípio que impõe ao administrador o dever de atuar com ética, honestidade e boa-fé no exercício de suas funções. | Direito Administrativo - Princípios
2 | Quem foi Alfred Thayer Mahan? | Foi um almirante e historiador naval americano que desenvolveu a teoria do poder marítimo, influenciando políticas navais de diversos países. | Geopolítica - Pensadores Clássicos
2 | O que é o Heartland? | É o conceito desenvolvido por Halford Mackinder que se refere à região central da Eurásia, considerada estratégica para o domínio mundial. | Geopolítica - Conceitos Estratégicos
```

## 🚨 Erros Comuns

### ❌ Bibliografia ID Inválido
```
Erro: Bibliografia ID 999 não encontrada
Solução: Verifique se o ID existe no admin Django
```

### ❌ Campos Vazios
```
Erro: Campo 'pergunta' está vazio na linha 5
Solução: Preencha todos os campos obrigatórios
```

### ❌ Tipo de Dado Incorreto
```
Erro: bibliografia_id deve ser um número inteiro
Solução: Use números (1, 2, 3) ao invés de texto
```

## 🔄 Como Carregar os Flash Cards

1. Salve o arquivo como `flashcards.xlsx`
2. Coloque na pasta: `backend/django_cemos2028/apps/perguntas/fixtures/`
3. Execute as migrações:
   ```bash
   python manage.py migrate
   ```
4. Os flash cards serão automaticamente carregados via signals

## 📝 Exemplo de Arquivo Real

Para criar seu arquivo, siga este template:

1. Abra o Excel/LibreOffice Calc
2. Na primeira linha, adicione os cabeçalhos: `bibliografia_id | pergunta | resposta | assunto`
3. Nas linhas seguintes, adicione seus flash cards
4. Salve como `flashcards.xlsx` (formato Excel 2007+)
5. Coloque na pasta fixtures
6. Execute as migrações

## ✅ Validação

O sistema validará automaticamente:
- ✅ Todos os campos obrigatórios estão presentes
- ✅ O ID da bibliografia existe
- ✅ Os campos não estão vazios
- ✅ O tipo de dado está correto

Se houver erros, eles serão exibidos no log do Django com instruções específicas.

