# Sistema de Perguntas - Documentação

## Estrutura dos Models

### 1. BibliografiaModel
```python
# Exemplo de criação
bibliografia = BibliografiaModel.objects.create(
    titulo="Manual de Licitações e Contratos",
    autor="João Silva",
    descricao="Manual completo sobre licitações públicas"
)
```

### 2. PerguntaMultiplaModel
```python
# Exemplo de criação
pergunta_multipla = PerguntaMultiplaModel.objects.create(
    bibliografia=bibliografia,
    caiu_em_prova=True,
    ano_prova=2023,
    pergunta="Qual o prazo mínimo para publicação de edital?",
    alternativa_a="15 dias",
    alternativa_b="30 dias",
    alternativa_c="45 dias",
    alternativa_d="60 dias",
    resposta_correta="b",
    justificativa_resposta_certa="Conforme Lei 8.666/93, art. 21, §2º, I."
)
```

### 3. PerguntaVFModel
```python
# Exemplo de criação
pergunta_vf = PerguntaVFModel.objects.create(
    bibliografia=bibliografia,
    caiu_em_prova=False,
    ano_prova=None,
    pergunta="Analise a afirmação abaixo:",
    afirmacao="A dispensa de licitação pode ocorrer para valores até R$ 17.600,00 para compras e serviços.",
    resposta_correta=True,
    justificativa_resposta_certa="Correto conforme art. 24, II da Lei 8.666/93 (valor atualizado)."
)
```

### 4. PerguntaCorrelacaoModel
```python
# Exemplo de criação
pergunta_correlacao = PerguntaCorrelacaoModel.objects.create(
    bibliografia=bibliografia,
    caiu_em_prova=True,
    ano_prova=2022,
    pergunta="Correlacione as modalidades de licitação com suas características:",
    coluna_a=[
        "Convite",
        "Tomada de Preços",
        "Concorrência"
    ],
    coluna_b=[
        "Obras e serviços até R$ 330.000,00",
        "Cadastro prévio obrigatório",
        "Qualquer valor, ampla publicidade"
    ],
    resposta_correta={
        "0": "0",  # Convite -> Obras e serviços até R$ 330.000,00
        "1": "1",  # Tomada de Preços -> Cadastro prévio obrigatório
        "2": "2"   # Concorrência -> Qualquer valor, ampla publicidade
    },
    justificativa_resposta_certa="Correlação baseada nos artigos 22 e 23 da Lei 8.666/93."
)
```

## Endpoints da API

### Bibliografias
- `GET /api/perguntas/api/bibliografias/` - Listar bibliografias
- `POST /api/perguntas/api/bibliografias/` - Criar bibliografia
- `GET /api/perguntas/api/bibliografias/{id}/` - Detalhar bibliografia
- `PUT /api/perguntas/api/bibliografias/{id}/` - Atualizar bibliografia
- `DELETE /api/perguntas/api/bibliografias/{id}/` - Deletar bibliografia
- `GET /api/perguntas/api/bibliografias/{id}/perguntas/` - Listar perguntas da bibliografia

### Perguntas Múltipla Escolha
- `GET /api/perguntas/api/perguntas-multipla/` - Listar perguntas
- `POST /api/perguntas/api/perguntas-multipla/` - Criar pergunta
- `GET /api/perguntas/api/perguntas-multipla/{id}/` - Detalhar pergunta
- `PUT /api/perguntas/api/perguntas-multipla/{id}/` - Atualizar pergunta
- `DELETE /api/perguntas/api/perguntas-multipla/{id}/` - Deletar pergunta

### Perguntas Verdadeiro/Falso
- `GET /api/perguntas/api/perguntas-vf/` - Listar perguntas
- `POST /api/perguntas/api/perguntas-vf/` - Criar pergunta
- `GET /api/perguntas/api/perguntas-vf/{id}/` - Detalhar pergunta
- `PUT /api/perguntas/api/perguntas-vf/{id}/` - Atualizar pergunta
- `DELETE /api/perguntas/api/perguntas-vf/{id}/` - Deletar pergunta

### Perguntas de Correlação
- `GET /api/perguntas/api/perguntas-correlacao/` - Listar perguntas
- `POST /api/perguntas/api/perguntas-correlacao/` - Criar pergunta
- `GET /api/perguntas/api/perguntas-correlacao/{id}/` - Detalhar pergunta
- `PUT /api/perguntas/api/perguntas-correlacao/{id}/` - Atualizar pergunta
- `DELETE /api/perguntas/api/perguntas-correlacao/{id}/` - Deletar pergunta

## Filtros Disponíveis

### Bibliografias
- `?search=termo` - Busca por título, autor ou descrição
- `?autor=João Silva` - Filtrar por autor
- `?ordering=-created_at` - Ordenar por data de criação (decrescente)

### Perguntas (todos os tipos)
- `?search=termo` - Busca no texto da pergunta e justificativa
- `?bibliografia=1` - Filtrar por bibliografia
- `?caiu_em_prova=true` - Filtrar por perguntas que caíram em prova
- `?ano_prova=2023` - Filtrar por ano da prova
- `?ordering=-created_at` - Ordenar por data de criação

### Específicos para Múltipla Escolha
- `?resposta_correta=a` - Filtrar por resposta correta

### Específicos para V/F
- `?resposta_correta=true` - Filtrar por verdadeiro/falso

## Comandos para Migrations

Após criar/modificar os models, execute:

```bash
python manage.py makemigrations perguntas
python manage.py migrate
```

## Exemplo de Uso no Admin

Os models estão registrados no Django Admin com as seguintes funcionalidades:
- Filtros laterais por bibliografia, ano, tipo de prova
- Busca por texto
- Organização em fieldsets para melhor UX
- Campos readonly para campos automáticos (tipo, datas)

## Validações Implementadas

### Serializers
- Resposta correta deve ser 'a', 'b', 'c' ou 'd' para múltipla escolha
- Colunas A e B devem ser listas não vazias para correlação
- Resposta correta deve ser um dicionário para correlação
- Anos de publicação e prova têm validação de range

### Models
- Validators para anos (1900-2100)
- Campos obrigatórios e opcionais bem definidos
- Related names para facilitar consultas reversas
- Métodos `__str__` informativos