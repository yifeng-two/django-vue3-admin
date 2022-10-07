'''
Author: yifeng
Date: 2022-10-07 20:03:13
LastEditors: yifeng
LastEditTime: 2022-10-07 20:49:19
Description: 
'''

import os
# from backend.settings import BASE_DIR

# ================================================= #
# *************** mysql数据库 配置  *************** #
# ================================================= #
# 数据库 ENGINE ，默认演示使用 sqlite3 数据库，正式环境建议使用 mysql 数据库
# sqlite3 设置
# DATABASE_ENGINE = 'django.db.backends.mysql'
# DATABASE_NAME = 'dvamin',

# 使用mysql时，改为此配置
DATABASE_ENGINE = "django.db.backends.mysql"
DATABASE_NAME = 'detect'  # mysql 时使用

# 数据库地址 改为自己数据库地址
DATABASE_HOST = "127.0.0.1"
# # 数据库端口
DATABASE_PORT = '3306'
# # 数据库用户名
DATABASE_USER = "root"
# # 数据库密码
DATABASE_PASSWORD = "123456"

# 表前缀
# TABLE_PREFIX = "dvadmin_"
# ================================================= #
# ******** redis配置，无redis 可不进行配置  ******** #
# ================================================= #
# REDIS_PASSWORD = ''
# REDIS_HOST = '127.0.0.1'
# REDIS_URL = f'redis://:{REDIS_PASSWORD or ""}@{REDIS_HOST}:6380'

# ================================================= #
# ****************** 功能 启停  ******************* #
# ================================================= #
DEBUG = True
# 启动登录详细概略获取(通过调用api获取ip详细地址。如果是内网，关闭即可)
ENABLE_LOGIN_ANALYSIS_LOG = True

# 启动登录访问日志
LOGIN_LOG_ENABLE = False
# 登录接口 /api/token/ 是否需要验证码认证，用于测试，正式环境建议取消
LOGIN_NO_CAPTCHA_AUTH = True
# 启动接口访问日志
API_LOG_ENABLE = False
# API_LOG_METHODS = 'ALL' # ['POST', 'DELETE']
API_LOG_METHODS = ["POST", "UPDATE", "DELETE", "PUT"]  # ['POST', 'DELETE']
API_MODEL_MAP = {
    "/token/": "登录模块",
    "/api/login/": "登录模块",
    "/api/plugins_market/plugins/": "插件市场",
}


# ================================================= #
# ****************** 其他 配置  ******************* #
# ================================================= #

ALLOWED_HOSTS = ["*"]

# daphne启动命令
#daphne application.asgi:application -b 0.0.0.0 -p 8000
