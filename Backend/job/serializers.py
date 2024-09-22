from rest_framework import serializers
from .models import Job, JobApplicants


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'


class JobApplicantsSerializer(serializers.ModelSerializer):

    job = JobSerializer(read_only=True)

    class Meta:
        model = JobApplicants
        fields = ['user', 'resume', 'applied_at']
