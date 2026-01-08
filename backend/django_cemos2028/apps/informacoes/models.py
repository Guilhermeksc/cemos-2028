from django.db import models
from django_cemos2028.apps.bibliografia.models import (
    BibliografiaModel,
    CapitulosBibliografiaModel,
)


class PresidentesModel(models.Model):
    bibliografia = models.ForeignKey(
        BibliografiaModel,
        on_delete=models.CASCADE,
        verbose_name="Bibliografia",
        related_name="+"
    )
    periodo_presidencial = models.CharField(max_length=255, verbose_name="Período Presidencial")
    presidente = models.CharField(max_length=255, verbose_name="Presidente")
    pais = models.CharField(max_length=100, blank=True, null=True, verbose_name="País")
    conflitos_principais = models.TextField(blank=True, null=True, verbose_name="Conflito(s) Principal(is)")
    imagem_caminho = models.CharField(
        max_length=300,
        blank=True,
        null=True,
        verbose_name="Caminho da Imagem",
        help_text="Exemplo: assets/img/roosevelt/img.jpg"
    )

    class Meta:
        verbose_name = "Presidente"
        verbose_name_plural = "Presidentes"
        ordering = ['id']


class FilosofosModel(models.Model):
    bibliografia = models.ForeignKey(
        BibliografiaModel,
        on_delete=models.CASCADE,
        verbose_name="Bibliografia",
        related_name="+"
    )
    periodo_filosofico = models.CharField(max_length=255, verbose_name="Período Filosófico")
    nome = models.CharField(max_length=255, verbose_name="Nome")
    principais_ideias = models.TextField(blank=True, null=True, verbose_name="Principais Ideias")
    imagem_caminho = models.CharField(
        max_length=300,
        blank=True,
        null=True,
        verbose_name="Caminho da Imagem",
        help_text="Exemplo: assets/img/socrates/img.jpg"
    )

    class Meta:
        verbose_name = "Filósofo"
        verbose_name_plural = "Filósofos"
        ordering = ['id']

class CronologiaModel(models.Model):
    bibliografia = models.ForeignKey(
        BibliografiaModel, 
        on_delete=models.CASCADE, 
        verbose_name="Bibliografia",
        related_name="+"
    )    
    evento_conflito = models.CharField(max_length=255, verbose_name="Evento / Conflito")
    periodo = models.CharField(max_length=100, verbose_name="Período")
    principais_forcas = models.TextField(blank=True, null=True, verbose_name="Principais Forças / Atores")
    resultado = models.TextField(blank=True, null=True, verbose_name="Resultado / Impacto")
    consequencias = models.TextField(blank=True, null=True, verbose_name="Consequências Estratégicas")

    class Meta:
        verbose_name = "Cronologia"
        verbose_name_plural = "Cronologias"
        ordering = ['id']

class ConceitosModel(models.Model):
    bibliografia = models.ForeignKey(
        BibliografiaModel, 
        on_delete=models.CASCADE, 
        verbose_name="Bibliografia",
        related_name="+"
    )
    titulo = models.CharField(max_length=255, verbose_name="Título")
    palavra_chave = models.CharField(max_length=255, blank=True, null=True, verbose_name="Palavra-chave")
    assunto = models.ForeignKey(
        CapitulosBibliografiaModel,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        verbose_name="Assunto",
        related_name="+",
    )
    descricao = models.TextField(blank=True, null=True, verbose_name="Descrição")
    caiu_em_prova = models.BooleanField(default=False, verbose_name="Caiu em Prova")
    ano_prova = models.IntegerField(blank=True, null=True, verbose_name="Ano da Prova")

    class Meta:
        verbose_name = "Conceito"
        verbose_name_plural = "Conceitos"
        ordering = ['id']

class HiperlinksModel(models.Model):
    bibliografia = models.ForeignKey(
        BibliografiaModel, 
        on_delete=models.CASCADE, 
        verbose_name="Bibliografia",
        related_name="+"
    )
    tipo = models.CharField(max_length=10, choices=[
        ('pdf', 'PDF'),
        ('mp4', 'MP4'),
        ('mp3', 'MP3'),
        ('docx', 'DOCX'),
        ('xlsx', 'XLSX'),
    ], verbose_name="Tipo")
    descricao = models.TextField(blank=True, null=True, verbose_name="Descrição")
    url = models.URLField(max_length=200, verbose_name="URL")

    class Meta:
        verbose_name = "Hiperlink"
        verbose_name_plural = "Hiperlinks"
        ordering = ['id']

