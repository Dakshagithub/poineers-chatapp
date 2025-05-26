import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Message, ChatRoom
from accounts.models import CustomUser

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.room_group_name = f'chat_{self.chat_id}'
        
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        
        await self.accept()
    
    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        sender_id = text_data_json['sender_id']
        
        # Save message to database
        chat_room = await self.get_chat_room(self.chat_id)
        sender = await self.get_user(sender_id)
        await self.create_message(chat_room, sender, message)
        
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender_id': sender_id,
                'sender_username': sender.username
            }
        )
    
    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        sender_id = event['sender_id']
        sender_username = event['sender_username']
        
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'sender_id': sender_id,
            'sender_username': sender_username
        }))
    
    @database_sync_to_async
    def get_chat_room(self, chat_id):
        return ChatRoom.objects.get(id=chat_id)
    
    @database_sync_to_async
    def get_user(self, user_id):
        return CustomUser.objects.get(id=user_id)
    
    @database_sync_to_async
    def create_message(self, chat_room, sender, content):
        return Message.objects.create(
            chat_room=chat_room,
            sender=sender,
            content=content
        )