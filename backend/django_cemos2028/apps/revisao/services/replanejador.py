from datetime import timedelta
from django_cemos2028.apps.revisao.models import SessaoEstudo


def replanejar_a_partir(sessao_base):
    """
    Replaneja as sessões futuras após uma sessão concluída.
    
    Ajusta as datas planejadas das sessões não concluídas do mesmo projeto,
    mantendo o histórico e sem apagar dados anteriores.
    
    Args:
        sessao_base: Instância de SessaoEstudo que foi concluída
    """
    projeto = sessao_base.capitulo.materia.projeto
    
    # Busca todas as sessões futuras não concluídas do mesmo projeto
    sessoes = (
        SessaoEstudo.objects
        .filter(
            capitulo__materia__projeto=projeto,
            data_planejada__gt=sessao_base.data_planejada,
            concluida=False
        )
        .order_by("data_planejada")
    )

    # Define a nova data base (dia seguinte à sessão concluída)
    nova_data = sessao_base.data_planejada + timedelta(days=1)

    # Replaneja cada sessão futura
    for sessao in sessoes:
        sessao.data_planejada = nova_data
        sessao.save(update_fields=["data_planejada"])
        nova_data += timedelta(days=1)

