from celery.schedules import crontab  # pylint:disable=import-error,no-name-in-module


CELERYBEAT_SCHEDULE = {
    # Internal tasks
    "clearsessions": {
        "schedule": crontab(hour=3, minute=0),
        "task": "users.tasks.clearsessions"
    },
    # General background tasks
    "get-main-assets": {
        "schedule": crontab(minute=0, hour='*/3'),
        "task": "data.tasks.get_assets_main",
    }
}
