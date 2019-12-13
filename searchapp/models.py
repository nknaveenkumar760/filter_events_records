from django.db import models
from django.utils import timezone
# Create your models here.

class Search_records(models.Model):

    call_date = models.CharField(max_length=50)
    time = models.CharField(max_length=100)
    campaign_id = models.CharField(max_length=100, null=True)
    campaign_name = models.CharField(max_length=500, null=True)
    lead_id = models.CharField(max_length=100, null=True)
    first_name = models.CharField(max_length=100, null=True)
    user_id = models.CharField(max_length=100,null=True)
    badge_id = models.CharField(max_length=100,null=True)
    mobile_no = models.CharField(max_length=100,null=True)
    company_name = models.CharField(max_length=100, null=True)
    city = models.CharField(max_length=500,null=True)
    status = models.CharField(max_length=500, null=True)
    length_in_sec = models.CharField(max_length=50,null=True)
    comments = models.CharField(max_length=500, null=True)
    recording_filename = models.CharField(max_length=1000, null=True)
    recording_location = models.CharField(max_length=1000, null=True)
    