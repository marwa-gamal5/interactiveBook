from django.urls import path
from . import views

urlpatterns = [

    path('get_jsondata/',views.get_jsondata, name='get_jsondata'),
    path('insert_jsondata/', views.insert_jsondata, name='insert_jsondata'),
    path('deletfunction/', views.deletfunction, name='deletfunction'),
]