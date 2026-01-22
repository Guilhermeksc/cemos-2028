# Orientações para o recurso de omissão de questões

## Backend
1. **Migrações**
   - Aplicar as migrations recentes (`perguntas/migrations/0003_questao_omitida.py` e `0004_questaoomitida_bibliografia_assunto.py`) com `python manage.py migrate perguntas`.
   - O modelo `QuestaoOmitida` relaciona `usuario`, `pergunta_id`, `pergunta_tipo`, além de manter referências opcionais para `bibliografia` e `assunto`, garantindo que os dados agrupados sejam preservados sem remover perguntas do banco.
2. **API disponível**
   - `GET /perguntas/api/questoes-omitidas/`: lista as questões omitidas do usuário autenticado.
   - `POST /perguntas/api/questoes-omitidas/`: adiciona/atualiza uma omissão. Payload mínimo: `{ "pergunta_id": 123, "pergunta_tipo": "multipla" }`.
   - `POST /perguntas/api/questoes-omitidas/restaurar/`: remove a omissão e volta a exibir a questão. Payload: `{ "pergunta_id": 123, "pergunta_tipo": "multipla" }`.
   - Todas as rotas utilizam o token padrão e só afetam o usuário logado.

## Frontend
1. **Serviço (`PerguntasService`)**
   - Consumir `loadQuestoesOmitidas()` ao iniciar o componente para carregar o estado.
   - Usar `omitirQuestao()` e `restaurarQuestao()` para acionar os endpoints; o serviço mantém um `BehaviorSubject` para refletir o estado em toda a aplicação.
2. **Componente de perguntas**
   - Novo painel “Questões omitidas” mostra o total e abre uma janela dedicada com a lista agrupada por bibliografia e capítulo.
   - Cada card de questão possui um botão “Omitir” que envia o ID/tipo/bibliografia/capítulo ao backend, remove o item da prova atual e impede que ele apareça em novas gerações para aquele usuário.
   - Ao restaurar uma questão (pela janela ou pela API), basta regenerar a prova para que ela volte a concorrer no sorteio.

## Testes rápidos
1. Autentique-se com um usuário válido e abra `/perguntas`.
2. Clique em “Omitir” em uma questão e confirme que ela desaparece imediatamente do simulado e passa a incrementar o contador do painel superior.
3. Use “Gerenciar em nova janela”, abra o popup, reexiba uma questão por lá e gere uma nova prova para validar que ela volta ao pool.
4. Repita com diferentes tipos (V/F, múltipla, correlação) para garantir que os filtros respeitam o tipo correto.
