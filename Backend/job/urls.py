from django.urls import path, include
from .views import jobs_list, job_details, job_post, job_update, job_delete
from . import views

urlpatterns = [
    path('jobs/', jobs_list, name='jobs_list'),
    path('jobs/post/', job_post, name='job_post'),

    path('jobs/<int:pk>/', job_details, name='job_details'),
    path('jobs/<int:pk>/update/', job_update, name='job_update'),
    path('jobs/<int:pk>/delete/', job_delete, name='job_delete'),

    # path('jobs/', views.get_all_jobs, name='jobs'),
    # path('jobs/<str:pk>/', views.get_job, name='job'),
    # path('jobs/new/', views.new_job, name='new_job'),
    # path('jobs/<str:pk>/update/', views.update_job, name='update_job'),
    # path('jobs/<str:pk>/delete/', views.delete_job, name='delete_job'),
    path('stats/<str:topic>/', views.get_topic_stats, name='get_topic_stats'),
]


