# Generated by Django 3.1.4 on 2021-03-11 12:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('busybeaver', '0036_message'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='image',
            field=models.ImageField(blank=True, upload_to='media/profile-pictures'),
        ),
        migrations.AlterField(
            model_name='watchlist',
            name='ticker_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='watchers', to='busybeaver.ticker'),
        ),
        migrations.AlterField(
            model_name='watchlist',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='watchlist', to=settings.AUTH_USER_MODEL),
        ),
    ]