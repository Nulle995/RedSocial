from django.db import models
from django.contrib.auth.models import User, AbstractUser, BaseUserManager


class UserProfileManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not username:
            raise ValueError("The Username field must be set")
        if not email:
            raise ValueError("The Email field must be set")

        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(
            password
        )  # Esto se asegura de que la contraseña se guarde correctamente
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(username, email, password, **extra_fields)


# Create your models here.
class UserProfile(AbstractUser):
    bio = models.CharField(max_length=255, default="User's Bio.")
    birth_date = models.DateField(blank=True, null=True)
    avatar = models.ImageField(blank=True, null=True, default="profile_avatar.png")
    header_photo = models.ImageField(
        blank=True, null=True, default="profile_avatar.png"
    )

    def save(self, *args, **kwargs):
        if not self.avatar:
            self.avatar = "profile_avatar.png"
        if not self.header_photo:
            self.header_photo = "profile_avatar.png"
        super().save(*args, **kwargs)
