from django.core.management.base import BaseCommand
from django.apps import apps


class Command(BaseCommand):
    help = 'Cria um usuário admin padrão se não existir'

    def handle(self, *args, **options):
        Usuario = apps.get_model('users', 'Usuario')
        
        # Verifica se já existe um admin
        if not Usuario.objects.filter(perfil='admin').exists():
            # Cria o usuário admin padrão
            admin_user = Usuario.objects.create_user(
                username='admin',
                password='admin123',
                perfil='admin'
            )
            admin_user.is_staff = True
            admin_user.is_superuser = True
            admin_user.save()
            
            self.stdout.write(
                self.style.SUCCESS('✅ Usuário admin padrão criado com sucesso!')
            )
            self.stdout.write(f'   Username: admin')
            self.stdout.write(f'   Password: admin123')
            self.stdout.write(
                self.style.WARNING('   ⚠️  IMPORTANTE: Altere a senha padrão após o primeiro login!')
            )
        else:
            self.stdout.write(
                self.style.WARNING('ℹ️  Usuário admin já existe. Nenhuma ação necessária.')
            )