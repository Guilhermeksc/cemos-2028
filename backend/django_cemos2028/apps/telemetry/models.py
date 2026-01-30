from django.conf import settings
from django.db import models


class LoginEvent(models.Model):
    STATUS_CHOICES = (
        ("success", "Sucesso"),
        ("error", "Erro"),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="login_events",
    )
    username = models.CharField(max_length=50, null=True, blank=True)
    perfil = models.CharField(max_length=50, default="indefinido")
    is_staff = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=["created_at", "status"])]


class PdfDownloadEventLog(models.Model):
    ORIGEM_CHOICES = (
        ("preset", "Preset"),
        ("custom", "Custom"),
        ("desconhecida", "Desconhecida"),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="pdf_download_events",
    )
    username = models.CharField(max_length=50, null=True, blank=True)
    perfil = models.CharField(max_length=50, default="indefinido")
    origem = models.CharField(max_length=20, choices=ORIGEM_CHOICES, default="desconhecida")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=["created_at", "origem"])]
