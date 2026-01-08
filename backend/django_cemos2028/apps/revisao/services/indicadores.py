from django.db import models
from django_cemos2028.apps.revisao.models import SessaoEstudo, Revisao, Materia


def obter_indicadores(projeto):
    """
    Calcula indicadores de acompanhamento do projeto de estudo.
    
    Args:
        projeto: Instância de ProjetoEstudo
        
    Returns:
        dict: Dicionário com indicadores de progresso
    """
    # Total de sessões planejadas
    total_sessoes = SessaoEstudo.objects.filter(
        capitulo__materia__projeto=projeto
    ).count()

    # Sessões concluídas
    sessoes_concluidas = SessaoEstudo.objects.filter(
        capitulo__materia__projeto=projeto,
        concluida=True
    ).count()

    # Revisões pendentes
    revisoes_pendentes = Revisao.objects.filter(
        sessao__capitulo__materia__projeto=projeto,
        concluida=False
    ).count()

    # Revisões concluídas
    revisoes_concluidas = Revisao.objects.filter(
        sessao__capitulo__materia__projeto=projeto,
        concluida=True
    ).count()

    # Matérias iniciadas (pelo menos uma sessão concluída)
    materias_iniciadas = Materia.objects.filter(
        projeto=projeto,
        capitulos__sessoes__concluida=True
    ).distinct().count()

    # Matérias concluídas (todas as passadas de todos os capítulos concluídas)
    materias_concluidas = 0
    for materia in projeto.materias.all():
        total_capitulos = materia.capitulos.count()
        if total_capitulos == 0:
            continue
        
        # Conta quantos capítulos têm todas as passadas concluídas
        capitulos_completos = 0
        for capitulo in materia.capitulos.all():
            sessoes_capitulo = capitulo.sessoes.all()
            if sessoes_capitulo.exists():
                max_passada = sessoes_capitulo.aggregate(
                    max_passada=models.Max('passada')
                )['max_passada']
                sessoes_concluidas_cap = sessoes_capitulo.filter(
                    concluida=True,
                    passada__lte=max_passada
                ).count()
                # Verifica se todas as passadas foram concluídas
                if sessoes_concluidas_cap == sessoes_capitulo.filter(
                    passada__lte=max_passada
                ).count():
                    capitulos_completos += 1
        
        if capitulos_completos == total_capitulos:
            materias_concluidas += 1

    # Calcula percentual de progresso
    percentual_progresso = (
        (sessoes_concluidas / total_sessoes * 100) if total_sessoes > 0 else 0
    )

    return {
        "total_sessoes": total_sessoes,
        "sessoes_concluidas": sessoes_concluidas,
        "sessoes_pendentes": total_sessoes - sessoes_concluidas,
        "revisoes_pendentes": revisoes_pendentes,
        "revisoes_concluidas": revisoes_concluidas,
        "materias_iniciadas": materias_iniciadas,
        "materias_concluidas": materias_concluidas,
        "total_materias": projeto.materias.count(),
        "percentual_progresso": round(percentual_progresso, 2),
    }

