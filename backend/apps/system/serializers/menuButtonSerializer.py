'''
Author: yifeng
Date: 2022-08-28 19:25:51
LastEditors: yifeng
LastEditTime: 2022-09-01 23:54:51
Description: 
'''
from apps.system.models import MenuButton
from apps.system.serializers.customModelSerializer import CustomModelSerializer


class MenuButtonSerializer(CustomModelSerializer):
    """
    菜单按钮-序列化器
    """

    class Meta:
        model = MenuButton
        fields = "__all__"
        read_only_fields = ["id"]
