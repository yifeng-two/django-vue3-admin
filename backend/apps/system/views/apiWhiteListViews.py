'''
Author: yifeng
Date: 2022-10-16 21:45:55
LastEditors: yifeng
LastEditTime: 2022-10-16 21:45:56
Description: 
'''
from apps.system.models import ApiWhiteList
from apps.system.serializers.apiWhiteListSerializer import ApiWhiteListSerializer
from backend.utils.viewSet import CustomModelViewSet


class ApiWhiteListViewSet(CustomModelViewSet):
    """
    接口白名单
    list:查询
    create:新增
    update:修改
    retrieve:单例
    destroy:删除
    """
    queryset = ApiWhiteList.objects.all()
    serializer_class = ApiWhiteListSerializer
    # permission_classes = []