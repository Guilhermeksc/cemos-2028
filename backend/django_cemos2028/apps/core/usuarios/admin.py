from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario

@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):
    model = Usuario
    list_display = ("nip", "nome_completo", "posto_graduacao", "perfil", "uasg", "is_active")
    list_filter = ("perfil", "uasg", "is_active")
    search_fields = ("nip", "nome_completo", "posto_graduacao", "uasg")
    ordering = ("nip",)
    fieldsets = (
        (None, {"fields": ("nip", "password")}),
        ("Informações Pessoais", {"fields": ("nome_completo", "posto_graduacao", "perfil", "uasg")}),
        ("Permissões", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('nip', 'nome_completo', 'posto_graduacao', 'perfil', 'uasg', 'password1', 'password2', 'is_staff', 'is_superuser'),
        }),
    )
