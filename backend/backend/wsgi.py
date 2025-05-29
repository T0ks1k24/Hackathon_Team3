"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os
import django
from django.core.wsgi import get_wsgi_application

def run_migrations():
    import os
    import sys
    from django.core.management import call_command

    # Тільки один раз, щоб уникнути проблем при gunicorn (може запускати кілька процесів)
    if os.environ.get('RUN_MAIN', None) != 'true':
        return

    try:
        print("🔁 Виконуємо автоматичні міграції...")
        call_command('migrate', interactive=False)
    except Exception as e:
        print(f"❌ Помилка при міграції: {e}", file=sys.stderr)

run_migrations()

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_wsgi_application()
