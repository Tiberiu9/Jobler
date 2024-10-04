# from django.shortcuts import render
from django.utils import timezone

from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from django.db.models import Count, Avg, Max, Min


from django.core.exceptions import ObjectDoesNotExist

from .filters import JobsFilter  # filter
from rest_framework.pagination import PageNumberPagination  # pagination

from .models import Job, JobApplicants
from .serializers import JobSerializer, JobApplicantsSerializer
from django.shortcuts import get_object_or_404

from rest_framework.permissions import IsAuthenticated


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
    filter_set = JobsFilter(request.GET, queryset=Job.objects.all().order_by('id'))
    count = filter_set.qs.count()

    # Pagination
    resources_per_page = 3
    paginator = PageNumberPagination()
    paginator.page_size = resources_per_page
    results = paginator.paginate_queryset(filter_set.qs, request)

    serializer = JobSerializer(results, many=True)
    return Response({
        "count": count,
        "resPerPage": resources_per_page,
        'jobs': serializer.data})


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def job_post(request):
#     request.data['user'] = request.user
#     data = request.data
#     job = Job.objects.create(**data)
#     serializer = JobSerializer(job, many=False)
#     return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def job_post(request):
    request.data['user'] = request.user
    data = request.data
    job = Job.objects.create(**data)
    serializer = JobSerializer(job, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def job_details(request, pk):
    try:
        job = Job.objects.get(id=pk)
    except ObjectDoesNotExist:
        return HttpResponse('Job with this id does not exist', status=status.HTTP_404_NOT_FOUND)

    applicants = job.jobapplicants_set.all().count()

    serializer = JobSerializer(job, many=False)
    # return Response({'job': serializer.data}, status=status.HTTP_200_OK)
    return Response({'job': serializer.data, 'applicants': applicants}, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def job_update(request, pk):
    job = Job.objects.get(id=pk)

    if job.user != request.user:
        return Response({'message': 'You can not update this job'}, status=status.HTTP_403_FORBIDDEN)

    serializer = JobSerializer(job, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def job_delete(request, pk):
    job = get_object_or_404(Job, id=pk)

    if job.user != request.user:
        return Response({'message': 'You can not delete this job'}, status=status.HTTP_403_FORBIDDEN)

    job.delete()

    return Response({'message': 'Job has been Deleted.'}, status=status.HTTP_200_OK)


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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apply_to_job(request, pk):

    user = request.user
    job = get_object_or_404(Job, id=pk)

    if user.userprofile.resume is None:
        return Response({'message': 'Please upload your resume first.'}, status=status.HTTP_400_BAD_REQUEST)

    if job.lastDate < timezone.now().date():
        return Response({'message': 'The job has already expired'}, status=status.HTTP_400_BAD_REQUEST)

    already_applied = job.jobapplicants_set.filter(user=user).exists()

    if already_applied:
        return Response({'message': 'You have already applied to this job'}, status=status.HTTP_400_BAD_REQUEST)

    job_applied = JobApplicants.objects.create(user=user, job=job, resume=user.userprofile.resume)

    return Response({'message': 'Job applied successfully', 'applied': True, 'job_id': job_applied.id}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user_applied_jobs(request):

    args = {'user_id': request.user.id}
    jobs = JobApplicants.objects.filter(**args)
    serializer = JobApplicantsSerializer(jobs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_applied(request, pk):

    user = request.user
    job = get_object_or_404(Job, id=pk)
    applied = job.jobapplicants_set.filter(user=user).exists()

    return Response(applied)  # return True or False boolean value


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user_jobs(request):

    args = {'user_id': request.user.id}
    jobs = Job.objects.filter(**args)
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_job_applicants(request, pk):
#
#     user = request.user
#     job = get_object_or_404(Job, id=pk)
#
#     if job.user != user:
#         return Response({'message': 'You can not access this job applicants'}, status=status.HTTP_403_FORBIDDEN)
#
#     applicants = job.jobapplicants_set.all()
#
#     serializer = JobApplicantsSerializer(applicants, many=True)
#     return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_job_applicants(request, pk):

    user = request.user
    job = get_object_or_404(Job, id=pk)

    if job.user != user:
        return Response({'detail': 'You can not access this job applicants'}, status=status.HTTP_403_FORBIDDEN)

    applicants = job.jobapplicants_set.all()

    serializer = JobApplicantsSerializer(applicants, many=True)
    return Response(serializer.data)
