from django.shortcuts import render
from rest_framework import generics
from .models import CustomUser
from .serializers import RegisterSerializer
from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "Welcome to the API"})

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
