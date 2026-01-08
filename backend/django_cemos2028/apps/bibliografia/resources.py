# Recursos de import/export
from import_export import resources, fields
from import_export.widgets import ForeignKeyWidget
from .models import (
    MateriaModel,
    BibliografiaModel,
)


class BibliografiaResource(resources.ModelResource):
    materia = fields.Field(
        column_name='materia',
        attribute='materia',
        widget=ForeignKeyWidget(MateriaModel, 'materia')
    )
    
    class Meta:
        model = BibliografiaModel
        fields = ('id', 'titulo', 'autor', 'materia', 'descricao')
        export_order = ('id', 'titulo', 'autor', 'materia', 'descricao')
        import_id_fields = ('id',)
        skip_unchanged = True
        report_skipped = True
