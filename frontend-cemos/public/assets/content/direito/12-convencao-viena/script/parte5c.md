Sua tarefa é ler integralmente o conteúdo do arquivo cap.md e criar um banco de questões de correlação entre colunas, no formato de associação lógica, conforme as instruções abaixo.

1. Cada questão deve conter:

Coluna A: lista de conceitos, autores, eventos ou períodos.
Coluna B: lista de definições, teorias, características ou fatos correspondentes.
2. As associações devem ser historicamente e conceitualmente corretas.
3. A ordem da correspondência em resposta_correta deve ser alternada, evitando sempre:
   ```json
   {"0": "0", "1": "1", "2": "2"}
   ```
4. Criar perguntas objetivas.

Preenchimento dos campos:

bibliografia_titulo: "Decreto nº 7.030/2009 - Convenção de Viena"
paginas será preenchido com o markador ## referente a página ex: se ## Página 11 então 'Pág 11 ...'
“assunto” será preenchido com "Parte V - Nulidade, Extinção e Suspensão da Execução de Tratados".
pergunta: comando de associação (ex.: Relacione os autores às suas teorias).
coluna_a: lista JSON.
coluna_b: lista JSON.
resposta_correta: dicionário JSON com os pares corretos, em ordem alternada.
justificativa_resposta_certa: explicação objetiva.
caiu_em_prova deve ser branco.
ano_prova deve ser branco.

O resultado final deve ser em formato Markdown, no padrão de tabela:

| bibliografia_titulo | paginas | assunto | pergunta | coluna_a | coluna_b | resposta_correta | justificativa_resposta_certa | caiu_em_prova | ano_prova |
|---|---|---|---|---|---|---|---|---|

por exemplo:

| bibliografia_titulo | paginas | assunto | pergunta | coluna_a | coluna_b | resposta_correta | justificativa_resposta_certa | caiu_em_prova | ano_prova |
| EMA-135 | Pág. 11 | Cap. 5 | Relacione os conceitos geopolíticos com seus autores correspondentes. | ["Heartland", "Eurasianismo", "Destino Manifesto Russo"] | ["Mackinder", "Dugin", "March"] | {"0": "0", "1": "1", "2": "2"} | Cada conceito está corretamente associado ao pensador que o desenvolveu ou aplicou à Rússia. |  |  |
