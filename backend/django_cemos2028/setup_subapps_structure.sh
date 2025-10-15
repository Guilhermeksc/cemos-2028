#!/bin/bash
# ==========================================
# Script: setup_subapps_structure.sh
# Autor: Guilherme
# Descrição: Cria estrutura padrão Django/DRF para todos os subapps
# ==========================================

BASE_DIR="~/Projetos/cemos2028/backend/django_cemos2028/apps"
cd $(eval echo $BASE_DIR)

# Lista de subapps
APPS=(
    app1_intendencia/bibliografia
    app1_intendencia/resumo
    app1_intendencia/perguntas
    app1_intendencia/media
    app2_estrategia/bibliografia
    app2_estrategia/resumo
    app2_estrategia/perguntas
    app2_estrategia/media
    app3_planejamento_militar/bibliografia
    app3_planejamento_militar/resumo
    app3_planejamento_militar/perguntas
    app3_planejamento_militar/media
    app4_historia/bibliografia
    app4_historia/resumo
    app4_historia/perguntas
    app4_historia/media
    app5_ingles/bibliografia
    app5_ingles/resumo
    app5_ingles/perguntas
    app5_ingles/media
    app6_geopolitica_relacoes_internacionais/bibliografia
    app6_geopolitica_relacoes_internacionais/resumo
    app6_geopolitica_relacoes_internacionais/perguntas
    app6_geopolitica_relacoes_internacionais/media
    app7_politica/bibliografia
    app7_politica/resumo
    app7_politica/perguntas
    app7_politica/media
    app8_direito/bibliografia
    app8_direito/resumo
    app8_direito/perguntas
    app8_direito/media
    app9_economia/bibliografia
    app9_economia/resumo
    app9_economia/perguntas
    app9_economia/media
    )

for APP in "${APPS[@]}"; do
    echo "📁 Criando estrutura em $APP ..."

    mkdir -p "$APP/fixtures"
    mkdir -p "$APP/migrations"
    touch "$APP/migrations/__init__.py"

    # Arquivos padrão
    cat > "$APP/admin.py" <<EOF
from django.contrib import admin
from .models import *

# admin.site.register(SeuModelo)
EOF

    cat > "$APP/apps.py" <<EOF
from django.apps import AppConfig

class $(echo $(basename $APP) | sed -E 's/(^|_)([a-z])/\U\2/g')Config(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'django_cemos2028.apps.$APP'
EOF

    cat > "$APP/models.py" <<EOF
from django.db import models

class ExampleModel(models.Model):
    nome = models.CharField(max_length=200)

    def __str__(self):
        return self.nome
EOF

    cat > "$APP/resources.py" <<EOF
# Recursos de import/export
from import_export import resources
from .models import ExampleModel

class ExampleModelResource(resources.ModelResource):
    class Meta:
        model = ExampleModel
EOF

    cat > "$APP/serializers.py" <<EOF
from rest_framework import serializers
from .models import ExampleModel

class ExampleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExampleModel
        fields = '__all__'
EOF

    echo "✅ Estrutura criada em $APP"
done

echo "🎯 Todas as estruturas foram geradas com sucesso!"
