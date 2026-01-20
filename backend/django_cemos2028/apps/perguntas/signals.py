import os
import logging
import pandas as pd
from django.conf import settings
from django.db import transaction
from django.db.models.signals import post_migrate, post_save
from django.dispatch import receiver
from .models import (
    FlashCardsModel, 
    PerguntaMultiplaModel, 
    PerguntaVFModel, 
    PerguntaCorrelacaoModel,
    MarkdownHighlight
)
from django_cemos2028.apps.bibliografia.models import (
    BibliografiaModel,
    CapitulosBibliografiaModel,
)

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
    """
    Busca um capítulo de bibliografia pelo ID.
    
    Args:
        row_value: Valor da célula do Excel (pode ser número ou string)
        bibliografia: Objeto BibliografiaModel opcional para validação
        ctx: Contexto (nome do arquivo/processo) para logs
        row_index: Índice da linha para logs
    
    Returns:
        CapitulosBibliografiaModel ou None se não encontrado
    """
    logger.debug(f"🔍 [DEBUG] _get_capitulo chamado - valor recebido: {row_value} (tipo: {type(row_value)}), ctx: {ctx}, linha: {row_index}")
    
    if pd.isna(row_value) or row_value is None or str(row_value).strip() == '':
        logger.debug(f"🔍 [DEBUG] _get_capitulo - valor vazio/None, retornando None")
        return None
    
    capitulo_id = _as_int(row_value)
    logger.debug(f"🔍 [DEBUG] _get_capitulo - ID convertido: {capitulo_id} (de {row_value})")
    
    if capitulo_id is None:
        logger.warning(f"⚠️ [DEBUG] _get_capitulo - Não foi possível converter '{row_value}' para ID numérico em {ctx} (linha {row_index})")
        return None
    
    try:
        capitulo = CapitulosBibliografiaModel.objects.get(id=capitulo_id)
        logger.debug(f"🔍 [DEBUG] _get_capitulo - Capítulo encontrado: ID={capitulo.id}, Título={capitulo.capitulo_titulo}, Bibliografia ID={capitulo.bibliografia_id}")
        
        if bibliografia and capitulo.bibliografia_id != bibliografia.id:
            logger.warning(
                f"⚠️ Capítulo {capitulo_id} ({capitulo.capitulo_titulo}) não pertence à bibliografia {bibliografia.id} ({bibliografia.titulo}) em {ctx} (linha {row_index})"
            )
        
        return capitulo
    except CapitulosBibliografiaModel.DoesNotExist:
        logger.warning(f"⚠️ Capítulo ID {capitulo_id} não encontrado no banco de dados em {ctx} (linha {row_index})")
        logger.debug(f"🔍 [DEBUG] _get_capitulo - Tentando listar capítulos disponíveis...")
        try:
            total_capitulos = CapitulosBibliografiaModel.objects.count()
            logger.debug(f"🔍 [DEBUG] Total de capítulos no banco: {total_capitulos}")
            if total_capitulos > 0:
                exemplos = CapitulosBibliografiaModel.objects.all()[:5]
                logger.debug(f"🔍 [DEBUG] Exemplos de capítulos disponíveis: {[(c.id, c.capitulo_titulo) for c in exemplos]}")
        except Exception as e:
            logger.debug(f"🔍 [DEBUG] Erro ao listar capítulos: {e}")
        return None
    except Exception as e:
        logger.error(f"❌ Erro inesperado ao buscar capítulo ID {capitulo_id} em {ctx} (linha {row_index}): {e}")
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
def load_fixtures_perguntas(sender, **kwargs):
    if sender.name != 'django_cemos2028.apps.perguntas':
        return

    logger.info("📥 Iniciando carga de fixtures XLSX para Perguntas...")

    try:
        with transaction.atomic():
            
            # 4. Flash Cards
            df = load_fixture('flashcards.xlsx', ['bibliografia_id', 'pergunta', 'resposta'])
            if df is not None:
                logger.info("📄 Processando flash cards...")
                logger.info(f"🔍 [DEBUG] Total de linhas no arquivo flashcards.xlsx: {len(df)}")
                logger.info(f"🔍 [DEBUG] Colunas encontradas: {list(df.columns)}")
                loaded_count = 0
                erros_assunto = 0
                for idx, row in df.iterrows():
                    # Validar campos obrigatórios incluindo 'id' como número inteiro fixo
                    required_cols = ['id', 'bibliografia_id', 'pergunta', 'resposta']
                    if _require_fields(row, required_cols, 
                                     'flashcards', idx, 
                                     string_fields=['pergunta', 'resposta']):
                        
                        try:
                            # Obter ID numérico fixo fornecido na planilha
                            flashcard_id = _as_int(row.get('id'))
                            if flashcard_id is None:
                                logger.warning(f"⚠️ Flashcard linha {idx} - ID inválido, ignorando linha")
                                continue
                            
                            bibliografia = _get_bibliografia(row['bibliografia_id'], 'flashcards', idx)
                            if bibliografia is None:
                                continue
                            
                            # Processar assunto (opcional)
                            assunto_valor = row.get('assunto')
                            logger.debug(f"🔍 [DEBUG] Flashcard linha {idx} - Valor de assunto do Excel: {assunto_valor} (tipo: {type(assunto_valor)})")
                            assunto = _get_capitulo(assunto_valor, bibliografia, 'flashcards', idx)
                            if assunto_valor and not assunto:
                                erros_assunto += 1
                                logger.warning(f"⚠️ Flashcard linha {idx} - Assunto '{assunto_valor}' não foi encontrado, mas será salvo sem assunto")
                            
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
                            
                            # Converter caveira para boolean (aceita múltiplos formatos)
                            caveira_val = row.get('caveira', False)
                            if pd.isna(caveira_val):
                                caveira_bool = False
                            elif isinstance(caveira_val, bool):
                                caveira_bool = caveira_val
                            elif isinstance(caveira_val, (int, float)):
                                caveira_bool = bool(caveira_val)
                            else:
                                caveira_str = str(caveira_val).lower().strip()
                                caveira_bool = caveira_str in ['true', 'verdadeiro', 'v', '1', 'sim', 'yes']
                            
                            obj, created = FlashCardsModel.objects.update_or_create(
                                id=flashcard_id,
                                defaults={
                                    'bibliografia': bibliografia,
                                    'pergunta': _as_clean_str(row['pergunta']),
                                    'resposta': _as_clean_str(row['resposta']),
                                    'assunto': assunto,
                                    'prova': prova_bool,
                                    'ano': _as_int(row.get('ano')),
                                    'caveira': caveira_bool
                                }
                            )
                            if created:
                                loaded_count += 1
                                logger.info(f"✅ Criado flash card ID {obj.id}: {obj.pergunta[:50]}... (Assunto: {assunto.capitulo_titulo if assunto else 'Nenhum'})")
                            else:
                                logger.debug(f"🔄 Atualizado flash card ID {obj.id}: {obj.pergunta[:50]}...")
                        except Exception as e:
                            logger.error(f"❌ Erro ao processar flash card (linha {idx}): {e}")
                            import traceback
                            logger.error(f"🔍 [DEBUG] Traceback: {traceback.format_exc()}")
                
                logger.info(f"📊 Total de flash cards carregados: {loaded_count} (erros de assunto: {erros_assunto})")

            # 5. Perguntas Múltipla Escolha
            df = load_fixture('perguntas_multipla.xlsx', [
                'bibliografia_id', 'paginas', 'pergunta', 'alternativa_a', 'alternativa_b', 
                'alternativa_c', 'alternativa_d', 'resposta_correta', 'justificativa_resposta_certa'
            ])
            if df is not None:
                logger.info("📄 Processando perguntas múltipla escolha...")
                logger.info(f"🔍 [DEBUG] Total de linhas no arquivo perguntas_multipla.xlsx: {len(df)}")
                logger.info(f"🔍 [DEBUG] Colunas encontradas: {list(df.columns)}")
                loaded_count = 0
                erros_assunto = 0
                for idx, row in df.iterrows():
                    required_cols = ['id', 'bibliografia_id', 'pergunta', 'alternativa_a', 'alternativa_b', 'alternativa_c', 'alternativa_d', 'resposta_correta']
                    if _require_fields(
                        row,
                        required_cols,
                        'perguntas_multipla',
                        idx,
                        string_fields=['paginas', 'pergunta', 'alternativa_a', 'alternativa_b', 'alternativa_c', 'alternativa_d', 'resposta_correta', 'justificativa_resposta_certa']
                    ):
                        try:
                            # Obter ID numérico fixo fornecido na planilha
                            pergunta_id = _as_int(row.get('id'))
                            if pergunta_id is None:
                                logger.warning(f"⚠️ Pergunta múltipla linha {idx} - ID inválido, ignorando linha")
                                continue
                            
                            bibliografia = _get_bibliografia(row['bibliografia_id'], 'perguntas_multipla', idx)
                            if bibliografia is None:
                                continue
                            
                            # Processar assunto (opcional)
                            assunto_valor = row.get('assunto')
                            logger.debug(f"🔍 [DEBUG] Pergunta múltipla linha {idx} - Valor de assunto do Excel: {assunto_valor} (tipo: {type(assunto_valor)})")
                            assunto = _get_capitulo(assunto_valor, bibliografia, 'perguntas_multipla', idx)
                            if assunto_valor and not assunto:
                                erros_assunto += 1
                                logger.warning(f"⚠️ Pergunta múltipla linha {idx} - Assunto '{assunto_valor}' não foi encontrado, mas será salva sem assunto")
                            
                            # Garantir que justificativa_resposta_certa não seja None (campo obrigatório)
                            justificativa = _as_clean_str(row.get('justificativa_resposta_certa', ''))
                            if justificativa is None or justificativa.strip() == '':
                                justificativa = 'Justificativa não fornecida.'
                            
                            obj, created = PerguntaMultiplaModel.objects.update_or_create(
                                id=pergunta_id,
                                defaults={
                                    'bibliografia': bibliografia,
                                    'pergunta': _as_clean_str(row['pergunta']),
                                    'paginas': _as_clean_str(row.get('paginas')),
                                    'assunto': assunto,
                                    'alternativa_a': _as_clean_str(row['alternativa_a']),
                                    'alternativa_b': _as_clean_str(row['alternativa_b']),
                                    'alternativa_c': _as_clean_str(row['alternativa_c']),
                                    'alternativa_d': _as_clean_str(row['alternativa_d']),
                                    'resposta_correta': _as_clean_str(row['resposta_correta']).lower(),
                                    'justificativa_resposta_certa': justificativa,
                                    'caiu_em_prova': bool(row.get('caiu_em_prova', False)),
                                    'ano_prova': _as_int(row.get('ano_prova'))
                                }
                            )
                            if created:
                                loaded_count += 1
                                logger.info(f"✅ Criada pergunta múltipla ID {obj.id}: {obj.pergunta[:50]}... (Assunto: {assunto.capitulo_titulo if assunto else 'Nenhum'})")
                            else:
                                logger.debug(f"🔄 Atualizada pergunta múltipla ID {obj.id}: {obj.pergunta[:50]}...")
                        except Exception as e:
                            logger.error(f"❌ Erro ao processar pergunta múltipla (linha {idx}): {e}")
                            import traceback
                            logger.error(f"🔍 [DEBUG] Traceback: {traceback.format_exc()}")
                
                logger.info(f"📊 Total de perguntas múltipla carregadas: {loaded_count} (erros de assunto: {erros_assunto})")

            # 6. Perguntas Verdadeiro/Falso
            df = load_fixture('perguntas_vf.xlsx', [
                'bibliografia_id', 'paginas', 'pergunta', 'afirmacao_verdadeira', 'afirmacao_falsa', 'justificativa_resposta_certa'
            ])
            if df is not None:
                logger.info("📄 Processando perguntas verdadeiro/falso...")
                logger.info(f"🔍 [DEBUG] Total de linhas no arquivo perguntas_vf.xlsx: {len(df)}")
                logger.info(f"🔍 [DEBUG] Colunas encontradas: {list(df.columns)}")
                loaded_count = 0
                erros_assunto = 0
                for idx, row in df.iterrows():
                    required_cols = ['id', 'bibliografia_id', 'afirmacao_verdadeira', 'afirmacao_falsa']
                    if _require_fields(
                        row,
                        required_cols,
                        'perguntas_vf',
                        idx,
                        string_fields=['paginas', 'pergunta', 'afirmacao_verdadeira', 'afirmacao_falsa', 'justificativa_resposta_certa']
                    ):
                        
                        try:
                            # Obter ID numérico fixo fornecido na planilha
                            pergunta_id = _as_int(row.get('id'))
                            if pergunta_id is None:
                                logger.warning(f"⚠️ Pergunta V/F linha {idx} - ID inválido, ignorando linha")
                                continue
                            
                            bibliografia = _get_bibliografia(row['bibliografia_id'], 'perguntas_vf', idx)
                            if bibliografia is None:
                                continue
                            
                            # Processar assunto (opcional)
                            assunto_valor = row.get('assunto')
                            logger.debug(f"🔍 [DEBUG] Pergunta V/F linha {idx} - Valor de assunto do Excel: {assunto_valor} (tipo: {type(assunto_valor)})")
                            assunto = _get_capitulo(assunto_valor, bibliografia, 'perguntas_vf', idx)
                            if assunto_valor and not assunto:
                                erros_assunto += 1
                                logger.warning(f"⚠️ Pergunta V/F linha {idx} - Assunto '{assunto_valor}' não foi encontrado, mas será salva sem assunto")
                            
                            # Ler pergunta do Excel, usar assunto como fallback se não existir
                            pergunta_text = _as_clean_str(row.get('pergunta'))
                            assunto_text = assunto.capitulo_titulo if assunto else 'Assunto não especificado'
                            
                            # Se pergunta não foi fornecida no Excel, usar assunto como fallback
                            if not pergunta_text or pergunta_text.strip() == '':
                                pergunta_text = assunto_text
                                logger.debug(f"🔍 [DEBUG] Pergunta V/F linha {idx} - Campo 'pergunta' vazio, usando assunto como fallback: {assunto_text}")
                            
                            # Garantir que justificativa_resposta_certa não seja None (campo obrigatório)
                            justificativa = _as_clean_str(row.get('justificativa_resposta_certa', ''))
                            if justificativa is None or justificativa.strip() == '':
                                justificativa = 'Justificativa não fornecida.'
                            
                            obj, created = PerguntaVFModel.objects.update_or_create(
                                id=pergunta_id,
                                defaults={
                                    'bibliografia': bibliografia,
                                    'pergunta': pergunta_text,
                                    'paginas': _as_clean_str(row.get('paginas')),
                                    'assunto': assunto,
                                    'afirmacao_verdadeira': _as_clean_str(row['afirmacao_verdadeira']),
                                    'afirmacao_falsa': _as_clean_str(row['afirmacao_falsa']),
                                    'justificativa_resposta_certa': justificativa,
                                    'caiu_em_prova': bool(row.get('caiu_em_prova', False)),
                                    'ano_prova': _as_int(row.get('ano_prova'))
                                }
                            )
                            if created:
                                loaded_count += 1
                                logger.info(f"✅ Criada pergunta V/F ID {obj.id}: {obj.pergunta[:50]}... (Assunto: {assunto.capitulo_titulo if assunto else 'Nenhum'})")
                            else:
                                logger.debug(f"🔄 Atualizada pergunta V/F ID {obj.id}: {obj.pergunta[:50]}...")
                        except Exception as e:
                            logger.error(f"❌ Erro ao processar pergunta V/F (linha {idx}): {e}")
                            import traceback
                            logger.error(f"🔍 [DEBUG] Traceback: {traceback.format_exc()}")
                
                logger.info(f"📊 Total de perguntas V/F carregadas: {loaded_count} (erros de assunto: {erros_assunto})")

            # 7. Perguntas de Correlação
            df = load_fixture('perguntas_correlacao.xlsx', [
                'bibliografia_id', 'paginas', 'pergunta', 'coluna_a', 'coluna_b', 'resposta_correta', 'justificativa_resposta_certa'
            ])
            if df is not None:
                logger.info("📄 Processando perguntas de correlação...")
                logger.info(f"🔍 [DEBUG] Total de linhas no arquivo perguntas_correlacao.xlsx: {len(df)}")
                logger.info(f"🔍 [DEBUG] Colunas encontradas: {list(df.columns)}")
                loaded_count = 0
                erros_assunto = 0
                for idx, row in df.iterrows():
                    required_cols = ['id', 'bibliografia_id', 'pergunta', 'coluna_a', 'coluna_b', 'resposta_correta']
                    if _require_fields(
                        row,
                        required_cols,
                        'perguntas_correlacao',
                        idx,
                        string_fields=['paginas', 'pergunta', 'coluna_a', 'coluna_b', 'resposta_correta', 'justificativa_resposta_certa']
                    ):
                        
                        try:
                            # Obter ID numérico fixo fornecido na planilha
                            pergunta_id = _as_int(row.get('id'))
                            if pergunta_id is None:
                                logger.warning(f"⚠️ Pergunta correlação linha {idx} - ID inválido, ignorando linha")
                                continue
                            
                            bibliografia = _get_bibliografia(row['bibliografia_id'], 'perguntas_correlacao', idx)
                            if bibliografia is None:
                                continue
                            
                            # Processar assunto (opcional)
                            assunto_valor = row.get('assunto')
                            logger.debug(f"🔍 [DEBUG] Pergunta correlação linha {idx} - Valor de assunto do Excel: {assunto_valor} (tipo: {type(assunto_valor)})")
                            assunto = _get_capitulo(assunto_valor, bibliografia, 'perguntas_correlacao', idx)
                            if assunto_valor and not assunto:
                                erros_assunto += 1
                                logger.warning(f"⚠️ Pergunta correlação linha {idx} - Assunto '{assunto_valor}' não foi encontrado, mas será salva sem assunto")
                            
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
                            
                            # Garantir que justificativa_resposta_certa não seja None (campo obrigatório)
                            justificativa = _as_clean_str(row.get('justificativa_resposta_certa', ''))
                            if justificativa is None or justificativa.strip() == '':
                                justificativa = 'Justificativa não fornecida.'
                            
                            obj, created = PerguntaCorrelacaoModel.objects.update_or_create(
                                id=pergunta_id,
                                defaults={
                                    'bibliografia': bibliografia,
                                    'pergunta': _as_clean_str(row['pergunta']),
                                    'paginas': _as_clean_str(row.get('paginas')),
                                    'assunto': assunto,
                                    'coluna_a': coluna_a,
                                    'coluna_b': coluna_b,
                                    'resposta_correta': resposta_correta,
                                    'justificativa_resposta_certa': justificativa,
                                    'caiu_em_prova': bool(row.get('caiu_em_prova', False)),
                                    'ano_prova': _as_int(row.get('ano_prova'))
                                }
                            )
                            if created:
                                loaded_count += 1
                                logger.info(f"✅ Criada pergunta correlação ID {obj.id}: {obj.pergunta[:50]}... (Assunto: {assunto.capitulo_titulo if assunto else 'Nenhum'})")
                            else:
                                logger.debug(f"🔄 Atualizada pergunta correlação ID {obj.id}: {obj.pergunta[:50]}...")
                        except Exception as e:
                            logger.error(f"❌ Erro ao processar pergunta correlação (linha {idx}): {e}")
                            import traceback
                            logger.error(f"🔍 [DEBUG] Traceback: {traceback.format_exc()}")
                
                logger.info(f"📊 Total de perguntas de correlação carregadas: {loaded_count} (erros de assunto: {erros_assunto})")

        logger.info("✅ Fixtures do app Perguntas carregadas com sucesso!")
        
    except Exception as e:
        logger.error(f"❌ Erro ao carregar fixtures: {e}")
        raise


