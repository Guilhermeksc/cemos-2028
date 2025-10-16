from django.core.management.base import BaseCommand
from django_cemos2028.apps.perguntas.signals import load_fixtures_perguntas
import logging


class Command(BaseCommand):
    help = 'Carrega fixtures XLSX para a app perguntas'

    def handle(self, *args, **options):
        # Set up logging to show INFO level messages
        logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
        
        self.stdout.write("🔄 Iniciando carregamento manual de fixtures...")
        
        # Create a mock sender to simulate the signal
        class MockSender:
            name = 'django_cemos2028.apps.perguntas'
        
        sender = MockSender()
        
        try:
            load_fixtures_perguntas(sender=sender)
            self.stdout.write(self.style.SUCCESS("✅ Fixtures carregadas com sucesso!"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"❌ Erro ao carregar fixtures: {e}"))
            raise