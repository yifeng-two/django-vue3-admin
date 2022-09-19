import hashlib
from django.db import models
from django.contrib.auth.models import AbstractUser
from backend.utils.softModel import SoftModel
from apps.system.config import cfg, dispatch

# import os,django
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ImageDetect.settings')
# django.setup()


class Dept(SoftModel):
    """
    组织架构
    """
    name = models.CharField(max_length=64, verbose_name="部门名称", help_text="部门名称")
    sort = models.IntegerField(default=1, verbose_name="显示排序", help_text="显示排序")
    owner = models.CharField(max_length=32,
                             verbose_name="负责人",
                             null=True,
                             blank=True,
                             help_text="负责人")
    phone = models.CharField(max_length=32,
                             verbose_name="联系电话",
                             null=True,
                             blank=True,
                             help_text="联系电话")
    email = models.EmailField(max_length=32,
                              verbose_name="邮箱",
                              null=True,
                              blank=True,
                              help_text="邮箱")
    status = models.BooleanField(default=True,
                                 verbose_name="部门状态",
                                 null=True,
                                 blank=True,
                                 help_text="部门状态")
    parent = models.ForeignKey(
        to="Dept",
        on_delete=models.CASCADE,
        default=None,
        verbose_name="上级部门",
        db_constraint=False,
        null=True,
        blank=True,
        help_text="上级部门",
    )

    class Meta:
        db_table = "system_dept"
        verbose_name = "部门表"
        verbose_name_plural = verbose_name
        ordering = ("sort", )

    def __str__(self):
        return self.name


class Postion(SoftModel):
    """
    职位/岗位
    """
    name = models.CharField(null=False, max_length=64, verbose_name="岗位名称", help_text="岗位名称")
    code = models.CharField(max_length=32, verbose_name="岗位编码", help_text="岗位编码")
    sort = models.IntegerField(default=1, verbose_name="岗位顺序", help_text="岗位顺序")

    status = models.IntegerField(choices=cfg.STATUS_CHOICES,
                                 default=1,
                                 verbose_name="岗位状态",
                                 help_text="岗位状态")

    class Meta:
        db_table = "system_postion"
        verbose_name = "岗位表"
        verbose_name_plural = verbose_name
        ordering = ("sort", )

    def __str__(self):
        return self.name


class Role(SoftModel):
    """
    角色
    """
    name = models.CharField(max_length=64, verbose_name="角色名称", help_text="角色名称")
    key = models.CharField(max_length=64, unique=True, verbose_name="权限字符", help_text="权限字符")
    sort = models.IntegerField(default=1, verbose_name="角色顺序", help_text="角色顺序")
    status = models.BooleanField(default=True, verbose_name="角色状态", help_text="角色状态")
    admin = models.BooleanField(default=False, verbose_name="是否为admin", help_text="是否为admin")
    datas = models.CharField('数据权限', max_length=50, choices=cfg.DATA_TYPE_CHOICES, default='本级及以下')
    dept = models.ManyToManyField(to="Dept",
                                  verbose_name="数据权限-关联部门",
                                  db_constraint=False,
                                  help_text="数据权限-关联部门")
    remark = models.TextField(verbose_name="备注", help_text="备注", null=True, blank=True)
    menu = models.ManyToManyField(to="Menu",
                                  verbose_name="关联菜单",
                                  db_constraint=False,
                                  help_text="关联菜单")
    permission = models.ManyToManyField(to="MenuButton",
                                        verbose_name="关联菜单的接口按钮",
                                        db_constraint=False,
                                        help_text="关联菜单的接口按钮")
    data_range = models.IntegerField(default=0, choices=cfg.DATASCOPE_CHOICES, verbose_name="数据权限范围", help_text="数据权限范围")

    class Meta:
        db_table = "system_role"
        verbose_name = "角色表"
        verbose_name_plural = verbose_name
        ordering = ("sort", )

    def __str__(self):
        return self.name


