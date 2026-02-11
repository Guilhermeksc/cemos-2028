from pathlib import Path

from django.conf import settings
from rest_framework import serializers
from django_cemos2028.apps.bibliografia.models import BibliografiaModel, CapitulosBibliografiaModel
from .models import (
    FlashCardsModel,
    PerguntaMultiplaModel, 
    PerguntaVFModel, 
    PerguntaCorrelacaoModel,
    RespostaUsuario,
    QuestaoErradaAnonima,
    QuestaoOmitida
)


class FlashCardsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    bibliografia_titulo = serializers.CharField(source='bibliografia.titulo', read_only=True)
    assunto_titulo = serializers.CharField(source='assunto.capitulo_titulo', read_only=True, allow_null=True)
    
    class Meta:
        model = FlashCardsModel
        fields = [
            'id', 'bibliografia', 'bibliografia_titulo', 
            'pergunta', 'resposta', 'assunto', 'assunto_titulo', 'prova', 'ano', 'caveira'
        ]
        read_only_fields = ['id']


class PerguntaMultiplaSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    bibliografia_titulo = serializers.CharField(source='bibliografia.titulo', read_only=True)
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    resposta_correta_display = serializers.CharField(source='get_resposta_correta_display', read_only=True)
    assunto_titulo = serializers.CharField(source='assunto.capitulo_titulo', read_only=True, allow_null=True)
    markdown_highlights = serializers.JSONField(required=False, allow_null=True)
    
    class Meta:
        model = PerguntaMultiplaModel
        fields = [
            'id', 'bibliografia', 'bibliografia_titulo', 'paginas', 'assunto', 'assunto_titulo', 'caiu_em_prova', 'ano_prova', 'caveira',
            'pergunta', 'alternativa_a', 'alternativa_b', 'alternativa_c', 'alternativa_d',
            'resposta_correta', 'resposta_correta_display', 'justificativa_resposta_certa',
            'tipo', 'tipo_display', 'markdown_file', 'markdown_highlights'
        ]
        read_only_fields = ['tipo']
    
    def validate_resposta_correta(self, value):
        """Valida se a resposta correta está entre as opções válidas"""
        if value not in ['a', 'b', 'c', 'd']:
            raise serializers.ValidationError("Resposta correta deve ser 'a', 'b', 'c' ou 'd'")
        return value


class PerguntaVFSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    bibliografia_titulo = serializers.CharField(source='bibliografia.titulo', read_only=True)
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    resposta_correta = serializers.ReadOnlyField()
    resposta_correta_display = serializers.SerializerMethodField()
    assunto_titulo = serializers.CharField(source='assunto.capitulo_titulo', read_only=True, allow_null=True)
    markdown_highlights = serializers.JSONField(required=False, allow_null=True)
    
    class Meta:
        model = PerguntaVFModel
        fields = [
            'id', 'bibliografia', 'bibliografia_titulo', 'paginas', 'assunto', 'assunto_titulo', 'caiu_em_prova', 'ano_prova', 'caveira',
            'pergunta', 'afirmacao_verdadeira', 'afirmacao_falsa', 'resposta_correta', 'resposta_correta_display',
            'justificativa_resposta_certa', 'tipo', 'tipo_display', 'markdown_file', 'markdown_highlights'
        ]
        read_only_fields = ['tipo', 'resposta_correta']
    
    def get_resposta_correta_display(self, obj):
        """Retorna 'Verdadeiro' pois a afirmacao_verdadeira é sempre a correta"""
        return "Verdadeiro"


class PerguntaCorrelacaoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    bibliografia_titulo = serializers.CharField(source='bibliografia.titulo', read_only=True)
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    assunto_titulo = serializers.CharField(source='assunto.capitulo_titulo', read_only=True, allow_null=True)
    markdown_highlights = serializers.JSONField(required=False, allow_null=True)
    
    class Meta:
        model = PerguntaCorrelacaoModel
        fields = [
            'id', 'bibliografia', 'bibliografia_titulo', 'paginas', 'assunto', 'assunto_titulo', 'caiu_em_prova', 'ano_prova', 'caveira',
            'pergunta', 'coluna_a', 'coluna_b', 'resposta_correta',
            'justificativa_resposta_certa', 'tipo', 'tipo_display', 'markdown_file', 'markdown_highlights'
        ]
        read_only_fields = ['tipo']
    
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
    paginas = serializers.CharField()
    assunto = serializers.IntegerField(allow_null=True)
    assunto_titulo = serializers.CharField(allow_null=True)
    caiu_em_prova = serializers.BooleanField()
    ano_prova = serializers.IntegerField()
    caveira = serializers.BooleanField()



