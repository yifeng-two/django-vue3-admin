'''
Author: yifeng
Date: 2022-10-07 18:29:06
LastEditors: yifeng
LastEditTime: 2022-10-07 18:36:43
Description: 
'''
from apps.system.models import LoginLog
from apps.system.serializers.loginLogSerializer import LoginLogSerializer
from backend.utils.viewSet import CustomModelViewSet




class LoginLogViewSet(CustomModelViewSet):
    """
    登录日志接口
    list:查询
    create:新增
    update:修改
    retrieve:单例
    destroy:删除
    """
    queryset = LoginLog.objects.all()
    serializer_class = LoginLogSerializer
    extra_filter_backends = []