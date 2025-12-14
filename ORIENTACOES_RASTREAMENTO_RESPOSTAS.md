# Orientações para Implementação de Rastreamento de Respostas

## 📋 Visão Geral

Este documento contém as orientações completas para implementar um sistema de rastreamento de respostas de questões, permitindo:
- Salvar se o usuário acertou ou errou cada questão
- Atrelar as respostas ao perfil do usuário
- Criar ranking estatístico individual por usuário
- Criar ranking total de todos os acertos (apenas para admin)

---

## 🎯 Objetivos

1. **Rastreamento Individual**: Cada resposta do usuário deve ser salva com:
   - ID da questão
   - Tipo da questão (multipla, vf, correlacao)
   - Resposta do usuário
   - Se acertou ou errou
   - Timestamp da resposta
   - ID do usuário

2. **Estatísticas Individuais**: Permitir que cada usuário visualize:
   - Total de questões respondidas
   - Total de acertos
   - Total de erros
   - Taxa de acerto (%)
   - Histórico de respostas por questão
   - Estatísticas por tipo de questão
   - Estatísticas por bibliografia

3. **Ranking Geral (Admin)**: Permitir que apenas administradores visualizem:
   - Ranking de todos os usuários por total de acertos
   - Estatísticas gerais do sistema
   - Questões mais acertadas/erradas
   - Análise de desempenho por tipo de questão

---

## 🗄️ Backend - Modelo de Dados

### 1. Criar Modelo `RespostaUsuario`

**Arquivo**: `backend/django_cemos2028/apps/perguntas/models.py`

```python
from django.db import models
from django_cemos2028.apps.core.users.models import Usuario

class RespostaUsuario(models.Model):
    """
    Modelo para armazenar respostas dos usuários às questões
    """
    TIPO_CHOICES = [
        ('multipla', 'Múltipla Escolha'),
        ('vf', 'Verdadeiro ou Falso'),
        ('correlacao', 'Correlação'),
    ]
    
    usuario = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        related_name='respostas',
        verbose_name="Usuário"
    )
    
    # Identificação da questão
    pergunta_id = models.IntegerField(verbose_name="ID da Pergunta")
    pergunta_tipo = models.CharField(
        max_length=20,
        choices=TIPO_CHOICES,
        verbose_name="Tipo da Pergunta"
    )
    
    # Resposta do usuário (armazenada como JSON para flexibilidade)
    resposta_usuario = models.JSONField(verbose_name="Resposta do Usuário")
    
    # Resultado
    acertou = models.BooleanField(verbose_name="Acertou")
    
    # Metadados
    timestamp = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Data/Hora da Resposta"
    )
    
    # Informações adicionais para estatísticas
    bibliografia_id = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="ID da Bibliografia"
    )
    assunto = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        verbose_name="Assunto"
    )
    
    class Meta:
        verbose_name = "Resposta do Usuário"
        verbose_name_plural = "Respostas dos Usuários"
        ordering = ['-timestamp']
        # Índice composto para consultas eficientes
        indexes = [
            models.Index(fields=['usuario', 'pergunta_tipo', 'pergunta_id']),
            models.Index(fields=['usuario', 'acertou']),
            models.Index(fields=['usuario', 'timestamp']),
        ]
        # Evitar duplicatas: um usuário pode responder a mesma questão múltiplas vezes
        # Mas cada resposta deve ser registrada separadamente
    
    def __str__(self):
        return f"{self.usuario.username} - {self.get_pergunta_tipo_display()} #{self.pergunta_id} - {'✓' if self.acertou else '✗'}"
```

### 2. Criar Migração

```bash
cd backend
python manage.py makemigrations perguntas
python manage.py migrate
```

---

## 🔌 Backend - API Endpoints

### 1. Serializer

**Arquivo**: `backend/django_cemos2028/apps/perguntas/serializers.py`

