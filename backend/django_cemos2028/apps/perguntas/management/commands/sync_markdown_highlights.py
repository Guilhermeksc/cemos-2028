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
    help = 'Sincroniza marcações de texto do JSONField para o modelo normalizado MarkdownHighlight'

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Executa sem salvar no banco (apenas mostra o que seria feito)',
        )
        parser.add_argument(
            '--clear-existing',
            action='store_true',
            help='Limpa todas as marcações existentes no modelo MarkdownHighlight antes de sincronizar',
        )

    def handle(self, *args, **options):
        dry_run = options['dry_run']
        clear_existing = options['clear_existing']
        
        if dry_run:
            self.stdout.write(self.style.WARNING('🔍 Modo DRY-RUN: nenhuma alteração será salva'))
        
        if clear_existing:
            if not dry_run:
                deleted_count = MarkdownHighlight.objects.all().delete()[0]
                self.stdout.write(
                    self.style.SUCCESS(f'🗑️  Removidas {deleted_count} marcações existentes')
                )
            else:
                count = MarkdownHighlight.objects.count()
                self.stdout.write(
                    self.style.WARNING(f'🗑️  Seriam removidas {count} marcações existentes')
                )
        
        total_synced = 0
        total_skipped = 0
        
        # Sincronizar PerguntaMultiplaModel
        self.stdout.write('📝 Sincronizando marcações de PerguntaMultiplaModel...')
        multipla_count, multipla_skipped = self.sync_highlights(
            PerguntaMultiplaModel.objects.all(),
            'multipla',
            dry_run
        )
        total_synced += multipla_count
        total_skipped += multipla_skipped
        
        # Sincronizar PerguntaVFModel
        self.stdout.write('📝 Sincronizando marcações de PerguntaVFModel...')
        vf_count, vf_skipped = self.sync_highlights(
            PerguntaVFModel.objects.all(),
            'vf',
            dry_run
        )
        total_synced += vf_count
        total_skipped += vf_skipped
        
        # Sincronizar PerguntaCorrelacaoModel
        self.stdout.write('📝 Sincronizando marcações de PerguntaCorrelacaoModel...')
        correlacao_count, correlacao_skipped = self.sync_highlights(
            PerguntaCorrelacaoModel.objects.all(),
            'correlacao',
            dry_run
        )
        total_synced += correlacao_count
        total_skipped += correlacao_skipped
        
        # Resumo
        self.stdout.write('')
        self.stdout.write(self.style.SUCCESS('=' * 60))
        self.stdout.write(self.style.SUCCESS('✅ Sincronização concluída!'))
        self.stdout.write(self.style.SUCCESS(f'   Total sincronizado: {total_synced}'))
        self.stdout.write(self.style.WARNING(f'   Total ignorado: {total_skipped}'))
        if dry_run:
            self.stdout.write(self.style.WARNING('   ⚠️  Modo DRY-RUN: nenhuma alteração foi salva'))
        self.stdout.write(self.style.SUCCESS('=' * 60))

    def sync_highlights(self, queryset, tipo, dry_run=False):
        """Sincroniza marcações de um queryset de perguntas"""
        synced = 0
        skipped = 0
        
        for pergunta in queryset:
            if not pergunta.markdown_highlights:
                continue
            
            if not pergunta.markdown_file:
                skipped += 1
                continue
            
            highlights = pergunta.markdown_highlights
            if not isinstance(highlights, list):
                skipped += 1
                continue
            
            for highlight_data in highlights:
                if not isinstance(highlight_data, dict):
                    skipped += 1
                    continue
                
                # Verificar se já existe (evitar duplicatas)
                highlight_id = highlight_data.get('id', '')
                if highlight_id:
                    existing = MarkdownHighlight.objects.filter(
                        pergunta_tipo=tipo,
                        pergunta_id=pergunta.id,
                        highlight_id=highlight_id
                    ).first()
                    if existing:
                        skipped += 1
                        continue
                
                # Criar nova marcação
                highlight = MarkdownHighlight(
                    pergunta_tipo=tipo,
                    pergunta_id=pergunta.id,
                    markdown_file=pergunta.markdown_file,
                    highlight_id=highlight_data.get('id', ''),
                    text=highlight_data.get('text', ''),
                    start_offset=highlight_data.get('start_offset', 0),
                    end_offset=highlight_data.get('end_offset', 0),
                    heading_id=highlight_data.get('heading_id', ''),
                    note=highlight_data.get('note', ''),
                    color=highlight_data.get('color', '#fff59d')
                )
                
                if not dry_run:
                    highlight.save()
                
                synced += 1
        
        return synced, skipped

