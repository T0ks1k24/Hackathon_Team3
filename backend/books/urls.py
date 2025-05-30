from django.urls import path
from .views import GenreListCreateView, BookListCreateView, BookRetrieveUpdateDestroyView

urlpatterns = [
    path('genres/', GenreListCreateView.as_view(), name='genre-list-create'),
    path('book/', BookListCreateView.as_view(), name='book-list-create'),
    path('book/<int:pk>/', BookRetrieveUpdateDestroyView.as_view(), name='book-detail'),
]