# Sistema de Backup e Importação/Exportação de Marcações

Este documento descreve como usar o sistema de backup e importação/exportação de marcações de texto vinculadas às perguntas.

## Visão Geral

O sistema permite:
- **Exportar** todas as marcações para arquivos Excel/CSV
- **Importar** marcações de arquivos Excel/CSV
- **Fazer backup** das marcações antes de mudanças importantes
- **Migrar** marcações entre ambientes (desenvolvimento, produção, etc.)

## Estrutura

### Modelo Normalizado: `MarkdownHighlight`

As marcações são armazenadas em um modelo separado (`MarkdownHighlight`) que normaliza os dados do campo `markdown_highlights` (JSONField) das perguntas. Isso facilita:

- Consultas mais eficientes
- Exportação/importação estruturada
- Backup e restauração
- Análise e relatórios

### Campos do Modelo

- `pergunta_tipo`: Tipo da pergunta (multipla, vf, correlacao)
- `pergunta_id`: ID da pergunta
- `markdown_file`: Caminho do arquivo markdown
- `highlight_id`: ID único da marcação (gerado pelo frontend)
- `text`: Texto marcado
- `start_offset`: Posição inicial do texto
- `end_offset`: Posição final do texto
- `heading_id`: ID do cabeçalho (opcional)
- `note`: Observação adicional (opcional)
- `color`: Cor da marcação (opcional)
- `created_at`: Data de criação
- `updated_at`: Data de atualização

## Como Usar

### 1. Sincronizar Marcações Existentes

Antes de usar o sistema de backup, você precisa sincronizar as marcações existentes (que estão no JSONField) para o modelo normalizado:

```bash
# Modo dry-run (apenas mostra o que seria feito)
python manage.py sync_markdown_highlights --dry-run

# Sincronizar de verdade
python manage.py sync_markdown_highlights

# Limpar marcações existentes e sincronizar novamente
python manage.py sync_markdown_highlights --clear-existing
```

### 2. Exportar Marcações

#### Via Django Admin

1. Acesse o Django Admin: `http://localhost:8000/admin/`
2. Navegue até **Perguntas > Marcações de Texto**
3. Clique em **Exportar** (botão no topo)
4. Selecione o formato (Excel, CSV, etc.)
5. Clique em **Exportar**

#### Via Código Python

```python
from django_cemos2028.apps.perguntas.resources import MarkdownHighlightResource
from django_cemos2028.apps.perguntas.models import MarkdownHighlight

# Exportar todas as marcações
resource = MarkdownHighlightResource()
dataset = resource.export(MarkdownHighlight.objects.all())

# Salvar em arquivo Excel
with open('backup_marcacoes.xlsx', 'wb') as f:
    dataset.xlsx = f
```

### 3. Importar Marcações

#### Via Django Admin

1. Acesse o Django Admin: `http://localhost:8000/admin/`
2. Navegue até **Perguntas > Marcações de Texto**
3. Clique em **Importar** (botão no topo)
4. Selecione o arquivo (Excel ou CSV)
5. Configure as opções de importação:
   - **Formato**: Selecione o formato do arquivo
   - **Atualizar existentes**: Marque se deseja atualizar registros existentes
6. Clique em **Enviar**

#### Via Código Python

```python
from django_cemos2028.apps.perguntas.resources import MarkdownHighlightResource
from django_cemos2028.apps.perguntas.models import MarkdownHighlight

# Importar de arquivo Excel
resource = MarkdownHighlightResource()
with open('backup_marcacoes.xlsx', 'rb') as f:
    dataset = resource.xlsx.read(f)
    result = resource.import_data(dataset, dry_run=False)
    
    if result.has_errors():
        print("Erros durante importação:")
        for error in result.errors:
            print(error)
    else:
        print(f"Importadas {result.totals['new']} novas marcações")
        print(f"Atualizadas {result.totals['update']} marcações existentes")
```

### 4. Exportar Marcações Junto com Perguntas

