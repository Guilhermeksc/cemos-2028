from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({"status": "healthy", "service": "cemos2028_backend"})

urlpatterns = [
    path('admin/', admin.site.urls),

    # Health Check
    path('api/health/', health_check, name='health_check'),

    # Autenticação JWT
    path('api/auth/', include('django_cemos2028.apps.core.autenticacao.urls')),

    # App de Perguntas
    path('api/perguntas/', include('django_cemos2028.apps.perguntas.urls')),

    # App de Informações
    path('api/informacoes/', include('django_cemos2028.apps.informacoes.urls')),

]
