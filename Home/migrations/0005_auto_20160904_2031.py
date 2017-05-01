# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Home', '0004_auto_20160904_2030'),
    ]

    operations = [
        migrations.AlterField(
            model_name='promo',
            name='code',
            field=models.CharField(unique=True, max_length=50),
            preserve_default=True,
        ),
    ]
