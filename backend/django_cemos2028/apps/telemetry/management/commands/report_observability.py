from datetime import timedelta

from django.core.management.base import BaseCommand
from django.db import models
from django.utils import timezone

from django_cemos2028.apps.telemetry.models import (
    LoginEvent,
    PdfDownloadEventLog,
)


class Command(BaseCommand):
    help = "Exibe contagens e usuários de logins e downloads de PDF (último dia e últimos 30 dias)."

    def handle(self, *args, **options):
        now = timezone.now()
        last_day = now - timedelta(days=1)
        last_30_days = now - timedelta(days=30)

        self.stdout.write(self.style.HTTP_INFO("=== Login Events ==="))
        self._print_login_stats("Últimas 24h", last_day)
        self._print_login_stats("Últimos 30 dias", last_30_days)

        self.stdout.write("")
        self.stdout.write(self.style.HTTP_INFO("=== PDF Download Events ==="))
        self._print_pdf_stats("Últimas 24h", last_day)
        self._print_pdf_stats("Últimos 30 dias", last_30_days)

    def _print_login_stats(self, label: str, since):
        qs = LoginEvent.objects.filter(created_at__gte=since)
        total = qs.count()
        by_status = qs.values("status").order_by("status").annotate(count=models.Count("id"))
        details = ", ".join(f"{item['status']}: {item['count']}" for item in by_status) or "sem registros"
        self.stdout.write(f"{label}: {total} logins ({details})")
        self._print_user_breakdown(qs, event_label="logins")

    def _print_pdf_stats(self, label: str, since):
        qs = PdfDownloadEventLog.objects.filter(created_at__gte=since)
        total = qs.count()
        by_origin = qs.values("origem").order_by("origem").annotate(count=models.Count("id"))
        details = ", ".join(f"{item['origem']}: {item['count']}" for item in by_origin) or "sem registros"
        self.stdout.write(f"{label}: {total} downloads ({details})")
        self._print_user_breakdown(qs, event_label="downloads")

    def _print_user_breakdown(self, qs, event_label: str):
        by_username = (
            qs.values("username")
            .order_by("username")
            .annotate(count=models.Count("id"))
        )

        if not by_username:
            self.stdout.write(f"  Usuários ({event_label}): sem registros")
            return

        users = ", ".join(
            f"{item['username'] or 'desconhecido'}: {item['count']}" for item in by_username
        )
        self.stdout.write(f"  Usuários ({event_label}): {users}")
