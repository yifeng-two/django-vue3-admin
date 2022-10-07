'''
Author: yifeng
Date: 2022-10-07 18:51:31
LastEditors: yifeng
LastEditTime: 2022-10-07 18:52:38
Description: 
'''

from apps.system.models import OperationLog
from apps.system.serializers.customModelSerializer import CustomModelSerializer


class OperationLogSerializer(CustomModelSerializer):
    """
    日志-序列化器
    """

    class Meta:
        model = OperationLog
        fields = "__all__"
        read_only_fields = ["id"]


class OperationLogCreateUpdateSerializer(CustomModelSerializer):
    """
    操作日志  创建/更新时的列化器
    """

    class Meta:
        model = OperationLog
        fields = '__all__'
