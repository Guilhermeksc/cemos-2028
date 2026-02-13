# PROMPT COMPLETO - CAP 13

## 📁 Arquivo de referência
capítulo base:
/home/guilherme/Projetos/cemos-2028/cemos-2028/frontend-cemos/public/assets/content/historia/breve-historia/cap13.md

## 📂 Diretório dos arquivos base gerados
/home/guilherme/Projetos/cemos-2028/cemos-2028/frontend-cemos/public/assets/content/historia/breve-historia/script

Arquivos base:
- VF: /home/guilherme/Projetos/cemos-2028/cemos-2028/frontend-cemos/public/assets/content/historia/breve-historia/script/vf13.md
- Múltipla Escolha: /home/guilherme/Projetos/cemos-2028/cemos-2028/frontend-cemos/public/assets/content/historia/breve-historia/script/m13.md
- Correlação: /home/guilherme/Projetos/cemos-2028/cemos-2028/frontend-cemos/public/assets/content/historia/breve-historia/script/c13.md
- Flashcards: /home/guilherme/Projetos/cemos-2028/cemos-2028/frontend-cemos/public/assets/content/historia/breve-historia/script/fc13.md

---

## 📂 Diretório dos prompts individuais
/home/guilherme/Projetos/cemos-2028/cemos-2028/frontend-cemos/public/assets/content/historia/breve-historia/script_prompts

Arquivos de prompt individuais:
- /home/guilherme/Projetos/cemos-2028/cemos-2028/frontend-cemos/public/assets/content/historia/breve-historia/script_prompts/pergunta_vf_cap13.md
- /home/guilherme/Projetos/cemos-2028/cemos-2028/frontend-cemos/public/assets/content/historia/breve-historia/script_prompts/pergunta_m_cap13.md
- /home/guilherme/Projetos/cemos-2028/cemos-2028/frontend-cemos/public/assets/content/historia/breve-historia/script_prompts/pergunta_c_cap13.md
- /home/guilherme/Projetos/cemos-2028/cemos-2028/frontend-cemos/public/assets/content/historia/breve-historia/script_prompts/pergunta_fc_cap13.md

---

# 🔷 INSTRUÇÃO GERAL

Com base exclusivamente no conteúdo do arquivo:

/home/guilherme/Projetos/cemos-2028/cemos-2028/frontend-cemos/public/assets/content/historia/breve-historia/cap13.md

Gerar os seguintes arquivos na pasta:

/home/guilherme/Projetos/cemos-2028/cemos-2028/frontend-cemos/public/assets/content/historia/breve-historia/script

1. Questões Verdadeiro ou Falso = vf13.md
2. Questões de Múltipla Escolha = m13.md
3. Questões de Correlação de Colunas = c13.md
4. Flashcards = fc13.md

Respeitar integralmente:

- bibliografia_id: 5
- assunto: 34
- Marcador de página: "## Página X" → "Pág X"
- Justificativas devem citar explicitamente o texto-base
- Não criar conteúdo fora do texto
- Não usar conhecimento externo

---

## 🔹 FORMATAÇÕES OBRIGATÓRIAS

### Verdadeiro ou Falso

# PROMPT V OU F - CAP 13

bibliografia_id: 5
assunto: 34

Criar 3 assertivas por página.
Cada assertiva deve conter:
- Uma versão verdadeira fiel ao texto.
- Uma versão falsa por inversão conceitual, mantendo a coerência do texto e sendo factível, para não gerar questões falsa muito fáceis.

Formato obrigatório:

| bibliografia_id | paginas | assunto | pergunta | afirmacao_verdadeira | afirmacao_falsa | justificativa_resposta_certa | caiu_em_prova | ano_prova |
| 5 | Pág X | 34 | Tema relevante da página | Afirmativa verdadeira baseada no texto. | Afirmativa falsa por inversão conceitual. | Conforme definição constante nesta página. |  |  |

Regras:
- paginas: usar marcador "## Página X" → "Pág X"
- justificativa deve conter referência explícita ao texto. citando o parágrafo, inciso, artigo, etc.
- caiu_em_prova e ano_prova em branco.


---

### Múltipla Escolha

# PROMPT MULTIPLA ESCOLHA - CAP 13

bibliografia_id: 5
assunto: 34

Criar 1 questão por página.

Requisitos:
- 4 alternativas (a,b,c,d)
- Apenas 1 correta, ou apenas 1 falsa.
- Justificativa deve citar explicitamente o texto-base
- paginas: usar marcador "## Página X" → "Pág X"

Formato:

| bibliografia_id | paginas | assunto | pergunta | alternativa_a | alternativa_b | alternativa_c | alternativa_d | resposta_correta | justificativa_resposta_certa | caiu_em_prova | ano_prova |
| 5 | Pág X | 34 | Qual teórico é considerado o fundador (...)? | Immanuel | Hans | Alexander | Nye | b | conforme o item 4.3.1, Morgenthau é (...). |



---

### Correlação

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


---

### Flashcards

# PROMPT FLASHCARDS - CAP 13

bibliografia_id: 5
assunto: 34

Criar exatamente 3 flashcards por página.

Formato obrigatório:

| bibliografia_id | pergunta | resposta | prova | paginas | assunto | justificativa |
| 5 | Pergunta contextualizada | Resposta objetiva, conforme o item X.X do texto. |  | Pág X | 34 | Conforme definição constante nesta página. |


Regras:
- pergunta será preenchido com a pergunta contextualizada.
- resposta deve conter referência explícita (artigo, item, parágrafo).
- prova em branco.
- paginas: usar marcador "## Página X" → "Pág X"
- Justificativa deve citar explicitamente o texto-base