from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template, render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.tokens import default_token_generator
import logging

logger = logging.getLogger(__name__)

User = get_user_model()


class EmailService:
    @staticmethod
    def _envoyer(sujet: str, template_name: str, contexte: dict, destinataire: str) -> None:
        try:
            html_content = render_to_string(template_name, contexte)
            text_content = get_template(template_name).render(contexte)
            msg = EmailMultiAlternatives(
                subject=sujet,
                body=text_content,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[destinataire],
            )
            msg.attach_alternative(html_content, "text/html")
            msg.send()
        except Exception as exc:  # pragma: no cover - log only
            logger.exception("Erreur lors de l'envoi d'email : %s", exc)

    @staticmethod
    def envoyer_bienvenue(user: User) -> None:
        sujet = _("Bienvenue sur mon portfolio !")
        contexte = {
            "user": user,
            "prenom": user.first_name or user.username,
        }
        EmailService._envoyer(sujet, "emails/bienvenue.html", contexte, user.email)

    @staticmethod
    def envoyer_reset_password(user: User) -> None:
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        reset_link = f"http://localhost:4200/reset-password/{uid}/{token}/"
        contexte = {
            "user": user,
            "prenom": user.first_name or user.username,
            "reset_link": reset_link,
        }
        sujet = _("Réinitialisation de votre mot de passe")
        EmailService._envoyer(sujet, "emails/reset_password.html", contexte, user.email)

    @staticmethod
    def envoyer_contact(nom: str, email: str, sujet: str, message: str) -> None:
        contexte = {
            "nom": nom,
            "email": email,
            "sujet": sujet,
            "message": message,
        }
        EmailService._envoyer(
            _("Nouveau message de contact"),
            "emails/contact.html",
            contexte,
            settings.EMAIL_DESTINATAIRE,
        )

