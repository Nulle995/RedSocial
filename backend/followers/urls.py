from django.urls import path
from .views import FollowerListCreateAPIView, FollowerDeleteAPIView

urlpatterns = [
    path("followers/", FollowerListCreateAPIView.as_view(), name="followers"),
    path(
        "followers/delete/<int:pk>",
        FollowerDeleteAPIView.as_view(),
        name="followers-delete",
    ),
]
