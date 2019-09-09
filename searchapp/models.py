from django.db import models
from django.utils import timezone
# Create your models here.

class Search_records(models.Model):

    call_date = models.CharField(max_length=50)
    user = models.CharField(max_length=40, null=True)
    full_name = models.CharField(max_length=100, null=True)
    lead_id = models.CharField(max_length=50, null=True)
    campaign_id = models.CharField(max_length=40,null=True)
    vendor_lead_code = models.IntegerField(null=True)
    source_id = models.CharField(max_length=50)
    list_id = models.CharField(max_length=50,null=True)
    mobile_no = models.CharField(max_length=100,null=True)
    name = models.CharField(max_length=100,null=True)
    company_name = models.CharField(max_length=100, null=True)
    length_in_sec = models.CharField(max_length=50,null=True)
    status =models.CharField(max_length=50, null=True)
    status_name = models.CharField(max_length=50, null=True)
    recording_id = models.CharField(max_length=50, null=True)
    call_notes = models.CharField(max_length=100, null=True)
    recording_url = models.CharField(max_length=1000, null=True)
    