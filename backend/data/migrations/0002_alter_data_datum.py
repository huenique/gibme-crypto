# Generated by Django 3.2.3 on 2021-05-26 14:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='data',
            name='datum',
            field=models.JSONField(),
        ),
    ]
