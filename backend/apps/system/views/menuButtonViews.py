'''
Author: yifeng
Date: 2022-08-28 19:27:53
LastEditors: yifeng
LastEditTime: 2022-09-01 23:55:31
Description: 
'''
from apps.system.models import MenuButton
from apps.system.serializers.menuButtonSerializer import MenuButtonSerializer
from backend.utils.viewSet import CustomModelViewSet


class MenuButtonViewSet(CustomModelViewSet):
    """
    菜单按钮接口
    list:查询
    create:新增
    update:修改
    retrieve:单例
    destroy:删除
    """
    queryset = MenuButton.objects.all()
    serializer_class = MenuButtonSerializer
    extra_filter_backends = []