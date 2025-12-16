from pathlib import Path
import pandas as pd
import json

BASE_DIR = Path(__file__).parent
INPUT_XLSX = BASE_DIR / "bibliografias.xlsx"
OUTPUT_JSON = BASE_DIR / "bibliografias.json"

# Ajuste os nomes das colunas conforme o arquivo
COL_MATERIA = "materia"
COL_ID = "id"
COL_TITULO = "titulo"
COL_AUTOR = "autor"
COL_DESCRICAO = "descricao"

df = pd.read_excel(INPUT_XLSX)
df.columns = df.columns.str.strip().str.lower()

required_cols = {COL_MATERIA, COL_ID, COL_TITULO, COL_AUTOR, COL_DESCRICAO}
missing = required_cols - set(df.columns)
if missing:
    raise ValueError(f"Colunas ausentes no XLSX: {missing}")

resultado = {}

for materia, grupo in df.groupby(COL_MATERIA):
    materia_key = str(materia).strip()
    resultado[materia_key] = []

    for _, row in grupo.iterrows():
        resultado[materia_key].append({
            "id": row[COL_ID],
            "titulo": row[COL_TITULO],
            "autor": row[COL_AUTOR],
            "descricao": row[COL_DESCRICAO],
        })

with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(resultado, f, ensure_ascii=False, indent=2)

print(f"Arquivo gerado com sucesso: {OUTPUT_JSON}")
