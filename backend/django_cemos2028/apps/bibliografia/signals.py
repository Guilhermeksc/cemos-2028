import os
import logging
import pandas as pd
from django.conf import settings
from django.db import transaction
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import CapitulosBibliografiaModel, MateriaModel, BibliografiaModel

logger = logging.getLogger(__name__)

FIXTURE_DIR = os.path.join(
    settings.BASE_DIR,
    'django_cemos2028', 'apps', 'bibliografia', 'fixtures'
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
def load_fixtures_perguntas(sender, **kwargs):
    if sender.name != 'django_cemos2028.apps.perguntas':
        return

    logger.info("📥 Iniciando carga de fixtures XLSX para Perguntas...")

    try:
        with transaction.atomic():
            # 1. Matérias (carregar de arquivo de fixtures)
            df_materias = load_fixture('materias.xlsx', ['id', 'materia'])
            materias_carregadas = set()
            
            if df_materias is not None:
                logger.info("📄 Processando matérias do arquivo materias.xlsx...")
                loaded_count = 0
                for idx, row in df_materias.iterrows():
                    if _require_fields(row, ['id', 'materia'], 'materias', idx, ['materia']):
                        materia_id = _as_int(row.get('id'))
                        materia_nome = _as_clean_str(row.get('materia'))
                        
                        if materia_id is None:
                            logger.warning(f"⚠️ ID de matéria inválido na linha {idx}")
                            continue
                        
                        if not materia_nome:
                            logger.warning(f"⚠️ Nome de matéria vazio na linha {idx}")
                            continue
                        
                        materia_obj, created = MateriaModel.objects.update_or_create(
                            id=materia_id,
                            defaults={
                                'materia': materia_nome
                            }
                        )
                        materias_carregadas.add(materia_nome)
                        if created:
                            loaded_count += 1
                            logger.info(f"✅ Criada matéria ID {materia_id}: {materia_obj.materia}")
                        else:
                            logger.debug(f"ℹ️ Matéria ID {materia_id} atualizada: {materia_obj.materia}")
                logger.info(f"📊 Total de matérias carregadas do arquivo: {loaded_count} (total processadas: {len(materias_carregadas)})")
            else:
                logger.info("⚠️ Arquivo materias.xlsx não encontrado. Tentando extrair matérias de bibliografias.xlsx...")
            
            # 2. Bibliografias (e extrair matérias se não foram carregadas de arquivo separado)
            df_bibliografias = load_fixture('bibliografias.xlsx', ['id', 'titulo', 'autor', 'materia', 'descricao'])
            if df_bibliografias is not None:
                # Se não carregou matérias de arquivo separado, extrair do arquivo de bibliografias
                if not materias_carregadas:
                    materias_unicas = df_bibliografias['materia'].dropna().unique()
                    logger.info("📄 Extraindo matérias do arquivo bibliografias.xlsx...")
                    for materia_nome in materias_unicas:
                        materia_str = _as_clean_str(materia_nome)
                        if materia_str:
                            materia_obj, created = MateriaModel.objects.get_or_create(
                                materia=materia_str
                            )
                            if created:
                                logger.info(f"✅ Criada matéria extraída: {materia_obj.materia}")
            
            # 3. Bibliografias
            if df_bibliografias is not None:
                logger.info("📄 Processando bibliografias...")
                for idx, row in df_bibliografias.iterrows():
                    if _require_fields(row, ['id', 'titulo'], 'bibliografias', idx, ['titulo', 'autor', 'materia', 'descricao']):
                        materia_valor = row.get('materia')
                        materia_obj = None
                        if materia_valor is not None and not pd.isna(materia_valor):
                            try:
                                # Tentar buscar por ID primeiro (se for numérico)
                                materia_id = _as_int(materia_valor)
                                if materia_id is not None:
                                    try:
                                        materia_obj = MateriaModel.objects.get(id=materia_id)
                                    except MateriaModel.DoesNotExist:
                                        logger.warning(f"⚠️ Matéria ID '{materia_id}' não encontrada para bibliografia ID {row.get('id')}")
                                else:
                                    # Se não for numérico, buscar por nome
                                    materia_nome = _as_clean_str(materia_valor)
                                    if materia_nome:
                                        try:
                                            materia_obj = MateriaModel.objects.get(materia=materia_nome)
                                        except MateriaModel.DoesNotExist:
                                            logger.warning(f"⚠️ Matéria '{materia_nome}' não encontrada para bibliografia ID {row.get('id')}")
                            except Exception as e:
                                logger.warning(f"⚠️ Erro ao buscar matéria '{materia_valor}' para bibliografia ID {row.get('id')}: {e}")
                        
                        obj, created = BibliografiaModel.objects.update_or_create(
                            id=_as_int(row['id']),
                            defaults={
                                'titulo': _as_clean_str(row['titulo']),
                                'autor': _as_clean_str(row.get('autor')),
                                'materia': materia_obj,
                                'descricao': _as_clean_str(row.get('descricao'))
                            }
                        )
                        if created:
                            logger.info(f"✅ Criada bibliografia: {obj.titulo}")

            # Capítulos de Bibliografia
            df = load_fixture(
                'capitulos_bibliografia.xlsx',
                ['id', 'bibliografia_id', 'capitulo_titulo']
            )

            if df is not None:
                for idx, row in df.iterrows():
                    if not _require_fields(
                        row,
                        ['id', 'bibliografia_id', 'capitulo_titulo'],
                        'capitulos_bibliografia',
                        idx,
                        string_fields=['capitulo_titulo']
                    ):
                        continue
                    try:
                        bibliografia = BibliografiaModel.objects.get(
                            id=_as_int(row['bibliografia_id'])
                        )
                        CapitulosBibliografiaModel.objects.update_or_create(
                            id=_as_int(row['id']),
                            defaults={
                                'bibliografia': bibliografia,
                                'capitulo_titulo': _as_clean_str(row['capitulo_titulo']),
                            }
                        )
                    except BibliografiaModel.DoesNotExist:
                        logger.warning(
                            f"⚠️ Bibliografia ID não encontrada: {row['bibliografia_id']}"
                        )

    except Exception as e:
        logger.error(f"❌ Erro ao carregar fixtures: {e}")
        raise