from __future__ import annotations

import re
import shutil
import subprocess
from pathlib import Path
from typing import Dict, Tuple

BASE_DIR = Path(__file__).resolve().parent
OUTPUT_FILE = BASE_DIR / "audio_final.mp3"

DELAY_SPEAKER1_S = 0
DELAY_SPEAKER2_S = 0.3

PATTERN = re.compile(r"^linha_(\d{4})_speaker([12])\.mp3$", re.IGNORECASE)


def coletar_audios(base_dir: Path) -> Dict[int, Tuple[Path, Path]]:
    pares: Dict[int, Tuple[Path, Path]] = {}

    for arquivo in base_dir.iterdir():
        if not arquivo.is_file():
            continue
        match = PATTERN.match(arquivo.name)
        if not match:
            continue

        linha = int(match.group(1))
        speaker = int(match.group(2))
        atual = pares.get(linha, (None, None))
        if speaker == 1:
            pares[linha] = (arquivo, atual[1])
        else:
            pares[linha] = (atual[0], arquivo)

    return pares


def _run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def _criar_silencio(destino: Path, duracao_s: int) -> None:
    if destino.exists():
        return
    _run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "lavfi",
            "-i",
            "anullsrc=r=44100:cl=stereo",
            "-t",
            str(duracao_s),
            "-q:a",
            "9",
            "-acodec",
            "libmp3lame",
            str(destino),
        ]
    )


def _escrever_lista_concat(arquivos: list[Path], destino: Path) -> None:
    def _escape(path: Path) -> str:
        return str(path).replace("'", "'\\''")

    linhas = [f"file '{_escape(p)}'" for p in arquivos]
    destino.write_text("\n".join(linhas), encoding="utf-8")


def main() -> None:
    if shutil.which("ffmpeg") is None:
        raise SystemExit("ffmpeg não encontrado no PATH. Instale o ffmpeg para continuar.")

    pares = coletar_audios(BASE_DIR)
    if not pares:
        raise SystemExit("Nenhum áudio encontrado com o padrão linha_XXXX_speaker[1|2].mp3")

    # silencio_1s = BASE_DIR / "_silencio_1s.mp3"
    silencio_2s = BASE_DIR / "_silencio_2s.mp3"
    # _criar_silencio(silencio_1s, DELAY_SPEAKER1_S)
    _criar_silencio(silencio_2s, DELAY_SPEAKER2_S)

    sequencia: list[Path] = []
    for linha in sorted(pares.keys()):
        speaker1, speaker2 = pares[linha]
        if speaker1 is None or speaker2 is None:
            raise SystemExit(f"Linha {linha:04d} incompleta (speaker1/speaker2 ausente).")

        sequencia.append(speaker1)
        # sequencia.append(silencio_1s)
        sequencia.append(speaker2)
        sequencia.append(silencio_2s)

    lista_concat = BASE_DIR / "_concat_list.txt"
    _escrever_lista_concat([p.resolve() for p in sequencia], lista_concat)

    try:
        _run(
            [
                "ffmpeg",
                "-y",
                "-f",
                "concat",
                "-safe",
                "0",
                "-i",
                str(lista_concat),
                "-c:a",
                "libmp3lame",
                "-q:a",
                "2",
                str(OUTPUT_FILE),
            ]
        )
    finally:
        if lista_concat.exists():
            lista_concat.unlink()


if __name__ == "__main__":
    main()
