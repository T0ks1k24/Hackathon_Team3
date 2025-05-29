from django.urls import path
from .views import books_api

urlpatterns = [
    path('api/books/', books_api, name='books_api'),
]