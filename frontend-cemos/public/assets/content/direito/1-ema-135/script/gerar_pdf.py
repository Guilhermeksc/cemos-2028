import re
import sys
import tempfile
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
        linhas.append(f"V-F {i} - Verdadeiro: {texto_afirmacao}")
        
        # Adicionar afirmação falsa com "Falso" em vermelho
        texto_afirmacao_falsa = str(row.afirmacao_falsa).strip()
        linhas.append(f'<font color="#FF0000"><b>Falso</b></font> - {texto_afirmacao_falsa}')
        
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
    print(f"[DEBUG] montar_markdown_final: processando {len(paginas)} páginas")
    output = []
    paginas_com_vf = 0
    paginas_com_fc = 0
    
    for numero in sorted(paginas.keys()):
        # Adicionar marcador de página no início
        output.append(f"<pagina>{numero}</pagina>")
        output.append("")
        
        bloco_vf = gerar_bloco_vf(df_vf, numero)
        bloco_fc = ""

        if bloco_vf:
            paginas_com_vf += 1
            print(f"[DEBUG] Página {numero}: bloco V-F com {len(bloco_vf)} caracteres")
            # aplicar estilos: V-F x em negrito, "Verdadeiro:" em verde negrito
            bloco_vf = re.sub(r"(V-F \d+)", r"<b>\1</b>", bloco_vf)
            bloco_vf = bloco_vf.replace(
                " - Verdadeiro:",
                ' - <font color="#008000"><b>Verdadeiro:</b></font>'
            )

            output.append(bloco_vf)
            output.append("")

        # Adicionar flashcards se disponível
        if df_fc is not None:
            bloco_fc = gerar_bloco_fc(df_fc, numero)
            if bloco_fc:
                paginas_com_fc += 1
                print(f"[DEBUG] Página {numero}: bloco FC com {len(bloco_fc)} caracteres")
                output.append(bloco_fc)
                output.append("")

        # Adicionar linha tracejada apenas se houver V-F ou flashcards
        if bloco_vf or bloco_fc:
            output.append("<linha_tracejada/>")
            output.append("")

        texto_original = paginas[numero].split("\n", 1)[1]
        tamanho_texto = len(texto_original)
        print(f"[DEBUG] Página {numero}: texto original com {tamanho_texto} caracteres")
        output.append(texto_original)
        output.append("")

    resultado = "\n".join(output)
    print(f"[DEBUG] montar_markdown_final: {paginas_com_vf} páginas com V-F, {paginas_com_fc} páginas com FC")
    print(f"[DEBUG] montar_markdown_final: resultado final com {len(resultado)} caracteres")
    return resultado

def converter_markdown_para_html(texto):
    """
    Converte markdown básico para HTML que o reportlab entende.
    Suporta: **negrito**, *itálico*, (V-F)**texto** (verde negrito), fc**texto** (azul negrito), ## Título (negrito), etc.
    Mantém emojis intactos.
    """
    # PRIMEIRO: Remover tags HTML problemáticas que o reportlab não aceita
    # Remover tags <br> e <br/> (reportlab não aceita <br> com conteúdo)
    texto = re.sub(r'<br\s*/?>', ' ', texto, flags=re.IGNORECASE)
    # Remover tags <para> (reportlab gerencia parágrafos automaticamente)
    texto = re.sub(r'</?para>', '', texto, flags=re.IGNORECASE)
    
    # SEGUNDO: Converter ## Título para <b>Título</b> (exceto ## Página)
    # Isso deve ser feito ANTES de processar outros padrões
    texto = re.sub(
        r'^##\s+(?!Página\s+)(.+)$',
        r'<b>\1</b>',
        texto,
        flags=re.MULTILINE
    )
    
    # TERCEIRO: Converter (V-F)**texto** para verde negrito
    # Isso deve ser feito ANTES de processar **texto** normal
    texto = re.sub(
        r'\(V-F\)\*\*([^*]+?)\*\*',
        r'<font color="#008000"><b>\1</b></font>',
        texto
    )
    
    # QUARTO: Converter fc**texto** para azul negrito
    # Isso deve ser feito ANTES de processar **texto** normal
    # O padrão procura por "fc" seguido imediatamente por **texto**
    texto = re.sub(
        r'fc\*\*([^*]+?)\*\*',
        r'<font color="#0000FF"><b>\1</b></font>',
        texto
    )
    
    # QUINTO: Converter **texto** para <b>texto</b> (negrito markdown normal)
    # Agora só vai pegar os **texto** que não foram processados acima
    texto = re.sub(r'\*\*([^*]+?)\*\*', r'<b>\1</b>', texto)
    
    # SEXTO: Converter *texto* para <i>texto</i> (itálico, apenas se não for **)
    texto = re.sub(r'(?<!\*)\*([^*\n]+?)\*(?!\*)', r'<i>\1</i>', texto)
    
    # Escapar apenas & que não está em entidades HTML já existentes
    # Dividir por tags HTML e entidades para preservá-las
    partes = re.split(r'(<[^>]+>|&[a-zA-Z]+;)', texto)
    resultado = []
    
    for parte in partes:
        if parte.startswith('<') and parte.endswith('>'):
            # Tag HTML - manter como está (mas já removemos <br> e <para> acima)
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


