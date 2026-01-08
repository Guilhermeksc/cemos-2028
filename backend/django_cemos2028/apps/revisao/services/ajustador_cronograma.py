from datetime import timedelta
from django.db import models
from django_cemos2028.apps.revisao.models import SessaoEstudo, Revisao, Materia


# Intervalos obrigatórios de revisão conforme regras de negócio
INTERVALOS_REVISAO = [1, 7, 30, 60, 120]


def ajustar_cronograma_por_materia(projeto, dias_por_materia_passada):
    """
    Ajusta o cronograma redistribuindo os dias para cada matéria por passada.
    
    Args:
        projeto: Instância de ProjetoEstudo
        dias_por_materia_passada: Dict com estrutura {materia_id: {passada: dias}}
                                 Exemplo: {1: {1: 5, 2: 3, 3: 2}, 2: {1: 4, 2: 2, 3: 1}}
    
    A lógica:
    - Mantém sessões concluídas inalteradas
    - Redistribui apenas sessões não concluídas
    - Recalcula revisões para sessões ajustadas
    - Mantém a ordem das matérias conforme ordem_sugerida
    """
    # Busca todas as sessões do projeto, ordenadas
    todas_sessoes = SessaoEstudo.objects.filter(
        capitulo__materia__projeto=projeto
    ).select_related('capitulo', 'capitulo__materia').order_by('data_planejada', 'passada', 'capitulo__materia__ordem_sugerida')
    
    # Encontra a última sessão concluída para usar como ponto de partida
    ultima_sessao_concluida = todas_sessoes.filter(concluida=True).order_by('-data_planejada').first()
    
    # Data inicial para replanejamento
    if ultima_sessao_concluida:
        data_atual = ultima_sessao_concluida.data_planejada + timedelta(days=1)
    else:
        data_atual = projeto.data_inicio
    
    # Agrupa sessões por matéria e passada, ordenadas por ordem do capítulo
    sessoes_por_materia_passada = {}
    for sessao in todas_sessoes.filter(concluida=False).order_by('capitulo__materia__ordem_sugerida', 'passada', 'capitulo__ordem'):
        materia_id = sessao.capitulo.materia.id
        passada = sessao.passada
        
        if materia_id not in sessoes_por_materia_passada:
            sessoes_por_materia_passada[materia_id] = {}
        if passada not in sessoes_por_materia_passada[materia_id]:
            sessoes_por_materia_passada[materia_id][passada] = []
        
        sessoes_por_materia_passada[materia_id][passada].append(sessao)
    
    # Busca matérias ordenadas
    materias = projeto.materias.order_by('ordem_sugerida')
    
    # Obtém total de passadas do projeto
    total_passadas = todas_sessoes.aggregate(
        max_passada=models.Max('passada')
    )['max_passada'] or 3
    
    # Redistribui sessões respeitando datas das matérias
    for passada in range(1, total_passadas + 1):
        for materia in materias:
            materia_id = materia.id
            
            # Obtém sessões não concluídas desta matéria nesta passada
            sessoes_materia = sessoes_por_materia_passada.get(materia_id, {}).get(passada, [])
            
            if not sessoes_materia:
                continue
            
            # Determina data de início para esta matéria nesta passada
            if materia.data_inicio:
                if passada == 1:
                    data_inicio_materia = materia.data_inicio
                else:
                    # Para passadas seguintes, busca última sessão da passada anterior
                    sessoes_passada_anterior = SessaoEstudo.objects.filter(
                        capitulo__materia=materia,
                        passada=passada - 1
                    ).order_by('-data_planejada').first()
                    
                    if sessoes_passada_anterior:
                        data_inicio_materia = sessoes_passada_anterior.data_planejada + timedelta(days=1)
                    else:
                        data_inicio_materia = materia.data_inicio
            else:
                # Se não tem data_inicio, usa ordem sequencial
                data_inicio_materia = data_atual
            
            # Obtém quantidade de dias configurada para esta matéria nesta passada
            dias_configurados = dias_por_materia_passada.get(materia_id, {}).get(passada, None)
            
            if dias_configurados is None or dias_configurados <= 0:
                # Se não configurado, mantém distribuição original (1 dia por capítulo)
                dias_configurados = len(sessoes_materia)
            
            # Se tem data_fim definida e é primeira passada, ajusta dias disponíveis
            if materia.data_fim and passada == 1:
                dias_disponiveis = (materia.data_fim - data_inicio_materia).days + 1
                if dias_disponiveis > 0 and dias_disponiveis < dias_configurados:
                    dias_configurados = dias_disponiveis
            
            # Calcula quantos capítulos por dia
            total_capitulos = len(sessoes_materia)
            if dias_configurados >= total_capitulos:
                # Se dias >= capítulos, distribui 1 capítulo por dia
                capitulos_por_dia = [1] * total_capitulos
            else:
                # Distribui capítulos de forma equilibrada
                capitulos_por_dia = []
                base = total_capitulos // dias_configurados
                resto = total_capitulos % dias_configurados
                
                for i in range(dias_configurados):
                    capitulos_por_dia.append(base + (1 if i < resto else 0))
            
            # Atualiza datas das sessões
            indice_sessao = 0
            for dia_idx, qtd_capitulos in enumerate(capitulos_por_dia):
                for _ in range(qtd_capitulos):
                    if indice_sessao < len(sessoes_materia):
                        sessao = sessoes_materia[indice_sessao]
                        sessao.data_planejada = data_inicio_materia + timedelta(days=dia_idx)
                        sessao.save(update_fields=['data_planejada'])
                        
                        # Atualiza revisões desta sessão
                        Revisao.objects.filter(sessao=sessao).delete()
                        for intervalo in INTERVALOS_REVISAO:
                            Revisao.objects.create(
                                sessao=sessao,
                                data_prevista=sessao.data_planejada + timedelta(days=intervalo),
                                intervalo_dias=intervalo
                            )
                        
                        indice_sessao += 1
                
                if indice_sessao >= len(sessoes_materia):
                    break
            
            # Atualiza contador sequencial se não tinha data definida
            if not materia.data_inicio:
                data_atual = data_inicio_materia + timedelta(days=dias_configurados)

