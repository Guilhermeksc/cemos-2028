from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # Autenticação JWT
    path('api/auth/', include('django_cemos2028.apps.core.autenticacao.urls')),

    # App de Perguntas
    path('api/perguntas/', include('django_cemos2028.apps.perguntas.urls')),

]
