# Generated by Django 3.1.4 on 2021-01-30 22:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('busybeaver', '0028_auto_20201226_1204'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='key_insight_1',
        ),
        migrations.RemoveField(
            model_name='post',
            name='key_insight_2',
        ),
        migrations.RemoveField(
            model_name='post',
            name='key_insight_3',
        ),
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('content', models.TextField(blank=True)),
                ('pub_date', models.DateTimeField(auto_now_add=True)),
                ('slug', models.SlugField(max_length=200)),
                ('tag', models.ManyToManyField(to='busybeaver.Ticker')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
