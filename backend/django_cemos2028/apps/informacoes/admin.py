from django.contrib import admin
from .models import (
    PresidentesModel,
    FilosofosModel,
    CronologiaModel,
    ConceitosModel,
    HiperlinksModel
)


@admin.register(PresidentesModel)
class PresidentesAdmin(admin.ModelAdmin):
    list_display = ['presidente', 'periodo_presidencial', 'bibliografia']
    list_filter = ['bibliografia']
    search_fields = ['presidente', 'periodo_presidencial', 'conflitos_principais']
    ordering = ['id']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('bibliografia', 'presidente', 'periodo_presidencial')
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
class ConceitosAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'bibliografia', 'caiu_em_prova', 'ano_prova']
    list_filter = ['bibliografia', 'caiu_em_prova', 'ano_prova']
    search_fields = ['titulo', 'descricao']
    ordering = ['id']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('bibliografia', 'titulo', 'caiu_em_prova', 'ano_prova')
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