class User(SoftModel, AbstractUser):
    """
    用户
    """
    username = models.CharField(max_length=150, unique=True, db_index=True, verbose_name="用户账号", help_text="用户账号")
    name = models.CharField(max_length=40, verbose_name="姓名", help_text="姓名")
    mobile = models.CharField(max_length=255, verbose_name="电话", null=True, blank=True, help_text="电话")
    email = models.EmailField(max_length=255,
                              verbose_name="邮箱",
                              null=True,
                              blank=True,
                              help_text="邮箱")
    phone = models.CharField('手机号', max_length=11, null=True, blank=True, unique=True)
    avatar = models.CharField('头像', default=cfg.AVATAR_URL, max_length=100, null=True, blank=True)
    gender = models.IntegerField(choices=cfg.GENDER_CHOICES,
                                 default=0,
                                 verbose_name="性别",
                                 null=True,
                                 blank=True,
                                 help_text="性别")
    user_type = models.IntegerField(choices=cfg.USER_TYPE,
                                    default=0,
                                    verbose_name="用户类型",
                                    null=True,
                                    blank=True,
                                    help_text="用户类型")
    dept = models.ForeignKey(to="Dept",
                             verbose_name="所属部门",
                             on_delete=models.PROTECT,
                             db_constraint=False,
                             null=True,
                             blank=True,
                             help_text="关联部门")
    position = models.ManyToManyField(to="Postion", blank=True, verbose_name='岗位')
    roles = models.ManyToManyField(to="Role", blank=True, verbose_name='角色')

    def set_password(self, raw_password):
        super().set_password(hashlib.md5(raw_password.encode(encoding="UTF-8")).hexdigest())

    class Meta:
        verbose_name = '用户信息'
        verbose_name_plural = verbose_name
        ordering = ['id']

    def __str__(self):
        return self.username


# region
# class Permission(SoftModel):
#     """
#     功能权限:目录,菜单,接口
#     """
#     name = models.CharField('名称', max_length=30)
#     type = models.CharField('类型', max_length=20, choices=cfg.MENU_TYPE_CHOICES, default='接口')
#     is_frame = models.BooleanField('外部链接', default=False)
#     sort = models.IntegerField('排序标记', default=1)
#     parent = models.ForeignKey('self',
#                                null=True,
#                                blank=True,
#                                on_delete=models.SET_NULL,
#                                verbose_name='父')
#     method = models.CharField('方法/代号', max_length=50, null=True, blank=True)

#     def __str__(self):
#         return self.name

#     class Meta:
#         verbose_name = '功能权限表'
#         verbose_name_plural = verbose_name
#         ordering = ['sort']

# endregion


class Menu(SoftModel):
    parent = models.ForeignKey(
        to="Menu",
        on_delete=models.CASCADE,
        verbose_name="上级菜单",
        null=True,
        blank=True,
        db_constraint=False,
        help_text="上级菜单",
    )
    icon = models.CharField(max_length=64,
                            verbose_name="菜单图标",
                            null=True,
                            blank=True,
                            help_text="菜单图标")
    name = models.CharField(max_length=64, verbose_name="菜单名称", help_text="菜单名称")
    sort = models.IntegerField(default=1,
                               verbose_name="显示排序",
                               null=True,
                               blank=True,
                               help_text="显示排序")
    is_link = models.BooleanField(choices=cfg.ISLINK_CHOICES,
                                  default=False,
                                  verbose_name="是否外链",
                                  help_text="是否外链")
    is_catalog = models.BooleanField(default=False, verbose_name="是否目录", help_text="是否目录")
    web_path = models.CharField(max_length=128,
                                verbose_name="路由地址",
                                null=True,
                                blank=True,
                                help_text="路由地址")
    component = models.CharField(max_length=128,
                                 verbose_name="组件地址",
                                 null=True,
                                 blank=True,
                                 help_text="组件地址")
    component_name = models.CharField(max_length=50,
                                      verbose_name="组件名称",
                                      null=True,
                                      blank=True,
                                      help_text="组件名称")
    status = models.BooleanField(default=True, blank=True, verbose_name="菜单状态", help_text="菜单状态")
    cache = models.BooleanField(default=False,
                                blank=True,
                                verbose_name="是否页面缓存",
                                help_text="是否页面缓存")
    visible = models.BooleanField(default=True,
                                  blank=True,
                                  verbose_name="侧边栏中是否显示",
                                  help_text="侧边栏中是否显示")

    class Meta:
        db_table = "system_menu"
        verbose_name = "菜单表"
        verbose_name_plural = verbose_name
        ordering = ("sort", )


