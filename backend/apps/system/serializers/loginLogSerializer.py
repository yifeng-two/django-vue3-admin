'''
Author: yifeng
Date: 2022-10-07 18:35:43
LastEditors: yifeng
LastEditTime: 2022-10-07 18:36:52
Description: 
'''

from apps.system.models import LoginLog
from apps.system.serializers.customModelSerializer import CustomModelSerializer


class LoginLogSerializer(CustomModelSerializer):
    """
    登录日志权限-序列化器
    """
    class Meta:
        model = LoginLog
        fields = "__all__"
        read_only_fields = ["id"]
