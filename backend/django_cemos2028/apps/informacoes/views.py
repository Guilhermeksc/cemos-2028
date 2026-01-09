from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import (
    PresidentesModel,
    FilosofosModel,
    CronologiaModel,
    ConceitosModel,
    HiperlinksModel
)
from .serializers import (
    PresidentesSerializer,
    PresidentesCreateUpdateSerializer,
    FilosofosSerializer,
    FilosofosCreateUpdateSerializer,
    CronologiaSerializer,
    CronologiaCreateUpdateSerializer,
    ConceitosSerializer,
    ConceitosCreateUpdateSerializer,
    HiperlinksSerializer,
    HiperlinksCreateUpdateSerializer
)


class PresidentesViewSet(viewsets.ModelViewSet):
    """ViewSet para gerenciar presidentes"""
    queryset = PresidentesModel.objects.select_related('bibliografia').all()
    serializer_class = PresidentesSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['bibliografia', 'periodo_presidencial']
    search_fields = ['presidente', 'pais', 'conflitos_principais', 'bibliografia__titulo']
    ordering_fields = ['id', 'presidente', 'periodo_presidencial']
    ordering = ['id']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return PresidentesCreateUpdateSerializer
        return PresidentesSerializer


class FilosofosViewSet(viewsets.ModelViewSet):
    """ViewSet para gerenciar filósofos"""
    queryset = FilosofosModel.objects.select_related('bibliografia').all()
    serializer_class = FilosofosSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['bibliografia', 'periodo_filosofico']
    search_fields = ['nome', 'principais_ideias', 'bibliografia__titulo']
    ordering_fields = ['id', 'nome', 'periodo_filosofico']
    ordering = ['id']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return FilosofosCreateUpdateSerializer
        return FilosofosSerializer


class CronologiaViewSet(viewsets.ModelViewSet):
    """ViewSet para gerenciar cronologia"""
    queryset = CronologiaModel.objects.select_related('bibliografia').all()
    serializer_class = CronologiaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['bibliografia', 'periodo']
    search_fields = ['evento_conflito', 'principais_forcas', 'resultado', 'consequencias', 'bibliografia__titulo']
    ordering_fields = ['id', 'evento_conflito', 'periodo']
    ordering = ['id']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return CronologiaCreateUpdateSerializer
        return CronologiaSerializer


class ConceitosViewSet(viewsets.ModelViewSet):
    """ViewSet para gerenciar conceitos"""
    queryset = ConceitosModel.objects.select_related('bibliografia', 'assunto').all()
    serializer_class = ConceitosSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['bibliografia', 'caiu_em_prova', 'ano_prova', 'palavra_chave', 'assunto']
    search_fields = ['titulo', 'palavra_chave', 'assunto__capitulo_titulo', 'descricao', 'bibliografia__titulo']
    ordering_fields = ['id', 'titulo', 'ano_prova', 'palavra_chave', 'assunto__capitulo_titulo']
    ordering = ['id']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ConceitosCreateUpdateSerializer
        return ConceitosSerializer


class HiperlinksViewSet(viewsets.ModelViewSet):
    """ViewSet para gerenciar hiperlinks"""
    queryset = HiperlinksModel.objects.select_related('bibliografia').all()
    serializer_class = HiperlinksSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['bibliografia', 'tipo']
    search_fields = ['descricao', 'url', 'bibliografia__titulo']
    ordering_fields = ['id', 'tipo']
    ordering = ['id']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return HiperlinksCreateUpdateSerializer
        return HiperlinksSerializer