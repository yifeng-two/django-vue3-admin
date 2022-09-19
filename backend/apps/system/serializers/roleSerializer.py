'''
Author: yifeng
Date: 2022-08-28 18:55:45
LastEditors: yifeng
LastEditTime: 2022-09-05 21:16:02
Description: 
'''
from rest_framework import serializers

from apps.system.models import Role, Menu
from apps.system.serializers.deptSerializer import DeptSerializer
from apps.system.serializers.menuSerializer import MenuSerializer
from apps.system.serializers.menuButtonSerializer import MenuButtonSerializer
from apps.system.serializers.customModelSerializer import CustomModelSerializer
from backend.utils.validator import CustomUniqueValidator


class RoleSerializer(CustomModelSerializer):
    """
    角色-序列化器
    """
    class Meta:
        model = Role
        fields = "__all__"
        read_only_fields = ["id"]


class RoleInitSerializer(CustomModelSerializer):
    """
    初始化获取数信息(用于生成初始化json文件)
    """
    class Meta:
        model = Role
        fields = [
            'name', 'key', 'sort', 'status', 'admin', 'data_range', 'remark', 'creator',
            'dept_belong_id'
        ]
        read_only_fields = ["id"]
        extra_kwargs = {'creator': {'write_only': True}, 'dept_belong_id': {'write_only': True}}


class RoleCreateUpdateSerializer(CustomModelSerializer):
    """
    角色管理 创建/更新时的列化器
    """
    menu = MenuSerializer(many=True, read_only=True)
    dept = DeptSerializer(many=True, read_only=True)
    permission = MenuButtonSerializer(many=True, read_only=True)
    key = serializers.CharField(
        max_length=50,
        validators=[CustomUniqueValidator(queryset=Role.objects.all(), message="权限字符必须唯一")])
    name = serializers.CharField(max_length=50,
                                 validators=[CustomUniqueValidator(queryset=Role.objects.all())])

    def validate(self, attrs: dict):
        return super().validate(attrs)

    def save(self, **kwargs):
        data = super().save(**kwargs)
        data.dept.set(self.initial_data.get('dept', []))
        data.menu.set(self.initial_data.get('menu', []))
        data.permission.set(self.initial_data.get('permission', []))
        return data

    class Meta:
        model = Role
        fields = '__all__'


class MenuPermissonSerializer(CustomModelSerializer):
    """
    菜单的按钮权限
    """
    menuPermission = MenuButtonSerializer(many=True, read_only=True)

    class Meta:
        model = Menu
        fields = '__all__'