def sync_highlights_to_normalized_model(instance):
    """Sincroniza marcações do JSONField para o modelo normalizado MarkdownHighlight"""
    # Determinar o tipo da pergunta
    if isinstance(instance, PerguntaMultiplaModel):
        tipo = 'multipla'
    elif isinstance(instance, PerguntaVFModel):
        tipo = 'vf'
    elif isinstance(instance, PerguntaCorrelacaoModel):
        tipo = 'correlacao'
    else:
        return
    
    # Se não há marcações ou arquivo markdown, remover marcações existentes
    if not instance.markdown_highlights or not instance.markdown_file:
        MarkdownHighlight.objects.filter(
            pergunta_tipo=tipo,
            pergunta_id=instance.id
        ).delete()
        return
    
    highlights = instance.markdown_highlights
    if not isinstance(highlights, list):
        return
    
    # Remover todas as marcações existentes para esta pergunta
    MarkdownHighlight.objects.filter(
        pergunta_tipo=tipo,
        pergunta_id=instance.id
    ).delete()
    
    # Criar novas marcações normalizadas
    for highlight_data in highlights:
        if not isinstance(highlight_data, dict):
            continue
        
        highlight_id = highlight_data.get('id', '')
        text = highlight_data.get('text', '')
        start_offset = highlight_data.get('start_offset', 0)
        end_offset = highlight_data.get('end_offset', 0)
        
        # Validar dados mínimos
        if not text or end_offset <= start_offset:
            continue
        
        # Criar marcação normalizada
        try:
            MarkdownHighlight.objects.create(
                pergunta_tipo=tipo,
                pergunta_id=instance.id,
                markdown_file=instance.markdown_file,
                highlight_id=highlight_id or None,
                text=text,
                start_offset=start_offset,
                end_offset=end_offset,
                heading_id=highlight_data.get('heading_id', '') or None,
                note=highlight_data.get('note', '') or None,
                color=highlight_data.get('color', '#fff59d') or '#fff59d',
            )
        except Exception as e:
            logger.error(
                f'[Perguntas] Erro ao sincronizar marcação para pergunta {tipo} #{instance.id}: {e}'
            )


@receiver(post_save, sender=PerguntaMultiplaModel)
@receiver(post_save, sender=PerguntaVFModel)
@receiver(post_save, sender=PerguntaCorrelacaoModel)
def sync_highlights_on_save(sender, instance, **kwargs):
    """Sincroniza marcações quando uma pergunta é salva"""
    # Só sincronizar se markdown_highlights foi modificado
    # (evitar loops infinitos e melhorar performance)
    if hasattr(instance, '_skip_highlight_sync'):
        return
    
    sync_highlights_to_normalized_model(instance)