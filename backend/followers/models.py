from django.db import models
from users.models import UserProfile


# Create your models here.
class Follower(models.Model):
    user = models.ForeignKey(
        UserProfile, related_name="followers", on_delete=models.CASCADE
    )
    follower = models.ForeignKey(
        UserProfile, related_name="following", on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.follower.username} is following: {self.user.username}"
