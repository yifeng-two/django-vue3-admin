# 初始化
import os

import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from apps.system.serializers.userSerializer import UserInitSerializer
from apps.system.serializers.menuSerializer import MenuInitSerializer
from apps.system.serializers.roleSerializer import RoleInitSerializer
from apps.system.serializers.deptSerializer import DeptInitSerializer
from apps.system.serializers.dictionarySerializer import DictionaryInitSerializer
from apps.system.serializers.systemConfigSerializer import SystemConfigInitSerializer
# from system.views.api_white_list import ApiWhiteListInitSerializer
from backend.utils.coreInitialize import CoreInitialize


class Initialize(CoreInitialize):
    def init_dept(self):
        """
        初始化部门信息
        """
        self.init_base(DeptInitSerializer, unique_fields=['name', 'parent'])

    def init_role(self):
        """
        初始化角色信息
        """
        self.init_base(RoleInitSerializer, unique_fields=['key'])

    def init_user(self):
        """
        初始化用户信息
        """
        self.init_base(UserInitSerializer, unique_fields=['username'])

    def init_menu(self):
        """
        初始化菜单信息
        """
        self.init_base(MenuInitSerializer,
                       unique_fields=['name', 'web_path', 'component', 'component_name'])

    # def init_api_white_list(self):
    #     """
    #     初始API白名单
    #     """
    #     self.init_base(ApiWhiteListInitSerializer, unique_fields=['url', 'method', ])

    def init_dictionary(self):
        """
        初始化字典表
        """
        self.init_base(DictionaryInitSerializer, unique_fields=[
            'value',
            'parent',
        ])

    def init_system_config(self):
        """
        初始化系统配置表
        """
        self.init_base(SystemConfigInitSerializer, unique_fields=[
            'key',
            'parent',
        ])

    def run(self):
        self.init_dept()
        self.init_role()
        self.init_user()
        self.init_menu()
        # self.init_api_white_list()
        self.init_system_config()
        self.init_dictionary()
        # self.init_system_config()


if __name__ == "__main__":
    Initialize(app='apps.system').run()
