from django.conf import settings

from celery import shared_task

from .client import scheduled


@shared_task
def get_assets_main():
    scheduled_kwargs = {
        'LUNARCRUSH_APIKEY': settings.LUNARCRUSH_APIKEY,
    }
    scheduled.assets_main(**scheduled_kwargs)
