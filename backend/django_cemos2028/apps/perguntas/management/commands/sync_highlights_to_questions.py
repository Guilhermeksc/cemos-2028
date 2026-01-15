from django.core.management.base import BaseCommand
from django_cemos2028.apps.perguntas.models import (
    PerguntaMultiplaModel,
    PerguntaVFModel,
    PerguntaCorrelacaoModel,
    MarkdownHighlight
)
import logging

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = 'Sincroniza marcações do modelo normalizado MarkdownHighlight de volta para o JSONField das perguntas'

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Executa sem salvar no banco (apenas mostra o que seria feito)',
        )

    def handle(self, *args, **options):
        dry_run = options['dry_run']
        
        if dry_run:
            self.stdout.write(self.style.WARNING('🔍 Modo DRY-RUN: nenhuma alteração será salva'))
        
        # Agrupar marcações por pergunta
        highlights_by_question = {}
        
        for highlight in MarkdownHighlight.objects.all().order_by('pergunta_tipo', 'pergunta_id', 'start_offset'):
            key = (highlight.pergunta_tipo, highlight.pergunta_id)
            if key not in highlights_by_question:
                highlights_by_question[key] = []
            
            # Converter para formato JSON usado pelo frontend
            highlight_dict = highlight.to_dict()
            highlights_by_question[key].append(highlight_dict)
        
        total_updated = 0
        total_not_found = 0
        total_errors = 0
        
        # Atualizar cada pergunta
        for (tipo, pergunta_id), highlights in highlights_by_question.items():
            try:
                # Buscar a pergunta
                if tipo == 'multipla':
                    pergunta = PerguntaMultiplaModel.objects.filter(id=pergunta_id).first()
                elif tipo == 'vf':
                    pergunta = PerguntaVFModel.objects.filter(id=pergunta_id).first()
                elif tipo == 'correlacao':
                    pergunta = PerguntaCorrelacaoModel.objects.filter(id=pergunta_id).first()
                else:
                    self.stdout.write(
                        self.style.ERROR(f'❌ Tipo desconhecido: {tipo} para pergunta {pergunta_id}')
                    )
                    total_errors += 1
                    continue
                
                if not pergunta:
                    self.stdout.write(
                        self.style.WARNING(f'⚠️  Pergunta {tipo} #{pergunta_id} não encontrada')
                    )
                    total_not_found += 1
                    continue
                
                # Verificar se o markdown_file está correto
                first_highlight = highlights[0] if highlights else None
                expected_file = None
                for h in MarkdownHighlight.objects.filter(pergunta_tipo=tipo, pergunta_id=pergunta_id):
                    expected_file = h.markdown_file
                    break
                
                if expected_file and pergunta.markdown_file != expected_file:
                    self.stdout.write(
                        self.style.WARNING(
                            f'⚠️  Pergunta {tipo} #{pergunta_id}: markdown_file diferente '
                            f'(pergunta: {pergunta.markdown_file}, marcações: {expected_file})'
                        )
                    )
                    if not dry_run:
                        pergunta.markdown_file = expected_file
                
                # Atualizar marcações
                if not dry_run:
                    pergunta.markdown_highlights = highlights
                    pergunta._skip_highlight_sync = True  # Evitar loop infinito
                    pergunta.save()
                    pergunta._skip_highlight_sync = False
                
                total_updated += 1
                self.stdout.write(
                    self.style.SUCCESS(
                        f'✅ Pergunta {tipo} #{pergunta_id}: {len(highlights)} marcações sincronizadas'
                    )
                )
                
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'❌ Erro ao atualizar pergunta {tipo} #{pergunta_id}: {e}')
                )
                total_errors += 1
                logger.exception(f'Erro ao sincronizar marcações para pergunta {tipo} #{pergunta_id}')
        
        # Resumo
        self.stdout.write('')
        self.stdout.write(self.style.SUCCESS('=' * 60))
        self.stdout.write(self.style.SUCCESS('✅ Sincronização concluída!'))
        self.stdout.write(self.style.SUCCESS(f'   Total atualizado: {total_updated}'))
        if total_not_found > 0:
            self.stdout.write(self.style.WARNING(f'   Perguntas não encontradas: {total_not_found}'))
        if total_errors > 0:
            self.stdout.write(self.style.ERROR(f'   Erros: {total_errors}'))
        if dry_run:
            self.stdout.write(self.style.WARNING('   ⚠️  Modo DRY-RUN: nenhuma alteração foi salva'))
        self.stdout.write(self.style.SUCCESS('=' * 60))







