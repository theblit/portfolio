from django.contrib import admin

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


@admin.register(Projet)
class ProjetAdmin(admin.ModelAdmin):
    list_display = ["titre", "technologies", "est_visible", "ordre"]
    list_filter = ["est_visible"]
    search_fields = ["titre", "technologies"]


@admin.register(Competence)
class CompetenceAdmin(admin.ModelAdmin):
    list_display = ["nom", "categorie", "niveau"]
    list_filter = ["categorie"]
    search_fields = ["nom", "categorie"]


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ["titre", "categorie", "est_publie", "created_at"]
    list_filter = ["categorie", "est_publie"]
    search_fields = ["titre", "categorie"]
    prepopulated_fields = {"slug": ("titre",)}


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ["titre", "categorie", "ordre"]
    list_filter = ["categorie"]
    search_fields = ["titre", "categorie"]


@admin.register(Temoignage)
class TemoignageAdmin(admin.ModelAdmin):
    list_display = ["nom", "poste", "note", "est_visible"]
    list_filter = ["est_visible", "note"]
    search_fields = ["nom", "poste"]


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ["nom", "email", "sujet", "est_lu", "created_at"]
    list_filter = ["est_lu", "created_at"]
    search_fields = ["nom", "email", "sujet"]


@admin.register(VideoYoutube)
class VideoYoutubeAdmin(admin.ModelAdmin):
    list_display = ["titre", "youtube_id", "est_visible", "ordre"]
    list_filter = ["est_visible"]
    search_fields = ["titre", "youtube_id"]


@admin.register(CV)
class CVAdmin(admin.ModelAdmin):
    list_display = ["titre", "est_actif", "updated_at"]
    list_filter = ["est_actif"]
    search_fields = ["titre"]