class PerguntaMultiplaCreateUpdateSerializer(PerguntaMultiplaSerializer):
    """Serializer específico para criação e edição de pergunta múltipla escolha"""
    class Meta(PerguntaMultiplaSerializer.Meta):
        fields = [
            'bibliografia', 'paginas', 'assunto', 'caiu_em_prova', 'ano_prova', 'caveira', 'pergunta',
            'alternativa_a', 'alternativa_b', 'alternativa_c', 'alternativa_d',
            'resposta_correta', 'justificativa_resposta_certa', 'markdown_file', 'markdown_highlights'
        ]
    
    def create(self, validated_data):
        """Cria uma nova pergunta múltipla escolha com ID gerado automaticamente"""
        from django.db.models import Max
        
        # Obter o maior ID existente e adicionar 1
        max_id = PerguntaMultiplaModel.objects.aggregate(max_id=Max('id'))['max_id']
        next_id = (max_id or 0) + 1
        
        # Criar instância com o ID gerado
        validated_data['id'] = next_id
        return super().create(validated_data)


class PerguntaVFCreateUpdateSerializer(PerguntaVFSerializer):
    """Serializer específico para criação e edição de pergunta V/F"""
    class Meta(PerguntaVFSerializer.Meta):
        fields = [
            'bibliografia', 'paginas', 'assunto', 'caiu_em_prova', 'ano_prova', 'caveira', 'pergunta',
            'afirmacao_verdadeira', 'afirmacao_falsa', 'justificativa_resposta_certa', 'markdown_file', 'markdown_highlights'
        ]
    
    def create(self, validated_data):
        """Cria uma nova pergunta VF com ID gerado automaticamente"""
        from django.db.models import Max
        from .models import PerguntaVFModel
        
        # Obter o maior ID existente e adicionar 1
        max_id = PerguntaVFModel.objects.aggregate(max_id=Max('id'))['max_id']
        next_id = (max_id or 0) + 1
        
        # Criar instância com o ID gerado
        validated_data['id'] = next_id
        return super().create(validated_data)


class PerguntaCorrelacaoCreateUpdateSerializer(PerguntaCorrelacaoSerializer):
    """Serializer específico para criação e edição de pergunta de correlação"""
    class Meta(PerguntaCorrelacaoSerializer.Meta):
        fields = [
            'bibliografia', 'paginas', 'assunto', 'caiu_em_prova', 'ano_prova', 'caveira', 'pergunta',
            'coluna_a', 'coluna_b', 'resposta_correta', 'justificativa_resposta_certa', 'markdown_file', 'markdown_highlights'
        ]
    
    def create(self, validated_data):
        """Cria uma nova pergunta de correlação com ID gerado automaticamente"""
        from django.db.models import Max
        
        # Obter o maior ID existente e adicionar 1
        max_id = PerguntaCorrelacaoModel.objects.aggregate(max_id=Max('id'))['max_id']
        next_id = (max_id or 0) + 1
        
        # Criar instância com o ID gerado
        validated_data['id'] = next_id
        return super().create(validated_data)


class FlashCardsCreateUpdateSerializer(FlashCardsSerializer):
    """Serializer específico para criação e edição de flash cards"""
    class Meta(FlashCardsSerializer.Meta):
        fields = ['bibliografia', 'pergunta', 'resposta', 'assunto', 'prova', 'ano', 'caveira']


class RespostaUsuarioSerializer(serializers.ModelSerializer):
    pergunta_id = serializers.IntegerField()
    usuario_username = serializers.CharField(source='usuario.username', read_only=True)
    assunto_titulo = serializers.CharField(source='assunto.capitulo_titulo', read_only=True, allow_null=True)
    
    class Meta:
        model = RespostaUsuario
        fields = [
            'id',
            'usuario',
            'usuario_username',
            'pergunta_id',
            'pergunta_tipo',
            'resposta_usuario',
            'acertou',
            'timestamp',
            'bibliografia_id',
            'assunto',
            'assunto_titulo'
        ]
        read_only_fields = ['id', 'timestamp']

