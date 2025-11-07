import os
import logging
import pandas as pd
from django.conf import settings
from django.db import transaction
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import BibliografiaModel, FlashCardsModel, PerguntaMultiplaModel, PerguntaVFModel, PerguntaCorrelacaoModel

logger = logging.getLogger(__name__)

FIXTURE_DIR = os.path.join(
    settings.BASE_DIR,
    'django_cemos2028', 'apps', 'perguntas', 'fixtures'
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
            # 1. Bibliografias
            df = load_fixture('bibliografias.xlsx', ['id', 'titulo', 'autor', 'materia', 'descricao'])
            if df is not None:
                logger.info("📄 Processando bibliografias...")
                for idx, row in df.iterrows():
                    if _require_fields(row, ['id', 'titulo'], 'bibliografias', idx, ['titulo', 'autor', 'materia', 'descricao']):
                        obj, created = BibliografiaModel.objects.update_or_create(
                            id=_as_int(row['id']),
                            defaults={
                                'titulo': _as_clean_str(row['titulo']),
                                'autor': _as_clean_str(row.get('autor')),
                                'materia': _as_clean_str(row.get('materia')),
                                'descricao': _as_clean_str(row.get('descricao'))
                            }
                        )
                        if created:
                            logger.info(f"✅ Criada bibliografia: {obj.titulo}")

            # 2. Flash Cards
            df = load_fixture('flashcards.xlsx', ['bibliografia_id', 'pergunta', 'resposta', 'assunto'])
            if df is not None:
                logger.info("📄 Processando flash cards...")
                loaded_count = 0
                for idx, row in df.iterrows():
                    if _require_fields(row, ['bibliografia_id', 'pergunta', 'resposta', 'assunto'], 
                                     'flashcards', idx, 
                                     ['pergunta', 'resposta', 'assunto']):
                        
                        try:
                            bibliografia_id = _as_int(row['bibliografia_id'])
                            if bibliografia_id is None:
                                logger.warning(f"⚠️ ID de bibliografia inválido na linha {idx}")
                                continue
                            
                            bibliografia = BibliografiaModel.objects.get(id=bibliografia_id)
                            
                            # Converter prova para boolean (aceita múltiplos formatos)
                            prova_val = row.get('prova', False)
                            if pd.isna(prova_val):
                                prova_bool = False
                            elif isinstance(prova_val, bool):
                                prova_bool = prova_val
                            elif isinstance(prova_val, (int, float)):
                                prova_bool = bool(prova_val)
                            else:
                                prova_str = str(prova_val).lower().strip()
                                prova_bool = prova_str in ['true', 'verdadeiro', 'v', '1', 'sim', 'yes']
                            
                            obj, created = FlashCardsModel.objects.update_or_create(
                                bibliografia=bibliografia,
                                pergunta=_as_clean_str(row['pergunta']),
                                defaults={
                                    'resposta': _as_clean_str(row['resposta']),
                                    'assunto': _as_clean_str(row.get('assunto')),
                                    'prova': prova_bool,
                                    'ano': _as_int(row.get('ano'))
                                }
                            )
                            if created:
                                loaded_count += 1
                                logger.info(f"✅ Criado flash card: {obj.pergunta[:50]}...")
                        except BibliografiaModel.DoesNotExist:
                            logger.warning(f"⚠️ Bibliografia ID {row.get('bibliografia_id')} não encontrada (linha {idx})")
                        except Exception as e:
                            logger.error(f"❌ Erro ao processar flash card (linha {idx}): {e}")
                
                logger.info(f"📊 Total de flash cards carregados: {loaded_count}")

            # 3. Perguntas Múltipla Escolha
            df = load_fixture('perguntas_multipla.xlsx', [
                'bibliografia_titulo', 'paginas', 'pergunta', 'alternativa_a', 'alternativa_b', 
                'alternativa_c', 'alternativa_d', 'resposta_correta', 'justificativa_resposta_certa'
            ])
            if df is not None:
                logger.info("📄 Processando perguntas múltipla escolha...")
                loaded_count = 0
                for idx, row in df.iterrows():
                    if _require_fields(row, ['bibliografia_titulo', 'pergunta', 'alternativa_a', 'alternativa_b', 
                                           'alternativa_c', 'alternativa_d', 'resposta_correta'], 
                                     'perguntas_multipla', idx, 
                                     ['bibliografia_titulo', 'paginas', 'pergunta', 'alternativa_a', 'alternativa_b', 
                                      'alternativa_c', 'alternativa_d', 'resposta_correta', 'justificativa_resposta_certa']):
                        
                        try:
                            bibliografia = BibliografiaModel.objects.get(titulo=_as_clean_str(row['bibliografia_titulo']))
                            
                            obj, created = PerguntaMultiplaModel.objects.update_or_create(
                                bibliografia=bibliografia,
                                pergunta=_as_clean_str(row['pergunta']),
                                defaults={
                                    'paginas': _as_clean_str(row.get('paginas')),
                                    'alternativa_a': _as_clean_str(row['alternativa_a']),
                                    'alternativa_b': _as_clean_str(row['alternativa_b']),
                                    'alternativa_c': _as_clean_str(row['alternativa_c']),
                                    'alternativa_d': _as_clean_str(row['alternativa_d']),
                                    'resposta_correta': _as_clean_str(row['resposta_correta']).lower(),
                                    'justificativa_resposta_certa': _as_clean_str(row.get('justificativa_resposta_certa', '')),
                                    'caiu_em_prova': bool(row.get('caiu_em_prova', False)),
                                    'ano_prova': _as_int(row.get('ano_prova'))
                                }
                            )
                            if created:
                                loaded_count += 1
                                logger.info(f"✅ Criada pergunta múltipla: {obj.pergunta[:50]}...")
                        except BibliografiaModel.DoesNotExist:
                            logger.warning(f"⚠️ Bibliografia não encontrada: {row['bibliografia_titulo']} (linha {idx})")
                        except Exception as e:
                            logger.error(f"❌ Erro ao processar pergunta múltipla (linha {idx}): {e}")
                
                logger.info(f"📊 Total de perguntas múltipla carregadas: {loaded_count}")

            # 4. Perguntas Verdadeiro/Falso
            df = load_fixture('perguntas_vf.xlsx', [
                'bibliografia_titulo', 'paginas', 'assunto', 'afirmacao_verdadeira', 'afirmacao_falsa', 'justificativa_resposta_certa'
            ])
            if df is not None:
                logger.info("📄 Processando perguntas verdadeiro/falso...")
                loaded_count = 0
                for idx, row in df.iterrows():
                    if _require_fields(row, ['bibliografia_titulo', 'afirmacao_verdadeira', 'afirmacao_falsa'], 
                                     'perguntas_vf', idx, 
                                     ['bibliografia_titulo', 'paginas', 'assunto', 'afirmacao_verdadeira', 'afirmacao_falsa', 'justificativa_resposta_certa']):
                        
                        try:
                            bibliografia = BibliografiaModel.objects.get(titulo=_as_clean_str(row['bibliografia_titulo']))
                            
                            # Gerar pergunta padrão se não existir no Excel
                            pergunta_text = _as_clean_str(row.get('pergunta'))
                            if not pergunta_text:
                                assunto_text = _as_clean_str(row.get('assunto')) or 'Assunto não especificado'
                                pergunta_text = f"Assinale Verdadeiro ou Falso: {assunto_text}"
                            
                            # Usar uma combinação única para identificar a pergunta
                            lookup_key = {
                                'bibliografia': bibliografia,
                                'afirmacao_verdadeira': _as_clean_str(row['afirmacao_verdadeira'])[:200]  # Primeiros 200 chars para lookup
                            }
                            
                            obj, created = PerguntaVFModel.objects.update_or_create(
                                bibliografia=bibliografia,
                                afirmacao_verdadeira=_as_clean_str(row['afirmacao_verdadeira']),
                                defaults={
                                    'pergunta': pergunta_text,
                                    'paginas': _as_clean_str(row.get('paginas')),
                                    'assunto': _as_clean_str(row.get('assunto')),
                                    'afirmacao_falsa': _as_clean_str(row['afirmacao_falsa']),
                                    'justificativa_resposta_certa': _as_clean_str(row.get('justificativa_resposta_certa', '')),
                                    'caiu_em_prova': bool(row.get('caiu_em_prova', False)),
                                    'ano_prova': _as_int(row.get('ano_prova'))
                                }
                            )
                            if created:
                                loaded_count += 1
                                logger.info(f"✅ Criada pergunta V/F: {obj.pergunta[:50]}...")
                        except BibliografiaModel.DoesNotExist:
                            logger.warning(f"⚠️ Bibliografia não encontrada: {row['bibliografia_titulo']} (linha {idx})")
                        except Exception as e:
                            logger.error(f"❌ Erro ao processar pergunta V/F (linha {idx}): {e}")
                
                logger.info(f"📊 Total de perguntas V/F carregadas: {loaded_count}")

            # 5. Perguntas de Correlação
            df = load_fixture('perguntas_correlacao.xlsx', [
                'bibliografia_titulo', 'paginas', 'pergunta', 'coluna_a', 'coluna_b', 'resposta_correta', 'justificativa_resposta_certa'
            ])
            if df is not None:
                logger.info("📄 Processando perguntas de correlação...")
                loaded_count = 0
                for idx, row in df.iterrows():
                    if _require_fields(row, ['bibliografia_titulo', 'pergunta', 'coluna_a', 'coluna_b', 'resposta_correta'], 
                                     'perguntas_correlacao', idx, 
                                     ['bibliografia_titulo', 'paginas', 'pergunta', 'coluna_a', 'coluna_b', 'resposta_correta', 'justificativa_resposta_certa']):
                        
                        try:
                            bibliografia = BibliografiaModel.objects.get(titulo=_as_clean_str(row['bibliografia_titulo']))
                            
                            # Processar colunas (assumindo que vêm como strings separadas por vírgula ou JSON)
                            coluna_a_str = _as_clean_str(row['coluna_a'])
                            coluna_b_str = _as_clean_str(row['coluna_b'])
                            resposta_str = _as_clean_str(row['resposta_correta'])
                            
                            # Tentar parsear como JSON, senão separar por vírgula
                            try:
                                import json
                                coluna_a = json.loads(coluna_a_str) if coluna_a_str.startswith('[') else coluna_a_str.split(',')
                                coluna_b = json.loads(coluna_b_str) if coluna_b_str.startswith('[') else coluna_b_str.split(',')
                                resposta_correta = json.loads(resposta_str) if resposta_str.startswith('{') else {}
                            except:
                                coluna_a = [item.strip() for item in coluna_a_str.split(',')]
                                coluna_b = [item.strip() for item in coluna_b_str.split(',')]
                                resposta_correta = {}
                            
                            obj, created = PerguntaCorrelacaoModel.objects.update_or_create(
                                bibliografia=bibliografia,
                                pergunta=_as_clean_str(row['pergunta']),
                                defaults={
                                    'paginas': _as_clean_str(row.get('paginas')),
                                    'coluna_a': coluna_a,
                                    'coluna_b': coluna_b,
                                    'resposta_correta': resposta_correta,
                                    'justificativa_resposta_certa': _as_clean_str(row.get('justificativa_resposta_certa', '')),
                                    'caiu_em_prova': bool(row.get('caiu_em_prova', False)),
                                    'ano_prova': _as_int(row.get('ano_prova'))
                                }
                            )
                            if created:
                                loaded_count += 1
                                logger.info(f"✅ Criada pergunta correlação: {obj.pergunta[:50]}...")
                        except BibliografiaModel.DoesNotExist:
                            logger.warning(f"⚠️ Bibliografia não encontrada: {row['bibliografia_titulo']} (linha {idx})")
                        except Exception as e:
                            logger.error(f"❌ Erro ao processar pergunta correlação (linha {idx}): {e}")
                
                logger.info(f"📊 Total de perguntas de correlação carregadas: {loaded_count}")

        logger.info("✅ Fixtures do app Perguntas carregadas com sucesso!")
        
    except Exception as e:
        logger.error(f"❌ Erro ao carregar fixtures: {e}")
        raise