# Generated by Django 3.2.3 on 2021-05-26 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0002_alter_data_datum'),
    ]

    operations = [
        migrations.AlterField(
            model_name='data',
            name='datum',
            field=models.JSONField(null=True),
        ),
    ]
