'''
Author: yifeng
Date: 2022-08-28 16:27:28
LastEditors: yifeng
LastEditTime: 2022-09-02 19:21:46
Description: 
'''
# Note: const data for system models and system init data

# 初始化需要执行的列表，用来初始化后执行
INITIALIZE_LIST = []
INITIALIZE_RESET_LIST = []
# 系统配置
SYSTEM_CONFIG = {}
# 字典配置
DICTIONARY_CONFIG = {}


# 用户表
# 性别
GENDER_CHOICES = (
    (0, "未知"),
    (1, "男"),
    (2, "女"),
)
# 用户类型
USER_TYPE = (
        (0, "后台用户"),
        (1, "前台用户"),
    )
# 头像地址
AVATAR_URL = '/media/default/avatar.png'

MENU_TYPE_CHOICES = (('0', '目录'), ('1', '菜单'), ('2', '接口'))

ORGANIZATION_TYPE_CHOICES = (('0', '公司'), ('1', '部门'))

# 角色表
# 数据权限
DATA_TYPE_CHOICES = (('0', '全部'), ('5', '自定义'), ('1', '同级及以下'), ('2', '本级及以下'),
                     ('3', '本级'), ('4', '仅本人'))

DATASCOPE_CHOICES = (
        (0, "仅本人数据权限"),
        (1, "本部门及以下数据权限"),
        (2, "本部门数据权限"),
        (3, "全部数据权限"),
        (4, "自定数据权限"),)

# 职位/岗位表
# 岗位状态
STATUS_CHOICES = (
    (0, "离职"),
    (1, "在职"),
)

# 菜单表
# 是否外链
ISLINK_CHOICES = (
        (False, "否"),
        (True, "是"),
    )

# 菜单按钮表
# 接口请求方法
METHOD_CHOICES = (
        (0, "GET"),
        (1, "POST"),
        (2, "PUT"),
        (3, "DELETE"),
    )

# 字典表
# 数据值类型
TYPE_LIST = (
        (0, "text"),
        (1, "number"),
        (2, "date"),
        (3, "datetime"),
        (4, "time"),
        (5, "files"),
        (6, "boolean"),
        (7, "images"),
    )

# 系统配置表
# 表单类型
FORM_ITEM_TYPE_LIST = (
        (0, "text"),
        (1, "datetime"),
        (2, "date"),
        (3, "textarea"),
        (4, "select"),
        (5, "checkbox"),
        (6, "radio"),
        (7, "img"),
        (8, "file"),
        (9, "switch"),
        (10, "number"),
        (11, "array"),
        (12, "imgs"),
        (13, "foreignkey"),
        (14, "manytomany"),
        (15, "time"),
    )