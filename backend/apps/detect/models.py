from django.db import models


# Create your models here.
class DetectImage(models.Model):

    id = models.AutoField("id", primary_key=True)
    filename = models.CharField("文件名", max_length=50)
    detected_filename = models.CharField("文件名", max_length=50)
    detect_result = models.CharField("检测结果", max_length=10)
    create_date_time = models.DateTimeField("检测时间", max_length=40)

    class Meta:
        db_table = "detected_img"
        verbose_name = "检测数据表"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.filename

    # def get_absolute_url(self):
    #     return reverse("_detail", kwargs={"pk": self.pk})