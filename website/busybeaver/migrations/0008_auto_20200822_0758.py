# Generated by Django 3.1 on 2020-08-22 07:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('busybeaver', '0007_auto_20200819_1805'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='friends',
            field=models.ManyToManyField(blank=True, related_name='_user_friends_+', to='busybeaver.User'),
        ),
    ]
