# pdf_to_markdown_ocr.py
from pathlib import Path
from pdf2image import convert_from_path
import pytesseract
import re

def pdf_to_markdown(pdf_filename: str):
    """
    Converte um PDF para Markdown, corrigindo problemas de caracteres corrompidos
    e quebras de linha, usando OCR (pytesseract).
    """
    base_dir = Path(__file__).parent
    pdf_path = base_dir / pdf_filename

    if not pdf_path.exists():
        raise FileNotFoundError(f"Arquivo não encontrado: {pdf_path}")

    # Converte cada página em imagem
    print("🔍 Convertendo páginas em imagens...")
    pages = convert_from_path(pdf_path, dpi=300)

    markdown_text = ""
    for i, page in enumerate(pages, start=1):
        text = pytesseract.image_to_string(page, lang="por")

        # --- Limpeza das quebras de linha ---
        text = re.sub(r"(\w)-\n(\w)", r"\1\2", text)  # remove hífen de quebra
        text = re.sub(r"(?<!\n)\n(?!\n)", " ", text)  # quebra simples → espaço
        text = re.sub(r"\n{2,}", "\n\n", text)         # múltiplas quebras → 1
        text = re.sub(r"[ \t]{2,}", " ", text)         # espaços duplicados

        markdown_text += f"## Página {i}\n\n{text.strip()}\n\n---\n\n"

    # Salvar arquivo .md
    output_path = base_dir / f"{pdf_path.stem}_ocr.md"
    output_path.write_text(markdown_text.strip(), encoding="utf-8")
    print(f"✅ Arquivo Markdown gerado: {output_path.name}")

if __name__ == "__main__":
    pdf_to_markdown("ciencia_cortada.pdf")
