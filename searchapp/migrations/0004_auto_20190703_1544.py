# Generated by Django 2.2.3 on 2019-07-03 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('searchapp', '0003_auto_20190703_1541'),
    ]

    operations = [
        migrations.AlterField(
            model_name='search_records',
            name='company_name',
            field=models.CharField(max_length=100, null=True),
        ),
    ]