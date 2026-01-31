from pathlib import Path

BASE_DIR = Path(__file__).parent
BASE_DIR.mkdir(parents=True, exist_ok=True)

parametros_base = {
    "2":   {"numero": 172, "assunto": "Capítulo II - Planejamento para Operações Conjuntas"},
    "4":   {"numero": 173, "assunto": "Capítulo IV - Processo de Planejamento Conjunto (PPC)"},
    "5":   {"numero": 174, "assunto": "Capítulo V - Exame de Situação Operacional"},
    "6":   {"numero": 175, "assunto": "Capítulo VI - Elaboração de Plano de Ordens"},
    "7":   {"numero": 176, "assunto": "Capítulo VII - Controle da Operação Planejada no Nível Operacional"},
    "anexo":   {"numero": 177, "assunto": "Anexo D - Comunicação Social"},                    
}

id_base = 72

def conteudo_c(numero: int, assunto: str) -> str:
    return f"""Sua tarefa é ler integralmente o conteúdo do arquivo cap.md e criar um banco de questões de correlação entre colunas, no formato de associação lógica, conforme as instruções abaixo.

1. Cada questão deve conter:

Coluna A: lista de conceitos, autores, eventos ou períodos.
Coluna B: lista de definições, teorias, características ou fatos correspondentes.
2. As associações devem ser historicamente e conceitualmente corretas.
3. A ordem da correspondência em resposta_correta deve ser alternada, evitando sempre:
   ```json
   {{"0": "0", "1": "1", "2": "2"}}
   ```
4. Criar perguntas objetivas devendo ter pelo menos 3 correlações, podendo ter mais.

Preenchimento dos campos:

bibliografia_id: {id_base}
paginas será preenchido com o markador ## referente a página ex: se ## Página 11 então 'Pág 11 ...'
“assunto”: {numero}.
pergunta: comando de associação (ex.: Relacione os autores às suas teorias).
coluna_a: lista JSON.
coluna_b: lista JSON.
resposta_correta: dicionário JSON com os pares corretos, em ordem alternada.
justificativa_resposta_certa: explicação objetiva.
caiu_em_prova deve ser branco.
ano_prova deve ser branco.

O resultado final deve ser em formato Markdown, no padrão de tabela:

| bibliografia_id | paginas | assunto | pergunta | coluna_a | coluna_b | resposta_correta | justificativa_resposta_certa | caiu_em_prova | ano_prova |
|---|---|---|---|---|---|---|---|---|

por exemplo:

| bibliografia_id | paginas | assunto | pergunta | coluna_a | coluna_b | resposta_correta | justificativa_resposta_certa | caiu_em_prova | ano_prova |
| {id_base}| Pág. 11 | {numero} | Relacione os conceitos geopolíticos com seus autores correspondentes. | ["Heartland", "Eurasianismo", "Destino Manifesto Russo"] | ["Mackinder", "Dugin", "March"] | {{"0": "0", "1": "1", "2": "2"}} | Cada conceito está corretamente associado ao pensador que o desenvolveu ou aplicou à Rússia. |  |  |
"""

def conteudo_fc(numero: int, assunto: str) -> str:
    return f"""Sua tarefa é ler a lista de perguntas e respostas e verificar os arquivos cap.md  para criar um banco de flash-cards, do seguinte modo:

    Criar exatamente 3 flashcards por página identificada no arquivo.

Formato da saída

O resultado final deve ser salvo exclusivamente em formato Markdown, no padrão de tabela abaixo.

Todas as colunas devem ser preenchidas, mesmo que com string vazia ("").

Instruções específicas:

    bibliografia_id": {id_base}.

    pergunta será preenchido com a pergunta contextualizada.

    resposta: resposta curta, direta e necessariamente acompanhada da referência explícita
    (ex.: “Conforme o art. 2º, inciso I...” ou “Nos termos do item 4.3.1...”).

    prova deve ser branco.

    “paginas” será preenchido com o markador ## referente a página ao qual se refere, ex: se ## Página 11 então 'Pág 11 ...'
    
“assunto”: {numero}.

Exemplo de saída esperada:

					
| bibliografia_id | pergunta | resposta | prova | páginas | assunto |
| {id_base} | Pergunta contextualizada | Resposta objetiva, conforme o item X.X do texto. |  | Pág. 11 | {assunto} |


deverá salvar o resultado em formato markdown
"""

