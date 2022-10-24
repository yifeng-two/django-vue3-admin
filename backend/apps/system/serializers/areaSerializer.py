'''
Author: yifeng
Date: 2022-10-18 19:09:00
LastEditors: yifeng
LastEditTime: 2022-10-18 19:11:31
Description: 
'''
from rest_framework import serializers

from apps.system.models import Area
from apps.system.serializers.customModelSerializer import CustomModelSerializer
from backend.utils.viewSet import CustomModelViewSet


class AreaSerializer(CustomModelSerializer):
    """
    地区-序列化器
    """
    pcode_count = serializers.SerializerMethodField(read_only=True)

    def get_pcode_count(self, instance: Area):
        return Area.objects.filter(pcode=instance).count()

    class Meta:
        model = Area
        fields = "__all__"
        read_only_fields = ["id"]


class AreaCreateUpdateSerializer(CustomModelSerializer):
    """
    地区管理 创建/更新时的列化器
    """

    class Meta:
        model = Area
        fields = '__all__'

