'''
Author: yifeng
Date: 2022-08-10 20:56:03
LastEditors: yifeng
LastEditTime: 2022-08-10 20:56:05
Description: 
'''
from django.contrib import admin
from django.db import router
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
# router.register('bookstore/books', views.BookViewSet)

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', include(router.urls)),
]
