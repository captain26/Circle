# Generated by Django 3.1 on 2020-08-16 09:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ticker',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ticker_id', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Price',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('last_updated', models.DateTimeField()),
                ('ticker_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='busybeaver.ticker')),
            ],
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('ceo', models.CharField(max_length=30)),
                ('ticker_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='busybeaver.ticker')),
            ],
        ),
    ]
