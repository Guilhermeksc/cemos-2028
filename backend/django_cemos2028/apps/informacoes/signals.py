import os
import logging
import pandas as pd
from django.conf import settings
from django.db import transaction
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import PresidentesModel, FilosofosModel, CronologiaModel, ConceitosModel, HiperlinksModel
from django_cemos2028.apps.bibliografia.models import (
    BibliografiaModel,
    CapitulosBibliografiaModel,
)

logger = logging.getLogger(__name__)

FIXTURE_DIR = os.path.join(
    settings.BASE_DIR,
    'django_cemos2028', 'apps', 'informacoes', 'fixtures'
)


def _as_int(v):
    if pd.isna(v):
        return None
    try:
        return int(float(v))
    except Exception:
        return None


def _as_clean_str(v):
    """Converte valores do Excel para string sem sufixo '.0' quando for inteiro."""
    if pd.isna(v) or v is None:
        return None
    try:
        f = float(v)
        if f.is_integer():
            return str(int(f))
        return str(f)
    except Exception:
        s = str(v).strip()
        # fallback: remove '.0' final se existir
        if s.endswith('.0'):
            try:
                f = float(s)
                if float(f).is_integer():
                    return str(int(f))
            except Exception:
                pass
        return s or None


def _get_bibliografia(row_value, ctx, row_index):
    bibliografia_id = _as_int(row_value)
    if bibliografia_id is None:
        logger.warning(f"⚠️ ID de bibliografia inválido em {ctx} (linha {row_index}): {row_value}")
        return None
    try:
        return BibliografiaModel.objects.get(id=bibliografia_id)
    except BibliografiaModel.DoesNotExist:
        logger.warning(f"⚠️ Bibliografia ID {bibliografia_id} não encontrada em {ctx} (linha {row_index})")
        return None


def _get_capitulo(row_value, bibliografia=None, ctx=None, row_index=None):
    capitulo_id = _as_int(row_value)
    if capitulo_id is None:
        return None
    try:
        capitulo = CapitulosBibliografiaModel.objects.get(id=capitulo_id)
        if bibliografia and capitulo.bibliografia_id != bibliografia.id:
            logger.warning(
                f"⚠️ Capítulo {capitulo_id} não pertence à bibliografia {bibliografia.id} em {ctx} (linha {row_index})"
            )
        return capitulo
    except CapitulosBibliografiaModel.DoesNotExist:
        logger.warning(f"⚠️ Capítulo ID {capitulo_id} não encontrado em {ctx} (linha {row_index})")
        return None


def _require_fields(row, cols, ctx, row_index=None, string_fields=None):
    """Valida se os campos obrigatórios estão presentes e corretos."""
    if string_fields is None:
        string_fields = []

    missing = {}
    for c in cols:
        if c in string_fields:
            # Para campos string, apenas verifica se não é NaN/vazio
            if pd.isna(row.get(c)) or str(row.get(c)).strip() == '':
                missing[c] = row.get(c)
        else:
            # Para campos numéricos, tenta converter para int
            if _as_int(row.get(c)) is None:
                missing[c] = row.get(c)

    if missing:
        id_info = f"ID={row.get('id')}" if 'id' in row else f"linha={row_index}"
        logger.warning(f"⏭️ Linha ignorada em {ctx} ({id_info}): campos inválidos {missing}")
        return False
    return True


def load_fixture(filename, required_columns=None):
    """Carrega fixture XLSX"""
    xlsx_path = os.path.join(FIXTURE_DIR, filename.replace('.xlsx', '') + '.xlsx')

    df = None
    file_type = ""

    if os.path.exists(xlsx_path):
        try:
            df = pd.read_excel(xlsx_path)
            file_type = "XLSX"
        except Exception as e:
            logger.warning(f"⚠️ Erro ao carregar XLSX {filename}: {e}")

    if df is None:
        logger.warning(f"❌ Nenhum arquivo encontrado: {xlsx_path}")
        return None

    df.columns = df.columns.str.strip()

    if required_columns:
        missing_cols = [col for col in required_columns if col not in df.columns]
        if missing_cols:
            logger.error(f"❌ Colunas obrigatórias ausentes em {filename}: {missing_cols}")
            logger.error(f"📋 Colunas disponíveis: {list(df.columns)}")
            return None

    logger.info(f"📄 Carregado {filename} ({file_type}): {len(df)} linhas, colunas: {list(df.columns)}")
    return df


