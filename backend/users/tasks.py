from django.core import management

from gibme_crypto import celery_app


@celery_app.task
def clearsessions():
    management.call_command('clearsessions')
