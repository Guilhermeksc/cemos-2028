import logging

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django_cemos2028.apps.core.users.models import Usuario
from django_cemos2028.apps.bibliografia.models import (
    BibliografiaModel,
    CapitulosBibliografiaModel,
)

logger = logging.getLogger(__name__)

class FlashCardsModel(models.Model):
    id = models.IntegerField(primary_key=True, editable=False)
    bibliografia = models.ForeignKey(
        BibliografiaModel, 
        on_delete=models.CASCADE, 
        verbose_name="Bibliografia",
        related_name="+"
    )
    pergunta = models.TextField(verbose_name="Pergunta")
    resposta = models.TextField(verbose_name="Resposta")
    assunto = models.ForeignKey(
        CapitulosBibliografiaModel,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        verbose_name="Assunto",
        related_name="+",
    )
    prova = models.BooleanField(default=False, verbose_name="Caiu em Prova")
    ano = models.IntegerField(
        blank=True, 
        null=True, 
        verbose_name="Ano da Prova",
        validators=[MinValueValidator(2000), MaxValueValidator(2100)]
    )
    caveira = models.BooleanField(default=False, verbose_name="Caveira")
    
    class Meta:
        verbose_name = "Flash Cards"
        verbose_name_plural = "Flash Cards"
        ordering = ['id']
    
    def __str__(self):
        return f"{self.bibliografia.titulo} - {self.pergunta}"

class PerguntasBaseModel(models.Model):
    id = models.IntegerField(primary_key=True, editable=False)
    
    TIPO_CHOICES = [
        ('multipla', 'Múltipla Escolha'),
        ('vf', 'Verdadeiro ou Falso'),
        ('correlacao', 'Correlação'),
    ]
    
    bibliografia = models.ForeignKey(
        BibliografiaModel, 
        on_delete=models.CASCADE, 
        verbose_name="Bibliografia",
        related_name="+"
    )
    paginas = models.CharField(max_length=100, blank=True, null=True, verbose_name="Páginas")
    assunto = models.ForeignKey(
        CapitulosBibliografiaModel,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        verbose_name="Assunto",
        related_name="+",
    )
    caiu_em_prova = models.BooleanField(default=False, verbose_name="Caiu em Prova")
    ano_prova = models.IntegerField(
        blank=True, 
        null=True, 
        verbose_name="Ano da Prova",
        validators=[MinValueValidator(2000), MaxValueValidator(2100)]
    )
    pergunta = models.TextField(verbose_name="Pergunta")
    justificativa_resposta_certa = models.TextField(verbose_name="Justificativa da Resposta Correta")
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES, verbose_name="Tipo de Pergunta")
    markdown_file = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Arquivo Markdown",
        help_text="Caminho relativo em assets/content (ex: 'estrategia/2-estrategias-maritimas/cap4.md')"
    )
    markdown_highlights = models.JSONField(
        blank=True,
        null=True,
        verbose_name="Marcações de Texto",
        help_text="Lista de marcações vinculando a pergunta ao conteúdo Markdown"
    )
    
    class Meta:
        abstract = True
        ordering = ['id']
    
    def __str__(self):
        return f"{self.bibliografia.titulo} - {self.get_tipo_display()}"

    def save(self, *args, **kwargs):
        if self.assunto:
            if self.assunto.markdown_path:
                original = self.assunto.markdown_path
                normalized = (
                    original.replace('\\', '/')
                    .replace('frontend-cemos/public/assets/content/', '')
                    .replace('public/assets/content/', '')
                    .lstrip('/')
                    .strip()
                )
                logger.info(
                    "🔗 [PerguntasBaseModel] Pergunta %s herdando markdown_path do assunto '%s' (ID %s): %s (original: %s)",
                    self.pk or 'novo',
                    self.assunto.capitulo_titulo,
                    self.assunto.id,
                    normalized,
                    original
                )
                self.markdown_file = normalized
            else:
                logger.warning(
                    "⚠️ [PerguntasBaseModel] Assunto '%s' (ID %s) sem markdown_path; pergunta %s ficará sem arquivo vinculado.",
                    self.assunto.capitulo_titulo,
                    self.assunto.id,
                    self.pk or 'novo'
                )
        else:
            logger.debug(
                "ℹ️ [PerguntasBaseModel] Pergunta %s não possui assunto; mantendo markdown_file atual.",
                self.pk or 'novo'
            )
        super().save(*args, **kwargs)


