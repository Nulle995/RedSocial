from django.shortcuts import render
from rest_framework import generics
from .models import Follower
from .serializers import FollowersSerializer

# Create your views here.


class FollowerListCreateAPIView(generics.ListCreateAPIView):
    queryset = Follower.objects.all()
    serializer_class = FollowersSerializer


class FollowerDeleteAPIView(generics.DestroyAPIView):
    queryset = Follower.objects.all()
    serializer_class = FollowersSerializer
