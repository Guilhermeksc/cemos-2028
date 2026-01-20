Sua tarefa é ler o arquivo cap.md e o arquivo reconstituicao para criar uma questão em formato markdown:

Cada assertiva deve possuir: uma versão verdadeira, fiel ao conteúdo; e uma versão falsa, coerente, obtida por inversão lógica ou alteração de conceito-chave.

3. Regras de preenchimento das colunas
    bibliografia_id" será 'Portaria Normativa nº 84/GM-MD 1º Vol'.
    “paginas” será preenchido com o marcador ## referente a página ao qual se refere, ex: se ## Página 11 então 'Pág 11'
    “assunto” será preenchido com 'Cap. III - Operações Conjuntas das Forças Armadas'.
    “afirmacao_verdadeira” deve conter a frase que será julgada como verdadeira.
    “afirmacao_falsa” deve conter a frase que será julgada como falsa.
    
    “justificativa_resposta_certa” deve explicar em uma frase por que a afirmação é verdadeira ou falsa. 👉 Toda justificativa deve conter referência explícita ao artigo, inciso, parágrafo ou definição constante do arquivo consultado. Exemplos de formatos aceitos: 
    
    “Conforme inciso III, da página xx, a intervenção nos fatores (...).”
    “Segundo o item 3.1.4, da página xxx a Mobilização (..).”
    “caiu_em_prova” TRUE.
    “ano_prova” o valor que está entre "()".

Exemplo de saída:

| bibliografia_titulo | paginas | assunto | afirmacao_verdadeira | afirmacao_falsa | justificativa_resposta_certa | caiu_em_prova | ano_prova |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| EMA-135 | Pág. 11 | Cap. 5 - Mobilização| A Mobilização Nacional é  (...). | A Mobilização Nacional é  (...), sem relação com agressão externa. | De acordo com **art. 2º, I**, a Mobilização Nacional (...). | TRUE | 2023  |