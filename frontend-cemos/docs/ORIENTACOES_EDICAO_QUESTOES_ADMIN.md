# Orientações para habilitar edição de questões por administradores

## Objetivo
Permitir que usuários com perfil **admin** validem e editem permanentemente os dados das questões exibidas no simulador, mantendo o recurso de omitir apenas para o usuário atual.

---
## Backend (`backend/django_cemos2028/apps/perguntas`)
1. **Modelos e serializadores**
   - Reutilizar os modelos existentes (`PerguntaMultiplaModel`, `PerguntaVFModel`, `PerguntaCorrelacaoModel`).
   - Garantir que os serializers de leitura/escrita (`Pergunta*Serializer` e `Pergunta*CreateUpdateSerializer`) estejam expostos via ViewSets.
   - O campo `caiu_em_prova` já existe em `PerguntasBaseModel` (linha que contém `caiu_em_prova = models.BooleanField(default=False, verbose_name="Caiu em Prova")`). Nenhuma alteração estrutural adicional é necessária.
2. **Endpoints de atualização**
   - Confirmar que os endpoints `PUT/PATCH /perguntas-multipla/<id>/`, `/perguntas-vf/<id>/` e `/perguntas-correlacao/<id>/` estejam acessíveis e protegidos por permissão. Caso deseje restringir a admins, usar `permission_classes` customizada ou `IsAdminUser` nas rotas de update/partial_update.

---
## Frontend (`frontend-cemos`)
1. **Interfaces**
   - Em `src/app/interfaces/perguntas.interface.ts`, garantir que as interfaces de perguntas contenham os campos editáveis (inclusive `caiu_em_prova`). Todos já existem, apenas reutilize-os no formulário de edição.
2. **Serviço de perguntas** (`src/app/services/perguntas.service.ts`)
   - Adicionar métodos `updatePerguntaMultipla`, `updatePerguntaVF` e `updatePerguntaCorrelacao` que façam `PATCH` no backend. Recebem o ID, o payload parcial e retornam o Observable com a pergunta atualizada.
   - Opcionalmente, criar um método auxiliar `updateCampoCaiuEmProva(perguntaId, tipo, value)` que chame o endpoint correspondente.
3. **Componentes de pergunta**
   - `pergunta-multipla.ts`, `pergunta-v-f.ts` e `pergunta-correlacao.ts` devem aceitar novas `@Input()` flags informando se o usuário atual é admin e callbacks tipo `onEdit(questionId)` para abrir um modal ou drawer.
   - Adicionar o botão **Editar** ao lado do botão **Omitir** apenas quando `isAdmin` for true. O botão deve emitir um evento para o componente pai com o ID e o tipo.
   - Incluir um toggle visível somente para admin para alterar `caiu_em_prova`. Ao mudar o toggle, chamar o serviço para atualizar o backend e refletir imediatamente no estado local.
4. **Componente principal** (`src/app/components/perguntas/perguntas.ts` + template)
   - Determinar se o usuário logado é admin (ex.: via serviço de autenticação). Disponibilizar `isAdmin` como `@Input` ou via estado interno e repassar para todos os componentes filhos.
   - Gerenciar o modal/formulário de edição: ao clicar em **Editar**, abrir um formulário (pode ser um diálogo Angular Material) que carregue os campos relevantes da questão. Após salvar, atualizar o array `simuladoQuestions` e o cache em memória.
   - Incluir o toggle `caiu_em_prova` próximo aos metadados da questão, ligado apenas para admins. Alterações devem usar os novos métodos do serviço e atualizar o objeto `question.data` correspondente.
   - Manter o comportamento atual de **Omitir** (continua afetando apenas o usuário).

---
## Fluxo sugerido de edição
1. Admin clica em **Editar** → abre modal com campos da questão.
2. Admin altera textos/alternativas/colunas e confirma.
3. Frontend chama `PATCH` no endpoint da pergunta correspondente.
4. Em sucesso, atualizar o estado local (questão exibida, caches, e se necessário a lista do popup de questões omitidas).
5. Se admin alterar apenas o toggle `Caiu em Prova`, não precisa abrir modal: o toggle dispara uma chamada `PATCH` direta.

---
## Validação/UX
- Exibir feedback visual (spinner/estado "salvando") enquanto o PATCH é processado.
- Em caso de erro, mostrar mensagem amigável e reverter alterações locais.
- Manter logs no console apenas em ambiente de desenvolvimento.

---
## Testes recomendados
1. Logar como admin e confirmar a visualização dos botões **Editar** e do toggle `Caiu em Prova` em todos os tipos de pergunta.
2. Editar textos/alternativas/colunas e verificar se os dados persistem após recarregar a página.
3. Alternar o toggle `Caiu em Prova` e validar a persistência no backend.
4. Logar como usuário comum e confirmar que os botões/toggle adicionais não aparecem e que apenas **Omitir** continua disponível.
