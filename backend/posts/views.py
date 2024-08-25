from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Post
from .serializers import PostSerializer
from imgposts.models import ImagePost

# Create your views here.


class PostListCreateAPIView(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        post = serializer.save()  # Guarda el post
        images = self.request.FILES.getlist(
            "images"
        )  # Obtén las imágenes enviadas en la solicitud

        # Si se enviaron imágenes, guárdalas en ImagePost
        print(images)
        if images:
            for img in images:
                ImagePost.objects.create(post=post, img=img)
