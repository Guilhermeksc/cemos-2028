# Guia de Restauração do Banco de Dados com Marcações

Este documento explica como restaurar o banco de dados mantendo as marcações de texto funcionando.

## ⚠️ Importante: O que você precisa exportar

Para que as marcações funcionem após restaurar o banco, você precisa exportar **DOIS conjuntos de dados**:

### 1. **Perguntas** (obrigatório)
Exporte as perguntas com seus campos `markdown_file` e `markdown_highlights`:
- **Pergunta Múltipla Escolha** (`PerguntaMultiplaModel`)
- **Pergunta Verdadeiro/Falso** (`PerguntaVFModel`)
- **Pergunta Correlação** (`PerguntaCorrelacaoModel`)

**Campos importantes para exportar:**
- `id` (CRÍTICO - deve manter os mesmos IDs)
- `markdown_file`
- `markdown_highlights` (JSON com as marcações)
- Todos os outros campos da pergunta

### 2. **Marcações Normalizadas** (opcional, mas recomendado)
Exporte a tabela `MarkdownHighlight` para backup adicional.

## Processo de Restauração

### Passo 1: Exportar Dados

#### Via Django Admin:

1. **Exportar Perguntas:**
   - Acesse `/admin/perguntas/perguntamultiplamodel/`
   - Clique em **Exportar**
   - Selecione formato (Excel recomendado)
   - Repita para `PerguntaVFModel` e `PerguntaCorrelacaoModel`

2. **Exportar Marcações (backup):**
   - Acesse `/admin/perguntas/markdownhighlight/`
   - Clique em **Exportar**
   - Salve como backup adicional

### Passo 2: Deletar e Recriar Banco

```bash
# Deletar banco (cuidado!)
# Exemplo para PostgreSQL:
dropdb cemos2028

# Recriar banco
createdb cemos2028

# Rodar migrations
python manage.py migrate
```

### Passo 3: Importar Dados

#### Via Django Admin:

1. **Importar Perguntas:**
   - Acesse `/admin/perguntas/perguntamultiplamodel/`
   - Clique em **Importar**
   - Selecione o arquivo exportado
   - Configure:
     - **Formato**: Selecione o formato do arquivo
     - **Atualizar existentes**: Marque esta opção
   - Clique em **Enviar**
   - Repita para `PerguntaVFModel` e `PerguntaCorrelacaoModel`

2. **Importar Marcações (se exportou):**
   - Acesse `/admin/perguntas/markdownhighlight/`
   - Clique em **Importar**
   - Selecione o arquivo de marcações
   - Clique em **Enviar**

### Passo 4: Sincronizar Marcações

Após importar, você tem duas opções:

#### Opção A: Se importou as perguntas com `markdown_highlights`
As marcações já devem estar funcionando! O sistema sincroniza automaticamente via signals.

#### Opção B: Se importou apenas `MarkdownHighlight`
Execute o comando para sincronizar de volta para as perguntas:

```bash
# Ver o que será feito (dry-run)
python manage.py sync_highlights_to_questions --dry-run

# Sincronizar de verdade
python manage.py sync_highlights_to_questions
```

## ⚠️ Problemas Comuns

### Problema: IDs das perguntas mudaram

**Solução:** Se os IDs mudaram após importar, você precisa atualizar as referências nas marcações:

```python
# Exemplo: atualizar pergunta_id nas marcações
from django_cemos2028.apps.perguntas.models import MarkdownHighlight

# Se a pergunta 348 virou 350
MarkdownHighlight.objects.filter(pergunta_id=348).update(pergunta_id=350)
```

### Problema: Marcações não aparecem no frontend

**Verificações:**
1. As perguntas têm o campo `markdown_highlights` populado?
   ```python
   from django_cemos2028.apps.perguntas.models import PerguntaCorrelacaoModel
   p = PerguntaCorrelacaoModel.objects.get(id=348)
   print(p.markdown_highlights)  # Deve retornar uma lista
   ```

2. O campo `markdown_file` está correto?
   ```python
   print(p.markdown_file)  # Deve corresponder ao arquivo real
   ```

3. Execute a sincronização:
   ```bash
   python manage.py sync_highlights_to_questions
   ```

### Problema: Arquivo markdown não encontrado

Verifique se o arquivo existe no caminho especificado:
```bash
# Exemplo
ls frontend-cemos/public/assets/content/estrategia/2-estrategias-maritimas/cap6.md
```

## Estrutura Mínima Necessária

Para que as marcações funcionem, você precisa de:

1. ✅ **Perguntas importadas** com os mesmos IDs (ou atualizar referências)
2. ✅ **Campo `markdown_file`** populado nas perguntas
3. ✅ **Campo `markdown_highlights`** populado nas perguntas (formato JSON)
4. ✅ **Arquivos markdown** existindo nos caminhos especificados

## Formato do JSON `markdown_highlights`

O campo `markdown_highlights` deve ser uma lista de objetos:

```json
[
  {
    "id": "hl-1768013571182",
    "text": "texto marcado...",
    "start_offset": 135,
    "end_offset": 374,
    "heading_id": "",
    "note": "testse",
    "color": "#bbdefb"
  },
  {
    "id": "hl-1768013575200",
    "text": "outro texto...",
    "start_offset": 431,
    "end_offset": 556,
    "heading_id": "",
    "note": "",
    "color": "#bbdefb"
  }
]
```

## Comandos Úteis

### Verificar marcações de uma pergunta
```python
from django_cemos2028.apps.perguntas.models import PerguntaCorrelacaoModel, MarkdownHighlight

# Ver marcações no JSONField
p = PerguntaCorrelacaoModel.objects.get(id=348)
print(p.markdown_highlights)

# Ver marcações normalizadas
highlights = MarkdownHighlight.objects.filter(pergunta_tipo='correlacao', pergunta_id=348)
for h in highlights:
    print(h.text, h.start_offset, h.end_offset)
```

### Sincronizar marcações existentes
```bash
# Sincronizar do JSONField para modelo normalizado
python manage.py sync_markdown_highlights

# Sincronizar do modelo normalizado para JSONField
python manage.py sync_highlights_to_questions
```

## Resumo Rápido

**Para restaurar o banco mantendo marcações:**

1. ✅ Exportar **Perguntas** (com `markdown_highlights`)
2. ✅ Exportar **Marcações** (backup adicional)
3. ✅ Deletar e recriar banco
4. ✅ Importar **Perguntas** primeiro
5. ✅ Importar **Marcações** (opcional)
6. ✅ Executar `sync_highlights_to_questions` se necessário
7. ✅ Verificar se funciona no frontend

**O mais importante:** As perguntas devem ser importadas **COM** o campo `markdown_highlights` populado. Se você importar apenas `MarkdownHighlight`, precisará executar o comando de sincronização.






