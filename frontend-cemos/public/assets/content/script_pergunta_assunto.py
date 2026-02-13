from pathlib import Path
import re

# ==========================================================
# CONFIGURAÇÕES GERAIS
# ==========================================================

BASE_DIR = Path(
    "/home/guilherme/Projetos/cemos-2028/cemos-2028/frontend-cemos/public/assets/content"
)

CAPITULO = 13
BIBLIOGRAFIA_ID = 5
ASSUNTO = 34

CAP_FILE = BASE_DIR / f"cap{CAPITULO}.md"
SCRIPT_DIR = BASE_DIR / "script"
SCRIPT_DIR_PROMPTS = BASE_DIR / "script_prompts"
PROMPT_COMPLETO = SCRIPT_DIR_PROMPTS / f"prompt_completo_cap{CAPITULO}.md"


ARQUIVOS_PROMPT = {
    "vf": SCRIPT_DIR_PROMPTS / f"pergunta_vf_cap{CAPITULO}.md",
    "m": SCRIPT_DIR_PROMPTS / f"pergunta_m_cap{CAPITULO}.md",
    "c": SCRIPT_DIR_PROMPTS / f"pergunta_c_cap{CAPITULO}.md",
    "fc": SCRIPT_DIR_PROMPTS / f"pergunta_fc_cap{CAPITULO}.md",
}

ARQUIVOS_SAIDA = {
    "multipla": SCRIPT_DIR / f"m{CAPITULO}.md",
    "correlacao": SCRIPT_DIR / f"c{CAPITULO}.md",
    "vf": SCRIPT_DIR / f"vf{CAPITULO}.md",
    "flashcards": SCRIPT_DIR / f"fc{CAPITULO}.md",
}


# ==========================================================
# UTILIDADES
# ==========================================================

