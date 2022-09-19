from rest_framework import serializers

from detect.models import DetectImage


class DetectImageModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetectImage
        fields = '__all__'


class DetectImageSerializer(serializers.Serializer):
    # id = serializers.AutoField()
    filename = serializers.CharField()
    detected_filename = serializers.CharField()
    detect_result = serializers.CharField()
