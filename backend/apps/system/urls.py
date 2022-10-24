'''
Author: yifeng
Date: 2022-08-10 20:56:03
LastEditors: yifeng
LastEditTime: 2022-10-18 19:12:03
Description: 
'''
from django.urls import path
from rest_framework.routers import SimpleRouter
from apps.system.views.deptViews import DeptViewSet
from apps.system.views.menuButtonViews import MenuButtonViewSet
from apps.system.views.menuViews import MenuViewSet
from apps.system.views.roleViews import RoleViewSet
from apps.system.views.userViews import UserViewSet
from apps.system.views.dictionaryViews import DictionaryViewSet
from apps.system.views.systemConfigViews import SystemConfigViewSet
from apps.system.views.fileViews import FileViewSet
from apps.system.views.loginLogViews import LoginLogViewSet
from apps.system.views.operationLogViews import OperationLogViewSet
from apps.system.views.apiWhiteListViews import ApiWhiteListViewSet
from apps.system.views.areaViews import AreaViewSet

# system_router = DefaultRouter()
system_router = SimpleRouter()
system_router.register(r'menu', MenuViewSet)
system_router.register(r'menu_button', MenuButtonViewSet)
system_router.register(r'role', RoleViewSet)
system_router.register(r'dept', DeptViewSet)
system_router.register(r'user', UserViewSet)
system_router.register(r'dictionary', DictionaryViewSet)
system_router.register(r'system_config', SystemConfigViewSet)
system_router.register(r'operation_log', OperationLogViewSet)
system_router.register(r'area', AreaViewSet)
system_router.register(r'file', FileViewSet)
system_router.register(r'api_white_list', ApiWhiteListViewSet)
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
    path('login_log/', LoginLogViewSet.as_view({'get': 'list'})),
    path('login_log/<int:pk>/', LoginLogViewSet.as_view({'get': 'retrieve'})),
    path('dept_lazy_tree/', DeptViewSet.as_view({'get': 'dept_lazy_tree'})),
]
urlpatterns += system_router.urls
