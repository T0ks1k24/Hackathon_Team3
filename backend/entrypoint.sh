#!/bin/sh


echo "Запуск міграцій..."
python manage.py migrate

echo "Запуск сервера..."
exec python manage.py runserver 0.0.0.0:8000