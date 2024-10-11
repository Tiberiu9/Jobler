from django.utils.datastructures import MultiValueDict
from django_filters import rest_framework as filters, MultipleChoiceFilter
from .models import Job, JobType


#
class JobsFilter(filters.FilterSet):

    keyword = filters.CharFilter(field_name='title', lookup_expr='icontains')
    location = filters.CharFilter(field_name='address', lookup_expr='icontains')
    min_salary = filters.NumberFilter(field_name='salary' or 0, lookup_expr='gte')
    max_salary = filters.NumberFilter(field_name='salary' or 1000000000, lookup_expr='lte')
    # jobType = MultipleChoiceFilter(field_name='jobType', choices=JobType.choices)
    # jobType = filters.MultipleChoiceFilter(field_name='jobType', choices=JobType.choices, lookup_expr='in')
    # jobType = filters.MultipleChoiceFilter(field_name='jobType', lookup_expr='in')
    # jobType = filters.CharFilter(field_name='jobType', choices=JobType.choices)

    # jobType = filters.CharFilter(field_name='jobType', lookup_expr='__in')
    # education = filters.CharFilter(field_name='education')
    # industry = filters.CharFilter(field_name='industry', lookup_expr='__in')
    # experience = filters.CharFilter(field_name='experience', lookup_expr='__in')

    class Meta:
        model = Job
        fields = ['keyword', 'location', 'education', 'jobType', 'industry', 'experience', 'min_salary', 'max_salary']


