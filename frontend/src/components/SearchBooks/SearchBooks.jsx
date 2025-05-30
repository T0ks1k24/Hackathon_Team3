import React, { useState } from 'react';
import './SearchBooks.css'

export default function SearchBooks({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="search-books-form" role="search" aria-label="Пошук книг">
      <label htmlFor="search-input" className="visually-hidden">Пошук книг</label>
      <input
        id="search-input"
        type="search"
        placeholder="Пошук книг..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="search-input"
        autoComplete="off"
        autoFocus
        aria-label="Пошук книг"
      />
      <button type="submit" className="search-button" aria-label="Почати пошук">🔍</button>
    </form>
  );
}
