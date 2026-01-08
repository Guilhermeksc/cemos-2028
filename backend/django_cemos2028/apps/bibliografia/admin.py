from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import (
    MateriaModel,
    BibliografiaModel,
    CapitulosBibliografiaModel
)
from .resources import BibliografiaResource


@admin.register(MateriaModel)
class MateriaAdmin(admin.ModelAdmin):
    list_display = ['id', 'materia']
    search_fields = ['materia']
    ordering = ['materia']


@admin.register(BibliografiaModel)
class BibliografiaAdmin(ImportExportModelAdmin):
    resource_class = BibliografiaResource
    list_display = ['id', 'titulo', 'autor', 'materia']
    list_filter = ['materia']
    search_fields = ['titulo', 'autor', 'materia__materia', 'descricao']
    ordering = ['id']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('id', 'titulo', 'autor', 'materia')
        }),
        ('Descrição', {
            'fields': ('descricao',),
            'classes': ('collapse',)
        }),
    )

@admin.register(CapitulosBibliografiaModel)
class CapitulosBibliografiaAdmin(admin.ModelAdmin):
    list_display = ['id', 'capitulo_titulo', 'bibliografia']
    search_fields = ['capitulo_titulo', 'bibliografia__titulo']
    list_filter = ['bibliografia']
    ordering = ['id']
