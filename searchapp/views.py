from django.shortcuts import render, HttpResponse
from .models import Search_records
import datetime
from django.http import JsonResponse
from django.core import serializers


def index(request):

    return render(request, 'index.html')


def search(request):

    if request.method == "POST":
        event = request.POST['event']
        company_name = request.POST['event_name']
        start_date = str(request.POST['date_start'])
        end_date = str(request.POST['date_end'])
        mobile = request.POST['mobile']
        try:
            start_date = datetime.datetime.strptime(start_date, '%Y-%m-%d').strftime('%d/%m/20%y')
            end_date = datetime.datetime.strptime(end_date, '%Y-%m-%d').strftime('%d/%m/20%y')
        except ValueError:
            pass

        print(event, company_name, mobile, start_date, end_date)

        if event and mobile:
            print("event and mobile")
            search_data = Search_records.objects.all().filter(source_id=event, mobile_no=mobile).exclude(recording_url__exact='')

        elif event and start_date and end_date:
            print("event and time ")
            search_data = Search_records.objects.all().filter(source_id=event, call_date=[start_date, end_date]).exclude(recording_url__exact='')

        elif mobile:
            print("mobile only")
            search_data = Search_records.objects.all().filter(mobile_no=mobile).exclude(recording_url__exact='')

        elif company_name:
            print("company name only")
            search_data = Search_records.objects.all().filter(company_name=company_name).exclude(recording_url__exact='')

        elif event and company_name:
            print("event and company name ")
            search_data = Search_records.objects.all().filter(source_id=event, company_name=company_name).exclude(recording_url__exact='')

        elif event:
            print("event only ")
            # search_data = Search_records.objects.all().filter(source_id=event)
            search_data = Search_records.objects.all().exclude(recording_url__exact='')

        else:
            print("else portion execute")
            search_data = Search_records.objects.all().filter(call_date=[start_date, end_date]).exclude(recording_url__exact='')

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

