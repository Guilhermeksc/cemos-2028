import pandas as pd
import sys
from pathlib import Path

def ler_tabela_markdown(caminho):
    """Lê uma tabela markdown e retorna um DataFrame"""
    texto = Path(caminho).read_text(encoding="utf-8")
    
    # Capturar apenas linhas que são parte da tabela
    linhas = [l for l in texto.splitlines() if l.strip().startswith("|")]
    
    if len(linhas) < 2:
        print(f"AVISO: Tabela não encontrada em {caminho}")
        return pd.DataFrame()
    
    # Remover a linha de formatação ":---"
    linhas = [l for l in linhas if ":---" not in l]
    
    # Limpar e separar cada linha
    def parse_linha(linha):
        partes = [c.strip() for c in linha.strip().strip("|").split("|")]
        return partes
    
    dados = [parse_linha(l) for l in linhas]
    
    # Primeira linha é o cabeçalho
    header = dados[0]
    linhas_data = dados[1:]
    
    # Construir DataFrame
    df = pd.DataFrame(linhas_data, columns=header)
    
    return df


def converter_markdown_para_xlsx(nome_arquivo, base):
    """
    Converte um arquivo markdown para Excel.
    
    Args:
        nome_arquivo: Nome do arquivo sem extensão (ex: 'fc1', 'vf2')
        base: Diretório base onde estão os arquivos
    """
    # Adicionar extensão .md se não tiver
    if not nome_arquivo.endswith('.md'):
        nome_arquivo_md = f"{nome_arquivo}.md"
    else:
        nome_arquivo_md = nome_arquivo
        nome_arquivo = nome_arquivo.replace('.md', '')
    
    # Caminhos dos arquivos
    caminho_entrada = base / nome_arquivo_md
    caminho_saida = base / f"{nome_arquivo}.xlsx"
    
    # Verificar se arquivo existe
    if not caminho_entrada.exists():
        print(f"❌ ERRO: Arquivo não encontrado: {caminho_entrada}")
        return False
    
    print(f"📄 Processando: {nome_arquivo_md}")
    
    # Ler tabela markdown
    df = ler_tabela_markdown(caminho_entrada)
    
    if df.empty:
        print(f"❌ ERRO: Nenhum dado encontrado em {nome_arquivo_md}")
        return False
    
    # Salvar em Excel
    df.to_excel(caminho_saida, index=False, engine='openpyxl')
    
    print(f"✅ Arquivo Excel gerado com sucesso: {caminho_saida}")
    print(f"   Total de linhas processadas: {len(df)}")
    print(f"   Colunas: {', '.join(df.columns.tolist())}")
    return True


def main():
    # DIGITE OS NOMES DOS ARQUIVOS MARKDOWN AQUI:
    # Pode ser uma string com nomes separados por vírgula: "fc1,fc2,fc3"
    # Ou uma lista: ["fc1", "fc2", "vf1"]
    # Ou um único nome: "fc1"
    nomes_arquivos = ["fc1", "vf1"]
    
    base = Path(__file__).parent.resolve()
    print(f"\n=== DIRETÓRIO DE TRABALHO: {base} ===")
    
    # Processar a string de nomes para lista
    if isinstance(nomes_arquivos, str):
        # Remover espaços e dividir por vírgula
        nomes = [x.strip() for x in nomes_arquivos.split(",") if x.strip()]
    elif isinstance(nomes_arquivos, list):
        nomes = [str(x).strip() for x in nomes_arquivos if str(x).strip()]
    else:
        # Se for um único nome, converter para lista
        nomes = [str(nomes_arquivos).strip()]
    
    print(f"\n=== PROCESSANDO {len(nomes)} ARQUIVO(S) ===")
    print(f"Arquivos: {', '.join(nomes)}")
    
    # Processar cada arquivo
    sucessos = 0
    falhas = 0
    
    for nome_arquivo in nomes:
        print(f"\n{'='*60}")
        if converter_markdown_para_xlsx(nome_arquivo, base):
            sucessos += 1
        else:
            falhas += 1
    
    # Resumo final
    print(f"\n{'='*60}")
    print(f"RESUMO FINAL")
    print(f"{'='*60}")
    print(f"Total de arquivos processados: {len(nomes)}")
    print(f"✅ Sucessos: {sucessos}")
    print(f"❌ Falhas: {falhas}")
    print(f"{'='*60}")


if __name__ == "__main__":
    # Se houver argumentos na linha de comando, usar eles
    if len(sys.argv) > 1:
        nome_arquivo = sys.argv[1]
        base = Path(__file__).parent.resolve()
        converter_markdown_para_xlsx(nome_arquivo, base)
    else:
        # Caso contrário, usar a função main()
        main()
