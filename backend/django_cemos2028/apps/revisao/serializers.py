from rest_framework import serializers
from .models import (
    ProjetoEstudo, Materia, Capitulo, SessaoEstudo, Revisao
)


class RevisaoSerializer(serializers.ModelSerializer):
    """Serializer para Revisão"""
    class Meta:
        model = Revisao
        fields = "__all__"
        read_only_fields = ("intervalo_dias",)


class SessaoEstudoSerializer(serializers.ModelSerializer):
    """Serializer para Sessão de Estudo com revisões aninhadas"""
    revisoes = RevisaoSerializer(many=True, read_only=True)
    capitulo_titulo = serializers.CharField(
        source="capitulo.titulo",
        read_only=True
    )
    materia_nome = serializers.CharField(
        source="capitulo.materia.nome",
        read_only=True
    )

    class Meta:
        model = SessaoEstudo
        fields = "__all__"


class CapituloSerializer(serializers.ModelSerializer):
    """Serializer para Capítulo"""
    materia_nome = serializers.CharField(
        source="materia.nome",
        read_only=True
    )
    total_sessoes = serializers.SerializerMethodField()

    class Meta:
        model = Capitulo
        fields = "__all__"

    def get_total_sessoes(self, obj):
        return obj.sessoes.count()


class MateriaSerializer(serializers.ModelSerializer):
    """Serializer para Matéria com capítulos aninhados"""
    capitulos = CapituloSerializer(many=True, read_only=True)
    total_capitulos = serializers.SerializerMethodField()

    class Meta:
        model = Materia
        fields = "__all__"

    def get_total_capitulos(self, obj):
        return obj.capitulos.count()


class ProjetoEstudoSerializer(serializers.ModelSerializer):
    """Serializer para Projeto de Estudo com matérias aninhadas"""
    materias = MateriaSerializer(many=True, read_only=True)
    usuario_username = serializers.CharField(
        source="usuario.username",
        read_only=True
    )

    class Meta:
        model = ProjetoEstudo
        fields = "__all__"
        read_only_fields = ("usuario", "criado_em", "atualizado_em")


class ProjetoEstudoCreateSerializer(serializers.ModelSerializer):
    """Serializer para criação de Projeto de Estudo"""
    total_passadas = serializers.IntegerField(
        default=3,
        write_only=True,
        required=False,
        help_text="Número de passadas a serem geradas (padrão: 3)"
    )
    materias = serializers.ListField(
        child=serializers.DictField(),
        write_only=True,
        required=False,
        help_text="Lista de matérias a serem criadas para o projeto"
    )

    class Meta:
        model = ProjetoEstudo
        fields = ["nome", "data_inicio", "minutos_diarios", "ativo", "total_passadas", "materias"]
        read_only_fields = ("usuario", "criado_em", "atualizado_em")

    def create(self, validated_data):
        # Remove campos auxiliares dos dados validados antes de criar o objeto
        validated_data.pop("total_passadas", None)
        validated_data.pop("materias", None)  # Será processado na view
        return super().create(validated_data)

