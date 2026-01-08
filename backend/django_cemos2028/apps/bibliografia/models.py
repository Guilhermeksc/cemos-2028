from django.db import models

class MateriaModel(models.Model):
    id = models.IntegerField(primary_key=True, unique=True, verbose_name="ID")
    materia = models.CharField(max_length=100, unique=True, verbose_name="Matéria")
    
    class Meta:
        verbose_name = "Matéria"
        verbose_name_plural = "Matérias"
        ordering = ['materia']
    
    def __str__(self):
        return self.materia


class BibliografiaModel(models.Model):
    id = models.IntegerField(primary_key=True, unique=True, verbose_name="ID")
    titulo = models.CharField(max_length=255, verbose_name="Título")
    autor = models.CharField(max_length=255, blank=True, null=True, verbose_name="Autor")
    materia = models.ForeignKey(
        MateriaModel,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        verbose_name="Matéria",
        related_name="bibliografias"
    )
    descricao = models.TextField(blank=True, null=True, verbose_name="Descrição")
    
    class Meta:
        verbose_name = "Bibliografia"
        verbose_name_plural = "Bibliografias"
        ordering = ['id']
    
    def __str__(self):
        parts = [self.titulo]
        if self.autor:
            parts.append(f"- {self.autor}")
        if self.materia:
            parts.append(f"({self.materia.materia})")
        return " ".join(parts)

class CapitulosBibliografiaModel(models.Model):
    id = models.IntegerField(primary_key=True, unique=True, verbose_name="ID")
    bibliografia = models.ForeignKey(
        BibliografiaModel,
        on_delete=models.CASCADE,
        verbose_name="Bibliografia",
        related_name="capitulos"
    )
    capitulo_titulo = models.CharField(max_length=255, verbose_name="Título do Capítulo")
    
    class Meta:
        verbose_name = "Capítulo de Bibliografia"
        verbose_name_plural = "Capítulos de Bibliografia"
        ordering = ['id']
    
    def __str__(self):
        return f"{self.capitulo_titulo}"