class MenuButton(SoftModel):
    menu = models.ForeignKey(
        to="Menu",
        db_constraint=False,
        related_name="menuPermission",
        on_delete=models.CASCADE,
        verbose_name="关联菜单",
        help_text="关联菜单",
    )
    name = models.CharField(max_length=64, verbose_name="名称", help_text="名称")
    value = models.CharField(max_length=64, verbose_name="权限值", help_text="权限值")
    api = models.CharField(max_length=200, verbose_name="接口地址", help_text="接口地址")

    method = models.IntegerField(choices=cfg.METHOD_CHOICES,
                                 default=0,
                                 verbose_name="接口请求方法",
                                 null=True,
                                 blank=True,
                                 help_text="接口请求方法")

    class Meta:
        db_table = "system_menu_button"
        verbose_name = "菜单权限表"
        verbose_name_plural = verbose_name
        ordering = ("-name", )


class Dictionary(SoftModel):
    label = models.CharField(max_length=100,
                             blank=True,
                             null=True,
                             verbose_name="字典名称",
                             help_text="字典名称")
    value = models.CharField(max_length=200,
                             blank=True,
                             null=True,
                             verbose_name="字典编号",
                             help_text="字典编号/实际值")
    parent = models.ForeignKey(
        to="self",
        related_name="sublist",
        db_constraint=False,
        on_delete=models.PROTECT,
        blank=True,
        null=True,
        verbose_name="父级",
        help_text="父级",
    )
    type = models.IntegerField(choices=cfg.TYPE_LIST,
                               default=0,
                               verbose_name="数据值类型",
                               help_text="数据值类型")
    color = models.CharField(max_length=20,
                             blank=True,
                             null=True,
                             verbose_name="颜色",
                             help_text="颜色")
    is_value = models.BooleanField(default=False,
                                   verbose_name="是否为value值",
                                   help_text="是否为value值,用来做具体值存放")
    status = models.BooleanField(default=True, verbose_name="状态", help_text="状态")
    sort = models.IntegerField(default=1,
                               verbose_name="显示排序",
                               null=True,
                               blank=True,
                               help_text="显示排序")
    remark = models.CharField(max_length=2000,
                              blank=True,
                              null=True,
                              verbose_name="备注",
                              help_text="备注")

    class Meta:
        db_table = "system_dictionary"
        verbose_name = "字典表"
        verbose_name_plural = verbose_name
        ordering = ("sort", )

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        super().save(force_insert, force_update, using, update_fields)
        dispatch.refresh_dictionary()  # 有更新则刷新字典配置

    def delete(self, using=None, keep_parents=False):
        res = super().delete(using, keep_parents)
        dispatch.refresh_dictionary()
        return res


