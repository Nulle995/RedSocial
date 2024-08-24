from rest_framework import serializers
from .models import Follower
from users.models import UserProfile


class FollowerDetailSerializer(serializers.Serializer):
    pk = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    bio = serializers.SerializerMethodField(read_only=True)
    avatar = serializers.ImageField(read_only=True)

    def get_pk(self, obj):
        print(obj)
        return obj.pk

    def get_username(self, obj):
        return obj.username

    def get_bio(self, obj):
        return obj.bio

    def get_avatar(self, obj):
        return obj.avatar


class FollowersSerializer(serializers.ModelSerializer):
    user = FollowerDetailSerializer(read_only=True)
    follower = FollowerDetailSerializer(read_only=True)

    user_id = serializers.PrimaryKeyRelatedField(
        queryset=UserProfile.objects.all(), write_only=True
    )
    follower_id = serializers.PrimaryKeyRelatedField(
        queryset=UserProfile.objects.all(), write_only=True
    )

    class Meta:
        model = Follower
        fields = [
            "pk",
            "user",
            "follower",
            "user_id",
            "follower_id",
        ]

    def create(self, validated_data):
        user = validated_data.pop("user_id")
        follower = validated_data.pop("follower_id")
        return Follower.objects.create(user=user, follower=follower)
