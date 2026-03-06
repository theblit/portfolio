from rest_framework import permissions, viewsets, decorators, response

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
from .serializers import (
    ArticleSerializer,
    CVSerializer,
    CompetenceSerializer,
    ContactSerializer,
    PhotoSerializer,
    ProjetSerializer,
    TemoignageSerializer,
    VideoYoutubeSerializer,
)


class BaseViewSet(viewsets.ModelViewSet):
    """Base ViewSet to apply permission rules."""

    def get_permissions(self):
        if self.action in ["list", "retrieve", "actif"]:
            permission_classes = [permissions.AllowAny]
        elif self.basename == "contact" and self.action == "create":
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]


class ProjetViewSet(BaseViewSet):
    queryset = Projet.objects.all()
    serializer_class = ProjetSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if not self.request.user.is_staff:
            qs = qs.filter(est_visible=True)
        return qs


class CompetenceViewSet(BaseViewSet):
    queryset = Competence.objects.all()
    serializer_class = CompetenceSerializer


class ArticleViewSet(BaseViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    lookup_field = "slug"

    def get_queryset(self):
        qs = super().get_queryset()
        if not self.request.user.is_staff:
            qs = qs.filter(est_publie=True)
        return qs


class PhotoViewSet(BaseViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


class TemoignageViewSet(BaseViewSet):
    queryset = Temoignage.objects.all()
    serializer_class = TemoignageSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if not self.request.user.is_staff:
            qs = qs.filter(est_visible=True)
        return qs


class ContactViewSet(BaseViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class VideoYoutubeViewSet(BaseViewSet):
    queryset = VideoYoutube.objects.all()
    serializer_class = VideoYoutubeSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if not self.request.user.is_staff:
            qs = qs.filter(est_visible=True)
        return qs


class CVViewSet(BaseViewSet):
    queryset = CV.objects.all()
    serializer_class = CVSerializer

    @decorators.action(detail=False, methods=["get"], url_path="actif", permission_classes=[permissions.AllowAny])
    def actif(self, request, *args, **kwargs):
        cv = CV.objects.filter(est_actif=True).first()
        if not cv:
            return response.Response({}, status=204)
        serializer = self.get_serializer(cv)
        return response.Response(serializer.data)

