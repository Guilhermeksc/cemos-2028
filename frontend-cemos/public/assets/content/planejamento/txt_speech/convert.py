from pathlib import Path
import pandas as pd

SUBSTITUICOES_FONETICAS = {
    "CEMCFA": "Cemqifa",  # Deve vir antes de "EMCFA" para evitar substituição parcial
    "PEECFA": "pecfa",
    "EMCFA": "Êmqifa",
    "DPED": "depéde",
    "DMED": "deméde",
    "DPEM": "depém",
    "C Mi D": "cêmide",
}

def aplicar_fonetica(texto: str) -> str:
    # Ordena por tamanho (mais longos primeiro) para evitar substituições parciais
    substituicoes_ordenadas = sorted(
        SUBSTITUICOES_FONETICAS.items(),
        key=lambda x: len(x[0]),
        reverse=True
    )
    for termo, fonetica in substituicoes_ordenadas:
        texto = texto.replace(termo, fonetica)
    return texto

def tabela_para_md():
    base_dir = Path(__file__).resolve().parent
    arquivo_entrada = base_dir / "tabela.xlsx"
    arquivo_saida = base_dir / "texto.md"

    df = pd.read_excel(arquivo_entrada)

    linhas = []
    for _, row in df.iterrows():
        pergunta = aplicar_fonetica(str(row.iloc[0]).strip())
        resposta = aplicar_fonetica(str(row.iloc[1]).strip())

        linhas.append(f"Speaker 1:{pergunta}")
        linhas.append(f"Speaker 2:{resposta}")

    arquivo_saida.write_text("\n".join(linhas), encoding="utf-8")

if __name__ == "__main__":
    tabela_para_md()
