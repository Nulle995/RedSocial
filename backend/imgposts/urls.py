from django.urls import path

from .views import ImgPostListCreateAPIView

urlpatterns = [
    path("imgpost/", ImgPostListCreateAPIView.as_view(), name="img-post"),
]
