from django.contrib import admin
from .models import (
    BibliografiaModel, 
    FlashCardsModel,
    PerguntaMultiplaModel, 
    PerguntaVFModel, 
    PerguntaCorrelacaoModel
)


@admin.register(BibliografiaModel)
class BibliografiaAdmin(admin.ModelAdmin):
    list_display = ['id', 'titulo', 'autor', 'materia']
    list_filter = ['materia']
    search_fields = ['titulo', 'autor', 'materia', 'descricao']
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

@admin.register(FlashCardsModel)
class FlashCardsAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'bibliografia', 'pergunta', 'resposta', 'assunto', 'prova', 'ano']
    list_filter = ['bibliografia', 'assunto', 'prova', 'ano']
    search_fields = ['pergunta', 'resposta', 'assunto', 'bibliografia__titulo']
    ordering = ['id']
    
    fieldsets = (
        ('Informações da Pergunta', {
            'fields': ('bibliografia', 'pergunta', 'resposta', 'assunto')
        }),
        ('Informações da Prova', {
            'fields': ('prova', 'ano')
        }),
    )

@admin.register(PerguntaMultiplaModel)
class PerguntaMultiplaAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'bibliografia', 'paginas', 'caiu_em_prova', 'ano_prova', 'resposta_correta']
    list_filter = ['caiu_em_prova', 'ano_prova', 'resposta_correta', 'bibliografia']
    search_fields = ['pergunta', 'bibliografia__titulo', 'justificativa_resposta_certa']
    ordering = ['id']
    
    fieldsets = (
        ('Informações da Pergunta', {
            'fields': ('bibliografia', 'pergunta', 'paginas', 'caiu_em_prova', 'ano_prova')
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
    list_display = ['__str__', 'bibliografia', 'paginas', 'caiu_em_prova', 'ano_prova', 'resposta_correta']
    list_filter = ['caiu_em_prova', 'ano_prova', 'resposta_correta', 'bibliografia']
    search_fields = ['pergunta', 'afirmacao', 'bibliografia__titulo', 'justificativa_resposta_certa']
    ordering = ['id']
    
    fieldsets = (
        ('Informações da Pergunta', {
            'fields': ('bibliografia', 'pergunta', 'paginas', 'caiu_em_prova', 'ano_prova')
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
    list_display = ['__str__', 'bibliografia', 'paginas', 'caiu_em_prova', 'ano_prova']
    list_filter = ['caiu_em_prova', 'ano_prova', 'bibliografia']
    search_fields = ['pergunta', 'bibliografia__titulo', 'justificativa_resposta_certa']
    ordering = ['id']
    
    fieldsets = (
        ('Informações da Pergunta', {
            'fields': ('bibliografia', 'pergunta', 'paginas', 'caiu_em_prova', 'ano_prova')
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
