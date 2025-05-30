import React, { useEffect, useState } from 'react';
import './GenreList.css';

export default function GenreList({ onSelectGenre, selectedGenre }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('http://3.77.211.196/api/books/genres/');
        const data = await response.json();
        setGenres(data.results); 
      } catch (error) {
        console.error('Помилка при завантаженні жанрів:', error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="genre-list">
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={`genre-button ${selectedGenre === genre.name ? 'active' : ''}`}
          onClick={() => onSelectGenre(genre.name)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}
