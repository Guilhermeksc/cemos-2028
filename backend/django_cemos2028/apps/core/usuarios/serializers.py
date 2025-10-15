from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id", "nip", "nome_completo", "posto_graduacao", "perfil", "uasg"]