```python
from rest_framework import serializers
from .models import RespostaUsuario

class RespostaUsuarioSerializer(serializers.ModelSerializer):
    usuario_username = serializers.CharField(source='usuario.username', read_only=True)
    
    class Meta:
        model = RespostaUsuario
        fields = [
            'id',
            'usuario',
            'usuario_username',
            'pergunta_id',
            'pergunta_tipo',
            'resposta_usuario',
            'acertou',
            'timestamp',
            'bibliografia_id',
            'assunto'
        ]
        read_only_fields = ['id', 'timestamp']

class RespostaUsuarioCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = RespostaUsuario
        fields = [
            'pergunta_id',
            'pergunta_tipo',
            'resposta_usuario',
            'acertou',
            'bibliografia_id',
            'assunto'
        ]
    
    def create(self, validated_data):
        # O usuário é automaticamente definido pelo request.user
        validated_data['usuario'] = self.context['request'].user
        return super().create(validated_data)
```

### 2. ViewSet

**Arquivo**: `backend/django_cemos2028/apps/perguntas/views.py`

Adicionar ao final do arquivo:

```python
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Q, Avg
from django.utils import timezone
from datetime import timedelta
from .models import RespostaUsuario
from .serializers import RespostaUsuarioSerializer, RespostaUsuarioCreateSerializer
from django_cemos2028.apps.core.users.models import Usuario

class RespostaUsuarioViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar respostas dos usuários
    """
    permission_classes = [IsAuthenticated]
    serializer_class = RespostaUsuarioSerializer
    
    def get_queryset(self):
        """
        Usuários só veem suas próprias respostas
        Admins veem todas as respostas
        """
        queryset = RespostaUsuario.objects.select_related('usuario').all()
        
        if not self.request.user.is_staff:
            queryset = queryset.filter(usuario=self.request.user)
        
        return queryset.order_by('-timestamp')
    
    def get_serializer_class(self):
        if self.action == 'create':
            return RespostaUsuarioCreateSerializer
        return RespostaUsuarioSerializer
    
    @action(detail=False, methods=['post'])
    def registrar_resposta(self, request):
        """
        Endpoint para registrar uma resposta do usuário
        POST /api/respostas-usuario/registrar_resposta/
        
        Body:
        {
            "pergunta_id": 1,
            "pergunta_tipo": "multipla",  // ou "vf" ou "correlacao"
            "resposta_usuario": "a",  // ou true/false para VF, ou objeto para correlação
            "bibliografia_id": 1,  // opcional
            "assunto": "Logística"  // opcional
        }
        """
        serializer = RespostaUsuarioCreateSerializer(
            data=request.data,
            context={'request': request}
        )
        
        if serializer.is_valid():
            # Verificar se a resposta está correta
            acertou = self._verificar_resposta(
                serializer.validated_data['pergunta_id'],
                serializer.validated_data['pergunta_tipo'],
                serializer.validated_data['resposta_usuario']
            )
            
            serializer.validated_data['acertou'] = acertou
            resposta = serializer.save()
            
            return Response({
                'id': resposta.id,
                'acertou': resposta.acertou,
                'message': 'Resposta registrada com sucesso'
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def _verificar_resposta(self, pergunta_id, pergunta_tipo, resposta_usuario):
        """
        Verifica se a resposta do usuário está correta
        """
        if pergunta_tipo == 'multipla':
            from .models import PerguntaMultiplaModel
            try:
                pergunta = PerguntaMultiplaModel.objects.get(id=pergunta_id)
                return pergunta.resposta_correta.lower() == resposta_usuario.lower()
            except PerguntaMultiplaModel.DoesNotExist:
                return False
        
        elif pergunta_tipo == 'vf':
            from .models import PerguntaVFModel
            try:
                pergunta = PerguntaVFModel.objects.get(id=pergunta_id)
                # A resposta correta é sempre True (verdadeiro)
                resposta_correta = True
                return resposta_usuario == resposta_correta
            except PerguntaVFModel.DoesNotExist:
                return False
        
        elif pergunta_tipo == 'correlacao':
            from .models import PerguntaCorrelacaoModel
            try:
                pergunta = PerguntaCorrelacaoModel.objects.get(id=pergunta_id)
                # Converter resposta do usuário para formato do backend
                resposta_convertida = self._converter_resposta_correlacao(resposta_usuario)
                return pergunta.resposta_correta == resposta_convertida
            except PerguntaCorrelacaoModel.DoesNotExist:
                return False
        
        return False
    
    def _converter_resposta_correlacao(self, resposta_usuario):
        """
        Converte resposta de correlação do formato frontend para backend
        Frontend: {1: 'A', 2: 'B', 3: 'C'}
        Backend: {'0': '0', '1': '1', '2': '2'}
        """
        resposta_convertida = {}
        for key, letter in resposta_usuario.items():
            item_index = (int(key) - 1).toString()
            letter_index = ord(letter) - ord('A')
            resposta_convertida[item_index] = str(letter_index)
        return resposta_convertida
    
    @action(detail=False, methods=['get'])
    def estatisticas_usuario(self, request):
        """
        Retorna estatísticas do usuário logado
        GET /api/respostas-usuario/estatisticas_usuario/
        """
        usuario = request.user
        
        # Total de respostas
        total_respostas = RespostaUsuario.objects.filter(usuario=usuario).count()
        
        # Total de acertos e erros
        total_acertos = RespostaUsuario.objects.filter(usuario=usuario, acertou=True).count()
        total_erros = RespostaUsuario.objects.filter(usuario=usuario, acertou=False).count()
        
        # Taxa de acerto
        taxa_acerto = (total_acertos / total_respostas * 100) if total_respostas > 0 else 0
        
        # Por tipo de questão
        por_tipo = RespostaUsuario.objects.filter(usuario=usuario).values('pergunta_tipo').annotate(
            total=Count('id'),
            acertos=Count('id', filter=Q(acertou=True)),
            erros=Count('id', filter=Q(acertou=False))
        )
        
        # Por bibliografia
        por_bibliografia = RespostaUsuario.objects.filter(
            usuario=usuario,
            bibliografia_id__isnull=False
        ).values('bibliografia_id').annotate(
            total=Count('id'),
            acertos=Count('id', filter=Q(acertou=True)),
            erros=Count('id', filter=Q(acertou=False))
        )
        
        # Últimas respostas
        ultimas_respostas = RespostaUsuario.objects.filter(usuario=usuario)[:10]
        
        return Response({
            'total_respostas': total_respostas,
            'total_acertos': total_acertos,
            'total_erros': total_erros,
            'taxa_acerto': round(taxa_acerto, 2),
            'por_tipo': list(por_tipo),
            'por_bibliografia': list(por_bibliografia),
            'ultimas_respostas': RespostaUsuarioSerializer(ultimas_respostas, many=True).data
        })
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def ranking_geral(self, request):
        """
        Retorna ranking geral de todos os usuários (apenas para admin)
        GET /api/respostas-usuario/ranking_geral/
        """
        if not request.user.is_staff:
            return Response(
                {'error': 'Acesso negado. Apenas administradores podem visualizar o ranking geral.'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Ranking por total de acertos
        ranking_acertos = Usuario.objects.annotate(
            total_acertos=Count('respostas', filter=Q(respostas__acertou=True)),
            total_respostas=Count('respostas')
        ).filter(total_respostas__gt=0).order_by('-total_acertos', '-total_respostas')
        
        ranking_data = []
        for usuario in ranking_acertos:
            taxa = (usuario.total_acertos / usuario.total_respostas * 100) if usuario.total_respostas > 0 else 0
            ranking_data.append({
                'usuario_id': usuario.id,
                'username': usuario.username,
                'total_acertos': usuario.total_acertos,
                'total_respostas': usuario.total_respostas,
                'taxa_acerto': round(taxa, 2)
            })
        
        # Estatísticas gerais
        total_usuarios = Usuario.objects.filter(respostas__isnull=False).distinct().count()
        total_respostas_sistema = RespostaUsuario.objects.count()
        total_acertos_sistema = RespostaUsuario.objects.filter(acertou=True).count()
        
        # Questões mais acertadas/erradas
        questoes_mais_acertadas = RespostaUsuario.objects.filter(acertou=True).values(
            'pergunta_id', 'pergunta_tipo'
        ).annotate(
            total=Count('id')
        ).order_by('-total')[:10]
        
        questoes_mais_erradas = RespostaUsuario.objects.filter(acertou=False).values(
            'pergunta_id', 'pergunta_tipo'
        ).annotate(
            total=Count('id')
        ).order_by('-total')[:10]
        
        return Response({
            'ranking': ranking_data,
            'estatisticas_gerais': {
                'total_usuarios': total_usuarios,
                'total_respostas': total_respostas_sistema,
                'total_acertos': total_acertos_sistema,
                'taxa_acerto_geral': round(
                    (total_acertos_sistema / total_respostas_sistema * 100) if total_respostas_sistema > 0 else 0,
                    2
                )
            },
            'questoes_mais_acertadas': list(questoes_mais_acertadas),
            'questoes_mais_erradas': list(questoes_mais_erradas)
        })
```

