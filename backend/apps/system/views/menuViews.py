'''
Author: yifeng
Date: 2022-08-28 19:26:59
LastEditors: yifeng
LastEditTime: 2022-10-06 21:23:45
Description: 
'''
from rest_framework.decorators import action

from apps.system.models import Menu
from apps.system.serializers.menuSerializer import (MenuCreateSerializer, MenuSerializer,
                                                    WebRouterSerializer)
from backend.utils.viewSet import CustomModelViewSet
from backend.utils.jsonResponse import SuccessResponse


class MenuViewSet(CustomModelViewSet):
    """
    菜单管理接口
    list:查询
    create:新增
    update:修改
    retrieve:单例
    destroy:删除
    """
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    create_serializer_class = MenuCreateSerializer
    update_serializer_class = MenuCreateSerializer
    search_fields = ['name', 'status']
    filter_fields = ['parent', 'name', 'status', 'is_link', 'visible', 'cache', 'is_catalog']
    # extra_filter_backends = []

    @action(methods=['GET'], detail=False, permission_classes=[])
    def web_router(self, request):
        """用于前端获取当前角色的路由"""
        user = request.user
        queryset = self.queryset.filter(status=1)
        if not user.is_superuser:
            menuIds = user.roles.values_list('menu__id', flat=True)
            queryset = Menu.objects.filter(id__in=menuIds, status=1)
        serializer = WebRouterSerializer(queryset, many=True, request=request)
        data = serializer.data
        return SuccessResponse(data=data, total=len(data), msg="获取成功")