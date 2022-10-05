"""ImageDetect URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path, include, re_path

from . import views
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework_simplejwt.views import (
    TokenRefreshView, )

from apps.system.views.loginViews import ApiLogin, CaptchaView, LoginView, LogoutView
from apps.system.serializers.dictionarySerializer import InitDictionaryViewSet
from apps.system.views.systemConfigViews import InitSettingsViewSet

from backend import settings

# =========== 初始化系统配置 =================
# dispatch.init_system_config()
# dispatch.init_dictionary()
# =========== 初始化系统配置 =================

# =========== swagger api 配置 =================
schema_view = get_schema_view(
    openapi.Info(
        title="系统API说明文档",
        default_version="v1",
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny, ),
    # 登录后才可以访问API文档，登录路径“/apiLogin”
    # permission_classes=(permissions.IsAuthenticated, ),
    # generator_class=CustomOpenAPISchemaGenerator,
)
# =========== swagger api 配置 =================

urlpatterns = (
    [   
        # path('admin/', admin.site.urls),
        re_path(
            r"^swagger(?P<format>\.json|\.yaml)$",
            schema_view.without_ui(cache_timeout=0),
            name="schema-json",
        ),
        path(
            "",
            schema_view.with_ui("swagger", cache_timeout=0),
            name="schema-swagger-ui",
        ),
        path(
            r"docs/",
            schema_view.with_ui("redoc", cache_timeout=0),
            name="schema-redoc",
        ),
        path("api/system/", include("apps.system.urls")),
        path("api/login/", LoginView.as_view(), name="token_obtain_pair"),
        path("api/logout/", LogoutView.as_view(), name="token_obtain_pair"),
        path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

        re_path(r"^api-auth/", include("rest_framework.urls", namespace="rest_framework")),
        path("api/captcha/", CaptchaView.as_view()),
        path("apiLogin/", ApiLogin.as_view()),
        path("api/init/dictionary/", InitDictionaryViewSet.as_view()),
        path("api/init/settings/", InitSettingsViewSet.as_view()),

        path('welcome/', views.welcome),
        path('api/showImage', views.showImage),  # demo add
    ]
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    + static(settings.STATIC_URL, document_root=settings.STATIC_URL)
)
