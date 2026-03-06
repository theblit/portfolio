from django.db import models
from django.utils.text import slugify


class Projet(models.Model):
    titre = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to="projets/")
    technologies = models.CharField(max_length=200)
    lien_github = models.URLField(blank=True)
    lien_demo = models.URLField(blank=True)
    ordre = models.IntegerField(default=0)
    est_visible = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["ordre"]

    def __str__(self) -> str:
        return self.titre


class Competence(models.Model):
    nom = models.CharField(max_length=100)
    categorie = models.CharField(max_length=100)
    niveau = models.IntegerField()
    icone = models.CharField(max_length=100, blank=True)
    ordre = models.IntegerField(default=0)

    class Meta:
        ordering = ["categorie", "ordre"]

    def __str__(self) -> str:
        return f"{self.categorie} - {self.nom}"


class Article(models.Model):
    titre = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    contenu = models.TextField()
    image_couverture = models.ImageField(upload_to="articles/", blank=True)
    categorie = models.CharField(max_length=100)
    est_publie = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.titre)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.titre


class Photo(models.Model):
    titre = models.CharField(max_length=200)
    image = models.ImageField(upload_to="galerie/")
    description = models.TextField(blank=True)
    categorie = models.CharField(max_length=100, blank=True)
    ordre = models.IntegerField(default=0)

    class Meta:
        ordering = ["ordre"]

    def __str__(self) -> str:
        return self.titre


class Temoignage(models.Model):
    nom = models.CharField(max_length=100)
    poste = models.CharField(max_length=200)
    avatar = models.ImageField(upload_to="temoignages/", blank=True)
    message = models.TextField()
    note = models.IntegerField()
    est_visible = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f"{self.nom} - {self.poste}"


class Contact(models.Model):
    nom = models.CharField(max_length=100)
    email = models.EmailField()
    sujet = models.CharField(max_length=200)
    message = models.TextField()
    est_lu = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.nom} - {self.sujet}"


class VideoYoutube(models.Model):
    titre = models.CharField(max_length=200)
    url_youtube = models.URLField()
    youtube_id = models.CharField(max_length=20, blank=True)
    description = models.TextField(blank=True)
    ordre = models.IntegerField(default=0)
    est_visible = models.BooleanField(default=True)

    class Meta:
        ordering = ["ordre"]

    def save(self, *args, **kwargs):
        if not self.youtube_id and self.url_youtube:
            self.youtube_id = self._extraire_id(self.url_youtube)
        super().save(*args, **kwargs)

    @staticmethod
    def _extraire_id(url: str) -> str:
        if "youtu.be/" in url:
            return url.split("youtu.be/")[1].split("?")[0]
        if "youtube.com/watch" in url and "v=" in url:
            return url.split("v=")[1].split("&")[0]
        return url

    def __str__(self) -> str:
        return self.titre


class CV(models.Model):
    titre = models.CharField(max_length=200)
    fichier = models.FileField(upload_to="cv/")
    est_actif = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.est_actif:
            CV.objects.exclude(pk=self.pk).update(est_actif=False)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.titre

