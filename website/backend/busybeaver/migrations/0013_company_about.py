# Generated by Django 3.1 on 2020-09-06 09:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('busybeaver', '0012_auto_20200830_1719'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='about',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]