FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential libpq-dev curl netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Copia requirements e instala dependências
COPY backend/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copia TODO o backend
COPY backend/ /app/

EXPOSE 8000

CMD ["gunicorn", "django_cemos2028.wsgi:application", "--bind", "0.0.0.0:8000"]
