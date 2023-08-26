#!/usr/bin/env bash
# exit on error
set -o errexit

poetry install

python manage.py collectstatic --no-input
python manage.py migrate

gunicorn -w 2 -b 0.0.0.0:4343  manage:app --timeout 120 