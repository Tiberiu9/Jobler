# Generated by Django 5.0.6 on 2024-09-22 17:34

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0003_alter_job_lastdate_jobapplication'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameModel(
            old_name='JobApplication',
            new_name='JobApplicants',
        ),
    ]
