import pandas as pd
from pathlib import Path

def gerar_markdown():
    # Caminho da pasta onde estão o script, o XLSX e onde ficará o markdown
    base_path = Path(__file__).resolve().parent

    # Arquivos
    xlsx_path = base_path / "ema.xlsx"
    md_path   = base_path / "ema.md"

    # Lê o xlsx
    df = pd.read_excel(xlsx_path)

    # Valores fixos
    bibliografia_id = 18
    assunto = "Cap. 3 - A proteção de pessoas e bens no mar e a imposição da legislação"

    # Cabeçalho Markdown
    linhas = []
    linhas.append("| bibliografia_id | pergunta | resposta | prova | páginas | assunto |")
    linhas.append("| :--- | :--- | :--- | :--- | :--- | :--- |")

    # Geração das linhas
    for _, row in df.iterrows():
        pergunta = str(row["pergunta"]).strip()
        resposta = str(row["resposta"]).strip()

        linha = (
            f"| {bibliografia_id} | {pergunta} | {resposta} |"
            f" | Pág x | {assunto} |"
        )
        linhas.append(linha)

    # Salvar arquivo final
    md_path.write_text("\n".join(linhas), encoding="utf-8")

    print("Arquivo ema.md gerado com sucesso!")

if __name__ == "__main__":
    gerar_markdown()
