from rest_framework import serializers

from apps.emails.services import EmailService
from .models import (
    Article,
    CV,
    Competence,
    Contact,
    Photo,
    Projet,
    Temoignage,
    VideoYoutube,
)


class ProjetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projet
        fields = "__all__"


class CompetenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competence
        fields = "__all__"


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = "__all__"
        read_only_fields = ["slug", "created_at"]


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = "__all__"


class TemoignageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Temoignage
        fields = "__all__"


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"
        read_only_fields = ["est_lu", "created_at"]

    def create(self, validated_data):
        instance = super().create(validated_data)
        EmailService.envoyer_contact(
            nom=instance.nom,
            email=instance.email,
            sujet=instance.sujet,
            message=instance.message,
        )
        return instance


class VideoYoutubeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoYoutube
        fields = "__all__"


class CVSerializer(serializers.ModelSerializer):
    class Meta:
        model = CV
        fields = "__all__"

