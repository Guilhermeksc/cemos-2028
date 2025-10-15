from rest_framework import serializers
from .models import (
    BibliografiaModel, 
    PerguntaMultiplaModel, 
    PerguntaVFModel, 
    PerguntaCorrelacaoModel,
    PerguntasModel
)


class BibliografiaSerializer(serializers.ModelSerializer):
    perguntas_count = serializers.SerializerMethodField()
    
    class Meta:
        model = BibliografiaModel
        fields = [
            'id', 'titulo', 'autor', 'materia', 'ano_publicacao', 'descricao',
            'created_at', 'updated_at', 'perguntas_count'
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def get_perguntas_count(self, obj):
        """Retorna o número total de perguntas desta bibliografia"""
        return obj.perguntas.count()


class PerguntaMultiplaSerializer(serializers.ModelSerializer):
    bibliografia_titulo = serializers.CharField(source='bibliografia.titulo', read_only=True)
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    resposta_correta_display = serializers.CharField(source='get_resposta_correta_display', read_only=True)
    
    class Meta:
        model = PerguntaMultiplaModel
        fields = [
            'id', 'bibliografia', 'bibliografia_titulo', 'caiu_em_prova', 'ano_prova',
            'pergunta', 'alternativa_a', 'alternativa_b', 'alternativa_c', 'alternativa_d',
            'resposta_correta', 'resposta_correta_display', 'justificativa_resposta_certa',
            'tipo', 'tipo_display', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at', 'tipo']
    
    def validate_resposta_correta(self, value):
        """Valida se a resposta correta está entre as opções válidas"""
        if value not in ['a', 'b', 'c', 'd']:
            raise serializers.ValidationError("Resposta correta deve ser 'a', 'b', 'c' ou 'd'")
        return value


class PerguntaVFSerializer(serializers.ModelSerializer):
    bibliografia_titulo = serializers.CharField(source='bibliografia.titulo', read_only=True)
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    resposta_correta_display = serializers.SerializerMethodField()
    
    class Meta:
        model = PerguntaVFModel
        fields = [
            'id', 'bibliografia', 'bibliografia_titulo', 'caiu_em_prova', 'ano_prova',
            'pergunta', 'afirmacao', 'resposta_correta', 'resposta_correta_display',
            'justificativa_resposta_certa', 'tipo', 'tipo_display', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at', 'tipo']
    
    def get_resposta_correta_display(self, obj):
        """Retorna 'Verdadeiro' ou 'Falso' ao invés de True/False"""
        return "Verdadeiro" if obj.resposta_correta else "Falso"


class PerguntaCorrelacaoSerializer(serializers.ModelSerializer):
    bibliografia_titulo = serializers.CharField(source='bibliografia.titulo', read_only=True)
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    
    class Meta:
        model = PerguntaCorrelacaoModel
        fields = [
            'id', 'bibliografia', 'bibliografia_titulo', 'caiu_em_prova', 'ano_prova',
            'pergunta', 'coluna_a', 'coluna_b', 'resposta_correta',
            'justificativa_resposta_certa', 'tipo', 'tipo_display', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at', 'tipo']
    
    def validate_coluna_a(self, value):
        """Valida se coluna_a é uma lista"""
        if not isinstance(value, list):
            raise serializers.ValidationError("Coluna A deve ser uma lista de itens")
        if len(value) == 0:
            raise serializers.ValidationError("Coluna A não pode estar vazia")
        return value
    
    def validate_coluna_b(self, value):
        """Valida se coluna_b é uma lista"""
        if not isinstance(value, list):
            raise serializers.ValidationError("Coluna B deve ser uma lista de itens")
        if len(value) == 0:
            raise serializers.ValidationError("Coluna B não pode estar vazia")
        return value
    
    def validate_resposta_correta(self, value):
        """Valida se resposta_correta é um dicionário válido"""
        if not isinstance(value, dict):
            raise serializers.ValidationError("Resposta correta deve ser um dicionário de pares")
        return value


class PerguntaResumoSerializer(serializers.Serializer):
    """Serializer para resumo de perguntas (usado em listagens)"""
    id = serializers.IntegerField()
    tipo = serializers.CharField()
    tipo_display = serializers.CharField()
    bibliografia_titulo = serializers.CharField()
    pergunta = serializers.CharField()
    caiu_em_prova = serializers.BooleanField()
    ano_prova = serializers.IntegerField()
    created_at = serializers.DateTimeField()


# Serializers para criação/edição
class BibliografiaCreateUpdateSerializer(BibliografiaSerializer):
    """Serializer específico para criação e edição de bibliografia"""
    class Meta(BibliografiaSerializer.Meta):
        fields = ['titulo', 'autor', 'materia', 'ano_publicacao', 'descricao']


class PerguntaMultiplaCreateUpdateSerializer(PerguntaMultiplaSerializer):
    """Serializer específico para criação e edição de pergunta múltipla escolha"""
    class Meta(PerguntaMultiplaSerializer.Meta):
        fields = [
            'bibliografia', 'caiu_em_prova', 'ano_prova', 'pergunta',
            'alternativa_a', 'alternativa_b', 'alternativa_c', 'alternativa_d',
            'resposta_correta', 'justificativa_resposta_certa'
        ]


class PerguntaVFCreateUpdateSerializer(PerguntaVFSerializer):
    """Serializer específico para criação e edição de pergunta V/F"""
    class Meta(PerguntaVFSerializer.Meta):
        fields = [
            'bibliografia', 'caiu_em_prova', 'ano_prova', 'pergunta',
            'afirmacao', 'resposta_correta', 'justificativa_resposta_certa'
        ]


class PerguntaCorrelacaoCreateUpdateSerializer(PerguntaCorrelacaoSerializer):
    """Serializer específico para criação e edição de pergunta de correlação"""
    class Meta(PerguntaCorrelacaoSerializer.Meta):
        fields = [
            'bibliografia', 'caiu_em_prova', 'ano_prova', 'pergunta',
            'coluna_a', 'coluna_b', 'resposta_correta', 'justificativa_resposta_certa'
        ]
