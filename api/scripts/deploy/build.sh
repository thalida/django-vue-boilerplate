#!/usr/bin/env bash
# exit on error
set -o errexit

poetry install --no-root
poetry run python manage.py collectstatic --no-input
poetry run python manage.py migrate
