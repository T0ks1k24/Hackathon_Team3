import json
from django.core.management.base import BaseCommand
from books.models import Book, Genre


class Command(BaseCommand):
    help = "Імпортує книги з books_detailed.jsonl у базу даних"

    def handle(self, *args, **kwargs):
        try:
            with open("books_detailed.jsonl", "r", encoding="utf-8") as f:
                count_created = 0
                count_updated = 0

                for line in f:
                    data = json.loads(line)

                    # Спробуємо знайти книгу за UPC
                    book, created = Book.objects.update_or_create(
                        upc_code=data.get("upc"),
                        defaults={
                            "title": data.get("title"),
                            "price": data.get("price", 0),
                            "description": data.get("description", ""),
                            "image": data.get("image_url", ""),
                            "rating": data.get("rating", 0),
                            "availability": data.get("availability", 0),
                        }
                    )

                    if created:
                        count_created += 1
                    else:
                        count_updated += 1

            self.stdout.write(self.style.SUCCESS(
                f"Імпорт завершено: створено — {count_created}, оновлено — {count_updated}"
            ))
        except FileNotFoundError:
            self.stderr.write("Файл books_detailed.jsonl не знайдено.")