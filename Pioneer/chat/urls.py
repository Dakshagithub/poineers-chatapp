from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.home, name='home'),
    path('new-chat/', views.new_chat, name='new_chat'),
    path('chat/<int:chat_id>/', views.chat_room, name='chat_room'),
    path('profile/<int:user_id>/', views.profile, name='profile'),
    path('reset-password/', views.reset_password, name='reset_password'),
    path('reset-password/<uidb64>/<token>/', views.reset_password_confirm, name='reset_password_confirm'),
]