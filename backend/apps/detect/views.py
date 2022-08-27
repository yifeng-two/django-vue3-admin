import sys
import os
import json
from django.shortcuts import render

from django.http import JsonResponse
from django.views import View
from requests import Response
# Create your views here.
from detect.models import DetectImage
from detect.serializer import DetectImageSerializer

BASE_DIR = os.getcwd()
PRE_DIR = os.path.abspath(os.path.join(os.getcwd(), ".."))

sys.path.append(BASE_DIR)
sys.path.append(PRE_DIR)
print('bseurl',BASE_DIR)
print(sys.path)


# Create your views here.
class DetectImagesView(View):
    def get(self, request):
        detect_images = DetectImage.objects.all()
        ser = DetectImageSerializer(detect_images, many=True)
        return Response(ser.data)

    def post(self, request):
        "保存检测图片"
        # 1、获取前端数据
        data = request.body.decode()
        data_dict = json.loads(data)
        # 2、验证数据
        ser = DetectImageSerializer(data=data_dict)
        ser.is_valid(raise_exception=True)

        # 3、保存数据
        # book  BookInfo.objects.create(btitle=ser.validated_data['btitle'],
        # bpub_date=ser.validated_data["bpub_date"])
        ser.save()
        # 4、返回结果
        return Response(ser.data)


class DetectImageView(View):
    def get(self, request, pk):
        try:
            detect_image = DetectImage.objects.get(id=pk)
        except:
            return JsonResponse({
                "id": detect_image.id,
                "filename": detect_image.filename,
                "detected_filename": detect_image.detected_filename,
                "detect_result": detect_image.detect_result
            })

    def post(self, request):
        "保存检测图片"
        # 1、获取前端数据
        data = request.body.decode()
        data_dict = json.loads(data)
        # 2、验证数据
        ser = DetectImageSerializer(data=data_dict)
        ser.is_valid(raise_exception=True)

        # 3、保存数据
        # book  BookInfo.objects.create(btitle=ser.validated_data['btitle'],
        # bpub_date=ser.validated_data["bpub_date"])
        ser.save()
        # 4、返回结果
        return JsonResponse(ser.data)

    def put(self, request, pk):
        # 修改检测图片结果
        # 1.获取数据
        data = request.body.decode()
        data_dict = json.loads(data)
        id = data_dict.get("id")
        filename = data_dict.get("filename")
        detected_filename = data_dict.get("detected_filename")
        detect_result = data_dict.get("detect_result")
        # 2、校验数据
        # 3、更新数据
        # 这种方法得到的并不是对象，而是得到更新数据的个数
        # book = BookInfo.objects.filter(id=pk).update(btitle=btitle,bpub_date=bpub_date)
        try:
            detect_image = DetectImage.objects.get(id=pk)
        except:
            return JsonResponse({"error": "错误的id"}, status=400)
        detect_image.id = id
        detect_image.filename = filename
        detect_image.detected_filename = detected_filename
        detect_image.detect_result = detect_result
        detect_image.save()
        # 4、返回结果
        return JsonResponse({
            "id": detect_image.id,
            "filename": detect_image.filename,
            "detected_filename": detect_image.detected_filename,
            "detect_result": detect_image.detect_result
        })

    def delete(self, request, pk):
        """删除检测图片"""
        try:
            detect_image = DetectImage.objects.get(id=pk)
        except:
            return JsonResponse({"error": "错误的id"}, status=400)

        detect_image.delete()
