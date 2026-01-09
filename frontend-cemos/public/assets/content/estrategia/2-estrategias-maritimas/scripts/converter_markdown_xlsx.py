import pandas as pd
import sys
from pathlib import Path
from collections import defaultdict

def ler_tabela_markdown(caminho: Path) -> pd.DataFrame:
    texto = caminho.read_text(encoding="utf-8")
    linhas = [l for l in texto.splitlines() if l.strip().startswith("|")]

    if len(linhas) < 2:
        print(f"AVISO: Tabela não encontrada em {caminho.name}")
        return pd.DataFrame()

    linhas = [l for l in linhas if ":---" not in l]

    def parse_linha(linha: str) -> list[str]:
        return [c.strip() for c in linha.strip().strip("|").split("|")]

    dados = [parse_linha(l) for l in linhas]
    header = dados[0]
    corpo = dados[1:]

    return pd.DataFrame(corpo, columns=header)


def converter_markdown_para_xlsx(nome_arquivo: str, base: Path) -> pd.DataFrame | None:
    nome_md = f"{nome_arquivo}.md"
    caminho_entrada = base / nome_md
    caminho_saida = base / f"{nome_arquivo}.xlsx"

    if not caminho_entrada.exists():
        print(f"❌ Arquivo não encontrado: {caminho_entrada}")
        return None

    print(f"📄 Processando: {nome_md}")
    df = ler_tabela_markdown(caminho_entrada)

    if df.empty:
        print(f"❌ Nenhum dado válido em {nome_md}")
        return None

    df.to_excel(caminho_saida, index=False, engine="openpyxl")
    print(f"✅ XLSX gerado: {caminho_saida.name}")
    return df


def consolidar_por_prefixo(dfs_por_prefixo: dict[str, list[pd.DataFrame]], base: Path) -> None:
    for prefixo, dfs in dfs_por_prefixo.items():
        if not dfs:
            continue

        df_consolidado = pd.concat(dfs, ignore_index=True)
        caminho_saida = base / f"{prefixo}_consolidado.xlsx"
        df_consolidado.to_excel(caminho_saida, index=False, engine="openpyxl")

        print(f"📦 Consolidado gerado: {caminho_saida.name} ({len(df_consolidado)} linhas)")


def extrair_prefixo(nome: str) -> str:
    for p in ("fc", "vf", "m", "c"):
        if nome.startswith(p):
            return p
    return ""


def main():
    nomes_arquivos = [
        "fcanexo", "fc1", "fc2", "fc3", "fc4", "fc5", "fc6", "fc7", "fc8", "fc9",
        "fc10", "fc11", "fc12", "fc14", "fc15", "fc16", "fc17", "fc18", "fc19",
        "vfanexo", "vf1", "vf2", "vf3", "vf4", "vf5", "vf6", "vf7", "vf8", "vf9",
        "vf10", "vf11", "vf12", "vf14", "vf15", "vf16", "vf17", "vf18", "vf19",
        "manexo", "m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9",
        "m10", "m11", "m12", "m14", "m15", "m16", "m17", "m18", "m19",
        "canexo", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9",
        "c10", "c11", "c12", "c14", "c15", "c16", "c17", "c18", "c19",
    ]

    base = Path(__file__).parent.resolve()
    print(f"\n=== DIRETÓRIO: {base} ===")

    dfs_por_prefixo: dict[str, list[pd.DataFrame]] = defaultdict(list)

    for nome in nomes_arquivos:
        df = converter_markdown_para_xlsx(nome, base)
        if df is not None:
            prefixo = extrair_prefixo(nome)
            if prefixo:
                dfs_por_prefixo[prefixo].append(df)

    print("\n=== CONSOLIDAÇÃO ===")
    consolidar_por_prefixo(dfs_por_prefixo, base)


if __name__ == "__main__":
    if len(sys.argv) > 1:
        base = Path(__file__).parent.resolve()
        converter_markdown_para_xlsx(sys.argv[1], base)
    else:
        main()
