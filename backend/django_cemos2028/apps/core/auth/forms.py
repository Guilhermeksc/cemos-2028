from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm


class RegisterUserForm(UserCreationForm):
    email = forms.EmailField(required=True, label="E-mail de recuperação")

    class Meta:
        model = get_user_model()
        fields = ("username", "email", "password1", "password2")

    def clean_email(self):
        email = self.cleaned_data["email"].strip().lower()
        user_model = get_user_model()
        if user_model.objects.filter(email__iexact=email).exists():
            raise forms.ValidationError("Este e-mail já está cadastrado.")
        return email

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data["email"]
        # Perfil padrão para cadastro público.
        if not getattr(user, "perfil", None):
            user.perfil = "consulta"
        if commit:
            user.save()
        return user