### 3. Registrar URLs

**Arquivo**: `backend/django_cemos2028/apps/perguntas/urls.py`

Adicionar:

```python
from .views import RespostaUsuarioViewSet

router.register(r'respostas-usuario', RespostaUsuarioViewSet, basename='respostas-usuario')
```

### 4. Registrar no Admin

**Arquivo**: `backend/django_cemos2028/apps/perguntas/admin.py`

```python
from .models import RespostaUsuario

@admin.register(RespostaUsuario)
class RespostaUsuarioAdmin(admin.ModelAdmin):
    list_display = ['usuario', 'pergunta_tipo', 'pergunta_id', 'acertou', 'timestamp']
    list_filter = ['pergunta_tipo', 'acertou', 'timestamp']
    search_fields = ['usuario__username', 'pergunta_id']
    readonly_fields = ['timestamp']
    date_hierarchy = 'timestamp'
```

---

## 🎨 Frontend - Serviço

### 1. Adicionar Métodos ao Serviço

**Arquivo**: `frontend-cemos/src/app/services/perguntas.service.ts`

Adicionar ao final da classe:

```typescript
// ==================== RASTREAMENTO DE RESPOSTAS ====================

/**
 * Registra uma resposta do usuário
 */
registrarResposta(data: {
  pergunta_id: number;
  pergunta_tipo: 'multipla' | 'vf' | 'correlacao';
  resposta_usuario: any;
  bibliografia_id?: number;
  assunto?: string;
}): Observable<{ id: number; acertou: boolean; message: string }> {
  return this.http.post<{ id: number; acertou: boolean; message: string }>(
    `${this.apiUrl}/respostas-usuario/registrar_resposta/`,
    data,
    { headers: this.getAuthHeaders() }
  );
}

/**
 * Obtém estatísticas do usuário logado
 */
getEstatisticasUsuario(): Observable<any> {
  return this.http.get<any>(
    `${this.apiUrl}/respostas-usuario/estatisticas_usuario/`,
    { headers: this.getAuthHeaders() }
  );
}

/**
 * Obtém ranking geral (apenas para admin)
 */
getRankingGeral(): Observable<any> {
  return this.http.get<any>(
    `${this.apiUrl}/respostas-usuario/ranking_geral/`,
    { headers: this.getAuthHeaders() }
  );
}
```

