# backend/Dockerfile
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential libpq-dev curl netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Copia dependências e instala
COPY backend/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copia o backend inteiro (inclui manage.py e django_cemos2028/)
COPY backend /app

# Exibe estrutura para debug (útil em Coolify logs)
RUN ls -la /app

EXPOSE 8000

CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py collectstatic --noinput && gunicorn django_cemos2028.wsgi:application --bind 0.0.0.0:8000"]
