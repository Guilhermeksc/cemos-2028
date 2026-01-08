from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import (
    FlashCardsModel,
    PerguntaMultiplaModel, 
    PerguntaVFModel, 
    PerguntaCorrelacaoModel,
    RespostaUsuario
)
from .resources import (
    FlashCardsResource,
    PerguntaMultiplaResource,
    PerguntaVFResource,
    PerguntaCorrelacaoResource
)

@admin.register(FlashCardsModel)
class FlashCardsAdmin(ImportExportModelAdmin):
    resource_class = FlashCardsResource
    list_display = ['__str__', 'bibliografia', 'pergunta', 'resposta', 'assunto', 'prova', 'ano', 'caveira']
    list_filter = ['bibliografia', 'assunto', 'prova', 'ano', 'caveira']
    search_fields = ['pergunta', 'resposta', 'assunto__titulo', 'bibliografia__titulo']
    ordering = ['id']
    
    fieldsets = (
        ('Informações da Pergunta', {
            'fields': ('bibliografia', 'pergunta', 'resposta', 'assunto')
        }),
        ('Informações da Prova', {
            'fields': ('prova', 'ano', 'caveira')
        }),
    )

@admin.register(PerguntaMultiplaModel)
class PerguntaMultiplaAdmin(ImportExportModelAdmin):
    resource_class = PerguntaMultiplaResource
    list_display = ['__str__', 'bibliografia', 'paginas', 'assunto', 'caiu_em_prova', 'ano_prova', 'resposta_correta']
    list_filter = ['caiu_em_prova', 'ano_prova', 'resposta_correta', 'bibliografia', 'assunto']
    search_fields = ['pergunta', 'bibliografia__titulo', 'justificativa_resposta_certa', 'assunto__titulo']
    ordering = ['id']
    
    fieldsets = (
        ('Informações da Pergunta', {
            'fields': ('bibliografia', 'pergunta', 'paginas', 'assunto', 'caiu_em_prova', 'ano_prova')
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
class PerguntaVFAdmin(ImportExportModelAdmin):
    resource_class = PerguntaVFResource
    list_display = ['__str__', 'bibliografia', 'paginas', 'assunto', 'caiu_em_prova', 'ano_prova']
    list_filter = ['caiu_em_prova', 'ano_prova', 'bibliografia', 'assunto']
    search_fields = ['pergunta', 'afirmacao_verdadeira', 'afirmacao_falsa', 'assunto__titulo', 'bibliografia__titulo', 'justificativa_resposta_certa']
    ordering = ['id']
    
    fieldsets = (
        ('Informações da Pergunta', {
            'fields': ('bibliografia', 'pergunta', 'paginas', 'assunto', 'caiu_em_prova', 'ano_prova')
        }),
        ('Afirmações', {
            'fields': ('afirmacao_verdadeira', 'afirmacao_falsa'),
            'description': 'A resposta correta é sempre "Verdadeiro" (afirmacao_verdadeira é a correta)'
        }),
        ('Justificativa', {
            'fields': ('justificativa_resposta_certa',),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['tipo']


@admin.register(PerguntaCorrelacaoModel)
class PerguntaCorrelacaoAdmin(ImportExportModelAdmin):
    resource_class = PerguntaCorrelacaoResource
    list_display = ['__str__', 'bibliografia', 'paginas', 'assunto', 'caiu_em_prova', 'ano_prova']
    list_filter = ['caiu_em_prova', 'ano_prova', 'bibliografia', 'assunto']
    search_fields = ['pergunta', 'bibliografia__titulo', 'justificativa_resposta_certa', 'assunto__titulo']
    ordering = ['id']
    
    fieldsets = (
        ('Informações da Pergunta', {
            'fields': ('bibliografia', 'pergunta', 'paginas', 'assunto', 'caiu_em_prova', 'ano_prova')
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


@admin.register(RespostaUsuario)
class RespostaUsuarioAdmin(admin.ModelAdmin):
    list_display = ['usuario', 'pergunta_tipo', 'pergunta_id', 'acertou', 'timestamp', 'bibliografia_id', 'assunto']
    list_filter = ['pergunta_tipo', 'acertou', 'timestamp', 'bibliografia_id', 'assunto']
    search_fields = ['usuario__username', 'pergunta_id', 'assunto__titulo']
    readonly_fields = ['timestamp']
    date_hierarchy = 'timestamp'
    ordering = ['-timestamp']
