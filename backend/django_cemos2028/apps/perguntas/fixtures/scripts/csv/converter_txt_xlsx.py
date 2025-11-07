import pandas as pd
from pathlib import Path

def txt_to_xlsx(file_path: str):
    """
    Converte um arquivo .txt tabulado em um arquivo .xlsx com o mesmo nome.
    
    Args:
        file_path (str): Caminho do arquivo .txt
    """
    file = Path(file_path)
    if not file.exists():
        raise FileNotFoundError(f"Arquivo não encontrado: {file_path}")
    
    # Lê o arquivo de texto tabulado
    df = pd.read_csv(file, sep="\t", engine="python")
    
    # Define o caminho de saída
    output_path = file.with_suffix(".xlsx")
    
    # Salva como Excel
    df.to_excel(output_path, index=False)
    print(f"Arquivo Excel criado com sucesso: {output_path}")

if __name__ == "__main__":
    # Exemplo: arquivo 'dados.txt' na mesma pasta do script
    current_dir = Path(__file__).parent
    txt_file = current_dir / "teste.txt"
    txt_to_xlsx(txt_file)
