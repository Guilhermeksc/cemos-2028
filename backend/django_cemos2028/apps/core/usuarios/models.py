from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class UsuarioManager(BaseUserManager):
    def create_user(self, nip, password=None, **extra_fields):
        if not nip:
            raise ValueError("O campo NIP é obrigatório.")
        extra_fields.setdefault("is_active", True)
        user = self.model(nip=nip, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, nip, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(nip, password, **extra_fields)


class Usuario(AbstractUser):
    username = None  # remove o campo padrão
    nip = models.CharField("NIP", max_length=8, unique=True)
    nome_completo = models.CharField("Nome Completo", max_length=255)
    posto_graduacao = models.CharField("Posto/Graduação", max_length=100)
    perfil = models.CharField("Perfil", max_length=50, choices=[
        ("admin", "Administrador"),
        ("diretor", "Diretor"),
        ("gestor", "Gestor"),
        ("fiscal", "Fiscal"),
        ("fornecedor", "Fornecedor"),
    ])
    uasg = models.CharField("UASG", max_length=6, blank=True, null=True)

    USERNAME_FIELD = "nip"
    REQUIRED_FIELDS = ["nome_completo", "perfil", "posto_graduacao"]

    objects = UsuarioManager()

    def __str__(self):
        return f"{self.posto_graduacao} {self.nome_completo} ({self.nip})"
