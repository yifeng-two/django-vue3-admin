'''
Author: yifeng
Date: 2022-10-02 12:28:15
LastEditors: yifeng
LastEditTime: 2022-10-02 12:30:20
Description: 
'''
from apps.system.models import FileList
from apps.system.serializers.fileSerializer import FileSerializer
from backend.utils.viewSet import CustomModelViewSet


class FileViewSet(CustomModelViewSet):
    """
    文件管理接口
    list:查询
    create:新增
    update:修改
    retrieve:单例
    destroy:删除
    """
    queryset = FileList.objects.all()
    serializer_class = FileSerializer
    filter_fields = ['name', ]
    permission_classes = []