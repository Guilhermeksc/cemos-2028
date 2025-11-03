from PyPDF2 import PdfReader, PdfWriter

# Caminhos relativos (mesmo diretório do script)
ARQUIVO_ENTRADA = "ciencia.pdf"
ARQUIVO_SAIDA = "ciencia_cortada.pdf"

# Intervalo desejado (inclusive)
PAGINA_INICIAL = 12
PAGINA_FINAL = 40

def cortar_pdf():
    reader = PdfReader(ARQUIVO_ENTRADA)
    writer = PdfWriter()

    for i in range(PAGINA_INICIAL - 1, PAGINA_FINAL):
        writer.add_page(reader.pages[i])

    with open(ARQUIVO_SAIDA, "wb") as f:
        writer.write(f)

    print(f"✅ PDF cortado criado: {ARQUIVO_SAIDA}")

if __name__ == "__main__":
    cortar_pdf()
