# Ferramenta de Marca-Texto para Perguntas

Este guia descreve como ligar as perguntas do backend aos trechos dos arquivos Markdown servidos no frontend em `/frontend-cemos/public/assets/content`. O objetivo é permitir que um usuário com perfil de administração selecione trechos do material, salve a seleção associada a uma pergunta (múltipla, V/F ou correlação) e exiba esses destaques para todos os usuários.

---

## 1. Visão Geral do Fluxo

1. O administrador abre o componente `Perguntas` (`src/app/components/perguntas/perguntas.ts`) e aciona o botão **Marcar texto** da questão.
2. O frontend carrega o arquivo Markdown indicado (`LivroIndividualService`) e o renderiza em um painel lateral, mantendo metadados de linha/coluna para cada nó de texto.
3. O admin seleciona um trecho; o frontend captura o intervalo (`startLine`, `endLine`, offsets, id de heading) e envia para o backend via `PerguntasService`.
4. O backend persiste o vínculo (arquivo + intervalos) diretamente na tabela da pergunta (`PerguntasBaseModel`) em campos específicos.
5. Toda vez que a pergunta for entregue a qualquer usuário, o payload incluirá a referência do Markdown e as faixas selecionadas para que o frontend aplique destaque.

---

## 2. Estrutura de Armazenamento Proposta

Adicionar em `django_cemos2028/apps/perguntas/models.py` (classe `PerguntasBaseModel`) os campos abaixo:

```python
markdown_file = models.CharField(
    max_length=255,
    blank=True,
    null=True,
    help_text="Caminho relativo em public/assets/content (ex: 'estrategia/2-estrategias-maritimas/cap4.md')"
)
markdown_highlights = models.JSONField(
    blank=True,
    null=True,
    help_text="Lista de ranges marcados no Markdown"
)
```

Formato esperado de cada item em `markdown_highlights`:

```json
{
  "id": "principal",
  "selectionText": "Trecho literal selecionado",
  "start": { "line": 210, "offset": 14 },
  "end": { "line": 224, "offset": 0 },
  "headingId": "a-uniao-europeia",
  "note": "Comentário opcional do admin",
  "color": "#ffd54f"
}
```

> Use `JSONField` para permitir múltiplas marcações por pergunta e facilitar evoluções futuras (por exemplo, tags diferentes ou versões do texto).

---

## 3. Backend (Django)

### 3.1 Modelos e Migrações

- Atualizar `PerguntasBaseModel` conforme acima.
- Criar nova migração e aplicar a todos os ambientes.
- Opcional: adicionar um método helper `get_markdown_file_display()` para facilitar logs ou admin.

### 3.2 Serializers

Em `django_cemos2028/apps/perguntas/serializers.py`:

- Incluir `markdown_file` e `markdown_highlights` (como `ListField` de objetos) em todos os serializers principais (`PerguntaMultiplaSerializer`, `PerguntaVFSerializer`, `PerguntaCorrelacaoSerializer` e respectivas variantes de criação/edição).
- Validar se `markdown_file` corresponde ao padrão permitido; use um validator que confira se o caminho está dentro de `public/assets/content`.

### 3.3 ViewSets e Permissões

- Os campos devem ser editáveis apenas por usuários staff. Nas viewsets (`PerguntaMultiplaViewSet`, etc.) faça override de `perform_update` ou utilize `get_permissions` para restringir.
- Disponibilizar rota dedicada `POST /perguntas/<tipo>/<id>/marcacao/` para salvar apenas a marcação sem editar o restante dos dados. Exemplo de serializer:

```python
class PerguntaHighlightSerializer(serializers.Serializer):
    markdown_file = serializers.CharField()
    markdown_highlights = serializers.ListField(child=HighlightItemSerializer())
```

### 3.4 Endpoint auxiliar para arquivos Markdown

- Criar view em `django_cemos2028/apps/perguntas/views.py` que leia um manifesto de arquivos Markdown (gerado no build do frontend) e o exponha em `/perguntas/api/markdown-files/`.
- Estrutura do manifesto (`backend/utils/markdown_manifest.json`):

```json
[
  { "label": "Estratégia › Estratégias Marítimas › Cap 4", "path": "estrategia/2-estrategias-maritimas/cap4.md" }
]
```

> Gere o manifesto com script que faz `glob` na pasta `frontend-cemos/public/assets/content` e copia o resultado para dentro do backend no momento do build/deploy.

### 3.5 Admin

- No `admin.py`, adicione `readonly_fields` para visualizar rapidamente a marcação e um botão customizado “Limpar marcações”.

---

## 4. Frontend (Angular)

### 4.1 Atualização de Tipos

Arquivo `src/app/interfaces/perguntas.interface.ts`:

```ts
export interface PerguntaHighlightRange {
  id: string;
  selectionText: string;
  start: { line: number; offset: number };
  end: { line: number; offset: number };
  headingId?: string;
  note?: string;
  color?: string;
}

export interface PerguntaBase {
  // ...
  markdown_file?: string | null;
  markdown_highlights?: PerguntaHighlightRange[];
}
```

Propagar para `PerguntaMultipla`, `PerguntaVF`, `PerguntaCorrelacao`.

### 4.2 Serviços

1. **PerguntasService (`src/app/services/perguntas.service.ts`):**
   - Aceitar/Enviar os novos campos nos métodos `getPerguntas*` e `create/update`.
   - Adicionar métodos `salvarMarcacaoPergunta(tipo, id, payload)` e `listarArquivosMarkdown()` apontando para os novos endpoints.

