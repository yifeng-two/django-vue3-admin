'''
Author: yifeng
Date: 2022-10-18 19:10:27
LastEditors: yifeng
LastEditTime: 2022-10-18 19:11:40
Description: 
'''
from apps.system.models import Area
from apps.system.serializers.areaSerializer import AreaSerializer, AreaCreateUpdateSerializer
from backend.utils.viewSet import CustomModelViewSet


class AreaViewSet(CustomModelViewSet):
    """
    地区管理接口
    list:查询
    create:新增
    update:修改
    retrieve:单例
    destroy:删除
    """
    queryset = Area.objects.all()
    serializer_class = AreaSerializer
    extra_filter_backends = []
