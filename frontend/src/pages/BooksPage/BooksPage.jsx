import React, { useEffect, useState } from 'react';
import CardList from '../../components/CardList/CardList';
import GenreList from '../../components/GenreList/GenreList';
import SearchBooks from '../../components/SearchBooks/SearchBooks';
import { fetchBooks, fetchBooksBySearch, fetchBooksByGenre } from '../../features/books/booksFetch';
import './BooksPage.css';

export default function BookPage() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);

      let data;
      if (searchQuery.trim()) {
        data = await fetchBooksBySearch(searchQuery, page);
      } else if (selectedGenre) {
        data = await fetchBooksByGenre(selectedGenre, page);
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
      setTotalPages(Math.ceil(data.count / 20));
      setLoading(false);
    };

    loadBooks();
  }, [page, searchQuery, selectedGenre]);

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
