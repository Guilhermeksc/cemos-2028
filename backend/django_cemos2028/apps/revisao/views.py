from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone

from .models import (
    ProjetoEstudo, Materia, Capitulo, SessaoEstudo, Revisao
)
from .serializers import (
    ProjetoEstudoSerializer, ProjetoEstudoCreateSerializer,
    MateriaSerializer, CapituloSerializer,
    SessaoEstudoSerializer, RevisaoSerializer
)
from .services.gerador_cronograma import gerar_cronograma
from .services.replanejador import replanejar_a_partir
from .services.indicadores import obter_indicadores
from .services.ajustador_cronograma import ajustar_cronograma_por_materia


class ProjetoEstudoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar Projetos de Estudo.
    
    Permite criar, listar, atualizar e deletar projetos de estudo.
    Ao criar um projeto, gera automaticamente o cronograma completo.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Retorna apenas os projetos do usuário autenticado"""
        return ProjetoEstudo.objects.filter(usuario=self.request.user)

    def get_serializer_class(self):
        """Usa serializer específico para criação"""
        if self.action == 'create':
            return ProjetoEstudoCreateSerializer
        return ProjetoEstudoSerializer

    def create(self, request, *args, **kwargs):
        """Sobrescreve create para garantir retorno correto após criar matérias"""
        # Desativa ou deleta projetos anteriores do usuário antes de criar um novo
        projetos_anteriores = ProjetoEstudo.objects.filter(usuario=request.user)
        if projetos_anteriores.exists():
            # Deleta todos os projetos anteriores para garantir apenas um projeto ativo
            projetos_anteriores.delete()
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        projeto = serializer.save(usuario=request.user)
        total_passadas = request.data.get("total_passadas", 3)
        
        # Criar matérias se fornecidas no request
        materias_data = request.data.get("materias", [])
        if materias_data:
            from .models import Materia
            for materia_data in materias_data:
                Materia.objects.create(
                    projeto=projeto,
                    nome=materia_data.get("nome"),
                    ordem_sugerida=materia_data.get("ordem", 1),
                    prioridade=materia_data.get("prioridade", 1),
                    data_inicio=materia_data.get("data_inicio"),
                    data_fim=materia_data.get("data_fim")
                )
        
        # Recarregar projeto do banco para garantir que tem todas as relações
        projeto.refresh_from_db()
        
        # Gerar cronograma apenas se houver matérias com capítulos
        if projeto.materias.exists():
            from .models import Capitulo
            if Capitulo.objects.filter(materia__projeto=projeto).exists():
                gerar_cronograma(projeto, int(total_passadas))
        
        # Retornar usando o serializer de leitura para incluir todas as relações
        read_serializer = ProjetoEstudoSerializer(projeto)
        headers = self.get_success_headers(read_serializer.data)
        return Response(read_serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True, methods=["get"])
    def indicadores(self, request, pk=None):
        """Retorna indicadores de acompanhamento do projeto"""
        projeto = self.get_object()
        indicadores = obter_indicadores(projeto)
        return Response(indicadores)

    @action(detail=True, methods=["get"])
    def calendario(self, request, pk=None):
        """Retorna sessões e revisões organizadas por data para o calendário"""
        projeto = self.get_object()
        
        sessoes = SessaoEstudo.objects.filter(
            capitulo__materia__projeto=projeto
        ).select_related("capitulo", "capitulo__materia")
        
        revisoes = Revisao.objects.filter(
            sessao__capitulo__materia__projeto=projeto
        ).select_related("sessao", "sessao__capitulo", "sessao__capitulo__materia")
        
        sessoes_data = SessaoEstudoSerializer(sessoes, many=True).data
        revisoes_data = RevisaoSerializer(revisoes, many=True).data
        
        return Response({
            "sessoes": sessoes_data,
            "revisoes": revisoes_data
        })

    @action(detail=True, methods=["post"])
    def ajustar_cronograma(self, request, pk=None):
        """
        Ajusta o cronograma redistribuindo dias por matéria e passada.
        
        Body esperado:
        {
            "dias_por_materia_passada": {
                "materia_id": {
                    "passada": dias
                }
            }
        }
        Exemplo:
        {
            "dias_por_materia_passada": {
                "1": {"1": 5, "2": 3, "3": 2},
                "2": {"1": 4, "2": 2, "3": 1}
            }
        }
        """
        projeto = self.get_object()
        dias_por_materia_passada = request.data.get("dias_por_materia_passada", {})
        
        # Converte strings para int nas chaves
        dias_formatado = {}
        for materia_id_str, passadas in dias_por_materia_passada.items():
            materia_id = int(materia_id_str)
            dias_formatado[materia_id] = {}
            for passada_str, dias in passadas.items():
                passada = int(passada_str)
                dias_formatado[materia_id][passada] = int(dias)
        
        try:
            ajustar_cronograma_por_materia(projeto, dias_formatado)
            
            # Retorna calendário atualizado
            sessoes = SessaoEstudo.objects.filter(
                capitulo__materia__projeto=projeto
            ).select_related("capitulo", "capitulo__materia")
            
            revisoes = Revisao.objects.filter(
                sessao__capitulo__materia__projeto=projeto
            ).select_related("sessao", "sessao__capitulo", "sessao__capitulo__materia")
            
            sessoes_data = SessaoEstudoSerializer(sessoes, many=True).data
            revisoes_data = RevisaoSerializer(revisoes, many=True).data
            
            return Response({
                "status": "cronograma ajustado",
                "sessoes": sessoes_data,
                "revisoes": revisoes_data
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class MateriaViewSet(viewsets.ModelViewSet):
    """ViewSet para gerenciar Matérias"""
    serializer_class = MateriaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Retorna apenas matérias dos projetos do usuário"""
        return Materia.objects.filter(
            projeto__usuario=self.request.user
        ).select_related("projeto")

    @action(detail=False, methods=["post"])
    def atualizar_datas(self, request):
        """
        Atualiza datas de início e fim de múltiplas matérias.
        
        Body esperado:
        {
            "materias": [
                {
                    "id": 1,
                    "data_inicio": "2024-01-15",
                    "data_fim": "2024-02-15"
                },
                ...
            ]
        }
        """
        materias_data = request.data.get("materias", [])
        materias_atualizadas = []
        
        for materia_data in materias_data:
            materia_id = materia_data.get("id")
            if not materia_id:
                continue
            
            try:
                materia = Materia.objects.get(
                    id=materia_id,
                    projeto__usuario=request.user
                )
                
                if "data_inicio" in materia_data:
                    materia.data_inicio = materia_data["data_inicio"]
                if "data_fim" in materia_data:
                    materia.data_fim = materia_data["data_fim"]
                
                materia.save()
                materias_atualizadas.append(MateriaSerializer(materia).data)
            except Materia.DoesNotExist:
                continue
        
        return Response({
            "status": "datas atualizadas",
            "materias": materias_atualizadas
        }, status=status.HTTP_200_OK)


