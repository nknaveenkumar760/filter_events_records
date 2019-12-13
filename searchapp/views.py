from django.shortcuts import render, HttpResponse
from .models import Search_records
import datetime
from django.http import JsonResponse
from django.core import serializers
from django.conf import settings

import os

def index(request):

    return render(request, 'index.html')


def search(request):

    if request.method == "POST":
        event = request.POST['event']
        campaign_name = request.POST['event_name']
        status = request.POST['status']
        start_date = str(request.POST['date_start'])
        end_date = str(request.POST['date_end'])
        mobile = request.POST['mobile']

        try:
            start_date = datetime.datetime.strptime(start_date, '%Y-%m-%d').strftime('%d/%m/%y')  #strftime('%d/%m/20%y')
            end_date = datetime.datetime.strptime(end_date, '%Y-%m-%d').strftime('%d/%m/%y')
        except ValueError as e:
            pass

        print(event, campaign_name, status, mobile, start_date, end_date)

        if event and mobile:
            print("event and mobile")
            search_data = Search_records.objects.all().filter(campaign_id=event, mobile_no=mobile).exclude(recording_location__exact='')

        elif event and start_date and end_date:
            print("event and time ")
            search_data = Search_records.objects.all().filter(campaign_id=event, call_date__range=[start_date, end_date]).exclude(recording_location__exact='')

        elif mobile:
            print("mobile only")
            search_data = Search_records.objects.all().filter(mobile_no=mobile).exclude(recording_location__exact='')

        elif campaign_name:
            print("Campaign Name")
            search_data = Search_records.objects.all().filter(campaign_name=campaign_name).exclude(recording_location__exact='')

        elif event and campaign_name:
            print("event and Campaign Name ")
            search_data = Search_records.objects.all().filter(campaign_id=event, campaign_name=campaign_name).exclude(recording_location__exact='')

        elif event:
            print("event only ")
            # search_data = Search_records.objects.all().filter(source_id=event)
            search_data = Search_records.objects.all().filter(campaign_id=event).exclude(recording_location__exact='')

        
        elif status:
            print("status api hits")
            search_data = Search_records.objects.all().filter(status=status).exclude(recording_location__exact='')

        else:
            print("else portion execute")
            response = JsonResponse({"error": "Please Enter Any query for Search"})
            response.status_code = 403
            return response
            
        # data = serializers.serialize('json', search_data)
        # record = {"data": data}
        values_list = list(search_data.values())

        if search_data:
            return JsonResponse(values_list, safe=False)

        else:

            response = JsonResponse({"error": "No Records Founds"})
            response.status_code = 403
            return response

    else:
         response = JsonResponse({"error": "Something is Wrong Please try again."})
         response.status_code = 403
         return response


def audio_player(request, value):

    # f = open(os.path.expanduser("~/Downloads/audio_list/" + value + "-all" + ".mp3"))
    file_name = value + "-all" + ".mp3"
    # print(f)
    print(file_name)
    # file_name = os.path.join(settings.FILES_DIR, '112731_191210103417_9624048848-all.mp3')
    # file_name = open(os.path.join(settings.BASE_DIR, 'media/'+file_name),mode='rb')
    # print(file_name)

    # file = open("User/naveenkumar/Downloads/media/112731_191210103417_9624048848-all.mp3", "rb").read() 
    # file['Content-Disposition'] = 'attachment; filename=filename.mp3' 
    # return HttpResponse(file, mimetype="audio/mpeg") 
    return render(request, 'audio_page.html', {'file_name':file_name})


def song_download(request, value):
    file_name = value + "-all" + ".mp3"
    fsock = open('media/'+file_name, 'rb')
    print(fsock)
    response = HttpResponse(fsock, content_type='audio/mpeg')
    response['Content-Disposition'] = "attachment; filename="+file_name+".mp3"
                                     
    return response