class PerguntaMultiplaModel(PerguntasBaseModel):
    RESPOSTA_CHOICES = [
        ('a', 'Alternativa A'),
        ('b', 'Alternativa B'),
        ('c', 'Alternativa C'),
        ('d', 'Alternativa D'),
    ]
    
    alternativa_a = models.CharField(max_length=255, verbose_name="Alternativa A")
    alternativa_b = models.CharField(max_length=255, verbose_name="Alternativa B")
    alternativa_c = models.CharField(max_length=255, verbose_name="Alternativa C")
    alternativa_d = models.CharField(max_length=255, verbose_name="Alternativa D")
    resposta_correta = models.CharField(
        max_length=1, 
        choices=RESPOSTA_CHOICES, 
        verbose_name="Resposta Correta"
    )
    
    class Meta:
        verbose_name = "Pergunta Múltipla Escolha"
        verbose_name_plural = "Perguntas Múltipla Escolha"
        ordering = ['id']
    
    def save(self, *args, **kwargs):
        self.tipo = 'multipla'
        super().save(*args, **kwargs)


class PerguntaVFModel(PerguntasBaseModel):
    afirmacao_verdadeira = models.TextField(verbose_name="Afirmação Verdadeira", blank=True, null=True)
    afirmacao_falsa = models.TextField(verbose_name="Afirmação Falsa", blank=True, null=True)
    
    class Meta:
        verbose_name = "Pergunta Verdadeiro ou Falso"
        verbose_name_plural = "Perguntas Verdadeiro ou Falso"
        ordering = ['id']
    
    def save(self, *args, **kwargs):
        self.tipo = 'vf'
        super().save(*args, **kwargs)
    
    @property
    def resposta_correta(self):
        """A resposta correta é sempre True (Verdadeiro), pois a afirmacao_verdadeira é a correta"""
        return True


class PerguntaCorrelacaoModel(PerguntasBaseModel):
    coluna_a = models.JSONField(
        verbose_name="Coluna A (Lista de itens)",
        help_text="Lista de itens da coluna A em formato JSON. Ex: ['Item 1', 'Item 2', 'Item 3']"
    )
    coluna_b = models.JSONField(
        verbose_name="Coluna B (Lista de itens)",
        help_text="Lista de itens da coluna B em formato JSON. Ex: ['Item A', 'Item B', 'Item C']"
    )
    resposta_correta = models.JSONField(
        verbose_name="Resposta Correta (Pares corretos)",
        help_text="Pares corretos em formato JSON. Ex: {'0': '1', '1': '0', '2': '2'}"
    )
    
    class Meta:
        verbose_name = "Pergunta de Correlação"
        verbose_name_plural = "Perguntas de Correlação"
        ordering = ['id']
    
    def save(self, *args, **kwargs):
        self.tipo = 'correlacao'
        super().save(*args, **kwargs)


