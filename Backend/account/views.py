# from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes  # decorators
from rest_framework.response import Response
from rest_framework import status  # status codes

from django.contrib.auth.hashers import make_password  # hashing
from .serializers import SignUpSerializer, UserSerializer  # serializers
from django.contrib.auth.models import User  # inbuilt user model for auth

from rest_framework.permissions import IsAuthenticated

from .validators import validate_file_extension


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
                username=data['email'],
                email=data['email'],
                password=make_password(data['password'])
            )
            return Response({'message': 'User registered'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(user.errors)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user
    data = request.data

    user.first_name = data['first_name']
    user.last_name = data['last_name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


# def update_user(request):
#     serializer = UserSerializer(instance=request.user, data=request.data, partial=True)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def upload_resume(request):
    user = request.user
    resume = request.FILES.get('resume')

    if not resume:
        return Response({'error': 'Resume is required. Please upload your resume.'}, status=status.HTTP_400_BAD_REQUEST)

    if not validate_file_extension(resume.name):
        return Response({'error': 'Invalid file format. Only PDF files are allowed.'}, status=status.HTTP_400_BAD_REQUEST)

    user.userprofile.resume = resume
    user.userprofile.save()

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)
