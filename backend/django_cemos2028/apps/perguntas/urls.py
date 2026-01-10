from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FlashCardsViewSet,
    PerguntaMultiplaViewSet,
    PerguntaVFViewSet,
    PerguntaCorrelacaoViewSet,
    RespostaUsuarioViewSet,
    QuestaoOmitidaViewSet,
    MarkdownFileListAPIView,
    MarkdownHighlightsAPIView
)

# Criar router para as APIs
router = DefaultRouter()
router.register(r'flashcards', FlashCardsViewSet)
router.register(r'perguntas-multipla', PerguntaMultiplaViewSet)
router.register(r'perguntas-vf', PerguntaVFViewSet)
router.register(r'perguntas-correlacao', PerguntaCorrelacaoViewSet)
router.register(r'respostas-usuario', RespostaUsuarioViewSet, basename='respostas-usuario')
router.register(r'questoes-omitidas', QuestaoOmitidaViewSet, basename='questoes-omitidas')

app_name = 'perguntas'

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/markdown-files/', MarkdownFileListAPIView.as_view(), name='markdown-files'),
    path('api/markdown-highlights/', MarkdownHighlightsAPIView.as_view(), name='markdown-highlights'),
]
