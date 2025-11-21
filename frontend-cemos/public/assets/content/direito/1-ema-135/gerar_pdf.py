import re
import sys
from pathlib import Path
import pandas as pd
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
from reportlab.platypus.flowables import Flowable
# ------------------------------------------------------
# PARSER ROBUSTO PARA TABELA MARKDOWN
# ------------------------------------------------------
def ler_tabela_markdown(caminho):
    texto = Path(caminho).read_text(encoding="utf-8")

    print("\n=== DEBUG: CONTEÚDO BRUTO DO vf(x).md ===")
    print(texto)

    # 1) capturar apenas linhas que são parte da tabela
    linhas = [l for l in texto.splitlines() if l.strip().startswith("|")]

    print("\n=== DEBUG: LINHAS QUE COMEÇAM COM | ===")
    for l in linhas:
        print(f"[TABELA] {l}")

    if len(linhas) < 2:
        print("\nERRO: Tabela não encontrada.")
        return pd.DataFrame()

    # 2) remover a linha de formatação ":---"
    linhas = [l for l in linhas if ":---" not in l]

    # 3) limpar e separar cada linha
    def parse_linha(linha):
        partes = [c.strip() for c in linha.strip().strip("|").split("|")]
        return partes

    dados = [parse_linha(l) for l in linhas]

    # 4) primeira linha é o cabeçalho
    header = dados[0]
    linhas_data = dados[1:]

    print("\n=== DEBUG: HEADER DETECTADO ===")
    print(header)

    # 5) construir DataFrame
    df = pd.DataFrame(linhas_data, columns=header)

    print("\n=== DEBUG: DATAFRAME FINAL ===")
    print(df)

    return df


# ------------------------------------------------------
def carregar_capitulo(caminho):
    return Path(caminho).read_text(encoding="utf-8")

def separar_paginas_cap(conteudo):
    pattern = r"(## Página\s+(\d+))"
    partes = re.split(pattern, conteudo)
    paginas = {}

    for i in range(1, len(partes), 3):
        cabecalho = partes[i]       # "## Página NN"
        numero = partes[i+1]        # "NN"
        texto = partes[i+2]         # conteúdo
        paginas[int(numero)] = cabecalho + "\n" + texto.strip()
    return paginas

def gerar_bloco_vf(df, numero_pagina):
    print(f"\n--- PROCESSANDO PÁGINA {numero_pagina} ---")

    # valor procurado, exatamente como está no markdown
    chave = f"Pág {numero_pagina}"
    print(f"Procurando por paginas == '{chave}'")

    # verificar se coluna existe
    if "paginas" not in df.columns:
        print("ERRO: coluna 'paginas' não encontrada. Colunas disponíveis:")
        print(df.columns.tolist())
        return ""

    # mostrar valores reais da coluna
    print("\nValores reais da coluna 'paginas':")
    print(df['paginas'].tolist())

    filtro = df[df["paginas"].str.strip() == chave]

    print(f"\nLinhas encontradas para esta página: {len(filtro)}")
    if filtro.empty:
        print("Nenhuma linha compatível. Pulando página.")
        return ""

    linhas = []
    for i, row in enumerate(filtro.itertuples(), start=1):
        print(f" - Inserindo V-F {i} para página {numero_pagina}")

        # Formatar como "V-F x - Afirmação: texto" em uma linha
        texto_afirmacao = str(row.afirmacao_verdadeira).strip()
        linhas.append(f"V-F {i} - Afirmação: {texto_afirmacao}")
        
        # Adicionar separador discreto após cada afirmação (exceto na última)
        if i < len(filtro):
            linhas.append("<separador_fc/>")

    return "\n".join(linhas).strip()


