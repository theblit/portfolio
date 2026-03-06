from rest_framework.routers import DefaultRouter

from .views import (
    ArticleViewSet,
    CVViewSet,
    CompetenceViewSet,
    ContactViewSet,
    PhotoViewSet,
    ProjetViewSet,
    TemoignageViewSet,
    VideoYoutubeViewSet,
)

router = DefaultRouter()
router.register("projets", ProjetViewSet, basename="projets")
router.register("competences", CompetenceViewSet, basename="competences")
router.register("articles", ArticleViewSet, basename="articles")
router.register("galerie", PhotoViewSet, basename="galerie")
router.register("temoignages", TemoignageViewSet, basename="temoignages")
router.register("contact", ContactViewSet, basename="contact")
router.register("videos", VideoYoutubeViewSet, basename="videos")
router.register("cv", CVViewSet, basename="cv")

urlpatterns = router.urls

