from django.db import models
from users.models import UserProfile


# Create your models here.
class Post(models.Model):
    user = models.ForeignKey(
        UserProfile, related_name="posts", on_delete=models.CASCADE
    )
    content = models.CharField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        brief = self.content[:50]
        return f"{self.user.username}: {brief}..."
