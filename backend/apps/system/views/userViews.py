'''
Author: yifeng
Date: 2022-08-28 18:55:45
LastEditors: yifeng
LastEditTime: 2022-10-02 09:46:47
Description: 
'''
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import action

from apps.system.models import User, Role, Dept
from apps.system.serializers.userSerializer import (UserSerializer, UserCreateSerializer,
                                                    UserUpdateSerializer,
                                                    ExportUserProfileSerializer,
                                                    UserProfileImportSerializer)
from backend.utils.viewSet import CustomModelViewSet
from backend.utils.jsonResponse import ErrorResponse, DetailResponse
from apps.system.config import dispatch


class UserViewSet(CustomModelViewSet):
    """
    用户接口
    list:查询
    create:新增
    update:修改
    retrieve:单例
    destroy:删除
    """

    queryset = User.objects.exclude(is_superuser=1).all()
    serializer_class = UserSerializer
    create_serializer_class = UserCreateSerializer
    update_serializer_class = UserUpdateSerializer
    # filter_fields = ["name", "username", "gender", "is_active", "dept", "user_type"]
    filter_fields = {
        "name": ["icontains"],
        "username": ["exact"],
        "gender": ["icontains"],
        "is_active": ["icontains"],
        "dept": ["exact"],
        "user_type": ["exact"],
    }
    search_fields = ["username", "name", "gender", "dept__name", "role__name"]
    # 导出
    export_field_label = [
        "用户账号",
        "用户名称",
        "用户邮箱",
        "手机号码",
        "用户性别",
        "帐号状态",
        "最后登录时间",
        "部门名称",
        "部门负责人",
    ]
    export_serializer_class = ExportUserProfileSerializer
    # 导入
    import_serializer_class = UserProfileImportSerializer
    import_field_dict = {
        "username": "登录账号",
        "name": "用户名称",
        "email": "用户邮箱",
        "mobile": "手机号码",
        "gender": {
            "title": "用户性别",
            "choices": {
                "data": {
                    "未知": 2,
                    "男": 1,
                    "女": 0
                },
            }
        },
        "is_active": {
            "title": "帐号状态",
            "choices": {
                "data": {
                    "启用": True,
                    "禁用": False
                },
            }
        },
        "password": "登录密码",
        "dept": {
            "title": "部门",
            "choices": {
                "queryset": Dept.objects.filter(status=True),
                "values_name": "name"
            }
        },
        "role": {
            "title": "角色",
            "choices": {
                "queryset": Role.objects.filter(status=True),
                "values_name": "name"
            }
        },
    }

    @action(methods=["GET"], detail=False, permission_classes=[IsAuthenticated])
    def user_info(self, request):
        """获取当前用户信息"""
        user = request.user
        result = {
            "name": user.name,
            "mobile": user.mobile,
            "gender": user.gender,
            "email": user.email,
            "avatar": user.avatar,
        }
        return DetailResponse(data=result, msg="获取成功")

    @action(methods=["PUT"], detail=False, permission_classes=[IsAuthenticated])
    def update_user_info(self, request):
        """修改当前用户信息"""
        user = request.user
        User.objects.filter(id=user.id).update(**request.data)
        return DetailResponse(data=None, msg="修改成功")

    @action(methods=["PUT"], detail=True, permission_classes=[IsAuthenticated])
    def change_password(self, request, *args, **kwargs):
        """密码修改"""
        instance = User.objects.filter(id=kwargs.get("pk")).first()
        data = request.data
        old_pwd = data.get("oldPwd")
        new_pwd = data.get("newPwd")
        new_pwd2 = data.get("newPwd2")
        if instance:
            if new_pwd != new_pwd2:
                return ErrorResponse(msg="两次密码不匹配")
            elif instance.check_password(old_pwd):
                instance.password = make_password(new_pwd)
                instance.save()
                return DetailResponse(data=None, msg="修改成功")
            else:
                return ErrorResponse(msg="旧密码不正确")
        else:
            return ErrorResponse(msg="未获取到用户")

    @action(methods=["PUT"], detail=True, permission_classes=[IsAuthenticated])
    def reset_to_default_password(self, request, *args, **kwargs):
        """恢复默认密码"""
        instance = User.objects.filter(id=kwargs.get("pk")).first()
        if instance:
            instance.set_password(dispatch.get_system_config_values("base.default_password"))
            instance.save()
            return DetailResponse(data=None, msg="密码重置成功")
        else:
            return ErrorResponse(msg="未获取到用户")

    @action(methods=["PUT"], detail=True)
    def reset_password(self, request, pk):
        """
        密码重置
        """
        instance = User.objects.filter(id=pk).first()
        data = request.data
        new_pwd = data.get("newPassword")
        new_pwd2 = data.get("newPassword2")
        if instance:
            if new_pwd != new_pwd2:
                return ErrorResponse(msg="两次密码不匹配")
            else:
                instance.password = make_password(new_pwd)
                instance.save()
                return DetailResponse(data=None, msg="修改成功")
        else:
            return ErrorResponse(msg="未获取到用户")


if __name__ == '__main__':
    pass