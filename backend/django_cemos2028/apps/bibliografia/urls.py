from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    MateriaViewSet,
    BibliografiaViewSet,
    CapitulosBibliografiaViewSet
)

# Criar router para as APIs
router = DefaultRouter()
router.register(r'materias', MateriaViewSet, basename='materias')
router.register(r'bibliografias', BibliografiaViewSet)
router.register(r'capitulos-bibliografia', CapitulosBibliografiaViewSet)

app_name = 'bibliografia'

urlpatterns = [
    path('api/', include(router.urls)),
]