# Recursos de import/export
import json
import re
from import_export import resources, fields
from import_export.widgets import ForeignKeyWidget, BooleanWidget, IntegerWidget, JSONWidget
from .models import (
    FlashCardsModel,
    PerguntaMultiplaModel, 
    PerguntaVFModel, 
    PerguntaCorrelacaoModel,
    MarkdownHighlight
)
from django_cemos2028.apps.bibliografia.models import (
    BibliografiaModel,
    CapitulosBibliografiaModel,
)


def _decode_unicode_escapes(s):
    """Decodifica \\uXXXX em strings para caracteres corretos (é, ã, etc.)."""
    if not isinstance(s, str) or not s:
        return s

    def replace_escape(m):
        try:
            return chr(int(m.group(1), 16))
        except (ValueError, TypeError):
            return m.group(0)

    return re.sub(r'\\u([0-9a-fA-F]{4})', replace_escape, s)


def _decode_json_value(obj):
    """Decodifica recursivamente \\uXXXX em strings de listas/dicts."""
    if isinstance(obj, str):
        return _decode_unicode_escapes(obj)
    if isinstance(obj, list):
        return [_decode_json_value(item) for item in obj]
    if isinstance(obj, dict):
        return {_decode_json_value(k): _decode_json_value(v) for k, v in obj.items()}
    return obj


class UnicodeJSONWidget(JSONWidget):
    """
    JSONWidget que exporta com caracteres UTF-8 (é, ã) em vez de \\u00e9, \\u00e3.
    Na importação, decodifica escapes literais que possam vir do Excel.
    """

    def render(self, value, obj=None, **kwargs):
        if value:
            return json.dumps(value, ensure_ascii=False)
        return None

    def clean(self, value, row=None, **kwargs):
        result = super().clean(value, row, **kwargs)
        if result is not None:
            return _decode_json_value(result)
        return result


class FlashCardsResource(resources.ModelResource):
    id = fields.Field(
        column_name='id',
        attribute='id',
        widget=IntegerWidget()
    )
    bibliografia = fields.Field(
        column_name='bibliografia',
        attribute='bibliografia',
        widget=ForeignKeyWidget(BibliografiaModel, 'id')
    )
    assunto = fields.Field(
        column_name='assunto',
        attribute='assunto',
        widget=ForeignKeyWidget(CapitulosBibliografiaModel, 'id')
    )
    prova = fields.Field(
        column_name='prova',
        attribute='prova',
        widget=BooleanWidget()
    )
    caveira = fields.Field(
        column_name='caveira',
        attribute='caveira',
        widget=BooleanWidget()
    )

    class Meta:
        model = FlashCardsModel
        fields = ('id', 'bibliografia', 'pergunta', 'resposta', 'assunto', 'prova', 'ano', 'caveira')
        export_order = ('id', 'bibliografia', 'pergunta', 'resposta', 'assunto', 'prova', 'ano', 'caveira')
        import_id_fields = ('id',)
        skip_unchanged = True
        report_skipped = True

class PerguntaMultiplaResource(resources.ModelResource):
    id = fields.Field(
        column_name='id',
        attribute='id',
        widget=IntegerWidget()
    )
    bibliografia = fields.Field(
        column_name='bibliografia',
        attribute='bibliografia',
        widget=ForeignKeyWidget(BibliografiaModel, 'id')
    )
    assunto = fields.Field(
        column_name='assunto',
        attribute='assunto',
        widget=ForeignKeyWidget(CapitulosBibliografiaModel, 'id')
    )
    caiu_em_prova = fields.Field(
        column_name='caiu_em_prova',
        attribute='caiu_em_prova',
        widget=BooleanWidget()
    )
    caveira = fields.Field(
        column_name='caveira',
        attribute='caveira',
        widget=BooleanWidget()
    )

    markdown_file = fields.Field(
        column_name='markdown_file',
        attribute='markdown_file',
    )
    markdown_highlights = fields.Field(
        column_name='markdown_highlights',
        attribute='markdown_highlights',
        widget=UnicodeJSONWidget()
    )

    class Meta:
        model = PerguntaMultiplaModel
        fields = (
            'id', 'bibliografia', 'paginas', 'assunto', 'caiu_em_prova', 'ano_prova', 'caveira', 'pergunta',
            'alternativa_a', 'alternativa_b', 'alternativa_c', 'alternativa_d',
            'resposta_correta', 'justificativa_resposta_certa', 'tipo',
            'markdown_file', 'markdown_highlights'
        )
        export_order = (
            'id', 'bibliografia', 'pergunta', 'alternativa_a', 'alternativa_b',
            'alternativa_c', 'alternativa_d', 'resposta_correta', 'paginas', 'assunto',
            'caiu_em_prova', 'ano_prova', 'caveira', 'justificativa_resposta_certa', 'tipo',
            'markdown_file', 'markdown_highlights'
        )
        import_id_fields = ('id',)
        skip_unchanged = True
        report_skipped = True


