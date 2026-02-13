# PROMPT CORRELACIONAR COLUNAS - CAP 13

bibliografia_id: 5
assunto: 34

Criar questões de associação lógica.

Coluna A: lista de conceitos, autores, eventos ou períodos.
Coluna B: lista de definições, teorias, características ou fatos correspondentes.
2. As associações devem ser historicamente e conceitualmente corretas.
3. json_exemplo: {{"0": "0", "1": "1", "2": "2"}}

 
Requisitos:
- Pelo menos 3 correlações coluna A para coluna B, podendo ser 3 para A e 4 ou 5 para B, sempre deve ter mais para A do que para B.
- resposta_correta deve alternar ordem
- coluna_a e coluna_b em formato JSON
- justificativa_resposta_certa deve citar explicitamente o texto-base
- paginas: usar marcador "## Página X" → "Pág X"

Formato:

| bibliografia_id | paginas | assunto | pergunta | coluna_a | coluna_b | resposta_correta | justificativa_resposta_certa | caiu_em_prova | ano_prova |
| 5 | Pág X | 34 | Relacione os conceitos geopolíticos com seus autores correspondentes. | ["Heartland", "Eurasianismo", "Destino Manifesto Russo"] | ["Mackinder", "Dugin", "March"] | {{"0": "0", "1": "1", "2": "2"}} | Cada conceito está corretamente associado ao pensador que o desenvolveu ou aplicou à Rússia. |  |  |