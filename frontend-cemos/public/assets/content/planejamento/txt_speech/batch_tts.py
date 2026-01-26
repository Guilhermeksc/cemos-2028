from __future__ import annotations

import argparse
from pathlib import Path
from typing import Iterable, Tuple

import pandas as pd

try:
    from google.cloud import texttospeech
except ModuleNotFoundError as exc:
    raise SystemExit(
        "Dependência ausente: google-cloud-texttospeech. "
        "Use o mesmo interpretador/ambiente em que o gtt.py funciona."
    ) from exc

BASE_DIR = Path(__file__).resolve().parent

SUBSTITUICOES_FONETICAS = {
    "(ZD)": "",
    "(ZC)": "",
    "(ZA)": "",
    "(ZI)": "",
    "CEMCFA": "Cêmqifa",  # Deve vir antes de "EMCFA" para evitar substituição parcial
    "PEECFA": "pecfa",
    "EMCFA": "Êmqifa",
    "CHOC": "chóqe",
    "DPED": "depéde",
    "DMED": "deméde",
    "DPEM": "depém",
    "C Mi D": "cemîde",
    "CMiD": "cemîde",
    "CAE": "caê",
    "CHELOG": "chêlog",
    "ComTO": "Comando do Teatro de Operações",
    "EMCj": "Estado-Maior Conjunto",
    "ComDCiber": "Comdêciber",
    "COMAE": "cômae",
    "Cmdo TO": "Comando do Teatro de Operações",
    "Cmdo A Op": "Comando da Área de Operações",
    "Cmdo ZD": "Comando da Zona de Defesa",
    "ComTO": "Comando do Teatro de Operações",
    "EMCj": "Estado-Maior Conjunto",
    "ZD": "Zona de Defesa",
    "ZC": "Zona de Combate",
    "ZA": "Zona de Administração",
    "ZI": "Zona do Interior",
    "EFD": "Estado Final Desejado",
    "FNC": "éfiêniçê",
    "FTC": "éfiêniçê",
    "FAC": "fáqi",
    "F Cj Cte": "Força Conjunta Componente",
    "FT Cj Cte": "Força-Tarefa Conjunta Componente",
    "DIPLAN": "dîplan",
    " LA ": "eliá",
    "(LA)": "",
    "CPO": "cepeó",
    "Op Esp": "operação especial",
}

SPEAKER_1_VOICE = "pt-BR-Chirp3-HD-Iapetus"
SPEAKER_2_VOICE = "pt-BR-Chirp3-HD-Laomedeia"


def aplicar_fonetica(texto: str) -> str:
    # Ordena por tamanho (mais longos primeiro) para evitar substituições parciais
    substituicoes_ordenadas = sorted(
        SUBSTITUICOES_FONETICAS.items(),
        key=lambda x: len(x[0]),
        reverse=True
    )
    for termo, fonetica in substituicoes_ordenadas:
        texto = texto.replace(termo, fonetica)
    return texto


def limpar_texto(valor: object) -> str:
    texto = str(valor).strip()
    if "&10" in texto:
        print(f"Encontrado #&10 em: {texto}")
    texto = texto.replace("#&10", " ")
    texto = texto.replace("\r\n", " ").replace("\n", " ").replace("\r", " ")
    texto = aplicar_fonetica(texto)
    return texto.strip()


def sintetizar(
    client: texttospeech.TextToSpeechClient,
    texto: str,
    nome_arquivo: str,
    voz: str,
    genero: texttospeech.SsmlVoiceGender,
) -> None:
    synthesis_input = texttospeech.SynthesisInput(text=texto)

    voice = texttospeech.VoiceSelectionParams(
        language_code="pt-BR",
        name=voz,
        ssml_gender=genero,
    )

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3,
    )

    response = client.synthesize_speech(
        input=synthesis_input,
        voice=voice,
        audio_config=audio_config,
    )

    caminho = BASE_DIR / nome_arquivo
    caminho.write_bytes(response.audio_content)


def carregar_linhas(
    arquivo_entrada: Path,
    start: int,
    end: int,
) -> Iterable[Tuple[int, str, str]]:
    df = pd.read_excel(arquivo_entrada)

    if df.shape[1] < 2:
        raise ValueError("A planilha precisa ter pelo menos 2 colunas (pergunta e resposta).")

    total = len(df)
    if start < 1 or end < 1 or start > end:
        raise ValueError("Intervalo inválido. Use índices 1-based e start <= end.")

    if start > total:
        return []

    end = min(end, total)

    for offset, idx in enumerate(range(start - 1, end)):
        row = df.iloc[idx]
        pergunta = limpar_texto(row.iloc[0])
        resposta = limpar_texto(row.iloc[1])
        linha_num = start + offset
        yield linha_num, pergunta, resposta


def gerar_audios(
    arquivo_entrada: Path,
    start: int,
    end: int,
    output_dir: Path,
    modo: str = "ambos",
) -> None:
    client = texttospeech.TextToSpeechClient()
    output_dir.mkdir(parents=True, exist_ok=True)

    for linha_num, pergunta, resposta in carregar_linhas(arquivo_entrada, start, end):
        nome_pergunta = output_dir / f"linha_{linha_num:04d}_speaker1.mp3"
        nome_resposta = output_dir / f"linha_{linha_num:04d}_speaker2.mp3"

        if modo in {"ambos", "perguntas"}:
            sintetizar(
                client=client,
                texto=pergunta,
                nome_arquivo=str(nome_pergunta.relative_to(BASE_DIR)),
                voz=SPEAKER_1_VOICE,
                genero=texttospeech.SsmlVoiceGender.MALE,
            )

        if modo in {"ambos", "respostas"}:
            sintetizar(
                client=client,
                texto=resposta,
                nome_arquivo=str(nome_resposta.relative_to(BASE_DIR)),
                voz=SPEAKER_2_VOICE,
                genero=texttospeech.SsmlVoiceGender.FEMALE,
            )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Gera áudios por linha da tabela.xlsx (pergunta=Speaker 1, resposta=Speaker 2).",
    )
    parser.add_argument(
        "--start",
        type=int,
        required=False,
        default=None,
        help="Linha inicial (1-based) da tabela.xlsx.",
    )
    parser.add_argument(
        "--end",
        type=int,
        required=False,
        default=None,
        help="Linha final (1-based) da tabela.xlsx.",
    )
    parser.add_argument(
        "--input",
        type=Path,
        default=None,
        help="Caminho para tabela.xlsx.",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=None,
        help="Diretório de saída dos MP3.",
    )
    return parser.parse_args()


if __name__ == "__main__":
    # Parâmetros hardcoded (ajuste conforme necessário)
    START = 19
    END = 21
    INPUT_FILE = BASE_DIR / "tabela.xlsx"
    OUTPUT_DIR = BASE_DIR / "audios"
    MODO = "respostas"  # "perguntas", "respostas" ou "ambos"

    gerar_audios(
        arquivo_entrada=INPUT_FILE,
        start=START,
        end=END,
        output_dir=OUTPUT_DIR,
        modo=MODO,
    )
