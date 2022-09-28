'''
Author: yifeng
Date: 2022-08-28 18:55:45
LastEditors: yifeng
LastEditTime: 2022-09-20 20:07:11
Description: 
'''
import hashlib
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from django_restql.fields import DynamicSerializerMethodField

from apps.system.models import User
from apps.system.serializers.roleSerializer import RoleSerializer
from apps.system.serializers.customModelSerializer import CustomModelSerializer
from backend.utils.validator import CustomUniqueValidator


class UserInitSerializer(CustomModelSerializer):
    """
    初始化获取数信息(用于生成初始化json文件)
    """
    class Meta:
        model = User
        fields = [
            "username", "email", 'mobile', 'avatar', "name", 'gender', 'user_type', "dept",
            'user_type', 'first_name', 'last_name', 'email', 'is_staff', 'is_active', 'creator',
            'dept_belong_id', 'password', 'last_login', 'is_superuser'
        ]
        read_only_fields = ['id']
        extra_kwargs = {'creator': {'write_only': True}, 'dept_belong_id': {'write_only': True}}


class UserSerializer(CustomModelSerializer):
    """
    用户管理-序列化器
    """
    dept_name = serializers.CharField(source='dept.name', read_only=True)
    role_info = DynamicSerializerMethodField()

    class Meta:
        model = User
        read_only_fields = ["id"]
        exclude = ["password"]
        extra_kwargs = {
            "post": {
                "required": False
            },
        }

    def get_role_info(self, instance, parsed_query):
        roles = instance.roles.all()
        # You can do what ever you want in here
        # `parsed_query` param is passed to BookSerializer to allow further querying
        serializer = RoleSerializer(roles, many=True, parsed_query=parsed_query)
        return serializer.data


class UserCreateSerializer(CustomModelSerializer):
    """
    用户新增-序列化器
    """
    username = serializers.CharField(
        max_length=50,
        validators=[CustomUniqueValidator(queryset=User.objects.all(), message="账号必须唯一")],
    )
    password = serializers.CharField(required=False, )

    def validate_password(self, value):
        """
        对密码进行验证
        """
        password = self.initial_data.get("password")
        if password:
            return make_password(value)
        return value

    def save(self, **kwargs):
        data = super().save(**kwargs)
        data.dept_belong_id = data.dept_id
        data.save()
        data.position.set(self.initial_data.get("post", []))
        return data

    class Meta:
        model = User
        fields = "__all__"
        read_only_fields = ["id"]
        extra_kwargs = {
            "post": {
                "required": False
            },
        }


class UserUpdateSerializer(CustomModelSerializer):
    """
    用户修改-序列化器
    """

    username = serializers.CharField(
        max_length=50,
        validators=[CustomUniqueValidator(queryset=User.objects.all(), message="账号必须唯一")],
    )
    # password = serializers.CharField(required=False, allow_blank=True)
    mobile = serializers.CharField(
        max_length=50,
        validators=[CustomUniqueValidator(queryset=User.objects.all(), message="手机号必须唯一")],
        allow_blank=True)

    def save(self, **kwargs):
        data = super().save(**kwargs)
        data.dept_belong_id = data.dept_id
        data.save()
        data.post.set(self.initial_data.get("post", []))
        return data

    class Meta:
        model = User
        read_only_fields = ["id", "password"]
        fields = "__all__"
        extra_kwargs = {
            "post": {
                "required": False,
                "read_only": True
            },
        }


class ExportUserProfileSerializer(CustomModelSerializer):
    """
    用户导出 序列化器
    """

    last_login = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",
                                           required=False,
                                           read_only=True)
    is_active = serializers.SerializerMethodField(read_only=True)
    dept_name = serializers.CharField(source="dept.name", default="")
    dept_owner = serializers.CharField(source="dept.owner", default="")
    gender = serializers.CharField(source="get_gender_display", read_only=True)

    def get_is_active(self, instance):
        return "启用" if instance.is_active else "停用"

    class Meta:
        model = User
        fields = (
            "username",
            "name",
            "email",
            "mobile",
            "gender",
            "is_active",
            "last_login",
            "dept_name",
            "dept_owner",
        )


class UserProfileImportSerializer(CustomModelSerializer):
    def save(self, **kwargs):
        data = super().save(**kwargs)
        password = hashlib.new("md5",
                               str(self.initial_data.get("password",
                                                         "")).encode(encoding="UTF-8")).hexdigest()
        data.set_password(password)
        data.save()
        return data

    class Meta:
        model = User
        exclude = (
            "password",
            "post",
            "user_permissions",
            "groups",
            "is_superuser",
            "date_joined",
        )
