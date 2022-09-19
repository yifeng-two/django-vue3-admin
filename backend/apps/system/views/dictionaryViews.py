'''
Author: yifeng
Date: 2022-09-02 22:23:04
LastEditors: yifeng
LastEditTime: 2022-09-02 22:25:23
Description: 
'''

from rest_framework.views import APIView

from apps.system.config import dispatch
from apps.system.models import Dictionary
from apps.system.serializers.dictionarySerializer import DictionarySerializer
from backend.utils.viewSet import CustomModelViewSet
from backend.utils.jsonResponse import SuccessResponse


class DictionaryViewSet(CustomModelViewSet):
    """
    字典管理接口
    list:查询
    create:新增
    update:修改
    retrieve:单例
    destroy:删除
    """
    queryset = Dictionary.objects.all()
    serializer_class = DictionarySerializer
    extra_filter_backends = []
    search_fields = ['label']


class InitDictionaryViewSet(APIView):
    """
    获取初始化配置
    """
    authentication_classes = []
    permission_classes = []
    queryset = Dictionary.objects.all()

    def get(self, request):
        dictionary_key = self.request.query_params.get('dictionary_key')
        if dictionary_key:
            if dictionary_key == 'all':
                data = [ele for ele in dispatch.get_dictionary_config().values()]
                if not data:
                    dispatch.refresh_dictionary()
                    data = [ele for ele in dispatch.get_dictionary_config().values()]
            else:
                data = self.queryset.filter(parent__value=dictionary_key,
                                            status=True).values('label', 'value', 'type', 'color')
            return SuccessResponse(data=data, msg="获取成功")
        return SuccessResponse(data=[], msg="获取成功")
