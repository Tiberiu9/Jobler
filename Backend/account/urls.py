from django.urls import path
# from .views import register
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('me/', views.current_user, name='current_user'),
    # path('login/', views.login, name='login'),
    # path('logout/', views.logout, name='logout'),
]
