from django.db import models
from posts.models import Post


# Create your models here.
class ImagePost(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="images")
    img = models.ImageField()
