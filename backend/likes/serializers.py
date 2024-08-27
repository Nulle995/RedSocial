from rest_framework import serializers

from .models import Like


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = [
            "pk",
            "user",
            "post",
        ]
