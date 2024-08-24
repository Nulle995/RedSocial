from .views import UserProfileListCreateAPIView, UserProfileRetrieveAPIView
from django.urls import path


urlpatterns = [
    path("userprofiles/", UserProfileListCreateAPIView.as_view(), name="user-profiles"),
    path(
        "userprofile/<str:username>/",
        UserProfileRetrieveAPIView.as_view(),
        name="user-profile",
    ),
]
