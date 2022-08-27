import time
from apps.detect.models import DetectImage


def store_data_by_model(data):
    now = time.localtime()
    now_time = time.strftime("%Y-%m-%d %H:%M:%S", now)
    for item in data:
        row_data = DetectImage.objects.create(filename=item.get("filename"),
                                              detected_filename=item.get("detected_filename"),
                                              detect_result=item.get("detect_result"),
                                              create_date_time=now_time)
        row_data.save()