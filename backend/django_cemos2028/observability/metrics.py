import logging
from typing import Optional, Tuple

from prometheus_client import Counter

from django.contrib.auth import get_user_model
from django.db import DatabaseError

from django_cemos2028.apps.telemetry.models import (
    LoginEvent,
    PdfDownloadEventLog,
)

UserModel = get_user_model()
logger = logging.getLogger(__name__)

login_counter = Counter(
    "login_requests_total",
    "Total de requisições de login (sucesso x erro)",
    ["status", "perfil", "is_staff"],
)

pdf_download_counter = Counter(
    "pdf_download_total",
    "Total de PDFs gerados via Simulados",
    ["origem", "perfil"],
)


def _extract_user_attributes(user: Optional[UserModel]) -> Tuple[str, bool, Optional[str]]:
    if user is None or not getattr(user, "is_authenticated", False):
        return "anonimo", False, None

    perfil = getattr(user, "perfil", "indefinido") or "indefinido"
    return perfil, bool(getattr(user, "is_staff", False)), getattr(user, "username", None)


def track_login(user: Optional[UserModel], status: str) -> None:
    perfil, is_staff, username = _extract_user_attributes(user)
    login_counter.labels(
        status=status,
        perfil=perfil,
        is_staff="true" if is_staff else "false",
    ).inc()

    if LoginEvent._meta.db_table:
        try:
            LoginEvent.objects.create(
                user=user if getattr(user, "pk", None) else None,
                username=username,
                perfil=perfil,
                is_staff=is_staff,
                status=status,
            )
        except DatabaseError as exc:
            logger.warning("Falha ao registrar LoginEvent: %s", exc)


def track_pdf_download(user: Optional[UserModel], origem: str) -> None:
    origem_normalized = origem or "desconhecida"
    perfil, _, username = _extract_user_attributes(user)
    pdf_download_counter.labels(origem=origem_normalized, perfil=perfil).inc()

    if PdfDownloadEventLog._meta.db_table:
        try:
            PdfDownloadEventLog.objects.create(
                user=user if getattr(user, "pk", None) else None,
                username=username,
                perfil=perfil,
                origem=origem_normalized,
            )
        except DatabaseError as exc:
            logger.warning("Falha ao registrar PdfDownloadEventLog: %s", exc)
