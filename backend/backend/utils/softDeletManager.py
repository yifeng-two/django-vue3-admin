'''
Author: yifeng
Date: 2022-08-27 21:15:31
LastEditors: yifeng
LastEditTime: 2022-09-04 19:22:26
Description: 
'''
from django.db import models
from django.db.models.query import QuerySet


# 自定义软删除查询基类
class SoftDeleteQuerySet(QuerySet):
    def delete(self, soft_delete=True):
        """
       重写删除方法
       当soft_delete为True时表示软删除，则修改删除时间为当前时间，否则直接删除
       :param soft: Boolean 是否软删除，默认是
       :return: Tuple eg.(3, {'lqModel.Test': 3})
       """
        if soft_delete:
            return self.update(is_deleted=True)
        else:
            return super(SoftDeleteQuerySet, self).delete()


class SoftDeleteManager(models.Manager):
    """支持软删除"""
    def __init__(self, *args, **kwargs):
        self.__add_is_del_filter = False
        super(SoftDeleteManager, self).__init__(*args, **kwargs)

    def filter(self, *args, **kwargs):
        # 考虑是否主动传入is_deleted
        if not kwargs.get('is_deleted') is None:
            self.__add_is_del_filter = True
        return super(SoftDeleteManager, self).filter(*args, **kwargs)

    def get_queryset(self):
        if self.__add_is_del_filter:
            return SoftDeleteQuerySet(self.model, using=self._db).exclude(is_deleted=False)
        return SoftDeleteQuerySet(self.model).exclude(is_deleted=True)

    def get_by_natural_key(self, name):
        return SoftDeleteQuerySet(self.model).get(username=name)
