from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjetoEstudoViewSet,
    MateriaViewSet,
    CapituloViewSet,
    SessaoEstudoViewSet,
    RevisaoViewSet
)

# Criar router para as APIs
router = DefaultRouter()
router.register(r'projetos', ProjetoEstudoViewSet, basename='projetos')
router.register(r'materias', MateriaViewSet, basename='materias')
router.register(r'capitulos', CapituloViewSet, basename='capitulos')
router.register(r'sessoes', SessaoEstudoViewSet, basename='sessoes')
router.register(r'revisoes', RevisaoViewSet, basename='revisoes')

app_name = 'revisao'

urlpatterns = [
    path('api/', include(router.urls)),
]
