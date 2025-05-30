from rest_framework import generics, filters
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from .models import Book, Genre
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import BookSerializer, GenreSerializer, BookDetailSerializer
from .permissions import IsAdminOrReadOnly
from parsing.ParsingBook import scrape_books
import pandas as pd
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination



class GenreListCreateView(generics.ListCreateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [IsAdminOrReadOnly]

    
class BookPagination(PageNumberPagination):
    page_size = 20

class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    pagination_class = BookPagination
    permission_classes = [IsAdminOrReadOnly]
    

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = {
        'genre': ['exact'],
        'year': ['gte', 'lte'],
    }
    search_fields = ['title']
    ordering_fields = ['price', 'year']

class BookRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookDetailSerializer
    permission_classes = [IsAdminOrReadOnly]



class ImportBooksView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        try:
            data = scrape_books() 
        except Exception as e:
            return Response({"error": f"Парсинг не вдалось виконати: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        count_new, count_updated = 0, 0

        for item in data:
            genre_name = item.get('genre')
            genre, _ = Genre.objects.get_or_create(name=genre_name)

            book, created = Book.objects.update_or_create(
                upc_code=item['upc'],
                defaults={
                    'title': item['title'],
                    'genre': genre,
                    'price': item['price'],
                    'rating': item['rating'],
                    'availability': item['availability'],
                    'year': item.get('year', 2024),
                    'description': item.get('description', ''),
                    'image': item['image_url'],
                }
            )
            if created:
                count_new += 1
            else:
                count_updated += 1

        return Response({
            'message': 'Імпорт завершено',
            'created': count_new,
            'updated': count_updated,
            'total': count_new + count_updated
        }, status=status.HTTP_200_OK)
    


class ExportBooksExcelView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):
       
        title = request.query_params.get('title')
        genre = request.query_params.get('genre')
        year = request.query_params.get('year')

        books = Book.objects.select_related('genre').all()

        if title:
            books = books.filter(title__icontains=title)
        if genre:
            books = books.filter(genre__name__icontains=genre)
        if year:
            books = books.filter(year=year)

      
        data = []
        for book in books:
            data.append({
                'ID': book.id,
                'Назва': book.title,
                'Жанр': book.genre.name if book.genre else '',
                'Ціна': float(book.price),
                'Рейтинг': float(book.rating),
                'Наявність': book.availability,
                'Рік': book.year,
                'Опис': book.description or '',
                'UPC-код': book.upc_code,
                'Зображення (URL)': book.image,
            })

        df = pd.DataFrame(data)

        
        response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = 'attachment; filename=books.xlsx'

        with pd.ExcelWriter(response, engine='xlsxwriter') as writer:
            df.to_excel(writer, index=False, sheet_name='Books')

        return response