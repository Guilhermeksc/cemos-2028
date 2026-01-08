from django.contrib import admin
from .models import (
    ProjetoEstudo, Materia, Capitulo, SessaoEstudo, Revisao
)


@admin.register(ProjetoEstudo)
class ProjetoEstudoAdmin(admin.ModelAdmin):
    list_display = ['id', 'nome', 'usuario', 'data_inicio', 'minutos_diarios', 'ativo', 'criado_em']
    list_filter = ['ativo', 'data_inicio', 'criado_em']
    search_fields = ['nome', 'usuario__username']
    ordering = ['-criado_em']
    readonly_fields = ['criado_em', 'atualizado_em']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('usuario', 'nome', 'data_inicio', 'minutos_diarios', 'ativo')
        }),
        ('Datas', {
            'fields': ('criado_em', 'atualizado_em')
        }),
    )


@admin.register(Materia)
class MateriaAdmin(admin.ModelAdmin):
    list_display = ['id', 'nome', 'projeto', 'ordem_sugerida', 'prioridade']
    list_filter = ['projeto', 'prioridade']
    search_fields = ['nome', 'projeto__nome']
    ordering = ['projeto', 'ordem_sugerida']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('projeto', 'nome', 'ordem_sugerida', 'prioridade')
        }),
    )


@admin.register(Capitulo)
class CapituloAdmin(admin.ModelAdmin):
    list_display = ['id', 'titulo', 'materia', 'ordem', 'estimativa_minutos']
    list_filter = ['materia', 'materia__projeto']
    search_fields = ['titulo', 'materia__nome']
    ordering = ['materia', 'ordem']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('materia', 'titulo', 'ordem', 'estimativa_minutos')
        }),
    )


@admin.register(SessaoEstudo)
class SessaoEstudoAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'capitulo', 'data_planejada', 'data_realizada',
        'passada', 'concluida', 'tempo_estudado'
    ]
    list_filter = ['concluida', 'passada', 'data_planejada', 'capitulo__materia']
    search_fields = ['capitulo__titulo', 'capitulo__materia__nome', 'observacoes']
    ordering = ['-data_planejada', 'passada']
    readonly_fields = ['id']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('capitulo', 'passada', 'data_planejada', 'data_realizada')
        }),
        ('Status', {
            'fields': ('concluida', 'tempo_estudado', 'observacoes')
        }),
    )


@admin.register(Revisao)
class RevisaoAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'sessao', 'intervalo_dias', 'data_prevista',
        'data_realizada', 'concluida'
    ]
    list_filter = ['concluida', 'intervalo_dias', 'data_prevista']
    search_fields = [
        'sessao__capitulo__titulo',
        'sessao__capitulo__materia__nome'
    ]
    ordering = ['data_prevista', 'intervalo_dias']
    readonly_fields = ['intervalo_dias']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('sessao', 'intervalo_dias', 'data_prevista', 'data_realizada')
        }),
        ('Status', {
            'fields': ('concluida',)
        }),
    )