Os resources de perguntas (`PerguntaMultiplaResource`, `PerguntaVFResource`, `PerguntaCorrelacaoResource`) agora incluem os campos `markdown_file` e `markdown_highlights`.

Isso permite exportar perguntas com suas marcações em um único arquivo:

1. Acesse o Django Admin
2. Navegue até **Perguntas > Pergunta Múltipla Escolha** (ou VF ou Correlação)
3. Clique em **Exportar**
4. O arquivo exportado incluirá todas as marcações no campo `markdown_highlights` (formato JSON)

## Estrutura do Arquivo de Exportação

### Formato Excel/CSV para MarkdownHighlight

O arquivo exportado terá as seguintes colunas:

| Coluna | Descrição | Exemplo |
|--------|-----------|---------|
| id | ID único da marcação | 1 |
| pergunta_tipo | Tipo da pergunta | multipla |
| pergunta_id | ID da pergunta | 42 |
| markdown_file | Caminho do arquivo | estrategia/2-estrategias-maritimas/cap4.md |
| highlight_id | ID da marcação | abc123 |
| text | Texto marcado | "O planejamento estratégico..." |
| start_offset | Posição inicial | 150 |
| end_offset | Posição final | 200 |
| heading_id | ID do cabeçalho | heading-3 |
| note | Observação | Importante para prova |
| color | Cor | #fff59d |
| created_at | Data de criação | 2024-01-15 10:30:00 |
| updated_at | Data de atualização | 2024-01-15 10:30:00 |

## Boas Práticas

### 1. Fazer Backup Regularmente

Recomenda-se fazer backup das marcações antes de:
- Atualizações importantes do sistema
- Migrações de banco de dados
- Mudanças em produção

### 2. Validar Arquivos Antes de Importar

Sempre valide o arquivo antes de importar em produção:
- Use `--dry-run` quando disponível
- Verifique a estrutura do arquivo
- Confirme que os IDs das perguntas existem

### 3. Manter Sincronização

Após importar marcações, certifique-se de que elas estão sincronizadas com as perguntas:

```bash
python manage.py sync_markdown_highlights
```

### 4. Backup Incremental

Para grandes volumes de dados, considere fazer backups incrementais:
- Exportar apenas marcações criadas após uma data específica
- Usar filtros no Django Admin antes de exportar

## Troubleshooting

### Erro: "Pergunta não encontrada"

Se ao importar receber erro de pergunta não encontrada:
1. Verifique se o `pergunta_id` existe no banco
2. Confirme que o `pergunta_tipo` está correto
3. Certifique-se de que a pergunta não foi deletada

### Erro: "Marcação duplicada"

Se receber erro de marcação duplicada:
1. Use `--clear-existing` ao sincronizar
2. Ou remova manualmente as marcações duplicadas no admin

### Marcações não aparecem no frontend

Se as marcações não aparecem no frontend após importar:
1. Verifique se o campo `markdown_file` está correto
2. Confirme que o arquivo markdown existe no caminho especificado
3. Execute a sincronização: `python manage.py sync_markdown_highlights`

## Exemplos de Uso

### Backup Completo

```bash
# 1. Sincronizar marcações existentes
python manage.py sync_markdown_highlights

# 2. Exportar via admin ou código Python
# (ver seções acima)
```

### Restaurar de Backup

```bash
# 1. Importar arquivo via admin ou código Python
# (ver seções acima)

# 2. Verificar sincronização
python manage.py sync_markdown_highlights --dry-run
```

### Migrar Entre Ambientes

```bash
# Ambiente de origem (produção)
# 1. Exportar marcações
# 2. Salvar arquivo em local seguro

# Ambiente de destino (desenvolvimento)
# 1. Importar arquivo
# 2. Sincronizar marcações
python manage.py sync_markdown_highlights
```

## Recursos Adicionais

- **Django Import-Export**: https://django-import-export.readthedocs.io/
- **Documentação do Django Admin**: https://docs.djangoproject.com/en/stable/ref/contrib/admin/

