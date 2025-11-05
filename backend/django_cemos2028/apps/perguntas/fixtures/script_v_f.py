import pandas as pd
from pathlib import Path

def converter_para_markdown():
    # Caminho do arquivo na mesma pasta do script
    path_script = Path(__file__).parent
    arquivo_entrada = path_script / "relacao_v_f.xlsx"  # altere para .csv se necessário
    arquivo_saida = path_script / "tabela_ri.md"

    # Leitura do arquivo Excel ou CSV
    if arquivo_entrada.suffix == ".xlsx":
        df = pd.read_excel(arquivo_entrada)
    elif arquivo_entrada.suffix == ".csv":
        df = pd.read_csv(arquivo_entrada, sep=";", encoding="utf-8")
    else:
        raise ValueError("O arquivo deve ser .xlsx ou .csv")

    # Verificação de colunas obrigatórias
    colunas_esperadas = {"pergunta", "resposta"}
    if not colunas_esperadas.issubset(df.columns):
        raise ValueError(f"O arquivo deve conter as colunas: {colunas_esperadas}")

    # Criação da tabela em Markdown
    markdown = "| Pergunta | Resposta |\n|-----------|-----------|\n"
    for _, linha in df.iterrows():
        pergunta = str(linha["pergunta"]).replace("\n", " ").strip()
        resposta = str(linha["resposta"]).replace("\n", " ").strip()
        markdown += f"| {pergunta} | {resposta} |\n"

    # Salvando o arquivo Markdown
    with open(arquivo_saida, "w", encoding="utf-8") as f:
        f.write(markdown)

    print(f"Tabela Markdown criada com sucesso em: {arquivo_saida}")

if __name__ == "__main__":
    converter_para_markdown()
