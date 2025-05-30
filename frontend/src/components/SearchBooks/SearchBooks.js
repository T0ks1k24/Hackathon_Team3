// SearchBooks.jsx

import React, { useState } from 'react';
import { fetchBooksBySearch } from './booksFetch';

export default function SearchBooks() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const results = await fetchBooksBySearch(query);
    setBooks(results);
    setLoading(false);
  };

  return (
    <div className="search-page">
      <h2>Пошук книг</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Введіть назву книги..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>🔍 Пошук</button>
      </div>

      {loading ? (
        <p>Завантаження...</p>
      ) : (
        <ul className="book-results">
          {books.length > 0 ? (
            books.map((book) => (
              <li key={book.id}>{book.title}</li>
            ))
          ) : (
            <p>Книг не знайдено.</p>
          )}
        </ul>
      )}
    </div>
  );
}
