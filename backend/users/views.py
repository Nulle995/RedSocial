from django.shortcuts import render
from rest_framework import generics
from .models import UserProfile
from .serializers import (
    UserProfileSerializer,
    UserProfileAllSerializer,
    CustomTokenObtainPairSerializer,
)

# Create your views here.


class UserProfileListCreateAPIView(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class UserProfileRetrieveAPIView(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileAllSerializer
    lookup_field = "username"


# Add info to the Token

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
