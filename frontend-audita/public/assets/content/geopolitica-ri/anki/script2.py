import pandas as pd
import re
from bs4 import BeautifulSoup
from pathlib import Path

def limpar_html(texto):
    """Remove tags HTML e espaços extras."""
    if not isinstance(texto, str):
        return ""
    texto = BeautifulSoup(texto, "html.parser").get_text(separator=" ")
    texto = re.sub(r"\s+", " ", texto).strip()
    return texto

def extrair_perguntas_respostas(nome_arquivo="notas.txt", nome_saida="perguntas_limpo.xlsx"):
    pasta_script = Path(__file__).parent
    caminho_entrada = pasta_script / nome_arquivo
    caminho_saida = pasta_script / nome_saida

    if not caminho_entrada.exists():
        raise FileNotFoundError(f"❌ Arquivo não encontrado: {caminho_entrada}")

    # Lê o conteúdo completo
    with open(caminho_entrada, "r", encoding="utf-8") as f:
        conteudo = f.read()

    # Remove cabeçalhos tipo "#separator:tab" e "#tags column"
    conteudo = "\n".join(
        [linha for linha in conteudo.splitlines() if not linha.strip().startswith("#")]
    )

    # Junta linhas quebradas de uma mesma resposta
    linhas = re.split(r"\n(?=[^\"\t]*\t)", conteudo.strip())

    perguntas, respostas = [], []

    for linha in linhas:
        partes = linha.split("\t")
        if len(partes) >= 2:
            pergunta = limpar_html(partes[0])
            resposta = limpar_html(" ".join(partes[1:]))
            perguntas.append(pergunta)
            respostas.append(resposta)

    df = pd.DataFrame({
        "pergunta": perguntas,
        "resposta": respostas,
        "tags": ["" for _ in perguntas]
    })

    df.to_excel(caminho_saida, index=False)
    print(f"✅ Exportado com sucesso: {caminho_saida}")

if __name__ == "__main__":
    extrair_perguntas_respostas("notas.txt")