**Nota**: Você precisará adicionar o método `getAuthHeaders()` se ainda não existir, ou usar o `AuthService` para obter os headers de autenticação.

---

## 🎨 Frontend - Componente Principal

### 1. Modificar `onAnswerSubmitted` em `perguntas.ts`

**Arquivo**: `frontend-cemos/src/app/components/perguntas/perguntas.ts`

Modificar o método `onAnswerSubmitted` para registrar a resposta:

```typescript
// Método unificado para processar respostas dos componentes filhos
onAnswerSubmitted(event: { questionId: number, answer: any }) {
  const { questionId, answer } = event;
  
  console.log('📝 Resposta recebida:', { questionId, answer, activeTab: this.activeTab });

  const currentTab = this.tabs[this.activeTab];

  // Buscar a questão
  const question = currentTab.simuladoQuestions.find(q => {
    if (q.id !== questionId) return false;
    
    if (typeof answer === 'boolean') {
      return q.tipo === 'vf';
    } else if (typeof answer === 'string') {
      return q.tipo === 'multipla';
    } else if (typeof answer === 'object' && answer !== null) {
      return q.tipo === 'correlacao';
    }
    
    return false;
  });

  if (!question || !question.uniqueKey) {
    console.error('❌ Questão não encontrada ou sem uniqueKey');
    return;
  }

  question.userAnswer = answer;
  question.isCorrect = this.checkAnswer(question, answer);
  
  // Atualizar resultado da questão
  currentTab.questionResults[question.uniqueKey] = {
    answered: true,
    isCorrect: question.isCorrect,
    showResult: true
  };

  // ✅ NOVO: Registrar resposta no backend
  this.registrarRespostaNoBackend(question, answer);

  console.log('✅ Resposta processada:', {
    questionId,
    uniqueKey: question.uniqueKey,
    tipo: question.tipo,
    isCorrect: question.isCorrect
  });

  this.cdr.detectChanges();
}

/**
 * Registra a resposta do usuário no backend
 */
private registrarRespostaNoBackend(question: SimuladoQuestion, answer: any): void {
  const bibliografiaId = question.data.bibliografia || question.data.bibliografia_id;
  const assunto = question.data.assunto;

  const data = {
    pergunta_id: question.id,
    pergunta_tipo: question.tipo,
    resposta_usuario: answer,
    bibliografia_id: bibliografiaId,
    assunto: assunto
  };

  this.perguntasService.registrarResposta(data).subscribe({
    next: (response) => {
      console.log('✅ Resposta registrada no backend:', response);
    },
    error: (error) => {
      console.error('❌ Erro ao registrar resposta no backend:', error);
      // Não bloquear o fluxo se houver erro no registro
    }
  });
}
```

