from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BibliografiaViewSet,
    PerguntaMultiplaViewSet,
    PerguntaVFViewSet,
    PerguntaCorrelacaoViewSet
)

# Criar router para as APIs
router = DefaultRouter()
router.register(r'bibliografias', BibliografiaViewSet)
router.register(r'perguntas-multipla', PerguntaMultiplaViewSet)
router.register(r'perguntas-vf', PerguntaVFViewSet)
router.register(r'perguntas-correlacao', PerguntaCorrelacaoViewSet)

app_name = 'perguntas'

urlpatterns = [
    path('api/', include(router.urls)),
]