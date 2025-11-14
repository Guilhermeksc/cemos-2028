import pandas as pd
import html
import re

def limpar_html(texto: str) -> str:
    """Remove tags HTML e espaços extras."""
    if pd.isna(texto):
        return ""
    # Descodifica entidades HTML (&nbsp;, &lt;, etc.)
    texto = html.unescape(texto)
    # Remove tags HTML
    texto = re.sub(r'<[^>]+>', '', texto)
    # Remove múltiplas quebras de linha e espaços
    texto = re.sub(r'\s+', ' ', texto).strip()
    return texto

def converter_anki_para_csv(caminho_entrada: str, caminho_saida: str):
    """
    Lê arquivo exportado do Anki (separado por tabulações) e converte em CSV limpo.
    """
    print(f"📂 Lendo arquivo: {caminho_entrada}")
    df = pd.read_csv(
        caminho_entrada,
        sep="\t",
        comment="#",
        names=["pergunta", "resposta", "tags"],
        engine="python"
    )

    # Limpa colunas
    df["pergunta"] = df["pergunta"].apply(limpar_html)
    df["resposta"] = df["resposta"].apply(limpar_html)
    df["tags"] = df["tags"].fillna("").astype(str)

    # Exporta em múltiplos formatos
    df.to_csv(caminho_saida.replace(".csv", "_limpo.csv"), index=False)
    df.to_excel(caminho_saida.replace(".csv", "_limpo.xlsx"), index=False)
    df.to_markdown(caminho_saida.replace(".csv", "_limpo.md"), index=False)

    print(f"✅ Arquivos gerados:\n  - {caminho_saida.replace('.csv', '_limpo.csv')}\n  - {caminho_saida.replace('.csv', '_limpo.xlsx')}\n  - {caminho_saida.replace('.csv', '_limpo.md')}")

# Exemplo de uso:
if __name__ == "__main__":
    converter_anki_para_csv(
        r"c:\Users\guilh\projeto\cemos-2028\frontend\public\assets\content\geopolitica-ri\anki\ri.txt",
        "ri.csv"
    )