def construir_story(texto, estilo_compacto, estilo_pagina=None):
    """Constrói o story a partir do texto markdown"""
    story = []
    linhas_processadas = 0
    linhas_vazias = 0
    linhas_tracejadas = 0
    linhas_separador = 0
    linhas_paragrafo = 0
    linhas_pagina = 0

    for linha in texto.split("\n"):
        linhas_processadas += 1

        # 0) detectar marcador de página e formatar
        if linha.strip().startswith("<pagina>"):
            linhas_pagina += 1
            if estilo_pagina is not None:
                num = linha.replace("<pagina>", "").replace("</pagina>", "").strip()
                story.append(Paragraph(f"<b>Página {num}</b>", estilo_pagina))
            continue

        # 1) detectar linha tracejada
        if linha.strip() == "<linha_tracejada/>":
            linhas_tracejadas += 1
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
            linhas_separador += 1
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
            linhas_vazias += 1
            story.append(Spacer(1, 2))
            continue

        # 4) converter markdown para HTML e processar texto normal
        linhas_paragrafo += 1
        linha_html = converter_markdown_para_html(linha)
        story.append(Paragraph(linha_html, estilo_compacto))

    print(f"\n[DEBUG] Estatísticas de processamento:")
    print(f"  - Linhas processadas: {linhas_processadas}")
    print(f"  - Linhas vazias: {linhas_vazias}")
    print(f"  - Linhas tracejadas: {linhas_tracejadas}")
    print(f"  - Separadores FC: {linhas_separador}")
    print(f"  - Títulos de página: {linhas_pagina}")
    print(f"  - Parágrafos: {linhas_paragrafo}")
    print(f"  - Total de elementos no story: {len(story)}")
    
    return story


