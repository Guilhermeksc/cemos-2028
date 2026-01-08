from datetime import timedelta
from django_cemos2028.apps.revisao.models import SessaoEstudo, Revisao


# Intervalos obrigatórios de revisão conforme regras de negócio
INTERVALOS_REVISAO = [1, 7, 30, 60, 120]


def gerar_cronograma(projeto, total_passadas=3):
    """
    Gera o cronograma completo de estudos para um projeto.
    
    Cria todas as sessões de estudo e suas respectivas revisões,
    respeitando as datas de início e fim definidas para cada matéria.
    Se não houver datas definidas, usa ordem sequencial.
    
    Args:
        projeto: Instância de ProjetoEstudo
        total_passadas: Número de passadas (padrão: 3)
    """
    # Busca matérias ordenadas pela ordem sugerida
    materias = (
        projeto.materias
        .prefetch_related("capitulos")
        .order_by("ordem_sugerida")
    )

    # Contador global para matérias sem datas definidas
    data_contador_sequencial = projeto.data_inicio

    # Para cada passada (1ª, 2ª, 3ª...)
    for passada in range(1, total_passadas + 1):
        # Para cada matéria na ordem sugerida
        for materia in materias:
            # Determina data de início para esta matéria nesta passada
            if materia.data_inicio:
                # Se tem data_inicio definida, usa ela para a primeira passada
                # Para passadas subsequentes, calcula baseado na primeira passada
                if passada == 1:
                    data_inicio_materia = materia.data_inicio
                else:
                    # Para passadas seguintes, usa a data_fim da passada anterior ou calcula
                    # Por enquanto, vamos usar a mesma lógica: data_inicio + dias necessários
                    # Isso será refinado quando implementarmos o cálculo de data_fim
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
                data_inicio_materia = data_contador_sequencial

            # Calcula quantos capítulos tem esta matéria
            capitulos = list(materia.capitulos.all())
            total_capitulos = len(capitulos)
            
            if total_capitulos == 0:
                continue

            # Calcula data_fim se não estiver definida
            if materia.data_fim and passada == 1:
                # Se tem data_fim definida, distribui capítulos entre data_inicio e data_fim
                dias_disponiveis = (materia.data_fim - data_inicio_materia).days + 1
                if dias_disponiveis < total_capitulos:
                    # Se não há dias suficientes, distribui 1 capítulo por dia mínimo
                    dias_disponiveis = total_capitulos
                
                # Calcula quantos capítulos por dia
                if dias_disponiveis >= total_capitulos:
                    capitulos_por_dia = [1] * total_capitulos
                else:
                    # Distribui proporcionalmente
                    base = total_capitulos // dias_disponiveis
                    resto = total_capitulos % dias_disponiveis
                    capitulos_por_dia = [base + (1 if i < resto else 0) for i in range(dias_disponiveis)]
            else:
                # Se não tem data_fim ou não é primeira passada, 1 capítulo por dia
                capitulos_por_dia = [1] * total_capitulos

            # Cria sessões distribuindo capítulos
            data_atual = data_inicio_materia
            indice_capitulo = 0
            
            for dia_idx, qtd_capitulos in enumerate(capitulos_por_dia):
                for _ in range(qtd_capitulos):
                    if indice_capitulo < len(capitulos):
                        capitulo = capitulos[indice_capitulo]
                        
                        # Cria a sessão de estudo
                        sessao = SessaoEstudo.objects.create(
                            capitulo=capitulo,
                            data_planejada=data_atual + timedelta(days=dia_idx),
                            passada=passada
                        )

                        # Cria todas as revisões obrigatórias para esta sessão
                        for intervalo in INTERVALOS_REVISAO:
                            Revisao.objects.create(
                                sessao=sessao,
                                data_prevista=sessao.data_planejada + timedelta(days=intervalo),
                                intervalo_dias=intervalo
                            )
                        
                        indice_capitulo += 1
                
                if indice_capitulo >= len(capitulos):
                    break

            # Atualiza contador sequencial se não tinha data definida
            if not materia.data_inicio:
                # Avança baseado no número de dias usados
                dias_usados = len(capitulos_por_dia)
                data_contador_sequencial += timedelta(days=dias_usados)