def conteudo_m(numero: int, assunto: str) -> str:
    return f"""Sua tarefa é ler o conteúdo do arquivo cap.md e criar um banco de questões com 1 questão por página de múltipla escolha.

Cada questão deve:
1- Ser relevante e coerente com o conteúdo do capítulo.
2- Apresentar quatro alternativas (a, b, c, d), sendo apenas uma correta.
3- Incluir a justificativa_resposta_certa deve, obrigatoriamente, citar explicitamente o dispositivo correspondente do texto-base, como:
artigo, inciso ou parágrafo; ou
item, subitem ou definição, conforme a estrutura do documento.

Gere perguntas que testem conceitos-chave, autores, teorias, eventos:
- a compreensão de conceitos centrais,
- a aplicação de teorias a contextos históricos,
- a identificação de causas e consequências de eventos.
- As alternativas devem ser plausíveis, evitando opções óbvias ou absurdas.

bibliografia_id: {id_base}
“paginas” será preenchido com o markador ## referente a página ao qual se refere, ex: se ## Página 11 então 'Pág 11 ...'
pergunta: texto completo da questão.
“assunto”: {numero}
alternativa_a até alternativa_d: alternativas de resposta.
resposta_correta: letra da alternativa correta (a, b, c ou d).
justificativa_resposta_certa:
frase objetiva contendo obrigatoriamente a referência explícita ao texto, por exemplo:
“Conforme o item 1.2 do Capítulo 1, …” ou
“Nos termos do art. 2º, inciso I, …”
caiu_em_prova e ano_prova: podem ser deixados vazios ou preenchidos conforme aplicável.

Modelo de saída esperado

| bibliografia_id | paginas | assunto | pergunta | alternativa_a | alternativa_b | alternativa_c | alternativa_d | resposta_correta | justificativa_resposta_certa | caiu_em_prova | ano_prova
| {id_base}| Pág 15 | {numero} | Qual teórico é considerado o fundador (...)? | Immanuel | Hans | Alexander | Nye | b | conforme o **item 4.3.1**, Morgenthau é (...). |

"""

def conteudo_vf(numero: int, assunto: str) -> str:
    return f"""Sua tarefa é ler o arquivo cap.md para criar um banco de questões v ou f, do seguinte modo:

1. Quantidade
    Criar 3 assertivas por página.
    Cada assertiva deve possuir: uma versão verdadeira, fiel ao conteúdo; e uma versão falsa, coerente, obtida por inversão lógica ou alteração de conceito-chave.

2. Estrutura da saída deve ser uma tabela Markdown, conforme abaixo:

| bibliografia_id | paginas | assunto | pergunta | afirmacao_verdadeira | afirmacao_falsa | justificativa_resposta_certa | caiu_em_prova | ano_prova |

3. Regras de preenchimento das colunas
bibliografia_id: {id_base}
“paginas” será preenchido com o marcador ## referente a página ao qual se refere, ex: se ## Página 11 então 'Pág 11'
“assunto”: {numero}
"pergunta" deve conter um título com o tema da pergunta elaborada.
“afirmacao_falsa” deve conter a frase que será julgada como falsa.    
“justificativa_resposta_certa” deve explicar em uma frase por que a afirmação é verdadeira ou falsa. 👉 Toda justificativa deve conter referência explícita ao artigo, inciso, parágrafo ou definição constante do arquivo consultado. Exemplos de formatos aceitos: 
“Conforme art. 4º, parágrafo único, inciso III, a intervenção (...).”
“Segundo o art. 2º, I, a Mobilização corresponde (...).”
“caiu_em_prova” em branco.
“ano_prova” em branco.

Exemplo de saída:

| bibliografia_id | paginas | assunto | pergunta | afirmacao_verdadeira | afirmacao_falsa | justificativa_resposta_certa | caiu_em_prova | ano_prova |
| {id_base} | Pág. 11 | {numero}| Mobilização Nacional |A Mobilização Nacional é  (...). | A Mobilização Nacional é (...), sem relação com agressão externa. | De acordo com **art. 2º, I**, a Mobilização Nacional (...). | |  |
"""

sufixos = ["c", "fc", "m", "vf"]

for parte, dados in parametros_base.items():
    numero = dados["numero"]
    assunto = dados["assunto"]

    for s in sufixos:
        arquivo_parte = BASE_DIR / f"{parte}{s}.md"

        if s == "c":
            arquivo_parte.write_text(conteudo_c(numero, assunto), encoding="utf-8")
        elif s == "fc":
            arquivo_parte.write_text(conteudo_fc(numero, assunto), encoding="utf-8")
        elif s == "m":
            arquivo_parte.write_text(conteudo_m(numero, assunto), encoding="utf-8")
        elif s == "vf":
            arquivo_parte.write_text(conteudo_vf(numero, assunto), encoding="utf-8")
        else:
            raise ValueError(f"Sufixo desconhecido: {s}")

        # Arquivos por número (vazios)
        (BASE_DIR / f"{s}{parte}.md").write_text("", encoding="utf-8")