class CapituloViewSet(viewsets.ModelViewSet):
    """ViewSet para gerenciar Capítulos"""
    serializer_class = CapituloSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Retorna apenas capítulos dos projetos do usuário"""
        return Capitulo.objects.filter(
            materia__projeto__usuario=self.request.user
        ).select_related("materia", "materia__projeto")


class SessaoEstudoViewSet(viewsets.ModelViewSet):
    """ViewSet para gerenciar Sessões de Estudo"""
    serializer_class = SessaoEstudoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Retorna apenas sessões dos projetos do usuário"""
        queryset = SessaoEstudo.objects.filter(
            capitulo__materia__projeto__usuario=self.request.user
        ).select_related("capitulo", "capitulo__materia", "capitulo__materia__projeto")
        
        # Filtros opcionais
        data_inicio = self.request.query_params.get("data_inicio", None)
        data_fim = self.request.query_params.get("data_fim", None)
        passada = self.request.query_params.get("passada", None)
        concluida = self.request.query_params.get("concluida", None)
        
        if data_inicio:
            queryset = queryset.filter(data_planejada__gte=data_inicio)
        if data_fim:
            queryset = queryset.filter(data_planejada__lte=data_fim)
        if passada:
            queryset = queryset.filter(passada=passada)
        if concluida is not None:
            queryset = queryset.filter(concluida=concluida.lower() == "true")
        
        return queryset

    @action(detail=True, methods=["post"])
    def concluir(self, request, pk=None):
        """
        Marca uma sessão como concluída e ajusta o planejamento futuro.
        
        Body esperado:
        {
            "data_realizada": "2024-01-15",  # opcional, usa hoje se não informado
            "tempo_estudado": 120,  # opcional
            "observacoes": "Texto opcional"
        }
        """
        sessao = self.get_object()
        sessao.concluida = True
        sessao.data_realizada = request.data.get(
            "data_realizada",
            timezone.now().date()
        )
        sessao.tempo_estudado = request.data.get("tempo_estudado")
        sessao.observacoes = request.data.get("observacoes", "")
        sessao.save()

        # Replaneja as sessões futuras
        replanejar_a_partir(sessao)

        serializer = self.get_serializer(sessao)
        return Response(
            {
                "status": "sessão concluída",
                "sessao": serializer.data
            },
            status=status.HTTP_200_OK
        )


class RevisaoViewSet(viewsets.ModelViewSet):
    """ViewSet para gerenciar Revisões"""
    serializer_class = RevisaoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Retorna apenas revisões dos projetos do usuário"""
        queryset = Revisao.objects.filter(
            sessao__capitulo__materia__projeto__usuario=self.request.user
        ).select_related(
            "sessao",
            "sessao__capitulo",
            "sessao__capitulo__materia"
        )
        
        # Filtros opcionais
        concluida = self.request.query_params.get("concluida", None)
        data_prevista_inicio = self.request.query_params.get("data_prevista_inicio", None)
        data_prevista_fim = self.request.query_params.get("data_prevista_fim", None)
        
        if concluida is not None:
            queryset = queryset.filter(concluida=concluida.lower() == "true")
        if data_prevista_inicio:
            queryset = queryset.filter(data_prevista__gte=data_prevista_inicio)
        if data_prevista_fim:
            queryset = queryset.filter(data_prevista__lte=data_prevista_fim)
        
        return queryset

    @action(detail=True, methods=["post"])
    def concluir(self, request, pk=None):
        """
        Marca uma revisão como concluída.
        
        Body esperado:
        {
            "data_realizada": "2024-01-15"  # opcional, usa hoje se não informado
        }
        """
        revisao = self.get_object()
        revisao.concluida = True
        revisao.data_realizada = request.data.get(
            "data_realizada",
            timezone.now().date()
        )
        revisao.save()

        serializer = self.get_serializer(revisao)
        return Response(
            {
                "status": "revisão concluída",
                "revisao": serializer.data
            },
            status=status.HTTP_200_OK
        )

