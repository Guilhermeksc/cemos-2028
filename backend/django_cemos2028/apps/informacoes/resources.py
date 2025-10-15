# Recursos de import/export
from import_export import resources, fields
from import_export.widgets import ForeignKeyWidget, BooleanWidget
from django_cemos2028.apps.perguntas.models import BibliografiaModel
from .models import (
    PresidentesModel,
    FilosofosModel,
    CronologiaModel,
    ConceitosModel,
    HiperlinksModel
)


class PresidentesResource(resources.ModelResource):
    bibliografia = fields.Field(
        column_name='bibliografia',
        attribute='bibliografia',
        widget=ForeignKeyWidget(BibliografiaModel, 'titulo')
    )

    class Meta:
        model = PresidentesModel
        fields = ('id', 'bibliografia', 'periodo_presidencial', 'presidente', 'conflitos_principais', 'imagem_caminho')
        export_order = ('id', 'bibliografia', 'presidente', 'periodo_presidencial', 'conflitos_principais', 'imagem_caminho')
        import_id_fields = ('id',)
        skip_unchanged = True
        report_skipped = True


class FilosofosResource(resources.ModelResource):
    bibliografia = fields.Field(
        column_name='bibliografia',
        attribute='bibliografia',
        widget=ForeignKeyWidget(BibliografiaModel, 'titulo')
    )

    class Meta:
        model = FilosofosModel
        fields = ('id', 'bibliografia', 'periodo_filosofico', 'nome', 'principais_ideias', 'imagem_caminho')
        export_order = ('id', 'bibliografia', 'nome', 'periodo_filosofico', 'principais_ideias', 'imagem_caminho')
        import_id_fields = ('id',)
        skip_unchanged = True
        report_skipped = True


class CronologiaResource(resources.ModelResource):
    bibliografia = fields.Field(
        column_name='bibliografia',
        attribute='bibliografia',
        widget=ForeignKeyWidget(BibliografiaModel, 'titulo')
    )

    class Meta:
        model = CronologiaModel
        fields = ('id', 'bibliografia', 'evento_conflito', 'periodo', 'principais_forcas', 'resultado', 'consequencias')
        export_order = ('id', 'bibliografia', 'evento_conflito', 'periodo', 'principais_forcas', 'resultado', 'consequencias')
        import_id_fields = ('id',)
        skip_unchanged = True
        report_skipped = True


class ConceitosResource(resources.ModelResource):
    bibliografia = fields.Field(
        column_name='bibliografia',
        attribute='bibliografia',
        widget=ForeignKeyWidget(BibliografiaModel, 'titulo')
    )
    caiu_em_prova = fields.Field(
        column_name='caiu_em_prova',
        attribute='caiu_em_prova',
        widget=BooleanWidget()
    )

    class Meta:
        model = ConceitosModel
        fields = ('id', 'bibliografia', 'titulo', 'descricao', 'caiu_em_prova', 'ano_prova')
        export_order = ('id', 'bibliografia', 'titulo', 'descricao', 'caiu_em_prova', 'ano_prova')
        import_id_fields = ('id',)
        skip_unchanged = True
        report_skipped = True


class HiperlinksResource(resources.ModelResource):
    bibliografia = fields.Field(
        column_name='bibliografia',
        attribute='bibliografia',
        widget=ForeignKeyWidget(BibliografiaModel, 'titulo')
    )

    class Meta:
        model = HiperlinksModel
        fields = ('id', 'bibliografia', 'tipo', 'descricao', 'url')
        export_order = ('id', 'bibliografia', 'tipo', 'url', 'descricao')
        import_id_fields = ('id',)
        skip_unchanged = True
        report_skipped = True

