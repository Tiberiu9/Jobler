# from django.shortcuts import render
from rest_framework.decorators import api_view  # api view decorator
from rest_framework.response import Response
from rest_framework import status  # status codes

from django.contrib.auth.hashers import make_password  # hashing
from .serializers import SignUpSerializer, UserSerializer  # serializers
from django.contrib.auth.models import User  # inbuilt user model


# # Create your views here.
@api_view(['POST'])
def register(request):
    if request.data is None:
        return Response({'error': 'Request data is missing'}, status=status.HTTP_400_BAD_REQUEST)
    data = request.data

    user = SignUpSerializer(data=data)

    if user.is_valid():
        if not User.objects.filter(username=data['email']).exists():
            user = User.objects.create(
                first_name=data['first_name'],
                last_name=data['last_name'],
                username=data['username'],
                email=data['email'],
                password=make_password(data['password'])
            )
            return Response({'message': 'User registered'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(user.errors)
