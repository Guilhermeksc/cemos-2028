from rest_framework import serializers
from .models import BibliografiaModel, MateriaModel, CapitulosBibliografiaModel


class MateriaSerializer(serializers.ModelSerializer):
    """Serializer básico para matérias."""

    class Meta:
        model = MateriaModel
        fields = ['id', 'materia']
        read_only_fields = ['id']


class CapitulosBibliografiaSerializer(serializers.ModelSerializer):
    """Serializer para capítulos associados a uma bibliografia."""
    bibliografia_titulo = serializers.CharField(source='bibliografia.titulo', read_only=True)

    class Meta:
        model = CapitulosBibliografiaModel
        fields = ['id', 'bibliografia', 'bibliografia_titulo', 'capitulo_titulo']
        read_only_fields = ['id']


class BibliografiaSerializer(serializers.ModelSerializer):
    materia_nome = serializers.CharField(source='materia.materia', read_only=True, allow_null=True)

    class Meta:
        model = BibliografiaModel
        fields = ['id', 'titulo', 'autor', 'materia', 'materia_nome', 'descricao']
        read_only_fields = ['id']


class BibliografiaCreateUpdateSerializer(BibliografiaSerializer):
    """Serializer específico para criação e edição de bibliografia."""

    class Meta(BibliografiaSerializer.Meta):
        fields = ['titulo', 'autor', 'materia', 'descricao']