### 2. Injetar AuthService (se necessário)

Se o serviço precisar de autenticação, adicione:

```typescript
import { AuthService } from '../../services/auth.service';

// No constructor:
private authService = inject(AuthService);

// E modifique o método getAuthHeaders no serviço para usar:
getAuthHeaders(): HttpHeaders {
  return this.authService.getAuthHeaders();
}
```

---

## 📊 Frontend - Componente de Estatísticas

### 1. Criar Componente de Estatísticas

**Arquivo**: `frontend-cemos/src/app/components/perguntas/estatisticas/estatisticas.ts`

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerguntasService } from '../../../services/perguntas.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-estatisticas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estatisticas.html',
  styleUrl: './estatisticas.scss'
})
export class EstatisticasComponent implements OnInit {
  private perguntasService = inject(PerguntasService);
  private authService = inject(AuthService);

  estatisticasUsuario: any = null;
  rankingGeral: any = null;
  isLoading = false;
  isAdmin = false;

  ngOnInit() {
    this.isAdmin = this.authService.currentUser$.value?.is_staff || false;
    this.carregarEstatisticasUsuario();
    
    if (this.isAdmin) {
      this.carregarRankingGeral();
    }
  }

  carregarEstatisticasUsuario() {
    this.isLoading = true;
    this.perguntasService.getEstatisticasUsuario().subscribe({
      next: (data) => {
        this.estatisticasUsuario = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar estatísticas:', error);
        this.isLoading = false;
      }
    });
  }

