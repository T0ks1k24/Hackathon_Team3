from rest_framework import generics, filters
from .models import Book, Genre

from django_filters.rest_framework import DjangoFilterBackend
from .serializers import BookSerializer, GenreSerializer, BookDetailSerializer
from .permissions import IsAdminOrReadOnly


class GenreListCreateView(generics.ListCreateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [IsAdminOrReadOnly]

class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
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

