from django.shortcuts import render
from rest_framework import generics

from .models import ImagePost
from .serializers import ImgPostsSerializer

# Create your views here.


class ImgPostListCreateAPIView(generics.ListCreateAPIView):
    queryset = ImagePost.objects.all()
    serializer_class = ImgPostsSerializer
