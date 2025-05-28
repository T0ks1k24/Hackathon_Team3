from django.db import models

class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
class Book(models.Model):
    title = models.CharField(max_length=255)
    genre = models.ForeignKey(Genre, related_name='books', on_delete=models.SET_NULL, null=True)
    year = models.PositiveIntegerField()
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title