class SystemConfig(SoftModel):
    parent = models.ForeignKey(
        to="self",
        verbose_name="父级",
        on_delete=models.CASCADE,
        db_constraint=False,
        null=True,
        blank=True,
        help_text="父级",
    )
    title = models.CharField(max_length=50, verbose_name="标题", help_text="标题")
    key = models.CharField(max_length=20, verbose_name="键", help_text="键", db_index=True)
    value = models.JSONField(max_length=100, verbose_name="值", help_text="值", null=True, blank=True)
    sort = models.IntegerField(default=0, verbose_name="排序", help_text="排序", blank=True)
    status = models.BooleanField(default=True, verbose_name="启用状态", help_text="启用状态")
    data_options = models.JSONField(verbose_name="数据options",
                                    help_text="数据options",
                                    null=True,
                                    blank=True)
    form_item_type = models.IntegerField(choices=cfg.FORM_ITEM_TYPE_LIST,
                                         verbose_name="表单类型",
                                         help_text="表单类型",
                                         default=0,
                                         blank=True)
    rule = models.JSONField(null=True, blank=True, verbose_name="校验规则", help_text="校验规则")
    placeholder = models.CharField(max_length=50,
                                   null=True,
                                   blank=True,
                                   verbose_name="提示信息",
                                   help_text="提示信息")
    setting = models.JSONField(null=True, blank=True, verbose_name="配置", help_text="配置")

    class Meta:
        db_table = "system_config"
        verbose_name = "系统配置表"
        verbose_name_plural = verbose_name
        ordering = ("sort", )
        unique_together = (("key", "parent_id"), )

    def __str__(self):
        return f"{self.title}"

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        super().save(force_insert, force_update, using, update_fields)
        dispatch.refresh_system_config()  # 有更新则刷新系统配置

    def delete(self, using=None, keep_parents=False):
        res = super().delete(using, keep_parents)
        dispatch.refresh_system_config()
        return res


class LoginLog(SoftModel):
    LOGIN_TYPE_CHOICES = ((1, "普通登录"), )
    username = models.CharField(max_length=32,
                                verbose_name="登录用户名",
                                null=True,
                                blank=True,
                                help_text="登录用户名")
    ip = models.CharField(max_length=32,
                          verbose_name="登录ip",
                          null=True,
                          blank=True,
                          help_text="登录ip")
    agent = models.TextField(verbose_name="agent信息", null=True, blank=True, help_text="agent信息")
    browser = models.CharField(max_length=200,
                               verbose_name="浏览器名",
                               null=True,
                               blank=True,
                               help_text="浏览器名")
    os = models.CharField(max_length=200,
                          verbose_name="操作系统",
                          null=True,
                          blank=True,
                          help_text="操作系统")
    continent = models.CharField(max_length=50,
                                 verbose_name="州",
                                 null=True,
                                 blank=True,
                                 help_text="州")
    country = models.CharField(max_length=50,
                               verbose_name="国家",
                               null=True,
                               blank=True,
                               help_text="国家")
    province = models.CharField(max_length=50,
                                verbose_name="省份",
                                null=True,
                                blank=True,
                                help_text="省份")
    city = models.CharField(max_length=50, verbose_name="城市", null=True, blank=True, help_text="城市")
    district = models.CharField(max_length=50,
                                verbose_name="县区",
                                null=True,
                                blank=True,
                                help_text="县区")
    isp = models.CharField(max_length=50,
                           verbose_name="运营商",
                           null=True,
                           blank=True,
                           help_text="运营商")
    area_code = models.CharField(max_length=50,
                                 verbose_name="区域代码",
                                 null=True,
                                 blank=True,
                                 help_text="区域代码")
    country_english = models.CharField(max_length=50,
                                       verbose_name="英文全称",
                                       null=True,
                                       blank=True,
                                       help_text="英文全称")
    country_code = models.CharField(max_length=50,
                                    verbose_name="简称",
                                    null=True,
                                    blank=True,
                                    help_text="简称")
    longitude = models.CharField(max_length=50,
                                 verbose_name="经度",
                                 null=True,
                                 blank=True,
                                 help_text="经度")
    latitude = models.CharField(max_length=50,
                                verbose_name="纬度",
                                null=True,
                                blank=True,
                                help_text="纬度")
    login_type = models.IntegerField(default=1,
                                     choices=LOGIN_TYPE_CHOICES,
                                     verbose_name="登录类型",
                                     help_text="登录类型")

    class Meta:
        db_table = "system_login_log"
        verbose_name = "登录日志"
        verbose_name_plural = verbose_name
        ordering = ("-create_datetime", )