class PerguntaVFResource(resources.ModelResource):
    id = fields.Field(
        column_name='id',
        attribute='id',
        widget=IntegerWidget()
    )
    bibliografia = fields.Field(
        column_name='bibliografia',
        attribute='bibliografia',
        widget=ForeignKeyWidget(BibliografiaModel, 'id')
    )
    assunto = fields.Field(
        column_name='assunto',
        attribute='assunto',
        widget=ForeignKeyWidget(CapitulosBibliografiaModel, 'id')
    )
    caiu_em_prova = fields.Field(
        column_name='caiu_em_prova',
        attribute='caiu_em_prova',
        widget=BooleanWidget()
    )
    caveira = fields.Field(
        column_name='caveira',
        attribute='caveira',
        widget=BooleanWidget()
    )

    markdown_file = fields.Field(
        column_name='markdown_file',
        attribute='markdown_file',
    )
    markdown_highlights = fields.Field(
        column_name='markdown_highlights',
        attribute='markdown_highlights',
        widget=UnicodeJSONWidget()
    )

    class Meta:
        model = PerguntaVFModel
        fields = (
            'id', 'bibliografia', 'paginas', 'assunto', 'caiu_em_prova', 'ano_prova', 'caveira', 'pergunta',
            'afirmacao_verdadeira', 'afirmacao_falsa', 'justificativa_resposta_certa', 'tipo',
            'markdown_file', 'markdown_highlights'
        )
        export_order = (
            'id', 'bibliografia', 'paginas', 'assunto', 'afirmacao_verdadeira', 'afirmacao_falsa', 
            'justificativa_resposta_certa', 'caiu_em_prova', 'ano_prova', 'caveira', 'tipo',
            'markdown_file', 'markdown_highlights'
        )
        import_id_fields = ('id',)
        skip_unchanged = True
        report_skipped = True


class PerguntaCorrelacaoResource(resources.ModelResource):
    id = fields.Field(
        column_name='id',
        attribute='id',
        widget=IntegerWidget()
    )
    bibliografia = fields.Field(
        column_name='bibliografia',
        attribute='bibliografia',
        widget=ForeignKeyWidget(BibliografiaModel, 'id')
    )
    assunto = fields.Field(
        column_name='assunto',
        attribute='assunto',
        widget=ForeignKeyWidget(CapitulosBibliografiaModel, 'id')
    )
    caiu_em_prova = fields.Field(
        column_name='caiu_em_prova',
        attribute='caiu_em_prova',
        widget=BooleanWidget()
    )
    coluna_a = fields.Field(
        column_name='coluna_a',
        attribute='coluna_a',
        widget=UnicodeJSONWidget()
    )
    coluna_b = fields.Field(
        column_name='coluna_b',
        attribute='coluna_b',
        widget=UnicodeJSONWidget()
    )
    resposta_correta = fields.Field(
        column_name='resposta_correta',
        attribute='resposta_correta',
        widget=UnicodeJSONWidget()
    )

    markdown_file = fields.Field(
        column_name='markdown_file',
        attribute='markdown_file',
    )
    markdown_highlights = fields.Field(
        column_name='markdown_highlights',
        attribute='markdown_highlights',
        widget=UnicodeJSONWidget()
    )

    class Meta:
        model = PerguntaCorrelacaoModel
        fields = (
            'id', 'bibliografia', 'paginas', 'assunto', 'caiu_em_prova', 'ano_prova', 'caveira', 'pergunta',
            'coluna_a', 'coluna_b', 'resposta_correta',
            'justificativa_resposta_certa', 'tipo',
            'markdown_file', 'markdown_highlights'
        )
        export_order = (
            'id', 'bibliografia', 'pergunta', 'coluna_a', 'coluna_b',
            'resposta_correta', 'paginas', 'assunto', 'caiu_em_prova', 'ano_prova', 'caveira',
            'justificativa_resposta_certa', 'tipo',
            'markdown_file', 'markdown_highlights'
        )
        import_id_fields = ('id',)
        skip_unchanged = True
        report_skipped = True


class MarkdownHighlightResource(resources.ModelResource):
    """
    Resource para exportar/importar marcações de texto de forma normalizada.
    Útil para backups e migração de marcações entre ambientes.
    """
    pergunta_tipo = fields.Field(
        column_name='pergunta_tipo',
        attribute='pergunta_tipo',
    )
    pergunta_id = fields.Field(
        column_name='pergunta_id',
        attribute='pergunta_id',
        widget=IntegerWidget()
    )
    markdown_file = fields.Field(
        column_name='markdown_file',
        attribute='markdown_file',
    )
    highlight_id = fields.Field(
        column_name='highlight_id',
        attribute='highlight_id',
    )
    text = fields.Field(
        column_name='text',
        attribute='text',
    )
    start_offset = fields.Field(
        column_name='start_offset',
        attribute='start_offset',
    )
    end_offset = fields.Field(
        column_name='end_offset',
        attribute='end_offset',
    )
    heading_id = fields.Field(
        column_name='heading_id',
        attribute='heading_id',
    )
    note = fields.Field(
        column_name='note',
        attribute='note',
    )
    color = fields.Field(
        column_name='color',
        attribute='color',
    )

    class Meta:
        model = MarkdownHighlight
        fields = (
            'id', 'pergunta_tipo', 'pergunta_id', 'markdown_file',
            'highlight_id', 'text', 'start_offset', 'end_offset',
            'heading_id', 'note', 'color', 'created_at', 'updated_at'
        )
        export_order = (
            'id', 'pergunta_tipo', 'pergunta_id', 'markdown_file',
            'highlight_id', 'text', 'start_offset', 'end_offset',
            'heading_id', 'note', 'color', 'created_at', 'updated_at'
        )
        import_id_fields = ('id',)
        skip_unchanged = True
        report_skipped = True

