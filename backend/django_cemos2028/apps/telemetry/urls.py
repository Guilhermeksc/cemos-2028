from django.urls import path

from django_cemos2028.apps.telemetry.views import PdfDownloadEventView

urlpatterns = [
    path("pdf-download/", PdfDownloadEventView.as_view(), name="pdf_download_event"),
]