class RespostaUsuario(models.Model):
    """
    Modelo para armazenar respostas dos usuários às questões
    """
    TIPO_CHOICES = [
        ('multipla', 'Múltipla Escolha'),
        ('vf', 'Verdadeiro ou Falso'),
        ('correlacao', 'Correlação'),
    ]
    
    usuario = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        related_name='respostas',
        verbose_name="Usuário"
    )
    
    # Identificação da questão
    pergunta_id = models.IntegerField(verbose_name="ID da Pergunta")
    pergunta_tipo = models.CharField(
        max_length=20,
        choices=TIPO_CHOICES,
        verbose_name="Tipo da Pergunta"
    )
    
    # Resposta do usuário (armazenada como JSON para flexibilidade)
    resposta_usuario = models.JSONField(verbose_name="Resposta do Usuário")
    
    # Resultado
    acertou = models.BooleanField(verbose_name="Acertou")
    
    # Metadados
    timestamp = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Data/Hora da Resposta"
    )
    
    # Informações adicionais para estatísticas
    bibliografia_id = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="ID da Bibliografia"
    )
    assunto = models.ForeignKey(
        CapitulosBibliografiaModel,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Assunto",
        related_name="+",
    )
    
    class Meta:
        verbose_name = "Resposta do Usuário"
        verbose_name_plural = "Respostas dos Usuários"
        ordering = ['-timestamp']
        # Índice composto para consultas eficientes
        indexes = [
            models.Index(fields=['usuario', 'pergunta_tipo', 'pergunta_id']),
            models.Index(fields=['usuario', 'acertou']),
            models.Index(fields=['usuario', 'timestamp']),
        ]
        # Evitar duplicatas: um usuário pode responder a mesma questão múltiplas vezes
        # Mas cada resposta deve ser registrada separadamente
    
    def __str__(self):
        return f"{self.usuario.username} - {self.get_pergunta_tipo_display()} #{self.pergunta_id} - {'✓' if self.acertou else '✗'}"


class QuestaoErradaAnonima(models.Model):
    """
    Modelo para armazenar questões erradas de forma anônima (sem informação do usuário)
    Usado para estatísticas gerais e ranking de matérias com mais erros
    """
    TIPO_CHOICES = [
        ('multipla', 'Múltipla Escolha'),
        ('vf', 'Verdadeiro ou Falso'),
        ('correlacao', 'Correlação'),
    ]
    
    # Identificação da questão
    pergunta_id = models.IntegerField(verbose_name="ID da Pergunta")
    pergunta_tipo = models.CharField(
        max_length=20,
        choices=TIPO_CHOICES,
        verbose_name="Tipo da Pergunta"
    )
    
    # Informações para estatísticas
    bibliografia_id = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="ID da Bibliografia"
    )
    assunto = models.ForeignKey(
        CapitulosBibliografiaModel,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Assunto",
        related_name="+",
    )
    
    # Metadados
    timestamp = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Data/Hora do Erro"
    )
    
    class Meta:
        verbose_name = "Questão Errada Anônima"
        verbose_name_plural = "Questões Erradas Anônimas"
        ordering = ['-timestamp']
        # Índices para consultas eficientes
        indexes = [
            models.Index(fields=['pergunta_tipo', 'pergunta_id']),
            models.Index(fields=['bibliografia_id']),
            models.Index(fields=['assunto']),
            models.Index(fields=['timestamp']),
        ]
        # Evitar duplicatas: uma mesma questão pode ser registrada múltiplas vezes
        # (cada erro de cada usuário é registrado separadamente)
    
    def __str__(self):
        return f"Questão #{self.pergunta_id} ({self.get_pergunta_tipo_display()}) - Errada"


class QuestaoOmitida(models.Model):
    """
    Registra quais questões o usuário optou por omitir do seu simulado.
    Não remove a questão do banco e não interfere nos demais usuários.
    """
    TIPO_CHOICES = [
        ('multipla', 'Múltipla Escolha'),
        ('vf', 'Verdadeiro ou Falso'),
        ('correlacao', 'Correlação'),
    ]

    usuario = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        related_name='questoes_omitidas',
        verbose_name="Usuário"
    )
    pergunta_id = models.IntegerField(verbose_name="ID da Pergunta")
    pergunta_tipo = models.CharField(
        max_length=20,
        choices=TIPO_CHOICES,
        verbose_name="Tipo da Pergunta"
    )
    bibliografia = models.ForeignKey(
        BibliografiaModel,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Bibliografia",
        related_name="+"
    )
    assunto = models.ForeignKey(
        CapitulosBibliografiaModel,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Assunto",
        related_name="+"
    )
    motivo = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Motivo da Omissão"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Data da Omissão")

    class Meta:
        verbose_name = "Questão Omitida"
        verbose_name_plural = "Questões Omitidas"
        ordering = ['-created_at']
        constraints = [
            models.UniqueConstraint(
                fields=['usuario', 'pergunta_id', 'pergunta_tipo'],
                name='unique_usuario_questao_omitida'
            )
        ]
        indexes = [
            models.Index(fields=['usuario', 'pergunta_tipo']),
            models.Index(fields=['pergunta_tipo', 'pergunta_id']),
        ]

    def __str__(self):
        return f"{self.usuario.username} omitiu {self.get_pergunta_tipo_display()} #{self.pergunta_id}"


