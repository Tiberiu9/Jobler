from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.db.models import Count, Avg, Max, Min

from django.core.exceptions import ObjectDoesNotExist

from .filters import JobFilter  # filter
from rest_framework.pagination import PageNumberPagination  # pagination

from .models import Job
from .serializers import JobSerializer
from django.shortcuts import get_object_or_404


# Create your views here.
# @api_view(['GET'])
# def get_all_jobs(request):
#
#     jobs = Job.objects.all()
#
#     serializer = JobSerializer(jobs, many=True)
#     return Response(serializer.data)
#
#
# @api_view(['GET'])
# def get_job(request, pk):
#     job = get_object_or_404(Job, id=pk)
#     serializer = JobSerializer(job, many=False)
#     return Response(serializer.data)
#
#
# @api_view(['POST'])
# def new_job(request):
#     # data = request.data
#     #
#     # job = Job.objects.create(**data)
#     #
#     # serializer = JobSerializer(job, many=False)
#     # return Response(serializer.data)
#
#     serializer = JobSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     else:
#         return Response(serializer.errors)
#
#
# @api_view(['PUT'])
# def update_job(request, pk):
#     job = get_object_or_404(Job, id=pk)
#
#     if job.user != request.user:
#         return Response({'message': 'You can not update this job'}, status=status.HTTP_403_FORBIDDEN)
#
#     job.title = request.data['title']
#     job.description = request.data['description']
#     job.email = request.data['email']
#     job.address = request.data['address']
#     job.jobType = request.data['jobType']
#     job.education = request.data['education']
#     job.industry = request.data['industry']
#     job.experience = request.data['experience']
#     job.salary = request.data['salary']
#     job.positions = request.data['positions']
#     job.company = request.data['company']
#
#     job.save()
#
#     serializer = JobSerializer(job, many=False)
#
#     return Response(serializer.data)
#
#
# @api_view(['DELETE'])
# def delete_job(request, pk):
#     job = get_object_or_404(Job, id=pk)
#     job.delete()
#     return Response({'Job Deleted Successfully'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def jobs_list(request):

    filterset = JobFilter(request.GET, queryset=Job.objects.all().order_by('id'))
    count = filterset.qs.count()

    # Pagination
    resources_per_page = 3
    paginator = PageNumberPagination()
    paginator.page_size = resources_per_page
    results = paginator.paginate_queryset(filterset.qs, request)

    serializer = JobSerializer(results, many=True)
    return Response({
        "count": count,
        "resPerPage": resources_per_page,
        'jobs': serializer.data})


@api_view(['POST'])
def job_post(request):
    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def job_details(request, pk):
    try:
        article = Job.objects.get(pk=pk)
    except ObjectDoesNotExist:
        return HttpResponse('Job with this id does not exist', status=status.HTTP_404_NOT_FOUND)

    serializer = JobSerializer(article)
    return Response(serializer.data)


@api_view(['PUT'])
def job_update(request, pk):
    job = Job.objects.get(pk=pk)

    serializer = JobSerializer(job, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def job_delete(request, pk):
    job = get_object_or_404(Job, id=pk)
    job.delete()
    return Response({'Job Deleted Successfully'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def get_topic_stats(request, topic):

    args = {'title__icontains': topic}
    jobs = Job.objects.filter(**args)

    if len(jobs) == 0:
        return Response({'message': f'No jobs found for #{topic}'.format(topic=topic)})

    stats = jobs.aggregate(
        total_jobs=Count('title'),
        avg_positions=Avg('positions'),
        avg_salary=Avg('salary'),
        max=Max('salary'),
        min=Min('salary'),
    )

    return Response(stats)

