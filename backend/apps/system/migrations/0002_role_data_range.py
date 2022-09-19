# Generated by Django 3.2.14 on 2022-09-02 19:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('system', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='role',
            name='data_range',
            field=models.IntegerField(choices=[(0, '仅本人数据权限'), (1, '本部门及以下数据权限'), (2, '本部门数据权限'), (3, '全部数据权限'), (4, '自定数据权限')], default=0, help_text='数据权限范围', verbose_name='数据权限范围'),
        ),
    ]
