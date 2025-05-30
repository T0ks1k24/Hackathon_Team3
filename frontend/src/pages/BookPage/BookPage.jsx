import React, { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import CardList from '../../components/CardList/CardList';
import GenreList from '../../components/GenreList/GenreList';
import SearchBooks from '../../components/SearchBooks/SearchBooks';
import { fetchBooks, fetchBooksBySearch, fetchBooksByGenre } from '../../features/books/booksFetch';
import './BookPage.css'; // Змінено імпорт на правильну назву файлу

export default function BookPage() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [error, setError] = useState(null);

  const debouncedFetchBooks = useCallback(
    debounce(async (query, genre, page) => {
      if (!query.trim() && !genre && page === 1) {
        setBooks([]);
        setTotalPages(1);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        let data;
        if (query.trim()) {
          data = await fetchBooksBySearch(query, page);
        } else if (genre) {
          data = await fetchBooksByGenre(genre, page);
        } else {
          data = await fetchBooks(page);
        }

        const formattedBooks = (data.results || data).map(book => ({
          id: book.id,
          photo: book.image,
          rating: book.rating || 0,
          title: book.title,
          price: book.price || 0,
          stock: book.availability || 0,
        }));

        setBooks(formattedBooks);
        setTotalPages(Math.ceil((data.count || 0) / 20));
      } catch (err) {
        console.error('Помилка завантаження книг:', err);
        setError('Не вдалося завантажити книги. Спробуйте ще раз.');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedFetchBooks(searchQuery, selectedGenre, page);
    return () => debouncedFetchBooks.cancel();
  }, [searchQuery, selectedGenre, page, debouncedFetchBooks]);

  const handlePrev = () => setPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setPage(prev => Math.min(prev + 1, totalPages));

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre('');
    setPage(1);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setSearchQuery('');
    setPage(1);
  };

  return (
    <div className="books-page">
      <div className="title-div">
        <h1 className="title">Книги</h1>
        <SearchBooks onSearch={handleSearch} />
      </div>

      <GenreList onSelectGenre={handleGenreSelect} selectedGenre={selectedGenre} />

      {error && <p className="error">{error}</p>}
      {loading ? (
        <p className="loading">Завантаження...</p>
      ) : (
        <>
          <CardList books={books} />
          {totalPages > 1 && (
            <div className="pagination">
              <button onClick={handlePrev} disabled={page === 1}>← Назад</button>
              <span>Сторінка {page} з {totalPages}</span>
              <button onClick={handleNext} disabled={page === totalPages}>Вперед →</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}