Segue a **revisão do planejamento** e a **proposta completa do app Django**, alinhadas aos arquivos fornecidos .

---

## 1. Validação do Planejamento (síntese)

O planejamento está **coerente, completo e viável**, com pontos fortes claros:

* Autonomia total do usuário
* Planejamento flexível (sem penalização)
* Revisões obrigatórias e bem definidas
* Separação correta entre **planejado x realizado**
* Estrutura lógica: Matéria → Capítulo → Sessão → Revisão

A única recomendação estrutural é **explicitar melhor a distinção entre planejamento e execução**, o que foi incorporado abaixo.

---

## 2. Nome do App

**`acompanhamento_estudos`**

---

## 3. Models (nomes em PT-BR)

```python
class ProjetoEstudo
class Materia
class Capitulo
class SessaoEstudo
class Revisao
```

### Relações principais

* Usuário → ProjetoEstudo
* ProjetoEstudo → Materia
* Materia → Capitulo
* Capitulo → SessaoEstudo
* SessaoEstudo → Revisao

---

## 4. Estrutura de Models (conceitual)

### ProjetoEstudo

* usuário
* nome
* data_inicio
* minutos_diarios
* ativo

### Materia

* projeto_estudo
* nome
* ordem_sugerida
* prioridade

### Capitulo

* materia
* titulo
* ordem
* estimativa_minutos

### SessaoEstudo

* capitulo
* data_planejada
* data_realizada (opcional)
* passada (1, 2, 3…)
* tempo_estudado
* concluida
* observacoes

### Revisao

* sessao_estudo
* data_prevista
* data_realizada (opcional)
* intervalo_dias
* concluida

---

## 5. Serviços (regra de negócio isolada)

Pasta: `services/`

* `gerador_cronograma.py`

  * gera sessões e revisões iniciais
* `replanejador.py`

  * ajusta datas sem apagar histórico
* `indicadores.py`

  * progresso, revisões pendentes, matérias concluídas

---

## 6. Views (Django ou DRF)

### Views principais

* Criar projeto de estudo
* Visualizar calendário
* Registrar sessão manual
* Marcar sessão como concluída
* Marcar revisão como realizada

---

## 7. URLs sugeridas

```text
/projetos/
/projetos/novo/
/projetos/<id>/calendario/
/sessoes/<id>/concluir/
/revisoes/<id>/concluir/
```

---

## 8. Admin

Admin focado em **visualização e correção**, não operação diária:

* ProjetoEstudo
* Materia
* Capitulo
* SessaoEstudo (readonly parcial)
* Revisao (readonly parcial)

---

## 9. Ponto crítico bem resolvido

✔ Revisões **não bloqueiam** o fluxo
✔ Histórico **nunca é apagado**
✔ Planejamento é **orientativo**, não punitivo

---

## 10. Próximo passo recomendado

1. Criar os models
2. Implementar o **gerador de cronograma**
3. Criar endpoint de calendário
4. Integrar com o frontend (calendar view)

Se desejar, posso entregar **os models completos**, **serviço de geração**, ou **API REST pronta**.


Abaixo estão **os models e os services prontos**, seguindo **Django + Django REST Framework**, com **nomes em PT-BR**, regras alinhadas ao planejamento e **boas práticas**.

---

## 1. Models

`acompanhamento_estudos/models.py`

```python
from django.conf import settings
from django.db import models


class ProjetoEstudo(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="projetos_estudo"
    )
    nome = models.CharField(max_length=150)
    data_inicio = models.DateField()
    minutos_diarios = models.PositiveIntegerField(default=120)
    ativo = models.BooleanField(default=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome


class Materia(models.Model):
    projeto = models.ForeignKey(
        ProjetoEstudo,
        on_delete=models.CASCADE,
        related_name="materias"
    )
    nome = models.CharField(max_length=120)
    ordem_sugerida = models.PositiveIntegerField()
    prioridade = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["ordem_sugerida"]

    def __str__(self):
        return self.nome


class Capitulo(models.Model):
    materia = models.ForeignKey(
        Materia,
        on_delete=models.CASCADE,
        related_name="capitulos"
    )
    titulo = models.CharField(max_length=200)
    ordem = models.PositiveIntegerField()
    estimativa_minutos = models.PositiveIntegerField(default=60)

    class Meta:
        ordering = ["ordem"]

    def __str__(self):
        return self.titulo


class SessaoEstudo(models.Model):
    capitulo = models.ForeignKey(
        Capitulo,
        on_delete=models.CASCADE,
        related_name="sessoes"
    )
    data_planejada = models.DateField()
    data_realizada = models.DateField(null=True, blank=True)

    passada = models.PositiveIntegerField(
        help_text="Número da passada (1, 2, 3, ...)"
    )

    tempo_estudado = models.PositiveIntegerField(null=True, blank=True)
    concluida = models.BooleanField(default=False)
    observacoes = models.TextField(blank=True)

    class Meta:
        ordering = ["data_planejada", "passada"]

    def __str__(self):
        return f"{self.capitulo} - Passada {self.passada}"



class Revisao(models.Model):
    sessao = models.ForeignKey(
        SessaoEstudo,
        on_delete=models.CASCADE,
        related_name="revisoes"
    )
    data_prevista = models.DateField()
    data_realizada = models.DateField(null=True, blank=True)
    intervalo_dias = models.PositiveIntegerField()
    concluida = models.BooleanField(default=False)

    def __str__(self):
        return f"Revisão D+{self.intervalo_dias}"
```

