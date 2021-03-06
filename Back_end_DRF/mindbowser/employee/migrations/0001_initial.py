# Generated by Django 3.1.5 on 2021-01-15 06:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=200)),
                ('first_name', models.CharField(max_length=200)),
                ('last_name', models.CharField(max_length=200)),
                ('password', models.CharField(max_length=200)),
                ('address', models.CharField(max_length=200)),
                ('company', models.CharField(max_length=200)),
                ('mobile', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=200)),
            ],
        ),
    ]