def gerar_bloco_fc(df_fc, numero_pagina):
    """
    Gera o bloco de flashcards para uma página específica.
    Retorna string formatada com os flashcards.
    """
    print(f"\n--- PROCESSANDO FLASHCARDS PARA PÁGINA {numero_pagina} ---")

    # valor procurado, exatamente como está no markdown
    chave = f"Pág {numero_pagina}"
    print(f"Procurando flashcards por páginas == '{chave}'")

    # verificar se coluna existe
    if "páginas" not in df_fc.columns:
        print("ERRO: coluna 'páginas' não encontrada. Colunas disponíveis:")
        print(df_fc.columns.tolist())
        return ""

    # mostrar valores reais da coluna
    print("\nValores reais da coluna 'páginas':")
    print(df_fc['páginas'].tolist())

    filtro = df_fc[df_fc["páginas"].str.strip() == chave]

    print(f"\nFlashcards encontrados para esta página: {len(filtro)}")
    if filtro.empty:
        print("Nenhum flashcard encontrado para esta página.")
        return ""

    linhas = []
    for i, row in enumerate(filtro.itertuples(), start=1):
        print(f" - Inserindo Flash-card {i} para página {numero_pagina}")

        # Formatar como "Flash-card X Pergunta" - texto (em azul)
        # e "Resposta" - texto (em negrito)
        pergunta = str(row.pergunta).strip()
        resposta = str(row.resposta).strip()
        
        linhas.append(f"<font color=\"#0000FF\"><b>Flash-card {i} Pergunta</b></font> - {pergunta}")
        linhas.append(f"<b>Resposta</b> - {resposta}")
        
        # Adicionar separador discreto após cada resposta (exceto no último flashcard)
        if i < len(filtro):
            linhas.append("<separador_fc/>")

    return "\n".join(linhas).strip()


def montar_markdown_final(paginas, df_vf, df_fc=None):
    output = []
    for numero in sorted(paginas.keys()):
        output.append(f"<pagina>{numero}</pagina>")  # marcador especial
        output.append("")

        bloco_vf = gerar_bloco_vf(df_vf, numero)
        bloco_fc = ""

        if bloco_vf:
            # aplicar estilos: V-F x em negrito, "Afirmação:" em verde negrito
            bloco_vf = re.sub(r"(V-F \d+)", r"<b>\1</b>", bloco_vf)
            bloco_vf = bloco_vf.replace(
                " - Afirmação:",
                ' - <font color="#008000"><b>Afirmação:</b></font>'
            )

            output.append(bloco_vf)
            output.append("")

        # Adicionar flashcards se disponível
        if df_fc is not None:
            bloco_fc = gerar_bloco_fc(df_fc, numero)
            if bloco_fc:
                output.append(bloco_fc)
                output.append("")

        # Adicionar linha tracejada apenas se houver V-F ou flashcards
        if bloco_vf or bloco_fc:
            output.append("<linha_tracejada/>")
            output.append("")

        texto_original = paginas[numero].split("\n", 1)[1]
        output.append(texto_original)
        output.append("")

    return "\n".join(output)

def converter_markdown_para_html(texto):
    """
    Converte markdown básico para HTML que o reportlab entende.
    Suporta: **negrito**, *itálico*, (V-F)**texto** (verde negrito), ## Título (negrito), etc.
    Mantém emojis intactos.
    """
    # PRIMEIRO: Converter ## Título para <b>Título</b> (exceto ## Página)
    # Isso deve ser feito ANTES de processar outros padrões
    texto = re.sub(
        r'^##\s+(?!Página\s+)(.+)$',
        r'<b>\1</b>',
        texto,
        flags=re.MULTILINE
    )
    
    # SEGUNDO: Converter (V-F)**texto** para verde negrito
    # Isso deve ser feito ANTES de processar **texto** normal
    texto = re.sub(
        r'\(V-F\)\*\*([^*]+?)\*\*',
        r'<font color="#008000"><b>\1</b></font>',
        texto
    )
    
    # TERCEIRO: Converter **texto** para <b>texto</b> (negrito markdown normal)
    # Agora só vai pegar os **texto** que não foram processados acima
    texto = re.sub(r'\*\*([^*]+?)\*\*', r'<b>\1</b>', texto)
    
    # QUARTO: Converter *texto* para <i>texto</i> (itálico, apenas se não for **)
    texto = re.sub(r'(?<!\*)\*([^*\n]+?)\*(?!\*)', r'<i>\1</i>', texto)
    
    # Escapar apenas & que não está em entidades HTML já existentes
    # Dividir por tags HTML e entidades para preservá-las
    partes = re.split(r'(<[^>]+>|&[a-zA-Z]+;)', texto)
    resultado = []
    
    for parte in partes:
        if parte.startswith('<') and parte.endswith('>'):
            # Tag HTML - manter como está
            resultado.append(parte)
        elif parte.startswith('&') and parte.endswith(';'):
            # Entidade HTML já existente - manter como está
            resultado.append(parte)
        else:
            # Texto normal - escapar &
            parte = parte.replace("&", "&amp;")
            resultado.append(parte)
    
    return ''.join(resultado)


