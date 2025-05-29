#!/bin/sh

DB_HOST="postgres_database"
DB_PORT="5432"

echo "Чекаємо доступності бази на $DB_HOST:$DB_PORT..."

while ! nc -z $DB_HOST $DB_PORT; do 
  echo "База недоступна - чекаємо..."
  sleep 10
done

echo "База доступна, запускаємо міграції..."
python manage.py migrate

echo "Запускаємо сервер..."
exec python manage.py runserver 0.0.0.0:8000
