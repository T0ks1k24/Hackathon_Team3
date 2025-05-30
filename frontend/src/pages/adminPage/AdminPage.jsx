import React, { useState } from 'react';
import './admin.css';

function AdminPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [upsCode, setUpsCode] = useState('');
  const [genre, setGenre] = useState('');
  const [availability, setAvailability] = useState('available');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      title,
      price,
      image_url: imageUrl,
      description,
      year,
      ups_code: upsCode,
      genre,
      availability,
    };

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        alert('Книгу додано!');
        setTitle('');
        setPrice('');
        setImageUrl('');
        setDescription('');
        setYear('');
        setUpsCode('');
        setGenre('');
        setAvailability('available');
      } else {
        alert('Помилка при додаванні книги');
      }
    } catch (err) {
      alert('Сервер недоступний');
    }
  };

  return (
    <div className="admin-container">
      <h2>Додати нову книгу</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <label>
          Назва книги:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Ціна:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        <label>
          Посилання на зображення:
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </label>
        <label>
          Опис:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Рік:
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        </label>
        <label>
          Код UPS:
          <input type="text" value={upsCode} onChange={(e) => setUpsCode(e.target.value)} required />
        </label>
        <label>
          Жанр:
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
        </label>
        <label>
          Кількість книг:
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        </label>
        <button type="submit">Додати</button>
      </form>
    </div>
  );
}

export default AdminPage;
