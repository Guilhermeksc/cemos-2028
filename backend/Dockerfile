# 🐳 Backend Django para CEMOS2028
FROM python:3.12-slim

# Diretório de trabalho
WORKDIR /app

# Dependências do sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential libpq-dev curl netcat-openbsd \
 && rm -rf /var/lib/apt/lists/*

# Copia dependências
COPY requirements.txt /app/

# Instala dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante do código
COPY . /app/

# Expõe a porta do Gunicorn
EXPOSE 8000

# Entrypoint padrão
CMD sh -c "
  echo '🚀 Iniciando Django com Gunicorn...' &&
  python manage.py makemigrations --noinput &&
  python manage.py migrate --noinput &&
  python manage.py collectstatic --noinput &&
  gunicorn django_cemos2028.wsgi:application --bind 0.0.0.0:8000
"
