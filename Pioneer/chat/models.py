from django.db import models

# chat/models.py
from django.db import models
from accounts.models import CustomUser

class ChatRoom(models.Model):
    name = models.CharField(max_length=100, blank=True)  # Blank for 1-on-1 chats
    participants = models.ManyToManyField(CustomUser, related_name='chat_rooms')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        if self.name:
            return self.name
        return f"Chat between {', '.join(user.username for user in self.participants.all())}"

class Message(models.Model):
    chat_room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['timestamp']
    
    def __str__(self):
        return f"{self.sender.username}: {self.content[:20]}..."
