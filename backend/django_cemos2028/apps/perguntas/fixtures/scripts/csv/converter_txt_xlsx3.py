import pandas as pd
import re
from pathlib import Path

def markdown_to_xlsx(txt_path):
    output_path = Path(txt_path).with_suffix(".xlsx")

    with open(txt_path, "r", encoding="utf-8") as f:
        content = f.read().strip()

    # Remove linhas de alinhamento Markdown
    lines = [line.strip() for line in content.splitlines() if not re.match(r'^\|\s*:?-+:?\s*\|', line)]

    # Divide cada linha nas células
    data = [re.split(r'\s*\|\s*', line.strip('| ')) for line in lines if line]

    # Cabeçalho
    header = data[0]
    rows = data[1:]

    # Corrige linhas com número incorreto de colunas
    fixed_rows = []
    for r in rows:
        if len(r) < len(header):
            r += [""] * (len(header) - len(r))  # completa com vazio
        elif len(r) > len(header):
            r = r[:len(header)]  # corta o excesso
        fixed_rows.append(r)

    # Cria o DataFrame
    df = pd.DataFrame(fixed_rows, columns=header)

    # Exporta para Excel
    df.to_excel(output_path, index=False)
    print(f"✅ Arquivo Excel gerado com sucesso: {output_path}")

if __name__ == "__main__":
    txt_file = Path(__file__).parent / "ciencia_politica_mult.txt"
    markdown_to_xlsx(txt_file)
