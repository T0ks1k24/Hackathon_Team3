from rest_framework import serializers
from .models import Genre, Book

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class BookDetailSerializer(serializers.ModelSerializer):
    genre = GenreSerializer(read_only=True)
    genre_id = serializers.PrimaryKeyRelatedField(
        queryset=Genre.objects.all(), source='genre', write_only=True
    )

    class Meta:
        model = Book
        fields = ['id', 'title', 'rating', 'genre', 'genre_id', 'price', 'availability', 'year', 'description', 'image', 'upc_code']

class BookSerializer(serializers.ModelSerializer):
    genre = GenreSerializer(read_only=True)
    genre_id = serializers.PrimaryKeyRelatedField(
        queryset=Genre.objects.all(), source='genre', write_only=True
    )

    class Meta:
        model = Book
        fields = ['id', 'title', 'rating', 'genre', 'genre_id', 'price', 'availability', 'year', 'image']