class RespostaUsuarioCreateSerializer(serializers.ModelSerializer):
    pergunta_id = serializers.IntegerField()
    afirmacao_sorteada_eh_verdadeira = serializers.BooleanField(required=False, allow_null=True, write_only=True)
    acertou = serializers.BooleanField(required=False, write_only=True)
    
    class Meta:
        model = RespostaUsuario
        fields = [
            'pergunta_id',
            'pergunta_tipo',
            'resposta_usuario',
            'bibliografia_id',
            'assunto',
            'afirmacao_sorteada_eh_verdadeira',
            'acertou'  # Incluído mas será ignorado se não vier do cliente
        ]
    
    def create(self, validated_data):
        # Remover campo auxiliar antes de salvar (não é um campo do modelo)
        validated_data.pop('afirmacao_sorteada_eh_verdadeira', None)
        # O usuário é automaticamente definido pelo request.user
        validated_data['usuario'] = self.context['request'].user
        # acertou será definido na view antes de chamar create()
        # Se não estiver em validated_data, será None e causará erro, então garantimos que está
        return super().create(validated_data)


class QuestaoOmitidaSerializer(serializers.ModelSerializer):
    bibliografia = serializers.PrimaryKeyRelatedField(
        queryset=BibliografiaModel.objects.all(),
        required=False,
        allow_null=True
    )
    bibliografia_titulo = serializers.CharField(
        source='bibliografia.titulo',
        read_only=True,
        allow_null=True
    )
    assunto = serializers.PrimaryKeyRelatedField(
        queryset=CapitulosBibliografiaModel.objects.all(),
        required=False,
        allow_null=True
    )
    assunto_titulo = serializers.CharField(
        source='assunto.capitulo_titulo',
        read_only=True,
        allow_null=True
    )

    class Meta:
        model = QuestaoOmitida
        fields = [
            'id',
            'usuario',
            'pergunta_id',
            'pergunta_tipo',
            'motivo',
            'bibliografia',
            'bibliografia_titulo',
            'assunto',
            'assunto_titulo',
            'created_at'
        ]
        read_only_fields = ['id', 'usuario', 'created_at', 'bibliografia_titulo', 'assunto_titulo']
    
    
    def create(self, validated_data):
        usuario = self.context['request'].user
        pergunta_id = validated_data['pergunta_id']
        pergunta_tipo = validated_data['pergunta_tipo']
        motivo = validated_data.get('motivo')
        bibliografia = validated_data.get('bibliografia')
        assunto = validated_data.get('assunto')

        instance, _ = QuestaoOmitida.objects.update_or_create(
            usuario=usuario,
            pergunta_id=pergunta_id,
            pergunta_tipo=pergunta_tipo,
            defaults={
                'motivo': motivo,
                'bibliografia': bibliografia,
                'assunto': assunto
            }
        )
        return instance


class QuestaoErradaAnonimaSerializer(serializers.ModelSerializer):
    """Serializer para questões erradas anônimas"""
    pergunta_id = serializers.IntegerField()
    assunto_titulo = serializers.CharField(source='assunto.capitulo_titulo', read_only=True, allow_null=True)
    
    class Meta:
        model = QuestaoErradaAnonima
        fields = [
            'id',
            'pergunta_id',
            'pergunta_tipo',
            'bibliografia_id',
            'assunto',
            'assunto_titulo',
            'timestamp'
        ]
        read_only_fields = ['id', 'timestamp']


class PerguntaHighlightRangeSerializer(serializers.Serializer):
    id = serializers.CharField(required=False, allow_blank=True)
    text = serializers.CharField()
    start_offset = serializers.IntegerField(min_value=0)
    end_offset = serializers.IntegerField(min_value=0)
    heading_id = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    note = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    color = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    def validate(self, attrs):
        if attrs['end_offset'] <= attrs['start_offset']:
            raise serializers.ValidationError("end_offset deve ser maior que start_offset")
        return attrs


class PerguntaHighlightSerializer(serializers.Serializer):
    markdown_file = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    markdown_highlights = PerguntaHighlightRangeSerializer(many=True, required=False, allow_null=True)

    def validate_markdown_file(self, value):
        if value in (None, ''):
            return value
        normalized = value.strip().lstrip('/')
        if '..' in Path(normalized).parts:
            raise serializers.ValidationError("Caminho de arquivo inválido.")
        return normalized

    def validate(self, attrs):
        highlights = attrs.get('markdown_highlights')
        markdown_file = attrs.get('markdown_file')
        if highlights and not markdown_file:
            raise serializers.ValidationError("Informe o arquivo Markdown antes de salvar marcações.")
        return attrs
