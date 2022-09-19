'''
Author: yifeng
Date: 2022-08-31 19:29:10
LastEditors: yifeng
LastEditTime: 2022-09-02 19:33:51
Description: 
'''
import django_filters
from django_filters.rest_framework import BooleanFilter
from rest_framework import serializers

from apps.system.models import SystemConfig
from apps.system.serializers.customModelSerializer import CustomModelSerializer
from backend.utils.validator import CustomValidationError


class SystemConfigCreateSerializer(CustomModelSerializer):
    """
    系统配置-新增时使用-序列化器
    """
    form_item_type_label = serializers.CharField(source='get_form_item_type_display',
                                                 read_only=True)

    class Meta:
        model = SystemConfig
        fields = "__all__"
        read_only_fields = ["id"]

    def validate_key(self, value):
        """
        验证key是否允许重复
        parent为空时不允许重复,反之允许
        """
        instance = SystemConfig.objects.filter(key=value, parent__isnull=True).exists()
        if instance:
            raise CustomValidationError('已存在相同变量名')
        return value


class SystemConfigInitSerializer(CustomModelSerializer):
    """
    初始化获取数信息(用于生成初始化json文件)
    """
    children = serializers.SerializerMethodField()

    def get_children(self, obj: SystemConfig):
        data = []
        instance = SystemConfig.objects.filter(parent_id=obj.id)
        if instance:
            serializer = SystemConfigInitSerializer(instance=instance, many=True)
            data = serializer.data
        return data

    def save(self, **kwargs):
        instance = super().save(**kwargs)
        children = self.initial_data.get('children')
        # 菜单表
        if children:
            for data in children:
                data['parent'] = instance.id
                filter_data = {"key": data['key'], "parent": data['parent']}
                instance_obj = SystemConfig.objects.filter(**filter_data).first()
                if instance_obj and not self.initial_data.get('reset'):
                    continue
                serializer = SystemConfigInitSerializer(instance_obj,
                                                        data=data,
                                                        request=self.request)
                serializer.is_valid(raise_exception=True)
                serializer.save()
        return instance

    class Meta:
        model = SystemConfig
        fields = [
            'parent', 'title', 'key', 'value', 'sort', 'status', 'data_options', 'form_item_type',
            'rule', 'placeholder', 'setting', 'creator', 'dept_belong_id', 'children'
        ]
        read_only_fields = ["id"]
        extra_kwargs = {'creator': {'write_only': True}, 'dept_belong_id': {'write_only': True}}


class SystemConfigSerializer(CustomModelSerializer):
    """
    系统配置-序列化器
    """
    form_item_type_label = serializers.CharField(source='get_form_item_type_display',
                                                 read_only=True)

    class Meta:
        model = SystemConfig
        fields = "__all__"
        read_only_fields = ["id"]


class SystemConfigChinldernSerializer(CustomModelSerializer):
    """
    系统配置子级-序列化器
    """
    chinldern = serializers.SerializerMethodField()
    form_item_type_label = serializers.CharField(source='get_form_item_type_display',
                                                 read_only=True)

    def get_chinldern(self, instance):
        queryset = SystemConfig.objects.filter(parent=instance)
        if queryset:
            serializer = SystemConfigSerializer(queryset, many=True)
            return serializer.data
        return None

    class Meta:
        model = SystemConfig
        fields = "__all__"
        read_only_fields = ["id"]


class SystemConfigListSerializer(CustomModelSerializer):
    """
    系统配置下模块的保存-序列化器
    """
    def update(self, instance, validated_data):
        instance_mapping = {obj.id: obj for obj in instance}
        data_mapping = {item['id']: item for item in validated_data}
        for obj_id, data in data_mapping.items():
            instance_obj = instance_mapping.get(obj_id, None)
            if instance_obj is None:
                return SystemConfig.objects.create(**data)
            else:
                return instance_obj.objects.update(**data)

    class Meta:
        model = SystemConfig
        fields = "__all__"
        read_only_fields = ["id"]


class SystemConfigSaveSerializer(serializers.Serializer):
    class Meta:
        read_only_fields = ["id"]
        list_serializer_class = SystemConfigListSerializer


class SystemConfigFilter(django_filters.rest_framework.FilterSet):
    """
    过滤器
    """
    parent__isnull = BooleanFilter(field_name='parent', lookup_expr="isnull")

    class Meta:
        model = SystemConfig
        fields = ['id', 'parent', 'status', 'parent__isnull']
