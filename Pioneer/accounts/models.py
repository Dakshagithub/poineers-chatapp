from django.db import models

# accounts/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    bio = models.TextField(blank=True)
    status = models.CharField(max_length=50, default='online')
    
    def __str__(self):
        return self.username
