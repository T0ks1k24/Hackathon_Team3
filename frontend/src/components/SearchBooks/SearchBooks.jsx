import React, { useState, useEffect, useCallback } from 'react';
import './SearchBooks.css';

export default function SearchBooks({ onSearch }) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [yearGte, setYearGte] = useState('');
  const [yearLte, setYearLte] = useState('');
  const [ordering, setOrdering] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Завантаження жанрів
  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await fetch('http://3.77.211.196/api/books/genres');
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error('Error loading genres:', error);
      }
    }
    fetchGenres();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  // Функція пошуку
  const handleSearch = useCallback(async () => {
    setLoading(true);
    setHasSearched(true);

    const params = new URLSearchParams();
    if (debouncedQuery.trim()) params.append('search', debouncedQuery.trim());
    if (genre) params.append('genre', genre);
    if (yearGte) params.append('yeargte', yearGte);
    if (yearLte) params.append('yearlte', yearLte);
    if (ordering) params.append('ordering', ordering);

    try {
      const response = await fetch(`/api/books/?${params.toString()}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const results = Array.isArray(data.results) ? data.results : Array.isArray(data) ? data : [];
      setBooks(results);
      onSearch && onSearch(debouncedQuery);
    } catch (error) {
      console.error('Помилка при отриманні книг:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, genre, yearGte, yearLte, ordering, onSearch]);

  // Автоматичний пошук при зміні debouncedQuery або фільтрів
  useEffect(() => {
    if (debouncedQuery.trim() || genre || yearGte || yearLte || ordering) {
      handleSearch();
    } else {
      setBooks([]);
      setHasSearched(false);
    }
  }, [debouncedQuery, genre, yearGte, yearLte, ordering, handleSearch]);

  // Обробники вводу
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleApplyFilters = () => {
    handleSearch();
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
        <button onClick={handleSearch}>🔍 Пошук</button>
        <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? 'Приховати фільтри' : 'Показати фільтри'}
        </button>
      </div>

      {showFilters && (
        <div className="filters">
          <h3>Фільтри</h3>

          <div className="filter-group">
            <label>Жанр:</label>
            <select value={genre} onChange={(e) => setGenre(e.target.value)} required>
              <option value="">Всі жанри</option>
              {genres.map((g) => (
                <option key={g.id} value={g.name}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Рік від:</label>
            <input
              type="number"
              placeholder="Напр., 2000"
              value={yearGte}
              onChange={(e) => setYearGte(e.target.value)}
              min="0"
            />
          </div>

          <div className="filter-group">
            <label>Рік до:</label>
            <input
              type="number"
              placeholder="Напр., 2025"
              value={yearLte}
              onChange={(e) => setYearLte(e.target.value)}
              min="0"
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

          <button onClick={handleApplyFilters}>Застосувати фільтри</button>
        </div>
      )}

      {loading ? (
        <p>Завантаження...</p>
      ) : (
        <ul className="book-results">
          {hasSearched && books.length === 0 ? (
            <p>Книг не знайдено.</p>
          ) : (
            books.map((book) => <li key={book.id}>{book.title}</li>)
          )}
        </ul>
      )}
    </div>
  );
}
