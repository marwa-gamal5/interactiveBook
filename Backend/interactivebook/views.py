from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Flipbook

# Create your views here.

@csrf_exempt
def get_jsondata(request):
        print('AAAAAAAAAAAAA')
        try:
            flipbook = Flipbook.objects.all()
            # Serialize data to JSON
            data = {
                'data': [
                    {'page_id': page.page_id,
                     'json_data': page.jsondata
                     }
                         
                    for page in flipbook
                    ]
            }
            # Print 'json_data' for each page
            for page_data in data['data']:
                    print('json_data:', page_data['json_data'])
           
            return JsonResponse(data)

        except Flipbook.DoesNotExist:
            return JsonResponse({'error': 'Data not found'}, status=404)


@csrf_exempt
def insert_jsondata(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        page_id = data.get('page_id')
        jsondata = data.get('jsondata')
        if Flipbook.objects.filter(page_id=page_id).count() > 0:
            flipbook = Flipbook.objects.get(page_id=page_id)
            flipbook.jsondata = jsondata
            flipbook.save()
        if Flipbook.objects.filter(page_id=page_id).count() < 1:
            Flipbook.objects.create(page_id=page_id, jsondata=jsondata)

            # if page_id is not None and jsondata is not None:
    return HttpResponse(json.dumps({'status': 'success'}), content_type="application/json")


@csrf_exempt
def deletfunction(request):
    Flipbook.objects.filter(page_id=17).delete()
    return HttpResponse(json.dumps({'status': 'success'}), content_type="application/json")