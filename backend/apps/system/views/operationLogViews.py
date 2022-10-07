'''
Author: yifeng
Date: 2022-10-07 18:53:25
LastEditors: yifeng
LastEditTime: 2022-10-07 18:53:26
Description: 
'''
from apps.system.models import OperationLog
from apps.system.serializers.operationLogSerializer import OperationLogSerializer
from backend.utils.viewSet import CustomModelViewSet


class OperationLogViewSet(CustomModelViewSet):
    """
    操作日志接口
    list:查询
    create:新增
    update:修改
    retrieve:单例
    destroy:删除
    """
    queryset = OperationLog.objects.order_by('-create_datetime')
    serializer_class = OperationLogSerializer
    # permission_classes = []