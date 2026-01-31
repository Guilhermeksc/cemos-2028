Sua tarefa é ler o arquivo cap4.md para criar um banco de questões v ou f no arquivo vf4, do seguinte modo:

1. Quantidade
    Criar 3 assertivas por página.
    Cada assertiva deve possuir: uma versão verdadeira, fiel ao conteúdo; e uma versão falsa, coerente, obtida por inversão lógica ou alteração de conceito-chave.

2. Estrutura da saída deve ser uma tabela Markdown, conforme abaixo:

| bibliografia_id | paginas | assunto | pergunta | afirmacao_verdadeira | afirmacao_falsa | justificativa_resposta_certa | caiu_em_prova | ano_prova |

3. Regras de preenchimento das colunas
bibliografia_id: 68
“paginas” será preenchido com o marcador ## referente a página ao qual se refere, ex: se ## Página 11 então 'Pág 11'
“assunto”: 239
"pergunta" deve conter um título com o tema da pergunta elaborada.
“afirmacao_falsa” deve conter a frase que será julgada como falsa.    
“justificativa_resposta_certa” deve explicar em uma frase por que a afirmação é verdadeira ou falsa. 👉 Toda justificativa deve conter referência explícita ao artigo, inciso, parágrafo ou definição constante do arquivo consultado. Exemplos de formatos aceitos: 
“Conforme item 3.1.1, a intervenção (...).”
“Segundo o item 3.1.2, a Mobilização corresponde (...).”
“caiu_em_prova” em branco.
“ano_prova” em branco.

Exemplo de saída:

| bibliografia_id | paginas | assunto | pergunta | afirmacao_verdadeira | afirmacao_falsa | justificativa_resposta_certa | caiu_em_prova | ano_prova |
| 68 | Pág. 11 | 210| Mobilização Nacional |A Mobilização Nacional é  (...). | A Mobilização Nacional é (...), sem relação com agressão externa. | De acordo com **item 3.1.1**, a Mobilização Nacional (...). | |  |
