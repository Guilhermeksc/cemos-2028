from google.cloud import texttospeech

client = texttospeech.TextToSpeechClient()
voices = client.list_voices(language_code="pt-BR")

for v in voices.voices:
    print(v.name, v.ssml_gender)
