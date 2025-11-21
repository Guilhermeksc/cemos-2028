from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.apps import apps


@receiver(post_migrate)
def create_default_admin(sender, **kwargs):
    """
    Cria automaticamente um usuário admin padrão após as migrações.
    """
    # Verifica se o signal foi disparado pelo app correto
    if sender.name == 'django_cemos2028.apps.core.users':
        Usuario = apps.get_model('users', 'Usuario')
        
        # Verifica se já existe um admin
        if not Usuario.objects.filter(perfil='admin').exists():
            # Cria o usuário admin padrão
            admin_user = Usuario.objects.create_user(
                username='admin',
                password='@cemos2028',  # Senha padrão - deve ser alterada após primeiro login
                perfil='admin'
            )
            admin_user.is_staff = True
            admin_user.is_superuser = True
            admin_user.save()
            
            print("✅ Usuário admin padrão criado:")
            print(f"   Username: admin")
            print(f"   Password: @cemos2028")
            print(f"   ⚠️  IMPORTANTE: Altere a senha padrão após o primeiro login!")
        else:
            print("ℹ️  Usuário admin já existe. Nenhuma ação necessária.")

        # Verifica/cria usuário 'anderson'
        if not Usuario.objects.filter(username='anderson').exists():
            anderson_user = Usuario.objects.create_user(
                username='anderson',
                password='@cemos2028',  # Senha padrão
                perfil='user'
            )
            # Não é staff nem superuser por padrão
            anderson_user.save()

            print("✅ Usuário 'anderson' criado com sucesso:")
            print(f"   Username: anderson")
            print(f"   Password: @cemos2028")
        else:
            print("ℹ️  Usuário 'anderson' já existe. Nenhuma ação necessária.")

        # Verifica/cria usuário 'kopa'
        if not Usuario.objects.filter(username='kopa').exists():
            kopa_user = Usuario.objects.create_user(
                username='kopa',
                password='@cemos2028',  # Senha padrão
                perfil='user'
            )
            # Não é staff nem superuser por padrão
            kopa_user.save()

            print("✅ Usuário 'kopa' criado com sucesso:")
            print(f"   Username: kopa")
            print(f"   Password: @cemos2028")
        else:
            print("ℹ️  Usuário 'kopa' já existe. Nenhuma ação necessária.")