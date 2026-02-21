from django.conf import settings
from django.contrib import messages
from django.contrib.auth.views import PasswordResetView
from django.views.generic.edit import FormView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView

from django_cemos2028.observability.metrics import track_login

from .forms import RegisterUserForm
from .serializers import CustomTokenObtainPairSerializer


class CemosPasswordResetView(PasswordResetView):
    """
    Garante que o link de reset use o domínio público configurado no .env.
    """

    def get_email_options(self):
        email_options = super().get_email_options()
        email_options["domain_override"] = settings.SITE_DOMAIN
        email_options["use_https"] = True
        email_options["from_email"] = settings.DEFAULT_FROM_EMAIL
        return email_options


class RegisterUserView(FormView):
    template_name = "registration/register.html"
    form_class = RegisterUserForm
    success_url = "/login/"

    def form_valid(self, form):
        form.save()
        messages.success(self.request, "Usuário criado com sucesso. Faça login para continuar.")
        return super().form_valid(form)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        try:
            return super().post(request, *args, **kwargs)
        except (AuthenticationFailed, InvalidToken, TokenError):
            track_login(user=None, status="error")
            raise
