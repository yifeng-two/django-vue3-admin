'''
Author: yifeng
Date: 2022-08-27 21:15:31
LastEditors: yifeng
LastEditTime: 2022-08-27 22:20:29
Description: 
'''
from django.db import models
from django.db.models.query import QuerySet


# 自定义软删除查询基类
class SoftDeleteQuerySetMixin(object):
    '''
    QuerySet for SoftDeletableModel. Instead of removing instance sets
    its ``is_deleted`` field to True.
    '''

    def delete(self, soft=True):
        '''
        Soft delete objects from queryset (set their ``is_deleted``
        field to True)
        '''
        if soft:
            self.update(is_deleted=True)
        else:
            return super(SoftDeleteQuerySetMixin, self).delete()


class SoftDeleteQuerySet(SoftDeleteQuerySetMixin, QuerySet):
    pass


class SoftDeleteManagerMixin(object):
    '''
    Manager that limits the queryset by default to show only not deleted
    instances of model.
    '''
    _queryset_class = SoftDeleteQuerySet

    def get_queryset(self, all=False):
        '''
        Return queryset limited to not deleted entries.
        '''
        kwargs = {'model': self.model, 'using': self._db}
        if hasattr(self, '_hints'):
            kwargs['hints'] = self._hints
        if all:
            return self._queryset_class(**kwargs)
        return self._queryset_class(**kwargs).filter(is_deleted=False)


class SoftDeleteManager(SoftDeleteManagerMixin, models.Manager):
    pass