  carregarRankingGeral() {
    this.perguntasService.getRankingGeral().subscribe({
      next: (data) => {
        this.rankingGeral = data;
      },
      error: (error) => {
        console.error('Erro ao carregar ranking geral:', error);
      }
    });
  }
}
```

### 2. Template de Estatísticas

**Arquivo**: `frontend-cemos/src/app/components/perguntas/estatisticas/estatisticas.html`

```html
<div class="estatisticas-container">
  <h2>Minhas Estatísticas</h2>
  
  <div *ngIf="isLoading" class="loading">
    Carregando estatísticas...
  </div>
  
  <div *ngIf="estatisticasUsuario && !isLoading" class="stats-grid">
    <div class="stat-card">
      <h3>Total de Respostas</h3>
      <p class="stat-value">{{ estatisticasUsuario.total_respostas }}</p>
    </div>
    
    <div class="stat-card success">
      <h3>Acertos</h3>
      <p class="stat-value">{{ estatisticasUsuario.total_acertos }}</p>
    </div>
    
    <div class="stat-card error">
      <h3>Erros</h3>
      <p class="stat-value">{{ estatisticasUsuario.total_erros }}</p>
    </div>
    
    <div class="stat-card">
      <h3>Taxa de Acerto</h3>
      <p class="stat-value">{{ estatisticasUsuario.taxa_acerto }}%</p>
    </div>
  </div>

  <!-- Ranking Geral (apenas para admin) -->
  <div *ngIf="isAdmin && rankingGeral" class="ranking-section">
    <h2>Ranking Geral</h2>
    <table class="ranking-table">
      <thead>
        <tr>
          <th>Posição</th>
          <th>Usuário</th>
          <th>Acertos</th>
          <th>Total</th>
          <th>Taxa</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of rankingGeral.ranking; let i = index">
          <td>{{ i + 1 }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.total_acertos }}</td>
          <td>{{ item.total_respostas }}</td>
          <td>{{ item.taxa_acerto }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

---

## ✅ Checklist de Implementação

### Backend
- [ ] Criar modelo `RespostaUsuario`
- [ ] Criar e executar migração
- [ ] Criar serializers (`RespostaUsuarioSerializer`, `RespostaUsuarioCreateSerializer`)
- [ ] Criar ViewSet com endpoints:
  - [ ] `registrar_resposta` (POST)
  - [ ] `estatisticas_usuario` (GET)
  - [ ] `ranking_geral` (GET, apenas admin)
- [ ] Registrar ViewSet nas URLs
- [ ] Registrar modelo no Admin
- [ ] Testar endpoints com Postman/Thunder Client

### Frontend
- [ ] Adicionar métodos ao `PerguntasService`:
  - [ ] `registrarResposta()`
  - [ ] `getEstatisticasUsuario()`
  - [ ] `getRankingGeral()`
- [ ] Modificar `onAnswerSubmitted()` em `perguntas.ts` para chamar `registrarResposta()`
- [ ] Criar componente de estatísticas (opcional)
- [ ] Criar interface para visualização de ranking (opcional)
- [ ] Testar fluxo completo de registro de respostas

### Testes
- [ ] Testar registro de resposta para cada tipo de questão
- [ ] Verificar se respostas estão sendo salvas corretamente
- [ ] Verificar estatísticas individuais
- [ ] Verificar ranking geral (apenas admin)
- [ ] Testar permissões (usuário comum não pode ver ranking geral)

---

## 🔍 Pontos de Atenção

1. **Autenticação**: Certifique-se de que todos os endpoints requerem autenticação
2. **Permissões**: O ranking geral deve ser acessível apenas para administradores
3. **Performance**: Considere adicionar cache para estatísticas se necessário
4. **Validação**: Valide sempre os dados recebidos antes de salvar
5. **Tratamento de Erros**: Implemente tratamento adequado de erros no frontend
6. **Conversão de Respostas**: Preste atenção especial na conversão de respostas de correlação entre frontend e backend

---

## 📝 Notas Adicionais

- Cada resposta é registrada separadamente, permitindo que o usuário responda a mesma questão múltiplas vezes
- O sistema mantém histórico completo de todas as respostas
- As estatísticas são calculadas em tempo real a partir dos registros
- Considere adicionar paginação para listagens grandes de respostas
- Para melhor performance, considere criar views materializadas ou cache para estatísticas complexas

---

## 🚀 Próximos Passos (Opcional)

1. Adicionar filtros de data nas estatísticas
2. Criar gráficos de desempenho ao longo do tempo
3. Adicionar comparação entre usuários (se permitido)
4. Implementar notificações de conquistas/marcos
5. Adicionar exportação de estatísticas em PDF/Excel
6. Criar dashboard administrativo mais completo
