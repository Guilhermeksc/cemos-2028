from rest_framework import serializers


class PdfDownloadEventSerializer(serializers.Serializer):
    simulado_nome = serializers.CharField(max_length=255)
    origem = serializers.ChoiceField(choices=["preset", "custom", "desconhecida"])
    bibliografias = serializers.ListField(
        child=serializers.IntegerField(min_value=1),
        allow_empty=True,
        required=False,
        default=list,
    )
    total_questoes = serializers.IntegerField(min_value=0)

