import pandas as pd

# texto copiado do markdown entre aspas triplas
texto_md = """
bibliografia_titulo	paginas	assunto	afirmacao_verdadeira	afirmacao_falsa justificativa_resposta_certa caiu_em_prova ano_prova
| bibliografia_titulo | titulo | palavra_chave | assunto | descricao | caiu_em_prova | ano_prova |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Economia Brasileira Contemporânea | Bens públicos | Não rival, Não excludente, Consumo | Cap. 8 - Política Fiscal | Bens cujo consumo é não excludente e não rival (ex: segurança nacional), que o mercado não revela disposição a pagar, devendo ser ofertados pelo Estado e financiados por impostos. | false |  |
| Economia Brasileira Contemporânea | Carga tributária bruta e líquida | Arrecadação, Transferências, Receita | Cap. 8 - Política Fiscal | A bruta é o total de impostos arrecadados; a líquida desconta as transferências (juros, subsídios, previdência) da bruta e financia os gastos correntes,. | false |  |
| Economia Brasileira Contemporânea | Déficit primário | NFSP, Juros, Esforço fiscal | Cap. 8 - Política Fiscal | Conceito que engloba apenas receitas e despesas não financeiras (G - T), excluindo os gastos com juros da dívida, isolando o esforço fiscal do governo,. | false |  |
| Economia Brasileira Contemporânea | Déficit público | Investimento público, Poupança pública, Financiamento | Cap. 8 - Política Fiscal | Diferença entre o investimento público e a poupança do governo em conta-corrente; quando positivo, indica que o gasto total supera a arrecadação. | false |  |
| Economia Brasileira Contemporânea | Despesas correntes x transferências do governo | Pessoal, Custeio, Contrapartida | Cap. 8 - Política Fiscal | Despesas correntes incluem pessoal e custeio de serviços; transferências são pagamentos sem contrapartida (ex: previdência, juros) que ampliam a renda disponível,. | false |  |
| Economia Brasileira Contemporânea | Economias de escala | Custo médio, Monopólios naturais, Produção | Cap. 8 - Política Fiscal | Situação em que o aumento da produção reduz o custo médio, podendo levar a monopólios naturais que exigem regulação estatal (função alocativa). | false |  |
| Economia Brasileira Contemporânea | Externalidades (economias externas) | Falhas de mercado, Impacto, Poluição | Cap. 8 - Política Fiscal | Impactos da ação de um agente sobre outros não transacionados pelo mercado (positivas ou negativas), exigindo intervenção do governo para internalizá-los. | false |  |
| Economia Brasileira Contemporânea | Função alocativa, distributiva e estabilizadora do governo | Falhas de mercado, Renda, Emprego | Cap. 8 - Política Fiscal | Dividem-se em alocativa (correção de falhas de mercado), distributiva (redistribuição de renda/regiões) e estabilizadora (emprego, crescimento e preços),,. | false |  |
| Economia Brasileira Contemporânea | Impostos diretos x impostos indiretos | Renda, Preços, Ônus | Cap. 8 - Política Fiscal | Diretos incidem sobre renda/propriedade (ônus no contribuinte); indiretos incidem sobre transações/preços, transferindo o ônus ao consumidor. | false |  |
| Economia Brasileira Contemporânea | Impostos específicos x impostos ad valorem | Valor fixo, Alíquota, Valor adicionado | Cap. 8 - Política Fiscal | Específicos têm valor monetário fixo e são pró-cíclicos; ad valorem (valor adicionado) têm alíquota sobre a base, aumentando a arrecadação na expansão econômica. | false |  |
| Economia Brasileira Contemporânea | Impostos progressivos, regressivos e neutros | Distribuição, Renda, Proporção | Cap. 8 - Política Fiscal | Progressivo: paga mais (relativo) quem ganha mais; Regressivo: paga mais quem ganha menos (comum em impostos indiretos); Neutro: mesma proporção independente da renda,. | false |  |
| Economia Brasileira Contemporânea | Necessidade de Financiamento do Setor Público não financeiro (NFSP) | Pressão financeira, Poupança, Setor público | Cap. 8 - Política Fiscal | Medida abrangente que avalia a pressão do setor público não financeiro sobre os recursos financeiros (poupança interna e externa) da economia. | false |  |
| Economia Brasileira Contemporânea | NFSP conceito nominal x NFSP conceito operacional | Juros nominais, Juros reais, Correção monetária | Cap. 8 - Política Fiscal | Nominal inclui despesas com juros nominais; Operacional (usado em alta inflação) excluía correções monetária/cambial, considerando apenas juros reais,. | false |  |
| Economia Brasileira Contemporânea | Política econômica | Intervenção, Emprego, Estabilidade | Cap. 8 - Política Fiscal | Intervenção do governo na economia (via política fiscal e monetária) visando manter elevados níveis de emprego, crescimento e estabilidade de preços. | false |  |
| Economia Brasileira Contemporânea | Política fiscal | Impostos, Gastos públicos, Demanda agregada | Cap. 8 - Política Fiscal | Atuação do governo na arrecadação de impostos (afeta renda disponível) e execução de gastos para influenciar a demanda agregada e o produto. | false |  |
| Economia Brasileira Contemporânea | Política fiscal contracionista e expansionista | Superávit, Déficit, Atividade econômica | Cap. 8 - Política Fiscal | Expansionista ocorre com déficit público (aumenta demanda/produto); contracionista ocorre com superávit (restringe demanda). | false |  |
| Economia Brasileira Contemporânea | Poupança do governo em conta-corrente | Carga líquida, Consumo do governo, Investimento | Cap. 8 - Política Fiscal | Diferença entre a carga tributária líquida e o consumo do governo; indica a capacidade de investimento sem pressionar outras fontes de financiamento,. | false |  |
| Economia Brasileira Contemporânea | Estabilizadores automáticos | Impostos ad valorem, Ciclo econômico, Arrecadação | Cap. 8 - Política Fiscal | Mecanismos (como impostos ad valorem) em que a arrecadação varia automaticamente com a base tributável, aumentando na expansão e diminuindo na recessão, sem necessidade de mudança na alíquota,. | false |  |
| Economia Brasileira Contemporânea | Execução orçamentária | Gastos públicos, Demanda agregada, Governo | Cap. 8 - Política Fiscal | Refere-se à atuação do governo na realização efetiva dos gastos públicos que, juntamente com a arrecadação, afeta o nível de demanda agregada da economia. | false |  |
| Economia Brasileira Contemporânea | Política fiscal compensatória | Contracíclica, Conjuntura, Maleabilidade | Cap. 8 - Política Fiscal | Atuação do governo (via sistema tributário ou gastos) de forma contracíclica, adaptando-se à conjuntura para não acentuar recessões ou crescimentos desajustados (booms). | false |  |
| Economia Brasileira Contemporânea | Políticas keynesianas | Intervenção, Emprego, Crescimento | Cap. 8 - Política Fiscal | Abordagem em que o governo intervém na economia (via política fiscal e monetária) com o objetivo de manter níveis elevados de emprego e crescimento econômico,. | false |  |
| Economia Brasileira Contemporânea | Subsídio | Transferências, Carga tributária líquida, Governo | Cap. 8 - Política Fiscal | Tipo de transferência governamental ou gasto (como em crédito ou produção) que reduz a carga tributária líquida e não possui contrapartida direta de serviço. | false |  |
"""  # (adicione o restante se quiser)


# 1) filtrar apenas linhas que começam com "|"
linhas = [l for l in texto_md.splitlines() if l.strip().startswith("|")]

# 2) remover linha de formatação ":---"
linhas = [l for l in linhas if ":---" not in l]

# 3) limpar espaços e pipes nas bordas e dividir corretamente
def parse_linha(linha):
    linha = linha.strip().strip("|")
    partes = [c.strip() for c in linha.split("|")]
    return partes

dados = [parse_linha(l) for l in linhas]

# 4) primeira linha = header
header = dados[0]
linhas_data = dados[1:]

# 5) criar DataFrame
df = pd.DataFrame(linhas_data, columns=header)


# 5) Exporta para Excel
df.to_excel("conceitos_economia_brcap8.xlsx", index=False)

print("Arquivo gerado: conceitos_economia_br.xlsx")