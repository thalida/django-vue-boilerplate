#!/usr/bin/env bash
# exit on error
set -o errexit

# poetry run gunicorn api.wsgi:application
poetry run daphne -b 0.0.0.0 api.asgi:application
