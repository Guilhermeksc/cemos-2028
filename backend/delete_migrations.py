import os
import sys

# Caminho raiz do seu projeto Django
DJANGO_ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'django_paint360')

# Nome do app que não será afetado
EXCLUDED_APP = 'users'

def delete_migrations():
    deleted_count = 0
    for root, dirs, files in os.walk(DJANGO_ROOT):
        if 'migrations' in dirs:
            app_name = os.path.basename(os.path.dirname(os.path.join(root, 'migrations')))
            migrations_path = os.path.join(root, 'migrations')
            
            if app_name != EXCLUDED_APP:
                print(f"\nVerificando app: {app_name}")
                for file in os.listdir(migrations_path):
                    if file != '__init__.py' and file.endswith('.py'):
                        file_path = os.path.join(migrations_path, file)
                        try:
                            os.remove(file_path)
                            print(f"✓ Arquivo deletado: {file}")
                            deleted_count += 1
                        except Exception as e:
                            print(f"✗ Erro ao deletar {file}: {str(e)}")

    print(f"\n✨ Concluído! {deleted_count} arquivos de migrations removidos.")
    print("📝 Obs: Arquivos '__init__.py' foram mantidos.")

if __name__ == '__main__':
    delete_migrations()

"""

python delete_migrations_files.py

"""