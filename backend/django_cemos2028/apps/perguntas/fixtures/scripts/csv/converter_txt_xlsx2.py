import pandas as pd
from pathlib import Path

def txt_to_xlsx(file_path: str):
    """
    Converte um arquivo .txt tabulado em um arquivo .xlsx com o mesmo nome.
    Lida com aspas e erros de formatação.
    """
    file = Path(file_path)
    if not file.exists():
        raise FileNotFoundError(f"Arquivo não encontrado: {file_path}")

    try:
        # Tenta ler com o parser padrão
        df = pd.read_csv(
            file,
            sep="\t",
            quoting=3,  # QUOTE_NONE — ignora aspas no conteúdo
            on_bad_lines="skip",  # ignora linhas malformadas
            engine="python",
            encoding="utf-8",
        )
    except Exception as e:
        print(f"Erro ao ler {file.name}: {e}")
        print("Tentando modo alternativo de leitura...")
        # Faz fallback lendo manualmente e limpando caracteres problemáticos
        with open(file, "r", encoding="utf-8") as f:
            lines = [line.replace('"', "") for line in f if line.strip()]
        df = pd.DataFrame([line.split("\t") for line in lines[1:]], columns=lines[0].split("\t"))

    output_path = file.with_suffix(".xlsx")
    df.to_excel(output_path, index=False)
    print(f"Arquivo Excel criado com sucesso: {output_path}")

if __name__ == "__main__":
    current_dir = Path(__file__).parent
    txt_file = current_dir / "teste.txt"
    txt_to_xlsx(txt_file)
