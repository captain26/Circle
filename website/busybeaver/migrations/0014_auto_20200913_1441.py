# Generated by Django 3.1 on 2020-09-13 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('busybeaver', '0013_company_about'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='key_insight_1',
            field=models.CharField(default='', max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='post',
            name='key_insight_2',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name='post',
            name='key_insight_3',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='post',
            name='content',
            field=models.TextField(blank=True),
        ),
    ]
