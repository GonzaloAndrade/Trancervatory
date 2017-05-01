# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Home', '0003_auto_20160904_1343'),
    ]

    operations = [
        migrations.AlterField(
            model_name='promoter',
            name='code',
            field=models.CharField(unique=True, max_length=50),
            preserve_default=True,
        ),
    ]
