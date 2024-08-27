from django.urls import path
from .views import LikeListCreateAPIView, LikeDeleteAPIView


urlpatterns = [
    path("likes/", LikeListCreateAPIView.as_view(), name="likes"),
    path("likes/delete/<int:pk>/", LikeDeleteAPIView.as_view(), name="likes-delete"),
]
