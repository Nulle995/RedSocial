# Generated by Django 5.1 on 2024-08-19 21:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_userprofile_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='avatar',
            field=models.ImageField(blank=True, default='profile_avatar.png', null=True, upload_to=''),
        ),
    ]
