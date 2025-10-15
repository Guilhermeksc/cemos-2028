from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PresidentesViewSet,
    FilosofosViewSet,
    CronologiaViewSet,
    ConceitosViewSet,
    HiperlinksViewSet
)

# Criar router para as APIs
router = DefaultRouter()
router.register(r'presidentes', PresidentesViewSet)
router.register(r'filosofos', FilosofosViewSet)
router.register(r'cronologia', CronologiaViewSet)
router.register(r'conceitos', ConceitosViewSet)
router.register(r'hiperlinks', HiperlinksViewSet)

app_name = 'informacoes'

urlpatterns = [
    path('api/', include(router.urls)),
]