from rest_framework import serializers
from .models import UserProfile
from posts.serializers import PostSerializer
from followers.serializers import FollowersSerializer


class UserProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(use_url=True, required=False)
    followers = FollowersSerializer(read_only=True, many=True)
    following = FollowersSerializer(read_only=True, many=True)

    class Meta:
        model = UserProfile
        fields = [
            "pk",
            "username",
            "first_name",
            "last_name",
            "email",
            "bio",
            "birth_date",
            "password",
            "avatar",
            "followers",
            "following",
        ]

    def create(self, validated_data):
        user = UserProfile.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
            bio=validated_data.get("bio", "User's Bio"),
            birth_date=validated_data.get("birth_date"),
            avatar=validated_data.get("avatar"),
        )

        return user


class UserProfileAllSerializer(serializers.ModelSerializer):
    posts = PostSerializer(read_only=True, many=True)
    avatar = serializers.ImageField(use_url=True, required=False)
    followers = FollowersSerializer(read_only=True, many=True)
    following = FollowersSerializer(read_only=True, many=True)

    class Meta:
        model = UserProfile
        fields = [
            "pk",
            "username",
            "first_name",
            "last_name",
            "email",
            "bio",
            "birth_date",
            "password",
            "posts",
            "avatar",
            "followers",
            "following",
        ]


# Add info to the Token
import os
from django.conf import settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from users.models import UserProfile
from followers.serializers import FollowersSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):

        token = super().get_token(user)

        token["username"] = user.username
        token["bio"] = user.bio
        token["is_staff"] = user.is_staff
        followers = user.followers.all()
        token["followers"] = FollowersSerializer(followers, many=True).data
        following = user.following.all()
        token["following"] = FollowersSerializer(following, many=True).data
        token["avatar"] = cls.get_avatar_url(user)

        return token

    @staticmethod
    def get_avatar_url(user):

        if user.avatar and hasattr(user.avatar, "url"):
            return settings.SITE_URL + user.avatar.url
        return None
