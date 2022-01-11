# Generated by Django 3.1 on 2020-08-19 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('busybeaver', '0006_auto_20200819_1802'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('userid', models.CharField(max_length=30)),
                ('friends', models.ManyToManyField(related_name='_user_friends_+', to='busybeaver.User')),
            ],
        ),
        migrations.DeleteModel(
            name='Beaver',
        ),
    ]
