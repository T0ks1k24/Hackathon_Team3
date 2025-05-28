from django.db import models

class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
class Book(models.Model):
    title = models.CharField(max_length=255)
    genre = models.ForeignKey(Genre, related_name='books', on_delete=models.SET_NULL, null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    year = models.PositiveIntegerField()
    description = models.TextField(blank=True, null=True)
    image = models.URLField(blank=True)

    def __str__(self):
        return self.title