def gerar_pdf(texto, caminho_pdf):
    print(f"\n[DEBUG] Iniciando geração de PDF: {caminho_pdf}")
    print(f"[DEBUG] Tamanho do texto recebido: {len(texto)} caracteres")
    print(f"[DEBUG] Número de linhas no texto: {len(texto.split(chr(10)))} linhas")

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

    # Construir story para contagem de páginas
    story_temp = construir_story(texto, estilo_compacto, estilo_pagina)
    
    if len(story_temp) == 0:
        print("[ERRO] Story está vazio! Nenhum conteúdo para gerar PDF.")
        return

    # Primeira passagem: contar o número total de páginas
    print(f"\n[DEBUG] Contando páginas...")
    temp_path = None
    total_paginas = None
    
    try:
        # Criar arquivo temporário
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_path = temp_file.name
        temp_file.close()
        
        temp_doc = SimpleDocTemplate(
            temp_path,
            pagesize=A4,
            leftMargin=10 * mm,
            rightMargin=10 * mm,
            topMargin=10 * mm,
            bottomMargin=10 * mm,
        )
        temp_doc.build(story_temp)
        
        # Obter o número total de páginas do documento temporário
        try:
            from PyPDF2 import PdfReader
            reader = PdfReader(temp_path)
            total_paginas = len(reader.pages)
            print(f"[DEBUG] Total de páginas detectado (PyPDF2): {total_paginas}")
        except ImportError:
            # Se PyPDF2 não estiver disponível, tentar contar manualmente
            print("[DEBUG] PyPDF2 não disponível, usando método manual...")
            with open(temp_path, 'rb') as f:
                conteudo = f.read()
                total_paginas = conteudo.count(b'/Type/Page')
            print(f"[DEBUG] Total de páginas detectado (método manual): {total_paginas}")
        except Exception as e:
            print(f"[AVISO] Não foi possível contar páginas automaticamente: {e}")
            total_paginas = None
    except Exception as e:
        print(f"[AVISO] Erro ao criar documento temporário para contagem: {e}")
        print("[DEBUG] Continuando sem contagem de páginas...")
        total_paginas = None
    finally:
        # Remover arquivo temporário após ler
        if temp_path and Path(temp_path).exists():
            try:
                Path(temp_path).unlink()
            except Exception as e:
                print(f"[AVISO] Não foi possível remover arquivo temporário: {e}")

    # Função para adicionar paginação no rodapé
    # Usar uma lista para permitir modificação dentro da função (closure)
    total_paginas_ref = [total_paginas]
    
    def adicionar_paginacao(canvas, doc):
        """Adiciona paginação no formato '- X de N -' no rodapé"""
        canvas.saveState()
        
        # Obter número da página atual
        pagina_atual = canvas.getPageNumber()
        
        # Calcular posição Y do rodapé (5mm da margem inferior)
        y_pos = 5 * mm
        
        # Texto da paginação
        if total_paginas_ref[0] is not None:
            texto_paginacao = f"- {pagina_atual} de {total_paginas_ref[0]} -"
        else:
            texto_paginacao = f"- {pagina_atual} -"
        
        # Desenhar texto centralizado
        largura_pagina = A4[0]
        canvas.setFont("Helvetica", 9)
        canvas.drawCentredString(largura_pagina / 2, y_pos, texto_paginacao)
        
        canvas.restoreState()

    # Reconstruir story para o PDF final (o story anterior foi consumido na contagem)
    print(f"\n[DEBUG] Reconstruindo story para PDF final...")
    story = construir_story(texto, estilo_compacto, estilo_pagina)

    print(f"\n[DEBUG] Criando documento PDF...")
    doc = SimpleDocTemplate(
        str(caminho_pdf),
        pagesize=A4,
        leftMargin=10 * mm,
        rightMargin=10 * mm,
        topMargin=10 * mm,
        bottomMargin=15 * mm,  # Aumentar margem inferior para espaço da paginação
    )

    print(f"[DEBUG] Construindo PDF...")
    try:
        doc.build(story, onFirstPage=adicionar_paginacao, onLaterPages=adicionar_paginacao)
        print(f"[DEBUG] PDF construído com sucesso!")
    except Exception as e:
        print(f"[ERRO] Falha ao construir PDF: {e}")
        import traceback
        traceback.print_exc()
        raise



