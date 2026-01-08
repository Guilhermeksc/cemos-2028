from rest_framework import serializers
from .models import (
    PresidentesModel,
    FilosofosModel,
    CronologiaModel,
    ConceitosModel,
    HiperlinksModel
)


class PresidentesSerializer(serializers.ModelSerializer):
    bibliografia_titulo = serializers.CharField(source='bibliografia.titulo', read_only=True)
    
    class Meta:
        model = PresidentesModel
        fields = [
            'id', 'bibliografia', 'bibliografia_titulo', 'periodo_presidencial', 
            'presidente', 'pais', 'conflitos_principais', 'imagem_caminho'
        ]


class FilosofosSerializer(serializers.ModelSerializer):
    bibliografia_titulo = serializers.CharField(source='bibliografia.titulo', read_only=True)
    
    class Meta:
        model = FilosofosModel
        fields = [
            'id', 'bibliografia', 'bibliografia_titulo', 'periodo_filosofico', 
            'nome', 'principais_ideias', 'imagem_caminho'
        ]


class CronologiaSerializer(serializers.ModelSerializer):
    bibliografia_titulo = serializers.CharField(source='bibliografia.titulo', read_only=True)
    
    class Meta:
        model = CronologiaModel
        fields = [
            'id', 'bibliografia', 'bibliografia_titulo', 'evento_conflito', 
            'periodo', 'principais_forcas', 'resultado', 'consequencias'
        ]


class ConceitosSerializer(serializers.ModelSerializer):
    bibliografia_titulo = serializers.CharField(source='bibliografia.titulo', read_only=True)
    assunto_titulo = serializers.CharField(source='assunto.titulo', read_only=True, allow_null=True)
    
    class Meta:
        model = ConceitosModel
        fields = [
            'id', 'bibliografia', 'bibliografia_titulo', 'titulo', 'palavra_chave', 'assunto',
            'assunto_titulo', 'descricao', 'caiu_em_prova', 'ano_prova'
        ]


class HiperlinksSerializer(serializers.ModelSerializer):
    bibliografia_titulo = serializers.CharField(source='bibliografia.titulo', read_only=True)
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    
    class Meta:
        model = HiperlinksModel
        fields = [
            'id', 'bibliografia', 'bibliografia_titulo', 'tipo', 
            'tipo_display', 'descricao', 'url'
        ]


# Serializers para criação/edição
class PresidentesCreateUpdateSerializer(PresidentesSerializer):
    """Serializer específico para criação e edição de presidentes"""
    class Meta(PresidentesSerializer.Meta):
        fields = ['bibliografia', 'periodo_presidencial', 'presidente', 'pais', 'conflitos_principais', 'imagem_caminho']


class FilosofosCreateUpdateSerializer(FilosofosSerializer):
    """Serializer específico para criação e edição de filósofos"""
    class Meta(FilosofosSerializer.Meta):
        fields = ['bibliografia', 'periodo_filosofico', 'nome', 'principais_ideias', 'imagem_caminho']


class CronologiaCreateUpdateSerializer(CronologiaSerializer):
    """Serializer específico para criação e edição de cronologia"""
    class Meta(CronologiaSerializer.Meta):
        fields = ['bibliografia', 'evento_conflito', 'periodo', 'principais_forcas', 'resultado', 'consequencias']


class ConceitosCreateUpdateSerializer(ConceitosSerializer):
    """Serializer específico para criação e edição de conceitos"""
    class Meta(ConceitosSerializer.Meta):
        fields = ['bibliografia', 'titulo', 'palavra_chave', 'assunto', 'descricao', 'caiu_em_prova', 'ano_prova']


class HiperlinksCreateUpdateSerializer(HiperlinksSerializer):
    """Serializer específico para criação e edição de hiperlinks"""
    class Meta(HiperlinksSerializer.Meta):
        fields = ['bibliografia', 'tipo', 'descricao', 'url']
    
    def validate_url(self, value):
        """Valida se a URL é válida"""
        if not value.startswith(('http://', 'https://')):
            raise serializers.ValidationError("URL deve começar com http:// ou https://")
        return value
