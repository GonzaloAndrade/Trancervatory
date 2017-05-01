# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('Home', '0005_auto_20160904_2031'),
    ]

    operations = [
        migrations.AddField(
            model_name='usertickets',
            name='buy_date',
            field=models.DateTimeField(default=datetime.datetime(2016, 9, 6, 15, 57, 55, 220000, tzinfo=utc), verbose_name=b'date registered'),
            preserve_default=False,
        ),
    ]