2. **LivroIndividualService (`src/app/services/livro-individual.service.ts`):**
   - Expor método `markdownToHtmlWithAnchors(content, basePath)` que já devolve o HTML com `data-md-line` em cada parágrafo/span (adicione durante o split por linhas).
   - Criar helper `applyHighlights(htmlContainer, ranges)` para inserir `<mark>` ou `span` com classes ao redor dos textos usando `Range` nativo + data attributes.

3. **RevisaoService (`src/app/services/revisao.service.ts`):**
   - Quando “sessões de estudo” exigirem revisão da pergunta, reutilize `PerguntasService.salvarMarcacaoPergunta` para persistir alterações feitas a partir das telas de revisão.
   - Disponibilize um método `getTextoSuporte(perguntaId, tipo)` que faça proxy para a mesma rotina usada em `Perguntas`, garantindo consistência entre módulos.

### 4.3 Componente `Perguntas`

Editar `src/app/components/perguntas/perguntas.ts`:

- Adicionar estado `markdownViewer` com `{ isOpen, isLoading, filePath, html, highlights }`.
- Inserir botão “Ver / marcar texto de apoio” nas ações de cada pergunta. Este botão abre um painel lateral (mat-drawer).
- Quando o painel abre:
  1. Usa `Pergunta.markdown_file` para carregar o conteúdo usando `LivroIndividualService.loadMarkdownFile`.
  2. Processa com `markdownToHtmlWithAnchors`.
  3. Chama `applyHighlights` para usuários comuns.
  4. Se `isAdmin`, habilita a ferramenta de seleção (capturar `window.getSelection()` + converter para `line/offset` usando `data-md-line` nos elementos).

- Após o admin confirmar a seleção, chama `PerguntasService.salvarMarcacaoPergunta` para persistir e sincroniza o estado local.

### 4.4 UI de Seleção

Implementar em `perguntas.html` um overlay com instruções e botões:

1. Botão “Iniciar marcação”: liga um `SelectionObserver`.
2. Botão “Salvar marcação”: envia o objeto `PerguntaHighlightRange`.
3. Botão “Limpar marcações”: envia payload vazio (para remover).

### 4.5 Reutilização em outras telas

- Componentes de revisão que já utilizam `RevisaoService` devem reutilizar o painel de Markdown. Extraia o painel para um componente `MarkdownViewerComponent` compartilhado.

---

## 5. Sincronização dos Arquivos Markdown

1. **Manifesto automático:** criar script Node (`frontend-cemos/scripts/generateMarkdownManifest.mjs`) que lista todos os `*.md` dentro de `public/assets/content`, gera uma estrutura amigável (categoria, subpasta, arquivo) e salva em `frontend-cemos/public/assets/markdown-manifest.json`.
2. **Deploy:** copiar o manifesto para o backend (pasta `backend/static/markdown/manifest.json`) durante o pipeline para que o endpoint Django possa servir a lista sem acessar o filesystem do frontend em produção.
3. **Validação:** adicionar checagem no backend (comando `python manage.py verify_markdown_links`) que percorre todas as perguntas com `markdown_file` preenchido e confirma que o caminho existe no manifesto.

---

## 6. Processo de Marcação (Frontend)

1. Renderizar o Markdown envolvendo cada linha em `<span data-md-line="N">...</span>`.
2. No evento `mouseup`, verificar `window.getSelection()`.
3. Converter o `Range` selecionado para `{ startLine, startOffset, endLine, endOffset }` lendo os atributos `data-md-line`.
4. Salvar também o texto literal (`selection.toString()`), `headingId` (buscando o ancestral `<h*>`) e o arquivo ativo.
5. Montar o payload e chamar `PerguntasService.salvarMarcacaoPergunta`.
6. Ao receber a resposta, atualizar `pergunta.markdown_highlights` e reexecutar `applyHighlights`.

---

## 7. Boas Práticas e Segurança

- Limitar a marcação a usuários `is_staff` (verificação tanto no Angular quanto nas APIs do Django).
- Sanitizar o caminho recebido (`Path(input).resolve()` dentro de um diretório raiz seguro) para evitar LFI.
- Rate limit na rota de marcação para impedir spam.
- Guardar `updated_by` e `updated_at` opcionais nos campos JSON para auditoria.

---

## 8. Testes e Validação

1. **Backend:** criar testes no Django para `PerguntaHighlightSerializer`, garantindo validação de caminhos e estrutura do JSON.
2. **Frontend:** adicionar testes de unidade para `LivroIndividualService.applyHighlights` e para o reducer usado no componente `Perguntas`.
3. **E2E:** roteiros Cypress cobrindo:
   - Admin marcando trecho em `cap4.md`.
   - Usuário comum vendo marcação aplicada.
   - Atualização/remoção de marcações.

---

## 9. Próximos Passos

1. Gerar e publicar o manifesto de arquivos Markdown.
2. Aplicar a migração do backend e expor os novos endpoints.
3. Ajustar `PerguntasService`, `LivroIndividualService` e `RevisaoService`.
4. Construir o painel de marcação no componente `Perguntas`.
5. Validar com um arquivo real (`estrategia/2-estrategias-maritimas/cap4.md`) antes de liberar para o restante da equipe.

Com essas etapas, o vínculo entre perguntas e trechos de Markdown ficará persistente e consistente em todos os módulos da aplicação.
