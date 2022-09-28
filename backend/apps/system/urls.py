'''
Author: yifeng
Date: 2022-08-10 20:56:03
LastEditors: yifeng
LastEditTime: 2022-09-26 22:55:21
Description: 
'''
from django.urls import path, include
from rest_framework.routers import DefaultRouter, SimpleRouter
from apps.system.views.deptViews import DeptViewSet
from apps.system.views.menuButtonViews import MenuButtonViewSet
from apps.system.views.menuViews import MenuViewSet
from apps.system.views.roleViews import RoleViewSet
from apps.system.views.userViews import UserViewSet
from apps.system.views.dictionaryViews import DictionaryViewSet
from apps.system.views.systemConfigViews import SystemConfigViewSet

# system_router = DefaultRouter()
system_router = SimpleRouter()
system_router.register(r'menu', MenuViewSet)
system_router.register(r'menu_button', MenuButtonViewSet)
system_router.register(r'role', RoleViewSet)
system_router.register(r'dept', DeptViewSet)
system_router.register(r'user', UserViewSet)
system_router.register(r'dictionary', DictionaryViewSet)
system_router.register(r'system_config', SystemConfigViewSet)
# system_router.register(r'operation_log', OperationLogViewSet)
# system_router.register(r'area', AreaViewSet)
# system_router.register(r'file', FileViewSet)
# system_router.register(r'api_white_list', ApiWhiteListViewSet)
# system_router.register(r'message_center',MessageCenterViewSet)

urlpatterns = [
    # path('admin/', admin.site.urls),
    # path('', include(system_router.urls)),
    path('system_config/save_content/', SystemConfigViewSet.as_view({'put': 'save_content'})),
    path('system_config/get_association_table/',
         SystemConfigViewSet.as_view({'get': 'get_association_table'})),
    path('system_config/get_table_data/<int:pk>/',
         SystemConfigViewSet.as_view({'get': 'get_table_data'})),
    path('system_config/get_relation_info/',
         SystemConfigViewSet.as_view({'get': 'get_relation_info'})),
    path('dept_lazy_tree/', DeptViewSet.as_view({'get': 'dept_lazy_tree'})),
]
urlpatterns += system_router.urls