def garantir_arquivo_existe(path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists():
        path.touch()


def garantir_arquivo_com_template(path: Path, conteudo: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists():
        path.write_text(conteudo.strip(), encoding="utf-8")
        print(f"Arquivo criado: {path}")
    else:
        print(f"Arquivo já existe: {path}")

# ==========================================================
# TEMPLATES
# ==========================================================

def template_vf():
    return f"""
# PROMPT V OU F - CAP {CAPITULO}

bibliografia_id: {BIBLIOGRAFIA_ID}
assunto: {ASSUNTO}

Criar 3 assertivas por página.
Cada assertiva deve conter:
- Uma versão verdadeira fiel ao texto.
- Uma versão falsa por inversão conceitual, mantendo a coerência do texto e sendo factível, para não gerar questões falsa muito fáceis.

Formato obrigatório:

| bibliografia_id | paginas | assunto | pergunta | afirmacao_verdadeira | afirmacao_falsa | justificativa_resposta_certa | caiu_em_prova | ano_prova |
| {BIBLIOGRAFIA_ID} | Pág X | {ASSUNTO} | Tema relevante da página | Afirmativa verdadeira baseada no texto. | Afirmativa falsa por inversão conceitual. | Conforme definição constante nesta página. |  |  |

Regras:
- paginas: usar marcador "## Página X" → "Pág X"
- justificativa deve conter referência explícita ao texto. citando o parágrafo, inciso, artigo, etc.
- caiu_em_prova e ano_prova em branco.
"""


def template_flashcards():
    return f"""
# PROMPT FLASHCARDS - CAP {CAPITULO}

bibliografia_id: {BIBLIOGRAFIA_ID}
assunto: {ASSUNTO}

Criar exatamente 3 flashcards por página.

Formato obrigatório:

| bibliografia_id | pergunta | resposta | prova | paginas | assunto | justificativa |
| {BIBLIOGRAFIA_ID} | Pergunta contextualizada | Resposta objetiva, conforme o item X.X do texto. |  | Pág X | {ASSUNTO} | Conforme definição constante nesta página. |


Regras:
- pergunta será preenchido com a pergunta contextualizada.
- resposta deve conter referência explícita (artigo, item, parágrafo).
- prova em branco.
- paginas: usar marcador "## Página X" → "Pág X"
- Justificativa deve citar explicitamente o texto-base
"""


def template_multipla():
    return f"""
# PROMPT MULTIPLA ESCOLHA - CAP {CAPITULO}

bibliografia_id: {BIBLIOGRAFIA_ID}
assunto: {ASSUNTO}

Criar 1 questão por página.

Requisitos:
- 4 alternativas (a,b,c,d)
- Apenas 1 correta, ou apenas 1 falsa.
- Justificativa deve citar explicitamente o texto-base
- paginas: usar marcador "## Página X" → "Pág X"

Formato:

| bibliografia_id | paginas | assunto | pergunta | alternativa_a | alternativa_b | alternativa_c | alternativa_d | resposta_correta | justificativa_resposta_certa | caiu_em_prova | ano_prova |
| {BIBLIOGRAFIA_ID} | Pág X | {ASSUNTO} | Qual teórico é considerado o fundador (...)? | Immanuel | Hans | Alexander | Nye | b | conforme o item 4.3.1, Morgenthau é (...). |

"""

json_exemplo = '{{"0": "0", "1": "1", "2": "2"}}'

def template_correlacao():
    return f"""
# PROMPT CORRELACIONAR COLUNAS - CAP {CAPITULO}

bibliografia_id: {BIBLIOGRAFIA_ID}
assunto: {ASSUNTO}

Criar questões de associação lógica.

Coluna A: lista de conceitos, autores, eventos ou períodos.
Coluna B: lista de definições, teorias, características ou fatos correspondentes.
2. As associações devem ser historicamente e conceitualmente corretas.
3. json_exemplo: {json_exemplo}

 
Requisitos:
- Pelo menos 3 correlações coluna A para coluna B, podendo ser 3 para A e 4 ou 5 para B, sempre deve ter mais para A do que para B.
- resposta_correta deve alternar ordem
- coluna_a e coluna_b em formato JSON
- justificativa_resposta_certa deve citar explicitamente o texto-base
- paginas: usar marcador "## Página X" → "Pág X"

Formato:

| bibliografia_id | paginas | assunto | pergunta | coluna_a | coluna_b | resposta_correta | justificativa_resposta_certa | caiu_em_prova | ano_prova |
| {BIBLIOGRAFIA_ID} | Pág X | {ASSUNTO} | Relacione os conceitos geopolíticos com seus autores correspondentes. | ["Heartland", "Eurasianismo", "Destino Manifesto Russo"] | ["Mackinder", "Dugin", "March"] | {json_exemplo} | Cada conceito está corretamente associado ao pensador que o desenvolveu ou aplicou à Rússia. |  |  |
"""

def ler_capitulo(path: Path) -> dict:
    """
    Lê o capítulo.
    Se não existir, cria o arquivo vazio automaticamente.
    """

    if not path.exists():
        print(f"Arquivo não encontrado. Criando: {path}")
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(
            "## Página 1\n\n(Conteúdo ainda não inserido.)\n",
            encoding="utf-8"
        )

    conteudo = path.read_text(encoding="utf-8")

    paginas = re.split(r"(## Página \d+)", conteudo)
    resultado = {}

    for i in range(1, len(paginas), 2):
        marcador = paginas[i]
        texto = paginas[i + 1]
        numero = re.search(r"\d+", marcador).group()
        resultado[f"Pág {numero}"] = texto.strip()

    return resultado



def salvar_markdown(path: Path, header: str, linhas: list[str]):
    garantir_arquivo_existe(path)
    with path.open("w", encoding="utf-8") as f:
        f.write(header + "\n")
        for linha in linhas:
            f.write(linha + "\n")


# ==========================================================
# GERADORES
# ==========================================================

def gerar_vf(paginas: dict):
    header = (
        "| bibliografia_id | paginas | assunto | pergunta | "
        "afirmacao_verdadeira | afirmacao_falsa | "
        "justificativa_resposta_certa | caiu_em_prova | ano_prova |\n"
        "|---|---|---|---|---|---|---|---|---|"
    )

    linhas = []

    for pagina, texto in paginas.items():
        for i in range(3):
            linhas.append(
                f"| {BIBLIOGRAFIA_ID} | {pagina} | {ASSUNTO} | "
                f"Tema relevante da página | "
                f"Afirmativa verdadeira baseada no texto. | "
                f"Afirmativa falsa por inversão conceitual. | "
                f"Conforme definição constante nesta página. |  |  |"
            )

    salvar_markdown(ARQUIVOS_SAIDA["vf"], header, linhas)


def gerar_flashcards(paginas: dict):
    header = (
        "| bibliografia_id | pergunta | resposta | prova | paginas | assunto |\n"
        "|---|---|---|---|---|---|"
    )

    linhas = []

    for pagina, texto in paginas.items():
        for i in range(3):
            linhas.append(
                f"| {BIBLIOGRAFIA_ID} | "
                f"Pergunta contextualizada sobre a página | "
                f"Resposta objetiva conforme definição da página. | "
                f" | {pagina} | {ASSUNTO} |"
            )

    salvar_markdown(ARQUIVOS_SAIDA["flashcards"], header, linhas)


def gerar_multipla_escolha(paginas: dict):
    header = (
        "| bibliografia_id | paginas | assunto | pergunta | "
        "alternativa_a | alternativa_b | alternativa_c | alternativa_d | "
        "resposta_correta | justificativa_resposta_certa | caiu_em_prova | ano_prova |\n"
        "|---|---|---|---|---|---|---|---|---|---|---|---|"
    )

    linhas = []

    for pagina, texto in paginas.items():
        linhas.append(
            f"| {BIBLIOGRAFIA_ID} | {pagina} | {ASSUNTO} | "
            f"Questão conceitual relevante desta página | "
            f"Alternativa A | Alternativa B | Alternativa C | Alternativa D | "
            f"a | Conforme trecho explícito desta página. |  |  |"
        )

    salvar_markdown(ARQUIVOS_SAIDA["multipla"], header, linhas)


def gerar_correlacao(paginas: dict):
    header = (
        "| bibliografia_id | paginas | assunto | pergunta | "
        "coluna_a | coluna_b | resposta_correta | "
        "justificativa_resposta_certa | caiu_em_prova | ano_prova |\n"
        "|---|---|---|---|---|---|---|---|---|"
    )

    linhas = []

    for pagina, texto in paginas.items():
        linhas.append(
            f'| {BIBLIOGRAFIA_ID} | {pagina} | {ASSUNTO} | '
            f'Relacione os conceitos da página | '
            f'["Conceito 1", "Conceito 2", "Conceito 3"] | '
            f'["Definição A", "Definição B", "Definição C"] | '
            f'{{"0":"1","1":"2","2":"0"}} | '
            f'Associações conforme descrito nesta página. |  |  |'
        )

    salvar_markdown(ARQUIVOS_SAIDA["correlacao"], header, linhas)


def template_prompt_completo():
    return f"""
# PROMPT COMPLETO - CAP {CAPITULO}

## 📁 Arquivo de referência
capítulo base:
{CAP_FILE}

## 📂 Diretório dos arquivos base gerados
{SCRIPT_DIR}

Arquivos base:
- VF: {ARQUIVOS_SAIDA["vf"]}
- Múltipla Escolha: {ARQUIVOS_SAIDA["multipla"]}
- Correlação: {ARQUIVOS_SAIDA["correlacao"]}
- Flashcards: {ARQUIVOS_SAIDA["flashcards"]}

---

## 📂 Diretório dos prompts individuais
{SCRIPT_DIR_PROMPTS}

Arquivos de prompt individuais:
- {ARQUIVOS_PROMPT["vf"]}
- {ARQUIVOS_PROMPT["m"]}
- {ARQUIVOS_PROMPT["c"]}
- {ARQUIVOS_PROMPT["fc"]}

---

# 🔷 INSTRUÇÃO GERAL

Com base exclusivamente no conteúdo do arquivo:

{CAP_FILE}

Gerar os seguintes arquivos na pasta:

{SCRIPT_DIR}

1. Questões Verdadeiro ou Falso = vf{CAPITULO}.md
2. Questões de Múltipla Escolha = m{CAPITULO}.md
3. Questões de Correlação de Colunas = c{CAPITULO}.md
4. Flashcards = fc{CAPITULO}.md

Respeitar integralmente:

- bibliografia_id: {BIBLIOGRAFIA_ID}
- assunto: {ASSUNTO}
- Marcador de página: "## Página X" → "Pág X"
- Justificativas devem citar explicitamente o texto-base
- Não criar conteúdo fora do texto
- Não usar conhecimento externo

---

## 🔹 FORMATAÇÕES OBRIGATÓRIAS

### Verdadeiro ou Falso
{template_vf()}

---

### Múltipla Escolha
{template_multipla()}

---

### Correlação
{template_correlacao()}

---

### Flashcards
{template_flashcards()}
"""


# ==========================================================
# EXECUÇÃO
# ==========================================================

def main():
    paginas = ler_capitulo(CAP_FILE)

    gerar_vf(paginas)
    gerar_flashcards(paginas)
    gerar_multipla_escolha(paginas)
    gerar_correlacao(paginas)

    print("Arquivos base gerados com sucesso.")

    garantir_arquivo_com_template(ARQUIVOS_PROMPT["vf"], template_vf())
    garantir_arquivo_com_template(ARQUIVOS_PROMPT["fc"], template_flashcards())
    garantir_arquivo_com_template(ARQUIVOS_PROMPT["m"], template_multipla())
    garantir_arquivo_com_template(ARQUIVOS_PROMPT["c"], template_correlacao())
    garantir_arquivo_com_template(PROMPT_COMPLETO, template_prompt_completo())
    
    print("Todos os arquivos de prompt foram verificados/criados.")

if __name__ == "__main__":
    main()
