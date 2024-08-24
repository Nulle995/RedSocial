from rest_framework import serializers
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Follower


class FollowerDetailSerializer(serializers.Serializer):
    pk = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    avatar = serializers.ImageField(read_only=True)

    def get_pk(self, obj):
        return obj.pk

    def get_username(self, obj):
        return obj.username

    def get_avatar(self, obj):
        return obj.avatar


class FollowersSerializer(serializers.ModelSerializer):
    user_data = FollowerDetailSerializer(source="user", read_only=True)
    follower_data = FollowerDetailSerializer(source="follower", read_only=True)

    class Meta:
        model = Follower
        fields = [
            "pk",
            "user",
            "user_data",
            "follower",
            "follower_data",
        ]
