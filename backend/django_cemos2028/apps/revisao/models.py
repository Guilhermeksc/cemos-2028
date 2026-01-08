from django.conf import settings
from django.db import models


class ProjetoEstudo(models.Model):
    """Representa um plano completo de preparação para o concurso"""
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="projetos_estudo"
    )
    nome = models.CharField(max_length=150)
    data_inicio = models.DateField()
    minutos_diarios = models.PositiveIntegerField(
        default=120,
        help_text="Quantidade média de tempo disponível por dia em minutos"
    )
    ativo = models.BooleanField(default=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-criado_em"]
        verbose_name = "Projeto de Estudo"
        verbose_name_plural = "Projetos de Estudo"

    def __str__(self):
        return self.nome


class Materia(models.Model):
    """Matérias do projeto de estudo"""
    projeto = models.ForeignKey(
        ProjetoEstudo,
        on_delete=models.CASCADE,
        related_name="materias"
    )
    nome = models.CharField(
        max_length=120,
        help_text="Nome da matéria (ex: História, Geopolítica, etc.)"
    )
    ordem_sugerida = models.PositiveIntegerField(
        help_text="Ordem sugerida de estudo (1, 2, 3...)"
    )
    prioridade = models.PositiveIntegerField(
        default=1,
        help_text="Grau de importância relativo às demais matérias"
    )
    data_inicio = models.DateField(
        null=True,
        blank=True,
        help_text="Data de início do estudo desta matéria. Se não definida, usa a ordem sequencial."
    )
    data_fim = models.DateField(
        null=True,
        blank=True,
        help_text="Data de término do estudo desta matéria. Se não definida, calcula automaticamente."
    )

    class Meta:
        ordering = ["ordem_sugerida"]
        verbose_name = "Matéria"
        verbose_name_plural = "Matérias"
        unique_together = [["projeto", "ordem_sugerida"]]

    def __str__(self):
        return f"{self.nome} (Projeto: {self.projeto.nome})"


class Capitulo(models.Model):
    """Capítulos que compõem cada matéria"""
    materia = models.ForeignKey(
        Materia,
        on_delete=models.CASCADE,
        related_name="capitulos"
    )
    titulo = models.CharField(max_length=200)
    ordem = models.PositiveIntegerField()
    estimativa_minutos = models.PositiveIntegerField(
        default=60,
        help_text="Estimativa de tempo necessário para estudar este capítulo"
    )

    class Meta:
        ordering = ["ordem"]
        verbose_name = "Capítulo"
        verbose_name_plural = "Capítulos"
        unique_together = [["materia", "ordem"]]

    def __str__(self):
        return f"{self.titulo} ({self.materia.nome})"


class SessaoEstudo(models.Model):
    """Sessão de estudo de um capítulo em uma data específica"""
    capitulo = models.ForeignKey(
        Capitulo,
        on_delete=models.CASCADE,
        related_name="sessoes"
    )
    data_planejada = models.DateField()
    data_realizada = models.DateField(null=True, blank=True)
    passada = models.PositiveIntegerField(
        help_text="Número da passada (1ª passada: primeiro contato, 2ª: revisão, 3ª: consolidação)"
    )
    tempo_estudado = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Tempo dedicado em minutos"
    )
    concluida = models.BooleanField(default=False)
    observacoes = models.TextField(blank=True)

    class Meta:
        ordering = ["data_planejada", "passada"]
        verbose_name = "Sessão de Estudo"
        verbose_name_plural = "Sessões de Estudo"

    def __str__(self):
        return f"{self.capitulo.titulo} - Passada {self.passada} ({self.data_planejada})"


class Revisao(models.Model):
    """Revisões programadas para cada sessão de estudo"""
    sessao = models.ForeignKey(
        SessaoEstudo,
        on_delete=models.CASCADE,
        related_name="revisoes"
    )
    data_prevista = models.DateField()
    data_realizada = models.DateField(null=True, blank=True)
    intervalo_dias = models.PositiveIntegerField(
        help_text="Intervalo em dias após o estudo (1, 7, 30, 60, 120)"
    )
    concluida = models.BooleanField(default=False)

    class Meta:
        ordering = ["data_prevista", "intervalo_dias"]
        verbose_name = "Revisão"
        verbose_name_plural = "Revisões"

    def __str__(self):
        return f"Revisão D+{self.intervalo_dias} - {self.sessao.capitulo.titulo}"

