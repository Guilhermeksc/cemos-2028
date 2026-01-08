Sua tarefa é ler a lista de perguntas e respostas e verificar os arquivos cap.md  para criar um banco de questões v ou f, do seguinte modo:

1. Quantidade e forma das assertivas
    Criar 3 assertivas por página.

    Cada assertiva deve possuir: uma versão verdadeira, fiel ao conteúdo do texto consultado; e uma versão falsa, coerente, obtida por inversão lógica ou alteração de conceito-chave.

    Preencher todas as colunas da tabela no formato indicado abaixo.

    Gerar um texto no formato markdown para permitir a copia

2. Estrutura da saída

A saída deve ser obrigatoriamente uma tabela Markdown, seguindo exatamente as colunas abaixo:

| bibliografia_titulo | paginas | assunto | afirmacao_verdadeira | afirmacao_falsa | justificativa_resposta_certa | caiu_em_prova | ano_prova |

3. Regras de preenchimento das colunas

    bibliografia_id" será preenchido com 'EMA-135 – Direito do Mar'.

    “paginas” será preenchido com o marcador ## referente a página ao qual se refere, ex: se ## Página 11 então 'Pág 11 ...'

    “assunto” será preenchido com 'Cap. 5 - O Direito Internacional público aplicado em tempo de paz'

    “afirmacao_verdadeira” deve conter a frase que será julgada como verdadeira ou falsa. Deve estar fiel ao texto da lei ou do Capítulo consultado.

    “afirmacao_falsa” deve conter a frase que será julgada como verdadeira ou falsa.
    
    “justificativa_resposta_certa” deve explicar em uma frase por que a afirmação é verdadeira ou falsa. 👉 Toda justificativa deve conter referência explícita ao artigo, inciso, parágrafo ou definição constante do arquivo consultado. Exemplos de formatos aceitos: 
    
    “Conforme art. 4º, parágrafo único, inciso III, a intervenção nos fatores de produção integra as medidas possíveis na Mobilização Nacional.”
    “Segundo o art. 2º, I, a Mobilização Nacional corresponde ao conjunto de atividades planejadas pelo Estado voltadas à capacitação do País diante de agressão estrangeira.”
    “O texto do art. 6º enumera expressamente os órgãos que compõem o SINAMOB, o que torna a afirmação verdadeira.”

A justificativa deve ter no máximo 2 frases.

    “caiu_em_prova” não precisa ser preenchido.

    “ano_prova” não precisa ser preenchido.

Exemplo de saída esperada:


| bibliografia_titulo | paginas | assunto | afirmacao_verdadeira | afirmacao_falsa | justificativa_resposta_certa | caiu_em_prova | ano_prova |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| EMA-135 – Direito do Mar | Pág. 11 | Cap. 5 - O Direito Internacional público aplicado em tempo de paz | A Mobilização Nacional é composta por atividades estratégicas planejadas pelo Estado diante de agressão estrangeira. | A Mobilização Nacional é composta por atividades destinadas à gestão administrativa cotidiana, sem relação com agressão externa. | De acordo com **art. 2º, I**, a Mobilização Nacional visa capacitar o País para agir diante de agressão estrangeira, o que confirma a versão verdadeira. |               |           |


deverá salvar o resultado em formato markdown