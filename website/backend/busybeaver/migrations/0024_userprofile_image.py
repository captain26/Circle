# Generated by Django 3.1 on 2020-09-26 12:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('busybeaver', '0023_auto_20200925_0912'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='image',
            field=models.ImageField(blank=True, upload_to='profile_image'),
        ),
    ]