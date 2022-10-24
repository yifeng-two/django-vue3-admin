# Generated by Django 3.2.14 on 2022-10-18 19:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('system', '0008_auto_20221011_2051'),
    ]

    operations = [
        migrations.CreateModel(
            name='Area',
            fields=[
                ('id', models.BigAutoField(help_text='Id', primary_key=True, serialize=False, verbose_name='Id')),
                ('description', models.CharField(blank=True, help_text='描述', max_length=255, null=True, verbose_name='描述')),
                ('modifier', models.CharField(blank=True, help_text='修改人', max_length=255, null=True, verbose_name='修改人')),
                ('dept_belong_id', models.CharField(blank=True, help_text='数据归属部门', max_length=255, null=True, verbose_name='数据归属部门')),
                ('update_datetime', models.DateTimeField(auto_now=True, help_text='修改时间', null=True, verbose_name='修改时间')),
                ('create_datetime', models.DateTimeField(auto_now_add=True, help_text='创建时间', null=True, verbose_name='创建时间')),
                ('is_deleted', models.BooleanField(db_index=True, default=False, help_text='是否软删除', verbose_name='是否软删除')),
                ('name', models.CharField(help_text='名称', max_length=100, verbose_name='名称')),
                ('code', models.CharField(db_index=True, help_text='地区编码', max_length=20, unique=True, verbose_name='地区编码')),
                ('level', models.BigIntegerField(help_text='地区层级(1省份 2城市 3区县 4乡级)', verbose_name='地区层级(1省份 2城市 3区县 4乡级)')),
                ('pinyin', models.CharField(help_text='拼音', max_length=255, verbose_name='拼音')),
                ('initials', models.CharField(help_text='首字母', max_length=20, verbose_name='首字母')),
                ('enable', models.BooleanField(default=True, help_text='是否启用', verbose_name='是否启用')),
                ('creator', models.ForeignKey(db_constraint=False, help_text='创建人', null=True, on_delete=django.db.models.deletion.SET_NULL, related_query_name='creator_query', to=settings.AUTH_USER_MODEL, verbose_name='创建人')),
                ('pcode', models.ForeignKey(blank=True, db_constraint=False, help_text='父地区编码', null=True, on_delete=django.db.models.deletion.CASCADE, to='system.area', to_field='code', verbose_name='父地区编码')),
            ],
            options={
                'verbose_name': '地区表',
                'verbose_name_plural': '地区表',
                'db_table': 'system_area',
                'ordering': ('code',),
            },
        ),
    ]
