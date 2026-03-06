from django.contrib import admin
from django.contrib.auth import get_user_model

User = get_user_model()


@admin.register(User)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "username", "first_name", "last_name", "est_verifie", "created_at")
    search_fields = ("email", "username", "first_name", "last_name")
    list_filter = ("est_verifie", "is_staff", "is_superuser")

