from django.shortcuts import render
from rest_framework import generics
from .models import Comment
from .serializers import CommentSerializer


# Create your views here.
class CommentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