def processar_capitulo(x, base):
    """Processa um único capítulo e gera seu PDF"""
    print(f"\n{'='*60}")
    print(f"PROCESSANDO CAPÍTULO {x}")
    print(f"{'='*60}")
    
    cap_path = base / f"cap{x}.md"
    vf_path = base / f"vf{x}.md"
    fc_path = base / f"fc{x}.md"
    pdf_path = base / f"Cap{x}.pdf"

    # Verificar se os arquivos necessários existem
    if not cap_path.exists():
        print(f"ERRO: Arquivo não encontrado: {cap_path}")
        return False
    
    if not vf_path.exists():
        print(f"ERRO: Arquivo não encontrado: {vf_path}")
        return False

    try:
        print(f"\n=== CARREGANDO CAPÍTULO DE {cap_path} ===")
        cap_conteudo = carregar_capitulo(cap_path)
        print(f"[DEBUG] Capítulo carregado: {len(cap_conteudo)} caracteres")
        
        print(f"\n=== CARREGANDO V-F DE {vf_path} ===")
        df_vf = ler_tabela_markdown(vf_path)
        print(f"[DEBUG] DataFrame V-F: {len(df_vf)} linhas, {len(df_vf.columns)} colunas")
        if len(df_vf) > 0:
            print(f"[DEBUG] Colunas V-F: {df_vf.columns.tolist()}")
        
        paginas = separar_paginas_cap(cap_conteudo)
        print(f"[DEBUG] Páginas separadas: {len(paginas)} páginas")
        print(f"[DEBUG] Números das páginas: {sorted(paginas.keys())}")

        # Tentar carregar flashcards se o arquivo existir
        df_fc = None
        if fc_path.exists():
            print(f"\n=== CARREGANDO FLASHCARDS DE {fc_path} ===")
            df_fc = ler_tabela_markdown(fc_path)
            print(f"[DEBUG] DataFrame FC: {len(df_fc)} linhas, {len(df_fc.columns)} colunas")
            if len(df_fc) > 0:
                print(f"[DEBUG] Colunas FC: {df_fc.columns.tolist()}")
        else:
            print(f"\n=== ARQUIVO {fc_path} NÃO ENCONTRADO. Continuando sem flashcards. ===")

        print(f"\n=== MONTANDO MARKDOWN FINAL ===")
        markdown_final = montar_markdown_final(paginas, df_vf, df_fc)
        print(f"[DEBUG] Markdown final montado: {len(markdown_final)} caracteres")
        print(f"[DEBUG] Primeiras 500 caracteres do markdown:")
        print(markdown_final[:500])
        
        print(f"\n=== GERANDO PDF ===")
        gerar_pdf(markdown_final, pdf_path)

        print(f"\n✅ PDF gerado com sucesso: {pdf_path}")
        if Path(pdf_path).exists():
            tamanho = Path(pdf_path).stat().st_size
            print(f"[DEBUG] Tamanho do arquivo PDF: {tamanho} bytes")
            return True
        else:
            print(f"[ERRO] Arquivo PDF não foi criado!")
            return False
    except Exception as e:
        print(f"\n[ERRO] Falha ao processar capítulo {x}: {e}")
        import traceback
        traceback.print_exc()
        return False


def main():
    # DIGITE OS NÚMEROS DOS CAPÍTULOS AQUI:
    # Pode ser uma string com números separados por vírgula: "1,2,3,4"
    # Ou uma lista: ["1", "2", "3", "4"]
    # Ou um único número: "14"
    numeros_capitulos = "1,2,3,4,5,6,7,8,9,10,11,12,13,14"  # ← ALTERE ESTE VALOR
    
    # Usar o diretório do script atual
    base = Path(__file__).parent.resolve()
    print(f"\n=== DIRETÓRIO DE TRABALHO: {base} ===")
    
    # Processar a string de números para lista
    if isinstance(numeros_capitulos, str):
        # Remover espaços e dividir por vírgula
        numeros = [x.strip() for x in numeros_capitulos.split(",") if x.strip()]
    elif isinstance(numeros_capitulos, list):
        numeros = [str(x).strip() for x in numeros_capitulos if str(x).strip()]
    else:
        # Se for um único número, converter para lista
        numeros = [str(numeros_capitulos).strip()]
    
    print(f"\n=== PROCESSANDO {len(numeros)} CAPÍTULO(S) ===")
    print(f"Capítulos: {', '.join(numeros)}")
    
    # Processar cada capítulo
    sucessos = 0
    falhas = 0
    
    for x in numeros:
        if processar_capitulo(x, base):
            sucessos += 1
        else:
            falhas += 1
    
    # Resumo final
    print(f"\n{'='*60}")
    print(f"RESUMO FINAL")
    print(f"{'='*60}")
    print(f"Total de capítulos processados: {len(numeros)}")
    print(f"✅ Sucessos: {sucessos}")
    print(f"❌ Falhas: {falhas}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
