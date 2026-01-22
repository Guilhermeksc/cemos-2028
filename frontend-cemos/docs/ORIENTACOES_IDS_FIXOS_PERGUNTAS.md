# Orientações para IDs Fixos nas Perguntas

## Objetivo
Padronizar os modelos de perguntas (incluindo flashcards) para aceitar um identificador fixo — preferencialmente um UUID — informado nas fixtures. Dessa forma os dados carregados pelos signals deixam de depender do `AutoField` incremental, o que evita alterações de ID entre ambientes e mantém a integridade dos relacionamentos consumidos no front e nas estatísticas.

## Estratégia Recomendada
1. Substituir os `AutoField` padrão por `models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)` em `FlashCardsModel` e na classe abstrata `PerguntasBaseModel`. As subclasses (`PerguntaMultiplaModel`, `PerguntaVFModel`, `PerguntaCorrelacaoModel`) herdam o campo automaticamente.
2. Ajustar os campos que referenciam perguntas por ID (`pergunta_id` em `RespostaUsuario`, `QuestaoErradaAnonima`, `QuestaoOmitida`) para `models.UUIDField` e migrar os dados existentes.
3. Fazer com que os signals (`post_migrate`) busquem/atualizem registros usando o UUID fornecido nas planilhas. Cada XLSX precisa de uma coluna `id` com o valor desejado.
4. Atualizar serializers, views e recursos de import/export para tratarem UUIDs como string/`UUIDField`.
5. Criar uma migração de dados que converta os IDs atuais incrementais para UUIDs fixos (mapa `antigo_id -> novo_uuid`) e replique esse mapa na planilha antes de reprocessar as fixtures.

## Alterações por Arquivo

### `backend/django_cemos2028/apps/perguntas/models.py`
1. Importar `uuid` no topo.
2. Em `FlashCardsModel` (`models.py:9`) definir `id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)` antes de outros campos. Migrar a base para conservar vínculos.
3. Em `PerguntasBaseModel` (`models.py:32`) declarar o mesmo campo `id` e remover o `ordering = ['id']` baseado em inteiros caso o banco precise de conversão específica (o Django ordena UUID normalmente).
4. Em `RespostaUsuario`, `QuestaoErradaAnonima` e `QuestaoOmitida` (`models.py:209`, `models.py:245`, `models.py:285`) trocar `pergunta_id = models.IntegerField(...)` por `models.UUIDField(...)` e revisar quaisquer índices/constraints.
5. Avaliar demais locais com `IntegerField` para IDs de bibliografia/assunto; apenas os IDs de perguntas viram UUID, bibliografia continua inteira.

### `backend/django_cemos2028/apps/perguntas/signals.py`
1. Criar um helper `def _as_uuid(value)` que valide strings/inteiros e retorne `UUID` (importar `uuid`).
2. Ao validar colunas obrigatórias em `_require_fields`, incluir `'id'` para cada DataFrame processado.
3. Nas seções que hoje usam `update_or_create` (ex.: flashcards em `signals.py:124`) mudar a chave de busca para `id=_as_uuid(row['id'])`. Os filtros anteriores (`bibliografia`, `pergunta`) passam para `defaults`.
4. Garanta que os logs mostrem o UUID processado para facilitar auditoria.
5. Quando a planilha não trouxer ID válido, registrar warning e ignorar linha para evitar criar registros sem identificador.

### `backend/django_cemos2028/apps/perguntas/serializers.py`
1. Para todos os serializers de perguntas e flashcards (linhas `12-102`), declare `id = serializers.UUIDField(read_only=True)` para refletir o novo tipo.
2. Atualize `RespostaUsuarioSerializer` e `RespostaUsuarioCreateSerializer` (`serializers.py:130` e `serializers.py:150`) para expor/validar `pergunta_id` como UUID (`serializers.UUIDField()`).
3. Nas validações customizadas não há diferenças, mas documente no `help_text` quando necessário.

### `backend/django_cemos2028/apps/perguntas/views.py`
1. `FlashCardsViewSet` (`views.py:46`) e os demais viewsets não precisam de lógica nova, porém configure `lookup_field = 'pk'` explicitamente e, se existirem filtros por intervalo numérico (`range`), remova-os porque UUID não é ordenável numericamente.
2. Caso algum filtro receba `pergunta_id` via query string (ex.: endpoints de estatísticas), valide o UUID usando `uuid.UUID` antes de construir Q-objects (`views.py:167` ou demais consultas reutilizam `pergunta_id`).

### `backend/django_cemos2028/apps/perguntas/resources.py`
1. Acrescente `from import_export.widgets import UUIDWidget` e associe aos campos `id`/`pergunta_id` para que import/export serialize UUIDs corretamente.
2. Em cada `Resource` (linhas `6-109`), mantenha `import_id_fields = ('id',)`; com o widget de UUID o pacote garante que o registro será atualizado e não recriado.
3. Nos resources de `MarkdownHighlight`, onde `pergunta_id` aparece, troque para `UUIDWidget` para manter coerência com os novos IDs das perguntas.

## Migrações e Scripts
1. Gerar uma migração estrutural com `python manage.py makemigrations perguntas` após ajustar os campos.
2. Criar uma migração de dados que percorra cada tabela afetada e atribua UUIDs consistentes. Uma abordagem simples:
   ```python
   mapping = {}
   for model in (FlashCardsModel, PerguntaMultiplaModel, PerguntaVFModel, PerguntaCorrelacaoModel):
       for obj in model.objects.all():
           old_id = obj.id
           new_id = uuid.uuid4()
           mapping[(model.__name__, old_id)] = new_id
           model.objects.filter(pk=old_id).update(id=new_id)
   ```
   Salve `mapping` temporariamente para atualizar as planilhas externo ao Django antes de rodar os signals novamente.
3. Atualizar fixtures/planilhas adicionando a coluna `id` preenchida com os UUIDs da migração para garantir que futuros loads preservem os mesmos valores.

## Validação
1. Rodar `python manage.py migrate` e depois `python manage.py loaddata` ou disparar o `post_migrate` para confirmar que os registros são recriados/atualizados mantendo o UUID.
2. Validar os endpoints principais (listagem de perguntas, flashcards, registros de respostas) verificando que o JSON retorna `id` em formato UUID.
3. Exportar/importar via django-import-export para garantir que o widget de UUID está funcionando.

Seguindo estes passos o backend passa a tratar cada pergunta/flashcard com identificadores controlados e consistentes entre ambientes, eliminando divergências provocadas pelo `AutoField` incremental.
