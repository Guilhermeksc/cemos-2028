from django.contrib import admin
from .models import (
    BibliografiaModel, 
    PerguntaMultiplaModel, 
    PerguntaVFModel, 
    PerguntaCorrelacaoModel,
    PerguntasModel
)


@admin.register(BibliografiaModel)
class BibliografiaAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'autor', 'materia', 'ano_publicacao', 'created_at']
    list_filter = ['materia', 'ano_publicacao', 'created_at']
    search_fields = ['titulo', 'autor', 'materia', 'descricao']
    ordering = ['-created_at']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('titulo', 'autor', 'materia', 'ano_publicacao')
        }),
        ('Descrição', {
            'fields': ('descricao',),
            'classes': ('collapse',)
        }),
    )


@admin.register(PerguntaMultiplaModel)
class PerguntaMultiplaAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'bibliografia', 'caiu_em_prova', 'ano_prova', 'resposta_correta', 'created_at']
    list_filter = ['caiu_em_prova', 'ano_prova', 'resposta_correta', 'bibliografia', 'created_at']
    search_fields = ['pergunta', 'bibliografia__titulo', 'justificativa_resposta_certa']
    ordering = ['-created_at']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Informações da Pergunta', {
            'fields': ('bibliografia', 'pergunta', 'caiu_em_prova', 'ano_prova')
        }),
        ('Alternativas', {
            'fields': ('alternativa_a', 'alternativa_b', 'alternativa_c', 'alternativa_d', 'resposta_correta')
        }),
        ('Justificativa', {
            'fields': ('justificativa_resposta_certa',),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['tipo']


@admin.register(PerguntaVFModel)
class PerguntaVFAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'bibliografia', 'caiu_em_prova', 'ano_prova', 'resposta_correta', 'created_at']
    list_filter = ['caiu_em_prova', 'ano_prova', 'resposta_correta', 'bibliografia', 'created_at']
    search_fields = ['pergunta', 'afirmacao', 'bibliografia__titulo', 'justificativa_resposta_certa']
    ordering = ['-created_at']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Informações da Pergunta', {
            'fields': ('bibliografia', 'pergunta', 'caiu_em_prova', 'ano_prova')
        }),
        ('Afirmação e Resposta', {
            'fields': ('afirmacao', 'resposta_correta')
        }),
        ('Justificativa', {
            'fields': ('justificativa_resposta_certa',),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['tipo']


@admin.register(PerguntaCorrelacaoModel)
class PerguntaCorrelacaoAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'bibliografia', 'caiu_em_prova', 'ano_prova', 'created_at']
    list_filter = ['caiu_em_prova', 'ano_prova', 'bibliografia', 'created_at']
    search_fields = ['pergunta', 'bibliografia__titulo', 'justificativa_resposta_certa']
    ordering = ['-created_at']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Informações da Pergunta', {
            'fields': ('bibliografia', 'pergunta', 'caiu_em_prova', 'ano_prova')
        }),
        ('Correlação', {
            'fields': ('coluna_a', 'coluna_b', 'resposta_correta'),
            'description': 'Use formato JSON para as colunas e respostas. Ex: ["Item 1", "Item 2"]'
        }),
        ('Justificativa', {
            'fields': ('justificativa_resposta_certa',),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['tipo']
