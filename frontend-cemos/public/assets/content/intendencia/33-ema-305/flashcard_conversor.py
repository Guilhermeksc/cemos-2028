from pathlib import Path
import csv

BASE_DIR = Path(__file__).parent
CSV_FILE = BASE_DIR / "flashcards.csv"
MD_FILE = BASE_DIR / "flashcards.md"

header = "| bibliografia_id | pergunta | resposta | prova | páginas | assunto | justificativa | caveira\n"
separator = "|---|---|---|---|---|---|---|---|\n"

with CSV_FILE.open(encoding="utf-8") as f:
    reader = csv.reader(f)
    rows = list(reader)

with MD_FILE.open("w", encoding="utf-8") as md:
    md.write(header)
    md.write(separator)

    for row in rows:
        if len(row) < 2:
            continue

        pergunta = row[0].strip()
        resposta = row[1].strip()

        md.write(
            f"| 68 | {pergunta} | {resposta} |  |  | 210 |  |  |\n"
        )
