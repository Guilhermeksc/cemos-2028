from django.apps import AppConfig

class InformacoesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'django_cemos2028.apps.informacoes'

    def ready(self):    
        import django_cemos2028.apps.informacoes.signals  # noqa
