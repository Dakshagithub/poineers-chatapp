from django.shortcuts import render

# chat/views.py
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import ChatRoom, Message
from .forms import MessageForm
from accounts.models import CustomUser

@login_required
def home(request):
    chat_rooms = request.user.chat_rooms.all()
    return render(request, 'home.html', {'chat_rooms': chat_rooms})

@login_required
def new_chat(request):
    if request.method == 'POST':
        user_id = request.POST.get('user_id')
        other_user = get_object_or_404(CustomUser, id=user_id)
        
        chat_room = ChatRoom.objects.filter(participants=request.user).filter(participants=other_user).first()
        
        if not chat_room:
            chat_room = ChatRoom.objects.create()
            chat_room.participants.add(request.user, other_user)
        
        return redirect('chat_room', chat_id=chat_room.id)
    
    users = CustomUser.objects.exclude(id=request.user.id)
    return render(request, 'new-chat.html', {'users': users})

@login_required
def chat_room(request, chat_id):
    chat_room = get_object_or_404(ChatRoom, id=chat_id)
    if request.user not in chat_room.participants.all():
        return redirect('home')
    
    messages = chat_room.messages.all()
    form = MessageForm()
    
    if request.method == 'POST':
        form = MessageForm(request.POST)
        if form.is_valid():
            message = form.save(commit=False)
            message.chat_room = chat_room
            message.sender = request.user
            message.save()
            return redirect('chat_room', chat_id=chat_id)
    
    other_user = chat_room.participants.exclude(id=request.user.id).first()
    return render(request, 'chat-room.html', {
        'chat_room': chat_room,
        'messages': messages,
        'other_user': other_user,
        'form': form
    })

@login_required
def profile(request, user_id):
    user = get_object_or_404(CustomUser, id=user_id)
    return render(request, 'profile.html', {'user': user})

@login_required
def reset_password(request):
    if request.method == 'POST':
        # Handle password reset logic here
        pass
    return render(request, 'reset-password.html')

@login_required
def reset_password_confirm(request, uidb64, token):
    # Handle password reset confirmation logic here
    return render(request, 'reset-password-confirm.html')