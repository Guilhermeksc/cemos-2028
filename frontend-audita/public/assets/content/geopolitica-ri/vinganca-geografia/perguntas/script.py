import os
import re
import pandas as pd

# 🔹 Caminho da pasta (onde estão o script e os arquivos .md)
path = os.path.dirname(os.path.abspath(__file__))

# 🔹 Lista para armazenar DataFrames
tabelas = []

print(f"📂 Lendo arquivos .md em: {path}\n")

# 🔹 Colunas esperadas no modelo
expected_cols = [
    "bibliografia_titulo", "paginas", "pergunta", "alternativa_a", "alternativa_b",
    "alternativa_c", "alternativa_d", "resposta_correta",
    "justificativa_resposta_certa", "caiu_em_prova", "ano_prova"
]

for arquivo in os.listdir(path):
    if arquivo.endswith(".md"):
        full_path = os.path.join(path, arquivo)
        with open(full_path, "r", encoding="utf-8") as f:
            linhas = f.readlines()

        # 🔸 Captura apenas as linhas da tabela (entre o cabeçalho e uma linha vazia)
        tabela_linhas = []
        dentro_tabela = False
        for linha in linhas:
            if linha.strip().startswith("| bibliografia_titulo"):
                dentro_tabela = True
            if dentro_tabela:
                if linha.strip() == "":
                    break
                tabela_linhas.append(linha.strip())

        if not tabela_linhas:
            print(f"⚠️ Nenhuma tabela encontrada em: {arquivo}")
            continue

        # 🔹 Remove linhas de separadores (---)
        tabela_linhas = [l for l in tabela_linhas if not re.match(r"^\|[-\s|]+\|$", l)]

        # 🔹 Converte cada linha em lista de colunas
        data = []
        for linha in tabela_linhas[1:]:  # pula o cabeçalho
            cols = [c.strip() for c in linha.strip("|").split("|")]
            if len(cols) >= len(expected_cols):
                cols = cols[:len(expected_cols)]  # corta excesso
            elif len(cols) < len(expected_cols):
                cols += [""] * (len(expected_cols) - len(cols))  # completa faltantes
            data.append(cols)

        # 🔹 Cria DataFrame
        df = pd.DataFrame(data, columns=expected_cols)

        # 🔹 Remove linhas vazias
        df = df[df["pergunta"].notna() & (df["pergunta"].str.strip() != "")]
        df["arquivo_origem"] = arquivo

        tabelas.append(df)
        print(f"✅ Tabela importada de: {arquivo}")

# 🔹 Concatena tudo
if tabelas:
    df_final = pd.concat(tabelas, ignore_index=True)

    # 🔹 Exporta para Excel
    output_file = os.path.join(path, "perguntas_geradas.xlsx")
    df_final.to_excel(output_file, index=False)

    print(f"\n📘 Arquivo Excel gerado com sucesso: {output_file}")
else:
    print("\n⚠️ Nenhum arquivo .md com tabela válida encontrado.")
