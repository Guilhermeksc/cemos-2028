import pandas as pd

# texto copiado do markdown entre aspas triplas
texto_md = """
bibliografia_titulo	paginas	assunto	afirmacao_verdadeira	afirmacao_falsa justificativa_resposta_certa caiu_em_prova ano_prova
| bibliografia_titulo | titulo | palavra_chave | assunto | descricao | caiu_em_prova | ano_prova |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Economia Brasileira Contemporânea | Bens públicos | Não rivalidade, Não excludência, Intervenção estatal | Cap. 19 - Alterações na Presença do Estado no Desenvolvimento Brasileiro | Bens caracterizados pela não rivalidade e não excludência no consumo, que o mercado tem dificuldade em prover, exigindo intervenção estatal. | false |  |
| Economia Brasileira Contemporânea | Estado condutor | Industrialização, Política econômica, Câmbio | Cap. 19 - Alterações na Presença do Estado no Desenvolvimento Brasileiro | Atuação do Estado utilizando instrumentos de política econômica (câmbio, tarifas, crédito) para guiar e promover o processo de industrialização. | false |  |
| Economia Brasileira Contemporânea | Estado financiador | Poupança forçada, BNDE, Crédito longo prazo | Cap. 19 - Alterações na Presença do Estado no Desenvolvimento Brasileiro | Papel do Estado em captar a poupança nacional (via fundos e bancos públicos) e direcioná-la para financiar setores estratégicos do desenvolvimento. | false |  |
| Economia Brasileira Contemporânea | Estado produtor | Estatais, Infraestrutura, Insumos básicos | Cap. 19 - Alterações na Presença do Estado no Desenvolvimento Brasileiro | Atuação direta do governo na produção de bens e serviços através de empresas estatais, focando em infraestrutura e insumos intermediários (siderurgia, petróleo). | false |  |
| Economia Brasileira Contemporânea | Estado regulamentador | Conflitos, CLT, Instituições | Cap. 19 - Alterações na Presença do Estado no Desenvolvimento Brasileiro | Intervenção estatal para mediar conflitos entre capital e trabalho (via CLT) e relações intercapitalistas, visando o bom andamento da industrialização. | false |  |
| Economia Brasileira Contemporânea | Estatização | Serviços públicos, Falta de capital privado, Ideologia | Cap. 19 - Alterações na Presença do Estado no Desenvolvimento Brasileiro | Processo de absorção de atividades econômicas pelo Estado, motivado por questões tarifárias, falta de capacidade de investimento privado ou ideologia nacionalista,. | false |  |
| Economia Brasileira Contemporânea | Garantia de juros | República Velha, Ferrovias, Lucro assegurado | Cap. 19 - Alterações na Presença do Estado no Desenvolvimento Brasileiro | Mecanismo da República Velha que assegurava um retorno mínimo (lucro) aos investimentos privados em infraestrutura, mesmo se a operação tivesse prejuízo. | false |  |
| Economia Brasileira Contemporânea | Lei de Responsabilidade Fiscal | Controle de gastos, Endividamento, Regras | Cap. 19 - Alterações na Presença do Estado no Desenvolvimento Brasileiro | Conjunto de regras que impõe limites ao endividamento e despesas com pessoal nas diferentes esferas governamentais para garantir o controle fiscal. | false |  |
| Economia Brasileira Contemporânea | Política de defesa do café | Intervenção, Preços, Estoques | Cap. 19 - Alterações na Presença do Estado no Desenvolvimento Brasileiro | Ação governamental iniciada em 1906 para regular a oferta e os preços do café, protegendo o setor chave da economia contra crises externas,. | false |  |
| Economia Brasileira Contemporânea | Privatização | Venda de ativos, Eficiência, Dívida pública | Cap. 19 - Alterações na Presença do Estado no Desenvolvimento Brasileiro | Transferência de empresas estatais para o setor privado, visando resolver ineficiências, falta de capacidade de investimento estatal e abater dívidas,. | false |  |
| Economia Brasileira Contemporânea | Programa Nacional de Desestatização | PND, Governo Collor, Siderurgia | Cap. 19 - Alterações na Presença do Estado no Desenvolvimento Brasileiro | Programa iniciado em 1991 para coordenar a venda de estatais, focando inicialmente em setores como siderurgia, petroquímica e fertilizantes. | false |  |
| Economia Brasileira Contemporânea | Regulamentação x desregulamentação | Controle estatal, Mercado, Flexibilização | Cap. 19 - Alterações na Presença do Estado no Desenvolvimento Brasileiro | A regulamentação refere-se ao controle estatal (preços, leis trabalhistas); a desregulamentação é o desmonte dessas regras em favor de mecanismos de mercado. | false |  |
| Economia Brasileira Contemporânea | Serviços públicos | Infraestrutura, Economias de escala, Bem-estar | Cap. 19 - Alterações na Presença do Estado no Desenvolvimento Brasileiro | Atividades essenciais (energia, transporte, saneamento) com economias de escala e externalidades, fundamentais para o crescimento econômico e bem-estar social,. | false |  |
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
df.to_excel("conceitos_economia_brcap19.xlsx", index=False)

print("Arquivo gerado: conceitos_economia_br.xlsx")