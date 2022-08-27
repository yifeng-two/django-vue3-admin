'''
Author: yifeng
Date: 2022-08-14 16:49:50
LastEditors: yifeng
LastEditTime: 2022-08-27 23:10:07
Description: 
'''
from django.urls import re_path
from django.urls import path
from apps.detect.consumers import SendResultConsumer

websocket_urlpatterns = [
    # re_path(r'ws/(?P<group>\w+)/$', SendResultConsumer.as_asgi()),
    # re_path(r'ws/(?P<group>\w+)/$', SendResultConsumer.as_asgi()),
    path('test', SendResultConsumer.as_asgi()),
]