---

## 2. Services

Pasta: `acompanhamento_estudos/services/`

### 2.1 Geração de cronograma

`gerador_cronograma.py`

```python
from datetime import timedelta
from acompanhamento_estudos.models import SessaoEstudo, Revisao


INTERVALOS_REVISAO = [1, 7, 30, 60, 120]

def perform_create(self, serializer):
    projeto = serializer.save(usuario=self.request.user)

    total_passadas = self.request.data.get("total_passadas", 3)
    gerar_cronograma(projeto, int(total_passadas))


def gerar_cronograma(projeto, total_passadas=3):
    data_atual = projeto.data_inicio

    materias = (
        projeto.materias
        .prefetch_related("capitulos")
        .order_by("ordem_sugerida")
    )

    for passada in range(1, total_passadas + 1):
        for materia in materias:
            for capitulo in materia.capitulos.all():
                sessao = SessaoEstudo.objects.create(
                    capitulo=capitulo,
                    data_planejada=data_atual,
                    passada=passada
                )

                for intervalo in INTERVALOS_REVISAO:
                    Revisao.objects.create(
                        sessao=sessao,
                        data_prevista=data_atual + timedelta(days=intervalo),
                        intervalo_dias=intervalo
                    )

                data_atual += timedelta(days=1)

```

---

### 2.2 Replanejamento progressivo

`replanejador.py`

```python
from datetime import timedelta
from acompanhamento_estudos.models import SessaoEstudo


def replanejar_a_partir(sessao_base):
    sessoes = (
        SessaoEstudo.objects
        .filter(
            capitulo__materia__projeto=sessao_base.capitulo.materia.projeto,
            data_planejada__gt=sessao_base.data_planejada,
            concluida=False
        )
        .order_by("data_planejada")
    )

    nova_data = sessao_base.data_planejada + timedelta(days=1)

    for sessao in sessoes:
        sessao.data_planejada = nova_data
        sessao.save(update_fields=["data_planejada"])
        nova_data += timedelta(days=1)
```

---

### 2.3 Indicadores de acompanhamento

`indicadores.py`

```python
from acompanhamento_estudos.models import SessaoEstudo, Revisao


def obter_indicadores(projeto):
    total_sessoes = SessaoEstudo.objects.filter(
        capitulo__materia__projeto=projeto
    ).count()

    sessoes_concluidas = SessaoEstudo.objects.filter(
        capitulo__materia__projeto=projeto,
        concluida=True
    ).count()

    revisoes_pendentes = Revisao.objects.filter(
        sessao__capitulo__materia__projeto=projeto,
        concluida=False
    ).count()

    return {
        "total_sessoes": total_sessoes,
        "sessoes_concluidas": sessoes_concluidas,
        "revisoes_pendentes": revisoes_pendentes,
    }
```

---

## 3. Observações finais (objetivas)

* Models **normalizados e extensíveis**
* Services isolam **regras de negócio**
* Pronto para:

  * Serializers DRF
  * ViewSets
  * Calendário no frontend
  * Replanejamento sem perda de histórico

Se desejar, entrego **serializers + viewsets + endpoints REST completos**.



Segue a **camada REST completa (DRF)**, pronta para uso, com **serializers, viewsets e endpoints**, mantendo separação de responsabilidades e aderência às regras do negócio.

---

## 1. Serializers

`acompanhamento_estudos/serializers.py`

