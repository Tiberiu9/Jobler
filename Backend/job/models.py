from datetime import *
from django.db import models
from django.contrib.auth.models import User

from django.core.validators import MinValueValidator, MaxValueValidator


# Create your models here.
class JobType(models.TextChoices):
    Permanent = 'Permanent'
    Temporary = 'Temporary'
    Internship = 'Internship'


class Education(models.TextChoices):
    Bachelors = 'Bachelors'
    Masters = 'Masters'
    PHD = 'PHD'


class Experience(models.TextChoices):
    NO_EXPERIENCE = 'No Experience'
    ONE_YEAR = '1 Year'
    TWO_YEAR = '2 Years'
    THREE_YEAR_PLUS = '3 Years or above'


class Industry(models.TextChoices):
    IT = 'Information Technology'
    Business = 'Business'
    Banking = 'Banking'
    Education = 'Education'
    Healthcare = 'Healthcare'
    Manufacturing = 'Manufacturing'
    Telecommunications = 'Telecommunications'
    Others = 'Others'


def return_date():
    now = datetime.now()
    return now.strftime("%Y-%m-%d")


class Job(models.Model):
    title = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True)
    email = models.EmailField(null=True)
    address = models.CharField(max_length=200, null=True)
    jobType = models.CharField(max_length=40, choices=JobType.choices, default=JobType.Permanent)

    education = models.CharField(max_length=40, choices=Education.choices, default=Education.Bachelors)
    industry = models.CharField(max_length=40, choices=Industry.choices, default=Industry.Business)
    experience = models.CharField(max_length=40, choices=Experience.choices, default=Experience.NO_EXPERIENCE)

    salary = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(10000000)], null=True)
    positions = models.IntegerField(default=1, null=True)
    company = models.CharField(max_length=200, null=True)
    lastDate = models.DateField(default=return_date())
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
