Sua tarefa é ler a lista de perguntas e respostas em (cap5fc.py) e verificar os arquivos cap5.md  para revisar os campos páginas e justificativa

O resultado final deve ser salvo diretamente no arquivo vf5.md.md, no padrão de tabela abaixo.

Instruções específicas:
"paginas” será preenchido com o markador ## referente a página ao qual se refere, ex: se ## Página 11 então 'Pág 11 ...'
justificativa:
frase objetiva contendo obrigatoriamente a referência explícita ao texto, por exemplo:
“Conforme o item 1.2, da página X …” ou
“Nos termos do art. 2º, inciso I, …”

Exemplo de saída esperada:

| bibliografia_id | pergunta | resposta | prova | páginas | assunto | justificativa | caveira |
| 68 | Pergunta contextualizada | Resposta objetiva |  | Pág. 11 | 240 | conforme o item X.X do ... |  |

Sua tarefa é ler o arquivo cap5-multipla.md e verificar os arquivos cap5.md para revisar os campos páginas e justificativa

O resultado final deve ser salvo diretamente no arquivo cap5-multipla.md, no padrão de tabela abaixo.

Instruções específicas:
"paginas” será preenchido com o markador ## referente a página ao qual se refere, ex: se ## Página 11 então 'Pág 11 ...'
justificativa:
frase objetiva contendo obrigatoriamente a referência explícita ao texto, por exemplo:
“Conforme o item 1.2, {manter o texto da justificativa do arquivo cap5-multipla.md}” ou
“Nos termos do art. 2º, inciso I, {manter o texto da justificativa do arquivo cap5-multipla.md}”

Exemplo de saída esperada:

| bibliografia_id | paginas | assunto | pergunta | alternativa_a | alternativa_b | alternativa_c | alternativa_d | resposta_correta | justificativa_resposta_certa | caiu_em_prova | ano_prova
| 68| Pág 15 | 240 | Qual teórico é considerado o fundador (...)? | Immanuel | Hans | Alexander | Nye | b | conforme o **item 4.3.1**, Morgenthau é (...). |