class LinhaTracejada(Flowable):
    """Flowable para criar uma linha tracejada sutil"""
    def __init__(self, width, thickness=0.5, color=colors.grey, spaceBefore=4, spaceAfter=4):
        Flowable.__init__(self)
        self.width = width
        self.thickness = thickness
        self.color = color
        self.spaceBefore = spaceBefore
        self.spaceAfter = spaceAfter
    
    def draw(self):
        self.canv.saveState()
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.thickness)
        self.canv.setDash([3, 2])  # padrão tracejado: 3 pontos de linha, 2 pontos de espaço
        self.canv.line(0, 0, self.width, 0)
        self.canv.restoreState()
    
    def wrap(self, availWidth, availHeight):
        return (self.width, self.thickness + self.spaceBefore + self.spaceAfter)


def gerar_pdf(texto, caminho_pdf):

    styles = getSampleStyleSheet()

    # estilo normal compacto com texto justificado
    estilo_compacto = ParagraphStyle(
        'Compacto',
        parent=styles['Normal'],
        fontSize=9,
        leading=10,
        spaceAfter=2,
        spaceBefore=0,
        alignment=4,  # 4 = TA_JUSTIFY (texto justificado)
    )

    # estilo de página (centralizado e maior)
    estilo_pagina = ParagraphStyle(
        'Pagina',
        parent=styles['Heading1'],
        alignment=1,  # centro
        fontSize=13,
        leading=14,
        spaceAfter=6,
        spaceBefore=12,
    )

    story = []

    for linha in texto.split("\n"):

        # 1) detectar marcador especial e formatar
        if linha.strip().startswith("<pagina>"):
            num = linha.replace("<pagina>", "").replace("</pagina>", "").strip()
            story.append(Paragraph(f"<b>Página {num}</b>", estilo_pagina))
            continue

        # 2) detectar linha tracejada
        if linha.strip() == "<linha_tracejada/>":
            # Criar uma linha tracejada sutil
            largura_util = A4[0] - 20 * mm  # largura da página menos margens
            linha_tracejada = LinhaTracejada(
                width=largura_util,
                thickness=0.5,
                color=colors.HexColor("#CCCCCC"),
                spaceBefore=4,
                spaceAfter=4
            )
            story.append(linha_tracejada)
            continue

        # 2.5) detectar separador discreto para flashcards
        if linha.strip() == "<separador_fc/>":
            # Criar uma linha tracejada mais discreta para separar flashcards
            largura_util = A4[0] - 20 * mm  # largura da página menos margens
            separador_fc = LinhaTracejada(
                width=largura_util,
                thickness=0.3,  # mais fino
                color=colors.HexColor("#E0E0E0"),  # mais claro
                spaceBefore=2,  # menos espaço antes
                spaceAfter=2   # menos espaço depois
            )
            story.append(separador_fc)
            continue

        # 3) linha vazia
        if linha.strip() == "":
            story.append(Spacer(1, 2))
            continue

        # 4) converter markdown para HTML e processar texto normal
        linha_html = converter_markdown_para_html(linha)
        story.append(Paragraph(linha_html, estilo_compacto))

    doc = SimpleDocTemplate(
        str(caminho_pdf),
        pagesize=A4,
        leftMargin=10 * mm,
        rightMargin=10 * mm,
        topMargin=10 * mm,
        bottomMargin=10 * mm,
    )

    doc.build(story)



def main():
    if len(sys.argv) != 2:
        print("Uso: python gerar_pdf.py <x>")
        sys.exit(1)

    x = sys.argv[1]
    base = Path(__file__).parent

    cap_path = base / f"cap{x}.md"
    vf_path = base / f"vf{x}.md"
    fc_path = base / f"fc{x}.md"

    # *** CORREÇÃO AQUI: transformar em string ***
    pdf_path = base / f"pdf{x}.pdf"

    cap_conteudo = carregar_capitulo(cap_path)
    df_vf = ler_tabela_markdown(vf_path)
    paginas = separar_paginas_cap(cap_conteudo)

    # Tentar carregar flashcards se o arquivo existir
    df_fc = None
    if fc_path.exists():
        print(f"\n=== CARREGANDO FLASHCARDS DE {fc_path} ===")
        df_fc = ler_tabela_markdown(fc_path)
    else:
        print(f"\n=== ARQUIVO {fc_path} NÃO ENCONTRADO. Continuando sem flashcards. ===")

    markdown_final = montar_markdown_final(paginas, df_vf, df_fc)
    gerar_pdf(markdown_final, pdf_path)

    print(f"PDF gerado com sucesso: {pdf_path}")


if __name__ == "__main__":
    main()
