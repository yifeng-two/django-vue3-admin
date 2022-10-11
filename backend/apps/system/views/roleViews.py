'''
Author: yifeng
Date: 2022-09-01 23:58:14
LastEditors: yifeng
LastEditTime: 2022-10-10 20:17:42
Description: 
'''
from rest_framework.decorators import action

from apps.system.models import Role, Menu
from apps.system.serializers.roleSerializer import (RoleCreateUpdateSerializer, RoleSerializer,
                                                    MenuPermissonSerializer)
from backend.utils.viewSet import CustomModelViewSet
from backend.utils.jsonResponse import SuccessResponse


class RoleViewSet(CustomModelViewSet):
    """
    角色管理接口
    list:查询
    create:新增
    update:修改
    retrieve:单例
    destroy:删除
    """
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    create_serializer_class = RoleCreateUpdateSerializer
    update_serializer_class = RoleCreateUpdateSerializer

    @action(methods=['GET'], detail=True, permission_classes=[])
    def roleId_get_menu(self, request, *args, **kwargs):
        """通过角色id获取该角色用于的菜单"""
        # instance = self.get_object()
        # queryset = instance.menu.all()
        queryset = Menu.objects.filter(status=1).all()
        serializer = MenuPermissonSerializer(queryset, many=True)
        return SuccessResponse(data=serializer.data)
