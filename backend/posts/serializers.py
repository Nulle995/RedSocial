from django.conf import settings
from rest_framework import serializers
from .models import Post


class UserDataSerializer(serializers.Serializer):
    username = serializers.SerializerMethodField(read_only=True)
    pk = serializers.SerializerMethodField(read_only=True)
    avatar = serializers.SerializerMethodField(read_only=True)

    def get_username(self, obj):
        return obj.username

    def get_pk(self, obj):
        return obj.pk

    def get_avatar(self, obj):
        request = self.context.get("request")
        if obj.avatar:
            return request.build_absolute_uri(obj.avatar.url)


class PostCommentsSerializer(serializers.Serializer):
    user = UserDataSerializer(read_only=True)
    content = serializers.SerializerMethodField(read_only=True)
    date = serializers.SerializerMethodField(read_only=True)

    def get_content(self, obj):
        return obj.content

    def get_date(self, obj):
        return obj.date


class PostImagesSerializer(serializers.Serializer):
    img = serializers.ImageField(use_url=True, required=False)

    def get_img(self, obj):
        return obj.img


class PostSerializer(serializers.ModelSerializer):
    author = UserDataSerializer(
        read_only=True,
        source="user",
    )
    comments = PostCommentsSerializer(read_only=True, many=True)
    images = PostImagesSerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = [
            "pk",
            "user",
            "author",
            "content",
            "created_at",
            "likes",
            "comments",
            "images",
        ]
        extra_kwargs = {
            "pk": {"read_only": True},
            "likes": {"read_only": True},
            "comments": {"read_only": True},
        }
