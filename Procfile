web: gunicorn gibme_crypto.wsgi --chdir backend --limit-request-line 8188 --log-file -
worker: REMAP_SIGTERM=SIGQUIT celery --workdir backend --app=gibme_crypto worker -B -S redbeat.RedBeatScheduler --loglevel=info
