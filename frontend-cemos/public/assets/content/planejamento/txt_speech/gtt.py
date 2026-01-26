from google.cloud import texttospeech
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

def sintetizar(
    texto: str,
    nome_arquivo: str,
    voz: str,
    genero: texttospeech.SsmlVoiceGender
) -> None:
    client = texttospeech.TextToSpeechClient()

    synthesis_input = texttospeech.SynthesisInput(text=texto)

    voice = texttospeech.VoiceSelectionParams(
        language_code="pt-BR",
        name=voz,
        ssml_gender=genero
    )

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    response = client.synthesize_speech(
        input=synthesis_input,
        voice=voice,
        audio_config=audio_config
    )

    caminho = BASE_DIR / nome_arquivo
    caminho.write_bytes(response.audio_content)


if __name__ == "__main__":
    # Speaker 1 (masculino)
    sintetizar(
        texto="comdêciber ou Comdêçiber, ou comando de defesa cibernética Comdêçibe?",
        nome_arquivo="speaker1.mp3",
        voz="pt-BR-Chirp3-HD-Iapetus",
        genero=texttospeech.SsmlVoiceGender.MALE
    )

    # # Speaker 2 (feminino)
    # sintetizar(
    #     texto="cêmqifa",
    #     nome_arquivo="speaker2.mp3",
    #     voz="pt-BR-Chirp3-HD-Laomedeia",
    #     genero=texttospeech.SsmlVoiceGender.FEMALE
    # )
