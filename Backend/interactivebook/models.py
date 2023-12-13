from django.db import models

class Flipbook(models.Model):
  page_id = models.IntegerField(unique=True)
  jsondata = models.TextField()