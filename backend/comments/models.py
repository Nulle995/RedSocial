from django.db import models
from posts.models import Post
from users.models import UserProfile

# Create your models here.


class Comment(models.Model):
    user = models.ForeignKey(
        UserProfile, related_name="comments", on_delete=models.CASCADE
    )
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length=255)

    def __str__(self):
        brief = self.content[:50]
        return f"{self.user.username}: {brief}..."
