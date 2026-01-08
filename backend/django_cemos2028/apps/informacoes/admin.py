from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import (
    PresidentesModel,
    FilosofosModel,
    CronologiaModel,
    ConceitosModel,
    HiperlinksModel
)
from .resources import ConceitosResource


@admin.register(PresidentesModel)
class PresidentesAdmin(admin.ModelAdmin):
    list_display = ['presidente', 'pais', 'periodo_presidencial', 'bibliografia']
    list_filter = ['bibliografia', 'pais']
    search_fields = ['presidente', 'pais', 'periodo_presidencial', 'conflitos_principais']
    ordering = ['id']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('bibliografia', 'presidente', 'pais', 'periodo_presidencial')
        }),
        ('Conflitos', {
            'fields': ('conflitos_principais',),
            'classes': ('collapse',)
        }),
        ('Imagem', {
            'fields': ('imagem_caminho',),
            'classes': ('collapse',)
        }),
    )


@admin.register(FilosofosModel)
class FilosofosAdmin(admin.ModelAdmin):
    list_display = ['nome', 'periodo_filosofico', 'bibliografia']
    list_filter = ['bibliografia']
    search_fields = ['nome', 'periodo_filosofico', 'principais_ideias']
    ordering = ['id']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('bibliografia', 'nome', 'periodo_filosofico')
        }),
        ('Ideias', {
            'fields': ('principais_ideias',),
            'classes': ('collapse',)
        }),
        ('Imagem', {
            'fields': ('imagem_caminho',),
            'classes': ('collapse',)
        }),
    )


@admin.register(CronologiaModel)
class CronologiaAdmin(admin.ModelAdmin):
    list_display = ['evento_conflito', 'periodo', 'bibliografia']
    list_filter = ['bibliografia', 'periodo']
    search_fields = ['evento_conflito', 'periodo', 'principais_forcas', 'resultado']
    ordering = ['id']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('bibliografia', 'evento_conflito', 'periodo')
        }),
        ('Detalhes', {
            'fields': ('principais_forcas', 'resultado', 'consequencias'),
            'classes': ('collapse',)
        }),
    )


@admin.register(ConceitosModel)
class ConceitosAdmin(ImportExportModelAdmin):
    resource_class = ConceitosResource
    list_display = ['titulo', 'palavra_chave', 'assunto', 'bibliografia', 'caiu_em_prova', 'ano_prova']
    list_filter = ['bibliografia', 'caiu_em_prova', 'ano_prova', 'palavra_chave', 'assunto']
    search_fields = ['titulo', 'palavra_chave', 'assunto__titulo', 'descricao']
    ordering = ['id']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('bibliografia', 'titulo', 'palavra_chave', 'assunto')
        }),
        ('Prova', {
            'fields': ('caiu_em_prova', 'ano_prova'),
            'classes': ('collapse',)
        }),
        ('Descrição', {
            'fields': ('descricao',),
            'classes': ('collapse',)
        }),
    )


@admin.register(HiperlinksModel)
class HiperlinksAdmin(admin.ModelAdmin):
    list_display = ['url', 'tipo', 'bibliografia']
    list_filter = ['bibliografia', 'tipo']
    search_fields = ['url', 'descricao']
    ordering = ['id']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('bibliografia', 'tipo', 'url')
        }),
        ('Descrição', {
            'fields': ('descricao',),
            'classes': ('collapse',)
        }),
    )
