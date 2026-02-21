from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path

from django_cemos2028.observability.views import metrics_view

# Personalização do Django Admin
admin.site.site_header = "Administração do Sistema de apoio ao Cemos"
admin.site.site_title = "Administração do Sistema de apoio ao Cemos"
admin.site.index_title = "Painel de Administração"

def health_check(request):
    return JsonResponse({"status": "healthy", "service": "cemos2028_backend"})


def metrics_example(request):
    return JsonResponse(
        {
            "labels": ["Planejamento", "Execução", "Controle", "Resultados"],
            "values": [24, 17, 32, 11],
        }
    )

urlpatterns = [
    path('admin/', admin.site.urls),  # Usa admin.site padrão com configurações customizadas

    # Autenticação baseada em sessão (templates Django)
    path('', include('django_cemos2028.apps.core.auth.web_urls')),

    # Health Check
    path('api/health/', health_check, name='health_check'),

    # Métricas exemplo para o Dash
    path('api/metrics/', metrics_example, name='metrics_example'),
    
    # Endpoint de métricas para Prometheus
    path('metrics/', metrics_view, name='prometheus_metrics'),

    # Autenticação JWT
    path('api/auth/', include('django_cemos2028.apps.core.auth.urls')),

    # Telemetria de eventos do frontend
    path('api/telemetry/', include('django_cemos2028.apps.telemetry.urls')),

    # App de Perguntas
    path('api/perguntas/', include('django_cemos2028.apps.perguntas.urls')),

    # App de Informações
    path('api/informacoes/', include('django_cemos2028.apps.informacoes.urls')),

    # App de Revisão e Planejamento de Estudos
    path('api/revisao/', include('django_cemos2028.apps.revisao.urls')),

    # App de Bibliografia
    path('api/bibliografia/', include('django_cemos2028.apps.bibliografia.urls')),

]
