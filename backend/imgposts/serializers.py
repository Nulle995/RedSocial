from rest_framework import serializers

from .models import ImagePost


class ImgPostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagePost
        fields = ["pk", "post", "img"]
