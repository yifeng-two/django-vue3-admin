'''
Author: yifeng
Date: 2022-08-28 19:28:38
LastEditors: yifeng
LastEditTime: 2022-09-27 19:53:10
Description: 
'''
from apps.system.models import Dept
from apps.system.serializers.deptSerializer import DeptCreateUpdateSerializer, DeptSerializer
from backend.utils.viewSet import CustomModelViewSet
from backend.utils.jsonResponse import DetailResponse, SuccessResponse


class DeptViewSet(CustomModelViewSet):
    """
    部门管理接口
    list:查询
    create:新增
    update:修改
    retrieve:单例
    destroy:删除
    """
    queryset = Dept.objects.all()
    serializer_class = DeptSerializer
    create_serializer_class = DeptCreateUpdateSerializer
    update_serializer_class = DeptCreateUpdateSerializer
    filter_fields = ['name', 'id', 'parent']
    search_fields = []

    # extra_filter_backends = []

    def list(self, request, *args, **kwargs):
        # 如果懒加载，则只返回父级
        queryset = self.filter_queryset(self.get_queryset())
        lazy = self.request.query_params.get('lazy')
        parent = self.request.query_params.get('parent')
        if lazy:
            # 如果懒加载模式，返回全部
            if not parent:
                if self.request.user.is_superuser:
                    queryset = queryset.filter(parent__isnull=True)
                else:
                    queryset = queryset.filter(id=self.request.user.dept_id)
            serializer = self.get_serializer(queryset, many=True, request=request)
            return SuccessResponse(data=serializer.data, msg="获取成功")

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, request=request)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True, request=request)
        return SuccessResponse(data=serializer.data, msg="获取成功")

    def dept_lazy_tree(self, request, *args, **kwargs):
        parent = self.request.query_params.get('parent')
        queryset = self.filter_queryset(self.get_queryset())
        if not parent:
            if self.request.user.is_superuser:
                queryset = queryset.filter(parent__isnull=True)
            else:
                queryset = queryset.filter(id=self.request.user.dept_id)
        data = queryset.filter(status=True).order_by('sort').values('name', 'id', 'parent')
        return DetailResponse(data=data, msg="获取成功")
