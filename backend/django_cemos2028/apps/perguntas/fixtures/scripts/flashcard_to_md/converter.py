import pandas as pd
from pathlib import Path
import re

# Caminho base (mesma pasta do script)
BASE_DIR = Path(__file__).resolve().parent

# Nome do arquivo de entrada
INPUT_FILE = BASE_DIR / "flashcards.xlsx"

# Ler o arquivo Excel
df = pd.read_excel(INPUT_FILE)

# Garantir que as colunas obrigatórias existam
colunas_necessarias = ["bibliografia_id", "pergunta", "resposta", "prova", "ano", "assunto"]
if not all(col in df.columns for col in colunas_necessarias):
    raise ValueError(f"Faltam colunas obrigatórias no arquivo. Esperadas: {colunas_necessarias}")

# Normalizar o nome do assunto (sem caracteres especiais para nome de arquivo)
def limpar_nome(nome):
    if pd.isna(nome):
        return "Sem_Assunto"
    nome = str(nome).strip()
    nome = re.sub(r"[^\w\s-]", "", nome)
    nome = nome.replace(" ", "_")
    return nome

# Iterar sobre cada combinação única de bibliografia_id e assunto
for (bibliografia_id, assunto), grupo in df.groupby(["bibliografia_id", "assunto"]):
    assunto_limpo = limpar_nome(assunto)
    output_file = BASE_DIR / f"bibliografia_{bibliografia_id}_{assunto_limpo}.md"

    # Criar conteúdo markdown
    linhas = [f"# Bibliografia {bibliografia_id} – {assunto}\n"]
    for _, row in grupo.iterrows():
        linhas.append(f"### Pergunta\n{row['pergunta']}\n")
        linhas.append(f"**Resposta:** {row['resposta']}\n")
        if pd.notna(row.get("prova")):
            linhas.append(f"**Prova:** {row['prova']}\n")
        if pd.notna(row.get("ano")):
            linhas.append(f"**Ano:** {row['ano']}\n")
        linhas.append("\n---\n")

    # Gravar o arquivo Markdown
    with open(output_file, "w", encoding="utf-8") as f:
        f.writelines(line + "\n" for line in linhas)

print("Arquivos Markdown gerados com sucesso na mesma pasta do script.")
