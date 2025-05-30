from django.http import JsonResponse
from backend.parsing.ParsingBook import parse_books

def books_api(request):
    books = parse_books()
    return JsonResponse(books, safe=False, json_dumps_params={'ensure_ascii': False})
