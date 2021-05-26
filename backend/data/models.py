from django.db import models


class Data(models.Model):
    datum_name = models.CharField(max_length=255, db_index=True)
    datum = models.JSONField(null=True)
