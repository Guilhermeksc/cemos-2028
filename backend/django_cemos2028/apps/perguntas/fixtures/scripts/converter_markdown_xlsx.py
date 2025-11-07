import pandas as pd
from pathlib import Path

def converter_markdown_para_xlsx():
    # Caminho do arquivo de saída
    path_saida = Path(__file__).parent / "banco_questoes.xlsx"

    # Texto Markdown (cole aqui ou leia de um arquivo)
    texto_markdown = """
bibliografia_titulo	paginas	pergunta	afirmacao	resposta_correta	justificativa_resposta_certa	caiu_em_prova	ano_prova
	|	Sobre Platão e as bases do Marxismo em RI	Platão introduziu a análise de classe e o raciocínio dialético, conceitos que se tornaram bases para analistas marxistas em Relações Internacionais.	true	Platão é o filósofo creditado por introduzir a análise de classe e o raciocínio dialético que influenciaram o pensamento radical.	|	|
	|	Sobre Platão e as bases do Marxismo em RI	Aristóteles, e não Platão, introduziu a análise de classe e o raciocínio dialético, que se tornaram bases para analistas marxistas.	false	Foi Platão quem introduziu a análise de classe e o raciocínio dialético, enquanto Aristóteles utilizou o método comparativo de análise.	|	|
	|	Sobre a metodologia de Aristóteles em RI	Aristóteles foi o primeiro filósofo a empregar o método comparativo de análise em estudos que posteriormente influenciaram as Relações Internacionais.	true	Aristóteles é reconhecido por ter sido o primeiro a utilizar o método comparativo, uma ferramenta importante para o estudo das Relações Internacionais.	|	|
	|	Sobre a metodologia de Aristóteles em RI	O método dialético, em vez do método comparativo, foi a principal contribuição de Aristóteles para os estudos influentes nas Relações Internacionais.	false	Aristóteles foi o pioneiro no uso do método comparativo de análise, diferentemente do raciocínio dialético associado a Platão.	|	|
	|	Conceito-chave do Realismo	O conceito-chave do Realismo, e também do Neorrealismo, é o Equilíbrio de Poder (Balance of Power).	true	O Realismo define o equilíbrio de poder como a principal estratégia para gerenciar a insegurança no sistema internacional anárquico.	|	|
	|	Conceito-chave do Realismo	O conceito-chave do Realismo é o Poder das Ideias, visto que a distribuição de recursos materiais não é relevante para essa teoria.	false	O conceito-chave do Realismo é o Equilíbrio de Poder, e a teoria que foca no Poder das Ideias é o Construtivismo.	|	|
	|	Conceito-chave do Liberalismo	O conceito-chave do Liberalismo e do institucionalismo neoliberal é a Luta de Classes.	false	O conceito-chave do Liberalismo e do institucionalismo neoliberal é a promoção de Instituições colaborativas, em oposição à Luta de Classes do Radicalismo.	|	|
	|	Conceito-chave do Construtivismo	O Construtivismo postula que o conceito-chave para entender as Relações Internacionais é o Poder das Ideias.	true	O Construtivis
    
    """

    # Limpa e organiza o texto
    linhas = [linha.strip().strip("|").strip() for linha in texto_markdown.splitlines() if linha.strip()]
    texto_limpo = "\n".join(linhas)

    # Cria o DataFrame
    df = pd.read_csv(pd.io.common.StringIO(texto_limpo), sep="\t")

    # Salva em Excel
    df.to_excel(path_saida, index=False)
    print(f"✅ Arquivo gerado com sucesso: {path_saida}")

if __name__ == "__main__":
    converter_markdown_para_xlsx()
