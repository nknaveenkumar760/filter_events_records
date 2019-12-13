from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [

    path('', views.index),
    path('search', views.search, name='search'),
    path('audio_player/<str:value>/', views.audio_player, name='audio_player'),
    path('song_download/<str:value>/', views.song_download, name='song_download'),

]