@receiver(post_migrate)
def load_fixtures_informacoes(sender, **kwargs):
    if sender.name != 'django_cemos2028.apps.informacoes':
        return

    logger.info("📥 Iniciando carga de fixtures XLSX para Informações...")

    try:
        with transaction.atomic():
            # PRESIDENTES
            df = load_fixture('presidentes.xlsx', ['bibliografia_id', 'periodo_presidencial', 'presidente'])
            if df is not None:
                for idx, row in df.iterrows():
                    if not _require_fields(
                        row,
                        ['bibliografia_id', 'periodo_presidencial', 'presidente'],
                        'presidentes',
                        idx,
                        string_fields=['periodo_presidencial', 'presidente']
                    ):
                        continue
                    try:
                        bibliografia = _get_bibliografia(row['bibliografia_id'], 'presidentes', idx)
                        if bibliografia is None:
                            continue
                        PresidentesModel.objects.update_or_create(
                            bibliografia=bibliografia,
                            presidente=_as_clean_str(row['presidente']),
                            defaults={
                                'periodo_presidencial': _as_clean_str(row['periodo_presidencial']),
                                'pais': _as_clean_str(row.get('pais')),
                                'conflitos_principais': _as_clean_str(row.get('conflitos_principais')),
                                'imagem_caminho': _as_clean_str(row.get('imagem_caminho'))
                            }
                        )
                    except Exception as exc:
                        logger.error(f"❌ Erro ao processar presidente (linha {idx}): {exc}")


            # FILÓSOFOS
            df = load_fixture('filosofos.xlsx', ['bibliografia_id', 'periodo_filosofico', 'nome'])
            if df is not None:
                for idx, row in df.iterrows():
                    if not _require_fields(
                        row,
                        ['bibliografia_id', 'periodo_filosofico', 'nome'],
                        'filosofos',
                        idx,
                        string_fields=['periodo_filosofico', 'nome']
                    ):
                        continue
                    try:
                        bibliografia = _get_bibliografia(row['bibliografia_id'], 'filosofos', idx)
                        if bibliografia is None:
                            continue
                        FilosofosModel.objects.update_or_create(
                            bibliografia=bibliografia,
                            nome=_as_clean_str(row['nome']),
                            defaults={
                                'periodo_filosofico': _as_clean_str(row['periodo_filosofico']),
                                'principais_ideias': _as_clean_str(row.get('principais_ideias')),
                                'imagem_caminho': _as_clean_str(row.get('imagem_caminho'))
                            }
                        )
                    except Exception as exc:
                        logger.error(f"❌ Erro ao processar filósofo (linha {idx}): {exc}")


            # CRONOLOGIA
            df = load_fixture('cronologia.xlsx', ['bibliografia_id', 'evento_conflito', 'periodo'])
            if df is not None:
                for idx, row in df.iterrows():
                    if not _require_fields(
                        row,
                        ['bibliografia_id', 'evento_conflito', 'periodo'],
                        'cronologia',
                        idx,
                        string_fields=['evento_conflito', 'periodo']
                    ):
                        continue
                    try:
                        bibliografia = _get_bibliografia(row['bibliografia_id'], 'cronologia', idx)
                        if bibliografia is None:
                            continue
                        CronologiaModel.objects.update_or_create(
                            bibliografia=bibliografia,
                            evento_conflito=_as_clean_str(row['evento_conflito']),
                            defaults={
                                'periodo': _as_clean_str(row['periodo']),
                                'principais_forcas': _as_clean_str(row.get('principais_forcas')),
                                'resultado': _as_clean_str(row.get('resultado')),
                                'consequencias': _as_clean_str(row.get('consequencias'))
                            }
                        )
                    except Exception as exc:
                        logger.error(f"❌ Erro ao processar cronologia (linha {idx}): {exc}")

            # CONCEITOS
            df = load_fixture('conceitos.xlsx', ['bibliografia_id', 'titulo'])
            if df is not None:
                for idx, row in df.iterrows():
                    if not _require_fields(
                        row,
                        ['bibliografia_id', 'titulo'],
                        'conceitos',
                        idx,
                        string_fields=['titulo']
                    ):
                        continue
                    try:
                        bibliografia = _get_bibliografia(row['bibliografia_id'], 'conceitos', idx)
                        if bibliografia is None:
                            continue
                        assunto = _get_capitulo(row.get('assunto'), bibliografia, 'conceitos', idx)
                        ConceitosModel.objects.update_or_create(
                            bibliografia=bibliografia,
                            titulo=_as_clean_str(row['titulo']),
                            defaults={
                                'palavra_chave': _as_clean_str(row.get('palavra_chave')),
                                'assunto': assunto,
                                'descricao': _as_clean_str(row.get('descricao')),
                                'caiu_em_prova': bool(row.get('caiu_em_prova', False)),
                                'ano_prova': _as_int(row.get('ano_prova'))
                            }
                        )
                    except Exception as exc:
                        logger.error(f"❌ Erro ao processar conceito (linha {idx}): {exc}")

        logger.info("✅ Fixtures carregadas com sucesso!")

    except Exception as e:
        logger.error(f"❌ Erro ao carregar fixtures: {e}")
        raise