from django.urls import path
# from .views import register
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('me/', views.current_user, name='current_user'),
    path('me/update/', views.update_user, name='update_user'),
    path('upload/resume/', views.upload_resume, name='upload_resume'),
    # path('login/', views.login, name='login'),
    # path('logout/', views.logout, name='logout'),
]
