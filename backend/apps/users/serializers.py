from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from apps.emails.services import EmailService

User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["email"] = user.email
        token["nom_complet"] = f"{user.first_name} {user.last_name}".strip()
        token["est_verifie"] = user.est_verifie
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        data.update(
            {
                "id": user.id,
                "email": user.email,
                "nom": f"{user.first_name} {user.last_name}".strip(),
                "est_verifie": user.est_verifie,
            }
        )
        return data


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "email",
            "username",
            "first_name",
            "last_name",
            "password",
            "password_confirm",
        ]

    def validate(self, attrs):
        if attrs.get("password") != attrs.get("password_confirm"):
            raise serializers.ValidationError({"password": "Les mots de passe ne correspondent pas."})
        return attrs

    def create(self, validated_data):
        password = validated_data.pop("password")
        validated_data.pop("password_confirm", None)
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        EmailService.envoyer_bienvenue(user)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    email = serializers.ReadOnlyField()
    est_verifie = serializers.ReadOnlyField()
    created_at = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "avatar",
            "telephone",
            "est_verifie",
            "created_at",
        ]

