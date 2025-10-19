from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import (
    BibliografiaModel,
    FlashCardsModel,
    PerguntaMultiplaModel, 
    PerguntaVFModel, 
    PerguntaCorrelacaoModel
)
from .serializers import (
    BibliografiaSerializer,
    BibliografiaCreateUpdateSerializer,
    FlashCardsSerializer,
    FlashCardsCreateUpdateSerializer,
    PerguntaMultiplaSerializer,
    PerguntaMultiplaCreateUpdateSerializer,
    PerguntaVFSerializer,
    PerguntaVFCreateUpdateSerializer,
    PerguntaCorrelacaoSerializer,
    PerguntaCorrelacaoCreateUpdateSerializer,
    PerguntaResumoSerializer
)


class BibliografiaViewSet(viewsets.ModelViewSet):
    """ViewSet para gerenciar bibliografias"""
    queryset = BibliografiaModel.objects.all()
    serializer_class = BibliografiaSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['autor', 'materia']
    search_fields = ['titulo', 'autor', 'materia', 'descricao']
    ordering_fields = ['id', 'titulo', 'autor', 'materia']
    ordering = ['id']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return BibliografiaCreateUpdateSerializer
        return BibliografiaSerializer
    
    @action(detail=True, methods=['get'])
    def perguntas(self, request, pk=None):
        """Retorna todas as perguntas de uma bibliografia"""
        bibliografia = self.get_object()
        perguntas = []
        
        # Buscar perguntas múltipla escolha
        multiplas = PerguntaMultiplaModel.objects.filter(bibliografia=bibliografia)
        for pergunta in multiplas:
            perguntas.append({
                'id': pergunta.id,
                'tipo': pergunta.tipo,
                'tipo_display': pergunta.get_tipo_display(),
                'bibliografia_titulo': pergunta.bibliografia.titulo,
                'pergunta': pergunta.pergunta,
                'paginas': pergunta.paginas,
                'caiu_em_prova': pergunta.caiu_em_prova,
                'ano_prova': pergunta.ano_prova
            })
        
        # Buscar perguntas V/F
        vfs = PerguntaVFModel.objects.filter(bibliografia=bibliografia)
        for pergunta in vfs:
            perguntas.append({
                'id': pergunta.id,
                'tipo': pergunta.tipo,
                'tipo_display': pergunta.get_tipo_display(),
                'bibliografia_titulo': pergunta.bibliografia.titulo,
                'pergunta': pergunta.pergunta,
                'paginas': pergunta.paginas,
                'caiu_em_prova': pergunta.caiu_em_prova,
                'ano_prova': pergunta.ano_prova
            })
        
        # Buscar perguntas de correlação
        correlacoes = PerguntaCorrelacaoModel.objects.filter(bibliografia=bibliografia)
        for pergunta in correlacoes:
            perguntas.append({
                'id': pergunta.id,
                'tipo': pergunta.tipo,
                'tipo_display': pergunta.get_tipo_display(),
                'bibliografia_titulo': pergunta.bibliografia.titulo,
                'pergunta': pergunta.pergunta,
                'paginas': pergunta.paginas,
                'caiu_em_prova': pergunta.caiu_em_prova,
                'ano_prova': pergunta.ano_prova
            })
        
        # Ordenar por ID
        perguntas.sort(key=lambda x: x['id'])
        
        serializer = PerguntaResumoSerializer(perguntas, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def flashcards(self, request, pk=None):
        """Retorna todos os flashcards de uma bibliografia"""
        bibliografia = self.get_object()
        flashcards = FlashCardsModel.objects.filter(bibliografia=bibliografia).order_by('id')
        serializer = FlashCardsSerializer(flashcards, many=True)
        return Response(serializer.data)


class FlashCardsViewSet(viewsets.ModelViewSet):
    """ViewSet para gerenciar flash cards"""
    queryset = FlashCardsModel.objects.select_related('bibliografia').all()
    serializer_class = FlashCardsSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['bibliografia', 'assunto']
    search_fields = ['pergunta', 'resposta', 'assunto', 'bibliografia__titulo']
    ordering_fields = ['id', 'bibliografia__titulo', 'assunto']
    ordering = ['id']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return FlashCardsCreateUpdateSerializer
        return FlashCardsSerializer


class PerguntaMultiplaViewSet(viewsets.ModelViewSet):
    """ViewSet para gerenciar perguntas de múltipla escolha"""
    queryset = PerguntaMultiplaModel.objects.select_related('bibliografia').all()
    serializer_class = PerguntaMultiplaSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['bibliografia', 'caiu_em_prova', 'ano_prova', 'resposta_correta']
    search_fields = ['pergunta', 'bibliografia__titulo', 'justificativa_resposta_certa']
    ordering_fields = ['id', 'bibliografia__titulo', 'caiu_em_prova', 'ano_prova']
    ordering = ['id']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return PerguntaMultiplaCreateUpdateSerializer
        return PerguntaMultiplaSerializer


class PerguntaVFViewSet(viewsets.ModelViewSet):
    """ViewSet para gerenciar perguntas de verdadeiro ou falso"""
    queryset = PerguntaVFModel.objects.select_related('bibliografia').all()
    serializer_class = PerguntaVFSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['bibliografia', 'caiu_em_prova', 'ano_prova', 'resposta_correta']
    search_fields = ['pergunta', 'afirmacao', 'bibliografia__titulo', 'justificativa_resposta_certa']
    ordering_fields = ['id', 'bibliografia__titulo', 'caiu_em_prova', 'ano_prova']
    ordering = ['id']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return PerguntaVFCreateUpdateSerializer
        return PerguntaVFSerializer


class PerguntaCorrelacaoViewSet(viewsets.ModelViewSet):
    """ViewSet para gerenciar perguntas de correlação"""
    queryset = PerguntaCorrelacaoModel.objects.select_related('bibliografia').all()
    serializer_class = PerguntaCorrelacaoSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['bibliografia', 'caiu_em_prova', 'ano_prova']
    search_fields = ['pergunta', 'bibliografia__titulo', 'justificativa_resposta_certa']
    ordering_fields = ['id', 'bibliografia__titulo', 'caiu_em_prova', 'ano_prova']
    ordering = ['id']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return PerguntaCorrelacaoCreateUpdateSerializer
        return PerguntaCorrelacaoSerializer