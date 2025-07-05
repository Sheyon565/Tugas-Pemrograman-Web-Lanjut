from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField
from django.utils.html import strip_tags
# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Article(models.Model):
    title = models.CharField(max_length=255)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    body = RichTextField(default="Coming Soon...")
    image = models.ImageField(upload_to="article_images/", blank=True, null=True)

    def __str__(self):
        return self.title
    
    def excerpt(self):
        return strip_tags(self.body)[:150]