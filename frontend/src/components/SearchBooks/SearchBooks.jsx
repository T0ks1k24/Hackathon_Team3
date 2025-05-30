import React, { useState, useMemo, useCallback } from 'react';
import debounce from 'lodash.debounce';
import './SearchBooks.css';

export default function SearchBooks({ onSearch }) {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [yearGte, setYearGte] = useState('');
  const [yearLte, setYearLte] = useState('');
  const [ordering, setOrdering] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async () => {
    setLoading(true);
    setHasSearched(true);

    const params = new URLSearchParams();
    if (query) params.append('search', query);
    if (genre) params.append('genre', genre);
    if (yearGte) params.append('yeargte', yearGte);
    if (yearLte) params.append('yearlte', yearLte);
    if (ordering) params.append('ordering', ordering);

    try {
      const response = await fetch(`/api/books/?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data.results || data);
    } catch (error) {
      console.error('Помилка при отриманні книг:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [query, genre, yearGte, yearLte, ordering]);

  const debouncedSearch = useMemo(() =>
    debounce((searchQuery) => {
      if (searchQuery.trim()) {
        onSearch(searchQuery);
        handleSearch();
      }
    }, 500), [onSearch, handleSearch]
  );

  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      debouncedSearch.flush();
      handleSearch();
    }
  };

  return (
    <div className="search-page">
      <h2>Пошук книг</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Введіть назву книги..."
          value={query}
          onChange={handleQueryChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={() => { debouncedSearch.flush(); handleSearch(); }}>🔍 Пошук</button>
        <button
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Приховати фільтри' : 'Показати фільтри'}
        </button>
      </div>

      {showFilters && (
        <div className="filters">
          <h3>Фільтри</h3>
          <div className="filter-group">
            <label>Жанр (ID):</label>
            <input
              type="number"
              placeholder="Введіть ID жанру"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Рік від:</label>
            <input
              type="number"
              placeholder="Напр., 2000"
              value={yearGte}
              onChange={(e) => setYearGte(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Рік до:</label>
            <input
              type="number"
              placeholder="Напр., 2025"
              value={yearLte}
              onChange={(e) => setYearLte(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Сортування:</label>
            <select value={ordering} onChange={(e) => setOrdering(e.target.value)}>
              <option value="">Без сортування</option>
              <option value="price">За ціною (зростання)</option>
              <option value="-price">За ціною (спадання)</option>
            </select>
          </div>
          <button onClick={() => { debouncedSearch.flush(); handleSearch(); }}>Застосувати фільтри</button>
        </div>
      )}

      {loading ? (
        <p>Завантаження...</p>
      ) : (
        <ul className="book-results">
          {hasSearched && books.length === 0 ? (
            <p>Книг не знайдено.</p>
          ) : (
            books.map((book) => (
              <li key={book.id}>{book.title}</li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