class MarkdownHighlight(models.Model):
    """
    Modelo normalizado para armazenar marcações de texto vinculadas a perguntas.
    Facilita backup, importação e exportação das marcações.
    """
    TIPO_CHOICES = [
        ('multipla', 'Múltipla Escolha'),
        ('vf', 'Verdadeiro ou Falso'),
        ('correlacao', 'Correlação'),
    ]
    
    pergunta_id = models.IntegerField(verbose_name="ID da Pergunta")
    pergunta_tipo = models.CharField(
        max_length=20,
        choices=TIPO_CHOICES,
        verbose_name="Tipo da Pergunta"
    )
    markdown_file = models.CharField(
        max_length=255,
        verbose_name="Arquivo Markdown",
        help_text="Caminho relativo em assets/content"
    )
    
    # Dados da marcação
    highlight_id = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name="ID da Marcação",
        help_text="ID único da marcação (gerado pelo frontend)"
    )
    text = models.TextField(verbose_name="Texto Marcado")
    start_offset = models.IntegerField(verbose_name="Offset Inicial")
    end_offset = models.IntegerField(verbose_name="Offset Final")
    heading_id = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="ID do Cabeçalho",
        help_text="ID do heading onde a marcação está localizada"
    )
    note = models.TextField(
        blank=True,
        null=True,
        verbose_name="Observação",
        help_text="Observação adicional sobre a marcação"
    )
    color = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        default='#fff59d',
        verbose_name="Cor",
        help_text="Cor da marcação em formato hexadecimal"
    )
    
    # Metadados
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Data de Criação")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Data de Atualização")
    
    class Meta:
        verbose_name = "Marcação de Texto"
        verbose_name_plural = "Marcações de Texto"
        ordering = ['pergunta_tipo', 'pergunta_id', 'start_offset']
        indexes = [
            models.Index(fields=['pergunta_tipo', 'pergunta_id']),
            models.Index(fields=['markdown_file']),
            models.Index(fields=['created_at']),
        ]
        # Evitar duplicatas baseado em pergunta + highlight_id (quando highlight_id existe)
        # Para marcações sem highlight_id, usamos pergunta + offsets como identificador único
        constraints = [
            models.UniqueConstraint(
                fields=['pergunta_tipo', 'pergunta_id', 'highlight_id'],
                condition=models.Q(highlight_id__isnull=False),
                name='unique_highlight_id_per_question'
            ),
            models.UniqueConstraint(
                fields=['pergunta_tipo', 'pergunta_id', 'start_offset', 'end_offset'],
                condition=models.Q(highlight_id__isnull=True),
                name='unique_offset_per_question_no_id'
            )
        ]
    
    def __str__(self):
        return f"{self.get_pergunta_tipo_display()} #{self.pergunta_id} - {self.text[:50]}..."
    
    def to_dict(self):
        """Converte a marcação para o formato JSON usado pelo frontend"""
        return {
            'id': self.highlight_id or '',
            'text': self.text,
            'start_offset': self.start_offset,
            'end_offset': self.end_offset,
            'heading_id': self.heading_id or '',
            'note': self.note or '',
            'color': self.color or '#fff59d'
        }
