'''
Author: yifeng
Date: 2022-08-27 20:12:35
LastEditors: yifeng
LastEditTime: 2022-09-04 19:26:36
Description: 
'''
import django.utils.timezone as timezone
from django.db import models
from django.apps import apps

from backend.utils.softDeletManager import SoftDeleteManager
from backend.settings import AUTH_USER_MODEL
from backend import settings


class SoftModel(models.Model):
    """
    核心标准抽象模型模型,可直接继承使用
    增加审计字段, 覆盖字段时, 字段名称请勿修改, 必须统一审计字段名称
    """
    id = models.BigAutoField(primary_key=True, help_text="Id", verbose_name="Id")
    description = models.CharField(max_length=255,
                                   verbose_name="描述",
                                   null=True,
                                   blank=True,
                                   help_text="描述")
    creator = models.ForeignKey(to=AUTH_USER_MODEL,
                                related_query_name='creator_query',
                                null=True,
                                verbose_name='创建人',
                                help_text="创建人",
                                on_delete=models.SET_NULL,
                                db_constraint=False)
    modifier = models.CharField(max_length=255,
                                null=True,
                                blank=True,
                                help_text="修改人",
                                verbose_name="修改人")
    dept_belong_id = models.CharField(max_length=255,
                                      help_text="数据归属部门",
                                      null=True,
                                      blank=True,
                                      verbose_name="数据归属部门")
    update_datetime = models.DateTimeField(auto_now=True,
                                           null=True,
                                           blank=True,
                                           help_text="修改时间",
                                           verbose_name="修改时间")
    create_datetime = models.DateTimeField(auto_now_add=True,
                                           null=True,
                                           blank=True,
                                           help_text="创建时间",
                                           verbose_name="创建时间")
    is_deleted = models.BooleanField(verbose_name="是否软删除",
                                     help_text='是否软删除',
                                     default=False,
                                     db_index=True)

    objects = SoftDeleteManager()

    class Meta:
        abstract = True
        verbose_name = '基本模型'
        verbose_name_plural = verbose_name


def get_all_models_objects(model_name=None):
    """
    获取所有 models 对象
    :return: {}
    """
    settings.ALL_MODELS_OBJECTS = {}
    if not settings.ALL_MODELS_OBJECTS:
        all_models = apps.get_models()
        for item in list(all_models):
            table = {
                "tableName": item._meta.verbose_name,
                "table": item.__name__,
                "tableFields": []
            }
            for field in item._meta.fields:
                fields = {
                    "title": field.verbose_name,
                    "field": field.name
                }
                table['tableFields'].append(fields)
            settings.ALL_MODELS_OBJECTS.setdefault(item.__name__, {"table": table, "object": item})
    if model_name:
        return settings.ALL_MODELS_OBJECTS[model_name] or {}
    return settings.ALL_MODELS_OBJECTS or {}