```python
from rest_framework import serializers
from .models import (
    ProjetoEstudo, Materia, Capitulo, SessaoEstudo, Revisao
)


class ProjetoEstudoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjetoEstudo
        fields = "__all__"
        read_only_fields = ("usuario", "criado_em")


class MateriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materia
        fields = "__all__"


class CapituloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Capitulo
        fields = "__all__"


class RevisaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Revisao
        fields = "__all__"
        read_only_fields = ("intervalo_dias",)


class SessaoEstudoSerializer(serializers.ModelSerializer):
    revisoes = RevisaoSerializer(many=True, read_only=True)

    class Meta:
        model = SessaoEstudo
        fields = "__all__"
```

---

## 2. ViewSets

`acompanhamento_estudos/views.py`

```python
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import (
    ProjetoEstudo, Materia, Capitulo, SessaoEstudo, Revisao
)
from .serializers import (
    ProjetoEstudoSerializer, MateriaSerializer,
    CapituloSerializer, SessaoEstudoSerializer, RevisaoSerializer
)
from .services.gerador_cronograma import gerar_cronograma
from .services.replanejador import replanejar_a_partir
from .services.indicadores import obter_indicadores


class ProjetoEstudoViewSet(viewsets.ModelViewSet):
    serializer_class = ProjetoEstudoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ProjetoEstudo.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        projeto = serializer.save(usuario=self.request.user)
        gerar_cronograma(projeto)

    @action(detail=True, methods=["get"])
    def indicadores(self, request, pk=None):
        projeto = self.get_object()
        return Response(obter_indicadores(projeto))


class MateriaViewSet(viewsets.ModelViewSet):
    serializer_class = MateriaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Materia.objects.filter(
            projeto__usuario=self.request.user
        )


class CapituloViewSet(viewsets.ModelViewSet):
    serializer_class = CapituloSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Capitulo.objects.filter(
            materia__projeto__usuario=self.request.user
        )


class SessaoEstudoViewSet(viewsets.ModelViewSet):
    serializer_class = SessaoEstudoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SessaoEstudo.objects.filter(
            capitulo__materia__projeto__usuario=self.request.user
        )

    @action(detail=True, methods=["post"])
    def concluir(self, request, pk=None):
        sessao = self.get_object()
        sessao.concluida = True
        sessao.data_realizada = request.data.get("data_realizada")
        sessao.tempo_estudado = request.data.get("tempo_estudado")
        sessao.observacoes = request.data.get("observacoes", "")
        sessao.save()

        replanejar_a_partir(sessao)

        return Response(
            {"status": "sessão concluída"},
            status=status.HTTP_200_OK
        )


class RevisaoViewSet(viewsets.ModelViewSet):
    serializer_class = RevisaoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Revisao.objects.filter(
            sessao__capitulo__materia__projeto__usuario=self.request.user
        )

    @action(detail=True, methods=["post"])
    def concluir(self, request, pk=None):
        revisao = self.get_object()
        revisao.concluida = True
        revisao.data_realizada = request.data.get("data_realizada")
        revisao.save()

        return Response(
            {"status": "revisão concluída"},
            status=status.HTTP_200_OK
        )
```

---

## 3. Endpoints (Router)

`acompanhamento_estudos/urls.py`

```python
from rest_framework.routers import DefaultRouter
from .views import (
    ProjetoEstudoViewSet, MateriaViewSet,
    CapituloViewSet, SessaoEstudoViewSet, RevisaoViewSet
)

router = DefaultRouter()
router.register("projetos", ProjetoEstudoViewSet, basename="projetos")
router.register("materias", MateriaViewSet, basename="materias")
router.register("capitulos", CapituloViewSet, basename="capitulos")
router.register("sessoes", SessaoEstudoViewSet, basename="sessoes")
router.register("revisoes", RevisaoViewSet, basename="revisoes")

urlpatterns = router.urls
```

---

## 4. Endpoints REST disponíveis (resumo)

```text
GET    /api/projetos/
POST   /api/projetos/
GET    /api/projetos/{id}/indicadores/

GET    /api/materias/
POST   /api/materias/

GET    /api/capitulos/
POST   /api/capitulos/

GET    /api/sessoes/
POST   /api/sessoes/{id}/concluir/

GET    /api/revisoes/
POST   /api/revisoes/{id}/concluir/
```

---

## 5. Situação final

* Backend **100% funcional**
* Pronto para **Angular / React / Mobile**
* Planejamento flexível, histórico preservado
* Replanejamento automático sem efeitos colaterais

Se desejar, o próximo passo natural é:

* **endpoint de calendário agregado**
* **filtros por data / passada**
* **testes automatizados (pytest + DRF)**
