from pathlib import Path
import fitz


START_DIR = Path(
    "/home/guilherme/Projetos/cemos-2028/cemos-2028/frontend-cemos/public/assets/content/historia/breve-historia/pdf/conv"
)

PDF_DESTINO = "Vengeance_Weapons_Moon_Race.pdf"
PDF_ORIGEM = "Cap18-AsNavesdaVinganca.pdf" 
OUTPUT_NAME = "Cap18-As_Naves_da_Vingança.pdf"


RULES = [
    {"pages": [4], "target": 3, "action": "trocar"},    
    {"pages": [6], "target": 6, "action": "trocar"},    
    {"pages": [8], "target": 8, "action": "trocar"},
    {"pages": [11], "target": 8, "action": "inserir_apos"},
    {"pages": [9], "target": 9, "action": "trocar"},    
    {"pages": [13], "target": 11, "action": "trocar"},
    {"pages": [12], "target": 12, "action": "trocar"},
]

# slides 1 trocar no lugar do slide 1
# slides 3 trocar no lugar do slide 3
# slides 4 inserir logo após o slide 4
# slides 6 trocar no lugar do slide 6
# slides 7 inserir logo após o slide 6
# slides 8 inserir logo após o slide 7
# slides 12 inserir logo após o slide 12
# slides 12 e 13 trocar no lugar do slide 15
# slides 15 inserir logo após o slide 15

def reorganizar_pdf(pdf_origem_path, pdf_destino_path, rules, output_path):
    origem = fitz.open(pdf_origem_path)
    destino = fitz.open(pdf_destino_path)

    offset = 0

    for rule in rules:
        pages = rule["pages"]
        target = rule["target"] - 1
        action = rule["action"]

        if action == "trocar":
            # Inserir novas páginas no local exato
            insert_pos = target + offset

            for i, p in enumerate(pages):
                page_index = p - 1
                destino.insert_pdf(
                    origem,
                    from_page=page_index,
                    to_page=page_index,
                    start_at=insert_pos + i,
                )

            # Remover página(s) antiga(s) após inserção
            destino.delete_page(insert_pos + len(pages))

            # Ajustar offset se múltiplas páginas forem inseridas
            offset += len(pages) - 1

        elif action == "inserir_apos":
            insert_pos = target + offset + 1

            for i, p in enumerate(pages):
                page_index = p - 1
                destino.insert_pdf(
                    origem,
                    from_page=page_index,
                    to_page=page_index,
                    start_at=insert_pos + i,
                )

            offset += len(pages)

    destino.save(output_path)
    origem.close()
    destino.close()


pdf_origem = START_DIR / PDF_ORIGEM
pdf_destino = START_DIR / PDF_DESTINO
output_pdf = START_DIR / OUTPUT_NAME

reorganizar_pdf(pdf_origem, pdf_destino, RULES, output_pdf)

print(f"PDF gerado em: {output_pdf}")
