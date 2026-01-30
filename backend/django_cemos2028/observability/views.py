from django.http import HttpResponse
from prometheus_client import CONTENT_TYPE_LATEST, generate_latest


def metrics_view(request):
    """Exposição simples do registro de métricas do Prometheus."""
    return HttpResponse(generate_latest(), content_type=CONTENT_TYPE_LATEST)
